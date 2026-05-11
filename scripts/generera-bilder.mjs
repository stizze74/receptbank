// Genererar AI-bilder för recept som saknar bild via Google Gemini API.
// Default: Gemini 2.5 Flash Image (Nano Banana). Stödjer även Imagen 4 Fast.
//
// Användning:
//   node scripts/generera-bilder.mjs --limit 5 --dry-run
//   node scripts/generera-bilder.mjs --modul middagar --limit 20
//   node scripts/generera-bilder.mjs --modell imagen --limit 1
//   node scripts/generera-bilder.mjs                              # alla saknade
//
// Krav: GEMINI_API_KEY i ~/.secrets eller env. Letar efter "Gemini:" eller "GEMINI_API_KEY=".

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import YAML from 'yaml';
import sharp from 'sharp';

const ROT = dirname(fileURLToPath(import.meta.url)) + '/..';
const MODULER = [
  'baser', 'proteiner', 'saser', 'tillbehor', 'soppor', 'middagar',
  'snacks', 'drycker', 'efterratter', 'forratter', 'brod',
  'frukost', 'sallader', 'forrad', 'grill', 'glass', 'festmat',
];

// ---- argparse ----
const args = process.argv.slice(2);
const flagga = (namn, defaultVal = null) => {
  const idx = args.indexOf(namn);
  if (idx < 0) return defaultVal;
  const nasta = args[idx + 1];
  if (!nasta || nasta.startsWith('--')) return true;
  return nasta;
};
const limit = Number(flagga('--limit', '0')) || Infinity;
const modulFilter = flagga('--modul', null);
const dryRun = !!flagga('--dry-run', false);
const modell = flagga('--modell', 'gemini'); // gemini | imagen
const delayMs = Number(flagga('--delay-ms', '1000'));
const startFrom = flagga('--start-from', null);

// ---- nyckel ----
function lasNyckel() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const secrets = join(homedir(), '.secrets');
  if (!existsSync(secrets)) throw new Error('Hittar inte ~/.secrets och GEMINI_API_KEY saknas i env.');
  const txt = readFileSync(secrets, 'utf8');
  for (const rad of txt.split('\n')) {
    const m = rad.match(/^\s*(?:GEMINI_API_KEY|Gemini)\s*[:=]\s*(\S+)/i);
    if (m) return m[1];
  }
  throw new Error('Hittar ingen "Gemini:" eller "GEMINI_API_KEY=" rad i ~/.secrets');
}
const KEY = lasNyckel();

// ---- frontmatter-extraktion via YAML-parser ----
function lasFm(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  if (lines[0] !== '---') return null;
  const slut = lines.indexOf('---', 1);
  if (slut < 0) return null;
  let data;
  try {
    data = YAML.parse(lines.slice(1, slut).join('\n')) ?? {};
  } catch (e) {
    return null;
  }
  return { lines, slut, content, data };
}

function huvudIngredienser(data, max = 3) {
  const arr = Array.isArray(data?.ingredienser) ? data.ingredienser : [];
  const res = [];
  for (const i of arr) {
    if (res.length >= max) break;
    let vara = null;
    if (typeof i === 'string') vara = i;
    else if (i && typeof i === 'object' && typeof i.vara === 'string') vara = i.vara;
    if (!vara) continue;
    if (vara.length > 60) continue;
    if (/^(salt|peppar|olivolja|smör|smor|vatten|svartpeppar|flingsalt)\b/i.test(vara.trim())) continue;
    res.push(vara.trim());
  }
  return res;
}

// ---- prompt-bygge ----
function byggPrompt(namn, ingredienser, taggar) {
  const ingredText = ingredienser.length > 0 ? `Featuring ${ingredienser.join(', ')}.` : '';
  const stilText = taggar.includes('asiatisk') || taggar.includes('thai') || taggar.includes('japansk')
    ? 'Subtle Asian-inspired styling.'
    : taggar.includes('italiensk') || taggar.includes('medelhav')
    ? 'Subtle Mediterranean styling.'
    : '';
  return `Realistic food photography of "${namn}". A Swedish low-carb (LCHF/keto) home-cooked dish. ${ingredText} ${stilText}
Overhead view on white ceramic plate, natural soft daylight from a window, shallow depth of field, minimalist styling, wood or linen background. Appetizing but realistic — like a good food blog photo, not an ad. No text, no logos, no people, no captions. Portrait 3:4 aspect.`;
}

