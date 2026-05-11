# Kvalitetsrapport 2026-05-11

Granskning av hela receptbanken (alla 17 moduler) efter session där
~50 nya recept producerades snabbt. Autofixar är committade per fil.

## Sammanfattning
- Antal recept granskade: **549**
- Antal autofixade filer: **89**
- Antal autofix-ändringar (token-substitutioner): **205**
- Recept med kvarstående flaggor: **513**
- Punkter som kräver Stefan-bekräftelse: **21**

## Autofixar genomförda

Stavfel/svenska tecken-fix per modul. Varje fil har egen commit med
prefix `kvalitet:`. Fixarna ovan är word-boundary-substitutioner för
entydiga typos:

| Token-typ | Antal |
|---|---|
| `Vinda→Vänd` | 37 |
| `latt→lätt` | 33 |
| `på plat→på plåt` | 15 |
| `Lagg→Lägg` | 13 |
| `Tillsatt→Tillsätt` | 10 |
| `Küla→Kyla` | 9 |
| `slat→slät` | 8 |
| `till län→till len` | 7 |
| `bakplats→bakplåtspapper` | 6 |
| `helt län→helt len` | 6 |
| `Sett→Sätt` | 6 |
| `Smalta→Smälta` | 5 |
| `vinda→vänd` | 4 |
| `krameringd→krämig` | 3 |
| `Skol→Skölj` | 3 |
| `bakplat→bakplåt` | 3 |
| `tillsatt→tillsätt` | 2 |
| `Bakplats→Bakplåtspapper` | 2 |
| `bakplater→bakplåtar` | 2 |
| `tills län→tills len` | 2 |
| `Krameringd→Krämig` | 2 |
| `krasch→krossade` | 2 |
| `smortstekt→smörstekt` | 2 |
| `gor→gör` | 2 |
| `smorrebrod→smörrebröd` | 2 |
| `hardkokta→hårdkokta` | 2 |
| `Grada→Grädda` | 2 |
| `Plat→Plåt` | 1 |
| `tepasar→tepåsar` | 1 |
| `Vand→Vänd` | 1 |
| `fortsatt vispa→fortsätt vispa` | 1 |
| `plat→plåt` | 1 |
| `skiljebakplats→skiljebakplåtspapper` | 1 |
| `smortet→smöret` | 1 |
| `smalt→smält (eller olivolja)` | 1 |
| `smalt mörk→smält mörk` | 1 |
| `vand→vänd` | 1 |
| `Smortstek→Smörstek` | 1 |
| `sett→sätt` | 1 |
| `lattkokta→lättkokta` | 1 |
| `Fortsatt vispa→Fortsätt vispa` | 1 |
| `Smalt smör→Smält smör` | 1 |

### Per modul (ändrade filer)

**brod** (6):
- `lchf-fokaccia-rosmarin` — vinda(1)
- `lchf-hamburgerbullar` — på plat(2), vinda(1), tillsatt(1), bakplats(1)
- `lchf-kanelbullar` — latt(1), vinda(1), på plat(1), bakplater(1), bakplats(1)
- `lchf-pita` — vinda(1), plat(1)
- `lchf-scones-sota` — på plat(2), bakplats(1)
- `lchf-tunnbrod` — vinda(1), bakplater(1)

**drycker** (4):
- `chai-te-blandning-kall` — tepasar(1)
- `frukost-smoothie-hallon-kokos-agg` — tillsatt(2), helt län(1)
- `gron-smoothie-spenat-kokos` — krameringd(1), helt län(1)
- `kanel-vanilj-shake` — till län(1)

**efterratter** (11):
- `blondies-vanilj-macadamia` — vinda(2), bakplats(1)
- `chokladmousse-mork-choklad` — smalta(2), vand(1), vinda(1), tillsatt(1), tills län(1)
- `chokladtryffel-klassisk` — till län(1), på plat(1), küla(1)
- `frusen-citronfromage` — vinda(2), krameringd(1), fortsatt vispa(1)
- `hallon-pavlova-lchf` — latt(2), på plat(1), plat(1), bakplats(1)
- `jordgubbskram-lchf` — vinda(2), slat(1), küla(1)
- `lchf-brownies-valnotter` — vinda(2), till län(1), bakplats(1), skiljebakplats(1)
- `lchf-citrontarte-mandel` — latt(2), küla(2), tills län(1)
- `mandelbiscotti-lchf` — vinda(1), på plat(1), bakplats(1)
- `mascarpone-mousse-bar` — vinda(2), latt(1), küla(1)
- `mork-chokladmousse-chili` — vinda(2), küla(1)

**festmat** (7):
- `beef-bourguignon` — vinda(1)
- `coq-au-vin` — vinda(1)
- `helstekt-vit-fisk-orter` — latt(2), lagg(1), sett(1), skol(1), smortet(1), på plat(1), bakplats(1)
- `hummersoppa-festmat` — latt(1), lagg(1), krameringd(1)
- `kottcarpaccio-parmesan-rucola` — lagg(1)
- `oxfile-wellington-lchf` — lagg(1), på plat(1)
- `pilgrimsmusslor-saffranssas` — latt(2)

**forrad** (6):
- `andconfit` — skol(2), lagg(1), smalt(1)
- `basilikaolja` — helt län(1)
- `hallonmarmelad-lchf-chia` — tillsatt(2)
- `hot-sauce-hemma` — helt län(1)
- `ramsloksolja` — till län(1)
- `vitloksconfit` — vinda(1), lagg(1)

**forratter** (1):
- `laxtartar-avokado-citron` — vinda(1)

**frukost** (2):
- `eggs-benedict-lchf` — latt(1)
- `spenat-getost-omelett` — vinda(1)

**glass** (6):
- `espresso-glass-lchf` — latt(1)
- `hallonsorbet-allulose` — slat(1), vinda(1)
- `hemmagjord-vaniljglass-lchf` — latt(1), tillsatt(1), smalt mörk(1)
- `lchf-citronsorbet-allulose` — vinda(1)
- `mintchoklad-stracciatella` — krameringd(1)
- `smorkola-glass-lchf` — latt(3), till län(1)

**grill** (2):
- `grillad-flaskside-honung-soja` — lagg(1)
- `grillade-kycklingvingar-harissa` — vinda(2), vand(1), lagg(1)

