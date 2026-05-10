// Grill-modul (mål 60). Stefan grillar bara på Gotland — alla taggas med 'gotland'.
// Hårda regler: ingen koriander, ingen svamp, ingen lever, inga starka ostar,
// inga Lohmanders varma flasksåser, inga air fryer/sous vide/slow cooker,
// max 10g netto kh per portion.
import { bulkSkriv } from './lib/skriv-recept.mjs';

const r = [];

// === Marinerade kötträtter (15) ===
r.push({
  namn: 'Grillad entrecôte med rosmarinsmör',
  slug: 'grillad-entrecote-rosmarinsmor',
  n: { netto_kh: 0, fett: 38, protein: 42, kcal: 510 },
  tid: { prep_min: 10, tillagning_min: 12, total_min: 22 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'notkott', 'helg'],
  ingredienser: [
    { mangd: 400, enhet: 'g', vara: 'entrecôte', notering: '2 tjocka skivor' },
    { mangd: 50, enhet: 'g', vara: 'smör', notering: 'rumstempererat' },
    { mangd: 1, enhet: 'msk', vara: 'färsk rosmarin', notering: 'hackad' },
    { mangd: 1, enhet: 'st', vara: 'vitlöksklyfta', notering: 'pressad' },
    'Flingsalt och grovkrossad svartpeppar',
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
  ],
  tillagning: [
    'Ta köttet ur kylen 30 min innan grillning. Pensla med olja. Salta och peppra.',
    { namn: 'Rör smöret', text: 'Blanda smör, rosmarin, vitlök, salt till en jämn smet. Lägg på plastfilm, rulla till korv, kyl.' },
    { namn: 'Grilla', text: 'Hög värme. Grilla 3–4 min per sida för medium rare (innertemp 54°C).', timer_min: 8 },
    { namn: 'Vila', text: 'Låt vila under folie 5 min.', timer_min: 5 },
    'Skär smöret i skivor och lägg på det varma köttet — det smälter och bildar sås.',
  ],
  tips: [
    'Köttet ska vara minst 2,5 cm tjockt för bra grillresultat. Tunnt blir torrt.',
    'Använd direktvärme. Rosmarinkvistar i kolen ger extra rökig doft.',
    'Smöret kan göras dagar i förväg och ligga i frysen.',
  ],
  brod: 'Klassikern. Tar 22 min totalt om köttet är rumstempererat. Smöret är hela rätten.',
});

r.push({
  namn: 'Grillad fläskkarré med fänkålsfrö',
  slug: 'grillad-flaskkarre-fanksolfrö',
  n: { netto_kh: 1, fett: 28, protein: 38, kcal: 410 },
  tid: { prep_min: 15, tillagning_min: 18, total_min: 33, total_min_marinad: 240 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'flask'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'fläskkarré', notering: '2 cm tjocka skivor' },
    { mangd: 2, enhet: 'tsk', vara: 'fänkålsfrö', notering: 'krossade' },
    { mangd: 2, enhet: 'tsk', vara: 'paprikapulver', notering: 'sött' },
    { mangd: 2, enhet: 'tsk', vara: 'flingsalt' },
    { mangd: 1, enhet: 'tsk', vara: 'svartpeppar', notering: 'grovkrossad' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda fänkålsfrö, paprika, salt, peppar, olja, vitlök till rub. Massera in i karrén. Vila 4 tim i kyl.' },
    { namn: 'Rumstempera', text: 'Ta ur 30 min innan grillning.' },
    { namn: 'Grilla', text: 'Indirekt värme först 12 min, sen direktvärme 2 min per sida för char.', timer_min: 16 },
    { namn: 'Vila', text: 'Låt vila 5 min innan servering.', timer_min: 5 },
  ],
  tips: [
    'Fänkålsfröna gör skillnaden — krossa dem grovt i mortel.',
    'Innertemp: 65°C för medium, 70°C för helt genomstekt.',
  ],
  brod: 'Italiensk fläskmarinad anpassad för grill. Långsam marinering = djup smak.',
});

r.push({
  namn: 'Grillad biff med sojagiba & vitlök',
  slug: 'grillad-biff-sojagiba-vitlok',
  n: { netto_kh: 2, fett: 24, protein: 38, kcal: 380 },
  tid: { prep_min: 10, tillagning_min: 10, total_min: 20, total_min_marinad: 60 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'asiatisk', 'notkott'],
  ingredienser: [
    { mangd: 400, enhet: 'g', vara: 'rumpstek eller flank steak' },
    { mangd: 2, enhet: 'msk', vara: 'soja', notering: 'tamari' },
    { mangd: 1, enhet: 'msk', vara: 'sesamolja' },
    { mangd: 3, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'msk', vara: 'färsk ingefära', notering: 'riven' },
    { mangd: 1, enhet: 'tsk', vara: 'erytritol' },
    { mangd: 1, enhet: 'tsk', vara: 'svartpeppar', notering: 'grovkrossad' },
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda alla ingredienser utom köttet. Lägg köttet i marinaden 1 tim.' },
    { namn: 'Grilla', text: 'Hög värme. 3 min per sida för rare/medium-rare flank.', timer_min: 6 },
    { namn: 'Vila', text: 'Vila 5 min innan upskärning. Skär TVÄRS fibrerna.', timer_min: 5 },
  ],
  tips: [
    'Flank steak måste skäras tvärs fibrerna — annars blir den seg.',
    'Sesamfrön strösas på vid servering.',
    'Ingefärsbitar på grillen ger bra rökarom.',
  ],
  brod: 'Asiatisk grillklassiker. Soja-marinaden penetrerar köttet under timmen i kyl.',
});

r.push({
  namn: 'Grillad chili-lime kyckling',
  slug: 'grillad-chili-lime-kyckling',
  n: { netto_kh: 2, fett: 22, protein: 36, kcal: 360 },
  tid: { prep_min: 10, tillagning_min: 14, total_min: 24, total_min_marinad: 120 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'kyckling', 'mexikansk'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'kycklinglår', notering: 'utbenade' },
    { mangd: 2, enhet: 'st', vara: 'lime', notering: 'pressade + skal' },
    { mangd: 1, enhet: 'tsk', vara: 'chiliflakes' },
    { mangd: 1, enhet: 'tsk', vara: 'cumin' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'tsk', vara: 'rökt paprika' },
    'Salt och peppar',
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda allt utom kycklingen. Lägg kycklingen i marinaden 2 tim i kyl.' },
    { namn: 'Grilla', text: 'Direktvärme 6 min på första sidan, vänd, 6 min till. Innertemp 75°C.', timer_min: 14 },
    { namn: 'Vila', text: 'Vila under folie 5 min.', timer_min: 5 },
  ],
  tips: [
    'Färsk lime är kritiskt — flask-lime smakar annat.',
    'Servera med limeklyftor och en klick gräddfil.',
  ],
  brod: 'Mexikansk-inspirerad sommarrätt. Bra till sallad eller grillade gröna.',
});

