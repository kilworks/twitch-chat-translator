import { afterEach, describe, expect, it } from 'vitest';
import { findComposerRow, mountLangChip, unmountLangChip } from './langChip';
import { findComposer } from './selectors';
import { nativeChat, nativeRow } from './twitchFixtures';

/**
 * RECON/k01, signed in: the shape search found no action bar on Twitch (it is not a sibling
 * of any ancestor of the editor), the chip fell back into the editor's own parent and sat
 * over the top edge of the message box. Twitch names the bar; the chip goes at its head.
 */
describe('language chip anchoring on Twitch', () => {
  afterEach(() => {
    unmountLangChip();
    document.body.innerHTML = '';
  });

  it("takes Twitch's action bar, not the editor's parent", () => {
    document.body.innerHTML = nativeChat(nativeRow('hola'));
    const composer = findComposer()!;
    const row = findComposerRow(composer);
    expect(row.getAttribute('data-test-selector')).toBe('chat-input-buttons-container');
    expect(row).not.toBe(composer.parentElement);
  });

  it('mounts the chip at the head of that bar, outside the message box', () => {
    document.body.innerHTML = nativeChat(nativeRow('hola'));
    mountLangChip(findComposer()!, { mode: 'pinned', code: 'ja', favorites: ['ja'] }, { onPick: () => undefined, onAuto: () => undefined });
    const host = document.querySelector('.kt-chip-host')!;
    expect(host.parentElement?.getAttribute('data-test-selector')).toBe('chat-input-buttons-container');
    expect(host.parentElement?.firstElementChild).toBe(host);
    expect(host.closest('.chat-wysiwyg-input-box')).toBeNull();
  });
});
