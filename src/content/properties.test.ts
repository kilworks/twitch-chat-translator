import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { defaultSettings, type Settings } from '~/shared/settings';
import { foldCase } from '~/shared/normalize';
import { parseChatContent } from './emoteParser';
import { hasBlockedKeyword, isNoise } from './filters';

/**
 * Property tests on the functions that read what strangers type. Example tests
 * cover the lines someone thought of; these throw thousands of generated lines
 * at them, Unicode of every plane, lone surrogates and the syntax each parser
 * looks for, mixed in.
 */

const RUNS = { numRuns: 2000 };
// 2000 lines of up to 1200 characters take seconds when the whole suite runs in parallel.
const SLOW = 60_000;

// Any UTF-16 code unit, lone surrogates included: a chat line is not always valid Unicode.
const anyUnit = fc.integer({ min: 0, max: 0xffff }).map((c) => String.fromCharCode(c));
const fragment = fc.oneof(
  fc.string({ unit: 'binary', maxLength: 40 }),
  fc.string({ unit: anyUnit, maxLength: 20 }),
  fc.constantFrom('[emote:', '[emote:123:', ']', '[emote:1:KEKW]', '!', '@', ' ', '\n', 'ـ', '́'),
);
const chatLine = fc.array(fragment, { maxLength: 40 }).map((p) => p.join('').slice(0, 1200));

const withKeywords = (blockedKeywords: string[]): Settings => ({ ...defaultSettings(), blockedKeywords });

describe('the readers of chat text', () => {
  it('never throw, whatever the line', () => {
    fc.assert(
      fc.property(chatLine, fc.array(chatLine, { maxLength: 5 }), (text, words) => {
        parseChatContent(text);
        isNoise(text);
        hasBlockedKeyword(text, withKeywords(words));
      }),
      RUNS,
    );
  }, SLOW);
});

describe('a blocked Latin word', () => {
  const word = fc.stringMatching(/^[A-Za-z]{1,12}$/);

  it('is never found in a line that does not contain it', () => {
    fc.assert(
      fc.property(chatLine, word, (text, w) => {
        fc.pre(!foldCase(text).includes(foldCase(w)));
        expect(hasBlockedKeyword(text, withKeywords([w]))).toBe(false);
      }),
      RUNS,
    );
  }, SLOW);

  it('is always found standing alone between spaces', () => {
    fc.assert(
      fc.property(chatLine, chatLine, word, (a, b, w) => {
        expect(hasBlockedKeyword(`${a} ${w} ${b}`, withKeywords([w]))).toBe(true);
      }),
      RUNS,
    );
  }, SLOW);
});
