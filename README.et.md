<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Loe mis tahes Twitchi voo vestlust oma keeles ja vasta kanali keeles.<br>
Tasuta, kontot pole vaja, midagi pole vaja seadistada. 43 keelt, nii vestluses kui ka laienduses endas.

**[Laadi alla uusim väljalase](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge ja Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Hispaaniakeelsed vestlussõnumid saabuvad ükshaaval, igaühe all inglisekeelne tõlge; seejärel kirjutatakse inglisekeelne vastus, vestlusekasti kohale ilmub hispaaniakeelne eelvaade ja Tab vahetab selle sisse" width="360">

</div>

## Kuidas see töötab

1. Paigalda see ja ava mis tahes Twitchi voog. Vestluse ülaosas olev lilla riba näitab, et laiendus on sees.
2. Iga sõnum saab oma tõlke kohe enda alla, niipea kui see saabub, sinu brauseri keeles. Nii
   otseülekannetes, VOD-kordustes kui ka klippides.
3. Kirjuta vastus oma keeles. Vestlusekasti kohal olev eelvaade näitab seda kanali keeles:
   vajuta Tab või klõpsa sellel ning see versioon asendab selle, mille kirjutasid.

Kanali keel on see, mille striimer Twitchis määras, nii et midagi pole vaja seadistada. Mõlemat keelt saab
seadetes muuta ning lugemiskeele saab jätta meelde kanali kaupa.

Kui kasutad ka 7TV-d või BTTV-d, siis nemad kasutavad Tabi emotikoni lõpetamiseks. Tab lõpetab siis kõigepealt
emotikoni ja lisab tõlke ainult siis, kui polnud midagi lõpetada. Ctrl/Cmd+Enter ja klõps lisavad selle alati.

## Mida sa saad

- **43 keelt**, sealhulgas paremalt vasakule kirjutatavad (araabia, heebrea, pärsia), piirkondlikud
  variandid eraldi (Brasiilia ja Euroopa portugali keel, lihtsustatud ja traditsiooniline hiina keel, kantoni keel)
- **Igal pool, kus vestlus on**: otsevestlus, popout, manus, moderaatorivaade, voo haldur, VOD-i ja klippide kordus,
  lehtedel www.twitch.tv, m.twitch.tv ja dashboard.twitch.tv, 7TV, BTTV ja FFZ-ga või ilma
- **Laiendus räägib neid ka ise**: seaded, hüpikaken ja vestlusriba kõigis 43 keeles, valitakse lippudega menüüst
- **Tasuta kohe karbist** Google Translate'iga. Lisa oma tasuta DeepL-i võti, et Euroopa keeled
  paremini välja tuleksid; MyMemory ja Lingva võtavad üle, kui mõni mootor ei tööta
- **Tõlge seadmes** Chrome'is ja Edge'is, kui brauser seda pakub: ilma võrguta, ilma kvoodita ning
  tekst ei lahku kunagi sinu arvutist
- **Filtrid**: jäta botid vahele, vaigista kasutajaid või kanaleid, peida read, milles on teatud sõna, tõlgi ainult
  sinu valitud keeli
- **Tehtud kiirete vestluste jaoks**: kanali 7TV, BTTV ja FFZ komplektide emotikoninimesid ei tõlgita kunagi, isegi kui
  sa neid laiendusi ei kasuta, lingid ja @mainimised pannakse enne mis tahes saatmist kõrvale, sõnastik nimedele,
  mida mootorid rikuvad, tõlgete vahemälu
- **Neli kuvastiili**: sõnumi all, samas reas, sõnumi asemel või ainult kursoriga peale minnes
- **Peata üks kanal** vestlusribalt, teisi peatamata. Kanalit vahetades või laiendust uuendades
  tõlgivad avatud vahelehed edasi, ilma uuesti laadimata
- **Moderatsiooniteadlik**: sõnum, mille moderaator kustutab, või mille eemaldab timeout või ban, kaotab ka oma tõlke
- **Näeb välja nagu Twitch**: lilla, ja järgib vestluse enda tumedat või heledat teemat, kui sa just teist ei vali
- Chrome, Brave, Edge ja Firefox

| Vestlus, tõlgituna selle kerimise ajal | Tööriistariba hüpikaken |
|---|---|
| <img src="screenshots/chat.png" alt="Twitchi vestlus, kus iga hispaaniakeelse sõnumi all on inglisekeelne tõlge, ning laienduse olekuriba nimekirja kohal" width="360"> | <img src="screenshots/popup.png" alt="Laienduse hüpikaken: sihtkeel, kuvastiil, sõnumi eelvaate seade ja teenuste ahel" width="360"> |

| See, mida kirjutad, enne saatmist | Vali keel või lase sellel ise valida |
|---|---|
| <img src="screenshots/compose.png" alt="Vestlusekast inglisekeelse sõnumiga ning selle kohal eelvaade hispaaniakeelsest versioonist, mis saadetakse" width="360"> | <img src="screenshots/languages.png" alt="Otsitav ruudustik keelte lippude ja nimedega, kanali enda keel esimesena" width="360"> |

<sub>Pildid on tehtud väljalaskeversioonist vestlusruumis, mille see hoidla ise välja mõtleb: kasutajanimed ja
sõnumid on väljamõeldud ning tõlked vastatakse kohapeal, nii et ühegi päris inimese kasutajanimi sellele lehele ei jõua.</sub>

## Paigaldamine

Laadi oma brauseri zip alla lehelt [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) ja paki see lahti.

- Chrome, Brave, Edge (`…-chromium.zip`): ava `chrome://extensions`, lülita sisse arendajarežiim, klõpsa Laadi paketita laiendus ja vali kaust.
- Firefox 121+ (`…-firefox.zip`): ava `about:debugging#/runtime/this-firefox`, klõpsa Laadi ajutine lisa ja vali `manifest.json`.
  Firefox unustab ajutise lisa, kui see taaskäivitub.

Nii paigaldatud koopia ei uuene ise: selle ikoonile ilmub märk, kui uuem versioon on olemas, ja
hüpikaken viitab uusimale väljalasele.

## Tõlkemootorid

Neli teenust ahelas: kui üks ei tööta, võtab järgmine üle. Järjekorra määrad sina.

| Teenus | Võti | Märkus |
|---|---|---|
| Google | pole vaja | vaikevalik, töötab kohe karbist |
| DeepL | tasuta | parim Euroopa keeltes, [tasuta võti](https://www.deepl.com/pro-api) 1 miljonile tähemärgile kuus |
| MyMemory | pole vaja | varuvariant |
| Lingva | pole vaja | varuvariant, avalikus instantsis, kui sa ei suuna seda oma enda omale |

Chromiumi sisseehitatud tõlkija ei vaja võrku ega kvooti. Chrome ja Edge 138 ja uuemad võivad seda pakkuda, kuigi mitte
iga koopia ei paku, ning iga keelepaar vajab oma mudeli allalaadimist üks kord, ühe klõpsuga ribalt. Firefoxis seda
pole. Kus seda pole, võtab pilveahel üle ja miski ei lähe katki.

## Seaded

Klõpsa vestlusriba hammasrattal või tee laienduse ikoonil parem klõps ja vali Seaded.

- **Teenused**: mootorite järjekord, sinu DeepL-i võti ja režiim: esmalt seadmes, esmalt pilv või ainult seadmes
- **Välimus**: sihtkeel, kuvastiil, algtekst ja keelemärk, teksti suurus, reavahe,
  kirjatüüp, rõhuvärv, vestluse teema, sõnumi eelvaade ja mida sellel klõpsamine teeb
- **Filtrid**: botid, kasutajad, kanalid, märksõnad, lähtekeeled ja asenduste sõnastik
- **Täpsemalt**: vahemälu suurus ja eluiga, samaaegsed päringud, kanalipõhine päringupiirang, varukoopia ja taastamine
- **Tegevus**: tõlgitud sõnumid, vahemälu tabamused, kõik vestluses nähtud keeled ning see, miks iga viimasest 50
  reast tõlgiti või jäeti rahule
- **Klaviatuur**: Alt+Shift+T lülitab vestluse tõlke sisse või välja (Alt+T on Twitchi teatrirežiim), Alt+W sõnumi
  eelvaate. Mõlemat saab muuta brauseri laienduste kiirklahvides
- Keelenupp vestluse toimingute ribal, sõnumikasti all: üks klõps avab nimekirja keeltest, milles kirjutad,
  sisestamine filtreerib seda. Vestluse ülaosas olev määrab keele, milles loed

## Toetatud keeled

Inglise · Prantsuse · Hispaania · Portugali · Portugali (Brasiilia) · Saksa · Itaalia · Hollandi · Poola · Rootsi · Tšehhi · Slovaki · Rumeenia · Vene · Ukraina · Türgi · Araabia · Heebrea · Jaapani · Korea · Hiina (lihtsustatud) · Hiina (traditsiooniline) · Tai · Vietnami · Indoneesia · Hindi · Soome · Norra · Taani · Kreeka · Ungari · Bulgaaria · Katalaani · Sloveeni · Eesti · Leedu · Läti · Pärsia · Bengali · Tamili · Malai · Filipiini · Kantoni

Vestlust saab tõlkida mis tahes neist ning laienduse enda liides on saadaval igas.

## Privaatsus

Ei mingit kontot, minu serverit ega analüüsi, välja arvatud juhul, kui lubate Google Analyticsile saadetava igapäevase anonüümse loenduse (kasutatud mootorid, vead, kiirus, mitte kunagi teie sõnumid, nimed või kanalid). Vestlussõnumid ja sinu mustand, kui sõnumi eelvaade on sees, lähevad sinu valitud tõlketeenusele ja
mujale mitte, ning seadmes tõlkimise režiimis isegi mitte sinna. Kanali keele teadasaamiseks küsib see Twitchilt kanali
ülekandekeelt ja id-d ning emotikoninimede tõlgetest väljajätmiseks küsib 7TV-lt, BetterTTV-lt ja FrankerFaceZ-lt
kanali emotikoninimesid, mis ütleb neile kanali id ja midagi muud mitte. Poest paigaldatud koopia ei tee muid päringuid. Käsitsi
paigaldatud koopia küsib GitHubilt viimast release'i silti, kõige rohkem iga kuue tunni järel, et teada, kas
näidata uuenduse märki. [Üksikasjad](PRIVACY.md)

## KKK

**Sõnumeid ei tõlgita.**
Ava seadetes vaheleht Tegevus ja vajuta „Loe otsused“: see loetleb viimased 50 rida ja ütleb, miks
iga neist tõlgiti või jäeti rahule. Enamik vahele jäetud ridu jäetakse vahele meelega: sama kasutaja kordamine, liiga lühikesed read,
ainult emojid või naer, või read, mis on juba lugemiskeeles. Kui vaheleht ei näita üldse midagi, siis laiendus ei näe vestlust:
ava issue.

**Lilla riba kadus.**
Värskenda lehte. Kui see juhtub uuesti, ava [issue](https://github.com/kilworks/twitch-chat-translator/issues)
ja kirjuta kanal ning mida enne tegid.

**Kuidas saada paremaid tõlkeid?**
Lisa seadetes tasuta DeepL-i võti. Tasuta pakett katab miljon tähemärki kuus ning DeepL-i kasutatakse ainult nende keelepaaride
puhul, kus see ületab tasuta mootorid.

**Millist kuvastiili peaksin kasutama?**
Sõnumi all. Ülejäänud kolm töötavad ja neid alles viimistletakse.

**Kas ma saan laiendust oma keeles kasutada?**
Jah. See järgib sinu brauseri keelt ning seadete ülaosas olev menüü vahetab selle mis tahes
43 keele vastu.

**Kas see töötab 7TV, BTTV ja FFZ-ga?**
Jah, mis tahes neist või ilma nendeta. Nende emotikoninimed jäetakse tõlgetest välja.

**Kas see töötab VOD-ides ja klippides?**
Jah, samamoodi nagu otseülekannetes.

**See läks pärast Twitchi uuendust katki.**
Twitch muudab vahel oma vestluse ülesehitust. Ava [issue](https://github.com/kilworks/twitch-chat-translator/issues)
ja see parandatakse.

**Kas selle on teinud Twitch?**
Ei. See on sõltumatu avatud lähtekoodiga projekt, mis ei ole Twitchiga seotud.

## Mis on uut

Versioonis 1.0.0, esimeses Twitchi väljalaskes:

- Loeb Twitchi vestlust kõigis kolmes vormis: Twitchi enda nimekiri (ka BTTV ja FFZ-ga), 7TV nimekiri ning VOD-i ja klippide kordus, popoutis, manuses, moderaatorivaates, voo halduris ja mobiilis
- Kirjutab tõlked sõnumikasti nii, et emotikonid jäävad sõnadeks, ning ei tõlgi kunagi kanali 7TV, BTTV ja FFZ komplektide emotikoninimesid
- Kanali keel tuleb Twitchist, kustutatud sõnum kaotab oma tõlke ning välimus on lilla ja järgib Twitchi tumedat või heledat vestlust
- Alt+Shift+T lülitab tõlke sisse või välja, Tab lisab tõlke ainult siis, kui 7TV või BTTV polnud just emotikoni lõpetanud, ning keelenupp asub toimingute ribal sõnumikasti all

Iga versioon, koos sellega, mis muutus, ja selle taga oleva mõõtmisega:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) ja [CHANGELOG.md](CHANGELOG.md).

## Arendus

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, ühiktestid, build: värav, mille iga pakett läbib
npm run build:firefox    # Firefoxi build, sama dist/ kaust
npm run package:all      # mõlemad zipid, kausta release/
npm run dev              # HMR
```

Buildid on reprodutseeritavad: sama commit annab mis tahes masinas baidi täpsusega identsed zipid, mida kontrollitakse
sildist `git archive` ehitamisega tühjas kaustas ja räside võrdlemisega.

Lisaks ühiktestidele laadivad võrguta väravad ehitatud laienduse päris brauserisse, juhivad seda ja kontrollivad,
mida see teeb, kusjuures leht ja tõlkemootor serveeritakse kohapeal. Need vajavad
Playwrighti, mis ei ole teadlikult sõltuvus: suuna `UX_KIT` kausta, mille `node_modules` seda sisaldab,
või käivita `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # kõik võrguta väravad, ilma aknata
node test/e2e/store-shots-fixture.mjs --lang=ja         # poe ekraanipildid ühes kirjelduse keeles
node test/e2e/store-shots-fixture.mjs --gif             # inglisekeelsed poe ekraanipildid, README pildid ja see GIF
```

Liidese tekstid asuvad kaustades `src/shared/i18n/` (hüpikaken ja seaded, võtmeks inglisekeelne tekst) ja
`src/content/i18n/` (vestlusriba, võtmeks id ja varuks inglisekeelne tekst), üks fail keele kohta;
testid nõuavad igalt faililt täielikku võtmekomplekti. Poe
tekstid asuvad kaustas [store/](store/) ja release on versioonisilt: CI ehitab, kontrollib ja avaldab selle mõlemas
poes.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Seotud projektid

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), sama tõlkija Kicki vestlusele, sama autori tehtud

## Litsents

MIT. Twitchiga seotud ei ole.
