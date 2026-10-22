<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Lue minkä tahansa Twitch-lähetyksen chattia omalla kielelläsi ja vastaa kanavan kielellä.<br>
Ilmainen, ei tiliä, ei mitään asetettavaa. 43 kieltä, sekä chatissa että itse laajennuksessa.

**[Lataa uusin julkaisu](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge ja Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Espanjankielisiä chat-viestejä saapuu yksi kerrallaan, jokaisen alla englanninkielinen käännös; sitten kirjoitetaan englanninkielinen vastaus, chat-kentän yläpuolelle ilmestyy espanjankielinen esikatselu, ja Tab vaihtaa sen tilalle" width="360">

</div>

## Näin se toimii

1. Asenna se ja avaa mikä tahansa Twitch-lähetys. Violetti palkki chatin yläreunassa kertoo, että laajennus on päällä.
2. Jokainen viesti saa käännöksensä heti alleen sitä mukaa kuin se saapuu, selaimesi kielellä. Sekä
   suorissa lähetyksissä, VODeissa että klipeissä.
3. Kirjoita vastaus omalla kielelläsi. Chat-kentän yläpuolella oleva esikatselu näyttää sen kanavan kielellä:
   paina Tab tai napsauta sitä, niin se versio korvaa kirjoittamasi.

Kanavan kieli on se, jonka striimaaja on asettanut Twitchissä, joten mitään ei tarvitse asettaa. Molempia kieliä voi
vaihtaa asetuksissa, ja lukukielen voi muistaa kanavakohtaisesti.

Jos käytät myös 7TV:tä tai BTTV:tä, ne käyttävät Tabia emoten viimeistelyyn. Silloin Tab viimeistelee emoten ensin ja
lisää käännöksen vain, jos viimeisteltävää ei ollut. Ctrl/Cmd+Enter ja napsautus lisäävät sen aina.

## Mitä saat

- **43 kieltä**, myös oikealta vasemmalle kirjoitettavat (arabia, heprea, persia), alueelliset
  variantit erillään (brasilianportugali ja eurooppalainen portugali, yksinkertaistettu ja perinteinen kiina, kantoninkiina)
- **Kaikkialla missä chat on**: live-chat, popout, upotus, moderaattorinäkymä, stream manager sekä VOD- ja klippiuusinnat
  osoitteissa www.twitch.tv, m.twitch.tv ja dashboard.twitch.tv, 7TV:n, BTTV:n ja FFZ:n kanssa tai ilman
- **Laajennus puhuu niitäkin**: asetukset, ponnahdusikkuna ja chat-palkki kaikilla 43 kielellä, valitaan lipuilla varustetusta valikosta
- **Ilmainen heti alusta** Google Translatella. Lisää oma ilmainen DeepL-avaimesi, niin eurooppalaiset
  kielet paranevat; MyMemory ja Lingva ottavat vastuun, kun jokin moottori pettää
- **Käännös laitteella** Chromessa ja Edgessä, kun selain sen tarjoaa: ei verkkoa, ei kiintiötä, ja
  teksti ei koskaan poistu koneeltasi
- **Suodattimet**: ohita botit, mykistä käyttäjiä tai kanavia, piilota rivit, joissa on tietty sana, käännä vain
  valitsemasi kielet
- **Tehty nopeisiin chatteihin**: kanavan 7TV-, BTTV- ja FFZ-settien emote-nimiä ei koskaan käännetä, vaikka et käyttäisi
  niitä laajennuksia, linkit ja @maininnat siirretään sivuun ennen kuin mitään lähetetään, sanasto nimille, jotka
  moottorit sotkevat, käännösten välimuisti
- **Neljä näyttötapaa**: viestin alla, samalla rivillä, viestin tilalla tai vain osoitettaessa
- **Keskeytä yksi kanava** chat-palkista pysäyttämättä muita. Kanavaa vaihtaessa tai laajennusta päivittäessä
  avoimet välilehdet jatkavat kääntämistä ilman uudelleenlatausta
- **Moderointi huomioitu**: viesti, jonka moderaattori poistaa tai jonka timeout tai porttikielto vie, menettää käännöksensäkin
- **Näyttää Twitchiltä**: violetti, ja se seuraa chatin omaa tummaa tai vaaleaa teemaa, ellet valitse toisin
- Chrome, Brave, Edge ja Firefox

| Chat käännettynä sitä mukaa kun se vierii | Työkalupalkin ponnahdusikkuna |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch-chat, jossa jokaisen espanjankielisen viestin alla on englanninkielinen käännös, ja laajennuksen tilapalkki listan yläpuolella" width="360"> | <img src="screenshots/popup.png" alt="Laajennuksen ponnahdusikkuna: kohdekieli, näyttötapa, esikatseluasetus kirjoittaessa ja palveluketju" width="360"> |

| Mitä kirjoitat, ennen kuin lähetät | Valitse kieli tai anna sen valita |
|---|---|
| <img src="screenshots/compose.png" alt="Kirjoituskenttä, jossa on englanninkielinen viesti, ja sen yläpuolella esikatselu lähetettävästä espanjankielisestä versiosta" width="360"> | <img src="screenshots/languages.png" alt="Haettava ruudukko kielten lipuista ja nimistä, kanavan oma kieli ensimmäisenä" width="360"> |

<sub>Kuvat on otettu julkaistusta versiosta chat-huoneessa, jonka tämä repositorio keksii itse: käyttäjänimet ja
viestit ovat keksittyjä ja käännökset vastataan paikallisesti, joten tälle sivulle ei päädy kenenkään oikean ihmisen tunnusta.</sub>

## Asennus

Lataa selaimesi zip [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest)-sivulta ja pura se.

- Chrome, Brave, Edge (`…-chromium.zip`): avaa `chrome://extensions`, ota kehittäjätila käyttöön, napsauta Lataa pakkaamaton laajennus ja valitse kansio.
- Firefox 121+ (`…-firefox.zip`): avaa `about:debugging#/runtime/this-firefox`, napsauta Lataa väliaikainen lisäosa ja valitse `manifest.json`.
  Firefox unohtaa väliaikaisen lisäosan käynnistyessään uudelleen.

Näin asennettu kopio ei päivity itsestään: sen kuvakkeeseen ilmestyy merkki, kun uudempi versio on
olemassa, ja ponnahdusikkuna linkittää uusimpaan julkaisuun.

## Käännösmoottorit

Neljä palvelua ketjussa: kun yksi pettää, seuraava ottaa vastuun. Järjestyksen päätät itse.

| Palvelu | Avain | Huomio |
|---|---|---|
| Google | ei tarvita | oletus, toimii heti alusta |
| DeepL | ilmainen | paras eurooppalaisille kielille, [ilmainen avain](https://www.deepl.com/pro-api) miljoonaan merkkiin kuukaudessa |
| MyMemory | ei tarvita | varavaihtoehto |
| Lingva | ei tarvita | varavaihtoehto, julkisella instanssilla, ellet osoita sitä omaasi |

Chromiumin sisäänrakennettu kääntäjä ei tarvitse verkkoa eikä kiintiötä. Chrome ja Edge 138 ja uudemmat voivat tarjota sen,
vaikkei jokainen kopio tarjoakaan, ja jokaisen kieliparin malli on ladattava kerran, yhdellä napsautuksella palkista.
Firefoxissa sitä ei ole. Siellä missä se puuttuu, pilviketju ottaa vastuun eikä mikään mene rikki.

## Asetukset

Napsauta chat-palkin hammasratasta tai napsauta laajennuksen kuvaketta hiiren oikealla ja valitse Asetukset.

- **Palvelut**: moottoreiden järjestys, DeepL-avaimesi ja tila: ensin laitteella, ensin pilvi tai vain laitteella
- **Näyttö**: kohdekieli, näyttötapa, alkuperäinen teksti ja kielimerkki, tekstin koko, riviväli,
  kirjasin, korostusväri, chatin teema, esikatselu kirjoittaessa ja mitä sen napsauttaminen tekee
- **Suodattimet**: botit, käyttäjät, kanavat, avainsanat, lähdekielet ja korvausten sanasto
- **Lisäasetukset**: välimuistin koko ja elinikä, samanaikaiset pyynnöt, kanavakohtainen käyttöraja, varmuuskopio ja palautus
- **Toiminta**: käännetyt viestit, välimuistiosumat, kaikki chatissa nähdyt kielet ja se, miksi kukin viimeisestä 50
  rivistä käännettiin tai jätettiin rauhaan
- **Näppäimistö**: Alt+Shift+T kytkee chatin käännöksen päälle tai pois (Alt+T on Twitchin teatteritila), Alt+W esikatselun
  kirjoittaessa. Molemmat voi vaihtaa selaimen laajennusten pikanäppäimissä
- Kielipainike chatin toimintopalkissa, viestikentän alla: yksi napsautus avaa listan kielistä, joilla kirjoitat, ja
  kirjoittaminen suodattaa sitä. Chatin yläreunan painike asettaa kielen, jolla luet

## Tuetut kielet

Englanti · Ranska · Espanja · Portugali · Portugali (Brasilia) · Saksa · Italia · Hollanti · Puola · Ruotsi · Tšekki · Slovakki · Romania · Venäjä · Ukraina · Turkki · Arabia · Heprea · Japani · Korea · Kiina (yksinkertaistettu) · Kiina (perinteinen) · Thai · Vietnam · Indonesia · Hindi · Suomi · Norja · Tanska · Kreikka · Unkari · Bulgaria · Katalaani · Sloveeni · Viro · Liettua · Latvia · Persia · Bengali · Tamili · Malaiji · Filipino · Kantoninkiina

Chatin voi kääntää mille tahansa niistä, ja laajennuksen oma käyttöliittymä on saatavilla jokaisella.

## Tietosuoja

Ei tiliä, ei palvelintani eikä analytiikkaa, ellet ota käyttöön Google Analyticsille lähetettävää päivittäistä anonyymiä laskua (käytetyt moottorit, virheet, nopeus, ei koskaan viestisi, nimesi tai kanavasi). Chat-viestit, ja luonnoksesi kun esikatselu kirjoittaessa on päällä, menevät valitsemallesi käännöspalvelulle ja
ei minnekään muualle, ja laitetilassa ei edes sinne. Kanavan kielen selvittämiseksi se kysyy Twitchiltä kanavan lähetyskielen ja tunnuksen, ja pitääkseen emote-nimet pois käännöksistä se kysyy 7TV:ltä, BetterTTV:ltä ja FrankerFaceZ:ltä kanavan emote-nimet, mikä kertoo niille kanavan tunnuksen eikä mitään muuta. Kaupasta asennettu kopio ei tee muita pyyntöjä. Käsin
asennettu kopio kysyy GitHubilta uusimman release-tagin korkeintaan kuuden tunnin välein selvittääkseen, pitääkö sen
näyttää päivitysmerkki. [Lisätiedot](PRIVACY.md)

## UKK

**Viestejä ei käännetä.**
Avaa asetuksista Toiminta-välilehti ja paina "Hae päätökset": se listaa viimeiset 50 riviä ja kertoo, miksi
kukin käännettiin tai jätettiin rauhaan. Useimmat ohitetut rivit ohitetaan tarkoituksella: saman käyttäjän toistoa, liian
lyhyttä, pelkkiä emojeita tai naurua tai jo lukukielellä. Jos välilehti ei näytä mitään, laajennus ei näe chattia:
avaa issue.

**Violetti palkki katosi.**
Päivitä sivu. Jos se tapahtuu uudestaan, avaa [issue](https://github.com/kilworks/twitch-chat-translator/issues),
jossa kerrot kanavan ja mitä teit ennen sitä.

**Miten saan parempia käännöksiä?**
Lisää ilmainen DeepL-avain asetuksissa. Ilmainen taso kattaa miljoona merkkiä kuukaudessa, ja DeepLiä käytetään vain niissä
kielipareissa, joissa se päihittää ilmaiset moottorit.

**Mitä näyttötapaa kannattaa käyttää?**
Viestin alla. Kolme muuta toimivat, ja niitä viilataan edelleen.

**Voinko käyttää laajennusta omalla kielelläni?**
Kyllä. Se seuraa selaimesi kieltä, ja asetusten yläreunan valikko vaihtaa sen mihin tahansa
43:sta.

**Toimiiko se 7TV:n, BTTV:n ja FFZ:n kanssa?**
Kyllä, minkä tahansa niistä kanssa tai ilman yhtäkään. Niiden emote-nimiä ei käännetä.

**Toimiiko se VODeissa ja klipeissä?**
Kyllä, samalla tavalla kuin suorissa lähetyksissä.

**Se meni rikki Twitchin päivityksen jälkeen.**
Twitch muuttaa joskus chatinsa rakennetta. Avaa [issue](https://github.com/kilworks/twitch-chat-translator/issues),
niin se korjataan.

**Onko tämä Twitchin tekemä?**
Ei. Se on riippumaton avoimen lähdekoodin projekti, jolla ei ole mitään yhteyttä Twitchiin.

## Uutta

Versiossa 1.0.0, ensimmäisessä julkaisussa Twitchille:

- Lukee Twitchin chatin kaikissa kolmessa muodossaan: Twitchin oma lista (myös BTTV:n ja FFZ:n kanssa), 7TV:n lista sekä VOD- ja klippiuusinta, popoutissa, upotuksessa, moderaattorinäkymässä, stream managerissa ja mobiilissa
- Kirjoittaa käännökset viestikenttään emotet sanoina säilyttäen, eikä koskaan käännä kanavan 7TV-, BTTV- ja FFZ-settien emote-nimiä
- Kanavan kieli tulee Twitchiltä, poistettu viesti menettää käännöksensä, ja ulkoasu on violetti ja seuraa Twitchin tummaa tai vaaleaa chattia
- Alt+Shift+T kytkee käännöksen päälle tai pois, Tab lisää käännöksen vain, jos 7TV tai BTTV ei juuri viimeistellyt emotea, ja kielipainike on toimintopalkissa viestikentän alla

Jokainen julkaisu, muutokset ja niiden takana oleva mittaus:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) ja [CHANGELOG.md](CHANGELOG.md).

## Kehitys

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, yksikkötestit, build: portti, jonka jokainen paketti läpäisee
npm run build:firefox    # Firefox-build, sama dist/-kansio
npm run package:all      # molemmat zipit, hakemistoon release/
npm run dev              # HMR
```

Buildit ovat toistettavia: sama commit tuottaa tavu tavulta identtiset zipit millä koneella tahansa, mikä tarkistetaan
rakentamalla tagista `git archive` tyhjään kansioon ja vertaamalla tarkistussummia.

Yksikkötestien lisäksi offline-portit lataavat rakennetun laajennuksen oikeaan selaimeen, ohjaavat sitä ja varmistavat,
mitä se tekee, kun sivu ja käännösmoottori palvellaan paikallisesti. Ne tarvitsevat
Playwrightin, joka ei tarkoituksella ole riippuvuus: osoita `UX_KIT` kansioon, jonka `node_modules` sisältää sen,
tai aja `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # kaikki offline-portit, ilman ikkunaa
node test/e2e/store-shots-fixture.mjs --lang=ja         # kauppakuvakaappaukset yhdellä listauskielellä
node test/e2e/store-shots-fixture.mjs --gif             # englanninkieliset kauppakuvakaappaukset, README:n kuvat ja tämä GIF
```

Käyttöliittymän tekstit ovat hakemistoissa `src/shared/i18n/` (ponnahdusikkuna ja asetukset, avaimina englanninkielinen teksti) ja
`src/content/i18n/` (chat-palkki, avaimena id ja englanninkielinen teksti varana), yksi tiedosto kieltä kohden;
testit vaativat jokaiselta tiedostolta täyden avainjoukon. Kauppatekstit
ovat kansiossa [store/](store/), ja release on versiotagi: CI rakentaa, tarkistaa ja julkaisee sen molempiin
kauppoihin.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Liittyvät projektit

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), sama kääntäjä Kickin chatille, saman tekijän

## Lisenssi

MIT. Ei yhteyttä Twitchiin.
