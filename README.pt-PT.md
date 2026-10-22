<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Lê o chat de qualquer chat da Twitch no teu idioma e responde na língua do canal.<br>
Grátis, sem conta, nada para configurar. 43 idiomas, no chat e na própria extensão.

**[Descarregar a última versão](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge e Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Mensagens de chat em espanhol chegam uma a uma, cada uma com a tradução para inglês por baixo; depois escreve-se uma resposta em inglês, aparece uma pré-visualização em espanhol por cima da caixa do chat e o Tab troca-a" width="360">

</div>

## Como funciona

1. Instala-a e abre qualquer emissão da Twitch. Uma barra roxa no topo do chat indica que está ativa.
2. Cada mensagem recebe a tradução mesmo por baixo, à medida que chega, no idioma do teu navegador. Tanto nas
   emissões em direto como nas VODs e nos clipes.
3. Escreve uma resposta no teu idioma. Uma pré-visualização por cima da caixa do chat mostra-a no idioma do
   canal: carrega em Tab ou clica nela, e essa versão substitui o que escreveste.

O idioma do canal é o que o streamer definiu na Twitch, por isso não há nada para configurar. Os dois idiomas podem ser
alterados nas definições, e o idioma de leitura pode ser memorizado por canal.

Se usas também o 7TV ou o BTTV, eles usam o Tab para acabar um emote. O Tab acaba então primeiro o emote e só
insere a tradução quando não havia nada para acabar. Ctrl/Cmd+Enter e um clique inserem-na sempre.

## O que inclui

- **43 idiomas**, incluindo os que se escrevem da direita para a esquerda (árabe, hebraico, persa), com as
  variantes regionais separadas (português do Brasil e de Portugal, chinês simplificado e tradicional, cantonês)
- **Em todo o lado onde há chat**: chat em direto, popout, embed, vista de moderador, gestor da transmissão,
  repetição de VODs e de clipes, em www.twitch.tv, m.twitch.tv e dashboard.twitch.tv, com ou sem 7TV, BTTV e FFZ
- **A extensão também os fala**: definições, popup e barra do chat nos 43, escolhidos num menu com bandeiras
- **Grátis logo à partida** com o Google Translate. Junta a tua própria chave gratuita do DeepL para melhorar os
  idiomas europeus; o MyMemory e o Lingva assumem quando um motor falha
- **Tradução no dispositivo** no Chrome e no Edge quando o navegador a oferece: sem rede, sem quota, e o texto
  nunca sai do teu computador
- **Filtros**: ignorar bots, silenciar utilizadores ou canais, esconder as linhas que contenham uma palavra,
  traduzir só os idiomas que escolheres
- **Feita para chats rápidos**: os nomes dos emotes dos conjuntos 7TV, BTTV e FFZ do canal nunca são
  traduzidos, mesmo que não uses essas extensões, as ligações e as @menções são postas de lado antes de se enviar
  o que quer que seja, um glossário para os nomes que os motores estropiam, uma cache de traduções
- **Quatro estilos de apresentação**: por baixo da mensagem, na mesma linha, no lugar dela, ou só ao passar o rato
- **Pausa um canal** a partir da barra do chat sem parar os outros. Ao mudar de canal ou atualizar a extensão,
  os separadores abertos continuam a traduzir, sem recarregar
- **Atenta à moderação**: uma mensagem apagada por um moderador, um timeout ou um ban perde também a sua tradução
- **Com o aspeto da Twitch**: roxo, e segue o tema escuro ou claro do próprio chat, a menos que escolhas um
- Chrome, Brave, Edge e Firefox

| O chat, traduzido enquanto corre | O popup da barra de ferramentas |
|---|---|
| <img src="screenshots/chat.png" alt="Chat da Twitch onde cada mensagem em espanhol traz por baixo a tradução para inglês, com a barra de estado da extensão por cima da lista" width="360"> | <img src="screenshots/popup.png" alt="O popup da extensão com o idioma de destino, o estilo de apresentação, a definição da pré-visualização ao escrever e a cadeia de fornecedores" width="360"> |

| O que escreves, antes de enviar | Escolhe um idioma, ou deixa que ela escolha |
|---|---|
| <img src="screenshots/compose.png" alt="A caixa de escrita com uma mensagem em inglês e, por cima, uma pré-visualização com a versão em espanhol que será enviada" width="360"> | <img src="screenshots/languages.png" alt="Uma grelha com pesquisa de bandeiras e nomes de idiomas, com o idioma do canal em primeiro" width="360"> |

<sub>Capturas da versão publicada numa sala de chat que este repositório inventa: os nomes de utilizador e as
mensagens são fictícios e as traduções são respondidas em local, por isso nenhum utilizador real aparece nesta página.</sub>

## Instalação

Descarrega o zip do teu navegador em [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) e descomprime-o.

- Chrome, Brave, Edge (`…-chromium.zip`): abre `chrome://extensions`, ativa o Modo de programador, clica em Carregar sem compactação e escolhe a pasta.
- Firefox 121+ (`…-firefox.zip`): abre `about:debugging#/runtime/this-firefox`, clica em Carregar extensão temporária e escolhe `manifest.json`.
  O Firefox esquece uma extensão temporária quando reinicia.

Uma cópia instalada assim não se atualiza sozinha: o ícone mostra um selo quando existe uma versão mais
recente, e o popup tem uma ligação para a última release.

## Motores de tradução

Quatro fornecedores encadeados: quando um falha, o seguinte assume. A ordem és tu que a defines.

| Fornecedor | Chave | Nota |
|---|---|---|
| Google | nenhuma | o predefinido, funciona logo à partida |
| DeepL | gratuita | a melhor nas línguas europeias, [chave gratuita](https://www.deepl.com/pro-api) para 1 milhão de carateres por mês |
| MyMemory | nenhuma | de reserva |
| Lingva | nenhuma | de reserva, numa instância pública a não ser que apontes para a tua |

O tradutor integrado do Chromium não precisa de rede nem de quota. O Chrome e o Edge 138 e posteriores podem
oferecê-lo, embora nem todas as cópias o façam, e cada par de idiomas precisa de descarregar o seu modelo uma
vez, com um clique a partir da barra. O Firefox não o tem. Onde falta, a cadeia na nuvem assume e nada se parte.

## Definições

Clica na roda dentada da barra do chat, ou clica com o botão direito no ícone da extensão e escolhe Opções.

- **Fornecedores**: ordem dos motores, a tua chave do DeepL e o modo: primeiro no dispositivo, primeiro na
  nuvem, ou só no dispositivo
- **Apresentação**: idioma de destino, estilo de apresentação, texto original e selo de idioma, tamanho do
  texto, espaçamento entre linhas, tipo de letra, cor de destaque, tema do chat, a pré-visualização ao escrever
  e o que acontece ao clicar nela
- **Filtros**: bots, utilizadores, canais, palavras-chave, idiomas de origem, e um glossário de substituições
- **Avançadas**: tamanho e duração da cache, pedidos em simultâneo, limite por canal, cópia de segurança e restauro
- **Atividade**: mensagens traduzidas, acertos da cache, cada idioma visto no chat, e porque é que cada uma das
  últimas 50 linhas foi traduzida ou não
- **Teclado**: Alt+Shift+T liga ou desliga a tradução do chat (Alt+T é o modo de teatro da Twitch), Alt+W a
  pré-visualização ao escrever. Ambos podem ser reatribuídos nos atalhos de extensões do teu navegador
- O botão de idioma na barra de ações do chat, por baixo da caixa de mensagem: um clique abre a lista de idiomas
  em que escreves, escrever filtra-a. O que está no topo do chat define o idioma em que lês

## Idiomas suportados

Inglês · Francês · Espanhol · Português · Português (Brasil) · Alemão · Italiano · Neerlandês · Polaco · Sueco · Checo · Eslovaco · Romeno · Russo · Ucraniano · Turco · Árabe · Hebraico · Japonês · Coreano · Chinês (simplificado) · Chinês (tradicional) · Tailandês · Vietnamita · Indonésio · Hindi · Finlandês · Norueguês · Dinamarquês · Grego · Húngaro · Búlgaro · Catalão · Esloveno · Estónio · Lituano · Letão · Persa · Bengali · Tâmil · Malaio · Filipino · Cantonês

O chat é traduzido para qualquer um deles, e a interface da própria extensão está disponível em todos.

## Privacidade

Nenhuma conta, nenhum servidor meu e nenhuma análise, a menos que opte por uma contagem anónima diária enviada para o Google Analytics (mecanismos utilizados, erros, velocidade, nunca as suas mensagens, nomes ou canais). As mensagens do chat, e o teu rascunho enquanto a pré-visualização ao escrever está ativa, vão para o
fornecedor de tradução que escolheste e para mais lado nenhum, e no modo no dispositivo nem aí. Para saber o
idioma do canal, pergunta à Twitch o idioma de transmissão e o id do canal, e para manter os nomes dos emotes fora
das traduções, pergunta ao 7TV, ao BetterTTV e ao FrankerFaceZ os nomes dos emotes do canal, o que lhes diz o id
desse canal e mais nada. Uma cópia instalada a partir de uma loja não faz mais nenhum pedido. Uma cópia
instalada à mão pergunta ao GitHub qual é a última etiqueta de release, no máximo de seis em seis horas, para
saber se deve mostrar o selo de atualização. [Detalhes](PRIVACY.md)

## Perguntas frequentes

**As mensagens não estão a ser traduzidas.**
Abre o separador Atividade nas definições e carrega em "Ler decisões": mostra as últimas 50 linhas e diz porque
é que cada uma foi traduzida ou não. A maior parte das linhas ignoradas é ignorada de propósito: o mesmo utilizador a repetir-se, linhas demasiado
curtas, só emojis ou risos, ou já no teu idioma de leitura. Se o separador não mostrar nada, a extensão não está a ver o chat: abre um
problema.

**A barra roxa desapareceu.**
Atualiza a página. Se voltar a acontecer, abre um [problema](https://github.com/kilworks/twitch-chat-translator/issues)
com o canal e o que fizeste antes.

**Como consigo melhores traduções?**
Junta uma chave gratuita do DeepL nas definições. O plano gratuito cobre um milhão de carateres por mês, e o
DeepL só é gasto nos pares de idiomas em que ganha aos motores gratuitos.

**Que estilo de apresentação devo usar?**
Por baixo da mensagem. Os outros três funcionam, e ainda estão a ser afinados.

**Posso usar a extensão no meu idioma?**
Sim. Segue o idioma do teu navegador, e o menu no topo das definições muda-o para qualquer um dos 43.

**Funciona com o 7TV, o BTTV e o FFZ?**
Sim, com qualquer um deles ou com nenhum. Os nomes dos seus emotes ficam fora das traduções.

**Funciona em VODs e clipes?**
Sim, tal como nas emissões em direto.

**Deixou de funcionar depois de uma atualização da Twitch.**
A Twitch às vezes muda a forma como o chat é construído. Abre um [problema](https://github.com/kilworks/twitch-chat-translator/issues)
e ela é corrigida.

**É feita pela Twitch?**
Não. É um projeto independente de código aberto, sem qualquer relação com a Twitch.

## Novidades

Na 1.0.0, a primeira versão para a Twitch:

- Lê o chat da Twitch nas suas três formas: a lista própria da Twitch (também com BTTV e FFZ), a lista do 7TV, e a repetição de VODs e clipes, em popout, embed, vista de moderador, gestor da transmissão e telemóvel
- Escreve as traduções na caixa de mensagem com os emotes mantidos como palavras, e nunca traduz os nomes dos emotes dos conjuntos 7TV, BTTV e FFZ do canal
- O idioma do canal vem da Twitch, uma mensagem apagada perde a sua tradução, e o aspeto é roxo e segue o chat escuro ou claro da Twitch
- Alt+Shift+T liga ou desliga a tradução, o Tab só insere a tradução quando o 7TV ou o BTTV não acabaram de completar um emote, e o botão de idioma está na barra de ações por baixo da caixa de mensagem

Cada versão, com o que mudou e a medição por trás:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) e [CHANGELOG.md](CHANGELOG.md).

## Desenvolvimento

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, testes unitários, build: o controlo por que passa cada pacote
npm run build:firefox    # build do Firefox, na mesma pasta dist/
npm run package:all      # os dois zips, em release/
npm run dev              # HMR
```

Os builds são reprodutíveis: o mesmo commit dá zips idênticos byte a byte em qualquer máquina, verificado
construindo um `git archive` da etiqueta numa pasta vazia e comparando os hashes.

Além dos testes unitários, os testes offline carregam a extensão construída num navegador a sério, usam-na e
verificam o que faz, com a página e o motor de tradução servidos em local. Precisam do Playwright, que de
propósito não é uma dependência: aponta `UX_KIT` para uma pasta cujo `node_modules` o contenha, ou corre
`npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # todos os testes offline, sem janela
node test/e2e/store-shots-fixture.mjs --lang=ja         # as capturas da loja, num idioma da ficha
node test/e2e/store-shots-fixture.mjs --gif             # capturas da loja em inglês, as imagens do README e este GIF
```

Os textos da interface estão em `src/shared/i18n/` (popup e opções, indexados pelo texto em inglês) e
`src/content/i18n/` (barra do chat, indexados por id com o texto em inglês como alternativa), um ficheiro por
idioma; os testes exigem a cada ficheiro o conjunto completo de chaves. Os textos das lojas estão em
[store/](store/), e uma release é uma etiqueta de versão: a CI constrói-a, verifica-a e publica-a nas duas lojas.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Projetos relacionados

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), o mesmo tradutor para o chat da Kick, do mesmo autor

## Licença

MIT. Sem relação com a Twitch.
