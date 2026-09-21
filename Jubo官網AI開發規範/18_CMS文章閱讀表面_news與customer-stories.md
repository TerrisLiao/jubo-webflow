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
