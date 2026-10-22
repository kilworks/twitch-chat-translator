import { describe, expect, it, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { extractMessageText, extractUsername, findChatContainer, pickInjectionTarget } from './selectors';
import { confidentLanguage } from './langDetect';
import { nativeChat, nativeRow, seventvChat, seventvRow } from './twitchFixtures';

/**
 * Does the synthetic chat produce rows this extension can actually read?
 *
 * scripts/twitch-fake-chat.js exists because there are next to no Hong Kong
 * channels, so the only way to watch the Cantonese path run on a page is to
 * write the page. Its failure mode is silent and expensive: a row that looks
 * right in the console, sits in the chat, and is skipped by the observer because
 * one class name is off. Nothing reports that. You just see no translation and
 * conclude the feature is broken.
 *
 * So the script is loaded and run here rather than re-described. The test reads
 * the real file, which means a change to the row markup either keeps these three
 * selectors happy or fails the suite, and the two cannot drift apart.
 */

// From the project root, not from import.meta.url: under happy-dom that URL is
// an http: one and readFileSync refuses it.
const script = readFileSync(resolve(process.cwd(), 'scripts/twitch-fake-chat.js'), 'utf8');

interface FakeChat {
  burst: () => void;
  send: (text: string) => boolean;
  clear: () => void;
  stop: () => void;
  corpus: [string, string][];
}

function loadFakeChat(): FakeChat {
  // The script auto-starts an interval when it finds a container. The test drives
  // it by hand, so it is stopped as soon as it is loaded.
  (0, eval)(script);
  const api = (globalThis as unknown as { ktFakeChat: FakeChat }).ktFakeChat;
  api.stop();
  return api;
}

const ROWS = '.chat-line__message, .seventv-message';

beforeEach(() => {
  // One real-shaped row, because findChatContainer only accepts a container that
  // already holds one. That is deliberate in the extension and it applies here.
  document.body.innerHTML = nativeChat(nativeRow('hello', 'someone'));
});

describe('the synthetic Cantonese chat', () => {
  it('appends rows the observer will find', () => {
    const fake = loadFakeChat();
    const before = document.querySelectorAll(ROWS).length;
    fake.burst();
    const after = document.querySelectorAll(ROWS).length;
    expect(after - before).toBe(fake.corpus.length);
  });

  it('builds rows the three extractors read correctly', () => {
    const fake = loadFakeChat();
    fake.send('佢哋去咗邊度呀');
    const container = findChatContainer(document);
    expect(container).not.toBeNull();
    const row = Array.from(container!.querySelectorAll(ROWS)).at(-1)!;

    expect(extractMessageText(row)).toBe('佢哋去咗邊度呀');
    expect(extractUsername(row)).toBeTruthy();
    // Not the row itself: the translation has to land inside the message container.
    expect(pickInjectionTarget(row)).not.toBe(row);
    expect(pickInjectionTarget(row).className).toContain('chat-line__message-container');
  });

  it('builds 7TV rows when 7TV holds the list', () => {
    document.body.innerHTML = seventvChat(seventvRow('hello', 'someone'));
    const fake = loadFakeChat();
    fake.send('佢哋去咗邊度呀');
    const row = Array.from(findChatContainer(document)!.querySelectorAll(ROWS)).at(-1)!;
    expect(row.classList.contains('seventv-message')).toBe(true);
    expect(extractMessageText(row)).toBe('佢哋去咗邊度呀');
    expect(extractUsername(row)).toBeTruthy();
    expect(pickInjectionTarget(row).className).toContain('seventv-chat-message-container');
  });

  it('appends a new node per line, as Twitch does', () => {
    const fake = loadFakeChat();
    fake.burst();
    const rows = Array.from(document.querySelectorAll(ROWS));
    expect(new Set(rows).size).toBe(rows.length);
    expect(rows.length).toBe(fake.corpus.length + 1);
  });

  it('cleans up after itself, leaving the page as it was', () => {
    const fake = loadFakeChat();
    const before = document.querySelectorAll(ROWS).length;
    fake.burst();
    fake.clear();
    expect(document.querySelectorAll(ROWS).length).toBe(before);
  });

  // The corpus is only worth streaming if the detector answers on it the way the
  // bench says it does. This is the join between the two: the lines that reach a
  // real page are the lines that were measured, including the ones that miss.
  it('carries a corpus the detector reads as labelled, misses included', () => {
    const fake = loadFakeChat();
    for (const [label, text] of fake.corpus) {
      const got = confidentLanguage(text);
      if (label === 'yue' || label === 'mix') {
        expect(got, `${label} line should read as Cantonese: ${text}`).toBe('yue');
      } else {
        // Neither the controls nor the misses may come back as Cantonese. They
        // are allowed to come back named by their SCRIPT: since the traditional
        // and simplified rule landed, a line written in traditional characters
        // is answered zh-tw whether it is Hong Kong Cantonese stripped of its
        // markers or Taiwanese standard Chinese, because that is all the text
        // says. What must never happen is calling it Cantonese on no evidence.
        expect(got, `${label} line must not be read as Cantonese: ${text}`).not.toBe('yue');
      }
    }
  });

  // A corpus that only shows wins would advertise a better product than exists.
  it('keeps known misses in the corpus rather than hiding them', () => {
    const fake = loadFakeChat();
    expect(fake.corpus.some(([label]) => label === 'miss')).toBe(true);
    expect(fake.corpus.some(([label]) => label === 'zh-tw')).toBe(true);
  });
});
