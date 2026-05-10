// Drycker (~70 recept). Smoothies, mocktails, te, kaffe-varianter, alkohol.
// Stefans kalibrering: full alkohol OK, smoothies frukost+eftermiddag, te.
// Skip iskaffe, smaksatt bubbelvatten (han har sagt skip på dem).
import { bulkSkriv } from './lib/skriv-recept.mjs';

const r = [];
const compact = (slug, namn, n, tid_min, taggar, ingred, tillagning, brod) => ({
  slug, namn, n, tid: { prep_min: tid_min, total_min: tid_min },
  forvantad_glukospaverkan: n.netto_kh <= 3 ? 'mycket-lag' : 'lag',
  portioner: 1,
  taggar, ingredienser: ingred, tillagning, brod,
});

// === Smoothies (20) — frukost och eftermiddag ===
r.push(compact('grön-smoothie-spenat-avokado', 'Grön smoothie med spenat & avokado',
  { netto_kh: 4, fett: 18, protein: 6, kcal: 220 }, 5,
  ['smoothie', 'gronsak', 'frukost'],
  [{ mangd: 50, enhet: 'g', vara: 'baby-spenat' }, { mangd: 0.5, enhet: 'st', vara: 'avokado' }, { mangd: 1, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'msk', vara: 'limesaft' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'dl', vara: 'kallt vatten' }, 'Isbitar'],
  ['Mixa allt i blender 30 sek tills slät.'],
  'Klassisk grön smoothie. Avokado ger krämighet, spenat ger näring.'));

