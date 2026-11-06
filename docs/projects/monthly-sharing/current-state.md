# 現況

- 文件更新日期：2026-11-06
- Webflow：**草稿頁已建立**（`/jubo-33-live-stream`，2026-11-06 由 `/monthly-sharing` 改名；Page ID `6aed901905a96260ffcc4595`，`draft: true`，未發布）。Data API 寫入並讀回；Designer App 未連線，未做 Preview 驗收。
- CMS：「三三分享會講師」15 筆、「三三分享會集數」22 筆，2026-11-06 已由草稿改為可發布（Staged，未發布）。集數與講師 Template page 已自動產生、未設計，且 API 無法設為 Draft（見 deployment.md 風險）。
- 2026-11-06 第二輪修改：分類改為四項（新欄位「分類」）、Hero 日期修正裁切、集數卡 EP 標籤移右上、講師彈窗先關閉、刪除「每一集的時間線」區塊、FAQ 改用首頁結構、分頁按鈕改玻璃按鈕＋中文。
- 來源分支：`claude/christmas-sharing-page-3u67cr`。
- 設計依據：[設計提案](design-proposal.md) 第二版＋預覽 Artifact Version 3。
- 詳細部署與限制：[deployment.md](deployment.md)；ID 與回退：[2026-11-06-build.json](../../../custom-code/monthly-sharing/2026-11-06-build.json)。

## 與設計稿的差異（Webflow 限制或刻意簡化）

- **講師彈窗：2026-11-06 依使用者要求先關閉**（資訊還不夠）。面板元素保留但隱藏，三個 IX3 互動已刪除，定義備份在 `custom-code/monthly-sharing/2026-11-06-removed-interactions.json`。卡片不再可點、移除「講師介紹 ›」。
- **分類篩選**：系列卡片連到集數庫，集數卡片上有系列標籤；不做互動篩選（需 Finsweet 或額外程式）。
- **Hero 倒數天數與當月月曆**：改成不需維護的靜態「每月第三個週三」月曆卡；不做倒數。
- **日期大字**：Webflow 日期格式做不出「11.18」，改用 CMS 欄位「日期大字」手填。
- **Email 表單**：Webflow 原生表單收件，尚未串接寄信工具；placeholder 為保留屬性無法用 API 設定。送出的資料存在 Webflow 的表單紀錄（Site settings → Forms → Form submissions，可匯出 CSV），通知信寄到站台設定的收件信箱；不會自動進任何名單、也不會自動寄信。
- **分頁按鈕**：Glass Button 依規範只能用 Component，而 Component 本身是 `<a>`，不能放進原生 Pagination 的 `<a>`。做法：原生 Pagination 加 `sansan-episodes_pagination-native`（display:none），下方放兩個 Glass Button，由頁面 footer 的 `sansan-pager` 腳本把原生分頁網址搬過去（正本 `custom-code/monthly-sharing/sansan-pager.js`）。
- **FAQ**：沿用首頁的 `faq_component`／`solutions-basic-model_accordion`／`faq5_*` 結構，開合由全站 `jubo-faq.js`＋`jubo-motion.css` 處理。圖示用內嵌 SVG（DOM 元素），不是 HtmlEmbed；沒有 FAQPage schema。
- **單集頁網址**：Hub 改名後，集數 Template page 仍是 `/monthly-sharing/ep22`（collection slug 無法用 API 改）。要一致需在 Designer 改 collection slug，或保留現狀。

## 網站上原有的三三分享會

每集仍是一篇 news 文章（例：EP19 `/news/monthly-third-wednesday-sharing-202607`），未調整、未轉址。
