import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ingrediensObj = z.object({
  mangd: z.union([z.number(), z.string()]).optional(),
  enhet: z.string().optional(),
  vara: z.string(),
  notering: z.string().optional(),
});
export type IngrediensObj = z.infer<typeof ingrediensObj>;

const ingrediens = z.union([z.string(), ingrediensObj]);
export type Ingrediens = z.infer<typeof ingrediens>;

const tillagningObj = z.object({
  namn: z.string().optional(),
  text: z.string(),
  timer_min: z.number().optional(),
});
export type TillagningObj = z.infer<typeof tillagningObj>;

const tillagning = z.union([z.string(), tillagningObj]);
export type Tillagning = z.infer<typeof tillagning>;

const narings = z.object({
  netto_kh: z.number(),
  fett: z.number(),
  protein: z.number(),
  kcal: z.number(),
});

const tid = z.object({
  prep_min: z.number().optional(),
  tillagning_min: z.number().optional(),
  total_min: z.number().optional(),
});

const testpost = z.object({
  datum: z.union([z.string(), z.date()]),
  glukos_fore: z.number().optional(),
  glukos_topp_2h: z.number().optional(),
  magreaktion: z.string().optional(),
  betyg: z.number().min(1).max(5).optional(),
  notering: z.string().optional(),
});

const baseSchema = z.object({
  namn: z.string(),
  status: z.enum(['skriven', 'planerad', 'testad', 'noterad']).default('skriven'),
  portioner: z.number().default(2),
  narings_per_portion: narings.optional(),
  tid: tid.optional(),
  jessica_tagg: z
    .enum(['delad-fisk', 'byt-protein', 'pasta', 'solo'])
    .optional(),
  forvantad_glukospaverkan: z
    .enum(['mycket-lag', 'lag', 'bevaka', '-'])
    .optional(),
  taggar: z.array(z.string()).default([]),
  ingredienser: z.array(ingrediens).default([]),
  tillagning: z.array(tillagning).default([]),
  tips: z.array(z.string()).default([]),
  testlogg: z.array(testpost).default([]),
  inkop: z.string().optional(),
  bild: z.string().optional(), // filnamn relativt content/<modul>/bilder/, t.ex. "kycklinglar.jpg"
  bild_alt: z.string().optional(),
  bild_ai: z.boolean().optional(), // true = AI-genererad placeholder, false/saknad = riktigt foto
});

const makeCollection = (folder: string, modul: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./content/${folder}` }),
    schema: baseSchema.extend({ modul: z.literal(modul).default(modul as any) }),
  });

export const collections = {
  baser: makeCollection('baser', 'bas'),
  proteiner: makeCollection('proteiner', 'protein'),
  saser: makeCollection('saser', 'sas'),
  tillbehor: makeCollection('tillbehor', 'tillbehor'),
  soppor: makeCollection('soppor', 'soppa'),
  middagar: makeCollection('middagar', 'middag'),
  snacks: makeCollection('snacks', 'snack'),
  drycker: makeCollection('drycker', 'dryck'),
  efterratter: makeCollection('efterratter', 'efterratt'),
  forratter: makeCollection('forratter', 'forratt'),
  brod: makeCollection('brod', 'brod'),
  frukost: makeCollection('frukost', 'frukost'),
  sallader: makeCollection('sallader', 'sallad'),
  forrad: makeCollection('forrad', 'forrad'),
  grill: makeCollection('grill', 'grill'),
  glass: makeCollection('glass', 'glass'),
  festmat: makeCollection('festmat', 'festmat'),
};

export type ReceptModul =
  | 'bas'
  | 'protein'
  | 'sas'
  | 'tillbehor'
  | 'soppa'
  | 'middag'
  | 'snack'
  | 'dryck'
  | 'efterratt'
  | 'forratt'
  | 'brod'
  | 'frukost'
  | 'sallad'
  | 'forrad'
  | 'grill'
  | 'glass'
  | 'festmat';
