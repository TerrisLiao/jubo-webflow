# Jubo AI：照護知識、資料與應用

狀態：**v4 英文漸層原型已完成驗收並更新 Draft，待視覺與真機審閱**（2026-10-14，Asia/Taipei）。

- 工作分支：`claude/jubo-ai-agentic-redesign`；[Draft PR #24](https://github.com/TerrisLiao/jubo-webflow/pull/24)。
- **現行原型 v4**：`custom-code/poc/jubo-ai-agentic-v4.html`；[架構、參考與驗收](reference/原型v4架構與驗收_2026-10-14.md)。
- **同一 Webflow Draft 預覽**：[Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)。URL 保留 `/jubo-ai-v3-preview`；v4 沿用隔離 iframe，未發布。
- v2、v3 與品牌 SVG 保留未改；[v3 驗收](reference/原型v3驗收_2026-10-14.md)、[v3 原交接](reference/codex-v3-交接.md)、[原 Draft 承載紀錄](reference/Webflow原型預覽草稿_2026-10-14.md)。
- 接手先讀 AGENTS.md → current-state → tasks → decisions。

## 最新採用方向

Terris 已確認本輪架構（對話「ok」，2026-10-14）：

1. Jubo AI 呈現照護領域的技術、知識、資料與流程能力。
2. 全頁文案、互動與可及性標籤使用英文；白底逐步加入品牌漸層，以發光玻璃球體聚焦脈絡。
3. 原版五類資料與五種用途全部保留；領域知識與工作資料分開說明。
4. N.Copilot 為專案型對話應用；Amy、iBee 為既有系統 add-ons，分別以資料整合與流程自動化呈現。
5. 未來用途使用清楚的可能性提問，不當成現有產品或發布承諾。
6. 網站風格沿用 Security 的漸層／玻璃；不將粒子視覺作為主體。

[現況](current-state.md) · [待辦](tasks.md) · [決策](decisions.md) · [歷程](changelog.md) · [部署](deployment.md)
