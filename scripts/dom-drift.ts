/**
 * DOM drift gate: does every selector of the platform layer still find what it is for, in
 * the latest Twitch snapshots?
 *
 *   npx tsx scripts/dom-drift.ts [RECON dir, default .agent/RECON] [--fresh]
 *
 * `--fresh` (the weekly job) also fails a cell whose snapshot was not taken today, so a
 * probe that failed silently cannot let last week's file answer for it.
 *
 * Reads `<config>/<surface>/dom.html` written by `.agent/probes/surface.mjs` (run weekly by
 * .github/workflows/twitch-dom.yml) and, per DOM family, asks the real functions of
 * src/content/selectors.ts: a list holding rows, a row, its text, its author, its injection
 * target. A family with no snapshot at all fails too: a gate that read nothing must not pass.
 * Exit 1 on any failure.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { Window } from 'happy-dom';

const args = process.argv.slice(2);
const RECON = args.find((a) => !a.startsWith('--')) ?? '.agent/RECON';
const FRESH = args.includes('--fresh');
const TODAY = new Date().toISOString().slice(0, 10);
const win = new Window();
Object.assign(globalThis, { document: win.document, Node: win.Node, Element: win.Element, HTMLElement: win.HTMLElement });
const sel = await import('../src/content/selectors');

/** Cells each family must be found in: the configs and surfaces RECON says produce it. */
const FAMILIES: Record<string, string[]> = {
  native: ['native/live', 'bttv/live', 'ffz/live', 'bttv+ffz/live', 'native/popout', 'native/embed', '7tv/embed'],
  '7tv': ['7tv/live', '7tv+bttv/live', '7tv+ffz/live', 'all/live', '7tv/popout'],
  replay: ['native/vod', 'bttv/vod', 'native/clip'],
  '7tv replay': ['7tv/vod', 'all/vod'],
};

let failures = 0;
for (const [family, cells] of Object.entries(FAMILIES)) {
  for (const cell of cells) {
    const file = path.join(RECON, cell, 'dom.html');
    if (!existsSync(file)) {
      console.info(`FAIL ${family} ${cell}: no snapshot`);
      failures++;
      continue;
    }
    const measured = path.join(RECON, cell, 'measure.json');
    const date = existsSync(measured) ? (JSON.parse(readFileSync(measured, 'utf8')) as { date?: string }).date : undefined;
    if (FRESH && date !== TODAY) {
      console.info(`FAIL ${family} ${cell}: snapshot dated ${date ?? 'never'}, not ${TODAY}`);
      failures++;
      continue;
    }
    win.document.body.innerHTML = readFileSync(file, 'utf8');
    // Snapshots carry no layout: every candidate counts as shown.
    const list = sel.findChatContainer(win.document as unknown as Document);
    const rows = list ? sel.findAllRows(list) : [];
    const read = rows.map((r) => ({ text: sel.extractMessageText(r), user: sel.extractUsername(r), target: sel.pickInjectionTarget(r) }));
    const withText = read.filter((r) => r.text).length;
    const withUser = read.filter((r) => r.text && r.user).length;
    const inside = read.filter((r, i) => r.target !== rows[i] || rows[i]!.matches('.vod-message, .chat-line__message:not([data-a-target])')).length;
    const miss: string[] = [];
    if (!list) miss.push('no list');
    if (rows.length < 3) miss.push(`${rows.length} rows`);
    if (withText < Math.min(3, rows.length)) miss.push(`${withText} rows with text`);
    if (withUser < withText * 0.9) miss.push(`author on ${withUser}/${withText}`);
    if (inside < rows.length * 0.9) miss.push(`injection target on ${inside}/${rows.length}`);
    if (miss.length) failures++;
    console.info(`${miss.length ? 'FAIL' : 'ok  '} ${family.padEnd(10)} ${cell.padEnd(16)} rows ${rows.length}, text ${withText}, author ${withUser}${miss.length ? ` : ${miss.join(', ')}` : ''}`);
  }
}
console.info(`${Object.values(FAMILIES).flat().length - failures}/${Object.values(FAMILIES).flat().length} cells green`);
await win.happyDOM.close();
process.exit(failures ? 1 : 0);
