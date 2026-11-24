import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nativeChat } from './twitchFixtures';
import { getHint, setHint } from '../background/memo';

// P3-2: the glyph alone did not say Tab inserts the translation. The key's name
// sits beside it (the verb is in the tooltip) until the reader has inserted
// once or seen five previews, then it is remembered and gone.

vi.mock('./injector', () => ({ showToast: vi.fn() }));

const stored: Record<string, unknown> = {};
const local = {
  get: vi.fn(async (k: string) => (k in stored ? { [k]: stored[k] } : {})),
  set: vi.fn(async (o: Record<string, unknown>) => void Object.assign(stored, o)),
};

beforeEach(() => {
  vi.resetModules();
  for (const k of Object.keys(stored)) delete stored[k];
  local.get.mockClear();
  local.set.mockClear();
  // The content script has no storage of its own: its hint counter goes to the worker's memo.
  vi.stubGlobal('chrome', {
    storage: { local },
    runtime: {
      lastError: undefined,
      sendMessage: (m: { type: string; value?: number | boolean }, cb: (r: unknown) => void) => {
        void (async () => {
          if (typeof chrome === 'undefined') return; // the test ended while the message was in flight
          if (m.type === 'hint.get') cb({ type: 'hint', value: await getHint() });
          else if (m.type === 'hint.set') cb((await setHint(m.value)) ? { type: 'ack' } : { type: 'error', payload: { message: 'no' } });
        })();
      },
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

const flush = () => new Promise((r) => setTimeout(r, 0));

async function mounted() {
  const ui = await import('./composeUi');
  document.body.innerHTML = nativeChat('');
  document.querySelector('[data-a-target="chat-input"]')!.classList.add('composer');
  const composer = document.querySelector<HTMLElement>('.composer')!;
  ui.mountComposePreview(composer, 'en', { onInsert: () => {} });
  await flush();
  ui.updateComposePreview({ kind: 'ready', text: 'hello', provider: 'google' });
  return { ui, composer, hint: () => document.querySelector('.kt-compose-hint') };
}

describe('first-use hint', () => {
  it('names the key until the first insert, then goes for good', async () => {
    const { ui, hint } = await mounted();
    expect(hint()?.textContent).toBe('Tab');
    expect(document.querySelector<HTMLElement>('.kt-compose-insert')?.title).toContain('Insert');
    ui.noteComposeInserted();
    expect(hint()).toBeNull();
    await flush();
    expect(stored['kt.composeInsertHintDone']).toBe(true);
    // The glyph stays: only the words go.
    expect(document.querySelector('.kt-compose-insert')?.textContent).toBe('⇥');
  });

  it('is not shown again to a reader who already inserted', async () => {
    stored['kt.composeInsertHintDone'] = true;
    const { hint } = await mounted();
    expect(hint()).toBeNull();
  });

  it('names Ctrl/Cmd+Enter when that is the key', async () => {
    const { ui, hint } = await mounted();
    ui.setComposeInsertKey('ctrl-enter');
    expect(hint()?.textContent).toBe('Ctrl+Enter');
    // The tooltip still names both keyboards.
    expect(document.querySelector<HTMLElement>('.kt-compose-insert')?.title).toContain('Ctrl/Cmd+Enter');
  });

  it('names only the keyboard in use, in the language set', async () => {
    const { insertKeyName } = await import('./composeUi');
    const de = 'Einf\u00fcgen \u00b7 Strg/Cmd+Eingabe \u00b7 Esc zum Schlie\u00dfen';
    expect(insertKeyName(de, '', false)).toBe('Strg+Eingabe');
    expect(insertKeyName(de, '', true)).toBe('Cmd+Eingabe');
    expect(insertKeyName('Insert \u00b7 Tab \u00b7 Esc to dismiss', '', true)).toBe('Tab');
  });

  // A reader who reads the preview and types their own reply never inserts.
  it('retires after five previews without an insert', async () => {
    const { ui, hint } = await mounted(); // first preview
    for (let i = 2; i <= 5; i++) {
      ui.updateComposePreview({ kind: 'hidden' });
      ui.updateComposePreview({ kind: 'ready', text: `m${i}`, provider: 'google' });
      expect(hint()).not.toBeNull();
    }
    await flush();
    expect(stored['kt.composeInsertHintDone']).toBe(5);
    ui.updateComposePreview({ kind: 'hidden' });
    ui.updateComposePreview({ kind: 'ready', text: 'm6', provider: 'google' });
    expect(hint()).toBeNull();
    await flush();
    expect(stored['kt.composeInsertHintDone']).toBe(true);
  });

  // Control: refreshing the same preview while typing is not a new showing.
  it('does not count a preview refreshed while typing', async () => {
    const { ui } = await mounted();
    for (let i = 0; i < 8; i++) ui.updateComposePreview({ kind: 'ready', text: `t${i}`, provider: 'google' });
    await flush();
    expect(stored['kt.composeInsertHintDone']).toBe(1);
  });

  it('takes the key name from the tooltip of every catalogue', async () => {
    const { insertKeyName } = await import('./composeUi');
    const { CHAT_MESSAGES } = await import('./i18n');
    for (const [locale, table] of Object.entries(CHAT_MESSAGES)) {
      for (const k of ['composeInsertTip', 'composeInsertTipTab']) {
        const name = insertKeyName(table[k]!, '');
        expect({ locale, k, ok: name.length > 0 && !name.includes('Esc') }).toEqual({ locale, k, ok: true });
      }
    }
    expect(insertKeyName('no dots here', 'Tab')).toBe('Tab');
  });
});