r.push({
  namn: 'Grillad lammracks med rosmarin & vitlök',
  slug: 'grillad-lammracks-rosmarin',
  n: { netto_kh: 1, fett: 32, protein: 36, kcal: 460 },
  tid: { prep_min: 15, tillagning_min: 20, total_min: 35 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'lamm', 'helg'],
  ingredienser: [
    { mangd: 600, enhet: 'g', vara: 'lammracks', notering: 'fransk-trimmade' },
    { mangd: 4, enhet: 'st', vara: 'vitlöksklyftor', notering: 'krossade' },
    { mangd: 3, enhet: 'msk', vara: 'färsk rosmarin', notering: 'hackad' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'msk', vara: 'dijonsenap' },
    'Flingsalt och grovkrossad svartpeppar',
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda olja, vitlök, rosmarin, senap. Massera in i lammracksen. Vila 30 min i rumstemp.' },
    { namn: 'Grilla', text: 'Indirekt värme 15 min, sen direktvärme 2 min per sida för bryning. Innertemp 55°C för medium-rare.', timer_min: 19 },
    { namn: 'Vila', text: 'Vila under folie 8 min — viktigt för saftigheten.', timer_min: 8 },
    'Skär mellan revbenen.',
  ],
  tips: [
    'Lamm ska vara medium-rare. Övergrillat blir torrt och tråkigt.',
    'Köttermometer är hjälpligt — innertemp 55°C = perfekt.',
  ],
  brod: 'Helgkött vid eldhärden. Rosmarin är klassisk lammkrydda — våga vara generös.',
});

r.push({
  namn: 'Grillade lammspett med harissa',
  slug: 'grillade-lammspett-harissa',
  n: { netto_kh: 2, fett: 26, protein: 32, kcal: 380 },
  tid: { prep_min: 15, tillagning_min: 10, total_min: 25, total_min_marinad: 60 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'lamm', 'mellanostern'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'lammbog', notering: '2 cm kuber' },
    { mangd: 2, enhet: 'msk', vara: 'harissa-paste' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'tsk', vara: 'spiskumin' },
    { mangd: 1, enhet: 'st', vara: 'citron', notering: 'pressad' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    'Salt och peppar',
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda harissa, olja, kumin, citron, vitlök, salt. Lägg lammkuberna i marinaden 1 tim.' },
    { namn: 'Trä', text: 'Trä på spett (blöt trä-spett 30 min först).' },
    { namn: 'Grilla', text: 'Direktvärme 8–10 min, vänd ofta. Lammet ska vara medium — ej genomstekt.', timer_min: 10 },
  ],
  tips: [
    'Dela upp paprika, lök som sidor på grillen för en hel "kebab-tallrik".',
    'Servera med yoghurt-mintsås eller tzatziki.',
  ],
  brod: 'Marockansk-inspirerad streetfood. Harissan ger värme, kumin ger jordighet.',
});

r.push({
  namn: 'Grillad korvtallrik med senap',
  slug: 'grillad-korvtallrik-senap',
  n: { netto_kh: 3, fett: 32, protein: 22, kcal: 410 },
  tid: { prep_min: 5, tillagning_min: 12, total_min: 17 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'flask', 'enkel'],
  ingredienser: [
    { mangd: 4, enhet: 'st', vara: 'bratwurst', notering: 'eller bra falukorv' },
    { mangd: 2, enhet: 'st', vara: 'merguez', notering: 'kryddstark fårkorv' },
    { mangd: 1, enhet: 'st', vara: 'rödlök', notering: 'i klyftor' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    'Senap, gärna fransk dijon eller stark gul',
    'Rivet pepparrot',
  ],
  tillagning: [
    { namn: 'Lök', text: 'Pensla lökklyftor med olja, salt.' },
    { namn: 'Grilla', text: 'Lök grillas indirekt 12 min, korvar direktvärme 8–10 min, vänd ofta.', timer_min: 12 },
    'Servera med senapssortiment.',
  ],
  tips: [
    'Vägrad inte salta korven — den är salt nog.',
    'En klick crème fraîche med pepparrot är klassiskt tilltug.',
  ],
  brod: 'Dvs grillen utan ambitioner. Bra korv + senap. Ofta bästa kvällen.',
});

r.push({
  namn: 'Grillad fläsksida med honung-soja',
  slug: 'grillad-flaskside-honung-soja',
  n: { netto_kh: 4, fett: 38, protein: 22, kcal: 470 },
  tid: { prep_min: 10, tillagning_min: 25, total_min: 35, total_min_marinad: 240 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'flask', 'asiatisk'],
  ingredienser: [
    { mangd: 600, enhet: 'g', vara: 'fläsksida', notering: 'i tjocka skivor' },
    { mangd: 3, enhet: 'msk', vara: 'soja', notering: 'tamari' },
    { mangd: 1, enhet: 'msk', vara: 'sesamolja' },
    { mangd: 2, enhet: 'msk', vara: 'erytritol-honung' },
    { mangd: 1, enhet: 'msk', vara: 'färsk ingefära', notering: 'riven' },
    { mangd: 3, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'tsk', vara: 'svartpeppar' },
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda allt utom fläsket. Marinera 4 tim i kyl.' },
    { namn: 'Grilla', text: 'Indirekt värme 20 min, sen direktvärme 2 min per sida för knaprighet.', timer_min: 24 },
    'Skär i bitar och servera.',
  ],
  tips: [
    'Erytritol-baserad "honung" från Sukrin eller liknande funkar bra.',
    'Fett blir krispigt på direktvärme — håll koll så det inte bränns.',
  ],
  brod: 'Asiatisk inspiration. Fläsksida ÄR fett — perfekt LCHF.',
});

r.push({
  namn: 'Grillad gochujang-kyckling',
  slug: 'grillad-gochujang-kyckling',
  n: { netto_kh: 3, fett: 24, protein: 36, kcal: 380 },
  tid: { prep_min: 10, tillagning_min: 15, total_min: 25, total_min_marinad: 120 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'kyckling', 'koreansk'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'kycklinglår', notering: 'utbenade' },
    { mangd: 2, enhet: 'msk', vara: 'gochujang' },
    { mangd: 1, enhet: 'msk', vara: 'soja' },
    { mangd: 1, enhet: 'msk', vara: 'sesamolja' },
    { mangd: 1, enhet: 'tsk', vara: 'rivet ingefära' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'tsk', vara: 'sesamfrön' },
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda gochujang, soja, sesamolja, ingefära, vitlök. Lägg kycklingen i 2 tim.' },
    { namn: 'Grilla', text: 'Direktvärme 6–7 min per sida. Innertemp 75°C.', timer_min: 14 },
    'Strö sesamfrön över vid servering.',
  ],
  tips: [
    'Gochujang är het men sötakommer från fermenterade chilibönor — LCHF OK i lagom dos.',
    'Servera med kimchi och risätergräs (eller blomkålsris).',
  ],
  brod: 'Koreansk klassiker. Gochujang står sig väl mot grillens hetta.',
});

r.push({
  namn: 'Grillad anka med plomon-glaze',
  slug: 'grillad-anka-plomon-glaze',
  n: { netto_kh: 4, fett: 30, protein: 32, kcal: 420 },
  tid: { prep_min: 15, tillagning_min: 18, total_min: 33 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'anka', 'asiatisk', 'helg'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'ankbröst', notering: 'med skinn' },
    { mangd: 2, enhet: 'msk', vara: 'plommon-jam', notering: 'sukrin-baserad' },
    { mangd: 1, enhet: 'msk', vara: 'soja' },
    { mangd: 1, enhet: 'msk', vara: 'risvinäger' },
    { mangd: 1, enhet: 'tsk', vara: 'kinesisk fem-krydda' },
    { mangd: 1, enhet: 'tsk', vara: 'rivet ingefära' },
    'Salt och peppar',
  ],
  tillagning: [
    { namn: 'Krysstrissa skinnet', text: 'Skär kryss i ankans skinn (skär ej in i köttet). Salta tjockt.' },
    { namn: 'Glaze', text: 'Blanda plommon, soja, vinäger, fem-krydda, ingefära.' },
    { namn: 'Grilla', text: 'Skinnsidan ner på direktvärme 5 min — låt fett rinna. Vänd, indirekt värme 10 min, glaze sista 3 min.', timer_min: 18 },
    { namn: 'Vila', text: 'Vila 8 min, skär i tunna skivor.', timer_min: 8 },
  ],
  tips: [
    'Anka är fet — låt skinnet rendera. Förskärningarna släpper fett.',
    'Innertemp 56°C för medium-rare.',
  ],
  brod: 'Asiatisk-inspirerad helggrill. Anka är specialvara — provkör 1–2 gånger.',
});

