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
