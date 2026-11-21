/**
 * Streaming / Twitch-Kick slang that should NOT be translated: it has no
 * meaningful target-language rendering ("poggers" → "poggers"). A message made
 * ONLY of these (+ noise) is skipped, saving provider quota and avoiding junk
 * like "copium" → some literal mistranslation.
 */
export const SLANG = new Set<string>([
  'pog', 'poggers', 'pogchamp', 'pogu', 'poggies', 'kekw', 'kek', 'lul', 'lulw',
  'omegalul', 'lmao', 'lmfao', 'rofl', 'copium', 'hopium', 'malding', 'mald',
  'based', 'cringe', 'ratio', 'sadge', 'aware', 'unaware', 'gigachad', 'chad',
  'sus', 'sheesh', 'kappa', 'monkas', 'monkaw', 'pepega', 'pepe', 'peepo',
  'widepeepohappy', 'ezclap', 'ez', 'gg', 'ggs', 'glhf', 'wp', 'gget',
  'pausechamp', 'catjam', 'modcheck', 'clap', 'pepelaugh', 'kekwait', 'hypers',
  'pog champ', 'd:', 'pepehands', 'sadcat', 'icant', 'plonk', 'gigachat',
  'yep', 'nope', 'copege', 'prayge', 'gambage', 'donowall', 'koncha',
  'w', 'l', 'dub', 'ws', 'ls', 'ratioed', 'gyatt', 'gyat', 'rizz', 'fr', 'frfr',
  'ong', 'ngl', 'tuff', 'aura', 'mewing', 'goon', 'goonin', 'edging',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,.!?:;()"']+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** True when every token is streaming slang → no point translating. */
export function isSlangOnly(text: string): boolean {
  const tokens = tokenize(text);
  if (tokens.length === 0) return false;
  return tokens.every((t) => SLANG.has(t));
}

// U+2192 is not on most keyboards, so the typed arrows count too. A lone `=`
// does not: it is too common inside the text itself.
const GLOSSARY_SEP = /→|->|=>/;

function parseGlossaryEntry(entry: string): { from: string; to: string } | undefined {
  const m = GLOSSARY_SEP.exec(entry);
  if (!m) return undefined;
  const from = entry.slice(0, m.index).trim();
  if (!from) return undefined;
  return { from, to: entry.slice(m.index + m[0].length).trim() };
}

/** The non-empty lines the glossary cannot read, shown back to the reader. */
export function ignoredGlossaryLines(entries: string[]): string[] {
  return entries.filter((e) => e.trim() && !parseGlossaryEntry(e));
}

/**
 * Apply user-defined glossary replacements to a translated string.
 * Each entry is "source→replacement" (or `->`, `=>`). Case-insensitive word
 * boundary replace.
 */
export function applyUserGlossary(text: string, entries: string[]): string {
  if (entries.length === 0) return text;
  let out = text;
  for (const entry of entries) {
    const parsed = parseGlossaryEntry(entry);
    if (!parsed) continue;
    const { from, to } = parsed;
    try {
      // \b is ASCII-only, so anchoring both ends unconditionally made every
      // non-ASCII term ("草→lol", "привет→hi", "café→coffee") match nothing.
      // Anchor only the ends that actually begin or end on a word character.
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const lead = /^\w/.test(from) ? '\\b' : '';
      const trail = /\w$/.test(from) ? '\\b' : '';
      const re = new RegExp(`${lead}${escaped}${trail}`, 'gi');
      out = out.replace(re, to);
    } catch {
      // Invalid regex char in user input — skip silently.
    }
  }
  return out;
}
