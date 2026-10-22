<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

用你自己嘅語言睇任何 Twitch 直播嘅聊天室，再用頻道嘅語言回覆。<br>
免費，唔使註冊帳戶，乜都唔使設定。支援 43 種語言，聊天室同擴充功能本身嘅介面都係咁。

**[下載最新版本](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome、Brave、Edge 同 Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md)

<img src="screenshots/demo.gif" alt="西班牙文聊天訊息一條接一條出現，每條下面都有英文翻譯；跟住打一條英文回覆，輸入框上面出現西班牙文預覽，㩒 Tab 就會換咗入去" width="360">

</div>

## 點運作

1. 安裝咗之後開任何一個 Twitch 直播。聊天室頂部有條紫色嘅列，就代表已經開咗。
2. 每條訊息一出現，翻譯就會即刻喺佢下面顯示，用你瀏覽器嘅語言。直播、VOD 同短片（clip）都一樣。
3. 用你自己嘅語言打字回覆。輸入框上面嘅預覽會顯示頻道語言嘅版本：㩒 Tab 或者撳一下佢，你打嘅嘢就會換成呢個版本。

頻道嘅語言係直播主喺 Twitch 設定嘅，所以唔使設定。兩種語言都可以喺設定入面改，閱讀語言仲可以按頻道分別記住。

如果你同時用緊 7TV 或者 BTTV，佢哋都係用 Tab 嚟完成表情符號。咁 Tab 會先完成表情符號，淨係喺冇嘢可以完成嗰陣先會插入翻譯。Ctrl/Cmd+Enter 同撳一下就永遠都會插入。

## 有啲乜

- **43 種語言**，包括由右至左書寫嘅文字（阿拉伯文、希伯來文、波斯文），地區變體亦分開處理
  （巴西葡萄牙文同歐洲葡萄牙文、簡體中文同繁體中文、粵語）
- **聊天室喺邊度，佢就喺邊度**：直播聊天室、彈出視窗（popout）、嵌入（embed）、版主檢視、直播管理器（stream manager）、VOD 同短片重播，喺 www.twitch.tv、m.twitch.tv 同 dashboard.twitch.tv 都用得，有冇裝 7TV、BTTV 同 FFZ 都得
- **擴充功能本身都識講呢 43 種語言**：設定、彈出視窗同聊天列全部都有，用有旗幟嘅選單揀
- **裝完即刻免費用**，用 Google 翻譯。想歐洲語言翻得好啲，可以加你自己嘅免費 DeepL 金鑰；
  有引擎壞咗嗰陣，MyMemory 同 Lingva 會接手
- **裝置端翻譯**：Chrome 同 Edge 喺瀏覽器有提供嗰陣可以用：唔使網絡、冇額度限制，
  啲文字亦都唔會離開你部電腦
- **篩選**：跳過機械人、將用戶或頻道靜音、隱藏有特定字詞嘅訊息、只翻譯你揀嘅語言
- **專為快節奏聊天室而設**：頻道嘅 7TV、BTTV 同 FFZ 表情符號名稱永遠唔會被翻譯，就算你冇裝嗰啲擴充功能都一樣，連結同 @提及喺發送之前就先放埋一邊，另外有俾引擎成日翻錯嘅名用嘅詞彙表，仲有翻譯快取
- **四種顯示樣式**：訊息下方、同一行、直接取代原文，或者淨係游標移過嗰陣先顯示
- **淨係暫停一個頻道**，喺聊天列度撳就得，其他頻道唔受影響。轉頻道或者更新擴充功能之後，已經開咗嘅分頁會繼續翻譯，唔使重新載入
- **識得睇管理動作**：被版主刪除、或者被禁言（timeout）同封鎖（ban）移走嘅訊息，翻譯都會一齊消失
- **成個 Twitch 味**：紫色，而且會跟聊天室自己嘅深色或者淺色主題，除非你另外揀
- 支援 Chrome、Brave、Edge 同 Firefox

| 聊天室一路捲一路翻譯 | 工具列彈出視窗 |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch 聊天室，每條西班牙文訊息下面都有英文翻譯，清單上面係擴充功能嘅狀態列" width="360"> | <img src="screenshots/popup.png" alt="擴充功能嘅彈出視窗，顯示目標語言、顯示樣式、輸入預覽設定同翻譯服務鏈" width="360"> |

| 發送之前，你打嘅嘢 | 自己揀語言，或者等佢幫你揀 |
|---|---|
| <img src="screenshots/compose.png" alt="輸入框入面有一條英文訊息，上面嘅預覽顯示即將發送嘅西班牙文版本" width="360"> | <img src="screenshots/languages.png" alt="可以搜尋嘅語言旗幟同名稱格狀清單，頻道本身嘅語言排喺最前" width="360"> |

