/**
 * The Chrome Web Store listing, driven from outside the browser.
 *
 * No API sets a Chrome description or a permission justification, and no
 * extension may act on the dashboard: the Web Store is a protected page for
 * every extension, Claude in Chrome included (measured on Chrome and on Brave).
 * The Chrome DevTools Protocol is not an extension. This script speaks it
 * directly over the WebSocket built into Node, with no dependency.
 *
 *   node scripts/stores/cws-listing.mjs launch     # Brave on a dedicated profile, debugging on
 *   node scripts/stores/cws-listing.mjs inspect    # read-only: what the listing page holds
 *   node scripts/stores/cws-listing.mjs paste      # store/chrome/description/<lang>.txt, every language
 *
 * Signing in is a person's job, once: `launch` opens the dashboard in a
 * profile kept under ~/.config/twitch-chat-translator/cws-browser, the person
 * signs in by hand, and the profile stays signed in for every later run. This
 * script never types a credential and stops if Google asks for one.
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LISTINGS, chromeCode } from './languages.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PORT = Number(process.env.CWS_CDP_PORT ?? 9222);
// CWS_PROFILE: an already signed-in dashboard profile (one publisher account serves both products).
const PROFILE = process.env.CWS_PROFILE ?? path.join(os.homedir(), '.config', 'twitch-chat-translator', 'cws-browser');
const PUBLISHER = 'ef2a9029-0a4d-4858-bb63-4ca619ffd657';
const ITEM = process.env.CWS_ITEM_ID; // no listing yet (PLAN K04); never the Kick one
// CWS_EDIT_URL points the script at a stand-in page for its own test.
export const EDIT_URL = process.env.CWS_EDIT_URL ?? `https://chrome.google.com/webstore/devconsole/${PUBLISHER}/${ITEM}/edit`;
const BROWSERS = [
  process.env.CWS_BROWSER,
  'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** A minimal CDP session on one page target. */
export class Cdp {
  static async open(urlPart = '/devconsole/') {
    const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    let t = targets.find((x) => x.type === 'page' && x.url.includes(urlPart));
    if (!t) t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(EDIT_URL)}`, { method: 'PUT' })).json();
    const cdp = new Cdp(t.webSocketDebuggerUrl);
    await cdp.ready;
    // A tab left in the background takes no synthetic clicks: verify opened no
    // menu at all once the person had switched to another tab after paste.
    await cdp.send('Page.bringToFront');
    return cdp;
  }
  constructor(wsUrl) {
    this.id = 0;
    this.pending = new Map();
    this.ws = new WebSocket(wsUrl);
    this.ready = new Promise((ok, ko) => {
      this.ws.onopen = ok;
      this.ws.onerror = () => ko(new Error(`cannot reach ${wsUrl}`));
    });
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      const p = this.pending.get(msg.id);
      if (!p) return;
      this.pending.delete(msg.id);
      if (msg.error) p.ko(new Error(`${msg.error.message} ${msg.error.data ?? ''}`));
      else p.ok(msg.result);
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((ok, ko) => this.pending.set(id, { ok, ko }));
  }
  /** Evaluate an expression in the page and return its value. */
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result.value;
  }
  close() {
    this.ws.close();
  }
}

async function launch() {
  const exe = BROWSERS.find((b) => fs.existsSync(b));
  if (!exe) throw new Error('no Brave or Chrome found; set CWS_BROWSER');
  fs.mkdirSync(PROFILE, { recursive: true });
  const child = spawn(exe, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--no-first-run', EDIT_URL], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
  for (let i = 0; i < 30; i++) {
    try {
      await fetch(`http://127.0.0.1:${PORT}/json/version`);
      console.log(`browser up on ${PORT}, profile ${PROFILE}`);
      console.log('First time only: sign in to the dashboard account in that window, by hand.');
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error(`no debugging endpoint on ${PORT} after 15s`);
}

/** Read-only survey of the page, the basis for every selector `paste` uses. */
const SURVEY = `(() => {
  const vis = (e) => e.getClientRects().length > 0;
  const label = (e) => (e.getAttribute('aria-label') || e.labels?.[0]?.textContent || e.getAttribute('placeholder') || e.name || e.id || '').trim().slice(0, 60);
  return {
    url: location.href,
    title: document.title,
    signIn: /accounts\\.google\\.com/.test(location.href),
    textareas: [...document.querySelectorAll('textarea')].filter(vis).map((t) => ({ label: label(t), len: t.value.length, head: t.value.slice(0, 50) })),
    combos: [...document.querySelectorAll('select, [role=combobox], [role=listbox], [aria-haspopup=listbox], [aria-haspopup=true]')].filter(vis).map((c) => ({ tag: c.tagName, label: label(c), text: c.textContent.trim().slice(0, 50) })),
    buttons: [...new Set([...document.querySelectorAll('button, [role=button]')].filter(vis).map((b) => (b.getAttribute('aria-label') || b.textContent).trim().slice(0, 40)).filter(Boolean))].slice(0, 40),
    nav: [...new Set([...document.querySelectorAll('a, [role=tab], [role=menuitem]')].filter(vis).map((a) => a.textContent.trim().slice(0, 40)).filter(Boolean))].slice(0, 40),
  };
})()`;

