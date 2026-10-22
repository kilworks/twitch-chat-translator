<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Baca sembang Twitch mana-mana dalam bahasa anda sendiri, dan balas dalam bahasa saluran itu.<br>
Percuma, tanpa akaun, tiada apa-apa untuk disediakan. 43 bahasa, dalam sembang dan dalam sambungan itu sendiri.

**[Muat turun keluaran terkini](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge dan Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Mesej sembang bahasa Sepanyol tiba satu demi satu, setiap satu dengan terjemahan bahasa Inggerisnya di bawah; kemudian satu balasan bahasa Inggeris ditaip, pratonton bahasa Sepanyol muncul di atas kotak sembang, dan Tab menukarkannya masuk" width="360">

</div>

## Cara ia berfungsi

1. Pasang, kemudian buka mana-mana strim Twitch. Bar ungu di bahagian atas sembang menandakan sambungan sedang aktif.
2. Setiap mesej terus mendapat terjemahannya di bawah sebaik sahaja ia tiba, dalam bahasa pelayar anda. Strim
   langsung, VOD dan klip sama sahaja.
3. Taip balasan dalam bahasa anda. Pratonton di atas kotak sembang menunjukkannya dalam bahasa saluran:
   tekan Tab atau klik padanya, dan versi itu menggantikan apa yang anda taip.

Bahasa saluran ialah bahasa yang ditetapkan penstrim di Twitch, jadi tiada apa yang perlu ditetapkan. Kedua-dua bahasa boleh
diubah dalam tetapan, dan bahasa bacaan boleh diingat bagi setiap saluran.

Jika anda juga menggunakan 7TV atau BTTV, kedua-duanya menggunakan Tab untuk melengkapkan emote. Tab kemudian melengkapkan
emote dahulu, dan memasukkan terjemahan hanya apabila tiada apa-apa untuk dilengkapkan. Ctrl/Cmd+Enter dan klik sentiasa memasukkannya.

## Apa yang anda dapat

- **43 bahasa**, termasuk yang ditulis dari kanan ke kiri (Arab, Ibrani, Parsi), dengan varian serantau diasingkan
  (Portugis Brazil dan Eropah, Cina Ringkas dan Tradisional, Kantonis)
- **Di mana-mana sembang berada**: sembang langsung, popout, embed, paparan moderator, pengurus strim, ulang tayang VOD dan klip, pada
  www.twitch.tv, m.twitch.tv dan dashboard.twitch.tv, dengan atau tanpa 7TV, BTTV dan FFZ
- **Sambungan ini pun bertutur dalam bahasa itu**: tetapan, popup dan bar sembang ada dalam semua 43 bahasa, dipilih daripada menu berbendera
- **Percuma terus** dengan Google Translate. Tambah kunci DeepL percuma anda sendiri untuk bahasa Eropah yang lebih baik;
  MyMemory dan Lingva mengambil alih apabila satu enjin gagal
- **Terjemahan pada peranti** dalam Chrome dan Edge jika pelayar menawarkannya: tanpa rangkaian, tanpa kuota, dan
  teks tidak pernah meninggalkan komputer anda
- **Penapis**: langkau bot, senyapkan pengguna atau saluran, sembunyikan baris yang mengandungi sesuatu perkataan,
  terjemah hanya bahasa yang anda pilih
- **Dibuat untuk sembang yang laju**: nama emote daripada set 7TV, BTTV dan FFZ saluran itu tidak pernah diterjemah, walaupun anda
  tidak menjalankan sambungan tersebut, pautan dan @sebutan diketepikan sebelum apa-apa dihantar, ada glosari untuk nama yang
  sering dirosakkan enjin, dan ada cache terjemahan
- **Empat gaya paparan**: di bawah mesej, pada baris yang sama, menggantikan mesej asal, atau hanya apabila tuding
- **Jeda satu saluran** dari bar sembang tanpa menghentikan yang lain. Bertukar saluran atau mengemas kini
  sambungan tidak menghentikan tab yang terbuka, tanpa muat semula
- **Peka moderasi**: mesej yang dipadam moderator, atau dibuang oleh timeout atau larangan, kehilangan terjemahannya juga
- **Kelihatan seperti Twitch**: ungu, dan ia mengikut tema gelap atau cerah sembang itu sendiri melainkan anda memilih satu
- Chrome, Brave, Edge dan Firefox

| Sembang, diterjemah sambil bergulir | Popup pada bar alat |
|---|---|
| <img src="screenshots/chat.png" alt="Sembang Twitch yang setiap mesej bahasa Sepanyolnya membawa terjemahan bahasa Inggeris di bawahnya, dengan bar status sambungan di atas senarai" width="360"> | <img src="screenshots/popup.png" alt="Popup sambungan dengan bahasa sasaran, gaya paparan, tetapan pratonton penulisan dan rantaian penyedia" width="360"> |

| Apa yang anda taip, sebelum dihantar | Pilih bahasa, atau biar ia memilih |
|---|---|
| <img src="screenshots/compose.png" alt="Kotak penulisan yang memuatkan mesej bahasa Inggeris, dengan pratonton di atasnya menunjukkan versi bahasa Sepanyol yang akan dihantar" width="360"> | <img src="screenshots/languages.png" alt="Grid bendera dan nama bahasa yang boleh dicari, dengan bahasa saluran itu sendiri di tempat pertama" width="360"> |

<sub>Diambil daripada binaan keluaran dalam bilik sembang yang direka oleh repositori ini: nama pengguna dan mesej
adalah rekaan dan terjemahannya dijawab secara setempat, jadi tiada nama pengguna sebenar yang terpapar di halaman ini.</sub>

## Pasang

Muat turun zip untuk pelayar anda daripada [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) dan nyahzipkannya.

- Chrome, Brave, Edge (`…-chromium.zip`): buka `chrome://extensions`, hidupkan Developer mode, klik Load unpacked, pilih folder itu.
- Firefox 121+ (`…-firefox.zip`): buka `about:debugging#/runtime/this-firefox`, klik Load Temporary Add-on, pilih `manifest.json`.
  Firefox melupakan add-on sementara apabila ia dimulakan semula.

Salinan yang dipasang begini tidak mengemas kini sendiri: ikonnya memaparkan lencana apabila versi lebih baharu wujud, dan
popup memaut ke keluaran terkini.

## Enjin terjemahan

Empat penyedia, dirantai: apabila satu gagal, yang seterusnya mengambil alih. Susunannya anda yang tetapkan.

| Penyedia | Kunci | Nota |
|---|---|---|
| Google | tiada | lalai, terus berfungsi |
| DeepL | percuma | terbaik untuk bahasa Eropah, [kunci percuma](https://www.deepl.com/pro-api) untuk 1 juta aksara sebulan |
| MyMemory | tiada | sandaran |
| Lingva | tiada | sandaran, pada instance awam melainkan anda halakannya ke instance anda sendiri |

Penterjemah terbina dalam Chromium tidak memerlukan rangkaian dan tidak memerlukan kuota. Chrome dan Edge 138 ke atas boleh
menawarkannya, walaupun bukan semua salinan ada, dan setiap pasangan bahasa perlu model dimuat turun sekali, dengan satu klik
dari bar. Firefox tidak mempunyainya. Di mana-mana ia tiada, rantaian awan mengambil alih dan tiada apa yang rosak.

## Tetapan

Klik ikon gear pada bar sembang, atau klik kanan ikon sambungan dan pilih Tetapan.

- **Penyedia** (Providers): susunan enjin, kunci DeepL anda, dan modnya: pada peranti dahulu, awan dahulu, atau pada peranti sahaja
- **Paparan** (Display): bahasa sasaran, gaya paparan, teks asal dan lencana bahasa, saiz teks, jarak baris,
  fon, warna aksen, tema sembang, pratonton penulisan dan apa yang berlaku apabila diklik
- **Penapis** (Filters): bot, pengguna, saluran, kata kunci, bahasa sumber dan glosari penggantian
- **Lanjutan** (Advanced): saiz dan hayat cache, permintaan serentak, had bagi setiap saluran, sandaran dan pemulihan
- **Aktiviti** (Activity): mesej yang diterjemah, cache hit, setiap bahasa yang dilihat dalam sembang, dan sebab setiap satu daripada 50
  baris terakhir diterjemah atau dibiarkan
- **Papan kekunci**: Alt+Shift+T menghidupkan atau mematikan terjemahan sembang (Alt+T ialah mod teater Twitch), Alt+W pratonton
  penulisan. Kedua-duanya boleh ditetapkan semula dalam pintasan sambungan pelayar anda
- Butang bahasa pada bar tindakan sembang, di bawah kotak mesej: satu klik membuka senarai bahasa yang anda tulis, menaip
  menapisnya. Butang di bahagian atas sembang menetapkan bahasa yang anda baca

## Bahasa yang disokong

Inggeris · Perancis · Sepanyol · Portugis · Portugis (Brazil) · Jerman · Itali · Belanda · Poland · Sweden · Czech · Slovak · Romania · Rusia · Ukraine · Turki · Arab · Ibrani · Jepun · Korea · Cina (Ringkas) · Cina (Tradisional) · Thai · Vietnam · Indonesia · Hindi · Finland · Norway · Denmark · Greek · Hungary · Bulgaria · Catalan · Slovenia · Estonia · Lithuania · Latvia · Parsi · Bengali · Tamil · Melayu · Filipina · Kantonis

Sembang diterjemah ke mana-mana bahasa di atas, dan antara muka sambungan itu sendiri tersedia dalam setiap satu.

## Privasi

Tiada akaun, tiada pelayan saya dan tiada analitis melainkan anda mengikut serta dalam kiraan tanpa nama harian yang dihantar ke Google Analytics (enjin digunakan, ralat, kelajuan, tidak sekali-kali mesej, nama atau saluran anda). Mesej sembang, dan draf anda semasa pratonton penulisan dihidupkan, hanya pergi ke penyedia terjemahan yang anda pilih
dan tidak ke tempat lain, dan dalam mod pada peranti ke situ pun tidak. Untuk tahu bahasa saluran, ia bertanya Twitch tentang bahasa siaran dan id saluran itu, dan untuk mengelakkan nama emote diterjemah, ia bertanya 7TV, BetterTTV dan FrankerFaceZ tentang nama emote saluran itu, yang memberitahu mereka id saluran itu dan tiada yang lain. Salinan dari kedai tidak membuat sebarang permintaan lain. Salinan
yang dipasang secara manual bertanya GitHub tentang tag keluaran terkini, paling kerap sekali setiap enam jam, untuk tahu sama ada perlu
memaparkan lencana kemas kini. [Butiran](PRIVACY.md)

## Soalan lazim

**Mesej tidak diterjemah.**
Buka tab Aktiviti dalam tetapan dan tekan "Baca keputusan": ia menyenaraikan 50 baris terakhir dan menyatakan sebab
setiap satu diterjemah atau dibiarkan. Kebanyakan baris yang dilangkau memang sengaja dilangkau: pengguna yang sama mengulang diri,
baris yang terlalu pendek, hanya emoji atau ketawa, atau yang sudah pun dalam bahasa bacaan anda. Jika tab itu tidak menunjukkan
apa-apa langsung, sambungan tidak nampak sembang itu:
sila buka issue.

**Bar ungu hilang.**
Muat semula halaman. Jika berlaku lagi, buka [issue](https://github.com/kilworks/twitch-chat-translator/issues)
dengan nama saluran dan apa yang anda lakukan sebelumnya.

**Bagaimana mendapatkan terjemahan yang lebih baik?**
Tambah kunci DeepL percuma dalam tetapan. Peringkat percuma meliputi sejuta aksara sebulan, dan DeepL hanya digunakan
pada pasangan bahasa yang hasilnya mengatasi enjin percuma.

**Gaya paparan mana yang patut saya guna?**
Di bawah mesej. Tiga yang lain berfungsi, tetapi masih diperhalusi.

**Bolehkah saya guna sambungan ini dalam bahasa saya?**
Boleh. Ia mengikut bahasa pelayar anda, dan menu di bahagian atas tetapan menukarnya kepada mana-mana daripada
43 bahasa.

**Adakah ia berfungsi dengan 7TV, BTTV dan FFZ?**
Ya, dengan mana-mana daripadanya atau tanpa semuanya. Nama emote mereka tidak diterjemah.

**Adakah ia berfungsi pada VOD dan klip?**
Ya, sama seperti pada strim langsung.

**Ia rosak selepas kemas kini Twitch.**
Twitch kadangkala mengubah cara sembangnya dibina. Buka [issue](https://github.com/kilworks/twitch-chat-translator/issues)
dan ia akan ditampal.

**Adakah ini dibuat oleh Twitch?**
Tidak. Ia projek sumber terbuka yang bebas, tidak berkaitan dengan Twitch.

## Apa yang baharu

Dalam 1.0.0, keluaran pertama untuk Twitch:

- Membaca sembang Twitch dalam tiga bentuknya: senarai Twitch sendiri (juga dengan BTTV dan FFZ), senarai 7TV, dan ulang tayang VOD dan klip, dalam popout, embed, paparan moderator, pengurus strim dan mudah alih
- Menulis terjemahan ke dalam kotak mesej dengan emote dikekalkan sebagai perkataan, dan tidak pernah menterjemah nama emote daripada set 7TV, BTTV dan FFZ saluran itu
- Bahasa saluran datang daripada Twitch, mesej yang dipadam kehilangan terjemahannya, dan rupanya ungu serta mengikut sembang gelap atau cerah Twitch
- Alt+Shift+T menghidupkan atau mematikan terjemahan, Tab memasukkan terjemahan hanya apabila 7TV atau BTTV tidak baru melengkapkan emote, dan butang bahasa berada pada bar tindakan di bawah kotak mesej

Setiap keluaran, dengan apa yang berubah dan pengukuran di belakangnya:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) dan [CHANGELOG.md](CHANGELOG.md).

## Pembangunan

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Binaan boleh diulang: commit yang sama menghasilkan zip yang serupa bait demi bait pada mana-mana mesin, disemak dengan membina
`git archive` bagi tag itu dalam folder kosong dan membandingkan hash.

Selain ujian unit, gate luar talian memuatkan sambungan yang telah dibina ke dalam pelayar sebenar, menggerakkannya dan menyemak
apa yang dilakukannya, dengan halaman dihidangkan secara setempat dan enjin terjemahan dijawab secara setempat. Ia memerlukan
Playwright, yang sengaja bukan dependency: halakan `UX_KIT` ke folder yang `node_modules`-nya mengandungi Playwright,
atau jalankan `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Rentetan antara muka terletak dalam `src/shared/i18n/` (popup dan pilihan, berkunci teks bahasa Inggeris) dan
`src/content/i18n/` (bar sembang, berkunci id dengan teks bahasa Inggeris sebagai sandaran), satu fail bagi setiap bahasa;
ujian mewajibkan setiap fail mempunyai set kunci yang lengkap. Teks untuk kedai
terletak dalam [store/](store/), dan satu keluaran ialah tag versi: CI membina, menyemak dan menerbitkannya ke kedua-dua
kedai.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Projek berkaitan

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), penterjemah yang sama untuk sembang Kick, oleh pengarang yang sama

## Lesen

MIT. Tidak berkaitan dengan Twitch.
