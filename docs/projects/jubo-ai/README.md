# Jubo AI：照護知識、資料與應用

狀態：**v7 依原規劃精修原型已完成本機驗收，待 Terris 審閱；Webflow Draft 仍為 v6**（2026-10-19，Asia/Taipei）。

- 工作分支：v1–v6 在 `claude/jubo-ai-agentic-redesign`（[Draft PR #24](https://github.com/TerrisLiao/jubo-webflow/pull/24)）；v7 在平台指定分支 `claude/confident-ramanujan-fivatw`，以 PR #24 head `e6a6c0e` 為基底接續，未改寫原分支。
- **現行原型 v7**：`custom-code/poc/jubo-ai-agentic-v7.html`；[原規劃對照、章節與驗收](reference/原型v7依原規劃精修與驗收_2026-10-19.md)。
- **Webflow Draft 預覽**：[Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)，`/jubo-ai-v3-preview` 仍載入 **v6**；v7 待 Terris 確認後再替換同一隔離 iframe，未發布。
- v6 紀錄：[架構、參考與驗收](reference/原型v6極簡質感與驗收_2026-10-15.md)。v2–v6 與品牌 SVG 保留未改；[v4 歷史驗收](reference/原型v4架構與驗收_2026-10-14.md)、[v3 原交接](reference/codex-v3-交接.md)、[原 Draft 承載紀錄](reference/Webflow原型預覽草稿_2026-10-14.md)。
- 接手先讀 AGENTS.md → current-state → tasks → decisions。

## 最新方向（v7，2026-10-19）

Terris 認為 v6 Draft 很不好看，要求依原先規劃精修。v7 保留下列已確認規劃，並恢復 v6 拿掉的「白底漸進顯色、glowing orb、磨砂／長虹玻璃」與官網 Poppins 字級；章節由 16 個單行畫面收斂為 7 章、每幕都有完整示意，轉場改為離散切換。

## 歷史方向（v6，2026-10-15）

Terris 要求（2026-10-15）保留置中捲動，進一步接近 OpenAI 的簡潔質感：

1. Jubo AI 呈現照護領域的技術、知識、資料與流程能力。
2. 全頁英文、置中沉浸式揭露，一次一個主題；近黑主標與留白承擔層級，玻璃與漸層集中於球體、對話、示意及 CTA。
3. 原版五類資料與五種用途全部保留；領域知識與工作資料分開說明。
4. N.Copilot 為專案型對話應用；Amy、iBee 為既有系統 add-ons，分別以資料整合與流程自動化呈現。
5. 未來用途使用清楚的可能性提問，不當成現有產品或發布承諾。
6. 球體獨立出現，不放環繞卡片；滑鼠牽引、高光與內部色帶會回應游標。配色與玻璃按鈕對照現行 Jubo CTA。
7. 原型以系統 Helvetica／Arial 研究中性排版，不改全站字型；OpenAI 僅參考實際收錄的靜態頁面層級，官網即時動畫未驗證。
8. 桌機採 sticky 舞台與長段停留；手機、矮視窗、reduced-motion 改自然文件流，內容與操作完整保留。

[現況](current-state.md) · [待辦](tasks.md) · [決策](decisions.md) · [歷程](changelog.md) · [部署](deployment.md)