/**
 * A tab of the item, as the dashboard's own links spell it (read with `links`):
 * the listing is `edit`, the others hang under it, `edit/privacy`.
 */
const pageUrl = (tab = 'edit') => (tab === 'edit' ? EDIT_URL : `${EDIT_URL}/${tab}`);

async function inspect(tab = 'edit') {
  const cdp = await Cdp.open();
  const here = await cdp.eval('location.href');
  if (!here.startsWith(pageUrl(tab))) {
    await cdp.send('Page.navigate', { url: pageUrl(tab) });
    await sleep(6000);
  }
  const info = await cdp.eval(SURVEY);
  console.log(JSON.stringify(info, null, 1));
  cdp.close();
  if (info.signIn) {
    console.error('Google is asking for a sign-in: do it by hand in that window, then run inspect again.');
    process.exit(3);
  }
}

/**
 * The Chrome locale code of each listing language. The dashboard writes
 * "<name> (en dash) <code>" with the name in its own interface language ("anglais (en dash)
 * en" on a French dashboard), so the code after the dash is what is matched,
 * as a whole word: `fr` must not pick `fr_CA`, nor `es` pick `es-419`.
 */
export const LANG_CODES = Object.fromEntries(Object.keys(LISTINGS).map((l) => [l, chromeCode(l)]));
/** Source of the in-page test for one option's text. */
// Hebrew: the Kick listing's picker says iw, a listing created on 2026-10-23 says he.
const pickerCode = (lang) => (LANG_CODES[lang] === 'iw' ? '(?:he|iw)' : LANG_CODES[lang]);
const matcher = (lang) => `((t) => new RegExp('\\u2013\\\\s*${pickerCode(lang)}(?![A-Za-z0-9_-])').test(t))`;

/** Runs in the page: the description field, the language picker, the save button. */
const LOCATE = `(() => {
  const vis = (e) => e.getClientRects().length > 0;
  const text = (e) => (e.getAttribute('aria-label') || e.labels?.[0]?.textContent || e.closest('label, [class*=field]')?.textContent || '').toLowerCase();
  const areas = [...document.querySelectorAll('textarea')].filter(vis);
  const desc = areas.find((t) => /description/.test(text(t))) ?? areas.sort((a, b) => b.value.length - a.value.length)[0];
  const picker = [...document.querySelectorAll('select, [role=combobox], [aria-haspopup=listbox]')].filter(vis)
    .find((c) => /lang/.test(text(c) + ' ' + (c.id || '') + ' ' + (c.getAttribute('aria-labelledby') || '')) || /^\s*(langue|language)/i.test(c.textContent));
  const save = [...document.querySelectorAll('button, [role=button]')].filter(vis)
    .find((b) => /save draft|enregistrer le brouillon|^save$|^enregistrer$/i.test(b.textContent.trim()));
  for (const [k, e] of Object.entries({ desc, picker, save })) if (e) e.setAttribute('data-kt-cws', k);
  return { desc: !!desc, picker: picker ? picker.tagName + ':' + picker.textContent.trim().slice(0, 40) : null, save: save ? save.textContent.trim() : null };
})()`;

/** Center of a marked element, for real mouse input. */
// Scrolled into view first: a click outside the viewport lands on nothing,
// which is what a fresh load (scrolled to the top) did to the language picker.
const centre = (key) => `(() => { const e = document.querySelector('[data-kt-cws=${key}]'); e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`;

async function click(cdp, { x, y }) {
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  for (const type of ['mousePressed', 'mouseReleased'])
    await cdp.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
}

/** Switch the listing to a language, through the page's own picker. */
/**
 * Switch the listing to a language, retried: the picker misses a language at
 * random (bn, then es, on 3.2.0), so one try made every run a partial one.
 */
async function chooseLanguage(cdp, lang) {
  for (let i = 0; i < 3; i++) {
    if (await chooseLanguageOnce(cdp, lang)) return true;
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await sleep(1000);
    await cdp.eval(LOCATE);
  }
  return false;
}

