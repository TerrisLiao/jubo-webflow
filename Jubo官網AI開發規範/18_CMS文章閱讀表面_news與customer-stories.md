# 18｜CMS 文章閱讀表面 — `/news` 與 `/customer-stories`

- 日期：2026-09-21
- 站台：`jubo-health.com`（site id `69ec2b02daa2e79f1da8772a`）
- 委託：Terris —「漸層背景讀起來有點吃力，內文加一張白色承載面（≥92% 不透明）、配 border-radius 與極輕陰影；範圍只做 news 與客戶成功故事」
- 狀態：**已修改，未 Publish**

---

## 1. 背景：為什麼要加承載面

稽核 `/news` 文章頁時實測（線上已發布版本，2026-09-21）：

- 全站背景層 `.home-gradient-bg` 是 `position: fixed` 的 HTML Embed，跑三組
  5s／6s／7s 的 `infinite alternate` 動畫，再套 `filter: blur(50px)`。
- 內文容器 `.news-content_wrap` 的 computed `background-color` 是 `rgba(0,0,0,0)`
  —— **內文沒有任何承載面，直接貼在會流動的漸層上。**
- 取樣 8 個時間點量內文底下的背景亮度：`#151717` 文字的對比最差 9.4:1、典型 16.9:1。
  **對比度遠超 WCAG AAA（7:1），所以這不是無障礙問題**，是背景亮度持續飄移、
  眼睛要一直重新校正造成的疲勞。

> 漸層本身是全站視覺資產（首頁、產品頁、方案頁都有），不動它；
> 改的是「漸層與內文的關係」——漸層留在卡片外緣當畫框，閱讀區給一張乾淨的紙。

---

## 2. 已執行的修改

只改兩個既有 custom class 的樣式。**沒有新增任何 class、沒有動元素結構、沒有動任何共用資產。**

| 模板 | 頁面 id | class | 元素 id |
|---|---|---|---|
| 新聞中心s Template | `69f82ba2b2602e6d6594d696` | `.news-content_wrap` | `02a736f9-3549-017e-5f19-ef96992e9024` |
| 客戶成功案例s Template | `6a1c22366d4d91ecdbddfca6` | `.customer-story_content-wrap` | `75659a3d-f569-a54e-8165-bcd80d783497` |

兩邊套用**完全相同**的一組值：

| 屬性 | main（桌機） | medium（≤991） | small（≤767／含 tiny） |
|---|---|---|---|
| `background-color` | `--neutral--white`（變數） | 繼承 | 繼承 |
| `padding`（四邊） | `--desktop-spacer--medium` 4rem | `--tablet-spacer--medium` 3rem | `--mobile-spacer--regular` 1rem |
| `border-radius`（四角） | `--desktop-spacer--xsmall` 1rem | 繼承 | 繼承 |
| `box-shadow` | `0 4px 24px 0 hsla(214.84, 17.32%, 64.90%, 0.08)` | 繼承 | 繼承 |

- 顏色與間距**全部綁 Variables**，符合鐵律 4。
- `border-radius` 沿用 `.card-wrapper` 用的同一個變數，與站上既有卡片一致。
- `.customer-story_content-wrap` 原有的 `width:100%` / `max-width:100%` 保留未動。

### 2-1. 陰影為什麼是硬寫值

原本要沿用站上既有的 `.shadow-two` utility（`0 4px 24px 0 hsla(214.84,17.32%,64.90%,0.08)`），
把它當第二個 class 疊上去（2 個 class＝理想）。但 `data_element_tool > set_style` 回報
`One or more styles not found: news-content_wrap, shadow-two` —— 即 `17_系統登入頁` §5
記錄過的工具限制。

替代路徑（`data_whtml_builder` 重建元素）對「內含 CMS 綁定 Rich Text」的容器風險過高，
因此改成**把 `.shadow-two` 的數值原封不動寫進 custom class**。數值與 utility 完全相同，
站上也有前例（`.card-wrapper.is-resource-hub`、`.card-wrapper.is-login-hub` 都硬寫陰影；
Webflow 的 box-shadow 本來也不能綁色彩變數）。

> 若日後 `set_style` 的限制解除，可改回疊 `.shadow-two` 並清掉 custom class 上的
> `box-shadow`，視覺零差異。

---

## 3. 順帶解掉的問題

加 padding 後，行長自然收斂到中文舒適區間：

| 位置 | 改前文字寬 | 改後文字寬 | 改後約略字數／行 |
|---|---|---|---|
| `/news` 桌機 | 896px（≈49 全形字） | 768px | ≈42 字 |
| `/customer-stories` 桌機 | 846px | 718px | ≈40 字 |
| `/news` 手機 390px | 366px（左右僅 12px 留白，幾乎貼邊） | 334px | ≈18.5 字 |

手機的 `padding-global` 是共用 utility（`--mobile-spacer--small` = 12px），依鐵律 5 不動；
卡片自己的 1rem padding 等於補回了呼吸空間。

---

## 4. 影響範圍確認

兩個 class 都**只用在各自的 CMS 模板、各一個實例**。逐頁抓線上 HTML 確認：

```
/  /news  /company  /careers  /contact  /customer-success-stories
/resources/education  /products/vitaltrolley  /solutions/residential-care
/ai/jubo-ai  /ecosystem/jubo-care  /resources/training          → 皆 0 個
/news/ltc-guide                                  → news-content_wrap × 1
/customer-stories/…-jubostory03                  → customer-story_content-wrap × 1
```

`.news-content_wrap` 在改動前於線上 CSS 與 Slater CSS 中**完全沒有任何規則**
（Webflow 不輸出空 class），所以這次是純新增，不會覆蓋既有樣式。

---

## 5. 驗證方式與限制

**已驗證**

- 改後用 `query_styles` 讀回兩個 class 的四個斷點（`main`／`medium`／`small`／`tiny`），
  屬性與變數綁定皆與上表相符。
- 視覺預覽：用 Playwright 在**線上頁面注入與 Webflow 端完全相同的 CSS**，
  量到 computed 值為 `padding 64px`／`radius 16px`／`bg rgb(255,255,255)`／
  `shadow rgba(150,163,181,0.08) 0 4px 24px`，桌機 1440、手機 390、
  客戶故事 1440 三種情境皆正常。
- 封面圖與卡片的銜接：封面圖 896px 全寬，與卡片外緣切齊，中間隔
  `.news-content_component` 既有的 4rem gap，漸層在縫隙露出，讀起來是「圖—紙」兩塊。
- 客戶故事的兩欄版面：左欄側邊清單留在漸層上（讀作導覽），右欄成為白色閱讀卡，
  欄位層級反而更清楚。

**驗證限制**

- **頁面未 Publish**，以上視覺全部來自「線上舊版 ＋ 注入等值 CSS」的模擬，
  不是 Webflow 實際輸出。正式外觀請在 Designer 或 Preview 目視確認。
- 客戶故事在 ≤991px 時 `.customer-story_template-left-wrap` 是 `display:none`
  （改走 `is-mobile` 版本），**平板／手機版的客戶故事未取得預覽截圖**。
- 未測 Safari 與實機。

---

## 6. 刻意沒做的

- **沒有新增 class。** 原本考慮開一個共用的 `reading-surface_card` 給兩邊疊，
  但依鐵律 1「先找、再用」，既有的兩個 `folder_element` class 本來就各自單一用途、
  命名也正確，直接補樣式最乾淨，元素上的 class 數維持 1 個。
- **沒有動 `.card-wrapper`。** 它被 Slater 鎖住（見 `00` §6-6），且 mega-menu 的
  `is-1`～`is-4` 變體用絕對定位，不適合再掛文章用途的變體。
- **沒有用毛玻璃（`backdrop-filter`）。** 站上 `.card-wrapper.is-login-hub` 是
  82% 白＋`blur(22px)`，那是短卡片的處理；長文閱讀區 Terris 指定 ≥92%，
  直接用 100% 的 `--neutral--white` 最穩，也不會再多一層合成成本。
- **沒有碰漸層層本身。** `filter: blur(50px)` 的效能問題（實測關掉 blur 幀率翻倍）
  仍未處理，屬全站範圍，等 Terris 決定。

