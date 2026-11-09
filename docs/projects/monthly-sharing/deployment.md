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

## 2026-11-06 第四輪：連結無反應、eyebrow 靠左

- **集數卡片／最新一集按鈕點了沒反應**：建頁時 WHTML 的 `href="#"` 被存成自訂屬性，與 CMS 連結綁定並存（對照 `/news` 正常的 CMS 卡片，attributes 為空）。已把 `sansan-ep_card`、`sansan-feat_media`、`sansan-feat_link` 的自訂屬性換成 `target=_blank`、`rel=noopener`，並重新綁定「直播／回放連結」；隱藏中的講師彈窗三個連結同樣處理。分類卡片改用 Webflow「Page section」連結指向 `#episodes` 區塊，行事曆與播放清單改為正式 URL 連結（新分頁）。讀回全頁已無殘留的 `href` 自訂屬性。
- **分頁玻璃按鈕**：腳本邏輯用 Playwright 模擬 Webflow 分頁 HTML 測過四種情況（只有下一頁／兩者／只有上一頁／單頁），結果正確。Designer 與 Preview 不執行頁面／全站自訂程式碼，所以在 Designer 裡點分頁按鈕與 FAQ 都不會有反應，必須發布到 staging 才能驗證；頁面為 draft 時 staging 也看不到。
- **FAQ eyebrow 靠左**：FAQ 標題區由 `section-header_wrapper`（全站共用、置中）改用 `sansan-faq_head`（靠左），h2 移除 `text-align-center`。其他區塊的 eyebrow 原本就靠左。

## 2026-11-06 第五輪：分類篩選卡片＋YouTube CTA（仍未發布）

使用者指示：主題系列改成四個按鈕，點了才出現該分類課程，按鈕要漸層、參考 Mobbin、要有代表各面向的小動畫且持續循環；樣式比照資安頁卡片（上方淺色漸層＋漸層細線圖示）。「全部集數」改成一個 section，CTA 到 YouTube 看完整播放清單。

- **Mobbin 參考**：Customer.io／incident.io／Mural 的資源庫分類切換（分類在上、結果在下、一次只看一類）。
- **為什麼不用 Webflow Tabs**：用 API 建立的 Tabs 只有 3 個分頁，無法新增第 4 個，已刪除。改用 IX3 點擊互動切換 class（Designer 預覽也會跑 IX3，不需自訂程式碼）。
- **結構**：`.sansan-filter_component` > `.sansan-filter_menu`（4 張卡）＋ 4 個 `.sansan-filter_pane`（第 2–4 個帶 `is-hidden`）。卡片 `.sansan-filter_btn` = `.sansan-filter_fill`（底部 4px 漸層條，`is-active` 時顯示）＋ `.sansan-filter_visual`（沿用全站 `gradient-bg` ＋ `is-bento-color-1/2`，與資安頁同一組）＋ `.sansan-filter_icon`（`.sansan-filter_part` 遮罩漸層細線圖示，漸層值同 `security-layer_icon-tile`）＋文字。
- **圖示**：機構經營管理＝長條圖（長條循環伸縮）、照護實務技巧＝心形＋心電線（心跳＋線條明滅）、長照評鑑準備＝板夾＋勾勾（勾勾縮放）、AI與數位工具＝星芒（呼吸＋小星閃爍）。IX3 `i-1616db2c`，timeline `settings: {repeat: -1, yoyo: true}`，捲到分類區開始無限循環；減少動態偏好時不播。
- **點擊切換**：`i-7ab8ee1c`（機構經營管理）、`i-98e3de9f`（照護實務技巧）、`i-160375b4`（長照評鑑準備）、`i-14e6e3c4`（AI與數位工具）。每個：移除所有 `is-active`→加到自己的漸層條；所有 pane 加 `is-hidden`→自己的 pane 移除；pane 淡入上移。所有 Set 動作放在 0.01s 之後，避免頁面載入時被提前套用。卡片 hover 浮起 `i-848df746`；進場 `i-0450ce34`（改指向新卡片）。
- **分類清單**：每個 pane 一個 Collection List（`sansan-filter_list` 三欄網格），條件＝分類＋狀態「已播出」＋封面已設定，直播時間新到舊。卡片連結綁「直播／回放連結」、新分頁開啟。清單 ID：機構經營管理 `15968067-…beca`、照護 `a4606375-…8445`、評鑑 `e23fd11d-…b63d`、AI `96c1096e-…6998`。
- **API 問題紀錄**：新建清單若先只寫 `source`、之後再寫 `filters`，會一直回 `[Conflict] The operation could not be applied to the component map`；同一個操作裡一次寫 `source`＋`filters`＋`sort` 才成功。舊的 latest／archive 清單也是同一問題，這可能是第一版 latest／archive 篩選條件消失的原因。
- **全部集數 → YouTube CTA**：刪除最新一集卡、集數庫清單、分頁玻璃按鈕與頁面 footer 的 `sansan-pager` 腳本（已清空）；改為 `.sansan-replay_card`（`gradient-bg is-bento-color-1` 背景）＋ Section Tag「全部集數」＋標題＋說明＋ CTA Button「到 YouTube 看完整播放清單」（新分頁）＋漸層細線播放圖示（`i-c43be322` 循環呼吸）。進場 `i-a8d961ad`。刪除 `i-784be094`、`i-acf1c11d`。
- `custom-code/monthly-sharing/sansan-pager.js` 已不再部署，保留為紀錄。

