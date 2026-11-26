# Han-script lines: detection and the engine verdict

This page records the measurements behind the han-script changes (Japanese, Chinese, Korean lines) of Twitch Chat Translator,
ported from its Kick twin. The bench adapter here reads the line through `parseChatContent` and drops lines shorter than the
minimum length before the gates, as the pipeline does. It holds counts and
identifiers only, never chat lines.

## The problem

A line can be deleted before the reader sees it by two gates:

1. the "same language, sure" gate (`skipOnHint`): the local detector is confident the line is in the reader's language;
2. the "engine verdict" gate (`skipOnVerdict`): the translation service answers with the reader's language after the call.

Both can delete a line the reader should have seen. The engine answers `en` for a large part of short traditional Chinese,
and kana inside an @mention or a link made Chinese lines read as Japanese.

## Sets

- `design`: PC chat collection of 22 Nov 2026, 16:00 to 22:00 UTC, Twitch and Kick. 3,608 distinct texts after dedup and the
  60 per unit cap (1,936 declared Japanese, 1,511 Chinese, 161 Korean). sha256 of the line file:
  `ad7ffa9510f93c10fda088e90dc279f5b54556888ca760fb554f5dd0348a0dae`.
- `frais`: Twitch collection of 23 Nov 2026, cycle groups `o11230008`, `o11230159`, `o11230349`, `o11230540`, `o11230730`,
  `o11230920` (276 files). sha256 of the file list with per-file hashes:
  `5a72456e19c111a44b77fd50d80eb6358deab287c9d249000635ce019ecade04`. Selected set: 3,655 distinct texts (1,840 Japanese,
  1,415 Chinese, 400 Korean), line file sha256 `88d9ed2cb5ad457df169ae7f9969a7e4c545a5aaefa433f031e84a0d295eb3c9`.
  Deduplicated against `design`, the earlier Tatoeba test set and the pool; share removed: Japanese 14,858 lines, Chinese
  2,571, Korean 61. No `frais` line is read before the decision rule below is committed.
- Labels are the declared language of the channel. An audit of 400 han-only `design` lines by two independent annotators
  (gold lines: 0 misses) disagrees with the declared label on 11.0 percent of the decided Japanese lines and 4.5 percent of
  the decided Chinese lines, so declared labels are noisy. 42 percent of han-only Japanese lines and 6 percent of han-only
  Chinese lines have no decidable language. Two annotators of one model family are not independent evidence.
- `frais` is Twitch only. It proves neither Kick, nor Cantonese (no data), nor Korean (rare).

## Counts

For each reader (`en`, `ja`, `zh`, `zh-tw`, `ko`) and declared class: `W` lines deleted although not in the reader's
language (weight 10), `S` wrong source hint (5), `K` lines of the reader's language sent for translation (1), `Z` silence
of the local detector on a line of a known language (0.5). Cost is `10 W + 5 S + K + 0.5 Z`. The three allowlist cells
(`ja,ko`; `zh,zh-tw,yue`; `zh` reported only) count lines the source-language allowlist deletes. `test/e2e/han-bench.mjs`
runs the real gates for each (line, reader); `test/e2e/han-compare.mjs` compares a reference and a candidate with a paired
bootstrap by unit (1,000 draws, seed 0).

## Decision rule

Pre-registered before any scoring of `frais`. Three outcomes per criterion: PASS, FAIL, UNDERPOWERED (fewer than 30 units,
or fewer than 200 lines, or fewer than 10 units carrying lines the criterion concerns).

1. `W`: no cell (reader or list, class) rises by more than 2 lines; the sum of the rises is at most 5 percent of the sum of
   the drops. The `zh` list is reported without a criterion.
2. `S`: no class rises by more than 2 lines.
3. Cost of the `en` and `ja` readers: mean paired difference negative with a 95 percent upper bound below 0. When the
   interval cannot exclude 0 for lack of power, the criterion reads: mean difference negative or null and no unit rising by
   more than 1 `W`.
