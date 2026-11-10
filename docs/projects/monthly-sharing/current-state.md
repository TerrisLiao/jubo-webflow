# 現況

- 文件更新日期：2026-11-10
- Webflow：節目專區 Page ID `6aed901905a96260ffcc4595`，路徑 `/resources/jubo-33-live-stream`，`draft: false`。已於 2026-11-10T10:30:53.018Z 正式發布至 www／apex 與測試站；主頁、兩篇 News、11 個簡報頁均 HTTP 200，原正式站 404 已排除。發布與驗證見下方第十九輪。
- CMS：三三分享會集數與講師已隨正式站發布，EP23 依使用者明確同意提前公開。集數 Template 已完成簡報索取；未開放簡報的單集及未設計的講師獨立頁暫時 noindex 並返回專區。
- 2026-11-06 第二輪修改：分類改為四項（新欄位「分類」）、Hero 日期修正裁切、集數卡 EP 標籤移右上、講師彈窗先關閉、刪除「每一集的時間線」區塊、FAQ 改用首頁結構、分頁按鈕改玻璃按鈕＋中文。
- 2026-11-09 第六輪：Hero 改為統一 banner（介紹節目＋直播視窗拼貼＋單一「最新直播資訊」按鈕）；結構改為 關於直播 → 最新消息（高亮卡）→ 過去直播 → 講師 → FAQ → 制式 CTA Section #1；移除全部集數與自訂 LINE 區。
- 2026-11-09 第六輪追加：hero 主視窗有智齡科技置頂留言輪播與 Jubo teal 跑馬燈，右上為線條式 YouTube 留言區無限捲動；H1 第二行「利用中午午休時間，增強長照知識！」。
- 來源分支：`claude/christmas-sharing-page-3u67cr`。
- 設計依據：[設計提案](design-proposal.md) 第二版＋預覽 Artifact Version 3。
- 詳細部署與限制：[deployment.md](deployment.md)；ID 與回退：[2026-11-06-build.json](../../../custom-code/monthly-sharing/2026-11-06-build.json)。

## 與設計稿的差異（Webflow 限制或刻意簡化）

- **講師彈窗：2026-11-06 依使用者要求先關閉**（資訊還不夠）。面板元素保留但隱藏，三個 IX3 互動已刪除，定義備份在 `custom-code/monthly-sharing/2026-11-06-removed-interactions.json`。卡片不再可點、移除「講師介紹 ›」。
- **Hero 倒數天數與當月月曆**：改成不需維護的靜態「每月第三個週三」月曆卡；不做倒數。
- **日期大字**：Webflow 日期格式做不出「11.18」，改用 CMS 欄位「日期大字」手填。
- **Email 訂閱已移除**（2026-11-06 使用者指示）：表單、Hero「Email 通知我」連結已刪；結尾區改為 LINE 優先（加入 LINE 按鈕在前、QR code、訂閱 YouTube），錨點改 `#line`；FAQ 第二題改為「怎麼收到開播提醒？」（LINE＋YouTube 小鈴鐺）。
- **分類篩選**：四張分類卡（資安頁卡片樣式、漸層細線圖示循環動畫），點了只顯示該分類已播出的集數；用 IX3 切換 class 實作，Designer 預覽可直接點。
- **全部集數**：改為 YouTube 播放清單 CTA，不再在頁面上分頁列出所有集數。
- **FAQ**：沿用首頁的 `faq_component`／`solutions-basic-model_accordion`／`faq5_*` 結構，開合由全站 `jubo-faq.js`＋`jubo-motion.css` 處理。圖示用內嵌 SVG（DOM 元素），不是 HtmlEmbed；已有 FAQPage schema；已核准兩題 FAQ 的可見文案與 Webflow JSON-LD 已同步，五題 FAQ 和 SEO 描述均與 Git 正本一致（2026-11-10 獨立讀回驗證）。
- **單集頁網址**：使用者要求改成 `/jubo-33-live-stream/epXX`。Data API 沒有改 collection slug 的動作，改 Template page slug 會被忽略（讀回仍 `/monthly-sharing`），需在 Designer：CMS → 三三分享會集數 → Settings → Collection URL 改為 `jubo-33-live-stream`。

## 網站上原有的三三分享會

每集仍是一篇 news 文章（例：EP19 `/news/monthly-third-wednesday-sharing-202607`），未調整、未轉址。

## 2026-11-10 接手檢查與修正

