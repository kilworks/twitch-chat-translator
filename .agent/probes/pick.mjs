// Draws recon channels at random from the live Twitch directory, at run time.
// Writes the logins to .recon-profile/channels.json (gitignored): no channel name is tracked.
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT } from './lib.mjs';

const N = Number(process.argv[2] ?? 30);
const ctx = await launch('native');
const page = await ctx.newPage();
const logins = new Map();
for (const url of ['https://www.twitch.tv/directory/all', 'https://www.twitch.tv/directory/all?sort=VIEWER_COUNT']) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
  }
  // A channel link is a one-segment path; viewer counts sit in the same card.
  const found = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')]
      .map((a) => new URL(a.href, location.href))
      .filter((u) => u.host === 'www.twitch.tv' && /^\/[a-z0-9_]{3,25}$/i.test(u.pathname))
      .map((u) => u.pathname.slice(1).toLowerCase()),
  );
  for (const l of found) logins.set(l, (logins.get(l) ?? 0) + 1);
}
await ctx.close();
const reserved = new Set(['directory', 'videos', 'search', 'downloads', 'jobs', 'turbo', 'settings', 'subscriptions', 'inventory', 'wallet', 'drops', 'p', 'store', 'prime']);
const pool = [...logins.keys()].filter((l) => !reserved.has(l));
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}
const out = path.join(ROOT, '.recon-profile', 'channels.json');
mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ drawnAt: new Date().toISOString(), poolSize: logins.size, channels: pool.slice(0, N) }, null, 1));
console.log(`pool ${pool.length}, kept ${Math.min(N, pool.length)}`);
if (pool.length < 10) process.exit(1);
