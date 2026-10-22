import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'preact';
import { AboutSection } from './AboutSection';
import { GITHUB_REPO, KICK_EXTENSION_URLS } from '~/shared/constants';

let host: HTMLDivElement | undefined;

function mount(extensionUrl: string) {
  vi.stubGlobal('chrome', {
    runtime: { getURL: () => extensionUrl, getManifest: () => ({ version: '1.0.0' }) },
    permissions: { getAll: () => Promise.resolve({}) },
  });
  host = document.createElement('div');
  document.body.appendChild(host);
  render(<AboutSection />, host);
  return host;
}

afterEach(() => {
  if (host) render(null, host);
  host?.remove();
  host = undefined;
  vi.unstubAllGlobals();
});

const kickLink = (el: HTMLElement) =>
  [...el.querySelectorAll<HTMLAnchorElement>('a')].find((a) => a.textContent?.trim() === 'Kick Chat Translator');

// The owner asked for the sister extension to be named here, by its own name.
describe('About tab, the Kick extension', () => {
  it('names Kick Chat Translator and links its Chrome Web Store listing', () => {
    const el = mount('chrome-extension://abc/');
    expect(el.textContent).toContain('Also for Kick');
    expect(kickLink(el)?.href).toBe(KICK_EXTENSION_URLS.chrome);
  });

  it('sends a Firefox reader to its addons.mozilla.org listing instead', () => {
    const el = mount('moz-extension://abc/');
    expect(kickLink(el)?.href).toBe(KICK_EXTENSION_URLS.firefox);
  });
});

// The copy from Kick linked the changelog, privacy policy and issues of the Kick repository.
describe('About tab, links', () => {
  it('points changelog, repository, privacy policy and issues at this repository', () => {
    const hrefs = [...mount('chrome-extension://abc/').querySelectorAll<HTMLAnchorElement>('a')].map((a) => a.href);
    const github = hrefs.filter((h) => h.startsWith('https://github.com/'));
    expect(github).toHaveLength(4);
    for (const h of github) expect(h.startsWith(`https://github.com/${GITHUB_REPO}`)).toBe(true);
  });
});
