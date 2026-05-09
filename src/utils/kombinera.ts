import type { CollectionEntry } from 'astro:content';
import type { Ingrediens, IngrediensObj, Tillagning } from '../content/config';
import { ingrediensSomObj } from './format';
import { summeraNarings, type Narings } from './narings';

type Modulrecept =
  | CollectionEntry<'baser'>
  | CollectionEntry<'proteiner'>
  | CollectionEntry<'saser'>
  | CollectionEntry<'tillbehor'>;

export interface KombineratRecept {
  delar: { etikett: string; namn: string; slug: string }[];
  portioner: number;
  ingredienser: IngrediensObj[];
  tillagning: { sektion: string; steg: Tillagning[] }[];
  narings: Narings | undefined;
  totalTid: number | undefined;
  jessicaTagg?: string;
  forvantadGlukos?: string;
  taggar: string[];
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replaceAll('å', 'a')
    .replaceAll('ä', 'a')
    .replaceAll('ö', 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const sammaVara = (a: IngrediensObj, b: IngrediensObj) => {
  if (a.vara.toLowerCase().trim() !== b.vara.toLowerCase().trim()) return false;
  if ((a.enhet ?? '').toLowerCase() !== (b.enhet ?? '').toLowerCase()) return false;
  return true;
};

const summeraIngredienser = (lista: Ingrediens[][]): IngrediensObj[] => {
  const objs = lista.flat().map((i) => ingrediensSomObj(i));
  const result: IngrediensObj[] = [];
  for (const ny of objs) {
    const existerande = result.find((r) => sammaVara(r, ny));
    if (
      existerande &&
      typeof existerande.mangd === 'number' &&
      typeof ny.mangd === 'number'
    ) {
      existerande.mangd = existerande.mangd + ny.mangd;
    } else {
      result.push({ ...ny });
    }
  }
  return result;
};

const etikettFor = (modul: string): string => {
  switch (modul) {
    case 'bas': return 'Bas';
    case 'protein': return 'Protein';
    case 'sas': return 'Sås';
    case 'tillbehor': return 'Tillbehör';
    default: return modul;
  }
};

export function kombinera(
  delar: Modulrecept[],
  portioner = 2,
): KombineratRecept {
  const filtrerade = delar.filter((d) => d.data.status !== 'planerad');
  const allaIngred = filtrerade.map((d) => d.data.ingredienser);
  const ingredienser = summeraIngredienser(allaIngred);

  const tillagning = filtrerade
    .filter((d) => d.data.tillagning.length > 0)
    .map((d) => ({
      sektion: `${etikettFor(d.data.modul)} — ${d.data.namn}`,
      steg: d.data.tillagning,
    }));

  const narings = summeraNarings(...filtrerade.map((d) => d.data.narings_per_portion));

  // Total tid = max(prep) + max(tillagning) — antagande: parallell tillagning, inte sekventiell
  const prepTider = filtrerade.map((d) => d.data.tid?.prep_min ?? 0);
  const tillTider = filtrerade.map((d) => d.data.tid?.tillagning_min ?? 0);
  const maxPrep = prepTider.length > 0 ? Math.max(...prepTider) : 0;
  const maxTill = tillTider.length > 0 ? Math.max(...tillTider) : 0;
  const totalTid = maxPrep + maxTill > 0 ? maxPrep + maxTill : undefined;

  const jessicaTagg = filtrerade.find((d) => d.data.jessica_tagg)?.data.jessica_tagg;
  const taggar = Array.from(
    new Set(filtrerade.flatMap((d) => d.data.taggar ?? [])),
  );

  // Pessimistisk glukospåverkan: värsta värdet vinner
  const glukosOrder = ['mycket-lag', 'lag', 'bevaka'];
  const glukosVarden = filtrerade
    .map((d) => d.data.forvantad_glukospaverkan)
    .filter((g): g is 'mycket-lag' | 'lag' | 'bevaka' => !!g && g !== '-');
  const forvantadGlukos = glukosVarden.length > 0
    ? glukosVarden.reduce((acc, cur) =>
        glukosOrder.indexOf(cur) > glukosOrder.indexOf(acc) ? cur : acc,
      )
    : undefined;

  return {
    delar: filtrerade.map((d) => ({
      etikett: etikettFor(d.data.modul),
      namn: d.data.namn,
      slug: d.id,
    })),
    portioner,
    ingredienser,
    tillagning,
    narings,
    totalTid,
    jessicaTagg,
    forvantadGlukos,
    taggar,
  };
}

export function genereraSlug(delar: Modulrecept[]): string {
  return delar.map((d) => slug(d.data.namn)).join('-');
}

export function genereraNamn(delar: Modulrecept[]): string {
  if (delar.length === 0) return 'Tom kombination';
  return delar.map((d) => d.data.namn).join(' + ');
}
