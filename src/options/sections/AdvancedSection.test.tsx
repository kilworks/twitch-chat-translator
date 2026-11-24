import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'preact';
import { defaultSettings } from '~/shared/settings';

vi.mock('~/shared/messages', () => ({
  send: vi.fn(() => Promise.resolve({ type: 'noop' })),
}));

const { AdvancedSection } = await import('./AdvancedSection');

let host: HTMLDivElement | undefined;

function mount(onPatch: (p: object) => void = () => {}) {
  host = document.createElement('div');
  document.body.appendChild(host);
  render(<AdvancedSection settings={defaultSettings()} onPatch={onPatch} />, host);
  return host;
}

afterEach(() => {
  if (host) render(null, host);
  host?.remove();
  host = undefined;
});

/** P2-8: the Advanced tab spoke in engineer terms a reader cannot act on. */
describe('Advanced section wording', () => {
  it('uses no jargon', () => {
    const text = mount().textContent ?? '';
    for (const jargon of ['TTL', 'In-flight', 'hammering']) expect(text).not.toContain(jargon);
  });

  it('names the cache duration in plain words', () => {
    const el = mount();
    expect(el.querySelector('[aria-label="Keep translations for (hours)"]')).not.toBeNull();
  });

  // The chat bar and the popup now say when a channel list blocks the channel,
  // so the reset note no longer has to explain filters left active.
  it('keeps the reset note short', () => {
    const text = mount().textContent ?? '';
    expect(text).not.toContain('stop appearing');
    expect(text).toContain('"Reset all settings" puts every setting back to its default.');
  });
});

// UI-18: every keystroke saved, and clearing the box posted 0, which the schema refuses.
describe('number fields', () => {
  const type = (el: HTMLInputElement, v: string, event: 'input' | 'change') => {
    el.value = v;
    el.dispatchEvent(new Event(event, { bubbles: true }));
  };

  it('save once on commit, not on each keystroke', () => {
    const patches: object[] = [];
    const input = mount((p) => patches.push(p)).querySelector<HTMLInputElement>('[aria-label="Cache max entries"]')!;
    for (const v of ['1', '15', '150', '1500', '15000']) type(input, v, 'input');
    expect(patches).toEqual([]);
    type(input, '15000', 'change');
    expect(patches).toEqual([{ cacheMaxEntries: 15000 }]);
  });

  it('mark an empty or out-of-range value, never save it, and put the saved one back', () => {
    const patches: object[] = [];
    const input = mount((p) => patches.push(p)).querySelector<HTMLInputElement>('[aria-label="Concurrent translations"]')!;
    type(input, '99', 'input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    type(input, '99', 'change');
    type(input, '', 'change');
    expect(patches).toEqual([]);
    expect(input.value).toBe(String(defaultSettings().concurrency));
    expect(input.hasAttribute('aria-invalid')).toBe(false);
  });
});