async function chooseLanguageOnce(cdp, lang) {
  const is = matcher(lang);
  const native = await cdp.eval(`(() => {
    const p = document.querySelector('[data-kt-cws=picker]');
    if (p?.tagName !== 'SELECT') return null;
    const o = [...p.options].find((o) => ${is}(o.textContent));
    if (!o) return false;
    p.value = o.value; p.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  })()`);
  if (native !== null) return native;
  await click(cdp, await cdp.eval(centre('picker')));
  await sleep(800);
  if (process.env.CWS_DEBUG)
    console.log(lang, JSON.stringify(await cdp.eval(`(() => {
      const p = document.querySelector('[data-kt-cws=picker]');
      const opts = [...document.querySelectorAll('[role=option], mat-option, li')].filter((e) => e.getClientRects().length);
      return { picker: p?.textContent.trim().slice(0, 40), expanded: p?.getAttribute('aria-expanded'), options: opts.length, first: opts.filter((o) => /\\u2013/.test(o.textContent)).map((o) => o.textContent.trim().slice(0, 30)) };
    })()`)));
  const at = await cdp.eval(`(() => {
    const o = [...document.querySelectorAll('[role=option], mat-option, li')].filter((e) => e.getClientRects().length)
      .find((e) => ${is}(e.textContent));
    if (!o) return null;
    o.scrollIntoView({ block: 'center' });
    const r = o.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  })()`);
  if (!at) return false;
  await click(cdp, at);
  // The picker can switch late: 3.1.0 typed Hindi into the Hebrew listing and
  // Japanese into the Italian one. Write only once it shows the language.
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    // LOCATE again: the picker may be re-rendered and lose its mark. Its text
    // ends with the Material icon's ligature ("...(en dash) ararrow_drop_down").
    if (await cdp.eval(`(${LOCATE}, ${is}((document.querySelector('[data-kt-cws=picker]')?.textContent ?? '').replace(/arrow_drop_\\w+|expand_\\w+/g, ' ')))`)) {
      await sleep(1000);
      return true;
    }
  }
  return false;
}

/** Replace the description with real keyboard input, then read it back. */
async function writeDescription(cdp, text) {
  await click(cdp, await cdp.eval(centre('desc')));
  await cdp.eval(`document.querySelector('[data-kt-cws=desc]').select()`);
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Delete', code: 'Delete', windowsVirtualKeyCode: 46 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Delete', code: 'Delete', windowsVirtualKeyCode: 46 });
  await cdp.send('Input.insertText', { text });
  await sleep(300);
  const back = (await cdp.eval(`document.querySelector('[data-kt-cws=desc]').value`)).replace(/\r\n/g, '\n').trim();
  const want = text.replace(/\r\n/g, '\n').trim();
  if (back !== want && process.env.CWS_DEBUG) {
    let i = 0;
    while (back[i] === want[i]) i++;
    console.log(`read-back ${back.length} chars, wanted ${want.length}; first difference at ${i}: ${JSON.stringify(back.slice(i, i + 40))} vs ${JSON.stringify(want.slice(i, i + 40))}`);
  }
  return back === want;
}

