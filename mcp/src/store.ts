import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { receptFrontmatter, MODULER, slugifySvenska, type Modulmapp, type ReceptFrontmatter } from './schema.js';
import simpleGit, { type SimpleGit } from 'simple-git';

export interface ReceptPost {
  modul: Modulmapp;
  slug: string;
  filsökväg: string;
  frontmatter: ReceptFrontmatter;
  brödtext: string;
}

const CONTENT_ROT = process.env.CONTENT_ROT ?? '/data/content';

const ensureSafeSlug = (slug: string): string => {
  if (slug !== slugifySvenska(slug)) {
    throw new Error(`Ogiltig slug: ${slug}. Använd bara a-z, 0-9 och bindestreck.`);
  }
  return slug;
};

const sökväg = (modul: Modulmapp, slug: string): string =>
  path.join(CONTENT_ROT, modul, `${ensureSafeSlug(slug)}.md`);

export async function listaAlla(filter?: { modul?: Modulmapp; status?: string }): Promise<ReceptPost[]> {
  const result: ReceptPost[] = [];
  const moduler = filter?.modul ? [filter.modul] : MODULER;
  for (const modul of moduler) {
    const dir = path.join(CONTENT_ROT, modul);
    let entries: string[] = [];
    try {
      entries = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const fil of entries) {
      if (!fil.endsWith('.md')) continue;
      const slug = fil.replace(/\.md$/, '');
      try {
        const post = await läsRecept(modul, slug);
        if (filter?.status && post.frontmatter.status !== filter.status) continue;
        result.push(post);
      } catch {
        // hoppa över ogiltiga filer
      }
    }
  }
  return result.sort((a, b) => a.frontmatter.namn.localeCompare(b.frontmatter.namn, 'sv'));
}

export async function läsRecept(modul: Modulmapp, slug: string): Promise<ReceptPost> {
  const fil = sökväg(modul, slug);
  const text = await fs.readFile(fil, 'utf8');
  const parsed = matter(text);
  const fm = receptFrontmatter.parse(parsed.data);
  return { modul, slug, filsökväg: fil, frontmatter: fm, brödtext: parsed.content.trim() };
}

export async function hittaModul(slug: string): Promise<Modulmapp | null> {
  const safe = ensureSafeSlug(slug);
  for (const modul of MODULER) {
    try {
      await fs.access(path.join(CONTENT_ROT, modul, `${safe}.md`));
      return modul;
    } catch {}
  }
  return null;
}

export async function läsReceptPåSlug(slug: string): Promise<ReceptPost> {
  const modul = await hittaModul(slug);
  if (!modul) throw new Error(`Recept hittades inte: ${slug}`);
  return läsRecept(modul, slug);
}

const formatYaml = (fm: ReceptFrontmatter): string => {
  return matter.stringify('', fm).replace(/\n$/, '');
};

export async function skrivRecept(
  modul: Modulmapp,
  slug: string,
  frontmatter: ReceptFrontmatter,
  brödtext = '',
): Promise<ReceptPost> {
  const validerad = receptFrontmatter.parse(frontmatter);
  const fil = sökväg(modul, slug);
  await fs.mkdir(path.dirname(fil), { recursive: true });
  const yaml = formatYaml(validerad);
  const contents = `${yaml}\n${brödtext.trim()}\n`;
  await fs.writeFile(fil, contents, 'utf8');
  return { modul, slug, filsökväg: fil, frontmatter: validerad, brödtext: brödtext.trim() };
}

export async function raderaRecept(modul: Modulmapp, slug: string): Promise<void> {
  const fil = sökväg(modul, slug);
  await fs.unlink(fil);
}

const TILLATNA_BILD_EXT = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'] as const;

