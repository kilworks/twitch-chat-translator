import { afterEach, describe, expect, it } from 'vitest';
import { mentionsOf, parseChatContent, setChannelEmotes } from './emoteParser';

describe('realText (what we actually translate)', () => {
  it('drops emote-only messages to empty realText', () => {
    expect(parseChatContent('[emote:1:KEKW] [emote:2:PepeLaugh]').realText).toBe('');
  });
  it('drops url-only messages to empty realText', () => {
    expect(parseChatContent('https://discord.gg/foo').realText).toBe('');
  });
  it('drops mention-only messages to empty realText', () => {
    expect(parseChatContent('@joao').realText).toBe('');
  });
  it('keeps the real words, removing emotes/mentions/urls', () => {
    const r = parseChatContent('@joao vamos [emote:1:KEKW] https://x.io agora');
    expect(r.realText).toBe('vamos  agora'.replace(/\s+/g, ' ').trim());
  });
});

describe('parseChatContent', () => {
  it('returns plain text untouched when there are no markers', () => {
    const r = parseChatContent('hello world');
    expect(r.plain).toBe('hello world');
    expect(r.realText).toBe('hello world');
    expect(r.tokens).toEqual([{ kind: 'text', value: 'hello world' }]);
  });

  it('extracts an emote token and replaces it with a readable placeholder', () => {
    const r = parseChatContent('hi [emote:123:Kappa] there');
    expect(r.tokens).toHaveLength(3);
    const emote = r.tokens[1];
    expect(emote).toEqual({ kind: 'emote', id: '123', name: 'Kappa' });
    expect(r.plain).toBe('hi :Kappa: there');
  });

  it('extracts mention with leading whitespace preserved', () => {
    const r = parseChatContent('yo @adin nice');
    const mention = r.tokens.find((t) => t.kind === 'mention');
    expect(mention).toEqual({ kind: 'mention', user: 'adin' });
    expect(r.plain).toContain('@adin');
  });

  it('extracts URLs without breaking adjacent text', () => {
    const r = parseChatContent('check https://kick.com/foo now');
    const url = r.tokens.find((t) => t.kind === 'url');
    expect(url).toEqual({ kind: 'url', href: 'https://kick.com/foo' });
    expect(r.plain).toBe('check [link] now');
  });

  it('does not double-match overlapping URLs and mentions', () => {
    const r = parseChatContent('see https://kick.com/@adin x');
    const url = r.tokens.find((t) => t.kind === 'url');
    expect(url?.kind).toBe('url');
    // the @adin inside the URL must not be extracted as a mention
    const mention = r.tokens.find((t) => t.kind === 'mention');
    expect(mention).toBeUndefined();
  });

  it('strips multiple emotes correctly', () => {
    const r = parseChatContent('[emote:1:A] [emote:2:B] text');
    const emotes = r.tokens.filter((t) => t.kind === 'emote');
    expect(emotes).toHaveLength(2);
    expect(r.plain).toBe(':A: :B: text');
  });
});

