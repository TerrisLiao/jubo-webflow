# 部署紀錄

| 層次 | 狀態 | 日期／版本 | 證據 |
|---|---|---|---|
| Git／PR | v5 更新同一指定分支與 Draft PR | 2026-10-15 | [Draft PR #24](https://github.com/TerrisLiao/jubo-webflow/pull/24)；v2／v3／v4 保留 |
| 本機瀏覽器 | 四寬度逐幕、互動球體、對話、鍵盤、reduced-motion、sandbox 通過 | 2026-10-15；v5 | [驗收與限制](reference/原型v5置中捲動與互動驗收_2026-10-15.md) |
| Webflow 頁面資料 | 同一隔離 Draft 更新 v5 來源與 title，完整讀回一致 | 2026-10-15；6acf60696126abae97656a6b | [Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)；draft:true／archived:false、唯一 iframe、原六個元素結構一致 |
| Designer 畫布 | MCP session 斷線，無法自動切頁或目視 v5 | 2026-10-15 | 來源讀回不等於畫布目視；Terris 過往只確認 v3 |
| staging | **未發布** | — | 未呼叫 Publish |
| production | **未發布本輪變更** | — | 正式 /ai/jubo-ai 不動；未呼叫 Publish |

頁面 title：Jubo AI — Centered Immersive Preview v5 (Draft)。沿用 /jubo-ai-v3-preview；沒有建立第二頁。

Site／兩 production domains 的 lastPublished 前後均為 **2026-10-14T06:47:55.998Z**。shouldPublish:true 是待發布狀態，不是已發布。

v5 canonical SHA-256：f446c10237008a66ac0cfdfd11af0389513a315b8c574c0666c21d4bda526a46；匯出 src **41,434** 字元與所有 iframe 屬性完整一致。可重跑 `python tools/pack-jubo-ai-preview.py --version 5`。v4 預設匯出行為保持相容。

本機 sandbox fixture 已在 1440／375 實際點擊對話與 review；工具端無法證明 Designer data URL 的畫面，兩種證據分開記錄。v5 待 Terris 目視與真機驗證。

未修改共用 Component／utility／Variables／Slater／站台腳本。Webflow 原生整合待 v5 審閱；未取得明確授權不 Publish（含 staging）。

歷史：[v4 驗收與當時 Draft 狀態](reference/原型v4架構與驗收_2026-10-14.md)、[最初 v3 Draft 承載紀錄](reference/Webflow原型預覽草稿_2026-10-14.md)。
