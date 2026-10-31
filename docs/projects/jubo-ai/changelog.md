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


## 2026-10-19｜v7 依原規劃精修

- Terris 認為現行 Draft（v6）很不好看，要求依 git 脈絡回到原先規劃。讀回 v1–v6 decisions、交接、驗收與 PR #24，整理出 v6 偏離的已確認規劃（漸進顯色、glowing orb、磨砂／長虹玻璃、官網字體）。
- 在平台指定分支 `claude/confident-ramanujan-fivatw` 以 PR #24 head `e6a6c0e` 快轉為基底，新增 `custom-code/poc/jubo-ai-agentic-v7.html`；v2–v6 未改。
- 視覺：Poppins／18px 內文；一條 Jubo 青 → 藍 → 紫漸層強調詞；單一 shader 同時繪製隨章節增強的光場、Understanding 章長虹折射與互動球體。
- 結構：7 章；Foundation／Capabilities／Applications 為 sticky 章，固定章標題與分頁，內容離散切換並各有玻璃示意動畫；Statement 與 Possibilities 逐字顯現；整頁約 18 個視窗高（v6 約 26）。
- 新增 `tools/verify-jubo-ai-v7.js`；`tools/pack-jubo-ai-preview.py` 支援 `--version 7`。完整驗收全部通過，詳見 [v7 紀錄](reference/原型v7依原規劃精修與驗收_2026-10-19.md)。
- Webflow Draft 未更新（仍為 v6）、未 Publish；未改共用資產、Slater 或站台腳本。分支登記於 branch-inventory。


## 2026-10-19｜v8 捲動驅動 AI 體驗

- Terris 看完 v7 後提供新參考：長虹玻璃後的流動漸層＋磨砂玻璃圓、玻璃輸入列、Verba 對話卡、Living Systems 玻璃面板、打字游標與黑底 chip 的動態卡；要求主視覺循環且可互動，整頁為捲動觸發的 AI 體驗、少資訊、高科技感。
- 新增 `custom-code/poc/jubo-ai-agentic-v8.html`：7 場景（Key visual、Every record、Understanding、Capabilities、Applications、What if、Close）；桌機 4 個 GSAP pin，手機／矮視窗／reduced-motion 不 pin。
- 主視覺 shader：長虹玻璃稜線取樣流動光、磨砂玻璃圓、游標牽引光團與稜線高光、點擊漣漪、顆粒；單 canvas／draw call。
- 製作中修正：玻璃圓尺寸只在 scroll 事件更新，GSAP scrub 收斂期間不跟隨 → 改為每幀追蹤；預覽 iframe sandbox 未允許 forms，輸入列與對話送出鈕的 form submit 會被擋 → 改為一般按鈕（v6 Draft 與 v7 的對話送出鈕有相同潛在問題，示例 chips 不受影響）。
- 新增 `tools/verify-jubo-ai-v8.js`；pack 工具支援 `--version 8`。結果見 [v8 紀錄](reference/原型v8捲動體驗與驗收_2026-10-19.md) 與 deployment。Draft 未更新、未 Publish。


## 2026-10-19｜v9 沉浸式中文敘事

- Terris 看完 v8：取消圓形、只用長虹玻璃帶出模糊漸層；改回繁體中文；Amy／iBee 不放框；整頁沉浸式 motion graphics；故事線與 N.Copilot 登場方式（見 decisions）。
- 讀取現行 `/ai/jubo-ai` 取得原始五類資料、五種能力、Jubo AI Suite 與 N-Copilot 說明；從 `/security` 查核紀錄取用八項資安作為。
- 新增 `custom-code/poc/jubo-ai-agentic-v9.html`：11 場景、8 個 pin；全螢幕思考光 shader（無圓形、依場景調整稜線／飽和／色相／中央柔光）；遮蔽鏡互動；資料文字流；能力大字清單；Amy／iBee 開放式構圖；N.Copilot 巨大標題後彈出對話框。
- 製作中調整：初版漸層過飽和導致小字難讀 → 加入中央柔光、加深漸層字與次要文字色。
- 新增 `tools/verify-jubo-ai-v9.js`；pack 工具支援 `--version 9`。結果見 [v9 紀錄](reference/原型v9沉浸式中文敘事與驗收_2026-10-19.md)。Draft 未更新、未 Publish。


## 2026-10-19｜v11 長虹玻璃鰭片主視覺與技術圖

- Terris：v10 技術圖很醜；問為何資安頁動畫做得到、這頁做不到；長虹玻璃思考光要當主視覺，但不能是一整塊 panel。
- 新增 `custom-code/poc/jubo-ai-agentic-v11.html`：
  - Shader 改為五片直立長虹玻璃鰭片，加上無邊界柔光與邊緣淡出；手機上鰭片隨寬度縮窄。
  - 媒體範圍取消邊框、圓角與陰影，Hero 改為全出血。
  - 技術圖改為依像素計算的曲線、`offset-path` 光點、Lucide 漸層圖示，中央加 CSS 長虹玻璃。
  - 能力清單加入漸層圖示。
  - 手機結尾標題字級調整。
