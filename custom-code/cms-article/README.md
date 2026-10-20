# CMS 文章模板的自訂程式碼

這個資料夾是 Webflow 上 CMS 文章模板 embed 的**原始碼**。
Webflow 裡的 embed 是部署品，兩邊不一致時以這裡為準。

## 檔案

| 檔案 | 用途 |
|---|---|
| `embed-news.html` | `/news` 模板 embed 的完整內容（可整段貼回 Webflow） |
| `embed-story.html` | `/customer-stories` 模板 embed 的完整內容 |
| `_style-common.css` | 兩個模板共用的樣式（表格、引言卡片、FAQ 外觀） |
| `_article-links.css` | 文章文字連結的深青綠色、底線、hover 與鍵盤焦點；只由兩個模板 head 載入，排除按鈕與圖片連結 |
| `_faq-icon-state.css` | 新版 FAQ embed 的加減圖示與鍵盤焦點狀態；只由新聞模板 head 載入 |
| `home-security-banner.html` | 文章版資安入口；沿用首頁 8 個原始標章與技術夥伴資產，主次分層及醒目的白色 CTA；基本排版／色彩在 HTML 行內保留 |
| `_home-security-banner.css` | 限 `.cms-security_banner` 的 hover／focus 狀態，不修改首頁或共用按鈕樣式 |
| `_caption.css` | 圖說玻璃條（只在 story 模板） |
| `faq-accordion.js` | FAQ 展開動畫，`embed-news.html` 內嵌的就是這份 |
| `page-head-*.html` | 貼進 Webflow「頁面自訂程式碼 → head」的內容 |
| `page-footer-*.html` | 貼進「頁面自訂程式碼 → footer」的內容 |
| `_cover-aspect-*.css` | 封面圖比例對照表（自動產生） |
| `_img-aspect-*.css` | 內文圖片比例對照表（自動產生） |
| `_page-head-existing-news.html` | news head 區塊裡既有的報名按鈕樣式，不要刪 |
| `_defer-thumbs-news.html` | 相關文章縮圖延後載入（只在 news，為了 LCP） |
| `build.sh` | 由上面的零件組出 `page-head-*` / `page-footer-*` |
| `tools/gen-cover-aspect.py` | 產生封面比例對照表 |
| `tools/gen-img-aspect.py` | 產生內文圖片比例對照表 |
| `tools/measure-dims.mjs` | 用瀏覽器量圖片實際像素尺寸 |
| `tools/data/` | 上次產生對照表用的輸入（下次可以只量新增的圖） |

## 部署位置

| 模板 | Webflow page ID | HtmlEmbed element ID |
|---|---|---|
| `/news` | `69f82ba2b2602e6d6594d696` | `64d25a34-232e-f1bf-fedd-ab01119a2b25` |
| `/customer-stories` | `6a1c22366d4d91ecdbddfca6` | `a26dcb32-96a4-8bf4-16dd-15fefc5d6cee` |

圖片比例對照表放在**頁面自訂程式碼**，不在 embed 裡：

| 模板 | head | footer |
|---|---|---|
| `/news` | 報名按鈕樣式 + 封面比例（83 筆）+ 縮圖延後載入 | 內文圖片比例（99 筆） |
| `/customer-stories` | 封面比例（23 筆） | 內文圖片比例（59 筆） |

另外在 Designer 上，兩個模板的封面 Image 元素各加了兩個自訂屬性
`loading="eager"` 與 `fetchpriority="high"`（首屏的 LCP 元素不該是 lazy）。
這是這次唯一動到 Designer 的地方，元素 ID 記在`docs/projects/cms-article/history/CMS文章閱讀表面_news與customer-stories.md` §29-3。

會拆開是因為全部塞進 embed 會到 23KB，超過工具單次寫入上限（約 13KB）。

兩個模板的差異：news 有 FAQ 手風琴腳本，story 沒有（story 目前都沒有 FAQ）。
story 的 embed 另有第 5 節「圖片說明玻璃條」（`_caption.css`），只在該模板生效，
而且沒有任何規則選到 img。

## FAQ 動畫的參數怎麼來的

不是自己挑的。首頁 FAQ 是外包用 Webflow 互動（IX2）做的，
從 `Webflow.require('ix2').store` 讀出 `.faq5_answer` 的 `STYLE_SIZE` 設定：

```
展開：duration 400, easing "ease", height → AUTO
收合：duration 400, easing "ease", height → 0px
```

`faq-accordion.js` 就用同一組 400ms / `ease`，讓文章 FAQ 跟首頁一致。

## 圖片比例對照表：新文章上線後要重跑

封面圖與內文圖片的 `aspect-ratio` 是**逐張列出來的**，新文章不在表上，
就會回到「圖片載入時整篇往下掉」的狀態（不會壞，但 CLS 會回來）。
所以每次一批新文章上線後跑一次：

