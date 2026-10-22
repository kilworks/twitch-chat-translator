// Measures chat activity (new message nodes in 12 s) on every drawn channel and stores the
// indices of the busy ones, busiest first, as `hot` in channels.json.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT, findMessageList } from './lib.mjs';

const file = path.join(ROOT, '.recon-profile', 'channels.json');
const data = JSON.parse(readFileSync(file, 'utf8'));
const heat = [];
const queue = [...data.channels.keys()];
await Promise.all(
  [0, 1, 2, 3].map(async (w) => {
    const ctx = await launch('native', {}, `heat${w}`);
    const page = await ctx.newPage();
    while (queue.length) {
      const i = queue.shift();
      await page.goto(`https://www.twitch.tv/popout/${data.channels[i]}/chat?popout=`, { waitUntil: 'domcontentloaded' }).catch(() => {});
      await page.waitForTimeout(5000);
      const l = await findMessageList(page, 12000).catch(() => ({ candidates: [] }));
      heat.push({ i, adds: l.candidates[0]?.added ?? 0 });
    }
    await ctx.close();
  }),
);
heat.sort((a, b) => b.adds - a.adds);
data.heat = heat;
data.hot = heat.filter((h) => h.adds >= 8).map((h) => h.i);
writeFileSync(file, JSON.stringify(data, null, 1));
console.log(`measured ${heat.length}, hot ${data.hot.length}, top adds ${heat.slice(0, 5).map((h) => h.adds).join(',')}`);
if (data.hot.length < 3) process.exit(1);
