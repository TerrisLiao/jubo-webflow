# 聯絡頁導流改版（/contact）

> 目的：讓居服單位停止直接聯繫住宿／日照的區域客戶經理，改走居服專屬表單。
> 頁面：`聯絡` `/contact`（page id `6a029cadbc58c46b16389346`）
> 決策日：2026-09-10（Terris）｜執行：Claude Code
> 狀態：第一階段已做在 Webflow 上，**未 publish**，等 Terris 驗收

---

## 1. 現況診斷（2026-09-10 從 Webflow 與線上 HTML 讀回）

改版前的頁面順序：

1. Hero `section_about-hero`：H1「選擇您的機構類型」＋兩顆同款 `cta-button`
   （「我是居服單位」→ 外部 Microsoft Forms；「我是住宿/日照機構」→ `#sales`）
2. `#sales` `section_sales`：`銷售部門s` CMS，5 位區域客戶經理（照片、姓名、區域、Email、電話、LINE）
3. `#form` `section_contact-form`：站內 Webflow 表單，`data-ga-form-type="partnership"`，最後一欄「合作內容」
4. 居服 banner「派班更順手，核銷更省力」＋「申請 Demo」→ 原本指向 `#form`
5. 服務據點 CMS → `CTA Section #1` → Footer

改版後（2026-09-10 收工時）的順序：
Hero（置中，原按鈕列已隱藏）→ **`section_contact-router` 兩顆選擇按鈕** →
（選了才展開：**居服** = 居服窗口卡＋居服系統 banner｜**住宿／日照** = 5 位客戶經理）→
站內表單 `#form` → 服務據點 → CTA → Footer

問題（按影響排序）：

| # | 問題 | 證據 |
|---|---|---|
| 1 | `#sales` 完全沒有區塊標題 | `sales_component` 底下只有 CMS list，無 Section Tag／H2／說明 |
| 2 | 卡片沒有標示服務對象 | `category-tag` 只綁 CMS `Title`（區域職稱） |
| 3 | `#sales` 是滾動路徑上第一個內容區塊 | 居服單位在看到任何表單前先看到 5 張真人臉＋LINE |
| 4 | 居服有兩個互相衝突的目的地 | Hero → Microsoft Forms；居服 banner「申請 Demo」→ `#form`（partnership 表單） |
| 5 | 視覺權重反向 | Hero 兩顆按鈕同款無主次；真人卡片視覺強度遠高於按鈕 |

**量測盲點**：站台 head 的 GA4 程式在 `sales_contact_click` 一律預設
`solution_interest: 'residential_day_care'`，所以現有數據看不出有多少居服單位在點業務。

---

## 2. Terris 的決策（2026-09-10）

| 項目 | 決定 |
|---|---|
| 居服窗口卡形式 | **虛擬人物**，但不留電話與 LINE，唯一 CTA 是表單；視覺與業務卡對齊 |
| 頭像素材 | Terris 提供的既有照片（teal 平塗背景棚拍頭像，與 5 位業務照同風格） |
| 回覆時效 | **不寫**「一個工作日」之類的承諾 |
| 業務名單 | 先加標題與標籤，名單維持一直可見（不做隱藏／分流） |
| 居服表單 | 維持 Microsoft Forms，**統一入口**（Hero 與居服 banner 同一份） |
| 業務姓名標籤層級 | h2 → **h3** |

> Claude 對「虛擬人物」的保留意見已提出並被 Terris 確認採用：
> 官網掛查不到的員工，機構指名找人時會破功。因此實作採**角色優先**——
> 卡片標題目前是「居服顧問窗口」而非人名，未給虛構全名。若之後要改成人名，改 h3 一處即可。

---

## 3. 第一階段已完成（Webflow，未 publish）

### 3-1 新增區塊 `#homecare`（放在 Hero 之後、`#sales` 之前）

```
section#homecare.section_homecare-contact
└ .padding-global.padding-section-large
  └ .container-large
    └ .homecare-contact_component
      ├ .section-header_wrapper
      │   ├ [Section Tag] 「居家服務單位」
      │   ├ h2.text-align-center 「居服單位，由專屬窗口為你安排」
      │   └ p.text-align-center 「留下你的服務需求與所在區域，我們會安排對應的居服顧問與你聯繫。」
      └ .homecare-contact_card
        ├ .homecare-contact_portrait > img.homecare-contact_photo   ← 待放照片
        └ .homecare-contact_info-wrap
          ├ .homecare-contact_inner-wrap
          │   └ .homecare-contact_name-wrap
          │       ├ h3.card_h2 「居服顧問窗口」
          │       └ .category-tag > div 「居家服務單位專屬窗口」
          └ [CTA Button] 「填寫居服需求表單」→ Microsoft Forms（新分頁）
```

