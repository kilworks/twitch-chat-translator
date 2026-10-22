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

- [ ] Copy the Kick tree at the HEAD recorded in START.txt into this repository (file copy, never
      a write into the Kick checkout), drop `.git`, keep history out. Measure: file count equal to
      `git ls-files | wc -l` in Kick, minus `.agent/` which is regenerated.
- [ ] Rename package, extension name and gecko id (`kick-translator@pkkls.dev` becomes a new id).
      The 23 npm scripts of INVENTORY `npmScripts` run unchanged.
- [ ] `npm run release:check` green before any Twitch change: the baseline every later diff is
      measured against. Record test count (87 unit files) and gate count.
- [ ] Keep Kick fixes flowing: `scripts/upstream-diff.mjs` lists commits in the Kick repository
      after the recorded HEAD that touch platform-independent files (P09 rows of PARITY.json)
      and prints a patch to apply here. Read only on the Kick side.

### [P01] Platform layer

- [ ] Extract every Kick coupling behind `src/content/platform/`: selectors, channel slug, channel
      language, bot list, editor write, route watcher, branding. 88 PARITY rows point here.
- [ ] Twitch selectors from fact 2, one set per DOM family (native log, 7TV list, replay list),
      chosen at runtime by detecting `.seventv-chat-list` first.
- [ ] Replace `has7TV()` by `detectExtensions()` returning 7TV, BTTV, FFZ: FFZ is visible through
      `ffz-` classes in the list (ffz/live), 7TV through its list. BTTV leaves no class in the
      list (bttv/live extClasses empty): detect it another way or treat it as native.

### [P02] Detection, identity, injection

- [ ] Observer on the measured list, re-attach on route change (fact 14) and on list swap
      (fact 5, clip).
- [ ] Row id: `[msg-id]` when present (7TV, fact 4); otherwise the Kick hash of user and text,
      without the `data-index` part. Decide whether native rows can read the id from React
      props in the MAIN world; measure before deciding.
- [ ] Injection target per family: inside `[data-a-target="chat-line-message"]` natively, inside
      `.seventv-message` with 7TV. Gate: the 20-marker survival probe, 80/80 cells.
- [ ] Decide `connectionMode` (fact 10): IRC gives tags (reply parent, cheer bits, first message,
      emote positions) the DOM hides, but the DOM lags IRC by about 2 s, so IRC can only
      pre-translate, not replace the DOM. Measure gain before adopting.
- [ ] Twitch list size: the native list was seen holding 150 rows at most (several cells end at
      150). Confirm, then size `seenIds` (Kick caps at 4000).

### [P03] Emote protection from real lists

- [ ] Fetch 7TV, BTTV, FFZ channel and global sets in the worker (fact 11), cache per room id
      with the providers' own TTL (BTTV sends max-age 300). 7TV sets reach 2.3 MB: store names
      only.
- [ ] Twitch native emotes: positions come from the IRC `emotes` tag or from `img` in the line
      (native/live: 110 images, all on static-cdn.jtvnw.net).
- [ ] Replace the name heuristics (`EMOTE_NAME_RE`, `stripInlineEmoteNames`) by exact token
      matching; keep the heuristic only as fallback. Cheer tokens (`CheerN`) protected too.

### [P04] Compose on Slate

- [ ] Replace `lexicalWrite.ts` with a Slate write in the MAIN world on `[data-slate-editor]`,
      keeping emote names as text (Twitch sends emotes as words).
- [ ] Tab conflict (fact 7): default insert key becomes Ctrl/Cmd+Enter, or Tab only when no
      7TV/BTTV completion is open; measure both on 8/8 configs before choosing.
- [ ] Overlays to avoid: re-measure with a logged-in composer (K01); the logged-out probe saw 7TV
      add `.floating-container` on Tab.
- [k] Live proof of a sent, translated message: K01.

### [P05] Channel language

- [ ] `twitchApi.ts`: GQL `broadcastSettings.language` with the page's Client-Id, read from the
      page at runtime, never hard-coded (fact 9: 20/20). TTL and last-known fallback as Kick.
- [ ] Keep chat-based detection as fallback; drop tags as a source (4/20 present, 2/4 agree).

### [P06] Bots and filters

- [ ] `KICK_BOTS` becomes the measured list (fact 12) plus `extraBots`. Re-measure monthly from
      the recon harness.
- [ ] All 16 skip and drop reasons ported unchanged (PARITY rows dropReasons, skipReasons).

### [P07] UI copy and 43 locales

- [ ] Every string naming Kick, in 42 shared catalogues, 44 chat catalogues, 42 store locales
      and the popup and options files: rewritten, then checked with `i18n-check`.
- [ ] 229 keys: those whose English text names Kick get new keys; the rest keep their translations.

### [P08] Manifest

- [ ] Matches: `https://www.twitch.tv/*`, plus `https://m.twitch.tv/*` (mobile cells found the
      same chat), `all_frames: true` for the embed (8/8 embed cells are an iframe).
- [ ] Host permissions: drop kick.com, add twitch.tv, gql.twitch.tv, 7tv.io, api.betterttv.net,
      api.frankerfacez.com. Each one is a permission warning: list them in PRIVACY (P14).
