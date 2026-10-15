# 變更歷程

## 2026-10-14

- 建立專案資料夾與分支 `claude/jubo-ai-agentic-redesign`；開始研究（SharePoint、Mobbin、repo 既有研究）。
- 完成 SharePoint／Teams 研究（26 個來源，機密內容不轉錄）、repo 既有規範盤點、Mobbin 參考 10 項；提出「照護資料，正在思考」設計方向，列 7 題待裁決。
- Terris 裁決：2,800+、改版在 `/ai/jubo-ai-v2`、Amy／iBee 在 `/ai/` 下。Webflow `list_pages` 讀回確認 `/ai/` 資料夾四頁。
- Terris 同意其餘預設。完成文案初稿 v1（含 7 項待確認）與原型規格，原型交由 Codex 接手。
- 原型 v1 `custom-code/poc/jubo-ai-agentic.html`：思考列打字＋狀態機驅動 Three.js 資料點陣（1,200 點、1 draw call）、資料地圖連線、5 張 AI 卡、Amy／iBee 時間軸、三層、資安、FAQ（含 FAQPage JSON-LD）。資料地圖新增「品質監測紀錄」chip 以對應品監 AI 卡。
- Terris 要求改為更酷、更互動、全部置中、大量捲動動畫。依 Mobbin（Intercom、SpaceXAI／Grok、Squarespace、OpenAI）重做原型 v2，文字全部重寫；v1 保留。修正 pin 後章節觸發位置錯誤、手機版面擠壓與星座超出畫面。
- Terris 同意 v2 動畫方向；要求改用 N.Copilot logo、做沉浸式動態敘事、精緻化對話框（參考 lattice.hr），並交給 Codex。Claude 撰寫 `reference/codex-v3-交接.md`（需求、故事線、設計方法、踩坑、驗收）與 `tools/poc-scroll-shots.js` 驗證腳本。

## 2026-10-14 — Codex 完成 N.Copilot 原型 v3

- 接續 `claude/jubo-ai-agentic-redesign`，讀回來源 head `6de0033`；以 v2 複製製作 v3，未改 v2。
- 導覽 AI 項目、Hero、七節點、對話、產出卡、彈卡、交還與收尾使用原稿 N.Copilot；開場保留光點／光條／Aurora 節奏，原翼以裁切展開，取樣成粒子後散成球。
- 實際查看 Terris 修正的 lattice.com 首頁，播放原動畫並逐格確認指令框展開、左右對話與分段回答；新增 `reference/lattice-觀察.md`。
- 新增 Hero JS 狀態機、chip 飛入輸入欄與送出回饋；四情境改為固定高度對話串、可展開工具列、產出卡逐行展開與人員確認。修正自動情境搶走 Hero 選擇及快速切換時的舊執行結果。
- 手機七節點交錯排列；modal 支援 Esc、焦點圈限與回到原按鈕；reduced-motion 停用循環繪製與 pin，保留可讀內容與互動。
- 執行交接 §8 捲動截圖／拼圖與互動驗證；工具支援本機 HTTP／系統 Chromium，新增可重跑的互動檢查。細節與限制見 `reference/原型v3驗收_2026-10-14.md`。
- 同步更新 README、current-state、tasks、decisions、deployment。Webflow 未操作，staging／production 未發布。

## 2026-10-14 — 後續授權新建 Webflow 原型 Draft

- 新增「N.Copilot｜Jubo AI v3 原型預覽（Draft）」；Page ID `6acf60696126abae97656a6b`、slug `/jubo-ai-v3-preview`。
- 保留既有 Global Style instance，插入單一隔離 iframe，完整來源屬性讀回一致；Designer 已切到新頁。
- 新增可重跑的匯出工具與草稿承載紀錄。Designer snapshot 無法驗證隔離 iframe 畫面、managed Chromium 封鎖 data URL，已列為目視驗證限制並請 Terris 確認。
- 本次無 Publish；site／production `lastPublished` 未變。正式頁、v2 原型與共用資產未改。

