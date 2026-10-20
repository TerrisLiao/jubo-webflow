# 12｜/news 文章寫作指南

給每週產出 `/news` 文章的人（與協助寫作的 Claude）用。

**這份指南的前提：文章是寫給人看的，不是寫給 AI 看的。**

2026-09-17 改版。先前這份是《AEO 文章寫作指南》，主張用問句當標題、加文字雲目錄、
把 FAQ 寫長以便被 AI 抽取。實際做出來的文章讀起來像機器寫的：標題全是問句、
到處是粗體、段落長度整齊得不自然、FAQ 塞到九題。已全部停用。

現在的基準是**新聞體**，參考風傳媒的長照政策報導寫法。

---

## 怎麼寫

### 開頭：導語破題，不要鋪陳

第一段就把事實講完：誰、多少錢、什麼時候、什麼條件。不要「在長期照顧的漫長路上」
這種時代大帽子，也不要先解釋背景再進主題。

### 小標題：名詞短語，不是問句

- ✅ 「一張表看懂 115 年住宿式機構補助新制」「住院天數怎麼算，是最容易算錯的一段」
- ❌ 「誰領得到？」「一個月要住滿幾天才算？」「什麼時候要送件？」

整篇全是問句標題是上一版留下的 AEO 習慣，讀起來很像 FAQ 機器人。

### 一張統整表，不要散裝好幾張

政策類文章最有用的是一張**縱向的統整表**：左欄是評比項目（金額、資格、認列、
申請、撥款、期程），右邊是新舊制對照。項目盡量列滿，讓人一張表看完。

細節性的小表（例如天數門檻換算）可以另外放，但不要把統整表拆成五六張。

### 來源寫在句子裡

- ✅ 「衛福部核定本明定⋯」「核定本規定，申請人在補助年度內隨時可以提出」
- ❌ 文末列一個「資料來源」大表格

文末保留一行小字註明主要依據與更新日期就好。引用政策時直接寫出處在哪一份文件，
比列表格更可信，也比較好讀。

### FAQ 最多三題

只留真的會被問、而且前文沒講清楚的。九題 FAQ 是為了餵 schema 才寫的，
對讀者是負擔。用一般的問答區塊就好，不必做成手風琴。

### 語感

改寫時跑 `speak-human-tw` skill。重點：

- 全形標點，台灣用語（資訊／品質／水準，不是信息／質量／水平）
- 粗體一段最多兩三個詞，不要整段都粗
- 不要「三件事：⋯」「拆成兩句話：」「原則就一句：」這種機械式導引句
- 不要罐頭結尾（「讓我們一起⋯」「總的來說」），可以停在最後一個具體句子
- 句子長短交錯，允許不對稱

---

## 選題

想業務每週被問到的同一個問題、客服每週處理的同一個流程。那些才是機構真正在問的。

站上目前完全沒有的題目：日照評鑑文書、居服核銷退件、長照 3.0 對機構的實際影響、
舊系統資料轉移、藍牙生理量測配對排除。依機構類型分眾寫（住宿式／日照／居服），
不要一篇打通。

---

## 圖表與重點色（2026-09-17 新增）

文章太多字會沒人讀完。政策類文章建議配 3 到 5 組說明性圖表：

| 用途 | 形式 |
|---|---|
| 三個關鍵數字 | 開頭並排三格 |
| 分類判斷（這位住民屬於哪一類） | 決策流程 |
| 門檻的斷崖效果 | 兩欄對比 |
| 多個日期 | 時間軸 |
| 容易誤解的規則 | 兩分支流程 |

### 顏色規則

重點底色一律用 `--primary--accent`（#00b2c0），這是品牌主色，由 Terris 定案。

| 用途 | 色值 |
|---|---|
| 重點底色（表頭、重點欄、數字卡） | `--primary--accent` ＋ `--neutral--white` 白字 |
| 重點底上的數字 | `--neutral--white` ＋ `font-weight:700` |
| 一般強調文字、圖示、時間軸節點 | `--primary--accent` |
| 淡色 wash（可選項、次要 highlight） | `--gradient--teal` ＋ 深色字 |
| 卡片底 | `--neutral--white` |