4. Speed: p95 of the detection time per line at most 1.25 times the reference, median at most 1.10 times.
5. `content.js` gzip grows by at most 4,000 bytes.
6. First change only: `K` of the `en` reader on the Latin lines of `design` rises by at most 0.5 percent of those lines.

The `frais` reading happens once, after the code freeze: each prefix of the second change set against the code after the
first one. The second change set is the longest prefix with no FAIL; later steps are removed by removal commits, never by a
second reading. Any change after the reading invalidates it for that change.

## First change: results on `design`

Reference: the extraction commit (same behaviour as the published build). Candidate: the engine-verdict guard and the mention and mark fixes. The adapter sends the text TCT sends; the stored verdicts are keyed by the text the other extension sent. 63 of the 3,581 scored lines (27 more are dropped before the gates, text under 2 characters) differ between the two texts; those 63 are scored without verdict (26 of them had one). List: kct-data/han/tct-differing-texts.json. Engine verdicts exist for 1,091 scored lines; the table below is over all 3,581, and the answered-only run gives the same `en` drop (12 to 0 on Japanese, 306 to 0 on Chinese).

- `W`, `en` reader: 318 to 0 (Japanese 12 to 0, Chinese 306 to 0). `ja` reader on Chinese 9 to 6. Every other reader cell unchanged. Lists: `ja,ko` on Korean 46 to 47 (the only rise), `zh,zh-tw,yue` 164 to 162, `zh` 760 to 756.
- `S`: Chinese 7 to 4, Japanese 20 to 20, Korean 12 to 12. Silence on han-only Chinese 0.576 to 0.578; leak of han-only Japanese read as Chinese 0.033 to 0.033.
- Cost, paired bootstrap by unit (202 units): `en` -15.81, 95 percent interval [-22.10, -9.82]; `ja` -0.218, [-0.515, -0.003]; `zh` and `zh-tw` -0.059, [-0.173, 0.025]; `ko` -0.059, [-0.158, 0.012].
- `K`, `en` reader, Latin lines: 34 to 34 (Japanese), 20 to 20 (Chinese), 34 to 34 (Korean).
- Speed (three alternated runs, per-line microseconds): median 12.3 to 12.6 (1.02 times), p95 35.1 to 36.6 (1.04 times). Weight: content.js gzip 97,254 to 97,467 bytes.
- Control: the reference against itself gives difference 0 in every cell and every cost.
- Criteria: 1 pass, 2 pass, 3 pass, 4 pass, 5 pass, 6 pass.
- Not proven: Kick chat, Cantonese, the held-out set, and the verdict gate on the lines without a stored verdict.

## Data-driven lists and Japanese-only characters (port of the Kick extension)

The Kick extension replaced the two hand-picked lists of 45 characters with lists of 506 and 592 chosen from about 340,000 lines of known origin, and added 151 characters only Japanese writes (decision rules, fresh sets, failed candidates and counts in its `docs/han-detection.md`). The table region of `langDetect.ts` here was byte-identical before the port. On the dev split of the labelled set this tree reads exactly like the Kick tree (Taiwan 76.87 percent Traditional, mainland 82.32 percent Simplified, Japan read as Chinese 0.77 percent). Totals pinned by this tree's tests were re-pinned with its own confusion diff, not copied: sure Tatoeba 3,731 to 3,770 right, Traditional lines answered Simplified 15 to 4.

## Stream prior (port of the Kick extension)

The Kick extension settles Han-only lines by the language of the channel (decision rules, replay of 83 collected channels, counts and the table of hidden lines by reader and channel language are in its `docs/han-detection.md`). Ported here with one difference: Twitch Chat Translator has no channel-switch hook in the pipeline, so the prior is reset when the `channel` of a message differs from the last one. Gates, tests and pipeline tests are the same; three of the pipeline tests were seen red with the gates neutralised. `content.js` gzip 101,288 to 101,639 bytes.

