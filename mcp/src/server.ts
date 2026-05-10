import express, { type Request, type Response } from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import {
  listaAlla,
  läsReceptPåSlug,
  skrivRecept,
  skrivBild,
  raderaRecept,
  hittaModul,
  commitOchPush,
  gitPullRebase,
  medLås,
} from './store.js';
import {
  receptFrontmatter,
  testpost,
  MODULER,
  slugifySvenska,
  type Modulmapp,
} from './schema.js';

const PORT = Number(process.env.PORT ?? 3030);
const TOKEN = process.env.MCP_TOKEN ?? '';
const SERVER_NAME = 'receptbank';
const VERSION = '0.1.0';

if (!TOKEN) {
  console.error('FEL: MCP_TOKEN måste sättas i environment.');
  process.exit(1);
}

// ---- MCP Server-factory ----
// En ny McpServer-instans skapas per anslutning eftersom McpServer:s underliggande
// Server bara stödjer en transport per instans. Tool-registreringen är samma för alla.
function createMcpServer(): McpServer {
  const mcp = new McpServer({ name: SERVER_NAME, version: VERSION });
  registerTools(mcp);
  return mcp;
}

function registerTools(mcp: McpServer): void {
  mcp.tool(
    'list_recept',
  'Lista alla recept i banken. Filtrera på modul (baser/proteiner/saser/tillbehor/soppor/middagar) och/eller status (skriven/planerad/testad/noterad).',
  {
    modul: z.enum(MODULER).optional(),
    status: z.enum(['skriven', 'planerad', 'testad', 'noterad']).optional(),
  },
  async ({ modul, status }) => {
    const all = await listaAlla({ modul, status });
    const summary = all.map((r) => ({
      slug: r.slug,
      modul: r.modul,
      namn: r.frontmatter.namn,
      status: r.frontmatter.status,
      portioner: r.frontmatter.portioner,
      tid_total: r.frontmatter.tid?.total_min,
      kh: r.frontmatter.narings_per_portion?.netto_kh,
      taggar: r.frontmatter.taggar,
    }));
    return {
      content: [
        {
          type: 'text',
          text: `${summary.length} recept:\n${JSON.stringify(summary, null, 2)}`,
        },
      ],
    };
  },
);

mcp.tool(
  'las_recept',
  'Hämta hela receptet (frontmatter + brödtext) för ett specifikt recept via dess slug.',
  { slug: z.string() },
  async ({ slug }) => {
    const post = await läsReceptPåSlug(slug);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              modul: post.modul,
              slug: post.slug,
              frontmatter: post.frontmatter,
              brödtext: post.brödtext,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

mcp.tool(
  'lagg_till_recept',
  'Skapa ett nytt recept. Anger modulmapp och hela frontmatter-strukturen. Slug genereras automatiskt från namnet om inte angivet.',
  {
    modul: z.enum(MODULER),
    frontmatter: receptFrontmatter,
    brödtext: z.string().default(''),
    slug: z.string().optional(),
  },
  async ({ modul, frontmatter, brödtext, slug }) => {
    const finalSlug = slug ?? slugifySvenska(frontmatter.namn);
    return medLås(finalSlug, async () => {
      await gitPullRebase();
      const existerande = await hittaModul(finalSlug);
      if (existerande) {
        throw new Error(
          `Slug "${finalSlug}" finns redan i ${existerande}. Använd uppdatera_recept eller välj annan slug.`,
        );
      }
      const post = await skrivRecept(modul, finalSlug, frontmatter, brödtext);
      const git = await commitOchPush(`Lägg till ${frontmatter.namn} (${modul})`);
      return {
        content: [
          {
            type: 'text',
            text: `Skapade ${post.filsökväg}.\nGit: ${git.pushed ? 'committat och pushat' : 'committat lokalt'} (${git.commit ?? 'ingen ändring'}).`,
          },
        ],
      };
    });
  },
);

mcp.tool(
  'uppdatera_recept',
  'Uppdatera ett befintligt recept. Frontmatter ersätts helt. Om brödtext utelämnas behålls befintlig.',
  {
    slug: z.string(),
    frontmatter: receptFrontmatter,
    brödtext: z.string().optional(),
  },
  async ({ slug, frontmatter, brödtext }) => {
    return medLås(slug, async () => {
      await gitPullRebase();
      const befintlig = await läsReceptPåSlug(slug);
      const text = brödtext ?? befintlig.brödtext;
      const post = await skrivRecept(befintlig.modul, slug, frontmatter, text);
      const git = await commitOchPush(`Uppdatera ${frontmatter.namn}`);
      return {
        content: [
          {
            type: 'text',
            text: `Uppdaterade ${post.filsökväg}.\nGit: ${git.pushed ? 'committat och pushat' : 'committat lokalt'} (${git.commit ?? 'ingen ändring'}).`,
          },
        ],
      };
    });
  },
);

mcp.tool(
  'lagg_till_testlogg',
  'Lägg till en testlogg-post (datum, glukosvärden, magreaktion, betyg, notering) på ett recept. Andra fält i receptet rörs inte.',
  {
    slug: z.string(),
    post: testpost,
  },
  async ({ slug, post }) => {
    return medLås(slug, async () => {
      await gitPullRebase();
      const recept = await läsReceptPåSlug(slug);
      const ny = {
        ...recept.frontmatter,
        testlogg: [...(recept.frontmatter.testlogg ?? []), post],
      };
      const skriven = await skrivRecept(recept.modul, slug, ny, recept.brödtext);
      const git = await commitOchPush(`Logga test: ${recept.frontmatter.namn} ${post.datum}`);
      return {
        content: [
          {
            type: 'text',
            text: `Lade till testlogg på ${skriven.filsökväg}.\nGit: ${git.pushed ? 'committat och pushat' : 'committat lokalt'} (${git.commit ?? 'ingen ändring'}).`,
          },
        ],
      };
    });
  },
);

mcp.tool(
  'lagg_till_bild',
  'Spara en bild för ett recept. Bilden lagras i content/<modul>/bilder/<filnamn> och receptet får bild- och bild_alt-fält i frontmatter. Skicka base64-encoded bytes (med eller utan data:-prefix). Tillåtna ext: jpg, jpeg, png, webp, avif, gif. Max 15 MB.',
  {
    slug: z.string(),
    filnamn: z.string().describe('T.ex. "smorstekt-kycklinglar.jpg" — använd receptets slug + ext'),
    base64_data: z.string().describe('Bilden som base64-string'),
    alt_text: z.string().optional().describe('Beskrivande alt-text för tillgänglighet, t.ex. "Smörstekt kycklinglår med blank yta"'),
  },
  async ({ slug, filnamn, base64_data, alt_text }) => {
    return medLås(slug, async () => {
      await gitPullRebase();
      const recept = await läsReceptPåSlug(slug);
      const bildInfo = await skrivBild(recept.modul, filnamn, base64_data);
      const ny = {
        ...recept.frontmatter,
        bild: filnamn,
        ...(alt_text ? { bild_alt: alt_text } : {}),
      };
      await skrivRecept(recept.modul, slug, ny, recept.brödtext);
      const git = await commitOchPush(`Lägg till bild på ${recept.frontmatter.namn}`);
      return {
        content: [
          {
            type: 'text',
            text: `Sparade bild ${bildInfo.filsökväg} (${(bildInfo.bytes / 1024).toFixed(1)} KB).\nGit: ${git.pushed ? 'committat och pushat' : 'committat lokalt'} (${git.commit ?? 'ingen ändring'}).`,
          },
        ],
      };
    });
  },
);

mcp.tool(
  'radera_recept',
  'Radera ett recept permanent. Använd försiktigt.',
  { slug: z.string(), bekräfta: z.literal(true) },
  async ({ slug }) => {
    return medLås(slug, async () => {
      await gitPullRebase();
      const recept = await läsReceptPåSlug(slug);
      await raderaRecept(recept.modul, slug);
      const git = await commitOchPush(`Radera ${recept.frontmatter.namn}`);
      return {
        content: [
          {
            type: 'text',
            text: `Raderade ${recept.filsökväg}.\nGit: ${git.pushed ? 'committat och pushat' : 'committat lokalt'} (${git.commit ?? 'ingen ändring'}).`,
          },
        ],
      };
    });
  },
);
}  // end of registerTools

// ---- HTTP / SSE Transport ----
const app = express();
// 20 MB räcker för base64-encoded foton upp till ~15 MB rå
app.use(express.json({ limit: '20mb' }));

const tokenAuth = (req: Request, res: Response, next: () => void) => {
  const auth = req.header('authorization') ?? '';
  const fromQuery = typeof req.query.token === 'string' ? `Bearer ${req.query.token}` : '';
  const provided = auth || fromQuery;
  if (provided !== `Bearer ${TOKEN}`) {
    res.status(401).json({ error: 'Ogiltig eller saknad token' });
    return;
  }
  next();
};

app.get('/healthz', (_req, res) => {
  res.type('text/plain').send('ok');
});

// ---- Basic auth-skyddad /upload-endpoint för browser-uploads ----
const UPLOAD_USER = process.env.UPLOAD_USER ?? 'familjen';
const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD ?? '';

const basicAuth = (req: Request, res: Response, next: () => void) => {
  if (!UPLOAD_PASSWORD) {
    res.status(503).json({ error: 'Upload-endpoint inaktiverad: UPLOAD_PASSWORD ej satt' });
    return;
  }
  const auth = req.header('authorization') ?? '';
  if (!auth.toLowerCase().startsWith('basic ')) {
    res.status(401).set('WWW-Authenticate', 'Basic realm="Receptbank"').end();
    return;
  }
  const decoded = Buffer.from(auth.slice(6).trim(), 'base64').toString('utf8');
  const sep = decoded.indexOf(':');
  if (sep < 0) {
    res.status(401).set('WWW-Authenticate', 'Basic realm="Receptbank"').end();
    return;
  }
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);
  if (user !== UPLOAD_USER || pass !== UPLOAD_PASSWORD) {
    res.status(401).set('WWW-Authenticate', 'Basic realm="Receptbank"').end();
    return;
  }
  next();
};

const corsMcpServer = (_req: Request, res: Response, next: () => void) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://recept.hjerne.net');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  next();
};

