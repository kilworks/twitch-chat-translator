<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Olvasd bármelyik Twitch-csevegést a saját nyelveden, és válaszolj a csatorna nyelvén.<br>
Ingyen, fiók nélkül, semmit nem kell beállítani. 43 nyelv, a csevegésben és magában a bővítményben is.

**[A legfrissebb kiadás letöltése](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge és Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spanyol csevegőüzenetek érkeznek egymás után, mindegyik alatt az angol fordítással; aztán egy angol válasz készül, a csevegőmező fölött megjelenik a spanyol előnézet, és a Tab beilleszti" width="360">

</div>

## Hogyan működik

1. Telepítsd, és nyiss meg bármelyik Twitch-streamet. A csevegés tetején egy lila sáv jelzi, hogy be van kapcsolva.
2. Minden üzenet közvetlenül alatta megkapja a fordítását, amint megérkezik, a böngésződ nyelvén. Élő
   adásoknál, VOD-oknál és klipeknél egyaránt.
3. Írd meg a válaszod a saját nyelveden. A csevegőmező fölötti előnézet a csatorna nyelvén mutatja: nyomd meg
   a Tab billentyűt vagy kattints rá, és ez a változat váltja le azt, amit beírtál.

A csatorna nyelve az, amelyet a streamer a Twitchen beállított, így nincs mit beállítani. Mindkét nyelv módosítható
a beállításokban, az olvasási nyelvet pedig csatornánként meg lehet jegyeztetni.

Ha 7TV-t vagy BTTV-t is használsz, azok a Tab billentyűvel fejeznek be egy emotet. Ilyenkor a Tab előbb az emotet
fejezi be, és csak akkor szúrja be a fordítást, ha nem volt mit befejeznie. A Ctrl/Cmd+Enter és egy kattintás
mindig beszúrja.

## Mit kapsz

- **43 nyelv**, a jobbról balra írtakat is beleértve (arab, héber, perzsa), a regionális változatok külön
  kezelésével (brazil és európai portugál, egyszerűsített és hagyományos kínai, kantoni)
- **Mindenhol, ahol chat van**: élő chat, popout, beágyazás, moderátornézet, a streamkezelő, VOD- és klip-visszajátszás,
  a www.twitch.tv, m.twitch.tv és dashboard.twitch.tv oldalon, 7TV-vel, BTTV-vel és FFZ-vel vagy anélkül
- **A bővítmény maga is beszéli őket**: a beállítások, a felugró ablak és a csevegősáv mind a 43 nyelven,
  zászlós menüből választhatóan
- **Ingyen, rögtön** a Google Translate-tel. Add hozzá a saját ingyenes DeepL-kulcsodat a jobb európai
  nyelvekért; ha egy motor kiesik, a MyMemory és a Lingva veszi át
- **Eszközön futó fordítás** Chrome-ban és Edge-ben, ahol a böngésző kínálja: nincs hálózat, nincs keret, és a szöveg
  soha nem hagyja el a gépedet
- **Szűrők**: botok kihagyása, felhasználók vagy csatornák némítása, adott szót tartalmazó sorok elrejtése,
  csak a kiválasztott nyelvek fordítása
- **Gyors csevegésekre építve**: a csatorna 7TV-, BTTV- és FFZ-készleteiben szereplő emotenevek soha nem fordítódnak,
  akkor sem, ha nem futtatod ezeket a bővítményeket, a linkek és az @említések félre vannak téve, mielőtt bármi
  elmenne, szószedet a nevekhez, amiket a motorok elrontanak, és fordítási gyorsítótár
- **Négy megjelenítési mód**: az üzenet alatt, ugyanabban a sorban, helyette, vagy csak rámutatáskor
- **Egy csatorna szüneteltetése** a csevegősávról, a többi leállítása nélkül. Csatornaváltás vagy a bővítmény
  frissítése után a megnyitott lapok tovább fordítanak, újratöltés nélkül
- **Moderációra figyel**: a moderátor által törölt üzenet, egy timeout vagy egy ban elveszi a fordítását is
- **Úgy néz ki, mint a Twitch**: lila, és követi a csevegés saját sötét vagy világos témáját, hacsak nem választasz mást
- Chrome, Brave, Edge és Firefox

| Csevegés, fordítva, ahogy gördül | A felugró ablak az eszköztáron |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch-csevegés, ahol minden spanyol üzenet alatt ott az angol fordítás, a lista fölött a bővítmény állapotsávjával" width="360"> | <img src="screenshots/popup.png" alt="A bővítmény felugró ablaka a célnyelvvel, a megjelenítési stílussal, az írás közbeni előnézet beállításával és a szolgáltatólánccal" width="360"> |

| Amit beírsz, mielőtt elküldöd | Válassz nyelvet, vagy hagyd, hogy kiválassza magát |
|---|---|
| <img src="screenshots/compose.png" alt="Az üzenetmező egy angol üzenettel, fölötte a spanyol változat előnézete, amely el fog menni" width="360"> | <img src="screenshots/languages.png" alt="Kereshető rács zászlókkal és nyelvnevekkel, elöl a csatorna saját nyelvével" width="360"> |

<sub>A kiadott buildből készült, egy olyan csevegőszobában, amit ez a repó maga talál ki: a felhasználónevek
és az üzenetek kitaláltak, a fordításokat helyben válaszolja meg a program, így ezen az oldalon nincs
egyetlen valódi ember beceneve sem.</sub>

## Telepítés

Töltsd le a böngésződnek való zipet a [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) oldalról, és csomagold ki.

- Chrome, Brave, Edge (`…-chromium.zip`): nyisd meg a `chrome://extensions` oldalt, kapcsold be a fejlesztői módot, kattints a Kicsomagolt betöltése gombra, válaszd ki a mappát.
- Firefox 121+ (`…-firefox.zip`): nyisd meg az `about:debugging#/runtime/this-firefox` oldalt, kattints az Ideiglenes bővítmény betöltése gombra, válaszd a `manifest.json` fájlt.
  A Firefox újraindításkor elfelejti az ideiglenes bővítményt.

Az így telepített példány nem frissül magától: ha van újabb verzió, az ikonján jelvény jelenik meg, a felugró
ablak pedig a legfrissebb kiadásra mutat.

## Fordítómotorok

Négy szolgáltató láncban: ha az egyik kiesik, a következő veszi át. A sorrendet te állítod be.

| Szolgáltató | Kulcs | Megjegyzés |
|---|---|---|
| Google | nincs | az alapértelmezett, rögtön működik |
| DeepL | ingyenes | a legjobb az európai nyelveken, [ingyenes kulccsal](https://www.deepl.com/pro-api) havi 1 millió karakterig |
| MyMemory | nincs | tartalék |
| Lingva | nincs | tartalék, nyilvános példányon, hacsak nem a sajátodra irányítod |

A Chromium beépített fordítójához nem kell hálózat, és nincs keret. A Chrome és az Edge 138-as verziótól kínálhatja,
de nem minden példány teszi, és minden nyelvpárhoz egyszer le kell tölteni a modellt, egy kattintással a sávból.
A Firefoxban nincs meg. Ahol hiányzik, a felhős lánc veszi át, és semmi nem romlik el.

## Beállítások

Kattints a fogaskerékre a csevegősávon, vagy kattints jobb gombbal a bővítmény ikonjára, és válaszd a Beállítások pontot.

- **Szolgáltatók**: a motorok sorrendje, a DeepL-kulcsod és a mód: előbb az eszközön, előbb a felhő, vagy csak az eszközön
- **Megjelenés**: célnyelv, megjelenítés módja, eredeti szöveg és nyelvjelvény, szövegméret, sorköz,
  betűtípus, kiemelőszín, csevegés témája, az írás közbeni előnézet és hogy mit tesz a rákattintás
- **Szűrők**: botok, felhasználók, csatornák, kulcsszavak, forrásnyelvek és egy szószedet cserékkel
- **Speciális**: a gyorsítótár mérete és élettartama, párhuzamos kérések, csatornánkénti kérési korlát, mentés és visszaállítás
- **Tevékenység**: lefordított üzenetek, gyorsítótár-találatok, minden a csevegésben látott nyelv, és hogy az utolsó
  50 sor mindegyike miért lett lefordítva vagy hagyva békén
- **Billentyűzet**: az Alt+Shift+T ki-be kapcsolja a csevegés fordítását (az Alt+T a Twitch színházmódja), az Alt+W az
  írás közbeni előnézetet. Mindkettő átállítható a böngésző bővítményparancsainál
- A nyelvgomb a csevegés műveletsávjában, az üzenetmező alatt: egy kattintás megnyitja azon nyelvek listáját,
  amelyeken írsz, a gépelés szűri. A csevegés tetején lévő az olvasási nyelvet állítja

## Támogatott nyelvek

angol · francia · spanyol · portugál · portugál (Brazília) · német · olasz · holland · lengyel · svéd · cseh · szlovák · román · orosz · ukrán · török · arab · héber · japán · koreai · kínai (egyszerűsített) · kínai (hagyományos) · thai · vietnami · indonéz · hindi · finn · norvég · dán · görög · magyar · bolgár · katalán · szlovén · észt · litván · lett · perzsa · bengáli · tamil · maláj · filippínó · kantoni

A csevegés bármelyikre fordítható, és maga a bővítmény felülete is elérhető mindegyiken.

## Adatvédelem

Nincs fiók, nincs szerverem és nincs elemzés, hacsak nem engedélyezi a Google Analytics számára elküldött napi névtelen számlálást (használt motorok, hibák, sebesség, soha nem az Ön üzenetei, nevei vagy csatornái). A csevegőüzenetek, és az írás közbeni előnézet bekapcsolt állapotában a piszkozatod, a kiválasztott fordítószolgáltatóhoz
mennek, máshová nem, eszközön futó módban oda sem. A csatorna nyelvének megismeréséhez megkérdezi a Twitchet a
csatorna közvetítési nyelvéről és azonosítójáról, az emotenevek fordításból való kihagyásához pedig a 7TV-t, a
BetterTTV-t és a FrankerFaceZ-t a csatorna emotenevei felől, ami a csatorna azonosítóját közli velük, és mást nem.
Az áruházból telepített példány semmilyen más kérést nem küld. A kézzel telepített példány legfeljebb hatóránként lekéri a GitHubtól a legfrissebb kiadás címkéjét,
hogy tudja, megjelenítse-e a frissítési jelvényt. [Részletek](PRIVACY.md)

## GYIK

**Az üzenetek nem fordítódnak.**
Nyisd meg a Tevékenység lapot a beállításokban, és nyomd meg a "Döntések beolvasása" gombot: kilistázza az utolsó
50 sort, és megmondja, miért lett lefordítva vagy hagyva békén mindegyik. A kihagyott sorok többségét szándékosan
hagyja ki: ugyanaz a felhasználó ismétli magát, túl rövid sorok, csak emoji vagy nevetés, vagy a sor már az olvasási
nyelveden van. Ha a lap egyáltalán nem mutat semmit, a
bővítmény nem látja a csevegést: nyiss egy issue-t.

**Eltűnt a lila sáv.**
Frissítsd az oldalt. Ha újra megtörténik, nyiss egy [issue-t](https://github.com/kilworks/twitch-chat-translator/issues)
a csatornával és azzal, amit előtte csináltál.

**Hogyan kapok jobb fordításokat?**
Adj hozzá egy ingyenes DeepL-kulcsot a beállításokban. Az ingyenes keret havi egymillió karaktert fed le, a DeepL
pedig csak azokra a nyelvpárokra fogy, ahol megveri az ingyenes motorokat.

**Melyik megjelenítési módot használjam?**
Az üzenet alattit. A másik három működik, de még csiszolás alatt vannak.

**Használhatom a bővítményt a saját nyelvemen?**
Igen. A böngésződ nyelvét követi, a beállítások tetején lévő menü pedig
a 43 nyelv közül bármelyikre átváltja.

**Működik 7TV-vel, BTTV-vel és FFZ-vel?**
Igen, bármelyikkel vagy egyikkel sem. Az emoteneveik kimaradnak a fordításokból.

**Működik VOD-okon és klipeken?**
Igen, ugyanúgy, mint az élő adásokon.

**Egy Twitch-frissítés után elromlott.**
A Twitch néha megváltoztatja, hogyan épül fel a csevegése. Nyiss egy [issue-t](https://github.com/kilworks/twitch-chat-translator/issues),
és javítva lesz.

**Ezt a Twitch csinálja?**
Nem. Független nyílt forráskódú projekt, a Twitchhez nem kapcsolódik.

## Újdonságok

Az 1.0.0-ban, az első Twitch-kiadásban:

- A Twitch-csevegést mindhárom formájában olvassa: a Twitch saját listáját (BTTV-vel és FFZ-vel is), a 7TV listáját, valamint a VOD- és klip-visszajátszást, popoutban, beágyazásban, moderátornézetben, a streamkezelőben és mobilon
- A fordításokat az üzenetmezőbe írja, az emotek szavakként megmaradnak, és soha nem fordítja le a csatorna 7TV-, BTTV- és FFZ-készleteiben szereplő emotenevek
- A csatorna nyelve a Twitchtől jön, a törölt üzenet elveszti a fordítását, a megjelenés pedig lila, és követi a Twitch sötét vagy világos csevegését
- Az Alt+Shift+T ki-be kapcsolja a fordítást, a Tab csak akkor szúrja be a fordítást, ha a 7TV vagy a BTTV nem most fejezett be egy emotet, a nyelvgomb pedig a műveletsávban van az üzenetmező alatt

Minden kiadás, azzal együtt, mi változott, és a mérés, ami mögötte áll:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) és [CHANGELOG.md](CHANGELOG.md).

## Fejlesztés

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

A buildek reprodukálhatók: ugyanaz a commit bármelyik gépen bájtra azonos zipeket ad, amit úgy ellenőrzünk, hogy
a címke `git archive`-ját építjük le egy üres mappában, és összehasonlítjuk a hash-eket.

Az egységtesztek mellett offline kapuk töltik be az elkészült bővítményt egy valódi böngészőbe, vezérlik,
és ellenőrzik, mit csinálnak, helyben kiszolgált oldallal és helyben válaszoló fordítómotorral. Playwrightra
van szükségük, ami szándékosan nem függőség: az `UX_KIT` mutasson egy olyan mappára, amelynek `node_modules`
könyvtára tartalmazza, vagy futtasd az `npm i -D playwright` parancsot.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

A felület szövegei az `src/shared/i18n/` (felugró ablak és beállítások, az angol szöveg a kulcs) és
az `src/content/i18n/` (csevegősáv, azonosító a kulcs, tartaléknak az angol szöveg) mappában vannak, nyelvenként
egy fájl; a tesztek minden fájltól a teljes kulcskészletet megkövetelik. Az áruházi
szövegek a [store/](store/) mappában vannak, a kiadás pedig egy verziócímke: a CI felépíti, ellenőrzi és
közzéteszi mindkét áruházban.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Kapcsolódó projektek

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), ugyanez a fordító a Kick csevegéséhez, ugyanattól a szerzőtől

## Licenc

MIT. A Twitchhez nem kötődik.