describe('the inline emote-name stripper leaves ordinary words alone', () => {
  // Measured over 11583 words of the store listings: the previous rules
  // destroyed 30 distinct ordinary words before anything was translated, and
  // the reader saw a translation of a sentence they had not written. Nothing
  // pinned those rules, so all ten tests above passed either way.
  const intacts = [
    // Turkish forms the negative aorist with -mez. An `ez` alternative in the
    // suffix list deleted a whole grammatical class, in the second most read of
    // the localised listings.
    'bu is gerekmez ama yine de deneyelim',
    'o gelmez ve bize haber göndermez',
    // Spanish and Czech pay the same price for `ez`.
    'no me lo puedo creer otra vez lo mismo',
    'bez problemu, uvidime se zitra',
    // A lowercase word of thirteen characters or more is ordinary in Spanish,
    // Portuguese, Turkish, German and Finnish. The rule that deleted those
    // caught exactly one emote name, which the suffix rule catches too.
    'que configuracion usas para el raton',
    'esto es completamente diferente amigo',
    'obrigado pelo armazenamento gratuito',
    // lul, kek, jam, hug, love, wave and dab end ordinary words. Measured on the
    // 30000 most frequent words of 37 languages, the open suffix rule deleted 309
    // of them, 23 in every 10000 words of Romanian text.
    'felul in care joaca copilul e incredibil',
    'erkek arkadasi geldi mi',
    'a gyerekek is nezik',
    'espero que vejam o jogo e sejam felizes',
    'jutri se ne strinjam s tabo',
    'mes ejam majas',
    'that thug stole the microwave and a glove',
    'Ta kardab oma isa',
  ];

  for (const phrase of intacts) {
    it(`keeps every word of ${JSON.stringify(phrase.slice(0, 28))}`, () => {
      expect(parseChatContent(phrase).realText).toBe(phrase);
    });
  }

  it('still strips emote names mixed into a sentence', () => {
    expect(parseChatContent('hola pepeLaugh que tal la partida').realText).toBe(
      'hola que tal la partida',
    );
    expect(parseChatContent('eso fue OMEGALUL de verdad').realText).toBe('eso fue de verdad');
    expect(parseChatContent('mira namedarumajankiss2 ahora').realText).toBe('mira ahora');
    for (const name of ['CATJAM', 'catjam', 'peepohug', 'peepoLove', 'ezclap', 'omegalul', 'pepejam', 'dogjam']) {
      expect(parseChatContent(`hola ${name} amigo`).realText).toBe('hola amigo');
    }
  });
});

// Toute la phrase tenait parfois dans le nom propre : "LeBron is the best player
// ever" arrivait au lecteur sans LeBron. Les deux listes sont celles des bancs du
// 2026-10-16 (scratchpad classify-mixedcase / classify-heldout).
describe('names and brands survive, 7TV emote names do not', () => {
  it('keeps brand and person names', () => {
    for (const w of ['iPhone', 'eBay', 'YouTube', 'TikTok', 'PlayStation', 'PayPal', 'LeBron', 'McDonald', 'iPad', 'DeVito', 'GitHub', 'ChatGPT']) {
      expect(parseChatContent(`I saw ${w} today`).realText).toBe(`I saw ${w} today`);
    }
  });

  it('removes emote names typed as text', () => {
    for (const w of ['pepeLaugh', 'catJam', 'monkaS', 'peepoHappy', 'widepeepoHappy', 'modCheck', 'peepoClap', 'PogChamp', 'PepeHands', 'FeelsBadMan', 'BibleThump']) {
      expect(parseChatContent(`so funny ${w} really`).realText).toBe('so funny really');
    }
  });
});

describe('mentionsOf', () => {
  it('returns each @mention once, as typed', () => {
    expect(mentionsOf('@Bob merci @alice et @bob')).toEqual(['@Bob', '@alice']);
    expect(mentionsOf('mail me at a@b.com')).toEqual([]);
    expect(mentionsOf('no mention here')).toEqual([]);
  });
});


describe('with the channel emote list loaded', () => {
  afterEach(() => setChannelEmotes([]));

  it('removes exactly the names of the list, case kept', () => {
    setChannelEmotes(['KEKW', 'catJAM', 'Okayge']);
    expect(parseChatContent('KEKW that was so funny catJAM').realText).toBe('that was so funny');
    // Not an emote of this channel: a real word stays even when it is shaped like one.
    expect(parseChatContent('kekw iPhone LeBron').realText).toBe('kekw iPhone LeBron');
  });

  it('no longer guesses once the list is known', () => {
    setChannelEmotes(['KEKW']);
    // pepeLaugh is caught by the name heuristic, which is only the fallback now.
    expect(parseChatContent('hola pepeLaugh amigos').realText).toBe('hola pepeLaugh amigos');
    setChannelEmotes([]);
    expect(parseChatContent('hola pepeLaugh amigos').realText).toBe('hola amigos');
  });

  it('keeps cheermotes out', () => {
    setChannelEmotes(['KEKW']);
    expect(parseChatContent('Cheer100 bonne chance Kappa500').realText).toBe('bonne chance');
    // A word that only starts like a prefix is not a cheer.
    expect(parseChatContent('Partytime 2024').realText).toBe('Partytime 2024');
  });
});
