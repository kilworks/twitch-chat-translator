import { afterEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEY_DEEPL_KEY, STORAGE_KEY_SETTINGS } from '~/shared/constants';
import type { RuntimeMessage, RuntimeResponse } from '~/shared/messages';
import type { Settings } from '~/shared/settings';

// The worker module wires listeners at import time. Its heavy neighbours (IndexedDB
// cache, alarms, usage counters) are not what these tests are about.
vi.mock('./cache', () => ({
  TranslationCache: class {
    setConfig(): void {}
    async warm(): Promise<void> {}
    async clear(): Promise<void> {}
    async stats(): Promise<{ entries: number }> {
      return { entries: 0 };
    }
    async prune(): Promise<void> {}
  },
  warmTargets: () => [],
}));
vi.mock('./keepalive', () => ({
  listenKeepalive: () => undefined,
  armKeepalive: () => undefined,
  installKeepalive: async () => undefined,
  onLastTabGone: () => undefined,
}));
vi.mock('./updateChecker', () => ({
  installUpdateCheck: () => undefined,
  getUpdateStatus: async () => ({}),
}));
vi.mock('./usage', () => ({
  installUsage: () => undefined,
  addUsage: async () => undefined,
  dropUsage: async () => undefined,
  recordProviderError: async () => undefined,
  recordTranslation: async () => undefined,
  flushUsage: async () => undefined,
  syncUsageAlarm: async () => undefined,
}));
vi.mock('./stats', () => ({
  StatsTracker: class {
    async load(): Promise<void> {}
    current(): { byLang: Record<string, number> } {
      return { byLang: {} };
    }
    recordRequest(): void {}
    async flush(): Promise<void> {}
    async reset(): Promise<object> {
      return {};
    }
  },
}));

type Listener = (msg: RuntimeMessage, sender: chrome.runtime.MessageSender, reply: (r: RuntimeResponse) => void) => unknown;

const EXT = 'chrome-extension://abcdefghijklmnop/';
const TWITCH_TAB: chrome.runtime.MessageSender = { tab: { id: 1 } as chrome.tabs.Tab, url: 'https://www.twitch.tv/somechannel' };
const OPTIONS_PAGE: chrome.runtime.MessageSender = { url: `${EXT}src/options/index.html` };

async function loadWorker(
  sync: Record<string, unknown>,
  local: Record<string, unknown>,
  { slowSync = false } = {},
): Promise<{
  syncWrites: Record<string, unknown>[];
  alarms: string[];
  access: string[];
  sent: unknown[];
  ask: (m: RuntimeMessage, s: chrome.runtime.MessageSender) => Promise<RuntimeResponse>;
}> {
  const syncWrites: Record<string, unknown>[] = [];
  const alarms: string[] = [];
  const access: string[] = [];
  const sent: unknown[] = [];
  let listener: Listener | undefined;
  const area = (store: Record<string, unknown>, writes?: Record<string, unknown>[], slow = false) => ({
    get: async (key: string | string[]) => {
      if (slow) await new Promise((r) => setTimeout(r, 5));
      return Object.fromEntries([key].flat().filter((k) => k in store).map((k) => [k, structuredClone(store[k])]));
    },
    set: async (obj: Record<string, unknown>) => {
      writes?.push(structuredClone(obj));
      Object.assign(store, structuredClone(obj));
    },
    remove: async (key: string) => {
      delete store[key];
    },
    setAccessLevel: async (o: { accessLevel: string }) => void access.push(o.accessLevel),
  });
  // init() asks DeepL for its usage when a key is set: nothing leaves the test.
  vi.stubGlobal('fetch', async () => ({ ok: false }));
  vi.stubGlobal('chrome', {
    storage: {
      sync: area(structuredClone(sync), syncWrites, slowSync),
      local: area(structuredClone(local)),
      session: area({}),
      onChanged: { addListener: () => undefined, removeListener: () => undefined },
    },
    runtime: {
      id: 'abcdefghijklmnop',
      lastError: undefined,
      onMessage: { addListener: (l: Listener) => (listener = l) },
      onInstalled: { addListener: () => undefined },
      getManifest: () => ({ version: '3.6.2', content_scripts: [{ matches: ['https://www.twitch.tv/*'] }] }),
      getURL: (p = '') => EXT + p,
      openOptionsPage: async () => undefined,
    },
    alarms: { create: (name: string) => void alarms.push(name), get: async () => undefined, onAlarm: { addListener: () => undefined } },
    commands: { onCommand: { addListener: () => undefined } },
    tabs: { query: async () => [{ id: 7 }], sendMessage: async (id: number, m: unknown) => void sent.push([id, m]) },
    scripting: { executeScript: async () => [] },
  });
  vi.resetModules();
  await import('./index');
  const ask = (m: RuntimeMessage, s: chrome.runtime.MessageSender): Promise<RuntimeResponse> =>
    new Promise((resolve) => {
      listener!(m, s, resolve);
    });
  return { syncWrites, alarms, access, sent, ask };
}

