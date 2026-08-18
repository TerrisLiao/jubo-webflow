# Jubo 官網 GSAP 動畫與互動規範

給 AI 與工程師：在 Jubo Webflow 官網上製作 SaaS / AI Agent 等級動畫的標準做法。
建立日期：2026-08-19　｜　基準：站上實測 + Lattice（lattice.com）架構對照

---

## 0. 動手前先讀這三件事

1. **Slater 上的檔案不可改動**（見 [`custom-code/slater-selectors.md`](../custom-code/slater-selectors.md)）。
   站台已經載入 `slater.app/20018/60294.css` 與 `60292.js`，那是**全站背景設施**。
   新動畫一律寫在**頁面層 custom code**，不要去動 Slater。
2. **重構不可以改到設計**（見 `00_AI工作守則.md` §6-8）。加動畫是「新增」，不是「順手改版面」。
3. **命名照 Client-First**。動畫用的 class 一樣要符合 `folder_element` / `is-` 規則。

---

## 1. 站上已經有什麼（不要重複載入）

站台 Custom Code 已經載入以下函式庫。**不要在頁面層再載一次**，會出現兩個實例互打。

| 函式庫 | 版本 | 位置 |
|---|---|---|
| GSAP core | 3.15 | footer |
| ScrollTrigger | 3.15 | footer |
| Draggable | 3.15 | footer |
| InertiaPlugin | 3.15 | footer |
| Swiper | 12 | footer（CSS 在 head） |
| Lenis（平滑捲動） | 1.1.13 | head |
| Finsweet Attributes | v2 | head |
| Flowbase Count Up | 1.0.0 | head |

> **GSAP 外掛現在全部免費**（Webflow 收購 GSAP 後，3.13 起原本付費的外掛全開放）。
> 需要 `SplitText`、`MorphSVGPlugin`、`TextPlugin`、`Flip`、`DrawSVGPlugin` 時，
> **在該頁面的 head 自行補 script 標籤即可**，不用改 Slater。Lattice 就是這樣載 SplitText 與 MorphSVG 的。

```html
<!-- 頁面 Settings → Inside <head> tag，只在需要的頁面加 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
```

---

## 2. 核心架構：行為掛 `data-*`，樣式掛 class

這是站上**既有**的慣例（Slater JS 就是這樣寫的），請一律沿用。

| 用途 | 做法 | 範例 |
|---|---|---|
| JS 要抓的鉤子 | `data-*` 屬性 | `[data-parallax="trigger"]`、`[data-cascading-slide]` |
| 樣式 | Client-First class | `.jp-journey_card` |
| 狀態 | `data-*-status` 屬性 | `[data-status="active"]` |
| JS→CSS 傳值 | CSS 自訂屬性 | `--clip`、`--slider-spv` |

**為什麼不用 class 當鉤子**：class 是設計師會改的東西，`data-*` 不是。
用 class 當 JS 鉤子，設計師改個名字功能就壞了 — 這正是 Slater 現在鎖死一堆 class 名的原因，不要再製造同樣的問題。

### 站上已有的 `data-*` 系統（可直接沿用，不用重寫）

| 功能 | 屬性 |
|---|---|
| 視差 | `data-parallax="trigger\|target"`、`-direction`、`-scrub`、`-start`、`-end`、`-disable` |
| 文字逐字進場 | `data-stagger-text`、`data-stagger-button` |
| 按鈕字元動畫 | `data-button-animate`、`data-button-animate-chars` |
| 堆疊卡片 | `data-stacking-cards-init`、`data-stacking-card`、`-desktop-rotate`、`-mobile-y` … |
| 分頁切換 | `data-tabs="wrapper\|content-item\|visual-item\|item-progress"` |
| 跑馬燈 | `data-marquee-scroll-direction-target`、`data-marquee-collection-target` |
| 階梯式輪播 | `data-cascading-viewport`、`data-cascading-slide`、`data-cascading-slider-prev/next` |
| 游標跟隨預覽 | `data-follower-wrap`、`-collection`、`-cursor`、`-visual` |
| GSAP 輪播 | `data-gsap-slider-init`、`-collection`、`-list`、`-item`、`-control` |
| 平滑捲動排除 | `data-lenis-prevent` |

