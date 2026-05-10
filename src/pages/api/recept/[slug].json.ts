import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, render } from 'astro:content';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await Promise.all([
    getCollection('baser'),
    getCollection('proteiner'),
    getCollection('saser'),
    getCollection('tillbehor'),
    getCollection('soppor'),
    getCollection('middagar'),
    getCollection('snacks'),
    getCollection('drycker'),
    getCollection('efterratter'),
    getCollection('forratter'),
    getCollection('brod'),
  ]);
  return collections.flat().map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const entry = (props as any).entry;
  const data = {
    slug: entry.id,
    url: `/recept/${entry.id}/`,
    modul: entry.data.modul,
    namn: entry.data.namn,
    status: entry.data.status,
    portioner: entry.data.portioner,
    tid: entry.data.tid ?? null,
    narings_per_portion: entry.data.narings_per_portion ?? null,
    jessica_tagg: entry.data.jessica_tagg ?? null,
    forvantad_glukospaverkan: entry.data.forvantad_glukospaverkan ?? null,
    taggar: entry.data.taggar,
    ingredienser: entry.data.ingredienser,
    tillagning: entry.data.tillagning,
    tips: entry.data.tips,
    inkop: entry.data.inkop ?? null,
    testlogg: entry.data.testlogg ?? [],
    brodtext: entry.body ?? '',
  };
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
