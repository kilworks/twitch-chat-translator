// PLAN P02: can a native Twitch row give its IRC message id through React props, in the page's
// own (MAIN) world? Opens busy drawn channels with no chat extension, walks each row's fiber up
// to 12 levels and records the first prop that looks like a message id (a UUID under `id` of a
// `message` object). Fails when it read no row: a probe that saw nothing proves nothing.
import { findMessageList, launch, save } from './lib.mjs';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const { channels, hot = [] } = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const ctx = await launch('native', {}, 'reactid');
const page = await ctx.newPage();
const cells = [];
for (const idx of hot.slice(0, 3)) {
  await page.goto(`https://www.twitch.tv/${channels[idx]}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(8000);
  await findMessageList(page, 10000);
  await page.waitForTimeout(6000);
  const r = await page.evaluate(() => {
    const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const rows = [...document.querySelectorAll('.chat-line__message')];
    let withId = 0;
    const paths = {};
    for (const row of rows) {
      const key = Object.keys(row).find((k) => k.startsWith('__reactFiber$'));
      let f = key ? row[key] : null;
      for (let d = 0; f && d < 12; d++, f = f.return) {
        const p = f.memoizedProps;
        const id = p?.message?.id;
        if (typeof id === 'string' && UUID.test(id)) {
          withId++;
          paths[`depth ${d}: props.message.id`] = (paths[`depth ${d}: props.message.id`] ?? 0) + 1;
          break;
        }
      }
    }
    return { rows: rows.length, withId, paths };
  });
  cells.push({ channel: `ch${idx}`, ...r });
  console.log(`ch${idx}: ${r.withId}/${r.rows} native rows expose a message id`, JSON.stringify(r.paths));
}
await ctx.close();
const rows = cells.reduce((n, c) => n + c.rows, 0);
const withId = cells.reduce((n, c) => n + c.withId, 0);
save('native', 'reactid', { 'measure.json': { what: 'IRC message id readable from React props of native rows, MAIN world', cells, rows, withId } }, channels);
console.log(`${withId}/${rows}`);
process.exit(rows ? 0 : 1);
