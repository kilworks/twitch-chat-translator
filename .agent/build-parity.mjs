// Builds .agent/PARITY.json from INVENTORY.json, RECON/SUMMARY.json and the rule table below.
// The rules are the judgement; this script only applies them so that 1332 items get a row each
// without hand-copying. First matching rule wins. Change a decision here, not in PARITY.json.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const inv = JSON.parse(readFileSync(path.join(HERE, 'INVENTORY.json'), 'utf8')).categories;
const sum = JSON.parse(readFileSync(path.join(HERE, 'RECON', 'SUMMARY.json'), 'utf8')).grid;
const CONFIGS = ['native', '7tv', 'bttv', 'ffz', '7tv+bttv', '7tv+ffz', 'bttv+ffz', 'all'];

const R = {
  live: (c) => `RECON/${c}/live/measure.json`,
  compose: (c) => `RECON/${c}/compose/measure.json`,
  irc: 'RECON/irc/live/measure.json',
  lang: 'RECON/lang/channel-language/measure.json',
  emotes: 'RECON/emotes/apis/measure.json',
  a11y: 'RECON/a11y/measure.json',
  summary: 'RECON/SUMMARY.json',
  bots: 'RECON/bots/irc/measure.json',
  idmatch: ['RECON/7tv/idmatch/measure.json', 'RECON/native/idmatch/measure.json'],
};
// Per-config expected behaviour, from the live cell of each config.
const liveBehaviour = (c) => {
  const g = sum[c]?.live;
  if (!g || g.status !== 'chat') return `no chat list measured for ${c} (status ${g?.status ?? 'missing'}): blocking, see P02`;
  return `rows ${g.rowSignature}; targets ${g.topTargets.slice(0, 3).join(',')}${g.extClasses.length ? '; ext classes ' + g.extClasses.slice(0, 4).join(',') : ''}; injected marker ${g.injection}`;
};
const composeBehaviour = (c) => {
  const g = sum[c]?.compose;
  if (!g || g.status !== 'ok') return `no composer measured for ${c}: blocking, see P04`;
  return `editor slate=${g.slate}; Tab on "Kap" gives "${g.tabResult}" (focus ${g.tabFocus}); cleared ${g.cleared}`;
};
const configsFor = (kind) => Object.fromEntries(CONFIGS.map((c) => [c, kind === 'compose' ? composeBehaviour(c) : liveBehaviour(c)]));
const liveEv = CONFIGS.map(R.live);
const composeEv = CONFIGS.map(R.compose);