> **做新東西之前先查這張表。** 已經有的就用既有屬性，不要另外造一套。

---

## 3. 新動畫程式碼寫在哪裡

**一律寫在頁面層**：Webflow → 該頁 Page Settings → `Before </body> tag`。

（MCP 對應：`data_scripts_tool > set_page_freeform_code`，`location: "footer"`）

理由：GSAP 在站台 footer 載入，頁面層的 footer code 會排在它後面，一定拿得到 `window.gsap`。
寫在 head 會因為 GSAP 還沒載入而報錯。

### 標準開頭樣板

```html
<script>
window.Webflow ||= [];
window.Webflow.push(() => {
  if (!window.gsap) return;                    // GSAP 沒載到就安靜結束，不要噴錯
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add({
    isDesktop: "(min-width: 992px)",
    isTablet:  "(max-width: 991px)",
    isMobile:  "(max-width: 767px)",
    reduce:    "(prefers-reduced-motion: reduce)"
  }, (ctx) => {
    const { isDesktop, reduce } = ctx.conditions;

    if (reduce) return;                        // 見 §6，這行不可以省

    // ── 動畫寫這裡 ──

    return () => { /* 斷點切換時的清理，通常留空即可 */ };
  });
});
</script>
```

**為什麼要用 `Webflow.push()`**：確保 Webflow 自己的 IX2 互動先初始化完，避免兩邊搶同一個元素。
**為什麼要用 `gsap.matchMedia()`**：斷點切換時 GSAP 會自動 revert 掉該斷點的動畫，不用自己管清理。

### ⚠️ 不要重複初始化 Lenis

Slater 已經初始化 Lenis 了。**不要再 `new Lenis()`**，會有兩個實例互相打架、捲動變成兩倍速。
如果需要讓 ScrollTrigger 跟 Lenis 同步，先確認站上是否已經接好；沒有的話才補：

```js
// 只有在確認 Slater 尚未接線時才需要
if (window.lenis && !window.__lenisScrollTriggerWired) {
  window.lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => window.lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenisScrollTriggerWired = true;
}
```

---

## 4. 動畫配方（Jubo 常用）

### 4-1. 捲動進場（最常用）

```js
gsap.utils.toArray('[data-reveal]').forEach((el) => {
  gsap.from(el, {
    y: 24, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true }
  });
});
```

用 `once: true` 而不是 `toggleActions` 反覆播 — 進場動畫播一次就好，來回跑很廉價。

### 4-2. 依序進場（卡片列）

```js
gsap.from('[data-reveal-group] > *', {
  y: 20, autoAlpha: 0, duration: 0.6, ease: 'power2.out',
  stagger: 0.08,                               // 0.06~0.1 之間最自然
  scrollTrigger: { trigger: '[data-reveal-group]', start: 'top 80%', once: true }
});
```

### 4-3. 文字逐行進場（SplitText，Lattice 的招牌手法）

```js
gsap.registerPlugin(SplitText);
document.querySelectorAll('[data-split-lines]').forEach((el) => {
  const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' });
  gsap.from(split.lines, {
    yPercent: 110, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: el, start: 'top 85%', once: true }
  });
});
```

⚠️ 中文字型要注意：SplitText 對 CJK 用 `type: 'lines'` 沒問題，
但 **`type: 'chars'` 會把中文逐字拆開**，配上 `stagger` 很容易變得很吵，Jubo 的中文標題不建議用。

### 4-4. 釘住區塊（pin）

```js
ScrollTrigger.create({
  trigger: '[data-pin-section]',
  start: 'top top', end: '+=100%',
  pin: true, pinSpacing: true,
  scrub: 1                                     // 給 1 而不是 true，會有阻尼感
});
```

⚠️ `pin` 只在桌機用。手機上釘住區塊會讓使用者以為卡住，一律包在 `isDesktop` 條件裡。

