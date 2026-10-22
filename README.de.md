<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Lies jeden Twitch-Chat in deiner eigenen Sprache und antworte in der des Kanals.<br>
Kostenlos, ohne Konto, nichts einzurichten. 43 Sprachen, im Chat und in der Erweiterung selbst.

**[Die neueste Version herunterladen](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge und Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spanische Chatnachrichten kommen nacheinander an, jede mit ihrer englischen Übersetzung darunter; dann wird eine englische Antwort getippt, über dem Chatfeld erscheint eine spanische Vorschau, und Tab setzt sie ein" width="360">

</div>

## So funktioniert's

1. Installieren und einen beliebigen Twitch-Stream öffnen. Eine violette Leiste oben im Chat zeigt, dass sie läuft.
2. Jede Nachricht bekommt ihre Übersetzung direkt darunter, sobald sie ankommt, in der Sprache deines
   Browsers. Bei Livestreams, VODs und Clips gleichermaßen.
3. Tipp eine Antwort in deiner Sprache. Eine Vorschau über dem Chatfeld zeigt sie in der Sprache des
   Kanals: Drück Tab oder klick darauf, und diese Version ersetzt, was du getippt hast.

Die Sprache des Kanals ist die, die der Streamer auf Twitch eingestellt hat, du musst also nichts einstellen. Beide Sprachen
lassen sich in den Einstellungen ändern, und die Lesesprache kann pro Kanal gemerkt werden.

Nutzt du auch 7TV oder BTTV: Die verwenden Tab, um ein Emote zu vervollständigen. Tab vervollständigt dann zuerst das
Emote und fügt die Übersetzung nur ein, wenn es nichts zu vervollständigen gab. Strg/Cmd+Enter und ein Klick fügen sie immer ein.

## Das steckt drin

- **43 Sprachen**, auch rechts nach links (Arabisch, Hebräisch, Persisch), mit getrennten Regionalvarianten
  (brasilianisches und europäisches Portugiesisch, vereinfachtes und traditionelles Chinesisch, Kantonesisch)
- **Überall, wo ein Chat ist**: Live-Chat, Popout, Embed, Moderatoransicht, Stream-Manager, VOD- und Clip-Wiederholung,
  auf www.twitch.tv, m.twitch.tv und dashboard.twitch.tv, mit oder ohne 7TV, BTTV und FFZ
- **Die Erweiterung spricht sie auch**: Einstellungen, Popup und Chatleiste in allen 43, auswählbar über ein Menü mit Flaggen
- **Kostenlos ab Werk** mit Google Translate. Hinterlege deinen eigenen kostenlosen DeepL-Schlüssel für bessere
  europäische Sprachen; MyMemory und Lingva übernehmen, wenn ein Dienst ausfällt
- **Übersetzung auf dem Gerät** in Chrome und Edge, wo der Browser sie anbietet: ohne Netzwerk, ohne Kontingent, und
  der Text verlässt deinen Rechner nie
- **Filter**: Bots überspringen, Nutzer oder Kanäle stummschalten, Zeilen mit einem bestimmten Wort ausblenden,
  nur die Sprachen übersetzen, die du auswählst
- **Gebaut für schnelle Chats**: Die Emote-Namen aus den 7TV-, BTTV- und FFZ-Sets des Kanals werden nie
  übersetzt, auch wenn du diese Erweiterungen nicht nutzt, Links und @Erwähnungen werden beiseitegelegt, bevor etwas
  gesendet wird, ein Glossar für Namen, die die Dienste verhunzen, ein Übersetzungscache
- **Vier Anzeigestile**: unter der Nachricht, in derselben Zeile, anstelle der Nachricht oder nur beim Darüberfahren
- **Einen Kanal pausieren** über die Chatleiste, ohne die anderen anzuhalten. Beim Kanalwechsel oder beim
  Update der Erweiterung übersetzen offene Tabs weiter, ohne Neuladen
- **Moderation im Blick**: Eine von einem Moderator gelöschte Nachricht, ein Timeout oder ein Bann nimmt auch die Übersetzung weg
- **Sieht aus wie Twitch**: violett, und es folgt dem dunklen oder hellen Chat-Design von Twitch, solange du keins wählst
- Chrome, Brave, Edge und Firefox

| Chat, übersetzt beim Scrollen | Das Popup in der Symbolleiste |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch-Chat, in dem jede spanische Nachricht ihre englische Übersetzung darunter trägt, mit der Statusleiste der Erweiterung über der Liste" width="360"> | <img src="screenshots/popup.png" alt="Das Popup der Erweiterung mit Zielsprache, Anzeigestil, der Einstellung für die Vorschau beim Schreiben und der Anbieterkette" width="360"> |

| Was du tippst, bevor du es abschickst | Wähl eine Sprache, oder lass sie wählen |
|---|---|
| <img src="screenshots/compose.png" alt="Das Chatfeld mit einer englischen Nachricht und darüber einer Vorschau der spanischen Version, die gesendet wird" width="360"> | <img src="screenshots/languages.png" alt="Ein durchsuchbares Raster aus Sprachflaggen und -namen, mit der Sprache des Kanals an erster Stelle" width="360"> |

<sub>Aufgenommen mit dem ausgelieferten Build in einem Chatraum, den dieses Repository selbst erfindet: Die
Nutzernamen und Nachrichten sind ausgedacht und die Übersetzungen werden lokal beantwortet, damit hier kein
echter Nutzername auftaucht.</sub>

## Installation

Lade das Zip für deinen Browser von [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) herunter und entpacke es.

- Chrome, Brave, Edge (`…-chromium.zip`): Öffne `chrome://extensions`, aktiviere den Entwicklermodus, klick auf "Entpackte Erweiterung laden" und wähl den Ordner.
- Firefox 121+ (`…-firefox.zip`): Öffne `about:debugging#/runtime/this-firefox`, klick auf "Temporäres Add-on laden" und wähl `manifest.json`.
  Firefox vergisst ein temporäres Add-on, wenn es neu startet.

Eine so installierte Kopie aktualisiert sich nicht selbst: Ihr Symbol zeigt ein Abzeichen, wenn es eine neuere
Version gibt, und das Popup verlinkt auf das neueste Release.

## Übersetzungsdienste

Vier Anbieter, hintereinandergeschaltet: Fällt einer aus, übernimmt der nächste. Die Reihenfolge bestimmst du.

| Anbieter | Schlüssel | Hinweis |
|---|---|---|
| Google | keiner | der Standard, funktioniert ab Werk |
| DeepL | kostenlos | am besten bei europäischen Sprachen, [kostenloser Schlüssel](https://www.deepl.com/pro-api) für 1 Million Zeichen im Monat |
| MyMemory | keiner | Reserve |
| Lingva | keiner | Reserve, auf einer öffentlichen Instanz, es sei denn, du verweist auf deine eigene |

Der eingebaute Übersetzer von Chromium braucht kein Netzwerk und kein Kontingent. Chrome und Edge ab Version 138
können ihn anbieten, wobei nicht jede Kopie das tut, und für jedes Sprachpaar muss das Modell einmal
heruntergeladen werden, mit einem Klick in der Leiste. Firefox hat ihn nicht. Wo er fehlt, übernimmt die
Cloud-Kette und nichts geht kaputt.

## Einstellungen

Klick auf das Zahnrad in der Chatleiste, oder klick mit rechts auf das Erweiterungssymbol und wähl Optionen.

- **Anbieter**: Reihenfolge der Dienste, dein DeepL-Schlüssel und der Modus: zuerst auf dem Gerät, zuerst Cloud
  oder nur auf dem Gerät
- **Anzeige**: Zielsprache, Anzeigestil, Originaltext und Sprach-Badge, Textgröße, Zeilenabstand,
  Schriftart, Akzentfarbe, Chat-Design, die Vorschau beim Schreiben und was ein Klick darauf bewirkt
- **Filter**: Bots, Nutzer, Kanäle, Schlüsselwörter, Ausgangssprachen und ein Glossar mit Ersetzungen
- **Erweitert**: Größe und Lebensdauer des Caches, gleichzeitige Anfragen, ein Limit pro Kanal, Sicherung und Wiederherstellung
- **Aktivität**: übersetzte Nachrichten, Cache-Treffer, jede im Chat gesehene Sprache, und warum jede der letzten
  50 Zeilen übersetzt oder in Ruhe gelassen wurde
- **Tastatur**: Alt+Umschalt+T schaltet die Chat-Übersetzung ein oder aus (Alt+T ist der Kinomodus von Twitch),
  Alt+W die Vorschau beim Schreiben. Beide lassen sich in den Erweiterungs-Tastenkürzeln deines Browsers ändern
- Der Sprachknopf in der Aktionsleiste des Chats, unter dem Nachrichtenfeld: Ein Klick öffnet die Liste der Sprachen,
  in denen du schreibst, Tippen filtert sie. Der Knopf oben im Chat legt die Sprache fest, in der du liest

## Unterstützte Sprachen

Englisch · Französisch · Spanisch · Portugiesisch · Portugiesisch (Brasilien) · Deutsch · Italienisch · Niederländisch · Polnisch · Schwedisch · Tschechisch · Slowakisch · Rumänisch · Russisch · Ukrainisch · Türkisch · Arabisch · Hebräisch · Japanisch · Koreanisch · Chinesisch (vereinfacht) · Chinesisch (traditionell) · Thailändisch · Vietnamesisch · Indonesisch · Hindi · Finnisch · Norwegisch · Dänisch · Griechisch · Ungarisch · Bulgarisch · Katalanisch · Slowenisch · Estnisch · Litauisch · Lettisch · Persisch · Bengalisch · Tamil · Malaiisch · Filipino · Kantonesisch

Der Chat wird in jede davon übersetzt, und die Oberfläche der Erweiterung gibt es in jeder davon.

## Datenschutz

Kein Konto, kein eigener Server und keine Analysen, es sei denn, du stimmst einer täglichen anonymen Zählung zu, die an Google Analytics gesendet wird (genutzte Dienste, Fehler, Geschwindigkeit, nie deine Nachrichten, Namen oder Kanäle). Chatnachrichten und dein Entwurf, solange die Vorschau beim Schreiben an ist, gehen an den Übersetzungsanbieter,
den du gewählt hast, und sonst nirgendwohin, und im Modus auf dem Gerät nicht einmal dorthin. Um die Sprache des
Kanals zu kennen, fragt sie Twitch nach der Sendesprache und der ID des Kanals, und um Emote-Namen aus den
Übersetzungen herauszuhalten, fragt sie 7TV, BetterTTV und FrankerFaceZ nach den Emote-Namen des Kanals, was ihnen
die ID dieses Kanals verrät und sonst nichts. Eine aus einem Store installierte Kopie stellt keine weiteren Anfragen.
Eine von Hand installierte Kopie fragt GitHub höchstens alle sechs Stunden nach dem neuesten Release-Tag, um zu
wissen, ob sie ihr Update-Abzeichen zeigen soll. [Details](PRIVACY.md)

## FAQ

**Nachrichten werden nicht übersetzt.**
Öffne in den Einstellungen den Tab Aktivität und drück "Entscheidungen auslesen": Er listet die letzten 50
Zeilen auf und sagt, warum jede übersetzt oder in Ruhe gelassen wurde. Die meisten übersprungenen Zeilen werden
mit Absicht übersprungen: derselbe Nutzer, der sich wiederholt, zu kurze Zeilen, nur Emojis oder Gelächter, oder schon
in deiner Lesesprache. Zeigt der Tab gar nichts an,
sieht die Erweiterung den Chat nicht: Bitte eröffne ein Issue.

**Die violette Leiste ist verschwunden.**
Lad die Seite neu. Passiert es wieder, eröffne ein [Issue](https://github.com/kilworks/twitch-chat-translator/issues)
mit dem Kanal und dem, was du davor gemacht hast.

**Wie bekomme ich bessere Übersetzungen?**
Hinterlege in den Einstellungen einen kostenlosen DeepL-Schlüssel. Das kostenlose Kontingent deckt eine Million
Zeichen im Monat ab, und DeepL wird nur für die Sprachpaare verbraucht, bei denen es die kostenlosen Dienste schlägt.

**Welchen Anzeigestil soll ich nehmen?**
Unter der Nachricht. Die anderen drei funktionieren und werden noch angepasst.

**Kann ich die Erweiterung in meiner Sprache benutzen?**
Ja. Sie folgt der Sprache deines Browsers, und das Menü oben in den Einstellungen stellt sie auf jede der 43 um.

**Funktioniert es mit 7TV, BTTV und FFZ?**
Ja, mit jeder davon oder mit keiner. Ihre Emote-Namen bleiben aus den Übersetzungen heraus.

**Funktioniert es bei VODs und Clips?**
Ja, genauso wie bei Livestreams.

**Nach einem Twitch-Update ist es kaputt.**
Twitch ändert manchmal den Aufbau seines Chats. Eröffne ein [Issue](https://github.com/kilworks/twitch-chat-translator/issues),
dann wird es gepatcht.

**Kommt das von Twitch?**
Nein. Es ist ein unabhängiges Open-Source-Projekt und steht in keiner Verbindung zu Twitch.

## Neuigkeiten

In 1.0.0, dem ersten Release für Twitch:

- Liest den Twitch-Chat in seinen drei Formen: Twitchs eigene Liste (auch mit BTTV und FFZ), die 7TV-Liste sowie VOD- und Clip-Wiederholungen, in Popout, Embed, Moderatoransicht, Stream-Manager und mobil
- Schreibt Übersetzungen mit als Wörter erhaltenen Emotes in das Nachrichtenfeld und übersetzt die Emote-Namen aus den 7TV-, BTTV- und FFZ-Sets des Kanals nie
- Die Sprache des Kanals kommt von Twitch, eine gelöschte Nachricht verliert ihre Übersetzung, und das Aussehen ist violett und folgt dem dunklen oder hellen Chat von Twitch
- Alt+Umschalt+T schaltet die Übersetzung ein oder aus, Tab fügt die Übersetzung nur ein, wenn 7TV oder BTTV nicht gerade ein Emote vervollständigt haben, und der Sprachknopf sitzt in der Aktionsleiste unter dem Nachrichtenfeld

Jede Version, mit dem, was sich geändert hat, und der Messung dahinter:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) und [CHANGELOG.md](CHANGELOG.md).

## Entwicklung

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Die Builds sind reproduzierbar: Derselbe Commit ergibt auf jedem Rechner byteidentische Zips, geprüft, indem
ein `git archive` des Tags in einem leeren Ordner gebaut und die Hashes verglichen werden.

Zusätzlich zu den Unit-Tests laden die Offline-Gates die gebaute Erweiterung in einen echten Browser, steuern sie
und prüfen, was sie tut, wobei die Seite lokal ausgeliefert und der Übersetzungsdienst lokal beantwortet wird.
Sie brauchen Playwright, das absichtlich keine Abhängigkeit ist: Verweise mit `UX_KIT` auf einen Ordner, dessen
`node_modules` es enthält, oder führe `npm i -D playwright` aus.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Die Oberflächentexte liegen in `src/shared/i18n/` (Popup und Optionen, nach dem englischen Text indiziert) und
`src/content/i18n/` (Chatleiste, nach ID indiziert, mit dem englischen Text als Fallback), eine Datei pro
Sprache; Tests verlangen von jeder Datei den vollständigen Schlüsselsatz. Die Store-Texte liegen in
[store/](store/), und ein Release ist ein Versions-Tag: Die CI baut, prüft und veröffentlicht es in beiden Stores.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Verwandte Projekte

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), derselbe Übersetzer für den Kick-Chat, vom selben Autor

## Lizenz

MIT. Steht in keiner Verbindung zu Twitch.