**middagar** (19):
- `ankbrost-apelsinsas-lchf` — latt(1)
- `bun-bo-nam-bo-lchf` — krasch(1)
- `gratinerad-torsk-parmesan-orter` — smortstekt(1)
- `halleflundra-smorsas-kapris` — smortstekt(1)
- `julskinkstek-senap-erytritol-glaze` — lagg(2), sett(2)
- `khao-soi-lchf` — krasch(1)
- `lax-tartare-dill-avokado` — vinda(2), gor(1), küla(1)
- `midsommar-kallrokt-lax-dillstuvad-gurka` — vinda(2), latt(1), smorrebrod(1)
- `moussaka-lchf` — latt(2), sett(1)
- `pannbiff-jagarsas-svampfri` — latt(1)
- `pannbiff-lokssas` — latt(1), vinda(1)
- `pochat-lax-hollandaise-sparris` — latt(2), lagg(1), smortstek(1)
- `rakpasta-carbonara-carbzone` — vinda(2), latt(1)
- `sjotunga-meuniere` — latt(2), vinda(1)
- `skaldjurstacos-salladsblad` — latt(1)
- `spansk-paella-lchf` — latt(1)
- `spenat-curry-kombo-byt-protein` — slat(1), tillsatt(1)
- `stir-fry-ingefara-soja-kombo` — vinda(1)
- `zucchini-lasagne-lchf` — latt(1), sett(1)

**proteiner** (2):
- `aggrora-med-smor` — smalta(2)
- `kycklinglar` — sett(1)

**sallader** (5):
- `anka-sallad-apelsin` — latt(1)
- `blomkals-tabbouleh` — gor(1), vinda(1)
- `halloumisallad-grillad-paprika` — lagg(1)
- `kalrabbi-sallad-ingefara` — latt(1), vinda(1)
- `nicoise-sallad-lchf` — hardkokta(2), lattkokta(1)

**saser** (4):
- `aioli-klassisk` — fortsatt vispa(1)
- `dillsas-kall` — tillsatt(1)
- `senap-gradde` — smalt smör(1)
- `vitvinssas` — tillsatt(2), smalta(1), helt län(1)

**snacks** (5):
- `avokado-deviled-eggs` — till län(1)
- `baba-ganoush` — sett(1), på plat(1)
- `olivpate-tapenade` — slat(1)
- `parmesan-flarn` — grada(2), på plat(2), bakplat(1)
- `saltrostade-mandlar-smokad-paprika` — vinda(1), på plat(1), bakplat(1)

**soppor** (6):
- `blomkalssoppa` — slat(3)
- `borsjt-lchf` — till län(1)
- `broccolisoppa` — slat(1)
- `kall-avokadosoppa` — helt län(1), küla(1)
- `krameringd-spenatsoppa` — vinda(1), krameringd(1)
- `vichyssoise-lchf` — küla(1)

**tillbehor** (3):
- `krasna-rostade-tomater` — på plat(1), bakplat(1)
- `skagenrora` — tillsatt(1)
- `snabbpicklad-rodlok` — lagg(1), smorrebrod(1)

## Hårda regelbrott (KRÄVER ÅTGÄRD)

Endast hits där kontexten INTE explicit anger substitution eller
undantag. Falska positiva (t.ex. 'erytritol-honung', 'utan koriander',
'vanlig pasta för henne'/Jessica som flexitarian) är bortfiltrerade.

### Kritisk

