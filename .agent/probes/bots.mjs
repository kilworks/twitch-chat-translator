// Which bot accounts actually post in Twitch chat? Anonymous IRC on the hot channels for MINUTES.
// Counts, per author login matching /bot$/ or a known bot service, messages and channel spread.
// Only bot logins are written; human chatters are counted, never named. Exit 1 if no PRIVMSG.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT, TODAY, save } from './lib.mjs';

const MINUTES = Number(process.env.MINUTES ?? 5);
const data = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const logins = (data.hot.length ? data.hot : [...data.channels.keys()]).map((i) => data.channels[i]);
const KNOWN = ['nightbot', 'streamelements', 'moobot', 'fossabot', 'streamlabs', 'sery_bot', 'wizebot', 'botrixoficial', 'kicklet', 'soundalerts', 'pokemoncommunitygame', 'commanderroot', 'deepbot', 'phantombot', 'coebot', 'ankhbot', 'vivbot', 'own3d', 'blerp', 'sery_bot'];
const bots = {};
let total = 0;
const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
ws.addEventListener('open', () => {
  ws.send('CAP REQ :twitch.tv/tags');
  ws.send('PASS SCHMOOPIIE');
  ws.send(`NICK justinfan${Math.floor(10000 + Math.random() * 80000)}`);
  for (const l of logins) ws.send(`JOIN #${l}`);
});
ws.addEventListener('message', (ev) => {
  for (const line of String(ev.data).split('\r\n')) {
    if (line.startsWith('PING')) { ws.send('PONG :tmi.twitch.tv'); continue; }
    const m = line.match(/ :(\w+)!\w+@\S+ PRIVMSG #(\w+) /);
    if (!m) continue;
    total++;
    const [, user, chan] = m;
    if (!(KNOWN.includes(user) || /bot$/i.test(user))) continue;
    const b = (bots[user] ??= { messages: 0, channels: new Set(), known: KNOWN.includes(user) });
    b.messages++;
    b.channels.add(chan);
  }
});
await new Promise((r) => setTimeout(r, MINUTES * 60 * 1000));
ws.close();
const list = Object.entries(bots).map(([login, b]) => ({ login, messages: b.messages, channels: b.channels.size, known: b.known })).sort((a, b) => b.channels - a.channels || b.messages - a.messages);
const out = { date: TODAY, minutes: MINUTES, channelsJoined: logins.length, privmsg: total, botAuthors: list, knownChecked: KNOWN };
save('bots', 'irc', { 'measure.json': out }, logins);
console.log(JSON.stringify({ privmsg: total, bots: list.slice(0, 15) }));
if (!total) process.exit(1);
