# 13 Webflow 實作陷阱

實際踩過的坑，附上當時的錯誤訊息與正確做法。動手前先掃一遍，可以省下重複試錯的時間。

---

## 1. 寫 JSON-LD 到 CMS Template 頁：**必須傳 JSON 物件，不能傳 `<script>` 字串**

日期：2026-08-26　｜　對象：`/news` 的「新聞中心s Template」（page id `69f82ba2b2602e6d6594d696`）

### 症狀

透過 Webflow MCP 寫 `jsonLdSchema` 到 CMS Template 頁，一直回：

```
WebflowApiError: HTTP 406
```

406 不會告訴你哪裡錯，很容易誤判成「權限不足」或「Template 頁不給寫」。

### 實測過程（四次失敗、第五次成功）

| # | 做法 | 結果 |
|---|---|---|
| 1 | `update_page_settings`，但 page_id 誤填成 **collection id** | 406 |
| 2 | `bulk_update_pages_schema_markup`，正確 page_id，字串含 `<script>` 包裝 | 406 |
| 3 | 同上，但把**原本讀回來、一字未改**的字串寫回去 | 406 |
| 4 | `update_page_settings`，正確 page_id，字串含 `<script>` 包裝 | 406 |
| 5 | `bulk_update_pages_schema_markup`，**改傳 JSON 物件（不含 `<script>` 包裝）** | ✅ 成功 |

### 關鍵教訓

**第 3 次測試是診斷的轉捩點，但我一開始解讀錯了。**

「把讀回來的原字串原封不動寫回去也失敗」——當下我下結論說「所以是 Template 頁根本不給寫」。
**這個結論是錯的。** 正確的推論只到「不是我新加的欄位造成的」，
不能跳到「不給寫」——因為那次測試用的仍然是**同一種被拒絕的格式（`<script>` 字串）**。

> 排除了一個變因，不等於排除了所有變因。
> 診斷時要確認自己換掉的是**哪一個**變因，沒換到的那個才是真兇。

### 正確寫法

工具敘述雖然寫著「Strings wrapped in `<script type="application/ld+json">...</script>` are accepted」，
但**實測在 CMS Template 頁不成立**。要傳物件：

```jsonc
// ❌ 會 406
{ "id": "<page_id>", "jsonLdSchema": "<script type=\"application/ld+json\">{...}</script>" }

// ✅ 可寫入
{ "id": "<page_id>", "jsonLdSchema": { "@context": "https://schema.org", "@type": "NewsArticle", ... } }
```

### 副作用：儲存格式會改變

寫入成功後，該頁的儲存欄位從
`rawJsonLdSchema: "<script>...</script>"` / `jsonLdSchema: null`
變成
`rawJsonLdSchema: null` / `jsonLdSchema: {物件}`。

**這一點還沒有做過線上渲染驗證。** 理論上 Webflow 會把物件序列化回 script tag，
但發布前必須實際 curl 線上 HTML 確認 JSON-LD 仍正常輸出，不能只看 API 回報成功。

### CMS 欄位綁定語法

在物件的值裡照樣可以用 Webflow 的綁定語法，格式與其他欄位一致：

```
{{wf {&quot;path&quot;:&quot;<欄位 slug>&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}
```

---

## 2. `list_collection_items` 的回應可能大到塞爆 context

`/news` collection 只抓 10 筆（含 `content` Rich Text 全文）就有 **150,000+ 字元**。

**做法**：先把結果存檔，再用 `jq` / `python` 取需要的欄位，不要整包讀進來。

---

## 3. 長篇中文內容不要靠「手打」寫進 API

2026-08-26 實測：把 2,000 字以上的繁體中文逐字重打進工具參數，**必定會混入錯字**。
實際發生過的：`兼→兵`、`瑣→琴`、`慧→慮`、`銜→鋒`、`皆→皮`、`逾→逗`、`獨→独`（簡體）、
`徹→彻`（簡體）、`播→掭`、`綁→緑`、`暄→暓`、`廚膳→叚腆`。

**做法**：

1. 內容先落地成檔案，用程式（`jq`／`python`）做 HTML→純文字轉換，不要靠人工轉寫。
2. 寫入後**一定要用程式做 diff 比對**，不要用肉眼檢查：

   ```python
   import difflib
   sm = difflib.SequenceMatcher(None, canonical, stored)
   for tag, i1, i2, j1, j2 in sm.get_opcodes():
       if tag != 'equal':
           print(tag, repr(canonical[i1:i2]), '->', repr(stored[j1:j2]))
   ```

3. 內容越長錯誤率越高。**能寫短就寫短**——把 2,200 字改寫成 600 字的重點摘要後，
   錯誤率才降到可以一次修完的程度。

---

## 4. 查 class 的 CSS，預設只回 Desktop

見 `docs/standards/AI工作守則.md` §6-7。要刪改 class 前一定要查完四個斷點：

```
include_breakpoints: ["main", "medium", "small", "tiny"]
```

---

## 5. API 回報成功 ≠ 線上生效

`docs/audits/aeo/AEO稽核與優化計畫.md` 已記錄過：Webflow MCP 的 schema 查詢不一定會回傳 CMS Template 頁的內容，
稽核時必須抓線上 HTML 驗證。同理，**寫入成功也要抓線上 HTML 再確認一次**，
而且 CMS 欄位／Template 的變更都要等 Publish 後才會上線。

---

## 6. `data_element_builder` 建 TextBlock：`set_text` 不一定寫得進去

日期：2026-11-12　｜　對象：住宿型安心寶頁的類型切換器、住宿型照護系統頁 tab 標籤

### 症狀

用 `data_element_builder` 一次建立巢狀元素時，`TextBlock` 帶的 `set_text` 回報成功，
但讀回後 String 子節點仍是 Webflow 預設字 **「This is some text inside of a div block.」**。
同一批建立的 `Paragraph` 文字是正確的。

另外，同一批建立的 `LinkBlock` 帶的 `set_link` 也沒有寫入，讀回時 settings 裡沒有 `link`。

### 做法

1. 用 builder 建完後，一律用 `query_elements`（`element_filter: {type: "String"}`，加 `scope_element_id`）讀回每個文字節點。
2. 預設字要改 **String 子節點**；對 TextBlock 本身 `set_text` 會回 `This element doesn't support text`。
3. LinkBlock 建完後用 `set_link` 再設定一次，並讀回確認 `settings.link`。

## 7. 站上 body 的 `line-height: 150%` 會以固定 px 往下繼承

站上 `body` 設 `line-height: 150%`，百分比在 body 就算成固定值（約 27px），子元素繼承的是這個 px，不會跟著自己的字級縮放。用 whtml 插入、以 em 縮放的區塊（例如 motion graphic 舞台），字級變小時文字會撐出按鈕、標籤框而跑版。

- 這類區塊的根元素要自己設無單位的 `line-height`（例如 `1.35`）。
- 本地預覽要套站上實際 CSS 再檢查（`custom-code/familyline-mg/sitecheck.js`），只看自製預覽頁抓不到。

