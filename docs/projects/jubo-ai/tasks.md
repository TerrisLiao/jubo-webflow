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
| P1 | 原型 v2 review（視覺、文案、可及性、手機效能） | **Codex（建議）** | 小問題直接修；大改記 decisions | 待開始 |
| P1 | 收集真實產品截圖（智慧交班、Amy、iBee 等） | Terris | 不用生成假 UI | 待辦 |
| P2 | Webflow 實作（Draft） | 未認領 | Designer 讀回；未授權不 Publish | 待原型確認 |
| P2 | 移除 `/ai/jubo-ai` JSON-LD 假評分、影片加暫停 | 未認領 | 見 Schema、無障礙稽核 | 待辦 |
