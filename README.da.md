<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Læs enhver Twitch-chat på dit eget sprog, og svar på kanalens.<br>
Gratis, uden konto, intet at sætte op. 43 sprog, i chatten og i selve udvidelsen.

**[Hent den seneste udgivelse](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge og Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spanske chatbeskeder dukker op én ad gangen, hver med sin engelske oversættelse nedenunder; derefter skrives et engelsk svar, en spansk forhåndsvisning vises over chatfeltet, og Tab sætter den ind" width="360">

</div>

## Sådan virker det

1. Installer den og åbn en vilkårlig Twitch-stream. En lilla bjælke øverst i chatten viser, at den er slået til.
2. Hver besked får sin oversættelse lige under sig, så snart den kommer, på din browsers sprog. Både
   livestreams, VOD'er og klip.
3. Skriv et svar på dit eget sprog. En forhåndsvisning over chatfeltet viser det på kanalens sprog: tryk på
   Tab eller klik på den, så erstatter den version det, du skrev.

Kanalens sprog er det, streameren har sat på Twitch, så der er intet at indstille. Begge sprog kan ændres i indstillingerne,
og et læsesprog kan huskes pr. kanal.

Hvis du også kører 7TV eller BTTV, bruger de Tab til at færdiggøre en emote. Tab færdiggør så emoten først og indsætter
kun oversættelsen, når der intet var at færdiggøre. Ctrl/Cmd+Enter og et klik indsætter den altid.

## Det får du

- **43 sprog**, også fra højre mod venstre (arabisk, hebraisk, persisk), med regionale varianter holdt adskilt
  (brasiliansk og europæisk portugisisk, forenklet og traditionelt kinesisk, kantonesisk)
- **Overalt hvor chatten er**: live chat, popout, embed, moderatorvisning, stream manager, VOD- og klipgenafspilning, på
  www.twitch.tv, m.twitch.tv og dashboard.twitch.tv, med eller uden 7TV, BTTV og FFZ
- **Udvidelsen taler dem også**: indstillinger, popup og chatbjælke på alle 43, valgt i en menu med flag
- **Gratis fra start** med Google Translate. Tilføj din egen gratis DeepL-nøgle for bedre europæiske sprog;
  MyMemory og Lingva overtager, når en motor fejler
- **Oversættelse på enheden** i Chrome og Edge, hvor browseren tilbyder det: uden netværk, uden kvote, og
  teksten forlader aldrig din computer
- **Filtre**: spring bots over, gør brugere eller kanaler tavse, skjul linjer med et bestemt ord, oversæt kun
  de sprog, du vælger
- **Lavet til hurtige chats**: emote-navne fra kanalens 7TV-, BTTV- og FFZ-sæt oversættes aldrig, selv om du ikke kører de
  udvidelser, links og @omtaler lægges til side, før noget sendes, en ordliste til navne, som motorerne ødelægger,
  en oversættelsescache
- **Fire visningsstile**: under beskeden, på samme linje, i stedet for den, eller kun ved hover
- **Sæt én kanal på pause** fra chatbjælken uden at stoppe de andre. Skift af kanal eller opdatering af
  udvidelsen lader åbne faner fortsætte med at oversætte, uden genindlæsning
- **Moderering taget i betragtning**: en besked, en moderator sletter, eller som en timeout eller udelukkelse fjerner, mister også sin oversættelse
- **Ligner Twitch**: lilla, og den følger chattens eget mørke eller lyse tema, medmindre du vælger selv
- Chrome, Brave, Edge og Firefox

| Chat, oversat mens den ruller | Popup'en i værktøjslinjen |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch-chat, hvor hver spansk besked har sin engelske oversættelse nedenunder, med udvidelsens statusbjælke over listen" width="360"> | <img src="screenshots/popup.png" alt="Udvidelsens popup med målsprog, visningsstil, indstillingen for forhåndsvisning under skrivning og udbyderkæden" width="360"> |

| Det, du skriver, før du sender det | Vælg et sprog, eller lad den vælge |
|---|---|
| <img src="screenshots/compose.png" alt="Chatfeltet med en engelsk besked og over det en forhåndsvisning af den spanske version, der bliver sendt" width="360"> | <img src="screenshots/languages.png" alt="Et søgbart gitter af sprogflag og navne, med kanalens eget sprog først" width="360"> |

<sub>Taget med den udgivne build i et chatrum, som dette repository selv finder på: brugernavnene og
beskederne er opfundet, og oversættelserne besvares lokalt, så intet rigtigt brugernavn ender på denne side.</sub>

## Installation

Hent zip-filen til din browser fra [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) og pak den ud.

- Chrome, Brave, Edge (`…-chromium.zip`): åbn `chrome://extensions`, slå Udviklertilstand til, klik på Indlæs upakket og vælg mappen.
- Firefox 121+ (`…-firefox.zip`): åbn `about:debugging#/runtime/this-firefox`, klik på Indlæs midlertidigt tilføjelsesprogram og vælg `manifest.json`.
  Firefox glemmer et midlertidigt tilføjelsesprogram, når det genstarter.

En kopi installeret på den måde opdaterer ikke sig selv: Dens ikon viser et badge, når der findes en nyere
version, og popup'en linker til den seneste udgivelse.

## Oversættelsesmotorer

Fire udbydere i kæde: Når én fejler, overtager den næste. Rækkefølgen bestemmer du selv.

| Udbyder | Nøgle | Note |
|---|---|---|
| Google | ingen | standarden, virker fra start |
| DeepL | gratis | bedst på europæiske sprog, [gratis nøgle](https://www.deepl.com/pro-api) til 1 million tegn om måneden |
| MyMemory | ingen | reserve |
| Lingva | ingen | reserve, på en offentlig instans, medmindre du peger den mod din egen |

Chromiums indbyggede oversætter bruger intet netværk og ingen kvote. Chrome og Edge 138 og nyere kan tilbyde den, men ikke
alle kopier gør det, og hvert sprogpar skal have hentet sin model én gang, med ét klik fra bjælken. Firefox har den ikke.
Hvor den mangler, overtager skykæden, og intet går i stykker.

## Indstillinger

Klik på tandhjulet i chatbjælken, eller højreklik på udvidelsens ikon og vælg Indstillinger.

- **Udbydere**: motorernes rækkefølge, din DeepL-nøgle og tilstanden: først på enheden, først skyen eller kun
  på enheden
- **Visning**: målsprog, visningsstil, originaltekst og sprogbadge, tekststørrelse, linjeafstand,
  skrifttype, accentfarve, chattema, forhåndsvisningen under skrivning og hvad et klik på den gør
- **Filtre**: bots, brugere, kanaler, nøgleord, kildesprog og en ordliste med erstatninger
- **Avanceret**: cachens størrelse og levetid, samtidige forespørgsler, en grænse pr. kanal, sikkerhedskopi og gendannelse
- **Aktivitet**: oversatte beskeder, cache-hits, hvert sprog set i chatten, og hvorfor hver af de sidste 50
  linjer blev oversat eller ladet være
- **Tastatur**: Alt+Shift+T slår chatoversættelse til eller fra (Alt+T er Twitchs teatertilstand), Alt+W forhåndsvisningen under
  skrivning. Begge kan omdefineres i browserens genveje til udvidelser
- Sprogknappen i chattens handlingsbjælke, under beskedfeltet: ét klik åbner listen over de sprog, du skriver på, og
  at skrive filtrerer den. Den øverst i chatten sætter det sprog, du læser på

## Understøttede sprog

Engelsk · Fransk · Spansk · Portugisisk · Portugisisk (Brasilien) · Tysk · Italiensk · Hollandsk · Polsk · Svensk · Tjekkisk · Slovakisk · Rumænsk · Russisk · Ukrainsk · Tyrkisk · Arabisk · Hebraisk · Japansk · Koreansk · Kinesisk (forenklet) · Kinesisk (traditionelt) · Thai · Vietnamesisk · Indonesisk · Hindi · Finsk · Norsk · Dansk · Græsk · Ungarsk · Bulgarsk · Catalansk · Slovensk · Estisk · Litauisk · Lettisk · Persisk · Bengali · Tamil · Malajisk · Filippinsk · Kantonesisk

Chatten oversættes til ethvert af dem, og udvidelsens eget interface findes på hvert af dem.

## Privatliv

Ingen konto, ingen min server og ingen analyser, medmindre du tilmelder dig en daglig anonym optælling sendt til Google Analytics (brugte motorer, fejl, hastighed, aldrig dine beskeder, navne eller kanaler). Chatbeskeder, og dit udkast, mens forhåndsvisningen under skrivning er slået til, går til den oversættelsesudbyder, du har valgt, og
ingen andre steder, og i tilstanden på enheden ikke engang dertil. For at kende kanalens sprog spørger den Twitch om kanalens udsendelsessprog og id, og for at holde emote-navne ude af oversættelserne spørger den 7TV, BetterTTV og FrankerFaceZ om kanalens emote-navne, hvilket fortæller dem kanalens id og intet andet. En kopi installeret fra en butik laver ingen
andre forespørgsler. En manuelt installeret kopi spørger GitHub om det seneste release-tag, højst hver sjette
time, for at vide, om den skal vise sit opdateringsbadge. [Detaljer](PRIVACY.md)

## FAQ

**Beskeder bliver ikke oversat.**
Åbn fanen Aktivitet i indstillingerne og tryk på "Hent afgørelser": Den viser de sidste 50 linjer og siger,
hvorfor hver blev oversat eller ladet være. De fleste oversprungne linjer springes over med vilje: den samme bruger, der
gentager sig selv, for korte linjer, kun emojis eller latter, eller allerede på læsesproget. Viser fanen slet ingenting,
ser udvidelsen ikke chatten: Opret venligst et issue.

**Den lilla bjælke forsvandt.**
Opdater siden. Sker det igen, så opret et [issue](https://github.com/kilworks/twitch-chat-translator/issues)
med kanalen og det, du gjorde før.

**Hvordan får jeg bedre oversættelser?**
Tilføj en gratis DeepL-nøgle i indstillingerne. Det gratis abonnement dækker en million tegn om måneden, og
DeepL bruges kun på de sprogpar, hvor det slår de gratis motorer.

**Hvilken visningsstil skal jeg bruge?**
Under beskeden. De tre andre virker og bliver stadig justeret.

**Kan jeg bruge udvidelsen på mit eget sprog?**
Ja. Den følger din browsers sprog, og menuen øverst i indstillingerne skifter den til et hvilket som helst af de 43.

**Virker det sammen med 7TV, BTTV og FFZ?**
Ja, med hvilken som helst af dem eller ingen. Deres emote-navne holdes ude af oversættelserne.

**Virker det på VOD'er og klip?**
Ja, på samme måde som på livestreams.

**Den gik i stykker efter en Twitch-opdatering.**
Twitch ændrer somme tider, hvordan dens chat er bygget op. Opret et [issue](https://github.com/kilworks/twitch-chat-translator/issues),
så bliver det rettet.

**Er den lavet af Twitch?**
Nej. Det er et uafhængigt open source-projekt, uden tilknytning til Twitch.

## Nyt

I 1.0.0, den første udgivelse til Twitch:

- Læser Twitch-chatten i alle tre former: Twitchs egen liste (også med BTTV og FFZ), 7TV-listen og VOD- og klipgenafspilning, i popout, embed, moderatorvisning, stream manager og på mobil
- Skriver oversættelser ind i beskedfeltet med emotes bevaret som ord, og oversætter aldrig emote-navnene i kanalens 7TV-, BTTV- og FFZ-sæt
- Kanalens sprog kommer fra Twitch, en slettet besked mister sin oversættelse, og udseendet er lilla og følger Twitchs mørke eller lyse chat
- Alt+Shift+T slår oversættelsen til eller fra, Tab indsætter kun oversættelsen, når 7TV eller BTTV ikke lige har færdiggjort en emote, og sprogknappen sidder i handlingsbjælken under beskedfeltet

Hver udgivelse, med hvad der ændrede sig og målingen bag:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) og [CHANGELOG.md](CHANGELOG.md).

## Udvikling

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Buildene er reproducerbare: Det samme commit giver byte-identiske zip-filer på enhver maskine, kontrolleret
ved at bygge et `git archive` af tagget i en tom mappe og sammenligne hashes.

Ud over unit-testene indlæser offline gates den byggede udvidelse i en rigtig browser, styrer den og
kontrollerer, hvad den gør, med siden serveret lokalt og oversættelsesmotoren besvaret lokalt. De kræver
Playwright, som med vilje ikke er en afhængighed: Peg `UX_KIT` på en mappe, hvis `node_modules` indeholder det,
eller kør `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Interfacetekster ligger i `src/shared/i18n/` (popup og indstillinger, nøglet på den engelske tekst) og
`src/content/i18n/` (chatbjælke, nøglet på id med den engelske tekst som reserve), én fil pr. sprog; testene
kræver det fulde nøglesæt af hver fil. Butikstekster ligger i [store/](store/), og en udgivelse er et
versionstag: CI'en bygger, kontrollerer og udgiver det i begge butikker.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Relaterede projekter

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), den samme oversætter til Kick-chat, af samme udvikler

## Licens

MIT. Uden tilknytning til Twitch.