---

## 7. 待 Terris 決定

1. **未 Publish。** 兩個 CMS 模板的改動要發布才會上線。
2. **手機卡片 padding 目前是 1rem（16px）。** 這是在「12px 頁面留白不能動」的前提下
   取的平衡值；若覺得太緊或太鬆，可在 `small` 斷點單獨調整。
3. **客戶故事的卡片只包內文**（h1 與封面圖留在卡片外，與 `/news` 一致）。
   若希望連標題、封面圖一起包進白卡，改掛到 `.customer-story_template-right-wrap` 即可。
4. **全站漸層的 `filter: blur(50px)`** 是否要一併優化（改用預先模糊的底圖或更柔的
   radial-gradient 取代 runtime blur，並補 `prefers-reduced-motion` 降級）。

---

## 8. 第二輪調整：承載面透明度與標題級距

- 日期：2026-09-21
- 委託：Terris —「白色可以再透明一點點，標題我覺得都太大」
- 狀態：**已修改，未 Publish**

### 8-1. 承載面改為 92% 白

新增變數（依既有 `neutral/white-30`、`neutral/white-50` 的命名慣例）：

| 變數 | id | 值 |
|---|---|---|
| `neutral/white-92` | `variable-b4b21da1-1cc5-4eb9-f31d-78f2c7f2ad9f` | `hsla(0, 0.00%, 100.00%, 0.92)` |

`.news-content_wrap` 與 `.customer-story_content-wrap` 的 `background-color`
由 `--neutral--white` 改綁 `--neutral--white-92`。

**沒有加 `backdrop-filter`。** 漸層本身已經是 `blur(50px)` 的重擔（見 §6），
再疊一層毛玻璃會再多一次合成。8% 的透出量足夠讓卡片不像硬白色塊。

> 漸層在卡片底下的亮度區間約 `#f8f8f8`～`#edf9fa`（約 11 階），
> 透出 8% 後的實際飄移約 0.9 階，肉眼無法察覺，不會把 §1 的問題帶回來。

### 8-2. 內文標題級距（`.richtext h1`～`h6`）

以內文 18px 為基準重訂級距，只改 `font-size`，`line-height` 與 `margin` 不動：

| | 改前 main／medium／small | 改後 main／medium／small |
|---|---|---|
| `h1` | 3 / 2.75 / 2.5rem | **2.25 / 2.125 / 2rem** |
| `h2` | 2.5 / 2.25 / 2rem | **2 / 1.875 / 1.625rem** |
| `h3` | 2.25 / 2 / 1.75rem | **1.5 / 1.5 / 1.375rem** |
| `h4` | 2 / 1.75 / 1.5rem | **1.25 / 1.25 / 1.125rem** |
| `h5` | 1.75 / 1.5 / 1.25rem | **1.125rem（全斷點）** |
| `h6` | 1.5 / 1.25 / 1rem | **1rem（全斷點）** |

改後 h2 = 32px，約為內文 18px 的 1.78 倍，是一般長文合理的段落層級。

> ⚠️ **這一項的影響範圍超出 news／customer-stories。**
> `.richtext` 是全站共用 class（首頁 7 個實例、`/company` 3 個、`/careers` 1 個、
> `/resources/education` 1 個）。逐頁用 DOM 查詢實際確認後，**真正含標題的只有
> `/resources/education` 的「作者介紹」卡片**，其中一個 `h3`（人名「張麗君」）
> 由 36px 變成 24px。其餘頁面的 `.richtext` 區塊內沒有 heading，不受影響。
>
> 之所以無法只鎖定兩個模板：`data_style_tool > update_style` **只能更新既有的
> 巢狀 tag 樣式，不能新建**。嘗試建立 `.news-content_wrap h2` 回報
> `Style "news-content_wrap > h2" not found`，因此 `.richtext hN` 是唯一路徑。

### 8-3. 文章主標題（`/news`）

`/news` 文章的 `h1` 原本只掛 `.text-align-center`，字級來自 **`h1` tag selector**
（5rem／80px，weight 300）。依鐵律 5 不能改 tag selector，也不能改共用 utility，
因此新增一個 `is-` combo：

```
.text-align-center.is-article-title
  main 3.25rem（52px）｜medium 2.75rem｜small 2.25rem｜tiny 2rem
```

掛到 element `18c7f230-843d-6cbc-38cd-2157ba455bc5`（`styleNames: text-align-center, is-article-title`）。
**用 `set_style` 換 class，不是重建元素，CMS 文字綁定未受影響。**

> 這次 `set_style` 成功，與 §2-1 失敗的情況不同 —— 差別在於本次傳入的兩個名稱
> 都能解析到實際存在的樣式（`text-align-center` 全域 ＋ 新建的 combo）。

### 8-4. 相關文章區標題（`/news`）

主標題縮到 52px 後，頁尾「相關文章／掌握更多長照科技趨勢」的 `h2`
（同樣只掛 `.text-align-center`，吃 `h2` tag selector 的 3.8rem／60.8px）
**變得比 h1 還大**，階層倒置。新增第二個 combo：

```
.text-align-center.is-section-title
  main 2.5rem（40px）｜medium 2.25rem｜small 2rem
```

掛到 element `04280ff1-23c0-d6be-62c9-1ad5cbe16687`。
現在階層是 H1 52px ＞ 區塊 H2 40px ＞ 內文 h2 32px ＞ 內文 18px。

### 8-5. 客戶故事主標題

`.client-story_template-h1`（單純 global class，無 combo）：

| 斷點 | 改前 | 改後 |
|---|---|---|
| main | 3.8rem（60.8px） | **2.75rem（44px）** |
| medium | 2.75rem | **2.5rem** |
| small | 2rem | 2rem（不動） |

### 8-6. 新增的 class 與變數彙整

| 項目 | 名稱 | 說明 |
|---|---|---|
| 變數 | `neutral/white-92` | 對齊既有 `white-30`／`white-50` 命名 |
| Combo | `.text-align-center.is-article-title` | CMS 文章主標 |
| Combo | `.text-align-center.is-section-title` | 頁內區塊標題 |

兩個 combo 都是 `is-` 前綴變體，符合鐵律 2；元素上的 class 數皆為 2（理想範圍）。

### 8-7. 驗證與限制

**已驗證**：三個樣式（兩個 combo ＋ `client-story_template-h1`）四斷點讀回，值正確；
兩個元素的 `styleNames` 讀回確認 class 已掛上。用注入等值 CSS 的方式在線上頁面預覽，
桌機主標 52px 單行、相關文章區 40px、內文 h2 32px，階層正確。

**驗證限制**：仍**未 Publish**，預覽是模擬非 Webflow 實際輸出。
客戶故事在 ≤991px 的版面（側欄切換成 `is-mobile`）依然沒有取得預覽。未測 Safari 與實機。

### 8-8. 刻意沒做的 / 仍然偏大的

- **`CTA Section #1` 的標題仍是 60.8px。** 「一起打造更有效率的工作模式」屬於共用
  Component（id `6480c081-4cf2-3cca-2e61-b3d2258e42bb`），全站頁尾都在用，依鐵律 5
  未動。結果是：文章頁最下方那顆 CTA 標題仍比文章 H1 大。其他頁面的 h1 是 80px
  所以沒有倒置問題，**只有 CMS 文章頁會看到這個落差**。
- **標題字重維持 300。** Terris 這次只提「太大」，未提字重。
  52px 的 CJK Light 字重比 80px 時好很多，但若之後覺得筆畫仍偏細，
  在兩個 combo 上加 `font-weight: 400` 即可，不影響其他頁面。

---

## 9. CMS 文章表格樣式（T2 重點欄版）

- 日期：2026-09-21
- 委託：Terris —「T2 寫進 css」
- 狀態：**已修改，未 Publish**

### 9-1. 問題

`/news/ai-transformation-culture` 的對照表是 **CMS 內文裡手寫的 HTML Embed，每一格都有 inline style**。
實測 computed 值：

