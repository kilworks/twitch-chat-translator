<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Les chatten på hvilken som helst Twitch-stream på ditt eget språk, og svar på kanalens språk.<br>
Gratis, uten konto, ingenting å sette opp. 43 språk, både i chatten og i selve utvidelsen.

**[Last ned siste release](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge og Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spanske chatmeldinger kommer inn en etter en, hver med engelsk oversettelse under; så skrives et engelsk svar, en spansk forhåndsvisning dukker opp over chattfeltet, og Tab bytter den inn" width="360">

</div>

## Slik fungerer det

1. Installer den og åpne en hvilken som helst Twitch-stream. En lilla linje øverst i chatten viser at den er på.
2. Hver melding får oversettelsen rett under seg idet den kommer inn, på nettleserens språk. Både
   livestreamer, VOD-er og klipp.
3. Skriv et svar på ditt eget språk. En forhåndsvisning over chattfeltet viser det på kanalens språk:
   trykk Tab eller klikk på den, så erstatter den versjonen det du skrev.

Kanalens språk er det streameren har satt på Twitch, så det er ingenting å sette opp. Begge språkene kan endres i
innstillingene, og lesespråket kan huskes per kanal.

Hvis du også bruker 7TV eller BTTV, bruker de Tab til å fullføre en emote. Tab fullfører da emoten først, og setter
inn oversettelsen bare når det ikke var noe å fullføre. Ctrl/Cmd+Enter og et klikk setter den alltid inn.

## Hva du får

- **43 språk**, også de som skrives fra høyre mot venstre (arabisk, hebraisk, persisk), med regionale
  varianter holdt fra hverandre (brasiliansk og europeisk portugisisk, forenklet og tradisjonell kinesisk, kantonesisk)
- **Overalt hvor chatten er**: live-chat, popout, embed, moderatorvisning, stream manager, VOD- og klippgjenvisning, på
  www.twitch.tv, m.twitch.tv og dashboard.twitch.tv, med eller uten 7TV, BTTV og FFZ
- **Utvidelsen snakker dem også**: innstillinger, popup og chatlinje på alle 43, valgt fra en meny med flagg
- **Gratis rett ut av boksen** med Google Translate. Legg til din egen gratis DeepL-nøkkel for bedre europeiske
  språk; MyMemory og Lingva tar over når en motor svikter
- **Oversettelse på enheten** i Chrome og Edge der nettleseren tilbyr det: uten nettverk, uten kvote, og
  teksten forlater aldri datamaskinen din
- **Filtre**: hopp over boter, demp brukere eller kanaler, skjul linjer som inneholder et ord, oversett bare
  språkene du velger
- **Laget for raske chatter**: emote-navn fra kanalens 7TV-, BTTV- og FFZ-sett oversettes aldri, selv om du ikke bruker
  de utvidelsene, lenker og @omtaler settes til side før noe sendes, en ordliste for navn som motorene ødelegger,
  en oversettelsesbuffer
- **Fire visningsstiler**: under meldingen, på samme linje, i stedet for den, eller bare ved musepeker over
- **Sett én kanal på pause** fra chatlinjen uten å stoppe de andre. Når du bytter kanal eller oppdaterer
  utvidelsen, fortsetter åpne faner å oversette, uten å laste på nytt
- **Moderering tatt hensyn til**: en melding en moderator sletter, eller som en timeout eller utestengelse fjerner, mister oversettelsen også
- **Ser ut som Twitch**: lilla, og den følger chattens eget mørke eller lyse tema med mindre du velger selv
- Chrome, Brave, Edge og Firefox

| Chatten, oversatt mens den ruller | Popupen i verktøylinjen |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch-chat der hver spanske melding har en engelsk oversettelse under seg, med utvidelsens statuslinje over listen" width="360"> | <img src="screenshots/popup.png" alt="Utvidelsens popup med målspråk, visningsstil, innstillingen for forhåndsvisning mens du skriver og tjenestekjeden" width="360"> |

| Det du skriver, før du sender det | Velg et språk, eller la den velge |
|---|---|
| <img src="screenshots/compose.png" alt="Meldingsfeltet med en engelsk melding og en forhåndsvisning over med den spanske versjonen som blir sendt" width="360"> | <img src="screenshots/languages.png" alt="Et søkbart rutenett med språkflagg og språknavn, der kanalens eget språk står først" width="360"> |

<sub>Tatt fra den publiserte versjonen i et chatrom som dette repoet finner på selv: brukernavnene og
meldingene er oppdiktet og oversettelsene besvares lokalt, så ingen virkelig persons brukernavn havner på denne siden.</sub>

## Installasjon

Last ned zip-filen for nettleseren din fra [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) og pakk den ut.

- Chrome, Brave, Edge (`…-chromium.zip`): åpne `chrome://extensions`, slå på utviklermodus, klikk Last inn upakket og velg mappen.
- Firefox 121+ (`…-firefox.zip`): åpne `about:debugging#/runtime/this-firefox`, klikk Last inn midlertidig tillegg og velg `manifest.json`.
  Firefox glemmer et midlertidig tillegg når det starter på nytt.

En kopi installert på denne måten oppdaterer seg ikke selv: ikonet får et merke når det finnes en
nyere versjon, og popupen lenker til siste release.

## Oversettelsesmotorer

Fire tjenester i kjede: når en svikter, tar den neste over. Rekkefølgen bestemmer du.

| Tjeneste | Nøkkel | Merknad |
|---|---|---|
| Google | ingen | standardvalget, fungerer rett ut av boksen |
| DeepL | gratis | best på europeiske språk, [gratis nøkkel](https://www.deepl.com/pro-api) for 1 million tegn i måneden |
| MyMemory | ingen | reserve |
| Lingva | ingen | reserve, på en offentlig instans med mindre du peker den mot din egen |

Chromiums innebygde oversetter trenger verken nettverk eller kvote. Chrome og Edge 138 og nyere kan tilby den, men ikke
alle kopier gjør det, og hvert språkpar må ha modellen sin lastet ned én gang, med ett klikk fra linjen. Firefox har den
ikke. Der den mangler, tar skykjeden over og ingenting går i stykker.

## Innstillinger

Klikk på tannhjulet i chatlinjen, eller høyreklikk på utvidelsesikonet og velg Innstillinger.

- **Tjenester**: rekkefølgen på motorene, din DeepL-nøkkel og modusen: først på enheten, først skyen, eller bare på enheten
- **Visning**: målspråk, visningsstil, originaltekst og språkmerke, tekststørrelse, linjeavstand,
  skrifttype, aksentfarge, chattens tema, forhåndsvisningen mens du skriver og hva et klikk på den gjør
- **Filtre**: boter, brukere, kanaler, nøkkelord, kildespråk og en ordliste med erstatninger
- **Avansert**: størrelse og levetid på hurtigbufferen, samtidige forespørsler, en hastighetsgrense per kanal, sikkerhetskopi og gjenoppretting
- **Aktivitet**: oversatte meldinger, treff i hurtigbufferen, alle språk som er sett i chatten, og hvorfor hver av de siste 50
  linjene ble oversatt eller latt være
- **Tastatur**: Alt+Shift+T slår chatoversettelsen på eller av (Alt+T er Twitchs teatermodus), Alt+W forhåndsvisningen mens
  du skriver. Begge kan endres i nettleserens utvidelsessnarveier
- Språkknappen i chattens handlingslinje, under meldingsfeltet: ett klikk åpner listen over språkene du skriver på,
  og å skrive filtrerer den. Den øverst i chatten setter språket du leser på

## Støttede språk

Engelsk · Fransk · Spansk · Portugisisk · Portugisisk (Brasil) · Tysk · Italiensk · Nederlandsk · Polsk · Svensk · Tsjekkisk · Slovakisk · Rumensk · Russisk · Ukrainsk · Tyrkisk · Arabisk · Hebraisk · Japansk · Koreansk · Kinesisk (forenklet) · Kinesisk (tradisjonell) · Thai · Vietnamesisk · Indonesisk · Hindi · Finsk · Norsk · Dansk · Gresk · Ungarsk · Bulgarsk · Katalansk · Slovensk · Estisk · Litauisk · Latvisk · Persisk · Bengali · Tamil · Malayisk · Filippinsk · Kantonesisk

Chatten kan oversettes til hvilket som helst av dem, og utvidelsens eget grensesnitt finnes på hvert av dem.

## Personvern

Ingen konto, ingen server av meg og ingen analyser med mindre du velger å motta en daglig anonym telling sendt til Google Analytics (motorer brukt, feil, hastighet, aldri meldingene, navnene eller kanalene dine). Chatmeldinger, og utkastet ditt mens forhåndsvisningen mens du skriver er på, går til oversettelsestjenesten du valgte og
ingen andre steder, og i enhetsmodus ikke engang dit. For å vite kanalens språk spør den Twitch om kanalens sendespråk og id, og for å holde emote-navn utenfor oversettelsene spør den 7TV, BetterTTV og FrankerFaceZ om kanalens emote-navn, noe som forteller dem kanalens id og ingenting annet. En kopi installert fra en butikk gjør ingen andre forespørsler. En
kopi installert for hånd spør GitHub om siste release-tag, høyst hver sjette time, for å vite om den skal
vise oppdateringsmerket. [Detaljer](PRIVACY.md)

## Vanlige spørsmål

**Meldinger blir ikke oversatt.**
Åpne fanen Aktivitet i innstillingene og trykk «Hent avgjørelser»: den viser de siste 50 linjene og sier hvorfor
hver av dem ble oversatt eller latt være. De fleste hoppede linjer hoppes over med vilje: samme bruker som gjentar seg selv,
for korte linjer, bare emojier eller latter, eller allerede på leserspråket. Hvis fanen ikke viser noe i det hele tatt,
ser ikke utvidelsen chatten: åpne en sak.

**Den lilla linjen forsvant.**
Last siden på nytt. Hvis det skjer igjen, åpne en [sak](https://github.com/kilworks/twitch-chat-translator/issues)
med kanalen og hva du gjorde før.

**Hvordan får jeg bedre oversettelser?**
Legg til en gratis DeepL-nøkkel i innstillingene. Gratisnivået dekker en million tegn i måneden, og DeepL brukes bare
på språkparene der det slår de gratis motorene.

**Hvilken visningsstil bør jeg bruke?**
Under meldingen. De tre andre fungerer, og blir fortsatt justert.

**Kan jeg bruke utvidelsen på mitt språk?**
Ja. Den følger nettleserens språk, og menyen øverst i innstillingene bytter den til hvilket som helst av
de 43.

**Fungerer den med 7TV, BTTV og FFZ?**
Ja, med hvilken som helst av dem eller ingen. Emote-navnene deres holdes utenfor oversettelsene.

**Fungerer den på VOD-er og klipp?**
Ja, på samme måte som på livestreamer.

**Den sluttet å virke etter en Twitch-oppdatering.**
Twitch endrer av og til hvordan chatten er bygd opp. Åpne en [sak](https://github.com/kilworks/twitch-chat-translator/issues)
så blir det fikset.

**Er dette laget av Twitch?**
Nei. Det er et uavhengig åpen kildekode-prosjekt, uten tilknytning til Twitch.

## Nytt

I 1.0.0, den første versjonen for Twitch:

- Leser Twitch-chatten i alle tre former: Twitchs egen liste (også med BTTV og FFZ), 7TV-listen, og VOD- og klippgjenvisning, i popout, embed, moderatorvisning, stream manager og på mobil
- Skriver oversettelser inn i meldingsfeltet med emotes beholdt som ord, og oversetter aldri emote-navnene i kanalens 7TV-, BTTV- og FFZ-sett
- Kanalens språk kommer fra Twitch, en slettet melding mister oversettelsen, og utseendet er lilla og følger Twitchs mørke eller lyse chat
- Alt+Shift+T slår oversettelsen på eller av, Tab setter inn oversettelsen bare når 7TV eller BTTV ikke nettopp fullførte en emote, og språkknappen ligger i handlingslinjen under meldingsfeltet

Hver versjon, med hva som endret seg og målingen bak:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) og [CHANGELOG.md](CHANGELOG.md).

## Utvikling

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, enhetstester, build: porten hver pakke går gjennom
npm run build:firefox    # Firefox-build, samme dist/-mappe
npm run package:all      # begge zip-filene, i release/
npm run dev              # HMR
```

Byggene er reproduserbare: samme commit gir byte-identiske zip-filer på hvilken som helst maskin, kontrollert ved å bygge et
`git archive` av taggen i en tom mappe og sammenligne hashene.

Utover enhetstestene laster offline-portene den bygde utvidelsen inn i en ekte nettleser, styrer den og kontrollerer
hva den gjør, med siden og oversettelsesmotoren servert lokalt. De trenger
Playwright, som bevisst ikke er en avhengighet: pek `UX_KIT` mot en mappe der `node_modules` inneholder det,
eller kjør `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # alle offline-portene, uten vindu
node test/e2e/store-shots-fixture.mjs --lang=ja         # butikkskjermbildene, på ett oppføringsspråk
node test/e2e/store-shots-fixture.mjs --gif             # engelske butikkskjermbilder, README-bildene og denne GIF-en
```

Grensesnitttekstene ligger i `src/shared/i18n/` (popup og innstillinger, nøklet på den engelske teksten) og
`src/content/i18n/` (chatlinje, nøklet på id med den engelske teksten som reserve), én fil per språk;
testene krever at hver fil har hele nøkkelsettet. Butikk-
tekstene ligger i [store/](store/), og en release er en versjonstagg: CI bygger, kontrollerer og publiserer den til begge
butikkene.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Relaterte prosjekter

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), den samme oversetteren for Kick-chat, av samme utvikler

## Lisens

MIT. Uten tilknytning til Twitch.
