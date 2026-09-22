# CMS 文章模板的自訂程式碼

這個資料夾是 Webflow 上 CMS 文章模板 embed 的**原始碼**。
Webflow 裡的 embed 是部署品，兩邊不一致時以這裡為準。

## 檔案

| 檔案 | 用途 |
|---|---|
| `embed-news.html` | `/news` 模板 embed 的完整內容（可整段貼回 Webflow） |
| `embed-story.html` | `/customer-stories` 模板 embed 的完整內容 |
| `_style-common.css` | 兩個模板共用的樣式（表格、引言卡片、FAQ 外觀） |
| `faq-accordion.js` | FAQ 展開動畫，`embed-news.html` 內嵌的就是這份 |

## 部署位置

| 模板 | Webflow page ID | HtmlEmbed element ID |
|---|---|---|
| `/news` | `69f82ba2b2602e6d6594d696` | `64d25a34-232e-f1bf-fedd-ab01119a2b25` |
| `/customer-stories` | `6a1c22366d4d91ecdbddfca6` | `a26dcb32-96a4-8bf4-16dd-15fefc5d6cee` |

兩個模板的差異：news 有 FAQ 手風琴腳本，story 沒有（story 目前都沒有 FAQ）。
story 曾經有一段「圖片說明玻璃條」的 CSS 與腳本，2026-09-22 已移除
（見 Jubo官網AI開發規範/18 §23）。

## FAQ 動畫的參數怎麼來的

不是自己挑的。首頁 FAQ 是外包用 Webflow 互動（IX2）做的，
從 `Webflow.require('ix2').store` 讀出 `.faq5_answer` 的 `STYLE_SIZE` 設定：

```
展開：duration 400, easing "ease", height → AUTO
收合：duration 400, easing "ease", height → 0px
```

`faq-accordion.js` 就用同一組 400ms / `ease`，讓文章 FAQ 跟首頁一致。

## 改動後要做的事

1. 改這裡的檔案。
2. 把 `embed-news.html` 整段貼回 Webflow 對應的 HtmlEmbed。
3. 發布 staging，確認線上的 `<style>`／`<script>` 與這裡逐字相同再收工。
   （Webflow 發布後 CDN 約需 20–60 秒才會更新，太早比對會拿到舊版。）

## 已知未涵蓋

`/customer-stories` 模板目前**沒有**這段 FAQ 動畫腳本，因為站上的
customer story 都沒有 FAQ。若日後 story 要放 FAQ，把 `faq-accordion.js`
與 `.jb-faq__panel` 那段 CSS 一併加進 story 的 embed 即可。
