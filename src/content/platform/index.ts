/**
 * The platform layer: every coupling to the site the extension runs on goes through here.
 * Selectors, the channel a path names, the chat extensions on the page and the brand.
 * The channel language lives in `../twitchApi.ts`, the bot list in `~/shared/bots.ts`, the
 * editor write in `~/background/slateWrite.ts`.
 */
export * from './twitch';
export * from './detect';
