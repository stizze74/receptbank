// Fixa middag-recept som har "Se modulrecepten" istället för faktiska ingredienser.
// Strategi: läs middags-receptets `notering` (slug-lista), hämta ingredienser från
// modul-recepten, skriv tillbaka middags-receptet med faktiska kombinerade ingredienser.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = dirname(fileURLToPath(import.meta.url)) + '/..';
const MIDDAGAR = join(ROT, 'content/middagar');
const MODULMAPPAR = ['baser', 'proteiner', 'saser', 'tillbehor', 'soppor'];

function laesFil(fil) {
  return readFileSync(fil, 'utf8');
}

function findReceptBySlug(slug) {
  for (const mapp of MODULMAPPAR) {
    const fil = join(ROT, 'content', mapp, `${slug}.md`);
    try {
      return { fil, content: readFileSync(fil, 'utf8'), modul: mapp };
    } catch {}
  }
  return null;
}

// Extraktion: hitta ingredienser-blocket i en md-fil och returnera raderna
function extraheraIngredienser(content) {
  const lines = content.split('\n');
  const inFm = lines.indexOf('---', 1);
  if (inFm < 0) return [];
  const fm = lines.slice(1, inFm);

  const startIdx = fm.findIndex((l) => l.trim() === 'ingredienser:');
  if (startIdx < 0) return [];

  // Plocka rader tills nästa key på top-level (utan inledande mellanslag) eller annan key på samma indent
  const result = [];
  for (let i = startIdx + 1; i < fm.length; i++) {
    const line = fm[i];
    if (/^\S/.test(line) && line.includes(':')) break; // ny top-level key
    if (line.trim() === '') continue;
    result.push(line);
  }
  return result;
}

// Extraktion: hitta noteringen i ingredienslistan som har "Se modulrecepten"
// och listan av modul-slugs
function findaModulReferenser(content) {
  const m = content.match(/notering:\s*['"]?([a-z0-9_,\s-]+)['"]?/);
  if (!m) return [];
  return m[1].split(',').map((s) => s.trim()).filter(Boolean);
}

// Replace ingredienser-block i middag-receptet
function ersattIngredienser(content, nyaRader) {
  const lines = content.split('\n');
  const inFm = lines.indexOf('---', 1);
  if (inFm < 0) return content;

  const startIdx = lines.findIndex((l, i) => i > 0 && i < inFm && l.trim() === 'ingredienser:');
  if (startIdx < 0) return content;

  let endIdx = startIdx + 1;
  while (endIdx < inFm) {
    const line = lines[endIdx];
    if (/^\S/.test(line) && line.includes(':')) break;
    endIdx++;
  }

  const before = lines.slice(0, startIdx + 1);
  const after = lines.slice(endIdx);
  return [...before, ...nyaRader, ...after].join('\n');
}

const middagFiler = readdirSync(MIDDAGAR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => join(MIDDAGAR, f));

let fixade = 0;
for (const fil of middagFiler) {
  const content = laesFil(fil);
  if (!content.includes('Se modulrecepten')) continue;

  const slugs = findaModulReferenser(content);
  if (slugs.length === 0) {
    console.log(`SKIP ${fil}: hittade inga modul-slugs i notering`);
    continue;
  }

  // Samla ingredienser från modulerna
  const allaIngred = [];
  for (const slug of slugs) {
    const recept = findReceptBySlug(slug);
    if (!recept) {
      console.log(`SKIP ${fil}: modul-recept ${slug} hittades inte`);
      continue;
    }
    if (recept.content.includes('status: noterad')) {
      // Köpt vara — referera bara
      const namnMatch = recept.content.match(/^namn:\s*['"]?(.*?)['"]?$/m);
      if (namnMatch) {
        allaIngred.push(`  - { vara: ${JSON.stringify(`Klick av ${namnMatch[1]}`)}, mangd: 1, enhet: msk }`);
      }
      continue;
    }
    const ingred = extraheraIngredienser(recept.content);
    allaIngred.push(...ingred);
  }

  if (allaIngred.length === 0) {
    console.log(`SKIP ${fil}: inga ingredienser hittade`);
    continue;
  }

  const nyContent = ersattIngredienser(content, allaIngred);
  writeFileSync(fil, nyContent);
  fixade++;
  console.log(`FIX ${fil.split('/').pop()}: ${allaIngred.length} rader (från ${slugs.join(', ')})`);
}

console.log(`\nKlart. Fixade ${fixade} middags-recept.`);
