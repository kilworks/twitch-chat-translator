/**
 * Everything this extension knows about Twitch's page, in one place.
 *
 * Each selector here was seen in a RECON snapshot (`.agent/RECON/<config>/<surface>/dom.html`,
 * 8 extension configs x 9 surfaces, 2026-10-22) and `.agent/parity-check.mjs` fails when a
 * selector cited in PLAN.md was never seen. Three DOM families exist:
 *
 * - native: Twitch's own list, kept when BTTV and/or FFZ are installed. The list is
 *   `[data-test-selector="chat-scrollable-area__message-container"]` (a `[role="log"]`),
 *   rows `.chat-line__message`. FFZ rewrites the row (no `data-a-target`, a `data-user`
 *   attribute instead) but keeps the class and the text fragments.
 * - 7TV: as soon as 7TV is present on live, popout and mobile, the list becomes
 *   `main.seventv-chat-list` with rows `.seventv-message`, text in `.text-token`.
 * - replay: VOD and clip chat, an `ul` under `.video-chat__message-list-wrapper`, rows
 *   `.vod-message`; 7TV patches VOD rows into `.seventv-chat-vod-message-patched`.
 */

export const PLATFORM_NAME = 'Twitch';

/** The lists, most specific first. A candidate only counts once it holds a row. */
export const LIST_SELECTORS = [
  'main.seventv-chat-list',
  '[data-test-selector="chat-scrollable-area__message-container"]',
  '.video-chat__message-list-wrapper ul',
] as const;

/** One selector per family, joined: a row of any family matches. */
export const ROW_SELECTOR = [
  '.seventv-message',
  '.chat-line__message',
  '.seventv-chat-vod-message-patched',
  '.vod-message',
].join(', ');

/** Replay rows (VOD and clip, native and 7TV): a recorded chat played back, not a live one. */
export const REPLAY_ROW_SELECTOR = '.vod-message, .seventv-chat-vod-message-patched';

/**
 * The message body's text nodes, per family. Emotes are images and stay out; mentions and
 * links are part of what was said. Usernames, badges, timestamps and the ": " separator are
 * outside every one of these.
 */
export const TEXT_SELECTOR = [
  // 7TV, live and VOD.
  '.seventv-chat-message-body > .text-token',
  '.seventv-chat-message-body > .mention-token',
  '.seventv-chat-message-body .link-token',
  // Native, BTTV, FFZ, replay.
  '[data-a-target="chat-message-text"]',
  '[data-a-target="chat-message-mention"]',
  '.link-fragment',
].join(', ');

/**
 * A message a moderator removed, or one of a user timed out or banned: Twitch's placeholder
 * ("message deleted by a moderator."), FFZ's `<message deleted>` notice, 7TV's line marked
 * `deleted` (RECON native/theater, bttv+ffz/theater, 7tv/mobile). Its translation must go
 * with it, or the moderated words stay on screen in another language.
 */
export const DELETED_SELECTOR =
  '[data-a-target="chat-deleted-message-placeholder"], .chat-line__message--deleted, .seventv-user-message.deleted';

/** Where the author's login or display name is, per family, most reliable first. */
export const USERNAME_ATTRS = ['data-a-user', 'data-user'] as const;
export const USERNAME_SELECTORS = [
  '[data-a-target="chat-message-username"]',
  '.chat-author__display-name',
  '.seventv-chat-user-username',
] as const;

/**
 * Where a translation is appended, inside the row so it scrolls and dies with it. Natively
 * the message container; with 7TV the message's own container; replay rows take it whole.
 */
export const INJECTION_TARGETS = [
  '.seventv-chat-message-container',
  '.seventv-chat-vod-message-wrapper',
  '.chat-line__message-container',
] as const;

/**
 * The chat panel on screen, the floating bar's host. `.chat-room__content` holds both the
 * list and the composer on live, popout, embed and mobile, with or without 7TV; replay
 * pages have `.video-chat` instead.
 */
export const CHAT_PANEL_SELECTOR = '.chat-room__content, .video-chat';

/**
 * The composer. Slate in 8/8 configs (RECON/<config>/compose): `[data-a-target="chat-input"]`
 * carries `[data-slate-editor]`. The textarea is the logged-out and legacy fallback.
 */
export const COMPOSE_SELECTORS = [
  '[data-a-target="chat-input"][data-slate-editor]',
  '[data-a-target="chat-input"] [data-slate-editor]',
  '[data-slate-editor][contenteditable="true"]',
  'textarea[data-a-target="chat-input"]',
] as const;

/**
 * The row under the composer holding channel points, the gear and the Chat button. The
 * language chip goes at its head. It is not a sibling of any ancestor of the editor, so the
 * shape search Kick needed cannot find it (RECON/k01: the chip fell back above the editor and
 * overlapped the top edge of the message box).
 */
export const ACTION_BAR_SELECTOR = '[data-test-selector="chat-input-buttons-container"]';

/** The chat section names its own theme: fact 13 of PLAN.md. */
export const THEME_LIGHT_SELECTOR = '[data-a-target="chat-theme-light"]';
export const THEME_DARK_SELECTOR = '[data-a-target="chat-theme-dark"]';

/** First path segments that are never a channel login. */
const RESERVED = new Set([
  'directory',
  'downloads',
  'drops',
  'friends',
  'inventory',
  'jobs',
  'login',
  'messages',
  'p',
  'payments',
  'prime',
  'search',
  'settings',
  'signup',
  'store',
  'subscriptions',
  'turbo',
  'wallet',
  'following',
]);

/**
 * The room a path shows, as a lowercase key, or undefined off a chat.
 *
 * `/<login>`, `/<login>/clip/<slug>`, `/popout/<login>/chat`, `/embed/<login>/chat`,
 * `/moderator/<login>` and the stream manager's `/u/<login>/stream-manager` (on
 * dashboard.twitch.tv) give the login. A VOD (`/videos/<id>`) names no channel in its
 * path, so its key is `videos/<id>`: it can still be paused on its own.
 */
export function channelFromPath(pathname: string): string | undefined {
  const parts = pathname.split('/').filter(Boolean).map((p) => p.toLowerCase());
  const [first, second] = parts;
  if (!first) return undefined;
  if (first === 'popout' || first === 'embed' || first === 'moderator' || first === 'u') return second || undefined;
  if (first === 'videos') return second ? `videos/${second}` : undefined;
  if (RESERVED.has(first)) return undefined;
  // Logins are 4 to 25 of [a-z0-9_]; anything else is a route, not a channel.
  return /^[a-z0-9_]{2,25}$/.test(first) ? first : undefined;
}
