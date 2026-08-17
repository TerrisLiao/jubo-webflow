# 01｜Finsweet Client-First v2 規範摘要

來源：https://finsweet.com/client-first/docs
這是 Jubo 官網最初建置時廠商遵循的規範，也是本資料夾所有判定的基準。

---

## 1. 三大目標

1. **Organization** — 專案怎麼組織
2. **Consistency** — 全站怎麼維持一致
3. **Clarity** — class 怎麼命名

核心精神：**「不需要懂 Client-First 的人，也要能從 class 名稱看懂它在做什麼。」**

---

## 2. 核心結構（Core Structure）

六個核心 class 與唯一正確的巢狀順序：

```html
<div class="page-wrapper">
  <main class="main-wrapper">
    <section class="section_[識別名]">
      <div class="padding-global padding-section-[size]">
        <div class="container-[size]">
          <!-- 內容 -->
        </div>
      </div>
    </section>
  </main>
</div>
```

| Class | 唯一允許的 CSS |
|---|---|
| `page-wrapper` | 頁面最外層容器 |
| `main-wrapper` | 主要內容，用 `<main>` 標籤 |
| `section_[識別名]` | 盡量不上樣式；需要背景就疊 `background-color-*` |
| `padding-global` | **只有** `padding-left` / `padding-right` |
| `padding-section-[size]` | **只有** `padding-top` / `padding-bottom`，且疊在 `padding-global` 同一層 div |
| `container-[size]` | **只有** `margin-left:auto`、`margin-right:auto`、`width:100%`、`max-width` |

另有兩個必備項目：
- `navbar`（用在 `<nav>` 標籤上）
- `global-styles`（HTML Embed，存成 Component，**每一頁都必須有**）

設計原理：把「左右 padding」「上下 padding」「最大寬度」三件事**解耦**，才能各自獨立調整。

---

## 3. Class 的四種分類

| 分類 | 定義 | 語法特徵 |
|---|---|---|
| **Utility class** | 特定 CSS 組合，可套用到全站任何元素 | 只用 `-`，**絕不含 `_`** |
| **Custom class** | 為某個 component / 頁面 / 元素群組建立 | **必含 `_`** |
| **Global class** | 一種「分類」而非語法；意指全站通用 | `-` 或 `_` 都可以 |
| **Combo class** | 基底 class 的變體，繼承基底樣式再加料 | 必須 `is-` 前綴 |

---

## 4. Custom class 命名法：`folder_element`

### 底線就是資料夾

> **一個底線 = 一層資料夾。**

```
home-testimonials_wrapper       → 資料夾 home-testimonials ／ 元素 wrapper
home-testimonials_headshot
home_testimonials_wrapper       → 資料夾 home > testimonials ／ 元素 wrapper
nav_primary_logo-wrapper        → 資料夾 nav > primary ／ 元素 logo-wrapper
```

資料夾名稱、元素名稱**內部**用連字號 `-` 連接。巢狀層數沒有上限，但只在有意義時才加層。

### 命名慣例

- 關鍵字順序是 **一般 → 具體**：`text-size-large` ✅ ／ `large-size-text` ❌
- 同一 folder 內遞進描述：
  ```
  team-list_headshot-wrapper
  team-list_headshot-image
  team-list_headshot-background
  ```
- **不用縮寫、不用簡寫**（No abbreviations, no shorthand, no confusion）
- `_component` 這個關鍵字專門標示「可整組複製的完整 UI 單元」
- 常見元素關鍵字：`_wrapper`、`_component`、`_list`、`_item`、`_content`、`_layer`、`_image`、`_title`、`_text`、`_link`

---

## 5. Combo class：`is-` 前綴

- **變體 class 一律 `is-` 開頭**：`.button.is-secondary`、`.section_hero.is-home`、`.icon-medium.is-footer`
- combo class 不能單獨存在，必須跟基底 class 一起用
- 只有在「繼承基底樣式確實有好處」時才建 combo
- 反例：`container-small/medium/large` 不該寫成 `container` + `is-large`，因為共用屬性不會一起改

### 疊加上限

| class 數 | 判定 |
|---|---|
| 1–2 | Great |
| 3 | Ok（但先想想） |
| 4 | Avoid（絕對上限） |
| 5+ | **Do NOT** — 改用單一 custom class |

避免深疊的三個方法：① 改用單一 custom class ② 合併 combo class ③ 多包一層 Div 分開不同類型的 utility。

---

## 6. Utility Class 標準清單

### 結構
`page-wrapper` `main-wrapper` `padding-global` `container-small` `container-medium` `container-large` `padding-section-small` `padding-section-medium` `padding-section-large`

### 字級
- 標題樣式：`heading-style-h1` ~ `heading-style-h6`
- 文字大小：`text-size-tiny` `text-size-small` `text-size-regular` `text-size-medium` `text-size-large`
- 字重：`text-weight-light` `text-weight-normal` `text-weight-semibold` `text-weight-bold` `text-weight-xbold`
- 樣式：`text-style-allcaps` `text-style-italic` `text-style-link` `text-style-muted` `text-style-nowrap` `text-style-quote` `text-style-strikethrough` `text-style-2lines` `text-style-3lines`
- 對齊：`text-align-left` `text-align-center` `text-align-right`
- 顏色：`text-color-primary` `text-color-secondary` `text-color-alternate`