<sub>截圖取自正式發行版本，喺本儲存庫自己虛構嘅聊天室拍攝：用戶名稱同訊息全部都係作嘅，翻譯亦都係喺本機回應，
所以呢個頁面上面唔會出現任何真人嘅帳戶名。</sub>

## 安裝

喺 [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) 下載啱你瀏覽器嘅 zip，然後解壓縮。

- Chrome、Brave、Edge（`…-chromium.zip`）：開 `chrome://extensions`，開啟開發人員模式，撳「載入未封裝項目」，揀嗰個資料夾。
- Firefox 121+（`…-firefox.zip`）：開 `about:debugging#/runtime/this-firefox`，撳「載入暫時性附加元件」，揀 `manifest.json`。
  Firefox 重新啟動之後就會唔記得暫時性附加元件。

咁樣安裝嘅版本唔會自動更新：有新版本嗰陣，圖示會出現徽章，
彈出視窗亦都會連去最新發行版本。

## 翻譯引擎

四個翻譯服務串埋一齊：一個壞咗，下一個就接手。次序由你話事。

| 服務 | 金鑰 | 說明 |
|---|---|---|
| Google | 唔使 | 預設，裝完即用 |
| DeepL | 免費 | 歐洲語言最好，[免費金鑰](https://www.deepl.com/pro-api)每月 100 萬字元 |
| MyMemory | 唔使 | 後備 |
| Lingva | 唔使 | 後備，預設用公開伺服器，除非你揀指去自己架嗰個 |

Chromium 內置嘅翻譯器唔使網絡，亦冇額度限制。Chrome 同 Edge 138 或以上嘅版本可能會提供，
不過唔係每個安裝都有，而且每個語言配對都要下載一次模型，喺聊天列撳一下就得。Firefox 冇呢個功能。
邊度冇佢，就由雲端鏈接手，一切照常。

## 設定

撳聊天列上面嘅齒輪，或者喺擴充功能圖示㩒右鍵，揀「選項」。

- **翻譯服務**：引擎次序、你嘅 DeepL 金鑰，同模式：先用裝置端、先用雲端，或者只用裝置端
- **顯示**：目標語言、顯示樣式、原文同語言標籤、文字大小、行距、字型、強調色、聊天室主題、輸入預覽，同撳佢之後嘅動作
- **篩選**：機械人、用戶、頻道、關鍵字、來源語言，同用嚟取代字詞嘅詞彙表
- **進階**：快取大小同有效時間、同時翻譯數量、每個頻道嘅請求上限、備份同還原
- **動態**：已翻譯嘅訊息、快取命中、聊天室入面出現過嘅每種語言，同最近 50 條訊息各自被翻譯或者跳過嘅原因
- **鍵盤**：Alt+Shift+T 開關聊天室翻譯（Alt+T 係 Twitch 嘅劇場模式），Alt+W 開關輸入預覽。兩個都可以喺瀏覽器嘅擴充功能快速鍵度改
- 聊天室動作列上面、輸入框下面嘅語言按鈕：撳一下就開你寫嘢用嘅語言清單，打字就可以篩選。聊天室頂部嗰個就設定你閱讀嘅語言

## 支援嘅語言

英文 · 法文 · 西班牙文 · 葡萄牙文 · 葡萄牙文（巴西） · 德文 · 意大利文 · 荷蘭文 · 波蘭文 · 瑞典文 · 捷克文 · 斯洛伐克文 · 羅馬尼亞文 · 俄文 · 烏克蘭文 · 土耳其文 · 阿拉伯文 · 希伯來文 · 日文 · 韓文 · 中文（簡體） · 中文（繁體） · 泰文 · 越南文 · 印尼文 · 印地文 · 芬蘭文 · 挪威文 · 丹麥文 · 希臘文 · 匈牙利文 · 保加利亞文 · 加泰隆尼亞文 · 斯洛文尼亞文 · 愛沙尼亞文 · 立陶宛文 · 拉脫維亞文 · 波斯文 · 孟加拉文 · 泰米爾文 · 馬來文 · 菲律賓文 · 粵語

聊天室可以翻譯成其中任何一種，擴充功能本身嘅介面都有齊每一種。

## 私隱

冇帳戶，亦冇我嘅伺服器。除非你同意，否則冇分析追蹤；同意之後每日只會傳一次匿名統計去 Google Analytics（用咗邊個引擎、錯誤、速度），永遠唔會傳你嘅訊息、名或者頻道。聊天訊息，同埋開咗輸入預覽嗰陣你嘅草稿，只會送去你揀嘅翻譯服務，唔會送去其他地方，
裝置端模式下連翻譯服務都唔會送。為咗知道頻道嘅語言，佢會向 Twitch 查詢頻道嘅直播語言同 id；為咗令表情符號名稱唔會被翻譯，佢會向 7TV、BetterTTV 同 FrankerFaceZ 查詢頻道嘅表情符號名稱，咁樣佢哋只會知道頻道嘅 id，其他乜都唔知。由商店安裝嘅版本唔會發出其他任何請求。手動安裝嘅版本最多每六個鐘
向 GitHub 查詢一次最新嘅發行標籤，用嚟決定要唔要顯示更新徽章。[詳情](PRIVACY.md)

## 常見問題

**訊息冇被翻譯。**
開設定入面嘅「動態」分頁，撳「讀取判斷」：佢會列出最近 50 條訊息，並且講明每一條被翻譯或者跳過嘅原因。
大部分被跳過嘅訊息都係特登跳過嘅：同一個用戶重複發言、太短、淨係得表情符號或者笑聲，或者本身已經係閱讀語言。
如果分頁入面乜都冇，就代表擴充功能睇唔到聊天室：請開一個 issue。

**紫色列唔見咗。**
重新整理頁面。如果再發生，請開一個 [issue](https://github.com/kilworks/twitch-chat-translator/issues)，
寫低頻道同你之前做過啲乜。

**點樣可以翻譯得好啲？**
喺設定入面加免費嘅 DeepL 金鑰。免費額度每月 100 萬字元，而且 DeepL 只會用喺佢好過免費引擎嘅語言配對。

**應該用邊種顯示樣式？**
訊息下方。其餘三種都用得，不過仲喺度調整緊。

**擴充功能本身可以用我嘅語言嗎？**
可以。佢會跟你瀏覽器嘅語言，設定頂部嘅選單可以轉去 43 種語言入面任何一種。

**有裝 7TV、BTTV 同 FFZ 都用得嗎？**
用得，裝邊個或者全部唔裝都得。佢哋嘅表情符號名稱唔會被翻譯。

**VOD 同短片都用得嗎？**
用得，同直播一樣。

**Twitch 更新咗之後壞咗。**
Twitch 有時會改聊天室嘅架構。開一個 [issue](https://github.com/kilworks/twitch-chat-translator/issues)，
就會修好。

**呢個係 Twitch 官方做嘅嗎？**
唔係。呢個係獨立嘅開源項目，同 Twitch 冇關係。

## 更新內容

1.0.0 版，Twitch 嘅第一個版本：

- 讀 Twitch 聊天室嘅三種形式：Twitch 自己嘅清單（有 BTTV 同 FFZ 都得）、7TV 清單，同 VOD 同短片重播，包括彈出視窗、嵌入、版主檢視、直播管理器同手機
- 將翻譯寫入訊息輸入框，表情符號當文字保留，而且永遠唔會翻譯頻道嘅 7TV、BTTV 同 FFZ 表情符號名稱
- 頻道語言由 Twitch 提供，被刪除嘅訊息翻譯都會消失，外觀係紫色，並且跟 Twitch 嘅深色或者淺色聊天室
- Alt+Shift+T 開關翻譯，淨係喺 7TV 或者 BTTV 啱啱冇完成表情符號嗰陣，Tab 先會插入翻譯，而語言按鈕喺輸入框下面嘅動作列

每個版本嘅完整內容，包括改咗啲乜同背後嘅實測數據：
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) 同 [CHANGELOG.md](CHANGELOG.md)。

## 開發

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

建置可以重現：同一個 commit 喺任何機器都會產出位元組完全一樣嘅 zip，驗證方法係喺空資料夾建置個 tag 嘅
`git archive`，再比較雜湊值。

除咗單元測試，另外有離線測試關卡，會將建置好嘅擴充功能載入真實瀏覽器，實際操作並檢查佢嘅行為，
頁面由本機提供，翻譯引擎亦由本機回應。呢啲關卡需要 Playwright，不過佢係特登唔列做相依套件：請將 `UX_KIT`
指去一個 `node_modules` 入面有 Playwright 嘅資料夾，或者執行 `npm i -D playwright`。

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

介面字串放喺 `src/shared/i18n/`（彈出視窗同選項，用英文原文做 key）同
`src/content/i18n/`（聊天列，用 id 做 key，英文原文做後備），每種語言一個檔案；
測試會要求每個檔案都有齊所有 key。商店文案放喺 [store/](store/)，發行就係打一個版本 tag：CI 會建置、檢查，
然後發布去兩個商店。

技術棧：Manifest V3、Vite、TypeScript、Preact、Tailwind。

## 相關項目

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni)（[Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)），同一個翻譯器，用嚟翻譯 Kick 聊天室，同一位作者

## 授權

MIT。同 Twitch 冇關係。
