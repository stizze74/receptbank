import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const svg = readFileSync(new URL('../public/icon.svg', import.meta.url));

const sizes = [
  { size: 192, file: 'icon-192.png', purpose: 'any' },
  { size: 512, file: 'icon-512.png', purpose: 'any' },
];

for (const { size, file } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(new URL(`../public/${file}`, import.meta.url).pathname);
  console.log(`✓ ${file}`);
}

// Maskable: behöver 10% padding så hela motivet får plats inom safe zone
const maskableInner = Math.round(512 * 0.8);
await sharp(svg)
  .resize(maskableInner, maskableInner)
  .extend({
    top: Math.round((512 - maskableInner) / 2),
    bottom: Math.round((512 - maskableInner) / 2),
    left: Math.round((512 - maskableInner) / 2),
    right: Math.round((512 - maskableInner) / 2),
    background: '#3f6f3d',
  })
  .png()
  .toFile(new URL('../public/icon-maskable.png', import.meta.url).pathname);
console.log('✓ icon-maskable.png');

// Apple touch icon — 180x180 är standard
await sharp(svg)
  .resize(180, 180)
  .png()
  .toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);
console.log('✓ apple-touch-icon.png');