- `forratter/mussla-vitvinsfond` — blamussla: ...500, enhet: "g", vara: "blåmusslor" }   - { mangd: 1, enh... → Byt blåmusslor mot pilgrimsmusslor eller hjärtmusslor.
- `glass/hallonsorbet-allulose` — sirap: ...slät röra.   - namn: gör sirap     text: >-       värm... → Endast 'reducerad till sirap' (förångad konsistens) är OK. Riktig sirap som ingrediens ska bytas mot erytritol-syrup.
- `glass/hallonsorbet-allulose` — sirap: ...nd samman hallonmösa och sirap. sila om du vill ha utan... → Endast 'reducerad till sirap' (förångad konsistens) är OK. Riktig sirap som ingrediens ska bytas mot erytritol-syrup.
- `middagar/mussel-fond-vitvin` — blamussla: ...: 1, enhet: "kg", vara: "blåmusslor" }   - { mangd: 2, enh... → Byt blåmusslor mot pilgrimsmusslor eller hjärtmusslor.
- `middagar/nikujaga-utan-potatis-lchf` — potatis: ...notering: "i 2 cm bitar (potatis-substitut)" }   - { mang... → Ta bort potatis. Använd blomkål eller rotselleri.
- `middagar/nikujaga-utan-potatis-lchf` — potatis: ...assisk nikujaga använder potatis. rotselleri har lägre kh... → Ta bort potatis. Använd blomkål eller rotselleri.
- `middagar/pekinganka-style-kyckling-wraps` — honung: ...klingen med soja-vinegar+honung+fem-krydda." }   - { nam... → Säkerställ att 'honung' alltid är 'erytritol-honung' (sötningsersättning).
- `middagar/vietnamesisk-pho-gryta-lchf` — koriander_blad: ...ips:   - "originalet har koriander — vi ersätter med thaiba... → Ta bort koriander-blad-referens. Kontrollera kontext: koriander-frö är OK i kryddblandningar.
- `sallader/cobb-bowl` — blamogel: ...: 50, enhet: "g", vara: "blåmögelost", notering: "skip — s... → Byt blåmögelost mot mild ost (cheddar, halloumi, getost).
- `saser/kall-pepparsas` — lohmander_varma: ...göra själv.  obs: undvik lohmanders **varma** pepparsås (flaska från jensens... → Byt Lohmanders varma flasksås mot egen sås (smör/grädde-bas).
- `snacks/avokado-deviled-eggs` — koriander_blad: ...stil: chiliflakes, lime, koriander — men byt koriander... → Ta bort koriander-blad-referens. Kontrollera kontext: koriander-frö är OK i kryddblandningar.
- `snacks/avokado-deviled-eggs` — koriander_blad: ...ime, koriander — men byt koriander     mot persilja. testlo... → Ta bort koriander-blad-referens. Kontrollera kontext: koriander-frö är OK i kryddblandningar.
- `soppor/broccolisoppa` — koriander_blad: ...1 tsk curry. servera med koriander. - **förstärkt protein:*... → Ta bort koriander-blad-referens. Kontrollera kontext: koriander-frö är OK i kryddblandningar.
- `soppor/raksoppa` — blamussla: ...- **med musslor:** 200 g blåmusslor sista 2 min — ångas öp... → Byt blåmusslor mot pilgrimsmusslor eller hjärtmusslor.
### Bevaka

- `drycker/cosmopolitan-keto` — juice: ...sukrin-baserad cranberry-juice", notering: "\"keto cran... → Verifiera att juice är osötad eller används i mycket små mängder. Stefan undviker juice generellt.
- `middagar/ankbrost-apelsinsas-lchf` — juice: ...lsinskal ger smaken utan apelsinjuice som har för mycket kh. t... → Verifiera att juice är osötad eller används i mycket små mängder. Stefan undviker juice generellt.

## Strukturproblem

### Allvar: medium

Saknad metadata som påverkar sajt-funktioner (filter, glukos-kalkyl,
Jessica-vy, testlogg-historik).

**färre än 3 tillagningssteg** (215):
- `baser/broccolimos-cheddar` — färre än 3 tillagningssteg (1)
- `baser/fankalstek-stekt` — färre än 3 tillagningssteg (1)
- `baser/haricots-grä-kokt` — färre än 3 tillagningssteg (1)
- `baser/rosenkal-stekta` — färre än 3 tillagningssteg (2)
- `baser/savoy-vitkalsmix` — färre än 3 tillagningssteg (1)
- `baser/smorstekt-savojkal` — färre än 3 tillagningssteg (1)
- `baser/spenat-smorslokt` — färre än 3 tillagningssteg (1)
- `brod/lchf-rull` — färre än 3 tillagningssteg (2)
- `drycker/aperol-mocktail` — färre än 3 tillagningssteg (1)
- `drycker/aperol-spritz-keto` — färre än 3 tillagningssteg (2)
- `drycker/avocado-grön-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/avokado-protein-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/berries-prosecco-mocktail` — färre än 3 tillagningssteg (2)
- `drycker/blabar-citron-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/blabar-mandelmjolk-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/chia-bär-smoothie` — färre än 3 tillagningssteg (2)
- `drycker/chokladprotein-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/citron-ingefara-te` — färre än 3 tillagningssteg (2)
- `drycker/citrus-spritz` — färre än 3 tillagningssteg (1)
- `drycker/cosmopolitan-keto` — färre än 3 tillagningssteg (2)
- `drycker/frukost-smoothie-hallon-kokos-agg` — färre än 3 tillagningssteg (2)
- `drycker/gin-tonic-mocktail-virgin` — färre än 3 tillagningssteg (2)
- `drycker/gron-smoothie-spenat-kokos` — färre än 3 tillagningssteg (2)
- `drycker/grön-smoothie-spenat-avokado` — färre än 3 tillagningssteg (1)
- `drycker/gurka-mintvatten` — färre än 3 tillagningssteg (1)
- `drycker/hallon-kvarg-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/halloncoconut-protein-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/ingefara-citron-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/ingefara-pepparrot-shot` — färre än 3 tillagningssteg (2)
- `drycker/jordgubbe-kokos-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/jordgubbe-spenat-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/kakao-banan-utan-banan` — färre än 3 tillagningssteg (1)
- `drycker/kanel-mandel-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/kanel-vanilj-shake` — färre än 3 tillagningssteg (2)
- `drycker/keto-margarita` — färre än 3 tillagningssteg (2)
- `drycker/keto-pina-colada` — färre än 3 tillagningssteg (1)
- `drycker/kokos-citron-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/martini-dry` — färre än 3 tillagningssteg (2)
- `drycker/matcha-mandel-smoothie` — färre än 3 tillagningssteg (2)
- `drycker/mojito-classic` — färre än 3 tillagningssteg (2)
- `drycker/mojito-mocktail` — färre än 3 tillagningssteg (2)
- `drycker/protein-aggvita-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/rödvin-glas` — färre än 3 tillagningssteg (1)
- `drycker/vanilj-kokos-smoothie` — färre än 3 tillagningssteg (1)
- `drycker/virgin-bloody-mary` — färre än 3 tillagningssteg (1)
- `drycker/vitvin-glas` — färre än 3 tillagningssteg (1)
- `drycker/vodka-soda-lime` — färre än 3 tillagningssteg (1)
- `drycker/whiskey-on-the-rocks` — färre än 3 tillagningssteg (1)
- `drycker/whiskey-sour-keto` — färre än 3 tillagningssteg (2)
- `efterratter/choklad-avocado-mousse` — färre än 3 tillagningssteg (2)
- `efterratter/choklad-fudge-keto` — färre än 3 tillagningssteg (2)
- `efterratter/fudge-jordnotssmor` — färre än 3 tillagningssteg (2)
- `efterratter/hallon-yoghurt-bowl` — färre än 3 tillagningssteg (1)
- `efterratter/jordgubbe-rabarber-keto` — färre än 3 tillagningssteg (1)
- `efterratter/jordgubbschia-pudding` — färre än 3 tillagningssteg (1)
- `efterratter/kakaobollar-mandel` — färre än 3 tillagningssteg (2)
- `efterratter/kokosbollar-rom` — färre än 3 tillagningssteg (1)
- `efterratter/mascarpone-bar-bowl` — färre än 3 tillagningssteg (2)
- `efterratter/mascarponemousse-vanilj` — färre än 3 tillagningssteg (2)
- `efterratter/osttarta-citronkrame` — färre än 3 tillagningssteg (2)
- `festmat/fyrkanntad-kotbullar` — färre än 3 tillagningssteg (2)
- `festmat/gravad-lax-hela` — färre än 3 tillagningssteg (2)
- `festmat/rakgryta-helg` — färre än 3 tillagningssteg (2)
- `forrad/kapris-i-vinäger` — färre än 3 tillagningssteg (2)
- `forrad/lchf-tomatsås` — färre än 3 tillagningssteg (2)
- `forrad/olja-vitlok-rosmarin` — färre än 3 tillagningssteg (2)
- `forrad/pesto-genovese-burk` — färre än 3 tillagningssteg (2)
- `forrad/piclad-gurka-dill` — färre än 3 tillagningssteg (2)
- `forrad/piclad-paprika-syrlig` — färre än 3 tillagningssteg (2)
- `forratter/agg-och-rom` — färre än 3 tillagningssteg (2)
- `forratter/agghalvor-rom-citron` — färre än 3 tillagningssteg (2)
- `forratter/biff-tartar-klassisk` — färre än 3 tillagningssteg (2)
- `forratter/bruschetta-fathead-tomat` — färre än 3 tillagningssteg (2)
- `forratter/gravad-lax-senapsdressing` — färre än 3 tillagningssteg (2)
- `forratter/mozzarella-tomat-tornette` — färre än 3 tillagningssteg (2)
- `forratter/oxcarpaccio-rucola-parmesan` — färre än 3 tillagningssteg (2)
- `forratter/pilgrimsmussla-citronsmor` — färre än 3 tillagningssteg (2)
- `frukost/aggcups-bacon-ost` — färre än 3 tillagningssteg (2)
- `frukost/aggrora-med-gradde` — färre än 3 tillagningssteg (2)
- `frukost/avokado-stekt-agg` — färre än 3 tillagningssteg (2)
- `frukost/biff-tartar-frukost` — färre än 3 tillagningssteg (2)
- `frukost/chia-pudding-kokos` — färre än 3 tillagningssteg (2)
- `frukost/cottage-cheese-tomat` — färre än 3 tillagningssteg (1)
- `frukost/crepes-citron` — färre än 3 tillagningssteg (1)
- `frukost/feta-tomat-omelett` — färre än 3 tillagningssteg (2)
- `frukost/grekisk-yoghurt-valnotter` — färre än 3 tillagningssteg (1)
- `frukost/helgbrunch-skinkomelett` — färre än 3 tillagningssteg (2)
- `frukost/klassisk-bacon-och-agg` — färre än 3 tillagningssteg (2)
- `frukost/kokosgrot-kanel` — färre än 3 tillagningssteg (2)
- `frukost/kvargbowl-bar-mandlar` — färre än 3 tillagningssteg (1)
- `frukost/lchf-pannkakor-kvarg` — färre än 3 tillagningssteg (2)
- `frukost/overnight-chia-vanilj` — färre än 3 tillagningssteg (1)
- `frukost/protein-pannkakor` — färre än 3 tillagningssteg (1)
- `frukost/rakmacka-fathead` — färre än 3 tillagningssteg (1)
- `frukost/smorstekt-korv-agg` — färre än 3 tillagningssteg (2)
- `frukost/spenat-omelett-feta` — färre än 3 tillagningssteg (2)
- `glass/chokladglass` — färre än 3 tillagningssteg (2)
- `glass/kakao-mintglass` — färre än 3 tillagningssteg (1)
- `glass/kanel-glass` — färre än 3 tillagningssteg (1)
- `glass/kokosglass` — färre än 3 tillagningssteg (1)
- `glass/nicks-sea-salt-caramel` — färre än 3 tillagningssteg (2)
- `glass/pistage-glass` — färre än 3 tillagningssteg (2)
- `glass/sallad-glass-blabar` — färre än 3 tillagningssteg (1)
- `grill/asiatisk-grillmarinad-soja-ingefara` — färre än 3 tillagningssteg (2)
- `grill/chimichurri` — färre än 3 tillagningssteg (2)
- `grill/citron-pepparrub` — färre än 3 tillagningssteg (1)
- `grill/dijonsenap-honungs-glaze` — färre än 3 tillagningssteg (2)
- `grill/gremolata` — färre än 3 tillagningssteg (1)
- `grill/grillad-makrill-fankal-citron` — färre än 3 tillagningssteg (2)
- `grill/picklad-rodlok-grillkvall` — färre än 3 tillagningssteg (2)
- `grill/tex-mex-rub-chipotle` — färre än 3 tillagningssteg (1)
- `grill/universal-grill-rub-sukrin` — färre än 3 tillagningssteg (2)
- `grill/yoghurt-mintsas-till-lamm` — färre än 3 tillagningssteg (1)
- `middagar/fisk-i-baljvitvinsbuljong` — färre än 3 tillagningssteg (2)
- `middagar/kyckling-marsala` — färre än 3 tillagningssteg (2)
- `middagar/kyckling-piccata` — färre än 3 tillagningssteg (2)
- `middagar/lax-i-folie-citron-dill` — färre än 3 tillagningssteg (2)
- `middagar/lax-pesto-uppskuren` — färre än 3 tillagningssteg (2)
- `middagar/porchetta-italiensk-style` — färre än 3 tillagningssteg (2)
- `middagar/pyttipanna-lchf` — färre än 3 tillagningssteg (2)
- `middagar/rakor-skagen-modernt` — färre än 3 tillagningssteg (2)
- `middagar/torsk-skinka-pesto` — färre än 3 tillagningssteg (2)
- `proteiner/agghalvor-rom` — färre än 3 tillagningssteg (2)
- `proteiner/kalv-tartar` — färre än 3 tillagningssteg (2)
- `proteiner/lammbog-stekt-tunnt` — färre än 3 tillagningssteg (1)
- `proteiner/lammkorv-hemmagjord` — färre än 3 tillagningssteg (2)
- `proteiner/sashimi-thunfisk` — färre än 3 tillagningssteg (2)
- `sallader/aggsallad-pa-fathead` — färre än 3 tillagningssteg (2)
- `sallader/biff-rucola-parmesan` — färre än 3 tillagningssteg (2)
- `sallader/caesar-kyckling-anchovis` — färre än 3 tillagningssteg (2)
- `sallader/cobb-bowl` — färre än 3 tillagningssteg (1)
- `sallader/grekisk-feta-oliver` — färre än 3 tillagningssteg (2)
- `sallader/kalkonsallad-tranbar-keto` — färre än 3 tillagningssteg (1)
- `sallader/kyckling-mandel-sallad` — färre än 3 tillagningssteg (2)
- `sallader/kyckling-sesam-sallad` — färre än 3 tillagningssteg (2)
- `sallader/kyckling-thai-mintsallad` — färre än 3 tillagningssteg (2)
- `sallader/lammkebab-grek` — färre än 3 tillagningssteg (2)
- `sallader/lax-citron-sparris-sallad` — färre än 3 tillagningssteg (2)
- `sallader/rakor-avokado-sallad` — färre än 3 tillagningssteg (1)
- `sallader/spaghetti-zucchini-pesto` — färre än 3 tillagningssteg (2)
- `sallader/spinat-feta-grek` — färre än 3 tillagningssteg (1)
- `sallader/tomato-mozzarella-basilika` — färre än 3 tillagningssteg (2)
- `sallader/tonfisk-keto-nicoise` — färre än 3 tillagningssteg (1)
- `sallader/tonfisk-medelhav-bowl` — färre än 3 tillagningssteg (1)
- `sallader/tonfisk-sallad-medelhav` — färre än 3 tillagningssteg (1)
- `saser/ailolisas-saffran` — färre än 3 tillagningssteg (2)
- `saser/beurre-blanc` — färre än 3 tillagningssteg (2)
- `saser/caesardressing` — färre än 3 tillagningssteg (1)
- `saser/chiliflingosmor` — färre än 3 tillagningssteg (1)
- `saser/chimichurri-rosa` — färre än 3 tillagningssteg (1)
- `saser/cocktailsas-lchf` — färre än 3 tillagningssteg (2)
- `saser/currysmor` — färre än 3 tillagningssteg (2)
- `saser/dillsas-kall` — färre än 3 tillagningssteg (2)
- `saser/gochujang-mayo` — färre än 3 tillagningssteg (1)
- `saser/gravlax-sas-senap` — färre än 3 tillagningssteg (1)
- `saser/gremolata-extra` — färre än 3 tillagningssteg (1)
- `saser/kall-vitloksas` — färre än 3 tillagningssteg (1)
- `saser/kallsas-rakor-cocktail` — färre än 3 tillagningssteg (1)
- `saser/lohmanders-aioli` — färre än 3 tillagningssteg (0)
- `saser/lohmanders-bea` — färre än 3 tillagningssteg (0)
- `saser/pesto-genovese-pinjenötter` — färre än 3 tillagningssteg (1)
- `saser/pesto-grön-pinjenot` — färre än 3 tillagningssteg (1)
- `saser/ranchdressing-keto` — färre än 3 tillagningssteg (1)
- `saser/remoulade-keto` — färre än 3 tillagningssteg (1)
- `saser/rod-pesto-soltorkad-tomat` — färre än 3 tillagningssteg (1)
- `saser/rodvinsas-bea-style` — färre än 3 tillagningssteg (2)
- `saser/rom-sour-cream-sas` — färre än 3 tillagningssteg (1)
- `saser/salsa-verde-italiensk` — färre än 3 tillagningssteg (1)
- `saser/sambal-sas` — färre än 3 tillagningssteg (1)
- `saser/sriracha-majo` — färre än 3 tillagningssteg (1)
- `saser/sweet-chili-sukrin` — färre än 3 tillagningssteg (1)
- `saser/tahini-citron` — färre än 3 tillagningssteg (1)
- `saser/tahinikram` — färre än 3 tillagningssteg (1)
- `saser/tartarsas` — färre än 3 tillagningssteg (1)
- `saser/vitlokssmor` — färre än 3 tillagningssteg (1)
- `snacks/agg-paté` — färre än 3 tillagningssteg (1)
- `snacks/agghalvor-majo-paprika` — färre än 3 tillagningssteg (1)
- `snacks/avokado-flingsalt-citron` — färre än 3 tillagningssteg (2)
- `snacks/cashews-soja-vitlok` — färre än 3 tillagningssteg (2)
- `snacks/cottage-cheese-paprika` — färre än 3 tillagningssteg (1)
- `snacks/cottage-cheese-vinbär` — färre än 3 tillagningssteg (1)
- `snacks/cucumber-rolls-fishtartare` — färre än 3 tillagningssteg (2)
- `snacks/energibollar-mandel-kakao` — färre än 3 tillagningssteg (2)
- `snacks/gurka-fetaost` — färre än 3 tillagningssteg (2)
- `snacks/gurkbatar-skinka` — färre än 3 tillagningssteg (1)
- `snacks/kavring-laxrora` — färre än 3 tillagningssteg (1)
- `snacks/krispigt-kalkonbacon` — färre än 3 tillagningssteg (1)
- `snacks/nordisk-charkplatta` — färre än 3 tillagningssteg (1)
- `snacks/olivmix-feta-vitlok` — färre än 3 tillagningssteg (1)
- `snacks/olivpate-tapenade` — färre än 3 tillagningssteg (2)
- `snacks/ostkex-vitlok` — färre än 3 tillagningssteg (1)
- `snacks/paprika-feta-spjut` — färre än 3 tillagningssteg (2)
- `snacks/parmesan-spjut` — färre än 3 tillagningssteg (1)
- `snacks/pekan-rosmarin-rostade` — färre än 3 tillagningssteg (2)
- `snacks/rostade-mandlar-rosmarin` — färre än 3 tillagningssteg (2)
- `snacks/rostade-pumpafron` — färre än 3 tillagningssteg (1)
- `snacks/salami-rullar-cream-cheese` — färre än 3 tillagningssteg (1)
- `snacks/salami-skinka-ost-bricka` — färre än 3 tillagningssteg (1)
- `snacks/tomatsallad-mozzarella-kuber` — färre än 3 tillagningssteg (1)
- `soppor/gazpacho-keto` — färre än 3 tillagningssteg (2)
- `soppor/taiwanesisk-bensoppa` — färre än 3 tillagningssteg (2)
- `tillbehor/avokado-flingsalt-citron` — färre än 3 tillagningssteg (2)
- `tillbehor/fankalstek-rostad` — färre än 3 tillagningssteg (2)
- `tillbehor/gronkalschips` — färre än 3 tillagningssteg (2)
- `tillbehor/guacamole` — färre än 3 tillagningssteg (1)
- `tillbehor/haloumi-stek` — färre än 3 tillagningssteg (2)
- `tillbehor/haricots-verts-mandel` — färre än 3 tillagningssteg (2)
- `tillbehor/koreanska-grokalchips` — färre än 3 tillagningssteg (2)
- `tillbehor/rostad-blomkal-cumin` — färre än 3 tillagningssteg (2)
- `tillbehor/rostad-broccoli-vitlok` — färre än 3 tillagningssteg (2)
- `tillbehor/rostad-paprika` — färre än 3 tillagningssteg (2)
- `tillbehor/rostad-rotselleri` — färre än 3 tillagningssteg (2)
- `tillbehor/rostad-zucchini-parmesan` — färre än 3 tillagningssteg (2)
- `tillbehor/rostat-rotselleri-lchf` — färre än 3 tillagningssteg (2)
- `tillbehor/spenat-pinjenotter` — färre än 3 tillagningssteg (2)

**saknar jessica_tagg** (129):
- `middagar/ankbrost-apelsinsas-lchf` — saknar jessica_tagg
- `middagar/bibimbap-bowl-lchf` — saknar jessica_tagg
- `middagar/biff-rydberg-rotselleri` — saknar jessica_tagg
- `middagar/bulgogi-kyckling` — saknar jessica_tagg
- `middagar/bun-bo-nam-bo-lchf` — saknar jessica_tagg
- `middagar/bun-cha-vietnamesiska-kottbullar` — saknar jessica_tagg
- `middagar/butter-chicken-lchf` — saknar jessica_tagg
- `middagar/caprese-baktade-tomater` — saknar jessica_tagg
- `middagar/char-siu-flask-ugn` — saknar jessica_tagg
- `middagar/duo-vitfisk-pilgrimsmussla` — saknar jessica_tagg
- `middagar/fisk-i-baljvitvinsbuljong` — saknar jessica_tagg
- `middagar/flaskfile-aplecidersås` — saknar jessica_tagg
- `middagar/flaskpannkaka-bacon` — saknar jessica_tagg
- `middagar/frittata-spenat-feta` — saknar jessica_tagg
- `middagar/fyllda-paprikor-kottfars` — saknar jessica_tagg
- `middagar/indisk-aggcurry` — saknar jessica_tagg
- `middagar/jansson-utan-potatis` — saknar jessica_tagg
- `middagar/kalops-traditionell` — saknar jessica_tagg
- `middagar/kalvfile-saltimbocca` — saknar jessica_tagg
- `middagar/kassler-bea-blomkalsmos` — saknar jessica_tagg
- `middagar/khao-soi-lchf` — saknar jessica_tagg
- `middagar/kinesisk-gron-kyckling-ingefara` — saknar jessica_tagg
- `middagar/korean-bbq-kalbi-lchf` — saknar jessica_tagg
- `middagar/korean-bibimbap-utan-ris-kottfars` — saknar jessica_tagg
- `middagar/kotbullar-grаdde` — saknar jessica_tagg
- `middagar/kotsoppa-svensk` — saknar jessica_tagg
- `middagar/kung-pao-kyckling` — saknar jessica_tagg
- `middagar/kungsrakor-vitlokssas` — saknar jessica_tagg
- `middagar/kyckling-bacon-svenska` — saknar jessica_tagg
- `middagar/kyckling-cacciatore` — saknar jessica_tagg
- `middagar/kyckling-marsala` — saknar jessica_tagg
- `middagar/kyckling-piccata` — saknar jessica_tagg
- `middagar/kycklingbrost-citronsmor-haricots` — saknar jessica_tagg
- `middagar/lamm-rogan-josh` — saknar jessica_tagg
- `middagar/lammkorma-kokos` — saknar jessica_tagg
- `middagar/lammracks-rosmarin-bea` — saknar jessica_tagg
- `middagar/lammrostbiff-rotselleri` — saknar jessica_tagg
- `middagar/larb-gai-thai-kycklingsallad` — saknar jessica_tagg
- `middagar/lax-i-folie-citron-dill` — saknar jessica_tagg
- `middagar/lax-italiensk-saltimbocca` — saknar jessica_tagg
- `middagar/lax-pesto-uppskuren` — saknar jessica_tagg
- `middagar/mapo-tofu-style-kottfars` — saknar jessica_tagg
- `middagar/massaman-curry-biff` — saknar jessica_tagg
- `middagar/misogryta-kyckling-wakame` — saknar jessica_tagg
- `middagar/mochiko-stekt-kyckling-lchf` — saknar jessica_tagg
- `middagar/mongolisk-biff-blomkalsris` — saknar jessica_tagg
- `middagar/mongoliska-rakor-stir-fry` — saknar jessica_tagg
- `middagar/moussaka-lchf` — saknar jessica_tagg
- `middagar/mussel-fond-vitvin` — saknar jessica_tagg
- `middagar/nikujaga-utan-potatis-lchf` — saknar jessica_tagg
- `middagar/osso-bucco-style` — saknar jessica_tagg
- `middagar/oxfile-rodvin-blomkalsmos` — saknar jessica_tagg
- `middagar/oxstek-italiensk-stil` — saknar jessica_tagg
- `middagar/pad-krapow-kycklingfars` — saknar jessica_tagg
- `middagar/pannbiff-jagarsas-svampfri` — saknar jessica_tagg
- `middagar/pasta-zoodles-bolognese` — saknar jessica_tagg
- `middagar/pekinganka-style-kyckling-wraps` — saknar jessica_tagg
- `middagar/porchetta-italiensk-style` — saknar jessica_tagg
- `middagar/puttanesca-zoodles` — saknar jessica_tagg
- `middagar/pyttipanna-lchf` — saknar jessica_tagg
- `middagar/rakor-kokos-curry` — saknar jessica_tagg
- `middagar/rakor-skagen-modernt` — saknar jessica_tagg
- `middagar/romersk-mozzarella-aubergine` — saknar jessica_tagg
- `middagar/saag-paneer-spenat-ost` — saknar jessica_tagg
- `middagar/saltvattenskraftor-dill` — saknar jessica_tagg
- `middagar/sjomansbiff-lchf` — saknar jessica_tagg
- `middagar/spansk-paella-lchf` — saknar jessica_tagg
- `middagar/sukiyaki-gryta` — saknar jessica_tagg
- `middagar/teriyaki-lax-blomkalsris` — saknar jessica_tagg
- `middagar/thai-biff-lime-bladsas` — saknar jessica_tagg
- `middagar/thai-fisk-bananblad` — saknar jessica_tagg
- `middagar/thai-laksa-rakor` — saknar jessica_tagg
- `middagar/thai-lammkebab-spett` — saknar jessica_tagg
- `middagar/thai-rakstir-fry-chili-vitlok` — saknar jessica_tagg
- `middagar/tikka-masala-kyckling` — saknar jessica_tagg
- `middagar/tom-kha-gai` — saknar jessica_tagg
- `middagar/tonkatsu-style-flaskschnitzel-lchf` — saknar jessica_tagg
- `middagar/torsk-skinka-pesto` — saknar jessica_tagg
- `middagar/twice-cooked-pork-sichuan` — saknar jessica_tagg
- `middagar/vietnamesisk-kalvkebab-spett` — saknar jessica_tagg
- `middagar/vietnamesisk-kycklingsallad-mynta` — saknar jessica_tagg
- `middagar/vietnamesisk-pho-gryta-lchf` — saknar jessica_tagg
- `middagar/vindaloo-flask-het` — saknar jessica_tagg
- `middagar/yakitori-spett-kyckling` — saknar jessica_tagg
- `middagar/zucchini-lasagne-lchf` — saknar jessica_tagg
- `sallader/aggsallad-pa-fathead` — saknar jessica_tagg
- `sallader/asiatisk-biff-mintsallad` — saknar jessica_tagg
- `sallader/biff-rucola-parmesan` — saknar jessica_tagg
- `sallader/blomkals-tabbouleh` — saknar jessica_tagg
- `sallader/caesar-kyckling-anchovis` — saknar jessica_tagg
- `sallader/caesar-sallad-lchf-kyckling` — saknar jessica_tagg
- `sallader/cobb-bowl` — saknar jessica_tagg
- `sallader/grekisk-feta-oliver` — saknar jessica_tagg
- `sallader/halloumisallad-grillad-paprika` — saknar jessica_tagg
- `sallader/kalkonsallad-tranbar-keto` — saknar jessica_tagg
- `sallader/kalrabbi-sallad-ingefara` — saknar jessica_tagg
- `sallader/kyckling-mandel-sallad` — saknar jessica_tagg
- `sallader/kyckling-sesam-sallad` — saknar jessica_tagg
- `sallader/kyckling-thai-mintsallad` — saknar jessica_tagg
- `sallader/lammkebab-grek` — saknar jessica_tagg
- `sallader/lax-citron-sparris-sallad` — saknar jessica_tagg
- `sallader/nicoise-sallad-lchf` — saknar jessica_tagg
- `sallader/rakor-avokado-sallad` — saknar jessica_tagg
- `sallader/rakor-avokado-sesamsallad` — saknar jessica_tagg
- `sallader/spaghetti-zucchini-pesto` — saknar jessica_tagg
- `sallader/spinat-feta-grek` — saknar jessica_tagg
- `sallader/tomato-mozzarella-basilika` — saknar jessica_tagg
- `sallader/tonfisk-keto-nicoise` — saknar jessica_tagg
- `sallader/tonfisk-medelhav-bowl` — saknar jessica_tagg
- `sallader/tonfisk-sallad-medelhav` — saknar jessica_tagg
- `soppor/asiatisk-buljong-agg` — saknar jessica_tagg
- `soppor/asiatisk-kokossoppa-kyckling` — saknar jessica_tagg
- `soppor/asiatisk-laksa` — saknar jessica_tagg
- `soppor/blomkalssoppa` — saknar jessica_tagg
- `soppor/borsjt-lchf` — saknar jessica_tagg
- `soppor/broccolisoppa` — saknar jessica_tagg
- `soppor/cheddar-broccolisoppa` — saknar jessica_tagg
- `soppor/fransk-fisksoppa-bouillabaisse` — saknar jessica_tagg
- `soppor/fransk-loksoppa` — saknar jessica_tagg
- `soppor/gazpacho-keto` — saknar jessica_tagg
- `soppor/gulash-soppa` — saknar jessica_tagg
- `soppor/kall-avokadosoppa` — saknar jessica_tagg
- `soppor/kalsoppa` — saknar jessica_tagg
- `soppor/kokt-tomatsoppa-creme` — saknar jessica_tagg
- `soppor/krameringd-spenatsoppa` — saknar jessica_tagg
- `soppor/kycklingsoppa` — saknar jessica_tagg
- `soppor/mexikansk-kycklingsoppa` — saknar jessica_tagg
- `soppor/taiwanesisk-bensoppa` — saknar jessica_tagg
- `soppor/vichyssoise-lchf` — saknar jessica_tagg

**saknar testlogg-fält** (2):
- `saser/lohmanders-aioli` — saknar testlogg-fält
- `saser/lohmanders-bea` — saknar testlogg-fält

### Allvar: minor

Mindre allvarliga: brödtext kort, saknar tips, saknar total_min,
sträng-ingredienser. Ofta avsiktligt (drycker/snacks-recept är korta).

**brödtext under 100 tecken** (505):
- `baser/aubergine-stekt` — brödtext kort (18 tecken)
- `baser/broccolimos-cheddar` — brödtext kort (22 tecken)
- `baser/fankalstek-stekt` — brödtext kort (22 tecken)
- `baser/haricots-grä-kokt` — brödtext kort (11 tecken)
- `baser/rosenkal-stekta` — brödtext kort (14 tecken)
- `baser/savoy-vitkalsmix` — brödtext kort (8 tecken)
- `baser/smorstekt-savojkal` — brödtext kort (27 tecken)
- `baser/spenat-smorslokt` — brödtext kort (10 tecken)
- `brod/fathead-bagels` — brödtext kort (20 tecken)
- `brod/fathead-fralla` — brödtext kort (25 tecken)
- `brod/fathead-pizzabotten` — brödtext kort (19 tecken)
- `brod/fathead-tortilla` — brödtext kort (28 tecken)
- `brod/kokos-bullar` — brödtext kort (25 tecken)
- `brod/lchf-bullar-jordnotssmor` — brödtext kort (19 tecken)
- `brod/lchf-fokaccia-rosmarin` — brödtext kort (0 tecken)
- `brod/lchf-hamburgerbullar` — brödtext kort (0 tecken)
- `brod/lchf-kanelbullar` — brödtext kort (0 tecken)
- `brod/lchf-naan-vitlok` — brödtext kort (0 tecken)
- `brod/lchf-pita` — brödtext kort (0 tecken)
- `brod/lchf-rull` — brödtext kort (16 tecken)
- `brod/lchf-scones-cheddar` — brödtext kort (19 tecken)
- `brod/lchf-scones-sota` — brödtext kort (0 tecken)
- `brod/lchf-tunnbrod` — brödtext kort (0 tecken)
- `brod/mandelmjol-skivbrod-2` — brödtext kort (20 tecken)
- `brod/mandelmjols-skivbrod` — brödtext kort (0 tecken)
- `brod/pizza-fathead-margarita` — brödtext kort (25 tecken)
- `brod/pizzabotten-blomkal` — brödtext kort (22 tecken)
- `drycker/aperol-mocktail` — brödtext kort (22 tecken)
- `drycker/aperol-spritz-keto` — brödtext kort (50 tecken)
- `drycker/avocado-grön-smoothie` — brödtext kort (46 tecken)
- _(+475 fler — se /tmp/scan_result.json för full lista)_

**ostrukturerade ingredienser** (113):
- `baser/aubergine-stekt` — 1 sträng-ingrediens(er): ['Färsk basilika']
- `baser/haricots-grä-kokt` — 1 sträng-ingrediens(er): ['Flingsalt']
- `brod/pizza-fathead-margarita` — 1 sträng-ingrediens(er): ['Färsk basilika']
- `drycker/aperol-spritz-keto` — 2 sträng-ingrediens(er): ['Apelsinklyfta', 'Isbitar']
- `drycker/avokado-protein-smoothie` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/chokladprotein-smoothie` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/citrus-spritz` — 1 sträng-ingrediens(er): ['Isbitar och rosmarinkvist']
- `drycker/cosmopolitan-keto` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/gin-tonic-light` — 2 sträng-ingrediens(er): ['Isbitar', 'Gurka eller rosmarin']
- `drycker/gin-tonic-mocktail-virgin` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/grön-smoothie-spenat-avokado` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/gurka-mintvatten` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/kakao-banan-utan-banan` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/keto-margarita` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/keto-old-fashioned` — 2 sträng-ingrediens(er): ['Apelsinskal', 'Stor isklump']
- `drycker/keto-pina-colada` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/kokos-citron-smoothie` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/martini-dry` — 2 sträng-ingrediens(er): ['Isbitar', 'Olive eller citronskal']
- `drycker/matcha-mandel-smoothie` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/mintchoco-iste` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/mojito-classic` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/mojito-mocktail` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/protein-aggvita-smoothie` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/thai-iste` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/vanilj-kokos-smoothie` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/virgin-bloody-mary` — 1 sträng-ingrediens(er): ['Selleristjälk till garnering']
- `drycker/vodka-soda-lime` — 1 sträng-ingrediens(er): ['Isbitar']
- `drycker/whiskey-on-the-rocks` — 1 sträng-ingrediens(er): ['Isbitar (gärna stor klump)']
- `drycker/whiskey-sour-keto` — 1 sträng-ingrediens(er): ['Isbitar']
- `efterratter/tiramisu-keto` — 1 sträng-ingrediens(er): ['LCHF-kex som "ladyfingers"']
- _(+83 fler — se /tmp/scan_result.json för full lista)_

**saknar tips** (299):
- `baser/aubergine-stekt` — saknar tips eller tom
- `baser/broccolimos-cheddar` — saknar tips eller tom
- `baser/fankalstek-stekt` — saknar tips eller tom
- `baser/haricots-grä-kokt` — saknar tips eller tom
- `baser/rosenkal-stekta` — saknar tips eller tom
- `baser/savoy-vitkalsmix` — saknar tips eller tom
- `baser/smorstekt-savojkal` — saknar tips eller tom
- `baser/spenat-smorslokt` — saknar tips eller tom
- `brod/fathead-bagels` — saknar tips eller tom
- `brod/fathead-fralla` — saknar tips eller tom
- `brod/fathead-pizzabotten` — saknar tips eller tom
- `brod/fathead-tortilla` — saknar tips eller tom
- `brod/kokos-bullar` — saknar tips eller tom
- `brod/lchf-bullar-jordnotssmor` — saknar tips eller tom
- `brod/lchf-rull` — saknar tips eller tom
- `brod/lchf-scones-cheddar` — saknar tips eller tom
- `brod/mandelmjol-skivbrod-2` — saknar tips eller tom
- `brod/pizza-fathead-margarita` — saknar tips eller tom
- `brod/pizzabotten-blomkal` — saknar tips eller tom
- `drycker/aperol-mocktail` — saknar tips eller tom
- `drycker/aperol-spritz-keto` — saknar tips eller tom
- `drycker/avocado-grön-smoothie` — saknar tips eller tom
- `drycker/avokado-protein-smoothie` — saknar tips eller tom
- `drycker/berries-prosecco-mocktail` — saknar tips eller tom
- `drycker/blabar-citron-smoothie` — saknar tips eller tom
- `drycker/blabar-mandelmjolk-smoothie` — saknar tips eller tom
- `drycker/chia-bär-smoothie` — saknar tips eller tom
- `drycker/chokladprotein-smoothie` — saknar tips eller tom
- `drycker/citron-ingefara-te` — saknar tips eller tom
- `drycker/citrus-spritz` — saknar tips eller tom
- _(+269 fler — se /tmp/scan_result.json för full lista)_

**tid saknar total_min** (3):
- `glass/nicks-sea-salt-caramel` — tid saknar total_min
- `saser/lohmanders-aioli` — tid saknar total_min
- `saser/lohmanders-bea` — tid saknar total_min

## Slug-byten att överväga (KRÄVER STEFAN-BEKRÄFTELSE)

Slugar som innehåller stavfel som redan rättats i `namn`-fältet.
Slug-byte = radera + skapa ny — kräver explicit godkännande.

- `festmat/fyrkanntad-kotbullar` (namn: "Fyrkantade köttbullar (feststil)") → föreslagen slug: `fyrkantade-kottbullar-feststil`
- `proteiner/krasna-rakor-vitlok` (namn: "Krispiga räkor med vitlök (gambas al ajillo)") → föreslagen slug: `krispiga-rakor-med-vitlok-gambas-al-ajillo`
- `soppor/krameringd-spenatsoppa` (namn: "Krämig spenatsoppa") → föreslagen slug: `kramig-spenatsoppa`
- `tillbehor/krasna-rostade-tomater` (namn: "Rostade körsbärstomater med vitlök") → föreslagen slug: `rostade-korsbarstomater-med-vitlok`

## Dubbletter att radera (KRÄVER STEFAN-BEKRÄFTELSE)

- `avokado-flingsalt-citron` finns i flera moduler:
  - `content/snacks/avokado-flingsalt-citron.md`
  - `content/tillbehor/avokado-flingsalt-citron.md`

**Bekräftad åtgärd från brief:** radera `content/snacks/avokado-flingsalt-citron.md`
(tillbehor-versionen behålls).

## Anmärkning om autofix-överraskningar

Word-boundary-substitutionen `Vinda → Vänd` är applicerad även där
kontexten kan ha avsett `Vispa` (t.ex. `grill/grillade-kycklingvingar-harissa.md`
rad 53: "Vänd olivolja, harissa…" — sannolikt bättre `Vispa` eller `Blanda`).
Ingen genuint felaktig översättning, men kan vara värt att finputsa.

Autofix av `bakplats → bakplåtspapper` är en kvalificerad gissning
(Stefan har skrivit `bakplats` på platser där `bakplåtspapper` är
kontextuellt rätt). Om något recept faktiskt avsåg `bakplåt` eller
`bakplats` (position) — säg till.

---

_Genererad 2026-05-11 efter quality-pass över 549 recept._