async function paste(dry) {
  const dir = path.join(ROOT, 'store/chrome/description');
  const only = process.env.CWS_LANGS?.split(',');
  const langs = fs.readdirSync(dir).filter((f) => f.endsWith('.txt')).map((f) => f.slice(0, -4)).filter((l) => !only || only.includes(l));
  // A draft in review is frozen: every field types, nothing sticks, and the
  // read-back fails in all languages (3.1.0, 42/42). Ask the API first.
  if (!dry) {
    const st = spawnSync(process.execPath, [path.join(ROOT, 'scripts/stores/cws.mjs'), 'status'], { encoding: 'utf8' });
    if (/"state":\s*"(PENDING_REVIEW|IN_REVIEW)"/.test(st.stdout)) {
      console.error('A submission is in review and the draft is locked: node scripts/stores/cws.mjs cancel, then paste, then cws.mjs publish.');
      process.exit(5);
    }
  }
  const cdp = await Cdp.open();
  const here = await cdp.eval('location.href');
  if (/accounts\.google\.com/.test(here)) throw new Error('Google is asking for a sign-in: do it by hand, then rerun.');
  if (here.split(/[?#]/)[0] !== EDIT_URL) {
    await cdp.send('Page.navigate', { url: EDIT_URL });
    await sleep(6000);
  }
  const found = await cdp.eval(LOCATE);
  console.log(`page: description ${found.desc ? 'found' : 'MISSING'}, language picker ${found.picker ?? 'MISSING'}, save ${found.save ?? 'MISSING'}`);
  if (!found.desc || !found.picker || !found.save) {
    console.error('Not every piece was found: run inspect and adjust LOCATE before writing anything.');
    process.exit(4);
  }
  const done = [];
  const failed = [];
  for (const lang of langs) {
    if (!LANG_CODES[lang]) {
      failed.push(`${lang} (no name mapping)`);
      continue;
    }
    if (!(await chooseLanguage(cdp, lang))) {
      failed.push(`${lang} (language not offered by the picker)`);
      continue;
    }
    await cdp.eval(LOCATE);
    if (dry) {
      done.push(lang);
      continue;
    }
    const text = fs.readFileSync(path.join(dir, `${lang}.txt`), 'utf8').trim();
    if (!(await writeDescription(cdp, text))) {
      failed.push(`${lang} (read-back differs)`);
      continue;
    }
    await click(cdp, await cdp.eval(centre('save')));
    await sleep(2500);
    done.push(lang);
  }
  // The last save was cut off by closing at once: vi, zh-TW and zh kept the
  // old text on 3.2.0 while the run said 42/42.
  await sleep(5000);
  cdp.close();
  console.log(`${dry ? 'located' : 'pasted and saved'}: ${done.length}/${langs.length} ${done.join(' ')}`);
  if (failed.length) {
    console.error(`not done: ${failed.join(', ')}`);
    process.exit(1);
  }
}

/**
 * Read-only: reload the listing from the server and compare, language by
 * language, what the dashboard kept with store/chrome/description/<lang>.txt.
 * `paste` reads each field back before saving; this reads what was saved.
 */
async function verify() {
  const dir = path.join(ROOT, 'store/chrome/description');
  const langs = fs.readdirSync(dir).filter((f) => f.endsWith('.txt')).map((f) => f.slice(0, -4));
  const cdp = await Cdp.open();
  await cdp.send('Page.navigate', { url: EDIT_URL });
  await sleep(7000);
  const found = await cdp.eval(LOCATE);
  if (!found.desc || !found.picker) throw new Error('listing page not as expected: run inspect');
  const same = [];
  const differ = [];
  for (const lang of langs) {
    if (!(await chooseLanguage(cdp, lang))) {
      differ.push(`${lang} (not offered)`);
      continue;
    }
    await cdp.eval(LOCATE);
    const live = (await cdp.eval(`document.querySelector('[data-kt-cws=desc]').value`)).replace(/\r\n/g, '\n').trim();
    const want = fs.readFileSync(path.join(dir, `${lang}.txt`), 'utf8').replace(/\r\n/g, '\n').trim();
    if (live === want) same.push(lang);
    else differ.push(`${lang} (${live.slice(0, 30).replace(/\n/g, ' ')}...)`);
  }
  cdp.close();
  console.log(`saved and identical: ${same.length}/${langs.length} ${same.join(' ')}`);
  if (differ.length) {
    console.error(`differ: ${differ.join(', ')}`);
    process.exit(1);
  }
}

/**
 * Read-only: what the dashboard says blocks the submission. The API only ever
 * answers INVALID_ITEM_METADATA; the "why can't I submit" panel names the field.
 */
async function why() {
  const cdp = await Cdp.open();
  const at = await cdp.eval(`(() => {
    const b = [...document.querySelectorAll('button, [role=button]')].find((e) => /pourquoi ne puis-je pas|why can.t i submit/i.test(e.textContent));
    if (!b) return null;
    b.setAttribute('data-kt-cws', 'why');
    return true;
  })()`);
  if (!at) {
    console.log('no "why can not I submit" button: the dashboard sees nothing blocking');
    cdp.close();
    return;
  }
  await click(cdp, await cdp.eval(centre('why')));
  await sleep(1500);
  const said = await cdp.eval(`(() => {
    const box = [...document.querySelectorAll('[role=dialog], [role=tooltip], [role=alertdialog], .mdc-dialog, mat-dialog-container, [class*=popup], [class*=dialog]')]
      .filter((e) => e.getClientRects().length).map((e) => e.innerText.trim()).filter(Boolean);
    return box.length ? box : [document.body.innerText.slice(0, 0)];
  })()`);
  console.log(said.join('\\n---\\n') || '(no panel text found)');
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  cdp.close();
}

/**
 * The Privacy tab's permission justifications, from the repository's text.
 *
 * Each dashboard field is "Justification de l'autorisation <name>", one per
 * permission, plus one for all host permissions together. In 3.0.2 the
 * scripting text was pasted by hand into the host field, which left scripting
 * empty, overwrote the host justification, and kept Chrome refusing the
 * submission. This writes each field from its own block, only where it differs.
 */
function justificationTexts() {
  const raw = fs.readFileSync(path.join(ROOT, 'store/chrome/dashboard/permission-justifications.txt'), 'utf8');
  const blocks = raw.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const body = (b) => b.split('\n').slice(1).join(' ').replace(/\s+/g, ' ').trim();
  const byName = {};
  const hosts = [];
  for (const b of blocks) {
    const head = b.split('\n')[0].trim();
    if (/^host permissions?:/i.test(head)) hosts.push(`${head.replace(/^host permissions?:\s*/i, '')}: ${body(b)}`);
    else if (/^[a-z]+$/.test(head)) byName[head] = body(b);
  }
  return { byName, host: hosts.join('\n\n') };
}

async function justify(dry) {
  const { byName, host } = justificationTexts();
  for (const [k, v] of Object.entries({ ...byName, host }))
    if (v.length > 1000) throw new Error(`${k}: ${v.length} characters, the field takes 1000`);
  const cdp = await Cdp.open();
  await cdp.send('Page.navigate', { url: pageUrl('privacy') });
  await sleep(6000);
  // Mark each justification field with the permission it belongs to.
  const NAMES_JS = JSON.stringify(Object.keys(byName));
  const fields = await cdp.eval(`(() => {
    const NAMES = ${NAMES_JS};
    const out = {};
    for (const t of document.querySelectorAll('textarea')) {
      if (!t.getClientRects().length) continue;
      const l = (t.getAttribute('aria-label') || t.labels?.[0]?.textContent || t.closest('[class*=field]')?.textContent || '').replace(/\\s+/g, ' ');
      const m = l.match(/justification de l.autorisation (\\S+)|permission justification (\\S+)/i);
      if (!m) continue;
      // The label runs into the field's own text ("alarmsto keep..."): match
      // the permission names the repository knows rather than cut the label.
      const name = /h[oô]te|host/i.test(l) ? 'host' : NAMES.find((n) => new RegExp('autorisation ' + n + '|justification ' + n, 'i').test(l));
      if (!name) continue;
      t.setAttribute('data-kt-cws', 'j-' + name);
      out[name] = t.value;
    }
    return out;
  })()`);
  const want = { ...Object.fromEntries(Object.keys(fields).filter((n) => n !== 'host' && byName[n]).map((n) => [n, byName[n]])), host };
  const todo = Object.keys(want).filter((n) => n in fields && fields[n].trim() !== want[n].trim());
  const missing = Object.keys(fields).filter((n) => !(n in want));
  console.log(`fields: ${Object.keys(fields).join(', ')} | to write: ${todo.join(', ') || 'none'}${missing.length ? ' | no text for: ' + missing.join(', ') : ''}`);
  if (dry || !todo.length) return cdp.close();
  for (const n of todo) {
    await click(cdp, await cdp.eval(centre('j-' + n)));
    await cdp.eval(`document.querySelector('[data-kt-cws="j-${n}"]').select()`);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Delete', code: 'Delete', windowsVirtualKeyCode: 46 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Delete', code: 'Delete', windowsVirtualKeyCode: 46 });
    await cdp.send('Input.insertText', { text: want[n] });
    await sleep(300);
    const back = await cdp.eval(`document.querySelector('[data-kt-cws="j-${n}"]').value`);
    if (back.trim() !== want[n].trim()) throw new Error(`${n}: read-back differs, nothing saved`);
  }
  if (process.argv.includes('--nosave')) {
    // Diagnosis: what the form says once the fields are written, before any save.
    console.log(JSON.stringify(await cdp.eval(`(() => {
      const vis = (e) => e.getClientRects().length > 0;
      const saves = [...document.querySelectorAll('button, [role=button]')].filter(vis).filter((e) => /enregistrer|save/i.test(e.textContent));
      return {
        save: saves.map((b) => ({ text: b.textContent.trim().slice(0, 30), disabled: b.disabled || b.getAttribute('aria-disabled') === 'true' })),
        errors: [...document.querySelectorAll('[role=alert], [class*=error], [aria-invalid=true]')].filter(vis).map((e) => (e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 90)).filter(Boolean).slice(0, 10),
        emptyRequired: [...document.querySelectorAll('textarea[required], textarea[aria-required=true]')].filter((t) => vis(t) && !t.value.trim()).map((t) => {
          const box = t.closest('section, fieldset, [class*=card], [class*=section]');
          return (t.getAttribute('aria-label') || box?.innerText || '').replace(/\\s+/g, ' ').slice(0, 160);
        }),
        radios: [...document.querySelectorAll('input[type=radio], [role=radio]')].filter(vis).map((r) => {
          const lab = (r.labels?.[0]?.textContent || r.getAttribute('aria-label') || r.closest('label, [class*=radio]')?.textContent || '').trim().slice(0, 50);
          return (r.checked || r.getAttribute('aria-checked') === 'true' ? '[x] ' : '[ ] ') + lab;
        }),
      };
    })()`), null, 1));
    return cdp.close();
  }
  // Visible only: a hidden copy of the button took the first click and saved nothing.
  const saveFound = await cdp.eval(`(() => { const b = [...document.querySelectorAll('button, [role=button]')].filter((e) => e.getClientRects().length).find((e) => /enregistrer le brouillon|save draft/i.test(e.textContent)); if (!b) return false; b.setAttribute('data-kt-cws', 'save'); return true; })()`);
  if (!saveFound) throw new Error('no visible save button on the Privacy tab');
  // The fields were right and a person's click on Save kept them, so the
  // writing works and the save did not land: either the synthetic click
  // missed the button in the sticky header, or the fixed 4s wait reloaded the
  // page before the save request finished. Wait for the dashboard to say it
  // saved, and fall back to the element's own click once.
  const saved = async () => {
    for (let i = 0; i < 30; i++) {
      await sleep(500);
      const said = await cdp.eval(`(() => {
        const toast = [...document.querySelectorAll('[role=status], [role=alert], [aria-live]')].map((e) => e.textContent.trim()).find((t) => /enregistr|saved/i.test(t));
        const b = document.querySelector('[data-kt-cws=save]');
        return toast || (b && (b.disabled || b.getAttribute('aria-disabled') === 'true') ? 'save button off: nothing left to save' : '');
      })()`);
      if (said) return said;
    }
    return '';
  };
  await click(cdp, await cdp.eval(centre('save')));
  let confirmation = await saved();
  if (!confirmation) {
    await cdp.eval(`document.querySelector('[data-kt-cws=save]').click()`);
    confirmation = await saved();
  }
  console.log(`save: ${confirmation || 'no confirmation seen in 30s'}`);
  // Read back from the server, not from the field just typed into.
  await cdp.send('Page.navigate', { url: pageUrl('privacy') });
  await sleep(6000);
  const after = await cdp.eval(`(() => {
    const NAMES = ${NAMES_JS};
    const out = {};
    for (const t of document.querySelectorAll('textarea')) {
      const l = (t.getAttribute('aria-label') || t.labels?.[0]?.textContent || t.closest('[class*=field]')?.textContent || '').replace(/\\s+/g, ' ');
      const m = l.match(/justification de l.autorisation (\\S+)|permission justification (\\S+)/i);
      const name = m && (/h[oô]te|host/i.test(l) ? 'host' : NAMES.find((n) => new RegExp('autorisation ' + n + '|justification ' + n, 'i').test(l)));
      if (name) out[name] = t.value;
    }
    return out;
  })()`);
  cdp.close();
  const ok = todo.filter((n) => (after[n] ?? '').trim() === want[n].trim());
  console.log(`saved and read back: ${ok.length}/${todo.length} ${ok.join(' ')}`);
  if (ok.length !== todo.length) process.exit(1);
}

