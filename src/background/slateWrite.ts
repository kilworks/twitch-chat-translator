/**
 * Runs in the PAGE's world (chrome.scripting, world: 'MAIN'), so it must stay
 * self-contained: no imports, no outer variables, it is sent as source text.
 *
 * Twitch's composer is a Slate editor in 8/8 extension configs
 * (`[data-a-target="chat-input"][data-slate-editor]`, RECON/<config>/compose). A synthetic
 * `beforeinput` over a DOM selection depends on Slate having synced that selection, which it
 * does on an async `selectionchange`. So the editor is reached through the React tree and
 * written through its own API: the whole document selected, then `editor.insertText`, which
 * replaces an expanded selection in one operation. Emote names stay words: Twitch sends
 * emotes as text and draws them from the words.
 *
 * Returns false when no editor is reachable, so the caller falls back to a DOM write.
 */
export function ecrireDansSlate(text: string): boolean {
  type SlateNode = { text?: string; children?: SlateNode[] };
  type Point = { path: number[]; offset: number };
  type Editor = {
    children: SlateNode[];
    selection: { anchor: Point; focus: Point } | null;
    apply(op: unknown): void;
    insertText(t: string): void;
  };
  const el = document.querySelector('[data-kt-composer]') ?? document.querySelector('[data-slate-editor]');
  if (!el) return false;
  const fiberKey = Object.keys(el).find((k) => k.startsWith('__reactFiber$'));
  type Fiber = { memoizedProps?: { editor?: Editor }; return?: Fiber };
  let f = fiberKey ? ((el as unknown as Record<string, Fiber>)[fiberKey] ?? undefined) : undefined;
  let editor: Editor | undefined;
  for (let d = 0; f && d < 60 && !editor; d++, f = f.return) {
    const e = f.memoizedProps?.editor;
    if (e && typeof e.insertText === 'function' && Array.isArray(e.children)) editor = e;
  }
  if (!editor) return false;

  // First and last text leaves: the whole document as one range.
  const leaves: { path: number[]; len: number }[] = [];
  const walk = (nodes: SlateNode[], base: number[]): void =>
    nodes.forEach((n, i) => {
      const path = [...base, i];
      if (typeof n.text === 'string') leaves.push({ path, len: n.text.length });
      else if (n.children) walk(n.children, path);
    });
  walk(editor.children, []);
  const first = leaves[0];
  const last = leaves[leaves.length - 1];
  if (!first || !last) return false;
  editor.apply({
    type: 'set_selection',
    properties: editor.selection,
    newProperties: { anchor: { path: first.path, offset: 0 }, focus: { path: last.path, offset: last.len } },
  });
  editor.insertText(text);
  return true;
}