## 2026-11-09 第六輪：統一 banner hero、結構重排、制式 CTA（仍未發布）

使用者指示：hero 要做成統一 banner，用多個直播視窗＋三三分享會畫面截圖，主要介紹三三分享會是什麼，只放一個「最新直播資訊」按鈕；下方結構為 關於直播 → 最新消息（特別 highlight）→ 過去直播；移除「全部集數」卡片；最後的 CTA 用制式元件；整體版面要更像官網。

- **「聖誕」來源**：頁面內容沒有任何聖誕字樣（全頁搜尋 0 筆）；只有 git 分支名 `claude/christmas-sharing-page-3u67cr` 帶 christmas（第一次對話時依「聖誕分享會」自動命名，依 repo 規則不更換分支）。Claude 工作階段標題已改為「智齡三三分享會專區頁 /jubo-33-live-stream」。
- **直播截圖素材**：取自 Jubo 自有 YouTube 頻道影片的自動畫格截圖（`i.ytimg.com/vi/<id>/maxres1-3.jpg`），轉成 webp 上傳：`6af1182545f9805188b40137`（開場畫面，EP19）、`6af118259fa8955d9cfd12e9`（講師入鏡，EP16）、`6af118259fa8955d9cfd12fa`（吞嚥簡報＋講師小窗，EP18）、`6af1182504d34e6a4a56d713`（簡報＋多人視窗，EP19）、`6af1182504d34e6a4a56d759`（急救簡報，EP15）。畫面含講師與少數線上參與者小視窗，皆為已公開影片內容；正式上線前建議行銷確認。
- **Hero（`section_sansan-hero` 內重建）**：`.sansan-banner_component`（0.85fr 1fr，同 Tier B product hero 比例；平板以下單欄）。左：Section Tag「每月直播節目」、H1「智齡三三分享會／把照護現場的難題，講清楚」（後半 `gradient-headline`）、介紹文、單一 CTA Button「最新直播資訊」→ `#latest`、三個事實膠囊。右：`.sansan-live_window` ×5 直播視窗拼貼（主視窗有視窗列與漸層「直播中」標籤），手機隱藏兩個小視窗。IX3：載入 `i-02c482e7`（文字逐行上升、視窗逐一放大淡入）、`i-15c4768f`（視窗緩慢上下漂浮，無限循環）。
- **最新消息（新 `section_sansan-latest`，id 錨點 `#latest`）**：Section Tag「最新消息」＋ H2「下一集，第三個週三中午見」＋高亮卡 `.sansan-latest_card`（白卡＋`gradient-bg is-bento-color-1`＋大陰影），原 hero 的下一集區塊（大字日期、EP、分類、主題、講師、提醒按鈕、行事曆、封面、月曆卡）整組搬入。原 H1「智齡三三分享會」移到新 hero。原 hero 載入動畫 `i-609a616a` 改為捲到此卡時播放。`set_dom_id` 對新 section 再次遇到 MPS conflict，改用卡片前的錨點 div（`id="latest"`）。
- **關於直播**：Section Tag 改「關於直播」，H2 改為帶 `gradient-headline` 的版本。
- **過去直播**：Section Tag 改「過去直播」，H2「依主題，找到你需要的那一集」（漸層強調）；分類篩選卡維持第五輪。
- **講師、FAQ**：保留在過去直播之後；講師 H2 改漸層強調。
- **移除**：「全部集數／YouTube CTA」整段（`e597718c-…`）、自訂 LINE 收尾區（`893701ff-…`）；刪除 `i-a8d961ad`、`i-c43be322`、`i-ad4d2972`。
- **結尾 CTA**：改用全站 `CTA Section #1` 元件，Title「每月第三個週三，中午見」、Text「加入 LINE 官方帳號，新集數公布和開播前都會傳訊息提醒你」、按鈕「加入 LINE，開播提醒」→ `https://lin.ee/Clf7lXr`（新分頁）。
- **頁面順序**：Hero → 關於直播 → 最新消息 → 過去直播 → 講師 → FAQ → CTA Section #1 → Footer。