**已知取捨：** #00b2c0 配白字的對比是 2.58:1，低於 WCAG AA 的 4.5:1。
這是品牌識別優先於無障礙標準的決定，不是疏漏。做法上要補償：
重點底的字一律 `font-weight:600` 以上，字級不低於 .9375rem，
不要在重點底上放小字或細體。內文長段落不要用重點底。

**不要用 `--gradient--light-teal` #9df8ff 當重點底上的強調色**：
在 #00b2c0 上只有 2.13:1，比白字更糊。要強調就用白字加粗。

**不要用 `--primary--ocean` #175e5e 當重點底**：偏墨綠，視覺過重，已停用。

**不要自己調深色版本**（例如 #007b85）：試過，Terris 認為偏離品牌色，已否決。

### 狀態表示

站上沒有紅綠狀態色，不要自己發明。用 **teal = 可以／符合**、**灰 = 不可以／不符合**，
而且一律配 ✓／✕ 符號與文字，不靠顏色單獨表意。

---

## ⚠️ 用 API 寫進去的 HTML，在 Webflow 後台編輯過就會被吃掉（2026-09-17 實測）

只要在 Webflow Designer 或 Editor 打開文章、動到 Rich Text 欄位再儲存，
Webflow 會用它自己的 sanitizer 重寫整個欄位。實際發生過的損壞：

| 原本寫進去的 | 編輯後變成 |
|---|---|
| `<style>` 區塊 | 變成一個 `<p>`，CSS 原始碼直接顯示在頁面上，樣式全失效 |
| `<table>`（3 個） | 全部塌成 `<p>` + `&nbsp;` + `<br>`，**表格結構與部分儲存格文字直接消失** |
| `<div class="jb-qa">` | 攤平成連續 `<p>`，class 不見 |
| `<h2 style="...">` | inline style 被移除 |
| 自訂 `<figure class="jb-figure">` | 改寫成 Webflow 原生 `w-richtext-figure-type-image`，但 `data-rt-align` 留空、`height` 屬性保留，圖片顯示比例錯誤 |

**儲存格內的文字會真的不見**，不是只有樣式跑掉。例如 `<span>1 萬 5,000 元</span>`
與 `<strong>12 萬元</strong>` 編輯後整段消失，肉眼看表格是空的。

### 因應方式

1. **這類文章的 Content 欄位，只能透過 API 改。** 要改字請回到 repo 的 HTML 檔，
   改完整份重寫進 CMS，不要在後台直接編輯內文。
2. **後台只改這些欄位是安全的**：Name、Slug、Short Summary、Cover Image、
   Publish Date、News Categories、Show on Homepage、Schema Plain Text。
   這些是獨立欄位，不會觸發 Rich Text sanitizer。
3. **圖片一律用 Webflow 原生 rich text figure 結構**，這是唯一能撐過後台編輯的寫法：

```html
<figure class="w-richtext-figure-type-image w-richtext-align-fullwidth"
        data-rt-type="image" data-rt-align="fullwidth">
  <div><img src="…" srcset="…" sizes="(max-width: 48rem) 100vw, 48rem"
            loading="lazy" alt="…"></div>
  <figcaption>圖說</figcaption>
</figure>
```

不要加 `width` / `height` 屬性，也不要用自訂 class 包 `<img>`。

4. **表格沒有能撐過後台編輯的寫法。** Webflow Rich Text 沒有原生表格。
   如果這篇文章之後還會交給別人在後台維護，表格要嘛改成圖片，
   要嘛接受「只能由 API 維護」這個限制，並在交接時講清楚。
5. 發現內文爛掉時，先用 `list_collection_items` 讀回現況比對，
   確認使用者在後台改了哪些文字（那些要保留），再整份重寫回去。


