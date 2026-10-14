# Codex 交接：Jubo AI 頁原型 v3（N.Copilot 沉浸式動態敘事）

撰寫：Claude，2026-10-14。交接對象：Codex。決策者：Terris。
分支：繼續用 `claude/jubo-ai-agentic-redesign`（同一個 PR 範圍）。開工前 `git pull`，確認 head 至少到本檔所在的提交。
**不要動 Webflow、不要 Publish**；本輪只做本機原型＋文件。

---

## 0. 先讀（依序）

1. `AGENTS.md`（共用規則）
2. `docs/projects/jubo-ai/README.md` → `decisions.md`（看 2026-10-14 所有列）
3. `docs/projects/jubo-ai/reference/原型v2結構與文案_2026-10-14.md`
4. **現行基底：`custom-code/poc/jubo-ai-agentic-v2.html`**：v3 從這份複製出來改，不要從零寫
5. `custom-code/brand/n-copilot/README.md`（N.Copilot 品牌規範，**全讀**）
6. `custom-code/poc/n-copilot-logo-motion-v2.html`（已有的 logo 開場動畫，v3 開場直接沿用它的編排）
7. `.claude/skills/threejs-jubo-context/SKILL.md`（Three.js 硬限制）
8. `docs/projects/jubo-ai/reference/研究彙整_2026-10-14.md` §3、§4（哪些事實可以寫）

---

## 1. Terris 這輪的要求（原話整理，全部要做）

| # | 要求 | 做法摘要 |
|---|---|---|
| R1 | v2 整體動畫方向 OK，之後再細修；以 v2 為基底 | 保留 v2 的章節骨架與粒子變形機制 |
| R2 | **全頁 Jubo AI 的識別改用 N.Copilot logo**（「它是我們 AI 技術的 logo」） | 見 §3。原話是語音輸入的「Drupal AI」，依上下文判讀為「Jubo AI」；如果 Terris 另有所指，以他的回覆為準 |
| R3 | 做成**沉浸式動態敘事頁（immersive motion graphic storytelling）**，可自由發揮創意 | 見 §2 故事線 |
| R4 | Hero 的「光暈＋像 Codex／ChatGPT live mode 的對話感」很好 → **再精緻化** | 見 §4-1 |
| R5 | 對話框（Hero 提示框＋「換你下指令」示範）很好 → **再精緻化** | 見 §4-2 |
| R6 | **參考 lattice.hr**：他們的對話框動畫與 agent 氛圍很好 | Claude **沒有看過** lattice.hr（Mobbin 查詢被中斷）。請 Codex 自己實際打開 `https://lattice.hr`（或 Mobbin 搜尋 "Lattice AI agent"），把觀察到的手法寫進 `reference/lattice-觀察.md`（只抄互動手法，不抄文案、數據、Logo），再套用到 §4 |

---

## 2. v3 故事線（建議，可再發揮）

主角是 **N.Copilot 的星芒標誌**：它是「Jubo AI 的本體」。整頁 = 星芒從一個光點誕生 → 吸收照護資料 → 展開成很多幫手 → 跟你對話 → 把決定交還給人。

| 章 | 名稱 | 畫面 | 主要文字（沿用 v2，可微調） |
|---|---|---|---|
| 0 | 誕生 | 白底中央一個光點 → 拉成光條 → 兩翼長出 → Aurora 掃光（沿用 `n-copilot-logo-motion-v2.html` 的編排）→ 粒子從星芒四散成球 → 下方浮出 live-mode 對話框 | 照護資料，正在思考。 |
| 1 | 吸收 | 星芒縮成核心，10 張資料卡從四周飛入（v2 已有） | 一次量測。一段交班。… |
| 2 | 拆開 | 粒子變三層環，標籤彈出（v2 已有）；決策層用 N.Copilot 的 Teal Air 邊框 | 三層結構，最後一層是人。 |
| 3 | 星座 | 7 節點；**每個節點用小型 N.Copilot 星芒取代圓點**；點擊彈卡（v2 已有） | 長出 7 個幫手 |
| 4 | 對話 | 精緻化後的 agent 對話（§4-2），左上角是 N.Copilot 頭像 | 選一件事，看 AI 一步步做完。 |
| 5 | 速度 | 光帶（v2 已有）；可改成「star flare dynamic form」：一道大星芒劃過 | 不是幾年。是幾個月。 |
| 6 | 交還 | 星芒縮小、停在一個「確認」按鈕上，象徵交給人 | AI 整理。人來判斷。 |
| 7 | 收尾 | 星芒回到中央呼吸，CTA＋FAQ | 你的照護資料，會長成什麼？ |

背景語彙改用 N.Copilot 官方三種 star flare（README §5）：細線放射紋、多層半透明星芒景深、單一星芒大特寫配 Aurora。**這三種比自己發明的光暈優先**。

---

## 3. N.Copilot logo 使用規則（硬限制）

