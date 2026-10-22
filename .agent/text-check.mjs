// Text hygiene of what this port produced: no em or en dash, no drawn channel login.
//
// "Produced" = a file that does not exist in the Kick checkout or differs from it. Files copied
// from Kick unchanged (PLAN P09) keep their bytes, dashes included: rewriting them would stop
// the upstream patches of scripts/upstream-diff.mjs from applying. They are counted, not failed.
// Logins: every channel in .recon-profile/channels.json plus any extra channels.json given as an
// argument, searched in every file, produced or not. The owner's own channel is allowed.
//
//   node .agent/text-check.mjs [--kick <kick checkout>] [more/channels.json ...]
// Exit 1 when a produced file holds a dash or any file holds a drawn login.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const ki = argv.indexOf('--kick');
const KICK = ki >= 0 ? argv.splice(ki, 2)[1] : (process.env.KICK_REPO ?? join(process.env.USERPROFILE ?? process.env.HOME, 'Downloads', 'kick-chat-translator'));
if (!existsSync(join(KICK, 'package.json'))) {
  console.error(`kick checkout not found at ${KICK}`);
  process.exit(2);
}
const OWN = new Set(['gochujanglover']);
const lists = [join(ROOT, '.recon-profile', 'channels.json'), ...argv];
const logins = [...new Set(lists.filter(existsSync).flatMap((f) => JSON.parse(readFileSync(f, 'utf8')).channels))]
  .map((l) => l.toLowerCase())
  .filter((l) => !OWN.has(l));
if (!logins.length) {
  console.error('no drawn login to search for: a check that looks for nothing passes nothing');
  process.exit(2);
}
const loginRe = new RegExp(`(?<![a-z0-9_])(${logins.map((l) => l.replace(/[^a-z0-9_]/g, '')).join('|')})(?![a-z0-9_])`, 'gi');
const DASH = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`, 'g');
const BINARY = /\.(png|gif|jpe?g|webp|ico|zip|woff2?|ttf|mp4|webm)$/i;

const files = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && !BINARY.test(f) && existsSync(join(ROOT, f)));
let produced = 0;
const dashed = [];
const inherited = [];
const named = [];
for (const f of files) {
  const s = readFileSync(join(ROOT, f), 'utf8');
  const k = join(KICK, f);
  const isProduced = !existsSync(k) || readFileSync(k, 'utf8') !== s;
  if (isProduced) produced++;
  const d = (s.match(DASH) ?? []).length;
  if (d) (isProduced ? dashed : inherited).push(`${d} ${f}`);
  const n = (s.match(loginRe) ?? []).length;
  if (n) named.push(`${n} ${f}`);
}
console.log(`files ${files.length}, produced by the port ${produced}, drawn logins searched ${logins.length}`);
console.log(`produced files with a dash: ${dashed.length}`);
for (const l of dashed) console.log(`  ${l}`);
console.log(`Kick files kept byte-identical that carry dashes: ${inherited.length}`);
console.log(`files naming a drawn channel: ${named.length}`);
for (const l of named) console.log(`  ${l}`);
process.exit(dashed.length || named.length ? 1 : 0);
