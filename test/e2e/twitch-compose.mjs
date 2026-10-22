/**
 * The compose preview and its Tab key on real Twitch, in every chat-extension config (PLAN P04:
 * "measure both on 8/8 configs before choosing").
 *
 * Signed out, on a live channel drawn at random. Nothing is ever sent: no Enter is pressed and
 * a signed-out composer cannot send. Per config:
 *   A. A sentence in a language the channel does not speak is typed; the preview must come up,
 *      and Tab must put the translation in the box.
 *   B. "Kap" is typed and Tab pressed: where 7TV or BTTV completes emotes, the completion must
 *      win and no translation may be inserted; elsewhere the box must not receive a translation
 *      either (nothing to translate in a fragment).
 * Writes .agent/RECON/e2e/compose/measure.json. Exit 1 when a config fails A or B, or when the
 * preview never came up (a gate that saw nothing).
 *
 *   node test/e2e/twitch-compose.mjs [--configs native,7tv]
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { CONFIGS, launch, ROOT, save, TODAY } from '../../.agent/probes/lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = process.env.KT_EXT ?? path.resolve(HERE, '../../dist');
const arg = (n, d) => (process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : d);
const configs = arg('--configs', Object.keys(CONFIGS).join(',')).split(',');
const { channels, hot = [] } = JSON.parse(fs.readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const order = [...hot, ...channels.keys()].filter((v, i, a) => a.indexOf(v) === i);

const ED = '[data-a-target="chat-input"][data-slate-editor]';
// Japanese first; French when the channel itself is Japanese.
const SENTENCES = ['今日はとても楽しい配信ですね、ありがとう', 'merci pour ce live, il est vraiment génial ce soir'];

const read = (page) =>
  page.evaluate((ED) => {
    const ed = document.querySelector(ED);
    const p = document.querySelector('.kt-compose');
    return {
      box: (ed?.textContent ?? '').replace(/﻿/g, '').trim(),
      state: p?.dataset.state ?? null,
      preview: (p?.querySelector('.kt-compose-text')?.textContent ?? '').trim(),
    };
  }, ED);

async function clear(page) {
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  await page.waitForTimeout(400);
}

const report = { date: TODAY, at: new Date().toISOString(), cells: [] };
let failed = 0;
for (const config of configs) {
  const ctx = await launch(config, {}, 'e2e-compose', EXT);
  const page = await ctx.newPage();
  const cell = { config };
  try {
    for (const idx of order.slice(0, 3)) {
      await page.goto(`https://www.twitch.tv/${channels[idx]}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
      await page.waitForTimeout(9000);
      if (await page.$(ED)) {
        cell.channel = `ch${idx}`;
        break;
      }
    }
    if (!cell.channel) throw new Error('no composer on 3 channels');
    await page.locator(ED).filter({ visible: true }).first().click();
    await page.waitForTimeout(1000);
    // A channel with chat rules shows them on the first click and takes the focus: accepted
    // here (signed out, nothing leaves the page), then the box is clicked again.
    const rules = page.locator('[role="dialog"] button').filter({ hasText: /got it|ok|accept/i }).first();
    if (await rules.count()) {
      cell.chatRules = true;
      await rules.click().catch(() => {});
      await page.waitForTimeout(600);
      await page.locator(ED).filter({ visible: true }).first().click();
    }
    // A: a translation, inserted by Tab.
    for (const s of SENTENCES) {
      await clear(page);
      await page.keyboard.type(s, { delay: 15 });
      for (let i = 0; i < 20; i++) {
        await page.waitForTimeout(500);
        if ((await read(page)).state === 'ready') break;
      }
      const before = await read(page);
      if (before.state !== 'ready') continue;
      // How long the box takes to show the translation after Tab: polled, up to 5 s, so a
      // slow insert is measured instead of landing later in whatever is typed next.
      // Timed inside the page, from the Tab keydown to the mutation that puts the translation
      // in the box: timed from here, a page carrying three chat extensions took about 2 s per
      // read and the gate measured itself (in-page: 66 ms, gate: 1981 ms).
      await page.evaluate(
        ({ ED, want }) => {
          const ed = document.querySelector(ED);
          window.__ktTab = { down: null, done: null };
          window.addEventListener('keydown', (e) => { if (e.key === 'Tab' && window.__ktTab.down === null) window.__ktTab.down = performance.now(); }, true);
          new MutationObserver(() => {
            if (window.__ktTab.done === null && (ed.textContent ?? '').replace(/﻿/g, '').trim() === want) window.__ktTab.done = performance.now();
          }).observe(ed, { subtree: true, childList: true, characterData: true });
        },
        { ED, want: before.preview },
      );
      const t0 = Date.now();
      await page.keyboard.press('Tab');
      let after = await read(page);
      while (after.box !== before.preview && Date.now() - t0 < 5000) {
        await page.waitForTimeout(100);
        after = await read(page);
      }
      const tab = await page.evaluate(() => window.__ktTab);
      const ms = tab.down !== null && tab.done !== null ? Math.round(tab.done - tab.down) : Date.now() - t0;
      cell.a = { typed: s.slice(0, 12), preview: before.preview.slice(0, 40), boxAfterTab: after.box.slice(0, 40), inserted: after.box === before.preview, insertMs: ms };
      break;
    }
    // B: an emote fragment, where Tab belongs to 7TV or BTTV.
    await clear(page);
    await page.locator(ED).filter({ visible: true }).first().click().catch(() => {});
    await page.keyboard.type('Kap', { delay: 30 });
    await page.waitForTimeout(1500);
    const b0 = await read(page);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(900);
    const b1 = await read(page);
    cell.b = { before: b0.box, after: b1.box, completed: b1.box !== b0.box && /^kap/i.test(b1.box), previewWas: b0.state };
    await clear(page).catch(() => {});
  } catch (e) {
    cell.error = String(e.message ?? e);
  }
  const completes = CONFIGS[config].includes('7tv') || CONFIGS[config].includes('bttv');
  const why = [];
  if (!cell.a) why.push(cell.error ?? 'the preview never came up');
  else if (!cell.a.inserted) why.push(`Tab did not insert the translation within 5 s (box "${cell.a.boxAfterTab}")`);
  else if (cell.a.insertMs > 1000) why.push(`the translation took ${cell.a.insertMs} ms to appear after Tab`);
  if (cell.b && completes && !cell.b.completed) why.push(`Tab did not let the emote completion through ("${cell.b.before}" -> "${cell.b.after}")`);
  if (cell.b && cell.a && cell.b.after === cell.a.preview) why.push('Tab inserted a translation over an emote fragment');
  cell.pass = why.length === 0;
  cell.why = why.join('; ') || undefined;
  if (!cell.pass) failed++;
  report.cells.push(cell);
  console.log(`${cell.pass ? 'ok  ' : 'FAIL'} compose/${config} ${cell.pass ? `A inserted in ${cell.a.insertMs} ms, B ${cell.b?.completed ? 'completed by the emote extension' : 'left alone'}` : cell.why}`);
  await ctx.close();
}
report.summary = `${report.cells.length - failed}/${report.cells.length} cells green`;
save('e2e', 'compose', { 'measure.json': report }, channels);
console.log(report.summary);
process.exit(failed ? 1 : 0);
