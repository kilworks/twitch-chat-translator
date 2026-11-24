/**
 * Handlers for a number input that saves on commit, not on every keystroke.
 *
 * Typing 15000 saved 1, 15, 150 and 1500 on the way, and clearing the box posted 0, which
 * the schema refuses: the red "Not saved." banner for an edit still in progress. The value
 * is checked while typing (aria-invalid, no save) and saved on change, when the field is
 * left or Enter is pressed. An empty or out-of-range value is put back to what is saved.
 */
export function numberField(min: number, max: number, current: number, save: (n: number) => void) {
  const valid = (v: string): boolean => {
    const n = Number(v);
    return v !== '' && Number.isInteger(n) && n >= min && n <= max;
  };
  return {
    onInput: (e: Event) => {
      const el = e.target as HTMLInputElement;
      el.setAttribute('aria-invalid', String(el.value !== '' && !valid(el.value)));
    },
    onChange: (e: Event) => {
      const el = e.target as HTMLInputElement;
      if (valid(el.value)) save(Number(el.value));
      else el.value = String(current);
      el.removeAttribute('aria-invalid');
    },
  };
}
