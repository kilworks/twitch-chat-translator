// Fails (exit 1) when the parity matrix does not cover the inventory, or cites what does not exist.
// Checks, each printed as N/N:
//  1. every INVENTORY item has a PARITY row (key "<category>:<id>")
//  2. every row has a valid status, and "sans-objet" carries a justification
//  3. every row's plan id exists as a heading id in PLAN.md
//  4. every evidence path exists ("kick:<path>" in the Kick repo, otherwise relative to .agent/)
//  5. every chat row states the expected behaviour for all 8 configs
//  6. every CSS selector cited in PLAN.md (in backticks) appears in a RECON snapshot dated today
//     or in the run date recorded by START.txt
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const KICK = process.argv[2] ?? path.join(process.env.USERPROFILE ?? process.env.HOME, 'Downloads', 'kick-chat-translator');
const CONFIGS = ['native', '7tv', 'bttv', 'ffz', '7tv+bttv', '7tv+ffz', 'bttv+ffz', 'all'];
const STATUSES = new Set(['porte-tel-quel', 'adapte', 'remplace', 'sans-objet', 'twitch-only']);

const inv = JSON.parse(readFileSync(path.join(HERE, 'INVENTORY.json'), 'utf8')).categories;
const parity = JSON.parse(readFileSync(path.join(HERE, 'PARITY.json'), 'utf8'));
const plan = readFileSync(path.join(HERE, 'PLAN.md'), 'utf8');
const runDate = (readFileSync(path.join(HERE, 'START.txt'), 'utf8').match(/start: (\d{4}-\d{2}-\d{2})/) ?? [])[1];

const rows = new Map(parity.rows.map((r) => [r.key, r]));
const planIds = new Set([...plan.matchAll(/^#{2,4} .*?\[(P\d{2}|K\d{2})\]/gm)].map((m) => m[1]));
const fails = {};
const fail = (k, msg) => (fails[k] ??= []).push(msg);

// 1. coverage
const wanted = Object.entries(inv).flatMap(([cat, items]) => items.map((it) => `${cat}:${it.id}`));
const covered = wanted.filter((k) => rows.has(k));
for (const k of wanted) if (!rows.has(k)) fail('coverage', k);

// 2..5 per row
const all = [...parity.rows, ...(parity.twitchOnly ?? [])];
let statusOk = 0, planOk = 0, evOk = 0, evTotal = 0, chatRows = 0, chatOk = 0;
const evCache = new Map();
const evExists = (e) => {
  if (evCache.has(e)) return evCache.get(e);
  const p = e.startsWith('kick:') ? path.join(KICK, e.slice(5)) : path.join(HERE, e);
  const ok = existsSync(p);
  evCache.set(e, ok);
  return ok;
};
for (const r of all) {
  const st = STATUSES.has(r.status) && (r.status !== 'sans-objet' || (r.why ?? '').length > 10);
  st ? statusOk++ : fail('status', `${r.key}: ${r.status}`);
  planIds.has(r.plan) ? planOk++ : fail('plan', `${r.key}: ${r.plan}`);
  for (const e of r.evidence ?? []) {
    evTotal++;
    evExists(e) ? evOk++ : fail('evidence', `${r.key}: ${e}`);
  }
  if (!(r.evidence ?? []).length) fail('evidence', `${r.key}: none`);
  if (r.chat) {
    chatRows++;
    const ok = CONFIGS.every((c) => typeof r.configs?.[c] === 'string' && r.configs[c].length > 0);
    ok ? chatOk++ : fail('configs', r.key);
  }
}

// 6. selectors cited in PLAN.md must be seen in a RECON snapshot of the run date
const reconFiles = [];
const walk = (d) => { for (const n of readdirSync(d)) { const p = path.join(d, n); statSync(p).isDirectory() ? walk(p) : /\.(html|json)$/.test(n) && reconFiles.push(p); } };
walk(path.join(HERE, 'RECON'));
const dated = reconFiles.filter((f) => statSync(f).mtime.toISOString().slice(0, 10) >= runDate);
const corpus = dated.map((f) => readFileSync(f, 'utf8')).join('\n').replaceAll('\\"', '"');
const cited = [...new Set([...plan.matchAll(/`([^`\n]+)`/g)].map((m) => m[1]).filter((s) => !/[/\s]/.test(s) && !/\.(mjs|json|md|ts|png|html)$/.test(s) && /^(\[[\w-]+(=|\]))|^\.[\w-]+|^[a-z]+\[[\w-]+/.test(s)))];
const atoms = (sel) => [...sel.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]|\.([\w-]+)/g)].map((m) => (m[3] ? `class:${m[3]}` : m[2] !== undefined ? `${m[1]}="${m[2]}"` : `attr:${m[1]}`));
const seen = (a) => (a.startsWith('class:') ? corpus.includes(a.slice(6)) : a.startsWith('attr:') ? corpus.includes(a.slice(5)) : corpus.includes(a) || corpus.includes(a.replace(/^([\w-]+)="(.*)"$/, '"$1":"$2"')) || corpus.includes(a.replace(/^[\w-]+="(.*)"$/, '"$1"')));
let selOk = 0;
for (const s of cited) atoms(s).every(seen) ? selOk++ : fail('selectors', s);

const line = (k, a, b) => console.log(`${k.padEnd(34)} ${a}/${b}${a === b ? '' : '  FAIL'}`);
line('inventory items with a row', covered.length, wanted.length);
line('rows with valid status', statusOk, all.length);
line('rows whose plan id exists', planOk, all.length);
line('evidence paths that exist', evOk, evTotal);
line('chat rows covering 8 configs', chatOk, chatRows);
line('PLAN selectors seen in RECON', selOk, cited.length);
console.log(`twitch-only rows: ${(parity.twitchOnly ?? []).length}, recon files dated >= ${runDate}: ${dated.length}`);
for (const [k, v] of Object.entries(fails)) console.log(`  ${k}: ${v.length} failing, first: ${v.slice(0, 3).join(' | ')}`);
process.exit(Object.keys(fails).length ? 1 : 0);
