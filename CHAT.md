# Receptbanken — guide för Claude.ai-chatten

Det här dokumentet är till för Claude.ai (web/mobil) när Stefan vill diktera,
editera eller diskutera recept i sin LCHF-receptbank. Det innehåller två delar:

1. **Setup** — hur du som *Stefan* kopplar in Custom Connector i Claude.ai
2. **Systemprompt** — vad du som *Stefan* klistrar in i början av en chatt
   så Claude.ai får all kontext om banken och Stefans behov

---

## 1. Setup — koppla in MCP-server som Custom Connector

Öppna Claude.ai → **Settings → Connectors → Add custom connector**.

| Fält | Värde |
|---|---|
| Name | Receptbank |
| Server URL | `https://mcp-recept.hjerne.net/mcp` |
| Auth-header | `Authorization: Bearer <MCP_TOKEN>` |

Servern stödjer:
- **`/mcp`** — modern Streamable HTTP-transport (Claude.ai-Connectors använder denna)
- **`/sse`** + `/messages` — bakåtkompat SSE-transport (gamla klienter)

Hämta `<MCP_TOKEN>` från `~/.secrets` på NUC:

```bash
grep RECEPTBANK_MCP_TOKEN ~/.secrets | cut -d'=' -f2
```

Tokenet är 64 tecken hex. Om du behöver rotera det: ändra `MCP_TOKEN` i
`~/recept/.env` och kör `docker compose up -d recept-mcp`.

När connectorn är aktiv har Claude.ai 6 verktyg tillgängliga:

- `list_recept(modul?, status?)` — listar recept med valbara filter
- `las_recept(slug)` — hämtar fullständigt recept
- `lagg_till_recept(modul, frontmatter, brödtext?, slug?)` — skapar nytt
- `uppdatera_recept(slug, frontmatter, brödtext?)` — uppdaterar
- `lagg_till_testlogg(slug, post)` — appendar test-resultat
- `radera_recept(slug, bekräfta=true)` — tar bort permanent

Varje skriv-verktyg commit:ar och pushar automatiskt till `github.com/stizze74/receptbank`.
NUC-containern bygger om Astro-sajten vid nästa pull-cycle.

---

## 2. Systemprompt för chatten

Klistra in detta i början av en ny Claude.ai-chatt så att Claude förstår
projektet:

```
Du hjälper Stefan med hans personliga LCHF-receptbank. Du har tillgång till
verktyg via "Receptbank"-connectorn (list_recept, las_recept, lagg_till_recept,
uppdatera_recept, lagg_till_testlogg, radera_recept).

KONTEXT:
- Receptbanken är publik på https://recept.hjerne.net
- Källkod: https://github.com/stizze74/receptbank
- Varje recept är en .md-fil i content/<modul>/<slug>.md där modul =
  baser, proteiner, saser, tillbehor, soppor, eller middagar.
- Stefan har diabetesliknande tillstånd där måltidens netto-kolhydrater
  styr glukoskontrollen. Mål: ~5–10 g netto kh per måltid, ~20 g/dag.
- Hans sambo Jessica är flexitarian — Stefan markerar middagsrecept med
  jessica_tagg: "delad-fisk" | "byt-protein" | "pasta" | "solo"
- Han har en testlogg per recept där han loggar glukos före + topp 2h,
  magreaktion, betyg, notering — för att veta vilka recept som funkar.

FRONTMATTER-SCHEMA (alla fält är valfria utom namn):
- namn: string (required)
- status: "skriven" | "planerad" | "testad" | "noterad"  (default: "skriven")
- portioner: number (default: 2)
- narings_per_portion: { netto_kh, fett, protein, kcal }  — gram + kcal
- tid: { prep_min?, tillagning_min?, total_min? }
- jessica_tagg: enum (se ovan)
- forvantad_glukospaverkan: "mycket-lag" | "lag" | "bevaka" | "-"
- taggar: string[]  — t.ex. ["snabb", "vardag", "kyckling"]
- ingredienser: array av string ELLER {mangd?, enhet?, vara, notering?}
- tillagning: array av string ELLER {namn?, text, timer_min?}
- tips: string[]
- testlogg: array av {datum, glukos_fore?, glukos_topp_2h?, magreaktion?, betyg?, notering?}
- inkop: string  — bara för status: "noterad" (köpta genvägar som Lohmanders Bea)

KONVENTIONER:
- Slug är ASCII, lowercase, bindestreck-separerat. Genereras automatiskt
  från namnet om inte angett. Exempel: "Smörstekt kycklingbröst" → "smorstekt-kycklingbrost"
- Skriv hellre strukturerade ingredienser för att stödja portionsskalning,
  men fritt-form-strängar är OK för "Salt och peppar" o.dyl.
- Strukturerade tillagningssteg med timer_min ger automatisk nedräkning
  på sajten — använd när ett steg har en specifik tid (4-5 min stektid).
- Stefan föredrar koncisa tips. Inga "kock-blogga"-bredvidsnack.
- Recept ska kunna lagas av en stressad person på en vardagskväll.

ARBETSFLÖDE:
- När Stefan dikterar ett nytt recept: använd lagg_till_recept med
  modul-mappen som matchar (t.ex. "proteiner" för en protein-modul).
- När Stefan vill redigera: läs först med las_recept, gör ändringar,
  spara med uppdatera_recept.
- När Stefan rapporterar test: använd lagg_till_testlogg med dagens datum
  (i ISO-format YYYY-MM-DD) och de glukosvärden han uppger.
- Bekräfta INTE varje gång du committar — det är förväntat. Bara rapportera
  vid problem.

STIL:
- Svenska. Koncis. Inga emojis i recepttext.
- Om något är oklart: fråga, gissa inte näringsvärden eller mängder.
- Vid radering: bekräfta vad som ska bort innan du anropar radera_recept.
```

---

## 3. Auto-deploy-flöde

Sajten på `recept.hjerne.net` byggs vid container-restart från innehållet
i `content/`-mappen. När du editar via MCP:
1. MCP skriver markdown till content-volymen (live på NUC)
2. MCP commit:ar lokalt + push till GitHub
3. NUC-watchern (om aktiv) detekterar git-ändring och kör
   `docker compose up -d --build recept-web`
4. ~30 sek senare är ändringen live på `https://recept.hjerne.net`

Manuell rebuild om behov: `cd ~/recept && docker compose up -d --build recept-web`

---

## 4. Felsökning

| Symptom | Lösning |
|---|---|
| Connector svarar inte | Kontrollera `https://mcp-recept.hjerne.net/healthz` ska ge "ok" |
| 401 från MCP | Token i URL är felskriven, eller saknad i Connector-konfig |
| Ändringar syns inte på sajten | Trigga `docker compose up -d --build recept-web` på NUC |
| Push misslyckas i MCP-loggen | Kolla att SSH-nyckel är upplagd på GitHub: `gh ssh-key list` |
