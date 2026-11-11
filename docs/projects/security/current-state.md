# 資安與隱私頁現況

文件整理日期：2026-10-13；文件更新日期：2026-11-11（只補 §12-66 ISO/IEC 29191 上線狀態，本輪未讀回 Webflow Designer）。

來源截至 2026-10-13 §12-65：Hero 照片只做 opacity 0→100% 淡入，2.4 秒；頁尾 CTA 只保留標題「想進一步了解智齡的資安策略？」與「與我們聯絡」→ /contact。來源記錄 Draft、未 Publish；實際觀感尚未瀏覽器目視。v1–v12 早期版型保留作歷史，不能直接當現況。

頁面範圍：`/security`。

詳細歷史與數值見 [專案入口](README.md)，發生差異時先即時讀回再更新，不從舊段落復原網站。

## ISO/IEC 29191（§12-66，production 已上線）

來源：`claude/beautiful-lovelace-x8dv2l` @ `b0ac499e0960e643d8a645c701f98baa97506fb7` §12-66（2026-11-09 Designer 修改並讀回，當時記錄「未 Publish」）。內容：

- 認證方框在 ISO 27701 之後新增「ISO 29191」格（`security-trust_tile`，無新 class），共 8 格；Bluetooth 格移除 `is-center` combo（class 本身保留）；`security-trust_tiles` medium 斷點改 2 欄。
- 方框說明段落改為「智齡的資訊安全與個人資料管理制度，通過 ISO 27001 與 ISO 27701 國際驗證；照護系統中個人資料的處理與去識別化流程，也通過 ISO/IEC 29191 驗證。」
- meta description、OG description、JSON-LD description 與 `about` 加入 29191；title 不變。
- 官網不採用內部宣傳圖的「行動裝置生物辨識」「國際最高標準」說法，以證書範圍為準。

驗證（2026-11-11 台北 23:36，curl `https://www.jubo-health.com/security`，Last Published 2026-11-10 14:01:16 UTC）：

- `security-trust_tiles` 內 8 格，ISO 字樣依序 27001、27701、29191、13485；沒有任何格帶 `is-center`。
- 說明段落逐字相符；meta description、OG description、JSON-LD `description` 與 `about`（`ISO/IEC 29191`）皆含 29191；頁面沒有「國際最高標準」「生物辨識」。
- 發布 CSS `jubo-health.webflow.shared.67af3ae3b.min.css`：`max-width:991px` 下 `.security-trust_tiles` 為 `grid-template-columns:1fr 1fr`。
- staging（`jubo-health.webflow.io/security`，Last Published 2026-11-11 13:50:12 UTC）也有「ISO 29191」格。
- 推斷隨 2026-11-10 三三分享會全站發布上線，非本專案 agent 發布。
- 未在瀏覽器目視四斷點與 hover／進場動畫；curl 只證明 HTML／CSS 內容。

不在本頁範圍：**首頁**資安卡片的 ISO/IEC 29191 徽章只在 staging。2026-11-11 curl staging 首頁有 29191，正式站首頁沒有；紀錄在 `claude/wizardly-euler-pkb3in` 的 `docs/projects/home-notes/`，production 待另行授權。
