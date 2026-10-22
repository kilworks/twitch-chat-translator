<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Read any Twitch chat in your own language, and reply in the channel's.<br>
Free, no account, nothing to set up. 43 languages, in the chat and in the extension itself.

**[Download the latest release](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge and Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Spanish chat messages arrive one by one, each with its English translation underneath; then an English reply is typed, a Spanish preview appears above the chat box, and Tab swaps it in" width="360">

</div>

## How it works

1. Install it and open any Twitch stream. A purple bar at the top of the chat says it is on.
2. Every message gets its translation right underneath as it arrives, in your browser's language. Live
   streams, VODs and clips alike.
3. Type a reply in your own language. A preview above the chat box shows it in the channel's language:
   press Tab or click it, and that version replaces what you typed.

The channel's language is the one the streamer set on Twitch, so there is nothing to configure. Both languages can be
changed in the settings, and a reading language can be remembered per channel.

If you also run 7TV or BTTV, they use Tab to finish an emote. Tab then finishes the emote first, and inserts the
translation only when it had nothing to finish. Ctrl/Cmd+Enter and a click always insert it.

## What you get

- **43 languages**, right to left included (Arabic, Hebrew, Persian), with regional variants kept apart
  (Brazilian and European Portuguese, Simplified and Traditional Chinese, Cantonese)
- **Everywhere the chat is**: live chat, popout, embed, moderator view, the stream manager, VOD and clip replay, on
  www.twitch.tv, m.twitch.tv and dashboard.twitch.tv, with or without 7TV, BTTV and FFZ
- **The extension speaks them too**: settings, popup and chat bar in all 43, picked from a menu with flags
- **Free out of the box** with Google Translate. Add your own free DeepL key for better European languages;
  MyMemory and Lingva take over when an engine fails
- **On-device translation** in Chrome and Edge where the browser offers it: no network, no quota, and
  the text never leaves your computer
- **Filters**: skip bots, mute users or channels, hide lines containing a word, translate only the
  languages you pick
- **Made for fast chats**: emote names from the channel's 7TV, BTTV and FFZ sets are never translated, even if you
  do not run those extensions, links and @mentions are set aside before anything is sent, a glossary for names
  the engines mangle, a translation cache
- **Four display styles**: under the message, on the same line, in place of it, or only on hover
- **Pause one channel** from the chat bar without stopping the others. Switching channels or updating the
  extension keeps open tabs translating, no reload
- **Moderation aware**: a message deleted by a moderator, a timeout or a ban loses its translation too
- **Looks like Twitch**: purple, and it follows the chat's own dark or light theme unless you pick one
- Chrome, Brave, Edge and Firefox

| Chat, translated as it scrolls | The toolbar popup |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch chat where each Spanish message carries an English translation underneath, with the extension's status bar above the list" width="360"> | <img src="screenshots/popup.png" alt="The extension popup with target language, display style, the compose preview setting and the provider chain" width="360"> |

| What you type, before you send it | Pick a language, or let it pick |
|---|---|
| <img src="screenshots/compose.png" alt="The compose box holding an English message, with a preview above it showing the Spanish version that will be sent" width="360"> | <img src="screenshots/languages.png" alt="A searchable grid of language flags and names, with the channel's own language first" width="360"> |

<sub>Taken from the shipping build in a chat room this repository makes up: the usernames and messages are
invented and the translations are answered locally, so no real person's handle ends up on this page.</sub>

## Install

Download the zip for your browser from [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) and unzip it.

- Chrome, Brave, Edge (`…-chromium.zip`): open `chrome://extensions`, turn on Developer mode, click Load unpacked, pick the folder.
- Firefox 121+ (`…-firefox.zip`): open `about:debugging#/runtime/this-firefox`, click Load Temporary Add-on, pick `manifest.json`.
  Firefox forgets a temporary add-on when it restarts.

A copy installed this way does not update itself: its icon shows a badge when a newer version exists, and the
popup links to the latest release.

## Translation engines

Four providers, chained: when one fails, the next takes over. The order is yours to set.

| Provider | Key | Note |
|---|---|---|
| Google | none | the default, works out of the box |
| DeepL | free | best on European languages, [free key](https://www.deepl.com/pro-api) for 1 million characters a month |
| MyMemory | none | fallback |
| Lingva | none | fallback, on a public instance unless you point it at your own |

Chromium's built-in translator needs no network and no quota. Chrome and Edge 138 and later can offer it, though
not every copy does, and each language pair needs its model downloaded once, with one click from the bar. Firefox
does not have it. Wherever it is missing, the cloud chain takes over and nothing breaks.

## Settings

Click the gear on the chat bar, or right-click the extension icon and choose Options.

- **Providers**: engine order, your DeepL key, and the mode: on-device first, cloud first, or on-device only
- **Display**: target language, display style, original text and language badge, text size, line spacing,
  typeface, accent colour, chat theme, the compose preview and what clicking it does
- **Filters**: bots, users, channels, keywords, source languages, and a glossary of replacements
- **Advanced**: cache size and lifetime, concurrent requests, a per-channel rate limit, backup and restore
- **Activity**: messages translated, cache hits, every language seen in chat, and why each of the last 50
  lines was translated or left alone
- **Keyboard**: Alt+Shift+T turns chat translation on or off (Alt+T is Twitch's theater mode), Alt+W the compose
  preview. Both can be rebound in your browser's extension shortcuts
- The language button in the chat's action bar, under the message box: one click opens the list of languages you
  write in, typing filters it. The one at the top of the chat sets the language you read in

## Supported languages

English · French · Spanish · Portuguese · Portuguese (Brazil) · German · Italian · Dutch · Polish · Swedish · Czech · Slovak · Romanian · Russian · Ukrainian · Turkish · Arabic · Hebrew · Japanese · Korean · Chinese (Simplified) · Chinese (Traditional) · Thai · Vietnamese · Indonesian · Hindi · Finnish · Norwegian · Danish · Greek · Hungarian · Bulgarian · Catalan · Slovenian · Estonian · Lithuanian · Latvian · Persian · Bengali · Tamil · Malay · Filipino · Cantonese

Chat is translated into any of them, and the extension's own interface is available in each one.

## Privacy

No account, no server of mine, and no analytics unless you opt in to a daily anonymous count sent to Google
Analytics (engines used, errors, speed, never your messages, names or channels). Chat messages, and your draft while
the compose preview is on, go to the translation provider you picked and
nowhere else, and in on-device mode not even there. To know the channel's language it asks Twitch for the channel's
broadcast language and id, and to keep emote names out of translations it asks 7TV, BetterTTV and FrankerFaceZ for
the channel's emote names, which tells them that channel's id and nothing else. A copy installed from a store makes
no other request. A copy installed by hand asks GitHub for the latest release tag, at most every six hours, to know
whether to show its update badge. [Details](PRIVACY.md)

## FAQ

**Messages aren't being translated.**
Open the Activity tab in the settings and press "Read decisions": it lists the last 50 lines and says why
each one was translated or left alone. Most skipped lines are skipped on purpose: the same user repeating
themselves, lines too short, only emoji or laughter, or already in your reading language. If the tab shows nothing
at all, the extension is not seeing the chat: please open an issue.

**The purple bar disappeared.**
Refresh the page. If it happens again, open an [issue](https://github.com/kilworks/twitch-chat-translator/issues)
with the channel and what you did before.

**How do I get better translations?**
Add a free DeepL key in the settings. The free tier covers a million characters a month, and DeepL is only
spent on the language pairs where it beats the free engines.

**Which display style should I use?**
Below the message. The other three work, and are still being adjusted.

**Can I use the extension in my language?**
Yes. It follows your browser's language, and the menu at the top of the settings switches it to any of
the 43.

**Does it work with 7TV, BTTV and FFZ?**
Yes, with any of them or none. Their emote names are kept out of the translations.

**Does it work on VODs and clips?**
Yes, the same way as on live streams.

**It broke after a Twitch update.**
Twitch sometimes changes how its chat is built. Open an [issue](https://github.com/kilworks/twitch-chat-translator/issues)
and it gets patched.

**Is this made by Twitch?**
No. It is an independent open-source project, not affiliated with Twitch.

## What's new

In 1.0.0, the first release for Twitch:

- Reads Twitch chat in its three shapes: Twitch's own list (also with BTTV and FFZ), the 7TV list, and VOD and clip replay, in popout, embed, moderator view, the stream manager and mobile
- Writes translations into the message box with emotes kept as words, and never translates the emote names of the channel's 7TV, BTTV and FFZ sets
- The channel's language comes from Twitch, a deleted message loses its translation, and the look is purple and follows Twitch's dark or light chat
- Alt+Shift+T turns translation on or off, Tab inserts the translation only when 7TV or BTTV did not just complete an emote, and the language button sits in the action bar under the message box

Every release, with what changed and the measurement behind it:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) and [CHANGELOG.md](CHANGELOG.md).

## Development

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Builds are reproducible: the same commit yields byte-identical zips on any machine, checked by building a
`git archive` of the tag in an empty folder and comparing hashes.

Beyond the unit tests, offline gates load the built extension into a real browser, drive it and assert
what it does, with the page served locally and the translation engine answered locally. They need
Playwright, which is deliberately not a dependency: point `UX_KIT` at a folder whose `node_modules` holds it,
or run `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Interface strings live in `src/shared/i18n/` (popup and options, keyed by the English text) and
`src/content/i18n/` (chat bar, keyed by id with the English text as the fallback), one file per language;
tests hold every file to the full key set. Store
texts live in [store/](store/), and a release is a version tag: CI builds, checks and publishes it to both
stores.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Related projects

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), the same translator for Kick chat, by the same author

## License

MIT. Not affiliated with Twitch.
