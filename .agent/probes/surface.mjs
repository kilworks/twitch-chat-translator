// One recon pass: node surface.mjs <config> <surface>
// Surfaces: live, popout, embed, vod, clip, theater, mobile, spa, hidden, light.
// Saves dom.html, shot.png and measure.json under .agent/RECON/<config>/<surface>/.
// A pass that found no message list exits 1: a probe that saw nothing must not pass.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  launch, ROOT, TODAY, devices, save, findMessageList, describeList, injectionSurvival,
  describeComposer, extensionMarkers, chatBackground,
} from './lib.mjs';

const [config, surface] = process.argv.slice(2);
const { channels, hot = [] } = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
// Busiest channels first (measured by heat.mjs), then the rest of the draw.
const order = [...hot, ...channels.keys()].filter((v, i, a) => a.indexOf(v) === i);
const MIN_ADDS = Number(process.env.MIN_ADDS ?? 8);

const mobile = surface === 'mobile';
const ctx = await launch(config, mobile ? { ...devices['Pixel 7'], viewport: devices['Pixel 7'].viewport } : surface === 'light' ? { colorScheme: 'light' } : {}, surface);
const page = await ctx.newPage();
// Twitch embeds require an https parent; the host page is served by route, never by a real site.
await page.route('https://kt-embed.test/**', (r) => r.fulfill({ contentType: 'text/html', body: globalThis.__embedHtml }));

