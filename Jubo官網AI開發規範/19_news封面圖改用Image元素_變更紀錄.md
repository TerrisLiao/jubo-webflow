# 19｜`/news` 封面圖改用 Image 元素（變更紀錄）

> 日期：2026-09-22　｜　授權：Terris（「go，但不要 publish 到正式站」）
> 對應稽核：`18_載入效能稽核_2026-09-22.md` 的 **P0-1**
> **狀態：Designer 已改完，尚未 Publish。線上站仍是舊版。**

---

## 1. 為什麼改

`/news` 的卡片封面用 div 的 CSS `background-image` 輸出。Webflow 的響應式圖片機制
（`srcset` / `-p-500`~`-p-1600` 變體 / `loading="lazy"`）**只對 Image 元素生效**，
對 background-image 完全不啟動，所以 388×218 的格子照樣下載 275–426 KiB 的原圖。

實測 `/news` 因此 **9.43 MB、4G 要 48.5 秒**，其中 8.86 MB 是圖片。

---

## 2. 改之前（原始結構，rollback 時照這個還原）

頁面：`新聞中心`（`pageId: 6a029c4af6ffcfde1b409c31`）
位置：`.news-content_list` → `.news-content_list-item` → 卡片

```
Link  .news-card_wrap              element b04aa842-3247-250d-d082-e5bb9d658576
└─ Block .img-mask .is-news-card   element b04aa842-3247-250d-d082-e5bb9d658577
   └─ Block .single-news_cover-img element b04aa842-3247-250d-d082-e5bb9d658578   ← 已刪除
```

被刪除的 `Block` 的設定：

| key | value |
|---|---|
| `tag` | `div` |
| `domId` | （空） |
| `text.innerText` | （空） |
| `visibility` | `true` |
| `attributes` | `[]` |

封面圖是透過 **Style 面板的 Background → Image → 綁 CMS 欄位**設定的
（不在 element settings 裡，所以 `get_settings` 讀不到）。

`.single-news_cover-img` 這個 class **沒有被刪除**，CSS 也完全沒動：

```css
.single-news_cover-img {
  aspect-ratio: 16/9;
  background-image: url(https://d3e54v103j8qbb.cloudfront.net/img/background-image.svg);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  ...
}
```

> 保留原因：`新聞中心s Template`（文章內頁）的「相關新聞」列表還在用同一個 class
> （每頁 23 個實例）。動它的 CSS 會讓那邊壞版。

---

## 3. 改之後

```
Link  .news-card_wrap              element b04aa842-3247-250d-d082-e5bb9d658576
└─ Block .img-mask .is-news-card   element b04aa842-3247-250d-d082-e5bb9d658577
   └─ Image .news-card_cover-img   element 69e1ebe6-017d-5e5f-0ee9-7d07925dc674   ← 新增
      Navigator 顯示名稱：News Cover Image
```

Image 元素的 CMS 綁定（已驗證）：

| 設定 | 綁到 |
|---|---|
| `assetId` | 新聞中心s → **Cover Image**（`c75ca7bdde0e706521e2eaccb729dff8`） |
| `altText` | 新聞中心s → **Name**（`147d013cef313359a2bd061bc9ab0af3`） |

> `altText` 綁文章標題是順手補的無障礙／SEO 改善 —— 原本的 div 是背景圖，
> 對螢幕閱讀器和搜尋引擎等於不存在。

### 新增的 class

`.news-card_cover-img`（id `df38f4f9-16f1-129e-28ff-de4a83406b40`）

