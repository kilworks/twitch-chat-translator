import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultSettings } from '~/shared/settings';

/**
 * P12: on a page with no chat (home, browse, search) the bar guard restarted a 12 s search for a
 * chat panel after every mutation of the page, for as long as the tab lived.
 */
vi.mock('~/shared/settingsClient', () => ({
  fetchSettings: () => Promise.resolve({ ...defaultSettings(), enabled: true, showFloatingBar: true }),
  patchSettings: () => Promise.resolve(defaultSettings()),
  watchSettings: () => () => undefined,
}));
vi.mock('./twitchApi', async (orig) => ({
  ...(await orig<object>()),
  fetchChannelLangIso: () => Promise.resolve(undefined),
}));

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('the bar guard on a page with no chat', () => {
  it('does not start a new search for the panel after a page mutation', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('chrome', {
      runtime: { id: 'kt', onMessage: { addListener: () => undefined }, getURL: (p: string) => p },
    });
    history.replaceState(null, '', '/');
    document.body.innerHTML = '<main>browse</main>';
    vi.resetModules();
    await import('./index');
    // The first search runs out: 30 attempts, 400 ms apart.
    await vi.advanceTimersByTimeAsync(14_000);

    const delays: number[] = [];
    const real = globalThis.setTimeout;
    vi.spyOn(globalThis, 'setTimeout').mockImplementation(((fn: () => void, ms?: number) => {
      delays.push(ms ?? 0);
      return real(fn, ms);
    }) as typeof setTimeout);
    document.body.insertAdjacentHTML('beforeend', '<section>more of the page</section>');
    await vi.advanceTimersByTimeAsync(2_000);

    expect(delays).not.toContain(400);
  });
});
