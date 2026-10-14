# 現況

- 文件更新：2026-10-15（Asia/Taipei）。
- **現行原型 v5**：`custom-code/poc/jubo-ai-agentic-v5.html`。[架構與驗收](reference/原型v5置中捲動與互動驗收_2026-10-15.md)。
- 最新授權：Terris 要求全面重調 v4，回到 v3 置中、沉浸式、scroll 慢慢揭露的節奏，保留 v4 玻璃／漸層材質；獨立球體需與滑鼠互動，不能有環繞卡片。沿用已授權的同一隔離 Draft；不發布。
- 敘事：Hero → Opening → 五類 Foundation → Understanding → 五種 Capabilities → 三個 Applications → 三個 Possibilities → People／CTA。一次一幕置中；原生 scroll＋sticky 舞台與長段停留，沒有捲動攔截。手機、矮視窗、reduced-motion 為自然文件流。
- 球體：單一 Three.js r155 ShaderMaterial plane、單 canvas／draw call、零粒子；只在 Hero／Understanding 獨立出現，沒有球旁卡片。游標牽引、球面高光與內部色帶回應；觸控短脈動。DPR 桌機 ≤2、手機 ≤1.5；暫停、隱藏分頁、靜態與 CSS fallback 保留。
- 材質：保留 v4 玻璃、柔亮光場；實際讀取現行 Jubo CTA 的青／紫品牌 gradient 與 Glass Button 七層結構／公開樣式，套用在隔離原型；未修改共用 Component、utility、Variables 或 Slater。
- 全頁英文。五類資料：Care records／Vital signs／Handover notes／Home visit records／Family updates；五種能力：Find／Summarize／Notice changes／Draft／Discover insights，皆逐幕完整呈現。
- 應用定位：N.Copilot 為 project-based conversational application；Amy、iBee 為 system add-ons，分別中央單獨展示。原 SVG 保留；未將 add-ons 塞入 Copilot 對話。三種對話、來源展開與 review 都是示意。
- 未來用途：三個「What if」提問與鍵盤可開啟的構想，明示 future possibility；沒有新產品名稱、日期或上線承諾。
- 本機四寬度逐幕、滑鼠／觸控、對話／取消、鍵盤彈窗、暫停、reduced-motion、DPR／fallback 已通過；額外修正桌機→手機→桌機的 inert 狀態，以及停止捲動後文字的微小位移。隔離 fixture 與 Draft 來源讀回見驗收文件。
- Webflow：同一 Draft `6acf60696126abae97656a6b`、URL `/jubo-ai-v3-preview`。[Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)。title 為 Jubo AI — Centered Immersive Preview v5 (Draft)；draft:true／archived:false。41,434 字元 src 與全部 iframe 屬性完整一致，原六個元素與結構未改。Site／兩 domain 的 lastPublished 維持 2026-10-14T06:47:55.998Z。Designer MCP session 已斷線，無法切換畫布或目視 v5；資料讀回已完成。未 Publish。
- v2／v3／v4 HTML 與 N.Copilot SVG 未改。正式 `/ai/jubo-ai` 與原生 `/ai/jubo-ai-v2` 未整合本輪原型。
- 待確認：Terris 的 v5 視覺審閱、真機效能、真實產品截圖及正式原生整合。工具端仍無法直接證明 Designer data URL 畫面；Terris 先前「有看到 v3」不推定已看到 v5。Poppins 沿用既有原型策略，Gibson／新增品牌 Variable 尚待決定。