## 2026-11-09 第六輪追加：hero 直播意象（仍未發布）

使用者：顏色太跳的簡報不要放 hero；加直播動畫（loading…）、參考 StreamYard 的釘選留言、跑馬燈。

- **換圖**：橘紅食物照（EP18 簡報）與紅箭頭簡報（EP15）換成同色系青綠畫面：`6af11e57499a76ecfcb4124f`（EP18 封面＋講師與主持人視窗）、`6af11e57da6db872c21ba67f`（EP21 封面＋講師視窗）、`6af11e57da6db872c21ba6a2`（EP09 講師介紹頁）。舊的 slides-a／slides-c 素材保留未刪。
- **置頂留言（StreamYard 風格）**：主視窗左下兩則 `.sansan-live_comment`（漸層頭像「三」＋「三三分享會」＋「置頂留言」標籤），內容是主持人提醒（聊天室提問、可看回放），不是虛構的觀眾留言。第二則帶 `is-next`（靜止時透明）。IX3 `i-ca6939e8` 每 10 秒輪流淡入淡出。
- **跑馬燈**：主視窗底部 `.sansan-live_ticker`（漸層「三三分享會」標籤＋深色半透明條），四則真實資訊各重複一次；IX3 `i-01fea2ae` 以 xPercent 0→-50 線性 26 秒無限循環（無縫）。
- **Loading**：左上小視窗蓋上 `.sansan-live_loading`（白霧＋轉圈＋「下一集直播準備中」＋三點），IX3 `i-55053d74` 轉圈與三點循環，並讓主視窗「直播中」燈號明滅。
- 以上循環都在減少動態偏好時不播放；手機版小視窗隱藏、留言字級縮小。


## 2026-11-09 第六輪追加二：留言區、teal 跑馬燈、hero 文案（仍未發布）

使用者：置頂留言名稱與縮圖都改智齡科技；移除「下一集直播準備中」卡片；跑馬燈改 Jubo teal 底＋白字；右上角卡片改成 YouTube 觀看時的留言區，用線條呈現、持續 loop；hero 文字改「利用中午午休時間，增強長照知識！」。

