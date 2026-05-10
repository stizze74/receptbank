// Gemensam util för bulk-produktion av receptfiler.
// Tar receptdata, returnerar antal skrivna filer per modul.
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = dirname(fileURLToPath(import.meta.url)) + '/../..';

const yaml = (v) => {
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return JSON.stringify(v);
};

export function skrivReceptFil(mapp, slug, r) {
  const fm = ['---'];
  fm.push(`namn: ${yaml(r.namn)}`);
  fm.push(`status: ${r.status ?? 'skriven'}`);
  fm.push(`portioner: ${r.portioner ?? 2}`);
  if (r.n) {
    fm.push('narings_per_portion:');
    fm.push(`  netto_kh: ${r.n.netto_kh}`);
    fm.push(`  fett: ${r.n.fett}`);
    fm.push(`  protein: ${r.n.protein}`);
    fm.push(`  kcal: ${r.n.kcal}`);
  }
  if (r.tid) {
    fm.push('tid:');
    if (r.tid.prep_min !== undefined) fm.push(`  prep_min: ${r.tid.prep_min}`);
    if (r.tid.tillagning_min !== undefined) fm.push(`  tillagning_min: ${r.tid.tillagning_min}`);
    if (r.tid.total_min !== undefined) fm.push(`  total_min: ${r.tid.total_min}`);
  }
  if (r.jessica_tagg) fm.push(`jessica_tagg: ${r.jessica_tagg}`);
  if (r.forvantad_glukospaverkan) fm.push(`forvantad_glukospaverkan: ${r.forvantad_glukospaverkan}`);
  if (r.taggar?.length) fm.push(`taggar: [${r.taggar.map(yaml).join(', ')}]`);
  if (r.ingredienser?.length) {
    fm.push('ingredienser:');
    for (const i of r.ingredienser) {
      if (typeof i === 'string') fm.push(`  - ${yaml(i)}`);
      else {
        const parts = [];
        if (i.mangd !== undefined) parts.push(`mangd: ${typeof i.mangd === 'number' ? i.mangd : yaml(i.mangd)}`);
        if (i.enhet) parts.push(`enhet: ${yaml(i.enhet)}`);
        if (i.vara) parts.push(`vara: ${yaml(i.vara)}`);
        if (i.notering) parts.push(`notering: ${yaml(i.notering)}`);
        fm.push(`  - { ${parts.join(', ')} }`);
      }
    }
  }
  if (r.tillagning?.length) {
    fm.push('tillagning:');
    for (const s of r.tillagning) {
      if (typeof s === 'string') fm.push(`  - ${yaml(s)}`);
      else {
        const parts = [];
        if (s.namn) parts.push(`namn: ${yaml(s.namn)}`);
        if (s.text) parts.push(`text: ${yaml(s.text)}`);
        if (s.timer_min) parts.push(`timer_min: ${s.timer_min}`);
        fm.push(`  - { ${parts.join(', ')} }`);
      }
    }
  }
  if (r.tips?.length) {
    fm.push('tips:');
    for (const t of r.tips) fm.push(`  - ${yaml(t)}`);
  }
  if (r.inkop) fm.push(`inkop: ${yaml(r.inkop)}`);
  fm.push('testlogg: []');
  fm.push('---');
  fm.push('');
  fm.push(r.brod ?? '');
  fm.push('');

  const dir = join(ROT, 'content', mapp);
  mkdirSync(dir, { recursive: true });
  const fil = join(dir, `${slug}.md`);
  if (existsSync(fil)) {
    return { skipped: true, fil };
  }
  writeFileSync(fil, fm.join('\n'));
  return { written: true, fil };
}

export function existerandeSlugs(mapp) {
  const dir = join(ROT, 'content', mapp);
  if (!existsSync(dir)) return new Set();
  return new Set(readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')));
}

export function bulkSkriv(mapp, recept) {
  let written = 0, skipped = 0;
  const existing = existerandeSlugs(mapp);
  for (const r of recept) {
    if (existing.has(r.slug)) {
      skipped++;
      continue;
    }
    const result = skrivReceptFil(mapp, r.slug, r);
    if (result.written) written++;
    else skipped++;
  }
  return { written, skipped, total: recept.length };
}
