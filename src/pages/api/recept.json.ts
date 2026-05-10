import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
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
    getCollection('frukost'),
    getCollection('sallader'),
    getCollection('forrad'),
    getCollection('grill'),
    getCollection('glass'),
    getCollection('festmat'),
  ]);
  const alla = collections.flat();

  const data = alla.map((r) => ({
    slug: r.id,
    url: `/recept/${r.id}/`,
    modul: r.data.modul,
    namn: r.data.namn,
    status: r.data.status,
    portioner: r.data.portioner,
    tid: r.data.tid ?? null,
    narings_per_portion: r.data.narings_per_portion ?? null,
    jessica_tagg: r.data.jessica_tagg ?? null,
    forvantad_glukospaverkan: r.data.forvantad_glukospaverkan ?? null,
    taggar: r.data.taggar,
    ingredienser: r.data.ingredienser,
    tillagning: r.data.tillagning,
    tips: r.data.tips,
    inkop: r.data.inkop ?? null,
    har_testlogg: (r.data.testlogg ?? []).length > 0,
  }));

  return new Response(
    JSON.stringify(
      {
        version: 1,
        antal: data.length,
        recept: data,
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
};