| 項目 | 原值 | 問題 |
|---|---|---|
| 外框底色 | `#ffffff`（純白） | 比文章白卡（92%）**更白**，出現一塊異色 |
| 外框圓角 | `32px` | 卡片是 16px，不同調 |
| 表頭底色 | `#f8f8f8` | 與白色只差 3%，等於看不見 |
| 分隔線 | `rgba(21,23,23,0.6)` | 60% 黑，對 hairline 太重 |

**症狀是「表頭太淡、線太深」，剛好相反。** 另外「效益數據與說明」是這張表的結論欄，
卻與其他欄樣式完全相同，讀者沒有視覺著力點。

### 9-2. 外部對照（Mobbin）

掃過 Wispr Flow、Humble、Vanta、Serus、Stripe、GitHub 等 SaaS 的對照表，共同法則：

- **只強調「結果」那一欄**，其餘保持安靜（Wispr Flow 的 Savings 欄、Serus 的 With Serus 欄、Humble 的自家欄）
- **分隔線一律 5–12% 的淡灰**，沒有任何一家用到 60%

採用 Wispr Flow / Serus 的「重點欄」路線。

### 9-3. 實作位置

Webflow Rich Text **原生不支援表格**，所以表格只能是 HTML Embed —— 這不算違反鐵律 4。
但樣式不該寫在內文裡，因此改為集中管理：

| 模板 | 頁面 id | 新增 element id |
|---|---|---|
| 新聞中心s Template | `69f82ba2b2602e6d6594d696` | `64d25a34-232e-f1bf-fedd-ab01119a2b25` |
| 客戶成功案例s Template | `6a1c22366d4d91ecdbddfca6` | `a26dcb32-96a4-8bf4-16dd-15fefc5d6cee` |

兩者都是 `HtmlEmbed` 元素，`append` 在各自的 `.page-wrapper` 末端，`code` 設定值為同一份
`<style>` 區塊。這是站上既有的自訂 CSS 做法（`Page Gradient BG`、Announce Bar 都是這樣）。

**沒有動 `Global Style` component**（35 個實例），所以不會外溢到其他 30 幾頁。

### 9-4. 樣式內容

| 對象 | 值 |
|---|---|
| 外框 | `background: transparent`、`1px solid rgba(21,23,23,.10)`、`border-radius: 1rem`（對齊卡片）、`overflow-x: auto` |
| 儲存格 | `padding: 1rem 1.5rem`、`border-bottom: 1px solid rgba(21,23,23,.08)` |
| 表頭 | `background: rgba(0,178,192,.09)`、`font-size: .875rem`、`weight 600`、`letter-spacing .03em` |
| 表頭最後一欄 | `background: rgba(0,178,192,.16)` |
| 內容最後一欄 | `background: rgba(0,178,192,.06)`、`weight 600` |
| ≤767px | 字級 `.9375rem`、padding `.75rem 1rem` |

### 9-5. 為什麼用 `!important`

既有文章的表格每一格都有 inline style，一般 CSS 蓋不掉。用 `!important` 讓這份樣式
**對新舊兩種寫法都生效** —— 就算作者沿用舊的 snippet 貼上，外觀也會被統一。

> **後續清理建議**：把既有文章內文裡的 inline style 拿掉，改貼乾淨的 `<table>`，
> 並在 `12_AEO文章寫作指南.md` 補一段「表格怎麼寫」。做完之後這份 CSS 的
> `!important` 就可以拿掉。目前抽樣 10 篇文章只有 1 篇有表格，清理成本很低。

### 9-6. 驗證與限制

**已驗證**：兩個 embed 的 `code` 設定都用 `get_settings` 讀回，內容與預期一致。
視覺以注入等值 CSS 在線上頁面預覽，表頭、重點欄、hairline 皆正確。

**驗證限制**：**未 Publish**，預覽為模擬。`div:has(> table)` 用到 `:has()` 選擇器
（Chrome 105+／Safari 15.4+／Firefox 121+）；若遇到過舊的瀏覽器，外框會維持原本的
inline 白底，屬於降級而非破版。手機版表格未實機測試。

### 9-7. 尚未處理

表格設了 `min-width: 48rem` ＋ `overflow-x: auto`，手機上一定會橫向捲動，
但**畫面沒有任何提示告訴使用者可以滑**。已向 Terris 提出，尚未決定要不要加漸層遮罩暗示。

---

## 10. 樣式定案與 CMS 文章樣式表

- 日期：2026-09-21
- 決議者：Terris
- 狀態：**已修改，未 Publish**

### 10-1. 定案內容

| 元素 | 決議 |
|---|---|
| 表格 | **T2 重點欄版**（見 §9） |
| 引言／重點框 `blockquote` | **M5 漸層面板 ＋ B 配色 ＋ R3 中顆粒** |
| AEO FAQ 手風琴 | **F1 白底細框 1rem 圓角** |

兩個模板的 `HtmlEmbed`（§9-3 建立的那兩個）現在放的是**同一份完整樣式表**，
涵蓋表格、blockquote、FAQ 三者。

### 10-2. blockquote 的漸層與顆粒

```
background-image:
  url("data:image/svg+xml,…feTurbulence…"),          /* 顆粒 */
  linear-gradient(100deg,
    rgba(0,178,192,.26), rgba(107,143,240,.18) 55%, rgba(177,93,255,.22));
```

- **漸層沿用站上既有的品牌漸層** teal → 藍 → 紫，與 `.gradient-headline`
  （`--primary--accent` → `--gradient--announce-bar-purple`）、Announce Bar、
  FAQ 的 `+` 圖示同一組，沒有新增顏色。
- **顆粒是 SVG `feTurbulence` 的 data-URI**，160×160 tile 重複貼，
  `baseFrequency 0.62`／`numOctaves 4`／`opacity 0.07`。不需圖檔、不需額外請求，
  整份 CSS 只多約 400 bytes。與漸層層的 `filter: blur(50px)` 不同，顆粒只算一次。

**對比實測**（取樣渲染後的實際像素，黑字 `#151717`）：

| 顆粒濃度 | 平均對比 | 最暗顆粒點 |
|---|---|---|
| 無顆粒 | 14.4:1 | — |
| 0.04 | 13.2:1 | 12.8:1 |
| **0.07（採用）** | **12.3:1** | **12.0:1** |
| 0.12 | 10.9:1 | 10.7:1 |

全部遠高於 AAA 的 7:1。

> **為什麼不用漸層文字**：`background-clip: text` 的漸層字在內文級字級會失敗 ——
> 實算 `#00b2c0` 對白底只有 **2.58:1**、`#b15dff` **3.57:1**，兩者都低於 AA 的 4.5:1。
> 這也是站上 `.gradient-headline` 的 75 個實例全部在 h1／h2 的原因（見規範 16）。
> **漸層當背景沒有這個問題**：即使是飽和的 `#35c6d6` 也有 8.7:1。

### 10-3. 外部對照

- 表格：Wispr Flow、Serus、Humble、Vanta、GitHub 的共同法則是「只強調結論欄、
  hairline 一律 5–12%」。
- FAQ：Deel、Retool 的 callout 靠「標籤」而非引號；但因 CSS 產生的標籤是寫死的、
  且不在 HTML 原始碼裡（對 AEO 無貢獻），最後未採用標籤方案。

### 10-4. 驗證與限制

**已驗證**：兩個 embed 的 `code` 皆讀回確認；以等值 CSS 注入線上頁面渲染，
blockquote 的漸層與顆粒、表格重點欄、FAQ 細框皆正確。

**驗證限制**：**未 Publish**，以上皆為模擬。顆粒在 Retina 上會因 2 倍解析度算圖而顯得更細；
未實機測試。`div:has(> table)` 依賴 `:has()`（Chrome 105+／Safari 15.4+／Firefox 121+）。

---

## 11. `/news/residential-institution-subsidy-2026` 內容修復

- 日期：2026-09-21
- 回報：Terris —「格式跑掉了，code 被寫在 rich text 裡，要用 HTML Embed 包住；圖片也失效」
- CMS item：`6aab4d29bc0fa97a7847135a`（`115 年住宿式機構補助新制懶人包`）
- 狀態：**草稿已修復，未 Publish**

