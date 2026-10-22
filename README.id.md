<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Baca chat Twitch mana pun dalam bahasamu, dan balas dalam bahasa channel-nya.<br>
Gratis, tanpa akun, tanpa setelan apa pun. 43 bahasa, di chat maupun di ekstensinya sendiri.

**[Unduh rilis terbaru](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge, dan Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Pesan chat berbahasa Spanyol masuk satu per satu, masing-masing dengan terjemahan bahasa Inggris di bawahnya; lalu sebuah balasan bahasa Inggris diketik, pratinjau bahasa Spanyol muncul di atas kolom chat, dan Tab menukarnya masuk" width="360">

</div>

## Cara kerja

1. Pasang, lalu buka stream Twitch mana saja. Bilah ungu di bagian atas chat menandakan ekstensi sedang aktif.
2. Setiap pesan langsung dapat terjemahannya tepat di bawahnya begitu masuk, dalam bahasa browsermu. Stream
   langsung, VOD, dan klip sama saja.
3. Ketik balasan dalam bahasamu. Pratinjau di atas kolom chat menampilkannya dalam bahasa channel:
   tekan Tab atau klik pratinjaunya, dan versi itu menggantikan yang kamu ketik.

Bahasa channel adalah bahasa yang diatur streamer di Twitch, jadi tidak ada yang perlu diatur. Kedua bahasa bisa
diubah di pengaturan, dan bahasa baca bisa diingat per channel.

Kalau kamu juga memakai 7TV atau BTTV, keduanya memakai Tab untuk menyelesaikan emote. Tab lalu menyelesaikan emote
lebih dulu, dan baru menyisipkan terjemahan kalau tidak ada yang perlu diselesaikan. Ctrl/Cmd+Enter dan klik selalu
menyisipkannya.

## Fitur

- **43 bahasa**, termasuk yang ditulis dari kanan ke kiri (Arab, Ibrani, Persia), dengan varian regional dipisah
  (Portugis Brasil dan Eropa, Mandarin Sederhana dan Tradisional, Kanton)
- **Di mana pun ada chat**: chat live, popout, embed, tampilan moderator, stream manager, replay VOD dan klip, di
  www.twitch.tv, m.twitch.tv, dan dashboard.twitch.tv, dengan atau tanpa 7TV, BTTV, dan FFZ
- **Ekstensinya juga bicara semua bahasa itu**: pengaturan, popup, dan bilah chat tersedia dalam 43 bahasa, dipilih dari menu dengan bendera
- **Gratis dari awal** dengan Google Translate. Tambahkan kunci DeepL gratismu sendiri untuk bahasa Eropa yang lebih bagus;
  MyMemory dan Lingva mengambil alih saat satu mesin gagal
- **Terjemahan di perangkat** di Chrome dan Edge bila browser menyediakannya: tanpa jaringan, tanpa kuota, dan
  teksnya tidak pernah keluar dari komputermu
- **Filter**: lewati bot, bisukan pengguna atau channel, sembunyikan baris yang memuat kata tertentu,
  terjemahkan hanya bahasa yang kamu pilih
- **Dibuat untuk chat yang ngebut**: nama emote dari set 7TV, BTTV, dan FFZ milik channel tidak pernah diterjemahkan, bahkan
  kalau kamu tidak memakai ekstensi itu, tautan dan @mention disisihkan sebelum apa pun dikirim, ada glosarium untuk nama
  yang suka dirusak mesin, dan ada cache terjemahan
- **Empat gaya tampilan**: di bawah pesan, di baris yang sama, menggantikan pesan aslinya, atau hanya saat kursor di atasnya
- **Jeda satu channel** dari bilah chat tanpa menghentikan yang lain. Pindah channel atau memperbarui
  ekstensi tidak menghentikan tab yang terbuka, tanpa muat ulang
- **Peka moderasi**: pesan yang dihapus moderator, atau terkena timeout atau ban, kehilangan terjemahannya juga
- **Tampil seperti Twitch**: ungu, dan mengikuti tema chat Twitch yang gelap atau terang kecuali kamu memilih sendiri
- Chrome, Brave, Edge, dan Firefox

| Chat, diterjemahkan sambil bergulir | Popup di toolbar |
|---|---|
| <img src="screenshots/chat.png" alt="Chat Twitch di mana setiap pesan berbahasa Spanyol punya terjemahan bahasa Inggris di bawahnya, dengan bilah status ekstensi di atas daftar" width="360"> | <img src="screenshots/popup.png" alt="Popup ekstensi berisi bahasa target, gaya tampilan, pengaturan pratinjau penulisan, dan rantai penyedia" width="360"> |

| Yang kamu ketik, sebelum dikirim | Pilih bahasa, atau biarkan dipilihkan |
|---|---|
| <img src="screenshots/compose.png" alt="Kotak penulisan berisi pesan bahasa Inggris, dengan pratinjau di atasnya menampilkan versi bahasa Spanyol yang akan dikirim" width="360"> | <img src="screenshots/languages.png" alt="Kisi bendera dan nama bahasa yang bisa dicari, dengan bahasa channel itu sendiri di urutan pertama" width="360"> |

<sub>Diambil dari build rilis di ruang chat yang dibuat sendiri oleh repositori ini: nama pengguna dan pesannya
karangan, dan terjemahannya dijawab secara lokal, jadi tidak ada akun orang sungguhan yang tampil di halaman ini.</sub>

## Pasang

Unduh zip untuk browsermu dari [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) lalu ekstrak.

- Chrome, Brave, Edge (`…-chromium.zip`): buka `chrome://extensions`, aktifkan Developer mode, klik Load unpacked, pilih foldernya.
- Firefox 121+ (`…-firefox.zip`): buka `about:debugging#/runtime/this-firefox`, klik Load Temporary Add-on, pilih `manifest.json`.
  Firefox melupakan add-on sementara saat dimulai ulang.

Salinan yang dipasang begini tidak memperbarui dirinya sendiri: ikonnya menampilkan lencana saat ada versi yang lebih baru, dan
popup-nya menautkan ke rilis terbaru.

## Mesin terjemahan

Empat penyedia, dirantai: saat satu gagal, yang berikutnya mengambil alih. Urutannya kamu yang atur.

| Penyedia | Kunci | Catatan |
|---|---|---|
| Google | tidak perlu | bawaan, langsung jalan |
| DeepL | gratis | terbaik untuk bahasa Eropa, [kunci gratis](https://www.deepl.com/pro-api) untuk 1 juta karakter per bulan |
| MyMemory | tidak perlu | cadangan |
| Lingva | tidak perlu | cadangan, di instance publik kecuali kamu arahkan ke instance milikmu sendiri |

Penerjemah bawaan Chromium tanpa jaringan dan tanpa kuota. Chrome dan Edge 138 ke atas bisa menyediakannya, meski tidak
semua salinan punya, dan tiap pasangan bahasa perlu modelnya diunduh sekali, cukup satu klik dari bilah. Firefox tidak
punya fitur ini. Di mana pun fitur ini tidak ada, rantai cloud mengambil alih dan tidak ada yang rusak.

## Pengaturan

Klik ikon roda gigi di bilah chat, atau klik kanan ikon ekstensi dan pilih Pengaturan.

- **Penyedia** (Providers): urutan mesin, kunci DeepL-mu, dan modenya: di perangkat dulu, cloud dulu, atau hanya di perangkat
- **Tampilan** (Display): bahasa target, gaya tampilan, teks asli dan lencana bahasa, ukuran teks, jarak baris,
  font, warna aksen, tema chat, pratinjau penulisan dan apa yang terjadi saat diklik
- **Filter** (Filters): bot, pengguna, channel, kata kunci, bahasa sumber, dan glosarium pengganti
- **Lanjutan** (Advanced): ukuran dan masa berlaku cache, permintaan bersamaan, batas per channel, backup dan pemulihan
- **Aktivitas** (Activity): pesan yang diterjemahkan, cache hit, semua bahasa yang terlihat di chat, dan alasan tiap baris dari 50
  baris terakhir diterjemahkan atau dilewati
- **Keyboard**: Alt+Shift+T menyalakan atau mematikan terjemahan chat (Alt+T adalah mode teater Twitch), Alt+W pratinjau
  penulisan. Keduanya bisa diubah di pintasan ekstensi browsermu
- Tombol bahasa di bilah aksi chat, di bawah kotak pesan: sekali klik membuka daftar bahasa yang kamu tulis, ketik
  untuk memfilternya. Yang ada di atas chat mengatur bahasa yang kamu baca

## Bahasa yang didukung

Inggris · Prancis · Spanyol · Portugis · Portugis (Brasil) · Jerman · Italia · Belanda · Polandia · Swedia · Ceko · Slovakia · Rumania · Rusia · Ukraina · Turki · Arab · Ibrani · Jepang · Korea · Mandarin (Sederhana) · Mandarin (Tradisional) · Thai · Vietnam · Indonesia · Hindi · Finlandia · Norwegia · Denmark · Yunani · Hungaria · Bulgaria · Katalan · Slovenia · Estonia · Lituania · Latvia · Persia · Bengali · Tamil · Melayu · Filipino · Kanton

Chat diterjemahkan ke bahasa mana pun di atas, dan antarmuka ekstensinya sendiri tersedia di tiap bahasa.

## Privasi

Tidak ada akun, tidak ada server saya, dan tidak ada analitik kecuali Anda memilih untuk ikut serta dalam penghitungan anonim harian yang dikirim ke Google Analytics (mesin yang digunakan, kesalahan, kecepatan, tidak pernah pesan, nama, atau saluran Anda). Pesan chat, dan draf kamu selama pratinjau penulisan menyala, hanya dikirim ke penyedia terjemahan yang kamu pilih
dan tidak ke tempat lain, dan di mode di perangkat bahkan ke sana pun tidak. Untuk tahu bahasa channel, ekstensi bertanya ke Twitch soal bahasa siaran dan id channel, dan agar nama emote tidak ikut diterjemahkan, ia bertanya ke 7TV, BetterTTV, dan FrankerFaceZ soal nama emote channel, yang memberi tahu mereka id channel itu dan tidak ada yang lain. Salinan dari store tidak membuat permintaan lain. Salinan
yang dipasang manual menanyakan GitHub tag rilis terbaru, paling sering sekali tiap enam jam, untuk tahu perlu
menampilkan lencana pembaruan atau tidak. [Detail](PRIVACY.md)

## FAQ

**Pesan tidak diterjemahkan.**
Buka tab Aktivitas di pengaturan lalu tekan "Baca keputusan": isinya 50 baris terakhir beserta alasan
tiap baris diterjemahkan atau dilewati. Kebanyakan baris yang dilewati memang disengaja: pengguna yang sama mengulang-ulang,
terlalu pendek, hanya emoji atau tawa, atau sudah dalam bahasa bacamu. Kalau tab-nya kosong sama sekali, berarti ekstensi
tidak melihat chat-nya: tolong buka issue.

**Bilah ungunya hilang.**
Muat ulang halaman. Kalau terjadi lagi, buka [issue](https://github.com/kilworks/twitch-chat-translator/issues)
dengan menyebut channel dan apa yang kamu lakukan sebelumnya.

**Bagaimana supaya terjemahannya lebih bagus?**
Tambahkan kunci DeepL gratis di pengaturan. Paket gratisnya mencakup sejuta karakter per bulan, dan DeepL hanya dipakai
untuk pasangan bahasa yang hasilnya mengalahkan mesin gratis.

**Gaya tampilan mana yang sebaiknya dipakai?**
Di bawah pesan. Tiga lainnya jalan, tapi masih terus disempurnakan.

**Bisakah ekstensinya dipakai dalam bahasaku?**
Bisa. Ia mengikuti bahasa browsermu, dan menu di bagian atas pengaturan mengganti ke salah satu dari
43 bahasa.

**Apakah jalan bersama 7TV, BTTV, dan FFZ?**
Ya, dengan salah satunya atau tanpa semuanya. Nama emote mereka tidak ikut diterjemahkan.

**Apakah jalan di VOD dan klip?**
Ya, sama seperti di stream langsung.

**Rusak setelah update Twitch.**
Twitch kadang mengubah cara chat-nya dibangun. Buka [issue](https://github.com/kilworks/twitch-chat-translator/issues)
dan akan ditambal.

**Apakah ini dibuat oleh Twitch?**
Bukan. Ini proyek open source independen, tidak berafiliasi dengan Twitch.

## Yang baru

Di 1.0.0, rilis pertama untuk Twitch:

- Membaca chat Twitch dalam tiga bentuknya: daftar bawaan Twitch (juga dengan BTTV dan FFZ), daftar 7TV, dan replay VOD dan klip, di popout, embed, tampilan moderator, stream manager, dan seluler
- Menulis terjemahan ke kotak pesan dengan emote tetap sebagai kata, dan tidak pernah menerjemahkan nama emote dari set 7TV, BTTV, dan FFZ milik channel
- Bahasa channel berasal dari Twitch, pesan yang dihapus kehilangan terjemahannya, dan tampilannya ungu serta mengikuti chat gelap atau terang Twitch
- Alt+Shift+T menyalakan atau mematikan terjemahan, Tab menyisipkan terjemahan hanya bila 7TV atau BTTV tidak baru saja menyelesaikan emote, dan tombol bahasa ada di bilah aksi di bawah kotak pesan

Setiap rilis, dengan apa yang berubah dan pengukuran di baliknya:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) dan [CHANGELOG.md](CHANGELOG.md).

## Pengembangan

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Build-nya reproducible: commit yang sama menghasilkan zip yang identik byte demi byte di mesin mana pun, dicek dengan membangun
`git archive` dari tag di folder kosong lalu membandingkan hash.

Di luar unit test, gate offline memuat ekstensi hasil build ke browser sungguhan, menjalankannya, dan memeriksa
apa yang dilakukannya, dengan halaman disajikan secara lokal dan mesin terjemahan dijawab secara lokal. Gate ini butuh
Playwright, yang sengaja bukan dependency: arahkan `UX_KIT` ke folder yang `node_modules`-nya berisi Playwright,
atau jalankan `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

String antarmuka ada di `src/shared/i18n/` (popup dan opsi, kuncinya teks bahasa Inggris) dan
`src/content/i18n/` (bilah chat, kuncinya id dengan teks bahasa Inggris sebagai cadangan), satu file per bahasa;
test mewajibkan setiap file punya kunci lengkap. Teks untuk store
ada di [store/](store/), dan sebuah rilis adalah tag versi: CI membangun, memeriksa, dan menerbitkannya ke kedua
store.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Proyek terkait

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), penerjemah yang sama untuk chat Kick, oleh pembuat yang sama

## Lisensi

MIT. Tidak berafiliasi dengan Twitch.
