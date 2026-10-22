# Work queue: Twitch port of kick-chat-translator

Marks: `- [ ]` open, `- [k]` waiting on kil, `- [x]` done. Every entry carries the number or
the RECON file that justifies it. Selectors cited here were all seen in a RECON snapshot of
the run date; `node .agent/parity-check.mjs` fails otherwise.

Source of truth for what must be ported: `.agent/INVENTORY.json` (1332 items, 30 categories,
generated from the Kick repository read only). Every item has a row in `.agent/PARITY.json`
pointing at one entry below: 678 ported as is, 530 adapted, 124 replaced, plus 26 rows that
exist only on Twitch.

---

## Measured facts this plan rests on

All from `.agent/RECON/`, run 2026-10-22, 40 channels drawn at random from the live directory,
16 of them busy (8+ new lines in 12 s, `heat.mjs`).

1. **The Kick code mounts on Twitch with 10 selector edits.** A clone with `selectors.ts` and the
   manifest repointed (nothing else) mounted the floating bar, the chip, the compose preview, and
   translated 22 rows on a live channel (`RECON/a11y/measure.json`). The port is a platform layer,
   not a rewrite.
2. **Two DOM families, decided by 7TV alone.** Natively and with BTTV and/or FFZ, messages sit in
   `[data-test-selector="chat-scrollable-area__message-container"]` (a `[role="log"]`), each line
   holding `[data-a-target="chat-line-message"]`, text in `[data-a-target="chat-message-text"]`
   and `.text-fragment`, author in `[data-a-target="chat-message-username"]`. As soon as 7TV is
   present (4/8 configs) on live, popout and mobile, the list becomes `.seventv-chat-list` with
   rows `.seventv-message`, text in `.text-token`, emotes `.seventv-chat-emote`. Kick's 7TV code
   reads `seventv-text-token`; on Twitch that class does not occur: it is `.text-token`.
3. **Embed and replay are their own families.** The `/embed` iframe stays native in 8/8 configs,
   7TV included. VOD and clip replay use a different list (an `ul`, no `[role="log"]`, lines with
   `[data-a-target="chat-message-text"]`). 7TV rewrites VOD lines (no `data-a-target` left in
   7tv/vod).
4. **Row identity.** 7TV rows carry `[msg-id]` equal to the IRC message id: 118/118 values matched
   (`RECON/7tv/idmatch`). Native rows carry no attribute but `class` (116 rows, `rowAttrs`), and
   no UUID anywhere in the page (`RECON/native/idmatch`). Kick's `data-index` does not exist.
5. **Injection survives.** A marker appended to the last 20 rows: 0 re-rendered and 0 duplicated
   in 80/80 cells; every marker on a row still attached survived, except clip replay where
   0/20 survived in 7/8 configs (the whole list was swapped; cause not established: extensions or
   the clip looping). No node is ever recycled (`reusedNodes` 0 in 80/80).
6. **The composer is Slate everywhere.** `[data-a-target="chat-input"]` with `[data-slate-editor]`
   in 8/8 configs; no extension replaces it (`RECON/<config>/compose`). Kick writes through
   Lexical: that module is replaced.
7. **Tab is taken.** Typing `Kap` then Tab: 7TV and BTTV complete it to an emote in 6/8 configs;
   native and FFZ alone do not, and logged out the native Tab moves focus out of the editor.
   Kick's default insert key is Tab.
8. **Alt+T is Twitch theater mode.** In `RECON/native/theater/measure.json` (`theaterProof`), Alt+T
   moved the video from 1020x574 at (240,243) to 1260x1000 at (0,0), and elements with a theatre
   class went from 0 to 5. Kick binds Alt+T to toggle translation.
9. **Channel language.** GQL `broadcastSettings.language`, queried with the Client-Id the page
   itself sends, answered on 20/20 drawn channels. Language tags were present on 4/20 and agreed
   with GQL on 2/4 (the probe also caught sidebar tags: noisy). Kick's `livestream.lang_iso` has
   no page equivalent.