### 11-1. 診斷

| | `<table>` | `w-embed` | 狀態 |
|---|---|---|---|
| 線上已發布版（2026-09-18） | 3 | 0 | **內容完整** |
| 修復前的 CMS 草稿 | **0** | **0** | **已損毀** |

**根因**：表格與 FAQ 的 code 原本是**裸 HTML 直接躺在 Rich Text 欄位裡**。
透過 Data API 寫入時 Webflow 會存下來並正常輸出，但 Rich Text 欄位
**只要在 Designer／Editor 裡被存過一次就會被消毒**：`<table>` 被拆成
`<p>` 裡一串 `<br>`，`<style>` 與 `<script>` 變成純文字顯示給讀者看。

損毀的具體證據（修復前草稿）：
- 表格 1：「住宿式服務機構使用者補助 / 全年最高 12 萬元 / **（空）**」—— 新制欄整格消失
- 表格 2：「⋯實際入住累計達 180 日 / **（空）**」—— 認列方式欄消失
- `.aeo-faq{display:grid;gap:1rem⋯}` 與 `(function(){⋯})` 以純文字出現在內文中

> **這是 Terris 的判斷正確的地方**：code 一定要放在 HTML Embed（`w-embed`）裡，
> Webflow 才會把它當成不可分割的程式碼區塊，不會在編輯時消毒掉。

### 11-2. 圖片其實沒有失效

6 張圖的 URL 全部回 **HTTP 200**，瀏覽器實際渲染也全部 `naturalWidth > 0`。

- URL 裡的 `%2520` 不是 bug：檔名本身就含 `%20`（上傳時雙重編碼），
  CDN 依此路徑正常供圖。把 `%2520` 改回 `%20` 反而 **403**。
- 第一次檢查時有 3 張顯示 `naturalWidth: 0`，那是 **lazy loading 尚未觸發的假警報**；
  捲完整頁後全部正常。

**唯一真正的問題**：第 4 張（申請時程）與第 6 張（系統截圖）**沒有 srcset**，
會直接載入 1536px／1672px 原檔，偏重但不影響顯示。未處理。

### 11-3. 修復做法

以**線上已發布版**為正確來源（不是從散文重建），做三件事：

1. 三個 `<table>` 各自包進 `<div class="w-embed">`
2. FAQ（`<style>` ＋ `<details>` ＋ `<script>`）包進 `<div class="w-embed w-script">`
3. 清掉表格的 **41 處 inline style**（改由 §10 的模板樣式表統一管理）

**寫入前後的完整性驗證**：

```
純文字     3456 字元 → 3456 字元，逐字元比對完全相同
圖片 src   6 個 → 6 個，完全相同
連結       0 個 → 0 個
結構       table 3、w-embed 4、w-script 1、figure 6
```

### 11-4. ⚠️ 尚未處理與注意事項

1. **未 Publish。** `isDraft` 維持 `true`，未更動。
2. **發布前務必確認**：這個 item 目前是 Draft 狀態。若整站 Publish，
   需要先確認這篇是要一併上線（取消 Draft）還是維持不發布。
3. 兩張圖缺 srcset（見 11-2），如要優化需重新上傳或在 Webflow 內重新插入。
4. **寫作規範待補**：`12_AEO文章寫作指南.md` 應加一節「表格與 FAQ 怎麼寫」——
   一律用 HTML Embed、表格不寫 inline style。否則下一篇會重蹈覆轍。

---

## 12. v2 修正：表格白字與第二套 FAQ

- 日期：2026-09-21
- 回報：Terris —「table 跟 FAQ 還是有明顯錯誤」
- 狀態：**已修正，已重新發布到 staging（正式網域未動）**

### 12-1. 表格最後一欄變成白字（本次改動造成的迴歸）

`/news/residential-institution-subsidy-2026` 的最後一欄，在套上 §9 的表格樣式後
**文字變成白色，完全看不見**。

根因是 §9 的 CSS **只覆寫了 `background`，沒有覆寫 `color`**。該文原本把最後一欄
做成「實心 teal ＋ 白字」的強調欄：

```html
<th style="background:#00b2c0;color:var(--neutral--white);">115 年新制</th>
<td style="color:var(--neutral--white);background:#00b2c0;">
  <strong style="color:var(--neutral--white);">按月認列</strong>…
```

`!important` 把底色改成 6%／16% 的淡 teal 之後，inline 的白字留了下來 → 白底白字。
全文共 **7 個**這樣的儲存格。

**修正**：儲存格與其所有子元素都強制文字色。

```css
.richtext table th,
.richtext table td { color: var(--neutral--black) !important; }
.richtext table th *,
.richtext table td * { color: inherit !important; }
```

子元素那條是必要的 —— `<strong style="color:var(--neutral--white);">` 有自己的 inline color，
只改父層蓋不掉。

> **教訓**：用 `!important` 覆寫既有 inline style 時，**同一組視覺屬性要一起覆寫**。
> 只改 `background` 不改 `color`，等於把原作者的配色拆成一半，結果比不改更糟。

### 12-2. 站上有兩套 FAQ 實作，§10 的規則只蓋到一套

| 實作 | 選擇器 | 圖示 | 使用文章 |
|---|---|---|---|
| A | `.aeo-faq` | `+` 號（兩條線旋轉） | `ai-transformation-culture`、`residential-institution-subsidy-2026` |
| B | `#jubo-research-faq` | chevron `∨`（`::after` 邊框轉 45°） | `long-term-care-ai-high-risk-resident-study` |

§10 寫的是 `.richtext .aeo-faq details`，所以 B 完全沒有被套到，
在新的白色閱讀卡上依然看不出卡片邊界。

**修正**：改鎖 `details` 本身，與實作無關。

```css
.richtext details {
  background: var(--neutral--white) !important;
  border: 1px solid rgba(21, 23, 23, .09) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
}
.richtext details summary { padding: 1.5rem 1.75rem !important; }
.richtext .aeo-faq__answer-inner,
.richtext #jubo-research-faq__list p { padding: 0 1.75rem 1.5rem !important; }
```

內層答案的 padding 仍需分別指定（兩套的內層 class 不同），但**卡片外觀已與實作無關**，
日後再出現第三套也會自動套到。

### 12-3. 驗證

以 staging 實際渲染（非模擬）測量：

| 項目 | 結果 |
|---|---|
| 表格 21 個儲存格中「白字或透明字」 | **0** |
| 表格內 `<strong>` 的顏色 | 全部 `rgb(21,23,23)` |
| `#jubo-research-faq` 的 `details` | `bg rgb(255,255,255)`／`border 1px rgba(21,23,23,.09)`／`radius 16px` |

**驗證限制**：staging 上的補助文章是**舊的已發布內容**（含 inline style），
不是 §11 修好的草稿 —— 草稿 `isDraft: true` 不會發布。也就是說，
§11 的內容修復尚未在任何環境被目視驗證過。

---

## 13. v3 — 引言框漸層改色（2026-09-21）

### 13-1. 問題

Terris 回報「這個顏色不對，要使用黑色字是好看的設計」。

v2 的漸層是 `teal .26 → 藍 .18 (55%) → 紫 .22`。三個色相在低透明度下疊在
白色 92% 的閱讀面板上時，中段會混成**灰濁的藕紫色**，右端偏粉；顆粒層
（opacity 0.07）再壓一次飽和度，整塊看起來像髒掉的淡粉紅。黑字壓在上面
不是看不見，是**不好看**——底色沒有明確色相，字就沒有支撐。

### 13-2. 做法

在 staging 實際頁面（`/news/long-term-care-ai-high-risk-resident-study`）
把四個版本注入渲染後比對，不是憑想像調色：

| 版本 | 做法 | 判斷 |
|---|---|---|
| A | teal → 淡藍同調漸層，去掉紫端 | **採用**：保留品牌漸層感，色相乾淨 |
| B | 近白面板 + 品牌漸層左色條 | 乾淨但失去底色，與白面板太像 |
| C | 保留三色，上方加白色提亮層 | 比 v2 好，右端仍偏藕紫 |
| D | 單色薄荷 + teal 實心左條 | 最乾淨，但不再是漸層 |

