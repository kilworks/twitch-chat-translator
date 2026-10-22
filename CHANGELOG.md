# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