10. **IRC is reachable anonymously**, unlike Kick: 9755 messages in 6 min on 12 channels, with
    tags for replies (328), first messages (107), highlighted (10), /me (21), cheers (1),
    deletions (5), timeouts (35), usernotices (sub 6, resub 10, raid 1, announcement 1, viewer
    milestone 53). The DOM shows a line 2062 ms after IRC (p50, p90 2183 ms); 1074/1207 DOM
    lines matched an IRC line by exact text. No shared-chat or hype-chat message was seen.
11. **Emote lists.** 7TV channel sets answered 11/12, up to 2.3 MB and 1000 emotes, p50 715 ms;
    BTTV 9/12, max 23.6 kB, p50 137 ms; FFZ 8/12, max 26 kB, p50 122 ms. All three allow an
    extension origin (CORS). Kick's emote handling guesses names with `EMOTE_NAME_RE`.
12. **Bots seen** over 6832 messages on 16 channels: StreamElements (5 channels), Fossabot (3),
    Moobot (2), Streamlabs (1), Nightbot (1), plus one channel-specific `*bot`.
13. **Theme.** The chat section carries `[data-a-target="chat-theme-dark"]` or
    `[data-a-target="chat-theme-light"]` (light cells): a direct signal, better than Kick's
    background-colour guess.
14. **SPA navigation** (pushState to another channel) detaches the list in 8/8 configs and a new
    one is built: re-attach on route change, as Kick does.
15. **Accessibility** of the Kick UI on Twitch: Lighthouse 91 with 0 failures on our elements,
    38/38 controls named and focusable; the chip overlaps the composer placeholder; the local
    model button is 21 px tall (under 24).

What was **not** measured, and why, is in the K entries and in the Risks section. Nothing above is
claimed for logged-in surfaces.

---

## Dependency graph

Disjoint sets. A unit is spawnable when its set appears here and does not intersect a running one.

```
ATTRACTORS, root only
  src/content/inject.css
  src/content/injector.ts
  src/content/platform/            (the new platform layer, P01)

A. platform + detection     P01 P02 P18   src/content/platform/**, observer.ts, pipeline.ts, index.ts
B. emotes                   P03           src/content/emoteParser.ts, src/background/emotes/**
C. compose                  P04           src/content/compose*.ts, src/background/slateWrite.ts
D. channel language         P05           src/content/twitchApi.ts
E. bots + filters           P06           src/content/filters.ts, src/shared/bots.ts
F. i18n + UI copy           P07           src/shared/i18n/**, src/content/i18n/**, public/_locales/**, src/popup/**, src/options/**
G. manifest                 P08           manifest.config.ts
H. background as is         P09           src/background/** except emotes/ and slateWrite.ts
I. telemetry                P10           src/shared/usage.ts, src/background/usage.ts, src/shared/constants.ts
J. unit tests               P11           src/**/*.test.ts
K. e2e + recon gates        P12 P17       test/e2e/**, test/audits/**, .agent/probes/**
L. release + stores         P13 P14       .github/**, scripts/stores/**, store/**, README*, PRIVACY.md, TUTORIAL.md
M. agent frame              P15           .agent/PROMPT.md, .agent/state.mjs
N. art direction            P16 P19       src/shared/theme.css, src/content/langChip.ts, src/content/langMenu.ts, src/content/localChip.ts
```

Order: P00 first, alone. Then A, B, C, D, E, H, M can run at once (disjoint). F after A (copy
depends on what A exposes), G after A and D, I after K05, N after A, J and K after each unit
they test, L last.

---

## Phases

### [P00] Skeleton: copy, rename, build green identical to Kick

- [x] Copy the Kick tree at the HEAD recorded in START.txt into this repository (file copy, never
      a write into the Kick checkout), drop `.git`, keep history out. Measure: file count equal to
      `git ls-files | wc -l` in Kick, minus `.agent/` which is regenerated.
      Done 2026-10-22 from a scratch clone at 184bfc9: 675 tracked, 7 under `.agent/`, 668 copied.
      `PROMPT.md` and `state.mjs` copied too because two tests read PROMPT.md (P15 adapts them).
