# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

The audit fixes of 24 November, shared with Kick Chat Translator where the code is.

### Changed

- **Cloud first is the default engine mode**, as in Kick Chat Translator: blind
  judges scored the on-device engine worse than Google on every language it
  served. Readers who were on "On-device first", by default or by choice, are
  moved once to cloud first, so their messages now go to an online translation
  service first. They can switch back in the options and the choice then holds.
  "On-device only" is unchanged.
- **A settings file no longer changes what is yours.** Importing one cannot
  switch on the usage statistics, set the MyMemory e-mail, replace the DeepL key
  or the watched channels, and an export leaves out the e-mail, the Lingva
  server and the watched channels.
- **Only the pause button pauses the bar.** A click on its padding no longer
  does, and the pause, options and play buttons have names a screen reader reads.
- The popup says in its footer when the extension does not answer, when a save
  is refused, and that a non-Twitch tab is not translated.

### Fixed

- **Fewer Chinese lines are sent with the wrong language or left unread.** The
  traditional-character table is replaced by the most frequent traditional
  characters, two characters shared with Japanese are no longer read as
  Chinese-only, one character common in standard Chinese is no longer read as
  Cantonese, bopomofo reads as traditional Chinese, and a short list of Chinese
  function characters reads as Chinese. Counts and limits:
  `docs/han-detection.md`.
- **Storage is closed to the scripts that run in Twitch pages** (Chrome and
  Edge): the DeepL key and the settings can no longer be read or written from
  there. The channel language and the compose hint are kept by the worker.
- **A session the translation services have banned stops hammering them.** The
  "every provider is cooling down" check never fired, and the provider that
  answered last stayed first for ever.
- The chat line says "Translation failed", not a machine code, and the reasons
  a line was left alone follow the interface language.
- Toasts show under reduced motion, and are announced with the bar's state, the
  saved confirmation and the compose preview.
- The emote providers only receive a numeric room id.
- Settings, the DeepL usage and the update check load together in the popup and
  the options page, and number fields save when you leave them.
- Lighter on fast chats: cache answers are written in one transaction per
  batch, the hide-original rules are scoped, the class-change observer watches
  only the nodes that carry the deleted mark, a line is read without climbing
  the whole page, and the worker writes its counters less often.

## [1.1.2] - 2026-11-23

The audit fixes of Kick Chat Translator 3.6.3, which shares this code.

### Fixed

- **Tab no longer inserts a stale translation.** The preview stays on screen for
  the 320 ms after a keystroke; Tab, Ctrl+Enter or the insert button pressed in
  that window replaced what had been typed since with the translation of the
  older text. The current text is now translated first and nothing is inserted.
- **Removing DeepL from the engine order sticks.** The worker put DeepL back
  first whenever a key was set.
- **Blocked keywords match whole words.** Blocking "rat" hid "congrats" and
  "pirate ship". Scripts written without spaces (Chinese, Japanese, Thai, Lao,
  Khmer, Burmese) keep the substring match at their edges.
- **The options page says when a save is refused.** Past about 540 blocked words
  the settings no longer fit in browser sync, and every later change failed
  without a word.
- **Repeated lines get the glossary once**, not "bro (brother) (brother)".
- **The remembered channel language stays in its tab.** Opening a second channel
  with a remembered language switched every other open tab to it.
- **The translation cache cleans itself.** Its database only ever grew; it is
  now pruned once a day to the lifetime and size set in Advanced.
- **No event is handled before the settings are read.** A message, shortcut or
  alarm that woke the background worker could act on the defaults.
- init ran twice on every install and update.

### Changed

- **The popup and the options page load one interface language instead of 43.**
  The popup opens with 162,850 bytes of JavaScript instead of 1,010,695 (84 %
  less).

### Security

- **The DeepL key stays on the device.** It was written into browser sync with
  the other settings, and into every settings export. Exports carry no key,
  importing a file keeps your key unless the file brings one, and a key left in
  sync by an earlier version moves to local storage on update. If you shared a
  settings file, change your DeepL key.
- **Twitch pages get only what the chat bar uses.** Each twitch.tv tab received
  the DeepL key with every settings answer and could reset the settings, clear
  the cache or change the engine order and the Lingva server. A page may now
  send ten message types, gets settings without the key, and may write six
  settings.
- **Chat text is no longer sent to lingva.ml**, which took about half of all
  Lingva requests.
- **A custom Lingva server is used over https only**, and a settings file can no
  longer change it.
- **The api.github.com host permission is gone.** The update check of copies
  installed by hand works without it.
- **Releases**: built with a read-only token, every workflow action pinned to a
  commit, and the zips carry signed build provenance. A security policy,
  Dependabot and OpenSSF Scorecard were added, and npm audit reports 0 (zod
  4.6.7).

### Removed

- The unused WebSocket warm path and the connectionMode setting.

## [1.1.1]

The fast-chat fixes of Kick Chat Translator 3.6.2, which shares this translation
code. The figures were measured there, on a synthetic chat at 20 to 25 messages
a second, against its previous version.

### Changed

- **"…" only shows on a line still waiting after a quarter of a second.** On a
  chat over its translation budget most lines got it and lost it at once, two
  layouts a line for nothing. Measured at 25 messages a second: about 145
  placeholders a minute instead of 780, and the work the extension adds to the
  page drops by 30 % (tasks) and 60 % (layouts).

### Fixed

- **A translation service that never answers no longer holds its lines.** After
  8 seconds (12 for a batch) the next service is asked; the page itself stops
  waiting after 20 seconds and offers the line's retry.