### 4-5. 數字跳動

站上已有 Flowbase Count Up，**優先用它**，不要自己寫。真的要自訂：

```js
const obj = { v: 0 };
gsap.to(obj, {
  v: 30, duration: 2, ease: 'power1.out', snap: { v: 1 },
  onUpdate: () => el.textContent = obj.v.toLocaleString(),
  scrollTrigger: { trigger: el, start: 'top 85%', once: true }
});
```

### 4-6. JS 算值 → CSS 用（既有慣例）

站上的 cascading slider 就是這樣做的：JS 只寫 CSS 變數，長相交給 CSS。

```js
el.style.setProperty('--progress', String(p));
```
```css
.jp-thing_bar { transform: scaleX(var(--progress, 0)); }
```

**這是最好的模式** — JS 不碰樣式細節，設計改動不用動 JS。新動畫優先這樣寫。

---

## 5. 效能規則

1. **只動 `transform` 與 `opacity`。** 動 `width` / `height` / `top` / `left` / `margin` 會觸發 layout，捲動就會頓。
   - ✅ `x`、`y`、`xPercent`、`yPercent`、`scale`、`rotation`、`autoAlpha`
   - ❌ `left`、`top`、`width`、`height`、`marginTop`
2. **用 `autoAlpha` 而不是 `opacity`** — 它會連 `visibility` 一起處理，元素透明時不吃點擊。
3. **`will-change` 不要亂加。** 只加在真的會持續動的元素，動完要拿掉；加太多反而更慢。
4. **`scrub` 動畫不要綁太多元素。** 超過 20 個 ScrollTrigger 同時 scrub 就該考慮合併成一條 timeline。
5. **圖片先設好尺寸／aspect-ratio**，否則載入時版面位移會讓 ScrollTrigger 的 start/end 算錯。
6. 動態載入內容（CMS、Finsweet list filter）之後要呼叫 `ScrollTrigger.refresh()`。

---

## 6. 無障礙（這段是必要，不是加分）

**每一個動畫都必須尊重 `prefers-reduced-motion`。**

前庭功能障礙的使用者看到大幅位移／視差會頭暈想吐。這不是體感問題，是實際的生理反應。

```js
mm.add("(prefers-reduced-motion: reduce)", () => {
  // 不做任何位移動畫；需要的話只留極短的淡入
});
```

其他必須遵守的：

- **不要用動畫擋住內容。** 進場動畫沒播完之前，文字就該是可讀的（用 `gsap.from` 而不是先 CSS 隱藏再 `gsap.to`，避免 JS 掛掉時內容永遠看不到）。
- **自動播放的輪播要能暫停**，且不要快到來不及讀。
- **鍵盤能到的地方就要看得到焦點框**，不要為了美觀把 `outline` 拿掉。
- **不要用純動畫傳達資訊** — 動畫是輔助，資訊要在文字裡。

---

## 7. 命名規範（跟 Client-First 接軌）

| 對象 | 規則 | 範例 |
|---|---|---|
| JS 鉤子 | `data-` + 小寫連字號，動詞或名詞 | `data-reveal`、`data-pin-section` |
| 狀態 | `data-*-status` 或 `is-` combo | `data-status="active"`、`.is-active` |
| 動畫用 class | 照 `folder_element` | `.jp-journey_card` |
| CSS 變數 | `--` + 用途 | `--progress`、`--clip` |

**不要**為了動畫建一堆 `.animate-fade-1`、`.animate-fade-2` 這種扁平 class — 那正是 `07_合規稽核報告.md` 在抓的問題。

---

## 8. 收工前檢查清單

