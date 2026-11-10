# 現況

- 文件更新日期：2026-11-10
- Webflow：節目專區 Page ID `6aed901905a96260ffcc4595`，路徑 `/resources/jubo-33-live-stream`，2026-11-10 即時讀回 `draft: false`。測試站主頁及 `/monthly-sharing/ep18`–`ep21` 為 HTTP 200；正式站同路徑仍為 404。最後一次全站測試發布為 2026-11-10T09:12:11.846Z；正式網域最後發布為 2026-11-05。這次修改已寫入 Designer，未發布。
- CMS：「三三分享會講師」15 筆、「三三分享會集數」22 筆，2026-11-06 已由草稿改為可發布（Staged，未發布）。集數與講師 Template page 已自動產生、未設計，且 API 無法設為 Draft（見 deployment.md 風險）。
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
- **FAQ**：沿用首頁的 `faq_component`／`solutions-basic-model_accordion`／`faq5_*` 結構，開合由全站 `jubo-faq.js`＋`jubo-motion.css` 處理。圖示用內嵌 SVG（DOM 元素），不是 HtmlEmbed；已有 FAQPage schema；本輪已核准兩題 FAQ 的可見文案更新，Git JSON-LD 同步完成，Webflow schema 同步仍待完成（工具未提供可用的明確動作參數）。
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
- 其餘文案審核見 tasks.md 的完整清單，未核准的修改尚未套用。