### 3-2 `#sales` 加上區塊標題

`sales_component` 最前面插入 `.section-header_wrapper`：

- [Section Tag]「住宿・日照機構」
- h2「找到你所在區域的客戶經理」
- p「以下客戶經理服務住宿型機構與日照中心；居服單位請由上方的居服顧問窗口填寫需求表單。」

### 3-3 業務卡加服務對象標籤

`.sales-info_inner-wrap` 內、`.sales-name_wrap` 之後新增
`.category-tag.is-audience` > div「服務對象：住宿型機構・日照中心」。

`is-audience` 是 combo class：透明底＋1px teal 外框（`--primary--accent`），
與填色的區域標籤形成主次差異。

### 3-4 入口統一與標籤層級

- 居服 banner「申請 Demo」的 Link 由 `pageSection → #form` 改為 Microsoft Forms（與 Hero 同一份）
- 業務卡姓名 `.card_h2` 由 `h2` 改為 `h3`（**只改 tag，class 名不動**）

### 3-6 「選了才展開」＋自訂展開動畫（2026-09-10 最終版）

Terris 的要求演進：不要一進來就攤開兩邊內容 → 要有 toggle down ＋ fade in → 按鈕太長 →
**改用自訂 code**。過程中做過兩個版本，最後定案在第三版。

| 版本 | 做法 | 為什麼換掉 |
|---|---|---|
| v1 | Webflow 原生 Tabs | 沒有淡入；`w--current` 選中樣式不在 MCP 可寫範圍；預設開啟的 tab 也讀不到 |
| v2 | 沿用 Slater 的 `initPlatformSwitcher()` | 只有 `opacity` 淡入，**沒有 height 0 → auto 的向下展開** |
| **v3（現行）** | **頁面層自訂 CSS ＋ JS** | Terris 明確要求用自訂 code，取得完整控制 |

> v2 那次讀 Slater JS 的收穫仍然有效，而且留下兩個沿用資產：
> `.top-switcher_wrapper.is-product`（白框、白 30% 底、blur、圓角 50px、`padding .25rem`、`position: static`）
> 與 `.top-switcher_item`（圓角 50px；`.is-active` 是實心 teal ＋ 白字；Slater CSS 另給 hover 淡青底 ＋ 0.15s transition）。
> **v3 的 JS 一樣是加 `.is-active`，所以選中樣式照舊由站上的 CSS 負責，沒有新造樣式。**

#### 修掉的居服／住宿混在一起

`section_home-care-banner`（Section Tag「居服系統」、H2「派班更順手，核銷更省力」、
CTA「申請 Demo」→ 居服 Microsoft Forms）原本在 switcher **外面**，
所以選了「住宿／日照」的人滑過客戶經理名單後，會直接撞到一整段居服系統的推銷與居服表單。
**已移進居服面板**，只有居服單位看得到。

判斷留在面板外的內容：站內表單 `#form`（異業合作／其他洽詢）、服務據點、`CTA Section #1`
都是共通資訊，維持在面板外。

#### 現行結構

> **2026-09-10 追加調整**：選擇按鈕原本放在 `section_contact-router` 最上方，
> 結果剛好壓在 Hero 與下一段的背景交界上，看起來像被切一刀（Terris 回報）。
> 已把整組 `top-switcher_wrapper` **搬進 Hero 的 `product-hero_center-wrap`**
> （原本那兩顆 CTA 的位置，它們仍是隱藏狀態），面板留在下方的 router section。
> `bringIntoView()` 的捲動目標也跟著改成按鈕本身，這樣按鈕會停在 navbar 下方、
> 剛展開的面板正好在它底下。

```
section.section_about-hero
└ … product-hero_center-wrap
   ├ Section Tag「聯絡我們」／h1／說明段
   ├ div.contact-routing_buttons.is-center（舊的兩顆 CTA，已隱藏）
   └ div.top-switcher_wrapper.is-product[data-router="wrapper"]   ← 選擇按鈕在這裡
       ├ a.top-switcher_item[data-router-target="homecare"]   href="#choose" 「我是居服單位」
       └ a.top-switcher_item[data-router-target="residential"] href="#choose" 「我是住宿／日照機構」

section#choose.section_contact-router
└ div.contact-router_component
   ├ div.contact-router_panel[data-router-panel="homecare"]
   │   ├ section#homecare.section_homecare-contact   （居服窗口卡）
   │   └ div.section_home-care-banner                （居服系統 ＋ 申請 Demo）
   └ div.contact-router_panel[data-router-panel="residential"]
       └ div#sales.section_sales                      （5 位區域客戶經理）
```

