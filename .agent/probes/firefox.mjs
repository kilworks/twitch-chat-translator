// Firefox recon (PLAN P18): the same configs as the Chromium matrix, with the Firefox builds of
// 7TV, BTTV and FFZ from addons.mozilla.org and this extension's Firefox build, in a real
// Firefox driven over WebDriver BiDi (no Playwright: it cannot load extensions in Firefox).
//
//   node .agent/probes/firefox.mjs <path to this extension's Firefox build> [config,...]
//
// A fresh profile per config in the temp dir, started with -no-remote so a Firefox already
// open on the machine is never touched; only the process started here is stopped.
// Per config: which DOM family the chat is in, rows, whether the extension mounted, its
// translations and where they sit. Writes RECON/firefox/<config>/measure.json.
// Exit 1 when a config saw no chat at all: a blind cell is not a pass.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { CONFIGS, ROOT, TODAY, save } from './lib.mjs';

const FIREFOX = process.env.FIREFOX ?? 'C:\\Program Files\\Mozilla Firefox\\firefox.exe';
const product = process.argv[2];
const only = process.argv[3]?.split(',');
if (!product || !existsSync(path.join(product, 'manifest.json'))) {
  console.error('usage: node .agent/probes/firefox.mjs <firefox build dir> [configs]');
  process.exit(2);
}

// AMO identifiers of the three chat extensions (guid), resolved to their current file.
const AMO = { '7tv': 'moz-addon-prod@7tv.app', bttv: 'firefox@betterttv.net', ffz: 'frankerfacez@frankerfacez.com' };
const XPI_DIR = path.join(ROOT, '.recon-ext', 'firefox');
mkdirSync(XPI_DIR, { recursive: true });
const xpis = {};
for (const [name, guid] of Object.entries(AMO)) {
  const file = path.join(XPI_DIR, `${name}.xpi`);
  if (!existsSync(file)) {
    const meta = await (await fetch(`https://addons.mozilla.org/api/v5/addons/addon/${encodeURIComponent(guid)}/`)).json();
    const url = meta?.current_version?.file?.url;
    if (!url) throw new Error(`AMO has no file for ${name} (${guid})`);
    writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
    console.log(`fetched ${name} ${meta.current_version.version}`);
  }
  xpis[name] = file;
}

const { channels, hot = [] } = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const order = [...hot, ...channels.keys()].filter((v, i, a) => a.indexOf(v) === i);