採用的值：

```css
.richtext blockquote {
  background-image:
    url("…feTurbulence… opacity='0.05'…"),
    linear-gradient(118deg,
      rgba(0, 178, 192, .24) 0%,
      rgba(0, 178, 192, .08) 46%,
      rgba(107, 143, 240, .18) 100%) !important;
}
```

兩處調整：顆粒 opacity 由 `0.07` 降到 `0.05`（淡底色上顆粒太重會像髒污）；
漸層改成 teal 自身的深→淺→帶一點藍，屬於**同調漸層**，不會出現中間色。

### 13-3. 驗證

staging 實際渲染取樣 80 個背景像素，對 `#151717` 黑字計算對比：

| 項目 | 結果 |
|---|---|
| 最低對比 | **12.92:1** |
| 最高對比 | 14.85:1 |
| 最深的背景像素 | `rgb(185,226,229)` |
| computed `background-image` 含紫 `177,93,255` | **否** |

AAA 門檻為 7:1，全區間通過。

### 13-4. 教訓

低透明度的多色相漸層不等於「柔和」。teal 與紫的補色關係在 alpha < .3 疊白時
會去飽和成灰紫；**要柔和就用同一色相拉明度，不要用兩個相隔很遠的色相拉透明度。**

---

## 14. v4 — 引言改成「白底卡片 + 角落柔光」（2026-09-21）

### 14-1. 決策

Terris 提供創辦人語錄卡作為參考：白底卡片，品牌色柔光從左下角滲入，
大圓角、厚留白、淡陰影。這比 v3 的整片漸層更耐看，因為黑字坐在純白上，
顏色只負責「氛圍」，不參與「可讀性」。

```css
.richtext blockquote {
  background-color: var(--neutral--white);
  background-image:
    url("…feTurbulence… opacity='0.045'…"),
    radial-gradient(55% 120% at  4% 112%, rgba(177, 93, 255, .30) 0%, rgba(177, 93, 255, 0) 62%),
    radial-gradient(52% 115% at 22% 118%, rgba(  0,178,192, .34) 0%, rgba(  0,178,192, 0) 64%),
    radial-gradient(45% 110% at 44% 122%, rgba(107,143,240, .22) 0%, rgba(107,143,240, 0) 66%);
  border-radius: 1.5rem;
  padding: 2rem 2.25rem;
  box-shadow: 0 6px 30px rgba(21, 23, 23, .07);
  overflow: hidden;
}
```

三層 radial-gradient 的圓心都放在卡片下緣之外（`at … 112%`／`118%`／`122%`），
所以只有光暈的上緣進到卡片裡，不會在卡片中間留下色塊。

### 14-2. 驗證（staging 實測）

| 位置 | background-color | radius | 光暈層數 | 黑字對比 |
|---|---|---|---|---|
| /news 桌機 | `rgb(255,255,255)` | 24px | 3 | 10.82–16.36:1 |
| /news 手機 390px | `rgb(255,255,255)` | 24px | 3 | 10.68–16.36:1 |
| /customer-stories 桌機 | `rgb(255,255,255)` | 24px | 3 | 10.75–16.36:1 |

---

## 15. 補助文章：取消 Draft 並在 staging 驗證（2026-09-21）

§11 修好的內容一直是 `isDraft: true`，不會被發布，因此從未被目視驗證。
經 Terris 同意後取消 Draft 並發布 staging（僅 Webflow 子網域，未動正式站）。

staging 實測 `/news/residential-institution-subsidy-2026`：

| 項目 | 結果 |
|---|---|
| HTTP | 200 |
| 表格數 | 3 |
| 表格被 `.w-embed` 包住 | 3 / 3 |
| 儲存格白字或透明字 | 0 / 41 |
| 圖片 | 6 張，`naturalWidth === 0` 者 **0** |
| FAQ `details` | 3 個，`bg rgb(255,255,255)`／`1px rgba(21,23,23,.09)`／`16px` |
| `<style>`／`<script>` 以文字外洩 | 否 |
| 殘留 inline style | 3 處，全部是 FAQ 手風琴 JS 執行期寫入的 `height/opacity`，非文章內容 |

> **上正式站前**：若不打算讓這篇同時上線，記得先把 `isDraft` 改回 `true`。
> 目前狀態是 `isDraft: false`，下一次 publish 到 `jubo-health.com` 就會一起上線。

---

## 16. 待決：圖片說明改成「圖上玻璃說明條」

Terris 希望圖片說明變成壓在圖片上的毛玻璃條，且「後台填寫完就自動變成這樣」。

### 16-1. 技術上可行，但兩個模板的作法不一樣

| 模板 | 目前圖片說明怎麼寫 | 能不能純 CSS 做到 |
|---|---|---|
| `/news` | Webflow 內建圖片說明，產出真正的 `<figcaption>` | **可以**，一段 CSS 就好 |
| `/customer-stories` | 圖片後面另外寫一段 `<p>`（不是 figcaption） | **不行**，見下 |

`/customer-stories` 的圖片說明是 `<figure>` 的**兄弟段落**，不在 figure 裡面，
因此無法用 `position:absolute` 疊到圖上。而且 `figure + p` 這個選擇器
會誤傷「圖片後面剛好接一段正文」的情況——站上大量文章的圖片後面
接的是空白段落 `<p>‍</p>` 或 `<blockquote>`，選擇器無法分辨哪一段是說明。

**結論：要全站一致，作法是請編輯改用 Webflow 內建的圖片說明欄位**
（rich text 內點選圖片 → 開啟 caption），不要再自己打一段 `<p>`。
之後同一段 CSS 在兩個模板都會生效，這才符合「後台填寫完就自動變成這樣」。

### 16-2. CSS（尚未上線，待決定範圍）

```css
.richtext figure.w-richtext-figure-type-image { position: relative; }
.richtext figure.w-richtext-figure-type-image > div {
  border-radius: 1.25rem; overflow: hidden; line-height: 0;
}
.richtext figure.w-richtext-figure-type-image figcaption {
  position: absolute; left: 1.25rem; right: 1.25rem; bottom: 1.25rem;
  margin: 0; padding: 1.125rem 1.375rem; text-align: left;
  background: rgba(255, 255, 255, .72);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
          backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, .55);
  border-radius: 1rem;
  color: var(--neutral--black); font-size: .9375rem; line-height: 1.65;
  box-shadow: 0 8px 28px rgba(21, 23, 23, .12);
}
```

### 16-3. 實測

在 staging 注入後量測（`backdrop-filter` 在測試瀏覽器回報 supported）：

| 情境 | 說明條佔圖片高度 | 黑字對比（最低） |
|---|---|---|
| `/news` 6 張資訊圖 | 12%–21% | **10.80:1** |
| `/customer-stories` 5 張真實照片（模擬 caption） | — | **9.91:1**（白底 .72）／12.41:1（白底 .82） |

> 量測註記：第一次量到的低對比數字是取樣誤差——元素截圖包含了圓角外的四個角落，
> 那裡露出的是底下的照片而不是玻璃。排除圓角後才是上表的數字。

### 16-4. 必須先決定的取捨

`/news` 的圖片多半是**資訊圖**，資料一路排到圖片下緣。玻璃條壓上去會蓋住
最底下一列數字（實測補助文章第一張圖的「15,000 元／5,000 元」那排會被蓋到）。
照片沒有這個問題。

三個選項：

1. 只在 `/customer-stories` 上線（照片為主，零風險），`/news` 維持說明在圖片下方。
2. 兩邊都上線，但 `/news` 的資訊圖一律不填說明欄（說明寫進正文）。
3. 兩邊都上線，日後新的資訊圖在設計時就把下緣留白。

---

## 17. 圖說玻璃條：只在 /customer-stories 上線（2026-09-21）

Terris 選擇 §16-4 的第 1 案：只在 `/customer-stories` 模板上線，`/news` 不動
（`/news` 的圖多為資訊圖，玻璃條會蓋住圖片下緣的數據）。

### 17-1. 已完成

CSS 第 5 節只寫進 **story 模板的 embed**（page `6a1c22366d4d91ecdbddfca6`），
news 模板的 embed 保持 v4 不變。已發布 staging。

