# 部署紀錄

| 層次 | 狀態 | 日期／版本 | 證據 |
|---|---|---|---|
| Git commit／PR | 提案與實作紀錄已提交至 `claude/christmas-sharing-page-3u67cr`；未開 PR | 2026-11-06 | 本分支提交紀錄 |
| Webflow Designer | **已建立草稿頁與 CMS**（Data API 寫入，Designer App 未連線） | 2026-11-06 | 見下方 |
| staging | 未發布 | — | — |
| production | 未發布 | — | — |

## 2026-11-06 第一版：草稿頁、CMS、IX3

- 授權：使用者 2026-11-06「現在幫我新增一頁到 webflow 然後使用 ix3 等等專業的設計來製作」。**未授權 Publish**。
- 頁面：`/monthly-sharing`，Page ID `6aed901905a96260ffcc4595`，**`draft: true`**（讀回確認）。以 `/community` 複製取得 Global Style、Cookies、Navbar、Page Gradient BG 骨架，刪除原 hero，加入全站 Footer。
- CMS：新增「三三分享會講師」(`6aed903bb9132d6f3c23721b`，15 筆) 與「三三分享會集數」(`6aed903bb9132d6f3c237251`，22 筆，網址 `/monthly-sharing/ep22`)。**所有項目 `isDraft: true`**。同時自動產生集數 Template page，尚未設計。
- 素材：34 個（20 張集數封面、14 張講師大頭照），以 S3 presigned upload 上傳，全部回 201。
- 區塊：Hero（CMS 下一集）、關於節目、主題系列、最新一集＋集數庫（每頁 9 筆）、講師陣容（CMS＋點擊彈窗）、每一集的時間線、FAQ（原生 details）、Email 訂閱（Webflow 原生表單）。
- IX3：18 個互動，全部 `scope: pages`、加 `prefers-reduced-motion`。
- 設定、ID 與回退步驟：[custom-code/monthly-sharing/2026-11-06-build.json](../../../custom-code/monthly-sharing/2026-11-06-build.json)。

### 2026-11-06 追加：CMS 項目改為可發布（Staged）

- 原因：使用者回報 Hero、集數庫、講師牆都顯示「No items found.」。Collection List 不顯示 `isDraft: true` 的項目，這是第一版把 37 筆都設成草稿造成的。
- 已改：37 筆項目 `isDraft: false`（讀回確認）。這**不是發布**；項目要等下一次 Publish 才會上線。
- 已改：三個 Collection List 的預設灰色「No items found.」空狀態設為隱藏。
- **風險（未解決）**：兩個 CMS Template page（集數 `6aed903cb9132d6f3c237287`、講師 `6aed903bb9132d6f3c237221`）用 API 設 `draft: true` 被忽略，讀回仍為 `false`。若有人做全站 Publish，`/monthly-sharing/ep22` 等未設計的單集頁與 `/monthly-sharing-speakers/*` 會跟著上線。需在 Designer 把兩個 Template page 設為 Draft，或在設計完成前不要全站發布。
- 樞紐頁仍為 `draft: true`（2026-11-06 網址改為 `/jubo-33-live-stream`）。

### 驗證與限制

- 已讀回：頁面 metadata、四斷點樣式、CMS 建立回應、18 個 IX3 建立回應。
- **未驗證**：Designer App 未連線，element snapshot 失敗；沒有 Preview／staging，**無法確認實際排版、CMS 渲染、IX3 是否播放、講師彈窗是否只開被點的那一張、表單送出**。下一步需在 Designer Preview 驗收（見 tasks.md）。
- 預覽 Artifact（設計稿）：<https://claude.ai/artifact/3NqKptaKNGNQoGKdQABy5F>（Version 3）。

## 2026-11-06 第二輪修改（仍未發布）

授權：使用者截圖回饋與指示（分類改名、日期被切、EP 標籤右上、關閉講師彈窗、移除時間線、FAQ 依首頁、分頁改玻璃按鈕中文、網址改 jubo 33 live stream、講師臉置中）。

