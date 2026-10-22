<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Lis le chat de n'importe quel chat Twitch dans ta langue, et réponds dans celle de la chaîne.<br>
Gratuit, sans compte, rien à configurer. 43 langues, dans le chat et dans l'extension elle-même.

**[Télécharger la dernière version](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge et Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Des messages de chat en espagnol arrivent un à un, chacun avec sa traduction anglaise en dessous ; puis une réponse en anglais est tapée, un aperçu en espagnol apparaît au-dessus de la boîte de chat, et Tab le met à la place" width="360">

</div>

## Comment ça marche

1. Installe-la et ouvre n'importe quel stream Twitch. Une barre violette en haut du chat indique qu'elle tourne.
2. Chaque message reçoit sa traduction juste en dessous dès son arrivée, dans la langue de ton navigateur.
   Ça marche en live, en VOD et sur les clips.
3. Écris une réponse dans ta langue. Un aperçu au-dessus de la boîte de chat la montre dans la langue de la
   chaîne : appuie sur Tab ou clique dessus, et cette version remplace ce que tu as tapé.

La langue de la chaîne est celle que le streamer a définie sur Twitch, donc rien à configurer. Les deux langues se changent
dans les réglages, et une langue de lecture peut être retenue par chaîne.

Si tu utilises aussi 7TV ou BTTV, ils se servent de Tab pour finir une emote. Tab finit alors l'emote d'abord, et
n'insère la traduction que s'il n'y avait rien à finir. Ctrl/Cmd+Entrée et un clic l'insèrent toujours.

## Ce que tu obtiens

- **43 langues**, écritures de droite à gauche comprises (arabe, hébreu, persan), avec les variantes
  régionales bien séparées (portugais du Brésil et d'Europe, chinois simplifié et traditionnel, cantonais)
- **Partout où il y a du chat** : chat en direct, popout, embed, vue modérateur, gestionnaire de stream, replay de
  VOD et de clips, sur www.twitch.tv, m.twitch.tv et dashboard.twitch.tv, avec ou sans 7TV, BTTV et FFZ
- **L'extension les parle aussi** : réglages, popup et barre du chat dans les 43, au choix dans un menu avec drapeaux
- **Gratuit d'emblée** avec Google Traduction. Ajoute ta propre clé DeepL gratuite pour de meilleures langues
  européennes ; MyMemory et Lingva prennent le relais quand un moteur échoue
- **Traduction en local** dans Chrome et Edge quand le navigateur la propose : sans réseau, sans quota, et
  le texte ne quitte jamais ta machine
- **Filtres** : ignorer les bots, mettre en sourdine des utilisateurs ou des chaînes, masquer les lignes
  contenant un mot, ne traduire que les langues que tu choisis
- **Pensée pour les chats rapides** : les noms d'emotes des sets 7TV, BTTV et FFZ de la chaîne ne sont jamais
  traduits, même si tu n'utilises pas ces extensions, liens et @mentions mis de côté avant tout envoi, un
  glossaire pour les noms que les moteurs massacrent, un cache de traductions
- **Quatre styles d'affichage** : sous le message, sur la même ligne, à sa place, ou seulement au survol
- **Mets une chaîne en pause** depuis la barre du chat sans arrêter les autres. Changer de chaîne ou mettre à
  jour l'extension laisse les onglets ouverts continuer à traduire, sans recharger
- **Attentive à la modération** : un message supprimé par un modérateur, un timeout ou un ban perd aussi sa traduction
- **Aux couleurs de Twitch** : violet, et elle suit le thème sombre ou clair du chat lui-même sauf si tu en choisis un
- Chrome, Brave, Edge et Firefox

| Le chat, traduit au fil du défilement | Le popup de la barre d'outils |
|---|---|
| <img src="screenshots/chat.png" alt="Chat Twitch où chaque message en espagnol porte sa traduction anglaise en dessous, avec la barre d'état de l'extension au-dessus de la liste" width="360"> | <img src="screenshots/popup.png" alt="Le popup de l'extension avec la langue cible, le style d'affichage, le réglage de l'aperçu d'écriture et la chaîne de moteurs" width="360"> |

| Ce que tu écris, avant de l'envoyer | Choisis une langue, ou laisse-le choisir |
|---|---|
| <img src="screenshots/compose.png" alt="La boîte de chat contenant un message en anglais, avec au-dessus un aperçu de la version espagnole qui sera envoyée" width="360"> | <img src="screenshots/languages.png" alt="Une grille avec recherche de drapeaux et de noms de langues, la langue de la chaîne en premier" width="360"> |

<sub>Captures prises sur la version publiée, dans un salon de chat que ce dépôt invente : les pseudos et les
messages sont fictifs et les traductions sont servies en local, donc aucun pseudo réel ne se retrouve sur cette page.</sub>

## Installation

Télécharge le zip de ton navigateur sur [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) et décompresse-le.

- Chrome, Brave, Edge (`…-chromium.zip`) : ouvre `chrome://extensions`, active le mode développeur, clique sur Charger l'extension non empaquetée, choisis le dossier.
- Firefox 121+ (`…-firefox.zip`) : ouvre `about:debugging#/runtime/this-firefox`, clique sur Charger un module complémentaire temporaire, choisis `manifest.json`.
  Firefox oublie un module temporaire quand il redémarre.

Une copie installée ainsi ne se met pas à jour toute seule : son icône affiche un badge quand une version plus
récente existe, et le popup renvoie vers la dernière release.

## Moteurs de traduction

Quatre moteurs en chaîne : quand l'un échoue, le suivant prend le relais. L'ordre est le tien.

| Moteur | Clé | Note |
|---|---|---|
| Google | aucune | le défaut, fonctionne d'emblée |
| DeepL | gratuite | la meilleure sur les langues européennes, [clé gratuite](https://www.deepl.com/pro-api) pour 1 million de caractères par mois |
| MyMemory | aucune | secours |
| Lingva | aucune | secours, sur une instance publique sauf si tu pointes vers la tienne |

Le traducteur intégré de Chromium n'a besoin ni de réseau ni de quota. Chrome et Edge 138 et suivants peuvent
le proposer, mais pas toutes les copies, et chaque paire de langues demande de télécharger son modèle une fois,
en un clic depuis la barre. Firefox ne l'a pas. Là où il manque, la chaîne cloud prend le relais et rien ne casse.

## Réglages

Clique sur l'engrenage de la barre du chat, ou fais un clic droit sur l'icône de l'extension et choisis Options.

- **Moteurs** : ordre des moteurs, ta clé DeepL, et le mode : local d'abord, cloud d'abord, ou local uniquement
- **Affichage** : langue cible, style d'affichage, texte original et badge de langue, taille du texte,
  interligne, police, couleur d'accent, thème du chat, l'aperçu d'écriture et ce que fait un clic dessus
- **Filtres** : bots, utilisateurs, chaînes, mots-clés, langues source, et un glossaire de remplacements
- **Avancé** : taille et durée de vie du cache, requêtes simultanées, limite par chaîne, sauvegarde et restauration
- **Activité** : messages traduits, succès du cache, chaque langue vue dans le chat, et pourquoi chacune des 50
  dernières lignes a été traduite ou laissée de côté
- **Clavier** : Alt+Maj+T active ou désactive la traduction du chat (Alt+T est le mode cinéma de Twitch), Alt+W
  l'aperçu d'écriture. Les deux se reconfigurent dans les raccourcis d'extension de ton navigateur
- Le bouton de langue dans la barre d'actions du chat, sous la boîte de message : un clic ouvre la liste des langues
  dans lesquelles tu écris, taper la filtre. Celui en haut du chat règle la langue dans laquelle tu lis

## Langues prises en charge

Anglais · Français · Espagnol · Portugais · Portugais (Brésil) · Allemand · Italien · Néerlandais · Polonais · Suédois · Tchèque · Slovaque · Roumain · Russe · Ukrainien · Turc · Arabe · Hébreu · Japonais · Coréen · Chinois (simplifié) · Chinois (traditionnel) · Thaï · Vietnamien · Indonésien · Hindi · Finnois · Norvégien · Danois · Grec · Hongrois · Bulgare · Catalan · Slovène · Estonien · Lituanien · Letton · Persan · Bengali · Tamoul · Malais · Filipino · Cantonais

Le chat se traduit vers n'importe laquelle, et l'interface de l'extension existe dans chacune.

## Confidentialité

Pas de compte, pas de serveur à moi, et pas d'analytics sauf si tu acceptes un comptage quotidien anonyme envoyé à Google Analytics (moteurs utilisés, erreurs, vitesse, jamais tes messages, pseudos ou chaînes). Les messages du chat, et ton brouillon tant que
l'aperçu d'écriture est activé, vont au moteur de traduction que tu as choisi et nulle part ailleurs, et en mode
local pas même là. Pour connaître la langue de la chaîne, elle demande à Twitch la langue de diffusion et
l'identifiant de la chaîne, et pour garder les noms d'emotes hors des traductions, elle demande à 7TV, BetterTTV
et FrankerFaceZ les noms d'emotes de la chaîne, ce qui leur apprend l'identifiant de cette chaîne et rien
d'autre. Une copie installée depuis un store ne fait aucune autre requête. Une copie installée à la main demande à
GitHub le dernier tag de release, au plus toutes les six heures, pour savoir s'il faut afficher son badge de mise
à jour. [Détails](PRIVACY.md)

## FAQ

**Les messages ne sont pas traduits.**
Ouvre l'onglet Activité dans les réglages et appuie sur « Lire les décisions » : il liste les 50 dernières
lignes et dit pourquoi chacune a été traduite ou laissée de côté. La plupart des lignes ignorées le sont
volontairement : le même utilisateur qui se répète, des lignes trop courtes, que des emojis ou des rires, ou
déjà dans ta langue de lecture. Si l'onglet n'affiche rien du tout, l'extension ne voit pas le chat : ouvre une issue.

**La barre violette a disparu.**
Actualise la page. Si ça se reproduit, ouvre une [issue](https://github.com/kilworks/twitch-chat-translator/issues)
avec la chaîne et ce que tu as fait juste avant.

**Comment avoir de meilleures traductions ?**
Ajoute une clé DeepL gratuite dans les réglages. L'offre gratuite couvre un million de caractères par mois, et
DeepL n'est dépensé que sur les paires de langues où il bat les moteurs gratuits.

**Quel style d'affichage choisir ?**
Sous le message. Les trois autres fonctionnent, et sont encore en cours de réglage.

**Je peux utiliser l'extension dans ma langue ?**
Oui. Elle suit la langue de ton navigateur, et le menu en haut des réglages la passe dans n'importe laquelle
des 43.

**Ça marche avec 7TV, BTTV et FFZ ?**
Oui, avec n'importe lequel ou aucun. Leurs noms d'emotes restent hors des traductions.

**Ça marche sur les VOD et les clips ?**
Oui, comme sur les lives.

**Ça a cassé après une mise à jour de Twitch.**
Twitch change parfois la façon dont son chat est construit. Ouvre une [issue](https://github.com/kilworks/twitch-chat-translator/issues)
et ça sera corrigé.

**C'est fait par Twitch ?**
Non. C'est un projet open source indépendant, sans lien avec Twitch.

## Nouveautés

Dans la 1.0.0, première version pour Twitch :

- Lit le chat Twitch sous ses trois formes : la liste propre à Twitch (aussi avec BTTV et FFZ), la liste 7TV, et le replay des VOD et des clips, en popout, embed, vue modérateur, gestionnaire de stream et mobile
- Écrit les traductions dans la boîte de message en gardant les emotes comme des mots, et ne traduit jamais les noms d'emotes des sets 7TV, BTTV et FFZ de la chaîne
- La langue de la chaîne vient de Twitch, un message supprimé perd sa traduction, et l'apparence est violette et suit le chat sombre ou clair de Twitch
- Alt+Maj+T active ou désactive la traduction, Tab n'insère la traduction que si 7TV ou BTTV n'a pas juste complété une emote, et le bouton de langue se trouve dans la barre d'actions sous la boîte de message

Chaque version, avec ce qui a changé et la mesure derrière :
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) et [CHANGELOG.md](CHANGELOG.md).

## Développement

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, tests unitaires, build : le contrôle par lequel passe chaque paquet
npm run build:firefox    # build Firefox, dans le même dossier dist/
npm run package:all      # les deux zips, dans release/
npm run dev              # HMR
```

Les builds sont reproductibles : le même commit donne des zips identiques à l'octet sur n'importe quelle
machine, vérifié en construisant un `git archive` du tag dans un dossier vide et en comparant les hashs.

En plus des tests unitaires, des gates hors ligne chargent l'extension construite dans un vrai navigateur, la
pilotent et vérifient ce qu'elle fait, avec la page servie en local et le moteur de traduction répondu en
local. Elles ont besoin de Playwright, qui n'est volontairement pas une dépendance : pointe `UX_KIT` vers un
dossier dont le `node_modules` le contient, ou lance `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # toutes les gates hors ligne, sans fenêtre
node test/e2e/store-shots-fixture.mjs --lang=ja         # les captures du store, dans une langue de fiche
node test/e2e/store-shots-fixture.mjs --gif             # captures du store en anglais, les images du README et ce GIF
```

Les textes de l'interface vivent dans `src/shared/i18n/` (popup et options, indexés par le texte anglais) et
`src/content/i18n/` (barre du chat, indexés par id avec le texte anglais en repli), un fichier par langue ;
les tests imposent à chaque fichier le jeu de clés complet. Les textes des stores vivent dans
[store/](store/), et une release est un tag de version : la CI la construit, la vérifie et la publie sur les
deux stores.

Stack : Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Projets liés

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), le même traducteur pour le chat Kick, du même auteur

## Licence

MIT. Sans lien avec Twitch.
