// Emote list APIs of 7TV, BTTV and FFZ for the room ids seen on IRC: status, size, latency,
// emote count, CORS header. Global sets once each. Exit 1 if no endpoint answered 200.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { RECON, TODAY, save } from './lib.mjs';

const irc = JSON.parse(readFileSync(path.join(RECON, 'irc', 'live', 'measure.json'), 'utf8'));
const rooms = Object.entries(irc.roomIds);
const ORIGIN = 'chrome-extension://kt-probe';
const count = {
  '7tv': (j) => j?.emote_set?.emotes?.length ?? j?.emotes?.length ?? 0,
  bttv: (j) => (j?.channelEmotes?.length ?? 0) + (j?.sharedEmotes?.length ?? 0) || (Array.isArray(j) ? j.length : 0),
  ffz: (j) => Object.values(j?.sets ?? {}).reduce((n, s) => n + (s.emoticons?.length ?? 0), 0),
};
const endpoints = (id) => ({
  '7tv': `https://7tv.io/v3/users/twitch/${id}`,
  bttv: `https://api.betterttv.net/3/cached/users/twitch/${id}`,
  ffz: `https://api.frankerfacez.com/v1/room/id/${id}`,
});
const globals = { '7tv': 'https://7tv.io/v3/emote-sets/global', bttv: 'https://api.betterttv.net/3/cached/emotes/global', ffz: 'https://api.frankerfacez.com/v1/set/global' };
async function hit(provider, url) {
  const t = performance.now();
  try {
    const r = await fetch(url, { headers: { Origin: ORIGIN } });
    const buf = await r.text();
    let j = null;
    try { j = JSON.parse(buf); } catch {}
    return { provider, status: r.status, ms: Math.round(performance.now() - t), bytes: buf.length, emotes: count[provider](j), acao: r.headers.get('access-control-allow-origin'), cache: r.headers.get('cache-control') };
  } catch (e) {
    return { provider, status: 0, ms: Math.round(performance.now() - t), error: String(e).slice(0, 120) };
  }
}
const out = { date: TODAY, rooms: rooms.length, global: {}, channel: [] };
for (const [p, url] of Object.entries(globals)) out.global[p] = await hit(p, url);
for (const [ch, id] of rooms) for (const [p, url] of Object.entries(endpoints(id))) out.channel.push({ ch, ...(await hit(p, url)) });
const by = (p) => out.channel.filter((r) => r.provider === p);
out.summary = Object.fromEntries(['7tv', 'bttv', 'ffz'].map((p) => {
  const rs = by(p);
  const ms = rs.map((r) => r.ms).sort((a, b) => a - b);
  return [p, { ok200: rs.filter((r) => r.status === 200).length, notFound: rs.filter((r) => r.status === 404).length, of: rs.length, msP50: ms[Math.floor(ms.length / 2)], msMax: ms.at(-1), maxBytes: Math.max(...rs.map((r) => r.bytes ?? 0)), maxEmotes: Math.max(...rs.map((r) => r.emotes ?? 0)), acao: [...new Set(rs.map((r) => r.acao))] }];
}));
save('emotes', 'apis', { 'measure.json': out }, []);
console.log(JSON.stringify({ global: out.global, summary: out.summary }));
if (!out.channel.some((r) => r.status === 200)) process.exit(1);
