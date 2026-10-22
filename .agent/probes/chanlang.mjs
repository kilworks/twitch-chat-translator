// PLAN P05: does the built extension get the channel language from GQL on live pages?
// twitchApi.ts stores `kt.lastlang.<channel>` only when GQL answered with a language, so the
// key's presence after a page load is the proof, read back through the extension's worker.
// Fails when no channel was opened: a probe that looked at nothing proves nothing.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT, save } from './lib.mjs';

const EXT = process.env.KT_EXT ?? path.join(ROOT, 'dist');
const { channels, hot = [] } = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const ctx = await launch('native', {}, 'chanlang', EXT);
const page = await ctx.newPage();
const picked = process.env.N ? [...channels.keys()].slice(0, Number(process.env.N)) : hot.slice(0, 5);
for (const idx of picked) {
  await page.goto(`https://www.twitch.tv/${channels[idx]}`, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(15000);
}
const sw = ctx.serviceWorkers()[0] ?? (await ctx.waitForEvent('serviceworker', { timeout: 20000 }).catch(() => null));
const stored = sw ? await sw.evaluate(() => chrome.storage.local.get(null)) : {};
await ctx.close();
const cells = picked.map((idx) => ({ channel: `ch${idx}`, lang: stored[`kt.lastlang.${channels[idx].toLowerCase()}`] ?? null }));
const got = cells.filter((c) => c.lang).length;
save('lang', 'extension', { 'measure.json': { what: 'channel language stored by the extension after GQL answered (kt.lastlang.<channel>)', cells, got, of: cells.length } }, channels);
console.log(`${got}/${cells.length} channels got their language from GQL`, JSON.stringify(cells.map((c) => c.lang)));
process.exit(cells.length && got ? 0 : 1);
