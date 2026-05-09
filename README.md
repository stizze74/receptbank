# Receptbank

LCHF-receptbank för Stefan. Modulbaserade recept (bas + protein + sås), veckoplanerare,
testlogg per recept, och Matlistan-import via schema.org Recipe JSON-LD.

Bor på <https://recept.hjerne.net> (NUC self-host bakom Nginx Proxy Manager).

## Kom igång

```bash
npm install
npm run dev          # startar på http://localhost:4321
npm run build        # statisk build i ./dist
```

## Struktur

```
content/
  baser/           # bas — t.ex. broccolimos
  proteiner/       # protein — t.ex. smörstekt kyckling
  saser/           # sås — t.ex. hollandaise
  tillbehor/       # tillbehör
  soppor/          # soppor
  middagar/        # kombinerade helrätter
src/
  content/config.ts    # Zod-schema för alla recept
  layouts/             # ReceptLayout med JSON-LD
  pages/               # index, alla, kombinera, veckoplan, recept/[slug]
  components/          # ReceptKort, Modulvaljare, Veckoplanerare, Testlogg
  utils/               # kombinera, narings, jsonld
public/
  manifest.json        # PWA
```

## Lägg till recept

1. Skapa `.md` i rätt content-undermapp.
2. Fyll i frontmatter (se befintliga recept för exempel).
3. Commit + push → NUC pullar och bygger om automatiskt.

Kort-form (snabbskrivet):

```yaml
---
namn: Smörstekt kycklingbröst
status: skriven
portioner: 2
tid: { prep_min: 5, tillagning_min: 12 }
narings_per_portion: { netto_kh: 1, fett: 18, protein: 35, kcal: 320 }
jessica_tagg: byt-protein
forvantad_glukospaverkan: mycket-lag
taggar: [snabb, vardag, kyckling]
ingredienser:
  - { mangd: 2, enhet: st, vara: kycklingbröstfilé }
  - { mangd: 2, enhet: msk, vara: smör }
  - "Salt och peppar"
tillagning:
  - "Salta och peppra på båda sidor."
  - { namn: "Stek", text: "Smält smör. Stek 4–5 min per sida tills 70 °C.", timer_min: 5 }
---
```

`ingredienser` och `tillagning` accepterar både korta strängar och strukturerade objekt.
Strukturerade ingredienser blir skalbara live; strukturerade tillagningssteg kan ha
inbäddad timer.

## Edit från Claude.ai

Repot är publikt på GitHub. Claude.ai-chatten kan editera recept via GitHub-connector
(om kopplad) eller via custom MCP-server som kör på NUC och commit:ar tillbaka till
detta repo.

## Deploy

Self-host på NUC (`192.168.50.79`). NPM proxy:ar `recept.hjerne.net` till
nginx-containern som servar statisk Astro-build från en mountad volym.

Se `docker-compose.yml` och `Dockerfile`.