- [x] Rename package, extension name and gecko id (`kick-translator@pkkls.dev` becomes a new id).
      The 23 npm scripts of INVENTORY `npmScripts` run unchanged.
      `twitch-chat-translator`, `twitch-translator@pkkls.dev`, short name and action title; 23/23
      scripts identical to Kick's; `build:firefox` exit 0. Store names and URLs wait on K03/K04.
- [x] `npm run release:check` green before any Twitch change: the baseline every later diff is
      measured against. Record test count (87 unit files) and gate count.
      Baseline: exit 0, 87/87 files, 1679/1679 tests; `run-gates.mjs` 42/42 offline gates green.
- [x] Keep Kick fixes flowing: `scripts/upstream-diff.mjs` lists commits in the Kick repository
      after the recorded HEAD that touch platform-independent files (P09 rows of PARITY.json)
      and prints a patch to apply here. Read only on the Kick side.
      Clones into a temp dir, git runs only there. 51 files watched. Witness: base = recorded HEAD,
      0 commits; base = HEAD~15, 18 commits and a 1203-line patch.

### [P01] Platform layer

- [x] Extract every Kick coupling behind `src/content/platform/`: selectors, channel slug, channel
      language, bot list, editor write, route watcher, branding. 88 PARITY rows point here.
      `platform/twitch.ts` (lists, rows, text, usernames, injection targets, panel, composer,
      action bar, theme, `channelFromPath`), `platform/detect.ts`; language in `twitchApi.ts`,
      bots in `shared/bots.ts`, editor write in `background/slateWrite.ts`. What still says
      "kick" in code: Tailwind token names (`kick-*`, kept like the 52 kt classes), the accent
      value `'kick'`, and the sister-extension link (asked for). The About tab still linked the
      Kick repository's changelog, privacy policy and issues: now this repository (test, witness
      1 red with one Kick link back).
- [x] Twitch selectors from fact 2, one set per DOM family (native log, 7TV list, replay list),
      chosen at runtime by detecting `.seventv-chat-list` first.
      `LIST_SELECTORS` 7TV first (test "lists 7TV first"); `scripts/dom-drift.ts` 17/17 selectors
      found in RECON. Live: rows read in all three families, e2e 2026-10-22 (P18 below).
- [x] Replace `has7TV()` by `detectExtensions()` returning 7TV, BTTV, FFZ: FFZ is visible through
      `ffz-` classes in the list (ffz/live), 7TV through its list. BTTV leaves no class in the
      list (bttv/live extClasses empty): detect it another way or treat it as native.
      BTTV is found by its own `betterttv` script and stylesheet in the page; unit tests on all
      three. Live bug found and fixed: `customElements` is null in the isolated world (witness).

### [P02] Detection, identity, injection

- [x] Observer on the measured list, re-attach on route change (fact 14) and on list swap
      (fact 5, clip).
      Offline gates `translate-navigation` and `nav-monde` green; live clip replay (list swapped)
      translated in 8/8 configs, e2e 2026-10-22.
- [x] Row id: `[msg-id]` when present (7TV, fact 4); otherwise the Kick hash of user and text,
      without the `data-index` part. Decide whether native rows can read the id from React
      props in the MAIN world; measure before deciding.
      Measured: 319/319 native rows on 3 busy channels carry `props.message.id` two fibers up,
      readable only from the MAIN world (RECON/native/reactid). Not adopted: native rows are never
      reused (fact 5, 0 in 80/80), so the node itself is a unique identity (serial per node plus
      the hash), and a MAIN-world read per line would cost a script call for no gain.
- [x] Injection target per family: inside `[data-a-target="chat-line-message"]` natively, inside
      `.seventv-message` with 7TV. Gate: the 20-marker survival probe, 80/80 cells.
      e2e 2026-10-22: 0 translations outside a row and 0 rows carrying two, in 56/56 cells;
      0 translated lines still on screen that lost their translation within 10 s.
- [x] Decide `connectionMode` (fact 10): IRC gives tags (reply parent, cheer bits, first message,
      emote positions) the DOM hides, but the DOM lags IRC by about 2 s, so IRC can only
      pre-translate, not replace the DOM. Measure gain before adopting.
      Not adopted. Row to translation on screen, live: p50 750 to 1008 ms natively,
      911 to 915 ms with 7TV (e2e live cells); IRC could save at most that, the DOM path is
      the only one that displays, and IRC adds a second connection per tab.
