import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildSyntheticId,
  findChatPanel,
  extractMessageText,
  extractUsername,
  findAllRows,
  findChatContainer,
  findComposer,
  isShown,
  matchesMessageRow,
  pickFirst,
  pickInjectionTarget,
  SELECTORS,
} from './selectors';
import { detectExtensions } from './platform';
import {
  ffzNoticeLine,
  ffzRow,
  nativeChat,
  nativeMeRow,
  nativeEmote,
  nativeRow,
  replayChat,
  SEVENTV_WELCOME,
  seventvChat,
  seventvEmote,
  seventvRow,
  seventvVodRow,
  vodRow,
} from './twitchFixtures';

/** Mount markup and return the first row it holds. */
function mount(html: string): Element {
  document.body.innerHTML = html;
  return findAllRows(document.body)[0]!;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('extractUsername, per DOM family', () => {
  it('reads the login natively and with BTTV', () => {
    expect(extractUsername(mount(nativeChat(nativeRow('hola', 'Viewer_One'))))).toBe('viewer_one');
  });

  it('reads the login FFZ puts on the row', () => {
    expect(extractUsername(mount(nativeChat(ffzRow('hola', 'Viewer_Two'))))).toBe('viewer_two');
  });

  it('reads the 7TV username', () => {
    expect(extractUsername(mount(seventvChat(seventvRow('hola', 'Viewer_Three'))))).toBe('viewer_three');
  });

  it('reads replay rows, native and 7TV', () => {
    expect(extractUsername(mount(replayChat(vodRow('hola', 'Viewer_Four'))))).toBe('viewer_four');
    expect(extractUsername(mount(replayChat(seventvVodRow('hola', 'Viewer_Five'))))).toBe('viewer_five');
  });

  it('returns undefined when there is no name at all', () => {
    expect(extractUsername(mount(seventvChat(SEVENTV_WELCOME)))).toBeUndefined();
  });
});

describe('extractMessageText, per DOM family', () => {
  it('takes the body without the badges, the name or the separator', () => {
    expect(extractMessageText(mount(nativeChat(nativeRow('hola amigos'))))).toBe('hola amigos');
    expect(extractMessageText(mount(nativeChat(ffzRow('hola amigos'))))).toBe('hola amigos');
    expect(extractMessageText(mount(seventvChat(seventvRow('hola amigos'))))).toBe('hola amigos');
  });

  it('leaves the timestamp of a replay row out', () => {
    expect(extractMessageText(mount(replayChat(vodRow('hola amigos', 'v', '1:23'))))).toBe('hola amigos');
    expect(extractMessageText(mount(replayChat(seventvVodRow('hola amigos'))))).toBe('hola amigos');
  });

  it('keeps emotes out: a native emote is an image between two fragments', () => {
    const row = mount(
      nativeChat(nativeRow('hola ', 'v', `${nativeEmote('Kappa')}<span class="text-fragment" data-a-target="chat-message-text"> amigos</span>`)),
    );
    expect(extractMessageText(row)).toBe('hola amigos');
  });

  it('keeps 7TV emotes out', () => {
    document.body.innerHTML = seventvChat(seventvRow('hola'));
    document.querySelector('.seventv-chat-message-body')!.insertAdjacentHTML('beforeend', seventvEmote('KEKW'));
    expect(extractMessageText(findAllRows(document.body)[0]!)).toBe('hola');
  });

  it('treats the 7TV welcome line as empty', () => {
    expect(extractMessageText(mount(seventvChat(SEVENTV_WELCOME)))).toBe('');
  });

  // A reply quotes its parent above the body (RECON/<config>/live, "Replying to"). Translating
  // the quote would translate someone else's message on this line.
  it('reads the body of a reply, not the quoted parent', () => {
    const native = nativeRow('my answer').replace(
      '<div class="Layout-sc-1xcs6mc-0 glFavL chat-line__message-container"><div class="Layout-sc-1xcs6mc-0"></div>',
      '<div class="Layout-sc-1xcs6mc-0 glFavL chat-line__message-container"><div class="Layout-sc-1xcs6mc-0"><div class="Layout-sc-1xcs6mc-0 jGtuXC"><div class="Layout-sc-1xcs6mc-0 brOIRu"><p title="the parent" class="CoreText-sc-1txzju1-0 OLUUU">Replying to <span dir="auto">@someone</span>: <span dir="auto">the parent</span></p></div></div></div>',
    );
    expect(extractMessageText(mount(nativeChat(native)))).toBe('my answer');
    const sevenReply = seventvRow('my answer').replace(
      'tabindex="0">',
      'tabindex="0"><div class="seventv-reply-part"><div class="seventv-reply-message-part">Replying to @someone: the parent</div></div>',
    );
    expect(extractMessageText(mount(seventvChat(sevenReply)))).toBe('my answer');
  });

  // PLAN P18: lines Twitch or an extension wraps in a notice. Only what the viewer wrote is read.
  it('reads a first message inside an FFZ notice line, without the notice text', () => {
    document.body.innerHTML = nativeChat(ffzNoticeLine('база'));
    const rows = findAllRows(document.body);
    expect(rows).toHaveLength(1);
    expect(extractMessageText(rows[0]!)).toBe('база');
    expect(extractUsername(rows[0]!)).toBe('viewer_six');
  });

  it('reads a /me line, set in italics', () => {
    expect(extractMessageText(mount(nativeChat(nativeMeRow('salut tout le monde'))))).toBe('salut tout le monde');
  });

  it('never reads our own translation back', () => {
    const row = mount(nativeChat(nativeRow('hola')));
    pickInjectionTarget(row).insertAdjacentHTML(
      'beforeend',
      '<div class="kt-translation"><span data-a-target="chat-message-text">hello</span></div>',
    );
    expect(extractMessageText(row)).toBe('hola');
  });
});

describe('row and container selectors', () => {
  it('finds the row and its injection target inside the message', () => {
    const row = mount(nativeChat(nativeRow('hola')));
    expect(matchesMessageRow(row)).toBe(true);
    expect(findAllRows(document.body)).toHaveLength(1);
    expect(pickInjectionTarget(row).classList.contains('chat-line__message-container')).toBe(true);
  });

  it('injects inside the 7TV message container', () => {
    const row = mount(seventvChat(seventvRow('hola')));
    expect(pickInjectionTarget(row).classList.contains('seventv-chat-message-container')).toBe(true);
  });

  it('injects into the FFZ and replay rows themselves', () => {
    const ffz = mount(nativeChat(ffzRow('hola')));
    expect(pickInjectionTarget(ffz)).toBe(ffz);
    const vod = mount(replayChat(vodRow('hola')));
    expect(pickInjectionTarget(vod)).toBe(vod);
  });

  it('lists 7TV first, so its list wins when both are present', () => {
    document.body.innerHTML = nativeChat(nativeRow('a')) + seventvChat(seventvRow('b'));
    expect(pickFirst(document, SELECTORS.containers)?.tagName).toBe('MAIN');
  });

  it('finds the Slate composer', () => {
    document.body.innerHTML = nativeChat('');
    expect(findComposer()?.hasAttribute('data-slate-editor')).toBe(true);
  });
});

describe('findChatContainer', () => {
  it('finds the list of each family', () => {
    document.body.innerHTML = nativeChat(nativeRow('a'));
    expect(findChatContainer(document)?.getAttribute('role')).toBe('log');
    document.body.innerHTML = seventvChat(seventvRow('a'));
    expect(findChatContainer(document)?.classList.contains('seventv-chat-list')).toBe(true);
    document.body.innerHTML = replayChat(vodRow('a'));
    expect(findChatContainer(document)?.tagName).toBe('UL');
  });

  // Chat not rendered yet: returning null keeps the caller polling instead of
  // binding to an element that will never receive a message.
  it('returns null while no candidate holds a row', () => {
    document.body.innerHTML = nativeChat('');
    expect(findChatContainer(document)).toBeNull();
  });

  it('prefers the list on screen over a hidden one holding rows', () => {
    document.body.innerHTML = `<div style="display:none">${nativeChat(nativeRow('old'))}</div>${seventvChat(seventvRow('new'))}`;
    expect(findChatContainer(document)?.tagName).toBe('MAIN');
  });
});

describe('findChatPanel', () => {
  it('skips a hidden copy and takes the panel holding the messages', () => {
    document.body.innerHTML = `<div style="display:none"><div class="chat-room__content" data-which="dead"></div></div>${nativeChat(nativeRow('hello'))}`;
    expect(findChatPanel(document)?.querySelector('[role="log"]')).not.toBeNull();
  });

  it('still finds the only panel when the chat has no messages yet', () => {
    document.body.innerHTML = nativeChat('');
    expect(findChatPanel(document)?.classList.contains('chat-room__content')).toBe(true);
  });

  it('finds the replay panel', () => {
    document.body.innerHTML = replayChat(vodRow('a'));
    expect(findChatPanel(document)?.classList.contains('video-chat')).toBe(true);
  });

  it('returns null when there is no chat panel at all', () => {
    document.body.innerHTML = '<div></div>';
    expect(findChatPanel(document)).toBeNull();
  });
});

describe('buildSyntheticId', () => {
  it('uses the 7TV message id', () => {
    const row = mount(seventvChat(seventvRow('hola', 'v', 'abc-123')));
    expect(buildSyntheticId(row, 'v', 'hola')).toMatch(/^mabc-123_h/);
  });

  // Twitch never reuses a row node, so the same words twice from the same person are two
  // messages: both must be translated, not the second dropped as already seen.
  it('tells apart two native rows with the same author and text', () => {
    document.body.innerHTML = nativeChat(nativeRow('LUL') + nativeRow('LUL'));
    const [a, b] = findAllRows(document.body);
    expect(buildSyntheticId(a!, 'viewer_one', 'LUL')).not.toBe(buildSyntheticId(b!, 'viewer_one', 'LUL'));
    expect(buildSyntheticId(a!, 'viewer_one', 'LUL')).toBe(buildSyntheticId(a!, 'viewer_one', 'LUL'));
  });

  it('changes when the text of the same row changes', () => {
    const row = mount(nativeChat(nativeRow('a')));
    expect(buildSyntheticId(row, 'u', 'a')).not.toBe(buildSyntheticId(row, 'u', '<message deleted>'));
  });
});

describe('detectExtensions', () => {
  it('sees each extension by its own trace', () => {
    document.body.innerHTML = nativeChat(nativeRow('a'));
    expect(detectExtensions()).toEqual({ seventv: false, bttv: false, ffz: false });
    document.body.innerHTML = seventvChat(seventvRow('a'));
    expect(detectExtensions().seventv).toBe(true);
    document.body.innerHTML = nativeChat(ffzRow('a'));
    expect(detectExtensions().ffz).toBe(true);
    document.body.innerHTML = `<link rel="stylesheet" href="chrome-extension://x/betterttv.css">${nativeChat(nativeRow('a'))}`;
    expect(detectExtensions().bttv).toBe(true);
  });
});

// The two container watchers ask this twice a second while the chat runs.
// Asked through boxes, each question forced a layout of a page the chat keeps
// dirty; computed style answers it without one.
describe('isShown', () => {
  it('asks computed style, not geometry, where the browser can', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const check = vi.fn(() => false);
    const rects = vi.spyOn(el, 'getClientRects');
    Object.assign(el, { checkVisibility: check });
    expect(isShown(el)).toBe(false);
    expect(check).toHaveBeenCalledTimes(1);
    expect(rects).not.toHaveBeenCalled();
    el.remove();
  });

  it('falls back on the box count elsewhere', () => {
    const el = document.createElement('div');
    // The DOM this suite runs on has checkVisibility; Firefox before 106 does not.
    Object.assign(el, { checkVisibility: undefined });
    const rects = vi.spyOn(el, 'getClientRects').mockReturnValue([{}] as unknown as DOMRectList);
    expect(isShown(el)).toBe(true);
    expect(rects).toHaveBeenCalledTimes(1);
  });
});

// Chrome gives a content script's isolated world `customElements === null`. Calling `.get`
// on it threw at startup and nothing was ever mounted on a live page.
describe('detectExtensions in an isolated world', () => {
  it('survives a null customElements', () => {
    const real = globalThis.customElements;
    Object.defineProperty(globalThis, 'customElements', { value: null, configurable: true });
    try {
      document.body.innerHTML = nativeChat(nativeRow('a'));
      expect(detectExtensions().seventv).toBe(false);
    } finally {
      Object.defineProperty(globalThis, 'customElements', { value: real, configurable: true });
    }
  });
});
