/**
 * Twitch chat rows for the offline gates. Copied from src/content/twitchFixtures.ts (cut from
 * RECON snapshots, one per DOM family) so the harnesses can use them without importing TS.
 * Keep the two in step when a row shape changes.
 */

const esc = (s) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** RECON/native/live: a row of Twitch's own list (also BTTV). */
export function nativeRow(text, user = 'viewer_one', extra = '') {
  return `<div class="Layout-sc-1xcs6mc-0"><div class="Layout-sc-1xcs6mc-0"><div class="chat-line__message" role="group" aria-label="${esc(user)}: ${esc(text)}" tabindex="0" data-a-target="chat-line-message" data-a-user="${esc(user)}"><div class="Layout-sc-1xcs6mc-0 glFavL"><div class="Layout-sc-1xcs6mc-0 glFavL chat-line__message-container"><div class="Layout-sc-1xcs6mc-0"></div><div class="Layout-sc-1xcs6mc-0"><div class="Layout-sc-1xcs6mc-0 kBZhWz chat-line__no-background"><div class="Layout-sc-1xcs6mc-0 iinBYO"><div class="Layout-sc-1xcs6mc-0 bDKKrF chat-line__username-container"><span><div class="InjectLayout-sc-1i43xsx-0 bvEAgn"><button data-a-target="chat-badge"><img alt="Subscriber badge" class="chat-badge" src="data:,"></button></div></span><span class="chat-line__username" role="button" tabindex="0"><span><span class="chat-author__display-name" data-a-target="chat-message-username" data-a-user="${esc(user)}" data-test-selector="message-username" style="color: rgb(0, 249, 41);">${esc(user)}</span></span></span></div><span aria-hidden="true">: </span><span class="" data-a-target="chat-line-message-body" dir="auto"><span class="text-fragment" data-a-target="chat-message-text">${esc(text)}</span>${extra}</span></div></div></div></div><div class="Layout-sc-1xcs6mc-0 ijUWNg chat-line__icons"><div class="chat-line__reply-icon chat-line__icon"><button aria-label="Click to reply to @${esc(user)}"></button></div></div></div></div></div></div>`;
}

/** A native emote, as Twitch draws it between two text fragments. */
export function nativeEmote(name) {
  return `<div class="InjectLayout-sc-1i43xsx-0 chat-line__message--emote-button" data-test-selector="emote-button"><span data-a-target="emote-name"><div class="chat-image__container"><img alt="${esc(name)}" class="chat-image chat-line__message--emote" src="data:,"></div></span></div>`;
}

/** RECON/ffz/live: FFZ rewrites the row, no data-a-target, the login in data-user. */
export function ffzRow(text, user = 'viewer_two') {
  return `<div class="Layout-sc-1xcs6mc-0"><div class="Layout-sc-1xcs6mc-0"><div class=" chat-line__message" data-room-id="89132304" data-room="channel_a" data-user-id="1373124741" data-user="${esc(user)}"><span class="chat-line__message--badges"><span data-provider="twitch" data-badge="subscriber" data-version="6" class="ffz-tooltip ffz-badge" data-tooltip-type="badge" data-badge-idx="0"></span></span><span class="chat-line__username notranslate " role="button" style="color: rgb(220, 83, 83);"><span class="chat-author__display-name">${esc(user)}</span></span><span aria-hidden="true">: </span><span class="message  "><span class="text-fragment" data-a-target="chat-message-text">${esc(text)}</span></span></div></div></div>`;
}

/** RECON/7tv/live: a 7TV row, carrying the IRC message id. */
export function seventvRow(text, user = 'viewer_three', msgId = '0c5c7943-ee4b-4e29-b94f-307aa8b6bef2') {
  return `<div data-v-85115af9="" msg-id="${msgId}" class="seventv-message"><span data-v-85115af9="" msg="[object Object]"><div data-v-7a7ddc21="" class="seventv-chat-message-container"><div data-v-7a7ddc21="" class="seventv-chat-message-background" tabindex="0"><span data-v-12f1f826="" class="seventv-user-message" msg-id="${msgId}" state="IDLE"><div data-v-9493ee21="" class="seventv-chat-user" style="color: rgb(0, 255, 127);"><span class="seventv-chat-user-badge-list"><div class="seventv-chat-badge"><img alt="2-Month Subscriber" srcset=""></div></span><span data-v-9493ee21="" class="seventv-chat-user-username"><span><span>${esc(user)}</span></span></span></div><span data-v-12f1f826="">: </span><span data-v-12f1f826="" class="seventv-chat-message-body"><span data-v-12f1f826="" class="text-token">${esc(text)}</span></span><div class="seventv-chat-message-buttons"><div class="seventv-button"></div></div></span></div></div></span></div>`;
}

