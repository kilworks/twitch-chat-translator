import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchChannelLangIso, fetchRoomId, readClientId } from './twitchApi';
import { channelFromPath } from './platform';

const CLIENT_ID = 'abcdefghijklmnopqrstuvwxyz0123';

const gqlUser = (language: string | null, id = '1') => ({
  data: { user: { id, broadcastSettings: { language } } },
});

const mockFetch = (body: unknown, status = 200): void => {
  globalThis.fetch = vi.fn(async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
};

beforeEach(() => {
  // The page's bootstrap script, as Twitch serves it: the id is read, never hard-coded.
  document.head.innerHTML = `<script>window.__boot={}; clientId="${CLIENT_ID}"; x=1</script>`;
});

describe('channelFromPath', () => {
  it('returns the login for a channel URL and its sub-pages', () => {
    expect(channelFromPath('/somechannel')).toBe('somechannel');
    expect(channelFromPath('/somechannel/clip/SomeClipSlug')).toBe('somechannel');
    expect(channelFromPath('/SomeChannel')).toBe('somechannel');
  });

  it('reads popout, embed and moderator routes', () => {
    expect(channelFromPath('/popout/somechannel/chat')).toBe('somechannel');
    expect(channelFromPath('/embed/somechannel/chat')).toBe('somechannel');
    expect(channelFromPath('/moderator/somechannel')).toBe('somechannel');
    expect(channelFromPath('/u/somechannel/stream-manager')).toBe('somechannel');
  });

  it('keys a VOD by its id', () => {
    expect(channelFromPath('/videos/123456')).toBe('videos/123456');
  });

  it('returns undefined for reserved routes', () => {
    for (const p of ['/', '/directory', '/directory/all', '/settings/profile', '/search', '/subscriptions'])
      expect(channelFromPath(p)).toBeUndefined();
  });
});

describe('readClientId', () => {
  it('reads the id from the inline bootstrap script', () => {
    expect(readClientId()).toBe(CLIENT_ID);
  });

  it('returns undefined when the page carries none', () => {
    document.head.innerHTML = '<script>var a = 1;</script>';
    expect(readClientId()).toBeUndefined();
  });
});

describe('fetchChannelLangIso', () => {
  const originalFetch = globalThis.fetch;
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('extracts and normalizes the broadcast language GQL sends in capitals', async () => {
    mockFetch(gqlUser('ES'));
    expect(await fetchChannelLangIso('kt-test-es')).toBe('es');
  });

  it('sends the page Client-Id and the login', async () => {
    const spy = vi.fn(async () => new Response(JSON.stringify(gqlUser('FR')), { status: 200 }));
    globalThis.fetch = spy as unknown as typeof fetch;
    await fetchChannelLangIso('kt-test-headers');
    const [url, init] = spy.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://gql.twitch.tv/gql');
    expect((init.headers as Record<string, string>)['Client-Id']).toBe(CLIENT_ID);
    expect(JSON.parse(init.body as string).variables).toEqual({ l: 'kt-test-headers' });
  });

  it('asks for a VOD by its id and reads the owner', async () => {
    const spy = vi.fn(
      async () =>
        new Response(JSON.stringify({ data: { video: { owner: { id: '5', broadcastSettings: { language: 'JA' } } } } }), {
          status: 200,
        }),
    );
    globalThis.fetch = spy as unknown as typeof fetch;
    expect(await fetchChannelLangIso('videos/777')).toBe('ja');
    const [, init] = spy.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string).variables).toEqual({ v: '777' });
  });

  it('returns undefined when the channel has no language', async () => {
    mockFetch(gqlUser(null));
    expect(await fetchChannelLangIso('kt-test-none')).toBeUndefined();
  });

  it('tolerates a refusal without throwing', async () => {
    mockFetch('', 403);
    await expect(fetchChannelLangIso('kt-test-403')).resolves.toBeUndefined();
  });

  it('makes no request when the page carries no Client-Id', async () => {
    document.head.innerHTML = '';
    const spy = vi.fn();
    globalThis.fetch = spy as unknown as typeof fetch;
    await expect(fetchChannelLangIso('kt-test-noid')).resolves.toBeUndefined();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('channel metadata requests', () => {
  const originalFetch = globalThis.fetch;
  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.unstubAllGlobals();
  });

  it('reads the room id', async () => {
    mockFetch(gqlUser('EN', '4242'));
    expect(await fetchRoomId('kt-test-room')).toBe('4242');
  });

  it('coalesces concurrent lookups into a single request', async () => {
    const spy = vi.fn(async () => new Response(JSON.stringify(gqlUser('JA', '7')), { status: 200 }));
    globalThis.fetch = spy as unknown as typeof fetch;
    const [lang, id] = await Promise.all([fetchChannelLangIso('kt-test-coalesce'), fetchRoomId('kt-test-coalesce')]);
    expect(lang).toBe('ja');
    expect(id).toBe('7');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('serves a known language from cache instead of refetching', async () => {
    const spy = vi.fn(async () => new Response(JSON.stringify(gqlUser('DE')), { status: 200 }));
    globalThis.fetch = spy as unknown as typeof fetch;
    expect(await fetchChannelLangIso('kt-test-cached')).toBe('de');
    expect(await fetchChannelLangIso('kt-test-cached')).toBe('de');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('falls back to the last language seen for the channel', async () => {
    const stored: Record<string, unknown> = {};
    vi.stubGlobal('chrome', {
      storage: {
        local: {
          get: (k: string) => Promise.resolve({ [k]: stored[k] }),
          set: (obj: Record<string, unknown>) => {
            Object.assign(stored, obj);
            return Promise.resolve();
          },
        },
      },
    });
    mockFetch(gqlUser('JA'));
    expect(await fetchChannelLangIso('kt-test-persist')).toBe('ja');
    expect(stored['kt.lastlang.kt-test-persist']).toBe('ja');

    mockFetch('', 500);
    expect(await fetchChannelLangIso('kt-test-persist-later')).toBeUndefined();
    stored['kt.lastlang.kt-test-persist-later'] = 'ja';
    expect(await fetchChannelLangIso('kt-test-persist-later')).toBe('ja');
  });
});
