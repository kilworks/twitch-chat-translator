// Anonymous IRC (justinfan, read only) on the hot channels for MINUTES, alongside a popout
// chat page on the busiest one. Measures: message kinds by tag (what line types exist and how
// often), room ids, and IRC -> DOM correspondence and latency on the shared channel.
// Writes RECON/irc/measure.json. Exit 1 if no PRIVMSG was received.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT, TODAY, save, findMessageList } from './lib.mjs';

const MINUTES = Number(process.env.MINUTES ?? 6);
const data = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const idxs = (data.hot.length ? data.hot : [...data.channels.keys()]).slice(0, 12);
const logins = idxs.map((i) => data.channels[i]);
const label = (room) => `ch${data.channels.indexOf(room.replace(/^#/, ''))}`;

const parseTags = (raw) => Object.fromEntries(raw.slice(1).split(';').map((kv) => { const i = kv.indexOf('='); return [kv.slice(0, i), kv.slice(i + 1)]; }));
const m = { date: TODAY, at: new Date().toISOString(), minutes: MINUTES, channels: idxs.map((i) => `ch${i}`), commands: {}, privmsgTags: {}, usernoticeIds: {}, noticeIds: {}, roomIds: {}, flags: {}, perChannel: {} };
const inc = (o, k) => (o[k] = (o[k] ?? 0) + 1);
const ircByText = new Map();

const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
ws.addEventListener('open', () => {
  ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
  ws.send('PASS SCHMOOPIIE');
  ws.send(`NICK justinfan${Math.floor(10000 + Math.random() * 80000)}`);
  for (const l of logins) ws.send(`JOIN #${l}`);
});
ws.addEventListener('message', (ev) => {
  for (const line of String(ev.data).split('\r\n').filter(Boolean)) {
    if (line.startsWith('PING')) { ws.send('PONG :tmi.twitch.tv'); continue; }
    const tagsRaw = line.startsWith('@') ? line.slice(0, line.indexOf(' ')) : '';
    const rest = tagsRaw ? line.slice(tagsRaw.length + 1) : line;
    const parts = rest.split(' ');
    const cmd = parts[1];
    const chan = parts[2];
    inc(m.commands, cmd);
    const tags = tagsRaw ? parseTags(tagsRaw) : {};
    if (cmd === 'ROOMSTATE' && tags['room-id']) m.roomIds[label(chan)] = tags['room-id'];
    if (cmd === 'PRIVMSG') {
      const text = rest.slice(rest.indexOf(' :') + 2);
      inc(m.perChannel, label(chan));
      for (const k of Object.keys(tags)) inc(m.privmsgTags, k);
      if (tags['reply-parent-msg-id']) inc(m.flags, 'reply');
      if (tags.bits) inc(m.flags, 'cheer');
      if (tags['first-msg'] === '1') inc(m.flags, 'first-msg');
      if (tags['msg-id']) inc(m.flags, `msg-id=${tags['msg-id']}`);
      if (tags['source-room-id'] && tags['source-room-id'] !== tags['room-id']) inc(m.flags, 'shared-chat-foreign');
      if (tags['source-room-id']) inc(m.flags, 'shared-chat-tagged');
      if (text.startsWith('\u0001ACTION')) inc(m.flags, '/me');
      if (tags.emotes) inc(m.flags, 'has-twitch-emotes');
      if (/https?:\/\//.test(text)) inc(m.flags, 'has-link');
      if (/[֐-ࣿ]/.test(text)) inc(m.flags, 'rtl-script');
      if (tags['pinned-chat-paid-amount']) inc(m.flags, 'hype-chat');
      ircByText.set(`${chan}|${text.replace('\u0001ACTION ', '').replace('\u0001', '').trim()}`, Date.now());
    }
    if (cmd === 'USERNOTICE') inc(m.usernoticeIds, tags['msg-id'] ?? '?');
    if (cmd === 'NOTICE') inc(m.noticeIds, tags['msg-id'] ?? '?');
    if (cmd === 'CLEARMSG') inc(m.flags, 'message-deleted');
    if (cmd === 'CLEARCHAT') inc(m.flags, tags['target-user-id'] ? 'timeout-or-ban' : 'chat-cleared');
  }
});

// DOM side on the busiest channel: timestamp each new row's text as it appears.
const ctx = await launch('native', {}, 'irc');
const page = await ctx.newPage();
await page.goto(`https://www.twitch.tv/popout/${logins[0]}/chat?popout=`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(6000);
await findMessageList(page, 5000);
await page.evaluate(() => {
  window.__ktRows = [];
  new MutationObserver((ms) => {
    for (const mu of ms) for (const n of mu.addedNodes) {
      if (n.nodeType !== 1) continue;
      const body = n.querySelector?.('[data-a-target="chat-line-message-body"]');
      window.__ktRows.push({ t: Date.now(), text: (body ?? n).innerText.replace(/\s+/g, ' ').trim(), hasBody: !!body });
    }
  }).observe(window.__ktList, { childList: true });
});
await new Promise((r) => setTimeout(r, MINUTES * 60 * 1000));
const rows = await page.evaluate(() => window.__ktRows);
await ctx.close();
ws.close();

// Correspondence: DOM rows whose text equals an IRC message text on the same channel.
const chan0 = `#${logins[0]}`;
const ircTexts = [...ircByText.entries()].filter(([k]) => k.startsWith(chan0 + '|'));
const lat = [];
let matched = 0;
for (const r of rows.filter((r) => r.hasBody)) {
  const t = ircByText.get(`${chan0}|${r.text}`);
  if (t !== undefined) { matched++; lat.push(r.t - t); }
}
lat.sort((a, b) => a - b);
const q = (p) => (lat.length ? lat[Math.min(lat.length - 1, Math.floor(p * lat.length))] : null);
m.domCorrespondence = {
  channel: label(chan0), ircMessages: ircTexts.length, domRows: rows.length, domMessageRows: rows.filter((r) => r.hasBody).length,
  matchedByExactText: matched, latencyMsDomMinusIrc: { p10: q(0.1), p50: q(0.5), p90: q(0.9), min: lat[0] ?? null, max: lat.at(-1) ?? null },
  note: 'text match is exact after whitespace collapse; emote-only or emote-bearing lines can render differently and stay unmatched',
};
save('irc', 'live', { 'measure.json': m }, logins);
console.log(`privmsg ${m.commands.PRIVMSG ?? 0}, usernotice ${m.commands.USERNOTICE ?? 0}, matched ${matched}/${m.domCorrespondence.domMessageRows}, p50 ${q(0.5)} ms`);
if (!m.commands.PRIVMSG) process.exit(1);
