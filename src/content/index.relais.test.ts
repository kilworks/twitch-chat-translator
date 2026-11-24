import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultSettings } from '~/shared/settings';
import { nativeChat, nativeRow } from './twitchFixtures';

/**
 * Deux copies vivantes du script de contenu dans la meme page.
 *
 * C'est l'etat d'un onglet Kick sur Firefox apres chaque mise a jour : Firefox
 * injecte lui-meme le nouveau script dans les onglets ouverts, ce que Chrome ne
 * fait pas, puis `onInstalled` l'injecte une seconde fois. Les deux copies ont
 * un `chrome.runtime` valide, donc le test d'orphelin ne les separait pas, et
 * chacune traduisait chaque message.
 *
 * Le test charge le module deux fois, comme deux injections, puis pose une
 * ligne et compte qui la passe au pipeline. Rouge sans la passation de
 * `data-kt-instance` : les deux copies la prennent.
 */

const recues: string[] = [];
const eliminees: string[] = [];
let copie = '';
// Les reglages se font attendre tant que `retenir` est vrai, pour rejouer deux
// injections dont la seconde arrive avant que la premiere ait fini de monter.
let retenir = false;
const enAttente: (() => void)[] = [];

vi.mock('~/shared/settingsClient', () => ({
  fetchSettings: () =>
    new Promise((ok) => {
      const rendre = () => ok({ ...defaultSettings(), enabled: true });
      if (retenir) enAttente.push(rendre);
      else rendre();
    }),
  patchSettings: () => Promise.resolve(defaultSettings()),
  watchSettings: () => () => undefined,
}));
vi.mock('./twitchApi', async (orig) => ({
  ...(await orig<object>()),
  fetchChannelLangIso: () => Promise.resolve(undefined),
}));
vi.mock('./pipeline', () => ({
  TranslationPipeline: class {
    private readonly nom = copie;
    updateSettings(): void {}
    dispose(): void {
      eliminees.push(this.nom);
    }
    resetLangBlocked(): void {}
    reapplyBlocked(): void {}
    recentDecisions(): unknown[] {
      return [];
    }
    onDomMessage(): Promise<void> {
      recues.push(this.nom);
      return Promise.resolve();
    }
  },
}));

const rangee = (texte: string, i: number): string => nativeRow(texte, `pseudo${i}`);

const attendre = (ms: number) => new Promise((ok) => setTimeout(ok, ms));

async function injecter(nom: string): Promise<void> {
  copie = nom;
  vi.resetModules();
  await import('./index');
  await attendre(50);
}

describe('deux copies vivantes du script dans un onglet', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    recues.length = 0;
  });

  it('ne laisse que la plus recente prendre les messages', async () => {
    vi.stubGlobal('chrome', {
      runtime: { id: 'kt', onMessage: { addListener: () => undefined }, getURL: (p: string) => p },
    });
    history.replaceState(null, '', '/kt_un');
    document.body.innerHTML =
      nativeChat(rangee('hola amigo que tal', 0));

    await injecter('auto');
    await injecter('onInstalled');
    recues.length = 0;

    document
      .querySelector('[role="log"]')!
      .insertAdjacentHTML('beforeend', rangee('seguimos aqui despues de actualizar', 1));
    await attendre(100);

    expect(recues).toEqual(['onInstalled']);
  });

  // Sur Firefox les deux injections tombent a quelques millisecondes : la
  // premiere copie attend encore ses reglages quand la seconde se nomme.
  it('tient quand la seconde copie arrive pendant le montage de la premiere', async () => {
    vi.stubGlobal('chrome', {
      runtime: { id: 'kt', onMessage: { addListener: () => undefined }, getURL: (p: string) => p },
    });
    const erreurs = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    history.replaceState(null, '', '/kt_un');
    document.body.innerHTML =
      nativeChat(rangee('hola amigo que tal', 0));

    retenir = true;
    await injecter('auto');
    await injecter('onInstalled');
    retenir = false;
    for (const rendre of enAttente.splice(0)) rendre();
    await attendre(50);
    recues.length = 0;

    document
      .querySelector('[role="log"]')!
      .insertAdjacentHTML('beforeend', rangee('seguimos aqui despues de actualizar', 1));
    await attendre(100);

    expect(recues).toEqual(['onInstalled']);
    expect(document.querySelectorAll('#kt-floating-bar').length).toBeLessThanOrEqual(1);
    expect(erreurs).not.toHaveBeenCalled();
    erreurs.mockRestore();
  });
});

// P22: une copie coupee par une mise a jour gardait ses ecouteurs de document et le minuteur du pipeline.
describe('une copie remplacee', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    recues.length = 0;
    eliminees.length = 0;
  });

  it('lache ses ecouteurs de document et son minuteur quand elle se sait remplacee', async () => {
    vi.stubGlobal('chrome', {
      runtime: { id: 'kt', onMessage: { addListener: () => undefined }, getURL: (p: string) => p },
    });
    history.replaceState(null, '', '/kt_un');
    document.body.innerHTML = nativeChat(rangee('hola amigo que tal', 0));
    // Les signaux que la premiere copie a poses sur le document.
    const signals: AbortSignal[] = [];
    const add = document.addEventListener.bind(document);
    vi.spyOn(document, 'addEventListener').mockImplementation(((t: string, l: EventListener, o?: AddEventListenerOptions) => {
      if (copie === 'copie-a' && o && typeof o === 'object' && o.signal) signals.push(o.signal);
      return add(t, l, o);
    }) as typeof document.addEventListener);

    await injecter('copie-a');
    await injecter('copie-b');
    expect(signals.length).toBeGreaterThan(0);
    // La premiere copie s'en apercoit a la ligne suivante.
    document
      .querySelector('[role="log"]')!
      .insertAdjacentHTML('beforeend', rangee('seguimos aqui despues de actualizar', 1));
    await attendre(100);

    expect(signals.every((sg) => sg.aborted)).toBe(true);
    expect(eliminees).toContain('copie-a');
    expect(eliminees).not.toContain('copie-b');
    vi.restoreAllMocks();
  });
});
