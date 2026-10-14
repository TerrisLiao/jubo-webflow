# 現況

- 文件更新：2026-10-14（Asia/Taipei）。
- **現行原型 v4**：`custom-code/poc/jubo-ai-agentic-v4.html`，已完成製作、本機四寬度驗收及隔離 Draft 來源更新。[架構與驗收](reference/原型v4架構與驗收_2026-10-14.md)。
- 最新授權：Terris 要求先討論全英文／gradient／glowing orb／資料與用途／add-on 的架構，之後回覆「ok」同意製作。沿用先前已授權的獨立 Draft 預覽；不發布。
- 敘事：Knowledge + Data + Workflows → Jubo AI → Capabilities → Applications。七段依序為 Hero、Foundation、Context、Capabilities、Applications、Possibilities、People。
- 視覺：Security 既有淺色青藍紫／薄荷紫／淡黃青綠光場、平滑玻璃球體、長虹玻璃、每張能力卡的有限次動畫。單一 Three.js r155 ShaderMaterial plane，無 Points／粒子；DPR 桌機 ≤2、手機 ≤1.5；頁籤隱藏停止 render。
- 全頁英文。五類資料：Care records／Vital signs／Handover notes／Home visit records／Family updates。五種用途：Find／Summarize／Notice changes／Draft／Discover insights。
- 應用定位：N.Copilot 為 project-based conversational application；Amy、iBee 為 system add-ons。N.Copilot 使用原 SVG；Amy 為全人脈絡整合；iBee 為跨平台比對／匯入，未寫成資料庫訓練的產物。
- 未來用途：三個「What if」提問與可展開構想，明示 future possibility；沒有虛構新產品名稱、日期或承諾。
- 原版／Security／Opacity／Berd 已實際瀏覽與捲動觀察；來源和具體採用點見 v4 驗收文件。
- Webflow：既有隔離 Draft `6acf60696126abae97656a6b`，URL `/jubo-ai-v3-preview`。[Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)。title 已更新為 Jubo AI — English Gradient Preview v4 (Draft)；draft:true、archived:false。38,442 字元完整 src 一致、原元素結構不變。Site／兩 domain 的 lastPublished 維持 2026-10-14T06:47:55.998Z。前版 v3 已由 Terris 目視確認；這項確認不推定 v4 已目視。
- v2、v3、N.Copilot SVG 保留未改。現行正式 `/ai/jubo-ai` 不動；原生頁 `/ai/jubo-ai-v2` 未整合本輪原型。
- 待確認：Terris 的 v4 視覺審閱、真機效能、真實產品截圖、正式 Webflow 原生整合；Poppins 為既有原型策略，未載入 Gibson 或新增站上 Variables。