- **Hero H1**：第二行（`gradient-headline` span）改為「利用中午午休時間，增強長照知識！」。
- **置頂留言**：兩則 `.sansan-live_comment` 名稱改「智齡科技」；頭像由漸層「三」字改為 Image，使用 Jubo logo 素材 `6ace01c72f27502d08c10e27`。
- **移除**：左上 loading 小視窗（`.sansan-live_loading`，含轉圈與三點）整個視窗刪除；`i-15c4768f` 漂浮循環同步移除該視窗動作；`i-55053d74` 改為只做主視窗「直播中」燈號明滅。
- **跑馬燈**：`.sansan-live_ticker` 背景綁 primary accent（Jubo teal，`variable-d240906f-…`），文字綁白色（`variable-987d0d75-…`）；左側標籤改為半透明深 teal（rgba(23,94,94,0.55)）。
- **留言區（右上視窗）**：原講師入鏡截圖視窗改為 `.sansan-chat`：標題列（「即時聊天室」＋ teal「LIVE」膠囊）→ `.sansan-chat_viewport`（overflow hidden）→ `.sansan-chat_track`（12 列 `.sansan-chat_row`：彩色圓形頭像＋名稱線＋訊息線，長度以 `is-wNN` 變化，6 列內容重複一次）→ 底部假輸入框。沒有實際文字，只用線條表現。視窗高度 17rem（手機 11rem）。
- **留言 loop**：新增 IX3 `i-7b864ebe`，track yPercent 0→-50，線性 16 秒，repeat -1（因內容重複一次，無縫循環）；減少動態偏好時不播。
- 講師入鏡截圖（`6af118259fa8955d9cfd12e9`）已不在 hero 使用，素材保留未刪。

## 2026-11-09 第六輪追加三：留言區改真實文字（仍未發布）

使用者：線條留言區不好看，改成真實文字，參考我們影片的聊天室回放；之後會提供假人頭像。

- **聊天室回放來源**：用 YouTube innertube API 讀取。有回放的集數只有三集：`HXzyILy2D2U`（AI part2）、`FZHWfRv8xTQ`（評鑑 B 計畫：感染管制）、`N1K2UCAa2fg`（EP22，讀不到內容）。其餘影片顯示「不支援聊天室訊息重播」。真實留言以「簽到／午安」、主持人提醒提問與回放、「請問影片可以回放嗎？」、「AI好方便」、「notebookLM超好用」、「很棒的內容👍」為主。
- **去識別化**：回放中的真實機構名稱與個人姓名都不使用；顯示名稱改為虛構的職稱暱稱（林護理師、陳社工、王主任、小美、張照服員、黃督導），留言內容依真實留言改寫。主持人留言以「智齡科技」名義發出（Jubo logo 頭像＋teal 名稱膠囊）。
- **結構**：`.sansan-chat_track` > 兩個相同的 `.sansan-chat_group`（各 8 則）> `.sansan-chat_row`（頭像＋`p.sansan-chat_text` 內含 `span.sansan-chat_author`，主持人加 `is-host`）。頭像暫時用彩色圓形＋姓氏（`.sansan-chat_avatar` 改為 1.5rem、置中白字），主持人用 `img.sansan-chat_avatar-img`（logo `6ace01c72f27502d08c10e27`）。
- **換頭像方式**：使用者提供假人圖片後，上傳成素材，把每位的 `.sansan-chat_avatar` div 換成 `img.sansan-chat_avatar-img`（兩組都要換，共 12 個）。
- **動畫**：`i-7b864ebe` 改為 32 秒一輪（原 16 秒），讓文字讀得完；兩組內容相同，yPercent 0→-50 無縫循環。
- 刪除不再使用的 `sansan-chat_lines`、`sansan-chat_name`、`sansan-chat_msg` 樣式。
- **假人頭像（2026-11-09）**：使用者提供 AI 生成的虛構人物頭像（200×200 WebP），上傳為素材：林護理師 `6af129169fa8955d9c01a2b1`、陳社工 `6af129169fa8955d9c01a297`、王主任 `6af12916c3a6bb9fb5ee3bb8`、小美 `6af12916b88c3212ce727a73`、黃督導 `6af12916434edee758f928cc`。兩組共 10 個姓氏圓形已換成 `img.sansan-chat_avatar-img`。張照服員的圖片未收到檔案，兩個位置（`3d7db775-…8e79`、`3891271a-…6b8d`）仍為姓氏圓形。

