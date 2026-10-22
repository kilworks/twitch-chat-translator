// Re-applies redact() to every text file already under RECON (files written before redaction
// covered all drawn logins). Prints how many files changed. Never prints a login.
import { readdirSync, readFileSync, statSync, writeFileSync, utimesSync } from 'node:fs';
import path from 'node:path';
import { RECON, redact } from './lib.mjs';

let scanned = 0, changed = 0;
const walk = (d) => {
  for (const n of readdirSync(d)) {
    const p = path.join(d, n);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(html|json|txt)$/.test(n)) continue;
    scanned++;
    const t = readFileSync(p, 'utf8');
    const r = redact(t);
    if (r !== t) {
      const { atime, mtime } = statSync(p);
      writeFileSync(p, r);
      utimesSync(p, atime, mtime); // keep the capture date: parity-check dates evidence by mtime
      changed++;
    }
  }
};
walk(RECON);
console.log(`scanned ${scanned}, changed ${changed}`);