> 整理註記（2026-10-13）：新聞體寫作取自 9/17 分支；下面保留 master 9/21 修訂的 CMS 技術做法。舊文字雲／問句標題是歷史方案，不自動套用新文章。外部語感 skill 不構成新增安裝授權。

## 表格怎麼放進 CMS（2026-08-24 實測／**2026-09-21 重大修訂**）

> ### ⚠️ 2026-09-21 修訂：舊做法會被 Webflow 消毒，已造成一次內容損毀
>
> 本章 2026-08-24 的結論是「透過 CMS API 把整段 HTML（含 inline style）直接寫進
> `Content` 欄位」。那次測試只驗證了**寫入與渲染**，沒有驗證**之後有人在 Editor／Designer
> 裡編輯這個項目會發生什麼事**。
>
> `/news/residential-institution-subsidy-2026` 踩到了這個坑：
>
> | | `<table>` | 狀態 |
> |---|---|---|
> | 線上已發布版 | 3 | 完整 |
> | 被編輯過的草稿 | **0** | **已損毀** |
>
> **裸 HTML 放在 Rich Text 欄位，只要在 Editor／Designer 裡被存過一次就會被消毒：**
>
> - `<table>` 被拆成 `<p>` 裡一串 `<br>`，**而且會掉內容**（該文有兩格整格消失）
> - `<style>`、`<script>` 變成純文字，直接顯示給讀者看
>
> **新規則（三條，缺一不可）：**
>
> 1. **所有 code 一律包在 `<div class="w-embed">` 裡**（含 `<script>` 者用
>    `<div class="w-embed w-script">`）。Webflow 才會把它當成不可分割的程式碼區塊。
> 2. **表格不要再寫 inline style。** 樣式已集中到兩個 CMS 模板的樣式表，
>    見 `docs/projects/cms-article/history/CMS文章閱讀表面_news與customer-stories.md` §9、§10。
> 3. **寫完一定要重新讀回確認** `w-embed` 數量與 `<table>` 數量正確，不要只看渲染結果。
>
> **⚠️ 2026-10-20 更正：`w-embed` 擋不住 Editor 存檔。** `/news/system-cybersecurity` 的表格、資安 banner、FAQ 都已包在 `<div class="w-embed">`，Terris 在 Webflow Editor 改一個字存檔後，三個區塊全部被拆成純文字，FAQ 問題整段消失，參考文獻的 `class="reference"` 也被拿掉，而且存檔即發布到正式站。
> 結論：**透過 API 寫入、含程式區塊的文章，不可以在 Webflow Editor／CMS 面板直接改字。** 要改字請交給 agent 用 CMS API 改，或先備份完整 HTML（`docs/projects/news/articles/`）再改、改完立即讀回比對。發現被消毒時，以備份 HTML 為來源還原，只套用人工改過的文字。


`/news` 文章內文欄位（`Content`）是 **Rich Text** 型別。理論上 Rich Text 支援表格標籤，
但實測發現：

- **不要在 Webflow Editor 裡手動貼表格。** Editor 的 Rich Text 是所見即所得工具列，
  沒有「貼原始 HTML」的功能，貼進去的表格語法只會變成一串黏在一起的純文字。
- **不要指望在 Designer 幫表格單獨設計樣式。** Rich Text 欄位在 Designer 的元件樹裡是一個
  空殼（沒有可以個別選取的巢狀 `table`／`td` 元件），只有人在 Designer 裡即時預覽「內文真的
  含表格」的項目時，才能用它內建的 Table 格式化面板去調——這是純手動、不能透過工具批次處理的
  步驟，而且效果還沒有正式驗證過。
- **能用、且已經視覺驗證過的做法：透過 CMS API 直接把整段 HTML（含 inline style）寫進
  `Content` 欄位。** `style=""`、`class=""`、`div`、`data-*` 屬性都能完整存活，且 Webflow
  頁面上的 Variables 會編譯成 CSS 變數，inline style 裡可以直接用 `var(--neutral--black)`
  這種寫法引用，不用手打色碼。

