# 現況

文件更新日：2026-11-11（第四輪）。Webflow 讀回日：2026-11-11（Data API 讀回元素、文字、樣式、IX3、Embed；**未在 Designer Preview 或任何已發布環境驗收第四輪**）。

## 位置

- 頁面：草稿頁「首頁（現場小紙條草稿）」`/home-notes-draft`，page id `6af435313191d17e194df8e1`，`draft: true`。它是正式首頁的完整複本。
- 區塊：`section_home-notes`（element `cbf93a91-5abb-368b-911e-3344fcfef756`），在 `section_cases-slider`（成功故事）之後、`section_home-security`（資安玻璃卡）之前。
- 正式首頁（page id `69ec2b03daa2e79f1da8772e`）**沒有任何改動**。

站台不是 Enterprise 方案，頁面分支不可用（`create_branch` 回 403），所以用草稿頁。

## 版面：對話泡泡（第四輪，取代卡片弧線）

```
section_home-notes                      底色同 section_cases-slider（neutral/white-30），兩段證言之間無交界線
├─ home-notes_aura                      背景層，邊緣以 mask-image 淡出
│  └─ 5 × home-notes_blob.is-teal／is-sky／is-lavender／is-blue／is-violet   各自漂移的漸層（IX3）
├─ padding-global > container-large
│  └─ home-notes_header
│     ├─ section_tag > text-size-tiny「夥伴回饋」
│     └─ home-notes_title-wrap
│        ├─ home-notes_sparks > 10 × home-notes_spark.is-1…is-10   手繪光芒
│        └─ h2-graident-wrap > h2「智齡夥伴真心話」（gradient-headline）＋ h2「全台長照夥伴的使用心得」
├─ home-notes_rows                      左右邊緣以 mask-image 淡出
│  ├─ home-notes_track                  第一排（element ec5f3342-cdd2-de33-8cf0-710a6425098f），往左
│  └─ home-notes_track [data-direction="reverse"]   第二排（element 1e038998-d884-55fb-b39f-c790d076999a），往右
│     └─ 各 7 × home-notes_item
│        ├─ home-notes_bubble           引言（白底，左下角尖角）
│        └─ home-notes_meta
│           ├─ home-notes_avatar        姓氏字；只有職稱的兩則用 inline SVG 人形
│           └─（無 class 的容器）
│              ├─ home-notes_who  姓名職稱 ＋ span.home-notes_org 機構
│              └─ home-notes_from 系統 › span.home-notes_from-feature 功能
└─ HtmlEmbed（element c85b8868-4624-6379-19d8-02c2b23fe785）   兩排移動的程式
```

- class：`section_home-notes` 與 17 個 `home-notes_*`，另有 15 個 combo（`home-notes_spark.is-1`～`is-10`、`home-notes_blob.is-*` ×5）。定義見 [`home-notes.css`](../../../custom-code/home-notes/home-notes.css)。第三輪以前的 class 全數刪除後重建，沒有殘留舊定義。
- 沿用既有 class：`padding-global`、`container-large`、`section_tag`、`text-size-tiny`、`h2-graident-wrap`、`text-align-center`、`gradient-headline`。沒有修改任何共用 class、Component 或 Variable。
- 標籤用 `section_tag` > `text-size-tiny` 直接組成（同產品頁 FAQ 的做法），不是 `Section Tag` Component 實例。
- 顏色綁既有 Variables；漸層內為寫死色碼。
- 14 則是靜態元素，不是 CMS。寫入後已逐則讀回核對引言、姓名職稱、機構，全部與來源相符。
- 文案不出現機構家數（Terris 指示）。系統名縮寫為「住宿型／日照型／居服」。

## 動畫

| 名稱 | id | 觸發 | 內容 |
|---|---|---|---|
| Home Notes · Entrance (IX3) | `i-01561aa9` | 捲到區塊 `top 80%` 播一次 | 標籤、標題上浮；光芒依序畫出；泡泡從尖角依序彈出；署名列上浮 |
| Home Notes · Gradient blobs drift (IX3) | `i-c6a6fd0a` | 進畫面播放、離開暫停 | 五團漸層各自 8–12 秒來回漂移 |
| Home Notes · Bubble hover lift (IX3) | `i-3516cd82` | 滑鼠移入／移出單則 | 上抬 6px |

scope 皆為 `pages: [6af435313191d17e194df8e1]`。`prefers-reduced-motion`：進場 `skip-to-end`，其餘 `dont-animate`。

兩排的慢速移動（每秒 20px、無縫循環、滑鼠停留該排暫停、可拖曳）由 HtmlEmbed 的程式負責。手機與「減少動態」不自動走，改 scroll-snap。

## 尚未驗證

- **第四輪沒有任何人在 Designer Preview 看過。** 視覺依據是本機預覽 v6：正式站 CSS 加同一份 class 定義與同一份程式，動畫用 GSAP 以相同數值模擬；桌機 1440、平板 820、手機 390 無水平溢出、無 console 錯誤。
- IX3 建立成功不等於有播放。要看：程式複製出來的第二組泡泡有沒有吃到進場與 hover（依賴 Embed 比 IX3 先執行）；hover 的上抬與程式的捲動是否互不干擾。
- `mask-image` 由 whtml css 寫入並讀回存在；發布後瀏覽器是否輸出同一屬性未驗證。
- JuboFont 在本機預覽沒有載入。
