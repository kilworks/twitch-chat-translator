// K06 in a real Firefox, where a tab behind another really is hidden (Chromium under
// automation kept it visible with five methods). A live channel is opened with the extension,
// another tab is put in front for SECONDS, then the channel tab comes back. Measured: whether
// the page went hidden, the rows that arrived meanwhile, and how many of them still on screen
// carry a translation or a skip reason after the return, against the visible baseline.
//
//   node .agent/probes/hidden-ff.mjs <firefox build dir>
//
// Writes RECON/k06/firefox/measure.json. Exit 1 if the tab never went hidden (blind) or if
// fewer than 90% of the lines that arrived while hidden were dealt with after the return.
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT, TODAY, save } from './lib.mjs';

const FIREFOX = process.env.FIREFOX ?? 'C:\\Program Files\\Mozilla Firefox\\firefox.exe';
const SECONDS = Number(process.env.SECONDS ?? 60);
const product = process.argv[2];
const { channels, hot = [] } = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));

const profile = mkdtempSync(path.join(tmpdir(), 'kt-ff-hidden-'));
writeFileSync(path.join(profile, 'user.js'), ['browser.shell.checkDefaultBrowser', 'browser.aboutwelcome.enabled'].map((k) => `user_pref("${k}", false);`).join('\n'));
const port = 9800 + Math.floor(Math.random() * 100);
const ff = spawn(FIREFOX, ['-no-remote', '-headless', '-profile', profile, `--remote-debugging-port=${port}`], { stdio: 'ignore' });

let ws;
for (let i = 0; i < 40 && !ws; i++) {
  ws = await new Promise((ok) => {
    const s = new WebSocket(`ws://127.0.0.1:${port}/session`);
    s.addEventListener('open', () => ok(s));
    s.addEventListener('error', () => ok(undefined));
  });
  if (!ws) await new Promise((r) => setTimeout(r, 500));
}
let id = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(String(ev.data));
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id);
    pending.delete(m.id);
    m.type === 'error' ? p.ko(new Error(m.message)) : p.ok(m.result);
  }
});
const send = (method, params = {}) => new Promise((ok, ko) => { const n = ++id; pending.set(n, { ok, ko }); ws.send(JSON.stringify({ id: n, method, params })); });
const evalIn = async (context, expression) => JSON.parse((await send('script.evaluate', { expression, target: { context }, awaitPromise: true })).result.value);

const out = { date: TODAY, at: new Date().toISOString(), seconds: SECONDS };
try {
  await send('session.new', { capabilities: {} });
  await send('webExtension.install', { extensionData: { type: 'path', path: product } });
  const { context: chan } = await send('browsingContext.create', { type: 'tab', background: false });
  for (const idx of hot.slice(0, 3)) {
    await send('browsingContext.navigate', { context: chan, url: `https://www.twitch.tv/${channels[idx]}`, wait: 'interactive' }).catch(() => {});
    await new Promise((r) => setTimeout(r, 30000));
    const n = await evalIn(chan, `JSON.stringify(document.querySelectorAll('.chat-line__message').length)`);
    if (n >= 8) { out.channel = `ch${idx}`; break; }
  }
  // Instrument: every row arriving from now on, stamped hidden or visible.
  await evalIn(chan, `(() => {
    window.__k6 = { rows: [], vis: [document.visibilityState] };
    document.addEventListener('visibilitychange', () => window.__k6.vis.push(document.visibilityState));
    new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1)
      for (const r of n.matches('.chat-line__message') ? [n] : n.querySelectorAll('.chat-line__message')) window.__k6.rows.push({ r, hidden: document.hidden }); })
      .observe(document.body, { childList: true, subtree: true });
    return JSON.stringify(true);
  })()`);
  await new Promise((r) => setTimeout(r, 15000));
  const { context: other } = await send('browsingContext.create', { type: 'tab', background: false });
  await new Promise((r) => setTimeout(r, 2000));
  out.whileHidden = await evalIn(chan, `JSON.stringify(document.visibilityState)`);
  await new Promise((r) => setTimeout(r, SECONDS * 1000));
  await send('browsingContext.activate', { context: chan });
  await new Promise((r) => setTimeout(r, 15000));
  Object.assign(out, await evalIn(chan, `JSON.stringify((() => {
    const dealt = (r) => !!r.querySelector('.kt-translation, .kt-translation-inline, .kt-translation-replace, .kt-error')
      || (r.querySelector('.chat-line__message-container') ?? r).hasAttribute('title');
    const tally = (list) => { const on = list.filter((x) => x.r.isConnected && x.r.querySelector('[data-a-target="chat-message-text"]'));
      return { arrived: list.length, stillOnScreen: on.length, dealtWith: on.filter((x) => dealt(x.r)).length }; };
    return { transitions: window.__k6.vis, visibleRows: tally(window.__k6.rows.filter((x) => !x.hidden)), hiddenRows: tally(window.__k6.rows.filter((x) => x.hidden)), visibleNow: document.visibilityState };
  })())`));
  await send('browsingContext.close', { context: other }).catch(() => {});
} catch (e) {
  out.error = String(e.message ?? e);
} finally {
  ff.kill();
  await new Promise((r) => setTimeout(r, 1500));
  rmSync(profile, { recursive: true, force: true });
}
save('k06', 'firefox', { 'measure.json': out }, channels);
console.log(JSON.stringify(out));
const h = out.hiddenRows;
if (out.whileHidden !== 'hidden' || !h || h.stillOnScreen === 0) process.exit(1);
process.exit(h.dealtWith / h.stillOnScreen >= 0.9 ? 0 : 1);