`contact-router_component` 的 `row-gap` 必須是 **0**：收合的面板高度是 0 但仍佔一個 flex row，
留 gap 會讓兩個面板的起點差一個 gap 的距離（原本 2rem），切換時看起來就會錯位。

- 面板的 `display` **不可以是 none**（會讓 height 動畫失效）。收合狀態由自訂 CSS 的
  `height: 0; overflow: hidden; visibility: hidden` 負責。
- v2 的「隱藏 placeholder item ＋ 空面板」那套 hack 已移除，自訂 code 的預設狀態本來就是全收合。
- 兩顆按鈕保留 `href`（`#homecare` / `#sales`），因為站台 head 的 GA4 只監聽 `a[href]`；
  JS 會 `preventDefault()` 擋掉 anchor 跳轉，但 GA4 是 **capture 階段**監聽，會在那之前就送出事件。

#### 收合狀態放在 class，不放在 custom code（2026-09-10 修正）

第一次裝自訂 code 時，把「預設收合」也寫在 code 的 CSS 裡，結果 Terris 在 Preview 看到的是
**卡片沒有隱藏、按鈕只會 scroll**。原因：**Webflow 的 Designer 與 Preview 都不執行 page custom code**，
只有發布出去（staging 或正式站）才會跑。所以在 Preview 等於「沒有 code」的狀態——
面板沒被隱藏（`display:none` 已被移除），按鈕的 `href="#homecare"` 就只剩下 anchor 捲動。

修正方式：把狀態搬進 Webflow 的 class，code 只留 JS。

| 選擇器 | 內容 |
|---|---|
| `.contact-router_panel` | `height:0`、`overflow:hidden`、`opacity:0`、`visibility:hidden`，＋ `transition-property/duration/timing-function/delay`（height 450ms、opacity 350ms delay 80ms、visibility 0s delay 450ms） |
| `.contact-router_panel.is-open` | `height:auto`、`opacity:1`、`visibility:visible`、visibility 不延遲 |

這樣「沒按按鈕時是隱藏的」在 **canvas、Preview、發布後三個地方都一致**，JS 掛掉也還是隱藏。
`.is-open` 給 `height:auto` 還有一個好處：**在 Designer 要編輯面板內容時，
暫時把 `is-open` 這個 combo class 加到面板上就會展開**，編完再移除。
（執行期 JS 寫的 inline `height` 優先於 class，不會互相干擾。）

#### 自訂 code

- **位置**：`/contact` 的 Page Settings → Custom Code → Inside `<head>`（**只有這一頁**，不是站台層）
- **只負責**：量 `scrollHeight`、切 `.is-open`、`preventDefault()` ＋ `stopPropagation()`，
  加上內容 `translateY(-1rem) → 0` 的位移

#### 按鈕的 href 為什麼指向 `#choose`（2026-09-10 修正）

原本兩顆按鈕的 href 是 `#homecare` / `#sales`（指向自己面板裡的區塊），
用意是保留 `a[href]` 讓 head 的 GA4 抓得到。但 Terris 回報「選住宿型時畫面捲太下面」——
`#sales` 在展開的居服面板下面，一跳就跳很深。兩種情況都會這樣：

1. 在 Preview（custom code 不跑）→ 純瀏覽器 anchor 跳轉
2. 已發布，但 **Webflow 自己的平滑捲動或站上載入的 Lenis** 不理 `preventDefault()`

修法兩層保險：

- `section_contact-router` 加上 DOM id `choose`，兩顆按鈕的 href 改成 `#choose`（指向選擇器自己），
  所以就算真的被捲，也只是原地。
- code 裡多一行 `event.stopPropagation()`，擋掉 Webflow 與 Lenis 掛在 **document bubble 階段**的
  捲動處理。GA4 那段是 `capture: true`，在 bubble 之前就跑完，事件照樣送。

`#homecare` / `#sales` 這兩個 DOM id 保留（可能有站外連結指過來），只是不再被按鈕使用。
- **原始檔**：[`custom-code/contact-router.html`](../custom-code/contact-router.html)（repo 為準，改動請兩邊同步）
- **選擇器範圍**：只有 `[data-router="wrapper"]`、`[data-router-target]`、`[data-router-panel]`。
  刻意不用 Slater 的 `data-platform-switcher`／`data-platform-panel`，避免兩套程式同時控制同一個面板。
