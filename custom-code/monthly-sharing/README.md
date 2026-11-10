# 三三分享會頁面（/monthly-sharing）設定與回退資料

這個目錄保存 Webflow 頁面、CMS、IX3 的維護來源、部署程式與回退資料。

- [2026-11-06-build.json](2026-11-06-build.json)：第一版草稿頁、兩個 CMS collection、34 個素材、18 個 IX3 互動的 ID、查詢條件與回退步驟。
- [sansan-deck-form.js](sansan-deck-form.js)：單集 Template 頁尾 script 正本（radio 分組、索取集數帶入）。
- [speaker-card.css](speaker-card.css)：節目專區講師卡片單位兩行截斷（head `<style id="sansan-speaker-card">`）。
- [sansan-deck-links.js](sansan-deck-links.js)：節目專區「下載簡報」連結保底（footer `<script id="sansan-deck-links">`）。
- [專案文件](../../docs/projects/monthly-sharing/README.md)：提案、現況、待辦、部署。

網站修改以 Data API 寫入 Designer，未 Publish；頁面 `draft: true`、CMS 項目全部 `isDraft: true`。執行回退前先即時讀回，只還原本輪範圍。

## 2026-11-10 PDF 批次與測試發布

- `pdf-batch-2026-11-10.json`：使用者上傳七份 PDF 的來源名稱、頁數、壓縮大小、雜湊與公開 CDN 資產。PDF 與 S3 簽名不進 Git。
- `news-ep22.html`、`news-ep23.html`：本輪核對後的 CMS News 內容；只補節目專區連結，原文案保留。
- `episode-template-head.html`：問卷下載頁 noindex。
- `speaker-template-head.html`：講師獨立頁尚未設計，暫時 noindex 並導回專區；完成模板後移除。
- `sansan-deck-form.js`：footer `<script id="sansan-deck-form-helper">`，不能與原生 form 的 `sansan-deck-form` 使用同一個 DOM id。未開放簡報、整個內容被隱藏時導回專區。
- `2026-11-10-staging-qa.json`：真實測試站驗證，含四尺寸、十一個下載入口、兩篇 News、FAQ、分類與返回動線。問卷送出因 Cloudflare 網路受阻，尚待一般瀏覽器人工驗證。

本輪已發布測試站，正式站尚未發布；正式發布授權為「頁面與功能確認沒有問題後發布」，不代表可略過尚未完成的問卷驗證。
