<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Läs vilken Twitch-chatt som helst på ditt eget språk och svara på kanalens.<br>
Gratis, utan konto, inget att ställa in. 43 språk, i chatten och i själva tillägget.

**[Ladda ner den senaste versionen](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge och Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spanska chattmeddelanden dyker upp ett i taget, vart och ett med sin engelska översättning under; sedan skrivs ett engelskt svar, en spansk förhandsvisning visas ovanför chattrutan och Tab byter in den" width="360">

</div>

## Så fungerar det

1. Installera det och öppna vilken Twitch-stream som helst. Ett lila fält högst upp i chatten visar att det är på.
2. Varje meddelande får sin översättning direkt under sig så fort det kommer, på webbläsarens språk. Både
   livesändningar, VOD:er och klipp.
3. Skriv ett svar på ditt eget språk. En förhandsvisning ovanför chattrutan visar det på kanalens språk: tryck
   på Tab eller klicka på den, så ersätter den versionen det du skrev.

Kanalens språk är det som streamern ställt in på Twitch, så det finns inget att ställa in. Båda språken kan ändras i
inställningarna, och ett läsespråk kan sparas per kanal.

Om du också kör 7TV eller BTTV använder de Tab för att slutföra en emote. Tab slutför då emoten först, och infogar översättningen bara när det inte fanns något att slutföra. Ctrl/Cmd+Enter och ett klick infogar den alltid.

## Det här får du

- **43 språk**, även de som skrivs från höger till vänster (arabiska, hebreiska, persiska), med regionala
  varianter hållna isär (brasiliansk och europeisk portugisiska, förenklad och traditionell kinesiska, kantonesiska)
- **Överallt där chatten finns**: livechatt, popout, inbäddad chatt, moderatorvy, stream manager, VOD- och klipprepriser, på
  www.twitch.tv, m.twitch.tv och dashboard.twitch.tv, med eller utan 7TV, BTTV och FFZ
- **Tillägget talar dem också**: inställningar, popup och chattfält på alla 43, valda i en meny med flaggor
- **Gratis direkt** med Google Translate. Lägg till din egen gratis DeepL-nyckel för bättre europeiska språk;
  MyMemory och Lingva tar över när en tjänst fallerar
- **Översättning på enheten** i Chrome och Edge där webbläsaren erbjuder det: inget nätverk, ingen kvot, och
  texten lämnar aldrig din dator
- **Filter**: hoppa över bottar, tysta användare eller kanaler, dölj rader som innehåller ett visst ord,
  översätt bara de språk du väljer
- **Byggt för snabba chattar**: emotenamn från kanalens 7TV-, BTTV- och FFZ-set översätts aldrig, även om du inte kör
  de tilläggen, länkar och @omnämnanden läggs åt sidan innan något skickas, en ordlista för namn som tjänsterna
  förstör, en översättningscache
- **Fyra visningsstilar**: under meddelandet, på samma rad, i stället för det, eller bara vid hover
- **Pausa en kanal** från chattfältet utan att stoppa de andra. Att byta kanal eller uppdatera tillägget
  låter öppna flikar fortsätta översätta, utan omladdning
- **Medveten om moderering**: ett meddelande som en moderator tar bort, en timeout eller en ban förlorar också sin översättning
- **Ser ut som Twitch**: lila, och den följer chattens egna mörka eller ljusa tema om du inte väljer ett
- Chrome, Brave, Edge och Firefox

| Chatten, översatt medan den rullar | Popupen i verktygsfältet |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch-chatt där varje spanskt meddelande har sin engelska översättning under sig, med tilläggets statusfält ovanför listan" width="360"> | <img src="screenshots/popup.png" alt="Tilläggets popup med målspråk, visningsstil, inställningen för förhandsvisning och tjänstekedjan" width="360"> |

| Det du skriver, innan du skickar det | Välj ett språk, eller låt det välja |
|---|---|
| <img src="screenshots/compose.png" alt="Chattrutan med ett engelskt meddelande och ovanför det en förhandsvisning av den spanska versionen som skickas" width="360"> | <img src="screenshots/languages.png" alt="Ett sökbart rutnät med språkflaggor och namn, med kanalens eget språk först" width="360"> |

<sub>Tagna med den utgivna builden i ett chattrum som det här repot hittar på själv: användarnamnen och
meddelandena är påhittade och översättningarna besvaras lokalt, så ingen verklig persons användarnamn hamnar
på den här sidan.</sub>

## Installera

Ladda ner zip-filen för din webbläsare från [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) och packa upp den.

- Chrome, Brave, Edge (`…-chromium.zip`): öppna `chrome://extensions`, slå på Utvecklarläge, klicka på Läs in okomprimerat tillägg och välj mappen.
- Firefox 121+ (`…-firefox.zip`): öppna `about:debugging#/runtime/this-firefox`, klicka på Läs in tillfälligt tillägg och välj `manifest.json`.
  Firefox glömmer ett tillfälligt tillägg när det startar om.

En kopia som installerats så uppdaterar sig inte själv: Dess ikon visar ett märke när en nyare version finns,
och popupen länkar till den senaste versionen.

## Översättningsmotorer

Fyra tjänster i kedja: När en fallerar tar nästa över. Ordningen bestämmer du själv.

| Tjänst | Nyckel | Anmärkning |
|---|---|---|
| Google | ingen | standardvalet, fungerar direkt |
| DeepL | gratis | bäst på europeiska språk, [gratis nyckel](https://www.deepl.com/pro-api) för 1 miljon tecken i månaden |
| MyMemory | ingen | reserv |
| Lingva | ingen | reserv, på en publik instans om du inte pekar den mot din egen |

Chromiums inbyggda översättare behöver inget nätverk och ingen kvot. Chrome och Edge 138 och senare kan erbjuda
den, men inte alla kopior gör det, och varje språkpar behöver få sin modell nedladdad en gång, med ett klick från
fältet. Firefox har den inte. Där den saknas tar molnkedjan över och inget går sönder.

## Inställningar

Klicka på kugghjulet i chattfältet, eller högerklicka på tilläggets ikon och välj Inställningar.

- **Tjänster**: motorernas ordning, din DeepL-nyckel och läget: först på enheten, först molnet eller bara på
  enheten
- **Visning**: målspråk, visningsstil, originaltext och språkmärke, textstorlek, radavstånd,
  typsnitt, accentfärg, chattens tema, förhandsvisningen när du skriver och vad ett klick på den gör
- **Filter**: bottar, användare, kanaler, nyckelord, källspråk och en ordlista med ersättningar
- **Avancerat**: cachens storlek och livslängd, samtidiga förfrågningar, en gräns per kanal, säkerhetskopia och återställning
- **Aktivitet**: översatta meddelanden, cacheträffar, varje språk som setts i chatten, och varför var och en av
  de senaste 50 raderna översattes eller lämnades i fred
- **Tangentbord**: Alt+Shift+T slår på eller av chattöversättningen (Alt+T är Twitchs teaterläge), Alt+W
  förhandsvisningen när du skriver. Båda kan ändras i webbläsarens kortkommandon för tillägg
- Språkknappen i chattens åtgärdsfält, under meddelanderutan: ett klick öppnar listan över språk du skriver på,
  att skriva filtrerar den. Den högst upp i chatten ställer in språket du läser på

## Språk som stöds

Engelska · Franska · Spanska · Portugisiska · Portugisiska (Brasilien) · Tyska · Italienska · Nederländska · Polska · Svenska · Tjeckiska · Slovakiska · Rumänska · Ryska · Ukrainska · Turkiska · Arabiska · Hebreiska · Japanska · Koreanska · Kinesiska (förenklad) · Kinesiska (traditionell) · Thailändska · Vietnamesiska · Indonesiska · Hindi · Finska · Norska · Danska · Grekiska · Ungerska · Bulgariska · Katalanska · Slovenska · Estniska · Litauiska · Lettiska · Persiska · Bengali · Tamil · Malajiska · Filippinska · Kantonesiska

Chatten översätts till vilket som helst av dem, och tilläggets eget gränssnitt finns på vart och ett.

## Integritet

Inget konto, ingen min server och ingen analys om du inte väljer att få en daglig anonym räkning som skickas till Google Analytics (använda motorer, fel, hastighet, aldrig dina meddelanden, namn eller kanaler). Chattmeddelanden, och ditt utkast medan förhandsvisningen är på, går till den översättningstjänst du valt och
ingen annanstans, och i läget på enheten inte ens dit. För att veta kanalens språk frågar det Twitch om kanalens
sändningsspråk och id, och för att hålla emotenamn utanför översättningarna frågar det 7TV, BetterTTV och
FrankerFaceZ om kanalens emotenamn, vilket talar om för dem kanalens id och inget annat. En kopia installerad från en butik gör inga andra
förfrågningar. En kopia installerad för hand frågar GitHub efter den senaste release-taggen, högst var sjätte
timme, för att veta om den ska visa sitt uppdateringsmärke. [Detaljer](PRIVACY.md)

## FAQ

**Meddelanden översätts inte.**
Öppna fliken Aktivitet i inställningarna och tryck på "Hämta beslut": Den listar de senaste 50 raderna och
säger varför var och en översattes eller lämnades i fred. De flesta överhoppade rader hoppas över med avsikt: samma
användare som upprepar sig, rader som är för korta, bara emojis eller skratt, eller redan på ditt läsespråk. Om fliken inte visar något alls ser tillägget inte chatten: Öppna ett
ärende.

**Det lila fältet försvann.**
Ladda om sidan. Om det händer igen, öppna ett [ärende](https://github.com/kilworks/twitch-chat-translator/issues)
med kanalen och vad du gjorde innan.

**Hur får jag bättre översättningar?**
Lägg till en gratis DeepL-nyckel i inställningarna. Den gratis nivån täcker en miljon tecken i månaden, och
DeepL används bara på de språkpar där det slår de gratis motorerna.

**Vilken visningsstil ska jag använda?**
Under meddelandet. De andra tre fungerar och justeras fortfarande.

**Kan jag använda tillägget på mitt eget språk?**
Ja. Det följer webbläsarens språk, och menyn högst upp i inställningarna byter det till vilket som helst av de 43.

**Fungerar det med 7TV, BTTV och FFZ?**
Ja, med vilket som helst av dem eller inget. Deras emotenamn hålls utanför översättningarna.

**Fungerar det på VOD:er och klipp?**
Ja, på samma sätt som på livesändningar.

**Det slutade fungera efter en Twitch-uppdatering.**
Twitch ändrar ibland hur chatten är uppbyggd. Öppna ett [ärende](https://github.com/kilworks/twitch-chat-translator/issues)
så fixas det.

**Är det gjort av Twitch?**
Nej. Det är ett oberoende open source-projekt, utan koppling till Twitch.

## Nytt

I 1.0.0, den första versionen för Twitch:

- Läser Twitch-chatten i dess tre former: Twitchs egen lista (också med BTTV och FFZ), 7TV-listan samt VOD- och klipprepriser, i popout, inbäddad chatt, moderatorvy, stream manager och mobil
- Skriver in översättningar i meddelanderutan med emotes kvar som ord, och översätter aldrig emotenamnen i kanalens 7TV-, BTTV- och FFZ-set
- Kanalens språk kommer från Twitch, ett borttaget meddelande förlorar sin översättning, och utseendet är lila och följer Twitchs mörka eller ljusa chatt
- Alt+Shift+T slår på eller av översättningen, Tab infogar översättningen bara när 7TV eller BTTV inte nyss slutförde en emote, och språkknappen sitter i åtgärdsfältet under meddelanderutan

Varje version, med vad som ändrades och mätningen bakom:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) och [CHANGELOG.md](CHANGELOG.md).

## Utveckling

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Buildarna är reproducerbara: Samma commit ger byte-identiska zip-filer på vilken maskin som helst, kontrollerat
genom att bygga ett `git archive` av taggen i en tom mapp och jämföra hasharna.

Utöver enhetstesterna laddar offline-gates det byggda tillägget i en riktig webbläsare, styr det och
kontrollerar vad det gör, med sidan serverad lokalt och översättningsmotorn besvarad lokalt. De behöver
Playwright, som medvetet inte är ett beroende: Peka `UX_KIT` mot en mapp vars `node_modules` innehåller det,
eller kör `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Gränssnittstexterna finns i `src/shared/i18n/` (popup och inställningar, nycklade på den engelska texten) och
`src/content/i18n/` (chattfält, nycklade på id med den engelska texten som reserv), en fil per språk; testerna
kräver hela nyckeluppsättningen av varje fil. Butikstexterna finns i [store/](store/), och en release är en
versionstagg: CI:n bygger, kontrollerar och publicerar den i båda butikerna.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Relaterade projekt

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), samma översättare för Kick-chatten, av samma upphovsperson

## Licens

MIT. Utan koppling till Twitch.