/** A 7TV emote token inside a message body. */
export function seventvEmote(name) {
  return `<span data-v-12f1f826=""><div class="seventv-emote-box emote-token" ratio="1"><img class="seventv-chat-emote" srcset="" alt="${esc(name)}" loading="lazy"></div></span>`;
}

/** The 7TV welcome line: a row with no message body. */
export const SEVENTV_WELCOME = `<div data-v-85115af9="" msg-id="connected-1792685843569-jtiv" class="seventv-message"><span><span class="seventv-welcome-message"> Welcome to the chat room! </span></span></div>`;

/** RECON/native/vod: a replay row, in a list item. */
export function vodRow(text, user = 'viewer_four', time = '0:05') {
  return `<li class="InjectLayout-sc-1i43xsx-0 iUNIaK"><div class="Layout-sc-1xcs6mc-0 gTtfg vod-message"><div class="Layout-sc-1xcs6mc-0 jylwjN vod-message__header"><div><button><div><p class="CoreText-sc-1txzju1-0 iZVuiT">${time}</p></div></button></div></div><div class="Layout-sc-1xcs6mc-0 YRvnc"><div class="Layout-sc-1xcs6mc-0 cFxJWE"><div class="Layout-sc-1xcs6mc-0 dmulkQ"><a class="tw-link video-chat__message-author" href="/${esc(user)}"><span><span class="chat-author__display-name" data-a-target="chat-message-username" data-a-user="${esc(user)}" data-test-selector="message-username">${esc(user)}</span></span></a><div class="Layout-sc-1xcs6mc-0 cqnpHZ video-chat__message"><span class="InjectLayout-sc-1i43xsx-0 jnPoKn">:</span><span class=""><span class="text-fragment" data-a-target="chat-message-text">${esc(text)}</span></span></div></div></div></div></div></li>`;
}

/** RECON/7tv/vod: 7TV's patch of a replay row. */
export function seventvVodRow(text, user = 'viewer_five', msgId = '59248f01-de96-4054-913b-3f04ddd6132f') {
  return `<div class="InjectLayout-sc-1i43xsx-0 iUNIaK seventv-chat-vod-message-patched"><div data-v-a886b5f1="" class="seventv-chat-vod-message-wrapper"><span class="seventv-chat-vod-message-timestamp">00:00</span><span class="seventv-user-message" msg-id="${msgId}" state="IDLE"><div class="seventv-chat-user"><span class="seventv-chat-user-username"><span><span>${esc(user)}</span></span></span></div><span>: </span><span class="seventv-chat-message-body"><span class="text-token">${esc(text)}</span></span></span></div></div>`;
}

/** The panel and list around native rows (live, popout, embed, mobile). */
export function nativeChat(rows) {
  return `<section data-test-selector="chat-room-component-layout" class="chat-room" data-a-target="chat-theme-dark"><div class="Layout-sc-1xcs6mc-0 jeukXd chat-room__content"><div tabindex="0" aria-label="Chat messages" class="chat-list--default"><div class="scrollable-area" data-a-target="chat-scroller"><div class="Layout-sc-1xcs6mc-0 dBRkEN chat-scrollable-area__message-container" data-test-selector="chat-scrollable-area__message-container" role="log">${rows}</div></div></div><div class="chat-input"><div data-a-target="chat-input" data-slate-editor="true" contenteditable="true" role="textbox"></div></div></div></section>`;
}

/** The panel and list around 7TV rows. */
export function seventvChat(rows) {
  return `<div class="Layout-sc-1xcs6mc-0 jeukXd chat-room__content"><div tabindex="0" aria-label="Chat messages" class="chat-list--default"><seventv-container class="seventv-chat-list"><div class="scrollable-container seventv-chat-scroller"><div class="scrollable-contents"><div id="seventv-message-container" class="seventv-message-container"><main data-v-85115af9="" class="seventv-chat-list">${rows}</main></div></div></div></seventv-container></div></div>`;
}

/** The replay panel around VOD or clip rows. */
export function replayChat(rows) {
  return `<div class="Layout-sc-1xcs6mc-0 iGiUbs video-chat"><div class="video-chat__message-list-wrapper" tabindex="-1"><div class="Layout-sc-1xcs6mc-0 iEuTMk"><ul class="InjectLayout-sc-1i43xsx-0 gDoJZA">${rows}</ul></div></div></div>`;
}