const urlFor = async (login, idx) => {
  switch (surface) {
    case 'popout': return `https://www.twitch.tv/popout/${login}/chat?popout=`;
    case 'embed':
      globalThis.__embedHtml = `<!doctype html><title>embed</title><iframe id="f" src="https://www.twitch.tv/embed/${login}/chat?parent=kt-embed.test" width="400" height="900"></iframe>`;
      return 'https://kt-embed.test/';
    case 'mobile': return `https://m.twitch.tv/${login}/chat`;
    case 'vod': {
      await page.goto(`https://www.twitch.tv/${login}/videos?filter=archives&sort=time`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(6000);
      const v = await page.evaluate(() => [...document.querySelectorAll('a[href*="/videos/"]')].map((a) => a.getAttribute('href')).find((h) => /\/videos\/\d+/.test(h)));
      return v ? new URL(v, 'https://www.twitch.tv').href : null;
    }
    case 'clip': {
      await page.goto(`https://www.twitch.tv/${login}/clips?filter=clips&range=7d`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(6000);
      const c = await page.evaluate(() => [...document.querySelectorAll('a[href*="/clip/"]')].map((a) => a.getAttribute('href'))[0]);
      return c ? new URL(c, 'https://www.twitch.tv').href : null;
    }
    default: return `https://www.twitch.tv/${login}`;
  }
};

const result = { date: TODAY, at: new Date().toISOString(), config, surface, tried: [] };
let chosen = null;
for (const idx of order) {
  const login = channels[idx];
  if (result.tried.length >= 6) break;
  const url = await urlFor(login, idx);
  if (!url) { result.tried.push({ ch: idx, skip: 'no url (no vod/clip)' }); continue; }
  await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(8000);
  let frame = page;
  if (surface === 'embed') frame = page.frames().find((f) => f.url().includes('/embed/')) ?? page;
  if (surface === 'theater') {
    // Theater mode hides the top navigation: its visible height before and after Alt+T is the proof.
    const geo = () => page.evaluate(() => {
      const r = (s) => { const b = document.querySelector(s)?.getBoundingClientRect(); return b ? { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) } : null; };
      return { video: r('video'), nav: r('nav'), theatreClass: [...document.querySelectorAll('[class*="theatre" i],[class*="theater" i]')].length };
    });
    const before = await geo();
    await page.locator('video').first().hover().catch(() => {});
    await page.keyboard.press('Alt+t').catch(() => {});
    await page.waitForTimeout(2500);
    result.theaterProof = { key: 'Alt+T', before, after: await geo() };
    if (process.env.FULLSHOT) await page.screenshot({ path: process.env.FULLSHOT });
  }
  if (surface === 'vod') await page.waitForTimeout(8000);
  const list = await findMessageList(frame, surface === 'vod' || surface === 'clip' ? 20000 : 15000);
  const top = list.candidates[0];
  result.tried.push({ ch: idx, adds: top?.added ?? 0 });
  if (top && top.added >= MIN_ADDS) { chosen = { idx, login, frame, list }; break; }
  if (surface === 'clip' && result.tried.length >= 3) break;
}

if (!chosen) {
  result.found = false;
  save(config, surface, { 'measure.json': result }, channels);
  console.log(`${config}/${surface}: NO message list (${JSON.stringify(result.tried)})`);
  await ctx.close();
  process.exit(1);
}

const { frame, list, idx } = chosen;
result.channel = `ch${idx}`;
result.list = list;
result.describe = await describeList(frame);
result.markers = await extensionMarkers(frame);
result.background = await chatBackground(frame);
result.composer = await describeComposer(frame);

if (surface === 'hidden') {
  // Minimise the window through CDP (a second tab in front does not hide a headless tab: measured
  // 'visible' on the first run), wait 30 s, restore. Does the list keep up, drop, or get replaced?
  const before = result.describe.rowCount;
  const cdp = await ctx.newCDPSession(page);
  const { windowId } = await cdp.send('Browser.getWindowForTarget');
  await frame.evaluate(() => { window.__ktVis = []; document.addEventListener('visibilitychange', () => window.__ktVis.push(document.visibilityState)); });
  await cdp.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'minimized' } });
  await page.waitForTimeout(2000);
  const hiddenState = await frame.evaluate(() => document.visibilityState);
  const rowsWhileHidden = await frame.evaluate(() => window.__ktList?.children.length ?? null);
  await page.waitForTimeout(28000);
  const rowsEndHidden = await frame.evaluate(() => window.__ktList?.children.length ?? null);
  await cdp.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'normal' } });
  await page.waitForTimeout(4000);
  result.hidden = {
    hiddenState, transitions: await frame.evaluate(() => window.__ktVis), rowsBefore: before, rowsWhileHidden, rowsEndHidden,
    after: await frame.evaluate(() => window.__ktList?.children.length ?? null), resumedList: await frame.evaluate(() => !!window.__ktList?.isConnected),
  };
  if (hiddenState !== 'hidden') { console.log(`${config}/hidden: window never became hidden`); process.exitCode = 1; }
}
if (surface === 'spa') {
  // In-app navigation to another channel without reload: is the list node replaced?
  const next = channels[(idx + 1) % channels.length];
  const marker = await frame.evaluate(() => (window.__ktKeep = window.__ktList, location.pathname));
  await frame.evaluate((n) => { history.pushState({}, '', `/${n}`); dispatchEvent(new PopStateEvent('popstate')); }, next);
  await page.waitForTimeout(10000);
  const list2 = await findMessageList(frame, 10000);
  result.spa = {
    from: marker === `/${channels[idx]}` ? 'ch' + idx : marker,
    to: `ch${(idx + 1) % channels.length}`,
    sameDocument: await frame.evaluate(() => typeof window.__ktKeep !== 'undefined'),
    oldListConnected: await frame.evaluate(() => !!window.__ktKeep?.isConnected),
    newListIsOld: await frame.evaluate(() => window.__ktKeep === window.__ktList),
    newList: list2.candidates[0] ?? null,
  };
}

result.injection = await injectionSurvival(frame);

const panelHtml = await frame.evaluate(() => {
  let e = window.__ktList;
  for (let d = 0; e?.parentElement && d < 6; d++) e = e.parentElement;
  return e ? e.outerHTML : '';
});
const shot = await page.screenshot({ type: 'png' });
const dir = save(config, surface, { 'measure.json': result, 'dom.html': panelHtml, 'shot.png': shot }, [chosen.login]);
console.log(`${config}/${surface}: ok ch${idx} adds=${list.candidates[0].added} rows=${result.describe.rowCount} inj kept=${result.injection.kept}/${result.injection.injected} -> ${path.relative(ROOT, dir)}`);
await ctx.close();