### 表格樣板（2026-09-21 起使用這個）

```html
<div class="w-embed">
  <div>
    <table>
      <thead>
        <tr>
          <th>欄位標題</th>
          <th>欄位標題</th>
          <th>結論／效益</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>內容</td>
          <td>內容</td>
          <td>結論</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

就這樣，**沒有任何 style 屬性**。外框、圓角、表頭底色、hairline、手機字級全部由模板樣式表處理。

- **最後一欄會自動套重點色**（teal 底＋加粗），所以請把「結論／效益／數據」放在最後一欄。
  這是刻意的資訊設計，不是裝飾。
- 外層那層 `<div>` 不要省略，它負責手機版的橫向捲動。
- 顏色、間距、圓角都不要自己寫；要調整請改模板樣式表，一次對所有文章生效。

<details>
<summary>❌ 2026-08-24 的舊樣板（已停用，僅供辨識舊文章用）</summary>

舊做法把 inline style 寫在每一格上。若你在既有文章看到下面這種寫法，那是舊版，
**不要複製到新文章**；模板樣式表會用 `!important` 蓋掉它的外觀，但內容仍有被
Editor 消毒的風險，建議順手改成上面的乾淨版。


```html
<div style="overflow-x:auto;margin:1.5rem 0;border:0;border-radius:2rem;background:var(--neutral--white);">
  <table style="width:100%;min-width:42rem;border-collapse:separate;border-spacing:0;font-size:1rem;line-height:1.5;color:var(--neutral--black);">
    <thead>
      <tr>
        <th style="text-align:left;padding:1rem 1.5rem;background:var(--neutral--bg-grey);color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);font-weight:600;">欄位標題</th>
        <!-- 其餘欄位標題比照辦理 -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">內容</td>
        <!-- 其餘儲存格比照辦理 -->
      </tr>
      <tr>
        <td style="padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:0;">最後一列內容</td>
      </tr>
    </tbody>
  </table>
</div>
```

- 外層是白底、`2rem` 圓角、`border:0`；**不可加黑色或灰色外框**。只保留表頭與資料列之間的內部分隔線。
- 所有表頭與儲存格文字都使用 `var(--neutral--black)`，不可用灰字或 `--primary--tag-text`。
- 外層 `overflow-x:auto` 與表格 `min-width` 是手機版防爆版面用的；表格太寬時左右滑動，不要拿掉。
- 顏色只用既有 Variables：`--neutral--white`（卡片底色）、`--neutral--bg-grey`（表頭底色）、
  `--neutral--black`（文字）、`--neutral--black-60`（內部分隔線）。不要手打新色碼。
- 圓角以本次視覺確認的 `2rem` 為準。最後一列不能有底線，避免看起來像另一圈外框。
- 如果同一篇文章裡有標題想跟表格風格搭，可以只在那個 `<h2>`／`<h3>` 上加
  `style="font-weight:700;"`；**不要改全站 tag selector 或 `heading-style-h#` utility class**。

</details>

### 變化樣板：分組列＋斑馬紋（方案／規格比較表用）

> ⚠️ 這個變化樣板**還沒有像上面的基本樣板一樣做過 Webflow 視覺驗證**，只是照同一套規則（顏色只用
> 四個既有 Variables、`border:0`、最後一列無底線）延伸出來的寫法。第一次用在正式文章前，
> 一定要先進 Draft 用 Webflow MCP snapshot 或 Editor 預覽，桌面版／手機版都看過再交人工 Publish。

適用情境：像方案比較、規格比較這種「同一組欄位（例如 Free／Pro／Business）要對照好幾類功能」的表格，
基本樣板的單一群組已經不夠用，需要：

1. **分組列**：用整列 `colspan` 當作分組標題（例如「核心方案」「進階功能」），
   跟表頭一樣套 `background:var(--neutral--bg-grey)`、`font-weight:700`，不要另外發明新樣式。