/** Read-only: the dashboard's own links, so no tab URL is guessed. */
async function links() {
  const cdp = await Cdp.open();
  await cdp.send('Page.navigate', { url: EDIT_URL });
  await sleep(6000);
  const found = await cdp.eval(`[...document.querySelectorAll('a[href]')].filter((a) => a.getClientRects().length && a.href.includes('/devconsole/')).map((a) => a.textContent.trim().slice(0, 40) + ' -> ' + a.getAttribute('href'))`);
  console.log([...new Set(found)].join('\n'));
  cdp.close();
}

/**
 * Read-only: what the dashboard says about the draft, and whether it still
 * offers "Envoyer pour examen". The API's PENDING_REVIEW is not enough: after
 * a listing change the dashboard kept the button live and kil had to click it.
 */
async function status() {
  const cdp = await Cdp.open();
  await cdp.send('Page.navigate', { url: `${EDIT_URL}/status` });
  await sleep(6000);
  const said = await cdp.eval(`document.body.innerText.split('\\n').map((l) => l.trim()).filter((l) => /examen|review|attente|publi|brouillon|draft|refus|rejet/i.test(l)).slice(0, 10)`);
  console.log('Etat:', said.join(' | ') || '(nothing about review on the page)');
  // The button lives on the listing page, not on the status tab.
  await cdp.send('Page.navigate', { url: EDIT_URL });
  await sleep(6000);
  const button = await cdp.eval(`(() => {
    const b = [...document.querySelectorAll('button, [role=button]')].find((e) => /envoyer pour examen|submit for review/i.test(e.textContent));
    if (!b) return 'absent';
    return b.disabled || b.getAttribute('aria-disabled') === 'true' ? 'greyed out' : 'LIVE: the draft is not submitted';
  })()`);
  console.log('"Envoyer pour examen":', button);
  cdp.close();
}

