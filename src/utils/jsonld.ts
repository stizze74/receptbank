import type { CollectionEntry } from 'astro:content';
import { ingrediensTillStrang, minutterTillIso, tillagningTillObj, summeraTid } from './format';

type AnyRecept =
  | CollectionEntry<'baser'>
  | CollectionEntry<'proteiner'>
  | CollectionEntry<'saser'>
  | CollectionEntry<'tillbehor'>
  | CollectionEntry<'soppor'>
  | CollectionEntry<'middagar'>;

export function recipeJsonLd(entry: AnyRecept, sitan: string): Record<string, unknown> {
  const d = entry.data;
  const url = new URL(`/recept/${entry.id}`, sitan).toString();

  const totalMin = summeraTid(d.tid);
  const prepIso = minutterTillIso(d.tid?.prep_min);
  const cookIso = minutterTillIso(d.tid?.tillagning_min);
  const totalIso = minutterTillIso(totalMin);

  const ingredienser = (d.ingredienser ?? []).map((i) => ingrediensTillStrang(i));

  const instruktioner = (d.tillagning ?? []).map((s, idx) => {
    const obj = tillagningTillObj(s);
    return {
      '@type': 'HowToStep',
      position: idx + 1,
      ...(obj.namn ? { name: obj.namn } : {}),
      text: obj.text,
    };
  });

  const yieldStr = `${d.portioner} portioner`;

  const nutrition = d.narings_per_portion
    ? {
        '@type': 'NutritionInformation',
        servingSize: '1 portion',
        calories: `${d.narings_per_portion.kcal} kcal`,
        carbohydrateContent: `${d.narings_per_portion.netto_kh} g`,
        fatContent: `${d.narings_per_portion.fett} g`,
        proteinContent: `${d.narings_per_portion.protein} g`,
      }
    : undefined;

  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: d.namn,
    url,
    recipeYield: yieldStr,
    recipeIngredient: ingredienser,
    recipeInstructions: instruktioner,
    inLanguage: 'sv',
  };

  if (prepIso) ld.prepTime = prepIso;
  if (cookIso) ld.cookTime = cookIso;
  if (totalIso) ld.totalTime = totalIso;
  if (nutrition) ld.nutrition = nutrition;
  if (d.taggar?.length) ld.keywords = d.taggar.join(', ');
  if (d.testlogg?.length) {
    const betyg = d.testlogg.filter((t) => typeof t.betyg === 'number').map((t) => t.betyg as number);
    if (betyg.length > 0) {
      const snitt = betyg.reduce((a, b) => a + b, 0) / betyg.length;
      ld.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: Math.round(snitt * 10) / 10,
        ratingCount: betyg.length,
        bestRating: 5,
        worstRating: 1,
      };
    }
  }

  return ld;
}
