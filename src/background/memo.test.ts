import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LASTLANG_MAX, getLastLang, setLastLang } from './memo';

const store: Record<string, unknown> = {};

beforeEach(() => {
  for (const k of Object.keys(store)) delete store[k];
  vi.stubGlobal('chrome', {
    storage: {
      local: {
        get: async (k: string | string[]) => Object.fromEntries([k].flat().filter((key) => key in store).map((key) => [key, structuredClone(store[key])])),
        set: async (o: Record<string, unknown>) => void Object.assign(store, structuredClone(o)),
      },
    },
  });
});

describe('the channel language memory', () => {
  // P27: one storage key per channel ever seen, never pruned.
  it('is one record, capped at its oldest write', async () => {
    for (let i = 0; i < LASTLANG_MAX + 5; i++) await setLastLang(`chan${i}`, 'fr');
    const keys = Object.keys(store);
    expect(keys).toEqual(['kt.lastlang.v2']);
    expect(Object.keys(store['kt.lastlang.v2'] as object)).toHaveLength(LASTLANG_MAX);
    expect(await getLastLang('chan0')).toBeUndefined();
    expect(await getLastLang(`chan${LASTLANG_MAX + 4}`)).toBe('fr');
  });

  it('still reads the per-channel key an earlier build wrote', async () => {
    store['kt.lastlang.old'] = 'de';
    expect(await getLastLang('old')).toBe('de');
  });

  it('writes nothing for the answer it already holds, and refuses a language the product lacks', async () => {
    await setLastLang('chan', 'ja');
    const set = vi.spyOn(chrome.storage.local, 'set');
    expect(await setLastLang('chan', 'ja')).toBe(true);
    expect(set).not.toHaveBeenCalled();
    expect(await setLastLang('chan2', 'qq')).toBe(false);
  });

  it('keeps both entries of two writes made at once', async () => {
    await Promise.all([setLastLang('a', 'fr'), setLastLang('b', 'de')]);
    expect(await getLastLang('a')).toBe('fr');
    expect(await getLastLang('b')).toBe('de');
  });

  it('refuses a slug or a language that is not what it should be', async () => {
    expect(await setLastLang('__proto__/../x y', 'fr')).toBe(false);
    expect(await setLastLang('chan', 'not a lang')).toBe(false);
    expect(await getLastLang({} as unknown as string)).toBeUndefined();
  });
});
