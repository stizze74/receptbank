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
app.use(express.json({ limit: '1mb' }));

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

// ---- Modern Streamable HTTP transport: /mcp (Claude.ai Custom Connector använder denna) ----
const streamableTransports: Record<string, StreamableHTTPServerTransport> = {};

app.post('/mcp', tokenAuth, async (req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && streamableTransports[sessionId]) {
    transport = streamableTransports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (id) => {
        streamableTransports[id] = transport;
      },
    });
    transport.onclose = () => {
      if (transport.sessionId && streamableTransports[transport.sessionId]) {
        delete streamableTransports[transport.sessionId];
      }
    };
    const mcp = createMcpServer();
    await mcp.server.connect(transport);
  } else {
    res.status(400).json({
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Bad Request: ogiltig session eller init.' },
      id: null,
    });
    return;
  }

  await transport.handleRequest(req, res, req.body);
});

const handleStreamableSession = async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !streamableTransports[sessionId]) {
    res.status(400).send('Saknad eller okänd session');
    return;
  }
  await streamableTransports[sessionId].handleRequest(req, res);
};

app.get('/mcp', tokenAuth, handleStreamableSession);
app.delete('/mcp', tokenAuth, handleStreamableSession);

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
