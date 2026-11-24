import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultSettings } from '~/shared/settings';
import { USAGE_COUNTERS, addCounts, percentile } from '~/shared/usage';
import { buildEvent, type Day } from './usage';

// Ce qui part chez GA, champ par champ. PRIVACY.md promet cette liste et rien
// d'autre : un champ ajoute ici sans y etre ecrit fait rougir ce test.
const PROMIS = [
  'ext_version', 'browser', 'ui_lang', 'target_lang', 'engine_mode', 'has_7tv', 'has_bttv', 'has_ffz', 'local_api',
  'lat_p50', 'lat_p95', 'engagement_time_msec', 'session_id', ...USAGE_COUNTERS,
].sort();

const jour: Day = {
  day: '2026-10-15',
  counts: { tr_google: 40, tr_cache: 5, skipped: 12, compose_insert: 2 },
  lat: [300, 900, 1200, 1500, 4000],
  seen: 5,
  env: { has7tv: true, hasBttv: false, hasFfz: true, localApi: false },
};

describe('the daily usage event', () => {
  const ev = buildEvent(jour, defaultSettings(), '1.0.0', 'brave', 'fr');

  it('carries exactly the fields the privacy policy lists', () => {
    expect(Object.keys(ev).sort()).toEqual(PROMIS);
  });

  it('stays within what GA4 accepts: 25 params, short values', () => {
    expect(Object.keys(ev).length).toBeLessThanOrEqual(25);
    for (const v of Object.values(ev)) expect(String(v).length).toBeLessThanOrEqual(100);
  });

  it('counts, and nothing that could carry a message', () => {
    expect(ev.tr_google).toBe(40);
    expect(ev.err_provider).toBe(0);
    expect(ev.has_7tv).toBe(1);
    expect(ev.has_bttv).toBe(0);
    expect(ev.has_ffz).toBe(1);
    expect(ev.lat_p50).toBe(1200);
    expect(ev.lat_p95).toBe(4000);
    expect(ev.ui_lang).toBe('fr'); // 'auto' resolved to the browser's language
    expect(ev.session_id).toBe(20261015);
  });
});

describe('usage helpers', () => {
  it('adds counts without inventing keys', () => {
    expect(addCounts({ skipped: 1 }, { skipped: 2, tr_local: 1 })).toEqual({ skipped: 3, tr_local: 1 });
    expect(addCounts({}, { nope: 3 } as never)).toEqual({});
    // S-05: a page sends the counts, so a string, a negative or an infinite one is not a count.
    expect(addCounts({ skipped: 1 }, { skipped: '5', tr_local: -2 } as never)).toEqual({ skipped: 1 });
    expect(addCounts({}, { skipped: Infinity } as never)).toEqual({});
    expect(addCounts({}, { skipped: 1e12 })).toEqual({ skipped: 1_000_000 });
  });

  it('takes a nearest-rank percentile', () => {
    expect(percentile([], 50)).toBe(0);
    expect(percentile([5], 95)).toBe(5);
    expect(percentile([1, 2, 3, 4, 100], 50)).toBe(3);
  });
});

// P03 and P14: a storage write per counted line, a permissions call per line on Firefox,
// and an hourly alarm for readers who never opted in.
describe('the worker side of the counts', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  async function boot(opts: { firefox?: boolean; consent: boolean }) {
    vi.resetModules();
    vi.useFakeTimers();
    const writes: unknown[] = [];
    const alarms = new Map<string, unknown>();
    const getAll = vi.fn(async () => ({ data_collection: opts.consent ? ['technicalAndInteraction'] : [] }));
    vi.stubGlobal('chrome', {
      runtime: { getURL: () => (opts.firefox ? 'moz-extension://x/' : 'chrome-extension://x/') },
      storage: { local: { get: async () => ({}), set: async (o: unknown) => void writes.push(o), remove: async () => undefined } },
      permissions: { getAll, onAdded: { addListener: () => undefined }, onRemoved: { addListener: () => undefined } },
      alarms: {
        get: async (n: string) => alarms.get(n),
        create: async (n: string) => void alarms.set(n, {}),
        clear: async (n: string) => void alarms.delete(n),
        onAlarm: { addListener: () => undefined },
      },
    });
    const settings = { ...defaultSettings(), usageStats: opts.consent };
    const usage = await import('./usage');
    usage.installUsage(() => settings, () => undefined);
    await vi.advanceTimersByTimeAsync(10);
    return { usage, writes, alarms, getAll };
  }

  it('writes a burst of counted lines once, and asks Firefox for consent once', async () => {
    const { usage, writes, getAll } = await boot({ firefox: true, consent: true });
    getAll.mockClear();
    writes.length = 0;
    for (let i = 0; i < 50; i++) await usage.recordTranslation('google', false, 40);
    expect(getAll).not.toHaveBeenCalled();
    expect(writes).toHaveLength(0);
    await vi.advanceTimersByTimeAsync(2000);
    expect(writes).toHaveLength(1);
  });

  it('has the hourly alarm only while consent is given', async () => {
    const off = await boot({ consent: false });
    expect(off.alarms.has('kt-usage')).toBe(false);
    const on = await boot({ consent: true });
    expect(on.alarms.has('kt-usage')).toBe(true);
    await on.usage.syncUsageAlarm();
    expect(on.alarms.has('kt-usage')).toBe(true);
  });
});