- **切換時序**（2026-09-10 由 Terris 指定，共改過三輪）：

  1. 舊卡片**直接淡出** —— 先把 `height` 鎖成當下的 `scrollHeight`，再加 `.is-fading`
     （`opacity: 0`，300ms），所以淡出期間版面完全不動、不會回流
  2. 淡完 → `.is-instant` 關掉所有過場，高度瞬間歸零（此時已看不見，不會有跳動）
  3. 新卡片高度往下展開 ＋ 淡入 ＋ 由上往下滑入

  「點同一顆關閉」走另一條路：直接做高度收合動畫。

- **時間參數**

  | 項目 | 值 | 定義在哪 |
  |---|---|---|
  | 舊卡片淡出 | 300ms ease | code 的 `.is-fading` ＋ `FADE_OUT` |
  | 新卡片高度 | 800ms `cubic-bezier(.22,.61,.36,1)` | class `.contact-router_panel` ＋ code 的 `EXPAND` |
  | 新卡片淡入 | 900ms、延遲 150ms | class `.contact-router_panel` |
  | 新卡片滑入 | `translateY(-1.5rem) → 0`、900ms、延遲 150ms | code |
  | 捲動 | 1.4s（Lenis） | code 的 `SCROLL` |

  ⚠️ **三組必須成對維護**：`EXPAND` = class 上 height 的 duration；
  `FADE_OUT` = `.is-fading` 的 opacity duration。不一致的話高度會在過場途中被改成
  `auto` 而跳一下，或舊卡片還沒淡完就被歸零。

- **方向一律由上往下**。之前讓兩個面板同時變高變矮，下面那個會被回流往上拉，
  看起來像由下往上冒出來 —— 所以才改成「先淡出、再換」。
- **捲動**：`bringIntoView()` 把**按鈕**帶到 navbar 下方（navbar 高度執行期量測 ＋24px），
  優先用站上的 `window.lenis.scrollTo`，沒有才退回 `scrollIntoView`。
  捲動是在舊卡片淡出結束、新卡片開始展開時才觸發。
- **行為**：點另一顆 → 舊的收合、新的展開；點同一顆 → 收合（真 toggle）。
- **保護**：`prefers-reduced-motion: reduce` 時不做過場；`<noscript>` 會把面板還原成展開，
  JS 掛掉時內容不會消失。
- **驗收限制（重要）**：page custom code **在 Preview 也不會跑**。
  Preview 只能確認「預設是隱藏的」；**要看展開動畫必須發布到 staging（webflow.io）或正式站**。
  想要在 Preview 就能看到動畫，唯一的路是改用 Webflow Interactions（IX2），而 MCP 碰不到 IX2。

> **鐵律 4 的例外登記**：`00_AI工作守則.md` 鐵律 4 寫「不要寫自訂 CSS」。
> 本次是 2026-09-10 Terris 明確指示「動畫就用自訂寫 code」後採用，範圍限定 `/contact` 一頁、
> 只作用在 `data-router-*`，不影響任何共用 class 與其他頁面。

**新增 class**：`section_contact-router`、`contact-router_component`、`contact-router_panel`。

### 3-5 新增的 class（全部照 Client-First `folder_element` 命名）

| Class | 用途 | 關鍵值 |
|---|---|---|
| `section_homecare-contact` | 區塊容器 | 無樣式（照鐵律 3） |
| `homecare-contact_component` | 內容容器 | flex column, center, gap `--desktop-spacer--regular` |
| `homecare-contact_card` | 卡片 | `aspect-ratio 2/3`、`width 24rem`、`radius 1.25rem`、`overflow clip`；medium → ratio auto；small → 100% / max 24rem |
| `homecare-contact_portrait` | 頭像框 | `aspect-ratio 1/1.15`、`overflow clip` |
| `homecare-contact_photo` | 頭像圖 | `100% / 100% / object-fit cover` |
| `homecare-contact_info-wrap` | 資訊層 | padding `--desktop-spacer--small`、bg `--neutral--white-50`、`backdrop-filter blur(5px)` |
| `homecare-contact_inner-wrap` | 內層 | flex column, gap `--desktop-spacer--small`（small → mobile 版） |
| `homecare-contact_name-wrap` | 名稱列 | flex column, gap .5rem |
| `.category-tag.is-audience` | 服務對象標籤（combo） | 透明底＋1px `--primary--accent` 外框 |