```css
.news-card_cover-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

命名依 Client-First：folder `news-card` 已存在（`news-card_wrap`、
`news-card_headline-wrap`、`news-card_category-date-wrap`、`news-card_hidden`），
所以用 `news-card_cover-img`，不是新開 folder。

`height: auto` 而不是 `100%` 是刻意的 —— 讓 `aspect-ratio: 16/9` 決定高度，
行為跟原本那個 div 一致；父層 `.img-mask` 沒有固定高度，設 `100%` 在某些
grid 情境下會蓋掉 aspect-ratio。

---

## 4. 動手前查過的相依性

| 檢查項 | 結果 |
|---|---|
| Slater JS（`60292.js`）是否引用這些 class | **否**。只抓 `.slider-cms-list` / `.slider-cms-item` / `.slider-cms-wrap` |
| Slater CSS（`60294.css`）是否引用 | **否**，完全沒有 |
| `custom-code/slater-selectors.md` 是否列管 | **否**，兩個 class 都不在清單上 |
| IX2 互動 | `data-w-id` 掛在 `.news-card_wrap`（連結）上，不是封面圖上 |
| Finsweet 篩選 | `fs-list-field="category"` 掛在 `.category-tag` 內的 div 與 `.news-card_hidden` 的 p 上，沒有碰封面圖 |
| class 改名 | **一個都沒改** |

---

## 5. Rollback 步驟

如果要還原（Designer 手動操作，1 分鐘）：

1. 選 `.img-mask.is-news-card` 裡的 `News Cover Image`（Image 元素）→ 刪除
2. 在 `.img-mask.is-news-card` 裡新增一個 Div Block
3. 套上既有的 class `single-news_cover-img`
4. Style 面板 → Background → Image → 綁 CMS 的 **Cover Image** 欄位
5. （可選）刪除 class `news-card_cover-img`

**只要沒有 Publish，線上站就完全不受影響** —— 也可以直接用 Webflow 的
Backups（Site Settings → Backups）還原到 2026-09-22 09:38 的版本。

---

## 5.5　量測結果

### 為什麼不是在 staging 上量的

**Staging 發布失敗，不是沒試。** Webflow MCP 的 `publish_site` 只接受 domain id，
而這個站的 domain id 只有兩個：`www.jubo-health.com` 與 `jubo-health.com`，
兩個都是正式站。API 沒有開放 `publishToWebflowSubdomain` 這個參數：

```
publish_site { site_id, customDomains: [] }
→ 400 Bad Request: "You must pass at least one valid domain id to the publish endpoint"
```

要發 staging 只能由人在 Designer 的 Publish 選單勾 `jubo-health.webflow.io`。
**我沒有用那兩個正式 domain id 去發布。**

### 改用本地模擬量測

做法：抓線上 `/news` 的實際 HTML，把 54 個 `div.single-news_cover-img`
換成 Webflow 會輸出的 `<img>` 標記（**真實的變體 URL、真實的檔案大小、
真實的 `sizes="100vw"`**），加上 `.news-card_cover-img` 的 CSS，
本地起 server，用同一組 harness 量。圖片全部走真實 CDN，所以位元組數是真的。

| | 線上現況 | 改版模擬 | 差異 |
|---|---|---|---|
| **首屏圖片流量** | 8,863 KiB | **1,113 KiB** | **−87.4%** |
| 首屏總傳輸 | 9,432 KiB | 1,870 KiB | −80.2% |
| 首屏載入的圖片張數 | 58 | **5** | −53 |
| load 完成 | 48.8 s | **10.8 s** | −77.8% |
| FCP | 1,676 ms | 1,504 ms | −10% |

版面驗證（兩個斷點，逐像素比對）：

| | 線上現況 | 改版模擬 |
|---|---|---|
| 手機遮罩尺寸 | 388 × 218 | 388 × 218 ✅ |
| 桌機遮罩尺寸 | 416 × 234 | 416 × 234 ✅ |
| 長寬比 | 1.778 (16:9) | 1.778 (16:9) ✅ |
| 圓角 | `24px 24px 0 0` | `24px 24px 0 0` ✅ |
| `overflow` | `clip` | `clip` ✅ |
| 內層元素 | `DIV.single-news_cover-img` | `IMG.news-card_cover-img` |

---

## 5.6　量測過程中發現的兩個新問題

### 🔴 新發現 A：54 張封面裡有 45 張**根本沒有** responsive 變體

逐張探測 `-p-500` / `-p-800` / `-p-1080` / `-p-1600`：

| 變體數 | 張數 |
|---|---|
| 0 個（只有原圖） | **45** |
| 3 個 | 8 |
| 4 個 | 1 |

那 45 張沒有變體的圖**合計 7.27 MB**。

檔名特徵是雙重 URL 編碼（`%25E5%25A6%2582…`），是從別的平台（看起來像 WordPress）
匯進 CMS 的，Webflow 從來沒有幫它們產生變體。

**影響**：這次改動拿到的 87% 節省，**幾乎全部來自 `loading="lazy"`，不是來自 srcset。**
要真的把檔案變小，必須把這 45 張重新上傳（見 `18_載入效能稽核` 的 P0-2）。
原本 P0-2 被我列為「就算 P0-1 修好也要做」，現在證據更強：**它是必要的，不是加分題。**

### 🟡 新發現 B'（**此結論已被第二次發布推翻，保留紀錄**）

> **2026-09-22 13:56 更正：** 第二次發布後，`srcset` 與 `sizes` 都正常出現了 ——
> 57 張中有 **10 張帶 srcset**，剛好就是先前探測到「有變體」的那些。
> 其餘 47 張沒有 srcset，是因為那些圖**根本沒有變體**（見新發現 A），不是 Webflow 沒輸出。
>
> 第一次發布時 0 張有 srcset，推測是圖片變體 metadata 尚未就緒，
> 或元素搬移後重新產生。**教訓：只用單次發布的輸出下結論會誤判，要再發一次確認。**

以下是第一次發布時的觀察（前提已不成立）。當時 57 個 `<img>` 全部長這樣：

```html
<img src="…_11 (1).png" loading="lazy"
     alt="115 年住宿式機構補助新制懶人包：費用、資格與如何認列一次看懂"
     class="news-card_cover-img"/>
