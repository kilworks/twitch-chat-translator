/**
 * A Cantonese chat, on demand.
 *
 * Paste this into the console of any twitch.tv channel page with the extension
 * running. It appends synthetic message rows to the live chat list, shaped the
 * way Twitch or 7TV shapes its own, so the extension's observer picks them up and runs
 * the whole real path on them: detection, source-language hint, provider chain,
 * injected translation, flag, cache.
 *
 * Why it exists: every other language in this product was measured on harvested
 * lines, on Kick before this port. Cantonese cannot be, because there are next to no Hong Kong
 * channels and waiting for one is not a plan. The
 * detection rule has a bench of its own in test/e2e/canto-bench.mjs;
 * what a bench cannot show is the extension actually reading a line off a page
 * and putting a translation under it. This does that.
 *
 * What it does NOT do: it does not send anything to Twitch. The rows exist in your
 * DOM and nowhere else, nobody in the channel sees them, and a refresh removes
 * every trace. It posts nothing, stores nothing, and transmits nothing.
 *
 *   1. open any twitch.tv channel page with a live chat
 *   2. paste this whole file, press enter
 *   3. watch the rows arrive and the translations appear under them
 *
 *   ktFakeChat.stop()          stop the stream
 *   ktFakeChat.burst()         send the whole corpus at once
 *   ktFakeChat.send('你好')     send one line of your own
 *   ktFakeChat.clear()         remove every row this script added
 *   ktFakeChat.start(1500)     restart at a different interval, in ms
 */
