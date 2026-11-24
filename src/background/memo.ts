/**
 * The two small things the content script remembers between page loads: the last
 * broadcast language seen per channel, and the compose hint's counter.
 *
 * They live here, in storage the worker alone can reach. Content scripts are denied
 * storage.local (see restrictStorageAccess), and every value is checked on the way in
 * because the sender is the least trusted context the extension has.
 */

const HINT_KEY = 'kt.composeInsertHintDone';
const LANGS_KEY = 'kt.lastlang.v2';
/** Channels remembered. The oldest write goes first, so the record cannot grow for ever. */
export const LASTLANG_MAX = 200;

const SLUG = /^(videos\/)?[\w-]{1,40}$/;
const LANG = /^[a-z]{2,3}(-[a-z0-9]{2,8})?$/i;

export async function getHint(): Promise<number | boolean | undefined> {
  const v = (await chrome.storage.local.get(HINT_KEY))[HINT_KEY] as unknown;
  return v === true || (typeof v === 'number' && Number.isInteger(v)) ? v : undefined;
}

export async function setHint(value: unknown): Promise<boolean> {
  if (!(value === true || (typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 99))) return false;
  await chrome.storage.local.set({ [HINT_KEY]: value });
  return true;
}

export async function getLastLang(slug: unknown): Promise<string | undefined> {
  if (typeof slug !== 'string' || !SLUG.test(slug)) return undefined;
  // The per-channel keys of earlier builds are read as a fallback, never written again.
  const legacy = `kt.lastlang.${slug}`;
  const got = await chrome.storage.local.get([LANGS_KEY, legacy]);
  const map = got[LANGS_KEY] as Record<string, unknown> | undefined;
  const v = Object.hasOwn(map ?? {}, slug) ? map?.[slug] : got[legacy];
  return typeof v === 'string' && LANG.test(v) ? v : undefined;
}

export async function setLastLang(slug: unknown, lang: unknown): Promise<boolean> {
  if (typeof slug !== 'string' || !SLUG.test(slug) || typeof lang !== 'string' || !LANG.test(lang)) return false;
  const got = (await chrome.storage.local.get(LANGS_KEY))[LANGS_KEY] as Record<string, string> | undefined;
  const map = new Map(Object.entries(got ?? {}));
  map.delete(slug);
  map.set(slug, lang);
  while (map.size > LASTLANG_MAX) map.delete(map.keys().next().value!);
  await chrome.storage.local.set({ [LANGS_KEY]: Object.fromEntries(map) });
  return true;
}
