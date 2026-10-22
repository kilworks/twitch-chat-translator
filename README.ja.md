<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Twitch のどの配信のチャットも自分の言語で読み、チャンネルの言語で返信できます。<br>
無料、アカウント不要、設定も不要。チャットでも拡張機能の画面でも、43 言語に対応。

**[最新リリースをダウンロード](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome、Brave、Edge、Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="スペイン語のチャットが一件ずつ届き、それぞれの下に英語の訳が付く。続いて英語の返信を入力すると、チャット欄の上にスペイン語のプレビューが現れ、Tab で置き換わる" width="360">

</div>

## 使い方

1. インストールして、Twitch の配信を開きます。チャット上部の紫のバーが、動作中であることを示します。
2. メッセージが届くたびに、そのすぐ下にブラウザの言語で訳が表示されます。ライブ配信でも VOD でもクリップでも同じです。
3. 返信は自分の言語で入力します。チャット欄の上にチャンネルの言語でプレビューが表示され、Tab を押すかクリックすると、入力した文がその訳に置き換わります。

チャンネルの言語は配信者が Twitch で設定した言語なので、設定は要りません。どちらの言語も設定で変更でき、読む言語はチャンネルごとに記憶させることもできます。

7TV や BTTV も使っている場合、それらはエモートの補完に Tab を使います。その場合、Tab はまずエモートを補完し、補完するものがなかったときだけ翻訳を挿入します。Ctrl/Cmd+Enter とクリックは、いつでも翻訳を挿入します。

## 主な機能

- **43 言語**。右から左に書く言語（アラビア語、ヘブライ語、ペルシア語）も含み、地域の変種は別扱いです（ブラジル・ポルトガル語とヨーロッパ・ポルトガル語、簡体字と繁体字の中国語、広東語）
- **チャットのある場所ならどこでも**: ライブチャット、ポップアウト、埋め込み、モデレータービュー、配信マネージャー、VOD とクリップのリプレイ。www.twitch.tv、m.twitch.tv、dashboard.twitch.tv で、7TV、BTTV、FFZ があってもなくても使えます
- **拡張機能自体も 43 言語で表示**: 設定、ポップアップ、チャットのバーが対応し、国旗つきのメニューから選べます
- **そのまま無料**で使える Google 翻訳。ヨーロッパ言語の品質を上げたいなら、自分の無料 DeepL キーを追加できます。エンジンが失敗したときは MyMemory と Lingva が引き継ぎます
- **端末内翻訳**: ブラウザが提供する場合、Chrome と Edge で使えます。ネットワークもクォータも使わず、テキストはマシンの外に出ません
- **フィルター**: ボットを飛ばす、ユーザーやチャンネルをミュート、特定の単語を含む行を隠す、選んだ言語だけを翻訳
- **流れの速いチャット向け**: チャンネルの 7TV、BTTV、FFZ のエモート名は、それらの拡張機能を使っていなくても翻訳しません。リンクと @メンションは送信前に分けておきます。エンジンが崩す名前のための用語集と、翻訳キャッシュもあります
- **四つの表示スタイル**: メッセージの下、同じ行、メッセージと置き換え、ホバー時のみ
- **一つのチャンネルだけ一時停止**: チャットバーから操作でき、ほかのチャンネルは止まりません。チャンネルを切り替えても、拡張機能を更新しても、開いているタブは再読み込みなしで翻訳を続けます
- **モデレーションに対応**: モデレーターが削除したメッセージ、タイムアウトやバンで消えたメッセージは、翻訳も消えます
- **Twitch らしい見た目**: 紫を基調にし、テーマを選ばない限りチャット自体のダークまたはライトに合わせます
- Chrome、Brave、Edge、Firefox

| 流れるチャットをそのまま翻訳 | ツールバーのポップアップ |
|---|---|
| <img src="screenshots/chat.png" alt="スペイン語の各メッセージの下に英語の訳が付いた Twitch のチャット。一覧の上に拡張機能のステータスバー" width="360"> | <img src="screenshots/popup.png" alt="翻訳先の言語、表示スタイル、入力プレビューの設定、プロバイダーの連鎖が並ぶ拡張機能のポップアップ" width="360"> |

| 送信する前の入力文 | 言語を選ぶ、または任せる |
|---|---|
| <img src="screenshots/compose.png" alt="英語のメッセージが入ったチャット欄と、その上に送信されるスペイン語版のプレビュー" width="360"> | <img src="screenshots/languages.png" alt="国旗と言語名を検索できる一覧。チャンネルの言語が先頭" width="360"> |

<sub>このリポジトリが作った架空のチャットルームで、公開中のビルドから撮影しています。ユーザー名とメッセージは架空で、翻訳はローカルで返しているため、実在の人のハンドルはこのページに載りません。</sub>

## インストール

[Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) からブラウザに合った zip をダウンロードして展開します。

- Chrome、Brave、Edge（`…-chromium.zip`）: `chrome://extensions` を開き、デベロッパーモードをオンにして「パッケージ化されていない拡張機能を読み込む」からフォルダを選びます。
- Firefox 121 以降（`…-firefox.zip`）: `about:debugging#/runtime/this-firefox` を開き、「一時的なアドオンを読み込む」から `manifest.json` を選びます。
  Firefox は再起動すると一時的なアドオンを忘れます。

この方法で入れたものは自動更新されません。新しいバージョンがあるとアイコンにバッジが付き、ポップアップから最新リリースに移動できます。

## 翻訳エンジン

四つのプロバイダーをつないでいます。一つが失敗すると次が引き継ぎます。順番は自分で決められます。

| プロバイダー | キー | 備考 |
|---|---|---|
| Google | 不要 | 既定、すぐに使えます |
| DeepL | 無料 | ヨーロッパ言語で最良、[無料キー](https://www.deepl.com/pro-api)で月 100 万文字 |
| MyMemory | 不要 | 予備 |
| Lingva | 不要 | 予備、自分のインスタンスを指定しない限り公開インスタンス |

Chromium 内蔵の翻訳機は、ネットワークもクォータも使いません。Chrome と Edge 138 以降で使える場合がありますが、すべての環境で使えるわけではなく、言語ペアごとにバーからワンクリックでモデルを一度ダウンロードする必要があります。Firefox にはありません。使えない環境ではクラウドが引き継ぎ、何も壊れません。

## 設定

チャットのバーの歯車をクリックするか、拡張機能のアイコンを右クリックして「オプション」を選びます。

- **プロバイダー**: エンジンの順番、DeepL キー、モード（端末内を優先、クラウドを優先、端末内のみ）
- **表示**: 翻訳先の言語、表示スタイル、原文と翻訳元言語のバッジ、文字サイズ、行間、書体、アクセントカラー、チャットのテーマ、入力プレビューとそのクリック時の動作
- **フィルター**: ボット、ユーザー、チャンネル、キーワード、翻訳元の言語、置換の用語集
- **詳細**: キャッシュのサイズと期限、同時リクエスト数、チャンネルごとのレート制限、バックアップと復元
- **アクティビティ**: 翻訳したメッセージ数、キャッシュのヒット、チャットで見かけた全言語、直近 50 行それぞれを訳した理由と訳さなかった理由
- **キーボード**: Alt+Shift+T でチャット翻訳（Alt+T は Twitch のシアターモード）、Alt+W で入力プレビューをオン・オフ。どちらもブラウザの拡張機能ショートカットで割り当て直せます
- チャットのアクションバーの、メッセージ欄の下にある言語ボタン: クリックで書く言語の一覧が開き、入力で絞り込めます。チャット上部のボタンは読む言語を決めます

## 対応言語

英語 · フランス語 · スペイン語 · ポルトガル語 · ポルトガル語（ブラジル） · ドイツ語 · イタリア語 · オランダ語 · ポーランド語 · スウェーデン語 · チェコ語 · スロバキア語 · ルーマニア語 · ロシア語 · ウクライナ語 · トルコ語 · アラビア語 · ヘブライ語 · 日本語 · 韓国語 · 中国語（簡体字） · 中国語（繁体字） · タイ語 · ベトナム語 · インドネシア語 · ヒンディー語 · フィンランド語 · ノルウェー語 · デンマーク語 · ギリシャ語 · ハンガリー語 · ブルガリア語 · カタルーニャ語 · スロベニア語 · エストニア語 · リトアニア語 · ラトビア語 · ペルシア語 · ベンガル語 · タミル語 · マレー語 · フィリピン語 · 広東語

チャットはどの言語にも翻訳でき、拡張機能自体の画面もそれぞれの言語で表示できます。

## プライバシー

アカウントも私のサーバーもありません。アクセス解析は、同意した場合に1日1回 Google Analytics へ送る匿名集計（使ったエンジン、エラー、速度）だけで、メッセージ、名前、チャンネルは一切送りません。チャットのメッセージと、入力プレビューがオンのときの下書きは、選んだ翻訳プロバイダーにだけ送られ、端末内モードではそこにも送られません。チャンネルの言語を知るために Twitch にチャンネルの配信言語と id を問い合わせ、エモート名を翻訳に入れないために 7TV、BetterTTV、FrankerFaceZ にチャンネルのエモート名を問い合わせます。これで先方に伝わるのはそのチャンネルの id だけです。ストアから入れた拡張機能はほかに何も通信しません。手動で入れたものは、更新バッジを出すかどうかを知るために、最長で六時間に一度 GitHub に最新リリースのタグを問い合わせます。[詳細](PRIVACY.md)

## よくある質問

**メッセージが翻訳されない。**
設定のアクティビティタブで「決定を読む」を押してください。直近 50 行と、それぞれを訳した理由、訳さなかった理由が表示されます。飛ばされた行のほとんどは意図的です。同じユーザーの繰り返し、短すぎる行、絵文字や笑いだけの行、すでに読む言語になっている行などです。タブに何も表示されない場合は拡張機能がチャットを見つけられていないので、issue を開いてください。

**紫のバーが消えた。**
ページを再読み込みしてください。また起きたら、チャンネルとその前にしたことを添えて [issue](https://github.com/kilworks/twitch-chat-translator/issues) を開いてください。

**翻訳の質を上げるには？**
設定で無料の DeepL キーを追加してください。無料枠は月 100 万文字で、DeepL は無料エンジンより良くなる言語ペアにだけ使われます。

**どの表示スタイルを使えばいい？**
メッセージの下です。ほかの三つも動きますが、まだ調整中です。

**拡張機能を自分の言語で使える？**
はい。ブラウザの言語に合わせて表示され、設定の上部にあるメニューから 43 言語のどれにも切り替えられます。

**7TV、BTTV、FFZ と一緒に使える？**
はい、どれがあってもなくても使えます。それらのエモート名は翻訳に入りません。

**VOD やクリップでも動く？**
はい、ライブ配信と同じように動きます。

**Twitch の更新のあとで動かなくなった。**
Twitch はときどきチャットの構造を変えます。[issue](https://github.com/kilworks/twitch-chat-translator/issues) を開いてもらえれば修正します。

**Twitch の公式？**
いいえ。Twitch とは関係のない、独立したオープンソースのプロジェクトです。

## 新機能

Twitch 向けの最初のリリースである 1.0.0 の変更点：

- Twitch のチャットを三つの形で読み取ります。Twitch 自身のリスト（BTTV や FFZ があっても可）、7TV のリスト、VOD とクリップのリプレイで、ポップアウト、埋め込み、モデレータービュー、配信マネージャー、モバイルにも対応します
- 翻訳をメッセージ欄に、エモートを文字のまま残して書き込みます。チャンネルの 7TV、BTTV、FFZ のエモート名は翻訳しません
- チャンネルの言語は Twitch から取得し、削除されたメッセージは翻訳も消え、見た目は紫で Twitch のダークまたはライトのチャットに合わせます
- Alt+Shift+T で翻訳をオン・オフし、Tab は 7TV や BTTV が直前にエモートを補完しなかったときだけ翻訳を挿入し、言語ボタンはメッセージ欄の下のアクションバーにあります

各リリースの変更点とその裏付けの計測は
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) と [CHANGELOG.md](CHANGELOG.md) にあります。

## 開発

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

ビルドは再現可能です。同じコミットからは、どのマシンでもバイト単位で同一の zip ができます。確認は、タグの `git archive` を空のフォルダでビルドしてハッシュを比べて行います。

ユニットテストに加えて、オフラインゲートがビルド済みの拡張機能を実際のブラウザに読み込み、操作して、その動作を検証します。ページはローカルで配信し、翻訳エンジンの応答もローカルです。Playwright が必要ですが、意図的に依存関係には入れていません。`node_modules` に Playwright が入っているフォルダを `UX_KIT` で指定するか、`npm i -D playwright` を実行してください。

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

インターフェースの文字列は `src/shared/i18n/`（ポップアップとオプション、英語の文をキーにしています）と `src/content/i18n/`（チャットのバー、id をキーにして英語の文を代替とします）にあり、言語ごとに 1 ファイルです。テストはすべてのファイルに完全なキーの集合を求めます。ストア向けの文章は [store/](store/) にあり、リリースはバージョンタグです。CI がビルドと検査を行い、両方のストアに公開します。

技術スタック: Manifest V3、Vite、TypeScript、Preact、Tailwind。

## 関連プロジェクト

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni)（[Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)）、同じ作者による Kick チャット用の同じ翻訳ツール

## ライセンス

MIT。Twitch とは関係ありません。
