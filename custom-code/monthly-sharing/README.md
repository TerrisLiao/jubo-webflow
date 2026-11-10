# 三三分享會頁面（/monthly-sharing）設定與回退資料

這個目錄保存 Webflow 頁面、CMS、IX3 的 ID 與回退方式，不是頁面要載入的程式碼。

- [2026-11-06-build.json](2026-11-06-build.json)：第一版草稿頁、兩個 CMS collection、34 個素材、18 個 IX3 互動的 ID、查詢條件與回退步驟。
- [sansan-deck-form.js](sansan-deck-form.js)：單集 Template 頁尾 script 正本（radio 分組、索取集數帶入）。
- [專案文件](../../docs/projects/monthly-sharing/README.md)：提案、現況、待辦、部署。

網站修改以 Data API 寫入 Designer，未 Publish；頁面 `draft: true`、CMS 項目全部 `isDraft: true`。執行回退前先即時讀回，只還原本輪範圍。
