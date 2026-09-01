# 12 AEO 文章寫作指南

給每週固定產出 `/news` 文章的工讀生（與協助寫作的 Claude）用。
**寫文章前讀這份就夠，不需要讀完整份 `11_AEO稽核與優化計畫.md`**
——那份是給處理 Webflow／schema 技術債的人看的稽核報告。

這份文件只回答一個問題：**這篇文章要怎麼寫，AI 答案引擎才會願意引用它。**

---

## 為什麼要這樣寫（不是我發明的，Playbook 有數據佐證）

來源：Webflow × HubSpot《The AI Discovery Playbook》。

1. **開頭直接給答案**，不要鋪陳。讀者（跟 AI）都沒耐心看到第三段才知道重點。
2. **用問句當標題**（H2/H3 寫成使用者會問的問題），不要用形容詞式標題。
3. 買家要比較選項時，**給表格**，不要寫成一整段散文。（表格實際怎麼放進 CMS，見下方「表格怎麼放進 CMS」章節，Rich Text 欄位對表格的支援不穩定，不能直接手動貼表格進 Webflow Editor）
4. FAQ 放在自然的位置（文章結尾、或段落之間），不要硬湊。
5. 有具體數據、客戶案例就引用，並**標明出處**（哪個機構、哪個時間點）。
6. **文章加目錄**：Webflow 自己測試，部落格文章加目錄後四週內 AI 來源流量 +59%、SEO 流量 +23%。文章超過 3 個 H2 就加。

> 這六條的共同邏輯：AI 抓取一篇文章時，是在找「可以直接抽出來回答問題的一段話」。
> 段落開頭就是答案、標題就是問題，AI 抽取的成功率最高。

---

## 這個站目前缺什麼題目（稽核報告的具體發現，直接拿來當選題方向）

站上「常見問題」目前只有 7 題，**全部是品牌層級的問題**（我們是誰、賣什麼、多少錢）。
完全沒有情境化、長尾的照護實務問題——這正是工讀生每週產出最該補的缺口：

- 日照中心評鑑要準備哪些文書？
- 居服核銷退件怎麼處理？
- 長照 3.0 對機構有什麼實際影響？
- 舊系統的資料要怎麼轉移到新系統？
- 藍牙生理量測設備怎麼配對、常見連線問題怎麼排除？
- 依機構類型分眾：住宿型 / 日照 / 居服，各自的痛點不一樣，不要寫成同一篇通用文章

**判斷選題的方法**：想像業務每週被問到的相同問題、客服每週解決的相同流程——
那些才是買家真正在問的，比憑空想關鍵字更準。

---

## 結構規則（沿用站上既有規範，不是新規則）

- **每篇文章恰好一個 H1**，標題本身可以有品牌感，但盡量帶到主題關鍵字
- **Heading 層級連續**：H1→H2→H3，不要跳級（不可以 H1 後直接接 H3）
- 段落開頭先給答案，細節往下鋪陳
- 圖片一定要寫 `alt`：如果圖片本身帶資訊（活動時間、主講人、圖表數字），
  alt 要把那個資訊寫進去，不是隨便寫「示意圖」

---

## 表格怎麼放進 CMS（2026-08-24 實測結論）

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

### 已驗證的表格樣板

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
  這違反 `00_AI工作守則.md` 鐵律 4「不要用 HTML Embed 畫假 UI」。方案頁如果真的需要 CTA 按鈕，
  屬於 Designer 頁面層級的需求，不是 `/news` 文章表格的範圍。

### 已知的取捨

這個做法是把樣式寫死在每篇文章的 HTML 裡，不是集中在 Designer 的共用 class 上：

- ✅ 顏色用 `var(--...)`，站上主色改了會自動跟著變
- ❌ 間距、border 這類數值寫死在每篇文章裡，之後想整批調整要一篇一篇改，不能像改一個 class 一次生效
- ❌ 沒有測過 `<style>` 區塊在正式頁面「顯示」時會不會被過濾掉，所以樣板刻意只用 inline style，
  不要換成寫一段共用 `<style>` 再套 class 的做法，除非重新做過實際渲染驗證

### 建議流程

1. 工讀生／內容負責人交出文章的純文字草稿
2. 交給 Claude，照本文件的結構規則（H1→H2→H3 連續、問句標題、FAQ、目錄）＋上面的表格樣板，
   排成一段完整 HTML，直接寫進一個新的 Draft CMS 項目（`Content`、`Short Summary`、`Name`、
   `Slug` 一次填好）
3. 負責 Webflow 的人在 Editor／Designer 預覽這個 Draft，確認排版、圖片 `alt`、行動版表格捲動
   沒問題
4. 確認沒問題後由人工自己按 Publish——AI 不會自己發布，見 `00_AI工作守則.md`

---

## CMS 內容型 Code Embed：限定例外與使用範圍

本章是 `00_AI工作守則.md`「不要用 HTML Embed 做版面」的**限定例外**：只限 `/news` CMS Rich Text
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

通用範本放在 `custom-code/poc/news-faq-accordion.html`，外觀對齊首頁最下方 FAQ：

- 白底、`2rem` 圓角、無外框、無陰影。
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

1. 先讀 `00_AI工作守則.md`、本文件，以及要使用的 POC 原始碼。
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

這些都記錄在 `11_AEO稽核與優化計畫.md`，跟文章寫作是兩件事，不要混在一起做。
