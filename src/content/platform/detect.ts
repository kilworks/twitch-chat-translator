import { rootLogger } from '~/shared/logger';

const log = rootLogger.child('platform');

export interface ChatExtensions {
  seventv: boolean;
  bttv: boolean;
  ffz: boolean;
}

let cached: ChatExtensions | undefined;

/**
 * Which chat extensions are on the page.
 *
 * 7TV replaces the list (`.seventv-chat-list`) and tags its elements `seventv-`. FFZ tags its
 * badges, tooltips and inputs `ffz-` (ffz/live: 217 such classes) and puts `data-room-id`
 * on rows. BTTV leaves no class in the list (bttv/live: none), but it loads its own
 * `betterttv.js` and `betterttv.css` into the page, which is what is looked for.
 */
export function detectExtensions(root: ParentNode = document): ChatExtensions {
  const has = (sel: string): boolean => {
    try {
      return root.querySelector(sel) !== null;
    } catch {
      return false;
    }
  };
  const seventv =
    has('.seventv-chat-list, #seventv-message-container, seventv-container, [class^="seventv"], [class*=" seventv-"]') ||
    // `customElements` is null in a content script's isolated world: guarded, not assumed.
    (typeof customElements !== 'undefined' && customElements?.get('seventv-container') !== undefined);
  const bttv = has('script[src*="betterttv"], link[href*="betterttv"], [class*="bttv-"]');
  const ffz = has('[class^="ffz-"], [class*=" ffz-"], .chat-line__message[data-room-id]');
  cached = { seventv, bttv, ffz };
  return cached;
}

/** Cached answer for 7TV, the one extension that changes which DOM family is read. */
export function has7TV(): boolean {
  return (cached ?? detectExtensions()).seventv;
}

/** Re-evaluate: 7TV can load after the content script. */
export function refresh7TV(): boolean {
  return detectExtensions().seventv;
}

export function logPlatform(): void {
  const e = cached ?? detectExtensions();
  const on = (['seventv', 'bttv', 'ffz'] as const).filter((k) => e[k]);
  log.info(on.length ? `chat extensions: ${on.join(', ')}` : 'native Twitch chat');
}
