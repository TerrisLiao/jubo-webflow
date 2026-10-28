# 現況

- 文件更新：2026-10-28（Asia/Taipei）。
- 主視覺：長虹玻璃已改為**光之花瓣**（WebGL 從共同根部長到各 `[data-fin]` 錨點；首屏直立花束、思考列在根部；白卡內粉彩光暈）。色調為青、天空、薄荷、蜜桃，無紫色、無圓球。[紀錄](reference/原生動態頁_IX3與GSAP_2026-10-19.md#8-2026-10-28主視覺由長虹玻璃改為光之花瓣)
- Webflow Draft `/ai/jubo-ai-v2`：head、footer（jsDelivr `c9d9086`＋SRI）、18 項 class 樣式更新、首屏提示文字皆已讀回；元素結構與 IX3 未變。**未 Publish**。
- 驗收：`tools/verify-jubo-ai-film.js` 全部通過；Designer 預覽與真機尚未驗證。

## 原生動態頁（2026-10-19）

- 文件更新：2026-10-19（Asia/Taipei）。
- **現行版本：原生動態頁**，來源 `custom-code/jubo-ai-film/`。[紀錄](reference/原生動態頁_IX3與GSAP_2026-10-19.md)。故事、文案、配色同 v9–v11。
- Webflow：Draft `/ai/jubo-ai-v2`（`6a8e58aec01bc6cda7004324`）已依授權覆蓋：Navbar → 原生根元素（11 場景）→ 既有隱藏 legacy-archive → Footer；page head／footer code、3 個 IX3（`i-aaaf8f07`、`i-36b86400`、`i-266dec8e`）。footer 以 jsDelivr 固定 commit `4831e19`＋SRI 載入 `motion.js`。原 Codex v6 原生根元素與其 Three.js footer 已取代。**未 Publish**；`/jubo-ai-v3-preview` 與正式 `/ai/jubo-ai` 未動。
- 驗收：`tools/verify-jubo-ai-film.js` 桌機 scrub（10 pin）、短螢幕／手機 flow、減少動態、無 WebGL 皆通過；IX3 以本機模擬器執行、WebGL 為軟體繪製，Designer 預覽與真機尚未驗證。
- 待確認：Terris 在 Designer 預覽目視；v9 紀錄 §3 三項待核准文案；jsDelivr 長期承載與否；真機效能。

## v11 摘要（同日稍早）

- 文件更新：2026-10-19（Asia/Taipei）。
- **現行原型 v11**：`custom-code/poc/jubo-ai-agentic-v11.html`。[紀錄](reference/原型v11長虹玻璃思考光與技術圖_2026-10-19.md)。配色同 v10，故事、文案、互動同 v9。
- 主視覺：五片直立長虹玻璃鰭片（寬高、上下位置不同）浮在無邊界柔光上，無邊框、無圓角、無面板；技術圖為細曲線＋流動光點＋Lucide 漸層圖示；能力清單有漸層圖示。
- 配色（v10 起）：暖米白 `#F6F5F1` 底、近黑 700 字重、Jubo 青為唯一強調色；思考光只在 Hero、N.Copilot、結尾三處出現，色彩為青／天空／薄荷／沙色（v11 起不再有圓角面板）。無紫色、無漸層字。
- Webflow：（當時）Draft 仍為 v6，未更新、未 Publish。
- 待確認：Terris 對 v11 的目視審閱；v9 紀錄 §3 三項待核准文案；是否以 v11 替換 Draft；真機效能。

## v9 摘要（同日稍早）

- 文件更新：2026-10-19（Asia/Taipei）。
- **現行原型 v9**：`custom-code/poc/jubo-ai-agentic-v9.html`（分支 `claude/confident-ramanujan-fivatw`）。[故事線、文案來源、互動與驗收](reference/原型v9沉浸式中文敘事與驗收_2026-10-19.md)。
- 視覺：全螢幕長虹玻璃後的模糊漸層＝思考；沒有圓形；游標牽引光團、點擊漣漪、捲動越快光流越快；粗大中文標題（Noto Sans TC 900）。
- 故事：11 個場景、8 個桌機 pin；Amy／iBee 無外框；N.Copilot 先出現巨大標題再彈出對話框（三個情境按鈕）。
- 文案：繁體中文，改寫自現行 `/ai/jubo-ai` 與已查核的 `/security` 說法。待確認：「照護資料屬於每一家機構…受同一套資安防護」（資安窗口）、「約 33 萬」截至月份、「iBee 為 Jubo 第一個上線的 AI Agent」可否對外。
- Webflow：Draft 仍為 v6，未更新、未 Publish。
- 待確認：Terris 對 v9 的目視審閱；是否以 v9 替換 Draft；真機效能；正式原生做法與中文字體。

## v8 摘要（同日稍早）

- 文件更新：2026-10-19（Asia/Taipei）。
- **現行原型 v8**：`custom-code/poc/jubo-ai-agentic-v8.html`（分支 `claude/confident-ramanujan-fivatw`）。[場景、參考與驗收](reference/原型v8捲動體驗與驗收_2026-10-19.md)。
- 最新要求：主視覺＝長虹玻璃後流動的藍／紫／青綠光＋磨砂玻璃圓＋玻璃輸入列，循環且可互動；整頁為捲動觸發的 AI 體驗展示，少資訊、高科技感。參考圖另含 Verba 對話卡、Living Systems 玻璃面板、打字游標／黑底 chip／顆粒漸層球／曲線標籤的動態卡。
- 場景：Key visual → Every record（捲動逐字＋chips 選取）→ Understanding（chips 匯入玻璃圓）→ Capabilities（6 張循環動態卡）→ Applications（N.Copilot／Amy／iBee 示範）→ What if（捲動逐字）→ Close。桌機 4 個 GSAP pin；手機、矮視窗、reduced-motion 不 pin。
- 技術：單 Three.js canvas／draw call（長虹玻璃、玻璃圓、漣漪、顆粒）；GSAP 3.13＋ScrollTrigger 僅載入於隔離原型。DPR 桌機 ≤1.5、手機 ≤1.25。
- Webflow：Draft 仍為 v6，本輪未更新、未 Publish。
- 待確認：Terris 對 v8 的目視審閱；是否以 v8 替換 Draft；真機效能；正式原生做法（IX3 或站上 GSAP）。

## v7 摘要（同日稍早）

- 文件更新：2026-10-19（Asia/Taipei）。
- **現行原型 v7**：`custom-code/poc/jubo-ai-agentic-v7.html`（分支 `claude/confident-ramanujan-fivatw`，基底為 PR #24 head `e6a6c0e`）。[原規劃對照、章節與驗收](reference/原型v7依原規劃精修與驗收_2026-10-19.md)。
- 最新要求：Terris 認為 v6 Draft 很不好看，要求依 git 脈絡回到原先規劃精修。v7 恢復 v4 已確認的白底漸進顯色、glowing orb、磨砂／長虹玻璃，保留 v5 的置中逐幕揭露、獨立互動球體與 Jubo CTA，保留 v4 的資料 → 能力 → 應用架構與全英文。
- 視覺：官網 Poppins、內文 18px、標題 400 字重；一行漸層強調詞（Jubo 青 → 藍 → 紫，同 CTA 箭頭漸層）。光場隨章節增強，Understanding 章到達高峰並出現長虹折射，結尾淡回白底。
- 敘事：Hero → Statement → Foundation（5 類資料）→ Understanding → Capabilities（5 種能力）→ Applications（N.Copilot／Amy／iBee）→ Possibilities（3 個 What if）→ People／CTA。整頁約 18 個視窗高（v6 約 26）。桌機三個 sticky 章各有固定章標題與分頁，內容離散切換；手機、矮視窗、reduced-motion 自然文件流。
- 示意：每類資料一張玻璃紀錄示意、每種能力一個玻璃視窗動畫；全部標示 Illustration／no real data。N.Copilot 第一次抵達自動播放一段示意對話。
- 技術：單 Three.js r155 canvas／ShaderMaterial／draw call 同時繪製光場、長虹與球體；DPR 桌機 ≤2／手機 ≤1.5；Pause、分頁隱藏停止、reduced-motion、CSS fallback。
- 驗收：`tools/verify-jubo-ai-v7.js` 全部通過，詳見 deployment 與 v7 驗收文件。軟體 WebGL，未做真機 FPS／Lighthouse。
- Webflow：`/jubo-ai-v3-preview` Draft 仍為 **v6**，本輪未更新、未 Publish。正式 `/ai/jubo-ai` 與 `/ai/jubo-ai-v2` 未動。
- 待確認：Terris 對 v7 的目視審閱；是否以 v7 替換 Draft iframe；真機效能、真實產品截圖、正式原生整合。Gibson／品牌 Variable 策略仍待決定。

## v6 歷史摘要（2026-10-15）

- 文件更新：2026-10-15（Asia/Taipei）。
- **現行原型 v6**：`custom-code/poc/jubo-ai-agentic-v6.html`。[OpenAI 參考、質感調整與驗收](reference/原型v6極簡質感與驗收_2026-10-15.md)。
- 最新授權：Terris 認為 v5 質感不足，要求接近 OpenAI。保留置中、慢速捲動揭露與獨立互動球體，改以中性排版、留白、局部材質建立層級；同一隔離 Draft，不發布。
- 視覺：近黑主標、系統 Helvetica／Arial 400 字重、細線資料列；移除漸層標題、全頁紫青光場與長虹紋。玻璃集中於對話、功能示意及原 CTA；Jubo 青色集中於球體與少數重點。字體僅為隔離原型研究，不改正式站字體或共用樣式。
- 敘事：Hero → Opening → 五類 Foundation → Understanding → 五種 Capabilities → 三個 Applications → 三個 Possibilities → People／CTA。桌機 sticky 舞台逐幕停留；手機、矮視窗、reduced-motion 自然文件流。沒有捲動攔截或環繞球體的卡片。
- 球體：單一 Three.js r155 shader plane／canvas／draw call，零粒子與後製；青色球面明暗、局部反射、高光與落影。滑鼠牽引／法線旋轉與觸控脈動、暫停、隱藏分頁停止、CSS fallback 保留。DPR 桌機 ≤2／手機 ≤1.5。
- 全頁英文；五類資料 Care records／Vital signs／Handover notes／Home visit records／Family updates，以及 Find／Summarize／Notice changes／Draft／Discover insights 完整保留。N.Copilot 為 project-based conversational application；Amy／iBee 為 system add-ons，沒有放進 Copilot 對話。三個 What if 明示可能性。
- 品牌：原 N.Copilot SVG path、現行 CTA 的實際七層玻璃結構保留。v2／v3／v4／v5 HTML 未改；未改全站 Component、Variables、utility、Slater 或站台腳本。
- 參考：OpenAI 首頁／ChatGPT／Codex 即時站皆回傳 403（1010）；已實際看 Mobbin 收錄的 OpenAI 頁面截圖，採層級與單一主視覺原則，未下載或套用其素材、字型、文案、程式碼，也未宣稱觀察到即時動畫。
- 驗收：1440／991／767／375 全部逐幕與互動通過；pointer／touch、對話／取消、鍵盤彈窗、暫停、reduced-motion、DPR／resize／fallback 通過。sandbox fixture 的 1440／375 實際點擊對話／review 通過，無 JS error。原 SVG 幾何、英文屬性、唯一 ID、v4／v5 匯出相容性已檢查。
- Webflow：同一 Draft `6acf60696126abae97656a6b`、slug `/jubo-ai-v3-preview`；title 為 Jubo AI — Quiet Intelligence Preview v6 (Draft)，draft:true／archived:false。[Designer](https://jubo-health.design.webflow.com/?pageId=6acf60696126abae97656a6b)。45,066 字元 src 與全部 iframe 屬性完整一致，原六個元素結構未變。Site／兩 production domain 的 lastPublished 均維持 2026-10-14T06:47:55.998Z，未 Publish。
- Designer MCP 仍斷線，無法自動切頁或目視 v6；資料讀回與本機 fixture 分開記錄。Terris 過往確認 v3 不推定已看見 v6。正式 `/ai/jubo-ai` 與原生 `/ai/jubo-ai-v2` 未整合本輪原型。
- 待確認：Terris 的 v6 視覺審閱、真機效能、真實產品截圖及正式原生整合。Gibson／品牌 Variable 策略仍待決定；未做真機 FPS、完整 Lighthouse 或 4× CPU 效能驗收。