- 已讀回整頁及單集 Template，套用兩題已核准 FAQ；四個分類的卡片入口改「下載簡報」。
- Hero：送出圓形容器原無子元素，新增原生 SVG 紙飛機；主直播畫面寬度 main 74%→82%、tiny 78%→84%。
- 單集頁：LINE 卡移到左欄講師下方，新增 `sansan-latest_card.is-deck-line`，保留 QR 與 LINE CTA。
- 修正入口連結：原 fallback 放過只有 `/monthly-sharing` 的錯誤 href；現在檢查末段必須吻合該集 slug。
- 修正表單成功畫面提前顯示：移除 `.sansan-deck_success` 的 display:flex，將 flex 版面移到內層 `.sansan-deck_success-content`。
- 表單 helper 清除預設 Example Text placeholder，保留 radio 分組與索取集數處理。
- 驗證：Webflow 寫入與元素／樣式讀回；已發布 staging HTML 的本機模擬，非重新發布後驗收。未實際送出問卷或查驗 Forms 入庫。
- 其餘十項文案已經使用者核准、寫入 Webflow 並逐項讀回；原句及套用版本見 tasks.md。

## 2026-11-10 第十七輪：核准文案套用

- 主頁五處說明、單集問卷四處及 SEO 描述開頭共十項已套用；其他文字、CMS 欄名與必填規則維持。
- Webflow schema 已透過 `bulk_update_pages_schema_markup` 完成同步；`query_pages_schema_markup` 獨立讀回與 Git 正本完全一致，五題可見 FAQ 與 schema 答案逐字相同，WebPage description 與 SEO 描述相同。
- Designer 修改完成，未 Publish，含 staging；線上仍為上次發布版本。

## 2026-11-10 第十八輪：七份 PDF、兩篇 News、正式發布前驗證

- 使用者授權：壓縮與上傳七份 PDF，審查兩篇 News 與專區，全部正常後正式發布；另明確指定 EP23 這次一起提前公開。
- EP05／06／07／08／12／13／14 已上傳、CDN 雜湊回讀及 CMS 開關／連結核對；加上既有 EP18–21，專區共 **11 個「下載簡報」入口**，全數連到對應單集頁。EP05 封面改用使用者 PDF 的原始第一頁，修正舊資產寫入後仍為 null 的問題。
- 兩篇 News（EP22 性騷擾與界線、EP23 安寧療護）已核對日期、時間、主題、講師、圖片與參加方式，未見須重寫的明顯錯誤；補專區連結，EP23 News 發布日依授權提前為 2026-11-10。
- 尚未設計的講師獨立頁：Webflow 明確回覆 Collection template pages can't be drafted，因此改為 noindex＋暫時 meta refresh 返回專區；加入同名原生文字連結作為 fallback。
- 未開放簡報的單集網址：頁尾 helper 導回專區，避免只有 Navbar／Footer。下載問卷頁暫 noindex，專區為索引入口。
- 修正 form 與 script 的重複 id，腳本改用 `sansan-deck-form-helper`。
- 真實 staging 驗證通過：主頁、兩篇 News、七個新下載頁 HTTP 200；11 個入口；四個斷點無橫向溢出；FAQ 開合、四分類只顯示一個 pane、底部提醒條關閉；紙飛機圖示；問卷初始成功區隱藏、無 Example Text、radio 互斥、LINE 卡在左欄。
- Cookie 提示在腳本尚未初始化時點擊不會關閉；等待初始化後「拒絕全部」可關閉，無 JS 錯誤，提醒條亦可關閉，非本輪未解功能缺陷。
- **正式發布尚未執行**：Cloudflare Turnstile 驗證主機在執行環境 CONNECT 403／ERR_TUNNEL_CONNECTION_FAILED，送出鈕維持 disabled；沒有繞過驗證、沒有實際 POST、Forms 無測試入庫紀錄。已請使用者在正常瀏覽器完成一次標示測試的問卷，成功後再正式發布。
- YouTube 亦遭執行環境代理 403；影片網址以既有官方 News／CMS 為來源，未聲稱實播已驗證。EP23 尚無直播網址，News 已明確說明活動前公告。

## 2026-11-10 第十九輪：問卷驗證完成、正式發布

- 使用者回覆「有成功送出並下載」；Forms 讀回 2026-11-10T10:29:24.880Z 的 EP12 紀錄，索取集數與 22 個表單欄位均有入庫。Git 只保存紀錄 ID、時間與欄名，不保存姓名、Email、電話或填答內容。
- 依既有條件式授權發布，task `4e3ef6b6-d85f-4c6f-b47d-9be692311ca5`；www 與 apex 的 lastPublished 均獨立讀回為 2026-11-10T10:30:53.018Z（台北 18:30:53）。
- 正式站主頁、兩篇 News、11 個簡報頁 HTTP 200；11 個下載入口、四尺寸無溢出、FAQ、分類、紙飛機、提醒條、問卷初始成功區隱藏及 LINE 左欄均通過。未開放簡報／講師頁返回專區；apex 正確導向 www。五題 FAQ JSON-LD 與 Git 原稿、SEO 描述一致。
- 本輪無未解發布阻擋。EP23 直播網址已於第二十輪依使用者提供補上；YouTube 實際播放未由雲端環境驗證。通知信收件人等既有營運待辦仍見 tasks.md。
- 證據：`custom-code/monthly-sharing/2026-11-10-production-qa.json`。

## 2026-11-10 第二十輪：補上 12 月直播網址