// ---- API ----
async function genereraGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${KEY}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gemini ${resp.status}: ${t.slice(0, 300)}`);
  }
  const data = await resp.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    if (p.inlineData?.data && p.inlineData?.mimeType?.startsWith('image/')) {
      return { base64: p.inlineData.data, mime: p.inlineData.mimeType };
    }
  }
  throw new Error(`Inget bildsvar från Gemini. Svar: ${JSON.stringify(data).slice(0, 300)}`);
}

async function genereraImagen(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${KEY}`;
  const body = {
    instances: [{ prompt }],
    parameters: { sampleCount: 1, aspectRatio: '3:4', personGeneration: 'dont_allow' },
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Imagen ${resp.status}: ${t.slice(0, 300)}`);
  }
  const data = await resp.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`Inget bildsvar från Imagen. Svar: ${JSON.stringify(data).slice(0, 300)}`);
  return { base64: b64, mime: 'image/png' };
}

const generera = modell === 'imagen' ? genereraImagen : genereraGemini;

// ---- fil-skriv: centrerar-cropp till 3:4 (900×1200), JPG q85 ----
async function skrivBild(modul, slug, base64) {
  const raw = Buffer.from(base64, 'base64');
  const optimerad = await sharp(raw)
    .resize({ width: 900, height: 1200, fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
  const filnamn = `${slug}.jpg`;
  const srcDir = join(ROT, 'content', modul, 'bilder');
  mkdirSync(srcDir, { recursive: true });
  const filePath = join(srcDir, filnamn);
  writeFileSync(filePath, optimerad);
  return { filnamn, filePath, bytes: optimerad.length };
}

function uppdateraFm(filePath, lines, slut, filnamn, altText) {
  // Insert before line at index `slut` (the closing ---)
  const nya = [
    `bild: "${filnamn}"`,
    `bild_alt: "${altText.replace(/"/g, "'")}"`,
    `bild_ai: true`,
  ];
  const fore = lines.slice(0, slut);
  const efter = lines.slice(slut);
  const nyContent = [...fore, ...nya, ...efter].join('\n');
  writeFileSync(filePath, nyContent);
}

// ---- huvudloop ----
function samlaRecept() {
  const recept = [];
  const moduler = modulFilter ? [modulFilter] : MODULER;
  for (const modul of moduler) {
    const dir = join(ROT, 'content', modul);
    if (!existsSync(dir)) continue;
    for (const fil of readdirSync(dir).sort()) {
      if (!fil.endsWith('.md')) continue;
      const filePath = join(dir, fil);
      if (!statSync(filePath).isFile()) continue;
      const slug = fil.replace(/\.md$/, '');
      const fm = lasFm(filePath);
      if (!fm) continue;
      if (fm.data.bild) continue;
      if (fm.data.status === 'noterad') continue; // köpta genvägar — skip
      const namn = fm.data.namn;
      if (!namn) continue;
      const ingred = huvudIngredienser(fm.data);
      const taggar = Array.isArray(fm.data.taggar) ? fm.data.taggar : [];
      recept.push({ modul, slug, filePath, fm, namn, ingred, taggar });
    }
  }
  return recept;
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function main() {
  console.log(`Modell: ${modell}, dry-run: ${dryRun}, modul-filter: ${modulFilter ?? '(alla)'}, limit: ${limit === Infinity ? 'inga' : limit}`);
  const recept = samlaRecept();
  console.log(`Hittade ${recept.length} recept utan bild.`);

  let kor = recept;
  if (startFrom) {
    const idx = recept.findIndex((r) => r.slug === startFrom);
    if (idx >= 0) kor = recept.slice(idx);
  }
  if (limit < kor.length) kor = kor.slice(0, limit);

  console.log(`Kör på ${kor.length} st (delay ${delayMs}ms mellan anrop).\n`);

  let ok = 0, fel = 0;
  const failed = [];
  for (let i = 0; i < kor.length; i++) {
    const r = kor[i];
    const prefix = `[${i + 1}/${kor.length}] ${r.modul}/${r.slug}`;
    const prompt = byggPrompt(r.namn, r.ingred, r.taggar);

    if (dryRun) {
      console.log(`${prefix} → DRY-RUN — prompt:\n  ${prompt.replace(/\n/g, '\n  ').slice(0, 200)}…`);
      continue;
    }

    try {
      const t0 = Date.now();
      const { base64 } = await generera(prompt);
      const { filnamn, bytes } = await skrivBild(r.modul, r.slug, base64);
      const alt = `AI-bild: ${r.namn}`;
      uppdateraFm(r.filePath, r.fm.lines, r.fm.slut, filnamn, alt);
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`${prefix} ✓ ${filnamn} (${(bytes / 1024).toFixed(0)} KB, ${dt}s)`);
      ok++;
    } catch (e) {
      console.error(`${prefix} ✗ ${e.message}`);
      fel++;
      failed.push({ slug: r.slug, err: e.message });
    }

    if (i < kor.length - 1) await sleep(delayMs);
  }

  console.log(`\nKlart. Lyckade: ${ok}, fel: ${fel}.`);
  if (failed.length > 0) {
    console.log('\nFailade:');
    for (const f of failed) console.log(`  ${f.slug}: ${f.err}`);
  }
}

main().catch((e) => {
  console.error('Fatalt fel:', e);
  process.exit(1);
});
