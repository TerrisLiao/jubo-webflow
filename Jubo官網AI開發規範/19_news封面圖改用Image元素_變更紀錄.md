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

## 6. 尚未完成 / 待決策

| 項目 | 狀態 |
|---|---|
| `/news` 卡片封面 | ✅ 已改，未 publish |
| 量測改善幅度 | ⏸ **需要先發布到 `.webflow.io` staging 才能測**，等 Terris 授權 |
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