## 2026-11-09 第六輪追加四：hero 與關於直播文案（仍未發布）

- **Hero**：eyebrow（Section Tag）改「智齡三三分享會」；H1 移除「智齡三三分享會」與換行，只留漸層「利用中午午休時間，增強長照知識！」；說明改為「每月第三個星期三中午，智齡科技在 YouTube 免費直播。邀請長照現場的院長、督導與專家，分享評鑑準備、照護實務、機構經營與 AI 工具的實戰經驗，錯過也能隨時看回放。」；刪除三個灰色事實膠囊，同步刪除 `sansan-banner_facts`／`sansan-banner_fact` 樣式，並從 `i-02c482e7` 移除該目標。
- **關於直播（section 2）**：H2「上班之餘，**也可以好好充實自己**」（後半漸層）；說明寫入理念：利用午休零碎時間累積實務能力、每月一主題一小時、業界講者把現場經驗整理成回去就能用的方法、不必請假打開 YouTube 就能參加、照護品質來自每位夥伴的持續成長。三點改為 01 業界專業講者／02 主題豐富多元／03 影片隨時可複習（各一句說明）。原「講師同意開放的集數可索取簡報」的說法一併拿掉。
- **適合誰看**：每個 pill 一個職位：機構主任、護理師、社工、居服督導、照顧服務員、個案管理師。

## 2026-11-09 第七輪：最新消息卡重新設計＋底部釘選條（仍未發布）

使用者：最新消息卡左右資訊重複；希望捲過去時能「釘選」。使用者選擇：底部小橫條、右邊放講師＋本集重點、背景由 Canva 匯出無字版。

- **分工**：左邊只放「時間與行動」（下一集直播標籤、大字日期、EP＋分類、主題、提醒按鈕、加入行事曆）；右邊只放「這集在講什麼」（無字背景照＋講師＋這集你會聽到）。主題、日期不再在右邊重複；講師只出現在右邊。
- **移除**：左邊講師膠囊（搬到右邊）、右下「每個月的這一天」月曆卡；刪除 `sansan-hero_cal*`（含 `is-wed` combo）與 `sansan-hero_cover` 樣式。`sansan-hero_visual` 的 padding-bottom 改 0、align-self stretch。
- **右側面板**：右側 Collection List（狀態＝預告、直播時間升冪、1 筆）的 item 內放 `.sansan-latest_panel`：`img.sansan-latest_panel-bg`（綁新欄位「卡片背景圖」）→ `.sansan-latest_panel-shade`（深 teal 由上而下漸層）→ `.sansan-latest_panel-body`：「主講人」標籤、講師區塊（原 `sansan-hero_speaker` 搬入，加 `is-panel` combo：透明底、頭像 4rem 白框、名字 1.25rem、單位白字 82%）、分隔線、「這集你會聽到」標籤、RichText `.sansan-latest_points`（綁「講綱」）。面板底色 teal（無背景圖時的備援）、最小高度 27rem（手機 24rem）。
- **CMS**：集數新增 Image 欄位「卡片背景圖」`qia-pian-bei-jing-tu`（`1d61744a530bc438dafd620ab7df1a8e`）。EP22 已填：背景圖、講綱三點（2026-11-09 使用者確認）：長照現場常見的性騷擾情境；照護時如何劃出專業界線並適時拒絕與回應；事件發生後的通報流程與機構保護措施。
- **Canva 無字版**：複製 `DAGLvkPY5mw` 第 23 頁為新設計 `DAHaYmRDTEA`「三三分享會 EP22 官網卡片背景（無字版）」，刪除所有文字、logo、講師照，只留手部照片（Canva 圖庫素材 `MAD6rruvVvs`）與 teal 疊層；原設計未修改。匯出 1600×900 → WebP 上傳為素材 `6af12e77412b20cb89ec0b6b`。之後每集：複製當集宣傳頁 → 刪字 → 匯出 → 上傳到該集「卡片背景圖」。
- **底部釘選條**：`.sansan-pin`（fixed、底部置中、最寬 52rem）放在 main-wrapper 最後，內含 Collection List（同上篩選）→ `.sansan-pin_inner` 白色膠囊：teal 點＋「下一集」、日期（綁「日期大字」，手機隱藏）、主題（綁 Name，超出省略）、「開啟提醒」（綁「直播／回放連結」，新分頁）、✕ 關閉。IX3 `i-f14efd31`：最新消息卡底部捲過視窗 15% 時滑入，往回捲到卡片時收回；`i-08956636`：點 ✕ 滑出並隱藏（本次瀏覽不再出現）。
- **動畫**：`i-609a616a` 移除月曆與舊封面動作，改為面板淡入上升、背景照 1.08→1 慢放、講師與重點依序淡入。

