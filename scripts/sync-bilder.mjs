// Kopierar content/<modul>/bilder/* till public/bilder/<modul>/* vid build
// så Astro static-build inkluderar dem i dist.
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = dirname(fileURLToPath(import.meta.url)) + '/..';
const CONTENT = join(ROT, 'content');
const PUBLIC_BILDER = join(ROT, 'public', 'bilder');

const MODULER = [
  'baser', 'proteiner', 'saser', 'tillbehor', 'soppor', 'middagar',
  'snacks', 'drycker', 'efterratter', 'forratter', 'brod',
];

let kopierade = 0;
for (const modul of MODULER) {
  const src = join(CONTENT, modul, 'bilder');
  if (!existsSync(src)) continue;
  const dst = join(PUBLIC_BILDER, modul);
  mkdirSync(dst, { recursive: true });
  for (const fil of readdirSync(src)) {
    const srcFil = join(src, fil);
    if (!statSync(srcFil).isFile()) continue;
    if (fil.startsWith('.')) continue;
    copyFileSync(srcFil, join(dst, fil));
    kopierade++;
  }
}

console.log(`✓ sync-bilder: ${kopierade} bild(er) kopierade till public/bilder/`);
