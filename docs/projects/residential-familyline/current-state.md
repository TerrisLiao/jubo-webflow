# 現況

- 文件更新日期：2026-11-12
- Webflow 驗證日期與方式：2026-11-12 以 Webflow MCP 修改並逐項讀回 Designer；線上 HTML 尚未變更（未發布）
- 頁面 slug／Page ID：**定案頁** `/products/familyline-residential`，`6af55d996d00f5158ae0ac24`（原 v2），draft=false，未發布；已加 JSON-LD（BreadcrumbList＋SoftwareApplication＋FAQPage，不寫價格）。v1、v3 已由 Terris 在 Designer 刪除（2026-11-13，list_pages 確認，總頁數 66）；`fl3-*` class 已清除，只剩 combo `header-1_component.is-fl3`（無引用，MCP 刪除回報 not found，可在 Designer Style Manager 手動清）。
- 價格對外說法：頁面不提免費或收費，一律請機構聯絡我們（Terris 2026-11-13 指示）。
- 採用版本與範圍：第二版規格（比照官網附加產品頁版型），見 [頁面規格與文案](reference/頁面規格與文案.md)
- Figma 圖檔：現行 `C6MRciANWNRkAw0Vq03Foh`（Jubo Design Team Pro，bg／focal 分層）；舊檔 `gofe4JuGyJbLUTCE2ln7SJ` 停用
- 來源分支、提交、文件：`claude/optimistic-meitner-6s2xo4`；來源為使用者上傳的操作手冊 PDF／PPTX 與 Figma `epTBL1gVwoHNpKczaaYV3z`

## 已驗證

- `/products/residential-care` 附加產品區目前有兩個 tab：智慧照護助理 APP（→ `/products/care-assistant-app`）、智慧照護推車（選配，→ `/products/vitaltrolley`）。線上 HTML，2026-11-12。
- 附加產品區用 Slater `initTabSystem()`：依 index 配對 `data-tabs="content-item"` 與 `data-tabs="visual-item"`，數量不限。Slater `https://slater.app/20018/60292.js`，2026-11-12。
- tab 圖為 1120×680 透明 PNG。
- 照護推車、日照安心寶都用 `header-1_component` 當 Hero。
- Figma「7.0 預約探訪」註記暫不開發。
- `/products/care-assistant-app` 版型：header-1 Hero → 3 張 `single-product-ui_wrapper` UI 卡 → 3 個 `product-scroll-card` 主題 → CTA。線上 HTML，2026-11-12。
- 設計團隊檔 `FySgxMe39o7rjTsfkxMk7c` 未修改：曾在 02 頁暫放區塊 `14251:8717`，同日已刪除並讀回確認不存在。

## 未驗證

- 四斷點視覺（見部署紀錄「未驗證」）。
- 機構公告推播在住宿型是否開放。

## 2026-11-12 Designer 讀回

- 附加產品區兩頁都是頁面元素，不是共用 Component。
- Footer 是共用 Component（41 個 instance），只改了一個文字節點。
