import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatObserver } from './observer';
import { nativeChat, nativeRow, seventvChat, seventvRow } from './twitchFixtures';

interface Recorded {
  disconnected: boolean;
  target: unknown;
  cb?: MutationCallback;
}

const created: Recorded[] = [];

class RecordingObserver {
  private rec: Recorded = { disconnected: false, target: undefined };
  // The callback used to be dropped on the floor, which meant no test could
  // deliver a mutation and the whole mutation-handling branch was unreachable
  // from here. A recycled row bug lived in it.
  constructor(cb: MutationCallback) {
    this.rec.cb = cb;
    created.push(this.rec);
  }
  observe(target: unknown): void {
    this.rec.target = target;
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
