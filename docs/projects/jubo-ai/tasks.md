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
| P1 | 確認 v11 視覺、故事與真機效能 | Terris | 審閱 v11，真機測 FPS／捲動流暢度 | 待辦；v10 技術圖與面板式主視覺不採用，已改為 v11 |
| P1 | 確認 v9 待核准文案三項 | Terris／資安窗口 | 照護資料歸屬與資安防護說法、約 33 萬截至月份、iBee「第一個上線的 AI Agent」 | 待辦；見 v9 紀錄 §3 |
| P1 | 以 v11 替換 `/jubo-ai-v3-preview` 隔離 iframe | 未認領 | Terris 確認後執行；完整讀回、未 Publish | 待 Terris 指示；`python tools/pack-jubo-ai-preview.py --version 11` |
| P0 | **v11：長虹玻璃鰭片主視覺、資安頁式技術圖與漸層圖示** | Claude | v10 全部檢查＋無邊框全出血媒體、9 圖示、4 曲線、技術圖畫線 | 完成 2026-10-19；`tools/verify-jubo-ai-v11.js`；[紀錄](reference/原型v11長虹玻璃思考光與技術圖_2026-10-19.md) |
| P0 | **v10：依 Mobbin 重整視覺（暖米白、Jubo 青、媒體面板內思考光）** | Claude | v9 全部檢查＋無紫色、紙色底、面板光追蹤、N.Copilot 面板隨對話亮起 | 完成 2026-10-19；`tools/verify-jubo-ai-v10.js`；[紀錄](reference/原型v10暖白底與Mobbin參考_2026-10-19.md) |
| P1 | 收集真實產品截圖（智慧交班、Amy、iBee 等） | Terris | 不用生成假 UI | 待辦 |
| P1 | 新建 Webflow 隔離原型 Draft 供 Terris 預覽 | Codex | 新頁 Draft、來源讀回、未發布 | 已建立 `/jubo-ai-v3-preview`；[紀錄](reference/Webflow原型預覽草稿_2026-10-14.md)。完整來源一致；Terris 已回覆「有看到 v3」，Designer 首屏與對話框目視確認完成 |
| P0 | **v4：英文漸層光場與資料 → 能力 → 應用** | Codex | 四斷點、五類資料、五種能力、三種對話、三個鍵盤彈窗、reduced-motion、隔離 Draft 來源讀回 | 歷史版本已驗收；Terris 未採用制式版型，保留材質改做 v5；[紀錄](reference/原型v4架構與驗收_2026-10-14.md) |
| P0 | **v5：置中捲動揭露與滑鼠互動球體** | Codex | 四寬度、逐幕慢速揭露、無環繞卡片、pointer／touch、CTA、完整互動與隔離 Draft | 完成；四寬度逐幕／互動、pointer／touch、resize、reduced-motion、sandbox 通過；同一 Draft 41,434 字元來源完整一致，發布時間未變；[紀錄](reference/原型v5置中捲動與互動驗收_2026-10-15.md)。歷史證據保留；質感由 v6 接續調整 |
| P0 | **v6：OpenAI 參考下的留白、字體與局部玻璃質感** | Codex | 四寬度、原有資訊／互動完整、球體與鍵盤驗證、同一 Draft 讀回 | 完成；四寬度、pointer／touch、鍵盤／對話、reduced-motion、resize／fallback、sandbox 通過；同一 Draft 45,066 字元來源與屬性完整一致，發布時間未變；[紀錄](reference/原型v6極簡質感與驗收_2026-10-15.md)。待 Terris 目視／真機 |
| P0 | **v7：依原規劃精修（漸進顯色、glowing orb、玻璃／長虹、官網字級、7 章離散切換）** | Claude | 四寬度逐幕、資料／能力／應用完整、對話與彈窗、reduced-motion、DPR／fallback、匯出 fixture | 完成 2026-10-19；`tools/verify-jubo-ai-v7.js` 全部通過；[紀錄](reference/原型v7依原規劃精修與驗收_2026-10-19.md)。待 Terris 目視 |
| P0 | **v8：捲動驅動 AI 體驗（長虹玻璃主視覺、循環＋互動、7 場景）** | Claude | 四寬度、pin 場景逐段、循環、互動、對話、彈窗、暫停、reduced-motion、DPR、fallback、fixture | 完成 2026-10-19；`tools/verify-jubo-ai-v8.js`；[紀錄](reference/原型v8捲動體驗與驗收_2026-10-19.md)。待 Terris 目視 |
| P0 | **v9：沉浸式中文敘事（長虹玻璃思考光、無圓形、11 場景）** | Claude | 四寬度、8 個 pin 場景、遮蔽鏡、N.Copilot 彈出對話、暫停、reduced-motion、DPR、fallback、fixture | 完成 2026-10-19；`tools/verify-jubo-ai-v9.js`；[紀錄](reference/原型v9沉浸式中文敘事與驗收_2026-10-19.md)。待 Terris 目視 |
| P2 | Webflow 原生元素實作（Draft） | 未認領 | Designer 讀回；未授權不 Publish；依 GSAP 規範 §13 先評估 IX3 | 待 v9 原型確認 |
| P2 | 移除 `/ai/jubo-ai` JSON-LD 假評分、影片加暫停 | 未認領 | 見 Schema、無障礙稽核 | 待辦 |