const cmd = process.argv[2];
/**
 * create <zip>: a new item, the one thing the API cannot do. Clicks "Ajouter un élément" on the
 * dashboard home, hands the zip to the file input through CDP (never a native dialog), and
 * prints the new item's id once the dashboard has moved to its edit page.
 */
async function create(zip) {
  if (!zip || !fs.existsSync(zip)) throw new Error(`zip not found: ${zip}`);
  const cdp = await Cdp.open('/devconsole/');
  const home = `https://chrome.google.com/webstore/devconsole/${PUBLISHER}`;
  if (!(await cdp.eval('location.href')).startsWith(home)) {
    await cdp.send('Page.navigate', { url: home });
    await sleep(6000);
  }
  const clicked = await cdp.eval(`(() => {
    // The button's words can sit in aria-label only, its text being an icon ligature.
    const b = [...document.querySelectorAll('button, [role=button], a')].find((e) => /Ajouter un .l.ment|Add new item|New item/i.test((e.getAttribute('aria-label') ?? '') + ' ' + e.textContent) && e.getClientRects().length);
    if (!b) return false;
    b.click();
    return true;
  })()`);
  if (!clicked) throw new Error('no "Ajouter un élément" button on the dashboard home');
  let input = null;
  await cdp.send('DOM.enable');
  for (let i = 0; i < 20 && !input; i++) {
    await sleep(500);
    const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });
    const r = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: 'input[type=file]' });
    if (r.nodeId) input = r.nodeId;
  }
  if (!input) throw new Error('no file input appeared after the click');
  await cdp.send('DOM.setFileInputFiles', { nodeId: input, files: [path.resolve(zip)] });
  for (let i = 0; i < 120; i++) {
    await sleep(1000);
    const here = await cdp.eval('location.href');
    const m = new RegExp(`/devconsole/${PUBLISHER}/([a-p]{32})`).exec(here);
    if (m) {
      console.log(`item created: ${m[1]}`);
      cdp.close();
      return;
    }
  }
  console.log(JSON.stringify(await cdp.eval(SURVEY), null, 1));
  cdp.close();
  throw new Error('the dashboard did not open an item page within 2 minutes');
}