- 檔案：`custom-code/brand/n-copilot/`。要動畫就 **inline SVG**（`<img>` 選不到內部節點）。
- **星星是兩塊翼之間的負空間，不是獨立物件**。可以做描邊繪出、漸層掃光、縮放、旋轉、遮罩；**不能**讓星星單獨呼吸或變形。要那樣做得另畫星星 path，等於改原稿幾何 → **先問 Terris**。
- 最小尺寸：mark 網頁 20px、horizontal 70px。
- 顏色：Teal Air `#20EDF1`、Jubo Teal `#00B2C0`、Grey `#373A36`；Aurora 四停點 `#20EDF1 → #00B2C0 → #AED353 → #D3D730`（**取樣值，非官方**，在原型註解標明）。白底上標誌用 Teal Air 或 Aurora。
- 原型可以用 CSS 變數 `--teal-air` 寫死；**Webflow 實作時要先新增 Variable**（README §6），這件事寫進 tasks.md 給 Terris 決定。
- 字體：先沿用 v2 的 Poppins＋系統中文字；Gibson 不載入（README §6 待 Terris 決定）。
- 若要讓粒子組成星芒形狀：把 mark 的兩條 path 用離屏 canvas `fill(new Path2D(d))` 畫出來，再用 `getImageData` 取樣不透明像素當粒子目標點（約 1,500 點）。**不要手抄座標**。

---

## 4. 要精緻化的兩個對話框

### 4-1 Hero「live mode」

v2 現況：玻璃提示框、左邊會呼吸的光球、輪播打字 4 個指令、4 個 chip。
v3 方向：
- 光球換成 **N.Copilot 星芒**，外圈加 Aurora 光環。光環用 conic-gradient 慢轉，加一圈像語音波形的細線，隨「AI 打字」節奏起伏。用 CSS 或 SVG 就好，**不要再開第二個 WebGL canvas**。
- 狀態要看得出來：`idle`（慢呼吸）→ `listening`（使用者 hover／focus 輸入框，光環變亮）→ `thinking`（波形加快、shimmer 文字「思考中…」）→ `answering`（逐字輸出）。狀態機用純 JS 物件，粒子背景也訂閱它（v2 的 `view.disp` 已有雛形）。
- 打字游標、placeholder 輪播、送出鍵按下時的微彈跳。chip 被點時「飛進」輸入框再送出，而不是直接跳區塊。

### 4-2「換你下指令」agent 對話

v2 現況：分頁 → 問題打字 → 資料來源 chip 落下 → 步驟打勾 → 產出卡彈出 → 按「確認」。
v3 方向（請先看 lattice.hr，再決定細節）：
- 改成**真正的對話串**：使用者泡泡從右下滑入；AI 回覆左側帶 N.Copilot 頭像；「思考中」用 shimmer 漸層文字，不要只用 spinner。
- 工具呼叫用可展開的列（例：`讀取 生命徵象 · 46 筆 ✓`），預設收合，點了展開看細節。
- 產出卡從對話中「長出來」：高度自動展開＋內容逐行淡入；最後的「確認」按下後，卡片邊框變 Jubo Teal，星芒閃一下，表示交給人。
- 對話區固定高度、自動捲到底；切換情境時舊對話淡出。
- **必留**：「示意流程：床號、姓名與數值皆為虛構，非實際產品畫面」。

---

## 5. Claude 的設計方法（為什麼 v2 看起來順，請照做）

1. **一個主角、一套系統，不堆特效。** 全頁只有一個固定 canvas，章節之間「變形」，不在每段各放一個新動畫。觀眾會覺得是同一個 AI 在變化，敘事才連得起來。
2. **動態要帶意義。** 每個動作都在說一件事：資料卡「飛進」核心＝AI 吸收資料；三層環＝結構；星座＝長出功能；最後的「確認」＝交還給人。想不出意義的動畫就刪掉。
3. **固定的節奏表**（v2 實際用的值，保持一致才順）：

   | 用途 | ease | 時長 | stagger |
   |---|---|---|---|
   | 標題逐字浮出 | `expo.out` | 0.9–1.0s | 每字 0.035–0.05s |
   | 卡片／徽章彈出 | `back.out(1.6–2)` | 0.5–0.6s | 0.08s |
   | 一般淡入上移 | `power3.out` | 0.8s | 0.15s |
   | 粒子形狀 lerp | 每幀 `+= (目標-現值)*0.045` | — | 每顆粒子用 `aSeed` 錯開 |
   | 捲動綁定 | `scrub: 1`；pin 長度 180%–260% | — | — |

4. **字只有兩種重量感**：超大的 300 細體標題（`clamp(2.5rem,7vw,5.75rem)`）＋ 60% 灰的導言。強調詞一律用同一條漸層（Teal → Blue → Purple），不另配色。
5. **玻璃卡配方固定**：`background: rgba(255,255,255,.72)`、`border: 1px solid rgba(255,255,255,.92)`、`backdrop-filter: blur(16–20px)`、陰影帶一點 teal `0 1.5rem 4rem hsla(184,60%,30%,.14)`、圓角 1.25–1.75rem。所有浮層用同一套。
6. **留白比裝飾重要。** 一個畫面只有一個焦點，周圍空著；粒子是背景不是主角時，透明度降到 0.35（v2 的 `data-alpha`）。
7. **每改一輪就截圖看全頁**（§8）。v2 有三個 bug 都是看拼圖才發現的，只看程式碼看不出來。

