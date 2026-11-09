# 現況

- 文件更新日期：2026-11-06
- Webflow：**草稿頁已建立**（`/jubo-33-live-stream`，2026-11-06 由 `/monthly-sharing` 改名；Page ID `6aed901905a96260ffcc4595`，`draft: true`，未發布）。Data API 寫入並讀回；Designer App 未連線，未做 Preview 驗收。
- CMS：「三三分享會講師」15 筆、「三三分享會集數」22 筆，2026-11-06 已由草稿改為可發布（Staged，未發布）。集數與講師 Template page 已自動產生、未設計，且 API 無法設為 Draft（見 deployment.md 風險）。
- 2026-11-06 第二輪修改：分類改為四項（新欄位「分類」）、Hero 日期修正裁切、集數卡 EP 標籤移右上、講師彈窗先關閉、刪除「每一集的時間線」區塊、FAQ 改用首頁結構、分頁按鈕改玻璃按鈕＋中文。
- 2026-11-09 第六輪：Hero 改為統一 banner（介紹節目＋直播視窗拼貼＋單一「最新直播資訊」按鈕）；結構改為 關於直播 → 最新消息（高亮卡）→ 過去直播 → 講師 → FAQ → 制式 CTA Section #1；移除全部集數與自訂 LINE 區。
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
- **FAQ**：沿用首頁的 `faq_component`／`solutions-basic-model_accordion`／`faq5_*` 結構，開合由全站 `jubo-faq.js`＋`jubo-motion.css` 處理。圖示用內嵌 SVG（DOM 元素），不是 HtmlEmbed；沒有 FAQPage schema。
- **單集頁網址**：使用者要求改成 `/jubo-33-live-stream/epXX`。Data API 沒有改 collection slug 的動作，改 Template page slug 會被忽略（讀回仍 `/monthly-sharing`），需在 Designer：CMS → 三三分享會集數 → Settings → Collection URL 改為 `jubo-33-live-stream`。

## 網站上原有的三三分享會

每集仍是一篇 news 文章（例：EP19 `/news/monthly-third-wednesday-sharing-202607`），未調整、未轉址。
