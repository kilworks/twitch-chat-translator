import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatObserver } from './observer';
import { nativeChat, nativeRow, seventvChat, seventvRow } from './twitchFixtures';

interface Recorded {
  disconnected: boolean;
  target: unknown;
  targets: unknown[];
  options: unknown[];
  cb?: MutationCallback;
}

const created: Recorded[] = [];

class RecordingObserver {
  private rec: Recorded = { disconnected: false, target: undefined, targets: [], options: [] };
  // The callback used to be dropped on the floor, which meant no test could
  // deliver a mutation and the whole mutation-handling branch was unreachable
  // from here. A recycled row bug lived in it.
  constructor(cb: MutationCallback) {
    this.rec.cb = cb;
    created.push(this.rec);
  }
  observe(target: unknown, options?: unknown): void {
    // The first node observed stays the target: a list observer also watches rows.
    if (this.rec.target === undefined) this.rec.target = target;
    this.rec.targets.push(target);
    this.rec.options.push(options);
  }
  disconnect(): void {
    this.rec.disconnected = true;
  }
  takeRecords(): unknown[] {
    return [];
  }
}

beforeEach(() => {
  created.length = 0;
  vi.stubGlobal('MutationObserver', RecordingObserver);
  // An empty 7TV list first, as when 7TV has mounted and not received a line yet, then the
  // native list holding the message: only the one with rows is bound.
  document.body.innerHTML = seventvChat('') + nativeChat(nativeRow('hola amigos', 'bob'));
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('a row whose contents change in place', () => {
  // Twitch never recycles a row node, but a row's text can still be replaced where it
  // stands (a deleted message). The row is then the mutation TARGET and never an added
  // node, so collecting candidates from added nodes alone walks straight past it.
  it('is delivered again', () => {
    const seen: string[] = [];
    const obs = new ChatObserver((m) => seen.push(m.text));
    obs.start();
    seen.length = 0;

    const liste = document.querySelector('[role="log"]')!;
    const row = liste.querySelector('.chat-line__message')!;
    const body = row.querySelector('[data-a-target="chat-message-text"]')!;
    body.textContent = 'otro mensaje distinto';

    const rec = created.find((r) => r.target === liste);
    expect(rec?.cb).toBeTypeOf('function');
    rec!.cb!(
      [{ type: 'childList', target: body, addedNodes: [...body.childNodes] } as unknown as MutationRecord],
      {} as MutationObserver,
    );

    expect(seen).toContain('otro mensaje distinto');
    obs.stop();
  });
});

describe('a new line', () => {
  it('is delivered when Twitch appends it, in both families', () => {
    for (const [chat, row] of [
      [nativeChat, nativeRow],
      [seventvChat, seventvRow],
    ] as const) {
      document.body.innerHTML = chat(row('premier'));
      const seen: string[] = [];
      const obs = new ChatObserver((m) => seen.push(m.text));
      obs.start();
      const liste = document.querySelector('[role="log"], main.seventv-chat-list')!;
      const holder = document.createElement('div');
      holder.innerHTML = row('deuxieme', 'ana', 'id-2');
      const added = holder.firstElementChild!;
      liste.appendChild(added);
      created.find((r) => r.target === liste)!.cb!(
        [{ type: 'childList', target: liste, addedNodes: [added] } as unknown as MutationRecord],
        {} as MutationObserver,
      );
      obs.stop();
      expect(seen).toEqual(['premier', 'deuxieme']);
    }
  });
});

// 7TV can draw a message again in a new node with the same msg-id. Its id was already seen,
// so the new node was marked and skipped: the line stayed on screen without its translation
// (e2e theater, 7tv+bttv, 1/36 lines, 2026-10-23).
describe('a 7TV line drawn again in a new node', () => {
  it('is delivered again', () => {
    document.body.innerHTML = seventvChat(seventvRow('hola', 'ana', 'id-1'));
    const seen: string[] = [];
    const obs = new ChatObserver((m) => seen.push(m.text));
    obs.start();
    const liste = document.querySelector('main.seventv-chat-list')!;
    const holder = document.createElement('div');
    holder.innerHTML = seventvRow('hola', 'ana', 'id-1');
    const again = holder.firstElementChild!;
    liste.replaceChild(again, liste.querySelector('.seventv-message')!);
    created.find((r) => r.target === liste)!.cb!(
      [{ type: 'childList', target: liste, addedNodes: [again] } as unknown as MutationRecord],
      {} as MutationObserver,
    );
    obs.stop();
    expect(seen).toEqual(['hola', 'hola']);
  });
});

describe('ChatObserver lifecycle', () => {
  it('observes once attached', () => {
    const obs = new ChatObserver(() => undefined);
    obs.start();
    expect(created.length).toBeGreaterThan(0);
    obs.stop();
  });

  // The failure this guards against is silent and total: binding to a container
  // that matches the selector but holds no messages means nothing is ever
  // translated, with no error anywhere.
  it('delivers the messages already on screen when it attaches', () => {
    const seen: string[] = [];
    const obs = new ChatObserver((m) => seen.push(m.text));
    obs.start();
    obs.stop();
    expect(seen).toEqual(['hola amigos']);
  });

  // Anything left observing document.body with subtree:true keeps running for the
  // life of the page and fires on every mutation anywhere in it.
  it('disconnects everything it started when stopped', () => {
    const obs = new ChatObserver(() => undefined);
    obs.start();
    obs.stop();

    expect(created.length).toBeGreaterThan(0);
    expect(created.filter((o) => !o.disconnected)).toEqual([]);
  });

  // reset() + start() runs on every channel switch, so anything not cleaned up
  // here accumulates one more observer per navigation.
  it('does not accumulate observers across channel switches', () => {
    const obs = new ChatObserver(() => undefined);
    obs.start();
    for (let i = 0; i < 5; i++) {
      obs.reset();
      obs.start();
    }
    const live = created.filter((o) => !o.disconnected);
    obs.stop();

    // At most the two an attached observer legitimately holds.
    expect(live.length).toBeLessThanOrEqual(2);
  });
});

// RECON native/theater, 7tv/mobile: a moderator's deletion (or a timeout, or a ban) replaces
// the body with a placeholder natively and adds a `deleted` class with 7TV. A translation
// left behind would keep the moderated words on screen in another language.
describe('a deleted message', () => {
  const fire = (liste: Element, rec: Partial<MutationRecord>) =>
    created.find((r) => r.target === liste)!.cb!([rec as MutationRecord], {} as MutationObserver);

  it('loses its translation when Twitch puts the placeholder in', () => {
    document.body.innerHTML = nativeChat(nativeRow('palabras feas', 'bob'));
    const obs = new ChatObserver(() => undefined);
    obs.start();
    const liste = document.querySelector('[role="log"]')!;
    const container = liste.querySelector('.chat-line__message-container')!;
    container.insertAdjacentHTML('beforeend', '<div class="kt-translation">ugly words</div>');
    const body = liste.querySelector('[data-a-target="chat-line-message-body"]')!;
    const placeholder = document.createElement('span');
    placeholder.setAttribute('data-a-target', 'chat-deleted-message-placeholder');
    placeholder.textContent = 'message deleted by a moderator.';
    body.replaceWith(placeholder);
    fire(liste, { type: 'childList', target: placeholder.parentElement!, addedNodes: [placeholder] as unknown as NodeList });
    obs.stop();
    expect(liste.querySelector('.kt-translation')).toBeNull();
  });

  it('loses its translation when 7TV marks the line deleted', () => {
    document.body.innerHTML = seventvChat(seventvRow('palabras feas', 'bob'));
    const obs = new ChatObserver(() => undefined);
    obs.start();
    const liste = document.querySelector('main.seventv-chat-list')!;
    liste.querySelector('.seventv-chat-message-container')!.insertAdjacentHTML('beforeend', '<div class="kt-translation">ugly words</div>');
    const msg = liste.querySelector('.seventv-user-message')!;
    msg.classList.add('deleted');
    fire(liste, { type: 'attributes', target: msg, attributeName: 'class', addedNodes: [] as unknown as NodeList });
    obs.stop();
    expect(liste.querySelector('.kt-translation')).toBeNull();
  });

  it('is never sent for translation', () => {
    document.body.innerHTML = nativeChat(
      nativeRow('x').replace(
        '<span class="text-fragment" data-a-target="chat-message-text">x</span>',
        '<span data-a-target="chat-deleted-message-placeholder">message deleted by a moderator.</span>',
      ),
    );
    const seen: string[] = [];
    const obs = new ChatObserver((m) => seen.push(m.text));
    obs.start();
    obs.stop();
    expect(seen).toEqual([]);
  });
});

describe('waiting for the list', () => {
  const LISTE = nativeChat(nativeRow('hola amigos', 'bob'));
  const vivants = () => created.filter((o) => o.target && !o.disconnected);

  beforeEach(() => {
    vi.useFakeTimers();
    // A channel switch: the list is there, its rows are not yet (findChatContainer binds only a list with rows).
    document.body.innerHTML = nativeChat('');
  });
  afterEach(() => vi.useRealTimers());

  // The route poll and the container guard both call reset(). Each reset used
  // to start its own poll without stopping the pending one, and every chain
  // ended in attach(): the later attach overwrote the fields of the earlier one
  // and left its two observers connected for the life of the page.
  it('attaches once however many resets arrive meanwhile', () => {
    const obs = new ChatObserver(() => undefined);
    obs.start();
    obs.reset();
    obs.reset();
    document.body.innerHTML = LISTE;
    vi.advanceTimersByTime(2000);
    expect(vivants()).toHaveLength(2);
    obs.stop();
  });

  it('attaches nothing once stopped, even with an older poll pending', () => {
    const obs = new ChatObserver(() => undefined);
    obs.start();
    obs.reset();
    obs.stop();
    document.body.innerHTML = LISTE;
    vi.advanceTimersByTime(2000);
    expect(vivants()).toHaveLength(0);
  });
});

// P07: the list observer took every class change in the subtree, and 7TV, FFZ and BTTV
// change classes on hover, focus and animation all the time.
describe('class changes', () => {
  it('are watched on the row and the node holding the deleted mark, not across the list', () => {
    document.body.innerHTML = seventvChat(seventvRow('palabras', 'bob'));
    const obs = new ChatObserver(() => undefined);
    obs.start();
    const liste = document.querySelector('main.seventv-chat-list')!;
    const rec = created.find((r) => r.target === liste)!;
    expect(rec.options[0]).toEqual({ childList: true, subtree: true });
    const row = liste.querySelector('.seventv-message')!;
    const msg = liste.querySelector('.seventv-user-message')!;
    expect(rec.targets).toEqual([liste, row, msg]);
    expect(rec.options.slice(1).every((o) => (o as { subtree?: boolean }).subtree !== true)).toBe(true);
    obs.stop();
  });
});

// P13: with no rows the attach poll scanned the document twice a second for the life of the tab.
describe('the wait for a chat with no rows', () => {
  afterEach(() => vi.useRealTimers());

  it('backs off, and does not scan at all while the tab is hidden', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
    const delays: number[] = [];
    const real = globalThis.setTimeout;
    vi.spyOn(globalThis, 'setTimeout').mockImplementation(((fn: () => void, ms?: number) => {
      delays.push(ms ?? 0);
      return real(fn, ms);
    }) as typeof setTimeout);
    const obs = new ChatObserver(() => undefined);
    obs.start();
    await vi.advanceTimersByTimeAsync(5 * 60_000);
    obs.stop();
    expect(delays[0]).toBe(500);
    expect(delays).toContain(1000);
    expect(delays).toContain(5000);
    // Two minutes of 500 ms polls would have been 600 scans in five minutes.
    expect(delays.length).toBeLessThan(120);

    delays.length = 0;
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    const scan = vi.spyOn(document, 'querySelectorAll');
    const hiddenObs = new ChatObserver(() => undefined);
    hiddenObs.start();
    await vi.advanceTimersByTimeAsync(10_000);
    hiddenObs.stop();
    expect(scan).not.toHaveBeenCalled();
    Reflect.deleteProperty(document, 'hidden');
  });

  // R-05: a chat opened in a background tab never attached while pausing was off.
  it('attaches in a hidden tab when "pause when hidden" is off, and waits when it is on', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = nativeChat(nativeRow('hola amigos', 'bob'));
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    const waiting = new ChatObserver(() => undefined, () => false);
    waiting.start();
    expect(created.filter((r) => !r.disconnected)).toHaveLength(0);
    waiting.stop();
    const live = new ChatObserver(() => undefined, () => true);
    live.start();
    expect(created.filter((r) => !r.disconnected).length).toBeGreaterThan(0);
    live.stop();
    Reflect.deleteProperty(document, 'hidden');
  });
});
