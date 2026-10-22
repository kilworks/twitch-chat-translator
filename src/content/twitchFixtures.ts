/**
 * Twitch chat rows for unit tests, one per DOM family, cut from RECON snapshots
 * (`.agent/RECON/<config>/<surface>/dom.html`, 2026-10-22) with styling classes trimmed and
 * names replaced. Structure, attributes and the classes the selectors read are as captured.
 */

const esc = (s: string): string => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** RECON/native/live: a row of Twitch's own list (also BTTV). */
export function nativeRow(text: string, user = 'viewer_one', extra = ''): string {
  return `<div class="Layout-sc-1xcs6mc-0"><div class="Layout-sc-1xcs6mc-0"><div class="chat-line__message" role="group" aria-label="${esc(user)}: ${esc(text)}" tabindex="0" data-a-target="chat-line-message" data-a-user="${esc(user)}"><div class="Layout-sc-1xcs6mc-0 glFavL"><div class="Layout-sc-1xcs6mc-0 glFavL chat-line__message-container"><div class="Layout-sc-1xcs6mc-0"></div><div class="Layout-sc-1xcs6mc-0"><div class="Layout-sc-1xcs6mc-0 kBZhWz chat-line__no-background"><div class="Layout-sc-1xcs6mc-0 iinBYO"><div class="Layout-sc-1xcs6mc-0 bDKKrF chat-line__username-container"><span><div class="InjectLayout-sc-1i43xsx-0 bvEAgn"><button data-a-target="chat-badge"><img alt="Subscriber badge" class="chat-badge" src="data:,"></button></div></span><span class="chat-line__username" role="button" tabindex="0"><span><span class="chat-author__display-name" data-a-target="chat-message-username" data-a-user="${esc(user)}" data-test-selector="message-username" style="color: rgb(0, 249, 41);">${esc(user)}</span></span></span></div><span aria-hidden="true">: </span><span class="" data-a-target="chat-line-message-body" dir="auto"><span class="text-fragment" data-a-target="chat-message-text">${esc(text)}</span>${extra}</span></div></div></div></div><div class="Layout-sc-1xcs6mc-0 ijUWNg chat-line__icons"><div class="chat-line__reply-icon chat-line__icon"><button aria-label="Click to reply to @${esc(user)}"></button></div></div></div></div></div></div>`;
}

/** A native emote, as Twitch draws it between two text fragments. */
export function nativeEmote(name: string): string {
  return `<div class="InjectLayout-sc-1i43xsx-0 chat-line__message--emote-button" data-test-selector="emote-button"><span data-a-target="emote-name"><div class="chat-image__container"><img alt="${esc(name)}" class="chat-image chat-line__message--emote" src="data:,"></div></span></div>`;
}

/** RECON/ffz/live: FFZ rewrites the row, no data-a-target, the login in data-user. */
export function ffzRow(text: string, user = 'viewer_two'): string {
  return `<div class="Layout-sc-1xcs6mc-0"><div class="Layout-sc-1xcs6mc-0"><div class=" chat-line__message" data-room-id="89132304" data-room="channel_a" data-user-id="1373124741" data-user="${esc(user)}"><span class="chat-line__message--badges"><span data-provider="twitch" data-badge="subscriber" data-version="6" class="ffz-tooltip ffz-badge" data-tooltip-type="badge" data-badge-idx="0"></span></span><span class="chat-line__username notranslate " role="button" style="color: rgb(220, 83, 83);"><span class="chat-author__display-name">${esc(user)}</span></span><span aria-hidden="true">: </span><span class="message  "><span class="text-fragment" data-a-target="chat-message-text">${esc(text)}</span></span></div></div></div>`;
}

/**
 * RECON/7tv+ffz/embed: FFZ's notice line around a first message ("First Time Chatter"). The
 * notice text sits outside the inner row, which is an ordinary FFZ row.
 */
export function ffzNoticeLine(text: string, user = 'viewer_six', notice = 'First Time Chatter'): string {
  return `<div class="ffz--ftc-line ffz-custom-color ffz--ftc-bg ffz-notice-line user-notice-line tw-pd-y-05" data-room-id="89132304" data-room="channel_a" data-user-id="71946363" data-user="${esc(user)}"><div class="tw-c-text-alt-2"><span class="ffz-i-first-time-chatter tw-c-text-base tw-mg-r-05"></span><span class="tw-c-text-base tw-strong">${esc(notice)}</span></div><div class="chat-line--inline chat-line__message" data-room-id="89132304" data-room="channel_a" data-user-id="71946363" data-user="${esc(user)}"><span class="chat-line__message--badges"></span><span class="chat-line__username notranslate " role="button"><span class="chat-author__display-name">${esc(user)}</span></span><span aria-hidden="true">: </span><span class="message "><span class="text-fragment" data-a-target="chat-message-text">${esc(text)}</span></span></div></div>`;
}

/** RECON/bttv/live: a /me line, whose body Twitch sets in italics under its own class. */
export function nativeMeRow(text: string, user = 'viewer_seven'): string {
  return nativeRow(text, user)
    .replace('<span aria-hidden="true">: </span>', '<span aria-hidden="true"> </span>')
    .replace('<span class="" data-a-target="chat-line-message-body" dir="auto">', '<span class="chat-line__message-body--italicized" data-a-target="chat-line-message-body" dir="auto">');
}