### 間距（方向 ＋ 尺寸，兩個 class 一組）
- 方向：`margin-top` `margin-bottom` `margin-left` `margin-right` `margin-horizontal` `margin-vertical`（padding 同理）
- 尺寸：`margin-0` `margin-tiny` `margin-xxsmall` `margin-xsmall` `margin-small` `margin-medium` `margin-large` `margin-xlarge` `margin-xxlarge` `margin-huge` `margin-xhuge` `margin-xxhuge` `margin-custom1~3`（padding、spacer 同理）
- 標準寫法：`margin-bottom margin-small`、`padding-vertical padding-large`

### 尺寸階梯（全站通用）

| 名稱 | rem | px |
|---|---|---|
| `0` | 0 | 0 |
| `tiny` | 0.125 | 2 |
| `xxsmall` | 0.25 | 4 |
| `xsmall` | 0.5 | 8 |
| `small` | 1 | 16 |
| `medium` | 2 | 32 |
| `large` | 3 | 48 |
| `xlarge` | 4 | 64 |
| `xxlarge` | 5 | 80 |
| `huge` | 6 | 96 |
| `xhuge` | 8 | 128 |
| `xxhuge` | 12 | 192 |
| `custom1` | 1.5 | 24 |
| `custom2` | 2.5 | 40 |
| `custom3` | 3.5 | 56 |

> ⚠️ Jubo 官網的間距值有自己的一套（用 Variables 管理），實際值見 `04_設計變數與色彩.md`。

### 其他
- 最大寬度：`max-width-xxsmall` ~ `max-width-xxlarge`、`max-width-full`、`max-width-full-tablet` / `-mobile-landscape` / `-mobile-portrait`
- 隱藏：`hide` `hide-tablet` `hide-mobile-landscape` `hide-mobile-portrait`（**v2 已移除 `show-*`**）
- 圖示：`icon-height-small/medium/large`、`icon-1x1-small/medium/large`
- 背景：`background-color-primary/secondary/tertiary/alternate`
- 層級：`z-index-1` `z-index-2`
- 定位：`align-center`（margin 置中）、`layer`（絕對定位滿版）
- 互動：`pointer-events-none` `pointer-events-auto`
- 溢出：`overflow-visible/hidden/scroll/auto`
- 比例：`aspect-ratio-square/portrait/landscape/widescreen`
- 顯示：`display-inlineflex`
- 清除原生間距：`spacing-clean`

---

## 7. 尺寸與 rem

- **1rem = 16px**，Client-First **不改 root font-size**
- 字級、間距、寬度**全部用 rem**
- 理由：使用者調整瀏覽器字級、瀏覽器縮放都能正確反應；`vw`/`vh` 不符合無障礙規範
- 偏好好讀的數值：1、2、2.5、3、4、5，避免 `8.4375rem`
- **三個例外**：① 14px 字（0.875rem）② 極小間距 2px（0.125rem）③ **border 維持 px**

---

## 8. 排版語意

- 「如果 H1 就該長得像 H1，就不要加任何 class」— `heading-style-h#` 只在**要覆蓋標籤預設樣式**時才用
- 標題層級必須連續：H1→H2→H3→H4→H2→H3 ✅　／　H1→H2→H4→H2→H5 ❌
- 理想狀態是 Heading / Text 元素上一個 class 都不用加

---

## 9. Variables 命名（CF v2）

兩層 token 模型：

1. **Primitive（基礎色）** — 名稱帶 `- Base Color`，只當底層積木，不直接綁 class
2. **Semantic（語意）** — `[元素] - [樣式] - [識別]`，例如 `text - color - primary`、`background - color - dark`

**關鍵規則：語意變數絕不用顏色名命名。** 用 `text - color - primary`，不要用 `text - color - navy` —— 否則改配色時整套 token 都要改名。

識別字彙：`primary` / `secondary` / `tertiary` / `alternate`。

---

## 10. 「不可以做」的完整清單

**命名**
1. utility class 不可含底線
2. custom class 不可缺底線
3. 不可用縮寫、簡寫（`col-2-d`、`flex-a-l-j-c` 都是反例）
4. 關鍵字不可倒序（`large-size-text` ❌）
5. 不可取需要「懂 CF 才看得懂」的名字

**疊加**
6. 不可疊 5 個以上 class；4 個是絕對上限
7. 不可把非排版類 class 跟排版類 class 混疊
8. 不可把間距 utility 直接疊在文字元素上（改用間距 block 或 wrapper）

**Combo**
9. 沒有繼承效益就不要建 combo class
10. 不可用「疊好的 margin class」再存成新 class
11. 不可用「疊好的排版 class」再存成新 custom class
12. 變體 class 沒有 `is-` 前綴＝違規
13. 兩段式間距不可再做 `is-` 響應式變體

**Utility / Global**
14. 不可整個專案都用 utility class 拼出來
15. 不可為單一頁面的需求去改 utility class 的值（會影響全站）
16. 不建立全域 flex / grid class 系統（`col-*`、`flex-*` 都不要）

**核心結構**
17. `padding-global` 除左右 padding 外不加任何屬性
18. `padding-section-*` 除上下 padding 外不加任何屬性
19. `container-*` 除 margin/width/max-width 外不加任何屬性
20. 盡量不對 `section_*` 上樣式
21. `padding-section-*` 不另外包一層 div，疊在 `padding-global` 同層

**版本衛生**
22. 不用 `show-*`（v2 已移除）
23. 不用 `page-padding`（v2 已改名 `padding-global`）
24. 不用連字號版 `section-[識別名]`（v2 已改為底線 `section_`）
25. `global-styles` embed 必須存在於每一頁

**尺寸**
26. 字級、間距、寬度不可用 px（border 除外）
27. 不可用 vw / vh 做需要響應縮放的尺寸
28. 不可修改 root / html font-size
