// Does a chat row carry the IRC message id? 7TV rows expose a msg-id attribute; native rows
// expose none (RECON/<config>/live rowAttrs). Joins IRC anonymously on the busiest channel,
// opens its popout chat with the given config for SECONDS, and counts row ids equal to IRC ids.
// node idmatch.mjs <config>. Exit 1 if fewer than 10 IRC messages arrived (nothing to compare).
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT, TODAY, save } from './lib.mjs';

const config = process.argv[2] ?? '7tv';
const SECONDS = Number(process.env.SECONDS ?? 90);
const data = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const login = data.channels[data.hot[0]];
const ircIds = new Set();
const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
ws.addEventListener('open', () => {
  ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
  ws.send('PASS SCHMOOPIIE');
  ws.send(`NICK justinfan${Math.floor(10000 + Math.random() * 80000)}`);
  ws.send(`JOIN #${login}`);
});
ws.addEventListener('message', (ev) => {
  for (const line of String(ev.data).split('\r\n')) {
    if (line.startsWith('PING')) ws.send('PONG :tmi.twitch.tv');
    const m = line.match(/^@[^ ]*?(?:^|;|@)id=([0-9a-f-]{36})[; ].* PRIVMSG /);
    if (m) ircIds.add(m[1]);
  }
});
const ctx = await launch(config, {}, 'idmatch');
const page = await ctx.newPage();
await page.goto(`https://www.twitch.tv/popout/${login}/chat?popout=`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(SECONDS * 1000);
// Every attribute value on any element in the page that looks like a UUID: wherever the id lives.
const domIds = await page.evaluate(() => {
  const out = {};
  for (const e of document.querySelectorAll('*')) for (const a of e.attributes) if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(a.value)) (out[a.name] ??= []).push(a.value);
  return out;
});
await ctx.close();
ws.close();
const perAttr = Object.fromEntries(Object.entries(domIds).map(([k, v]) => [k, { values: v.length, equalToIrcId: v.filter((x) => ircIds.has(x)).length }]));
const out = { date: TODAY, config, seconds: SECONDS, ircMessages: ircIds.size, uuidAttributes: perAttr };
save(config, 'idmatch', { 'measure.json': out }, [login]);
console.log(JSON.stringify(out));
if (ircIds.size < 10) process.exit(1);