staging 驗證（`/customer-stories/customer-success-stories-jubostory11`）：

| 檢查 | 結果 |
|---|---|
| `figure` 的 `position` | `relative` |
| 探針 `figcaption` 的 `position` | `absolute` |
| 背景 | `rgba(255,255,255,0.72)` |
| `backdrop-filter` | `blur(20px) saturate(1.5)` |
| 圓角 | `16px` |
| `/news` 同樣探針 | `static`／透明 ← **確認未波及** |

> 驗證註記：publish 後立刻讀取會拿到舊版 CSS（第一次量到規則沒生效），
> 需等 CDN 更新或帶 cache-buster 參數重讀。這不是規則失敗。

### 17-2. 現況：規則已上線，但還看不到效果

全站 23 篇 customer story 掃描結果：

| 項目 | 數量 |
|---|---|
| 文章 | 23 |
| rich text 圖片 | 59 |
| 使用 Webflow 內建圖片說明（`figcaption`） | **0** |
| 圖片後面另打一段 `<p>` 當說明 | 29（分布在 8 篇） |
| 圖片後面沒有說明（接 blockquote 或空段落） | 30 |

因為目前沒有任何一張圖用內建說明欄，這段 CSS 現在是**休眠**狀態——
新文章只要改用說明欄就會自動套上，舊文章則需要把那 29 段 `<p>` 轉成 `figcaption`。

### 17-3. 寫作規範要跟上

`12_AEO文章寫作指南.md` 與 story 的撰稿流程要補一條：

> 圖片說明一律用 Webflow rich text 的內建說明欄（點選圖片 → 開啟說明），
> 不要在圖片後面另打一段內文當說明。前者 CSS 認得，後者認不得。

（此條尚未寫入 12 號文件，待圖說方案確定全部範圍後一併補。）

### 17-4. v6：圖說字級 15px → 17px（2026-09-21）

Terris 回報「說明文字好像有一點太小」。量過站上實際字級後確認是設定偏小：

| 元素 | 字級 |
|---|---|
| 內文 `p` | 18px |
| 引言 `blockquote` | 17px |
| 圖說 `figcaption`（v5） | **15px** ← 偏小 |

15px 在中文下明顯吃力（中文沒有小寫字母，x-height 等效比拉丁文字更小）。
改成與引言齊高的 17px，比內文小一級即可，內距同步放大：

```css
font-size: 1.0625rem;   /* 17px，原 .9375rem */
line-height: 1.7;
padding: 1.25rem 1.5rem;
/* 手機：16px / 1rem 1.125rem */
```

staging 實測（`customer-success-stories-jubostory13`）：

| 斷點 | 字級 | 行高 | 內距 | 黑字最低對比 |
|---|---|---|---|---|
| 1280px | 17px | 28.9px | 20px 24px | **9.46:1** |
| 390px | 16px | 26.4px | 16px 18px | **9.88:1** |

> 驗證限制：該篇尚未使用 Webflow 內建說明欄，截圖與量測是把圖片後的段落
> 以探針方式注入 `figcaption` 後渲染的結果，樣式值為真實 computed style。

---

## 18. 舊文圖說轉換：改用腳本，不改內容（2026-09-21）

### 18-1. 先試了手動改內容，失敗

原訂作法：用 CMS API 把圖片後面那段 `<p>` 搬進 `<figcaption>`。
Webflow 的 items API 不支援局部更新，必須整個 `content` 欄位重寫，
也就是要把整篇文章逐字重打一次。

實際做了兩篇之後，拿**正式站**（尚未發布，保有原文）當基準做逐字比對：

| 文章 | 字數 | 差異 |
|---|---|---|
| `make-good-use-of-…`（順心） | 1242 | 0 |
| `people-with-disabilities-are-better-developed`（香園） | 1470 | **3 個錯字** |

香園那篇被改錯的字：

| 位置 | 原文 | 誤寫成 |
|---|---|---|
| 753 | 徹底檢查 | 彻底檢查 |
| 1283 | 工作崗位 | 工作岗位 |
| 1420 | 做月餅 | 做月餜 |

三個都是繁體字被替換成簡體或形近字。錯誤率約 0.2%，在 2000–2600 字的
jubostory08–11 上預期每篇 4–6 個錯，而且每次修正又得整篇重打一次，
可能再引入新的錯。**這個作法本身不可靠，已停用。**（三個錯字已修回。）

### 18-2. 改用腳本：不動 CMS，只在瀏覽器裡搬位置

在 story 模板的 embed 加一段腳本，把「圖片緊鄰的短段落」提升成 `figcaption`：

```js
var MIN = 4, MAX = 60;
document.querySelectorAll('.richtext figure.w-richtext-figure-type-image').forEach(function (f) {
  if (f.querySelector('figcaption')) return;          // 已用內建說明欄的跳過
  var n = f.nextElementSibling;
  if (!n || n.tagName !== 'P') return;
  var t = (n.textContent || '').replace(/[\s​‌‍ ]/g, '');
  if (t.length < MIN || t.length > MAX) return;
  var cap = document.createElement('figcaption');
  cap.innerHTML = n.innerHTML;                        // 保留 <strong>、<a> 等行內標記
  f.appendChild(cap);
  n.parentNode.removeChild(n);
});
```

**4–60 字這個門檻是量出來的，不是猜的**：全站真正的圖說是 5–51 字，
圖片後面的正文段落是 224–383 字，中間有很大的空隙。`<p>‍</p>` 這種
空白段落會被 MIN 擋掉。

優點：CMS 內容一個字都沒動、23 篇一次全部生效、將來編輯用內建說明欄或
沿用舊寫法都會正確顯示。

### 18-3. 驗證：23 篇逐字比對正式站

| 結果 | 數量 |
|---|---|
| 內文逐字相同、圖片 src 相同、標題相同、figure 數相同 | **22 / 23** |
| 玻璃圖說總數 | **37** |
| 誤判（把正文當成圖說） | 0 |

唯一一篇差異是 `customer-success-stories-jubostory13`（+6 字），
來源是 Terris 自己在 Designer 裡開啟說明欄測試時新增的「高郁凱主任。」，
不是本次改動造成的。

所有 37 段被提升的圖說都是真正的圖說，包含人名型短圖說
（「李思慧主任」5 字、「王人尹業務負責人」8 字）。

### 18-4. 已知限制

- 若日後有人在圖片後面寫一段**短於 60 字的正文**，會被誤判為圖說。
  正確寫法仍是用 Webflow 內建說明欄。
- 腳本在 `DOMContentLoaded` 執行，理論上有極短暫的「說明先出現在圖片下方」
  的閃動；實測未觀察到，但這點取決於 embed 在頁面中的位置。

---

## 19. FAQ 展開動畫（2026-09-21）

### 19-1. 問題：新文章的 FAQ 沒有動畫

Terris 回報「toggle down 的動畫不見了」，並指定首頁 FAQ（外包做的）為正確版本。

實測後確認站上有**兩套** FAQ，行為不同：

| 實作 | 用在哪 | 展開行為 |
|---|---|---|
| `.aeo-faq` | 補助新制等舊 AEO 文章 | 內容自帶腳本，有 height 動畫 |
| `#jubo-research-faq` | 成大研究（最新那篇） | **純 `<details><summary>`，瀏覽器原生瞬間跳出，沒有動畫** |

`#jubo-research-faq` 的 `<script>` 只做一件事：如果不是目標文章就把自己
`remove()` 掉，完全沒有動畫邏輯。`<details>` 直接裝 `<summary>` + `<p>`，
沒有可以做 height 過場的內層容器。所以不是動畫「壞了」，是從來沒有。

### 19-2. 參數取自首頁，不是自己挑的

從首頁的 `Webflow.require('ix2').store` 讀出 `.faq5_answer` 的動作設定：

| 動作 | actionTypeId | duration | easing | 目標 |
|---|---|---|---|---|
| 展開 | `STYLE_SIZE` | **400** | **ease** | height → AUTO |
| 收合 | `STYLE_SIZE` | **400** | **ease** | height → 0px |

