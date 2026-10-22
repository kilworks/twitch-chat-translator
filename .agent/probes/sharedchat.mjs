// Watches for the two line kinds no recon has seen yet (PLAN P18): shared chat (a PRIVMSG whose
// `source-room-id` is another room) and hype chat (`pinned-chat-paid-amount`). Joins, read only
// and anonymously, up to 100 live channels from the top of the directory for MINUTES, and on
// the first shared-chat line opens that channel's popout chat and snapshots its DOM, so the
// selectors can be checked against it. Channel names are never written: redacted as <chN>.
// Writes RECON/sharedchat/live/{measure.json,dom.html}. Exit 1 if no PRIVMSG arrived at all:
// that is a blind probe. Finding no shared chat is a result, not a failure.
import { launch, TODAY, save, findMessageList } from './lib.mjs';

const MINUTES = Number(process.env.MINUTES ?? 10);
const MAX = Number(process.env.MAX ?? 100);

// The directory sorted by viewers: shared chat is a collaboration between live channels, and
// the big ones collaborate most.
const ctx = await launch('native', {}, 'sharedchat');
const page = await ctx.newPage();
await page.goto('https://www.twitch.tv/directory/all?sort=VIEWER_COUNT', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(6000);
for (let i = 0; i < 10; i++) {
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(1000);
}
const logins = await page.evaluate((max) => {
  const out = [];
  for (const a of document.querySelectorAll('a[href]')) {
    const u = new URL(a.href, location.href);
    if (u.host === 'www.twitch.tv' && /^\/[a-z0-9_]{3,25}$/i.test(u.pathname)) out.push(u.pathname.slice(1).toLowerCase());
  }
  return [...new Set(out)].filter((l) => !['directory', 'videos', 'search', 'settings', 'subscriptions', 'inventory', 'wallet', 'drops'].includes(l)).slice(0, max);
}, MAX);
const label = (chan) => `ch${logins.indexOf(chan.replace(/^#/, ''))}`;

const parseTags = (raw) => Object.fromEntries(raw.slice(1).split(';').map((kv) => { const i = kv.indexOf('='); return [kv.slice(0, i), kv.slice(i + 1)]; }));
const m = { date: TODAY, at: new Date().toISOString(), minutes: MINUTES, joined: logins.length, privmsg: 0, sharedForeign: 0, sharedTagged: 0, hypeChat: 0, sharedChannels: {}, hypeChannels: {}, capture: null };
let firstShared = null;

const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
ws.addEventListener('open', () => {
  ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
  ws.send('PASS SCHMOOPIIE');
  ws.send(`NICK justinfan${Math.floor(10000 + Math.random() * 80000)}`);
  for (const l of logins) ws.send(`JOIN #${l}`);
});
ws.addEventListener('message', (ev) => {
  for (const line of String(ev.data).split('\r\n').filter(Boolean)) {
    if (line.startsWith('PING')) { ws.send('PONG :tmi.twitch.tv'); continue; }
    if (!line.startsWith('@')) continue;
    const tagsRaw = line.slice(0, line.indexOf(' '));
    const parts = line.slice(tagsRaw.length + 1).split(' ');
    if (parts[1] !== 'PRIVMSG') continue;
    m.privmsg++;
    const tags = parseTags(tagsRaw);
    if (tags['source-room-id']) m.sharedTagged++;
    if (tags['source-room-id'] && tags['source-room-id'] !== tags['room-id']) {
      m.sharedForeign++;
      m.sharedChannels[label(parts[2])] = (m.sharedChannels[label(parts[2])] ?? 0) + 1;
      firstShared ??= parts[2].slice(1);
    }
    if (tags['pinned-chat-paid-amount']) {
      m.hypeChat++;
      m.hypeChannels[label(parts[2])] = (m.hypeChannels[label(parts[2])] ?? 0) + 1;
    }
  }
});

const until = Date.now() + MINUTES * 60 * 1000;
while (Date.now() < until && !firstShared) await new Promise((r) => setTimeout(r, 5000));

if (firstShared) {
  // Keep listening while the DOM is captured, so the counts cover the whole window.
  await page.goto(`https://www.twitch.tv/popout/${firstShared}/chat?popout=`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(8000);
  const list = await findMessageList(page, 15000);
  const html = await page.evaluate(() => {
    let e = window.__ktList;
    for (let d = 0; e?.parentElement && d < 6; d++) e = e.parentElement;
    return e ? e.outerHTML : '';
  });
  m.capture = { channel: label(`#${firstShared}`), listFound: list.candidates.length > 0, rowsAdded: list.candidates[0]?.added ?? 0 };
  save('sharedchat', 'live', { 'dom.html': html }, logins);
  while (Date.now() < until) await new Promise((r) => setTimeout(r, 5000));
}
await ctx.close();
ws.close();
save('sharedchat', 'live', { 'measure.json': m }, logins);
console.log(`joined ${m.joined}, privmsg ${m.privmsg}, shared foreign ${m.sharedForeign} in ${Object.keys(m.sharedChannels).length} channels, hype chat ${m.hypeChat}, capture ${m.capture ? 'yes' : 'no'}`);
if (!m.privmsg) process.exit(1);
