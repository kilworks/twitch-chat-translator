# Twitch Chat Translator: user guide

Read Twitch chat in your language, live, and reply in the channel's. This guide gets you from
zero to translated chat in a few minutes. No coding needed.

---

## Quick start (3 steps)

1. **Install** the extension (see below).
2. Open any **Twitch stream**. A bar appears at the top of the chat: **Translating**.
3. That's it. Messages in other languages now show a line in your language underneath.

> On **Chrome/Edge** it can run fully **on the device** (free, no quota).
> On **Brave** (or for the best European languages anywhere), add a **free DeepL key**: see
> ["Best quality"](#best-quality-free-deepl-key) below.

---

## Install

### Chrome / Brave / Edge

You load it as an "unpacked extension".

1. Unzip `twitch-chat-translator-...-chromium.zip` to a folder you'll keep.
2. Open your browser's extensions page:
   - **Chrome**: `chrome://extensions`
   - **Brave**: `brave://extensions`
   - **Edge**: `edge://extensions`
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the **unzipped folder** (the one containing `manifest.json`).
5. (Optional) Pin the icon so it's always visible.

Open a Twitch stream and you're ready.

### Firefox (121+)

1. Unzip `twitch-chat-translator-...-firefox.zip`.
2. Open **`about:debugging#/runtime/this-firefox`**.
3. Click **Load Temporary Add-on...** and select the **`manifest.json`** in the unzipped folder.
4. Open a Twitch stream: you're ready.

> **Temporary install:** Firefox removes it when you restart the browser. Requires **Firefox 121+**.

---

## Using it

### Where it works

Live chat, popout chat, embedded chat, the moderator view, the stream manager, and VOD and clip
replay, on www.twitch.tv, m.twitch.tv and dashboard.twitch.tv. With or without 7TV, BTTV and FFZ.

### The bar at the top of chat

- **Translating** means it is on. Click it to turn translation off or on.
- Its buttons set the language you read in, pause this channel only, and open the **Options** (gear).

### Where translations show

Under each message written in another language, by default:

> **someone**: ¿cómo estás?
> How are you?

You always keep the original message. Emote names (Twitch, 7TV, BTTV, FFZ) are never translated.

### Re-translate a message

Hover a translation and click the small **⟳** to translate it again (handy if a result looks off:
it asks again, ignoring the cache).

### Reply in the channel's language

Type in your own language. A preview above the chat box shows your message in the channel's
language. Press **Tab** or click the preview, and that version replaces what you typed. If 7TV or
BTTV is installed, Tab finishes an emote name first and inserts the translation only when there
was nothing to finish. **Ctrl/Cmd+Enter** always inserts it.

### Keyboard

- **Alt+Shift+T** turns chat translation on or off (Alt+T stays Twitch's theater mode).
- **Alt+W** turns the compose preview on or off.

Both can be changed in your browser's extension shortcuts page.

---

## Choose your language and look

Open **Options** (the gear on the bar, or right-click the icon and choose Options).

- **Display tab**
  - **Target language**: what everything is translated *into*.
  - **Display style**: under the message (default), on the same line, in place of it, or only on hover.
  - Toggles for keeping the original, showing the language badge, and more.

---

## Best quality: free DeepL key

DeepL gives the nicest translations for European languages. The key is **free**; it takes about
2 minutes to create.

1. Go to **<https://www.deepl.com/pro-api>** and sign up for **DeepL API Free**.
   - It asks for a card to verify, but the **Free** plan is **0 EUR for 1,000,000 characters per month**. You're not charged.
2. Copy your **Authentication Key** (it ends with **`:fx`**).
3. In the extension, open **Options, Providers**:
   - Paste the key into **DeepL, API key**.
   - Set **Plan = Free (api-free.deepl.com)**. This must be **Free** for an `:fx` key.
   - In **Cloud fallback chain**, click **+ DeepL** and move it to the top with the up arrow.
4. Done: chat now translates through DeepL.

> No key? It still works with **Google**, **MyMemory** and **Lingva** (free, no signup), just
> with stricter limits on very busy channels.

---

## On-device translation (Chrome / Edge)

If your browser has it (Chrome and Edge 138 and later; **Brave disables it**), you can translate
**locally, with no key, no quota and no network**:

1. **Options, Providers, Engine**: keep **"On-device first"** and **"Enable on-device translation"** on.
2. The first time a language appears, click the **"Local"** chip on the chat bar (or the language
   button in Options) to download its model **once**.
3. After that, that language translates on your computer.

Where it isn't available, the extension uses the cloud chain instead. Nothing to do.

---

## Handy options

In **Options**:

- **Filters**: skip bots, mute users or channels, hide lines containing a word, or translate only
  the languages you pick. *(Leave these empty if you want everything translated.)*
- **Advanced**
  - **Pause when tab is hidden** (on by default): background tabs don't translate, so they never
    spend your DeepL quota while you're not watching.
  - Cache size, speed, per-channel limit, backup and restore.
  - **Reset all settings to defaults**: fixes any odd state in one click.

---

## Nothing is translating?

Run down this list:

1. **Does the bar say Translating?** If it says **"Translation off"**, click it to turn it on.
2. **Is this channel paused?** The pause button on the bar is per channel.
3. **Are you watching the tab?** Background tabs pause by design. Bring the tab to the front.
4. **Filters**: if you set a channel allowlist or a source-language allowlist earlier, it may be
   hiding everything. Clear them, or use **Options, Advanced, Reset all settings to defaults**.
5. **Same language**: messages already in your target language aren't translated.
6. **DeepL not used?** Make sure the key is pasted **and** DeepL is in the chain (Options,
   Providers), with **Plan = Free** for an `:fx` key.

---

## Privacy

- No account and **no server on our side**.
- On-device mode: nothing leaves your computer.
- Cloud mode: a message's text goes **only** to the translator you chose, only to translate it.
- Anonymous daily usage counts are **off** unless you say yes when asked.

Full details in [PRIVACY.md](PRIVACY.md).

---

Questions or bugs: open an issue on the GitHub repository.