/** RECON/7tv/live: a 7TV row, carrying the IRC message id. */
export function seventvRow(text: string, user = 'viewer_three', msgId = '0c5c7943-ee4b-4e29-b94f-307aa8b6bef2'): string {
  return `<div data-v-85115af9="" msg-id="${msgId}" class="seventv-message"><span data-v-85115af9="" msg="[object Object]"><div data-v-7a7ddc21="" class="seventv-chat-message-container"><div data-v-7a7ddc21="" class="seventv-chat-message-background" tabindex="0"><span data-v-12f1f826="" class="seventv-user-message" msg-id="${msgId}" state="IDLE"><div data-v-9493ee21="" class="seventv-chat-user" style="color: rgb(0, 255, 127);"><span class="seventv-chat-user-badge-list"><div class="seventv-chat-badge"><img alt="2-Month Subscriber" srcset=""></div></span><span data-v-9493ee21="" class="seventv-chat-user-username"><span><span>${esc(user)}</span></span></span></div><span data-v-12f1f826="">: </span><span data-v-12f1f826="" class="seventv-chat-message-body"><span data-v-12f1f826="" class="text-token">${esc(text)}</span></span><div class="seventv-chat-message-buttons"><div class="seventv-button"></div></div></span></div></div></span></div>`;
}

/** A 7TV emote token inside a message body. */
export function seventvEmote(name: string): string {
  return `<span data-v-12f1f826=""><div class="seventv-emote-box emote-token" ratio="1"><img class="seventv-chat-emote" srcset="" alt="${esc(name)}" loading="lazy"></div></span>`;
}

/** The 7TV welcome line: a row with no message body. */
export const SEVENTV_WELCOME = `<div data-v-85115af9="" msg-id="connected-1792685843569-jtiv" class="seventv-message"><span><span class="seventv-welcome-message"> Welcome to the chat room! </span></span></div>`;

/** RECON/native/vod: a replay row, in a list item. */
export function vodRow(text: string, user = 'viewer_four', time = '0:05'): string {
  return `<li class="InjectLayout-sc-1i43xsx-0 iUNIaK"><div class="Layout-sc-1xcs6mc-0 gTtfg vod-message"><div class="Layout-sc-1xcs6mc-0 jylwjN vod-message__header"><div><button><div><p class="CoreText-sc-1txzju1-0 iZVuiT">${time}</p></div></button></div></div><div class="Layout-sc-1xcs6mc-0 YRvnc"><div class="Layout-sc-1xcs6mc-0 cFxJWE"><div class="Layout-sc-1xcs6mc-0 dmulkQ"><a class="tw-link video-chat__message-author" href="/${esc(user)}"><span><span class="chat-author__display-name" data-a-target="chat-message-username" data-a-user="${esc(user)}" data-test-selector="message-username">${esc(user)}</span></span></a><div class="Layout-sc-1xcs6mc-0 cqnpHZ video-chat__message"><span class="InjectLayout-sc-1i43xsx-0 jnPoKn">:</span><span class=""><span class="text-fragment" data-a-target="chat-message-text">${esc(text)}</span></span></div></div></div></div></div></li>`;
}

/** RECON/7tv/vod: 7TV's patch of a replay row. */
export function seventvVodRow(text: string, user = 'viewer_five', msgId = '59248f01-de96-4054-913b-3f04ddd6132f'): string {
  return `<div class="InjectLayout-sc-1i43xsx-0 iUNIaK seventv-chat-vod-message-patched"><div data-v-a886b5f1="" class="seventv-chat-vod-message-wrapper"><span class="seventv-chat-vod-message-timestamp">00:00</span><span class="seventv-user-message" msg-id="${msgId}" state="IDLE"><div class="seventv-chat-user"><span class="seventv-chat-user-username"><span><span>${esc(user)}</span></span></span></div><span>: </span><span class="seventv-chat-message-body"><span class="text-token">${esc(text)}</span></span></span></div></div>`;
}

/** The panel and list around native rows (live, popout, embed, mobile). */
export function nativeChat(rows: string): string {
  return `<section data-test-selector="chat-room-component-layout" class="chat-room" data-a-target="chat-theme-dark"><div class="Layout-sc-1xcs6mc-0 jeukXd chat-room__content"><div tabindex="0" aria-label="Chat messages" class="chat-list--default"><div class="scrollable-area" data-a-target="chat-scroller"><div class="Layout-sc-1xcs6mc-0 dBRkEN chat-scrollable-area__message-container" data-test-selector="chat-scrollable-area__message-container" role="log">${rows}</div></div></div><div class="chat-input"><div class="chat-wysiwyg-input-box"><div data-a-target="chat-input" data-slate-editor="true" contenteditable="true" role="textbox"></div></div><div data-test-selector="chat-input-buttons-container" class="chat-input__buttons-container"><div class="left-group"></div><div class="mid-group"><button data-a-target="chat-settings" aria-label="Chat settings"></button></div><div class="send-group"><button data-a-target="chat-send-button">Chat</button></div></div></div></div></section>`;
}

/** The panel and list around 7TV rows. */
export function seventvChat(rows: string): string {
  return `<div class="Layout-sc-1xcs6mc-0 jeukXd chat-room__content"><div tabindex="0" aria-label="Chat messages" class="chat-list--default"><seventv-container class="seventv-chat-list"><div class="scrollable-container seventv-chat-scroller"><div class="scrollable-contents"><div id="seventv-message-container" class="seventv-message-container"><main data-v-85115af9="" class="seventv-chat-list">${rows}</main></div></div></div></seventv-container></div></div>`;
}

/** The replay panel around VOD or clip rows. */
export function replayChat(rows: string): string {
  return `<div class="Layout-sc-1xcs6mc-0 iGiUbs video-chat"><div class="video-chat__message-list-wrapper" tabindex="-1"><div class="Layout-sc-1xcs6mc-0 iEuTMk"><ul class="InjectLayout-sc-1i43xsx-0 gDoJZA">${rows}</ul></div></div></div>`;
}
