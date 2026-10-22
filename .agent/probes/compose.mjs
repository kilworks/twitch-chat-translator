// Composer behaviour per config, logged out, never sending: type a partial emote name, press
// Tab, then Escape, then clear the box. Records what each extension adds (autocomplete
// overlays), what Tab does to the text, the editor's own markup, and the action bar.
// Enter is never pressed. Exit 1 if no editable composer was found.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { launch, ROOT, TODAY, save, describeComposer, CONFIGS } from './lib.mjs';

const config = process.argv[2];
if (!CONFIGS[config]) throw new Error('config?');
const data = JSON.parse(readFileSync(path.join(ROOT, '.recon-profile', 'channels.json'), 'utf8'));
const login = data.channels[data.hot[0] ?? 0];
const ctx = await launch(config, {}, 'compose');
const page = await ctx.newPage();
await page.goto(`https://www.twitch.tv/popout/${login}/chat?popout=`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(10000);

const out = { date: TODAY, config, channel: `ch${data.hot[0] ?? 0}` };
out.editors = await describeComposer(page);
const visible = out.editors.find((e) => e.visible);
if (!visible) {
  save(config, 'compose', { 'measure.json': out }, [login]);
  console.log(`${config}: no visible editor`);
  await ctx.close();
  process.exit(1);
}

// Action bar: buttons around the composer, up to 4 ancestors up.
out.actionBar = await page.evaluate(() => {
  const ed = [...document.querySelectorAll('[contenteditable="true"], textarea')].find((e) => e.offsetWidth);
  let box = ed;
  for (let i = 0; i < 4 && box?.parentElement; i++) box = box.parentElement;
  const root = box?.parentElement ?? document.body;
  return [...root.querySelectorAll('button, [role="button"]')].map((b) => ({
    label: b.getAttribute('aria-label') ?? b.textContent.trim().slice(0, 30),
    target: b.getAttribute('data-a-target'),
    cls: [...b.classList].filter((c) => /^(seventv|bttv|ffz|chat|tw-)/i.test(c)).slice(0, 4),
  }));
});

const watch = () => page.evaluate(() => {
  window.__ktAdded = [];
  window.__ktObs?.disconnect();
  window.__ktObs = new MutationObserver((ms) => {
    for (const m of ms) for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue;
      window.__ktAdded.push((n.tagName.toLowerCase() + '.' + [...n.classList].slice(0, 4).join('.') + (n.getAttribute('role') ? `[role=${n.getAttribute('role')}]` : '') + (n.getAttribute('data-a-target') ? `[data-a-target=${n.getAttribute('data-a-target')}]` : '')).slice(0, 160));
    }
  });
  window.__ktObs.observe(document.body, { childList: true, subtree: true });
});
const added = () => page.evaluate(() => [...new Set(window.__ktAdded)].slice(0, 40));
const editorState = () => page.evaluate(() => {
  const ed = [...document.querySelectorAll('[contenteditable="true"], textarea')].find((e) => e.offsetWidth);
  return { text: ed?.value ?? ed?.innerText ?? null, html: (ed?.innerHTML ?? '').slice(0, 1500) };
});
const dialogs = () => page.evaluate(() => [...document.querySelectorAll('[role="dialog"], [aria-modal="true"]')].map((d) => (d.getAttribute('aria-label') ?? d.textContent.trim()).slice(0, 80)));

const sel = '[contenteditable="true"], textarea';
await page.locator(sel).filter({ visible: true }).first().click().catch((e) => (out.clickError = String(e).slice(0, 200)));
await page.waitForTimeout(1000);
out.afterClick = { dialogs: await dialogs(), editor: await editorState() };
await watch();
await page.keyboard.type('Kap', { delay: 120 });
await page.waitForTimeout(1500);
out.afterTyping = { added: await added(), editor: await editorState() };
await watch();
await page.keyboard.press('Tab');
await page.waitForTimeout(1200);
out.afterTab = { added: await added(), editor: await editorState(), focusIn: await page.evaluate(() => document.activeElement?.closest('[contenteditable="true"], textarea') ? 'editor' : (document.activeElement?.tagName ?? null)) };
await page.keyboard.press('Escape');
// Clear without Enter: select all inside the editor and delete.
await page.locator(sel).filter({ visible: true }).first().click().catch(() => {});
await page.keyboard.press('Control+A');
await page.keyboard.press('Backspace');
await page.waitForTimeout(500);
out.afterClear = await editorState();
out.sentNothing = true;
const shot = await page.screenshot({ type: 'png' });
save(config, 'compose', { 'measure.json': out, 'shot.png': shot }, [login]);
console.log(`${config}: editor=${visible.tag}${visible.attrs['data-slate-editor'] ? '[slate]' : ''} typed="${out.afterTyping.editor.text?.trim()}" tab="${out.afterTab.editor.text?.trim()}" cleared="${out.afterClear.text?.trim()}"`);
await ctx.close();