2. **斑馬紋**：因為樣板刻意不寫共用 `<style>`（見下方「已知的取捨」），沒辦法用 `:nth-child`，
   要斑馬紋就在每個 `<tr>` 內的每個儲存格手動疊 `background:var(--neutral--bg-grey)`（單數列留白，
   雙數列疊灰），顏色一樣只能用這四個既有 Variables，不要手打新色碼。
3. **左右對齊**：第一欄（功能名稱）維持 `text-align:left`；其餘方案欄一律 `text-align:center`，
   對齊方式直接寫在每個 `<th>`／`<td>` 的 `style` 裡，不是靠外層 class。
4. 打勾／未支援一律用純文字符號（`✓`／`–`），顏色跟其他儲存格一樣用 `var(--neutral--black)`，
   **不要把「未支援」的符號調成灰字**——這點跟基本樣板規則一致，只是很容易漏掉。
5. 最後一列規則不變：整列都不能有 `border-bottom`。

```html
<div style="overflow-x:auto;margin:1.5rem 0;border:0;border-radius:2rem;background:var(--neutral--white);">
  <table style="width:100%;min-width:44rem;border-collapse:separate;border-spacing:0;font-size:1rem;line-height:1.5;color:var(--neutral--black);">
    <thead>
      <tr>
        <th style="text-align:left;padding:1rem 1.5rem;background:var(--neutral--bg-grey);color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);font-weight:600;">功能</th>
        <th style="text-align:center;padding:1rem 1.5rem;background:var(--neutral--bg-grey);color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);font-weight:600;">Free<span style="display:block;font-size:0.8125rem;font-weight:400;">$0 / 月</span></th>
        <th style="text-align:center;padding:1rem 1.5rem;background:var(--neutral--bg-grey);color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);font-weight:600;">Pro<span style="display:block;font-size:0.8125rem;font-weight:400;">$24 / 月</span></th>
        <th style="text-align:center;padding:1rem 1.5rem;background:var(--neutral--bg-grey);color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);font-weight:600;">Business<span style="display:block;font-size:0.8125rem;font-weight:400;">$79 / 月</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" style="padding:0.75rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:1px solid var(--neutral--black-60);font-weight:700;">核心方案</td>
      </tr>
      <tr>
        <td style="text-align:left;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">專案數量</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">1</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">不限</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">不限</td>
      </tr>
      <tr>
        <td style="text-align:left;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:1px solid var(--neutral--black-60);">團隊成員</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:1px solid var(--neutral--black-60);">1</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:1px solid var(--neutral--black-60);">10</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:1px solid var(--neutral--black-60);">不限</td>
      </tr>
      <tr>
        <td colspan="4" style="padding:0.75rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:1px solid var(--neutral--black-60);font-weight:700;">進階功能</td>
      </tr>
      <tr>
        <td style="text-align:left;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">數據分析</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">–</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">✓</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);border-bottom:1px solid var(--neutral--black-60);">✓</td>
      </tr>
      <tr>
        <td style="text-align:left;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:0;">單一登入（SSO）</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:0;">–</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:0;">–</td>
        <td style="text-align:center;padding:1rem 1.5rem;color:var(--neutral--black);background:var(--neutral--bg-grey);border-bottom:0;">✓</td>
      </tr>
    </tbody>
  </table>
</div>
```

**這個變化樣板刻意不做的事**（跟原始 Tailwind 版需求的差異，避免下次改版又加回去）：

- 沒有做 `position: sticky` 表頭：這段表格是嵌在文章 Rich Text 內、外層只做橫向捲動、沒有固定高度容器，
  sticky 在這個情境下的實際效果沒有驗證過，貿然加只是製造新的未驗證項目。
