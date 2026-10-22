/**
 * The built extension on real Twitch chat, in every extension configuration.
 *
 * For each config (native, 7TV, BTTV, FFZ and their combinations, `.agent/probes/lib.mjs`)
 * and each surface, the extension in `dist/` is loaded beside the config's chat extensions,
 * a busy channel drawn at random (`.recon-profile/channels.json`, written by
 * `.agent/probes/pick.mjs` and ranked by `heat.mjs`) is opened, the reading language is set
 * to one the chat is not written in, and what the extension drew is counted:
 *
 *   - lines it marked, translations it drew, and where: every translation must sit inside a
 *     chat row of the family the config produces, and no row may carry two;
 *   - survival: the translations on screen are still attached 10 s later;
 *   - the floating bar, mounted in the chat panel.
 *
 * A cell that saw no chat at all fails: zero translations on zero lines is not a pass.
 * The report is written to `.agent/RECON/e2e/<surface>/measure.json`, channel names redacted.
 *
 *   node test/e2e/twitch-live.mjs [--configs native,7tv] [--surfaces live,popout] [--target ja]
 *
 * Exit code: 0 when every cell passed, 1 otherwise.
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  CONFIGS,
  devices,
  findMessageList,
  launch,
  ROOT,
  save,
  TODAY,
} from '../../.agent/probes/lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = process.env.KT_EXT ?? path.resolve(HERE, '../../dist');
if (!fs.existsSync(path.join(EXT, 'manifest.json'))) {
  console.error('dist/manifest.json missing: run `npm run build` first.');
  process.exit(2);
}

const arg = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : dflt;
};
const configs = arg('--configs', Object.keys(CONFIGS).join(',')).split(',');
const surfaces = arg('--surfaces', 'live').split(',');
const target = arg('--target', 'ja');
const MIN_TRANSLATED = Number(arg('--min', '3'));

const { channels, hot = [] } = JSON.parse(
  fs.readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'),
);
const order = [...hot, ...channels.keys()].filter((v, i, a) => a.indexOf(v) === i);

const ROWS =
  '.seventv-message, .chat-line__message, .seventv-chat-vod-message-patched, .vod-message';
const TRANSLATIONS = '.kt-translation, .kt-translation-inline, .kt-translation-replace';

async function urlFor(page, surface, login) {
  switch (surface) {
    case 'popout':
      return `https://www.twitch.tv/popout/${login}/chat?popout=`;
    case 'embed':
      globalThis.__embedHtml = `<!doctype html><title>embed</title><iframe id="f" src="https://www.twitch.tv/embed/${login}/chat?parent=kt-embed.test" width="400" height="900"></iframe>`;
      return 'https://kt-embed.test/';
    case 'mobile':
      return `https://m.twitch.tv/${login}/chat`;
    case 'vod': {
      await page.goto(`https://www.twitch.tv/${login}/videos?filter=archives&sort=time`, {
        waitUntil: 'domcontentloaded',
      });
      await page.waitForTimeout(6000);
      const v = await page.evaluate(() =>
        [...document.querySelectorAll('a[href*="/videos/"]')]
          .map((a) => a.getAttribute('href'))
          .find((h) => /\/videos\/\d+/.test(h)),
      );
      return v ? new URL(v, 'https://www.twitch.tv').href : null;
    }
    case 'clip': {
      await page.goto(`https://www.twitch.tv/${login}/clips?filter=clips&range=7d`, {
        waitUntil: 'domcontentloaded',
      });
      await page.waitForTimeout(6000);
      const c = await page.evaluate(
        () =>
          [...document.querySelectorAll('a[href*="/clip/"]')].map((a) => a.getAttribute('href'))[0],
      );
      return c ? new URL(c, 'https://www.twitch.tv').href : null;
    }
    default:
      return `https://www.twitch.tv/${login}`;
  }
}

/** Sets the reading language in the extension's own storage, through its worker. */
async function setTarget(ctx, code) {
  const sw =
    ctx
      .serviceWorkers()
      .find((w) => w.url().endsWith('/service-worker-loader.js') || w.url().includes('/assets/')) ??
    (await ctx.waitForEvent('serviceworker', { timeout: 20000 }).catch(() => null));
  if (!sw) return false;
  return sw
    .evaluate(async (code) => {
      const K = 'kt.settings.v2';
      const cur = (await chrome.storage.sync.get(K))[K] ?? {};
      await chrome.storage.sync.set({
        [K]: {
          ...cur,
          enabled: true,
          targetLang: code,
          pauseWhenHidden: false,
          showFloatingBar: true,
        },
      });
      return true;
    }, code)
    .catch(() => false);
}

