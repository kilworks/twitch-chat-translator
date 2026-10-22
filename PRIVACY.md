# Privacy Policy: Twitch Chat Translator

_Last updated: 2026-10-22_

Twitch Chat Translator is an independent project. It is not affiliated with or endorsed by Twitch.

## What we collect

**Nothing, unless you say yes.** There is no account, no login and no server of
ours. The extension does not collect personal data.

### Optional anonymous usage statistics (off by default)

The extension asks once whether you want to share anonymous usage statistics.
They stay off unless you accept (Chrome and other Chromium browsers: the popup,
or Options > About; Firefox: the optional "technical and interaction data"
choice in Firefox's own install prompt or add-on settings). You can turn them
off at any time, and the day being counted is deleted when you do.

If you accept, once a day the extension sends one event to Google Analytics
(`www.google-analytics.com`, Measurement Protocol) containing only:

- extension version, browser name, interface language, target language and
  engine mode;
- whether the 7TV, BTTV and FFZ extensions are present and whether the browser
  has an on-device translator;
- how many translations were shown, by engine (on-device, Google, DeepL, other,
  cache), how many provider errors happened, and how many chat lines were
  skipped;
- how many compose previews were shown, inserted and dismissed;
- the median and 95th percentile time a cloud translation took that day;
- a random identifier generated on install, so a day is counted once per install.

It **never** contains message text, usernames, channel names, anything you
type, your DeepL key or your browsing history. Google says Google Analytics 4
does not log or store IP addresses; it derives an approximate country from the
request. Firefox older than version 140 has no built-in consent for this, so
nothing is ever sent there.

## What gets sent off-device

### Chat text, to the translation engine you picked

To translate a chat message, its **text content** (after the extension sets
aside emotes, URLs, and `@mentions`) is sent to the translation provider you
configure. The same goes for the message you are typing while the compose
preview is on (it is on by default; turn it off in the popup or with Alt+W and
your drafts go nowhere):

| Provider | Endpoint | Sends |
|---|---|---|
| Google Translate | `translate.googleapis.com` | text only |
| DeepL | `api-free.deepl.com` or `api.deepl.com` | text + the last few chat lines as context, each with its author's username + your DeepL API key |
| MyMemory | `api.mymemory.translated.net` | text only |
| Lingva (configurable) | `lingva.lunar.icu`, `lingva.ml` (or your instance) | text only |

With on-device translation, chat text goes to none of them.

### The channel, to Twitch and to three emote services

These requests happen in every engine mode, on-device included, and they are
the only place a channel is named:

- **Twitch** (`gql.twitch.tv`, the interface the Twitch page itself uses): to
  know the language the streamer broadcasts in, the extension sends the
  channel's login name (on a VOD page, the video's number) and the Client-Id
  the page itself uses. It does not send your Twitch login.
- **7TV** (`7tv.io`), **BetterTTV** (`api.betterttv.net`) and **FrankerFaceZ**
  (`api.frankerfacez.com`): to keep emote names out of translations, even for
  a viewer who does not run those extensions, the extension asks each for the
  emote names of the channel and the global ones. The channel's numeric Twitch
  id is part of those requests, so these three services can tell which channel
  an IP address is asking about. Nothing else is sent. The answers are kept in
  memory for a few minutes.

### Updates

A copy installed by hand (not from a store) asks `api.github.com` for the
latest release tag of the project, at most every six hours, to know whether to
show its update badge. The request carries no query, no body and nothing that
identifies you. Copies installed from a store skip it.

### Everything else

Apart from the DeepL context, the optional statistics and the lookups above, we
never send: usernames, badges, timestamps, your IP (beyond what the browser
sends to any HTTP endpoint), or any other metadata.

## What we store locally

These pieces of data live in your browser's extension storage:

- Your preferences (target language, display style, providers, filters, and
  per-channel choices such as a remembered reading language or a paused
  channel). They sit in the browser's synced extension storage: if you turned
  on your browser's sync, the browser itself (Google or Mozilla) copies them to
  your other devices. We never see them.
- Your DeepL API key, if you add one. It stays on this device and is never
  synced.
- A cache of recent translations (text + translation pair), keyed by text, on
  this device.
- A daily counter of how many requests you made, broken down by provider,
  detected language and channel, and the last broadcast language seen on each
  channel. They stay on this device. The popup shows the counter and you can
  reset it.

You can wipe everything from the extension's options page ("Clear translation
cache", "Reset usage stats", "Reset all settings to defaults") or by removing
the extension.

## Third-party providers

Each provider has its own privacy policy. We are not affiliated with any of
them. Read theirs if you care:

- DeepL: <https://www.deepl.com/privacy>
- Google: <https://policies.google.com/privacy>
- MyMemory: <https://mymemory.translated.net/doc/usagelimits.php>
- Lingva: depends on the instance you pick (default is community-run).
- Twitch: <https://www.twitch.tv/p/legal/privacy-notice/>
- 7TV: <https://7tv.app/privacy>
- BetterTTV: <https://betterttv.com/privacy>
- FrankerFaceZ: <https://www.frankerfacez.com/privacy>

## Permissions

- `storage`: to save your preferences and cache.
- `alarms`: to keep the service worker alive briefly during bursts of chat, and
  to schedule the update check and the daily statistics count.
- `scripting`: once, when the extension is installed or updated, to load its
  own content script into twitch.tv tabs already open, so they keep translating
  without a reload; and each time you insert a translation into the message
  box, to run one packaged function in the Twitch page that writes the text
  there. It runs nothing else, and nowhere but twitch.tv.
- `host_permissions` for `www.twitch.tv`, `m.twitch.tv` and
  `dashboard.twitch.tv` (the stream manager): to read chat and write
  translations into it. For `gql.twitch.tv`, `7tv.io`, `api.betterttv.net` and
  `api.frankerfacez.com`: the lookups described above. For `api.github.com`:
  the update check. For the translation provider endpoints above: to call the
  translators.

We do not request the `tabs` or `<all_urls>` permission.

## Contact

Open an issue at <https://github.com/kilworks/twitch-chat-translator/issues>.
