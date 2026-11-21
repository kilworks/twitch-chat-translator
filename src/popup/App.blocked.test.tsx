import { render } from 'preact';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultSettings } from '~/shared/settings';
import type { Settings } from '~/shared/settings';

/**
 * T-6: the popup's "Not translated" card reads the channel from the tab's URL.
 * Twitch serves the same chat under four routes; each must resolve to the key
 * the channel lists hold, a VOD's being videos/<id>.
 */
let settings: Settings = defaultSettings();

vi.mock('~/shared/messages', () => ({
  send: vi.fn(async (m: { type: string }) => {
    if (m.type === 'settings.get') return { type: 'settings', payload: settings };
    if (m.type === 'stats.get') {
      return { type: 'stats', payload: { totalRequests: 3, totalCacheHits: 0, totalErrors: 0, byLang: {}, byProvider: {}, byChannel: {}, charsSent: 0, todayKey: 'today', history: [] } };
    }
    return { type: 'none' };
  }),
}));

const { App } = await import('./App');

function stubTab(url: string): void {
  vi.stubGlobal('chrome', {
    runtime: { getManifest: () => ({ version: '0.0.0' }), openOptionsPage: vi.fn(), getURL: (p: string) => `ext://${p}` },
    tabs: { query: vi.fn(async () => [{ url, id: 7 }]), sendMessage: vi.fn(async () => undefined), create: vi.fn() },
  });
}

async function mount(): Promise<HTMLElement> {
  const root = document.createElement('div');
  document.body.append(root);
  render(<App />, root);
  for (let i = 0; i < 6; i++) await new Promise((r) => setTimeout(r, 0));
  return root;
}

const CARD = 'Not translated: this channel is on your blocked list.';

describe('popup, blocked channel on every Twitch route', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it.each([
    ['https://www.twitch.tv/kt_blocked', 'kt_blocked'],
    ['https://www.twitch.tv/popout/kt_blocked/chat', 'kt_blocked'],
    ['https://www.twitch.tv/moderator/kt_blocked', 'kt_blocked'],
    ['https://www.twitch.tv/videos/123456789', 'videos/123456789'],
  ])('shows the card on %s', async (url, key) => {
    settings = { ...defaultSettings(), enabled: true, usageStatsAsked: true, blacklistChannels: [key] };
    stubTab(url);
    expect((await mount()).textContent).toContain(CARD);
  });

  // Control: the same routes with another channel on the list show no card.
  it.each([
    'https://www.twitch.tv/kt_blocked',
    'https://www.twitch.tv/popout/kt_blocked/chat',
    'https://www.twitch.tv/videos/123456789',
  ])('shows no card on %s when another channel is listed', async (url) => {
    settings = { ...defaultSettings(), enabled: true, usageStatsAsked: true, blacklistChannels: ['kt_other'] };
    stubTab(url);
    expect((await mount()).textContent).not.toContain(CARD);
  });
});