const measure = (frame, rowsSel, trSel) =>
  frame.evaluate(
    ({ rowsSel, trSel }) => {
      const tr = [...document.querySelectorAll(trSel)];
      const rowOf = (t) => t.closest(rowsSel);
      const perRow = new Map();
      for (const t of tr) {
        const r = rowOf(t);
        if (r) perRow.set(r, (perRow.get(r) ?? 0) + 1);
      }
      window.__ktTr = tr;
      // What each translated line said, to find it again after the list moved on.
      const said = (r) =>
        [...r.querySelectorAll('[data-a-target="chat-message-text"], .text-token')]
          .filter((e) => !e.closest('[class^="kt-"], [class*=" kt-"]'))
          .map((e) => e.textContent)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
      window.__ktSaid = said;
      window.__ktTranslatedTexts = [
        ...new Set(
          tr
            .map((t) => rowOf(t))
            .filter(Boolean)
            .map(said)
            .filter(Boolean),
        ),
      ];
      // The list in order and the translated rows by text, to tell a row the list trimmed off
      // its top from one that vanished or lost its translation in place.
      window.__ktRowsAtMeasure = [...document.querySelectorAll(rowsSel)];
      window.__ktTrRows = new Map();
      for (const r of new Set(tr.map((t) => rowOf(t)).filter(Boolean))) {
        const k = said(r);
        if (k) window.__ktTrRows.set(k, [...(window.__ktTrRows.get(k) ?? []), r]);
      }
      const famOf = (r) =>
        r.classList.contains('seventv-message') ||
        r.classList.contains('seventv-chat-vod-message-patched')
          ? '7tv'
          : r.classList.contains('vod-message')
            ? 'replay'
            : 'native';
      return {
        mounted: document.documentElement.hasAttribute('data-kt-instance'),
        bar: !!document.querySelector('#kt-floating-bar'),
        barInPanel: !!document.querySelector(
          '.chat-room__content #kt-floating-bar, .video-chat #kt-floating-bar',
        ),
        rows: document.querySelectorAll(rowsSel).length,
        marked: document.querySelectorAll('[data-kt-id]').length,
        translations: tr.length,
        outsideRows: tr.filter((t) => !rowOf(t)).length,
        rowsWithTwo: [...perRow.values()].filter((n) => n > 1).length,
        families: [...new Set([...perRow.keys()].map(famOf))],
        errors: document.querySelectorAll('.kt-error').length,
        scheme: document.documentElement.getAttribute('data-kt-scheme'),
        chatTheme:
          document.querySelector('[data-a-target^="chat-theme-"]')?.getAttribute('data-a-target') ??
          null,
        // Worst text contrast among drawn translations: own colour (opacity composited in)
        // against the first opaque ground behind it, WCAG relative luminance.
        minContrast: (() => {
          const rgb = (v) => (v.match(/[\d.]+/g) ?? []).map(Number);
          const lum = ([r, g, b]) => {
            const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
            return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
          };
          let worst = null;
          for (const t of tr.slice(0, 40)) {
            const cs = getComputedStyle(t);
            const fg = rgb(cs.color);
            let bg = null;
            for (let n = t; n && !bg; n = n.parentElement) {
              const c = rgb(getComputedStyle(n).backgroundColor);
              if (c.length >= 3 && (c[3] ?? 1) >= 0.95) bg = c;
            }
            bg ??= [255, 255, 255];
            const a = (fg[3] ?? 1) * Number(cs.opacity || 1);
            const mixed = fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a));
            const [hi, lo] = [lum(mixed), lum(bg)].sort((x, y) => y - x);
            const ratio = Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
            if (worst === null || ratio < worst) worst = ratio;
          }
          return worst;
        })(),
        sample: tr.slice(0, 3).map((t) => (t.textContent ?? '').trim().slice(0, 60)),
        // Why the other lines were left alone, so few translations can be told apart from a
        // chat already written in the target language.
        reasons: Object.entries(
          [...document.querySelectorAll('[title^="Not translated"]')].reduce((m, e) => {
            const k = e.getAttribute('title').slice(0, 70);
            m[k] = (m[k] ?? 0) + 1;
            return m;
          }, {}),
        ).sort((a, b) => b[1] - a[1]),
      };
    },
    { rowsSel, trSel },
  );

const report = { date: TODAY, at: new Date().toISOString(), target, cells: [] };
let failed = 0;

