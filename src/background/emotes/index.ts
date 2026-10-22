/**
 * Emote names of a Twitch channel, from the three providers viewers install: 7TV, BTTV and
 * FFZ, channel sets and global sets. A viewer without those extensions sees the names as
 * words, and a word the translator receives is a word it changes, so every name here is kept
 * out of what is translated.
 *
 * Measured (RECON/emotes/apis, 12 channels): 7TV answered 11/12, up to 2.3 MB and 1000
 * emotes; BTTV 9/12; FFZ 8/12; all three allow an extension origin. Only the names are kept.
 * A provider that fails or has no set for the channel contributes nothing, never an error.
 */

/** How long a set is trusted when the provider does not say (BTTV sends max-age 300). */
const DEFAULT_TTL_MS = 5 * 60_000;

interface Entry {
  names: string[];
  until: number;
}

const cache = new Map<string, Entry>();
const inflight = new Map<string, Promise<string[]>>();

type Pick = (json: unknown) => string[];

const names = (list: unknown, field: 'name' | 'code'): string[] =>
  Array.isArray(list)
    ? list.map((e) => (e && typeof e === 'object' ? (e as Record<string, unknown>)[field] : undefined)).filter((n): n is string => typeof n === 'string')
    : [];

const seventv: Pick = (j) => names((j as { emote_set?: { emotes?: unknown } })?.emote_set?.emotes ?? (j as { emotes?: unknown })?.emotes, 'name');
const bttvChannel: Pick = (j) => {
  const o = j as { channelEmotes?: unknown; sharedEmotes?: unknown };
  return [...names(o?.channelEmotes, 'code'), ...names(o?.sharedEmotes, 'code')];
};
const bttvGlobal: Pick = (j) => names(j, 'code');
const ffz: Pick = (j) => {
  const o = j as { sets?: Record<string, { emoticons?: unknown }>; default_sets?: number[] };
  const ids = o?.default_sets ? o.default_sets.map(String) : Object.keys(o?.sets ?? {});
  return ids.flatMap((id) => names(o?.sets?.[id]?.emoticons, 'name'));
};

export const SOURCES = {
  channel: (roomId: string): [string, Pick][] => [
    [`https://7tv.io/v3/users/twitch/${roomId}`, seventv],
    [`https://api.betterttv.net/3/cached/users/twitch/${roomId}`, bttvChannel],
    [`https://api.frankerfacez.com/v1/room/id/${roomId}`, ffz],
  ],
  global: [
    ['https://7tv.io/v3/emote-sets/global', seventv],
    ['https://api.betterttv.net/3/cached/emotes/global', bttvGlobal],
    ['https://api.frankerfacez.com/v1/set/global', ffz],
  ] as [string, Pick][],
};

function ttlOf(res: Response): number {
  const m = /max-age=(\d+)/.exec(res.headers.get('cache-control') ?? '');
  return m ? Math.max(60, Number(m[1])) * 1000 : DEFAULT_TTL_MS;
}

async function fetchSet(url: string, pick: Pick, now: () => number): Promise<string[]> {
  const hit = cache.get(url);
  if (hit && hit.until > now()) return hit.names;
  const pending = inflight.get(url);
  if (pending) return pending;
  const p = (async () => {
    try {
      const res = await fetch(url);
      // 404 is "this channel has no set here": remembered like an answer, so it is not re-asked
      // on every line.
      const got = res.ok ? pick(await res.json()) : [];
      cache.set(url, { names: got, until: now() + ttlOf(res) });
      return got;
    } catch {
      return hit?.names ?? [];
    } finally {
      inflight.delete(url);
    }
  })();
  inflight.set(url, p);
  return p;
}

/** Every emote name the channel's viewers may see as a word: channel and global sets. */
export async function emoteNamesFor(roomId: string | undefined, now: () => number = Date.now): Promise<string[]> {
  const sources = [...(roomId ? SOURCES.channel(roomId) : []), ...SOURCES.global];
  const sets = await Promise.all(sources.map(([url, pick]) => fetchSet(url, pick, now)));
  return [...new Set(sets.flat())];
}

/** Tests only. */
export function clearEmoteCache(): void {
  cache.clear();
  inflight.clear();
}
