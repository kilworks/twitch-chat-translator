// Reads the Kick repository (read only) and writes .agent/INVENTORY.json: every item the
// Twitch port has to account for. Exit 1 when any category comes out empty, because an
// empty category means the parser broke, not that Kick has nothing there.
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KICK = process.argv[2] ?? join(process.env.USERPROFILE ?? process.env.HOME, 'Downloads', 'kick-chat-translator');
if (!existsSync(join(KICK, 'package.json'))) {
  console.error(`kick repo not found at ${KICK}`);
  process.exit(1);
}

const read = (p) => readFileSync(join(KICK, p), 'utf8');
const rel = (p) => relative(KICK, p).replaceAll('\\', '/');
function walk(dir, out = []) {
  const abs = join(KICK, dir);
  if (!existsSync(abs)) return out;
  for (const name of readdirSync(abs)) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.git')) continue;
    const p = join(abs, name);
    if (statSync(p).isDirectory()) walk(rel(p), out);
    else out.push(rel(p));
  }
  return out;
}
const all = (re, s, g = 1) => [...s.matchAll(re)].map((m) => m[g]);
const uniq = (a) => [...new Set(a)];
const block = (src, start, end) => {
  const i = src.indexOf(start);
  if (i < 0) return '';
  const j = src.indexOf(end, i + start.length);
  return src.slice(i, j < 0 ? undefined : j);
};

const inv = {};
const add = (cat, items) => (inv[cat] = items);

// Settings schema: top-level keys of SettingsSchema, with their zod spec line.
{
  const s = read('src/shared/settings.ts');
  const body = block(s, 'export const SettingsSchema = z.object({', '\n});');
  add('settings', [...body.matchAll(/^ {2}(\w+):\s*(.*)$/gm)].map((m) => ({ id: m[1], spec: m[2].trim() })));
}