### Designer 預覽確認

Terris 回覆「有看到 v3」，確認新 Draft 的首屏與對話框可見。已同步 current-state、tasks、deployment 與預覽紀錄；工具端 iframe 快照限制仍保留，不冒稱完成全部 Webflow 互動或真機效能驗證。未發布。

## 2026-10-14｜v4 英文漸層敘事

- Terris 先確認架構，再授權製作（「ok」）。
- 新增 v4，保留 v2／v3／品牌 SVG；Jubo AI 技術與資料能力、N.Copilot 對話、Amy／iBee 系統 add-ons 分開呈現。
- 白底漸進光場、平滑發光球體、長虹玻璃；五類資料與五種用途完整英文呈現，能力卡各自有限次動畫。
- 四寬度、資料映射、三種對話、三個鍵盤彈窗、快速取消、暫停、reduced-motion、DPR／resize／fallback 與隔離 fixture 通過。
- 同一 Draft iframe 更新 v4 來源及英文 title；38,442 字元 src 完整一致，元素結構及發布時間不變。
- [完整架構與驗收](reference/原型v4架構與驗收_2026-10-14.md)。


## 2026-10-15｜v5 置中捲動與互動球體

- Terris 未採用 v4 制式介紹版型，要求回到 v3 置中、慢速揭露的氛圍，保留 v4 玻璃／漸層材質。
- 新增 v5：連續 sticky 舞台逐幕顯示五類資料、五種能力、三個應用與三個構想；桌機長段停留，手機／矮視窗／reduced-motion 自然文件流。
- 球體獨立呈現；零粒子、沒有環繞卡片。滑鼠回應牽引、高光與內部色帶，觸控有短脈動。實際讀取現行 CTA 的色系與七層 Glass Button 結構並用於隔離原型。
- 四寬度、完整互動、pointer／touch、reduced-motion、DPR／fallback 通過；修正模式切換的 inert 狀態，並讓停止捲動後的位置收斂、中段保持穩定。
- sandbox 1440／375 實際點擊對話／review 通過。同一 Draft 的 41,434 字元 src 與屬性完整一致，原六個元素結構及 Site／domain 發布時間未變。Designer MCP 斷線，無法自動切頁或目視 v5，未推定使用者已看見。
- 保留 v2／v3／v4、N.Copilot 原稿幾何；不動共用資產、不 Publish。同步六份現行文件及同一 Draft PR #24。
- [架構、驗收、限制與重跑方式](reference/原型v5置中捲動與互動驗收_2026-10-15.md)。


## 2026-10-15｜v6 留白與局部材質

- Terris 要求接近 OpenAI 的質感。官網即時請求為 403（1010），改看 Mobbin 實際截圖的層級與媒體焦點，未宣稱播放其動畫或引入其素材。
- 新增 v6，保留置中慢速敘事與所有資料／能力／應用；改用近黑主標、系統中性字體、細線資料列，移除全頁漸層與長虹裝飾。玻璃集中於對話、示意與原 CTA，球體改青色球面明暗／反射／高光與落影。
- 四寬度逐幕、滑鼠／觸控、對話與鍵盤、暫停、reduced-motion、DPR／resize／fallback 全套通過；sandbox 1440／375 實際點擊通過。原稿 SVG、唯一 ID、英文屬性及舊版匯出相容已驗證。
- 同一隔離 Draft 更新 v6；45,066 字元 src 與全部屬性一致，原六個元素結構及 Site／domain 發布時間不變。Designer MCP 斷線，畫布目視及真機效能仍待確認。
- v2／v3／v4／v5 HTML 與品牌 SVG 保留；未改共用資產、正式字體或站台腳本，未 Publish。六份現行文件與既有 Draft PR #24 同步。
- [參考、調整、驗收與限制](reference/原型v6極簡質感與驗收_2026-10-15.md)。