(() => {
  const MARK = 'data-kt-fake';

  // Vernacular Cantonese, the register a Hong Kong chat types. Deliberately
  // mixed: lines carrying an obvious marker, lines carrying only a two-character
  // one, lines code-mixed with English, and a few in standard traditional
  // Chinese so the difference in what the extension does with them is visible on
  // the same screen.
  const LINES = [
    ['yue', '佢哋去咗邊度呀'],
    ['yue', '你唔好玩啦'],
    ['yue', '呢個位好正'],
    ['yue', '有冇人喺度'],
    ['yue', '點解唔開槍'],
    ['yue', '我哋而家真係好攰'],
    ['yue', '邊個贏咗'],
    ['yue', '好嘢'],
    ['yue', '唔該晒老細'],
    ['yue', '睇到我眼瞓'],
    ['yue', '佢真係好搞笑㗎'],
    ['yue', '屋企人嗌我食飯'],
    ['yue', '咁都俾佢贏'],
    ['yue', '我諗住瞓覺先'],
    ['yue', '嗰個位我試過'],
    ['mix', 'push 啦唔好等'],
    ['mix', 'clutch 到癲咗'],
    ['mix', '呢個 skin 幾靚喎'],
    ['mix', 'lag 到我唔想玩'],
    // Cantonese the rule does not catch, and they are here on purpose. Every one
    // of these is written with characters standard Chinese also uses, so nothing
    // in the text distinguishes it, and the extension will send it off with no
    // source language rather than guess. Watching them scroll past untranslated
    // next to the ones that work is the honest picture of what this feature
    // does; a corpus of only the wins would show a better product than exists.
    ['miss', '個 mic 好細聲呀'],
    ['miss', '收皮啦你'],
    ['miss', '幾時再開台'],
    // Controls. These are standard written Chinese, not Cantonese, and the
    // extension should treat them exactly as it did before this feature existed.
    ['zh-tw', '這個位置真的很好'],
    ['zh-tw', '他們去哪裡了'],
    ['zh-tw', '主播今天狀態不錯'],
    ['zh-tw', '反而家裡更安靜'],
    ['zh-tw', '小羊咩咩叫'],
  ];

  // Synthetic handles. No real account, no real channel, nothing that could be
  // mistaken for somebody's name.
  const HANDLES = ['hk_test_01', 'hk_test_02', 'hk_test_03', 'canto_probe', 'yue_fixture'];
  const COLOURS = ['#53fc18', '#ff9d00', '#00d4ff', '#ff5ec7', '#ffd400'];

  // The lists the extension binds to (src/content/platform/twitch.ts), 7TV first.
  const SELECTORS = [
    'main.seventv-chat-list',
    '[data-test-selector="chat-scrollable-area__message-container"]',
  ];
  const ROW = '.seventv-message, .chat-line__message';

  /** The same list the extension binds to: the first candidate holding a row. */
  function findContainer() {
    for (const sel of SELECTORS) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.querySelector(ROW)) return el;
      }
    }
    return null;
  }

  let sent = 0;

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /**
   * A row shaped the way the extension reads one, in the family the page shows.
   *
   * Native (also BTTV, FFZ): `.chat-line__message` holding `.chat-line__message-container`,
   * the login in `data-a-user`, the text in `[data-a-target="chat-message-text"]`.
   * 7TV: `.seventv-message[msg-id]` holding `.seventv-chat-message-container`, the text in
   * `.seventv-chat-message-body > .text-token`. Getting either wrong produces a row that
   * looks right and is silently skipped, which is the failure mode this comment exists to
   * prevent.
   */
  function buildRow(container, text) {
    const handle = HANDLES[sent % HANDLES.length];
    const colour = COLOURS[sent % COLOURS.length];
    sent += 1;
    let row;
    if (container.matches('main.seventv-chat-list')) {
      row = el('div', 'seventv-message');
      row.setAttribute('msg-id', `kt-fake-${Date.now()}-${sent}`);
      const box = el('div', 'seventv-chat-message-container');
      const msg = el('span', 'seventv-user-message');
      const user = el('div', 'seventv-chat-user');
      user.style.color = colour;
      user.append(el('span', 'seventv-chat-user-username', handle));
      const body = el('span', 'seventv-chat-message-body');
      body.append(el('span', 'text-token', text));
      msg.append(user, el('span', '', ': '), body);
      box.append(msg);
      row.append(box);
    } else {
      row = el('div', 'chat-line__message');
      row.setAttribute('data-a-target', 'chat-line-message');
      row.setAttribute('data-a-user', handle);
      const box = el('div', 'chat-line__message-container');
      const name = el('span', 'chat-author__display-name', handle);
      name.setAttribute('data-a-target', 'chat-message-username');
      name.style.color = colour;
      const body = el('span', '');
      body.setAttribute('data-a-target', 'chat-line-message-body');
      const frag = el('span', 'text-fragment', text);
      frag.setAttribute('data-a-target', 'chat-message-text');
      body.append(frag);
      box.append(name, el('span', '', ': '), body);
      row.append(box);
    }
    row.setAttribute(MARK, '1');
    row.style.padding = '4px 8px';
    // A left edge so a fake line is never mistaken for a real one on a busy chat.
    row.style.borderLeft = '3px solid #8b5cf6';
    return row;
  }

  function send(text) {
    const container = findContainer();
    if (!container) {
      console.warn('[ktFakeChat] no chat container yet: is a channel page open with chat loaded?');
      return false;
    }
    const row = buildRow(container, text);
    container.append(row);
    row.scrollIntoView({ block: 'nearest' });
    return true;
  }

  let timer;
  let cursor = 0;

  function start(intervalMs = 2500) {
    stop();
    timer = setInterval(() => {
      const entry = LINES[cursor % LINES.length];
      cursor += 1;
      send(entry[1]);
    }, intervalMs);
    console.log(`[ktFakeChat] streaming ${LINES.length} lines every ${intervalMs}ms. ktFakeChat.stop() to end.`);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  function burst() {
    let ok = 0;
    for (const [, text] of LINES) if (send(text)) ok += 1;
    console.log(`[ktFakeChat] sent ${ok} / ${LINES.length}`);
  }

  function clear() {
    const rows = document.querySelectorAll(`[${MARK}]`);
    for (const r of rows) r.remove();
    console.log(`[ktFakeChat] removed ${rows.length} row(s)`);
  }

  window.ktFakeChat = { start, stop, burst, send, clear, corpus: LINES };

  if (!findContainer()) {
    console.warn('[ktFakeChat] chat container not found. Open a channel page, wait for chat, then ktFakeChat.start()');
  } else {
    start();
  }

  console.log(
    '[ktFakeChat] ready. Nothing is sent to Twitch: these rows live in your DOM only and vanish on refresh.',
  );
})();