// Storage keys outside the schema (kt.*), across all non-test sources.
{
  const files = walk('src').filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\./.test(f));
  add('storageKeys', uniq(files.flatMap((f) => all(/['`](kt\.[\w.]+(?:\.v\d+)?)['`.$]/g, read(f)))).sort().map((id) => ({ id })));
}

// Runtime messages, request and response unions.
{
  const s = read('src/shared/messages.ts');
  add('messages', uniq(all(/\|\s*\{\s*type:\s*'([\w.]+)'/g, s)).map((id) => ({ id })));
}

// Pipeline drop reasons and skip reasons, compose outcomes.
{
  const p = read('src/content/pipeline.ts');
  add('dropReasons', all(/^ {2}(\w+):\s*localised\(/gm, block(p, 'const DROP_REASON', '};')).map((id) => ({ id })));
  add('skipReasons', uniq(all(/localised\('(skip\w+)'/g, p)).map((id) => ({ id })));
  const c = read('src/content/composeLogic.ts');
  add('composeOutcomes', uniq(all(/\|\s*'([\w-]+)'/g, block(c, 'export type ComposeAction', ';'))).map((id) => ({ id })));
}

// Exports of every non-test module in content, background and shared.
{
  const files = walk('src').filter(
    (f) => /^src\/(content|background|shared)\//.test(f) && /\.(ts|tsx)$/.test(f) && !/\.test\./.test(f) && !/\/i18n\//.test(f),
  );
  add(
    'exports',
    files.flatMap((f) =>
      all(/^export\s+(?:async\s+)?(?:function|const|class|type|interface|enum|let)\s+(\w+)/gm, read(f)).map((n) => ({ id: `${f}#${n}` })),
    ),
  );
}

// Tests, gates, audits.
add('unitTests', walk('src').filter((f) => /\.test\.tsx?$/.test(f)).map((id) => ({ id })));
add('e2eGates', walk('test/e2e').filter((f) => f.endsWith('.mjs')).map((id) => ({ id })));
add('audits', walk('test/audits').filter((f) => f.endsWith('.py')).map((id) => ({ id })));

// Tooling.
add('npmScripts', Object.entries(JSON.parse(read('package.json')).scripts).map(([id, cmd]) => ({ id, cmd })));
add('workflows', walk('.github/workflows').map((id) => ({ id })));
add('skills', walk('.claude/skills').filter((f) => f.endsWith('SKILL.md')).map((id) => ({ id })));
add('scripts', walk('scripts').map((id) => ({ id })));
add('agentFiles', walk('.agent').filter((f) => !f.includes('/JOURNAL/')).map((id) => ({ id })));

// Locales.
{
  const s = read('src/shared/i18n.ts');
  const ui = all(/'([\w-]+)'/g, block(s, 'export const UI_LOCALES = [', ']'));
  add('uiLocales', ui.map((id) => ({ id })));
  add('storeLocales', readdirSync(join(KICK, 'public/_locales')).map((id) => ({ id })));
  add('sharedCatalogs', walk('src/shared/i18n').filter((f) => f.endsWith('.ts')).map((id) => ({ id })));
  add('chatCatalogs', walk('src/content/i18n').filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts')).map((id) => ({ id })));
  const keys = JSON.parse(read('src/shared/i18n/keys.json'));
  add('i18nKeys', (Array.isArray(keys) ? keys : Object.keys(keys)).map((k) => ({ id: typeof k === 'string' ? k : JSON.stringify(k) })));
}

// Manifest surface.
{
  const m = read('manifest.config.ts');
  const arr = (name) => all(/'([^']+)'/g, block(m, `${name}: [`, ']'));
  add('manifestPermissions', arr('permissions').map((id) => ({ id })));
  add('manifestHostPermissions', arr('host_permissions').map((id) => ({ id })));
  add('manifestMatches', arr('matches').map((id) => ({ id })));
  add('manifestCommands', uniq(all(/'([\w-]+)':\s*\{\s*suggested_key/g, m).concat(all(/^\s{6}'?([\w-]+)'?:\s*\{\s*$/gm, block(m, 'commands:', '\n  },')))).map((id) => ({ id })));
}

// Selectors: every string literal that looks like CSS in the DOM-facing modules, plus kt-* classes.
{
  const looksCss = (x) => /[#.\[]|^(div|span|button|img|textarea)\b/.test(x) && !/\s{2}|^\.\.?\//.test(x) && x.length < 200;
  const files = ['src/content/selectors.ts', 'src/content/composeUi.ts', 'src/content/platform.ts', 'src/content/langChip.ts', 'src/content/injector.ts'];
  add(
    'selectors',
    uniq(files.flatMap((f) => all(/'([^'\n]+)'/g, read(f)).filter(looksCss).map((x) => `${f}|${x}`))).map((id) => ({ id })),
  );
  add('cssClasses', uniq(all(/\.(kt-[\w-]+)/g, read('src/content/inject.css'))).sort().map((id) => ({ id })));
}

// UI surfaces.
add('popupFiles', walk('src/popup').filter((f) => /\.tsx$/.test(f) && !/\.test\./.test(f)).map((id) => ({ id })));
add('optionsFiles', walk('src/options').filter((f) => /\.tsx$/.test(f) && !/\.test\./.test(f)).map((id) => ({ id })));

// Promises made to users: README bullets and table rows, PRIVACY paragraphs and bullets.
{
  const lines = (p) => read(p).split(/\r?\n/);
  const claim = (l) => /^\s*([-*]|\d+\.)\s+\S/.test(l) || (/^\|/.test(l) && !/^\|[\s:-|]+\|$/.test(l));
  add('readmeClaims', lines('README.md').map((l, i) => ({ l, i })).filter(({ l }) => claim(l)).map(({ l, i }) => ({ id: `README.md:${i + 1}`, text: l.trim().slice(0, 160) })));
  add(
    'privacyClaims',
    lines('PRIVACY.md').map((l, i) => ({ l, i })).filter(({ l }) => claim(l) || (/^\S/.test(l) && !/^#/.test(l) && l.length > 40)).map(({ l, i }) => ({ id: `PRIVACY.md:${i + 1}`, text: l.trim().slice(0, 160) })),
  );
}

const empty = Object.entries(inv).filter(([, v]) => v.length === 0).map(([k]) => k);
const total = Object.values(inv).reduce((n, v) => n + v.length, 0);
writeFileSync(join(HERE, 'INVENTORY.json'), JSON.stringify({ source: 'kick-chat-translator', total, categories: inv }, null, 1));
for (const [k, v] of Object.entries(inv)) console.log(`${k.padEnd(24)} ${v.length}`);
console.log(`${'TOTAL'.padEnd(24)} ${total}`);
if (empty.length) {
  console.error(`EMPTY categories: ${empty.join(', ')}`);
  process.exit(1);
}