1. 從 CMS 讀出每篇的 `cover-image.url` 與內文 `<img>` 的 src
   （這步要 CMS 存取權，透過 Webflow MCP 做）。
2. `node tools/measure-dims.mjs urls.json dims.json` 量實際尺寸。
3. 整理成產生器要的格式，跑 `tools/gen-cover-aspect.py`
   與 `tools/gen-img-aspect.py`，輸出覆蓋 `_cover-aspect-*.css`
   與 `_img-aspect-*.css`。
4. `bash build.sh`，把 `page-head-*.html` / `page-footer-*.html`
   貼回 Webflow 的頁面自訂程式碼，發布後比對線上內容。

`tools/data/` 存了這次用的輸入，下次可以只量新增的圖片再合併。

**key 一定要用完整 24 碼資產 ID。** 同一批上傳的圖片前 12 碼會相同，
截短會讓一條規則選到好幾張比例不同的圖，把圖片拉變形（2026-09-22 踩過）。
產生器裡有 assert 會擋下來。

為什麼用 `aspect-ratio` 而不是 `width`/`height` 屬性、
為什麼只修封面反而更糟：見 `docs/projects/cms-article/history/CMS文章閱讀表面_news與customer-stories.md` §27。

## 改動後要做的事

1. 改這裡的檔案。
2. embed 改動 → 把 `embed-news.html` 整段貼回對應的 HtmlEmbed。
   比例對照表改動 → `bash build.sh` 後貼回頁面自訂程式碼。
3. 取得明確發布授權後發布 staging，確認線上內容與這裡逐字相同再收工。
   （Webflow 發布後 CDN 約需 20–60 秒才會更新，太早比對會拿到舊版。）

### 文章連結（2026-10-20）

使用者授權讓整個 CMS 文章文字連結可辨識。採用既有 `primary/Ocean` 作文字色與底線，白底對比約 7.5:1；移入改為 `neutral/black` 並加粗底線，鍵盤焦點另有外框。不得改成白底上的亮青綠 `primary/accent` 文字，因其文字對比不足。

樣式只作用於這兩個模板的 `.richtext`，不修改全站 `a`、Variables、Slater 或共用 Component。不逐篇在 CMS rich text 內加樣式；透過 `build.sh` 重建兩個 page head。部署前須即時讀取 Webflow 既有 head，保留所有其他程式。若 head 與 repo 有差異，先比對，不直接整份覆蓋。

### FAQ 的 CMS 編輯器顯示（2026-10-20）

CMS 編輯器不一定載入模板的共用 CSS。若只留下 `<details style="margin:0">`，編輯器會顯示成沒有卡片間距的問題文字。文章 FAQ 需以真正的 `w-embed` 包住語意化 details/summary，並在 HTML 本身保留卡片白底、1rem 圓角、細框、summary 內距與 answer-inner 內距作為基本外觀；不得將 style/script 直接寫進 rich text。

圖示沿用既有 `.aeo-faq__icon`，透明背景且沒有圓底，兩條行內 span 使用官網青綠至紫色線性漸層；直線以 `data-faq-line="vertical"` 標記，避免舊版模板直線旋轉規則干擾。`_faq-icon-state.css` 依 aria-expanded 或原生 open 狀態旋轉整個圖示 45 度，與官網標準 FAQ 一致。展開動畫仍使用既有 `faq-accordion.js` 的 400ms/ease，不另塞第二套事件處理器。未載入模板 CSS/JS 時，圖示仍是正確配色且原生 details 可展開與閱讀。**舊版紫色實心圓底不再使用**。

### 文章資安入口（2026-10-20）

使用者先要求沿用首頁資安 banner，之後明確要求重新設計以凸顯按鈕與 logo。現行 `home-security-banner.html` 為文章專用版，沿用首頁 8 個原始標章／合作夥伴資產，非重繪 logo。H3 接續文章 H2，白色高對比 CTA 與可點擊標章區均導向 `/security`；ISO 27001、ISO 27701、Google Cloud、Cloudflare 四個主標章放大，其餘四個保留在下方。驗證、法規遵循與技術夥伴以文字區別，不能全部宣稱為資安認證。

放置方式：以 `w-embed` 包住 `.cms-security_banner`，只在智齡介紹段落末尾使用。核心排版、深色漸層、白色按鈕與標章尺寸在 HTML 行內保留，避免單篇 CMS 發布後仍依賴尚未發布的模板 CSS。Flex 可自然由四欄換為兩欄，無需頁面 CSS 或 JS；`_home-security-banner.css` 只補 hover、鍵盤焦點及減少動態偏好。不修改首頁 class、共用按鈕或 Component。

## 已知未涵蓋

`/customer-stories` 模板目前**沒有**這段 FAQ 動畫腳本，因為站上的
customer story 都沒有 FAQ。若日後 story 要放 FAQ，把 `faq-accordion.js`
與 `.jb-faq__panel` 那段 CSS 一併加進 story 的 embed 即可。