## 2026-11-09 第七輪追加：最新消息卡精簡（仍未發布）

- **區塊標題**：H2 改「11月份**最新直播**」（後半漸層）。**每月要手動改月份**（標題在 Collection List 外，無法綁 CMS）。
- **卡片左邊**：移除「● 下一集直播」狀態標籤、「EP22」字樣（保留分類標籤）、「加入行事曆」連結、Glass Button「加 LINE，當天提醒」。只留一顆 CTA Button「加 LINE，開啟直播提醒」→ `https://lin.ee/Clf7lXr`（新分頁）。刪除不再使用的 `sansan-hero_kicker`、`_status`、`_ep`、`_links`、`_link` 樣式；`i-609a616a` 同步移除這些目標。
- **卡片右邊講師放大成主視覺**：`sansan-hero_speaker-name.is-panel` 2.5rem（平板 2.125rem、手機 1.75rem）、`_speaker-org.is-panel` 1.125rem、`_avatar.is-panel` 5.5rem（手機 4rem）；講師區塊底部對齊，手機改上下排列。
- **講綱白字**：全站 `li`／`p` 標籤樣式固定 neutral/black，class 無法用 API 設子層選擇器，改在頁面 head freeform code 加 `<style id="sansan-latest-points">`，正本 `custom-code/monthly-sharing/latest-points.css`。

## 2026-11-09 第八輪：hero 視覺簡化（仍未發布）

使用者：EP22 講綱確認 OK；hero 還是太亂，右邊卡片不要邊框、移除白邊，顏色少一點、簡單一點。

- **視窗數量**：4 個 → 2 個。刪除兩張簡報截圖視窗（`is-slides`、`is-slides-b`），只留主直播畫面（左下、寬 74%）與聊天室（右上、寬 36%、高 20rem；手機 42%／12rem）。`sansan-banner_visual` 最小高度 32rem → 26rem（手機 16rem）。
- **去白邊**：`sansan-live_window` 移除 1px 白色外框；陰影改淡 `0 20px 48px -20px rgba(21,23,23,.22)`。主視窗頂端白色標題列（三個圓點＋標題）刪除，「直播中」標籤改為浮在畫面左上角。
- **顏色收斂成 teal＋白**：「直播中」標籤由 teal→紫漸層改 teal 純色；聊天室送出鈕由漸層改 teal。跑馬燈維持 teal 底白字。
- **動畫**：`i-15c4768f` 只保留兩個視窗的漂浮。
- **清理樣式**：刪除 `is-slides`、`is-slides-b`、`is-mini`、`sansan-live_bar`、`_bar-title`、`_dots`、`_dot`，以及先前已不用的 loading 系列（`sansan-live_loading`、`_spinner`、`_loading-text`、`_loading-dots`、`_ldot`）。簡報截圖素材保留在素材庫未刪。