- [ ] 沒有重複載入 GSAP / Lenis / Swiper？
- [ ] 程式碼放在**頁面** footer，不是 head，也**沒有動到 Slater**？
- [ ] 有包 `gsap.matchMedia()`，而且處理了 `prefers-reduced-motion`？
- [ ] 只動 transform / opacity？
- [ ] 手機上有沒有不該出現的 `pin` 或視差？
- [ ] JS 掛掉的話，內容還看得到嗎？（用 `gsap.from` 而非先隱藏）
- [ ] CMS／篩選之後有 `ScrollTrigger.refresh()`？
- [ ] JS 鉤子用 `data-*`，不是 class？
- [ ] 新增的 class 有照 Client-First？
- [ ] 頁面維持未發布，交給 Terris 確認？

---

## 9. Lattice（lattice.com）架構拆解

2026-08-19 實測，作為對標參考。**Lattice 也是 Webflow 站**，架構跟 Jubo 幾乎一樣。

| 項目 | Lattice | Jubo 現況 |
|---|---|---|
| GSAP | 3.15.0 | 3.15 ✅ 相同 |
| 外掛 | ScrollTrigger、**SplitText**、**MorphSVG**、**TextPlugin** | ScrollTrigger、Draggable、InertiaPlugin |
| 輪播 | Swiper | Swiper 12 ✅ |
| 平滑捲動 | 無 | Lenis 1.1.13 |
| 動畫參數 | `data-delay`、`data-duration`、`data-hover` | `data-parallax-*`、`data-stagger-*` |
| 設計 token | `--color--*`、`--padding--*`、`--_typography---*`、**`--spring`** | Jubo Variables（33 個） |

**值得學的三件事：**

1. **把 easing 做成 token。** Lattice 有 `--spring` 這個 CSS 變數，全站共用同一條曲線，動感才會一致。
   Jubo 目前沒有 easing token，動畫各寫各的 ease，建議之後補上（`04_設計變數與色彩.md`）。
2. **動畫參數用 `data-delay` / `data-duration` 開在 HTML 上**，行銷同事不用改 JS 就能微調節奏。
3. **SplitText 做文字進場**是他們質感的主要來源 — 但中文要用 `lines` 不要用 `chars`（見 §4-3）。

**不用學的：** Lattice 沒有平滑捲動，Jubo 有 Lenis，體驗其實更好，不需要為了對標拿掉。

---

## 10. SaaS / AI Agent 頁面的動畫做法（Jubo AI 頁改版用）

### 10-0. ⚠️ 先破除一個迷思：炫技的網站，多半不是靠手寫 GSAP

2026-08-19 實測拆解 Lattice 首頁那段 **「Unblock work and unlock potential with your personal AI Agent」**：

| 觀察 | 實際情況 |
|---|---|
| 整頁的 ScrollTrigger 數量 | **只有 1 個** |
| AI Agent 主視覺 | **Lottie**（`data-animation-type="lottie"`、`renderer="svg"`、3 秒、autoplay、不 loop） |
| 背景漸層流動 | **`<code-island>` 程式元件**（`data-hydrate="true"`，傳入 `{"color1":"#FBECFF","color2":"#BFF1F5"}`） |
| 其餘動效 | CSS transition + Webflow 原生 IX2 |

**所以「捲動動畫堆很多 GSAP」不是質感的來源。** 這點仍然成立，做 scroll 動畫時不要過度投資。

> ⚠️ **但不要因此推論「Lottie 最適合做 AI Orb」——那是錯的，見下一節的實測。**

### 10-0-1. 🔬 AI Orb 技術選型：四種做法實測（2026-08-19 定案）

不要憑感覺選。四種做法我都實際做了一次同一顆球，可執行的比較檔在
[`custom-code/poc/ai-orb-compare.html`](../custom-code/poc/ai-orb-compare.html)（雙擊即可開）。

| | 能不能用程式直接產生 | 外觀 | 狀態切換 | Agent 可維護性 |
|---|---|---|---|---|
| **CSS** | ✅ | 柔和光暈，但**永遠是正圓** | CSS 變數，即時內插 | ★★★★★ 全文字可 diff |
| **Three.js** | ✅ | **最好**：有機變形邊緣＋體積感＋粒子 | shader uniform，即時內插 | ★★★★ 可 diff，shader 較難讀 |
| **Lottie** | ⚠️ 能吐 JSON，實務上要 After Effects | **平的**，無光暈、無景深 | **跳影格區段，不能內插** | ★★★ 看得懂但不該手改 |
| **Rive** | ❌ **完全無法產生** | — | State Machine（功能最強） | ★ 二進位，看不到也 merge 不了 |

