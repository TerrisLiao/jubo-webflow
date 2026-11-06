# 現況

- 文件更新日期：2026-11-06
- Webflow：**草稿頁已建立**（`/monthly-sharing`，Page ID `6aed901905a96260ffcc4595`，`draft: true`，未發布）。Data API 寫入並讀回；Designer App 未連線，未做 Preview 驗收。
- CMS：「三三分享會講師」15 筆、「三三分享會集數」22 筆，全部草稿。集數 Template page 已自動產生但未設計。
- 來源分支：`claude/christmas-sharing-page-3u67cr`。
- 設計依據：[設計提案](design-proposal.md) 第二版＋預覽 Artifact Version 3。
- 詳細部署與限制：[deployment.md](deployment.md)；ID 與回退：[2026-11-06-build.json](../../../custom-code/monthly-sharing/2026-11-06-build.json)。

## 與設計稿的差異（Webflow 限制或刻意簡化）

- **講師彈窗**：站上未開啟 Webflow Modal／Popover 功能，改用 IX3 點擊互動開關每張卡片旁的隱藏面板（`filterContext` 相對於被點的元素）。沒有焦點鎖定與 Esc 關閉；點背景或 × 關閉。
- **講師彈窗外部連結**（Facebook／網站／其他課程）已綁欄位但**先隱藏**：API 無法設定「欄位有值才顯示」的條件可見性，需在 Designer 對三個連結各設 Conditional Visibility（欄位 is set）後再打開。
- **彈窗未列「在三三分享會的課程」**：需反向參照或巢狀清單，維護成本高，先不做。
- **主題系列篩選**：系列卡片連到集數庫，集數卡片上有系列標籤；不做互動篩選（需 Finsweet 或額外程式）。
- **Hero 倒數天數與當月月曆**：改成不需維護的靜態「每月第三個週三」月曆卡；不做倒數。
- **日期大字**：Webflow 日期格式做不出「11.18」，改用 CMS 欄位「日期大字」手填。
- **Email 表單**：Webflow 原生表單收件，尚未串接寄信工具；placeholder 為保留屬性無法用 API 設定。

## 網站上原有的三三分享會

每集仍是一篇 news 文章（例：EP19 `/news/monthly-third-wednesday-sharing-202607`），未調整、未轉址。
