# 現況

- 文件更新日期：2026-10-14（Asia/Taipei）
- v3 製作階段：本機原型與 repo 文件，當時未動 Webflow。
- 後續授權：Terris 要求新開 Draft 預覽，已新增 `/jubo-ai-v3-preview`（Page ID `6acf60696126abae97656a6b`，**Draft**），放入隔離原型 iframe，未發布。
- 新草稿：[Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)；[承載方式與驗證限制](reference/Webflow原型預覽草稿_2026-10-14.md)。完整來源已讀回一致；Terris 已回覆「有看到 v3」，確認 Designer 首屏與對話框可見。這是使用者目視證據，不等於工具端完成全部互動或真機效能驗證。
- 前次正式頁 Webflow 驗證：2026-10-14 Claude 以 MCP `list_pages` 唯讀讀回；本輪未重新驗證線上元素樹，不能將本機驗收視為 Designer 驗收。
- 改版目標：`/ai/jubo-ai-v2`（Page ID `6a8e58aec01bc6cda7004324`，前次讀回為 Draft）；現行 `/ai/jubo-ai`（`6a0d6565a5b081c97a4822d0`）不動。
- 前次 `/ai/` 資料夾（parent `6a029bcb22a894d8fb8f219f`）讀回：`jubo-ai` 已發布、`jubo-ai-v2` Draft、`amy` 已發布（`6a7d2bb3988626e4f0d4c693`）、`ibee` Draft（`6ab07c0ec3085ed21f37ebe2`）。`/amy-banner` Draft 在根目錄。
- 現行審閱版本：`custom-code/poc/jubo-ai-agentic-v3.html`。從指定分支 head `6de00335809156a090d77635845ba353eb932955` 的 v2 複製；**v2 未改**。v1 只供歷史比較。
- 已採用方向：亮底、置中、資料 → AI 產品、沉浸式章節變形；全頁 AI 識別使用 N.Copilot 原稿兩片翼，中央星芒仍為負空間。Hero、七節點、對話頭像、產出卡、交還與收尾均使用既有 SVG。
- 已實作：光點 → 光條 → 兩翼裁切展開 → Aurora → 取樣粒子散成球；Hero 四狀態、chip 飛入／送出；四情境對話串、可展開工具列、逐行產出、確認狀態；手機七節點交錯排列、modal 焦點管理；reduced-motion 無循環動畫。
- 已驗證與證據：[v3 驗收](reference/原型v3驗收_2026-10-14.md)。1440／991／375 捲動截圖均無 JS 錯誤、scrollWidth 等於視窗寬；互動與 reduced-motion 結果見該表。
- Lattice：Terris 將網址修正為 [lattice.com](https://lattice.com/)，已實際播放並逐格查看官方首頁 AI Agent 動畫；[觀察紀錄](reference/lattice-觀察.md)。lattice.hr 本身遭代理 403，未聲稱看過。
- 已裁決：機構數 2,800+、改版頁 `/ai/jubo-ai-v2`、Amy／iBee 維持 `/ai/`、v2 動態方向與 v3 N.Copilot 識別。
- 待 Terris：品牌變數（Teal Air 等）、Gibson／官網字體策略、示意區標示是否足夠、v3 視覺與真機效能。v2 的七處黃底待確認均保留；不宣稱客戶資料不用於訓練，不把 iBee 寫成由照護資料庫生成。
