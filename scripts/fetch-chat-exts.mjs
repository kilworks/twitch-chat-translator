/**
 * Downloads the current 7TV, BTTV and FFZ builds from the Chrome Web Store and unpacks them
 * where the recon and e2e harnesses load them from (`.recon-ext/<name>`, gitignored).
 *
 *   node scripts/fetch-chat-exts.mjs [out dir, default .recon-ext]
 *
 * The weekly DOM drift job needs them: the three DOM families only exist with the
 * extensions loaded. Public store downloads, nothing signed in. Exit 1 if any one fails.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { verifyCrx3 } from './crx.mjs';

const OUT = process.argv[2] ?? '.recon-ext';
const IDS = {
  '7tv': 'ammjkodgmmoknidbanneddgankgfejfh',
  bttv: 'ajopnjidmegmdimjlfnijceegpefgped',
  ffz: 'fadndhdgpmmaapbmfcknlfgcflmmmieb',
};

let failed = 0;
for (const [name, id] of Object.entries(IDS)) {
  const url = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=130.0&acceptformat=crx2,crx3&x=id%3D${id}%26uc`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    // Signed by the key behind the id asked for, or it is not unpacked (see crx.mjs).
    const zip = verifyCrx3(buf, id);
    const dir = path.join(OUT, name);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const file = path.join(OUT, `${name}.zip`);
    writeFileSync(file, zip);
    // Windows ships bsdtar, which reads zip; a GNU tar earlier in PATH (Git Bash) does not.
    if (process.platform === 'win32') execFileSync(path.join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe'), ['-xf', file, '-C', dir]);
    else execFileSync('unzip', ['-q', '-o', file, '-d', dir]);
    const m = JSON.parse(readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
    console.log(`ok   ${name} ${m.version} (${zip.length} bytes)`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${name}: ${e.message}`);
  }
}
process.exit(failed ? 1 : 0);