新腳本就用同一組 400ms / `ease`。

### 19-3. 作法

在 `/news` 模板 embed 加一段腳本（原始碼：`custom-code/cms-article/faq-accordion.js`）：

1. 掃 `.richtext details`。
2. 把 `<summary>` 以外的子元素包進 `.jb-faq__panel`。
3. 接手 summary 的點擊，改成 `height` 過場（400ms / ease）。
4. 展開結束後把高度設回 `auto`，內容變高也不會被裁切。
5. **舊版 `.aeo-faq` 直接跳過**（偵測 `.aeo-faq__answer`），避免兩套腳本打架。
6. `prefers-reduced-motion: reduce` 時不做動畫，直接開合。

另外補一條 CSS：文章自帶的箭頭旋轉綁在 `details[open]`，但收合動畫跑完
才會把 `open` 拿掉，箭頭會慢半拍。改用點擊當下就更新的 `aria-expanded` 當依據。

### 19-4. 驗證（staging 實測）

| 檢查 | 結果 |
|---|---|
| FAQ 題數 / 綁定成功 | 4 / 4 |
| 展開 transition | 每題都是 `0.4s` `ease` |
| 展開後 | `open=true`、`aria-expanded=true`、高度設回 `auto` |
| 收合後 | `open=false`、`aria-expanded=false`、高度 `0px` |
| 連點兩下 | 狀態正確、防重入旗標已清除，不會卡死 |
| `prefers-reduced-motion` | 直接展開、不跑動畫 |
| 舊版 `.aeo-faq` 是否被重複綁定 | 否（`data-jb-faq` 為 null、無 `.jb-faq__panel`） |
| 線上 `<style>`／`<script>` 與 repo 檔案 | **逐字相同**（4075 / 3691 字元） |

### 19-5. 兩個註記

- Webflow 發布後 CDN 約需 20–60 秒才更新。太早比對會拿到舊版，
  本次就先誤判過一次「程式碼沒更新」。
- `/customer-stories` 模板**沒有**加這段腳本，因為 story 目前都沒有 FAQ。
  日後要用再加即可（見 `custom-code/cms-article/README.md`）。

---

## 20. 補助文章：移除與圖片重複的門檻表（2026-09-22）

§8「第二步：計算當月入住日數是否達門檻」底下同時有一張表格和一張資訊圖，
內容完全一樣（31 天需 16 天／30 天需 15 天／28 天需 14 天）。
依 Terris 指示移除表格，只留資訊圖。

### 20-1. 驗證方式

先抓 staging 的基準快照，改完再比對「原文扣掉那張表的文字」是否等於新版全文。
這樣任何非預期的字元變動都會被抓出來（前幾次手改內容就是這樣抓到錯字的）。

| 檢查 | 結果 |
|---|---|
| 全文字數 | 3200 → **3138**（= 3200 − 表格的 62 字） |
| 逐字比對 | **原文扣掉該表格後，與新版完全相同** |
| 表格數 | 3 → 2（剩「新舊制對照」與「過渡保障」） |
| 圖片 | 6 → 6，載入失敗 0 |
| FAQ | 3 → 3，展開／收合實測正常 |
| 標題、圖片 src | 與改動前完全相同 |
| 表格白字儲存格 | 0 / 29 |

### 20-2. 註記

本次沒有出現錯字。逐字比對的基準改用「同一環境的前後快照」而非正式站，
因為這篇的正式站版本是舊內容，不能當基準。

---

## 21. FAQ 動畫統一（2026-09-22）

### 21-1. 問題：兩篇文章的 FAQ 動畫參數不同

Terris 回報補助新制那篇「好像也沒有動畫」。實測後發現它**有**動畫，
但參數跟首頁不同：

| 位置 | 展開時間 | 曲線 |
|---|---|---|
| 首頁 FAQ（基準） | 400ms | `ease` |
| 成大研究（純 details） | 400ms | `ease`（§19 已處理） |
| 補助新制（舊版 `.aeo-faq`） | **520ms** | `cubic-bezier(.22,.61,.36,1)` |

實測高度確實從 0 → 33 → 64 → 98px 漸變，但那條曲線是強力 ease-out，
前段衝很快、後段拖尾，面板又只有 98px 高，看起來像「跳出來之後晃一下」。
真正的問題是兩篇不一致。

### 21-2. 作法：接管舊版，不改 CMS 內容

`faq-accordion.js` v2 取消「跳過 `.aeo-faq`」的例外：

- 舊版 `.aeo-faq`：沿用它既有的 `.aeo-faq__answer` 當動畫容器，
  並把 `<summary>` 換成 `cloneNode(true)` 的複製品——複製品不帶事件監聽，
  等於卸掉文章內容自帶腳本綁的 click，避免兩套邏輯同時 `preventDefault()`。
  只動瀏覽器裡的 DOM，**CMS 內容一個字都沒改**。
- 其他 `<details>`：維持 §19 的 `.jb-faq__panel` 作法。

另補一條 CSS：`.aeo-faq` 的加號圖示也綁在 `details[open]`，收合時會慢半拍，
改用 `aria-expanded` 當依據。

### 21-3. 驗證

| 檢查 | 結果 |
|---|---|
| 補助新制 `.aeo-faq` 的 transition | **0.4s / ease / height**（原 0.52s） |
| 動畫容器 | `aeo-faq__answer`（沿用，未新增 DOM 層） |
| 展開 → 收合 | `open` 與 `aria-expanded` 都正確、高度回 `auto` 再回 `0px` |
| JS 錯誤 | 無 |
| 純 `<details>` 路徑 | 注入測試：`data-jb-faq="1"`、`.jb-faq__panel` 建立成功 |
| 線上 `<style>`／`<script>` 與 repo | 逐字相同（4295 / 4203 字元） |

### 21-4. 過程中發現的兩件事

**一、成大研究那篇在 staging 變成 404。**
查 CMS：`isDraft: true`、`lastPublished: null`。整個 news collection
87 篇裡有 23 篇是草稿。本次沒有動過這個項目（唯一改過的 news 內容是補助文章），
但站台發布會把草稿狀態一併推上去，所以它從 staging 消失了。
因此純 `<details>` 這條路徑改以注入測試驗證，而非在該篇實測。

**二、Webflow 後台看到的灰色圖片佔位不是壞圖。**
Terris 回報 story 文章在後台顯示灰色placeholder。實際掃描 staging 全部 23 篇：

| 項目 | 結果 |
|---|---|
| 圖片總數 | 59 |
| `naturalWidth === 0`（載入失敗） | **0** |

線上顯示正常，灰色佔位是 Designer 畫布渲染 CMS 動態內容的呈現方式。

---

## 22. 兩篇 story 內容還原：後台編輯一致性（2026-09-22）

### 22-1. 問題

Terris 回報：我改過的那兩篇 customer story 在 Webflow 後台改不動，
希望「變得跟後台一致」。

原因是 §18-1 那次手動把圖說搬進 `<figcaption>`——只有那兩篇是這種寫法，
其餘 21 篇都還是「圖片後面接一段 `<p>`」。後台要能正常編輯，
內容結構就該跟其他文章一樣。

### 22-2. 這個內容改動本來就已經不需要了

§18-2 之後，模板腳本會在載入時把圖片緊鄰的短段落提升成 `figcaption`，
**視覺結果完全相同，不需要動 CMS 內容**。所以直接還原成原始寫法即可。

還原目標很明確：正式站尚未發布，仍保有原文，可當 100% 精準的比對基準。

### 22-3. 驗證

| 文章 | 正式站原文 | staging 還原後 | 逐字比對 |
|---|---|---|---|
| `make-good-use-of-…`（順心） | 1242 字 | 1242 字 | **✅ 相同** |
| `people-with-disabilities-…`（香園） | 1470 字 | 1470 字 | **✅ 相同** |

| 其他檢查 | 結果 |
|---|---|
| 圖片 src | 兩篇皆與正式站相同，載入失敗 0 |
| CMS 原始碼裡的 `figcaption` | 0（已回到原始寫法） |
| staging 實際顯示的玻璃圖說 | 各 1 個，`position: absolute`／`rgba(255,255,255,.72)` |