```

**沒有 `srcset`，也沒有 `sizes`。** 57 / 57 全部如此。

原因應該是：透過 Data API 建立並綁定 CMS 欄位的 Image 元素，
Webflow 沒有帶上產生 srcset 所需的變體 metadata
（站上原有的 `.news_cover-img` 是在 Designer 裡手動建的，就有 srcset）。

**所以效能的 86.5% 節省，100% 來自 `loading="lazy"`，完全沒有 srcset 的貢獻。**
下面原本針對 `sizes="100vw"` 的分析仍然有參考價值，但要先解決「根本沒有 srcset」。

**待辦**：在 Designer 裡手動重設一次這個 Image 的 CMS 圖片綁定（點掉再綁回），
看 Webflow 會不會補上 srcset；若會，效能還能再往下走一截。

---

### 🟠 新發現 B（原始分析，前提已被 B' 推翻）：Webflow 對 CMS 綁定的 Image 輸出 `sizes="100vw"`

這是站上既有 `.news_cover-img` 的實際輸出（不是推測）：

```html
<img src="…_11 (1).png" loading="lazy" alt="" sizes="100vw"
     srcset="…-p-500.png 500w, …-p-800.png 800w, …-p-1080.png 1080w, …">
```

`sizes="100vw"` 等於告訴瀏覽器「這張圖佔滿整個視窗寬」，但實際上卡片只有 388px。
結果：Pixel 7（DPR 2.625）算出需要 412 × 2.625 = 1,082px，**比 1080w 多 2px，
所以跳過 -p-1080 直接抓原圖。**

實測修正 `sizes` 的效果：

| `sizes` | 首屏圖片 | 瀏覽器挑到的檔案 |
|---|---|---|
| `100vw`（Webflow 預設） | 1,118 KiB | 原圖、原圖、`-p-1600` |
| `(max-width:767px) 94vw, (max-width:991px) 46vw, 29vw` | **853 KiB** | 全部 `-p-1080` |

再省 24%。**待決策**：要不要在 Image 元素上加自訂 `sizes` 屬性覆蓋。
我沒有動 —— 因為加了之後發布出來的 HTML 會不會變成兩個 `sizes` 屬性，
沒有 staging 就無法驗證，我不想放一個沒驗過的東西上去。

---

## 5.7　Protocol 合規檢查

對照 GitHub repo 的規範 ＋ 站上兩份 Agent Instruction
（`rules/jubo-web-visual-system.md`、`rules/jubo-repo-source-of-truth.md`，兩份都已讀）：

| 規則 | 出處 | 結果 |
|---|---|---|
| 鐵律 1：先找再用最後才建 | `00_AI工作守則` | ✅ 先查過 `news_cover-img`（有 1.25rem 圓角會與 `.img-mask` 打架、且無 aspect-ratio），不適用才新建 |
| 鐵律 2：`folder_element` 命名 | `00_AI工作守則` | ✅ `news-card_cover-img`，folder 沿用既有的 `news-card_` |
| 鐵律 3：核心結構巢狀不可改 | `00_AI工作守則` | ✅ 完全沒碰 |
| 鐵律 4：不寫自訂 CSS／不用 Embed 做版面 | `00_AI工作守則` | ✅ 全部用 Webflow 原生樣式屬性 |
| 鐵律 5：不動共用資產 | `00_AI工作守則` | ✅ Component／utility／Variables／tag selector 一個都沒動 |
| Class 疊加上限 5 個 | `repo-source-of-truth` §5 | ✅ 新 Image 只有 1 個 class |
| Slater 鎖住的 class 不可改名 | `slater-selectors.md` / §2 | ✅ 沒有改任何 class 名稱；兩個相關 class 都不在清單上 |
| 查 CSS 要看完四個斷點 | `repo-source-of-truth` §3 | ✅ 用該文推薦的「查線上已發布 CSS」法，`single-news_cover-img` 全檔只有 1 條規則、無 media query 覆寫 |
| 重構不可以改到設計 | `repo-source-of-truth` §4 | ✅ 沒改既有共用 class 的值；只「新增」站上原本沒有的 class（該節明文允許） |
| 影像：照片用 `object-fit: cover`、16:9 | `visual-system` §11 | ✅ 兩項都符合 |
| 圖片要有 Alt Text | `visual-system` §16 | ✅ **修正了既有缺陷** —— 原本是背景圖，完全沒有 alt |
| 保留 Script Hooks（`data-*` 等） | `visual-system` §13 | ✅ 被刪的 div `attributes: []`，沒有任何 hook |
| 未獲明確授權不得 Publish | `CLAUDE.md` / `visual-system` §2 | ✅ 正式站未發布。staging 已獲授權但 API 做不到（見 5.5） |
| 自訂 class 要登錄清單 | `06_自訂Class完整清單` | ✅ 已登錄，並標註 `single-news_cover-img` 的現況 |

### 四斷點查證（2026-09-22，Terris 開啟 Designer MCP 後補做）

依 `repo-source-of-truth` §3 的要求，用 `include_breakpoints: ["main","medium","small","tiny"]`
查三個相關 class：

| class | main | medium (≤991) | small (≤767) | tiny (≤479) |
|---|---|---|---|---|
| `.news-card_cover-img`（新） | ✅ 有 | — 無覆寫 | — 無覆寫 | — 無覆寫 |
| `.single-news_cover-img`（舊） | ✅ 有 | — 無覆寫 | — 無覆寫 | — 無覆寫 |
| `.img-mask` | ✅ 有 | — 無覆寫 | — 無覆寫 | — 無覆寫 |

**三個 class 都只有 base/main，沒有任何斷點覆寫。** 這同時交叉驗證了先前用
「查線上已發布 CSS」得到的結論（`single-news_cover-img` 全檔只有 1 條規則）。

舊 div 與新 img 的屬性對照：

| 舊 `div.single-news_cover-img` | 新 `img.news-card_cover-img` | 說明 |
|---|---|---|
| `aspect-ratio: 16/9` | `aspect-ratio: 16 / 9` | 相同 |
| `background-size: cover` | `object-fit: cover` | img 的等價寫法 |
| `background-position: 50% 50%` | （`object-fit` 預設置中） | 相同效果 |
| `position: relative` | — | 舊值沒有 z-index、也沒有絕對定位的子元素，移除無影響 |
| `border-radius: 0` ×4 | — | 圓角本來就由 `.img-mask`（`overflow: clip`）負責 |
| — | `display: block` / `width: 100%` / `height: auto` | img 需要，div 預設就是 block |

→ **`visual-system` §17 的四斷點 QA 已完成。**

---

## 5.8　Staging 實機驗證（2026-09-22 13:18，Terris 發布）

Staging `jubo-health.webflow.io` 已發布；正式站確認未動（`Last Published` 仍為 09:38、
新 class 線上 0 個）。

### 效能：模擬預測準確

| | 正式站（舊） | Staging（新） | 差異 |
|---|---|---|---|
| **首屏圖片流量** | 8,864 KiB | **1,195 KiB** | **−86.5%** |
| 首屏總傳輸 | 9,433 KiB | 1,760 KiB | −81.3% |
| 首屏載入圖片張數 | 58 | **5** | −53 |
| load 完成 | 48.9 s | **10.7 s** | −78.1% |
| FCP | 2,184 ms | 1,748 ms | −20.0% |

（先前的本地模擬預測 −87.4%，實測 −86.5%，誤差 1%。）

### 四斷點版面：全數通過

| 斷點 | 遮罩尺寸 | 比例 | 圓角 | 橫向溢出 |
|---|---|---|---|---|
| main 1440 | 416 × 234 | 1.778 | `24px 24px 0 0` | 無 |
| medium 991 | 472 × 265 | 1.778 | `24px 24px 0 0` | 無 |
| small 767 | 366 × 206 | 1.778 | `24px 24px 0 0` | 無 |
| tiny 479 | 455 × 256 | 1.778 | `24px 24px 0 0` | 無 |

### Finsweet 分類篩選：正常

逐一點擊七個分類，新舊兩站筆數完全一致：

```
選購指南:0  系統攻略:0  媒體報導:16  資安隱憂:2  科技浪潮:6  長照觀點:6  最新消息:24
回到「所有文章」:57
```

### 封面欄位為空的 3 筆：沒有破圖

`血糖試紙滿百盒送機器`、`Daycare Banner Landing Page-1`、`VitalLink Banner Landing Page`
這 3 筆的 CMS 封面圖欄位本來就是空的（Terris 已確認）。

Webflow 自動補上 `w-dyn-bind-empty`，而 Webflow 基礎 CSS 有
`.w-dyn-bind-empty,.w-condition-invisible{display:none!important}`，
所以**不會出現破圖 icon**。（我的自動化檢查用 `naturalWidth===0` 判定，
那是誤判 —— 元素根本沒有被渲染。）

---

## 5.9　🔴 找到一個我造成的回歸：卡片 hover 縮放失效

### 症狀

| | hover 後封面的 transform |
|---|---|
| 正式站（舊） | `matrix(1.03, 0, 0, 1.03, 0, 0)` |
| Staging（第一版） | `none` ← **動畫沒了** |

### 根因

從線上 `webflow.schunk.d685ec5c8704b2d.js` 挖出 IX2 定義：

```js
"a-15": { id:"a-15", title:"Img Hover [In]", actionItemGroups:[{ actionItems:[
  { actionTypeId:"TRANSFORM_SCALE",
    config:{ duration:350, easing:"outQuad",
             target:{ useEventTarget:"CHILDREN",
                      selector:".single-news_cover-img",        // ← 關鍵
                      selectorGuids:["7b494da8-f4af-451f-0886-1fd815374035"] },
             xValue:1.03, yValue:1.03 } },
  { actionTypeId:"STYLE_OPACITY",
    config:{ target:{ useEventTarget:"CHILDREN",
                      selector:".news-card_headline-inner-wrap" }, value:.6 } }
]}]}
```

觸發器 `e-78`(MOUSE_OVER) / `e-79`(MOUSE_OUT) 掛在卡片連結上，
但**動畫的目標是「帶有 `.single-news_cover-img` 的子元素」**。
我把那個 div 換成 Image 元素、class 也換了，選擇器就抓不到了。

> **我先前的判斷錯在哪**：我查了 `data-w-id` 在哪個元素上（在連結上，沒錯），
> 就下結論「動畫掛在連結不是封面圖上，應該安全」。
> **我查的是觸發器的位置，不是動畫的目標。** IX2 的 target 可以是
> 「自己」「子元素（依 class）」「全站同 class 元素」—— 必須分開查。

### 為什麼不能改動畫的選擇器

同一個 `a-15` 被 `/customer-success-stories` 共用（事件 `e-80`，
target 指向 pageId `6a1cd470a75f99c148ea2cfe`）。那一頁還在用
`.single-news_cover-img`，改選擇器會連帶弄壞它。

### 採用的修法：把 IX2 的目標層還原

```
.img-mask.is-news-card
└─ div.single-news_cover-img          ← 還原，只當 IX2 的動畫目標（無 CMS 綁定）
   └─ img.news-card_cover-img          ← 真正的圖片：CMS 綁定 + lazy + alt