- **網址**：Page slug `monthly-sharing` → `jubo-33-live-stream`（讀回 `publishedPath: /jubo-33-live-stream`）。CMS 集數 collection slug 仍是 `monthly-sharing`。
- **分類**：新增 Option 欄位「分類」`fen-lei`（`c7b5e2f3997b0e08c559d295da0b1854`）：機構經營管理 `1e77f6707f328d328feb450ff6a57264`、照護實務技巧 `a223c85da253a7a2eba2498da2980a9a`、長照評鑑準備 `d453c11246651d4006e27b765f11c620`、AI與數位工具 `992a1575e754f01b2df64c0f02e1723b`。22 集一對一轉換（經營管理與職場→機構經營管理、照護實務→照護實務技巧、評鑑準備→長照評鑑準備、AI 與數位工具→AI與數位工具），讀回確認、`isDraft:false` 不變。Hero 與集數卡的分類標籤改綁新欄位後，刪除舊欄位「主題系列」`ae66529c…`。分類卡片改名並依使用者順序排列。
- **Hero 日期**：`.sansan-hero_date` 加 `padding 0.08em/0.2em`＋同值負 margin（`background-clip:text` 只畫在元素框內，line-height 0.86 會切掉字腳；版面位置不變）。
- **EP 標籤**：`.sansan-ep_badge` `left` → `right: 0.65rem`。
- **講師彈窗**：面板 `fe3643b8-…add5` visibility false、「講師介紹 ›」隱藏、卡片移除 role/tabindex、cursor default；刪除 `i-e08736e9`、`i-f7b576c4`、`i-9bc35d93`（定義見 `custom-code/monthly-sharing/2026-11-06-removed-interactions.json`）。
- **時間線區塊**：刪除 section `2fcbed6e-…17e1` 與 `i-83083b2a`。
- **FAQ**：舊 `<details>` 版刪除，改為首頁結構 `faq_component > section-header_wrapper（Section Tag「FAQ」＋h2-graident-wrap）＋ solutions-basic-model_wrap > _list > _accordion × 5`，section 加 `section_faq`、`container-small`、`padding-section-large`。沿用既有 class，沒有產生 `-1` 重複 class（讀回確認）。刪除 `i-fa9a7307`。`sansan-faq_*` class 已無元素使用，保留未刪。
- **分頁**：Pagination 加 `sansan-episodes_pagination-native`（display:none）；新增 `.sansan-episodes_pager` 內兩個 Glass Button instance（`‹ 上一頁`、`下一頁 ›`）；頁面 footer freeform code 寫入 `<script id="sansan-pager">`（正本 `custom-code/monthly-sharing/sansan-pager.js`）。Designer 預覽不會執行頁面腳本，切頁需在 staging 驗證。
- **未驗證**：同前，Designer App 未連線，以上皆為 Data API 讀回，未經 Preview／staging。
- **講師照片置中**：何憲欽、侯怡岑、吳淑芬三張改用 Canva `DAGLvkPY5mw` 第 16／4／6 頁高解析匯出（export-design，未修改設計）重新裁切成 480×480，臉部置中、含下巴與肩膀。新 asset：`6aed9e871f6b05e615d27836`（ho-v2）、`6aed9e871f6b05e615d27851`（hou-v2）、`6aed9e8832fd2e6ddc51401b`（wu-v2），CDN 讀回 200；三筆講師項目照片欄位已換、`isDraft:false` 不變。舊 asset 保留未刪。侯怡岑原圖頭頂本來就被切，圓形框內頭髮頂端仍會略切。其餘 11 位檢查後未重裁；成茵茵偏緊（臉約佔 85%）、劉旻宜原圖解析度低、王雪珮原圖背景含灰白格紋（需換來源照片）。

## 2026-11-06 第三輪：移除 Email、單集頁網址

- **移除 Email 訂閱**（使用者：「我們沒有寄信，主要推廣到 LINE」）：刪除表單 slot `893701ff-…6523`（含 Webflow 表單「Email Form」）與 Hero 連結「Email 通知我 →」；結尾區說明改為 LINE＋YouTube，「加入 LINE」玻璃按鈕移到第一顆，section DOM id `subscribe` → `line`；Hero 空狀態文字改為加入 LINE；FAQ「Email 會寄些什麼？」改為「怎麼收到開播提醒？」。讀回全頁已無「Email」字樣。`sansan-subscribe_form`／`_input`／`_note`、`.form-submit-btn.is-inline` 已無元素使用，保留未刪。
- **單集頁網址未改成**：`update_page_settings` 對集數 Template page 改 slug 被忽略（讀回 `publishedPath: /monthly-sharing`）；designer_tool 也沒有 collection 設定動作。需在 Designer 手動改 Collection URL。