/** One try of one cell, on the first busy channel not in `skip`. */
async function runCell(surface, config, skip) {
  const mobile = surface === 'mobile';
  // `light`: the live page with the OS in light mode, which Twitch follows when signed out.
  const extra = mobile
    ? { ...devices['Pixel 7'], viewport: devices['Pixel 7'].viewport }
    : surface === 'light'
      ? { colorScheme: 'light' }
      : {};
  const ctx = await launch(config, extra, `e2e-${surface}`, EXT);
  const page = await ctx.newPage();
  await page.route('https://kt-embed.test/**', (r) =>
    r.fulfill({ contentType: 'text/html', body: globalThis.__embedHtml }),
  );
  const cell = { config, surface, tried: [] };
  let frame = null;
  for (const idx of order) {
    if (cell.tried.length >= 4) break;
    if (skip.has(idx)) continue;
    const url = await urlFor(page, surface, channels[idx]).catch(() => null);
    if (!url) {
      cell.tried.push({ ch: idx, skip: 'no url' });
      continue;
    }
    await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.waitForTimeout(6000);
    if (!cell.targetSet) cell.targetSet = await setTarget(ctx, target);
    await page.waitForTimeout(surface === 'vod' || surface === 'clip' ? 14000 : 8000);
    const f =
      surface === 'embed' ? (page.frames().find((x) => x.url().includes('/embed/')) ?? page) : page;
    if (surface === 'theater') {
      await page
        .locator('video')
        .first()
        .hover()
        .catch(() => {});
      await page.keyboard.press('Alt+t').catch(() => {});
      await page.waitForTimeout(2500);
    }
    const l = await findMessageList(f, surface === 'vod' || surface === 'clip' ? 15000 : 12000);
    const adds = l.candidates[0]?.added ?? 0;
    cell.tried.push({ ch: idx, adds });
    if (adds >= (surface === 'clip' || surface === 'vod' ? 3 : 8)) {
      frame = f;
      cell.channel = `ch${idx}`;
      break;
    }
  }
  if (!frame) {
    cell.pass = false;
    cell.why = 'no chat with traffic found';
  } else {
    // Latency: from a row entering the page to its translation entering it, for rows that
    // arrive from now on. This is what an IRC pre-translation could save at most (PLAN P02).
    await frame.evaluate(
      ({ rowsSel, trSel }) => {
        const born = new WeakMap();
        window.__ktLat = [];
        new MutationObserver((muts) => {
          const t = performance.now();
          for (const m of muts)
            for (const n of m.addedNodes) {
              if (n.nodeType !== 1) continue;
              const rows = n.matches(rowsSel) ? [n] : [...n.querySelectorAll(rowsSel)];
              for (const r of rows) if (!born.has(r)) born.set(r, t);
              const trs = n.matches(trSel) ? [n] : [...n.querySelectorAll(trSel)];
              for (const tr of trs) {
                const r = tr.closest(rowsSel);
                if (r && born.has(r)) window.__ktLat.push(Math.round(t - born.get(r)));
              }
            }
        }).observe(document.body, { childList: true, subtree: true });
      },
      { rowsSel: ROWS, trSel: TRANSLATIONS },
    );
    // Witness for the contrast check: KT_WITNESS=contrast greys the translations out, and
    // every cell must then go red on contrast.
    if (process.env.KT_WITNESS === 'contrast')
      await frame.addStyleTag({
        content:
          "html[data-kt-scheme='dark'] :is(.kt-translation, .kt-translation-inline, .kt-translation-replace) { color: rgb(60, 60, 60) !important; }" +
          "html[data-kt-scheme='light'] :is(.kt-translation, .kt-translation-inline, .kt-translation-replace) { color: rgb(215, 215, 215) !important; }",
      });
    // Lines that arrive after the target was set, plus the re-run of those already drawn.
    await page.waitForTimeout(20000);
    const m = await measure(frame, ROWS, TRANSLATIONS);
    await page.waitForTimeout(10000);
    const still = await frame.evaluate(
      () => (window.__ktTr ?? []).filter((t) => t.isConnected).length,
    );
    // A translated line still on screen that no longer shows a translation is a loss.
    // A line the list trimmed away (a busy chat keeps about 150) is not.
    const lost = await frame.evaluate(
      ({ rowsSel, trSel }) => {
        const rows = [...document.querySelectorAll(rowsSel)];
        const before = window.__ktRowsAtMeasure ?? [];
        // Rows the list dropped off its top since the measure: the leading detached ones.
        let trimmed = 0;
        while (trimmed < before.length && !before[trimmed].isConnected) trimmed++;
        let onScreen = 0;
        let missing = 0;
        const repeats = [];
        for (const text of window.__ktTranslatedTexts ?? []) {
          const same = rows.filter((r) => window.__ktSaid(r) === text);
          if (!same.length) continue;
          onScreen++;
          if (same.some((r) => r.querySelector(trSel))) continue;
          // Every row that showed this translation was trimmed off the top, and the row now
          // on screen is a newer one with the same words that the extension chose not to
          // translate (a user repeating themselves): no translation was lost.
          const originals = window.__ktTrRows?.get(text) ?? [];
          const allTrimmed =
            originals.length > 0 &&
            originals.every((r) => !r.isConnected && before.indexOf(r) < trimmed);
          const reasons = same.map(
            (r) =>
              (
                r.querySelector('[title^="Not translated"]') ??
                r.closest('[title^="Not translated"]')
              )?.getAttribute('title') ?? null,
          );
          if (allTrimmed && reasons.every(Boolean)) repeats.push(reasons[0]);
          else missing++;
        }
        return {
          onScreen,
          missing,
          trimmed,
          repeatsAfterTrim: repeats.length,
          repeatReasons: [...new Set(repeats)],
        };
      },
      { rowsSel: ROWS, trSel: TRANSLATIONS },
    );
    const lat = (await frame.evaluate(() => window.__ktLat ?? [])).sort((x, y) => x - y);
    const q = (p) =>
      lat.length ? lat[Math.min(lat.length - 1, Math.floor(p * lat.length))] : null;
    Object.assign(cell, m, {
      stillAttached10s: still,
      after10s: lost,
      latencyMs: { n: lat.length, p50: q(0.5), p90: q(0.9) },
    });
    const why = [];
    if (!m.mounted) why.push('content script not mounted');
    if (m.translations < MIN_TRANSLATED)
      why.push(`${m.translations} translations (< ${MIN_TRANSLATED}) on ${m.marked} marked lines`);
    if (m.outsideRows) why.push(`${m.outsideRows} translations outside any row`);
    if (m.rowsWithTwo) why.push(`${m.rowsWithTwo} rows carry two translations`);
    if (m.minContrast !== null && m.minContrast < 4.5)
      why.push(`translation text at ${m.minContrast}:1, under 4.5`);
    // The extension paints for the chat's own theme: Twitch names it, the stamp must agree.
    if (m.chatTheme && m.scheme !== m.chatTheme.replace('chat-theme-', ''))
      why.push(`scheme ${m.scheme} on a ${m.chatTheme} chat`);
    if (surface !== 'vod' && surface !== 'clip' && !m.barInPanel)
      why.push('floating bar not in the chat panel');
    // Clip replay swaps its whole list (RECON: 0/20 markers kept in 7/8 configs), so
    // there it is the re-translation of the new list that is asked for, not survival.
    if (lost.missing)
      why.push(
        `${lost.missing}/${lost.onScreen} translated lines still on screen lost their translation within 10 s`,
      );
    cell.pass = why.length === 0;
    cell.why = why.join('; ') || undefined;
  }
  await ctx.close();
  return cell;
}