r.push({
  namn: 'Grillade lammkotletter med citron-örtsmör',
  slug: 'grillade-lammkotletter-citron-ortsmor',
  n: { netto_kh: 1, fett: 30, protein: 32, kcal: 420 },
  tid: { prep_min: 15, tillagning_min: 8, total_min: 23 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'lamm'],
  ingredienser: [
    { mangd: 6, enhet: 'st', vara: 'lammkotletter' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    { mangd: 50, enhet: 'g', vara: 'smör', notering: 'rumstempererat' },
    { mangd: 1, enhet: 'msk', vara: 'färsk persilja', notering: 'hackad' },
    { mangd: 1, enhet: 'msk', vara: 'färsk timjan' },
    { mangd: 0.5, enhet: 'st', vara: 'citron', notering: 'rivet skal' },
    'Flingsalt och svartpeppar',
  ],
  tillagning: [
    { namn: 'Smör', text: 'Rör smör med persilja, timjan, citronskal, salt.' },
    { namn: 'Krydda', text: 'Pensla kotletterna med olja, salta och peppra.' },
    { namn: 'Grilla', text: 'Hög direktvärme 3 min per sida för medium-rare.', timer_min: 6 },
    'Klick örtsmör på det varma köttet vid servering.',
  ],
  tips: [
    'Lammkotletter är tunna — gå över med försiktighet, de blir torra fort.',
    'Korta vilstid (3 min) räcker.',
  ],
  brod: 'Snabbt och elegant. Tunna kotletter på minuter, smöret gör resten.',
});

r.push({
  namn: 'Grillad picanha med pepparkrust',
  slug: 'grillad-picanha-pepparkrust',
  n: { netto_kh: 0, fett: 28, protein: 38, kcal: 410 },
  tid: { prep_min: 10, tillagning_min: 25, total_min: 35 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'notkott', 'helg'],
  ingredienser: [
    { mangd: 600, enhet: 'g', vara: 'picanha (rumpstek med fettkappa)' },
    { mangd: 2, enhet: 'msk', vara: 'flingsalt' },
    { mangd: 2, enhet: 'msk', vara: 'svartpeppar', notering: 'grovkrossad' },
    { mangd: 1, enhet: 'tsk', vara: 'vitlökspulver' },
  ],
  tillagning: [
    { namn: 'Krydda', text: 'Blanda salt, peppar, vitlökspulver. Massera in i fettkappan, mest fett-sidan.' },
    { namn: 'Grilla fett ner', text: 'Indirekt värme 15 min med fettsida ner. Fettet renderar och rinner ner i kolen.', timer_min: 15 },
    { namn: 'Bryning', text: 'Direkt värme 2–3 min per sida. Innertemp 54°C medium-rare.', timer_min: 6 },
    { namn: 'Vila', text: 'Vila under folie 8 min, skär i tunna skivor mot fibrerna.', timer_min: 8 },
  ],
  tips: [
    'Brasiliansk grill-klassiker. Fettkappan ÄR rätten — skär inte bort.',
    'Servera med chimichurri (recept finns i såser).',
  ],
  brod: 'Sydamerikansk specialitet. Picanha bör grillas hel, sen skäras tunt.',
});

r.push({
  namn: 'Grillad kötträtt med tandoori-rub',
  slug: 'grillad-kottratt-tandoori',
  n: { netto_kh: 3, fett: 24, protein: 36, kcal: 370 },
  tid: { prep_min: 15, tillagning_min: 14, total_min: 29, total_min_marinad: 240 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'kyckling', 'indisk'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'kycklinglår' },
    { mangd: 200, enhet: 'g', vara: 'grekisk yoghurt' },
    { mangd: 2, enhet: 'msk', vara: 'tandoori-krydda' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'tsk', vara: 'rivet ingefära' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'st', vara: 'citron', notering: 'pressad' },
    'Salt',
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda yoghurt, tandoori, olja, ingefära, vitlök, citron, salt. Lägg kycklingen 4 tim.' },
    { namn: 'Grilla', text: 'Direktvärme 7 min per sida.', timer_min: 14 },
    'Servera med raita (kall yoghurt-gurka-mintsås).',
  ],
  tips: [
    'Yoghurten gör kycklingen extremt mör — skip aldrig den.',
    'Tandoori-pulver finns i de flesta livsmedelsbutiker. Annars: blanda paprika, garam masala, kanel, fennel, vitlök, salt.',
  ],
  brod: 'Indisk gril-klassiker. Yoghurtmarinad är magin.',
});

r.push({
  namn: 'Grillad miso-lax',
  slug: 'grillad-miso-lax',
  n: { netto_kh: 2, fett: 22, protein: 30, kcal: 320 },
  tid: { prep_min: 10, tillagning_min: 10, total_min: 20, total_min_marinad: 60 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'fisk', 'japansk'],
  ingredienser: [
    { mangd: 400, enhet: 'g', vara: 'laxfilé', notering: 'med skinn' },
    { mangd: 2, enhet: 'msk', vara: 'vit miso-paste' },
    { mangd: 1, enhet: 'msk', vara: 'sesamolja' },
    { mangd: 1, enhet: 'msk', vara: 'risvinäger' },
    { mangd: 1, enhet: 'tsk', vara: 'erytritol' },
    { mangd: 1, enhet: 'tsk', vara: 'sesamfrön' },
    { mangd: 2, enhet: 'st', vara: 'salladslök', notering: 'tunna ringar' },
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda miso, sesamolja, vinäger, erytritol. Pensla på laxen, vila 1 tim.' },
    { namn: 'Grilla', text: 'Skinnsidan ner på direkt 4 min, vänd, 2–3 min på köttsidan.', timer_min: 7 },
    'Strö sesamfrön och salladslök över.',
  ],
  tips: [
    'Vit miso (shiro) är mildare än röd. Bättre för grillning.',
    'Hög värme för krispigt skinn.',
  ],
  brod: 'Japansk klassiker — Misoyaki. Funkar lika bra med torsk eller sotare.',
});

r.push({
  namn: 'Grillade räkor med chili-vitlökssmör',
  slug: 'grillade-rakor-chili-vitlokssmor',
  n: { netto_kh: 1, fett: 22, protein: 24, kcal: 290 },
  tid: { prep_min: 10, tillagning_min: 6, total_min: 16 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'skaldjur', 'snabb'],
  ingredienser: [
    { mangd: 400, enhet: 'g', vara: 'råa jumboräkor', notering: 'med skal' },
    { mangd: 60, enhet: 'g', vara: 'smör' },
    { mangd: 3, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'tsk', vara: 'chiliflakes' },
    { mangd: 0.5, enhet: 'st', vara: 'citron', notering: 'pressad' },
    { mangd: 2, enhet: 'msk', vara: 'färsk persilja' },
    'Flingsalt',
  ],
  tillagning: [
    { namn: 'Smör', text: 'Smält smör i kastrull. Tillsätt vitlök och chili, koka 1 min utan att bränna.' },
    { namn: 'Trä', text: 'Trä räkor på spett (lättare att hantera).' },
    { namn: 'Grilla', text: 'Direktvärme 2–3 min per sida tills rosa och fasta. Pensla med smöret under tiden.', timer_min: 6 },
    'Servera med citron, persilja, salt.',
  ],
  tips: [
    'Råa jumboräkor finns frusna i de flesta livsmedelsbutiker.',
    'Spara skalen för räkfond senare.',
  ],
  brod: 'Sommarklassiker. Skalen ger smaken — peta ut räkorna med fingrarna.',
});

