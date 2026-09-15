# 18 CMS 文章中文排版修正紀錄

> 2026-09-15。對象：`.richtext`（客戶成功案例、新聞中心等所有 CMS 文章共用）。
> 觸發：Terris 回報客戶文章的 H4 行距過窄、整體難以閱讀。

## 問題診斷

### 1. 行高為零行距

`.richtext` 底下 h1～h6 **全部** `line-height: 100%`，即行高等於字級、沒有任何行距。
這組數值是模板原本給西文用的：西文字母的實際佔高小於字級，100% 尚可；
中文是方塊字幾乎填滿字身框，100% 會讓上下行相黏。字級越大越明顯，
2rem 的 H4 最嚴重。

### 2. 中文字型不受控（更關鍵）

線上實際載入的字型只有一套：

```js
WebFont.load({ google: { families: ["Poppins:300,400,500,600,700"] } });
```

`body` 指定 `font-family: Poppins`，而 **Poppins 是純拉丁字型，沒有中文字符**。
`.richtext` 原本未指定 font-family，於是中文的解析路徑是：

```
.richtext（未指定）→ body 的 Poppins（無中文）→ 瀏覽器預設 sans-serif
```

Windows 的預設 sans-serif 常為 Arial，Arial 同樣無中文，繼續往下 fallback，
**有機會落到新細明體**（明體、襯線），在螢幕上本來就糊。
中文字型因此逐台裝置不同且不可控，這對「難以閱讀」的影響可能大於行高。

### 3. 站上多處 `Noto Sans TC` 宣告其實無效

`.heading-2`、`.heading-3`、`.heading-4`、`.jp3-page`、`.jbc-v3` 都寫了 `Noto Sans TC`，
但該字型**未被載入**，且 macOS／Windows 預設都沒有內建，實際仍會 fallback。
這些宣告目前形同虛設，待後續一併修正為有效堆疊。

## 設計前提

Terris 當初刻意不指定中文 font-family，是為了避免載入 CJK webfont 拖慢速度
（繁中字集即使 subset 仍達數 MB）。**這個判斷保留**，本次修正不新增任何字型下載。

關鍵區分：**在 CSS 列出字型名稱不等於下載字型**。只有被加入 Webflow 字型清單
或以 `@font-face` 宣告的才會下載；列出使用者裝置上已有的系統字型，成本為 0 KB，
換來的是可控的優先順序。

## 已套用（2026-09-15，未 Publish）

### 字型堆疊

`.richtext` 新增：

```css
font-family: Poppins, "PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif;
```

| 字型 | 供應來源 | 下載成本 |
|---|---|---|
| Poppins | 已載入的 Google webfont（英數） | 已付，未增加 |
| PingFang TC | macOS / iOS 內建 | 0 KB |
| Microsoft JhengHei | Windows 內建 | 0 KB |
| Noto Sans TC | Android / Linux 內建 | 0 KB |

### 行高

| 選擇器 | 字級 | 原行高 | 新行高 |
|---|---|---|---|
| `.richtext h1` | 3rem | 100% | 1.25 |
| `.richtext h2` | 2.5rem | 100% | 1.3 |
| `.richtext h3` | 2.25rem | 100% | 1.35 |
| `.richtext h4` | 2rem | 100% | 1.4 |
| `.richtext h5` | 1.75rem | 100% | 1.45 |
| `.richtext h6` | 1.5rem | 100% | 1.5 |

字級越小行高越寬，符合中文閱讀慣例。字級、字重、margin 本輪未動。

## 尚未執行（第二階段待評估）

看過第一階段效果後再決定是否調整字級與字重：

| 層級 | 建議字級 | 建議行高 | 建議字重 |
|---|---|---|---|
| h2 | 1.75rem | 1.4 | 700 |
| h3 | 1.5rem | 1.45 | 700 |
| h4 | 1.25rem | 1.5 | 700 |
| h5 | 1.125rem | 1.6 | 700 |
| h6 | 1rem | 1.6 | 700 |

理由：現行 h2 2.5rem／h3 2.25rem／h4 2rem，相鄰層級僅差 0.25rem，
且六個層級 `font-weight` 全為 400，中文在同字重下差 4px 幾乎看不出層級。
中文的層級感主要靠**字重**而非字級。

**字重選 700 而非 600**：Poppins 雖已載入 600，但中文走系統字型，
系統中文字型多半僅有 400／700 兩個真實字重，600 會被瀏覽器合成（faux bold）而變形。

## 其他觀察

CMS 文章中出現以 H4 排三行長敘述的用法。標題層級應為短標題（中文約 15–20 字內），
長敘述應改用段落或 blockquote；此為編輯習慣問題，需調整既有文章內容，非樣式可解。

## 驗證狀態

- 六個行高與 `.richtext` 字型堆疊均由 `update_style` 回傳的完整屬性確認寫入。
- **視覺未驗證**：`element_snapshot_tool` 對 RichText 元素回傳失敗，CMS 模板頁也無法直接截圖。
- **尚未 Publish**，線上仍是舊值。
