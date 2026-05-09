# Receptbank MCP-server

Remote MCP-server för Claude.ai-Connectors som ger chatten tillgång till Stefans
receptbank: lista, läs, skapa, uppdatera och logga test på recept. Skriver
markdown till content-volymen och commit:ar/pushar till GitHub.

## Verktyg

- `lista_recept(modul?, status?)` — lista alla recept med filter
- `läs_recept(slug)` — hämta hela receptet
- `lägg_till_recept(modul, frontmatter, brödtext?, slug?)` — skapa nytt
- `uppdatera_recept(slug, frontmatter, brödtext?)` — uppdatera
- `lägg_till_testlogg(slug, post)` — appenda test-resultat
- `radera_recept(slug, bekräfta=true)` — ta bort

## Lokalt

```
npm install
MCP_TOKEN=hemlig CONTENT_ROT=../content npm run dev
```

## Container

Bygger via root `~/recept/docker-compose.yml` som `recept-mcp`-tjänsten.
Mountar `/data/content` från host:`./content` så MCP delar samma filsystem
som Astro-bygget.

## Auth

Bearer-token via `Authorization`-header eller `?token=`-query.
SSE-endpoint: `GET /sse`. Inkommande messages: `POST /messages`.

## Claude.ai-konfig

Claude.ai → Settings → Connectors → Add → Custom MCP-server:
- URL: `https://mcp-recept.hjerne.net/sse?token=<MCP_TOKEN>`
- Eller med Authorization-header: `Bearer <MCP_TOKEN>`
