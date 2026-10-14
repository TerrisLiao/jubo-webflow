# 變更歷程

## 2026-10-14

- 建立專案資料夾與分支 `claude/jubo-ai-agentic-redesign`；開始研究（SharePoint、Mobbin、repo 既有研究）。
- 完成 SharePoint／Teams 研究（26 個來源，機密內容不轉錄）、repo 既有規範盤點、Mobbin 參考 10 項；提出「照護資料，正在思考」設計方向，列 7 題待裁決。
- Terris 裁決：2,800+、改版在 `/ai/jubo-ai-v2`、Amy／iBee 在 `/ai/` 下。Webflow `list_pages` 讀回確認 `/ai/` 資料夾四頁。
- Terris 同意其餘預設。完成文案初稿 v1（含 7 項待確認）與原型規格，原型交由 Codex 接手。
- 原型 v1 `custom-code/poc/jubo-ai-agentic.html`：思考列打字＋狀態機驅動 Three.js 資料點陣（1,200 點、1 draw call）、資料地圖連線、5 張 AI 卡、Amy／iBee 時間軸、三層、資安、FAQ（含 FAQPage JSON-LD）。資料地圖新增「品質監測紀錄」chip 以對應品監 AI 卡。
- Terris 要求改為更酷、更互動、全部置中、大量捲動動畫。依 Mobbin（Intercom、SpaceXAI／Grok、Squarespace、OpenAI）重做原型 v2，文字全部重寫；v1 保留。修正 pin 後章節觸發位置錯誤、手機版面擠壓與星座超出畫面。
- Terris 同意 v2 動畫方向；要求改用 N.Copilot logo、做沉浸式動態敘事、精緻化對話框（參考 lattice.hr），並交給 Codex。Claude 撰寫 `reference/codex-v3-交接.md`（需求、故事線、設計方法、踩坑、驗收）與 `tools/poc-scroll-shots.js` 驗證腳本。