```

- 外層 div 被 hover 縮放 1.03×，內層 img 跟著一起縮放 → 視覺與原本一致
- 外層**沒有綁 CMS 背景圖**，所以不會再下載原圖（效能成果保留）
- `.news-card_cover-img` 同步調整：移除 `aspect-ratio`（改由外層提供），
  改為 `display:block / width:100% / height:100% / object-fit:cover`
- Navigator 顯示名稱設為 `Cover Hover Target (IX2 a-15)`，避免下一個人再刪掉它

### ✅ 驗證通過（2026-09-22 13:56 第二次 staging 發布）

| | 正式站（舊） | Staging（修復後） |
|---|---|---|
| 封面 hover transform | `matrix(1.03, 0, 0, 1.03, 0, 0)` | `matrix(1.03, 0, 0, 1.03, 0, 0)` ✅ |
| 標題區 hover opacity | 0.6 | 0.6 ✅ |
| 分類篩選各類筆數 | 0/0/16/2/6/6/24 | 0/0/16/2/6/6/24 ✅ |

`a-15` 的兩個 actionItem（封面縮放 ＋ 標題淡化）都恢復了。

### 效能：修復後反而更好

| | 正式站 | Staging | 差異 |
|---|---|---|---|
| **首屏圖片流量** | 8,709 KiB | **926 KiB** | **−89.4%** |
| 首屏總傳輸 | 9,278 KiB | 1,492 KiB | −83.9% |
| 首屏圖片張數 | 58 | 6 | −52 |
| load 完成 | 47.9 s | **9.4 s** | −80.4% |
| FCP | 1,908 ms | **1,232 ms** | −35.4% |

多包一層 div 沒有任何效能代價（那層不綁 CMS、不下載圖片）。

### 給後續工作的教訓

改動任何元素前，**IX2 要查兩件事，不是一件**：

1. 觸發器掛在哪個元素（`data-w-id`）
2. **動畫的 target 用什麼選擇器** —— 到線上的
   `webflow.schunk.*.js` 搜該元素的 w-id，找到 `actionListId`，
   再搜該 actionList 的定義，看 `target.selector`

---

## 6. 尚未完成 / 待決策

| 項目 | 狀態 |
|---|---|
| `/news` 卡片封面 | ✅ 已改，未 publish |
| 量測改善幅度 | ✅ 最終實測：首屏圖片 −89.4%、總傳輸 −83.9%、load 47.9s→9.4s、FCP −35.4% |
| 四斷點樣式 QA | ✅ 已完成（樣式查詢 ＋ staging 實機版面，四個斷點全過） |
| Finsweet 分類篩選 | ✅ 新舊兩站筆數完全一致 |
| 卡片 hover 動畫 | ✅ 已修並驗證通過（封面縮放 1.03 ＋ 標題淡化 0.6 都恢復） |
| Webflow 是否輸出 srcset | ✅ 10/57 有（就是有變體的那些）；其餘 47 張無變體可用 |
| Designer 畫布截圖 | ❌ 做不到：Collection List 內的元素一律回傳空結果，清單外的元素可正常截 |
| 文章內頁「相關新聞」列表（`.single-news_cover-img`，每頁 23 個 × 40 頁） | ⏸ 未動，等 /news 驗證過再做 |
| 首頁與 6 頁的 `.cases-img`（46 個，含 842 KiB 的 `cases-3.png`） | ⏸ 未動 |
| `single-news_cover-img` class 的清理 | ⏸ 等上面兩項都轉完才能刪 |

### ⚠️ 給任何人的提醒

**目前 Designer 裡有未發布的變更。** 只要有人為了別的事情按下 Publish，
這個改動就會一起上線。要嘛盡快驗證後正式發布，要嘛先 rollback。

### 發布後要驗的清單

1. 卡片圖沒破、比例仍是 16:9、圓角遮罩正常
2. `<img>` 確實帶 `srcset` / `sizes` / `loading="lazy"`
3. Webflow 產生的 `sizes` 值是否合理（若是 `100vw` 會挑到過大的變體，要手動調）
4. 分類篩選（Finsweet）仍正常
5. 卡片 hover 動畫（IX2）仍正常
6. 重跑效能量測：目標 `/news` 9.43 MB → 約 1 MB