// Rule: [category, test(item) -> bool, {status, plan, twitch, evidence?, why?, chat?: 'live'|'compose'}]
const kick = (f) => `kick:${f}`;
const fileOf = (id) => id.split('#')[0];
const rules = [
  // settings
  ['settings', (i) => i.id === 'accent', { status: 'adapte', plan: 'P16', twitch: "default accent becomes a Twitch-coherent value; 'kick' renamed, migration of stored value" }],
  ['settings', (i) => i.id === 'connectionMode', { status: 'adapte', plan: 'P02', twitch: "'websocket' gains a meaning on Twitch: anonymous IRC is reachable (unlike Kick); decide whether to keep DOM-only", evidence: [R.irc] }],
  ['settings', (i) => ['channelLangs', 'rememberChannelLang'].includes(i.id), { status: 'porte-tel-quel', plan: 'P05', twitch: 'keyed by Twitch login instead of Kick slug', evidence: [R.lang] }],
  ['settings', (i) => /^compose|^favoriteLangs$|^showComposerChip$/.test(i.id), { status: 'porte-tel-quel', plan: 'P04', twitch: 'same semantics on the Slate composer', evidence: composeEv }],
  ['settings', (i) => /Bots|^ignoreBots$/.test(i.id), { status: 'adapte', plan: 'P06', twitch: 'Twitch bot list replaces KICK_BOTS', evidence: [R.bots] }],
  ['settings', () => true, { status: 'porte-tel-quel', plan: 'P09', twitch: 'same key, default and bounds' }],
  ['storageKeys', () => true, { status: 'porte-tel-quel', plan: 'P09', twitch: 'same key; values written fresh on Twitch install (no migration from Kick, separate extension id)' }],
  // messages
  ['messages', (i) => i.id === 'compose.write', { status: 'remplace', plan: 'P04', twitch: 'writes into the Slate editor (data-slate-editor) instead of Lexical', evidence: composeEv }],
  ['messages', () => true, { status: 'porte-tel-quel', plan: 'P09', twitch: 'same runtime message' }],
  ['dropReasons', (i) => i.id === 'bot', { status: 'adapte', plan: 'P06', twitch: 'Twitch bot list', evidence: [R.bots] }],
  ['dropReasons', () => true, { status: 'porte-tel-quel', plan: 'P02', twitch: 'same reason and tooltip', chat: 'live', evidence: liveEv }],
  ['skipReasons', () => true, { status: 'porte-tel-quel', plan: 'P02', twitch: 'same reason and tooltip', chat: 'live', evidence: liveEv }],
  ['composeOutcomes', () => true, { status: 'porte-tel-quel', plan: 'P04', twitch: 'same outcome', chat: 'compose', evidence: composeEv }],
  // exports, by module
  ['exports', (i) => /src\/content\/selectors\.ts/.test(i.id), { status: 'remplace', plan: 'P01', twitch: 'Twitch selectors measured in RECON', chat: 'live', evidence: liveEv }],
  ['exports', (i) => /src\/content\/platform\.ts/.test(i.id), { status: 'remplace', plan: 'P01', twitch: 'detection of 7TV, BTTV and FFZ, not 7TV only', chat: 'live', evidence: liveEv }],
  ['exports', (i) => /src\/content\/kickApi\.ts/.test(i.id), { status: 'remplace', plan: 'P05', twitch: 'GQL broadcastSettings.language with the page client id', evidence: [R.lang] }],
  ['exports', (i) => /src\/background\/lexicalWrite\.ts/.test(i.id), { status: 'remplace', plan: 'P04', twitch: 'Slate write in MAIN world', evidence: composeEv }],
  ['exports', (i) => /src\/content\/(compose|composeUi|composeLogic)\.ts/.test(i.id), { status: 'adapte', plan: 'P04', twitch: 'Slate composer, Tab conflict with 7TV and BTTV', chat: 'compose', evidence: composeEv }],
  ['exports', (i) => /src\/content\/emoteParser\.ts/.test(i.id), { status: 'adapte', plan: 'P03', twitch: 'emote tokens from Twitch emotes tag and 7TV/BTTV/FFZ lists instead of name heuristics', chat: 'live', evidence: [R.emotes, ...liveEv] }],
  ['exports', (i) => /src\/content\/(observer|pipeline|injector|index)\.ts/.test(i.id), { status: 'adapte', plan: 'P02', twitch: 'row identity: msg-id (= IRC id) on 7TV rows, none on native rows; per-config injection target', chat: 'live', evidence: [...liveEv, ...R.idmatch] }],
  ['exports', (i) => /src\/content\/(langChip|langMenu|localChip)\.ts/.test(i.id), { status: 'adapte', plan: 'P19', twitch: 'anchor in the Twitch chat action bar; currently overlaps the input placeholder', chat: 'compose', evidence: [R.a11y, ...composeEv] }],
  ['exports', (i) => /src\/background\/updateChecker\.ts/.test(i.id), { status: 'adapte', plan: 'P13', twitch: 'new repository and store ids' }],
  ['exports', (i) => /src\/(background|shared)\/usage\.ts|src\/content\/usage\.ts/.test(i.id), { status: 'adapte', plan: 'P10', twitch: 'GA4 property decision [K05]; env flag has7tv becomes per-extension flags' }],
  ['exports', (i) => /src\/shared\/constants\.ts/.test(i.id), { status: 'adapte', plan: 'P10', twitch: 'GA ids, store ids, colours' }],
  ['exports', (i) => /src\/shared\/theme/.test(i.id), { status: 'adapte', plan: 'P16', twitch: 'Twitch art direction' }],
  ['exports', () => true, { status: 'porte-tel-quel', plan: 'P09', twitch: 'platform-independent module, copied unchanged' }],
  // tests and gates
  ['unitTests', (i) => /(selectors|kickApi|observer|emoteParser|compose|injector|langChip|platform|pipeline|index\.relais|fakeChat|chatStyles)/.test(i.id), { status: 'adapte', plan: 'P11', twitch: 'fixtures rebuilt from RECON dom.html' }],
  ['unitTests', () => true, { status: 'porte-tel-quel', plan: 'P11', twitch: 'copied unchanged, must stay green' }],
  ['e2eGates', (i) => /kick|live-|nav-|compose-|chat-live|chip-live|lang-menu-live|bar-live|bar-panel-live|session-check|headless-probe|rtl-live/.test(i.id), { status: 'remplace', plan: 'P12', twitch: 'Twitch harness built on .agent/probes/lib.mjs' }],
  ['e2eGates', () => true, { status: 'adapte', plan: 'P12', twitch: 'offline gate re-pointed at Twitch fixtures' }],
  ['audits', (i) => /selecteurs/.test(i.id), { status: 'remplace', plan: 'P12', twitch: 'selector audit against Twitch RECON' }],
  ['audits', () => true, { status: 'adapte', plan: 'P14', twitch: 'same audit on Twitch texts and listing' }],
  // tooling
  ['npmScripts', (i) => /^stores|^pack|^package|release/.test(i.id), { status: 'adapte', plan: 'P13', twitch: 'new store ids and listing' }],
  ['npmScripts', () => true, { status: 'porte-tel-quel', plan: 'P00', twitch: 'same command' }],
  ['workflows', () => true, { status: 'adapte', plan: 'P13', twitch: 'same jobs, new secrets and ids; weekly Twitch recon job added (P17)' }],
  ['skills', (i) => /add-language/.test(i.id), { status: 'porte-tel-quel', plan: 'P07', twitch: 'same procedure' }],
  ['skills', (i) => /ga-usage/.test(i.id), { status: 'adapte', plan: 'P10', twitch: 'new property' }],
  ['skills', () => true, { status: 'adapte', plan: 'P13', twitch: 'store and listing skill for the Twitch extension' }],
  ['scripts', (i) => /kick-|lexicon/.test(i.id), { status: 'remplace', plan: 'P12', twitch: 'Twitch console probes (collector, fake chat, switch check, emote lexicon from 7TV/BTTV/FFZ APIs)', evidence: [R.emotes] }],
  ['scripts', (i) => /stores\//.test(i.id), { status: 'adapte', plan: 'P13', twitch: 'new store ids' }],
  ['scripts', () => true, { status: 'porte-tel-quel', plan: 'P00', twitch: 'build tooling copied unchanged' }],
  ['agentFiles', () => true, { status: 'adapte', plan: 'P15', twitch: 'standing prompt, plan and state generator for the Twitch repo' }],
  // locales
  ['uiLocales', () => true, { status: 'porte-tel-quel', plan: 'P07', twitch: 'same 43 locales' }],
  ['storeLocales', () => true, { status: 'adapte', plan: 'P07', twitch: 'store name and description rewritten for Twitch' }],
  ['sharedCatalogs', () => true, { status: 'adapte', plan: 'P07', twitch: 'strings naming Kick rewritten in every locale' }],
  ['chatCatalogs', () => true, { status: 'adapte', plan: 'P07', twitch: 'strings naming Kick rewritten in every locale' }],
  ['i18nKeys', (i) => /kick/i.test(i.id), { status: 'adapte', plan: 'P07', twitch: 'key text names Kick: new key, all locales' }],
  ['i18nKeys', () => true, { status: 'porte-tel-quel', plan: 'P07', twitch: 'same key and translations' }],
  // manifest
  ['manifestHostPermissions', (i) => /kick\.com/.test(i.id), { status: 'remplace', plan: 'P08', twitch: 'https://www.twitch.tv/* and needed subdomains, plus emote API hosts', evidence: [R.emotes] }],
  ['manifestHostPermissions', () => true, { status: 'porte-tel-quel', plan: 'P08', twitch: 'same host' }],
  ['manifestMatches', () => true, { status: 'remplace', plan: 'P08', twitch: 'twitch.tv, m.twitch.tv if retained, all_frames for /embed', evidence: CONFIGS.map((c) => `RECON/${c}/embed/measure.json`) }],
  ['manifestPermissions', () => true, { status: 'porte-tel-quel', plan: 'P08', twitch: 'same permission' }],
  ['manifestCommands', () => true, { status: 'adapte', plan: 'P08', twitch: 'Alt+T toggles Twitch theater mode (theaterProof in RECON/native/theater/measure.json: video 1020x574 to 1260x1000): rebind', evidence: [...CONFIGS.map((c) => `RECON/${c}/theater/measure.json`)] }],
  ['selectors', () => true, { status: 'remplace', plan: 'P01', twitch: 'Twitch selector from RECON', chat: 'live', evidence: liveEv }],
  ['cssClasses', () => true, { status: 'porte-tel-quel', plan: 'P16', twitch: 'same class, restyled', chat: 'live', evidence: [R.a11y, ...liveEv] }],
  ['popupFiles', () => true, { status: 'adapte', plan: 'P07', twitch: "'Open Kick' and Kick wording" }],
  ['optionsFiles', () => true, { status: 'adapte', plan: 'P07', twitch: 'Kick wording, Debug tab queries twitch.tv tabs' }],
  ['readmeClaims', () => true, { status: 'adapte', plan: 'P14', twitch: 'claim re-verified on Twitch before it is written' }],
  ['privacyClaims', () => true, { status: 'adapte', plan: 'P14', twitch: 'statement re-verified, emote API hosts and GQL added' }],
];

const sourceEvidence = (cat, it) => {
  switch (cat) {
    case 'settings': return [kick('src/shared/settings.ts')];
    case 'storageKeys': return [kick('src/shared/settings.ts')];
    case 'messages': return [kick('src/shared/messages.ts')];
    case 'dropReasons': case 'skipReasons': return [kick('src/content/pipeline.ts')];
    case 'composeOutcomes': return [kick('src/content/composeLogic.ts')];
    case 'exports': return [kick(fileOf(it.id))];
    case 'unitTests': case 'e2eGates': case 'audits': case 'workflows': case 'skills': case 'scripts': case 'agentFiles': case 'sharedCatalogs': case 'chatCatalogs': case 'popupFiles': case 'optionsFiles': return [kick(it.id)];
    case 'npmScripts': return [kick('package.json')];
    case 'uiLocales': case 'i18nKeys': return [kick('src/shared/i18n.ts')];
    case 'storeLocales': return [kick(`public/_locales/${it.id}/messages.json`)];
    case 'selectors': return [kick(it.id.split('|')[0])];
    case 'cssClasses': return [kick('src/content/inject.css')];
    case 'readmeClaims': return [kick('README.md')];
    case 'privacyClaims': return [kick('PRIVACY.md')];
    default: return [kick('manifest.config.ts')];
  }
};

const rows = [];
for (const [cat, items] of Object.entries(inv)) {
  for (const it of items) {
    const rule = rules.find(([c, t]) => c === cat && t(it));
    if (!rule) throw new Error(`no rule for ${cat}:${it.id}`);
    const r = rule[2];
    rows.push({
      key: `${cat}:${it.id}`,
      status: r.status,
      twitch: r.twitch,
      plan: r.plan,
      evidence: [...sourceEvidence(cat, it), ...(r.evidence ?? [])],
      ...(r.why ? { why: r.why } : {}),
      ...(r.chat ? { chat: true, configs: configsFor(r.chat) } : {}),
    });
  }
}

const tw = (key, plan, twitch, evidence, chat) => ({ key: `twitch-only:${key}`, status: 'twitch-only', plan, twitch, evidence, ...(chat ? { chat: true, configs: configsFor(chat) } : {}) });
const twitchOnly = [
  tw('replies', 'P18', 'reply lines carry a quoted parent: translate the body only, not the quoted parent', [R.irc, ...liveEv], 'live'),
  tw('shared-chat', 'P18', 'messages from another channel in a shared session (source-room-id tag): not observed in this run, needs a capture', [R.irc], 'live'),
  tw('cheers', 'P18', 'CheerN tokens must be protected like emotes', [R.irc], 'live'),
  tw('usernotices', 'P18', 'sub, resub, raid, announcement, viewer milestone lines: translate the user message part only', [R.irc], 'live'),
  tw('deleted-and-timeouts', 'P18', 'CLEARMSG and CLEARCHAT replace or hide lines: our injection must follow', [R.irc], 'live'),
  tw('me-actions', 'P18', '/me lines render the whole text in the user colour', [R.irc], 'live'),
  tw('first-and-highlighted', 'P18', 'first-msg and highlighted-message rows carry extra wrappers', [R.irc], 'live'),
  tw('hype-chat', 'P18', 'paid pinned messages: not observed in this run', [R.irc], 'live'),
  tw('popout', 'P18', '/popout/<login>/chat', CONFIGS.map((c) => `RECON/${c}/popout/measure.json`), 'live'),
  tw('embed', 'P18', '/embed/<login>/chat iframe on third-party sites, needs all_frames', CONFIGS.map((c) => `RECON/${c}/embed/measure.json`), 'live'),
  tw('vod-replay', 'P18', 'chat replay on /videos/<id>', CONFIGS.map((c) => `RECON/${c}/vod/measure.json`), 'live'),
  tw('clips', 'P18', 'clip pages', CONFIGS.map((c) => `RECON/${c}/clip/measure.json`), 'live'),
  tw('mobile-web', 'P18', 'm.twitch.tv chat', CONFIGS.map((c) => `RECON/${c}/mobile/measure.json`), 'live'),
  tw('theater', 'P18', 'theater mode', CONFIGS.map((c) => `RECON/${c}/theater/measure.json`), 'live'),
  tw('spa-navigation', 'P02', 'channel switch without reload', CONFIGS.map((c) => `RECON/${c}/spa/measure.json`), 'live'),
  tw('hidden-tab', 'K06', 'tab hidden then resumed: NOT measured, the page stayed visible under 4 automation methods (hiddenState in each measure.json); needs a real browser', CONFIGS.map((c) => `RECON/${c}/hidden/measure.json`), 'live'),
  tw('row-identity', 'P02', '7TV rows carry msg-id equal to the IRC message id (118/118); native rows carry no id at all', R.idmatch, 'live'),
  tw('replay-list-swap', 'P18', 'clip replay with 7TV replaces the whole list (0/20 markers kept, 20 rows detached)', CONFIGS.map((c) => `RECON/${c}/clip/measure.json`), 'live'),
  tw('light-theme', 'P16', 'Twitch light theme', CONFIGS.map((c) => `RECON/${c}/light/measure.json`), 'live'),
  tw('mod-view', 'K02', 'mod view needs a logged-in moderator account', [R.summary]),
  tw('dashboard-stream-manager', 'K02', 'stream manager needs the broadcaster logged in', [R.summary]),
  tw('irc-data-channel', 'P02', 'anonymous IRC: tags give reply, bits, first-msg, emotes positions; DOM shows lines about 2 s after IRC', [R.irc]),
  tw('emote-apis', 'P03', '7TV, BTTV, FFZ channel and global sets', [R.emotes]),
  tw('channel-language-gql', 'P05', 'GQL broadcastSettings.language answered on every drawn channel', [R.lang]),
  tw('tab-conflict', 'P04', '7TV and BTTV complete emotes on Tab; Kick uses Tab to insert the translation', composeEv, 'compose'),
  tw('chat-delay', 'P02', 'DOM shows lines about 2 s after IRC (p50), which bounds any IRC prefetch gain', [R.irc]),
];
writeFileSync(path.join(HERE, 'PARITY.json'), JSON.stringify({ generatedBy: 'build-parity.mjs', rows, twitchOnly }, null, 1));
const by = (k) => Object.entries(rows.reduce((m, r) => ((m[r[k]] = (m[r[k]] ?? 0) + 1), m), {})).map(([a, b]) => `${a} ${b}`).join(', ');
console.log(`rows ${rows.length} + twitch-only ${twitchOnly.length}; status: ${by('status')}; plan: ${by('plan')}`);
