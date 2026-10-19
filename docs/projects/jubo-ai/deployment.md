# 部署紀錄

| 層次 | 狀態 | 日期／版本 | 證據 |
|---|---|---|---|
| Git（v9） | 提交並推送至 `claude/confident-ramanujan-fivatw`；未開 PR | 2026-10-19 | 遠端 head 以 push 後讀回為準 |
| 本機瀏覽器（v9） | `tools/verify-jubo-ai-v9.js`：四寬度、8 個 pin 場景、遮蔽鏡、N.Copilot、對話、彈窗、暫停、reduced-motion、DPR、矮視窗、fallback、sandbox fixture | 2026-10-19 | [v9 紀錄](reference/原型v9沉浸式中文敘事與驗收_2026-10-19.md) |
| Webflow 頁面資料（v9） | **未更新**；Draft 仍為 v6 | 2026-10-19 | 待 Terris 確認後替換同一 iframe |
| Git（v8） | 提交並推送至 `claude/confident-ramanujan-fivatw`；未開 PR | 2026-10-19 | 遠端 head 以 push 後讀回為準 |
| 本機瀏覽器（v8） | `tools/verify-jubo-ai-v8.js`：四寬度、4 個 pin 場景、循環、互動、對話、彈窗、暫停、reduced-motion、DPR、矮視窗、fallback、sandbox fixture | 2026-10-19 | [v8 紀錄](reference/原型v8捲動體驗與驗收_2026-10-19.md) |
| Webflow 頁面資料（v8） | **未更新**；Draft 仍為 v6 | 2026-10-19 | 待 Terris 確認後替換同一 iframe |
| Git（v7） | 已提交並推送至 `claude/confident-ramanujan-fivatw`（基底 PR #24 head `e6a6c0e`）；未開 PR | 2026-10-19 | 遠端 head 以 push 後讀回為準 |
| 本機瀏覽器（v7） | `tools/verify-jubo-ai-v7.js` 全部通過：四寬度、13 幕逐幕、對話、鍵盤、reduced-motion、DPR、fallback、sandbox fixture | 2026-10-19；來源 SHA-256 9a1d5665…e8eb | [v7 驗收與限制](reference/原型v7依原規劃精修與驗收_2026-10-19.md) |
| Webflow 頁面資料（v7） | **未更新**；Draft 仍為 v6 | 2026-10-19 | 待 Terris 確認 v7 後替換同一 iframe |
| Git／PR（v6） | v6 更新同一指定分支與 Draft PR | 2026-10-15 | [Draft PR #24](https://github.com/TerrisLiao/jubo-webflow/pull/24)；先前原型保留 |
| 本機瀏覽器（v6） | 四寬度逐幕、互動球體、對話、鍵盤、reduced-motion、sandbox 通過 | 2026-10-15；v6 | [驗收與限制](reference/原型v6極簡質感與驗收_2026-10-15.md) |
| Webflow 頁面資料（v6） | 同一隔離 Draft 更新 v6 來源與 title，完整讀回一致 | 2026-10-15；6acf60696126abae97656a6b | [Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)；draft:true／archived:false、唯一 iframe、原六個元素結構一致 |
| Designer 畫布 | MCP session 仍斷線，無法自動切頁或目視 v6 | 2026-10-15 | 來源讀回不等於畫布目視；Terris 過往只確認 v3 |
| staging | **未發布** | — | 未呼叫 Publish |
| production | **未發布本輪變更** | — | 正式 /ai/jubo-ai 不動；未呼叫 Publish |

頁面 title：Jubo AI — Quiet Intelligence Preview v6 (Draft)。沿用 /jubo-ai-v3-preview；沒有建立第二頁。

Site／兩 production domains 的 lastPublished 前後均為 **2026-10-14T06:47:55.998Z**。shouldPublish:true 是待發布狀態，不是已發布。

v6 canonical SHA-256：cc3e832dea9cc442753c016568a82e7a40dbb31b677abdde6bc23750f207d6e1；匯出 src **45,066** 字元與所有 iframe 屬性完整一致。可重跑 `python tools/pack-jubo-ai-preview.py --version 6`；v4 預設及 v5 匯出保持相容。

本機 sandbox fixture 已在 1440／375 實際點擊對話與 review；工具端無法證明 Designer data URL 的畫面。v6 待 Terris 目視與真機驗證。

未修改共用 Component／utility／Variables／Slater／站台腳本。系統字體僅在隔離原型研究。Webflow 原生整合待 v6 審閱；未取得明確授權不 Publish（含 staging）。

歷史：[v5 Draft 狀態與驗收](reference/原型v5置中捲動與互動驗收_2026-10-15.md)、[最初 v3 Draft 承載紀錄](reference/Webflow原型預覽草稿_2026-10-14.md)。
