<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Lees elke Twitch-chat in je eigen taal en reageer in die van het kanaal.<br>
Gratis, zonder account, niets in te stellen. 43 talen, in de chat en in de extensie zelf.

**[Download de nieuwste versie](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge en Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spaanse chatberichten komen één voor één binnen, elk met de Engelse vertaling eronder; daarna wordt een Engels antwoord getypt, verschijnt er een Spaanse voorvertoning boven het chatvak en wisselt Tab die in" width="360">

</div>

## Hoe het werkt

1. Installeer de extensie en open een willekeurige Twitch-stream. Een paarse balk bovenaan de chat laat zien dat hij aan staat.
2. Elk bericht krijgt direct eronder zijn vertaling zodra het binnenkomt, in de taal van je browser. Zowel
   bij livestreams als bij VODs en clips.
3. Typ een antwoord in je eigen taal. Een voorvertoning boven het chatvak laat het zien in de taal van het
   kanaal: druk op Tab of klik erop, en die versie vervangt wat je had getypt.

De taal van het kanaal is de taal die de streamer op Twitch heeft ingesteld, dus je hoeft niets in te stellen. Beide talen
kun je wijzigen in de instellingen, en een leestaal kan per kanaal worden onthouden.

Gebruik je ook 7TV of BTTV, dan gebruiken die Tab om een emote af te maken. Tab maakt dan eerst de emote af en voegt
de vertaling alleen in als er niets af te maken was. Ctrl/Cmd+Enter en een klik voegen hem altijd in.

## Wat je krijgt

- **43 talen**, ook van rechts naar links (Arabisch, Hebreeuws, Perzisch), met regionale varianten apart
  (Braziliaans en Europees Portugees, vereenvoudigd en traditioneel Chinees, Kantonees)
- **Overal waar de chat is**: livechat, popout, embed, moderatorweergave, de streammanager, VOD- en clipherhaling, op
  www.twitch.tv, m.twitch.tv en dashboard.twitch.tv, met of zonder 7TV, BTTV en FFZ
- **De extensie spreekt ze ook**: instellingen, popup en chatbalk in alle 43, te kiezen uit een menu met vlaggen
- **Gratis uit de doos** met Google Translate. Voeg je eigen gratis DeepL-sleutel toe voor betere Europese
  talen; MyMemory en Lingva nemen het over als een dienst uitvalt
- **Vertaling op het apparaat** in Chrome en Edge waar de browser die aanbiedt: zonder netwerk, zonder limiet, en
  de tekst verlaat je computer nooit
- **Filters**: bots overslaan, gebruikers of kanalen dempen, regels met een bepaald woord verbergen, alleen de
  talen vertalen die je kiest
- **Gemaakt voor snelle chats**: de emotenamen uit de 7TV-, BTTV- en FFZ-sets van het kanaal worden nooit
  vertaald, ook als je die extensies niet gebruikt, links en @vermeldingen worden apart gehouden voordat er iets
  wordt verstuurd, een woordenlijst voor namen die de diensten verknoeien, een vertaalcache
- **Vier weergavestijlen**: onder het bericht, op dezelfde regel, in plaats van het bericht, of alleen bij hoveren
- **Eén kanaal pauzeren** vanaf de chatbalk zonder de andere te stoppen. Van kanaal wisselen of de extensie
  updaten laat open tabs gewoon doorvertalen, zonder herladen
- **Let op moderatie**: een bericht dat een moderator verwijdert, een timeout of een ban neemt ook de vertaling weg
- **Ziet eruit als Twitch**: paars, en het volgt het donkere of lichte thema van de chat zelf tenzij je er een kiest
- Chrome, Brave, Edge en Firefox

| Chat, vertaald terwijl hij scrolt | De popup in de werkbalk |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch-chat waarin elk Spaans bericht de Engelse vertaling eronder heeft, met de statusbalk van de extensie boven de lijst" width="360"> | <img src="screenshots/popup.png" alt="De popup van de extensie met doeltaal, weergavestijl, de instelling voor de voorvertoning bij het typen en de keten van aanbieders" width="360"> |

| Wat je typt, voordat je het verstuurt | Kies een taal, of laat hem kiezen |
|---|---|
| <img src="screenshots/compose.png" alt="Het chatvak met een Engels bericht en erboven een voorvertoning van de Spaanse versie die wordt verstuurd" width="360"> | <img src="screenshots/languages.png" alt="Een doorzoekbaar raster van taalvlaggen en namen, met de eigen taal van het kanaal bovenaan" width="360"> |

<sub>Gemaakt met de uitgebrachte build in een chatroom die deze repository zelf verzint: de gebruikersnamen
en berichten zijn verzonnen en de vertalingen worden lokaal beantwoord, zodat er geen echte gebruikersnaam op
deze pagina belandt.</sub>

## Installeren

Download de zip voor je browser via [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) en pak hem uit.

- Chrome, Brave, Edge (`…-chromium.zip`): open `chrome://extensions`, zet Ontwikkelaarsmodus aan, klik op Uitgepakte extensie laden en kies de map.
- Firefox 121+ (`…-firefox.zip`): open `about:debugging#/runtime/this-firefox`, klik op Tijdelijke add-on laden en kies `manifest.json`.
  Firefox vergeet een tijdelijke add-on als het opnieuw start.

Een zo geïnstalleerde kopie updatet niet vanzelf: het icoon toont een badge als er een nieuwere versie is, en
de popup verwijst naar de nieuwste release.

## Vertaalmotoren

Vier aanbieders, aan elkaar geschakeld: als er een uitvalt, neemt de volgende het over. De volgorde bepaal je zelf.

| Aanbieder | Sleutel | Opmerking |
|---|---|---|
| Google | geen | de standaard, werkt uit de doos |
| DeepL | gratis | het beste bij Europese talen, [gratis sleutel](https://www.deepl.com/pro-api) voor 1 miljoen tekens per maand |
| MyMemory | geen | reserve |
| Lingva | geen | reserve, op een openbare instantie tenzij je naar je eigen wijst |

De ingebouwde vertaler van Chromium heeft geen netwerk en geen limiet nodig. Chrome en Edge 138 en nieuwer kunnen hem
aanbieden, al doet niet elke kopie dat, en voor elk taalpaar moet het model één keer worden gedownload, met één
klik vanaf de balk. Firefox heeft hem niet. Waar hij ontbreekt, neemt de cloudketen het over en gaat er niets stuk.

## Instellingen

Klik op het tandwiel in de chatbalk, of klik met rechts op het extensie-icoon en kies Opties.

- **Aanbieders**: volgorde van de motoren, je DeepL-sleutel en de modus: eerst op het apparaat, eerst cloud
  of alleen op het apparaat
- **Weergave**: doeltaal, weergavestijl, originele tekst en taalbadge, tekstgrootte, regelafstand,
  lettertype, accentkleur, chatthema, de voorvertoning bij het typen en wat een klik erop doet
- **Filters**: bots, gebruikers, kanalen, trefwoorden, brontalen en een woordenlijst met vervangingen
- **Geavanceerd**: grootte en levensduur van de cache, gelijktijdige verzoeken, een limiet per kanaal, back-up en herstel
- **Activiteit**: vertaalde berichten, cachetreffers, elke taal die in de chat is gezien, en waarom elk van de
  laatste 50 regels is vertaald of met rust gelaten
- **Toetsenbord**: Alt+Shift+T zet chatvertaling aan of uit (Alt+T is de bioscoopmodus van Twitch), Alt+W de
  voorvertoning bij het typen. Beide kun je opnieuw toewijzen in de extensiesneltoetsen van je browser
- De taalknop in de actiebalk van de chat, onder het berichtvak: één klik opent de lijst met talen waarin je
  schrijft, typen filtert haar. Die bovenaan de chat stelt de taal in waarin je leest

## Ondersteunde talen

Engels · Frans · Spaans · Portugees · Portugees (Brazilië) · Duits · Italiaans · Nederlands · Pools · Zweeds · Tsjechisch · Slowaaks · Roemeens · Russisch · Oekraïens · Turks · Arabisch · Hebreeuws · Japans · Koreaans · Chinees (vereenvoudigd) · Chinees (traditioneel) · Thai · Vietnamees · Indonesisch · Hindi · Fins · Noors · Deens · Grieks · Hongaars · Bulgaars · Catalaans · Sloveens · Estisch · Litouws · Lets · Perzisch · Bengaals · Tamil · Maleis · Filipijns · Kantonees

De chat wordt naar elk van deze talen vertaald, en de interface van de extensie zelf is in elk ervan beschikbaar.

## Privacy

Geen account, geen server van mij en geen analyses tenzij u zich aanmeldt voor een dagelijkse anonieme telling die naar Google Analytics wordt verzonden (gebruikte motoren, fouten, snelheid, nooit uw berichten, namen of kanalen). Chatberichten, en je concept zolang de voorvertoning bij het typen aanstaat, gaan naar de vertaalaanbieder die
je hebt gekozen en nergens anders heen, en in de modus op het apparaat zelfs daar niet. Om de taal van het kanaal te
kennen vraagt hij Twitch om de uitzendtaal en de id van het kanaal, en om emotenamen buiten de vertalingen te
houden vraagt hij 7TV, BetterTTV en FrankerFaceZ om de emotenamen van het kanaal, wat hun alleen de id van dat
kanaal vertelt en verder niets. Een kopie uit een store doet geen andere verzoeken. Een handmatig geïnstalleerde
kopie vraagt GitHub hooguit om de zes uur om de nieuwste release-tag, om te weten of de update-badge moet worden
getoond. [Details](PRIVACY.md)

## FAQ

**Berichten worden niet vertaald.**
Open het tabblad Activiteit in de instellingen en druk op "Beslissingen uitlezen": het toont de laatste 50
regels en zegt waarom elk is vertaald of met rust gelaten. De meeste overgeslagen regels worden met opzet overgeslagen: dezelfde gebruiker die zichzelf herhaalt, te korte
regels, alleen emoji of gelach, of al in je leestaal. Als het tabblad helemaal niets toont, ziet de extensie de
chat niet: open dan een issue.

**De paarse balk is verdwenen.**
Ververs de pagina. Gebeurt het weer, open dan een [issue](https://github.com/kilworks/twitch-chat-translator/issues)
met het kanaal en wat je daarvoor deed.

**Hoe krijg ik betere vertalingen?**
Voeg in de instellingen een gratis DeepL-sleutel toe. Het gratis abonnement dekt een miljoen tekens per maand,
en DeepL wordt alleen ingezet voor de taalparen waar het beter is dan de gratis motoren.

**Welke weergavestijl kan ik het beste gebruiken?**
Onder het bericht. De andere drie werken, en worden nog bijgesteld.

**Kan ik de extensie in mijn eigen taal gebruiken?**
Ja. Hij volgt de taal van je browser, en het menu bovenaan de instellingen zet hem om naar een van de 43.

**Werkt het met 7TV, BTTV en FFZ?**
Ja, met elk ervan of met geen. Hun emotenamen blijven buiten de vertalingen.

**Werkt het bij VODs en clips?**
Ja, op dezelfde manier als bij livestreams.

**Het werkt niet meer na een Twitch-update.**
Twitch past soms aan hoe zijn chat is opgebouwd. Open een [issue](https://github.com/kilworks/twitch-chat-translator/issues),
dan wordt het gepatcht.

**Is dit gemaakt door Twitch?**
Nee. Het is een onafhankelijk open-sourceproject, niet verbonden aan Twitch.

## Nieuw

In 1.0.0, de eerste release voor Twitch:

- Leest de Twitch-chat in zijn drie vormen: de eigen lijst van Twitch (ook met BTTV en FFZ), de 7TV-lijst, en VOD- en clipherhaling, in popout, embed, moderatorweergave, de streammanager en mobiel
- Schrijft vertalingen in het berichtvak met emotes als woorden bewaard, en vertaalt nooit de emotenamen uit de 7TV-, BTTV- en FFZ-sets van het kanaal
- De taal van het kanaal komt van Twitch, een verwijderd bericht verliest zijn vertaling, en de uitstraling is paars en volgt de donkere of lichte chat van Twitch
- Alt+Shift+T zet de vertaling aan of uit, Tab voegt de vertaling alleen in als 7TV of BTTV niet net een emote hebben aangevuld, en de taalknop zit in de actiebalk onder het berichtvak

Elke release, met wat er veranderd is en de meting erachter:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) en [CHANGELOG.md](CHANGELOG.md).

## Ontwikkeling

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Builds zijn reproduceerbaar: dezelfde commit geeft op elke machine byte-identieke zips, gecontroleerd door een
`git archive` van de tag in een lege map te bouwen en de hashes te vergelijken.

Naast de unit tests laden de offline gates de gebouwde extensie in een echte browser, sturen hem aan en
controleren wat hij doet, met de pagina lokaal geserveerd en de vertaalmotor lokaal beantwoord. Ze hebben
Playwright nodig, dat bewust geen dependency is: wijs `UX_KIT` naar een map waarvan de `node_modules` het
bevat, of voer `npm i -D playwright` uit.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

De interfaceteksten staan in `src/shared/i18n/` (popup en opties, gekeyd op de Engelse tekst) en
`src/content/i18n/` (chatbalk, gekeyd op id met de Engelse tekst als terugval), één bestand per taal; tests
eisen van elk bestand de volledige set sleutels. De store-teksten staan in [store/](store/), en een release is
een versietag: de CI bouwt, controleert en publiceert hem naar beide stores.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Gerelateerde projecten

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), dezelfde vertaler voor de Kick-chat, van dezelfde auteur

## Licentie

MIT. Niet verbonden aan Twitch.