export async function skrivBild(
  modul: Modulmapp,
  filnamn: string,
  base64Data: string,
): Promise<{ filsökväg: string; bytes: number }> {
  // Säkerhetskontroller
  if (filnamn.includes('/') || filnamn.includes('\\') || filnamn.includes('..')) {
    throw new Error(`Ogiltigt filnamn: ${filnamn} (inga path-tecken)`);
  }
  const ext = filnamn.split('.').pop()?.toLowerCase() ?? '';
  if (!TILLATNA_BILD_EXT.includes(ext as any)) {
    throw new Error(`Otillåten bild-typ: ${ext}. Tillåtna: ${TILLATNA_BILD_EXT.join(', ')}`);
  }

  // Strippa eventuell data-URL-prefix (data:image/jpeg;base64,...)
  const cleanB64 = base64Data.replace(/^data:[^;]+;base64,/, '');
  const buf = Buffer.from(cleanB64, 'base64');
  if (buf.length === 0) throw new Error('Tom bild-data');
  if (buf.length > 15 * 1024 * 1024) throw new Error(`Bilden är ${(buf.length / 1024 / 1024).toFixed(1)} MB — max 15 MB`);

  const dir = path.join(CONTENT_ROT, modul, 'bilder');
  await fs.mkdir(dir, { recursive: true });
  const filsökväg = path.join(dir, filnamn);
  await fs.writeFile(filsökväg, buf);
  return { filsökväg, bytes: buf.length };
}

// ---- Git ----
let git: SimpleGit | null = null;
let remoteAuthSatt = false;

async function setupRemoteAuth(g: SimpleGit): Promise<void> {
  if (remoteAuthSatt) return;
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    remoteAuthSatt = true;
    return;
  }
  try {
    const remotes = await g.getRemotes(true);
    const origin = remotes.find((r) => r.name === 'origin');
    if (origin && origin.refs.push.startsWith('https://github.com/')) {
      const newUrl = origin.refs.push.replace(
        'https://github.com/',
        `https://oauth2:${token}@github.com/`,
      );
      await g.remote(['set-url', '--push', 'origin', newUrl]);
    }
    remoteAuthSatt = true;
  } catch (e) {
    console.warn(`setupRemoteAuth misslyckades: ${(e as Error).message}`);
  }
}

function gitInstans(): SimpleGit {
  if (!git) git = simpleGit(CONTENT_ROT);
  return git;
}

export async function gitÄrAktiv(): Promise<boolean> {
  try {
    await gitInstans().status();
    return true;
  } catch {
    return false;
  }
}

// Pull --rebase före skrivningar så vi har senaste version. Tolererar fail
// (offline / ingen remote) men loggar.
export async function gitPullRebase(): Promise<void> {
  const g = gitInstans();
  try {
    await g.fetch();
    await g.pull(['--rebase']);
  } catch (e) {
    console.warn(`git pull --rebase misslyckades: ${(e as Error).message}`);
  }
}

export async function commitOchPush(meddelande: string): Promise<{ commit?: string; pushed: boolean; meddelande: string }> {
  const g = gitInstans();
  await setupRemoteAuth(g);
  const status = await g.status();
  if (status.files.length === 0) return { pushed: false, meddelande: 'Inget att committa' };
  await g.add('.');
  const c = await g.commit(meddelande);
  let pushed = false;
  try {
    await g.push();
    pushed = true;
  } catch {
    // Push fail kan bero på remote-conflict — försök rebase + retry
    try {
      await g.pull(['--rebase']);
      await g.push();
      pushed = true;
    } catch (e2) {
      console.warn(`Push retry misslyckades: ${(e2 as Error).message}`);
    }
  }
  return { commit: c.commit, pushed, meddelande };
}

// ---- Per-slug lock så två samtidiga skriv-anrop inte krockar ----
const lås = new Map<string, Promise<unknown>>();

export async function medLås<T>(nyckel: string, arbete: () => Promise<T>): Promise<T> {
  const föregående = lås.get(nyckel) ?? Promise.resolve();
  const nästa = föregående.then(arbete, arbete);
  lås.set(nyckel, nästa as Promise<unknown>);
  try {
    return await nästa;
  } finally {
    if (lås.get(nyckel) === (nästa as Promise<unknown>)) lås.delete(nyckel);
  }
}
