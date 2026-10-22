// Channel language sources on N drawn channels: (a) GQL broadcastSettings.language queried with
// the Client-Id the Twitch page itself sends (captured, not hard-coded), (b) tag links on the
// channel page. Reports availability of each and agreement between them. Exit 1 if (a) and (b)
// both answered on fewer than 5 channels: that would be a broken probe, not a finding.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT, TODAY, save } from './lib.mjs';

const N = Number(process.env.N ?? 20);
const data = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const pick = data.channels.slice(0, N);
const ctx = await launch('native', {}, 'lang');
const page = await ctx.newPage();
let clientId = null;
page.on('request', (r) => {
  if (!clientId && r.url().startsWith('https://gql.twitch.tv/')) clientId = r.headers()['client-id'] ?? null;
});
const names = new Intl.DisplayNames(['en'], { type: 'language' });
const rows = [];
for (const [i, login] of pick.entries()) {
  await page.goto(`https://www.twitch.tv/${login}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(7000);
  const tags = await page.evaluate(() =>
    [...document.querySelectorAll('a[href*="/directory/all/tags/"], a[href*="/tags/"]')].map((a) => a.textContent.trim()).filter(Boolean),
  );
  let gql = null, gqlErr = null;
  if (clientId) {
    const res = await page.evaluate(
      async ({ cid, login }) => {
        const r = await fetch('https://gql.twitch.tv/gql', {
          method: 'POST',
          headers: { 'Client-Id': cid, 'Content-Type': 'text/plain;charset=UTF-8' },
          body: JSON.stringify({ query: 'query($l:String!){user(login:$l){id broadcastSettings{language} stream{id}}}', variables: { l: login } }),
        });
        return { status: r.status, body: await r.json().catch(() => null) };
      },
      { cid: clientId, login },
    ).catch((e) => ({ status: 0, body: String(e) }));
    gql = res.body?.data?.user?.broadcastSettings?.language ?? null;
    gqlErr = res.status !== 200 || res.body?.errors ? { status: res.status, errors: res.body?.errors?.map((e) => e.message).slice(0, 2) } : null;
  }
  const gqlName = gql ? (() => { try { return names.of(gql.toLowerCase()); } catch { return null; } })() : null;
  const tagLangs = tags.filter((t) => { try { return [...new Set(['en','fr','es','de','pt','it','ru','ja','ko','zh','ar','tr','pl','nl','sv','th','vi','id','uk','cs','hu','ro','fi','da','no','el','he','hi','ms','tl','bg','ca','sk']).values()].some((c) => names.of(c).toLowerCase() === t.toLowerCase()); } catch { return false; } });
  rows.push({ ch: `ch${data.channels.indexOf(login)}`, gql, gqlErr, tagCount: tags.length, tagLangs, agree: gql && tagLangs.length ? tagLangs.some((t) => t.toLowerCase() === (gqlName ?? '').toLowerCase()) : null });
  console.log(`${i + 1}/${pick.length} gql=${gql} tags=${tagLangs.join('/')}`);
}
await ctx.close();
const n = rows.length;
const summary = {
  date: TODAY, channels: n, clientIdCaptured: !!clientId,
  gqlAnswered: rows.filter((r) => r.gql).length,
  tagLanguagePresent: rows.filter((r) => r.tagLangs.length).length,
  bothAnswered: rows.filter((r) => r.gql && r.tagLangs.length).length,
  agreeWhenBoth: rows.filter((r) => r.agree === true).length,
  gqlValues: rows.map((r) => r.gql),
};
save('lang', 'channel-language', { 'measure.json': { summary, rows } }, pick);
console.log(JSON.stringify(summary));
if (summary.gqlAnswered < 5 && summary.tagLanguagePresent < 5) process.exit(1);