const settle = async (): Promise<void> => {
  for (let i = 0; i < 10; i++) await new Promise((r) => setTimeout(r, 0));
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('worker start with a DeepL key on the device', () => {
  // Removing DeepL from the chain is a choice. The worker used to put it back
  // first, and wrote the whole settings object, key included, into browser sync.
  it('neither syncs the key nor puts DeepL back into the chain', async () => {
    const { syncWrites } = await loadWorker(
      { [STORAGE_KEY_SETTINGS]: { providerOrder: ['google', 'mymemory'], engineModeMoved: true } },
      { [STORAGE_KEY_DEEPL_KEY]: 'secret-key:fx' },
    );
    await settle();
    for (const w of syncWrites) {
      const s = w[STORAGE_KEY_SETTINGS] as Partial<Settings>;
      expect(s.deeplApiKey ?? '').toBe('');
      expect(s.providerOrder).not.toContain('deepl');
    }
  });
});

describe('storage is closed to content scripts', () => {
  const stored = { [STORAGE_KEY_SETTINGS]: { providerOrder: ['deepl', 'google'] } };
  const key = { [STORAGE_KEY_DEEPL_KEY]: 'secret-key:fx' };

  // S-01: the DeepL key and the settings blob were readable and writable from a page's script.
  it('asks for trusted contexts on both areas, and an update keeps the key and the settings', async () => {
    const { access, ask } = await loadWorker(stored, key);
    await settle();
    expect(access).toEqual(['TRUSTED_CONTEXTS', 'TRUSTED_CONTEXTS']);
    const res = await ask({ type: 'settings.get' }, OPTIONS_PAGE);
    expect((res as { payload: Settings }).payload.deeplApiKey).toBe('secret-key:fx');
    expect((res as { payload: Settings }).payload.providerOrder).toEqual(['deepl', 'google']);
  });

  it('tells the chat tabs when settings change, once, and without the key', async () => {
    const { ask, sent } = await loadWorker(stored, key);
    await settle();
    sent.length = 0;
    await ask({ type: 'settings.set', payload: { targetLang: 'de' } }, OPTIONS_PAGE);
    await new Promise((r) => setTimeout(r, 120));
    expect(sent).toEqual([[7, { type: 'settings.changed' }]]);
  });

  // S-05: a page names its own text, channel and locale.
  it('refuses a request of the wrong shape and a locale that is not a catalogue', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    const bad = (payload: object) => ask({ type: 'translate', payload } as RuntimeMessage, TWITCH_TAB);
    const outcome = async (payload: object) => ((await bad(payload)) as { payload: { ok: boolean; error?: { code: string } } }).payload;
    expect((await outcome({ messageId: 'a', text: 'x'.repeat(2001), targetLang: 'fr' })).error?.code).toBe('invalid');
    expect((await outcome({ messageId: 'a', text: 5, targetLang: 'fr' })).error?.code).toBe('invalid');
    expect((await outcome({ messageId: 'a', text: 'hi', targetLang: 'fr', channel: 'c'.repeat(81) })).error?.code).toBe('invalid');
    expect(await ask({ type: 'i18n.chat', locale: 'constructor' }, TWITCH_TAB)).toEqual({ type: 'i18n.chat', payload: undefined });
    expect(((await ask({ type: 'i18n.chat', locale: 'fr' }, TWITCH_TAB)) as { payload?: object }).payload).toBeTypeOf('object');
  });

  it('keeps the channel language and the hint counter for a tab, validated', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    expect((await ask({ type: 'lastlang.set', slug: 'chan', lang: 'ja' }, TWITCH_TAB)).type).toBe('ack');
    expect(await ask({ type: 'lastlang.get', slug: 'chan' }, TWITCH_TAB)).toEqual({ type: 'lastlang', lang: 'ja' });
    expect((await ask({ type: 'lastlang.set', slug: '../x', lang: 'ja' }, TWITCH_TAB)).type).toBe('error');
    expect((await ask({ type: 'lastlang.set', slug: 'chan', lang: '<script>' }, TWITCH_TAB)).type).toBe('error');
    expect((await ask({ type: 'hint.set', value: 3 }, TWITCH_TAB)).type).toBe('ack');
    expect(await ask({ type: 'hint.get' }, TWITCH_TAB)).toEqual({ type: 'hint', value: 3 });
    expect((await ask({ type: 'hint.set', value: 'x' as unknown as number }, TWITCH_TAB)).type).toBe('error');
  });
});

