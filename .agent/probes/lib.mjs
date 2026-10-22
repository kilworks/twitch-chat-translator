// Shared plumbing for the Twitch recon probes. No Twitch selector is hard-coded here:
// the message list is found by measurement (the node that receives the most children).
import path from 'node:path';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';

const KIT = process.env.UX_KIT ?? path.join(process.env.USERPROFILE ?? '', '.claude', 'ux-ui-agent-skills');
export const { chromium, devices } = await import(pathToFileURL(path.join(KIT, 'node_modules/playwright/index.mjs')).href);

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const RECON = path.join(ROOT, '.agent', 'RECON');
export const EXT = path.join(ROOT, '.recon-ext');
export const TODAY = new Date().toISOString().slice(0, 10);

export const CONFIGS = {
  native: [],
  '7tv': ['7tv'],
  bttv: ['bttv'],
  ffz: ['ffz'],
  '7tv+bttv': ['7tv', 'bttv'],
  '7tv+ffz': ['7tv', 'ffz'],
  'bttv+ffz': ['bttv', 'ffz'],
  all: ['7tv', 'bttv', 'ffz'],
};

export async function launch(config, extra = {}, cell = 'main') {
  const exts = CONFIGS[config].map((e) => path.join(EXT, e));
  const args = ['--mute-audio', '--autoplay-policy=user-gesture-required'];
  if (exts.length) args.push(`--disable-extensions-except=${exts.join(',')}`, `--load-extension=${exts.join(',')}`);
  // One profile per cell: parallel cells sharing a profile die on Chromium's profile lock.
  const dir = path.join(ROOT, '.recon-profile', `${config.replaceAll('+', '_')}__${cell}`);
  return chromium.launchPersistentContext(dir, {
    channel: 'chromium',
    headless: process.env.HEADED ? false : true,
    viewport: { width: 1600, height: 1000 },
    locale: 'en-US',
    colorScheme: 'dark',
    args,
    // Playwright keeps occluded/minimised pages 'visible' with these defaults; the hidden-tab probe needs them off.
    ignoreDefaultArgs: ['--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding', '--disable-background-timer-throttling'],
    ...extra,
  });
}

/** Every drawn channel login, so any of them (not only the one a probe chose) gets redacted. */
export function drawnLogins() {
  const f = path.join(ROOT, '.recon-profile', 'channels.json');
  return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')).channels : [];
}

/**
 * Replace every drawn channel login by <chN> (N = its index in the draw), and normalise en/em
 * dashes from captured third-party text to '-' so no produced file carries them.
 */
export function redact(text, _names) {
  let out = text.replace(new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`, 'g'), '-');
  for (const [i, n] of drawnLogins().entries()) {
    if (!n || n.length < 3) continue;
    out = out.replace(new RegExp(`(?<![a-z0-9_])${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z0-9_])`, 'gi'), `<ch${i}>`);
  }
  return out;
}

export function save(config, surface, files, names) {
  const dir = path.join(RECON, config, surface);
  mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    if (Buffer.isBuffer(content)) writeFileSync(path.join(dir, name), content);
    else writeFileSync(path.join(dir, name), redact(typeof content === 'string' ? content : JSON.stringify(content, null, 1), names));
  }
  return dir;
}

/**
 * Runs in the page. Watches childList mutations for `ms` and returns a description of the
 * node that received the most element children: that is the chat message list.
 */
export async function findMessageList(page, ms = 15000) {
  return page.evaluate(async (ms) => {
    const adds = new Map();
    const removedThenAdded = { n: 0 };
    const removed = new WeakSet();
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const n of m.removedNodes) if (n.nodeType === 1) removed.add(n);
        for (const n of m.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (removed.has(n)) removedThenAdded.n++;
          adds.set(m.target, (adds.get(m.target) ?? 0) + 1);
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    await new Promise((r) => setTimeout(r, ms));
    obs.disconnect();
    // Ignore the video player and tooltips: a chat list gets text-bearing children.
    const ranked = [...adds.entries()]
      .filter(([el]) => el.isConnected && el.children.length > 0 && (el.textContent ?? '').trim().length > 40)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const describe = (el) => {
      const parts = [];
      for (let e = el, d = 0; e && e !== document.body && d < 8; e = e.parentElement, d++) {
        let s = e.tagName.toLowerCase();
        if (e.id) s += `#${e.id}`;
        for (const a of ['role', 'data-a-target', 'data-test-selector', 'aria-label']) if (e.getAttribute(a)) s += `[${a}="${e.getAttribute(a)}"]`;
        const cls = [...e.classList].slice(0, 4).join('.');
        if (cls) s += `.${cls}`;
        parts.unshift(s);
      }
      return parts.join(' > ');
    };
    window.__ktList = ranked[0]?.[0] ?? null;
    return {
      windowMs: ms,
      reusedNodes: removedThenAdded.n,
      candidates: ranked.map(([el, n]) => ({ added: n, children: el.children.length, path: describe(el) })),
    };
  }, ms);
}

