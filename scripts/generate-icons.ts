import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const ICONS_DIR = resolve(ROOT, 'public/icons');
const SVG_PATH = resolve(ICONS_DIR, 'icon.svg');
const SIZES = [16, 32, 48, 128];

async function main(): Promise<void> {
  if (!existsSync(ICONS_DIR)) await mkdir(ICONS_DIR, { recursive: true });
  if (!existsSync(SVG_PATH)) {
    await writeFile(SVG_PATH, DEFAULT_SVG);
    console.info(`Wrote default ${SVG_PATH}`);
  }
  const svg = await readFile(SVG_PATH);
  for (const size of SIZES) {
    const out = resolve(ICONS_DIR, `icon${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(out);
    console.info(`Wrote ${out}`);
  }
}

const DEFAULT_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="24" fill="#A970FF"/>
  <rect x="28" y="28" width="72" height="22" rx="4" fill="#0E0E10"/>
  <rect x="53" y="28" width="22" height="74" rx="4" fill="#0E0E10"/>
</svg>
`;

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
