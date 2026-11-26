/**
 * Manual start on Twitch, on the real built extension: in manual mode a fresh channel stays silent, the chat tab
 * answers the popup's `start.state`, `start.set` (the message behind the popup's Resume button) starts it,
 * and the next line is translated. Auto mode is the control. Everything is served locally.
 *
 *   node test/e2e/manual-start.mjs
 */
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { chromium } from './playwright.mjs';
import { CHANNEL_ONE, nativeRow, routeTwitch, twitchPage } from './twitch-dom.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = process.env.KT_EXT ?? path.resolve(HERE, '../../dist');
if (!fs.existsSync(path.join(EXT, 'manifest.json'))) {
  console.error('dist/manifest.json missing. Run `npm run build` first.');
  process.exit(2);
}

const ROW = '.chat-line__message';
const LIST = '[data-test-selector="chat-scrollable-area__message-container"]';
const TR = '.kt-translation, .kt-translation-inline, .kt-translation-replace';
const rowHtml = (t) => nativeRow(t, 'viewer_one');

const results = [];
const check = (name, ok) => {
  results.push(ok);
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}`);
};

async function run(mode) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'tct-manual-'));
  const ctx = await chromium.launchPersistentContext(profile, {
    headless: false,
    viewport: { width: 1200, height: 800 },
    args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`, '--window-position=-2400,-2400', '--host-resolver-rules=MAP * ~NOTFOUND', '--no-first-run', '--no-default-browser-check'],
  });
  const out = {};
  try {
    await routeTwitch(ctx, { page: () => twitchPage(rowHtml('hola amigo que tal')), langIso: 'zh' });
    await ctx.route('**://translate.googleapis.com/**', (r) => {
      const q = r.request();
      const post = q.method() === 'POST';
      const lines = post ? new URLSearchParams(q.postData() ?? '').getAll('q') : [new URL(q.url()).searchParams.get('q') ?? ''];
      const body = post ? lines.map((l) => ['ZZTRADUIT:' + l, 'es']) : [lines.map((l) => ['ZZTRADUIT:' + l, l, null, null, 10]), null, 'es'];
      return r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
    });
    const sw = ctx.serviceWorkers()[0] ?? (await ctx.waitForEvent('serviceworker', { timeout: 20000 }));
    const id = new URL(sw.url()).host;
    const opt = await ctx.newPage();
    await opt.goto(`chrome-extension://${id}/src/options/index.html`);
    await opt.evaluate((m) => chrome.runtime.sendMessage(m), { type: 'settings.set', payload: { targetLang: 'en', ignoreEnglish: true, showFloatingBar: true, startMode: mode } });
    const ask = (type) =>
      opt.evaluate(async (type) => {
        const [t] = await chrome.tabs.query({ url: 'https://www.twitch.tv/*' });
        return chrome.tabs.sendMessage(t.id, { type });
      }, type);
    const shown = (p, text) =>
      p.evaluate(({ ROW, TR, text }) => [...document.querySelectorAll(ROW)].some((r) => r.textContent.includes(text) && r.querySelector(TR)?.textContent.includes('ZZTRADUIT')), { ROW, TR, text });
    const add = (p, t) => p.evaluate(({ LIST, html }) => document.querySelector(LIST).insertAdjacentHTML('beforeend', html), { LIST, html: rowHtml(t) });
    const page = await ctx.newPage();
    await page.goto(`https://www.twitch.tv/${CHANNEL_ONE}`, { waitUntil: 'domcontentloaded' });
    await page.bringToFront();
    await page.waitForTimeout(3000);
    await add(page, 'hola amigos como estan todos hoy');
    await page.waitForTimeout(5000);
    out.before = await shown(page, 'hola amigos como estan todos hoy');
    out.askBefore = (await ask('start.state'))?.waiting;
    out.set = (await ask('start.set'))?.waiting;
    out.askAfter = (await ask('start.state'))?.waiting;
    await add(page, 'buenas noches a todos los presentes');
    await page.waitForTimeout(6000);
    out.after = await shown(page, 'buenas noches a todos los presentes');
  } finally {
    await ctx.close().catch(() => undefined);
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
  }
  return out;
}

try {
  const man = await run('manual');
  const aut = await run('auto');
  check('manual: the tab says it is waiting', man.askBefore === true);
  check('manual: a line before the start is not translated', man.before === false);
  check('manual: start.set answers that it no longer waits', man.set === false && man.askAfter === false);
  check('manual: the next line is translated after start.set', man.after === true);
  check('auto control: not waiting, first line translated at once', aut.askBefore === false && aut.before === true);
} catch (e) {
  check(`no exception: ${String(e.stack ?? e).slice(0, 300)}`, false);
}
console.log(`${results.filter(Boolean).length}/${results.length}`);
process.exit(results.every(Boolean) ? 0 : 1);
