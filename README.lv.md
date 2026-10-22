<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Lasi jebkura Twitch straumes čatu savā valodā un atbildi kanāla valodā.<br>
Bez maksas, bez konta, nekas nav jāiestata. 43 valodas, gan čatā, gan pašā paplašinājumā.

**[Lejupielādēt jaunāko versiju](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge un Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spāņu valodas čata ziņas ierodas pa vienai, katrai apakšā ir tulkojums angļu valodā; pēc tam tiek uzrakstīta atbilde angļu valodā, virs čata lodziņa parādās priekšskatījums spāņu valodā, un Tab to ieliek lodziņā" width="360">

</div>

## Kā tas darbojas

1. Instalē to un atver jebkuru Twitch straumi. Violeta josla čata augšpusē norāda, ka tas ir ieslēgts.
2. Katrai ziņai tulkojums parādās tieši zem tās, tiklīdz ziņa ienāk, tavas pārlūkprogrammas valodā. Tiešraidēs,
   VOD un klipos vienādi.
3. Raksti atbildi savā valodā. Priekšskatījums virs čata lodziņa parāda to kanāla valodā:
   nospied Tab vai noklikšķini uz tā, un šī versija aizstās to, ko uzrakstīji.

Kanāla valoda ir tā, ko straumētājs iestatījis Twitch, tāpēc nekas nav jākonfigurē. Abas valodas var mainīt
iestatījumos, un lasīšanas valodu var atcerēties katram kanālam atsevišķi.

Ja lieto arī 7TV vai BTTV, tie izmanto Tab, lai pabeigtu emocijzīmi. Tad Tab vispirms pabeidz emocijzīmi un ievieto
tulkojumu tikai tad, ja nebija ko pabeigt. Ctrl/Cmd+Enter un klikšķis to ievieto vienmēr.

## Ko tu saņem

- **43 valodas**, ieskaitot rakstāmās no labās uz kreiso pusi (arābu, ivrits, persiešu), un reģionālie varianti ir nošķirti
  (Brazīlijas un Eiropas portugāļu, vienkāršotā un tradicionālā ķīniešu, kantoniešu)
- **Visur, kur ir čats**: tiešraides čats, uznirstošais logs, iegulšana, moderatora skats, straumes pārvaldnieks, VOD un klipu
  atkārtojums vietnēs www.twitch.tv, m.twitch.tv un dashboard.twitch.tv, ar 7TV, BTTV un FFZ vai bez tiem
- **Arī paplašinājums runā šajās valodās**: iestatījumi, uznirstošais logs un čata josla ir visās 43, izvēlne ar karogiem
- **Bez maksas uzreiz pēc instalēšanas** ar Google Translate. Pievieno savu bezmaksas DeepL atslēgu, lai labāk tulkotu Eiropas valodas;
  MyMemory un Lingva pārņem darbu, ja kāds dzinējs atsakās
- **Tulkošana ierīcē** Chrome un Edge, ja pārlūks to piedāvā: bez tīkla, bez kvotas, un
  teksts nekad neatstāj tavu datoru
- **Filtri**: izlaid botus, apklusini lietotājus vai kanālus, paslēp rindas, kurās ir kāds vārds, tulko tikai
  tās valodas, ko izvēlies
- **Veidots ātriem čatiem**: kanāla 7TV, BTTV un FFZ kopu emocijzīmju nosaukumi netiek tulkoti nekad, arī ja šos paplašinājumus
  nelieto, saites un @pieminējumi tiek atlikti malā, pirms kaut kas tiek nosūtīts, ir glosārijs vārdiem, ko dzinēji sagroza,
  un tulkojumu kešatmiņa
- **Četri attēlošanas stili**: zem ziņas, tajā pašā rindā, ziņas vietā vai tikai uzvedot kursoru
- **Aptur vienu kanālu** no čata joslas, neapturot pārējos. Mainot kanālu vai atjauninot
  paplašinājumu, atvērtās cilnes turpina tulkot, bez pārlādēšanas
- **Ņem vērā moderēšanu**: ziņa, ko moderators izdzēš, taimauts vai bans zaudē arī savu tulkojumu
- **Izskatās kā Twitch**: violets, un tas seko paša čata tumšajam vai gaišajam motīvam, ja neizvēlies citādi
- Chrome, Brave, Edge un Firefox

| Čats, tulkots, kamēr ritinās | Rīkjoslas uznirstošais logs |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch čats, kurā katrai spāņu valodas ziņai apakšā ir tulkojums angļu valodā, bet virs saraksta ir paplašinājuma statusa josla" width="360"> | <img src="screenshots/popup.png" alt="Paplašinājuma uznirstošais logs ar tulkojuma valodu, attēlošanas stilu, rakstāmās ziņas priekšskatījuma iestatījumu un pakalpojumu ķēdi" width="360"> |

| Ko raksti, pirms nosūti | Izvēlies valodu vai ļauj izvēlēties pašam |
|---|---|
| <img src="screenshots/compose.png" alt="Rakstīšanas lodziņš ar ziņu angļu valodā, virs tā priekšskatījums ar spāņu versiju, kas tiks nosūtīta" width="360"> | <img src="screenshots/languages.png" alt="Valodu karogu un nosaukumu režģis ar meklēšanu, kurā pirmā ir paša kanāla valoda" width="360"> |

<sub>Uzņemts no izlaistās versijas čata istabā, ko izdomā šis repozitorijs: lietotājvārdi un ziņas ir
izdomāti, un tulkojumi tiek atbildēti lokāli, tāpēc šajā lapā nav neviena īsta cilvēka lietotājvārda.</sub>

## Instalēšana

Lejupielādē savam pārlūkam paredzēto zip no [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) un izpako to.

- Chrome, Brave, Edge (`…-chromium.zip`): atver `chrome://extensions`, ieslēdz Developer mode, noklikšķini uz Load unpacked, izvēlies mapi.
- Firefox 121+ (`…-firefox.zip`): atver `about:debugging#/runtime/this-firefox`, noklikšķini uz Load Temporary Add-on, izvēlies `manifest.json`.
  Firefox aizmirst pagaidu paplašinājumu, kad tiek restartēts.

Šādi uzstādīta kopija pati neatjaunināsies: kad ir jaunāka versija, tās ikonai parādās nozīmīte, bet uznirstošais logs
ved uz jaunāko izlaidumu.

## Tulkošanas dzinēji

Četri pakalpojumi ķēdē: ja viens atsakās, nākamais pārņem. Secību nosaki tu.

| Pakalpojums | Atslēga | Piezīme |
|---|---|---|
| Google | nav | noklusējums, strādā uzreiz |
| DeepL | bezmaksas | vislabākais Eiropas valodām, [bezmaksas atslēga](https://www.deepl.com/pro-api) ar 1 miljonu rakstzīmju mēnesī |
| MyMemory | nav | rezerves variants |
| Lingva | nav | rezerves variants, publiskā instancē, ja vien nenorādi savu |

Chromium iebūvētajam tulkotājam nav vajadzīgs ne tīkls, ne kvota. Chrome un Edge 138 un jaunākās versijās tas var būt
pieejams, taču ne katrā kopijā, un katram valodu pārim modelis jālejupielādē vienreiz, ar vienu klikšķi joslā. Firefox to
nepiedāvā. Visur, kur tā nav, mākoņa ķēde pārņem darbu, un nekas nesalūst.

## Iestatījumi

Noklikšķini uz zobrata čata joslā vai ar peles labo pogu uz paplašinājuma ikonas un izvēlies Iestatījumi.

- **Pakalpojumi**: dzinēju secība, tava DeepL atslēga un režīms: vispirms ierīcē, vispirms mākonī vai tikai ierīcē
- **Izskats**: tulkojuma valoda, attēlošanas stils, oriģinālais teksts un valodas zīme, teksta izmērs, rindu atstarpes,
  fonts, akcenta krāsa, čata motīvs, rakstāmās ziņas priekšskatījums un tas, ko dara klikšķis uz tā
- **Filtri**: boti, lietotāji, kanāli, atslēgvārdi, avota valodas un aizstāšanas glosārijs
- **Papildu**: kešatmiņas izmērs un derīguma laiks, vienlaicīgi pieprasījumi, pieprasījumu limits katram kanālam, dublēšana un atjaunošana
- **Aktivitāte**: iztulkotās ziņas, kešatmiņas trāpījumi, katra čatā redzētā valoda un tas, kāpēc katra no pēdējām 50
  rindām tika iztulkota vai atstāta
- **Tastatūra**: Alt+Shift+T ieslēdz vai izslēdz čata tulkošanu (Alt+T ir Twitch kinozāles režīms), Alt+W rakstāmās ziņas
  priekšskatījumu. Abus var pārsaistīt pārlūka paplašinājumu īsinājumtaustiņos
- Valodas poga čata darbību joslā, zem ziņas lodziņa: ar vienu klikšķi atveras to valodu saraksts, kurās raksti,
  rakstot tas tiek filtrēts. Poga čata augšpusē nosaka valodu, kurā lasi

## Atbalstītās valodas

angļu · franču · spāņu · portugāļu · portugāļu (Brazīlija) · vācu · itāļu · holandiešu · poļu · zviedru · čehu · slovāku · rumāņu · krievu · ukraiņu · turku · arābu · ivrits · japāņu · korejiešu · ķīniešu (vienkāršotā) · ķīniešu (tradicionālā) · taju · vjetnamiešu · indonēziešu · hindi · somu · norvēģu · dāņu · grieķu · ungāru · bulgāru · katalāņu · slovēņu · igauņu · lietuviešu · latviešu · persiešu · bengāļu · tamilu · malajiešu · filipīniešu · kantoniešu

Čatu var tulkot jebkurā no tām, un paplašinājuma saskarne ir pieejama katrā no tām.

## Privātums

Nekāda konta, neviena mana servera un nekādas analīzes, ja vien neizvēlaties ikdienas anonīmu skaitu, kas tiek nosūtīts pakalpojumam Google Analytics (izmantotie dzinēji, kļūdas, ātrums, nekad jūsu ziņojumi, vārdi vai kanāli). Čata ziņas un tavs melnraksts, kamēr ir ieslēgts rakstāmās ziņas priekšskatījums, nonāk tikai pie tevis izvēlētā tulkošanas pakalpojuma un
nekur citur, bet tulkošanas ierīcē režīmā pat ne tur. Lai uzzinātu kanāla valodu, tā vaicā Twitch pēc kanāla
pārraides valodas un id, un lai emocijzīmju nosaukumi neiekļūtu tulkojumos, tā vaicā 7TV, BetterTTV un FrankerFaceZ pēc
kanāla emocijzīmju nosaukumiem, kas tiem pasaka kanāla id un neko citu. Veikalā uzstādīta kopija neveic nekādus citus
pieprasījumus. Ar
roku uzstādīta kopija vaicā GitHub pēc jaunākās izlaiduma atzīmes ne biežāk kā reizi sešās stundās, lai zinātu, vai
rādīt atjauninājuma nozīmīti. [Sīkāk](PRIVACY.md)

## BUJ

**Ziņas netiek tulkotas.**
Atver iestatījumu cilni Aktivitāte un nospied „Nolasīt lēmumus“: tā parāda pēdējās 50 rindas un norāda, kāpēc
katra tika iztulkota vai atstāta. Lielākā daļa izlaisto rindu tiek izlaistas ar nolūku: tas pats lietotājs, kas
atkārtojas, pārāk īsas rindas, tikai emoji vai smiekli, vai rindas, kas jau ir tavā lasīšanas valodā. Ja cilnē nav nekā,
paplašinājums neredz čatu:
lūdzu, atver issue.

**Violetā josla pazuda.**
Atsvaidzini lapu. Ja tas atkārtojas, atver [issue](https://github.com/kilworks/twitch-chat-translator/issues)
ar kanālu un to, ko darīji pirms tam.

**Kā iegūt labākus tulkojumus?**
Iestatījumos pievieno bezmaksas DeepL atslēgu. Bezmaksas līmenis sedz miljonu rakstzīmju mēnesī, un DeepL tiek tērēts tikai
tiem valodu pāriem, kuros tas pārspēj bezmaksas dzinējus.

**Kuru attēlošanas stilu izmantot?**
Zem ziņas. Pārējie trīs darbojas, bet joprojām tiek pilnveidoti.

**Vai paplašinājumu var lietot savā valodā?**
Jā. Tas seko tavas pārlūkprogrammas valodai, un izvēlne iestatījumu augšpusē to pārslēdz uz jebkuru no
43.

**Vai tas darbojas ar 7TV, BTTV un FFZ?**
Jā, ar jebkuru no tiem vai bez tiem. To emocijzīmju nosaukumi netiek tulkoti.

**Vai tas darbojas VOD un klipos?**
Jā, tāpat kā tiešraidēs.

**Pēc Twitch atjauninājuma tas salūza.**
Twitch dažkārt maina savu čata uzbūvi. Atver [issue](https://github.com/kilworks/twitch-chat-translator/issues),
un tas tiks salabots.

**Vai to ir izveidojis Twitch?**
Nē. Tas ir neatkarīgs atvērtā koda projekts, kas nav saistīts ar Twitch.

## Kas jauns

Versijā 1.0.0, pirmajā izlaidumā Twitch:

- Lasa Twitch čatu trijās formās: paša Twitch saraksts (arī ar BTTV un FFZ), 7TV saraksts un VOD un klipu atkārtojums, uznirstošajā logā, iegulšanā, moderatora skatā, straumes pārvaldniekā un mobilajā versijā
- Raksta tulkojumus ziņu lodziņā, emocijzīmes paliek kā vārdi, un nekad netulko kanāla 7TV, BTTV un FFZ kopu emocijzīmju nosaukumus
- Kanāla valoda nāk no Twitch, izdzēsta ziņa zaudē savu tulkojumu, un izskats ir violets un seko Twitch tumšajam vai gaišajam čatam
- Alt+Shift+T ieslēdz vai izslēdz tulkošanu, Tab ievieto tulkojumu tikai tad, ja 7TV vai BTTV tikko nepabeidza emocijzīmi, un valodas poga atrodas darbību joslā zem ziņas lodziņa

Visi izlaidumi ar izmaiņām un mērījumiem to pamatā:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) un [CHANGELOG.md](CHANGELOG.md).

## Izstrāde

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Būvējumi ir atkārtojami: viens un tas pats commit jebkurā datorā dod baitu ziņā identiskus zip failus, un to pārbauda,
tukšā mapē uzbūvējot atzīmes `git archive` un salīdzinot jaucējkodus.

Papildus vienībtestiem bezsaistes vārti ielādē uzbūvēto paplašinājumu īstā pārlūkā, vada to un pārbauda,
ko tas dara, lapu apkalpojot lokāli un tulkošanas dzinējam atbildot lokāli. Tiem vajag
Playwright, kas apzināti nav atkarība: norādi `UX_KIT` uz mapi, kuras `node_modules` to satur,
vai palaid `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Saskarnes virknes atrodas `src/shared/i18n/` (uznirstošais logs un iestatījumi, atslēgas ir angļu teksts) un
`src/content/i18n/` (čata josla, atslēgas ir id, ar angļu tekstu kā rezerves variantu), katrai valodai viens fails;
testi pieprasa, lai katrā failā būtu pilns atslēgu kopums. Veikalu
teksti atrodas [store/](store/), un izlaidums ir versijas atzīme: CI to uzbūvē, pārbauda un publicē abos
veikalos.

Tehnoloģijas: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Saistītie projekti

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), tas pats tulkotājs Kick čatam, no tā paša autora

## Licence

MIT. Nav saistīts ar Twitch.