- 沒有加 CTA 按鈕：`.cta-button`／`.glass-button` 這類站上既有按鈕樣式被 Slater 綁定
  （見 `custom-code/slater-selectors.md`），不能挪來 Rich Text 內容裡手刻一份「看起來像」的版本，
  這違反 `docs/standards/AI工作守則.md` 鐵律 4「不要用 HTML Embed 畫假 UI」。方案頁如果真的需要 CTA 按鈕，
  屬於 Designer 頁面層級的需求，不是 `/news` 文章表格的範圍。

### 已知的取捨（2026-09-21 更新）

樣式**已經改成集中管理**，不再寫死在每篇文章裡：

- ✅ 間距、border、圓角、表頭底色都在模板樣式表，改一次全部文章生效
- ✅ 顏色綁 Variables，站上主色改了會自動跟著變
- ✅ 內容與樣式分離，文章 HTML 只剩結構，作者不用碰樣式
- ⚠️ 模板樣式表目前用 `!important`，才能蓋掉既有文章殘留的 inline style。
  等舊文章都清乾淨之後可以拿掉

> 2026-08-24 原本寫的是「不要換成共用 `<style>` 再套 class，除非重新做過實際渲染驗證」。
> **該驗證已於 2026-09-21 完成**（見 `18_CMS文章閱讀表面` §9、§10），
> 結論是共用樣式表可行且更穩健，原顧慮解除。

### 建議流程

1. 工讀生／內容負責人交出文章的純文字草稿
2. 交給 Claude，照本文件的結構規則（H1→H2→H3 連續、問句標題、FAQ、目錄）＋上面的表格樣板，
   排成一段完整 HTML，直接寫進一個新的 Draft CMS 項目（`Content`、`Short Summary`、`Name`、
   `Slug` 一次填好）
3. 負責 Webflow 的人在 Editor／Designer 預覽這個 Draft，確認排版、圖片 `alt`、行動版表格捲動
   沒問題
4. 確認沒問題後由人工自己按 Publish——AI 不會自己發布，見 `docs/standards/AI工作守則.md`

---

## CMS 內容型 Code Embed：限定例外與使用範圍

本章是 `docs/standards/AI工作守則.md`「不要用 HTML Embed 做版面」的**限定例外**：只限 `/news` CMS Rich Text
內的內容型元件（文字雲目錄、FAQ），而且必須使用本章已確認的範本。不可把這些範本挪去一般頁面
排版，也不可修改全站 Component、Variables、utility class 或 Slater 綁定的 class。

### 文字雲目錄

通用範本放在 `custom-code/poc/news-toc-tagcloud.html`。視覺已依 2026-08-24 的 Draft 文章與
Webflow MCP snapshot 確認：

- 使用官網 glass button 的視覺語言：半透明漸層、玻璃高光、模糊與柔和陰影。
- **沒有黑色或灰色外框**；`border` 必須是 `0`。
- 文字使用 `var(--neutral--black)`、`1.125rem`、`font-weight:400`。
- 不直接掛 `.glass-button`。這個 class 被 Slater 外部程式綁定，範本改用 scoped selector
  `.aeo-toc a` 重現已確認的視覺，避免影響全站互動。
- 每個連結都要保留 `href`（不能只做成沒有連結的標籤）。`data-heading` 放文章中的完整標題，
  畫面文字則使用短詞。
- 最穩定的方式是透過 CMS API 先給 H2/H3 永久 `id`。若標題沒有 `id`，範本腳本才會用文字比對補上，
  並把連結改指向實際標題。
- Code Embed 的 `<style>` 已在 Draft CMS 內容中確認可保存並顯示；正式網站互動仍要在發布後點擊確認。

### FAQ

通用範本放在 `custom-code/poc/news-faq-accordion.html`。

> **⚠️ 2026-09-21 起：整個 FAQ 區塊（`<style>` ＋ `<details>` ＋ `<script>`）
> 必須包在 `<div class="w-embed w-script">` 裡。** 裸放在 Rich Text 會被 Editor 消毒成純文字
> ——`/news/residential-institution-subsidy-2026` 就是這樣把 CSS 和 JS 顯示給讀者看的。
>
> 另外，**卡片外觀（底色、圓角、邊框、padding）已改由模板樣式表接管**，
> 範本裡那幾行可以留著當 fallback，但實際呈現以模板為準：
> 白底 ＋ `1px` 細框 ＋ `1rem` 圓角（原本的純白無框在新的白色閱讀卡上看不出邊界）。

