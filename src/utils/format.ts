import type { Ingrediens, IngrediensObj, Tillagning, TillagningObj } from '../content/config';

export function ingrediensTillStrang(ing: Ingrediens): string {
  if (typeof ing === 'string') return ing;
  const delar: string[] = [];
  if (ing.mangd !== undefined) delar.push(String(ing.mangd));
  if (ing.enhet) delar.push(ing.enhet);
  delar.push(ing.vara);
  let str = delar.join(' ').trim();
  if (ing.notering) str += ` (${ing.notering})`;
  return str;
}

export function ingrediensSomObj(ing: Ingrediens): IngrediensObj {
  if (typeof ing === 'string') {
    return { vara: ing };
  }
  return ing;
}

export function tillagningTillObj(steg: Tillagning): TillagningObj {
  if (typeof steg === 'string') return { text: steg };
  return steg;
}

export function tillagningTillText(steg: Tillagning): string {
  if (typeof steg === 'string') return steg;
  if (steg.namn) return `${steg.namn}: ${steg.text}`;
  return steg.text;
}

// ISO 8601 duration: PT#H#M
export function minutterTillIso(min: number | undefined): string | undefined {
  if (!min || min <= 0) return undefined;
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `PT${h}H${m}M`;
  if (h) return `PT${h}H`;
  return `PT${m}M`;
}

export function summeraTid(tid?: { prep_min?: number; tillagning_min?: number; total_min?: number }): number | undefined {
  if (!tid) return undefined;
  if (tid.total_min) return tid.total_min;
  const prep = tid.prep_min ?? 0;
  const till = tid.tillagning_min ?? 0;
  if (prep === 0 && till === 0) return undefined;
  return prep + till;
}

export function skalaIngrediens(ing: Ingrediens, faktor: number): Ingrediens {
  if (typeof ing === 'string') return ing;
  if (ing.mangd === undefined || typeof ing.mangd !== 'number') return ing;
  const skalad = ing.mangd * faktor;
  // avrunda till 2 decimaler eller heltal om jämnt
  const avrundad = Math.round(skalad * 100) / 100;
  return { ...ing, mangd: avrundad };
}

export function formaterMangd(mangd: number | string | undefined): string {
  if (mangd === undefined) return '';
  if (typeof mangd === 'string') return mangd;
  if (Number.isInteger(mangd)) return String(mangd);
  // Trim trailing zeros
  return parseFloat(mangd.toFixed(2)).toString();
}
