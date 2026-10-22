// Runs surface.mjs for every config x surface, JOBS at a time, and writes RECON/matrix.json.
// Exit code = number of failed cells, so a silent hole cannot look like a pass.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { CONFIGS, RECON, TODAY } from './lib.mjs';

const SURFACES = (process.env.SURFACES ?? 'live,popout,embed,vod,clip,theater,mobile,spa,hidden,light').split(',');
const ONLY = process.env.CONFIGS?.split(',');
const JOBS = Number(process.env.JOBS ?? 4);
const cells = Object.keys(CONFIGS).filter((c) => !ONLY || ONLY.includes(c)).flatMap((c) => SURFACES.map((s) => [c, s]));
const results = [];
const run = ([c, s]) =>
  new Promise((res) => {
    const p = spawn(process.execPath, [path.join(import.meta.dirname, 'surface.mjs'), c, s], { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (out += d));
    const t = setTimeout(() => p.kill(), 8 * 60 * 1000);
    p.on('close', (code) => {
      clearTimeout(t);
      results.push({ config: c, surface: s, code, line: out.trim().split('\n').slice(-3).join(' | ').slice(0, 400) });
      console.log(`[${results.length}/${cells.length}] ${c}/${s} exit=${code} ${out.trim().split('\n').pop()?.slice(0, 160)}`);
      res();
    });
  });
const queue = [...cells];
await Promise.all(Array.from({ length: JOBS }, async () => { while (queue.length) await run(queue.shift()); }));
const name = process.env.OUT ?? 'matrix.json';
writeFileSync(path.join(RECON, name), JSON.stringify({ date: TODAY, cells: results.sort((a, b) => (a.config + a.surface).localeCompare(b.config + b.surface)) }, null, 1));
const failed = results.filter((r) => r.code !== 0).length;
console.log(`done ${results.length - failed}/${results.length} ok`);
process.exit(failed);