/** Minimal WebDriver BiDi client: one command at a time is all this needs. */
async function bidi(port) {
  let ws;
  for (let i = 0; i < 40 && !ws; i++) {
    try {
      ws = await new Promise((ok, ko) => {
        const s = new WebSocket(`ws://127.0.0.1:${port}/session`);
        s.addEventListener('open', () => ok(s));
        s.addEventListener('error', ko);
      });
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  if (!ws) throw new Error('no BiDi endpoint');
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(String(ev.data));
    if (msg.id && pending.has(msg.id)) {
      const { ok, ko } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.type === 'error' ? ko(new Error(`${msg.error}: ${msg.message}`)) : ok(msg.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((ok, ko) => {
      const n = ++id;
      pending.set(n, { ok, ko });
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  return { send, close: () => ws.close() };
}

const MEASURE = `(async () => {
  const q = (s) => document.querySelectorAll(s).length;
  const ROWS = '.seventv-message, .chat-line__message, .vod-message';
  const TR = '.kt-translation, .kt-translation-inline, .kt-translation-replace';
  const tr = [...document.querySelectorAll(TR)];
  const per = new Map();
  for (const t of tr) { const r = t.closest(ROWS); if (r) per.set(r, (per.get(r) ?? 0) + 1); }
  return JSON.stringify({
    seventvList: q('main.seventv-chat-list'), nativeList: q('[data-test-selector="chat-scrollable-area__message-container"]'),
    nativeRows: q('.chat-line__message'), seventvRows: q('.seventv-message'), ffzRows: q('.chat-line__message[data-user]'),
    composerSlate: q('[data-a-target="chat-input"][data-slate-editor]'),
    ktMounted: document.documentElement.hasAttribute('data-kt-instance'), bar: q('#kt-floating-bar'),
    marked: q('[data-kt-id]'), translations: tr.length, outsideRows: tr.filter((t) => !t.closest(ROWS)).length,
    rowsWithTwo: [...per.values()].filter((n) => n > 1).length,
    // Why lines were left alone: the pipeline writes its reason as the target's title.
    reasons: Object.entries([...document.querySelectorAll('.chat-line__message-container[title], .seventv-chat-message-container[title], .chat-line__message[title]')]
      .map((e) => e.getAttribute('title').slice(0, 60))
      .reduce((m, t) => ((m[t] = (m[t] ?? 0) + 1), m), {})).sort((a, b) => b[1] - a[1]).slice(0, 6),
    errors: q('.kt-error'), loading: q('.kt-loading, [class*="kt-loading"]'), visibility: document.visibilityState,
    sampleText: [...document.querySelectorAll('[data-kt-id] [data-a-target="chat-message-text"], [data-kt-id] .text-token')].slice(-3).map((e) => e.textContent.slice(0, 40)),
  });
})()`;

const report = { date: TODAY, at: new Date().toISOString(), firefox: null, cells: [] };
let blind = 0;
for (const config of Object.keys(CONFIGS).filter((c) => !only || only.includes(c))) {
  const profile = mkdtempSync(path.join(tmpdir(), 'kt-ff-'));
  writeFileSync(
    path.join(profile, 'user.js'),
    [
      'user_pref("browser.shell.checkDefaultBrowser", false);',
      'user_pref("datareporting.policy.dataSubmissionEnabled", false);',
      'user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);',
      'user_pref("browser.aboutwelcome.enabled", false);',
      'user_pref("media.autoplay.default", 5);',
      'user_pref("intl.locale.requested", "en-US");',
    ].join('\n'),
  );
  const port = 9300 + Math.floor(Math.random() * 500);
  const ff = spawn(FIREFOX, ['-no-remote', '-headless', '-profile', profile, `--remote-debugging-port=${port}`], { stdio: 'ignore' });
  const cell = { config, tried: [] };
  try {
    const b = await bidi(port);
    const s = await b.send('session.new', { capabilities: {} });
    report.firefox ??= s.capabilities?.browserVersion ?? null;
    for (const name of CONFIGS[config]) await b.send('webExtension.install', { extensionData: { type: 'archivePath', path: xpis[name] } });
    await b.send('webExtension.install', { extensionData: { type: 'path', path: product } });
    // 7TV and BTTV open a welcome tab when installed; left in front, it hides the tab under
    // test, and a hidden tab is paused by design (pauseWhenHidden). Measured: 0 translations
    // and no skip reason in every 7TV or BTTV cell until the tab was brought to the front.
    await new Promise((r) => setTimeout(r, 4000));
    const { contexts } = await b.send('browsingContext.getTree', {});
    cell.tabsAfterInstall = contexts.length;
    cell.tabUrls = contexts.map((c) => c.url.replace(/^(\w+:\/\/[^/]+).*/, '$1'));
    // The welcome tab is an extension page and about:home is privileged: neither can be
    // driven without system access. A new tab opened in front is the one under test.
    const { context } = await b.send('browsingContext.create', { type: 'tab', background: false });
    const evaluate = async (expression) => {
      const r = await b.send('script.evaluate', { expression, target: { context }, awaitPromise: true });
      return JSON.parse(r.result.value);
    };
    for (const idx of order) {
      if (cell.tried.length >= 3) break;
      await b.send('browsingContext.navigate', { context, url: `https://www.twitch.tv/${channels[idx]}`, wait: 'interactive' }).catch(() => {});
      await new Promise((r) => setTimeout(r, 35000));
      const m = await evaluate(MEASURE);
      cell.tried.push({ ch: idx, rows: m.nativeRows + m.seventvRows });
      if (m.nativeRows + m.seventvRows >= 8) {
        Object.assign(cell, { channel: `ch${idx}`, ...m, family: m.seventvList ? '7tv' : m.nativeList ? 'native' : 'none' });
        break;
      }
    }
    b.close();
  } catch (e) {
    cell.error = String(e.message ?? e);
  } finally {
    ff.kill();
    await new Promise((r) => setTimeout(r, 1500));
    rmSync(profile, { recursive: true, force: true });
  }
  if (!cell.channel) blind++;
  report.cells.push(cell);
  console.log(`${config}: ${cell.channel ? `family ${cell.family}, rows ${cell.nativeRows + cell.seventvRows}, kt ${cell.ktMounted}, translations ${cell.translations}, outside ${cell.outsideRows}, double ${cell.rowsWithTwo}` : `no chat (${cell.error ?? JSON.stringify(cell.tried)})`}`);
}
save('firefox', 'live', { 'measure.json': report }, channels);
process.exit(blind ? 1 : 0);
