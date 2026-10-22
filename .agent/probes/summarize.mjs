// Reads every RECON/<config>/<surface>/measure.json and classifies it. A cell counts as a chat
// only if the list it found carries chat evidence (a role=log ancestor, chat-line markers, a
// 7TV/BTTV/FFZ chat container, or a VOD replay list), not merely because the probe exited 0.
// Writes RECON/SUMMARY.json and prints the grid.
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { RECON, CONFIGS, TODAY } from './lib.mjs';

const SURFACES = ['live', 'popout', 'embed', 'vod', 'clip', 'theater', 'mobile', 'spa', 'hidden', 'light', 'compose'];
const isChat = (m) => {
  const p = m.list?.candidates?.[0]?.path ?? '';
  const t = Object.keys(m.describe?.dataATarget ?? {});
  const c = Object.keys(m.describe?.classFreq ?? {});
  return /role="log"|chat-scrollable|chat-list|seventv-chat|video-chat/.test(p) || t.includes('chat-line-message') || c.some((k) => /^(seventv-message|chat-line__message|vod-message|video-chat__message)/.test(k));
};
const grid = {};
for (const config of Object.keys(CONFIGS)) {
  grid[config] = {};
  for (const s of SURFACES) {
    const f = path.join(RECON, config, s, 'measure.json');
    if (!existsSync(f)) { grid[config][s] = { status: 'missing' }; continue; }
    const m = JSON.parse(readFileSync(f, 'utf8'));
    if (s === 'compose') {
      grid[config][s] = { status: m.editors?.some((e) => e.visible) ? 'ok' : 'no-editor', slate: m.editors?.some((e) => e.attrs?.['data-slate-editor']), tabResult: m.afterTab?.editor?.text?.trim(), tabFocus: m.afterTab?.focusIn, cleared: m.afterClear?.text?.trim() === '' };
      continue;
    }
    if (m.found === false) { grid[config][s] = { status: 'no-list', tried: m.tried }; continue; }
    const d = m.describe ?? {};
    grid[config][s] = {
      status: isChat(m) ? 'chat' : 'not-chat',
      date: m.date,
      adds: m.list?.candidates?.[0]?.added,
      rows: d.rowCount,
      reused: m.list?.reusedNodes,
      rowSignature: Object.keys(d.rowTags ?? {})[0],
      topTargets: Object.keys(d.dataATarget ?? {}).slice(0, 6),
      extClasses: Object.keys(d.classFreq ?? {}).filter((k) => /^(seventv|bttv|ffz)/i.test(k)).slice(0, 12),
      markers: m.markers,
      injection: m.injection && `${m.injection.kept}/${m.injection.injected} kept, ${m.injection.rerendered} rerendered, ${m.injection.duplicates} dup`,
      composerSlate: m.composer?.some((e) => e.attrs?.['data-slate-editor']),
      background: m.background,
      listPathTail: (m.list?.candidates?.[0]?.path ?? '').split(' > ').slice(-2).join(' > ').slice(0, 220),
      ...(m.hidden ? { hidden: m.hidden } : {}),
      ...(m.spa ? { spa: m.spa } : {}),
    };
  }
}
const cells = Object.values(grid).flatMap((r) => Object.values(r));
const count = (st) => cells.filter((c) => c.status === st).length;
const summary = { date: TODAY, cells: cells.length, chat: count('chat'), ok: count('ok'), notChat: count('not-chat'), noList: count('no-list'), missing: count('missing'), grid };
writeFileSync(path.join(RECON, 'SUMMARY.json'), JSON.stringify(summary, null, 1));
console.log('config'.padEnd(10), SURFACES.map((s) => s.slice(0, 7).padEnd(8)).join(''));
for (const [c, r] of Object.entries(grid)) console.log(c.padEnd(10), SURFACES.map((s) => (r[s].status ?? '?').slice(0, 7).padEnd(8)).join(''));
console.log(`chat ${summary.chat}, compose ok ${summary.ok}, not-chat ${summary.notChat}, no-list ${summary.noList}, missing ${summary.missing} / ${summary.cells}`);
