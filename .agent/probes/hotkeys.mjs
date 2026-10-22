// Which keyboard shortcuts Twitch itself answers on a channel page. For each candidate the page
// is reloaded, the player and body focused, the key pressed, and the page state compared before
// and after: video box, theatre/fullscreen classes, URL, open dialogs, mute and pause state.
// A changed field means Twitch uses the key and an extension command bound to it would steal it.
// Exit 1 when the control (Alt+T, known to toggle theatre mode, fact 8 of PLAN.md) shows no
// change: that would be a blind probe, not a finding.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT, TODAY, save } from './lib.mjs';

const KEYS = (process.argv[2] ?? 'Alt+t,Alt+w,Alt+Shift+t,Alt+Shift+w,Alt+Shift+y,Alt+Shift+u').split(',');
const data = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const login = data.channels[(data.hot ?? [0])[0]];
const ctx = await launch('native', {}, 'hotkeys');
const page = await ctx.newPage();

const state = () =>
  page.evaluate(() => {
    const v = document.querySelector('video');
    const r = v?.getBoundingClientRect();
    return {
      video: r ? `${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.x)},${Math.round(r.y)}` : null,
      theatre: document.querySelectorAll('[class*="theatre" i],[class*="theater" i]').length,
      fullscreen: !!document.fullscreenElement,
      url: location.pathname + location.search,
      dialogs: document.querySelectorAll('[role="dialog"], [aria-modal="true"]').length,
      muted: v?.muted ?? null,
      paused: v?.paused ?? null,
    };
  });

const rows = [];
let pagesBefore = ctx.pages().length;
// 'none' presses nothing: whatever changes there is the page settling, not a shortcut.
for (const key of ['none', 'Alt+t', ...KEYS.filter((k) => k !== 'Alt+t'), 'none']) {
  await page.goto(`https://www.twitch.tv/${login}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(12000);
  await page.mouse.click(5, 500).catch(() => {});
  const before = await state();
  pagesBefore = ctx.pages().length;
  if (key !== 'none') await page.keyboard.press(key);
  await page.waitForTimeout(1500);
  const after = await state();
  const changed = Object.keys(before).filter((k) => before[k] !== after[k]);
  if (ctx.pages().length !== pagesBefore) changed.push('newPage');
  rows.push({ key, changed, before, after });
  console.log(`${key}: ${changed.length ? changed.join(',') : 'no change'}`);
}
await ctx.close();
const noise = new Set(rows.filter((r) => r.key === 'none').flatMap((r) => r.changed));
for (const r of rows) r.beyondNoise = r.changed.filter((c) => !noise.has(c));
console.log(`noise: ${[...noise].join(',') || 'none'}`);
for (const r of rows) console.log(`${r.key}: beyond noise ${r.beyondNoise.join(',') || 'nothing'}`);
const control = rows.find((r) => r.key === 'Alt+t');
save('native', 'hotkeys', { 'measure.json': { date: TODAY, channel: 'hot[0]', rows } }, [login]);
if (!control?.beyondNoise.length) {
  console.error('control Alt+T changed nothing: probe blind');
  process.exit(1);
}