app.options('/upload', corsMcpServer, (_req, res) => {
  res.status(204).end();
});

app.options('/testlogg', corsMcpServer, (_req, res) => {
  res.status(204).end();
});

app.post('/testlogg', corsMcpServer, basicAuth, async (req, res) => {
  try {
    const { slug, post } = req.body ?? {};
    if (typeof slug !== 'string' || !post || typeof post !== 'object') {
      res.status(400).json({ error: 'Saknar slug eller post' });
      return;
    }
    if (!post.datum) post.datum = new Date().toISOString().slice(0, 10);
    await medLås(slug, async () => {
      await gitPullRebase();
      const recept = await läsReceptPåSlug(slug);
      const ny = {
        ...recept.frontmatter,
        testlogg: [...(recept.frontmatter.testlogg ?? []), post],
      };
      await skrivRecept(recept.modul, slug, ny, recept.brödtext);
      const git = await commitOchPush(`Logga test: ${recept.frontmatter.namn} ${post.datum}`);
      res.json({
        ok: true,
        post,
        git: { commit: git.commit, pushed: git.pushed },
      });
    });
  } catch (e) {
    if (!res.headersSent) {
      res.status(500).json({ error: (e as Error).message });
    }
  }
});

app.post('/upload', corsMcpServer, basicAuth, async (req, res) => {
  try {
    const { slug, filnamn, base64_data, alt_text } = req.body ?? {};
    if (typeof slug !== 'string' || typeof filnamn !== 'string' || typeof base64_data !== 'string') {
      res.status(400).json({ error: 'Saknar slug, filnamn eller base64_data' });
      return;
    }
    await medLås(slug, async () => {
      await gitPullRebase();
      const recept = await läsReceptPåSlug(slug);
      const bildInfo = await skrivBild(recept.modul, filnamn, base64_data);
      const ny = {
        ...recept.frontmatter,
        bild: filnamn,
        ...(typeof alt_text === 'string' && alt_text.trim() ? { bild_alt: alt_text.trim() } : {}),
      };
      await skrivRecept(recept.modul, slug, ny, recept.brödtext);
      const git = await commitOchPush(`Lägg till bild på ${recept.frontmatter.namn}`);
      res.json({
        ok: true,
        bild: { fil: bildInfo.filsökväg, bytes: bildInfo.bytes },
        git: { commit: git.commit, pushed: git.pushed },
      });
    });
  } catch (e) {
    if (!res.headersSent) {
      res.status(500).json({ error: (e as Error).message });
    }
  }
});