- **Long sessions on fast chats**: the chat bar no longer leaves a language panel
  and a click listener behind each time it is put back, a chat line translated
  again no longer collects hover listeners, the rate-limit hourglass keeps one
  timer instead of one per refused line, and the chat watcher no longer doubles
  its search for the chat list on a channel switch.

## [1.1.0]

### Added

- **The chat bar shows when your source language allowlist is holding lines back**: a small
  filter mark appears once 3 of the last 10 lines were left untranslated by it, and the popup
  says so under Today with a link straight to that list in Filters.
- **Both language pickers in the chat show each language's own name** (Deutsch, 日本語) under
  the name in your interface language, and their search finds either one or the ISO code.
- **The compose preview names its insert key** (Tab, or Ctrl+Enter) for your first few
  previews.

### Changed

- **The settings open on Display**, where the language and the look are. The popup's "order in
  options" link still lands on Providers.
- **Every on/off setting is a switch** that applies at once, in the settings and in the popup.
- **Font, density, chat theme and accent colour show their choices** as buttons and named
  colour swatches instead of drop-down lists, all usable from the keyboard. Display is grouped
  into Text, Colour and theme, and In the chat.
- **Two settings that were checkboxes with "(off = ...)" are now plain two-way choices**: what
  clicking the compose preview does, and which key swaps in the translation. Saved choices are
  kept.
- **Each translation engine says its state in words**: Ready, or Paused with the reason and when
  it comes back. The DeepL card appears once DeepL is in the order or a key is saved, and the key
  is hidden until you press Show key.
- **The source language allowlist is a set of tick chips**, so an empty list no longer reads as
  "nothing is translated".
- **Plainer words** on Providers, Advanced and Display, and no settings text smaller than 12px.
  On-device first is still the recommended engine mode.
- **The popup** shows one main button per state, puts the version in the footer, and fits
  without a scrollbar in every state and all 43 interface languages (552px in its usual state in
  English). Its update link is translated and Clear cache confirms it worked.
- **The composer chip keeps a solid edge in every mode**, in the dark and light chat themes.
- **The rate-limit sign in the chat bar is an hourglass icon** instead of an emoji.

### Fixed

- **Cloud first now falls back to the on-device model** when the cloud engines fail, as its
  label always said. Before, a failed cloud showed an error whatever model was ready.
- **A channel left out by your channel lists now says so**: the chat bar reads "Not translated
  here" and the popup offers a way to Filters, on a channel page, in a popout chat, in the mod
  view and on a VOD.
- **The engine settings can no longer contradict each other**: on-device only keeps on-device
  translation on, and a profile saved with both is repaired once.
- **Glossary lines written with `->` or `=>` work**, and lines the glossary cannot read are
  listed under it.
- **Switches and the selected choice in segmented controls stay visible** in Windows high
  contrast mode.
- The About tab no longer claims there is no tracking; it says anonymous counts are sent only if
  you opt in.
- The settings tab bar wraps on narrow windows instead of overlapping the Discord link, and the
  interface language button shows a flag or a globe next to "Auto".

## [1.0.4]

### Changed

- The Discord button uses a new permanent invite. The one shipped in 1.0.3 was revoked, so
  that button no longer opens the server.

## [1.0.3]

### Added

- A Discord link, the Discord mark alone, in the popup footer between Clear cache and Options,
  and at the end of the Options tab row, outside the tablist so the arrow keys still move
  between tabs only. Same server as Kick Chat Translator, with an invite of its own.
- The READMEs and the GitHub issue chooser point to the Discord server too.

### Fixed

- The Chrome Web Store id was still empty, so a store copy took itself for a zip install and
  its update notice pointed to the GitHub release instead of letting the store update it.

## [1.0.2]

1.0.1 was numbered but never reached either store; its fixes ship here.

### Fixed

- Clip replay: a clip loops and Twitch rebuilds its chat each time, and the repeated lines were
  skipped as a user repeating themselves. 42 of 45 clip lines stayed untranslated; replays now
  translate every line again, from the cache.
- A line that 7TV draws again in a new node now gets its translation back instead of staying bare.
- The floating bar is no longer thrown away when Twitch Anti-Ban replaces the chat panel's first
  child with its proxy chat.

### Changed

- The opt-in usage statistics go to a Google Analytics property of their own instead of Kick
  Chat Translator's. What is sent is unchanged.

## [1.0.0]

First release, for Twitch. The translation engine, the language detection, the cache and
the options come from Kick Chat Translator 3.3.0 by the same author; everything that reads
or writes the page was rebuilt for Twitch and measured on live channels.

### Added

- Reads Twitch chat in its three shapes: Twitch's own list (also with BTTV and FFZ), the
  7TV list, and VOD and clip replay. Popout, embed, mod view, stream manager and mobile
  included.
- Writes translations into the Twitch message box (a Slate editor) with emotes kept as
  words, so Twitch draws them on send.
- Emote names of the channel's 7TV, BTTV and FFZ sets are never translated, for viewers
  who do not have those extensions.
- The channel's broadcast language comes from Twitch itself.
- A message deleted by a moderator, a timeout or a ban loses its translation too.
- Purple look that follows Twitch's own dark or light chat theme.

### Changed

- Turn translation on or off with Alt+Shift+T: Alt+T is Twitch's theater mode.
- The language chip sits in the action bar under the message box.
- Tab inserts the translation only when 7TV or BTTV did not just complete an emote.
- Ignored bots are the ones measured on Twitch: StreamElements, Fossabot, Moobot,
  Streamlabs, Nightbot.
