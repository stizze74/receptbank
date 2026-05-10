import type { CollectionEntry } from 'astro:content';

export const MODUL_MAPP: Record<string, string> = {
  bas: 'baser',
  protein: 'proteiner',
  sas: 'saser',
  tillbehor: 'tillbehor',
  soppa: 'soppor',
  middag: 'middagar',
  snack: 'snacks',
  dryck: 'drycker',
  efterratt: 'efterratter',
  forratt: 'forratter',
  brod: 'brod',
  frukost: 'frukost',
  sallad: 'sallader',
  forrad: 'forrad',
  grill: 'grill',
  glass: 'glass',
  festmat: 'festmat',
};

type AnyRecept =
  | CollectionEntry<'baser'>
  | CollectionEntry<'proteiner'>
  | CollectionEntry<'saser'>
  | CollectionEntry<'tillbehor'>
  | CollectionEntry<'soppor'>
  | CollectionEntry<'middagar'>
  | CollectionEntry<'snacks'>
  | CollectionEntry<'drycker'>
  | CollectionEntry<'efterratter'>
  | CollectionEntry<'forratter'>
  | CollectionEntry<'brod'>
  | CollectionEntry<'frukost'>
  | CollectionEntry<'sallader'>
  | CollectionEntry<'forrad'>
  | CollectionEntry<'grill'>
  | CollectionEntry<'glass'>
  | CollectionEntry<'festmat'>;

export function bildUrl(recept: AnyRecept): string | undefined {
  const fil = recept.data.bild;
  if (!fil) return undefined;
  // Tillåt absolut URL (om Stefan vill länka till extern bild)
  if (fil.startsWith('http://') || fil.startsWith('https://') || fil.startsWith('/')) {
    return fil;
  }
  const mapp = MODUL_MAPP[recept.data.modul] ?? recept.data.modul;
  return `/bilder/${mapp}/${fil}`;
}

export function bildAlt(recept: AnyRecept): string {
  return recept.data.bild_alt ?? recept.data.namn;
}
