/**
 * Le changement de chaine sans rechargement : qui voit quoi, et depuis quel
 * monde.
 *
 * Ce qui a declenche cette sonde : kil rapporte que sur son Brave, changer de
 * stream demande un SECOND chargement de la page. La porte `translate-navigation`
 * est verte. L'une des deux se trompe.
 *
 * (Sur Twitch comme sur Kick avant lui : une navigation d'application est un
 * `pushState` vers un autre `/<login>`, sans rechargement.)
 *
 * `index.ts` n'a que deux declencheurs de re-attachement, un patch de
 * `history.pushState` et un ecouteur `popstate`. `popstate` ne se declenche pas
 * sur un `pushState`, il ne sert qu'au retour arriere. Reste le patch, et un
 * script de contenu vit dans un MONDE ISOLE : son `history` est un autre objet
 * JavaScript au-dessus du meme historique.
 *
 * Et la porte est verte parce que l'observateur a un filet a lui : un
 * `containerWatcher` qui se raccroche quand le conteneur quitte le document. Il
 * rattrape les traductions entrantes, et RIEN de ce que `attachForRoute` porte
 * par-dessus. Cette sonde mesure donc les quatre choses separement, sur les deux
 * formes qu'une navigation d'application peut prendre :
 *
 *   A. le conteneur est remplace en entier   (ce que la porte simule)
 *   B. seul le contenu de la liste change    (ce qu'un composant reutilise fait)
 *
 *   node test/e2e/nav-monde.mjs
 */
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { chromium } from './playwright.mjs';
import { nativeChat, nativeRow, routeTwitch, twitchPage } from './twitch-dom.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = process.env.KT_EXT ?? path.resolve(HERE, '../../dist');

if (!fs.existsSync(path.join(EXT, 'manifest.json'))) {
  console.error('dist/manifest.json absent. Lancer `npm run build` avant.');
  process.exit(2);
}

const TRADUIT = 'ZZTRADUCTIONZZ';
const LISTE = '[data-test-selector="chat-scrollable-area__message-container"]';
const TEXTE_RANGEE = '[data-a-target="chat-message-text"]';

const rangee = (texte, i) => nativeRow(texte, `pseudo${i}`);

const FIXTURE = twitchPage(rangee('hola amigo que tal', 0));

// `KT_BROWSER` pointe sur un autre binaire Chromium, Brave par exemple. kil
// tourne sur Brave et tout ce qui precede a ete mesure sur le Chromium de
// Playwright : tant que la sonde n'a pas tourne sur SON navigateur, "Brave" reste
// une variable non testee et pas une hypothese eliminee. Profil neuf a chaque
// fois, donc jamais le sien, et aucune session.
const binaire = process.env.KT_BROWSER;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'kct-nav-'));
const ctx = await chromium.launchPersistentContext(profile, {
  headless: false,
  ...(binaire ? { executablePath: binaire } : {}),
  viewport: { width: 1200, height: 800 },
  args: [
    `--disable-extensions-except=${EXT}`,
    `--load-extension=${EXT}`,
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
  ],
});

/** Les langues de chaine que le faux GQL de Twitch rend, par login. */
const LANG_PAR_SLUG = { kt_un: 'es', kt_deux: 'ja', kt_trois: 'de', kt_quatre: 'pt' };
const langesDemandees = [];

await ctx.route('**://translate.googleapis.com/**', async (route) => {
  const q = new URL(route.request().url()).searchParams.get('q') ?? '';
  const SAUT = String.fromCharCode(10);
  const lignes = q.split(SAUT);
  const segments = lignes.map((l, k) => [`${TRADUIT}:${l}` + (k < lignes.length - 1 ? SAUT : ''), l, null, null, 10]);
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([segments, null, 'es']) });
});
await routeTwitch(ctx, {
  page: () => FIXTURE,
  langIso: (slug) => LANG_PAR_SLUG[slug] ?? 'es',
  onGql: (slug) => langesDemandees.push(slug),
});

const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto('https://www.twitch.tv/kt_un', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4000);

const SEL_TR = '.kt-translation, .kt-translation-inline, .kt-translation-replace';

/** L'etat visible par un lecteur, apres coup. */
async function etat(texteAttendu) {
  return page.evaluate(
    ({ sel, texte, selTexte }) => {
      const rangees = [...document.querySelectorAll('.chat-line__message')];
      const cible = rangees.find((r) => (r.querySelector(selTexte)?.textContent ?? '') === texte);
      return {
        traduite: !!cible?.querySelector(sel),
        barre: !!document.querySelector('#kt-floating-bar'),
        chipCompose: document.querySelector('#kt-floating-bar .kt-float-lang')?.textContent?.trim() ?? null,
        url: location.pathname,
      };
    },
    { sel: SEL_TR, texte: texteAttendu, selTexte: TEXTE_RANGEE },
  );
}

