<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Čítaj chat každého streamu na Twitchi vo svojom jazyku a odpovedaj v jazyku kanála.<br>
Zadarmo, bez účtu, nič sa nenastavuje. 43 jazykov, v chate aj v samotnom rozšírení.

**[Stiahnuť najnovšie vydanie](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge a Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Španielske správy v chate prichádzajú jedna po druhej, každá s anglickým prekladom pod sebou; potom sa píše odpoveď po anglicky, nad poľom chatu sa objaví španielsky náhľad a Tab ho vloží" width="360">

</div>

## Ako to funguje

1. Nainštaluj rozšírenie a otvor ľubovoľný stream na Twitchi. Fialová lišta navrchu chatu ukazuje, že beží.
2. Každá správa dostane preklad hneď pod sebou, len čo príde, v jazyku tvojho prehliadača. Rovnako pri živých
   streamoch, záznamoch VOD aj klipoch.
3. Odpoveď napíš vo svojom jazyku. Náhľad nad poľom chatu ju ukáže v jazyku kanála: stlač Tab alebo naň
   klikni a táto verzia nahradí to, čo si napísal.

Jazyk kanála je ten, ktorý streamer nastavil na Twitchi, takže nie je čo nastavovať. Oba jazyky sa dajú zmeniť v nastaveniach
a jazyk čítania si možno nechať zapamätať pre každý kanál zvlášť.

Ak používaš aj 7TV alebo BTTV, tie používajú Tab na dokončenie emotu. Tab potom najprv dokončí emote a preklad vloží len vtedy, keď nebolo čo dokončovať. Ctrl/Cmd+Enter a kliknutie ho vložia vždy.

## Čo dostaneš

- **43 jazykov**, aj tie písané sprava doľava (arabčina, hebrejčina, perzština), s oddelenými regionálnymi
  variantmi (brazílska a európska portugalčina, zjednodušená a tradičná čínština, kantónčina)
- **Všade, kde je chat**: živý chat, popout, vložený chat, pohľad moderátora, stream manager, záznamy VOD aj klipov, na
  www.twitch.tv, m.twitch.tv a dashboard.twitch.tv, s 7TV, BTTV a FFZ aj bez nich
- **Rozšírenie nimi hovorí aj samo**: nastavenia, vyskakovacie okno aj lišta chatu vo všetkých 43, na výber
  z ponuky s vlajkami
- **Zadarmo hneď po inštalácii** cez Google Translate. Pridaj si vlastný bezplatný kľúč DeepL pre lepšie
  európske jazyky; keď prekladač zlyhá, prevezmú to MyMemory a Lingva
- **Preklad priamo v zariadení** v Chrome a Edge, ak ho prehliadač ponúka: bez siete, bez limitu a text
  nikdy neopustí tvoj počítač
- **Filtre**: preskakovanie botov, stlmenie používateľov alebo kanálov, skrývanie riadkov so zadaným slovom,
  preklad len vybraných jazykov
- **Robené pre rýchle chaty**: názvy emotov zo sád 7TV, BTTV a FFZ kanála sa nikdy neprekladajú, ani keď tieto
  rozšírenia nepoužívaš, odkazy a @zmienky sa odložia nabok skôr, než sa niečo odošle, slovník pre mená, ktoré
  prekladače komolia, a vyrovnávacia pamäť prekladov
- **Štyri štýly zobrazenia**: pod správou, na tom istom riadku, namiesto nej, alebo len pri nabehnutí myšou
- **Pozastav jeden kanál** z lišty chatu bez zastavenia ostatných. Prepnutie kanála alebo aktualizácia
  rozšírenia nechá otvorené karty ďalej prekladať, bez obnovenia stránky
- **Dbá na moderovanie**: správa zmazaná moderátorom, timeout alebo ban príde aj o svoj preklad
- **Vyzerá ako Twitch**: fialovo a riadi sa tmavým či svetlým motívom chatu, kým si nevyberieš vlastný
- Chrome, Brave, Edge a Firefox

| Chat preložený za behu | Vyskakovacie okno na paneli |
|---|---|
| <img src="screenshots/chat.png" alt="Chat na Twitchi, v ktorom každá španielska správa má pod sebou anglický preklad, so stavovou lištou rozšírenia nad zoznamom" width="360"> | <img src="screenshots/popup.png" alt="Vyskakovacie okno rozšírenia s cieľovým jazykom, štýlom zobrazenia, nastavením náhľadu pri písaní a reťazcom poskytovateľov" width="360"> |

| Čo píšeš, ešte než to odošleš | Vyber jazyk, alebo ho nechaj vybrať |
|---|---|
| <img src="screenshots/compose.png" alt="Pole na písanie s anglickou správou a nad ním náhľad španielskej verzie, ktorá sa odošle" width="360"> | <img src="screenshots/languages.png" alt="Vyhľadávacia mriežka vlajok a názvov jazykov, s jazykom kanála na prvom mieste" width="360"> |

<sub>Nasnímané z vydaného buildu v chatovacej miestnosti, ktorú si tento repozitár vytvára sám: používateľské
mená a správy sú vymyslené a preklady sa odpovedajú lokálne, takže sa na túto stránku nedostane prezývka
žiadneho skutočného človeka.</sub>

## Inštalácia

Stiahni si zip pre svoj prehliadač z [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) a rozbaľ ho.

- Chrome, Brave, Edge (`…-chromium.zip`): otvor `chrome://extensions`, zapni režim pre vývojárov, klikni na Načítať rozbalené, vyber priečinok.
- Firefox 121+ (`…-firefox.zip`): otvor `about:debugging#/runtime/this-firefox`, klikni na Načítať dočasný doplnok, vyber `manifest.json`.
  Firefox si dočasný doplnok po reštarte nepamätá.

Kópia nainštalovaná takto sa sama neaktualizuje: keď existuje novšia verzia, na jej ikone sa zobrazí odznak
a vyskakovacie okno odkazuje na najnovšie vydanie.

## Prekladače

Štyria poskytovatelia za sebou: keď jeden zlyhá, prevezme ďalší. Poradie si nastavuješ ty.

| Poskytovateľ | Kľúč | Poznámka |
|---|---|---|
| Google | žiadny | predvolený, funguje hneď |
| DeepL | bezplatný | najlepší pre európske jazyky, [bezplatný kľúč](https://www.deepl.com/pro-api) na 1 milión znakov mesačne |
| MyMemory | žiadny | záloha |
| Lingva | žiadny | záloha, na verejnej inštancii, kým ju nenasmeruješ na vlastnú |

Vstavaný prekladač Chromia nepotrebuje sieť ani limit. Chrome a Edge od verzie 138 ho môžu ponúkať, no nie každá
kópia ho má a každý jazykový pár potrebuje jednorazové stiahnutie modelu, jedným kliknutím z lišty. Firefox ho
nemá. Všade, kde chýba, prevezme reťazec v cloude a nič sa nepokazí.

## Nastavenia

Klikni na ozubené koliesko na lište chatu alebo klikni pravým tlačidlom na ikonu rozšírenia a vyber Možnosti.

- **Poskytovatelia**: poradie prekladačov, tvoj kľúč DeepL a režim: najprv v zariadení, najprv cloud, alebo len v zariadení
- **Zobrazenie**: cieľový jazyk, štýl zobrazenia, pôvodný text a odznak jazyka, veľkosť textu, riadkovanie,
  písmo, farba zvýraznenia, motív chatu, náhľad pri písaní a čo sa stane po kliknutí naň
- **Filtre**: boti, používatelia, kanály, kľúčové slová, zdrojové jazyky a slovník náhrad
- **Rozšírené**: veľkosť a životnosť vyrovnávacej pamäte, súbežné požiadavky, limit požiadaviek na kanál, záloha a obnova
- **Aktivita**: preložené správy, zásahy vo vyrovnávacej pamäti, každý jazyk videný v chate a dôvod, prečo sa
  každý z posledných 50 riadkov preložil alebo preskočil
- **Klávesnica**: Alt+Shift+T zapína a vypína preklad chatu (Alt+T je divadelný režim Twitchu), Alt+W náhľad pri
  písaní. Obe skratky sa dajú zmeniť v klávesových skratkách rozšírení vo tvojom prehliadači
- Tlačidlo jazyka na lište akcií chatu, pod poľom správy: jedno kliknutie otvorí zoznam jazykov, v ktorých píšeš,
  písanie ho prefiltruje. To navrchu chatu nastavuje jazyk, v ktorom čítaš

## Podporované jazyky

angličtina · francúzština · španielčina · portugalčina · portugalčina (Brazília) · nemčina · taliančina · holandčina · poľština · švédčina · čeština · slovenčina · rumunčina · ruština · ukrajinčina · turečtina · arabčina · hebrejčina · japončina · kórejčina · čínština (zjednodušená) · čínština (tradičná) · thajčina · vietnamčina · indonézština · hindčina · fínčina · nórčina · dánčina · gréčtina · maďarčina · bulharčina · katalánčina · slovinčina · estónčina · litovčina · lotyština · perzština · bengálčina · tamilčina · malajčina · filipínčina · kantónčina

Chat sa dá preložiť do ktoréhokoľvek z nich a rozhranie samotného rozšírenia je dostupné v každom z nich.

## Súkromie

Žiadny účet, žiadny môj server a žiadne analýzy, pokiaľ sa neprihlásite do denného anonymného počítania odosielaného do služby Google Analytics (použité motory, chyby, rýchlosť, nikdy nie vaše správy, mená alebo kanály). Správy z chatu a tvoj koncept, kým je zapnutý náhľad pri písaní, idú k poskytovateľovi prekladu, ktorého si
vybral, a nikam inam, a v režime v zariadení ani tam nie. Aby zistila jazyk kanála, pýta sa Twitchu na jazyk
vysielania a id kanála, a aby sa názvy emotov nedostali do prekladov, pýta sa 7TV, BetterTTV a FrankerFaceZ na
názvy emotov kanála, čím im povie id toho kanála a nič iné. Kópia nainštalovaná z obchodu nerobí žiadne iné
požiadavky. Ručne nainštalovaná kópia sa pýta GitHubu na tag najnovšieho vydania, najviac raz za šesť hodín,
aby vedela, či má ukázať odznak aktualizácie. [Podrobnosti](PRIVACY.md)

## FAQ

**Správy sa neprekladajú.**
Otvor kartu Aktivita v nastaveniach a stlač "Načítať rozhodnutia": zobrazí posledných 50 riadkov a dôvod, prečo
sa každý preložil alebo preskočil. Väčšina preskočených riadkov sa preskakuje zámerne: ten istý
používateľ, čo sa opakuje, príliš krátke riadky, len emoji alebo smiech, alebo už v jazyku čítania. Ak karta nezobrazuje vôbec nič, rozšírenie chat nevidí: otvor, prosím, issue.

**Fialová lišta zmizla.**
Obnov stránku. Ak sa to zopakuje, otvor [issue](https://github.com/kilworks/twitch-chat-translator/issues)
s názvom kanála a tým, čo si robil predtým.

**Ako dosiahnuť lepšie preklady?**
Pridaj v nastaveniach bezplatný kľúč DeepL. Bezplatný limit pokryje milión znakov mesačne a DeepL sa používa
len pri jazykových pároch, kde poráža bezplatné prekladače.

**Aký štýl zobrazenia mám použiť?**
Pod správou. Ostatné tri fungujú, ale stále sa dolaďujú.

**Môžem rozšírenie používať vo svojom jazyku?**
Áno. Riadi sa jazykom tvojho prehliadača a ponuka navrchu nastavení ho prepne na ktorýkoľvek zo 43.

**Funguje to s 7TV, BTTV a FFZ?**
Áno, s ktorýmkoľvek z nich aj bez nich. Názvy ich emotov sa do prekladov nedostanú.

**Funguje to pri záznamoch VOD a klipoch?**
Áno, rovnako ako pri živých streamoch.

**Po aktualizácii Twitchu to prestalo fungovať.**
Twitch občas zmení, ako je jeho chat postavený. Otvor [issue](https://github.com/kilworks/twitch-chat-translator/issues)
a opraví sa to.

**Robí to Twitch?**
Nie. Je to nezávislý open-source projekt, nepridružený k Twitchu.

## Čo je nové

Vo verzii 1.0.0, prvom vydaní pre Twitch:

- Číta chat Twitchu v troch podobách: vlastný zoznam Twitchu (aj s BTTV a FFZ), zoznam 7TV a záznamy VOD a klipov, v popoute, vloženom chate, pohľade moderátora, stream manageri a na mobile
- Zapisuje preklady do poľa správy s emotes ponechanými ako slová a nikdy neprekladá názvy emotov zo sád 7TV, BTTV a FFZ kanála
- Jazyk kanála pochádza z Twitchu, zmazaná správa príde o preklad a vzhľad je fialový a riadi sa tmavým či svetlým chatom Twitchu
- Alt+Shift+T zapína a vypína preklad, Tab vloží preklad len vtedy, keď 7TV alebo BTTV práve nedokončilo emote, a tlačidlo jazyka je na lište akcií pod poľom správy

Každé vydanie, s tým, čo sa zmenilo, a meraním, ktoré za tým stojí:
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

Buildy sú reprodukovateľné: ten istý commit dá na ktoromkoľvek stroji bajt po bajte rovnaké zipy, čo sa
overuje zostavením `git archive` tagu v prázdnom priečinku a porovnaním hashov.

Okrem unit testov offline brány načítajú zostavené rozšírenie do skutočného prehliadača, ovládajú ho
a overujú, čo robia, pričom stránka sa servuje lokálne a prekladač odpovedá lokálne. Potrebujú Playwright,
ktorý zámerne nie je závislosťou: nasmeruj `UX_KIT` na priečinok, v ktorého `node_modules` je, alebo spusti
`npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Texty rozhrania sú v `src/shared/i18n/` (vyskakovacie okno a možnosti, kľúčované anglickým textom)
a `src/content/i18n/` (lišta chatu, kľúčovaná id s anglickým textom ako zálohou), jeden súbor na jazyk;
testy vyžadujú od každého súboru plnú sadu kľúčov. Texty pre obchody
sú v [store/](store/) a vydanie je tag verzie: CI ho zostaví, skontroluje a zverejní v oboch obchodoch.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Súvisiace projekty

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), ten istý prekladač pre chat Kicku, od toho istého autora

## Licencia

MIT. Nepridružené k Twitchu.