- 問題文字使用 `var(--neutral--black)`、`1.125rem`、`font-weight:400`。
- 展開與收合都使用高度動畫：展開 `360ms`，收合 `320ms`；收合完成後才移除 `open`。
- 必須更新 `aria-expanded`，並支援 `prefers-reduced-motion`。
- 每題保留 `details > summary + .aeo-faq__answer > .aeo-faq__answer-inner` 結構；不要只改一半 class。
- Webflow Designer / MCP 靜態 snapshot 不會執行 Code Embed JavaScript，所以 snapshot 只能確認外觀。
  正式發布後必須實際點擊每一題，確認「展開、有動畫、可以收回」三件事。

#### FAQ 答案裡提到其他 `/news` 文章時，一律加超連結

如果某一題的答案裡提到「可以參考〈某篇文章標題〉」這種寫法，且那篇文章已經發布、有網址，**把文章標題包成超連結**，直接連到 `https://www.jubo-health.com/news/xxx`：

```html
<p class="aeo-faq__answer-inner">可以參考〈<a href="https://www.jubo-health.com/news/icare02">居服督導的一個月：班表與核銷，系統能接手到哪裡？</a>〉，那篇針對居服情境詳細說明。</p>
```

- 連結只包住文章標題本身（〈〉裡面那段），不要整句話都包進去。
- 每個 FAQ 元件的答案容器都要補一條 scoped 的連結樣式，避免吃到瀏覽器預設的藍色底線：
  ```css
  .aeo-faq__answer-inner a {
    color: var(--primary--accent);
    text-decoration: underline;
  }
  ```
  如果該文章用的是別的 class 前綴（例如某篇專屬的 `.icare01-faq-answer`），比照套用在對應的答案 class 上，不要新建全站共用的連結樣式。
- 同一頁／同一站內的文章互連，不開新分頁（不用 `target="_blank"`）。
- 只連結**已經發布**的文章；還在草稿階段就先用純文字寫標題，等對方發布後再回來補連結。

### 每次製作前的檢查

1. 先讀 `docs/standards/AI工作守則.md`、本文件，以及要使用的 POC 原始碼。
2. 只替換文章內容、標籤文字、`data-heading` 與永久標題 `id`；不要重新發明另一套外觀。
3. 先寫入 Draft，用 Webflow MCP snapshot 檢查桌面版與行動版外觀。
4. snapshot 無法驗證 JavaScript；發布後再做一次真實互動測試。
5. AI 不得自行 Publish，除非 Terris 在當次工作明確授權。

---

## 發布節奏

稽核發現過去 8 個月平均**不到 1 篇/月**，且中間有兩個月空窗。
目標：**穩定的每週或雙週節奏**，比偶爾發一篇長文更有效
——Playbook 說 95% 的 ChatGPT 引用來自過去 10 個月內更新過的頁面，
持續更新比一次衝量更重要。

寫完不要卡在 Draft 太久，`short-summary` 欄位一定要填
（這是 SEO description 的來源，空白會直接影響搜尋與 AI 摘要品質）。

---

## 這份指南不管的事

以下是網站技術端的事，**不是工讀生的工作範圍**，看到了不用處理，回報給負責 Webflow 的人就好：

- JSON-LD／schema 的欄位對不對
- robots.txt、sitemap 設定
- 首頁或其他頁面的 `<main>`／`<article>` 結構
- 站外資料（LinkedIn、Crunchbase 等）數字對不對齊

這些都記錄在 `docs/audits/aeo/AEO稽核與優化計畫.md`，跟文章寫作是兩件事，不要混在一起做。