**決議：AI Orb 用 Three.js。**

實測踩到、文件必須記下來的三件事：

1. **CSS 做不出有機變形的輪廓。** CSS 可以做到很漂亮的「發光體」，但它的邊緣永遠是完美圓形。
   Three.js 用 noise 位移頂點，邊緣會像活的一樣起伏——這個差距在並排看非常明顯，CSS 補不上來。
2. **Lottie 沒有可靠的 blur／glow。** 濾鏡效果在各家播放器支援度很差，所以 Lottie 的球是
   一圈一圈的實心向量圓，邊緣很硬。它擅長**線條、圖示、插畫、loading**，不是需要體積光的視覺。
   另外它的狀態切換是 `playSegments()` **硬跳影格**，不是內插，`thinking → generating` 不會平滑過渡。
3. **Lottie 名義上是 JSON，實際上不是給人手寫的。** 手寫時踩到真的 bug：
   scale 只給 `[x,y]` 會讓 transform 爆成 `matrix(-9999.99,…)`，整格變一片色塊（Lottie 需要 `[x,y,z]` 三個分量）。
   → 對 Agent 而言它跟 Rive 一樣是**設計資產**，只是換了文字外皮；Agent 只能改「播哪一段」，改不動內容。

**Rive 暫不導入**，理由是具體的而非理論的：**AI Agent 無法產生也無法修改 `.riv`**。
未來若真的需要，把它當成「第三種算繪器」接進既有狀態機即可，不要讓它變成狀態的擁有者（見 §10-0-2）。

**修正後的投資順序（取代舊版）：**

1. **Three.js** — 只給 AI Orb 這類主視覺，**整頁最多一個 canvas**
2. **CSS** — 環境光暈、背景氛圍、卡片 hover（陪襯，不是主角）
3. **GSAP** — 捲動對位、進場、轉場
4. **Lottie** — 圖示、loading、插畫
5. **Rive** — 先不用

### 10-0-2. 🔑 狀態機一定要留在程式碼裡

這是整個架構最重要的一條，POC 檔案就是為了證明它。

```js
const STATES = { idle:{…}, listening:{…}, thinking:{…}, generating:{…}, success:{…}, error:{…} };
let current='idle'; const subs=[];
const onState = fn => (subs.push(fn), fn(STATES[current], current));
function setState(n){ current=n; subs.forEach(fn => fn(STATES[n], n)); }
```

同一份 `STATES` **同時餵給 CSS、Three.js、Lottie 三種算繪器**，各自訂閱、各自畫。

好處：

- 換算繪器（CSS → Three.js → 未來的 Rive）**不用動狀態邏輯一行**
- 狀態是 logic，可以 diff、可以 code review、可以寫測試
- 不會出現「React 的 state 跟 Rive 的 state machine 各自為政然後對不起來」

> ❌ **絕對不要**把 `idle → thinking → generating` 這套流程放進 `.riv` 或 Lottie 檔案裡。
> 那等於把應用程式邏輯藏進設計檔，Agent 從此看不到也改不了。

---

### 10-1. Lottie（圖示、loading、插畫用 — **不要拿來做主視覺**）

Webflow 有原生 Lottie 元件，設計師用 After Effects + Bodymovin 匯出 JSON 即可。

**Jubo 適用場景**：圖示微動效、loading、流程示意插畫。
**不適用**：AI Orb 這種需要光暈與體積感的主視覺（見 §10-0-1 實測）。

實務規則：

- **`renderer: "svg"`** 適合圖形／向量（Lattice 用這個）；照片類才用 `canvas`。
- **檔案控制在 200KB 以內**。Lottie 很容易做出 2MB 的怪物，匯出前請設計師把圖層數壓下來。
- **不要 loop 主視覺**。Lattice 的 Agent 動畫 `loop=0`，播一次就停 — 一直動會搶走內容的注意力。
- **捲到才播**：用 ScrollTrigger 觸發，不要一進頁面就播完。