// Anthropic Connector-routern provar OAuth Protected Resource Metadata-discovery
// (RFC 9728) innan den faller tillbaka till URL-token-auth. Min server stödjer
// bara Bearer-token, men vi måste svara stilrent så Anthropic-klienten inte
// fastnar i fel-loop. Returnera 404 med tom JSON istället för HTML.
app.get('/.well-known/oauth-protected-resource', (_req, res) => {
  res.status(404).json({ error: 'no_oauth' });
});
app.get('/.well-known/oauth-protected-resource/mcp', (_req, res) => {
  res.status(404).json({ error: 'no_oauth' });
});
app.get('/.well-known/oauth-authorization-server', (_req, res) => {
  res.status(404).json({ error: 'no_oauth' });
});
app.post('/register', (_req, res) => {
  res.status(404).json({ error: 'no_oauth' });
});

// MCP Streamable HTTP-spec kräver Accept: application/json, text/event-stream
// på POST. Anthropic-Connector skickar inte alltid headern korrekt — patcha
// inkommande request så transport-handlern accepterar.
//
// SDK:n läser via Web Standards `req.headers.get('accept')`. Express
// IncomingMessage konverteras via @hono/node-server som läser från
// req.headers objekt OCH ibland req.rawHeaders array. Patcha båda för
// säkerhets skull.
const PATCHED_ACCEPT = 'application/json, text/event-stream';
const tvingaAccept = (req: Request, res: Response, next: () => void) => {
  const original = String(req.headers['accept'] ?? '');
  const harJson = original.includes('application/json');
  const harSse = original.includes('text/event-stream');

  if (!harJson || !harSse) {
    // Express normaliserade headers
    req.headers['accept'] = PATCHED_ACCEPT;
    // Raw headers (Hono läser ofta härifrån)
    const raw = (req as any).rawHeaders as string[] | undefined;
    if (Array.isArray(raw)) {
      let acceptIdx = -1;
      for (let i = 0; i < raw.length; i += 2) {
        if (raw[i] && raw[i].toLowerCase() === 'accept') {
          acceptIdx = i;
          break;
        }
      }
      if (acceptIdx >= 0) {
        raw[acceptIdx + 1] = PATCHED_ACCEPT;
      } else {
        raw.push('Accept', PATCHED_ACCEPT);
      }
    }
    res.setHeader('X-Patched-Accept', PATCHED_ACCEPT);
    res.setHeader('X-Original-Accept', original || '<missing>');
  }
  next();
};

