<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Čtěte chat kteréhokoli streamu na Twitchi ve svém jazyce a odpovídejte v jazyce kanálu.<br>
Zdarma, bez účtu, nic se nenastavuje. 43 jazyků, v chatu i v samotném rozšíření.

**[Stáhnout nejnovější vydání](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge a Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Španělské zprávy v chatu přicházejí jedna po druhé, každá s anglickým překladem pod sebou; pak se píše anglická odpověď, nad polem chatu se objeví španělský náhled a Tab ho vloží" width="360">

</div>

## Jak to funguje

1. Nainstalujte rozšíření a otevřete jakýkoli stream na Twitchi. Fialová lišta nahoře v chatu ukazuje, že běží.
2. Každá zpráva dostane překlad hned pod sebou, jakmile dorazí, v jazyce vašeho prohlížeče. U živých
   streamů, záznamů VOD i klipů stejně.
3. Odpověď napište ve svém jazyce. Náhled nad polem chatu ji ukáže v jazyce kanálu: stiskněte Tab nebo na něj
   klikněte a tato verze nahradí to, co jste napsali.

Jazyk kanálu je ten, který streamer nastavil na Twitchi, takže není co nastavovat. Oba jazyky lze změnit v nastavení a jazyk
čtení si lze nechat zapamatovat pro každý kanál zvlášť.

Pokud používáte i 7TV nebo BTTV, ta používají Tab k dokončení emotu. Tab pak nejdřív dokončí emote a překlad vloží jen tehdy, když nebylo co dokončovat. Ctrl/Cmd+Enter a kliknutí ho vloží vždy.

## Co umí

- **43 jazyků**, včetně písem psaných zprava doleva (arabština, hebrejština, perština), s oddělenými
  regionálními variantami (brazilská a evropská portugalština, zjednodušená a tradiční čínština, kantonština)
- **Všude, kde je chat**: živý chat, popout, vložený chat, pohled moderátora, stream manager, záznamy VOD i klipů, na
  www.twitch.tv, m.twitch.tv a dashboard.twitch.tv, s 7TV, BTTV a FFZ i bez nich
- **Rozšíření jimi mluví i samo**: nastavení, vyskakovací okno i lišta chatu ve všech 43, k výběru
  z nabídky s vlajkami
- **Zdarma hned po instalaci** přes Google Translate. Přidejte vlastní bezplatný klíč DeepL pro lepší
  evropské jazyky; když překladač selže, převezmou to MyMemory a Lingva
- **Překlad přímo v zařízení** v Chromu a Edge, pokud ho prohlížeč nabízí: bez sítě, bez kvóty a text nikdy
  neopustí váš počítač
- **Filtry**: přeskakovat boty, ztlumit uživatele nebo kanály, skrýt řádky obsahující určité slovo, překládat
  jen jazyky, které vyberete
- **Stavěno pro rychlé chaty**: názvy emotů ze sad 7TV, BTTV a FFZ kanálu se nikdy nepřekládají, ani když tato
  rozšíření nepoužíváte, odkazy a @zmínky se odloží stranou dřív, než se cokoli odešle, glosář pro jména, která
  překladače komolí, a mezipaměť překladů
- **Čtyři styly zobrazení**: pod zprávou, na stejném řádku, místo ní, nebo jen při najetí myší
- **Pozastavte jeden kanál** z lišty chatu, aniž byste zastavili ostatní. Při přepnutí kanálu nebo aktualizaci
  rozšíření otevřené karty dál překládají, bez obnovení stránky
- **Dbá na moderaci**: zpráva smazaná moderátorem, timeout nebo ban přijde i o svůj překlad
- **Vypadá jako Twitch**: fialově a řídí se tmavým či světlým motivem chatu, pokud si nevyberete vlastní
- Chrome, Brave, Edge a Firefox

| Chat přeložený za běhu | Vyskakovací okno v liště |
|---|---|
| <img src="screenshots/chat.png" alt="Chat na Twitchi, kde každá španělská zpráva má pod sebou anglický překlad, se stavovou lištou rozšíření nad seznamem" width="360"> | <img src="screenshots/popup.png" alt="Vyskakovací okno rozšíření s cílovým jazykem, stylem zobrazení, nastavením náhledu při psaní a řetězcem poskytovatelů" width="360"> |

| Co napíšete, ještě než to odešlete | Vyberte jazyk, nebo ho nechte vybrat |
|---|---|
| <img src="screenshots/compose.png" alt="Pole pro psaní s anglickou zprávou a nad ním náhled španělské verze, která se odešle" width="360"> | <img src="screenshots/languages.png" alt="Vyhledávací mřížka vlajek a názvů jazyků, s jazykem kanálu na prvním místě" width="360"> |

<sub>Pořízeno z vydaného buildu v chatovací místnosti, kterou si tento repozitář vytváří: uživatelská jména
a zprávy jsou vymyšlené a překlady se odpovídají lokálně, takže se na tuto stránku nedostane přezdívka žádného
skutečného člověka.</sub>

## Instalace

Stáhněte zip pro svůj prohlížeč z [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) a rozbalte ho.

- Chrome, Brave, Edge (`…-chromium.zip`): otevřete `chrome://extensions`, zapněte Režim pro vývojáře, klikněte na Načíst rozbalené a vyberte složku.
- Firefox 121+ (`…-firefox.zip`): otevřete `about:debugging#/runtime/this-firefox`, klikněte na Načíst dočasný doplněk a vyberte `manifest.json`.
  Firefox si dočasný doplněk po restartu nepamatuje.

Takto nainstalovaná kopie se sama neaktualizuje. Když existuje novější verze, ukáže její ikona odznak
a vyskakovací okno odkazuje na nejnovější vydání.

## Překladače

Čtyři poskytovatelé v řetězci: když jeden selže, převezme to další. Pořadí určujete vy.

| Poskytovatel | Klíč | Poznámka |
|---|---|---|
| Google | žádný | výchozí, funguje rovnou |
| DeepL | zdarma | nejlepší pro evropské jazyky, [bezplatný klíč](https://www.deepl.com/pro-api) na 1 milion znaků měsíčně |
| MyMemory | žádný | záloha |
| Lingva | žádný | záloha, na veřejné instanci, pokud ji nenasměrujete na vlastní |

Vestavěný překladač Chromia nepotřebuje síť ani kvótu. Chrome a Edge 138 a novější ho mohou nabízet, i když
ne každá kopie, a každá jazyková dvojice potřebuje jednou stáhnout model, jedním kliknutím z lišty. Firefox ho
nemá. Tam, kde chybí, převezme práci cloudový řetězec a nic se nerozbije.

## Nastavení

Klikněte na ozubené kolo v liště chatu, nebo klikněte pravým tlačítkem na ikonu rozšíření a zvolte Možnosti.

- **Poskytovatelé**: pořadí překladačů, váš klíč DeepL a režim: nejdřív v zařízení, nejdřív cloud, nebo jen
  v zařízení
- **Zobrazení**: cílový jazyk, styl zobrazení, původní text a odznak jazyka, velikost textu, řádkování, písmo,
  barva zvýraznění, motiv chatu, náhled při psaní a co udělá kliknutí na něj
- **Filtry**: boty, uživatelé, kanály, klíčová slova, zdrojové jazyky a glosář náhrad
- **Pokročilé**: velikost a životnost mezipaměti, souběžné požadavky, limit rychlosti na kanál, záloha
  a obnovení
- **Aktivita**: přeložené zprávy, zásahy mezipaměti, každý jazyk, který se v chatu objevil, a proč byl každý
  z posledních 50 řádků přeložen nebo ponechán
- **Klávesnice**: Alt+Shift+T zapíná a vypíná překlad chatu (Alt+T je divadelní režim Twitche), Alt+W náhled při
  psaní. Obě zkratky lze změnit v klávesových zkratkách rozšíření ve vašem prohlížeči
- Tlačítko jazyka v liště akcí chatu, pod polem zprávy: jedno kliknutí otevře seznam jazyků, ve kterých píšete,
  psaní ho filtruje. To nahoře v chatu nastavuje jazyk, ve kterém čtete

## Podporované jazyky

angličtina · francouzština · španělština · portugalština · portugalština (Brazílie) · němčina · italština · nizozemština · polština · švédština · čeština · slovenština · rumunština · ruština · ukrajinština · turečtina · arabština · hebrejština · japonština · korejština · čínština (zjednodušená) · čínština (tradiční) · thajština · vietnamština · indonéština · hindština · finština · norština · dánština · řečtina · maďarština · bulharština · katalánština · slovinština · estonština · litevština · lotyština · perština · bengálština · tamilština · malajština · filipínština · kantonština

Chat se překládá do kteréhokoli z nich a vlastní rozhraní rozšíření je dostupné v každém z nich.

## Soukromí

Žádný účet, žádný můj server a žádná analytika, pokud nesouhlasíte s denním anonymním počtem odesílaným do Google Analytics (použité enginy, chyby, rychlost, nikdy vaše zprávy, jména ani kanály). Zprávy z chatu a váš koncept, dokud je zapnutý náhled při psaní, jdou k poskytovateli překladu, kterého jste
zvolili, a nikam jinam, a v režimu v zařízení ani tam. Aby zjistilo jazyk kanálu, zeptá se Twitche na jazyk vysílání
a id kanálu, a aby názvy emotů nepřišly do překladů, zeptá se 7TV, BetterTTV a FrankerFaceZ na názvy emotů kanálu,
čímž jim sdělí id toho kanálu a nic jiného. Kopie nainstalovaná z obchodu nedělá žádný další
požadavek. Kopie nainstalovaná ručně se nejvýš jednou za šest hodin zeptá GitHubu na značku posledního
vydání, aby věděla, zda ukázat odznak aktualizace. [Podrobnosti](PRIVACY.md)

## Časté otázky

**Zprávy se nepřekládají.**
Otevřete v nastavení kartu Aktivita a stiskněte „Read decisions“: vypíše posledních 50 řádků a u každého
řekne, proč byl přeložen nebo ponechán. Většina přeskočených řádků je přeskočena záměrně: tentýž
uživatel, který se opakuje, příliš krátké řádky, jen emoji nebo smích, nebo už v jazyce čtení. Pokud karta neukazuje vůbec nic, rozšíření chat nevidí:
otevřete prosím issue.

**Fialová lišta zmizela.**
Obnovte stránku. Pokud se to stane znovu, otevřete [issue](https://github.com/kilworks/twitch-chat-translator/issues)
s kanálem a tím, co jste předtím dělali.

**Jak získat lepší překlady?**
Přidejte v nastavení bezplatný klíč DeepL. Bezplatný tarif pokrývá milion znaků měsíčně a DeepL se
používá jen u jazykových dvojic, kde překoná bezplatné překladače.

**Jaký styl zobrazení použít?**
Pod zprávou. Ostatní tři fungují, ale ještě se ladí.

**Mohu rozšíření používat ve svém jazyce?**
Ano. Řídí se jazykem vašeho prohlížeče a nabídka nahoře v nastavení ho přepne na kterýkoli ze 43.

**Funguje to s 7TV, BTTV a FFZ?**
Ano, s kterýmkoli z nich i bez nich. Názvy jejich emotů se do překladů nedostanou.

**Funguje to u záznamů VOD a klipů?**
Ano, stejně jako u živých streamů.

**Po aktualizaci Twitche to přestalo fungovat.**
Twitch občas změní, jak je jeho chat postaven. Otevřete [issue](https://github.com/kilworks/twitch-chat-translator/issues)
a opraví se to.

**Vytvořil to Twitch?**
Ne. Je to nezávislý open-source projekt, se službou Twitch nijak nesouvisí.

## Co je nového

Ve verzi 1.0.0, prvním vydání pro Twitch:

- Čte chat Twitche ve třech podobách: vlastní seznam Twitche (i s BTTV a FFZ), seznam 7TV a záznamy VOD a klipů, v popoutu, vloženém chatu, pohledu moderátora, stream manageru a v mobilu
- Zapisuje překlady do pole zprávy s emoty ponechanými jako slova a nikdy nepřekládá názvy emotů ze sad 7TV, BTTV a FFZ kanálu
- Jazyk kanálu pochází z Twitche, smazaná zpráva přijde o překlad a vzhled je fialový a řídí se tmavým či světlým chatem Twitche
- Alt+Shift+T zapíná a vypíná překlad, Tab vloží překlad jen tehdy, když 7TV nebo BTTV právě nedokončilo emote, a tlačítko jazyka je v liště akcí pod polem zprávy

Každé vydání, s tím, co se změnilo, a měřením, které za tím stojí:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) a [CHANGELOG.md](CHANGELOG.md).

## Vývoj

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Buildy jsou reprodukovatelné: stejný commit dá na jakémkoli stroji bajt po bajtu shodné zipy, což se ověřuje
sestavením `git archive` značky v prázdné složce a porovnáním hashů.

Kromě unit testů načítají offline brány sestavené rozšíření do skutečného prohlížeče, ovládá ho a ověřuje, co
dělá, přičemž stránka se servíruje lokálně a překladač odpovídá lokálně. Potřebují Playwright, který záměrně
není závislostí: nasměrujte `UX_KIT` na složku, jejíž `node_modules` ho obsahuje, nebo spusťte
`npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Texty rozhraní jsou v `src/shared/i18n/` (vyskakovací okno a nastavení, klíčem je anglický text)
a v `src/content/i18n/` (lišta chatu, klíčem je id a anglický text slouží jako záloha), jeden soubor na jazyk;
testy vyžadují, aby každý soubor obsahoval úplnou sadu klíčů. Texty pro obchody jsou v [store/](store/)
a vydání je verzovací značka: CI ji sestaví, zkontroluje a publikuje do obou obchodů.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Související projekty

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), stejný překladač pro chat Kicku, od stejného autora

## Licence

MIT. Se službou Twitch nijak nesouvisí.
