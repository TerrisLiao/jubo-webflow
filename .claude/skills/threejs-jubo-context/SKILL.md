---
name: threejs-jubo-context
description: Jubo 官網專案的 Three.js 使用限制。任何要在 Jubo Webflow 站上寫 Three.js、WebGL、shader、AI Orb、3D 或粒子效果的工作，都必須先讀這個，再參考 threejs-* 系列 skill。
---

# Three.js 在 Jubo 官網的使用限制

> **先讀這個，再看 `threejs-fundamentals` / `threejs-shaders` / `threejs-materials` 等 skill。**
> 那些 skill 是通用的 Three.js 知識，**沒有考慮本專案的環境限制**。
> 照抄它們的範例會壞掉，原因見下面第 1 點。

---

## 1. ⚠️ 我們用 UMD 全域，不是 ES module

`threejs-*` 系列 skill 的所有範例都長這樣：

```js
import * as THREE from "three";        // ❌ 本專案不能這樣用
```

**Jubo 官網沒有 build system**（沒有 npm、沒有 bundler，這是 Webflow 站）。
Three.js 是用 `<script>` 標籤從 CDN 載入的 UMD build，`THREE` 是全域變數：

```html
<!-- 頁面 Settings → Before </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js"></script>
```

```js
const scene = new THREE.Scene();       // ✅ 直接用全域 THREE
```

**轉換方式**：把 skill 範例裡的 `import` 那行刪掉，其餘 `THREE.xxx` 照用即可。

### 為什麼釘在 r155

- **r160 之後官方移除了 UMD build**，只剩 ES module
- ES module 從 `file://` 開啟會被 CORS 擋掉，本機測試直接掛掉
- 所以固定用 **r155 的 `three.min.js`**，這是最後幾個還有 UMD 的版本之一

> `threejs-*` skill 標示驗證於 r160+，但實測其 API 用的是 `outputColorSpace` / `colorSpace`（r152+ 引入），
> **與 r155 相容**，沒有殘留 `outputEncoding`、`sRGBEncoding` 等舊 API。可以安心參考。

---

## 2. 🚫 絕對不能碰 Slater

站台載入兩個 Slater 託管的外部檔案（`slater.app/20018/60294.css`、`60292.js`），
那是**全站背景設施，不在修改範圍內**。

新的 Three.js 程式碼一律寫在**頁面層 custom code**：
Webflow → 該頁 Page Settings → `Before </body> tag`
（MCP：`data_scripts_tool > set_page_freeform_code`，`location: "footer"`）

Slater 鎖住的 class 清單見 [`custom-code/slater-selectors.md`](../../../custom-code/slater-selectors.md)，**那些 class 不可改名**。

---

## 3. 效能預算（硬性，不可協商）

`threejs-*` 系列 skill **沒有效能上限的概念**，本專案有。以下以本專案為準：

- **整頁最多一個 WebGL canvas**
- **draw calls ≤ 10**（AI Orb POC 實測為 2）
- `setPixelRatio(Math.min(devicePixelRatio, 2))` — 不設會在高 DPI 手機上算四倍像素
- **後製鏈（EffectComposer / bloom / SSAO）預設不用**。行銷頁上很貴。
  skill 教了不等於該用；要用之前先問，並在真機實測。
- 分頁切到背景時停掉 render loop
- `prefers-reduced-motion` 時把動態速度降到極低（不要完全靜止，會像壞掉）

**驗證方式**：不做預先的抽象跑分。每個實際動態做完後由 Terris 在真機實測，
掉幀再往下調：降 pixelRatio → 減粒子 → 降 geometry 細分 → 手機改 CSS fallback。

> 不要因為「怕慢」就先自己閹割效果，也不要沒測就宣稱效能沒問題。

---

## 4. 狀態機留在程式碼，不要放進設計檔

AI 狀態（`idle / listening / thinking / generating / success / error`）是**應用程式邏輯**，
必須是純 JS 物件，讓各種算繪器訂閱：

```js
const STATES = { idle:{…}, thinking:{…}, generating:{…} };
let current='idle'; const subs=[];
const onState = fn => (subs.push(fn), fn(STATES[current], current));
function setState(n){ current=n; subs.forEach(fn => fn(STATES[n], n)); }

// Three.js 只是其中一個訂閱者
onState(s => { U.uDisp.value = s.disp; U.uGlow.value = s.glow; });
```

**絕不可**把狀態流程放進 `.riv` 或 Lottie 檔——那等於把邏輯藏進設計資產，Agent 看不到也改不了。

可執行範例：[`custom-code/poc/ai-orb-compare.html`](../../../custom-code/poc/ai-orb-compare.html)
（同一份 `STATES` 同時餵給 CSS、Three.js、Lottie 三種算繪器）

---

## 5. 技術選型已定案

| 用途 | 用什麼 |
|---|---|
| AI Orb 主視覺 | **Three.js**（CSS 做不出有機變形的輪廓） |
| 環境光暈、陪襯 | CSS |
| 捲動、進場、轉場 | GSAP（站上已載入 3.15 + ScrollTrigger） |
| 圖示、loading、插畫 | Lottie |
| — | **Rive 先不導入**（`.riv` 是二進位，Agent 無法產生或修改） |

完整比較與實測記錄見 [`Jubo官網AI開發規範/09_GSAP動畫與互動規範.md`](../../../Jubo官網AI開發規範/09_GSAP動畫與互動規範.md) §10-0-1。

---

## 6. AI Orb 的核心構成（缺一個質感就掉一階）

| 元件 | 作用 |
|---|---|
| `IcosahedronGeometry(1, 40)` | 夠密的球面網格，位移才不會有稜角 |
| 頂點著色器 simplex noise 位移 | **有機變形的邊緣** — 這是 CSS 做不到的關鍵 |
| 雙層 noise（低頻 ×0.7 ＋ 高頻 ×0.3） | 大起伏＋細節，只有一層會很假 |
| Fresnel 邊緣光 `pow(1-dot(N,V), 2.4)` | 體積感，讓它像球不像貼紙 |
| `Points` 粒子環（~1400 顆，additive） | 空間感 |

> **不要把「讓它變漂亮」直接靠後製解決。** 畫面不好看時先問「是不是主體本身沒做對」，
> 而不是疊 bloom、加色調分級。Three.js 贏 CSS 不是因為能後製，
> 是因為能**用 noise 位移頂點**做出有機輪廓——那是主體的問題。

---

## 7. 動手前的檢查清單

- [ ] 程式碼寫在**頁面層 footer**，沒有動到 Slater？
- [ ] 用 UMD 全域 `THREE`，沒有留下 `import` 語句？
- [ ] 整頁只有一個 canvas？
- [ ] 有設 `setPixelRatio` 上限？
- [ ] 有處理 `prefers-reduced-motion`？
- [ ] 分頁隱藏時有停掉 render loop？
- [ ] 狀態機是純 JS，沒有藏進設計檔？
- [ ] 頁面維持未發布，交給 Terris 確認？