// ---- Modern Streamable HTTP transport: /mcp ----
// Stateless mode: ny transport + McpServer-instans per request.
// Anthropic-Connectorn skickar tools/call utan föregående initialize, så vi
// kan inte kräva sessions. Per-request transport är lite overhead men
// funkar för read-only tool-calls och write-tool-calls (som inte behöver
// state mellan requests).
app.post('/mcp', tokenAuth, tvingaAccept, async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,  // stateless
    });
    res.on('close', () => {
      transport.close().catch(() => {});
    });
    const mcp = createMcpServer();
    await mcp.server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (e) {
    console.error('MCP POST /mcp fail:', e);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: `Server error: ${(e as Error).message}` },
        id: null,
      });
    }
  }
});

// I stateless mode finns ingen session att GET-strömma mot eller terminera.
// Returnera 405 Method Not Allowed enligt MCP-spec.
const stateless405 = (_req: Request, res: Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: { code: -32000, message: 'Method not allowed (stateless server)' },
    id: null,
  });
};
app.get('/mcp', tokenAuth, stateless405);
app.delete('/mcp', tokenAuth, stateless405);

// ---- Bakåtkompatibel SSE-transport: GET /sse + POST /messages ----
let activeSseTransport: SSEServerTransport | null = null;

app.get('/sse', tokenAuth, async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  activeSseTransport = transport;
  res.on('close', () => {
    if (activeSseTransport === transport) activeSseTransport = null;
  });
  const mcp = createMcpServer();
  await mcp.server.connect(transport);
});

app.post('/messages', tokenAuth, async (req, res) => {
  if (!activeSseTransport) {
    res.status(503).json({ error: 'Ingen aktiv SSE-session — anslut till /sse först' });
    return;
  }
  await activeSseTransport.handlePostMessage(req, res, req.body);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Receptbank MCP-server lyssnar på 0.0.0.0:${PORT}`);
  console.log(`Modern (Claude.ai): POST/GET/DELETE /mcp  (auth: Bearer <MCP_TOKEN>)`);
  console.log(`Bakåtkompat SSE:    GET /sse + POST /messages`);
});