/**
 * assets: the listing's images and category, for a first submission. Each file input is
 * matched by the words of its own field block (icon, screenshots, small promo tile), the
 * files go in through CDP, the category is picked by its label, then the draft is saved.
 * Files: public/icons/icon128.png, store/chrome/images/0*.png, store/chrome/images/promo-small.png.
 */
async function assets() {
  const cdp = await Cdp.open();
  await cdp.send('Page.navigate', { url: pageUrl('edit') });
  await sleep(7000);
  const blocks = await cdp.eval(`(() => [...document.querySelectorAll('input[type=file]')].map((inp, i) => {
    inp.setAttribute('data-kt-file', String(i));
    let n = inp, text = '';
    for (let d = 0; n && d < 8 && text.length < 40; d++, n = n.parentElement) text = (n.innerText || '').trim();
    return { i, accept: inp.accept, multiple: inp.multiple, text: text.replace(/\\s+/g, ' ').slice(0, 120) };
  }))()`);
  console.log(JSON.stringify(blocks, null, 1));
  const img = (f) => path.join(ROOT, 'store/chrome/images', f);
  const shots = fs.readdirSync(path.join(ROOT, 'store/chrome/images')).filter((f) => /^0\d.*\.png$/.test(f)).sort().map(img);
  // International screenshots first: localized ones only show in the language they belong to.
  // CWS_ONLY=shots limits a rerun to them.
  const plan = [
    [/ic[oô]ne|icon/i, [path.join(ROOT, 'public/icons/icon128.png')]],
    [/internationa/i, shots],
    [/petite|small|vignette/i, [img('promo-small.png')]],
  ].filter(([re]) => process.env.CWS_ONLY !== 'shots' || String(re).includes('internationa'));
  await cdp.send('DOM.enable');
  const done = [];
  for (const [re, files] of plan) {
    const b = blocks.find((x) => re.test(x.text) && !done.includes(x.i));
    if (!b) {
      console.log(`no input for ${re}`);
      continue;
    }
    const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `input[data-kt-file="${b.i}"]` });
    // A single-file input takes the files one at a time, each upload clearing the input.
    for (const f of b.multiple ? [files] : files.map((f) => [f])) {
      await cdp.send('DOM.setFileInputFiles', { nodeId, files: f });
      await sleep(4000);
    }
    done.push(b.i);
    console.log(`${re}: ${files.length} file(s) into input ${b.i}`);
  }
  // Category: open the select, pick the communication entry.
  const cat = await cdp.eval(`(async () => {
    const sel = [...document.querySelectorAll('[role=combobox], [aria-haspopup=listbox]')].find((c) => /Cat.gorie|Category/i.test((c.getAttribute('aria-label') || '') + c.textContent));
    if (!sel) return 'no category select';
    sel.click();
    await new Promise((r) => setTimeout(r, 1200));
    const opt = [...document.querySelectorAll('[role=option]')].find((o) => /communication/i.test(o.textContent) && o.getClientRects().length);
    if (!opt) return 'options: ' + [...document.querySelectorAll('[role=option]')].map((o) => o.textContent.trim()).slice(0, 30).join(' | ');
    opt.click();
    return 'picked ' + opt.textContent.trim();
  })()`);
  console.log(`category: ${cat}`);
  await sleep(1500);
  const saved = await cdp.eval(`(() => { const b = [...document.querySelectorAll('button')].find((e) => /Enregistrer le brouillon|Save draft/i.test(e.textContent)); if (!b || b.disabled) return 'save button ' + (b ? 'disabled' : 'missing'); b.click(); return 'clicked'; })()`);
  console.log(`save: ${saved}`);
  await sleep(6000);
  cdp.close();
}

/** Every checkbox, radio and text input of the Privacy tab with the words of its own label. */
const PRIVACY_SURVEY = `(() => [...document.querySelectorAll('input[type=checkbox], input[type=radio], input[type=text], input[type=url], input:not([type]), textarea')].filter((e) => e.getClientRects().length || e.type === 'checkbox' || e.type === 'radio').map((e, i) => {
  e.setAttribute('data-kt-p', String(i));
  let n = e, text = '';
  for (let d = 0; n && d < 6 && text.length < 8; d++, n = n.parentElement) text = (n.innerText || '').trim();
  // A text field's nearest block is its counter ("0/1 000"): its own label says what it is.
  const own = (e.getAttribute('aria-label') || e.labels?.[0]?.textContent || '').trim();
  if (own) text = own + ' ' + text;
  return { i, type: e.type || e.tagName, checked: e.checked ?? null, len: (e.value || '').length, text: text.replace(/\\s+/g, ' ').slice(0, 90) };
}))()`;

/**
 * Writes `text` into the element tagged data-kt-p=i the way `justify` does and the form
 * notices: a real mouse click in the field, select, Delete, then insertText. Focus set from
 * script plus synthetic char events left the form unaware (nothing saved).
 */
