<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Llegeix el xat de qualsevol directe de Twitch en el teu idioma i respon en el del canal.<br>
Gratuït, sense compte, res a configurar. 43 idiomes, al xat i a la mateixa extensió.

**[Descarrega l'última versió](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge i Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Missatges de xat en castellà arriben un a un, cadascun amb la seva traducció a l'anglès a sota; després s'escriu una resposta en anglès, apareix una vista prèvia en castellà sobre la caixa del xat i Tab la substitueix" width="360">

</div>

## Com funciona

1. Instal·la-la i obre qualsevol directe de Twitch. Una barra lila a la part superior del xat indica que està activa.
2. Cada missatge rep la seva traducció just a sota a mesura que arriba, en l'idioma del teu navegador. Tant als
   directes com als VOD i als clips.
3. Escriu una resposta en el teu idioma. Una vista prèvia sobre la caixa del xat te la mostra en l'idioma del
   canal: prem Tab o fes-hi clic, i aquesta versió substitueix el que has escrit.

L'idioma del canal és el que el streamer ha triat a Twitch, així que no hi ha res a configurar. Tots dos idiomes es poden
canviar als ajustos, i l'idioma de lectura es pot recordar per canal.

Si també fas servir 7TV o BTTV, ells utilitzen Tab per acabar un emote. Aleshores Tab acaba primer l'emote, i només
insereix la traducció quan no tenia res a acabar. Ctrl/Cmd+Enter i un clic sempre la insereixen.

## Què inclou

- **43 idiomes**, també els que s'escriuen de dreta a esquerra (àrab, hebreu, persa), amb les variants
  regionals per separat (portuguès del Brasil i de Portugal, xinès simplificat i tradicional, cantonès)
- **Allà on hi ha el xat**: xat en directe, popout, incrustat, vista de moderador, el gestor del directe, repeticions
  de VOD i de clips, a www.twitch.tv, m.twitch.tv i dashboard.twitch.tv, amb o sense 7TV, BTTV i FFZ
- **L'extensió també els parla**: ajustos, finestra emergent i barra del xat en els 43, que es trien en un menú amb banderes
- **Gratuïta de sèrie** amb Google Translate. Afegeix la teva pròpia clau gratuïta de DeepL per millorar els
  idiomes europeus; MyMemory i Lingva agafen el relleu quan un motor falla
- **Traducció al dispositiu** a Chrome i Edge quan el navegador l'ofereix: sense xarxa, sense quota, i el text
  no surt mai del teu ordinador
- **Filtres**: ignora els bots, silencia usuaris o canals, amaga les línies que continguin una paraula,
  tradueix només els idiomes que triïs
- **Pensada per a xats ràpids**: els noms dels emotes dels conjunts de 7TV, BTTV i FFZ del canal no es tradueixen mai,
  encara que no tinguis aquestes extensions, els enllaços i les @mencions es deixen de banda abans d'enviar res, un
  glossari per als noms que els motors destrossen, una memòria cau de traduccions
- **Quatre estils de visualització**: sota el missatge, a la mateixa línia, en lloc seu, o només en passar-hi per sobre
- **Posa un canal en pausa** des de la barra del xat sense aturar els altres. En canviar de canal o actualitzar
  l'extensió, les pestanyes obertes continuen traduint, sense recarregar
- **Atenta a la moderació**: un missatge que esborra un moderador, un timeout o un ban també perd la traducció
- **Té aspecte de Twitch**: lila, i segueix el tema fosc o clar del mateix xat tret que en triïs un
- Chrome, Brave, Edge i Firefox

| El xat, traduït mentre avança | La finestra de la barra d'eines |
|---|---|
| <img src="screenshots/chat.png" alt="Xat de Twitch on cada missatge en castellà porta a sota la seva traducció a l'anglès, amb la barra d'estat de l'extensió sobre la llista" width="360"> | <img src="screenshots/popup.png" alt="La finestra de l'extensió amb l'idioma de destinació, l'estil de visualització, l'ajust de la vista prèvia d'escriptura i la cadena de serveis" width="360"> |

| El que escrius, abans d'enviar-ho | Tria un idioma, o deixa que triï ella |
|---|---|
| <img src="screenshots/compose.png" alt="La caixa d'escriptura amb un missatge en anglès i, a sobre, una vista prèvia amb la versió en castellà que s'enviarà" width="360"> | <img src="screenshots/languages.png" alt="Una graella amb cercador de banderes i noms d'idiomes, amb l'idioma del canal el primer" width="360"> |

<sub>Captures de la versió publicada en una sala de xat que aquest repositori s'inventa: els noms d'usuari i els
missatges són ficticis i les traduccions es responen en local, així que cap usuari real apareix en aquesta pàgina.</sub>

## Instal·lació

Descarrega el zip del teu navegador a [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) i descomprimeix-lo.

- Chrome, Brave, Edge (`…-chromium.zip`): obre `chrome://extensions`, activa el Mode de desenvolupador, fes clic a Carrega descomprimida i tria la carpeta.
- Firefox 121+ (`…-firefox.zip`): obre `about:debugging#/runtime/this-firefox`, fes clic a Carrega un complement temporal i tria `manifest.json`.
  Firefox oblida un complement temporal quan es reinicia.

Una còpia instal·lada així no s'actualitza sola: la seva icona mostra una insígnia quan hi ha una versió nova, i la
finestra enllaça a l'última release.

## Motors de traducció

Quatre serveis encadenats: quan un falla, el següent agafa el relleu. L'ordre el decideixes tu.

| Servei | Clau | Nota |
|---|---|---|
| Google | cap | el predeterminat, funciona de sèrie |
| DeepL | gratuïta | la millor en idiomes europeus, [clau gratuïta](https://www.deepl.com/pro-api) per a 1 milió de caràcters al mes |
| MyMemory | cap | de reserva |
| Lingva | cap | de reserva, en una instància pública tret que apuntis a la teva |

El traductor integrat de Chromium no necessita xarxa ni quota. Chrome i Edge 138 i posteriors el poden oferir, tot i
que no totes les còpies ho fan, i cada parell d'idiomes necessita descarregar el seu model una vegada, amb un clic
des de la barra. Firefox no el té. On falta, la cadena al núvol agafa el relleu i no es trenca res.

## Ajustos

Fes clic a l'engranatge de la barra del xat, o clic dret a la icona de l'extensió i tria Opcions.

- **Serveis**: ordre dels motors, la teva clau de DeepL i el mode: primer al dispositiu, primer al núvol, o
  només al dispositiu
- **Aspecte**: idioma de destinació, estil de visualització, text original i insígnia d'idioma, mida del text,
  interlineat, tipus de lletra, color d'èmfasi, tema del xat, la vista prèvia d'escriptura i què passa quan hi
  fas clic
- **Filtres**: bots, usuaris, canals, paraules clau, idiomes d'origen, i un glossari de substitucions
- **Avançat**: mida i durada de la memòria cau, peticions simultànies, límit per canal, còpia de seguretat i restauració
- **Activitat**: missatges traduïts, encerts de memòria cau, cada idioma vist al xat, i per què cadascuna de les
  últimes 50 línies es va traduir o no
- **Teclat**: Alt+Shift+T activa o desactiva la traducció del xat (Alt+T és el mode cinema de Twitch), Alt+W la vista
  prèvia d'escriptura. Tots dos es poden reassignar a les dreceres d'extensions del navegador
- El botó d'idioma de la barra d'accions del xat, sota la caixa de missatge: un clic obre la llista dels idiomes en
  què escrius, escriure la filtra. El de la part superior del xat fixa l'idioma en què llegeixes

## Idiomes compatibles

Anglès · Francès · Castellà · Portuguès · Portuguès (Brasil) · Alemany · Italià · Neerlandès · Polonès · Suec · Txec · Eslovac · Romanès · Rus · Ucraïnès · Turc · Àrab · Hebreu · Japonès · Coreà · Xinès (simplificat) · Xinès (tradicional) · Tailandès · Vietnamita · Indonesi · Hindi · Finès · Noruec · Danès · Grec · Hongarès · Búlgar · Català · Eslovè · Estonià · Lituà · Letó · Persa · Bengalí · Tàmil · Malai · Filipí · Cantonès

El xat es tradueix a qualsevol d'ells, i la interfície de l'extensió està disponible en tots.

## Privadesa

Cap compte, cap servidor meu i cap anàlisi, tret que opteu per un recompte anònim diari enviat a Google Analytics (motors utilitzats, errors, velocitat, mai els vostres missatges, noms o canals). Els missatges del xat, i el teu esborrany mentre la vista prèvia d'escriptura és activa, van al servei de traducció que has
triat i a cap altre lloc, i en mode dispositiu ni tan sols allà. Per conèixer l'idioma del canal pregunta a Twitch l'idioma
d'emissió i l'id del canal, i per mantenir els noms dels emotes fora de les traduccions pregunta a 7TV, BetterTTV i
FrankerFaceZ els noms dels emotes del canal, cosa que els diu l'id del canal i res més. Una còpia instal·lada des d'una
botiga no fa cap altra petició. Una còpia instal·lada a mà pregunta a GitHub l'última etiqueta de release, com a molt cada
sis hores, per saber si ha de mostrar la insígnia d'actualització. [Detalls](PRIVACY.md)

## Preguntes freqüents

**Els missatges no es tradueixen.**
Obre la pestanya Activitat als ajustos i prem "Llegeix les decisions": mostra les últimes 50 línies i per què
cadascuna es va traduir o no. La majoria de les línies omeses s'ometen a propòsit: el mateix usuari repetint-se, línies massa curtes, només
emojis o rialles, o línies que ja són en l'idioma de lectura. Si la pestanya no mostra res, l'extensió no veu el xat: obre una incidència.

**La barra lila ha desaparegut.**
Recarrega la pàgina. Si torna a passar, obre una [incidència](https://github.com/kilworks/twitch-chat-translator/issues)
amb el canal i el que havies fet abans.

**Com aconsegueixo millors traduccions?**
Afegeix una clau gratuïta de DeepL als ajustos. El pla gratuït cobreix un milió de caràcters al mes, i DeepL
només es gasta en els parells d'idiomes on supera els motors gratuïts.

**Quin estil de visualització faig servir?**
Sota el missatge. Els altres tres funcionen i encara s'estan ajustant.

**Puc fer servir l'extensió en el meu idioma?**
Sí. Segueix l'idioma del teu navegador, i el menú de la part superior dels ajustos la canvia a qualsevol dels 43.

**Funciona amb 7TV, BTTV i FFZ?**
Sí, amb qualsevol d'ells o amb cap. Els noms dels seus emotes no entren a les traduccions.

**Funciona als VOD i als clips?**
Sí, igual que als directes.

**Ha deixat de funcionar després d'una actualització de Twitch.**
Twitch de vegades canvia com està construït el seu xat. Obre una [incidència](https://github.com/kilworks/twitch-chat-translator/issues)
i es corregeix.

**La fa Twitch?**
No. És un projecte independent de codi obert, sense cap relació amb Twitch.

## Novetats

A la 1.0.0, la primera versió per a Twitch:

- Llegeix el xat de Twitch en les seves tres formes: la llista pròpia de Twitch (també amb BTTV i FFZ), la llista de 7TV, i la repetició de VOD i de clips, en popout, incrustat, vista de moderador, el gestor del directe i el mòbil
- Escriu les traduccions a la caixa de missatge amb els emotes com a paraules, i mai tradueix els noms dels emotes dels conjunts de 7TV, BTTV i FFZ del canal
- L'idioma del canal ve de Twitch, un missatge esborrat perd la traducció, i l'aspecte és lila i segueix el xat fosc o clar de Twitch
- Alt+Shift+T activa o desactiva la traducció, Tab insereix la traducció només quan 7TV o BTTV no acaben d'acabar un emote, i el botó d'idioma és a la barra d'accions sota la caixa de missatge

Cada versió, amb el que va canviar i la mesura que hi ha al darrere:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) i [CHANGELOG.md](CHANGELOG.md).

## Desenvolupament

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, tests unitaris, build: el control pel qual passa cada paquet
npm run build:firefox    # build de Firefox, a la mateixa carpeta dist/
npm run package:all      # els dos zips, a release/
npm run dev              # HMR
```

Els builds són reproduïbles: el mateix commit dona zips idèntics byte a byte a qualsevol màquina,
comprovat construint un `git archive` de l'etiqueta en una carpeta buida i comparant els hashes.

A més dels tests unitaris, les proves sense xarxa carreguen l'extensió construïda en un navegador real, la
fan servir i comproven què fa, amb la pàgina i el motor de traducció servits en local. Necessiten
Playwright, que a propòsit no és una dependència: apunta `UX_KIT` a una carpeta el `node_modules` de la qual
el contingui, o executa `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # totes les proves sense xarxa, sense finestra
node test/e2e/store-shots-fixture.mjs --lang=ja         # les captures de la botiga, en un idioma de fitxa
node test/e2e/store-shots-fixture.mjs --gif             # captures de la botiga en anglès, les imatges del README i aquest GIF
```

Els textos de la interfície són a `src/shared/i18n/` (finestra i opcions, indexats pel text en anglès) i
`src/content/i18n/` (barra del xat, indexats per id amb el text en anglès com a recurs), un fitxer per
idioma; els tests exigeixen a cada fitxer el conjunt complet de claus. Els textos de les botigues són a
[store/](store/), i una release és una etiqueta de versió: la CI la construeix, la comprova i la publica a
les dues botigues.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Projectes relacionats

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), el mateix traductor per al xat de Kick, del mateix autor

## Llicència

MIT. Sense relació amb Twitch.
