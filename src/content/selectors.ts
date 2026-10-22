/**
 * Chat DOM access, built on the platform layer (`./platform`). The function names are the
 * ones the Kick code used, so observer, pipeline and injector did not have to change; what
 * they find is Twitch's three DOM families, described in `platform/twitch.ts`.
 *
 * Twitch never recycles a row node (RECON markers: `reusedNodes` 0 in 80/80 cells), unlike
 * Kick's virtualiser, so a row element is its message for as long as it lives.
 */
import {
  CHAT_PANEL_SELECTOR as PANEL,
  COMPOSE_SELECTORS as COMPOSERS,
  DELETED_SELECTOR,
  INJECTION_TARGETS,
  LIST_SELECTORS,
  ROW_SELECTOR,
  TEXT_SELECTOR,
  USERNAME_ATTRS,
  USERNAME_SELECTORS,
} from './platform';

export const SELECTORS = {
  containers: LIST_SELECTORS,
  messageRows: [ROW_SELECTOR],
} as const;

export const COMPOSE_SELECTORS = COMPOSERS;

/** Find the chat composer element, or null when not present (e.g. not on a channel page). */
export function findComposer(root: ParentNode = document): HTMLElement | null {
  const el = pickFirst(root, COMPOSE_SELECTORS);
  return el instanceof HTMLElement ? el : null;
}

export function pickFirst(root: ParentNode, list: readonly string[]): Element | null {
  for (const sel of list) {
    try {
      const found = root.querySelector(sel);
      if (found) return found;
    } catch {
      /* invalid selector, ignore */
    }
  }
  return null;
}

/**
 * The chat list: the first candidate that actually holds message rows.
 *
 * Returns null while no candidate holds a row yet (chat still empty), so the caller keeps
 * polling rather than binding to the wrong element for good. A list on screen wins over
 * one that is not: 7TV leaves Twitch's own list in the page when it takes over.
 */
export function findChatContainer(root: ParentNode = document): Element | null {
  let hidden: Element | null = null;
  for (const sel of SELECTORS.containers) {
    let nodes: NodeListOf<Element>;
    try {
      nodes = root.querySelectorAll(sel);
    } catch {
      continue; // invalid selector, ignore
    }
    for (const el of nodes) {
      if (!el.querySelector(ROW_SELECTOR)) continue;
      if (isShown(el)) return el;
      hidden ??= el;
    }
  }
  return hidden;
}

/**
 * Laid out on screen: `display: none` on it or any ancestor leaves no box.
 *
 * `checkVisibility` answers from computed style alone; `getClientRects` forces layout on
 * a dirty page. Browsers without it (Firefox before 106) keep the box count.
 */
export function isShown(el: Element): boolean {
  const v = el as Element & { checkVisibility?: () => boolean };
  if (typeof v.checkVisibility === 'function') return v.checkVisibility();
  return el.getClientRects().length > 0;
}

/** The message row a mutation happened inside, if any. */
export function enclosingMessageRow(node: Node): Element | undefined {
  const el = node instanceof Element ? node : node.parentElement;
  return el?.closest(ROW_SELECTOR) ?? undefined;
}

export function findAllRows(container: ParentNode): Element[] {
  return Array.from(container.querySelectorAll(ROW_SELECTOR));
}

/**
 * The chat panel on screen: the one holding rows, else the one with a box, else the first.
 */
export function findChatPanel(root: ParentNode = document): Element | null {
  const panels = Array.from(root.querySelectorAll(CHAT_PANEL_SELECTOR));
  const hasRows = (p: Element) => p.querySelector(ROW_SELECTOR) !== null;
  return (
    panels.find((p) => hasRows(p) && isShown(p)) ??
    panels.find(hasRows) ??
    panels.find((p) => p.getBoundingClientRect().height > 0) ??
    panels[0] ??
    null
  );
}

export const CHAT_PANEL_SELECTOR = PANEL;

/** A row whose message was deleted by a moderator, a timeout or a ban. */
export function isDeletedRow(row: Element): boolean {
  return row.matches(DELETED_SELECTOR) || row.querySelector(DELETED_SELECTOR) !== null;
}

export function matchesMessageRow(el: Element): boolean {
  return el instanceof HTMLElement && el.matches(ROW_SELECTOR);
}

/**
 * The message body as text: fragments, mentions and links, without the username, badges,
 * timestamp, separator or emote images. Nothing inside our own artifacts is read.
 */
export function extractMessageText(row: Element): string {
  const parts = Array.from(row.querySelectorAll<HTMLElement>(TEXT_SELECTOR)).filter(
    // A class token starting with kt- is ours; Twitch's hashed classes never start so.
    (el) => !el.closest('[class^="kt-"], [class*=" kt-"]') && !el.parentElement?.closest(TEXT_SELECTOR),
  );
  return parts
    .map((e) => e.textContent ?? '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The author, lowercased: the login when the row carries it, else the display name. */
export function extractUsername(row: Element): string | undefined {
  for (const attr of USERNAME_ATTRS) {
    const holder = row.hasAttribute(attr) ? row : row.querySelector(`[${attr}]`);
    const v = holder?.getAttribute(attr)?.trim();
    if (v) return v.toLowerCase();
  }
  for (const sel of USERNAME_SELECTORS) {
    const t = row.querySelector(sel)?.textContent?.trim();
    if (t) return t.toLowerCase();
  }
  return undefined;
}

/** Where a translation goes: inside the message's own container, or the row itself. */
export function pickInjectionTarget(row: Element): Element {
  for (const sel of INJECTION_TARGETS) {
    const t = row.querySelector(sel);
    if (t) return t;
  }
  return row;
}

const rowSerial = new WeakMap<Element, number>();
let nextSerial = 0;

/**
 * An id for the row. 7TV rows carry `msg-id`, the IRC message id (118/118 matched,
 * RECON/7tv/idmatch). Native rows carry none, but a Twitch row node is never reused, so the
 * node itself is the identity: a serial per node, plus a hash of author and text so a row
 * whose text changes (a deletion) is seen again.
 */
export function buildSyntheticId(row: Element, username: string, text: string): string {
  const seed = `${username}::${text}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  const hash = (h >>> 0).toString(36);
  const msgId = row.getAttribute('msg-id') ?? row.querySelector('[msg-id]')?.getAttribute('msg-id');
  if (msgId) return `m${msgId}_h${hash}`;
  let serial = rowSerial.get(row);
  if (serial === undefined) {
    serial = nextSerial++;
    rowSerial.set(row, serial);
  }
  return `n${serial}_h${hash}`;
}
