import { normalizeLang } from '~/shared/languages';

/**
 * The channel's broadcast language and room id, from Twitch's GQL endpoint.
 *
 * `broadcastSettings.language` answered on 20/20 drawn channels (RECON/lang), queried with
 * the Client-Id the page itself sends. That id is read from the page at runtime, never
 * written here: the page's inline bootstrap script carries it. GQL with a page Client-Id is
 * an undocumented interface, so every failure returns what is known and never throws; the
 * chat-based detection stays the fallback.
 */

const GQL = 'https://gql.twitch.tv/gql';

/** The Client-Id the Twitch page uses, from its inline scripts. */
export function readClientId(root: ParentNode = document): string | undefined {
  for (const s of root.querySelectorAll('script:not([src])')) {
    const m = /clientId\s*[=:]\s*["']([a-z0-9]{20,40})["']/i.exec(s.textContent ?? '');
    if (m) return m[1];
  }
  return undefined;
}

export interface ChannelMeta {
  /** Twitch user id of the channel: the room id the emote providers key their sets by. */
  roomId?: string;
  /** The channel's broadcast language as a supported ISO-2 code. */
  langIso?: string;
}

interface CachedMeta extends ChannelMeta {
  at: number;
}

interface UserNode {
  id?: string;
  broadcastSettings?: { language?: string | null } | null;
}
interface GqlResponse {
  data?: { user?: UserNode | null; video?: { owner?: UserNode | null } | null };
}

// The language is a setting the streamer can change; re-ask after this long.
const META_TTL_MS = 5 * 60_000;
const metaCache = new Map<string, CachedMeta>();
// Rapid route changes ask for the same channel twice; one request answers both.
const inflight = new Map<string, Promise<ChannelMeta>>();

// Last language seen per channel, so an answer that fails later still has one.
const LASTLANG_KEY = (slug: string): string => `kt.lastlang.${slug}`;

function queryFor(slug: string): { query: string; variables: Record<string, string> } {
  const fields = 'id broadcastSettings{language}';
  if (slug.startsWith('videos/'))
    return { query: `query($v:ID!){video(id:$v){owner{${fields}}}}`, variables: { v: slug.slice(7) } };
  return { query: `query($l:String!){user(login:$l){${fields}}}`, variables: { l: slug } };
}

async function fetchChannelMeta(slug: string): Promise<ChannelMeta> {
  const cached = metaCache.get(slug);
  if (cached && Date.now() - cached.at < META_TTL_MS && cached.langIso) return cached;
  const pending = inflight.get(slug);
  if (pending) return pending;

  const request = (async (): Promise<ChannelMeta> => {
    try {
      const clientId = readClientId();
      if (!clientId) return cached ?? {};
      const res = await fetch(GQL, {
        method: 'POST',
        headers: { 'Client-Id': clientId, 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(queryFor(slug)),
      });
      if (!res.ok) return cached ?? {};
      const data = (await res.json()) as GqlResponse;
      const user = data.data?.user ?? data.data?.video?.owner ?? undefined;
      const rawLang = user?.broadcastSettings?.language;
      const meta: CachedMeta = {
        roomId: user?.id ?? cached?.roomId,
        langIso: rawLang ? normalizeLang(rawLang.toLowerCase()) : cached?.langIso,
        at: Date.now(),
      };
      metaCache.set(slug, meta);
      if (meta.langIso) {
        try {
          void chrome.storage.local.set({ [LASTLANG_KEY(slug)]: meta.langIso });
        } catch {
          /* storage unavailable (e.g. unit tests): non-fatal */
        }
      }
      return meta;
    } catch {
      return cached ?? {};
    } finally {
      inflight.delete(slug);
    }
  })();
  inflight.set(slug, request);
  return request;
}

export async function fetchRoomId(slug: string): Promise<string | undefined> {
  return (await fetchChannelMeta(slug)).roomId;
}

/**
 * The channel's chat language (ISO-2): the broadcast language, else the last one seen for
 * this channel (persisted), so compose keeps targeting it when GQL does not answer.
 */
export async function fetchChannelLangIso(slug: string): Promise<string | undefined> {
  const live = (await fetchChannelMeta(slug)).langIso;
  if (live) return live;
  try {
    const stored = await chrome.storage.local.get(LASTLANG_KEY(slug));
    const last = stored[LASTLANG_KEY(slug)];
    return typeof last === 'string' ? last : undefined;
  } catch {
    return undefined;
  }
}