也就是說：**CMS 內容 = 原文，畫面 = 玻璃圖說**，兩者兼得。

### 22-4. 現況

`/customer-stories` 全部 23 篇的內容都回到未經修改的狀態，後台編輯行為一致。
目前唯一還有內容改動的是 `/news` 的補助新制那篇（移除重複表格，Terris 指定）。

### 22-5. 教訓

能用模板層（CSS／JS）解決的呈現問題，就不要改 CMS 內容。
改內容不只有逐字出錯的風險（§18-1 實測 0.2% 錯字率），
還會讓那幾篇的結構跟其他文章不一樣，編輯在後台就會踩到。

---

## 23. 圖說玻璃條下架；後台灰色佔位的歸因（2026-09-22）

### 23-1. 下架

Terris 要求「把每一篇的圖片敘述還原放到內文，不要放到描述裡」，以便逐篇檢視。
已把 story 模板的第 5 節（圖說玻璃條 CSS）與圖說提升腳本整段移除。
CMS 內容未動——圖說本來就是內文段落，移除腳本後就回到原本的樣子。

掃描 staging 全部 23 篇：

| 項目 | 結果 |
|---|---|
| `figcaption` 數 | 12（集中在 jubostory12、jubostory13，各 6 個） |
| 其餘 21 篇 | **0**，已回到原始呈現 |
| 圖片 | 59 張，載入失敗 **0** |

> jubostory12 與 jubostory13 的 12 個 `figcaption` 是 CMS 內容裡真實存在的，
> 來自 Terris 自己在 Designer 開啟圖片說明欄的操作，不是本次腳本產生的，故未動。

### 23-2. 後台灰色佔位：不是這次改動造成的

Terris 抽查板橋至傑那篇（`customer-success-stories-jubostory11`），後台一樣是灰色佔位。
**那篇從頭到尾沒有被改過**（`lastUpdated` 為 2026-06-23，早於本次工作）。
同一個現象出現在沒動過的文章上，因此不是本次改動造成的。

全站 23 篇 story 的圖片標籤形狀相同，都是匯入式的
`<img ... width="auto" height="auto" loading="auto">`——這是當初從舊站匯入
rich text 留下的寫法，`width="auto"` 並非合法的 HTML 屬性值。

### 23-3. 我確實留下的差異（但不影響顯示）

比對送出的 HTML：

| 來源 | 圖片標籤 |
|---|---|
| 正式站（原始已發布版） | `<img alt="…" src="…" loading="lazy">` |
| 我用 API 改過的兩篇（staging） | `<img alt="…" src="…" width="auto" height="auto" loading="auto">` |
| 沒動過的文章（staging） | `<img alt="" src="…" loading="lazy">` |

Webflow 透過 Designer 存檔時會把 rich text 正規化（拿掉 `width/height="auto"`、
`loading` 改 `lazy`、重排 class 順序）；**用 API 寫入的內容則是逐字照存、照送**，
不會經過那道正規化。所以那兩篇送出的標籤與其他篇不同。

實測影響：圖片載入正常（59/59），純屬標籤形狀差異。
若要讓那兩篇跟其他篇完全一致，最乾淨的方式是在 Webflow CMS 裡打開該項目再存一次，
由 Webflow 自己做正規化——比再用 API 重寫一次安全。

### 23-4. 教訓（補充 §22-5）

用 API 寫 rich text 不只有逐字出錯的風險，還會**繞過 Webflow 的正規化**，
讓那幾篇的標籤與其他文章不同。除非必要，rich text 內容應該在後台改，
呈現問題一律留在模板層解決。

### 23-5. 玻璃圖說裝回來（只對後台說明欄）

Terris 決定：玻璃 CSS 裝回來，但**自動提升內文段落的腳本維持移除**。
也就是「有在後台圖片說明欄填字的才會變成玻璃條」，其餘維持內文段落。

story 模板 v10 = 第 1–4 節（表格／引言／FAQ 外觀／手機）＋ 第 5 節（圖說玻璃條），
**沒有任何腳本**。

staging 驗證：

| 文章 | figcaption | 結果 |
|---|---|---|
| jubostory13（Terris 自己填的說明欄） | 6 | ✅ 玻璃條生效：`absolute`／`rgba(255,255,255,.72)`／`blur(20px) saturate(1.5)`／17px |
| jubostory12（同上） | 6 | ✅ 同上 |
| jubostory11（沒填說明欄） | 0 | ✅ 不受影響，圖說維持內文段落 |
| 香園（圖說在內文） | 0 | ✅ 同上 |

四篇圖片載入失敗皆為 0。

---

## 24. 後台／Preview 不顯示圖片：逐步排除（2026-09-22）

### 24-1. 找到的原因

第 5 節原本有兩條規則會動到圖片本身：

```css
.richtext figure.w-richtext-figure-type-image > div {
  border-radius: 1.25rem; overflow: hidden; line-height: 0;   /* ← 元凶之一 */
}
.richtext figure.w-richtext-figure-type-image img {
  display: block; width: 100%; height: auto;                  /* ← 元凶之二 */
}
```

拿掉這兩條之後，**Webflow CMS 編輯器裡的圖片就顯示出來了**（Terris 實測確認）。
`figcaption` 的規則不可能讓圖片消失，所以一開始就先從這兩條下手。

### 24-2. Designer Preview 仍不顯示 → 再縮一次範圍

為了讓下一次測試能一次定案，v12 把**最後一條選到 `img` 的規則（圓角）也移除**。
現在第 5 節只剩兩件事：

```css
.richtext figure.w-richtext-figure-type-image { position: relative; }
.richtext figure.w-richtext-figure-type-image figcaption { /* 玻璃樣式 */ }
```

已用程式確認線上的 embed 中**沒有任何規則選到 `img`**。

若 Preview 依舊不顯示圖片，就能確定與本 CSS 無關
（Designer 會快取站台 CSS，重新整理 Designer 分頁後再看才準）。

### 24-3. staging 驗證（v12）

| 文章 | 圖片 | 載入失敗 | figcaption |
|---|---|---|---|
| jubostory13 | 7 | **0** | 6（Terris 自己填的，玻璃條正常） |
| jubostory11 | 6 | **0** | 0 |
| 香園 | 3 | **0** | 0 |

### 24-4. 教訓

模板 CSS 不只影響已發布的網站，也會進到 **Webflow 後台的編輯器與 Preview**。
用 `!important` 改動 rich text 內部元素（尤其是 `img` 的 `display`／`width`／`height`
與其包裝層的 `overflow`）會讓編輯者在後台看不到內容。
動 rich text 內部結構的樣式時，要一併確認後台還能正常編輯。

### 24-5. 結案：Preview 與本 CSS 無關（2026-09-22）

把 story 模板的 embed **整段清空**後發布，Terris 在 Designer preview 仍看不到圖片。
因此可以確定：**Designer preview 不顯示 rich text 圖片，與本專案的模板 CSS 無關**，
是 Webflow 對這批舊站匯入圖片的既有行為。

（過程中也試過「圖片不在資產庫」的假設：用網址前綴當 asset ID 去查，
`/news` 那篇在 Designer 正常的圖片同樣查不到記錄，所以該假設無法分辨，未採用。）

**實際有解決的是 CMS 編輯器**：移除選到 `img` 與其包裝 div 的規則後，
Terris 確認編輯器裡看得到圖片、也能編輯。Terris 決定「能在 CMS draft 修改就夠了」，
Preview 的部分不再追。

已將 story 模板還原為 v12 並發布 staging：

| 文章 | embed | 選到 img 的規則 | 圖片 | figcaption |
|---|---|---|---|---|
| jubostory13 | v12 | 無 | 7 / 壞 0 | 6（absolute，玻璃正常） |
| jubostory11 | v12 | 無 | 6 / 壞 0 | 0 |
| 香園 | v12 | 無 | 3 / 壞 0 | 0 |
| 順心 | v12 | 無 | 3 / 壞 0 | 0 |

引言卡片、表格、FAQ 樣式一併復原。Terris 將自行逐篇整理要套玻璃圖說的內容。