```js
// 捲到才播 Lottie（配 Webflow 原生 Lottie 元件）
const lottieEl = document.querySelector('[data-animation-type="lottie"]');
ScrollTrigger.create({
  trigger: lottieEl, start: 'top 75%', once: true,
  onEnter: () => window.Webflow?.require('lottie')?.lottie?.play()
});
```

> ⚠️ Webflow 的 Lottie API 依版本而異，實作時先在 Console 確認 `Webflow.require('lottie')` 拿不拿得到。

---

### 10-2. 打字／串流文字（AI Agent 頁的招牌效果）

模擬 AI 逐字回覆，是這類頁面辨識度最高的動效。**不要用 TypeIt 之類的額外套件**，GSAP 內建就夠。

```html
<p data-stream-text data-stream-speed="28">Amy 正在彙整近三個月的服務紀錄……</p>
```

```js
gsap.utils.toArray('[data-stream-text]').forEach((el) => {
  const full = el.textContent;
  const cps  = Number(el.dataset.streamSpeed) || 28;   // 每秒字元數
  el.textContent = '';
  const state = { n: 0 };
  gsap.to(state, {
    n: full.length,
    duration: full.length / cps,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => { el.textContent = full.slice(0, Math.round(state.n)); }
  });
});
```

**中文注意事項**：

- 中文一個字的資訊量遠大於英文字母，**速度要放慢**（英文 40–60 cps，中文 15–25 cps 比較舒服）。
- 逐字時容器高度會變動造成版面跳動 → **先給容器 `min-height`**，或用一個 `visibility:hidden` 的完整文字撐開。
- **無障礙**：打字中的文字對螢幕閱讀器是雜訊。給容器 `aria-live="off"`，另外放一份完整文字給輔助科技。
- `prefers-reduced-motion` 時**直接顯示完整文字**，不要逐字。

### 10-3. 對話泡泡依序出現

```js
const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-chat]', start: 'top 70%', once: true } });
tl.from('[data-chat-bubble]', {
  y: 16, autoAlpha: 0, duration: 0.5, ease: 'power2.out',
  stagger: 0.45                       // 停頓要夠長，模擬「對方在想」
});
```

搭配一個三點跳動的「輸入中」指示器（純 CSS 即可），質感會明顯提升。

### 10-4. 流動漸層背景（Lattice 的做法）

Lattice 用程式元件，但**純 CSS 就能做到九成效果**，而且零 JS 成本：

```css
.jubo-ai_aurora {
  background: linear-gradient(120deg,
    var(--gradient--light-teal), var(--gradient--purple), var(--gradient--blue));
  background-size: 300% 300%;
  animation: aurora 18s ease-in-out infinite;
}
@keyframes aurora {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .jubo-ai_aurora { animation: none; }
}
```

**用站上既有的 gradient 變數**（`04_設計變數與色彩.md`），不要另外挑顏色。

### 10-5. 捲動驅動的產品演示（scrollytelling）

「捲動時 UI 一步步變化」是 SaaS 頁最有說服力的段落。用 pin + timeline：

```js
mm.add("(min-width: 992px)", () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-demo]', start: 'top top', end: '+=200%',
      pin: true, scrub: 1
    }
  });
  tl.to('[data-demo-step="1"]', { autoAlpha: 0, y: -20 })
    .from('[data-demo-step="2"]', { autoAlpha: 0, y: 20 }, '<')
    .to('[data-demo-step="2"]', { autoAlpha: 0, y: -20 })
    .from('[data-demo-step="3"]', { autoAlpha: 0, y: 20 }, '<');
});
```

⚠️ **手機一律不要 pin**（見 §4-4）。手機改成單純的垂直堆疊 + 進場淡入。

### 10-6. 游標光暈 / spotlight

站上已經有 `[data-follower-*]` 系統，**先用既有的**。真的要新的：

