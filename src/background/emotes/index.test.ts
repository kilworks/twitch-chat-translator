import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearEmoteCache, emoteNamesFor } from './index';

/** Responses shaped as the providers answered in RECON/emotes/apis. */
const BODIES: Record<string, unknown> = {
  'https://7tv.io/v3/users/twitch/42': { emote_set: { emotes: [{ name: 'KEKW' }, { name: 'catJAM' }] } },
  'https://api.betterttv.net/3/cached/users/twitch/42': { channelEmotes: [{ code: 'monkaS' }], sharedEmotes: [{ code: 'PepeHands' }] },
  'https://api.frankerfacez.com/v1/room/id/42': { sets: { '9': { emoticons: [{ name: 'OMEGALUL' }] } } },
  'https://7tv.io/v3/emote-sets/global': { emotes: [{ name: 'EZ' }] },
  'https://api.betterttv.net/3/cached/emotes/global': [{ code: 'LULW' }, { code: 'KEKW' }],
  'https://api.frankerfacez.com/v1/set/global': { default_sets: [3], sets: { '3': { emoticons: [{ name: 'ZrehplaR' }] }, '4': { emoticons: [{ name: 'NotDefault' }] } } },
};

let calls: string[];

beforeEach(() => {
  clearEmoteCache();
  calls = [];
  globalThis.fetch = vi.fn(async (url: string) => {
    calls.push(url);
    const body = BODIES[url];
    return body === undefined
      ? new Response('{}', { status: 404 })
      : new Response(JSON.stringify(body), { status: 200, headers: { 'cache-control': 'public, max-age=300' } });
  }) as unknown as typeof fetch;
});

afterEach(() => vi.restoreAllMocks());

describe('emoteNamesFor', () => {
  it('merges channel and global sets of the three providers, each name once', async () => {
    const got = await emoteNamesFor('42');
    expect(got.sort()).toEqual(['EZ', 'KEKW', 'LULW', 'OMEGALUL', 'PepeHands', 'ZrehplaR', 'catJAM', 'monkaS']);
    // FFZ's global answer carries sets that are not default: they are not every viewer's.
    expect(got).not.toContain('NotDefault');
  });

  it('keeps the globals when the channel has no set anywhere', async () => {
    expect((await emoteNamesFor('7')).sort()).toEqual(['EZ', 'KEKW', 'LULW', 'ZrehplaR']);
  });

  it('serves a set from cache within its max-age, and asks again after', async () => {
    let t = 0;
    await emoteNamesFor('42', () => t);
    const first = calls.length;
    await emoteNamesFor('42', () => t);
    expect(calls.length).toBe(first);
    t = 301_000;
    await emoteNamesFor('42', () => t);
    expect(calls.length).toBe(first * 2);
  });

  it('survives a provider that throws', async () => {
    const real = globalThis.fetch;
    globalThis.fetch = vi.fn(async (url: string) => {
      if (url.includes('7tv.io')) throw new Error('offline');
      return (real as (u: string) => Promise<Response>)(url);
    }) as unknown as typeof fetch;
    const got = await emoteNamesFor('42');
    expect(got).toContain('monkaS');
    expect(got).not.toContain('catJAM');
  });
});