describe('cache housekeeping', () => {
  it('schedules the daily prune at start', async () => {
    const { alarms } = await loadWorker({}, {});
    await settle();
    expect(alarms).toContain('kt-cache-prune');
  });
});

/**
 * A Twitch tab is the least trusted place that can reach the worker: a renderer
 * compromised through the page can send anything the content script can. It
 * used to get the DeepL key with every settings answer, and could reset
 * everything, clear the cache or point the chat at another server.
 */
describe('what a Twitch tab may ask the worker', () => {
  const stored = { [STORAGE_KEY_SETTINGS]: { providerOrder: ['deepl', 'google'] } };
  const key = { [STORAGE_KEY_DEEPL_KEY]: 'secret-key:fx' };

  it('gets settings without the DeepL key', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    const res = await ask({ type: 'settings.get' }, TWITCH_TAB);
    expect(res.type).toBe('settings');
    expect((res as { payload: Settings }).payload.deeplApiKey).toBe('');
  });

  it('cannot reset the settings or clear the cache', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    expect((await ask({ type: 'settings.reset' }, TWITCH_TAB)).type).toBe('error');
    expect((await ask({ type: 'cache.clear' }, TWITCH_TAB)).type).toBe('error');
  });

  it('cannot write the key, the engines or the Lingva server', async () => {
    const { ask, syncWrites } = await loadWorker(stored, key);
    await settle();
    syncWrites.length = 0;
    for (const payload of [{ deeplApiKey: 'x' }, { providerOrder: ['lingva'] as Settings['providerOrder'] }, { lingvaInstance: 'https://evil.example' }]) {
      expect((await ask({ type: 'settings.set', payload }, TWITCH_TAB)).type).toBe('error');
    }
    expect(syncWrites).toEqual([]);
  });

  // Twitch only: the content script asks the worker for the channel's 7TV, BTTV and FFZ emotes.
  it('can still ask for the emote names', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    expect((await ask({ type: 'emotes.get', roomId: '1' }, TWITCH_TAB)).type).toBe('emotes');
  });

  it('refuses an emote room id that is not digits', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    expect((await ask({ type: 'emotes.get', roomId: '../../x?y=' }, TWITCH_TAB)).type).toBe('error');
  });

  it('can still write what the chat bar and the composer write', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    const res = await ask({ type: 'settings.set', payload: { targetLang: 'de', pausedChannels: ['x'] } }, TWITCH_TAB);
    expect(res.type).toBe('settings');
    expect((res as { payload: Settings }).payload.deeplApiKey).toBe('');
  });

  it('leaves the options page every right, the key included', async () => {
    const { ask } = await loadWorker(stored, key);
    await settle();
    const res = await ask({ type: 'settings.get' }, OPTIONS_PAGE);
    expect((res as { payload: Settings }).payload.deeplApiKey).toBe('secret-key:fx');
    expect((await ask({ type: 'cache.clear' }, OPTIONS_PAGE)).type).toBe('ack');
  });
});

// A message can wake the worker and arrive before init() has read storage:
// it used to be answered with the defaults, not the reader's settings.
describe('a message that wakes the worker', () => {
  it('is answered with the stored settings, not the defaults', async () => {
    const { ask } = await loadWorker({ [STORAGE_KEY_SETTINGS]: { targetLang: 'ja', engineModeMoved: true } }, {}, { slowSync: true });
    const res = await ask({ type: 'settings.get' }, OPTIONS_PAGE);
    expect((res as { payload: Settings }).payload.targetLang).toBe('ja');
  });
});