async function typeInto(cdp, i, text) {
  const at = await cdp.eval(`(() => { const e = document.querySelector('[data-kt-p="${i}"]'); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
  await sleep(300);
  await click(cdp, at);
  await cdp.eval(`document.querySelector('[data-kt-p="${i}"]').select()`);
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Delete', code: 'Delete', windowsVirtualKeyCode: 46 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Delete', code: 'Delete', windowsVirtualKeyCode: 46 });
  await cdp.send('Input.insertText', { text });
  await sleep(300);
}

/**
 * privacy [--survey]: the Privacy tab of a first submission. Texts from
 * store/chrome/dashboard (single purpose, permission justifications), remote code answered
 * "no", the data categories and the three certifications of data-usage.txt, the privacy
 * policy URL on raw.githubusercontent.com (the blob page answers 503 to Google's checker).
 */
async function privacy(surveyOnly) {
  const cdp = await Cdp.open();
  await cdp.send('Page.navigate', { url: pageUrl('privacy') });
  await sleep(7000);
  const fields = await cdp.eval(PRIVACY_SURVEY);
  if (surveyOnly) {
    console.log(JSON.stringify(fields, null, 1));
    cdp.close();
    return;
  }
  const { byName, host } = justificationTexts();
  const purpose = fs.readFileSync(path.join(ROOT, 'store/chrome/dashboard/single-purpose.txt'), 'utf8').replace(/\s+/g, ' ').trim();
  const find = (re, type) => fields.find((f) => (!type || f.type === type) && re.test(f.text));
  const texts = [
    [/objectif unique|single purpose/i, purpose],
    [/autorisation storage/i, byName.storage],
    [/autorisation alarms/i, byName.alarms],
    [/autorisation scripting/i, byName.scripting],
    [/Autorisation d'acc|host permission/i, host],
  ];
  for (const [re, text] of texts) {
    const f = find(re, 'textarea');
    if (!f || !text) {
      console.log(`no field or text for ${re}`);
      continue;
    }
    await typeInto(cdp, f.i, text);
    console.log(`typed ${text.length} characters into "${f.text.slice(0, 40)}"`);
  }
  const click = (i) => cdp.eval(`(() => { const e = document.querySelector('[data-kt-p="${i}"]'); e.scrollIntoView({ block: 'center' }); e.click(); return e.checked; })()`);
  const remoteNo = fields.find((f) => f.type === 'radio' && /^Non\b|^No\b/i.test(f.text) && /distant|remote/i.test(f.text)) ?? fields.find((f) => f.type === 'radio' && /^Non\b|^No\b/i.test(f.text));
  if (remoteNo && !remoteNo.checked) console.log(`remote code "no": ${await click(remoteNo.i)}`);
  for (const re of [/authentification|authentication/i, /communications personnelles|personal communications/i, /contenu du site|website content/i, /ne vends pas|not being sold|tiers/i, /sans rapport|unrelated/i, /d.terminer leur|creditworthiness/i]) {
    const f = find(re, 'checkbox');
    if (!f) console.log(`no checkbox for ${re}`);
    else if (!f.checked) console.log(`checked "${f.text.slice(0, 50)}": ${await click(f.i)}`);
  }
  const url = fields.find((f) => f.type !== 'textarea' && f.type !== 'checkbox' && f.type !== 'radio' && /confidentialit|privacy/i.test(f.text));
  if (url) {
    await typeInto(cdp, url.i, 'https://raw.githubusercontent.com/kilworks/twitch-chat-translator/master/PRIVACY.md');
    console.log('privacy policy URL typed');
  } else console.log('no privacy URL field');
  await sleep(1000);
  const saved = await cdp.eval(`(() => { const b = [...document.querySelectorAll('button')].find((e) => /Enregistrer le brouillon|Save draft/i.test(e.textContent)); if (!b || b.disabled) return 'save button ' + (b ? 'disabled' : 'missing'); b.click(); return 'clicked'; })()`);
  console.log(`save: ${saved}`);
  await sleep(6000);
  await cdp.send('Page.navigate', { url: pageUrl('privacy') });
  await sleep(7000);
  const after = await cdp.eval(PRIVACY_SURVEY);
  console.log(`read back: ${after.filter((f) => f.type === 'textarea' && f.len > 0).length} text fields filled, ${after.filter((f) => f.checked).length} boxes ticked`);
  cdp.close();
}

if (cmd === 'links') await links();
else if (cmd === 'privacy') await privacy(process.argv.includes('--survey'));
else if (cmd === 'assets') await assets();
else if (cmd === 'create') await create(process.argv[3]);
else if (cmd === 'status') await status();
else if (cmd === 'justify') await justify(process.argv.includes('--dry'));
else if (cmd === 'why') await why();
else if (cmd === 'launch') await launch();
else if (cmd === 'inspect') await inspect(process.argv[3]);
else if (cmd === 'paste') await paste(process.argv.includes('--dry'));
else if (cmd === 'verify') await verify();
else {
  console.error('usage: cws-listing.mjs launch | status | inspect | paste [--dry] | verify | why | links');
  process.exit(2);
}