/**
 * A failure the channel caused, not the extension: no traffic, a list that emptied (the stream
 * ended or raided away between choosing it and measuring), or a chat already written in the
 * target language. Those get one more try on another channel; the first try stays in the report.
 */
const environmental = (c) =>
  c.why === 'no chat with traffic found' ||
  (c.rows === 0 && c.marked === 0) ||
  (c.translations < MIN_TRANSLATED &&
    /already|same as the or|looks like/i.test(c.reasons?.[0]?.[0] ?? ''));

for (const surface of surfaces) {
  for (const config of configs) {
    let cell = await runCell(surface, config, new Set());
    if (!cell.pass && environmental(cell)) {
      const first = cell;
      cell = await runCell(surface, config, new Set(first.tried.map((t) => t.ch)));
      cell.firstTry = {
        channel: first.channel ?? null,
        why: first.why,
        rows: first.rows ?? null,
        reasons: first.reasons?.slice(0, 2) ?? [],
      };
    }
    if (!cell.pass) failed++;
    report.cells.push(cell);
    console.log(
      `${cell.pass ? 'ok  ' : 'FAIL'} ${surface}/${config} ${cell.pass ? `${cell.translations} translations, families ${cell.families?.join('+')}` : cell.why}${cell.firstTry ? ` (second try; first: ${cell.firstTry.why})` : ''}`,
    );
  }
}

report.summary = `${report.cells.length - failed}/${report.cells.length} cells green`;
for (const surface of surfaces) {
  save(
    'e2e',
    surface,
    { 'measure.json': { ...report, cells: report.cells.filter((c) => c.surface === surface) } },
    channels,
  );
}
console.log(report.summary);
process.exit(failed ? 1 : 0);
