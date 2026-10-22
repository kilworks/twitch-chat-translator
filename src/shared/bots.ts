/**
 * Chat bots that post on Twitch, always ignored when "Ignore chat bots" is on.
 *
 * The measured list, not a remembered one: authors seen over 6832 messages on 16 channels
 * drawn at random (RECON/bots/irc, 2026-10-22), with the number of channels each posted in:
 * StreamElements 5, Fossabot 3, Moobot 2, Streamlabs 1, Nightbot 1. A channel's own bot
 * (one was seen) goes in the user's list, `settings.extraBots`. Re-measure with
 * `.agent/probes/bots.mjs`. Shown in the options page as written.
 */
export const TWITCH_BOTS = ['StreamElements', 'Fossabot', 'Moobot', 'Streamlabs', 'Nightbot'] as const;
export const COMMON_BOTS = new Set<string>(TWITCH_BOTS.map((b) => b.toLowerCase()));