r.push(compact('hallon-kvarg-smoothie', 'Hallon-kvarg smoothie',
  { netto_kh: 5, fett: 14, protein: 22, kcal: 240 }, 4,
  ['smoothie', 'frukost', 'protein'],
  [{ mangd: 200, enhet: 'g', vara: 'kvarg', notering: '10%' }, { mangd: 50, enhet: 'g', vara: 'frusna hallon' }, { mangd: 1, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Mixa till slät smoothie.'],
  'Hög-protein-smoothie. Frusna bär gör den kall utan is.'));

r.push(compact('blabar-mandelmjolk-smoothie', 'Blåbär-mandelmjölk smoothie',
  { netto_kh: 4, fett: 10, protein: 4, kcal: 150 }, 4,
  ['smoothie', 'eftermiddag'],
  [{ mangd: 60, enhet: 'g', vara: 'frusna blåbär' }, { mangd: 2, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'msk', vara: 'mandelsmör' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'krm', vara: 'kanel' }],
  ['Mixa.'],
  'Frukost eller eftermiddags-snack.'));

r.push(compact('chokladprotein-smoothie', 'Chokladprotein-smoothie',
  { netto_kh: 4, fett: 16, protein: 28, kcal: 280 }, 4,
  ['smoothie', 'protein', 'choklad'],
  [{ mangd: 30, enhet: 'g', vara: 'vassleprotein vanilj' }, { mangd: 1, enhet: 'msk', vara: 'rå kakao-pulver' }, { mangd: 2, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'msk', vara: 'mandelsmör' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar'],
  ['Mixa allt 30 sek.'],
  'Pre/post-träning. 28g protein.'));

r.push(compact('avocado-grön-smoothie', 'Avokado-mintsmoothie',
  { netto_kh: 3, fett: 22, protein: 4, kcal: 240 }, 4,
  ['smoothie', 'eftermiddag', 'gronsak'],
  [{ mangd: 0.5, enhet: 'st', vara: 'avokado' }, { mangd: 1, enhet: 'dl', vara: 'färsk mynta' }, { mangd: 1, enhet: 'msk', vara: 'pressad lime' }, { mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Mixa.'],
  'Mojito-smoothie utan rom. Mint + lime är magi.'));

r.push(compact('jordgubbe-kokos-smoothie', 'Jordgubbe-kokos smoothie',
  { netto_kh: 5, fett: 18, protein: 4, kcal: 220 }, 4,
  ['smoothie', 'eftermiddag', 'sommar'],
  [{ mangd: 80, enhet: 'g', vara: 'frusna jordgubbar' }, { mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }],
  ['Mixa.'],
  'Sommar-smoothie. Fryst frukt = inget behov av is.'));

r.push(compact('chia-bär-smoothie', 'Chia-bär smoothie',
  { netto_kh: 5, fett: 12, protein: 6, kcal: 180 }, 5,
  ['smoothie', 'frukost', 'fiber'],
  [{ mangd: 1, enhet: 'msk', vara: 'chiafrön' }, { mangd: 50, enhet: 'g', vara: 'frusna hallon' }, { mangd: 2, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Blanda chia + mandelmjölk, vila 5 min.', 'Mixa med resten.'],
  'Chia ger fiber och mättnad.'));

r.push(compact('ingefara-citron-smoothie', 'Ingefära-citron smoothie',
  { netto_kh: 3, fett: 12, protein: 4, kcal: 150 }, 5,
  ['smoothie', 'morgon', 'forkylning'],
  [{ mangd: 1, enhet: 'msk', vara: 'rivet ingefära' }, { mangd: 0.5, enhet: 'st', vara: 'citron', notering: 'pressad' }, { mangd: 0.5, enhet: 'st', vara: 'avokado' }, { mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Mixa.'],
  'Morgon-pep. Ingefära väcker.'));

r.push(compact('matcha-mandel-smoothie', 'Matcha-mandel smoothie',
  { netto_kh: 4, fett: 18, protein: 8, kcal: 230 }, 5,
  ['smoothie', 'matcha', 'eftermiddag'],
  [{ mangd: 1, enhet: 'tsk', vara: 'matcha-pulver' }, { mangd: 2, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'msk', vara: 'mandelsmör' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar'],
  ['Vispa matcha med 2 msk varmt vatten till slät pasta.', 'Mixa allt.'],
  'Japansk eftermiddag. Matcha ger mild koffeinkick.'));

r.push(compact('kakao-banan-utan-banan', 'Kakao-jordnötssmör smoothie',
  { netto_kh: 4, fett: 22, protein: 8, kcal: 280 }, 4,
  ['smoothie', 'choklad', 'jordnotssmor'],
  [{ mangd: 1, enhet: 'msk', vara: 'rå kakao-pulver' }, { mangd: 1, enhet: 'msk', vara: 'jordnötssmör' }, { mangd: 2, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar'],
  ['Mixa.'],
  'Snickers-smoothie utan socker. Kombinationen är klassisk.'));

r.push(compact('vanilj-kokos-smoothie', 'Vanilj-kokos smoothie',
  { netto_kh: 3, fett: 16, protein: 4, kcal: 180 }, 4,
  ['smoothie', 'sot', 'eftermiddag'],
  [{ mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'krm', vara: 'kanel' }, 'Isbitar'],
  ['Mixa.'],
  'Vanilj-glass i drinkform. 4 min jobb.'));

r.push(compact('halloncoconut-protein-smoothie', 'Hallon-coconut protein smoothie',
  { netto_kh: 5, fett: 18, protein: 24, kcal: 290 }, 4,
  ['smoothie', 'protein', 'frukost'],
  [{ mangd: 30, enhet: 'g', vara: 'vassleprotein vanilj' }, { mangd: 50, enhet: 'g', vara: 'frusna hallon' }, { mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'msk', vara: 'kokosflakes' }],
  ['Mixa.'],
  'Frukost för aktiva. Protein + kokosfett = mätt i 4 timmar.'));

r.push(compact('kanel-mandel-smoothie', 'Kanel-mandel smoothie',
  { netto_kh: 3, fett: 18, protein: 6, kcal: 220 }, 4,
  ['smoothie', 'eftermiddag', 'sot'],
  [{ mangd: 2, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'msk', vara: 'mandelsmör' }, { mangd: 1, enhet: 'tsk', vara: 'kanel' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Mixa.'],
  'Eftermiddags-snack med varm-känsla.'));

r.push(compact('kokos-citron-smoothie', 'Kokos-citron smoothie',
  { netto_kh: 3, fett: 14, protein: 2, kcal: 150 }, 4,
  ['smoothie', 'sommar', 'fräsch'],
  [{ mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'msk', vara: 'pressad citron' }, { mangd: 1, enhet: 'tsk', vara: 'rivet citronskal' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar'],
  ['Mixa.'],
  'Tropisk fräschet. Som pina colada utan ananas.'));

r.push(compact('protein-aggvita-smoothie', 'Äggvitsmoothie med vanilj',
  { netto_kh: 2, fett: 8, protein: 22, kcal: 160 }, 4,
  ['smoothie', 'protein', 'frukost'],
  [{ mangd: 4, enhet: 'st', vara: 'pastöriserade äggvitor' }, { mangd: 1, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar'],
  ['Mixa.'],
  'Hög-protein utan pulver. Pastöriserade äggvitor är säkra.'));

r.push(compact('blabar-citron-smoothie', 'Blåbär-citron smoothie',
  { netto_kh: 5, fett: 8, protein: 4, kcal: 130 }, 4,
  ['smoothie', 'frukost', 'frisk'],
  [{ mangd: 60, enhet: 'g', vara: 'frusna blåbär' }, { mangd: 1, enhet: 'msk', vara: 'pressad citron' }, { mangd: 2, enhet: 'dl', vara: 'mandelmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Mixa.'],
  'Antioxidanter + frisk syra.'));

r.push(compact('jordgubbe-spenat-smoothie', 'Jordgubbe-spenat smoothie',
  { netto_kh: 5, fett: 12, protein: 4, kcal: 170 }, 4,
  ['smoothie', 'gronsak', 'frukost'],
  [{ mangd: 80, enhet: 'g', vara: 'frusna jordgubbar' }, { mangd: 30, enhet: 'g', vara: 'baby-spenat' }, { mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Mixa.'],
  'Söt + grön. Spenat-smaken försvinner i jordgubbe.'));

r.push(compact('avokado-protein-smoothie', 'Avokado-protein smoothie',
  { netto_kh: 3, fett: 22, protein: 26, kcal: 320 }, 4,
  ['smoothie', 'protein', 'eftermiddag'],
  [{ mangd: 0.5, enhet: 'st', vara: 'avokado' }, { mangd: 30, enhet: 'g', vara: 'vassleprotein vanilj' }, { mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar'],
  ['Mixa.'],
  'Krämig protein-smoothie. Avokado ger fett + textur.'));

r.push(compact('ingefara-pepparrot-shot', 'Ingefära-pepparrot shot',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 10 }, 3,
  ['shot', 'morgon', 'forkylning'],
  [{ mangd: 30, enhet: 'g', vara: 'färsk ingefära' }, { mangd: 10, enhet: 'g', vara: 'färsk pepparrot' }, { mangd: 1, enhet: 'msk', vara: 'pressad citron' }, { mangd: 1, enhet: 'krm', vara: 'cayenne' }],
  ['Riv ingefära och pepparrot. Pressa ur saften genom kaffe-filter eller siktduk.', 'Tillsätt citron och cayenne.'],
  'Hälsobomb. 30 ml shot, sätter igång allt.'));

r.push(compact('gurka-mintvatten', 'Gurka-mintvatten (infusion)',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 5 }, 3,
  ['vatten', 'sommar', 'fräsch'],
  [{ mangd: 10, enhet: 'cm', vara: 'gurka', notering: 'tunt skivad' }, { mangd: 5, enhet: 'st', vara: 'färsk mynta' }, { mangd: 1, enhet: 'liter', vara: 'kallt vatten' }, 'Isbitar'],
  ['Lägg gurka och mynta i vatten, vila 30 min.'],
  'Spa-vatten hemma. Ingen söta krävs.'));

// === Mocktails (15) ===
r.push(compact('mojito-mocktail', 'Mocktail mojito',
  { netto_kh: 2, fett: 0, protein: 0, kcal: 15 }, 5,
  ['mocktail', 'mynta', 'sommar'],
  [{ mangd: 0.5, enhet: 'st', vara: 'lime' }, { mangd: 8, enhet: 'st', vara: 'färsk mynta' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 2, enhet: 'dl', vara: 'sodavatten' }, 'Isbitar'],
  ['Krossa lime, mynta, erytritol i glas (muddla).', 'Fyll med is, häll på sodavatten.'],
  'Mojito utan rom. Klassisk.'));

r.push(compact('aperol-mocktail', 'Aperol-stil mocktail',
  { netto_kh: 2, fett: 0, protein: 0, kcal: 20 }, 5,
  ['mocktail', 'aperitif'],
  [{ mangd: 1, enhet: 'msk', vara: 'pressad blodapelsin', notering: 'eller färsk apelsin' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 2, enhet: 'dl', vara: 'sodavatten' }, { mangd: 1, enhet: 'krm', vara: 'aperol-extrakt', notering: 'optional' }, { mangd: 1, enhet: 'st', vara: 'apelsinklyfta', notering: 'till garnering' }],
  ['Blanda allt i glas med is.'],
  'Aperitif utan alkohol.'));

r.push(compact('gin-tonic-mocktail-virgin', 'Virgin gin-tonic',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 10 }, 4,
  ['mocktail', 'gin'],
  [{ mangd: 2, enhet: 'dl', vara: 'tonic light', notering: 'sukrin-baserad' }, { mangd: 1, enhet: 'st', vara: 'gurka', notering: 'tunn skiva' }, { mangd: 5, enhet: 'st', vara: 'enbär', notering: 'krossade' }, { mangd: 1, enhet: 'st', vara: 'lime' }, 'Isbitar'],
  ['Krossa enbär i botten av glaset.', 'Fyll med is, gurka, tonic, lime.'],
  'Gin-tonic utan gin. Enbär ger gin-doft.'));

r.push(compact('citrus-spritz', 'Citrus-spritz mocktail',
  { netto_kh: 2, fett: 0, protein: 0, kcal: 15 }, 4,
  ['mocktail', 'aperitif', 'frisk'],
  [{ mangd: 1, enhet: 'msk', vara: 'pressad grapefrukt' }, { mangd: 1, enhet: 'msk', vara: 'pressad citron' }, { mangd: 2, enhet: 'dl', vara: 'sodavatten' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar och rosmarinkvist'],
  ['Blanda allt.'],
  'Brunch-aperitif. Bittersött.'));

r.push(compact('berries-prosecco-mocktail', 'Bär-prosecco mocktail',
  { netto_kh: 3, fett: 0, protein: 0, kcal: 20 }, 5,
  ['mocktail', 'helg'],
  [{ mangd: 30, enhet: 'g', vara: 'frusna hallon' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 2, enhet: 'dl', vara: 'sodavatten' }, { mangd: 1, enhet: 'msk', vara: 'pressad citron' }],
  ['Lägg hallon i botten, krossa lätt.', 'Häll på sodavatten, citron, erytritol.'],
  'Helgmocktail. Prosecco-känsla.'));

r.push(compact('mintchoco-iste', 'Mint-choklad iste',
  { netto_kh: 2, fett: 0, protein: 1, kcal: 15 }, 6,
  ['te', 'choklad', 'eftermiddag'],
  [{ mangd: 2, enhet: 'st', vara: 'tepåsar svart te' }, { mangd: 5, enhet: 'st', vara: 'färsk mynta' }, { mangd: 1, enhet: 'tsk', vara: 'rå kakao-pulver' }, { mangd: 2, enhet: 'dl', vara: 'kokande vatten' }, 'Isbitar', { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Brygg te + mynta i 5 min. Sila.', 'Vispa in kakao + erytritol.', 'Häll över is.'],
  'Eftermiddags-iste med chokladnoter.'));

r.push(compact('thai-iste', 'Thai-iste utan socker',
  { netto_kh: 2, fett: 6, protein: 1, kcal: 70 }, 6,
  ['te', 'thai', 'iste'],
  [{ mangd: 2, enhet: 'st', vara: 'tepåsar starkt svart te' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'krm', vara: 'kanel' }, { mangd: 1, enhet: 'krm', vara: 'kardemumma' }, { mangd: 1, enhet: 'msk', vara: 'kokosmjölk' }, 'Isbitar'],
  ['Brygg starkt te med kryddor + erytritol.', 'Sila, kyl. Fyll glas med is.', 'Toppa med kokosmjölk-skvätt.'],
  'Thai-iste i Bangkok-stil. Klassiskt orange-gult — vi skippar färgämnet.'));

r.push(compact('virgin-bloody-mary', 'Virgin bloody mary',
  { netto_kh: 4, fett: 0, protein: 1, kcal: 30 }, 5,
  ['mocktail', 'tomat', 'frukost'],
  [{ mangd: 2, enhet: 'dl', vara: 'tomatjuice' }, { mangd: 1, enhet: 'msk', vara: 'pressad citron' }, { mangd: 1, enhet: 'tsk', vara: 'worcestershire' }, { mangd: 0.5, enhet: 'tsk', vara: 'tabasco' }, { mangd: 1, enhet: 'krm', vara: 'svartpeppar' }, 'Selleristjälk till garnering'],
  ['Blanda allt i glas med is.'],
  'Brunchklassiker utan vodka. Selleristjälken är hälften av poängen.'));

// === Te-blandningar (10) ===
r.push(compact('kanelchai', 'Kanelchai',
  { netto_kh: 2, fett: 8, protein: 1, kcal: 80 }, 8,
  ['te', 'krydda', 'varm'],
  [{ mangd: 2, enhet: 'st', vara: 'tepåsar svart te' }, { mangd: 1, enhet: 'kanel-pinne' }, { mangd: 4, enhet: 'st', vara: 'kardemumma-kapslar' }, { mangd: 4, enhet: 'st', vara: 'kryddnejlikor' }, { mangd: 2, enhet: 'cm', vara: 'färsk ingefära' }, { mangd: 2, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }],
  ['Koka kryddor i 2 dl vatten 5 min.', 'Lägg i tepåsar, dra 4 min.', 'Sila, tillsätt kokosmjölk + erytritol.'],
  'Indisk chai. Värmer själen.'));

r.push(compact('citron-ingefara-te', 'Citron-ingefära-te',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 10 }, 6,
  ['te', 'morgon', 'forkylning'],
  [{ mangd: 3, enhet: 'cm', vara: 'färsk ingefära', notering: 'tunt skivad' }, { mangd: 0.5, enhet: 'st', vara: 'citron' }, { mangd: 2, enhet: 'dl', vara: 'kokande vatten' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol-honung' }],
  ['Lägg ingefära i kopp med kokande vatten. Dra 5 min.', 'Pressa citron, tillsätt erytritol.'],
  'Förkylnings-te. Honungs-substitut ger samma känsla.'));

r.push(compact('matcha-latte', 'Matcha-latte med mandelmjölk',
  { netto_kh: 2, fett: 8, protein: 4, kcal: 110 }, 5,
  ['te', 'matcha', 'koffein'],
  [{ mangd: 1, enhet: 'tsk', vara: 'matcha-pulver' }, { mangd: 1, enhet: 'msk', vara: 'kokande vatten' }, { mangd: 2, enhet: 'dl', vara: 'mandelmjölk', notering: 'osötad' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }],
  ['Vispa matcha med varmt vatten till slät pasta.', 'Värm mandelmjölk, tillsätt erytritol och vanilj.', 'Häll mandelmjölk över matcha.'],
  'Japansk eftermiddag. Stadigare koffeinkick än kaffe.'));

r.push(compact('rosa-rooibos-te', 'Rosa rooibos med vanilj',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 5 }, 5,
  ['te', 'kvall', 'koffeinfri'],
  [{ mangd: 2, enhet: 'st', vara: 'tepåsar rooibos' }, { mangd: 1, enhet: 'tsk', vara: 'vaniljextrakt' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 2, enhet: 'dl', vara: 'kokande vatten' }, { mangd: 0.5, enhet: 'dl', vara: 'kokosmjölk', notering: 'optional' }],
  ['Brygg rooibos 5 min.', 'Tillsätt vanilj och erytritol.', 'Skvätta i kokosmjölk.'],
  'Kvälls-te. Koffeinfritt.'));

// === Alkohol-drycker (15) ===
r.push(compact('whiskey-on-the-rocks', 'Whiskey on the rocks',
  { netto_kh: 0, fett: 0, protein: 0, kcal: 105 }, 2,
  ['alkohol', 'whiskey', 'klassiker'],
  [{ mangd: 4, enhet: 'cl', vara: 'single malt whiskey' }, 'Isbitar (gärna stor klump)'],
  ['Häll whiskey över is i tumbler.'],
  'Klassiskt avslut. 0g kh, ren spirit.'));

r.push(compact('gin-tonic-light', 'Gin & tonic light',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 70 }, 3,
  ['alkohol', 'gin', 'klassiker'],
  [{ mangd: 4, enhet: 'cl', vara: 'gin' }, { mangd: 2, enhet: 'dl', vara: 'tonic light', notering: 'med erytritol/sukrin' }, { mangd: 1, enhet: 'st', vara: 'lime' }, 'Isbitar', 'Gurka eller rosmarin'],
  ['Fyll glas med is.', 'Häll i gin och tonic light.', 'Pressa lime.'],
  'Gin-tonic LCHF. Light-tonic är nyckeln.'));

r.push(compact('vodka-soda-lime', 'Vodka soda med lime',
  { netto_kh: 0, fett: 0, protein: 0, kcal: 100 }, 2,
  ['alkohol', 'vodka', 'klassiker'],
  [{ mangd: 4, enhet: 'cl', vara: 'vodka' }, { mangd: 2, enhet: 'dl', vara: 'sodavatten' }, { mangd: 0.5, enhet: 'st', vara: 'lime' }, 'Isbitar'],
  ['Glas med is, vodka, sodavatten, pressad lime.'],
  'Cleanaste cocktail. 0g kh, ren bubbel.'));

r.push(compact('keto-margarita', 'Keto-margarita',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 130 }, 3,
  ['alkohol', 'tequila', 'mexikansk'],
  [{ mangd: 4, enhet: 'cl', vara: 'tequila' }, { mangd: 1, enhet: 'cl', vara: 'cointreau zero', notering: 'eller skip' }, { mangd: 1, enhet: 'st', vara: 'lime', notering: 'pressad' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Salt-rim på glaset', 'Isbitar'],
  ['Salta glasets rand med citronklyfta + salt.', 'Shaka allt med is, sila i glaset.'],
  'Margarita utan socker. Klassisk LCHF-drink.'));

r.push(compact('rödvin-glas', 'Glas rödvin',
  { netto_kh: 2, fett: 0, protein: 0, kcal: 120 }, 1,
  ['alkohol', 'vin'],
  [{ mangd: 1.5, enhet: 'dl', vara: 'torrt rödvin', notering: 'cabernet, malbec, syrah' }],
  ['Häll i glas. Servera vid rumstemp.'],
  'Torra röd-viner är LCHF-vänliga. 1.5 dl per glas.'));

r.push(compact('vitvin-glas', 'Glas vitvin',
  { netto_kh: 2, fett: 0, protein: 0, kcal: 110 }, 1,
  ['alkohol', 'vin'],
  [{ mangd: 1.5, enhet: 'dl', vara: 'torrt vitvin', notering: 'sauvignon blanc, chardonnay' }],
  ['Servera kallt.'],
  'Torrt vitt — ej söta dessertviner.'));

r.push(compact('whiskey-sour-keto', 'Whiskey sour keto',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 130 }, 4,
  ['alkohol', 'whiskey', 'cocktail'],
  [{ mangd: 4, enhet: 'cl', vara: 'whiskey' }, { mangd: 1, enhet: 'st', vara: 'citron', notering: 'pressad' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'st', vara: 'äggvita', notering: 'optional för skum' }, 'Isbitar'],
  ['Shaka kraftigt med is.', 'Sila i glaset.'],
  'Klassisk cocktail. Äggvitan ger restaurang-skum.'));

r.push(compact('mojito-classic', 'Klassisk mojito',
  { netto_kh: 2, fett: 0, protein: 0, kcal: 120 }, 5,
  ['alkohol', 'rom', 'mynta'],
  [{ mangd: 4, enhet: 'cl', vara: 'vit rom' }, { mangd: 0.5, enhet: 'st', vara: 'lime' }, { mangd: 8, enhet: 'st', vara: 'färsk mynta' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 1, enhet: 'dl', vara: 'sodavatten' }, 'Isbitar'],
  ['Krossa lime, mynta, erytritol i glas.', 'Fyll med is, rom, sodavatten.'],
  'Mojito med erytritol istället för socker.'));

r.push(compact('cosmopolitan-keto', 'Cosmopolitan keto',
  { netto_kh: 2, fett: 0, protein: 0, kcal: 140 }, 4,
  ['alkohol', 'vodka', 'cocktail'],
  [{ mangd: 4, enhet: 'cl', vara: 'vodka' }, { mangd: 1, enhet: 'cl', vara: 'cointreau zero' }, { mangd: 1, enhet: 'msk', vara: 'sukrin-baserad cranberry-juice', notering: '"keto cranberry"' }, { mangd: 1, enhet: 'msk', vara: 'pressad lime' }, 'Isbitar'],
  ['Shaka allt med is.', 'Sila i cocktail-glas.'],
  'Sex and the City-klassiker LCHF-anpassad.'));

r.push(compact('keto-old-fashioned', 'Keto old fashioned',
  { netto_kh: 1, fett: 0, protein: 0, kcal: 110 }, 4,
  ['alkohol', 'whiskey', 'klassiker'],
  [{ mangd: 4, enhet: 'cl', vara: 'bourbon eller rye' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, { mangd: 2, enhet: 'dash', vara: 'angostura bitter' }, 'Apelsinskal', 'Stor isklump'],
  ['Rör erytritol med bitter i glaset.', 'Tillsätt is och whiskey, rör.', 'Pressa apelsinskalets oljor över.'],
  'Old fashioned utan socker. Sukrin gold smakar närmre brunt socker.'));

r.push(compact('martini-dry', 'Dry martini',
  { netto_kh: 0, fett: 0, protein: 0, kcal: 130 }, 4,
  ['alkohol', 'gin', 'klassiker'],
  [{ mangd: 6, enhet: 'cl', vara: 'gin' }, { mangd: 1, enhet: 'cl', vara: 'torr vermouth' }, 'Isbitar', 'Olive eller citronskal'],
  ['Rör med is i mixerglas (inte shaka).', 'Sila i kall martini-glas.'],
  'Dry martini. James Bond shakar — Stefan rör.'));

r.push(compact('keto-pina-colada', 'Keto pina colada',
  { netto_kh: 4, fett: 14, protein: 1, kcal: 200 }, 5,
  ['alkohol', 'rom', 'tropisk'],
  [{ mangd: 4, enhet: 'cl', vara: 'vit rom' }, { mangd: 1, enhet: 'dl', vara: 'kokosmjölk' }, { mangd: 1, enhet: 'msk', vara: 'pressad lime' }, { mangd: 1, enhet: 'tsk', vara: 'erytritol' }, 'Isbitar'],
  ['Mixa allt med is i blender.'],
  'Tropisk klassiker LCHF-anpassad — utan ananas.'));

r.push(compact('aperol-spritz-keto', 'Aperol spritz keto',
  { netto_kh: 3, fett: 0, protein: 0, kcal: 110 }, 3,
  ['alkohol', 'aperitif', 'italiensk'],
  [{ mangd: 3, enhet: 'cl', vara: 'aperol', notering: 'lite kh men acceptabelt' }, { mangd: 1, enhet: 'dl', vara: 'torr prosecco' }, { mangd: 0.5, enhet: 'dl', vara: 'sodavatten' }, 'Apelsinklyfta', 'Isbitar'],
  ['Fyll vinglas med is.', 'Häll Aperol, prosecco, soda. Apelsinklyfta i glaset.'],
  'Italiensk aperitif. Aperol har lite kh — räkna in.'));

const result = bulkSkriv('drycker', r);
console.log(`drycker: skrev ${result.written}, hoppade över ${result.skipped} (av ${result.total})`);