- [x] Twitch list size: the native list was seen holding 150 rows at most (several cells end at
      150). Confirm, then size `seenIds` (Kick caps at 4000).
      e2e 2026-10-22: largest list 151 rows natively, 169 with 7TV.
      `seenIds` keeps its 4000 cap, over 20 times the largest list.

### [P03] Emote protection from real lists

- [x] Fetch 7TV, BTTV, FFZ channel and global sets in the worker (fact 11), cache per room id
      with the providers' own TTL (BTTV sends max-age 300). 7TV sets reach 2.3 MB: store names
      only.
      `background/emotes/index.ts`: names only, TTL from `max-age` (5 min when absent), 4 tests
      (merge each name once, globals when no channel set, cache within max-age, a provider that
      throws).
- [x] Twitch native emotes: positions come from the IRC `emotes` tag or from `img` in the line
      (native/live: 110 images, all on static-cdn.jtvnw.net).
      From the line: images stay out of the text (test "a native emote is an image between two
      fragments"). Live K01: Kappa sent and read back as `img alt=Kappa`.
- [x] Replace the name heuristics (`EMOTE_NAME_RE`, `stripInlineEmoteNames`) by exact token
      matching; keep the heuristic only as fallback. Cheer tokens (`CheerN`) protected too.
      `stripKnownEmotes` when the channel's sets are known, heuristic otherwise, `CHEER_RE`;
      emoteParser 32/32 tests. Two streamer handles in the copied test list replaced.

### [P04] Compose on Slate

- [x] Replace `lexicalWrite.ts` with a Slate write in the MAIN world on `[data-slate-editor]`,
      keeping emote names as text (Twitch sends emotes as words).
      `background/slateWrite.ts`; live K01: typed "bonjour tout le monde Kappa", sent
      "hello everyone Kappa", read back in the DOM.
- [x] Tab conflict (fact 7): default insert key becomes Ctrl/Cmd+Enter, or Tab only when no
      7TV/BTTV completion is open; measure both on 8/8 configs before choosing.
      Tab kept; with 7TV or BTTV the extension lets their completion run first and inserts only
      when Tab changed nothing; Ctrl/Cmd+Enter always inserts. `twitch-compose.mjs`
      8/8 configs on 2026-10-23 01:30 local: Tab inserts 5 to 6 ms after the key natively and with FFZ, 65 to 67 ms where 7TV or BTTV completes first (the 60 ms wait), timed in the page; the emote completion of "Kap" went through in 6/6 configs that complete (witness: a 1500 ms wait turns BTTV red). Cost measured in the page with the CPU slowed 4x: native inserts 73 ms after
      Tab, BTTV 3339 ms, because BTTV's own Tab work holds the main thread first (Risks).
- [x] Overlays to avoid: re-measure with a logged-in composer (K01); the logged-out probe saw 7TV
      add `.floating-container` on Tab.
      Signed in: `.autocomplete-match-list` (emotes after `:`, users after `@`) added to the panels
      that hide the preview (RECON/k01, witness 1 red).
- [x] Live proof of a sent, translated message: K01.
      Done, 1 message on the owner's channel (RECON/k01).
- [x] Found on the way: text that reaches Slate without a key (paste from the menu, dictation,
      a script) left the preview hidden until the next key, because Slate cancels `beforeinput`
      and no `input` follows. `beforeinput` is now listened to. Witness in the page: before, the
      preview was still hidden after 10 s; after, it was ready and Tab inserted in 7 ms.

### [P05] Channel language

- [x] `twitchApi.ts`: GQL `broadcastSettings.language` with the page's Client-Id, read from the
      page at runtime, never hard-coded (fact 9: 20/20). TTL and last-known fallback as Kick.
      Through the built extension: 10/10 drawn channels got their language (fr 7, de 2, en 1),
      RECON/lang/extension. TTL 5 min, last language kept per channel, tests in twitchApi.test.ts.
- [x] Keep chat-based detection as fallback; drop tags as a source (4/20 present, 2/4 agree).
      No code reads tags (grep 0); chat detection unchanged.

### [P06] Bots and filters

- [x] `KICK_BOTS` becomes the measured list (fact 12) plus `extraBots`. Re-measure monthly from
      the recon harness.
      `TWITCH_BOTS`: StreamElements, Fossabot, Moobot, Streamlabs, Nightbot, plus `extraBots`.
      `bots.mjs` added to the weekly `twitch-dom.yml` (reported, not gating).
- [x] All 16 skip and drop reasons ported unchanged (PARITY rows dropReasons, skipReasons).
      Same key sets as Kick: 20/20 skip keys, 6/6 drop keys (scratchpad count against the Kick
      checkout); seen live with their text in the Firefox recon.

### [P07] UI copy and 43 locales

- [x] Every string naming Kick, in 42 shared catalogues, 44 chat catalogues, 42 store locales
      and the popup and options files: rewritten, then checked with `i18n-check`.
      1295 mentions to 0, except the sister-extension pair asked for (2 keys); `i18n-check`
      231 keys x 43, 0 missing, 0 extra.
- [x] 229 keys: those whose English text names Kick get new keys; the rest keep their translations.
      14 keys named Kick, 2 remain (the sister link); 17 new keys, 15 gone, 231 in all.

### [P08] Manifest

- [x] Matches: `https://www.twitch.tv/*`, plus `https://m.twitch.tv/*` (mobile cells found the
      same chat), `all_frames: true` for the embed (8/8 embed cells are an iframe).
      Plus `dashboard.twitch.tv` for the stream manager (K02). Live: mobile and embed translated
      in 8/8 configs each, e2e 2026-10-22.
- [x] Host permissions: drop kick.com, add twitch.tv, gql.twitch.tv, 7tv.io, api.betterttv.net,
      api.frankerfacez.com. Each one is a permission warning: list them in PRIVACY (P14).
      kick.com 0; the five hosts and dashboard.twitch.tv in the manifest and named in PRIVACY.md.
- [x] Commands: rebind Alt+T (fact 8). Check Alt+W against Twitch shortcuts the same way.
      Alt+Shift+T; `.agent/probes/hotkeys.mjs`: Alt+T moves the video, Alt+W and Alt+Shift+T
      change nothing beyond a no-key control (RECON/native/hotkeys).

### [P09] Platform-independent code, ported as is

- [x] 237 PARITY rows (translators, cache, coalescer, queue, keepalive, stats, language
      detection, glossary, laughter, transliteration). Proof: their 87 unit tests stay green after
      P00 without edits.
      51 files behind the 237 rows: 48 byte-identical to Kick, 3 changed by other phases
      (filters.ts P06, messages.ts P07, settings.ts P07). Unit tests green (release:check).

### [P10] Telemetry

- [x] GA4: separate property or shared: K05. Until decided, `usageStats` stays off and opt-in.
      Decided 2026-10-23: a new property (#144). Until the owner creates it and gives its id,
      `usageStats` stays off and opt-in.
- [x] `has7tv` env flag becomes one flag per extension.
      `seventv`, `bttv`, `ffz` flags in the daily event, tests in usage.test.ts.

### [P11] Unit tests

- [x] 87 test files: those tied to selectors, observer, compose, emotes, chip and platform get
      fixtures rebuilt from `RECON/<config>/<surface>/dom.html`; the rest run unchanged.
      `twitchFixtures.ts` (native, FFZ, FFZ notice line, /me, 7TV, 7TV VOD, replay), used by 5
      test files. 90/90 files, 1722/1722 tests green.

### [P12] End-to-end gates on Twitch

- [x] 84 Kick gates: live and navigation harnesses replaced by Twitch ones built on
      `.agent/probes/lib.mjs`; offline gates re-pointed at Twitch fixtures.
      Offline: `run-gates.mjs` 42/42 green (8 jobs; `extension-load` opens a real window and fails in a 24-job pool, passes alone). Live: `test/e2e/twitch-live.mjs` (surfaces x configs),
      `twitch-compose.mjs`, `twitch-dom.mjs`. The survival check now tells a row trimmed off the
      top of the list (then a newer identical line skipped as a repeat) from a lost translation:
      1 such repeat seen, 0 losses.
- [x] A Twitch fake chat (Kick's `kick-fake-chat.js` equivalent) that injects lines of each
      family, to test languages without waiting for real traffic.
      `scripts/twitch-fake-chat.js`, fakeChat.test.ts.

### [P13] Release and stores

- [x] Repository creation and visibility: K03. Store listing name: K04.
      Both decided 2026-10-23: public repository, "Twitch Chat Translator by Pkkls".
- [x] Workflows copied with new ids and secrets; update checker pointed at the new repository.
      Release zips named `twitch-chat-translator-*`; the Chrome item id is a repository variable
      `CWS_ITEM_ID` with no default: `cws.mjs` exits 1 before any call without it (witness), so
      nothing can reach the Kick listing; AMO slug and credential folder renamed; no Kick id left
      in `scripts/stores` (grep 0); selftests 5/5 and 5/5; update checker and About links on
      `kilworks/twitch-chat-translator`. Kick channel promo sources (`store/kick`) removed.

### [P14] Public texts

- [x] README in 43 languages, PRIVACY, TUTORIAL, screenshots: each of the 38 README claims and 46
      PRIVACY statements re-verified on Twitch before being written (PARITY rows readmeClaims,
      privacyClaims). New hosts from P08 named.
      42 translated READMEs brought to the English one: per file 1 line naming Kick (the sister
      link), links and images identical to README.md, 0 dashes. Store texts in the same
      languages (Chrome 42, AMO 29 + 29 summaries at 250 characters at most, notes 29), keywords.
      TUTORIAL rewritten for Twitch. Each README claim maps to a measure: JOURNAL 2026-10-22.

### [P15] Agent frame

- [x] `.agent/PROMPT.md` and `state.mjs` adapted; JOURNAL started from this run.
      PROMPT section 3 (art direction) and traps for Twitch; `node .agent/state.mjs` writes
      ETAT.json; `.agent/text-check.mjs` checks dashes and drawn channel names in produced files.

### [P16] Art direction

- [x] Kick green on Twitch chrome: new accent through the UX kit, both themes, using fact 13 for
      the scheme. 52 kt classes restyled, none renamed.
      Purple accent; scheme from the chat's own `chat-theme-*` stamp, agreeing in every e2e cell.
      Translation text contrast, worst per cell, at least 5.64:1 across the e2e run;
      light theme 6.48:1. 52/52 kt classes, none renamed. Screenshot looked at (RECON/k01).

### [P17] DOM drift gate

- [x] Recon harness: `heat.mjs`, `surface.mjs`, `matrix.mjs`, `summarize.mjs`, `compose.mjs`,
      `irc.mjs`, `idmatch.mjs`, `emotes.mjs`, `lang.mjs`, `bots.mjs` (88 cells, 2026-10-22).
- [x] Weekly CI job running the matrix and failing when a selector of P01 disappears, like Kick's
      `stores-verify.yml`.
      `.github/workflows/twitch-dom.yml`; `scripts/dom-drift.ts` 17/17 on RECON, `--fresh` on an
      empty directory 0/17 and exit 1. It runs once the repository exists (K03).

### [P18] Twitch-only lines and surfaces

- [x] Replies: translate the body, not the quoted parent (328 replies in 6 min).
      Test on native and 7TV reply markup from RECON.
- [x] Usernotices, cheers, /me, first and highlighted messages, deletions and timeouts (fact 10).
      Tests from RECON markup: FFZ first-message notice line (24 in the snapshots), the notice
      text left out (witness: notice read as a row, 1 red); /me in italics; cheermotes stripped;
      deleted, timed out and banned lines lose their translation (native, FFZ and 7TV markers).
      Native sub, highlighted and announcement lines appear in none of the 81 snapshots.
- [x] Popout, embed, VOD and clip replay, mobile, theater: one gate each, 8 configs.
      `twitch-live.mjs`, 2026-10-22: live 8/8, popout 8/8, embed 8/8, VOD 8/8, clip 8/8, mobile 8/8, theater 8/8 (RECON/e2e/<surface>/measure.json, run 2026-10-22 23:43 to 00:14 local).
- [x] Shared chat and hype chat: not seen in 9755 messages. Schedule a recon that watches the
      directory for a shared-chat session and captures it.
      `sharedchat.mjs`: 10 min on 37 channels, 46697 messages, 256 shared-chat lines from another
      room on 2 channels, DOM captured; hype chat 0. Weekly in `twitch-dom.yml`.
- [x] Firefox: recon of the same matrix with the Firefox builds of 7TV, BTTV and FFZ (only
      Chromium measured).
      Firefox 158 with the extensions' Firefox builds: 8/8 configs mounted and translated
      (60 to 90 translations per cell), RECON/firefox/live.

### [P19] Accessibility defects carried over

- [x] Chip overlaps the composer placeholder: anchor it in the Twitch action bar instead.
      `ACTION_BAR_SELECTOR`, langChip.anchor.test.ts; RECON/k01/4-chip-in-action-bar.png.
- [x] Local model button 21 px tall: 24 px minimum.
      `bar-live` now asserts it in 43 languages: at least 24 px; witness at 20 px min-height,
      21.4 px and red.
- [x] Measure what this run did not: light theme, keyboard path through the language menu,
      screen-reader announcement of translations inside `[role="log"]`.
      RECON/a11y/p19-measure.json: light 6.48:1; menu by keyboard (Enter, arrows, Enter, Escape,
      focus returns to the chip); translations inside the log, no `aria-hidden` ancestor.

---

## Waiting on kil

### [K01] Logged-in composer and a real send

- [x] A Twitch test account logged into the dedicated Brave profile of the brave-devtools MCP
      server, and a test channel where sending is allowed.
      Done 2026-10-22 on the owner's channel: 1 message sent, emote intact (RECON/k01).

### [K02] Mod view and stream manager

- [x] Same profile, on a channel where the account is moderator or broadcaster.
      Done 2026-10-22: mod view and stream manager translate a row (RECON/k02); the stream
      manager needed `dashboard.twitch.tv` in the manifest.

### [K03] Repository

- [x] Create the GitHub repository (private by default) and allow the first push.
      Done 2026-10-23 by the owner (#143): created public, push allowed. Raw recon captures with
      viewers' handles kept out of the history first.

### [K04] Store name and brand

- [x] Choose the listing name. Store policies restrict third-party marks in names; Kick's listing
      leads with the product name and names the platform second.
      "Twitch Chat Translator by Pkkls" (#142), set as extName in the 42 catalogues.

### [K05] Telemetry property

- [x] GA4: new property, or the Kick one with a platform dimension.
      Decided 2026-10-23 (#144): a new property. Creating it is on the owner's account.

### [K06] Hidden tab behaviour

- [x] Five automated methods kept the page `visible` (second tab, CDP minimise headless, CDP
      minimise headed, headed without Playwright's backgrounding flags, Brave headed behind
      another tab). Measure in a real browser: leave a channel in a background tab for 60 s, come
      back, report whether lines were lost.
      Closed 2026-10-23: the owner declined the hand test (#145). What stands: 5 automated
      methods, page never hidden; `pauseWhenHidden` is on by default, so a hidden tab stops
      translating. Whether it catches up on return is not measured.

---

## Risks, with their numbers

- 7TV owns the DOM in 4/8 configs: any 7TV update can move us. Mitigation P17.
- Tab with BTTV waits for BTTV's own Tab work: 3339 ms on a CPU slowed 4x against 73 ms natively.
  A slow machine with BTTV feels it on every Tab; Ctrl/Cmd+Enter does not wait.
- A 7TV row re-rendered with the same `msg-id` would be skipped as already seen. Not observed:
  0 losses in the e2e run, 0 re-renders in 80/80 recon cells.
- 7TV channel sets up to 2.3 MB per room: names only are kept in the worker.
- Clip replay swaps the whole list (0/20 in 7/8 configs): the new list is translated again.
- GQL with the page Client-Id is an undocumented interface: fallback to chat-based detection.
- Store review: five new host permissions plus dashboard.twitch.tv (P08).
- `.agent/RECON` snapshots hold chat usernames of viewers (only drawn channel names are
  redacted). Scrub before the repository is made public (K03).
