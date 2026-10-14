# 部署紀錄

| 層次 | 狀態 | 日期／版本 | 證據 |
|---|---|---|---|
| Git／PR | v4 更新同一指定分支與 Draft PR | 2026-10-14 | [Draft PR #24](https://github.com/TerrisLiao/jubo-webflow/pull/24)；v3 原提交保留 |
| 本機瀏覽器 | 四寬度、互動、減少動態、sandbox 通過 | 2026-10-14；v4 | [驗收與限制](reference/原型v4架構與驗收_2026-10-14.md) |
| Webflow Designer | 同一隔離 Draft 更新英文 v4 來源與 title | 2026-10-14；6acf60696126abae97656a6b | [Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)；draft:true／archived:false、唯一 iframe、完整 src 與結構一致 |
| staging | **未發布** | — | 未呼叫 Publish |
| production | **未發布本輪變更** | — | 正式 /ai/jubo-ai 不動；未呼叫 Publish |

Site／兩 production domains 的 lastPublished 前後均為 2026-10-14T06:47:55.998Z。shouldPublish:true 是待發布狀態，不是已發布。

v4 canonical SHA-256：f6c3824f82559a45c33916e829a7143714c325c08226858d6c0d045a0f5cfef7；匯出 src 38,442 字元完整一致。

工具端無法證明 Designer data URL 的實際畫面；本機 fixture 與來源讀回分開記錄。Terris 先前確認的是 v3；v4 待目視與真機驗證。

未修改共用 Component／utility／Variables／Slater／站台腳本。Webflow 原生整合待 v4 審閱；未取得明確授權不 Publish（含 staging）。
