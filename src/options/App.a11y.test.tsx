import { render } from 'preact';
import { defaultSettings } from '~/shared/settings';
import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * UI-05: "saved" was outside any live region, so a screen reader never heard a change land.
 * UI-10: the interface-language list showed focus as a faint tint, and Tab left it open.
 */
vi.mock('~/shared/messages', () => ({
  send: vi.fn(async (m: { type: string; payload?: object }) =>
    m.type === 'settings.get'
      ? { type: 'settings', payload: defaultSettings() }
      : m.type === 'settings.set'
        ? { type: 'settings', payload: { ...defaultSettings(), ...m.payload } }
        : { type: 'none' },
  ),
}));
const { App } = await import('./App');

const settle = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
};

async function mount(): Promise<HTMLElement> {
  vi.stubGlobal('chrome', { runtime: { getManifest: () => ({ version: '0.0.0' }) } });
  history.replaceState(null, '', '/#display');
  const root = document.createElement('div');
  document.body.append(root);
  render(<App />, root);
  await settle();
  return root;
}

afterEach(() => {
  document.body.textContent = '';
  vi.unstubAllGlobals();
});

describe('the saved confirmation', () => {
  it('is said in the status region, not only drawn', async () => {
    const root = await mount();
    const select = root.querySelector<HTMLSelectElement>('#panel-display select')!;
    select.value = 'de';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();
    const live = [...root.querySelectorAll('[role=status]')].map((e) => e.textContent).join(' ');
    expect(live).toContain('saved');
  });
});

describe('the interface language list', () => {
  const open = async (root: HTMLElement) => {
    root.querySelector<HTMLButtonElement>('button[aria-haspopup="listbox"]')!.click();
    await settle();
    return root.querySelector('[role=listbox]');
  };

  it('draws a solid ring on the focused row, not a tint', async () => {
    const root = await mount();
    const list = await open(root);
    expect(list?.querySelector('[role=option]')?.className).toContain('focus:outline-kick-primary');
  });

  it('closes when Tab leaves it', async () => {
    const root = await mount();
    expect(await open(root)).not.toBeNull();
    const outside = document.createElement('button');
    document.body.append(outside);
    const row = root.querySelector('[role=option]')!;
    row.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: outside }));
    await settle();
    expect(root.querySelector('[role=listbox]')).toBeNull();
  });
});
