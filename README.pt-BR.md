<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Leia o chat de qualquer chat da Twitch no seu idioma e responda na língua do canal.<br>
Grátis, sem conta, nada para configurar. 43 idiomas, no chat e na própria extensão.

**[Baixar a última versão](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge e Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Mensagens de chat em espanhol chegam uma a uma, cada uma com a tradução em inglês logo abaixo; depois uma resposta em inglês é digitada, uma prévia em espanhol aparece acima da caixa de chat e o Tab a coloca no lugar" width="360">

</div>

## Como funciona

1. Instale e abra qualquer live da Twitch. Uma barra roxa no topo do chat indica que está ligada.
2. Cada mensagem ganha a tradução logo abaixo, à medida que chega, no idioma do seu navegador. Vale para
   lives, VODs e clipes.
3. Digite uma resposta no seu idioma. Uma prévia acima da caixa de chat a mostra no idioma do canal: aperte
   Tab ou clique nela, e essa versão substitui o que você digitou.

O idioma do canal é o que o streamer definiu na Twitch, então não há nada para configurar. Os dois idiomas podem ser
trocados nas configurações, e o idioma de leitura pode ser lembrado por canal.

Se você usa também o 7TV ou o BTTV, eles usam o Tab para terminar um emote. O Tab termina então o emote primeiro e
só insere a tradução quando não havia nada para terminar. Ctrl/Cmd+Enter e um clique sempre a inserem.

## O que você leva

- **43 idiomas**, incluindo os escritos da direita para a esquerda (árabe, hebraico, persa), com as variantes
  regionais separadas (português do Brasil e de Portugal, chinês simplificado e tradicional, cantonês)
- **Em todo lugar onde há chat**: chat ao vivo, popout, embed, visão de moderador, gerenciador da transmissão, replay
  de VODs e de clipes, em www.twitch.tv, m.twitch.tv e dashboard.twitch.tv, com ou sem 7TV, BTTV e FFZ
- **A extensão também fala todos eles**: configurações, janela e barra do chat nos 43, escolhidos num menu com bandeiras
- **Grátis de fábrica** com o Google Tradutor. Adicione sua própria chave gratuita do DeepL para melhorar os
  idiomas europeus; MyMemory e Lingva assumem quando um motor falha
- **Tradução no próprio dispositivo** no Chrome e no Edge quando o navegador oferece: sem rede, sem cota, e
  o texto nunca sai do seu computador
- **Filtros**: pular bots, silenciar usuários ou canais, esconder linhas que contenham uma palavra, traduzir
  só os idiomas que você escolher
- **Feita para chats rápidos**: os nomes dos emotes dos conjuntos 7TV, BTTV e FFZ do canal nunca são
  traduzidos, mesmo que você não use essas extensões, links e @menções são postos de lado antes de qualquer envio,
  um glossário para os nomes que os motores estragam, um cache de traduções
- **Quatro estilos de exibição**: abaixo da mensagem, na mesma linha, no lugar dela, ou só ao passar o mouse
- **Pause um canal** pela barra do chat sem parar os outros. Ao trocar de canal ou atualizar a extensão,
  as abas abertas continuam traduzindo, sem recarregar
- **Atenta à moderação**: uma mensagem apagada por um moderador, um timeout ou um ban perde a tradução também
- **Com a cara da Twitch**: roxo, e segue o tema escuro ou claro do próprio chat, a menos que você escolha um
- Chrome, Brave, Edge e Firefox

| O chat, traduzido enquanto rola | A janela da barra de ferramentas |
|---|---|
| <img src="screenshots/chat.png" alt="Chat da Twitch em que cada mensagem em espanhol traz a tradução em inglês logo abaixo, com a barra de status da extensão acima da lista" width="360"> | <img src="screenshots/popup.png" alt="A janela da extensão com o idioma de destino, o estilo de exibição, a configuração da prévia de escrita e a cadeia de provedores" width="360"> |

| O que você digita, antes de enviar | Escolha um idioma, ou deixe que ela escolha |
|---|---|
| <img src="screenshots/compose.png" alt="A caixa de chat com uma mensagem em inglês e, acima, uma prévia com a versão em espanhol que será enviada" width="360"> | <img src="screenshots/languages.png" alt="Uma grade pesquisável de bandeiras e nomes de idiomas, com o idioma do canal primeiro" width="360"> |

<sub>Capturas da versão publicada numa sala de chat que este repositório inventa: os nomes e as mensagens são
fictícios e as traduções são respondidas localmente, então nenhum usuário real aparece aqui.</sub>

## Instalação

Baixe o zip do seu navegador em [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) e descompacte.

- Chrome, Brave, Edge (`…-chromium.zip`): abra `chrome://extensions`, ative o Modo do desenvolvedor, clique em Carregar sem compactação e escolha a pasta.
- Firefox 121+ (`…-firefox.zip`): abra `about:debugging#/runtime/this-firefox`, clique em Carregar extensão temporária e escolha `manifest.json`.
  O Firefox esquece uma extensão temporária quando reinicia.

Uma cópia instalada assim não se atualiza sozinha: o ícone dela mostra um selo quando existe uma versão nova,
e a janela leva à última release.

## Motores de tradução

Quatro provedores encadeados: quando um falha, o próximo assume. A ordem é você quem define.

| Provedor | Chave | Observação |
|---|---|---|
| Google | nenhuma | o padrão, funciona de fábrica |
| DeepL | gratuita | a melhor nos idiomas europeus, [chave gratuita](https://www.deepl.com/pro-api) para 1 milhão de caracteres por mês |
| MyMemory | nenhuma | reserva |
| Lingva | nenhuma | reserva, numa instância pública a menos que você aponte para a sua |

O tradutor embutido do Chromium não precisa de rede nem de cota. O Chrome e o Edge 138 ou mais recentes podem
oferecê-lo, embora nem toda cópia ofereça, e cada par de idiomas precisa baixar o modelo uma vez, com um clique
na barra. O Firefox não tem. Onde ele falta, a cadeia na nuvem assume e nada quebra.

## Configurações

Clique na engrenagem da barra do chat, ou clique com o botão direito no ícone da extensão e escolha Opções.

- **Provedores**: ordem dos motores, sua chave do DeepL e o modo: dispositivo primeiro, nuvem primeiro, ou só
  dispositivo
- **Exibição**: idioma de destino, estilo de exibição, texto original e selo do idioma, tamanho do texto,
  espaçamento entre linhas, fonte, cor de destaque, tema do chat, a prévia de escrita e o que o clique nela faz
- **Filtros**: bots, usuários, canais, palavras-chave, idiomas de origem, e um glossário de substituições
- **Avançado**: tamanho e duração do cache, requisições simultâneas, limite por canal, backup e restauração
- **Atividade**: mensagens traduzidas, acertos do cache, cada idioma visto no chat, e por que cada uma das
  últimas 50 linhas foi traduzida ou não
- **Teclado**: Alt+Shift+T liga ou desliga a tradução do chat (Alt+T é o modo cinema da Twitch), Alt+W a prévia de
  escrita. Os dois podem ser reatribuídos nos atalhos de extensões do seu navegador
- O botão de idioma na barra de ações do chat, abaixo da caixa de mensagem: um clique abre a lista de idiomas em
  que você escreve, digitar filtra. O do topo do chat define o idioma em que você lê

## Idiomas

Inglês · Francês · Espanhol · Português · Português (Brasil) · Alemão · Italiano · Holandês · Polonês · Sueco · Tcheco · Eslovaco · Romeno · Russo · Ucraniano · Turco · Árabe · Hebraico · Japonês · Coreano · Chinês (simplificado) · Chinês (tradicional) · Tailandês · Vietnamita · Indonésio · Hindi · Finlandês · Norueguês · Dinamarquês · Grego · Húngaro · Búlgaro · Catalão · Esloveno · Estoniano · Lituano · Letão · Persa · Bengali · Tâmil · Malaio · Filipino · Cantonês

O chat é traduzido para qualquer um deles, e a interface da própria extensão está disponível em cada um.

## Privacidade

Sem conta, sem servidor próprio e sem analytics, a não ser que você aceite uma contagem diária anônima enviada ao Google Analytics (motores usados, erros, velocidade, nunca suas mensagens, nomes ou canais). As mensagens do chat, e o seu rascunho enquanto a prévia de escrita está ligada, vão para o provedor de
tradução que você escolheu e para nenhum outro lugar, e no modo dispositivo nem para ele. Para saber o idioma do
canal, ela pergunta à Twitch o idioma de transmissão e o id do canal, e para manter os nomes dos emotes fora das
traduções, pergunta ao 7TV, ao BetterTTV e ao FrankerFaceZ os nomes dos emotes do canal, o que diz a eles o id
desse canal e nada mais. Uma cópia instalada de uma loja não faz nenhuma outra requisição. Uma cópia instalada à
mão pergunta ao GitHub a última tag de release, no máximo a cada seis horas, para saber se mostra o selo de
atualização. [Detalhes](PRIVACY.md)

## Perguntas frequentes

**As mensagens não são traduzidas.**
Abra a aba Atividade nas configurações e aperte "Ler decisões": ela lista as últimas 50 linhas e diz por que
cada uma foi traduzida ou não. A maioria das linhas puladas é pulada de propósito: o mesmo usuário se repetindo, linhas curtas demais, só emoji
ou risada, ou já no seu idioma de leitura. Se a aba não mostra nada, a extensão não está vendo o chat: abra uma issue.

**A barra roxa sumiu.**
Recarregue a página. Se acontecer de novo, abra uma [issue](https://github.com/kilworks/twitch-chat-translator/issues)
com o canal e o que você fez antes.

**Como consigo traduções melhores?**
Adicione uma chave gratuita do DeepL nas configurações. O plano gratuito cobre um milhão de caracteres por mês,
e o DeepL só é gasto nos pares de idiomas em que supera os motores gratuitos.

**Qual estilo de exibição devo usar?**
Abaixo da mensagem. Os outros três funcionam e ainda estão sendo ajustados.

**Posso usar a extensão no meu idioma?**
Pode. Ela segue o idioma do seu navegador, e o menu no topo das configurações troca para qualquer um dos 43.

**Funciona com 7TV, BTTV e FFZ?**
Sim, com qualquer um deles ou com nenhum. Os nomes dos emotes deles ficam fora das traduções.

**Funciona em VODs e clipes?**
Sim, do mesmo jeito que ao vivo.

**Parou de funcionar depois de uma atualização da Twitch.**
A Twitch às vezes muda a estrutura do chat. Abra uma [issue](https://github.com/kilworks/twitch-chat-translator/issues)
e ela é corrigida.

**É feita pela Twitch?**
Não. É um projeto independente de código aberto, sem vínculo com a Twitch.

## Novidades

Na 1.0.0, a primeira versão para a Twitch:

- Lê o chat da Twitch nas três formas: a lista própria da Twitch (também com BTTV e FFZ), a lista do 7TV, e o replay de VODs e clipes, em popout, embed, visão de moderador, gerenciador da transmissão e celular
- Escreve as traduções na caixa de mensagem com os emotes mantidos como palavras, e nunca traduz os nomes dos emotes dos conjuntos 7TV, BTTV e FFZ do canal
- O idioma do canal vem da Twitch, uma mensagem apagada perde a tradução, e o visual é roxo e segue o chat escuro ou claro da Twitch
- Alt+Shift+T liga ou desliga a tradução, o Tab só insere a tradução quando o 7TV ou o BTTV não acabaram de completar um emote, e o botão de idioma fica na barra de ações abaixo da caixa de mensagem

Cada versão, com o que mudou e a medição por trás:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) e [CHANGELOG.md](CHANGELOG.md).

## Desenvolvimento

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, testes unitários, build: o controle por onde passa cada pacote
npm run build:firefox    # build do Firefox, na mesma pasta dist/
npm run package:all      # os dois zips, em release/
npm run dev              # HMR
```

Os builds são reproduzíveis: o mesmo commit gera zips idênticos byte a byte em qualquer máquina, verificado
construindo um `git archive` da tag numa pasta vazia e comparando os hashes.

Além dos testes unitários, os testes sem rede carregam a extensão construída num navegador real, operam a
extensão e verificam o que ela faz, com a página e o motor de tradução servidos localmente. Eles precisam do
Playwright, que de propósito não é uma dependência: aponte `UX_KIT` para uma pasta cujo `node_modules` o
contenha, ou rode `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # todos os testes sem rede, sem janela
node test/e2e/store-shots-fixture.mjs --lang=ja         # as capturas da loja, num idioma da página
node test/e2e/store-shots-fixture.mjs --gif             # capturas da loja em inglês, as imagens do README e este GIF
```

Os textos da interface ficam em `src/shared/i18n/` (popup e opções, indexados pelo texto em inglês) e
`src/content/i18n/` (barra do chat, indexados por id com o texto em inglês como reserva), um arquivo por
idioma; os testes exigem de cada arquivo o conjunto completo de chaves. Os textos das lojas ficam em
[store/](store/), e uma release é uma tag de versão: a CI a constrói, verifica e publica nas duas lojas.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Projetos relacionados

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), o mesmo tradutor para o chat da Kick, do mesmo autor

## Licença

MIT. Sem vínculo com a Twitch.
