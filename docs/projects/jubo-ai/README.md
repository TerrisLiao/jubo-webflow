# Jubo AI：照護知識、資料與應用

狀態：**v6 極簡質感原型已完成驗收並更新同一 Draft，待視覺與真機審閱**（2026-10-15，Asia/Taipei）。

- 工作分支：`claude/jubo-ai-agentic-redesign`；[Draft PR #24](https://github.com/TerrisLiao/jubo-webflow/pull/24)。
- **現行原型 v6**：`custom-code/poc/jubo-ai-agentic-v6.html`；[架構、參考與驗收](reference/原型v6極簡質感與驗收_2026-10-15.md)。
- **同一 Webflow Draft 預覽**：[Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)。URL 保留 `/jubo-ai-v3-preview`；沿用隔離 iframe，未發布。
- v2、v3、v4、v5 與品牌 SVG 保留未改；[v4 歷史驗收](reference/原型v4架構與驗收_2026-10-14.md)、[v3 原交接](reference/codex-v3-交接.md)、[原 Draft 承載紀錄](reference/Webflow原型預覽草稿_2026-10-14.md)。
- 接手先讀 AGENTS.md → current-state → tasks → decisions。

## 最新採用方向

Terris 最新要求（2026-10-15）保留置中捲動，進一步接近 OpenAI 的簡潔質感：

1. Jubo AI 呈現照護領域的技術、知識、資料與流程能力。
2. 全頁英文、置中沉浸式揭露，一次一個主題；近黑主標與留白承擔層級，玻璃與漸層集中於球體、對話、示意及 CTA。
3. 原版五類資料與五種用途全部保留；領域知識與工作資料分開說明。
4. N.Copilot 為專案型對話應用；Amy、iBee 為既有系統 add-ons，分別以資料整合與流程自動化呈現。
5. 未來用途使用清楚的可能性提問，不當成現有產品或發布承諾。
6. 球體獨立出現，不放環繞卡片；滑鼠牽引、高光與內部色帶會回應游標。配色與玻璃按鈕對照現行 Jubo CTA。
7. 原型以系統 Helvetica／Arial 研究中性排版，不改全站字型；OpenAI 僅參考實際收錄的靜態頁面層級，官網即時動畫未驗證。
8. 桌機採 sticky 舞台與長段停留；手機、矮視窗、reduced-motion 改自然文件流，內容與操作完整保留。

[現況](current-state.md) · [待辦](tasks.md) · [決策](decisions.md) · [歷程](changelog.md) · [部署](deployment.md)