/** Une navigation d'application, faite depuis le monde principal comme le site. */
async function naviguer({ vers, texte, index, remplacerConteneur }) {
  await page.evaluate(
    ({ vers, html, remplacer, chat, liste }) => {
      history.pushState({}, '', vers);
      if (remplacer) {
        // Le chat est retire et un neuf est construit, comme le fait la navigation de Twitch.
        const tmp = document.createElement('div');
        tmp.innerHTML = chat;
        document.querySelector('section.chat-room').replaceWith(tmp.firstElementChild);
      } else {
        // Le composant est reutilise : le conteneur reste, son contenu change.
        document.querySelector(liste).innerHTML = html;
      }
    },
    {
      vers,
      html: rangee(texte, index),
      remplacer: remplacerConteneur,
      chat: nativeChat(rangee(texte, index)),
      liste: LISTE,
    },
  );
  await page.waitForTimeout(10000);
  return etat(texte);
}

const depart = await etat('hola amigo que tal');
const patch = await page.evaluate(() => String(history.pushState).includes('[native code]'));

// ── La pause AVANT toute navigation, et voici pourquoi l'ordre compte ───────
// Premiere version (sur Kick) : la pause etait testee apres deux navigations, le
// clic n'ecrivait rien et la barre ne bougeait pas. Ce n'etait pas le produit. Le
// scenario A remplacait le salon par un clone dont le contenu etait copie par
// `innerHTML`, ce qui recree la barre en HTML inerte : une copie sans ses
// ecouteurs. Le clic tombait sur un bouton mort. La sonde accusait, le produit
// n'avait rien fait. Ici le chat neuf est construit de zero, mais l'ordre reste.
async function cliquerPause() {
  const cible = await page.evaluate(() => {
    const bar = document.querySelector('#kt-floating-bar');
    return { power: !!bar?.querySelector('.kt-float-power'), avant: bar?.dataset.enabled ?? '?' };
  });
  await page.evaluate(() => document.querySelector('#kt-floating-bar .kt-float-power')?.click());
  await page.waitForTimeout(2000);
  const apres = await page.evaluate(() => document.querySelector('#kt-floating-bar')?.dataset.enabled ?? '?');
  console.log(`  clic pause : bouton ${cible.power ? 'trouve' : 'ABSENT'}, barre ${cible.avant} -> ${apres}`);
  return apres;
}

async function poser(texte, index) {
  await page.evaluate(
    ({ html, liste }) => {
      document.querySelector(liste).insertAdjacentHTML('beforeend', html);
    },
    { html: rangee(texte, index), liste: LISTE },
  );
  await page.waitForTimeout(9000);
  return etat(texte);
}

const barreApresClic = await cliquerPause();
const enPause = await poser('que tal todo el mundo', 1);

// La chaine suivante ne doit PAS heriter de la pause.
const C = await naviguer({ vers: '/kt_deux', texte: 'buenos dias a todos', index: 2, remplacerConteneur: false });
// Et le retour sur la chaine mise en pause doit la retrouver en pause.
const D = await naviguer({ vers: '/kt_un', texte: 'sigue en pausa verdad', index: 3, remplacerConteneur: false });
// Reprise explicite, puis les deux formes de navigation sur une chaine active.
await cliquerPause();
const reprise = await poser('ya volvemos a traducir', 4);
const A = await naviguer({ vers: '/kt_trois', texte: 'adios amigos hasta luego', index: 5, remplacerConteneur: true });
const B = await naviguer({ vers: '/kt_quatre', texte: 'hola de nuevo amigos', index: 6, remplacerConteneur: false });