- 新增 `tools/verify-jubo-ai-v11.js`；pack 工具支援 `--version 11`。結果見 [v11 紀錄](reference/原型v11長虹玻璃思考光與技術圖_2026-10-19.md)。Draft 未更新、未 Publish。

## 2026-10-19｜v10 依 Mobbin 重整視覺

- Terris：v9 紫色太多、很醜，先用 Mobbin 了解現行 AI 公司設計。
- 以 Mobbin `search_sections` 實際檢視 AI 首頁、AI agent 介紹、醫療 AI、資安段、Claude 網站與柔焦媒體面板等參考，整理四項共同做法（見 v10 紀錄 §2）。
- 新增 `custom-code/poc/jubo-ai-agentic-v10.html`：暖米白底、Jubo 青強調、700 字重、黑色按鈕；shader 改為只在可見媒體面板的圓角矩形內繪製長虹玻璃思考光（青／天空／薄荷／沙色）；N.Copilot 面板隨對話框彈出才亮起。
- 新增 `tools/verify-jubo-ai-v10.js`；pack 工具支援 `--version 10`。Draft 未更新、未 Publish。

## 2026-10-19 — 原生動態頁覆蓋 Draft `/ai/jubo-ai-v2`

- 依 Terris 授權移除 Draft 上的 Codex v6 原生根元素與其 Three.js footer，插入 Navbar、原生根元素（11 場景，WHTML）、Glass Button（`/contact`、預約諮詢）與 Footer；既有隱藏 legacy-archive 保留未動。
- 寫入 page head（字體、前綴、狀態、keyframes、scrub 版面、fallback）與 footer（jsDelivr 固定 commit＋SRI）；新增 3 個本頁 IX3；更新頁面 title 與 SEO，draft:true。
- 來源 `custom-code/jubo-ai-film/`：`build.py` 產生 WHTML、head、footer（`--cdn`）、IX3 與本機 preview；新增 `tools/verify-jubo-ai-film.js`。
- 驗收抓到無 WebGL 時 `fallback()` 暫時性死區錯誤會中斷整支動態；修正於 `4831e19`，footer 改指向該 commit，jsDelivr 內容與 SRI 讀回一致。
- 未 Publish；`/jubo-ai-v3-preview`、正式 `/ai/jubo-ai` 未動；未改共用 Component 定義、utility、Variables、Slater、站台腳本。[紀錄](reference/原生動態頁_IX3與GSAP_2026-10-19.md)

## 2026-10-28 — 主視覺改為光之花瓣

- WebGL 長虹折射改為花瓣 shader（共同根部、彎曲、不對稱、暖色根部、柔和邊緣光）；背景光降低。
- 首屏錨點收攏為直立花束，思考列移到根部並改為 Bloom 式輸入列；767 以下保持較寬花束。
- 對話框與資料卡改為白卡＋粉彩光暈，提示按鈕改為淺灰 pill，資安遮蔽條改為柔光帶，fallback 改為 CSS 花瓣，提示文案改為花瓣。
- Webflow Draft：head、footer（`c9d9086`＋SRI）、class 樣式、提示文字已更新並讀回；未 Publish。驗收腳本全部通過。

## 2026-10-28 — 主視覺改為長虹玻璃 S 形光帶

- 依 Terris 新參考，WebGL 改為細密凹槽後的 S 形粉藍青光帶（階梯折射、呼吸、方向緩慢翻轉、游標牽引、點擊波動），取代同日稍早的花瓣；玻璃範圍取可見錨點的外框並限制在視窗內。
- 首屏錨點改為較寬分布；fallback 改為 CSS 條紋＋漸層；提示文案改回「玻璃後的光」。
- 修正：WebGL1 沒有 `tanh`，改用自寫函式（否則 shader 會靜默退回 fallback）。
- Webflow Draft：head、footer（`07e85d8`＋SRI）、`hero-fin` 的 main 樣式、提示文字已更新並讀回；未 Publish。驗收腳本全部通過。

## 2026-10-31 — 帶入產品影片情境

- 研究 Plaud NotePin S 產品頁 4 支影片與 What Ships 9 支影片（逐格截圖），整理可帶入與不帶入的手法。
- Amy：示意個案人物開場（手寫箭頭註記年齡）、報告逐段堆疊；pin 改為 320%。
- N.Copilot：寬螢幕在回答旁展開來源卡片並連線，重點附來源編號。
- 點擊光帶：點陣同心圓漣漪；內容密集的場景降低光帶強度（`data-glass-level` 可覆寫）。
- Webflow Draft：head、footer（`10cf693`＋SRI）已更新並讀回；元素、class 樣式、IX3 未變；未 Publish。驗收腳本全部通過。

