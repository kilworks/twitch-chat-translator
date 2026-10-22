import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { toastSpy, sendSpy } = vi.hoisted(() => ({ toastSpy: vi.fn(), sendSpy: vi.fn() }));
vi.mock('./injector', () => ({ showToast: toastSpy }));
vi.mock('~/shared/messages', () => ({ send: sendSpy }));

import { insertIntoComposer, isSuggestionOpen, readComposerText } from './composeUi';

const writeText = vi.fn(() => Promise.resolve());

beforeEach(() => {
  toastSpy.mockReset();
  sendSpy.mockReset();
  // No editor reachable in the page world unless a test says otherwise.
  sendSpy.mockResolvedValue({ type: 'error', payload: { message: 'no editor' } });
  writeText.mockReset();
  writeText.mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { ...globalThis.navigator, clipboard: { writeText } });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('readComposerText', () => {
  it('reads a textarea value', () => {
    const el = document.createElement('textarea');
    el.value = 'bonjour';
    expect(readComposerText(el)).toBe('bonjour');
  });

  it('reads an input value', () => {
    const el = document.createElement('input');
    el.value = 'hola';
    expect(readComposerText(el)).toBe('hola');
  });

  it('reads a contenteditable as text', () => {
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    el.textContent = 'こんにちは';
    expect(readComposerText(el)).toBe('こんにちは');
  });

  // RECON/<config>/compose: an empty Slate block holds a zero-width no-break space.
  it('reads an empty Slate editor as empty', () => {
    const el = document.createElement('div');
    el.innerHTML =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-zero-width="n" data-slate-length="0">\uFEFF<br></span></span></span></div>';
    expect(readComposerText(el).trim()).toBe('');
  });

  it('spells an emote drawn in the box as its name, one line per Slate block', () => {
    const el = document.createElement('div');
    el.innerHTML =
      '<div data-slate-node="element"><span data-slate-node="text">hola </span><img alt="Kappa"><span data-slate-node="text"> amigos</span></div>' +
      '<div data-slate-node="element"><span data-slate-node="text">dos</span></div>';
    expect(readComposerText(el)).toBe('hola Kappa amigos\ndos');
  });

  it('returns empty string for an empty composer', () => {
    expect(readComposerText(document.createElement('div'))).toBe('');
  });
});

describe('insertIntoComposer', () => {
  it('copies without touching the composer in copy mode', () => {
    const el = document.createElement('textarea');
    el.value = 'salut';
    insertIntoComposer(el, 'hi', 'copy');

    expect(writeText).toHaveBeenCalledWith('hi');
    expect(el.value).toBe('salut');
    expect(toastSpy).toHaveBeenCalled();
  });

  // Kick's native textarea layouts: the value has to go through the prototype
  // setter or React's value tracker never sees the change.
  it('replaces a textarea value and fires input so the page notices', () => {
    const el = document.createElement('textarea');
    el.value = 'bonjour';
    document.body.appendChild(el);
    const seen = vi.fn();
    el.addEventListener('input', seen);

    insertIntoComposer(el, 'hello', 'insert');

    expect(el.value).toBe('hello');
    expect(seen).toHaveBeenCalled();
    expect(writeText).not.toHaveBeenCalled();
  });

  // A rich contenteditable that ignores the synthetic insert is exactly what the
  // clipboard fallback exists for: the translation must not be silently lost.
  it('falls back to the clipboard when the editor ignores the insert', () => {
    vi.useFakeTimers();
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    el.textContent = 'bonjour';
    document.body.appendChild(el);

    insertIntoComposer(el, 'hello', 'insert');
    expect(writeText).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(writeText).toHaveBeenCalledWith('hello');
    expect(toastSpy).toHaveBeenCalled();
  });

  // The "did it apply?" probe compares before and after, which cannot distinguish
  // success from failure when the translation equals what was typed. Guessing wrong
  // here overwrites the user's clipboard, so it must not guess.
  it('leaves the clipboard alone when the translation matches what was typed', () => {
    vi.useFakeTimers();
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    el.textContent = 'ok';
    document.body.appendChild(el);
    el.addEventListener('beforeinput', (e) => {
      el.textContent = (e as InputEvent).data ?? '';
    });

    insertIntoComposer(el, 'ok', 'insert');
    vi.advanceTimersByTime(200);

    expect(writeText).not.toHaveBeenCalled();
  });

  it('falls back to a DOM replace when no editor answers in the page world', async () => {
    vi.useFakeTimers();
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    el.textContent = 'bonjour';
    document.body.appendChild(el);
    // Stand in for the editor honouring the synthetic beforeinput.
    el.addEventListener('beforeinput', (e) => {
      el.textContent = (e as InputEvent).data ?? '';
    });

    insertIntoComposer(el, 'hello', 'insert');
    await vi.advanceTimersByTimeAsync(200);

    expect(sendSpy).toHaveBeenCalledWith({ type: 'compose.write', text: 'hello' });
    expect(el.textContent).toBe('hello');
    expect(writeText).not.toHaveBeenCalled();
  });

  // Slate written through its own API (background/slateWrite): no DOM event on top,
  // which would write the words a second time.
  it('leaves the box to the editor when the page-world write answers', async () => {
    vi.useFakeTimers();
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    el.textContent = 'bonjour';
    document.body.appendChild(el);
    const dom = vi.fn();
    el.addEventListener('beforeinput', dom);
    sendSpy.mockImplementation(async () => {
      el.textContent = 'hello';
      return { type: 'ack' };
    });

    insertIntoComposer(el, 'hello', 'insert');
    await vi.advanceTimersByTimeAsync(200);

    expect(dom).not.toHaveBeenCalled();
    expect(el.textContent).toBe('hello');
    expect(writeText).not.toHaveBeenCalled();
  });
});

// RECON/k01: signed in, Twitch opens `.autocomplete-match-list` for `:emote` and `@mention`.
// Tab then belongs to that list, and the preview must not cover it.
describe('isSuggestionOpen', () => {
  const open = (cls: string, height: number) => {
    const el = document.createElement('div');
    el.className = cls;
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ height } as DOMRect);
    document.body.appendChild(el);
  };

  it("sees Twitch's own completion list when it has a box", () => {
    open('InjectLayout-sc-1i43xsx-0 autocomplete-match-list hMZHFO', 252);
    expect(isSuggestionOpen()).toBe(true);
  });

  it('ignores a list collapsed to nothing, and the page without one', () => {
    expect(isSuggestionOpen()).toBe(false);
    open('autocomplete-match-list', 0);
    expect(isSuggestionOpen()).toBe(false);
  });

  it("sees 7TV's popup too", () => {
    open('floating-container', 120);
    expect(isSuggestionOpen()).toBe(true);
  });
});