---

## 6. 技術配方與已踩過的坑（v2 的實際教訓）

- **章節觸發要在所有 pin 建立之後才建立**，否則位置算錯（v2 第一次：星座在「資料湧入」時就出現）。v2 用 `initChapterTriggers()` 放在檔尾。
- **pin 的章節要拿 `.pin-spacer` 當觸發範圍**（`sec.parentElement.classList.contains('pin-spacer')`），否則 pin 期間沒有章節是 active 的。
- **GSAP 的 x／y 不吃 `calc()` 字串**：用 `xPercent:-50` 置中，再用函式算像素 `x: () => vw * innerWidth / 100`。
- **隱藏的熱點也要 `pointer-events:none`**，不然 opacity 0 時還會擋住點擊。
- **窄螢幕要整體縮放粒子群組**：`scale = min(1, 可視半寬 * .82 / 星座半寬)`，否則 7 節點會超出畫面。
- 手機（<768px）**不 pin**，改為 `toggleActions` 進場；pin 的元素在手機改 `position:static`。
- Three.js 用 **r155 UMD**（`three.min.js`），不能用 ES module；整頁一個 canvas、1 draw call、`pixelRatio ≤ 2`、分頁隱藏停 loop、`prefers-reduced-motion` 時速度 ×0.05 而不是完全靜止。
- 粒子在白底：用一般混合（不要 additive），粒子大小 `uSize / -mv.z`，alpha 0.85–0.9。
- 熱點位置：每幀用 `localToWorld` 加 `project(camera)` 換算成螢幕座標，只在形狀接近星座（`|morph-2| < 0.15`）時顯示。
- 彈出卡：`role="dialog"`、`aria-modal`、Esc 關閉、焦點回到原按鈕；給螢幕閱讀器另放一份隱藏的功能清單（v2 `#hs-list`）。

---

## 7. 不可做／必須保留

- 只寫研究彙整 §「可公開」的事實；**2,800+**、約 33 萬、30 億+。`[待確認]` 黃底標記全部保留（清單見 `文案初稿_2026-10-14.md` 文末）。
- **不寫**「客戶資料不用於訓練」；iBee **不寫**成「由資料庫生成」。
- 示範區的虛構資料一定要有「示意」標示。
- 不動 Slater、不改共用 class、不碰 Webflow。
- 不提交大型圖片或影片；截圖放 `/tmp` 或 scratchpad，不放 repo。

---

## 8. 驗收與驗證方法

產出：`custom-code/poc/jubo-ai-agentic-v3.html`（v2 保留不改）。

```bash
node tools/poc-scroll-shots.js custom-code/poc/jubo-ai-agentic-v3.html /tmp/v3 1440,991,375
# 拼成總覽圖（每列 3 張）
python3 -c "
from PIL import Image; import glob,sys
for w in ['1440','375']:
    fs=sorted(glob.glob(f'/tmp/v3/{w}-*.png')); W,H=(480,300) if w!='375' else (188,406)
    ims=[Image.open(f).resize((W,H)) for f in fs]; c=3 if w!='375' else len(ims); r=(len(ims)+c-1)//c
    s=Image.new('RGB',(W*c,H*r),'white'); [s.paste(im,((i%c)*W,(i//c)*H)) for i,im in enumerate(ims)]; s.save(f'/tmp/v3/sheet-{w}.png')"
```

驗收清單：
- [ ] 三個寬度都沒有 JS 錯誤、`scrollWidth` 等於視窗寬（Three.js 的 r155 deprecation 警告與 swiftshader 警告可忽略）
- [ ] 拼圖中每一章的粒子形狀正確：星芒或球 → 環 → 星座 → 光帶 → 球
- [ ] N.Copilot 開場完整播放，標誌比例與顏色符合 README，沒有改到星星幾何
- [ ] Hero live mode 四個狀態都看得出來；chip 點擊後飛入並觸發對話
- [ ] 對話示範 4 個情境都能跑完；工具列可展開；確認後狀態改變；有「示意」標示
- [ ] 星座 7 個節點都能點，彈卡可以用鍵盤開關
- [ ] `prefers-reduced-motion`：內容全部可讀、無循環動畫
- [ ] 手機（375px）不 pin、版面不擠、節點不超出畫面
- [ ] 實際打開 lattice.hr 後寫了 `reference/lattice-觀察.md`

---

## 9. 完成後

1. 更新 `docs/projects/jubo-ai/` 的 `tasks.md`（v3 列填證據）、`changelog.md`、`current-state.md`；有新決定就寫 `decisions.md`。
2. commit 訊息描述成果（繁中），push 到 `claude/jubo-ai-agentic-redesign`，確認遠端 head。
3. 回報 Terris：v3 檔案路徑、拼圖、已知限制、需要他決定的事（Teal Air 變數、Gibson 字體、示範區標示是否足夠、真機效能）。
