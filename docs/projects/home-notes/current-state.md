# 現況

文件更新日：2026-11-11。Webflow 讀回日：2026-11-11（Data API 讀回元素、樣式、IX3、Embed 設定；未在 Designer Preview 或任何已發布環境驗收）。

## 位置

- 頁面：草稿頁「首頁（現場小紙條草稿）」`/home-notes-draft`，page id `6af435313191d17e194df8e1`，`draft: true`。它是正式首頁的完整複本。
- 區塊：`section_home-notes`（element `752f44ba-4d5e-14ed-2a8f-7a69255e65df`），在 `section_cases-slider`（成功故事）之後、`section_home-security`（資安玻璃卡）之前。
- 正式首頁（page id `69ec2b03daa2e79f1da8772e`）**沒有任何改動**。

原計畫用頁面分支，但站台不是 Enterprise 方案，`create_branch` 回 403 `not_enterprise_plan_site`，所以改用草稿頁。

## 結構

```
section_home-notes
├─ padding-global padding-section-small
│  └─ container-large
│     ├─ home-notes_card                 淺色玻璃大卡（2rem 圓角，與下方資安卡成對）
│     │  ├─ home-notes_aura              背景層
│     │  │  └─ 5 × home-notes_blob.is-teal／is-sky／is-lavender／is-blue／is-violet   各自漂移的漸層（IX3）
│     │  ├─ home-notes_header
│     │  │  ├─ section_tag > text-size-tiny「現場的聲音」
│     │  │  ├─ home-notes_title-wrap
│     │  │  │  ├─ home-notes_sparks > 10 × home-notes_spark.is-1…is-10   手繪光芒
│     │  │  │  └─ h2-graident-wrap > h2 × 2（第一個含 gradient-headline）
│     │  │  └─ home-notes_crowd          頭像疊排＋「39 家機構的夥伴都留了話，每季持續新增」
│     │  └─ home-notes_arc
│     │     ├─ home-notes_track          走帶（element 28c75352-3b6e-bf33-7a46-dee80b260025）
│     │     │  └─ 14 × home-notes_item > home-notes_note
│     │     │        （avatar／quote／who／org／from）
│     │     └─ home-notes_slot           細直條紋毛玻璃帶，上緣遮罩淡入，卡片下緣沒入其後
└─ HtmlEmbed（element e6229fa6-cdf2-b738-7b24-b248206da9b0）   弧形走帶程式
```

- 新增 class：`section_home-notes` 與 22 個 `home-notes_*`，另有 17 個 combo（`home-notes_spark.is-1`～`is-10`、`home-notes_avatar.is-small`／`.is-more`、`home-notes_blob.is-teal`／`is-sky`／`is-lavender`／`is-blue`／`is-violet`）。`home-notes_footer`、`home-notes_season` 已隨季度那行一併刪除。定義見 [`home-notes.css`](../../../custom-code/home-notes/home-notes.css)。
- 沿用既有 class：`padding-global`、`padding-section-small`、`container-large`、`section_tag`、`text-size-tiny`、`h2-graident-wrap`、`text-align-center`、`gradient-headline`。沒有修改任何共用 class、Component 或 Variable。
- 標籤用 `section_tag` > `text-size-tiny` 兩個既有 class 直接組成（同產品頁 FAQ 的做法），不是 `Section Tag` Component 實例。
- `section_home-notes` 的底色與 `section_cases-slider` 綁同一個 Variable（`neutral/white-30`），兩段之間沒有交界線。
- 顏色綁既有 Variables（讀回為 variable id）；漸層內為寫死色碼（MCP 寫入漸層時 `var()` 會被吃掉，見設計變數文件）。
- 14 張卡片是靜態元素，**不是 CMS**。頭像是姓氏字；只有職稱、沒有名字的兩張用 inline SVG 人形（讀回為 DOM `svg`／`circle`／`path`）。

## 動畫

| 名稱 | id | 觸發 | 內容 |
|---|---|---|---|
| Home Notes · Entrance (IX3) | `i-667c58c2` | 捲到區塊 `top 80%` 播一次 | 標籤／標題／人數列上浮；光芒 scaleX 依序畫出；頭像疊排彈出；紙條依序上升淡入 |
| Home Notes · Gradient blobs drift (IX3) | `i-bec9fa2c` | 進畫面播放、離開暫停 | 五團漸層各自 8–12 秒來回漂移（位移＋縮放） |
| Home Notes · Note hover lift (IX3) | `i-9451ac8f` | 滑鼠移入／移出紙條 | 紙條上抬 8px |

三個 interaction 的 scope 都是 `pages: [6af435313191d17e194df8e1]`（只在草稿頁）。數值沿用 [GSAP 動畫與互動規範 §13](../../standards/GSAP動畫與互動規範.md)。`prefers-reduced-motion`：進場 `skip-to-end`，其餘 `dont-animate`。

弧形走帶（卡片越靠近中間越高、慢速往左漂移、無縫循環、滑鼠停留暫停、可拖曳）由 HtmlEmbed 內的程式負責，IX3 的時間軸無法表達「高度取決於當下位置」。手機與「減少動態」不自動走，改 scroll-snap 手指滑。

## 尚未驗證

- **沒有在 Designer Preview 或已發布頁面看過實際畫面與動畫。** 目前的視覺依據是本機預覽：載入正式站 CSS 加上同一份 `home-notes.css` 與同一份程式，動畫用 GSAP 以相同數值模擬；桌機 1440、平板 820、手機 390 無水平溢出、無 console 錯誤。
- 第二輪（漸層、玻璃帶、移除季度行）只做了 Data API 讀回與本機預覽，Terris 尚未看過。`mask-image` 由 style API 寫入並讀回存在，發布後瀏覽器是否輸出同一屬性未驗證。
- IX3 建立成功不等於有播放。特別要看：複製出來的第二組卡片有沒有吃到進場與 hover（依賴 Embed 程式比 IX3 先執行）；`avatars-pop` 用了 `filterContext: within` 限定在疊排內，是否只作用在那 6 個頭像。
- JuboFont 在本機預覽沒有載入，字重可能略有差異。
