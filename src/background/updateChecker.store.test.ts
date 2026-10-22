import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CHROME_STORE_ID, CHROME_STORE_URL, FIREFOX_ADDON_ID, GITHUB_LATEST_RELEASE_API } from '~/shared/constants';
import { getUpdateStatus, installUpdateCheck } from './updateChecker';

/**
 * The update notice was written when a release zip was the only way to get this
 * extension. On the Chrome Web Store it is wrong twice over: the copy updates
 * itself, so its owner has nothing to do with the news, and the link sends them
 * to a zip they should not install over a managed copy. During a store review
 * it is worse still, pointing at a version the store does not have yet.
 *
 * The id is what tells the two apart, and it costs no permission.
 */
function chromeStub({ id, latest }: { id: string | null; latest: string | null }) {
  const fetched = vi.fn(async () => ({
    ok: true,
    json: async () => ({ tag_name: latest }),
  }));
  vi.stubGlobal('fetch', fetched);
  vi.stubGlobal('chrome', {
    runtime: { id, getManifest: () => ({ version: '2.8.0' }) },
    storage: { local: { get: async () => ({}), set: async () => undefined } },
  });
  return fetched;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('update notice by install source', () => {

  // An AMO copy updates itself just the same. It used to fall through to the
  // zip branch, because only the Chrome id was recognised, and sent Firefox
  // users to a GitHub zip their browser would refuse to install.
  it('says nothing to an AMO install either, and asks GitHub nothing', async () => {
    const fetched = chromeStub({ id: FIREFOX_ADDON_ID, latest: 'v9.9.9' });
    expect((await getUpdateStatus(true)).updateAvailable).toBe(false);
    expect(fetched).not.toHaveBeenCalled();
  });

  /**
   * The control, and the reason the check above is not simply "never announce":
   * a zip or unpacked copy has no way to update itself, so it is exactly who the
   * notice exists for.
   */
  it('still tells a zip install, which cannot update itself', async () => {
    chromeStub({ id: 'igdnhalokbeabohdmncbmogjakkgcheb', latest: 'v9.9.9' });
    const status = await getUpdateStatus(true);
    expect(status.updateAvailable).toBe(true);
    expect(status.latest).toBe('v9.9.9');
    // The store rather than a zip: once installed from there, the copy updates
    // itself and this notice never has to appear again.
    expect(status.releaseUrl).toBe(CHROME_STORE_URL);
  });

  it('stays quiet on a zip install that is already current', async () => {
    chromeStub({ id: 'igdnhalokbeabohdmncbmogjakkgcheb', latest: 'v2.8.0' });
    expect((await getUpdateStatus(true)).updateAvailable).toBe(false);
  });

  it('survives a runtime with no id at all', async () => {
    vi.stubGlobal('fetch', async () => ({ ok: true, json: async () => ({ tag_name: 'v9.9.9' }) }));
    vi.stubGlobal('chrome', {
      runtime: { getManifest: () => ({ version: '2.8.0' }) },
      storage: { local: { get: async () => ({}), set: async () => undefined } },
    });
    // Not a store install as far as anyone can tell, so it behaves like a zip.
    expect((await getUpdateStatus(true)).updateAvailable).toBe(true);
  });

  // The tree came from the Kick build with Kick's listing id and repository: every update
  // notice would have pointed at the other product. Until this product's listing exists there
  // is no store id, and the notice sends a zip install to this product's own releases.
  it("never points at the Kick extension's listing or repository", () => {
    expect(CHROME_STORE_ID === null || /^[a-p]{32}$/.test(CHROME_STORE_ID)).toBe(true);
    expect(CHROME_STORE_ID).not.toBe('nkkjmbkmacbdkboijmnhjnblcaiclhni');
    expect(CHROME_STORE_URL).not.toMatch(/kick/i);
    expect(GITHUB_LATEST_RELEASE_API).not.toMatch(/kick/i);
    if (CHROME_STORE_ID === null) expect(CHROME_STORE_URL).toMatch(/^https:\/\/github\.com\/.+\/releases\/latest$/);
  });

  // Same failure mode for Firefox: an id that drifts from the manifest's would
  // put the GitHub notice back in front of every AMO user, and nothing else
  // would notice.
  it('recognises the id the Firefox manifest fixes', () => {
    const manifest = readFileSync(join(process.cwd(), 'manifest.config.ts'), 'utf8');
    expect(manifest.match(/gecko:\s*\{\s*id:\s*'([^']+)'/)?.[1]).toBe(FIREFOX_ADDON_ID);
  });
});

/**
 * The toolbar icon carries the news as well, so it is seen without opening the
 * popup, and it follows every check: set when a newer release exists, cleared
 * otherwise, never on a store copy.
 */
function iconStub({ id, latest, alarm }: { id: string | null; latest: string | null; alarm?: object }) {
  const ok = () => Promise.resolve();
  const icon = { setBadgeText: vi.fn(ok), setBadgeBackgroundColor: vi.fn(ok), setBadgeTextColor: vi.fn(ok) };
  const listeners: unknown[] = [];
  const alarms = {
    get: vi.fn(async () => alarm),
    create: vi.fn(ok),
    onAlarm: {
      addListener: vi.fn((f: unknown) => listeners.push(f)),
      hasListener: vi.fn((f: unknown) => listeners.includes(f)),
    },
  };
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ tag_name: latest }) })));
  vi.stubGlobal('chrome', {
    runtime: { id, getManifest: () => ({ version: '2.8.0' }) },
    storage: { local: { get: async () => ({}), set: async () => undefined } },
    action: icon,
    alarms,
  });
  return { icon, alarms, listeners };
}

describe('update badge on the toolbar icon', () => {
  const ZIP = 'igdnhalokbeabohdmncbmogjakkgcheb';

  it('shows an arrow, readable on the purple, when a newer release exists', async () => {
    const { icon } = iconStub({ id: ZIP, latest: 'v9.9.9' });
    await getUpdateStatus(true);
    expect(icon.setBadgeText).toHaveBeenLastCalledWith({ text: '↑' });
    expect(icon.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#9146FF' });
    expect(icon.setBadgeTextColor).toHaveBeenCalledWith({ color: '#FFFFFF' });
  });

  it('clears it once the copy is current, and on a store copy', async () => {
    const zip = iconStub({ id: ZIP, latest: 'v2.8.0' });
    await getUpdateStatus(true);
    expect(zip.icon.setBadgeText).toHaveBeenLastCalledWith({ text: '' });
    const store = iconStub({ id: FIREFOX_ADDON_ID, latest: 'v9.9.9' });
    await getUpdateStatus(true);
    expect(store.icon.setBadgeText).toHaveBeenLastCalledWith({ text: '' });
  });

  it('schedules the six-hour check once, without resetting an alarm that exists', async () => {
    const fresh = iconStub({ id: ZIP, latest: 'v9.9.9' });
    installUpdateCheck();
    installUpdateCheck();
    await vi.waitFor(() => expect(fresh.alarms.create).toHaveBeenCalledWith('kt.update', { periodInMinutes: 360 }));
    expect(fresh.listeners).toHaveLength(1);

    const running = iconStub({ id: ZIP, latest: 'v9.9.9', alarm: { name: 'kt.update' } });
    installUpdateCheck();
    await Promise.resolve();
    await Promise.resolve();
    expect(running.alarms.create).not.toHaveBeenCalled();
  });
});