// E. Le cas ou deux listes coexistent : l'ancienne reste dans la page, masquee,
// AVEC ses lignes, et la nouvelle arrive devant elle, vide, ses messages un peu
// plus tard. C'est ce que fait 7TV quand il prend la main (il laisse la liste
// de Twitch dans la page) et ce que `findChatContainer` tranche en preferant la
// liste affichee. Observe sur Kick le 2026-10-07 : le premier conteneur qui a des
// lignes etait la copie cachee, l'observateur s'y accrochait et plus rien n'etait
// traduit jusqu'a un rechargement (0 sur 13 lignes mesure sur un vrai chat).
await page.evaluate(({ chat }) => {
  history.pushState({}, '', '/kt_cinq');
  const ancien = document.querySelector('section.chat-room');
  const tmp = document.createElement('div');
  tmp.innerHTML = chat;
  const neuf = tmp.firstElementChild;
  ancien.style.display = 'none';
  ancien.before(neuf);
}, { chat: nativeChat('') });
await page.waitForTimeout(1500);
await page.evaluate(({ html, liste }) => {
  const vivant = [...document.querySelectorAll('section.chat-room')].find((s) => s.style.display !== 'none');
  vivant.querySelector(liste).insertAdjacentHTML('beforeend', html);
}, { html: rangee('nos vemos manana amigos', 7), liste: LISTE });
await page.waitForTimeout(9000);
const E = await page.evaluate(({ sel, selTexte }) => {
  const vivant = [...document.querySelectorAll('section.chat-room')].find((s) => s.style.display !== 'none');
  const cible = [...vivant.querySelectorAll('.chat-line__message')].find((r) => (r.querySelector(selTexte)?.textContent ?? '') === 'nos vemos manana amigos');
  return { traduite: !!cible?.querySelector(sel), barre: !!vivant.querySelector('#kt-floating-bar'), url: location.pathname };
}, { sel: SEL_TR, selTexte: TEXTE_RANGEE });

await ctx.close();
fs.rmSync(profile, { recursive: true, force: true });

if (!depart.traduite) {
  console.error('SONDE MUETTE: rien n etait traduit au depart, la sonde ne mesure rien.');
  process.exit(2);
}

const ligne = (nom, e) =>
  `  ${nom.padEnd(34)} traduite ${e.traduite ? 'OUI' : 'NON'}   barre ${e.barre ? 'presente' : 'ABSENTE '}   url ${e.url}`;

console.log(`\n## Le patch de pushState, vu du monde principal\n`);
console.log(`  ${patch ? 'NATIF : le patch du monde isole ne le voit pas' : 'patche'}`);

console.log(`\n## Ce qu un lecteur a sous les yeux\n`);
console.log(ligne('au chargement', depart));
console.log(ligne('A. conteneur remplace', A));
console.log(ligne('B. contenu de la liste change', B));
console.log(ligne('E. ancien salon garde, masque', E));
console.log(ligne('pause cliquee, meme chaine', enPause));
console.log(ligne('reprise cliquee, meme chaine', reprise));
console.log(ligne('C. chaine suivante apres pause', C));
console.log(ligne('D. retour sur la chaine en pause', D));

console.log(`\n## La langue de la chaine, re-demandee ou non\n`);
console.log(`  logins demandes a GQL : ${langesDemandees.join(', ') || '(aucun)'}`);
console.log(`  trois chaines visitees, ${new Set(langesDemandees).size} interrogee(s)`);

const fails = [];
if (!A.traduite) fails.push('A : les messages de la nouvelle chaine ne sont plus traduits');
if (!B.traduite) fails.push('B : les messages de la nouvelle chaine ne sont plus traduits');
if (!A.barre) fails.push('A : la barre a disparu et n est pas remontee');
if (!B.barre) fails.push('B : la barre a disparu et n est pas remontee');
if (!E.traduite) fails.push('E : apres un changement de chaine ou l ancienne liste reste masquee dans la page, plus rien n est traduit');
if (!E.barre) fails.push('E : la barre n est pas dans le salon affiche');
if (barreApresClic !== 'false') fails.push(`le clic n a pas eteint la barre (dataset.enabled=${barreApresClic})`);
if (enPause.traduite) fails.push('la pause ne fait rien : la chaine mise en pause traduit encore');
if (!reprise.traduite) fails.push('la reprise ne repart pas : le bouton eteint mais ne rallume pas');
if (!C.traduite)
  fails.push(
    'la pause d une chaine eteint la SUIVANTE : c est le defaut, le bouton ecrit un reglage global',
  );
if (D.traduite) fails.push('revenir sur la chaine mise en pause la retrouve active : la pause ne tient pas');
if (new Set(langesDemandees).size < 3)
  fails.push(
    `la langue de la chaine n a ete demandee que pour ${new Set(langesDemandees).size} chaine(s) sur 3 : ` +
      "l apercu de composition ecrit dans la langue d'une chaine quittee",
  );

console.log('');
if (fails.length) {
  console.error('DEFAUTS MESURES :');
  for (const f of fails) console.error('  ' + f);
  process.exit(1);
}
console.log('Rien a signaler : tout repart sur les deux formes de navigation.');
