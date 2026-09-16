# N.Copilot 品牌資產與規範

> 來源：Terris 提供的 `N-Copilot_Logo_final_op_1.ai` ＋ Brand Style Guide 一頁式圖檔（2026-09-16）。
> 本檔是那份 style guide 的文字化版本，加上與 Jubo 官網既有變數的對照。
> **原稿與本檔不一致時以原稿為準**，並回來更新這裡。

---

## 1. 檔案

| 檔案 | Style Guide 上的名稱 | 內容 | 尺寸 |
|---|---|---|---|
| `n-copilot-horizontal.svg` | Primary ／ Horizontal | 標誌 ＋ 右側字標 | 582.53 × 113.1 |
| `n-copilot-wordmark.svg` | Secondary ／ **Vertical** | 只有 `N.Copilot` 字標 | 379.31 × 74.05 |
| `n-copilot-stacked.svg` | Secondary ／ **Alternative** | 標誌在上、字標在下 | 291.5 × 216.61 |
| `n-copilot-mark.svg` | Secondary ／ **Favicon** | 只有標誌（star flare） | 247.84 × 119.69 |
| `source/N-Copilot_Logo_final_op_1.ai` | — | 原稿（PDF 1.5 相容，兩個圖層） | 476 KB |

> ⚠️ Style Guide 把「只有字標」那個版本標為 **Vertical**、把「上下堆疊」標為 **Alternative**。
> 名稱與外觀對不太起來，但這是原稿寫的，這裡照實記錄。檔名依實際外觀命名，避免誤用。

### SVG 怎麼來的

`.ai` 是 PDF 1.5 相容檔，用 PyMuPDF 讀出向量路徑後**重建**成乾淨 SVG（不是截圖、不是描圖）。
路徑座標與填色都來自原稿，顏色實測為 `#20EDF1` 與 `#373A36`，與 style guide 標示一致。

### ⚠️ 星芒不是獨立物件

`n-copilot-mark.svg` 只有 **2 條 path**，兩條都是 `#20EDF1`，各自 217.6 × 90，互為 180° 對稱。
**中間那顆四角星是這兩塊之間的負空間，不是一個獨立的形狀。**

這對動畫是關鍵限制：

- ✅ 可以做：整個標誌的描邊繪出、漸層掃光、縮放、旋轉、遮罩
- ❌ 做不到（不改幾何的話）：讓星星單獨呼吸／旋轉／morph

要讓星星單獨動，必須**另外畫一條星星 path**疊上去。那等於改動原稿幾何，**動手前要先問過**（`00_AI工作守則.md` §6-8：重構不可以改到設計）。

---

## 2. 最小尺寸

| 版本 | 印刷 | 網頁 |
|---|---|---|
| Horizontal | 25 mm | 70 px |
| Vertical（字標） | 15 mm | 40 px |
| Alternative（堆疊） | 20 mm | 35 px |
| Favicon（標誌） | 8 mm | 20 px |

---

## 3. 顏色

| 名稱 | HEX | RGB | CMYK | PANTONE |
|---|---|---|---|---|
| Jubo Teal Air | `#20EDF1` | 32 237 241 | 87 0 5 0 | 3252 C |
| Jubo Teal | `#00B2C0` | 0 178 192 | 87 0 28 0 | 7466 U / 7466 C |
| Jubo Grey | `#373A36` | 55 58 54 | 57 47 53 66 | 419 U / 419 C |
| Jubo Aurora Gradient | 見下 | teal → cyan → 黃綠 | — | — |

### Aurora Gradient 的停點（取樣值，非官方標示）

Style Guide 只給了色票圖、沒給數值。以下是從原稿 `.ai` 的那塊色票**直接取樣**出來的，
方向是左上 → 右下：

| 位置 | HEX |
|---|---|
| 左上 | `#44E7ED` |
| 左下 | `#05B3BB`（≈ Jubo Teal） |
| 中 | `#49D1B0` |
| 右下偏中 | `#AED353` |
| 右下 | `#D3D730` |

網頁上用四個停點就夠：`#20EDF1 → #00B2C0 → #AED353 → #D3D730`（見
[`../../poc/n-copilot-logo-motion.html`](../../poc/n-copilot-logo-motion.html) 的 B 格）。

⚠️ 這是取樣不是官方數值。要正式用之前請設計端確認，確認後回來改成官方值。

### 標誌放在各種底色上

| 底 | 標誌用色 |
|---|---|
| 白 | Teal Air |
| Jubo Teal | 白 |
| Aurora Gradient | 白 |
| Jubo Grey | Teal Air |
| 黑 | Teal Air |

---

## 4. 字體

| 角色 | 字體 | 字重 |
|---|---|---|
| Headlines、titles | **Gibson** | Light / Book / Regular / Medium / Semi Bold / Bold |
| Headlines、sub-headline、body | **Poppins** | Extra Light → Black，含各義大利體 |

---

## 5. 設計元素

Style Guide 列了三種「star flare」用法，都是把標誌的星芒放大成背景語彙：

1. **Star flare pattern in background** — 細線放射紋理
2. **Star flare depth composition** — 多層半透明星芒疊出景深
3. **Star flare dynamic form** — 單一星芒大特寫，配 Aurora 漸層

> 這三種是**官方認可的裝飾語彙**，比自己發明的光暈更安全。做 Jubo AI 頁的背景時優先用這三種。

---

## 6. ⚠️ 與 Jubo 官網既有系統的落差（動手前必須先決定）

對照 [`../../../Jubo官網AI開發規範/04_設計變數與色彩.md`](../../../Jubo官網AI開發規範/04_設計變數與色彩.md)：

| 項目 | N.Copilot 品牌 | Jubo 官網現況 | 狀態 |
|---|---|---|---|
| Jubo Teal `#00B2C0` | 主色 | `--primary--accent` **值完全相同** | ✅ 一致，直接用變數 |
| Jubo Teal Air `#20EDF1` | 標誌用色 | **站上沒有這個變數** | ❌ 要新增 |
| Jubo Grey `#373A36` | 文字／深底 | `--neutral--black` 是 `#151717`，不同 | ❌ 要新增或對齊 |
| Aurora Gradient 的黃綠端 | 漸層端點 | 站上只有 `--gradient--yellow`（14% alpha 淡黃），不是同一個東西 | ❌ 要新增 |
| 字體 | Gibson ＋ Poppins | 站上是 `JuboFont`（Slater `@font-face`） | ❌ 衝突，要決定 |

決定原則（依 `04` 開頭那條）：**顏色一律綁變數，不要手打色碼。**
所以要用 Teal Air 就得先在 Webflow Variables 新增，例如 `n-copilot/teal-air`，
不要在 CSS 裡寫死 `#20EDF1`。

字體那條要 Terris 拍板：N.Copilot 在官網上是**沿用站上的 JuboFont**（視覺統一），
還是**載入 Poppins 當子品牌識別**（多一個 webfont 的載入成本）。

---

## 7. 在 Webflow 裡怎麼用這些 SVG

要做動畫的 SVG **必須 inline 進 DOM** —— `<img src="x.svg">` 內部的節點 JS 和 CSS 都選不到。
在 Webflow 就是把 SVG 原始碼貼進 Embed。

這**不違反** `00_AI工作守則.md` 鐵律 4。那條禁的是「用 Embed 畫版面、畫假 UI」，
不是禁止 inline SVG 圖示 —— 站上本來就有 `icon-embed-*` 系列在做同一件事。

不需要動畫的地方（footer、navbar 等），照常上傳成 Webflow Asset 用 `<img>` 就好。