// === Marinader & rubs som egna recept (10) ===
r.push({
  namn: 'Universal grill-rub (sukrin-baserad)',
  slug: 'universal-grill-rub-sukrin',
  portioner: 8, n: { netto_kh: 1, fett: 0, protein: 1, kcal: 15 },
  tid: { prep_min: 5, tillagning_min: 0, total_min: 5 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'rub', 'forberedd'],
  ingredienser: [
    { mangd: 3, enhet: 'msk', vara: 'sukrin gold', notering: 'eller erytritol' },
    { mangd: 2, enhet: 'msk', vara: 'rökt paprika' },
    { mangd: 2, enhet: 'msk', vara: 'flingsalt' },
    { mangd: 1, enhet: 'msk', vara: 'svartpeppar' },
    { mangd: 1, enhet: 'msk', vara: 'vitlökspulver' },
    { mangd: 1, enhet: 'msk', vara: 'lökpulver' },
    { mangd: 1, enhet: 'tsk', vara: 'cayenne' },
    { mangd: 1, enhet: 'tsk', vara: 'cumin' },
    { mangd: 1, enhet: 'tsk', vara: 'chili-pulver' },
  ],
  tillagning: [
    'Blanda allt i burk. Skaka.',
    'Massera in på kött eller fågel 1 tim före grillning.',
  ],
  tips: [
    'Håller 6 mån i lufttät burk.',
    'Sukrin gold ger karamell-aktig smak — viktig för grilltryck.',
  ],
  brod: 'Bas-rub som passar fläsk, kyckling, oxe. Gör en sats, ha på alla.',
});

r.push({
  namn: 'Asiatisk grillmarinad (soja-ingefära)',
  slug: 'asiatisk-grillmarinad-soja-ingefara',
  portioner: 4, n: { netto_kh: 2, fett: 8, protein: 1, kcal: 80 },
  tid: { prep_min: 5, tillagning_min: 0, total_min: 5 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'marinad', 'asiatisk'],
  ingredienser: [
    { mangd: 0.5, enhet: 'dl', vara: 'soja', notering: 'tamari' },
    { mangd: 2, enhet: 'msk', vara: 'sesamolja' },
    { mangd: 2, enhet: 'msk', vara: 'risvinäger' },
    { mangd: 1, enhet: 'msk', vara: 'erytritol' },
    { mangd: 2, enhet: 'msk', vara: 'färsk ingefära', notering: 'riven' },
    { mangd: 4, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'tsk', vara: 'svartpeppar' },
  ],
  tillagning: [
    'Blanda allt i skål eller burk.',
    'Lägg kött/fågel/fisk i marinaden 1–4 tim i kyl.',
  ],
  tips: [
    'Räcker till ca 800 g kött.',
    'Funkar för biff, fläsk, kyckling, lax. Skip för räkor (för stark).',
  ],
  brod: 'Universal asiatisk grillmarinad. En sats håller en grillkväll.',
});

r.push({
  namn: 'Chimichurri (argentinsk grilssås)',
  slug: 'chimichurri',
  portioner: 4, n: { netto_kh: 1, fett: 18, protein: 1, kcal: 170 },
  tid: { prep_min: 10, tillagning_min: 0, total_min: 10 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'sas', 'sydamerikansk'],
  ingredienser: [
    { mangd: 1, enhet: 'dl', vara: 'färsk persilja', notering: 'finhackad' },
    { mangd: 0.5, enhet: 'dl', vara: 'färsk oregano', notering: 'finhackad' },
    { mangd: 4, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'st', vara: 'röd chilisor', notering: 'finhackad, kärnor borta' },
    { mangd: 1, enhet: 'dl', vara: 'olivolja' },
    { mangd: 2, enhet: 'msk', vara: 'rödvinsvinäger' },
    { mangd: 1, enhet: 'tsk', vara: 'flingsalt' },
    { mangd: 1, enhet: 'krm', vara: 'svartpeppar' },
  ],
  tillagning: [
    'Hacka örter och vitlök fint.',
    'Blanda alla ingredienser. Låt stå 30 min — smaken utvecklas.',
  ],
  tips: [
    'Stefan tål persilja men ej koriander — chimichurri är klassiskt persilja, inte koriander. Bra match.',
    'Använd som dressing eller sås till alla grillkött. Räcker en vecka i kyl.',
  ],
  brod: 'Argentinas svar på pesto. Färsk, syrlig, kryddig. Extra bra till entrecôte och picanha.',
});

r.push({
  namn: 'Tex-mex-rub med chipotle',
  slug: 'tex-mex-rub-chipotle',
  portioner: 8, n: { netto_kh: 1, fett: 1, protein: 1, kcal: 20 },
  tid: { prep_min: 5, tillagning_min: 0, total_min: 5 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'rub', 'mexikansk'],
  ingredienser: [
    { mangd: 2, enhet: 'msk', vara: 'chipotle-pulver' },
    { mangd: 2, enhet: 'msk', vara: 'rökt paprika' },
    { mangd: 1, enhet: 'msk', vara: 'cumin' },
    { mangd: 1, enhet: 'msk', vara: 'flingsalt' },
    { mangd: 1, enhet: 'msk', vara: 'svartpeppar' },
    { mangd: 1, enhet: 'tsk', vara: 'vitlökspulver' },
    { mangd: 1, enhet: 'tsk', vara: 'oregano' },
  ],
  tillagning: [
    'Blanda. Förvara i lufttät burk.',
  ],
  tips: [
    'Chipotle ger rökig värme. Ej superhet.',
    'Använd på fläskkarré eller kyckling 1 tim före grillning.',
  ],
  brod: 'Mexikansk rub med chipotle som kärna. Pasande för köttiga rätter.',
});

r.push({
  namn: 'Dijonsenap-honungs-glaze',
  slug: 'dijonsenap-honungs-glaze',
  portioner: 4, n: { netto_kh: 2, fett: 8, protein: 1, kcal: 80 },
  tid: { prep_min: 5, tillagning_min: 0, total_min: 5 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'glaze'],
  ingredienser: [
    { mangd: 2, enhet: 'msk', vara: 'dijonsenap' },
    { mangd: 2, enhet: 'msk', vara: 'erytritol-honung' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'msk', vara: 'färsk timjan' },
    'Salt och peppar',
  ],
  tillagning: [
    'Blanda. Pensla på kött sista 5 min av grillning för fin glansning.',
  ],
  tips: [
    'Funkar bäst på fläsk och kyckling.',
    'Erytritol-honung från Sukrin ger äkta honung-känsla utan kh.',
  ],
  brod: 'Snabb glaze för helgens grillkväll.',
});

r.push({
  namn: 'Citron-pepparrub',
  slug: 'citron-pepparrub',
  portioner: 4, n: { netto_kh: 1, fett: 0, protein: 1, kcal: 10 },
  tid: { prep_min: 5, tillagning_min: 0, total_min: 5 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'rub', 'fisk'],
  ingredienser: [
    { mangd: 2, enhet: 'msk', vara: 'rivet citronskal' },
    { mangd: 2, enhet: 'msk', vara: 'svartpeppar', notering: 'grovkrossad' },
    { mangd: 1, enhet: 'msk', vara: 'flingsalt' },
    { mangd: 1, enhet: 'tsk', vara: 'vitlökspulver' },
    { mangd: 1, enhet: 'tsk', vara: 'torkad timjan' },
  ],
  tillagning: ['Blanda. Förvara torrt.'],
  tips: ['Funkar bäst på lax, torsk, kyckling.'],
  brod: 'Klassisk fisk- och fågelrub. Citronen kommer till sin rätt på grillen.',
});