- 使用者提供 EP23 直播網址 https://www.youtube.com/watch?v=tuOSh2o2qi0，已寫入集數「直播／回放連結」及 12 月 News「參加方式」。
- News 移除「活動前公布」說明，改為活動當天點擊連結免費參加；連結文字「點此觀看 12 月三三分享會直播」。保留歷屆播放清單。
- 已正式發布，www／apex lastPublished＝2026-11-10T10:43:25.548Z。正式站及 staging HTTP 200，連結 href、舊說明移除、歷屆入口與 1440／390 無溢出均驗證；CMS 讀回相符。
- 證據：`custom-code/monthly-sharing/2026-11-10-ep23-link-qa.json`。網址來源為使用者，未宣稱 YouTube 實際播放測試通過。

## 2026-11-10 第二十一輪：Footer 與資源頁入口

- 使用者明確要求在 Footer「資源」新增三三分享會，並指定長照專業成長頁的 CTA 改為「了解更多三三分享會」、連到節目專區。
- 共用 Footer definition `bf559d46-0de7-0e5d-3110-35684e2ba87f`：在「長照專業成長」後新增 `88d97a56-e3b4-4044-a064-a371269ceb55`，文字「三三分享會」、`footer-link`、`data-underline-link`，URL `/resources/jubo-33-live-stream`。前後完整樹比對，扣除此新增子樹後完全一致。
- `/resources/education`（page `6a2e38cda77c1ee08c7f8ba1`）Glass Button instance `2179076d-4294-fc5f-f4b8-650f613dd46d`：只覆寫 CTA Text 與 CTA Links，不改 Glass Button definition、樣式與其他實例。
- 已正式發布 task `9de59f8f-6ad3-447f-8f72-041d614e48ef`，www／apex lastPublished 均 `2026-11-10T11:03:04.349Z`，並發布 staging。驗證見 `custom-code/monthly-sharing/2026-11-10-entrances-qa.json`。

## 2026-11-10 第二十二輪：下載 FAQ 補上網站入口提示

- 使用者指出網站已有簡報入口，要求 FAQ 多提供提示；「簡報可以下載嗎？」改為引導本頁「過去直播」→集數卡片「下載簡報」→填寫並送出課後問卷→下載按鈕，並說明沒有入口的集數目前未開放下載、簡報須經講師同意。
- 只改該題答案與 FAQPage acceptedAnswer，其他四題及 schema graph 節點維持；Git 維護來源 `custom-code/monthly-sharing/page-schema.jsonld`。
- 正式發布 task `7873257a-5964-4e31-b4e8-2d12ea3e0ee3`，www／apex lastPublished 均 `2026-11-10T11:54:28.478Z`，同步 staging。
- 發布後正式站／staging 都已核對新答案、FAQ 展開及完整 JSON-LD 與 Git 一致；1440／390 無橫向溢出、無 JS pageerror。證據 `custom-code/monthly-sharing/2026-11-10-download-faq-qa.json`。首次檢查發生於發布編譯完成前而讀到舊版；等待 lastPublished 更新後重新驗證通過。

## 2026-11-10 第二十三輪：分類圖示動態與 LINE 綠色漸層

- 使用者要求四個分類圖示有接近 After Effects 的細緻節奏，並提供 LINE 卡片黃綠／薄荷綠漸層參考，要求融入品牌色。
- 分類圖示拆為獨立圖層，保留原圖示輪廓：三根長條依序生長、雙心跳＋心電線掃描、勾選描線＋確認回彈、大小星光依序出現並收尾。原生 IX3 `i-1616db2c` 改為 6 秒、37 個 cue，loop 不再整段 yoyo；進入視窗播放，離開暫停，prefers-reduced-motion 時保留完整靜態圖示。
- 新增 7 個裝飾 DOM 節點與 7 個專案範圍樣式（含 LINE combo）；原三根長條／雙小星的遮罩拆層，其餘排版、分類切換、連結與共用元件維持。
- 單集 Template 的 LINE 背景改為 `.gradient-bg.is-sansan-line`。漸層使用 Jubo `#00b2c0` 的透明色與既有 bento-ai 黃色方向；瀏覽器實際讀回 `rgba(0,178,192,0.48)`→`rgba(255,255,128,0.72)`。獨立 combo，未改共用 is-bento-color-1/2、Variable 或按鈕。
- 測試站發布 task `a197817c-38c6-4ef3-bd37-b2353982be1b`；正式發布 task `4f93cd41-e5ae-4752-8f6e-e46fe3cc14ea`。www／apex lastPublished 均 `2026-11-10T12:12:07.592Z`。
- 驗證：真實 staging／production 採樣一個完整循環，10 組圖層樣本均有變化；離屏暫停、減少動態靜態、品牌 teal 色值、主頁與單集頁四斷點無溢出通過，主頁無 JS pageerror。正式站四分類切換仍各顯示一個 pane。證據 `2026-11-10-motion-qa.json`。