幾何值刻意抄自 `.single-sales_wrap` / `.sales-portrait` / `.sales-info_wrap`，
讓居服卡與業務卡並排時完全對齊。**沒有修改任何既有共用 class 的值，也沒有新增自訂 CSS 或 HTML Embed。**

---

## 4. 待辦

| # | 事項 | 負責 |
|---|---|---|
| 1 | ~~照片上架~~ **已完成 2026-09-10**：asset `6aa22521339ce4908d70c4bb`（`jubo-homecare-window.webp`，132 KB），alt「Jubo 居服顧問窗口示意形象」；`.homecare-contact_photo` 的 `object-position` 設 `50% 22%`，因為原圖是 2:3、卡片框是 1:1.15，會從上下裁切，往上偏才不會切到頭 | 已完成 |
| 2 | 決定卡片標題是否改成人名（目前是「居服顧問窗口」） | Terris |
| 3 | **要看展開動畫必須發布到 staging（webflow.io）**：Designer 與 Preview 都不執行 page custom code。Preview 只能確認「預設隱藏」是對的 | Terris 授權後 Claude 可代發 |
| 4 | 動畫參數要調（.45s、`translateY(-1rem)`、延遲 .08s）就直接說，改 `custom-code/contact-router.html` 再同步到頁面 head | Claude |
| 5 | 桌機／平板／手機三個斷點目視驗收（含頭像裁切 `object-position: 50% 22%` 要不要微調） | Terris |
| 5b | 行為邏輯已有自動測試：`custom-code/contact-router-test/`（容器內 Chromium，**16 項**檢查全過，含切換時序）。改 code 或改那幾個 class 的值之後要重跑 | Claude |
| 6 | Hero 那兩顆隱藏的舊 CTA Button 確認可以刪了再刪 | Terris |
| 7 | Publish | Terris 授權後 |
| 8 | 第三階段：`#form` 正名為「異業合作與其他洽詢」；`銷售部門s` 加「服務對象」欄位 | 未排 |
| 9 | `06_自訂Class完整清單.md` 需重新讀回快照（本次新增 11 個 class） | 未排 |

---

## 5. 技術限制與注意事項

- **不要把居服卡改掛 `single-sales_wrap` / `sales-contact_wrap`。** 站台 head 的 GA4 程式會掃
  `.single-sales_wrap`，把 `.sales-contact_wrap p` 裡像電話的段落自動包成 `tel:` 連結，
  並對卡內 line.me／tel 點擊送 `sales_contact_click`（`solution_interest` 預設 `residential_day_care`）。
  沿用會讓居服卡被誤記成業務接觸。
- **居服卡的量測不需要改 head 程式**：該程式對 `/contact` 上任何指向 `forms.cloud.microsoft`
  的連結會自動送 `contact_route_select(home_care)` ＋ `homecare_form_open`。
- CTA Button 的 `rel` prop 會在 body 裡渲染出一個多餘的 `<link rel="noopener noreferrer">`
  （Hero 居服按鈕就有）。本次新增的兩顆按鈕**只設 openInNewTab、沒設 rel**，避免再增加。
- **驗證限制**：本帳號沒有 Webflow Analyze 權限（實測 403 `Analyze entitlement required`），
  無法從 MCP 取得改版前後的點擊數，成效要看 GA4／GTM。
- Slater 的 `60294.css` / `60292.js` 是外部檔案，MCP 讀不到，只能確認 head 內嵌程式的行為。
- **Webflow MCP 不支援 Interactions（IX2）**：沒有任何 interactions 工具，所以「點擊 → 淡入展開 → 自動捲動」
  這種體驗必須在 Designer 手動建。本次改用原生 Tabs 就是為了避開這個限制。
- **agent 看不到渲染結果**：展開動畫、收合行為、頭像裁切位置都需要人在 Preview 確認。
  自訂 code 是寫完直接裝上去的，**沒有經過任何實機驗證**。
- **Slater 外部檔案是可以讀的**：`https://slater.app/20018/60294.css` 與 `60292.js` 都是公開 URL，
  用 curl 抓下來就能看。`00_AI工作守則.md` §6-6 寫「MCP 也讀不到」是指 MCP，不代表讀不到內容。
  這次就是靠讀 JS 才發現站上已經有 switcher 可以沿用。**但仍然不可以改 Slater 上的程式碼。**
