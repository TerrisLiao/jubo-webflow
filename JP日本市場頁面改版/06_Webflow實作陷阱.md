# 06 Webflow MCP 實作陷阱

> **用 Webflow MCP 動手前先讀這份。** 以下每一條都是本專案實際踩到、且**曾經讓我誤判方向**的坑。
> 共同教訓只有一句：**`status: "success"` 不等於真的寫進去了，一律讀回來驗證。**

## 1. `set_link` 用 `linkType: "page"` 會靜默失敗

回報 `status: success`，但讀回來 `linkType` 仍是 `none`。
本專案因此一度有兩顆跨頁 CTA 變成死連結而沒被發現。

✅ **正確作法**：一律用 `linkType: "url"` + 路徑字串（例：`/jp/about-us`），設完**讀回驗證**。

## 2. `DivBlock` / `TextBlock` 不支援寫入文字

用 `data_element_builder` 建立 `DivBlock`（有時 `TextBlock` 也會被判定成純 `Block`）再 `set_text`，
會**靜默無效**或直接回報 `This element doesn't support text`。
本專案因此讓 overview 團隊組成的 **12 個職能標籤空白了一段時間**才被發現。

✅ **正確作法**：需要文字的元素用 **`Paragraph`**（或 `Heading`）。建完一定要 `query_elements` 確認有 String 子節點。

## 3. `update_style` 同一次呼叫裡「移除 + 新增同一個屬性」會互相抵銷

在同一個 `update_style` 裡同時把某屬性放進 `remove_properties` 又放進 `properties`，
結果是**該屬性完全沒被寫入**（讀回來根本沒有那個 key）。
本專案因此讓 header 的 `position` / `top` / `right` 全部落空，元素等於 `position: static`，
排在頁面最下方，Terris 回報「按鈕根本沒出現」。

✅ **正確作法**：同名屬性要「先移除、後改值」時**分成兩次呼叫**，並讀回確認。
（不同名的屬性放同一次呼叫是安全的。）

## 4. 表單欄位的 placeholder **無法**透過 MCP 設定

`FormTextInput` 的 `query_settings` 只列出 `domId`／`visibility`／`name`／`required`／`type`，
**沒有 placeholder**；用 `set_attributes` 硬加 `placeholder` 會持續回報 internal error。

> 註：`/contact` 頁的輸入框確實有 placeholder，那是在 Designer UI 內設定的，API 讀不到也寫不了。

✅ **正確作法**：改用**顯性標籤**放在輸入框上方（本專案的 `jp-about_field-label`，
`white-space: nowrap` 確保不換行）。不要假設「設了 `name` 就會自動變成 placeholder」。

## 5. 上傳 asset 後是**非同步處理**，變體生成前畫面是空白

透過 `create_asset` + S3 presigned POST 上傳後，檔案在 CDN 立刻可取（HTTP 200），
但 Webflow 端要再花約 **2–3 分鐘**生成變體。在那之前 Designer canvas 會把圖片**render 成空白方框**
（尺寸正確、內容空的），很容易誤判成「檔案壞了」或「樣式錯了」。

✅ **判斷方法**：`get_asset` 看 `variants` 是否為空、`lastUpdated` 是否仍等於 `createdOn`。
是的話就是還在處理，**等就好，不要急著改樣式或重做版面**。

## 6. 廣泛查詢會有延遲，精確查詢才可靠

用 style 或 tag 之類的條件做**廣泛 `query_elements`**，剛寫入的變更可能還沒反映（回傳舊資料甚至 0 筆）。

✅ **正確作法**：驗證單一元素時用 **`element_id` 精確查詢**，那個是即時且可靠的。

## 7. `element_snapshot_tool` 可能回傳**過期畫面**

本專案遇過：連續多次 snapshot 回傳**像素完全相同**的圖，即使中間已經新增／刪除元素、
甚至加了紅色背景也毫無變化；最後對剛建立並已驗證存在的元素做 snapshot，
直接回報 `Element not found` —— 證實該工具當下看到的是**過期的頁面狀態**。

✅ **判斷方法**：如果改了明顯會影響外觀的東西（背景色、間距）而 snapshot 毫無變化，
**先懷疑畫面過期**，用 `query_elements` + `query_styles` 讀回結構與樣式來確認真實狀態，
不要因為畫面沒變就開始亂改 CSS（本專案就因此多繞了好幾圈）。

## 8. 動畫多半不在 CSS 裡 —— 不要手刻，直接用既有 component

站上的按鈕動畫**不是 CSS**：
- **文字逐字位移** 由 Slater 透過 `data-button-animate` / `data-button-animate-chars` 驅動。
- **箭頭滑入滑出** 是**兩份圖示疊放**（`gradient-icon is-1` / `is-2`），由 **Webflow Interactions（IX2）** 以 `data-w-id` 綁定。

**MCP 讀不到也寫不了 IX2。** 手刻一顆長得像的按鈕，結果就是**完全沒有動畫**（本專案踩過）。

✅ **正確作法**：直接插入既有 **Glass Button component**，用 props 設定文字與連結。
需要定位就在外面包一層自己的 wrapper，不要重做按鈕本體。
同理，`/products/care-assistant-app` 的捲動卡片效果也是 IX2，MCP 無法複製（見 `05_待辦與待確認.md` C3）。

## 9. 全站共用 class 不要直接改，用 combo 縮小影響範圍

需要給某個 section 加 `position: relative` 當定位基準時，**不要直接改 `section_about`**
（全站多處共用，會波及其他頁面）。

✅ **正確作法**：建 combo（例：`section_about.is-has-logo`）只套在那一個元素上。

## 10. 專有名詞要逐字核對，不可憑記憶重打

寫入人名後讀回，發現「康仕仲」變「康仂仲」、「李泓其」變「李泹其」。
一度以為是第 1 條那種「回報成功但沒寫入」的平台問題，**逐字比對後確認是我自己打錯字**
（形近字），而且修正時又重複打錯同一個字。

✅ **正確作法**：人名、學位、公司名這類不可用近似字替代的內容，
**逐字核對來源文字**，修正後用 `element_id` 精確查詢重新讀回，不要只看 `status: success`。


## 8. 不可用 mutation 反查 style／刪除前需 Designer 確認

2026-08-20 稽核時，連接器可讀元素樹與 class 掛載，但無法可靠取得所有 class 的全站使用次數及四斷點全部 computed properties。不要為了「看屬性」先修改 style 再改回；這會製造真實網站變更。疑似孤兒 class 只能列為候選，最後需在 Designer Style Manager、Slater selector、IX2 與 Component 使用情況交叉確認。