```js
mm.add("(hover: hover) and (pointer: fine)", () => {          // 觸控裝置不要做
  const card = document.querySelector('[data-spotlight]');
  const move = (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  card.addEventListener('pointermove', move);
  return () => card.removeEventListener('pointermove', move);
});
```
```css
.jubo-ai_card { background: radial-gradient(
  600px circle at var(--mx, 50%) var(--my, 50%),
  rgba(0,178,192,.10), transparent 40%); }
```

這是 §4-6「JS 只寫 CSS 變數」的標準應用。

### 10-6-1. Three.js AI Orb — 實作要點

完整可跑的版本在 [`custom-code/poc/ai-orb-compare.html`](../custom-code/poc/ai-orb-compare.html) 的 B 格。

**載入方式（Webflow 頁面層，不碰 Slater）：**

```html
<!-- 頁面 Settings → Before </body>。用 UMD 版，不要用 ES module -->
<script src="https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js"></script>
```

> ⚠️ **不要用 `three.module.js` ＋ importmap。** r160 之後官方拿掉了 UMD build，
> 但 ES module 從 `file://` 開啟會被 CORS 擋掉，本機測試會直接掛掉。
> 固定用 **r155 的 `three.min.js`**（最後幾個還有 UMD 的版本之一）。

**核心構成**（缺一個質感就掉一階）：

| 元件 | 作用 |
|---|---|
| `IcosahedronGeometry(1, 40)` | 夠密的球面網格，位移才不會有稜角 |
| 頂點著色器 simplex noise 位移 | **有機變形的邊緣**——這是 CSS 做不到的關鍵 |
| 雙層 noise（低頻 ×0.7 ＋ 高頻 ×0.3） | 大起伏＋細節，只有一層會很假 |
| Fresnel 邊緣光 `pow(1-dot(N,V), 2.4)` | 體積感，讓它像球不像貼紙 |
| `Points` 粒子環（~1400 顆，additive） | 空間感 |

**狀態接法**（照 §10-0-2，只改 uniform，不碰狀態邏輯）：

```js
onState(s => {
  U.uDisp.value = s.disp;          // 變形幅度
  U.uGlow.value = s.glow;          // 發光強度
  U.uC1.value.set(s.c1);
  U.uC2.value.set(s.c2);
  mesh.userData.sp = s.speed;      // noise 演進速度
});
```

**效能守則（必守）：**

- **整頁最多一個 WebGL canvas**
- `setPixelRatio(Math.min(devicePixelRatio, 2))` — 不設會在高 DPI 手機上算四倍像素
- draw calls 控制在 **10 以內**（POC 實測為 2）
- 手機（≤767px）若量到掉幀，**改用 CSS 版當 fallback**，不要硬撐
- `prefers-reduced-motion` 時把 noise 演進速度降到 `.05`，不要完全靜止（會顯得壞掉）
- 分頁切到背景時停掉 render loop

### 10-7. 這類頁面最常見的三個錯誤

1. **同時開太多效果**。漸層在動、文字在打、卡片在飄、游標在跟 — 結果每一個都不突出，還很吃效能。
   **一個 section 最多一個主角動畫。**
2. **動畫擋住閱讀**。使用者是來看「Amy 能幹嘛」的，不是來看動畫的。捲太快就跳過的動畫，等於沒做。
3. **只在 MacBook 上測**。這類效果在中階 Android 上很容易掉到 30fps。
   用 Chrome DevTools 的 **CPU throttling 4×** 測，掉幀就砍效果。

---

## 11. 相關文件

- [`00_AI工作守則.md`](00_AI工作守則.md) — 五條鐵律、§6-7 斷點陷阱、§6-8 不可改設計
- [`custom-code/slater-selectors.md`](../custom-code/slater-selectors.md) — Slater 鎖住的 class，**不可改名**
- [`03_全域工具類清單.md`](03_全域工具類清單.md) — 現有 utility
- [`04_設計變數與色彩.md`](04_設計變數與色彩.md) — Variables