// ---------------------------------------------------------------------------------------
// Page and network scaffolding shared by the offline gates. Nothing here touches the network:
// the page is served from a route on a twitch.tv URL, and every host the extension may call
// (GQL, 7TV, BTTV, FFZ) is answered locally.
// ---------------------------------------------------------------------------------------

/** Fake channel logins. Never a real streamer. */
export const CHANNEL_ONE = 'kt_test_one';
export const CHANNEL_TWO = 'kt_test_two';

/** A Twitch page URL, document and sub-resources alike (www and the mobile host). */
export const TWITCH_URL = /^https?:\/\/(www\.|m\.)?twitch\.tv\//;

/** The id the page's inline bootstrap script carries; `readClientId` reads it. Not a real one. */
const CLIENT_ID = 'kt0fakeclientid00000000a';

/**
 * A whole Twitch channel page around a chat built from the fixtures above.
 *
 * @param rows   row HTML, as built by nativeRow / seventvRow / ffzRow
 * @param opts   family: 'native' | 'seventv' | 'replay' (which panel wraps the rows);
 *               style: extra CSS; head: extra head markup; after: markup after the chat
 */
export function twitchPage(rows = '', { family = 'native', style = '', head = '', after = '' } = {}) {
  const chat =
    family === 'seventv' ? seventvChat(rows) : family === 'replay' ? replayChat(rows) : nativeChat(rows);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>kt fixture</title>
<script>window.__kt = { clientId: "${CLIENT_ID}" };</script>
<style>*{box-sizing:border-box}html,body{margin:0;background:#0e0e10;color:#efeff1;font:13px system-ui}
/* The chat docked to the right edge, composer at the bottom, as on a live page. */
.chat-room,body>.chat-room__content,body>.video-chat{position:fixed;top:0;right:0;bottom:0;width:340px}
.chat-room__content{display:flex;flex-direction:column;height:100%}
.chat-list--default{flex:1;min-height:0;overflow:auto}
.chat-input{padding:8px}[data-a-target="chat-input"]{min-height:40px;border:1px solid #333;padding:6px}
.chat-line__message{padding:2px 8px}
.chat-line__message-container>div,.chat-line__message-container>div>div,.chat-line__message-container>div>div>div,.chat-line__username-container,.chat-line__username-container div{display:inline}
[data-a-target="chat-badge"],.chat-badge,.chat-line__icons{display:none}${style}</style>${head}</head>
<body>${chat}${after}</body></html>`;
}

/**
 * Answer every Twitch-side request locally. Returns the list of sub-resource URLs that were
 * answered with an empty 204 (a harness that wants to fail on an escape reads it).
 *
 * @param ctx      Playwright browser context
 * @param opts.page    () => HTML served for the document (called on each navigation)
 * @param opts.langIso broadcast language GQL answers with: an ISO code, null for a 404 (no
 *                 metadata), or a function of the channel login returning either
 * @param opts.onGql   called with the login each GQL query asks about
 */
export async function routeTwitch(ctx, { page, langIso = null, onGql } = {}) {
  const sorties = [];
  const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' };

  await ctx.route(TWITCH_URL, async (route) => {
    const req = route.request();
    if (req.resourceType() === 'document') {
      await route.fulfill({ status: 200, contentType: 'text/html', body: page ? page() : twitchPage() });
      return;
    }
    sorties.push(req.url());
    await route.fulfill({ status: 204, body: '' });
  });

  await ctx.route(/^https:\/\/gql\.twitch\.tv\//, async (route) => {
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: cors, body: '' });
      return;
    }
    let slug = '';
    try {
      const v = JSON.parse(route.request().postData() ?? '{}').variables ?? {};
      slug = v.l ?? v.v ?? '';
    } catch {
      /* not JSON: answered as an unknown channel */
    }
    onGql?.(slug);
    const iso = typeof langIso === 'function' ? langIso(slug) : langIso;
    if (iso === null || iso === undefined) {
      await route.fulfill({ status: 404, headers: cors, body: '' });
      return;
    }
    await route.fulfill({
      status: 200,
      headers: cors,
      contentType: 'application/json',
      body: JSON.stringify({
        data: { user: { id: '424242', broadcastSettings: { language: iso.toUpperCase() } } },
      }),
    });
  });

  // Emote providers: an empty set, so a page with 7TV/BTTV/FFZ data behaves as one without.
  await ctx.route(/^https:\/\/(7tv\.io|api\.betterttv\.net|api\.frankerfacez\.com)\//, async (route) => {
    await route.fulfill({ status: 404, headers: cors, body: '' });
  });

  return sorties;
}
