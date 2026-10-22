<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

用你自己的语言阅读任何 Twitch 直播的聊天，并用频道的语言回复。<br>
免费，无需账号，无需任何设置。支持 43 种语言，聊天和扩展自身的界面都是如此。

**[下载最新发布版](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome、Brave、Edge 和 Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="西班牙语聊天消息逐条到达，每条下方都有英文译文；随后输入一条英文回复，聊天框上方出现西班牙语预览，按 Tab 即替换进去" width="360">

</div>

## 工作方式

1. 安装后打开任意 Twitch 直播。聊天顶部的紫色栏表示它正在运行。
2. 每条消息一到达，译文就以你浏览器的语言显示在它的正下方，直播、回放和剪辑都一样。
3. 用你自己的语言输入回复。聊天框上方的预览会显示频道语言的版本：按 Tab 或点击它，输入的内容就会被这个版本替换。

频道的语言就是主播在 Twitch 上设置的语言，所以无需任何设置。两种语言都可以在设置中更改，阅读语言还可以按频道记住。

如果你同时运行 7TV 或 BTTV，它们会用 Tab 来补全表情。这时 Tab 会先补全表情，只有在没有东西可补全时才插入译文。Ctrl/Cmd+Enter 和点击则始终会插入译文。

## 功能一览

- **43 种语言**，包括从右到左书写的文字（阿拉伯语、希伯来语、波斯语），地区变体也分开处理（巴西葡萄牙语和欧洲葡萄牙语、简体和繁体中文、粤语）
- **聊天出现的每个地方**：实时聊天、弹出窗口、嵌入、管理员视图、直播管理器，以及回放和剪辑的重放，在 www.twitch.tv、m.twitch.tv 和 dashboard.twitch.tv 上都能用，有没有 7TV、BTTV 和 FFZ 都行
- **扩展自身也说这 43 种语言**：设置、弹出窗口和聊天栏全部覆盖，从带旗帜的菜单中选择
- **开箱即用，免费**：使用 Google 翻译。想让欧洲语言的翻译更好，可以添加你自己的免费 DeepL 密钥；某个引擎失败时，MyMemory 和 Lingva 会接手
- **设备端翻译**：在浏览器提供时，Chrome 和 Edge 中可用。不需要网络，也没有配额，文本也不会离开你的电脑
- **过滤**：跳过机器人，屏蔽用户或频道，隐藏包含某个词的行，只翻译你选定的语言
- **为刷屏的聊天而做**：频道的 7TV、BTTV 和 FFZ 表情集里的表情名称绝不会被翻译，即使你没有运行这些扩展；链接和 @提及在发送前就被单独分开；另有用于翻译引擎会弄错的名字的术语表，以及翻译缓存
- **四种显示方式**：消息下方、同一行、替换原消息，或仅在鼠标悬停时显示
- **只暂停一个频道**：在聊天栏中操作，不影响其他频道。切换频道或更新扩展后，已打开的标签页无需刷新即可继续翻译
- **留意管理操作**：被管理员删除的消息，以及被超时或封禁而消失的消息，译文也会一并消失
- **看起来像 Twitch**：紫色，并且除非你另选，否则跟随聊天自身的深色或浅色主题
- Chrome、Brave、Edge 和 Firefox

| 聊天滚动时即时翻译 | 工具栏弹出窗口 |
|---|---|
| <img src="screenshots/chat.png" alt="Twitch 聊天中每条西班牙语消息下方都有英文译文，列表上方是扩展的状态栏" width="360"> | <img src="screenshots/popup.png" alt="扩展弹出窗口，显示目标语言、显示方式、输入预览设置和翻译服务链" width="360"> |

| 发送前你输入的内容 | 选择语言，或让它来选 |
|---|---|
| <img src="screenshots/compose.png" alt="输入框中是一条英文消息，上方的预览显示将要发送的西班牙语版本" width="360"> | <img src="screenshots/languages.png" alt="可搜索的语言旗帜和名称网格，频道自己的语言排在最前" width="360"> |

<sub>截图取自正式发布的版本，在本仓库自建的聊天室中拍摄：用户名和消息都是虚构的，翻译在本地应答，
因此这个页面上不会出现任何真实用户的昵称。</sub>

## 安装

从 [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) 下载适合你浏览器的 zip 并解压。

- Chrome、Brave、Edge（`…-chromium.zip`）：打开 `chrome://extensions`，开启开发者模式，点击“加载已解压的扩展程序”，选择该文件夹。
- Firefox 121+（`…-firefox.zip`）：打开 `about:debugging#/runtime/this-firefox`，点击“临时载入附加组件”，选择 `manifest.json`。
  Firefox 重启后会忘掉临时附加组件。

这样安装的版本不会自动更新。有新版本时，图标会显示徽章，弹出窗口会链接到最新发布版。

## 翻译引擎

四个服务提供方串联在一起：一个失败时，下一个接手。顺序由你决定。

| 服务 | 密钥 | 说明 |
|---|---|---|
| Google | 无 | 默认，开箱即用 |
| DeepL | 免费 | 欧洲语言上最好，[免费密钥](https://www.deepl.com/pro-api)每月 100 万字符 |
| MyMemory | 无 | 备用 |
| Lingva | 无 | 备用，默认使用公共实例，也可以指向你自己的 |

Chromium 内置的翻译器不需要网络，也没有配额。Chrome 和 Edge 138 及以上版本可能提供它，但并非每个安装都有，而且每个
语言对都需要在栏上点击一次，下载一次模型。Firefox 没有这个功能。凡是缺少它的地方，都由云端链接手，
不会出任何问题。

## 设置

点击聊天栏上的齿轮，或右键点击扩展图标并选择“选项”。

- **服务**：引擎顺序、你的 DeepL 密钥和模式：设备端优先、云端优先或仅设备端
- **显示**：目标语言、显示方式、原文和来源语言徽章、文字大小、行距、字体、强调色、聊天主题、输入预览以及点击它后的行为
- **过滤**：机器人、用户、频道、关键词、来源语言，以及用于替换的术语表
- **高级**：缓存大小和有效期、并发请求数、每个频道的速率限制、备份和恢复
- **活动**：已翻译的消息、缓存命中、聊天中出现过的每种语言，以及最近 50 行各自被翻译或保留的原因
- **键盘**：Alt+Shift+T 开关聊天翻译（Alt+T 是 Twitch 的剧场模式），Alt+W 开关输入预览。两者都可以在浏览器的扩展快捷键中重新绑定
- 聊天操作栏中、消息框下方的语言按钮：单击打开你写作所用的语言列表，输入即可筛选。聊天顶部的那个按钮则设置你阅读所用的语言

## 支持的语言

英语 · 法语 · 西班牙语 · 葡萄牙语 · 葡萄牙语（巴西） · 德语 · 意大利语 · 荷兰语 · 波兰语 · 瑞典语 · 捷克语 · 斯洛伐克语 · 罗马尼亚语 · 俄语 · 乌克兰语 · 土耳其语 · 阿拉伯语 · 希伯来语 · 日语 · 韩语 · 中文（简体） · 中文（繁体） · 泰语 · 越南语 · 印度尼西亚语 · 印地语 · 芬兰语 · 挪威语 · 丹麦语 · 希腊语 · 匈牙利语 · 保加利亚语 · 加泰罗尼亚语 · 斯洛文尼亚语 · 爱沙尼亚语 · 立陶宛语 · 拉脱维亚语 · 波斯语 · 孟加拉语 · 泰米尔语 · 马来语 · 菲律宾语 · 粤语

聊天可以翻译成其中任何一种，扩展自身的界面也提供每一种语言。

## 隐私

没有账号，也没有我的服务器。除非你同意，否则没有分析统计；同意后每天向 Google Analytics 发送一次匿名计数（使用的引擎、错误和速度），绝不包含你的消息、名称或频道。聊天消息，以及输入预览开启时你的草稿，只发送给你选择的翻译服务，在设备端模式下连那里都
不发送。为了知道频道的语言，它会向 Twitch 查询频道的直播语言和 id；为了让表情名称不被翻译，它会向 7TV、BetterTTV 和 FrankerFaceZ 查询频道的表情名称，这只会让它们知道该频道的 id，别无其他。从商店安装的版本不会发出任何其他请求。手动安装的版本最多每六小时向 GitHub 查询一次最新发布
标签，以决定是否显示更新徽章。[详情](PRIVACY.md)

## 常见问题

**消息没有被翻译。**
打开设置中的“活动”标签页并点击“Read decisions”：它会列出最近 50 行，并说明每一行被翻译或保留的原因。
大多数被跳过的行是有意跳过的：同一用户重复发言、太短的行、只有表情或笑声的行，或者已经是阅读语言的行。如果这个标签页什么都没有显示，说明扩展没有看到聊天：请提交 issue。

**紫色栏消失了。**
刷新页面。如果再次发生，请提交 [issue](https://github.com/kilworks/twitch-chat-translator/issues)，
写明频道和你之前的操作。

**怎样获得更好的翻译？**
在设置中添加免费的 DeepL 密钥。免费额度每月 100 万字符，DeepL 只会用在它比免费引擎更好的语言对上。

**应该用哪种显示方式？**
消息下方。其他三种也能用，仍在调整中。

**扩展本身可以用我的语言吗？**
可以。它默认跟随浏览器的语言，设置顶部的菜单可以把它切换到 43 种语言中的任意一种。

**能和 7TV、BTTV、FFZ 一起用吗？**
能，有哪个都行，一个都没有也行。它们的表情名称不会进入翻译。

**回放和剪辑中能用吗？**
能，和直播中完全一样。

**Twitch 更新后它坏了。**
Twitch 有时会改变聊天的构造方式。提交 [issue](https://github.com/kilworks/twitch-chat-translator/issues)，
就会得到修复。

**这是 Twitch 官方做的吗？**
不是。这是一个独立的开源项目，与 Twitch 无关。

## 更新内容

1.0.0 版本，第一个面向 Twitch 的发布：

- 读取三种形态的 Twitch 聊天：Twitch 自己的列表（也包括装了 BTTV 和 FFZ 的情况）、7TV 的列表，以及回放和剪辑的重放；弹出窗口、嵌入、管理员视图、直播管理器和手机端都可以
- 把译文写入消息框，表情保持为文字；绝不翻译频道的 7TV、BTTV 和 FFZ 表情集里的表情名称
- 频道的语言来自 Twitch，被删除的消息译文也会消失，外观是紫色，并跟随 Twitch 的深色或浅色聊天
- Alt+Shift+T 开关翻译，只有当 7TV 或 BTTV 没有刚刚补全表情时，Tab 才会插入译文，语言按钮位于消息框下方的操作栏中

每个版本改了什么，以及背后的测量数据：
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) 和 [CHANGELOG.md](CHANGELOG.md)。

## 开发

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

构建是可复现的：同一个提交在任何机器上都会生成逐字节相同的 zip，验证方法是在空文件夹中构建该标签的
`git archive`，再比较哈希值。

除了单元测试，还有一批离线关卡：它们把构建好的扩展加载到真实浏览器中，驱动它并断言它的行为，页面由本地提供，翻译引擎也在本地应答。这些关卡需要 Playwright，它被刻意不列为依赖：用 `UX_KIT` 指向一个 `node_modules` 中包含它的文件夹，或者运行 `npm i -D playwright`。

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

界面字符串位于 `src/shared/i18n/`（弹出窗口和选项，以英文原文为键）和 `src/content/i18n/`（聊天栏，以 id 为键，英文原文作为回退），每种语言一个文件；测试要求每个文件都包含完整的键集合。商店文案位于 [store/](store/)，发布就是打一个版本标签：CI 负责构建、检查，并发布到两个商店。

技术栈：Manifest V3、Vite、TypeScript、Preact、Tailwind。

## 相关项目

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni)（[Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)），同一作者为 Kick 聊天做的同款翻译器

## 许可证

MIT。与 Twitch 无关。
