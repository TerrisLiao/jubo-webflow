# contact-router 行為測試

驗證 [`../contact-router.html`](../contact-router.html)（/contact 分流面板的展開／切換動畫）的邏輯。
2026-09-10 建立，起因：前面幾版都是「寫完直接裝上去、沒有實機驗證」，
接連被 Terris 抓到卡片沒隱藏、捲太深、方向不一致、切換時 section 邊界閃過四個問題。

> 2026-09-10 入口由 segmented pill 改成兩張 `.contact-choice_item` 選擇卡。
> **自訂 code 不用改**——它只認 `[data-router="wrapper"]` / `[data-router-target]` /
> `[data-router-panel]`，不綁 class。harness 的 markup 已同步。

## 為什麼測試跑的一定是站上那份 code

`harness.html` 是**模板**，不能直接開。裡面有一個 `<!-- ROUTER_SNIPPET -->` 佔位符，
`test_router.mjs` 會把 `../contact-router.html` 原封不動讀進來塞在那個位置，
產生 `harness.generated.html`（不進 git）再跑。
所以「測試驗過的 code」與「貼進 Webflow page head 的 code」是同一份，不會各自漂移。

模板本身只提供**站上 Webflow class 的實際值**（2026-09-10 從 Designer 讀回）與最小 DOM：

```
section#choose.section_contact-router
└ .contact-router_component
   └ .contact-router_stage[data-router="stage"]     ← 高度過場在這一層
      ├ .contact-router_panel[data-router-panel="homecare"]
      └ .contact-router_panel[data-router-panel="residential"]
```

並模擬三件站上會發生的事：

| 模擬對象 | 做法 |
|---|---|
| 站台 head 的 GA4 | `document.addEventListener('click', …, true)`（capture），記錄到 `window.__ga` |
| Webflow／Lenis 的 anchor 平滑捲動 | 掛在 document 的 **bubble** 監聽，記錄到 `window.__bubbleScrolls` |
| Navbar | 固定 72px 的 `.navbar_component`，測 `bringIntoView()` 的 clearance 計算 |

## 跑法

```bash
npm install playwright        # 只裝套件，不要跑 playwright install
node test_router.mjs
```

容器內已有 Chromium（`/opt/pw-browsers/chromium`），版本與 npm 上的 playwright 不一定相符，
所以測試裡直接指定 `executablePath`，不要改成預設路徑。

想拿別的版本跑（例如做反向對照）：`ROUTER_SRC=/path/to/other.html node test_router.mjs`。

## 涵蓋的檢查（25 項）

1. **初始**：兩個面板 `display:none`、stage `height 0` + `overflow hidden`
   —— 這三件事都由 Webflow class 決定，不靠這支 JS，所以 Designer／Preview／發布後一致
2. **點居服**：120ms 時 stage 高度介於 0 與最終值之間（是動畫不是瞬移）；
   展開後面板 `display:block` / `opacity 1`；按鈕加 `.is-active`；GA 送 `home_care`
3. **收尾交還 `height:auto`**：內容日後變高（CMS、換行）不會被 `overflow:hidden` 切掉
4. **捲動**：入口卡停在 navbar 正下方（實測 wrapTop=96px、navbar=72px），
   且剛展開的面板起點在視窗內（chooseTop=295px）。
   斷言刻意寫成「表達意圖」而不是拿 `#choose` 的絕對座標當門檻——
   入口從 pill 換成選擇卡之後高度會變，寫死座標會假性 fail。
   這條當初改寫時抓到一個真的 bug：`bringIntoView()` 的 clearance 只做在 Lenis 那條路徑上，
   fallback 用 `scrollIntoView({block:'start'})` 會把入口卡頂到視窗 0、剛好躲到固定 navbar 後面。
   已改成自己算 `window.scrollTo`，兩條路徑落點一致。
5. **切換時序**（點下去 150ms 時）：舊卡片還在、`opacity` 已降到 0.26 且帶 `.is-fading`，
   新卡片**還沒** `is-open`，且 **stage 高度鎖在舊高度** —— 證明是「先淡出、再換」且版面不動
6. **新面板起點與舊面板同一位置**（由上往下長，不是被回流往上拉）
7. **切換全程 stage 高度沒有歸零**：整段切換每一格 rAF 都取樣，最低值必須 ≥ 兩張卡片的較小高度
8. **切換全程整頁高度沒有塌陷**：`documentElement.scrollHeight` 的波動不得大於兩張卡片的高度差
9. GA 送 `residential_day_care`；document bubble 的捲動被 `stopPropagation()` 擋掉
10. 面板內容 `transform` 歸零
11. **點同一顆**：收起（`display:none`）、stage 高度回 0、`.is-active` 移除

### 第 7、8 項是什麼問題

Terris 回報「切換按鈕時會有明顯 section 一條線跳出，像是一整個 section 開又關」。
舊架構是每個面板自己動高度：切換時舊面板高度先歸零，新面板再從 0 長起來，
頁面總高度會瞬間掉 1328px 再長回來。整頁漸層 `.gradient-bg`（`position:absolute; inset:0`）
跟著猛地重算，就看到那道邊界閃過。

改成由 `.contact-router_stage` 擁有高度後，高度是從 1328px **連續動到** 1028px，中間不歸零。
反向對照跑過：把切換那一段改回「瞬間歸零」，這兩項會 fail（`全程最低=0`、整頁 2536–3864），
現在這版是 `全程最低=1028`、整頁 3564–3864（波動 300 = 兩張卡片的高度差）。

### 第 6 項當初的 fail

`contact-router_component` 的 `row-gap: 2rem` 讓收合的面板（高度 0 但仍佔一個 flex row）
多產生一次 gap，兩個面板起點差 32px。改成 `row-gap: 0` 後通過——
面板內的 section 本來就帶 `padding-section-large`，那 2rem 是多的。

> 改動 `contact-router.html`，或改動 `contact-router_stage` / `contact-router_panel` /
> `contact-router_component` 這三個 class 的值之後，記得回來重跑一次
> （class 的值有改的話，`harness.html` 上半段那份 CSS 也要一起更新）。
