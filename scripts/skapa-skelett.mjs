import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROT = new URL('../content/', import.meta.url).pathname;

const skelett = [
  // [mapp, slug, namn, glukos, jessica?, taggar, hint]
  ['baser', 'smorstekt-vitkal', 'Smörstekt vitkål', 'mycket-lag', null, ['vegetariskt'],
    'Strimla vitkål, stek i smör 10–15 min tills brynt och söt. Salta.'],
  ['baser', 'smorstekta-haricots-verts', 'Smörstekta haricots verts', 'mycket-lag', null, ['vegetariskt', 'snabb'],
    'Stek frusna eller färska bönor i smör 5 min. Vitlök sista minuten.'],
  ['baser', 'stekt-zucchini', 'Stekt zucchini', 'mycket-lag', null, ['vegetariskt', 'snabb'],
    'Skär i klyftor eller rondeller, salta, stek i smör.'],
  ['baser', 'rotsellerimos', 'Rotsellerimos', 'lag', null, ['vegetariskt'],
    'Koka tärnad rotselleri tills mjuk, mosa med smör och grädde. OBS: lite mer kh än blomkål.'],
  ['baser', 'sallad', 'Grön sallad med olja & vinäger', 'mycket-lag', null, ['vegetariskt', 'kall', 'snabb'],
    'Sallad, olivolja, ev. rödvinsvinäger, salt. Klassisk sidosallad.'],

  ['proteiner', 'kycklinglar', 'Smörstekt kycklinglår', 'mycket-lag', 'byt-protein', ['kyckling'],
    'Krispigt skinn — låg värme länge. Smaka av med salt och timjan.'],
  ['proteiner', 'flaskkarre', 'Stekt fläskkarré', 'mycket-lag', 'solo', ['flask'],
    'Tjocka skivor, salt och peppar, stek i smör 4 min/sida.'],
  ['proteiner', 'sidflask', 'Stekt sidfläsk', 'mycket-lag', 'solo', ['flask', 'snabb'],
    'Klassiker. Stek krispigt utan smör — sidfläsket ger sin egen fett.'],
  ['proteiner', 'entrecote', 'Stekt entrecôte', 'mycket-lag', 'byt-protein', ['notkott', 'helg'],
    'Rumstemperera. Hög värme, smör, salt och peppar. Vila 5 min.'],
  ['proteiner', 'kottfars', 'Smörstekt köttfärs', 'mycket-lag', 'byt-protein', ['notkott', 'snabb', 'vardag'],
    'Bryn färsen torrt, tillsätt smör i slutet. Salta efter bryning.'],
  ['proteiner', 'torsk', 'Smörstekt torsk', 'mycket-lag', 'delad-fisk', ['fisk', 'snabb'],
    'Salta först, stek försiktigt så filéerna inte spricker.'],
  ['proteiner', 'agg-omelett', 'Omelett med smör', 'mycket-lag', null, ['agg', 'snabb', 'vardag'],
    'Vispa ägg lätt, smält rikligt smör, häll i, vänd försiktigt med spade.'],
  ['proteiner', 'rakor', 'Räkor i kall portion', 'mycket-lag', 'delad-fisk', ['skaldjur', 'kall', 'snabb'],
    'Tinade räkor, citron, dill, ev. aioli vid sidan.'],

  ['saser', 'senap-gradde', 'Senap- och gräddsås', 'mycket-lag', null, ['sas', 'snabb'],
    'Reducerad grädde, dijonsenap, salt. Funkar till kyckling och fläsk.'],
  ['saser', 'ortsmor', 'Örtsmör', 'mycket-lag', null, ['sas', 'kall'],
    'Rumstempererat smör + persilja, vitlök, citron. Klick på varm sida.'],
  ['saser', 'citronsmor', 'Citronsmör', 'mycket-lag', null, ['sas', 'snabb'],
    'Smör + citron + finhackad persilja. Klassiker till fisk.'],
  ['saser', 'kall-pepparsas', 'Kall pepparsås', 'mycket-lag', null, ['sas', 'kall'],
    'Crème fraîche, grovkrossad svartpeppar, salt. Till stekt notkött.'],

  ['soppor', 'blomkalssoppa', 'Blomkålssoppa', 'mycket-lag', null, ['soppa', 'vegetariskt'],
    'Koka blomkål tills mjuk, mixa med grädde, smör, buljong.'],
  ['soppor', 'broccolisoppa', 'Broccolisoppa', 'mycket-lag', null, ['soppa', 'vegetariskt'],
    'Som blomkålsoppa fast med broccoli. Toppa med smörstekt bacon eller ägg.'],
  ['soppor', 'fisksoppa', 'Fisksoppa', 'lag', null, ['soppa', 'fisk'],
    'Lök + fänkål + grädde + fiskbuljong + lax/torsk i tärningar. Saffran om du har.'],
  ['soppor', 'kycklingsoppa', 'Kycklingsoppa med grädde', 'mycket-lag', null, ['soppa', 'kyckling'],
    'Strimlad kyckling, grädde, kycklingbuljong, lite citron, persilja.'],
  ['soppor', 'raksoppa', 'Räksoppa', 'mycket-lag', null, ['soppa', 'skaldjur'],
    'Räk- eller skaldjursfond, grädde, dill. Räkor i sista minuten.'],
  ['soppor', 'kalsoppa', 'Kålsoppa', 'mycket-lag', null, ['soppa', 'vegetariskt'],
    'Vitkål, lök, smör, buljong, lite grädde. Långkok ger djup smak.'],
];

const fmString = (str) => {
  if (str.includes(':') || str.includes('#') || str.includes('"')) {
    return JSON.stringify(str);
  }
  return str;
};

let skapade = 0;
for (const [mapp, slug, namn, glukos, jessica, taggar, hint] of skelett) {
  const lines = [];
  lines.push('---');
  lines.push(`namn: ${fmString(namn)}`);
  lines.push('status: planerad');
  lines.push('portioner: 2');
  lines.push(`forvantad_glukospaverkan: ${glukos}`);
  if (jessica) lines.push(`jessica_tagg: ${jessica}`);
  lines.push(`taggar: [${taggar.map(fmString).join(', ')}]`);
  lines.push('ingredienser: []');
  lines.push('tillagning: []');
  lines.push('testlogg: []');
  lines.push('---');
  lines.push('');
  lines.push(`Skelett. ${hint}`);
  lines.push('');

  const path = join(ROT, mapp, `${slug}.md`);
  writeFileSync(path, lines.join('\n'));
  skapade++;
}

console.log(`Skapade ${skapade} skelett-recept.`);