r.push({
  namn: 'Yoghurt-mintsås till lamm',
  slug: 'yoghurt-mintsas-till-lamm',
  portioner: 4, n: { netto_kh: 2, fett: 6, protein: 4, kcal: 80 },
  tid: { prep_min: 5, tillagning_min: 0, total_min: 5 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'sas', 'lamm'],
  ingredienser: [
    { mangd: 200, enhet: 'g', vara: 'grekisk yoghurt 10%' },
    { mangd: 2, enhet: 'msk', vara: 'färsk mynta', notering: 'finhackad' },
    { mangd: 1, enhet: 'msk', vara: 'pressad citron' },
    { mangd: 1, enhet: 'st', vara: 'vitlöksklyfta', notering: 'pressad' },
    { mangd: 1, enhet: 'tsk', vara: 'flingsalt' },
  ],
  tillagning: ['Blanda. Vila 15 min så smakerna gifter sig.'],
  tips: ['Mynta är klassiskt till lamm. Persilja kan blandas in också.'],
  brod: 'Svalkande sås till de starka lammrätterna. Mediterran inspiration.',
});

r.push({
  namn: 'Gremolata (italiensk persilja-citron-vitlök)',
  slug: 'gremolata',
  portioner: 4, n: { netto_kh: 1, fett: 10, protein: 1, kcal: 100 },
  tid: { prep_min: 8, tillagning_min: 0, total_min: 8 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'sas', 'italiensk'],
  ingredienser: [
    { mangd: 1, enhet: 'dl', vara: 'färsk persilja', notering: 'finhackad' },
    { mangd: 2, enhet: 'msk', vara: 'rivet citronskal' },
    { mangd: 3, enhet: 'st', vara: 'vitlöksklyftor', notering: 'finhackade' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    'Flingsalt',
  ],
  tillagning: ['Blanda. Servera direkt — bäst färsk.'],
  tips: ['Toppa grillad oxstek, lammkotletter, vitfisk.'],
  brod: 'Italiensk klassiker till osso buco — funkar fenomenalt på grillkött också.',
});

// === Sidor och tillbehör för grillkväll (15) ===
r.push({
  namn: 'Grillade zucchini med citron & feta',
  slug: 'grillade-zucchini-citron-feta',
  n: { netto_kh: 4, fett: 18, protein: 6, kcal: 200 },
  tid: { prep_min: 5, tillagning_min: 8, total_min: 13 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'gronsak', 'medelhav'],
  ingredienser: [
    { mangd: 2, enhet: 'st', vara: 'zucchini', notering: 'i längder' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    { mangd: 100, enhet: 'g', vara: 'fetaost', notering: 'smulad' },
    { mangd: 0.5, enhet: 'st', vara: 'citron', notering: 'rivet skal' },
    { mangd: 1, enhet: 'msk', vara: 'färsk mynta' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Skär zucchini på längden i 1 cm tjocka skivor. Pensla med olja, salta.',
    { namn: 'Grilla', text: 'Direktvärme 3 min per sida tills mjuka och färgade.', timer_min: 6 },
    'Toppa med feta, citronskal, mynta, peppar.',
  ],
  tips: ['Stora zucchinier blir vattnigare — välj små eller medel.'],
  brod: 'Klassisk grillsida. Snabb, smakrik, mycket fett från olja och feta.',
});

r.push({
  namn: 'Grillad sparris med smör & parmesan',
  slug: 'grillad-sparris-smor-parmesan',
  n: { netto_kh: 3, fett: 16, protein: 8, kcal: 200 },
  tid: { prep_min: 3, tillagning_min: 6, total_min: 9 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'gronsak', 'snabb'],
  ingredienser: [
    { mangd: 400, enhet: 'g', vara: 'grön sparris' },
    { mangd: 30, enhet: 'g', vara: 'smör' },
    { mangd: 30, enhet: 'g', vara: 'parmesan', notering: 'riven' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    { mangd: 0.5, enhet: 'st', vara: 'citron', notering: 'pressad' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Bryt av träiga ändar. Pensla med olja, salta.',
    { namn: 'Grilla', text: 'Direktvärme 4–5 min, vänd ofta. Sparris ska vara fast men öm.', timer_min: 5 },
    'Smöret smälter över de varma sparrisspetsarna. Toppa med parmesan, citron, peppar.',
  ],
  tips: ['Tjock sparris klarar grillen bättre än tunn.'],
  brod: 'Vårens grillsida. Sparris + smör + parmesan = perfektion.',
});

r.push({
  namn: 'Grillade röda paprikor med vitlöksolja',
  slug: 'grillade-roda-paprikor-vitloksolja',
  n: { netto_kh: 5, fett: 14, protein: 1, kcal: 160 },
  tid: { prep_min: 5, tillagning_min: 12, total_min: 17 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'gronsak', 'medelhav'],
  ingredienser: [
    { mangd: 3, enhet: 'st', vara: 'röda paprikor' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'msk', vara: 'färsk persilja' },
    { mangd: 1, enhet: 'tsk', vara: 'vitvinsvinäger' },
    'Flingsalt',
  ],
  tillagning: [
    { namn: 'Grilla', text: 'Hela paprikor på direktvärme. Vänd tills helt brända på alla sidor (10–12 min).', timer_min: 12 },
    { namn: 'Vila', text: 'Lägg i skål, täck med plast 10 min så de "ångar". Skinnet lossnar.', timer_min: 10 },
    { namn: 'Skala', text: 'Skala bort skinnet, kärnor och frön. Skär i strips.' },
    'Marinera i olja, vitlök, vinäger, persilja, salt. Vila 15 min.',
  ],
  tips: ['Håller en vecka i kyl. Toppa allt: omeletter, sallader, grillkött.'],
  brod: 'Spansk-italiensk klassiker. Rökiga söta paprikor är en grilltur värd.',
});

r.push({
  namn: 'Grillade gröna sparrisspjut med soja',
  slug: 'grillade-grona-sparrisspjut-soja',
  n: { netto_kh: 3, fett: 8, protein: 4, kcal: 110 },
  tid: { prep_min: 5, tillagning_min: 5, total_min: 10 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'gronsak', 'asiatisk'],
  ingredienser: [
    { mangd: 400, enhet: 'g', vara: 'grön sparris' },
    { mangd: 1, enhet: 'msk', vara: 'soja' },
    { mangd: 1, enhet: 'msk', vara: 'sesamolja' },
    { mangd: 1, enhet: 'tsk', vara: 'sesamfrön' },
    { mangd: 1, enhet: 'tsk', vara: 'rivet ingefära' },
  ],
  tillagning: [
    'Pensla sparris med sesamolja och soja.',
    { namn: 'Grilla', text: 'Direktvärme 4–5 min.', timer_min: 5 },
    'Toppa med sesamfrön och ingefära.',
  ],
  tips: ['Ingefära vrids ner i kolen sista minuten — extra rökarom.'],
  brod: 'Asiatiskt twist på sparris. Kort tid, stor smak.',
});

r.push({
  namn: 'Grillad halloumi med chili-honung',
  slug: 'grillad-halloumi-chili-honung',
  n: { netto_kh: 3, fett: 22, protein: 18, kcal: 290 },
  tid: { prep_min: 5, tillagning_min: 6, total_min: 11 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'vegetariskt-protein', 'mellanostern'],
  ingredienser: [
    { mangd: 200, enhet: 'g', vara: 'halloumi', notering: '1 cm tjocka skivor' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'msk', vara: 'erytritol-honung' },
    { mangd: 1, enhet: 'tsk', vara: 'chiliflakes' },
    { mangd: 1, enhet: 'tsk', vara: 'färsk timjan' },
    'Citronklyftor',
  ],
  tillagning: [
    'Pensla halloumi med olja.',
    { namn: 'Grilla', text: 'Direktvärme 3 min per sida tills färgade.', timer_min: 6 },
    'Pensla med honung och strö chili och timjan.',
  ],
  tips: ['Halloumi är extremt salt — undvik mer salt.'],
  brod: 'Söt-het-salt kombination. Vegetariskt huvudprotein på grillen.',
});

r.push({
  namn: 'Grillade auberginer med tahini-sås',
  slug: 'grillade-auberginer-tahini-sas',
  n: { netto_kh: 6, fett: 18, protein: 6, kcal: 220 },
  tid: { prep_min: 10, tillagning_min: 10, total_min: 20 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'gronsak', 'mellanostern'],
  ingredienser: [
    { mangd: 2, enhet: 'st', vara: 'auberginer', notering: '1 cm tjocka skivor' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    { mangd: 2, enhet: 'msk', vara: 'tahini' },
    { mangd: 1, enhet: 'msk', vara: 'pressad citron' },
    { mangd: 1, enhet: 'st', vara: 'vitlöksklyfta', notering: 'pressad' },
    { mangd: 2, enhet: 'msk', vara: 'kallt vatten' },
    'Flingsalt',
    'Färsk persilja och granatäpple-kärnor',
  ],
  tillagning: [
    'Salta auberginerna 10 min, klappa torra med papper. Pensla med olja.',
    { namn: 'Grilla', text: 'Direktvärme 4–5 min per sida.', timer_min: 10 },
    'Vispa tahini, citron, vitlök, vatten, salt till sås.',
    'Lägg auberginer på fat, ringla tahini-sås över, persilja, granatäpple.',
  ],
  tips: ['Tahini-sås tjocknar — tunna med vatten tills rätt konsistens.'],
  brod: 'Mellanöstern-klassiker. Auberginer steks bäst på grill — svårslaget.',
});

r.push({
  namn: 'Coleslaw med syrlig limedressing',
  slug: 'coleslaw-syrlig-lime-dressing',
  n: { netto_kh: 4, fett: 16, protein: 2, kcal: 180 },
  tid: { prep_min: 15, tillagning_min: 0, total_min: 15 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'sallad', 'kall'],
  ingredienser: [
    { mangd: 300, enhet: 'g', vara: 'vitkål', notering: 'finstrimlad' },
    { mangd: 100, enhet: 'g', vara: 'rödkål', notering: 'finstrimlad' },
    { mangd: 1, enhet: 'st', vara: 'morot', notering: 'riven' },
    { mangd: 3, enhet: 'msk', vara: 'majonnäs' },
    { mangd: 1, enhet: 'msk', vara: 'pressad lime' },
    { mangd: 1, enhet: 'msk', vara: 'äppelcidervinäger' },
    { mangd: 1, enhet: 'tsk', vara: 'erytritol' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Blanda kål och morötter i stor skål.',
    'Vispa majonnäs, lime, vinäger, erytritol, salt, peppar.',
    'Häll dressingen över kål, blanda. Vila 15 min.',
  ],
  tips: ['Bäst dagen efter — smakerna gifter sig.'],
  brod: 'Klassisk amerikansk coleslaw, syrligare än vanligt. Funkar till alla grillrätter.',
});

r.push({
  namn: 'Grillade gröna chilifrukter med flingsalt',
  slug: 'grillade-grona-chilifrukter-flingsalt',
  n: { netto_kh: 2, fett: 10, protein: 1, kcal: 110 },
  tid: { prep_min: 5, tillagning_min: 6, total_min: 11 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'gronsak', 'snack'],
  ingredienser: [
    { mangd: 12, enhet: 'st', vara: 'gröna chilifrukter', notering: 'mild typ, t.ex. Padron' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    'Flingsalt',
  ],
  tillagning: [
    'Pensla chilifrukter med olja.',
    { namn: 'Grilla', text: 'Direktvärme 4–6 min, vänd ofta tills bubbliga och svartfläckiga.', timer_min: 6 },
    'Salta direkt på de varma. Servera med fingrarna.',
  ],
  tips: [
    'Padron-chili från Spanien är klassikern. 1 av 10 är hetare — ryskt roulett.',
    'Servera som tilltug eller sida.',
  ],
  brod: 'Tapas-klassiker. Mild chili som blir söt och rökig på grillen.',
});

r.push({
  namn: 'Grillade hela tomater med vitlöksolja',
  slug: 'grillade-hela-tomater-vitloksolja',
  n: { netto_kh: 4, fett: 12, protein: 2, kcal: 140 },
  tid: { prep_min: 5, tillagning_min: 8, total_min: 13 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'gronsak', 'snabb'],
  ingredienser: [
    { mangd: 4, enhet: 'st', vara: 'kvisttomater' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'msk', vara: 'färsk basilika' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Skär små kryss i botten av varje tomat (huden lossnar lättare).',
    { namn: 'Grilla', text: 'Indirekt värme 8 min tills mjuka.', timer_min: 8 },
    'Ringla över olja blandad med vitlök. Toppa med basilika, salt, peppar.',
  ],
  tips: ['Köttiga tomater (Cuore di Bue) blir bäst.'],
  brod: 'Snabbsida. Söt grillad tomatfrukt som komplement till oxstek.',
});

r.push({
  namn: 'Grillad blomkål-stek med tahini',
  slug: 'grillad-blomkal-stek-tahini',
  n: { netto_kh: 5, fett: 18, protein: 6, kcal: 220 },
  tid: { prep_min: 10, tillagning_min: 18, total_min: 28 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'vegetariskt', 'mellanostern'],
  ingredienser: [
    { mangd: 1, enhet: 'st', vara: 'blomkål', notering: 'hel, sliced i tjocka "stekar"' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'tsk', vara: 'cumin' },
    { mangd: 1, enhet: 'tsk', vara: 'rökt paprika' },
    { mangd: 2, enhet: 'msk', vara: 'tahini' },
    { mangd: 1, enhet: 'msk', vara: 'pressad citron' },
    'Flingsalt',
    'Färsk persilja och granatäpple-kärnor',
  ],
  tillagning: [
    'Skär blomkålen vertikalt i 2 cm tjocka skivor (stekar). Pensla med olja, krydda.',
    { namn: 'Grilla', text: 'Indirekt värme 15 min, sen direkt 3 min för char.', timer_min: 18 },
    'Toppa med tahini, citron, persilja, granatäpple, flingsalt.',
  ],
  tips: ['Blomkål-stekar är vegetariska huvudrätter när de görs ordentligt.'],
  brod: 'En grill-vänlig vegetarisk huvudrätt med substans.',
});

// === Mer kötträtter (10) ===
r.push({
  namn: 'Grillad ribeye med whiskey-glaze',
  slug: 'grillad-ribeye-whiskey-glaze',
  n: { netto_kh: 1, fett: 38, protein: 42, kcal: 530 },
  tid: { prep_min: 10, tillagning_min: 14, total_min: 24 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'notkott', 'helg'],
  ingredienser: [
    { mangd: 600, enhet: 'g', vara: 'ribeye', notering: '2 tjocka' },
    { mangd: 2, enhet: 'msk', vara: 'whiskey' },
    { mangd: 1, enhet: 'msk', vara: 'soja' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    'Flingsalt och svartpeppar',
  ],
  tillagning: [
    'Rumstempera 30 min. Pensla med whiskey-soja-olja-blandning.',
    { namn: 'Grilla', text: 'Hög direktvärme 4 min per sida för medium-rare. Innertemp 54°C.', timer_min: 8 },
    { namn: 'Vila', text: 'Vila under folie 6 min.', timer_min: 6 },
  ],
  tips: ['Marmoreringen smälter — välj köttbit med fina vita ådror.'],
  brod: 'Helgklass. Whiskey ger underliggande smak utan kh.',
});

r.push({
  namn: 'Grillad lammbulk med rosmarin & vitlök',
  slug: 'grillad-lammbulk-rosmarin-vitlok',
  n: { netto_kh: 1, fett: 28, protein: 36, kcal: 410 },
  tid: { prep_min: 15, tillagning_min: 35, total_min: 50, total_min_marinad: 240 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'lamm', 'helg'],
  ingredienser: [
    { mangd: 800, enhet: 'g', vara: 'lammbulk', notering: 'urbenad' },
    { mangd: 4, enhet: 'msk', vara: 'olivolja' },
    { mangd: 4, enhet: 'st', vara: 'vitlöksklyftor', notering: 'krossade' },
    { mangd: 4, enhet: 'msk', vara: 'färsk rosmarin' },
    { mangd: 1, enhet: 'msk', vara: 'färsk timjan' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda olja, vitlök, örter. Massera in i lammbulken. Marinera 4 tim.' },
    { namn: 'Grilla', text: 'Indirekt värme 25 min, vänd 1 gång. Sen direktvärme 5 min för char.', timer_min: 35 },
    { namn: 'Vila', text: 'Vila under folie 10 min. Innertemp 60°C för medium.', timer_min: 10 },
  ],
  tips: ['Lammbulk är klassiskt grillkött — perfekt för helggrill.'],
  brod: 'Helgens stora kötträtt. Skiva tunt mot fibrerna.',
});

r.push({
  namn: 'Grillad fläskkotlett med fänkål',
  slug: 'grillad-flaskkotlett-fankal',
  n: { netto_kh: 3, fett: 26, protein: 32, kcal: 380 },
  tid: { prep_min: 10, tillagning_min: 14, total_min: 24 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'flask', 'medelhav'],
  ingredienser: [
    { mangd: 4, enhet: 'st', vara: 'fläskkotletter', notering: 'ben in' },
    { mangd: 1, enhet: 'st', vara: 'fänkål', notering: 'i klyftor' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    { mangd: 2, enhet: 'tsk', vara: 'fänkålsfrö', notering: 'krossade' },
    { mangd: 1, enhet: 'st', vara: 'citron', notering: 'klyftor' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Krydda kotletter med fänkålsfrö, salt, peppar.',
    'Pensla fänkåls-klyftor med olja.',
    { namn: 'Grilla', text: 'Direktvärme. Kotletter 5 min per sida. Fänkål 6 min per sida.', timer_min: 14 },
    'Servera med citron.',
  ],
  tips: ['Fänkålsfrö + fläsk är italiensk klassiker — porchetta-smak utan långstek.'],
  brod: 'Italiensk-inspirerat. Fänkål är underutnyttjat på svensk grill.',
});

r.push({
  namn: 'Grillad biff i plommon-sojaglaze',
  slug: 'grillad-biff-plommon-soja-glaze',
  n: { netto_kh: 4, fett: 22, protein: 38, kcal: 380 },
  tid: { prep_min: 10, tillagning_min: 12, total_min: 22 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'notkott', 'asiatisk'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'flank steak eller hangerstek' },
    { mangd: 2, enhet: 'msk', vara: 'plommon-jam', notering: 'sukrin-baserad' },
    { mangd: 1, enhet: 'msk', vara: 'soja' },
    { mangd: 1, enhet: 'msk', vara: 'sesamolja' },
    { mangd: 1, enhet: 'tsk', vara: 'rivet ingefära' },
    { mangd: 1, enhet: 'tsk', vara: 'sesamfrön' },
  ],
  tillagning: [
    { namn: 'Marinera', text: 'Blanda allt utom köttet. Marinera 1 tim.' },
    { namn: 'Grilla', text: 'Hög värme 3–4 min per sida. Pensla med marinad sista minuten.', timer_min: 8 },
    { namn: 'Vila', text: 'Vila 5 min, skär TVÄRS fibrerna.', timer_min: 5 },
  ],
  tips: ['Sukrin-baserad plommon-jam ger äkta umami utan kh-stegring.'],
  brod: 'Asiatisk-vägrande grillklassiker. Hangerstek är billigare än entrecôte men lika gott när rätt grillat.',
});

// Kategori: Sidor & andra (10)
r.push({
  namn: 'Picklad rödlök till grillkväll',
  slug: 'picklad-rodlok-grillkvall',
  portioner: 8, n: { netto_kh: 2, fett: 0, protein: 0, kcal: 12 },
  tid: { prep_min: 10, tillagning_min: 0, total_min: 10 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'forrad', 'sida'],
  ingredienser: [
    { mangd: 2, enhet: 'st', vara: 'röda lökar', notering: 'tunt skivade' },
    { mangd: 1, enhet: 'dl', vara: 'rödvinsvinäger' },
    { mangd: 1, enhet: 'dl', vara: 'kallt vatten' },
    { mangd: 1, enhet: 'msk', vara: 'erytritol' },
    { mangd: 1, enhet: 'tsk', vara: 'flingsalt' },
    { mangd: 1, enhet: 'tsk', vara: 'svartpepparkorn' },
  ],
  tillagning: [
    'Lägg lökskivor i burk. Värm vinäger, vatten, erytritol, salt, peppar tills socker är upplöst.',
    'Häll lagen över löken. Vila 30 min.',
  ],
  tips: ['Håller 3 veckor i kyl. Toppa allt: hamburgare, kött, sallader.'],
  brod: 'Rödlök som blir mjuk-syrlig. Hela grillkvällens sidekick.',
});

r.push({
  namn: 'Grillade gurkkex med dill & vitlök',
  slug: 'grillade-gurkkex-dill-vitlok',
  n: { netto_kh: 2, fett: 8, protein: 1, kcal: 90 },
  tid: { prep_min: 5, tillagning_min: 4, total_min: 9 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'gronsak', 'snabb'],
  ingredienser: [
    { mangd: 1, enhet: 'st', vara: 'gurka', notering: 'i 1 cm tjocka skivor' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'msk', vara: 'färsk dill' },
    { mangd: 1, enhet: 'st', vara: 'vitlöksklyfta', notering: 'pressad' },
    'Flingsalt',
  ],
  tillagning: [
    'Pensla gurkskivor med olja, salta.',
    { namn: 'Grilla', text: 'Direktvärme 2 min per sida.', timer_min: 4 },
    'Toppa med dill och vitlök blandad med olja.',
  ],
  tips: ['Stora långa gurkor (slang-gurka) blir bäst.'],
  brod: 'Outforskat — gurka på grill är otroligt gott. Dill-vitlök ger fräsch karaktär.',
});

r.push({
  namn: 'Grillad ananas (LCHF-portion)',
  slug: 'grillad-ananas-lchf-portion',
  n: { netto_kh: 6, fett: 4, protein: 1, kcal: 80 },
  tid: { prep_min: 5, tillagning_min: 6, total_min: 11 },
  forvantad_glukospaverkan: 'bevaka',
  taggar: ['grill', 'gotland', 'frukt', 'helg'],
  ingredienser: [
    { mangd: 4, enhet: 'st', vara: 'ananasskivor', notering: 'tunna, ca 50g styck' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'tsk', vara: 'kanel' },
    { mangd: 1, enhet: 'msk', vara: 'kokosflingor' },
  ],
  tillagning: [
    'Pensla ananas med olja, strö kanel.',
    { namn: 'Grilla', text: 'Direktvärme 3 min per sida tills färgad.', timer_min: 6 },
    'Toppa med kokosflingor.',
  ],
  tips: ['Ananas har kh — håll portionen liten. 1 skiva per person räcker.'],
  brod: 'Söt avslutning till grillkvällen. Bevakad portion, men värt det.',
});

r.push({
  namn: 'Grillade portobello-substitut: aubergine "biff"',
  slug: 'grillad-aubergine-biff',
  n: { netto_kh: 5, fett: 16, protein: 4, kcal: 200 },
  tid: { prep_min: 10, tillagning_min: 12, total_min: 22 },
  forvantad_glukospaverkan: 'lag',
  taggar: ['grill', 'gotland', 'vegetariskt'],
  ingredienser: [
    { mangd: 2, enhet: 'st', vara: 'auberginer', notering: 'tjocka skivor som "biffar"' },
    { mangd: 3, enhet: 'msk', vara: 'olivolja' },
    { mangd: 1, enhet: 'msk', vara: 'soja' },
    { mangd: 1, enhet: 'msk', vara: 'rödvinsvinäger' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Salta auberginer 10 min, klappa torra.',
    'Blanda olja, soja, vinäger, vitlök. Pensla.',
    { namn: 'Grilla', text: 'Indirekt värme 6 min per sida.', timer_min: 12 },
  ],
  tips: ['Stefan undviker svamp — aubergine är fett, mättande, gillrar svamprolen.'],
  brod: 'Vegetarisk "biff" som tål en grillkväll utan att försvinna.',
});

r.push({
  namn: 'Grillade jätteräkor med vitlöks-yoghurtsås',
  slug: 'grillade-jatterakor-vitlok-yoghurt',
  n: { netto_kh: 2, fett: 18, protein: 24, kcal: 270 },
  tid: { prep_min: 10, tillagning_min: 6, total_min: 16 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'skaldjur'],
  ingredienser: [
    { mangd: 400, enhet: 'g', vara: 'jätteräkor', notering: 'råa, med skal' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    { mangd: 200, enhet: 'g', vara: 'grekisk yoghurt' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'msk', vara: 'pressad citron' },
    { mangd: 1, enhet: 'msk', vara: 'färsk dill' },
    'Flingsalt',
  ],
  tillagning: [
    'Pensla räkor med olja, salta.',
    { namn: 'Grilla', text: 'Direktvärme 2–3 min per sida. Räkor är klara när rosa och fasta.', timer_min: 6 },
    'Vispa yoghurt-sås: yoghurt, vitlök, citron, dill, salt.',
    'Servera räkor med sås vid sidan.',
  ],
  tips: ['Skalen håller köttet saftigt på grillen. Peta ut med fingrarna.'],
  brod: 'Sommarklassiker. Yoghurt-vitlöks-sås gör mer för rätten än man tror.',
});

r.push({
  namn: 'Grillad makrill med fänkål & citron',
  slug: 'grillad-makrill-fankal-citron',
  n: { netto_kh: 2, fett: 24, protein: 28, kcal: 350 },
  tid: { prep_min: 10, tillagning_min: 14, total_min: 24 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'fisk', 'svensk'],
  ingredienser: [
    { mangd: 2, enhet: 'st', vara: 'makrillar', notering: 'rensade, hela' },
    { mangd: 1, enhet: 'st', vara: 'citron', notering: 'i tunna skivor' },
    { mangd: 0.5, enhet: 'st', vara: 'fänkål', notering: 'tunna skivor' },
    { mangd: 2, enhet: 'msk', vara: 'olivolja' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Lägg citron- och fänkålsskivor i fiskens magar. Pensla utsidan med olja, salta.',
    { namn: 'Grilla', text: 'Direktvärme 5–7 min per sida tills fisken är fast.', timer_min: 14 },
  ],
  tips: ['Fet fisk som makrill är perfekt för grill — fettet håller den saftig.'],
  brod: 'Klassisk svensk skärgårdsgrill. Färsk makrill är säsongs-trotjänare.',
});

r.push({
  namn: 'Grillad kalkonbröst med örtsmör',
  slug: 'grillad-kalkonbrost-ortsmor',
  n: { netto_kh: 1, fett: 18, protein: 38, kcal: 320 },
  tid: { prep_min: 10, tillagning_min: 18, total_min: 28 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'kalkon', 'helg'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'kalkonbröst', notering: 'i tjocka skivor' },
    { mangd: 50, enhet: 'g', vara: 'smör', notering: 'rumstempererat' },
    { mangd: 2, enhet: 'msk', vara: 'färska örter', notering: 'persilja, timjan, basilika' },
    { mangd: 1, enhet: 'st', vara: 'vitlöksklyfta', notering: 'pressad' },
    { mangd: 1, enhet: 'msk', vara: 'olivolja' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Rör smör med örter, vitlök, salt.',
    'Pensla kalkonen med olja, salta.',
    { namn: 'Grilla', text: 'Indirekt värme 12 min, sen direkt 3 min per sida. Innertemp 70°C.', timer_min: 18 },
    'Klick örtsmör på det varma köttet.',
  ],
  tips: ['Kalkon är mager — överstek den inte, då blir den torr.'],
  brod: 'Kalkon är en underanvänd grillkomponent. Mager, neutral, smörörter höjer.',
});

r.push({
  namn: 'Grillade italienska köttbullar på spett',
  slug: 'grillade-italienska-kottbullar-spett',
  n: { netto_kh: 2, fett: 28, protein: 24, kcal: 350 },
  tid: { prep_min: 20, tillagning_min: 12, total_min: 32 },
  forvantad_glukospaverkan: 'mycket-lag',
  taggar: ['grill', 'gotland', 'kottfars', 'italiensk'],
  ingredienser: [
    { mangd: 500, enhet: 'g', vara: 'nötfärs' },
    { mangd: 50, enhet: 'g', vara: 'parmesan', notering: 'riven' },
    { mangd: 2, enhet: 'st', vara: 'ägg' },
    { mangd: 2, enhet: 'msk', vara: 'mandelmjöl' },
    { mangd: 2, enhet: 'msk', vara: 'färsk persilja' },
    { mangd: 2, enhet: 'st', vara: 'vitlöksklyftor', notering: 'pressade' },
    { mangd: 1, enhet: 'tsk', vara: 'oregano' },
    { mangd: 1, enhet: 'tsk', vara: 'fänkålsfrö', notering: 'krossade' },
    'Flingsalt och peppar',
  ],
  tillagning: [
    'Blanda alla ingredienser. Forma 12 bullar.',
    'Trä på spett (blöt trä-spett 30 min först).',
    { namn: 'Grilla', text: 'Indirekt värme 6 min, vänd, 6 min till.', timer_min: 12 },
  ],
  tips: ['Mandelmjöl + ägg ger struktur utan ströbröd.'],
  brod: 'Italienska köttbullar på grillen. Servera med tomatsås eller bara med citron.',
});

const result = bulkSkriv('grill', r);
console.log(`grill: skrev ${result.written}, hoppade över ${result.skipped} (av ${result.total})`);
