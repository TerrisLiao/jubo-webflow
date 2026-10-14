# 待辦

協作：Claude 與 Codex 共用本表。接手前讀 [AGENTS.md](../../../AGENTS.md)、[研究彙整](reference/研究彙整_2026-10-14.md)、[設計方向提案](reference/設計方向提案_2026-10-14.md)。認領時把「負責」改成自己並 commit；完成填證據。一次只認領一項，避免兩個 agent 改同一檔。

| 優先級 | 工作 | 負責 | 驗收條件 | 狀態／證據 |
|---|---|---|---|---|
| P0 | SharePoint／Teams AI 策略、AI 功能、Amy／iBee 研究 | Claude | 事實附出處；分可公開／需核准 | 完成：`reference/研究彙整_2026-10-14.md` |
| P0 | Mobbin 參考 | Claude | 每項附連結與用途 | 完成（收藏連結待 Terris 提供） |
| P0 | 設計方向與 Section Flow | Claude | 七項定義＋段落表 | 完成；7 題已裁決（2026-10-14，見 decisions） |
| P1 | 文案初稿（繁中，jubo-write 語氣） | Claude | 只用可公開宣稱；數字附口徑與日期 | v1 完成：`reference/文案初稿_2026-10-14.md`；**待 Terris 審閱＋7 項待確認** |
| P1 | 本機原型 `custom-code/poc/jubo-ai-agentic.html` | Claude | 依 `reference/原型規格_2026-10-14.md` 驗收 | v1 完成 2026-10-14：Playwright 1440／991／767／375 無水平捲動、無 console error；reduced-motion 顯示靜態全文。**未做**：真機 FPS、4× CPU throttle、Lighthouse a11y（待 Terris／Codex） |
| P1 | 原型 v2 `custom-code/poc/jubo-ai-agentic-v2.html` | Claude | 置中、捲動驅動、互動 | 完成 2026-10-14：Playwright 1440／375 捲動逐格截圖、無 JS 錯誤、無水平捲動、7 熱點可點、示範 4 情境可跑。**未做**：真機效能、Lighthouse |
| P0 | **原型 v3：N.Copilot 沉浸式動態敘事**（精緻化 Hero live mode 與對話框、參考 lattice.com（Terris 修正）） | **Codex** | 依 `reference/codex-v3-交接.md` §8 驗收清單 | 完成 2026-10-14：`custom-code/poc/jubo-ai-agentic-v3.html`；[§8 驗收證據](reference/原型v3驗收_2026-10-14.md)、[Lattice 實際觀察](reference/lattice-觀察.md)。1440／991／375 無 JS 錯誤、無水平捲動；四情境與七節點鍵盤驗證、reduced-motion 已檢查。v2 未改；待 Terris 審閱及真機效能 |
| P1 | 決定 Teal Air `#20EDF1` 等品牌 Webflow Variables 與 Gibson／官網字體策略 | Terris | 寫入 decisions | 待決定：原型暫用 CSS token 與 Poppins＋系統中文字；尚未新增 Variable 或載入 Gibson |
| P1 | 確認 v5 示意區標示、視覺與真機效能 | Terris | 審閱 v5，真機測 FPS／互動；掉幀再調預算 | 待辦；本機軟體 WebGL 驗收不能取代真機效能 |
| P1 | 收集真實產品截圖（智慧交班、Amy、iBee 等） | Terris | 不用生成假 UI | 待辦 |
| P1 | 新建 Webflow 隔離原型 Draft 供 Terris 預覽 | Codex | 新頁 Draft、來源讀回、未發布 | 已建立 `/jubo-ai-v3-preview`；[紀錄](reference/Webflow原型預覽草稿_2026-10-14.md)。完整來源一致；Terris 已回覆「有看到 v3」，Designer 首屏與對話框目視確認完成 |
| P0 | **v4：英文漸層光場與資料 → 能力 → 應用** | Codex | 四斷點、五類資料、五種能力、三種對話、三個鍵盤彈窗、reduced-motion、隔離 Draft 來源讀回 | 歷史版本已驗收；Terris 未採用制式版型，保留材質改做 v5；[紀錄](reference/原型v4架構與驗收_2026-10-14.md) |
| P0 | **v5：置中捲動揭露與滑鼠互動球體** | Codex | 四寬度、逐幕慢速揭露、無環繞卡片、pointer／touch、CTA、完整互動與隔離 Draft | 完成；四寬度逐幕／互動、pointer／touch、resize、reduced-motion、sandbox 通過；同一 Draft 41,434 字元來源完整一致，發布時間未變；[紀錄](reference/原型v5置中捲動與互動驗收_2026-10-15.md)。Designer v5 目視與真機仍待確認 |
| P2 | Webflow 原生元素實作（Draft） | 未認領 | Designer 讀回；未授權不 Publish | 待 v5 原型確認 |
| P2 | 移除 `/ai/jubo-ai` JSON-LD 假評分、影片加暫停 | 未認領 | 見 Schema、無障礙稽核 | 待辦 |