- [ ] Commands: rebind Alt+T (fact 8). Check Alt+W against Twitch shortcuts the same way.

### [P09] Platform-independent code, ported as is

- [ ] 237 PARITY rows (translators, cache, coalescer, queue, keepalive, stats, language
      detection, glossary, laughter, transliteration). Proof: their 87 unit tests stay green after
      P00 without edits.

### [P10] Telemetry

- [k] GA4: separate property or shared: K05. Until decided, `usageStats` stays off and opt-in.
- [ ] `has7tv` env flag becomes one flag per extension.

### [P11] Unit tests

- [ ] 87 test files: those tied to selectors, observer, compose, emotes, chip and platform get
      fixtures rebuilt from `RECON/<config>/<surface>/dom.html`; the rest run unchanged.

### [P12] End-to-end gates on Twitch

- [ ] 84 Kick gates: live and navigation harnesses replaced by Twitch ones built on
      `.agent/probes/lib.mjs`; offline gates re-pointed at Twitch fixtures.
- [ ] A Twitch fake chat (Kick's `kick-fake-chat.js` equivalent) that injects lines of each
      family, to test languages without waiting for real traffic.

### [P13] Release and stores

- [k] Repository creation and visibility: K03. Store listing name: K04.
- [ ] Workflows copied with new ids and secrets; update checker pointed at the new repository.

### [P14] Public texts

- [ ] README in 43 languages, PRIVACY, TUTORIAL, screenshots: each of the 38 README claims and 46
      PRIVACY statements re-verified on Twitch before being written (PARITY rows readmeClaims,
      privacyClaims). New hosts from P08 named.

### [P15] Agent frame

- [ ] `.agent/PROMPT.md` and `state.mjs` adapted; JOURNAL started from this run.

### [P16] Art direction

- [ ] Kick green on Twitch chrome: new accent through the UX kit, both themes, using fact 13 for
      the scheme. 52 kt classes restyled, none renamed.

### [P17] DOM drift gate

- [x] Recon harness: `heat.mjs`, `surface.mjs`, `matrix.mjs`, `summarize.mjs`, `compose.mjs`,
      `irc.mjs`, `idmatch.mjs`, `emotes.mjs`, `lang.mjs`, `bots.mjs` (88 cells, 2026-10-22).
- [ ] Weekly CI job running the matrix and failing when a selector of P01 disappears, like Kick's
      `stores-verify.yml`.

### [P18] Twitch-only lines and surfaces

- [ ] Replies: translate the body, not the quoted parent (328 replies in 6 min).
- [ ] Usernotices, cheers, /me, first and highlighted messages, deletions and timeouts (fact 10).
- [ ] Popout, embed, VOD and clip replay, mobile, theater: one gate each, 8 configs.
- [ ] Shared chat and hype chat: not seen in 9755 messages. Schedule a recon that watches the
      directory for a shared-chat session and captures it.
- [ ] Firefox: recon of the same matrix with the Firefox builds of 7TV, BTTV and FFZ (only
      Chromium measured).

### [P19] Accessibility defects carried over

- [ ] Chip overlaps the composer placeholder: anchor it in the Twitch action bar instead.
- [ ] Local model button 21 px tall: 24 px minimum.
- [ ] Measure what this run did not: light theme, keyboard path through the language menu,
      screen-reader announcement of translations inside `[role="log"]`.

---

## Waiting on kil

### [K01] Logged-in composer and a real send

Open task for kil: #138 (shared with K02).

- [k] A Twitch test account logged into a dedicated Playwright profile (kil types the password
      once, the profile is reused), and a test channel where sending is allowed. Needed to prove
      the Slate write sends a translated message with emotes intact, and to re-measure overlays.

### [K02] Mod view and stream manager

Open task for kil: #138 (shared with K01).

- [k] Same profile, on a channel where the account is moderator or broadcaster: these surfaces
      are not reachable logged out.

### [K03] Repository

Open task for kil: #135.

- [k] Create the GitHub repository (private by default) and allow the first push.

### [K04] Store name and brand

Open task for kil: #136.

- [k] Choose the listing name. Store policies restrict third-party marks in names; Kick's listing
      leads with the product name and names the platform second.

### [K05] Telemetry property

Open task for kil: #137.

- [k] GA4: new property, or the Kick one with a platform dimension.

### [K06] Hidden tab behaviour

Open task for kil: #139.

- [k] Four automated methods kept the page `visible` (second tab, CDP minimise headless, CDP
      minimise headed, headed without Playwright's backgrounding flags). Measure in a real browser:
      leave a channel in a background tab for 60 s, come back, report whether lines were lost.

---

## Risks, with their numbers

- 7TV owns the DOM in 4/8 configs: any 7TV update can move us. Mitigation P17.
- Tab collision in 6/8 configs (fact 7) and Alt+T collision (fact 8): user-visible on day one if
  ported unchanged.
- 7TV channel sets up to 2.3 MB per room: memory and quota in the worker.
- Clip replay swaps the whole list (0/20 in 7/8 configs): per-row translation is lost on every swap.
- GQL with the page Client-Id is an undocumented interface: fallback to chat-based detection.
- Store review: five new host permissions (P08).
