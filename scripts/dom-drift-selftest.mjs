/**
 * Checks the `--failing=` list of scripts/dom-drift.ts without a browser: an empty RECON dir
 * must list all 17 cells and exit 1, nothing is written without the flag, and a snapshot
 * dated before today is red under --fresh even though its DOM is there.
 *
 *   node scripts/dom-drift-selftest.mjs
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const run = (recon, ...flags) =>
  spawnSync('npx', ['tsx', 'scripts/dom-drift.ts', recon, ...flags], { encoding: 'utf8', shell: process.platform === 'win32' });

const dir = mkdtempSync(path.join(tmpdir(), 'drift-'));
try {
  const list = path.join(dir, 'red.txt');
  const empty = path.join(dir, 'recon-empty');
  mkdirSync(empty);
  let r = run(empty, '--fresh', `--failing=${list}`);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  const red = readFileSync(list, 'utf8').trim().split('\n');
  assert.equal(red.length, 17, `${red.length} red cells`);
  for (const cell of ['native/live', '7tv+ffz/live', 'all/vod', 'native/clip']) assert.ok(red.includes(cell), `${cell} missing from ${red.join(',')}`);

  rmSync(list);
  run(empty, '--fresh');
  assert.equal(existsSync(list), false, 'a list was written without --failing');

  const stale = path.join(dir, 'recon-stale');
  mkdirSync(path.join(stale, 'native', 'live'), { recursive: true });
  writeFileSync(path.join(stale, 'native', 'live', 'dom.html'), '<div></div>');
  writeFileSync(path.join(stale, 'native', 'live', 'measure.json'), JSON.stringify({ date: '2000-01-01' }));
  r = run(stale, '--fresh', `--failing=${list}`);
  assert.match(r.stdout, /FAIL native\s+native\/live: snapshot dated 2000-01-01/);
  assert.ok(readFileSync(list, 'utf8').split('\n').includes('native/live'));
  console.log('dom-drift selftest ok');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
