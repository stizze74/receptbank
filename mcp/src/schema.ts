import { z } from 'zod';

export const ingrediensObj = z.object({
  mangd: z.union([z.number(), z.string()]).optional(),
  enhet: z.string().optional(),
  vara: z.string(),
  notering: z.string().optional(),
});

export const ingrediens = z.union([z.string(), ingrediensObj]);

export const tillagningObj = z.object({
  namn: z.string().optional(),
  text: z.string(),
  timer_min: z.number().optional(),
});

export const tillagning = z.union([z.string(), tillagningObj]);

export const narings = z.object({
  netto_kh: z.number(),
  fett: z.number(),
  protein: z.number(),
  kcal: z.number(),
});

export const tid = z.object({
  prep_min: z.number().optional(),
  tillagning_min: z.number().optional(),
  total_min: z.number().optional(),
});

export const testpost = z.object({
  datum: z.string(),
  glukos_fore: z.number().optional(),
  glukos_topp_2h: z.number().optional(),
  magreaktion: z.string().optional(),
  betyg: z.number().min(1).max(5).optional(),
  notering: z.string().optional(),
});

export const receptFrontmatter = z.object({
  namn: z.string(),
  status: z.enum(['skriven', 'planerad', 'testad', 'noterad']).default('skriven'),
  portioner: z.number().int().positive().default(2),
  narings_per_portion: narings.optional(),
  tid: tid.optional(),
  jessica_tagg: z.enum(['delad-fisk', 'byt-protein', 'pasta', 'solo']).optional(),
  forvantad_glukospaverkan: z.enum(['mycket-lag', 'lag', 'bevaka', '-']).optional(),
  taggar: z.array(z.string()).default([]),
  ingredienser: z.array(ingrediens).default([]),
  tillagning: z.array(tillagning).default([]),
  tips: z.array(z.string()).default([]),
  testlogg: z.array(testpost).default([]),
  inkop: z.string().optional(),
  bild: z.string().optional(),
  bild_alt: z.string().optional(),
});

export type ReceptFrontmatter = z.infer<typeof receptFrontmatter>;

export const MODULER = ['baser', 'proteiner', 'saser', 'tillbehor', 'soppor', 'middagar'] as const;
export type Modulmapp = (typeof MODULER)[number];

export const MODUL_TILL_ETIKETT: Record<Modulmapp, string> = {
  baser: 'bas',
  proteiner: 'protein',
  saser: 'sas',
  tillbehor: 'tillbehor',
  soppor: 'soppa',
  middagar: 'middag',
};

export const slugifySvenska = (s: string): string =>
  s
    .toLowerCase()
    .replaceAll('å', 'a')
    .replaceAll('ä', 'a')
    .replaceAll('ö', 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
