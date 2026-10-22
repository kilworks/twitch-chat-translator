/**
 * Lists the Kick commits made after the HEAD this port was copied from that
 * touch platform-independent files (the P09 rows of .agent/PARITY.json), and
 * prints the patch to apply here.
 *
 *   node scripts/upstream-diff.mjs --kick <path to the Kick repository> [--base <sha>] [--patch out.diff]
 *
 * Read only on the Kick side: the repository is cloned into a temporary
 * directory and every git command runs in that clone, never in the checkout.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const kick = opt('--kick') ?? process.env.KICK_REPO;
if (!kick) {
  console.error('usage: node scripts/upstream-diff.mjs --kick <path> [--base <sha>] [--patch out.diff]');
  process.exit(2);
}
const base =
  opt('--base') ?? /kick HEAD:\s*([0-9a-f]{40})/.exec(readFileSync('.agent/START.txt', 'utf8'))?.[1];
if (!base) {
  console.error('no base: .agent/START.txt has no "kick HEAD:" line and --base was not given');
  process.exit(2);
}

const parity = JSON.parse(readFileSync('.agent/PARITY.json', 'utf8'));
const files = [
  ...new Set(
    parity.rows
      .filter((r) => r.plan === 'P09')
      .flatMap((r) => r.evidence ?? [])
      .filter((e) => e.startsWith('kick:'))
      .map((e) => e.slice(5).split('#')[0]),
  ),
].sort();
// A P09 set that came back empty would report "no upstream change" for nothing.
if (files.length === 0) {
  console.error('PARITY.json yields no P09 file: refusing to report an empty diff');
  process.exit(1);
}

const clone = mkdtempSync(path.join(tmpdir(), 'kick-upstream-'));
const git = (...a) => execFileSync('git', ['-C', clone, ...a], { encoding: 'utf8', maxBuffer: 64 << 20 });
try {
  execFileSync('git', ['clone', '--quiet', '--no-checkout', kick, clone]);
  const log = git('log', '--format=%H %s', `${base}..HEAD`, '--', ...files).trim();
  const commits = log ? log.split('\n') : [];
  console.log(`base ${base}, ${files.length} platform-independent files watched`);
  console.log(`${commits.length} upstream commit(s) touching them`);
  for (const c of commits) console.log(`  ${c}`);
  if (commits.length) {
    const patch = git('diff', `${base}..HEAD`, '--', ...files);
    const out = opt('--patch');
    if (out) {
      writeFileSync(out, patch);
      console.log(`patch written to ${out} (apply with: git apply ${out})`);
    } else process.stdout.write(patch);
  }
} finally {
  rmSync(clone, { recursive: true, force: true });
}
