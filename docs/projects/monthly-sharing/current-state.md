# 現況

- 文件更新日期：2026-11-05
- Webflow 驗證日期與方式：未讀回 Designer。正式站以 HTTP 讀取 `/`、`/community`、`/news/monthly-third-wednesday-sharing-202607`、2025 Q1–Q3 活動頁（2026-11-05），只作視覺語彙與內容來源。
- 頁面 slug／Page ID：尚未建立。提案 `/monthly-sharing`（Hub）與 `/monthly-sharing/<ep>`（CMS Template）。
- 採用版本與範圍：無；[設計提案](design-proposal.md) 待確認。
- 來源分支、提交：`claude/christmas-sharing-page-3u67cr`。
- 已驗證：預覽頁在本機 Chromium 1440px 與 390px 無水平溢出、無 console 錯誤（2026-11-05）。集數、講師、日期取自公開來源，見 [集數資料](reference/集數資料.md)。
- 未驗證：Webflow 日期篩選行為、表單／HubSpot 串接、預覽中「聊天室留言」文案、EP22 直播日（推定）。

## 目前網站上的三三分享會

- 每集是一篇 news 文章，分類「活動講座」（例：EP19 `/news/monthly-third-wednesday-sharing-202607`），直播連結指向 `jubo-health.tw/monthly-sharing-*` 短網址。
- EP19 頁沒有簡報索取表單，講師資訊只有一行。
- 沒有節目總頁；`/community` 的 YouTube 卡寫「三三分享會／每月直播」，連到頻道。
