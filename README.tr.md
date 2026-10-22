<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Herhangi bir Twitch yayınının sohbetini kendi dilinde oku, kanalın dilinde yanıt ver.<br>
Ücretsiz, hesap yok, kurulacak bir şey yok. 43 dil, hem sohbette hem uzantının kendisinde.

**[En son sürümü indir](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge ve Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="İspanyolca sohbet mesajları tek tek geliyor, her birinin altında İngilizce çevirisi var; sonra İngilizce bir yanıt yazılıyor, sohbet kutusunun üstünde İspanyolca bir önizleme beliriyor ve Tab onu yerine geçiriyor" width="360">

</div>

## Nasıl çalışır

1. Kur ve herhangi bir Twitch yayınını aç. Sohbetin üstündeki mor çubuk açık olduğunu gösterir.
2. Her mesaj, geldiği anda, hemen altında çevirisini alır; çeviri tarayıcının dilindedir. Canlı yayınlarda,
   VOD'larda ve kliplerde böyle.
3. Kendi dilinde bir yanıt yaz. Sohbet kutusunun üstündeki önizleme onu kanalın dilinde gösterir: Tab'a bas ya
   da önizlemeye tıkla, o sürüm yazdığının yerine geçer.

Kanalın dili, yayıncının Twitch'te ayarladığı dildir, yani ayarlanacak bir şey yok. İki dil de ayarlardan değiştirilebilir,
okuma dili de kanal başına hatırlatılabilir.

7TV ya da BTTV de kullanıyorsan, onlar bir emote'u tamamlamak için Tab kullanır. Bu durumda Tab önce emote'u tamamlar,
çeviriyi yalnızca tamamlayacak bir şey yokken ekler. Ctrl/Cmd+Enter ve bir tıklama çeviriyi her zaman ekler.

## Neler var

- **43 dil**, sağdan sola yazılanlar (Arapça, İbranice, Farsça) dahil; bölgesel varyantlar ayrı tutulur
  (Brezilya ve Avrupa Portekizcesi, Basitleştirilmiş ve Geleneksel Çince, Kantonca)
- **Sohbetin olduğu her yerde**: canlı sohbet, popout, embed, moderatör görünümü, yayın yöneticisi, VOD ve klip
  tekrarı; www.twitch.tv, m.twitch.tv ve dashboard.twitch.tv üzerinde, 7TV, BTTV ve FFZ ile de onlarsız da
- **Uzantı da bu dilleri konuşur**: ayarlar, açılır pencere ve sohbet çubuğu 43 dilde, bayraklı bir menüden seçilir
- **Kutudan çıktığı gibi ücretsiz**, Google Çeviri ile. Avrupa dilleri daha iyi olsun diye kendi ücretsiz DeepL
  anahtarını ekleyebilirsin; bir motor başarısız olunca MyMemory ve Lingva devralır
- **Cihaz üzerinde çeviri**, tarayıcı sunuyorsa Chrome ve Edge'de: ağ yok, kota yok, ve metin bilgisayarından
  hiç çıkmaz
- **Filtreler**: botları atla, kullanıcıları ya da kanalları sustur, belirli bir kelimeyi içeren satırları
  gizle, yalnızca seçtiğin dilleri çevir
- **Hızlı sohbetler için yapıldı**: kanalın 7TV, BTTV ve FFZ setlerindeki emote adları, bu uzantıları
  kullanmasan bile asla çevrilmez, bağlantılar ve @bahsetmeler hiçbir şey gönderilmeden önce ayrı tutulur,
  motorların bozduğu adlar için bir sözlük, bir çeviri önbelleği
- **Dört görüntüleme stili**: mesajın altında, aynı satırda, yerine ya da yalnızca üzerine gelince
- **Tek bir kanalı duraklat**, sohbet çubuğundan, diğerleri durmaz. Kanal değiştirmek ya da uzantıyı güncellemek
  açık sekmelerin çevirmeye devam etmesini sağlar, yeniden yüklemek gerekmez
- **Moderasyonu bilir**: bir moderatörün sildiği mesaj, bir timeout ya da bir ban çevirisini de kaybeder
- **Twitch gibi görünür**: mor, ve sen bir tane seçmedikçe sohbetin kendi koyu ya da açık temasını izler
- Chrome, Brave, Edge ve Firefox

| Sohbet, aktıkça çevrilir | Araç çubuğu açılır penceresi |
|---|---|
| <img src="screenshots/chat.png" alt="Her İspanyolca mesajın altında İngilizce çevirisinin durduğu Twitch sohbeti, listenin üstünde uzantının durum çubuğu" width="360"> | <img src="screenshots/popup.png" alt="Hedef dil, görüntüleme stili, yazma önizlemesi ayarı ve sağlayıcı zincirini gösteren uzantı açılır penceresi" width="360"> |

| Yazdığın, göndermeden önce | Bir dil seç, ya da kendisi seçsin |
|---|---|
| <img src="screenshots/compose.png" alt="İçinde İngilizce bir mesaj bulunan yazma kutusu ve üstünde gönderilecek İspanyolca sürümü gösteren bir önizleme" width="360"> | <img src="screenshots/languages.png" alt="Dil bayraklarının ve adlarının aranabilir ızgarası, kanalın kendi dili en başta" width="360"> |

<sub>Görüntüler, bu deponun kendi uydurduğu bir sohbet odasında yayınlanan sürümden alındı: kullanıcı adları ve
mesajlar uydurmadır, çeviriler yerelde yanıtlanır, bu yüzden bu sayfada gerçek hiç kimsenin adı yer almaz.</sub>

## Kurulum

Tarayıcın için zip'i [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) sayfasından indir ve aç.

- Chrome, Brave, Edge (`…-chromium.zip`): `chrome://extensions` aç, Geliştirici modunu etkinleştir, Paketlenmemiş öğe yükle'ye tıkla, klasörü seç.
- Firefox 121+ (`…-firefox.zip`): `about:debugging#/runtime/this-firefox` aç, Geçici Eklenti Yükle'ye tıkla, `manifest.json` dosyasını seç.
  Firefox yeniden başlayınca geçici bir eklentiyi unutur.

Bu şekilde kurulan bir kopya kendiliğinden güncellenmez: daha yeni bir sürüm varsa simgesinde bir rozet çıkar ve
açılır pencere son sürüme bağlantı verir.

## Çeviri motorları

Zincirlenmiş dört sağlayıcı: biri başarısız olursa sıradaki devralır. Sıralamayı sen belirlersin.

| Sağlayıcı | Anahtar | Not |
|---|---|---|
| Google | yok | varsayılan, kutudan çıktığı gibi çalışır |
| DeepL | ücretsiz | Avrupa dillerinde en iyisi, ayda 1 milyon karakter için [ücretsiz anahtar](https://www.deepl.com/pro-api) |
| MyMemory | yok | yedek |
| Lingva | yok | yedek, kendi örneğine yönlendirmedikçe herkese açık bir örnekte |

Chromium'un yerleşik çevirmeni için ağ da kota da gerekmez. Chrome ve Edge 138 ve sonrası bunu sunabilir, ancak
her kopya sunmaz, ve her dil çiftinin modeli bir kez indirilmelidir, çubuktan tek tıkla. Firefox'ta yok.
Bulunmadığı yerde bulut zinciri devralır ve hiçbir şey bozulmaz.

## Ayarlar

Sohbet çubuğundaki dişliye tıkla, ya da uzantı simgesine sağ tıklayıp Seçenekler'i seç.

- **Sağlayıcılar**: motor sırası, DeepL anahtarın ve mod: önce cihaz üzerinde, önce bulut, ya da yalnızca cihaz
  üzerinde
- **Görünüm**: hedef dil, görüntüleme stili, özgün metin ve dil rozeti, yazı boyutu, satır aralığı, yazı tipi,
  vurgu rengi, sohbet teması, yazma önizlemesi ve ona tıklamanın ne yaptığı
- **Filtreler**: botlar, kullanıcılar, kanallar, anahtar kelimeler, kaynak diller ve bir değiştirme sözlüğü
- **Gelişmiş**: önbellek boyutu ve ömrü, eşzamanlı istekler, kanal başına hız sınırı, yedekleme ve geri yükleme
- **Etkinlik**: çevrilen mesajlar, önbellek isabetleri, sohbette görülen her dil, ve son 50 satırın her biri neden
  çevrildi ya da bırakıldı
- **Klavye**: Alt+Shift+T sohbet çevirisini açar ya da kapatır (Alt+T Twitch'in tiyatro modudur), Alt+W yazma
  önizlemesini. İkisi de tarayıcının uzantı kısayollarından yeniden atanabilir
- Sohbetin eylem çubuğundaki, mesaj kutusunun altındaki dil düğmesi: tek tık yazdığın dillerin listesini açar,
  yazmak listeyi süzer. Sohbetin üstündeki ise okuduğun dili belirler

## Desteklenen diller

İngilizce · Fransızca · İspanyolca · Portekizce · Portekizce (Brezilya) · Almanca · İtalyanca · Felemenkçe · Lehçe · İsveççe · Çekçe · Slovakça · Romence · Rusça · Ukraynaca · Türkçe · Arapça · İbranice · Japonca · Korece · Çince (Basitleştirilmiş) · Çince (Geleneksel) · Tayca · Vietnamca · Endonezce · Hintçe · Fince · Norveççe · Danca · Yunanca · Macarca · Bulgarca · Katalanca · Slovence · Estonca · Litvanca · Letonca · Farsça · Bengalce · Tamilce · Malayca · Filipince · Kantonca

Sohbet bunların herhangi birine çevrilir, uzantının kendi arayüzü de hepsinde mevcuttur.

## Gizlilik

Hesap yok, bana ait sunucu yok ve sen kabul etmedikçe analitik de yok: Google Analytics'e günlük anonim bir sayım (kullanılan motorlar, hatalar, hız, asla mesajların, adların veya kanalların değil). Sohbet mesajları ve yazma önizlemesi açıkken taslağın, seçtiğin çeviri sağlayıcısına gider, başka hiçbir
yere, cihaz üzerinde modda oraya bile gitmez. Kanalın dilini bilmek için Twitch'e kanalın yayın dilini ve kimliğini sorar, emote adlarını çevirilerin dışında tutmak için de 7TV'ye, BetterTTV'ye ve FrankerFaceZ'ye kanalın emote adlarını sorar; bu, onlara o kanalın kimliğini söyler, başka hiçbir şeyi değil. Bir mağazadan kurulan kopya başka hiçbir istek yapmaz. Elle
kurulan kopya, güncelleme rozetini gösterip göstermeyeceğini bilmek için GitHub'dan son release etiketini
en fazla altı saatte bir sorar. [Ayrıntılar](PRIVACY.md)

## SSS

**Mesajlar çevrilmiyor.**
Ayarlardaki Etkinlik sekmesini aç ve "Kararları oku"ya bas: son 50 satırı ve her birinin neden çevrildiğini
ya da bırakıldığını listeler. Atlanan satırların çoğu bilerek atlanır: aynı kullanıcının kendini tekrar etmesi,
çok kısa satırlar, yalnızca emoji ya da kahkaha, ya da zaten okuma dilinde olanlar. Sekme hiçbir şey göstermiyorsa uzantı sohbeti görmüyor demektir: lütfen bir issue aç.

**Mor çubuk kayboldu.**
Sayfayı yenile. Tekrar olursa kanalı ve öncesinde ne yaptığını yazarak bir [issue](https://github.com/kilworks/twitch-chat-translator/issues)
aç.

**Daha iyi çeviriyi nasıl alırım?**
Ayarlara ücretsiz bir DeepL anahtarı ekle. Ücretsiz paket ayda bir milyon karakteri kapsar, ve DeepL yalnızca
ücretsiz motorları geçtiği dil çiftlerinde harcanır.

**Hangi görüntüleme stilini kullanmalıyım?**
Mesajın altında. Diğer üçü çalışıyor, ancak hâlâ ayarlanıyor.

**Uzantıyı kendi dilimde kullanabilir miyim?**
Evet. Tarayıcının dilini izler, ayarların üstündeki menü de onu 43 dilden istediğine geçirir.

**7TV, BTTV ve FFZ ile çalışıyor mu?**
Evet, hangisiyle olursa olsun ya da hiçbiri olmadan. Emote adları çevirilerin dışında tutulur.

**VOD'larda ve kliplerde çalışıyor mu?**
Evet, canlı yayınlardaki gibi.

**Twitch güncellemesinden sonra bozuldu.**
Twitch bazen sohbetinin yapısını değiştirir. Bir [issue](https://github.com/kilworks/twitch-chat-translator/issues)
aç, yamalanır.

**Bunu Twitch mi yapıyor?**
Hayır. Bağımsız bir açık kaynak projesi, Twitch ile bağlantısı yok.

## Yenilikler

Twitch için ilk sürüm olan 1.0.0'da:

- Twitch sohbetini üç biçimde okur: Twitch'in kendi listesi (BTTV ve FFZ ile de), 7TV listesi, ve VOD ile klip tekrarı; popout, embed, moderatör görünümü, yayın yöneticisi ve mobilde
- Çevirileri mesaj kutusuna emote'lar kelime olarak kalacak şekilde yazar, ve kanalın 7TV, BTTV ve FFZ setlerindeki emote adlarını asla çevirmez
- Kanalın dili Twitch'ten gelir, silinen bir mesaj çevirisini de kaybeder, görünüm mordur ve Twitch'in koyu ya da açık sohbetini izler
- Alt+Shift+T çeviriyi açar ya da kapatır, Tab çeviriyi yalnızca 7TV ya da BTTV az önce bir emote'u tamamlamadıysa ekler, ve dil düğmesi mesaj kutusunun altındaki eylem çubuğunda durur

Her sürüm, nelerin değiştiği ve arkasındaki ölçümle birlikte:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) ve [CHANGELOG.md](CHANGELOG.md).

## Geliştirme

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, birim testleri, derleme: her paketin geçtiği kapı
npm run build:firefox    # Firefox derlemesi, aynı dist/ klasörü
npm run package:all      # iki zip, release/ içinde
npm run dev              # HMR
```

Derlemeler yeniden üretilebilir: aynı commit, herhangi bir makinede bayt bayt aynı zip'leri verir; bu,
etiketin bir `git archive`'ini boş bir klasörde derleyip hash'leri karşılaştırarak doğrulanır.

Birim testlerinin ötesinde, çevrimdışı kapılar derlenmiş uzantıyı gerçek bir tarayıcıya yükler, onu çalıştırır
ve yaptığını doğrular; sayfa yerelde sunulur ve çeviri motoru yerelde yanıtlanır. Playwright gerekir, ve bu
bilerek bir bağımlılık değildir: `UX_KIT`'i `node_modules` klasöründe Playwright bulunan bir klasöre yönlendir
ya da `npm i -D playwright` çalıştır.

```bash
node test/e2e/run-gates.mjs --headless                  # tüm çevrimdışı kapılar, pencere yok
node test/e2e/store-shots-fixture.mjs --lang=ja         # mağaza görüntüleri, tek bir mağaza dilinde
node test/e2e/store-shots-fixture.mjs --gif             # İngilizce mağaza görüntüleri, README görselleri ve bu GIF
```

Arayüz metinleri `src/shared/i18n/` (açılır pencere ve seçenekler, İngilizce metne göre anahtarlı) ve
`src/content/i18n/` (sohbet çubuğu, kimliğe göre anahtarlı, İngilizce metin yedek olarak) içinde durur, dil
başına bir dosya; testler her dosyadan tam anahtar kümesini ister. Mağaza metinleri [store/](store/) içinde
durur, ve bir release bir sürüm etiketidir: CI onu derler, denetler ve iki mağazada da yayınlar.

Yığın: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## İlgili projeler

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), Kick sohbeti için aynı çevirici, aynı yazardan

## Lisans

MIT. Twitch ile bağlantısı yok.
