/**
 * The Chrome Web Store small promo tile. The five screenshots come from
 * test/e2e/store-shots-fixture.mjs (fixture, invented names, no real viewer or channel).
 *
 *   node scripts/stores/store-images.mjs
 *
 * Writes store/chrome/images/promo-small.png at 440x280, checked after rendering.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '../../test/e2e/playwright.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'store/chrome/images');
fs.mkdirSync(OUT, { recursive: true });
const img = (f) => `data:image/png;base64,${fs.readFileSync(path.join(ROOT, 'screenshots', f)).toString('base64')}`;
const icon = `data:image/png;base64,${fs.readFileSync(path.join(ROOT, 'public/icons/icon128.png')).toString('base64')}`;

const css = `*{margin:0;box-sizing:border-box}body{background:#0e0e10;color:#efeff1;font:600 16px/1.35 system-ui,'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;gap:56px;overflow:hidden}
h1{font-size:44px;line-height:1.1;letter-spacing:-.5px;max-width:470px}h1 b{color:#bf94ff}p{margin-top:18px;color:#adadb8;font-weight:500;font-size:20px;max-width:440px}
.shot{border-radius:8px;outline:1px solid #2f2f35}.col{display:flex;flex-direction:column;gap:20px;align-items:flex-start}`;

const pages = {
  'promo-small.png': [440, 280, `<div class="col" style="align-items:center;gap:14px"><img src="${icon}" width="88" height="88"><h1 style="font-size:28px;text-align:center;max-width:380px">Twitch Chat <b>Translator</b></h1><p style="margin:0;font-size:15px;text-align:center">by Pkkls</p></div>`],
};

const browser = await chromium.launch();
let ok = 0;
for (const [name, [w, h, body]] of Object.entries(pages)) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><style>${css}body{width:${w}px;height:${h}px}</style>${body}`);
  await page.waitForTimeout(300);
  // Nothing may spill out of the frame: a cut screenshot is a rejected one.
  const spill = await page.evaluate(() => [...document.querySelectorAll('img,h1,p')].some((e) => { const r = e.getBoundingClientRect(); return r.left < 0 || r.top < 0 || r.right > innerWidth || r.bottom > innerHeight; }));
  const file = path.join(OUT, name);
  await page.screenshot({ path: file });
  const buf = fs.readFileSync(file);
  const size = [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  const good = size[0] === w && size[1] === h && !spill;
  console.log(`${good ? 'ok  ' : 'FAIL'} ${name} ${size.join('x')}${spill ? ' (content spills out)' : ''}`);
  if (good) ok++;
  await page.close();
}
await browser.close();
console.log(`${ok}/${Object.keys(pages).length}`);
process.exit(ok === Object.keys(pages).length ? 0 : 1);
