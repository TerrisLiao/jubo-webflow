# 現況

- 文件更新日期：2026-11-12
- Webflow 驗證日期與方式：2026-11-12 以 curl 讀取線上 HTML（`www.jubo-health.com`）；**尚未用 Webflow MCP 讀回 Designer**
- 頁面 slug／Page ID：尚未建立；建議 slug `/products/familyline-residential`（待確認）
- 採用版本與範圍：頁面規劃草稿，見 [頁面規格與文案](reference/頁面規格與文案.md)
- 來源分支、提交、文件：`claude/optimistic-meitner-6s2xo4`；來源為使用者上傳的操作手冊 PDF／PPTX 與 Figma `epTBL1gVwoHNpKczaaYV3z`

## 已驗證

- `/products/residential-care` 附加產品區目前有兩個 tab：智慧照護助理 APP（→ `/products/care-assistant-app`）、智慧照護推車（選配，→ `/products/vitaltrolley`）。線上 HTML，2026-11-12。
- 附加產品區用 Slater `initTabSystem()`：依 index 配對 `data-tabs="content-item"` 與 `data-tabs="visual-item"`，數量不限。Slater `https://slater.app/20018/60292.js`，2026-11-12。
- tab 圖為 1120×680 透明 PNG。
- 照護推車、日照安心寶都用 `header-1_component` 當 Hero。
- Figma「7.0 預約探訪」註記暫不開發。

## 未驗證

- 附加產品區是否為與日照頁共用的 Component（需 Designer 讀回）。
- 機構公告推播在住宿型是否開放。
