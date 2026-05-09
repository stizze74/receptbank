export interface Narings {
  netto_kh: number;
  fett: number;
  protein: number;
  kcal: number;
}

export function summeraNarings(...n: (Narings | undefined)[]): Narings | undefined {
  const list = n.filter((x): x is Narings => !!x);
  if (list.length === 0) return undefined;
  return list.reduce(
    (acc, cur) => ({
      netto_kh: acc.netto_kh + cur.netto_kh,
      fett: acc.fett + cur.fett,
      protein: acc.protein + cur.protein,
      kcal: acc.kcal + cur.kcal,
    }),
    { netto_kh: 0, fett: 0, protein: 0, kcal: 0 } as Narings,
  );
}

export function skalaNarings(n: Narings | undefined, faktor: number): Narings | undefined {
  if (!n) return undefined;
  return {
    netto_kh: round(n.netto_kh * faktor),
    fett: round(n.fett * faktor),
    protein: round(n.protein * faktor),
    kcal: Math.round(n.kcal * faktor),
  };
}

const round = (x: number) => Math.round(x * 10) / 10;

export function narFarg(n: Narings | undefined): string {
  if (!n) return 'text-bas-700';
  if (n.netto_kh <= 5) return 'text-emerald-700';
  if (n.netto_kh <= 10) return 'text-amber-700';
  return 'text-red-700';
}
