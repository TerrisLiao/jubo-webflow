# 現況

- 文件更新日期：2026-11-13
- Webflow 驗證日期與方式：2026-11-13 以 Webflow MCP 修改 Hero 並讀回整頁元素樹比對；素材 CDN 另行驗證。未發布；Designer 截圖工具失敗，四斷點目視尚待完成。
- 頁面 slug／Page ID：`/products/familyline-residential`，`6af52afbbf57c45cf03e4154`，Draft（v1，待刪除）；可讀性優化 v2 草稿 `/products/familyline-residential-v2`，`6af55d996d00f5158ae0ac24`，**定案版本**，讀回 draft=false（未發布）；改版 v3 草稿 `/products/familyline-residential-v3`，`6af5c887d15f0b638d81d010`，Draft，已決定刪除（待 Designer 手動刪除）
- 採用版本與範圍：第二版規格（比照官網附加產品頁版型），見 [頁面規格與文案](reference/頁面規格與文案.md)
- Figma 圖檔：現行 `C6MRciANWNRkAw0Vq03Foh`（Jubo Design Team Pro，bg／focal 分層）；舊檔 `gofe4JuGyJbLUTCE2ln7SJ` 停用
- 來源分支、提交、文件：`claude/optimistic-meitner-6s2xo4`；來源為使用者上傳的操作手冊 PDF／PPTX 與 Figma `epTBL1gVwoHNpKczaaYV3z`

## 現行 Hero（2026-11-13）

- H1：第一行「不論身在何處」、第二行「隨時掌握機構近況」（6／8 字，保留原本換行）。
- 副標：「長輩的照護日常，出門在外也能關心。家屬完成綁定後，用手機打開 LINE，生理數值、外診紀錄與生活照片，隨手就能查看。」（58 字，含空格與標點）。
- 三張情境照：左上保留手持手機的護理師；左下為機構內護理工作；右下為家屬探訪互動。後兩張不出現手機。
- 右上 LINE 產品圖保留 `6af52b0ffe8c8a400767648c`。未修改 class、互動、CTA、共用元件或其他頁面。
- 本次工作分支 `codex/familyline-hero-mobile`。詳細素材、前後對照與回退見 [Hero 更新紀錄](reference/Hero文案與情境圖更新_2026-11-13.md)。

## 已驗證

- 產品事實以審稿提示詞為準：住宿型不提供推播通知、AI 或預約探訪；不要沿用日照型功能宣稱。
- `/products/residential-care` 附加產品區目前有兩個 tab：智慧照護助理 APP（→ `/products/care-assistant-app`）、智慧照護推車（選配，→ `/products/vitaltrolley`）。線上 HTML，2026-11-12。
- 附加產品區用 Slater `initTabSystem()`：依 index 配對 `data-tabs="content-item"` 與 `data-tabs="visual-item"`，數量不限。Slater `https://slater.app/20018/60292.js`，2026-11-12。
- tab 圖為 1120×680 透明 PNG。
- 照護推車、日照安心寶都用 `header-1_component` 當 Hero。
- Figma「7.0 預約探訪」註記暫不開發。
- `/products/care-assistant-app` 版型：header-1 Hero → 3 張 `single-product-ui_wrapper` UI 卡 → 3 個 `product-scroll-card` 主題 → CTA。線上 HTML，2026-11-12。
- 設計團隊檔 `FySgxMe39o7rjTsfkxMk7c` 未修改：曾在 02 頁暫放區塊 `14251:8717`，同日已刪除並讀回確認不存在。

## 未驗證

- 四斷點視覺（見部署紀錄「未驗證」）。

## 2026-11-12 Designer 讀回

- 附加產品區兩頁都是頁面元素，不是共用 Component。
- Footer 是共用 Component（41 個 instance），只改了一個文字節點。
