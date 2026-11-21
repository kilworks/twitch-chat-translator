# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