/** Runs in the page on window.__ktList: attribute and class statistics plus row samples. */
export async function describeList(page, sample = 12) {
  return page.evaluate((sample) => {
    const list = window.__ktList;
    if (!list || !list.isConnected) return { found: false };
    const rows = [...list.children];
    const freq = (arr) => Object.fromEntries([...arr.reduce((m, k) => m.set(k, (m.get(k) ?? 0) + 1), new Map())].sort((a, b) => b[1] - a[1]).slice(0, 80));
    const all = [list, ...list.querySelectorAll('*')];
    const classes = all.flatMap((e) => [...e.classList]);
    const targets = all.map((e) => e.getAttribute('data-a-target')).filter(Boolean);
    const testSel = all.map((e) => e.getAttribute('data-test-selector')).filter(Boolean);
    const attrs = all.flatMap((e) => [...e.attributes].map((a) => a.name)).filter((n) => n !== 'class' && n !== 'style');
    const rowAttrs = rows.flatMap((r) => [...r.attributes].map((a) => `${a.name}${a.name.startsWith('data-') || a.name === 'role' ? '=' + a.value.slice(0, 40) : ''}`));
    const imgs = [...list.querySelectorAll('img')];
    return {
      found: true,
      rowCount: rows.length,
      rowTags: freq(rows.map((r) => r.tagName.toLowerCase() + '.' + [...r.classList].slice(0, 3).join('.'))),
      rowAttrs: freq(rowAttrs),
      classFreq: freq(classes),
      dataATarget: freq(targets),
      dataTestSelector: freq(testSel),
      attrNames: freq(attrs),
      emoteImgs: freq(imgs.map((i) => (i.getAttribute('src') ?? '').replace(/^https?:\/\/([^/]+)\/.*$/, '$1'))),
      emoteImgClasses: freq(imgs.flatMap((i) => [...i.classList])),
      textSamples: rows.slice(-sample).map((r) => r.innerText.replace(/\s+/g, ' ').slice(0, 200)),
      rowHtml: rows.slice(-sample).map((r) => r.outerHTML.slice(0, 6000)),
      listHtmlBytes: list.outerHTML.length,
    };
  }, sample);
}

/**
 * Injection survival: append a marker to the last N rows, wait, then count how many markers
 * are still attached, how many rows were re-rendered (marker gone, row kept), and duplicates.
 */
export async function injectionSurvival(page, n = 20, waitMs = 12000) {
  await page.evaluate((n) => {
    const rows = [...(window.__ktList?.children ?? [])].slice(-n);
    window.__ktProbeRows = rows;
    rows.forEach((r, i) => {
      const host = r;
      const d = document.createElement('div');
      d.setAttribute('data-kt-probe', String(i));
      d.textContent = `kt-probe-${i}`;
      host.appendChild(d);
    });
  }, n);
  await page.waitForTimeout(waitMs);
  return page.evaluate(() => {
    const rows = window.__ktProbeRows ?? [];
    let kept = 0, rerendered = 0, detachedRows = 0;
    rows.forEach((r, i) => {
      if (!r.isConnected) return void detachedRows++;
      if (r.querySelector(`[data-kt-probe="${i}"]`)) kept++;
      else rerendered++;
    });
    const markers = [...document.querySelectorAll('[data-kt-probe]')].map((m) => m.getAttribute('data-kt-probe'));
    const dup = markers.length - new Set(markers).size;
    return { injected: rows.length, kept, rerendered, detachedRows, duplicates: dup, note: 'marker appended as last child of the row element' };
  });
}

/** Composer: every editable element, its attributes and its ancestry. Read only. */
export async function describeComposer(page) {
  return page.evaluate(() => {
    const eds = [...document.querySelectorAll('[contenteditable="true"], textarea, input[type="text"]')];
    const anc = (e) => {
      const out = [];
      for (let p = e.parentElement, d = 0; p && d < 5; p = p.parentElement, d++) out.push(p.tagName.toLowerCase() + (p.getAttribute('data-a-target') ? `[data-a-target=${p.getAttribute('data-a-target')}]` : '') + '.' + [...p.classList].slice(0, 3).join('.'));
      return out;
    };
    return eds.map((e) => ({
      tag: e.tagName.toLowerCase(),
      attrs: Object.fromEntries([...e.attributes].map((a) => [a.name, a.value.slice(0, 80)])),
      ownProps: Object.keys(e).filter((k) => /^__|slate|react/i.test(k)).slice(0, 10),
      ancestry: anc(e),
      visible: !!(e.offsetWidth || e.offsetHeight),
    }));
  });
}

/** Elements carrying a marker of a third-party extension, counted by prefix. */
export async function extensionMarkers(page) {
  return page.evaluate(() => {
    const count = (re) => [...document.querySelectorAll('*')].filter((e) => [...e.classList].some((c) => re.test(c)) || re.test(e.tagName.toLowerCase()) || re.test(e.id)).length;
    return { seventv: count(/^seventv/i), bttv: count(/^bttv/i), ffz: count(/^ffz/i) };
  });
}

export async function chatBackground(page) {
  return page.evaluate(() => {
    const l = window.__ktList;
    for (let e = l; e; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor;
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c;
    }
    return null;
  });
}
