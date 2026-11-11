# 歷程

## 2026-11-11

1. 讀 CS 故事收集表（2025Q2–2026Q4，約 114 則）。2026 年 60 則分級：A 41、B 9、C 10。
2. 用 Mobbin 找參考；Terris 選定 Wispr Flow（卡片與標題）、Contra（篩選）、Clay（首頁節錄＋完整牆）。
3. 本機預覽 v1（彩色標籤、傾斜弧線）被退；v2 簡化後 Terris 認可排版，要求加動畫、融合玻璃卡片、做進 Webflow。
4. Webflow：`create_branch` 回 403（非 Enterprise）。改建草稿頁 `/home-notes-draft`（複製首頁）。
5. `data_whtml_builder` 建區塊外殼與全部 class，再建走帶與 14 張卡片；讀回逐張核對引言、署名、機構、功能，全部相符。
6. 程式第一次用 whtml 放 `<script>`，Webflow 存成空的 div（script 被濾掉），已移除。改用 `data_element_builder` 建 `HtmlEmbed` 並帶 `settings: code`，讀回確認整段程式存在。
7. 建三個 IX3 interaction。hover 第一次因 `triggerMetadata` 帶 `null` 欄位被拒，只留 `role` 後成功。
8. 本輪未 Publish，未動正式首頁。

第二輪（同日，Terris 看過草稿頁後的回饋）：

9. 背景改成五團漸層各自漂移，做法與色系取自資安頁 hero 的 `security-hero_blob`（原本是單一靜態光暈整塊漂移）。沒有套 `blur()` 濾鏡，只動 transform。
10. 底部玻璃重做：原本是一條有白色硬邊的直條紋帶，Terris 認為醜。改成較細的直條紋毛玻璃（`blur(16px) saturate(1.35)`，取自 `security-hero_glass`），上緣用 `mask-image` 淡入，加高到 5rem；卡片高度與下方留白各加 1rem 讓文字不被蓋到。
11. 移除「2026 Q4・本季新增 14 則」那一行與兩個不再使用的 class。
12. Terris 問卡片能不能點進下一層：目前不能，卡片不是連結，也沒有詳細頁。

第三輪（同日）：

13. Terris 回報成功故事與本區之間有一條交界線。原因：`section_cases-slider` 有 `neutral/white-30` 底色，`section_home-notes` 原本透明。已把 `section_home-notes` 的 background-color 綁到同一個 Variable（`variable-a8daff70-…`），讀回確認。交界線改落在本區與資安卡之間，與正式首頁原本「成功故事→資安卡」的交界相同。
14. Terris 要求重新構想版面變化與文案；本輪只提方案，尚未改動。

第四輪（同日）：

15. Terris 選定：標籤「夥伴回饋」、版面 A（對話泡泡）、標題「智齡夥伴真心話／全台長照夥伴的使用心得」，說明不提家數。
16. 本機預覽 v5（泡泡兩排）→ Terris：氛圍好但太密。v6 拉開間距（左右 5rem、兩排間 2.5rem）、字放大（引言 1.125rem）、泡泡加寬讓引言維持兩行、系統名縮短、速度降到每秒 20px。
17. Terris 指示直接做到 Webflow。草稿頁上：刪除舊區塊、三個舊 interaction、全部舊 class（41 個，含 combo），以同一份 css 重建新版；兩排各 7 則；新 HtmlEmbed；三個新 interaction。寫入後逐則讀回 14 則引言與署名，全部相符。
18. 大玻璃卡、底部玻璃帶、弧線、頭像疊排與人數列在這個版面都不存在了。

工具筆記：
- whtml 會丟掉 `<script>`；Embed 要用 element builder 的 `HtmlEmbed` ＋ `settings: [{key: "code", static_text}]`。
- whtml 的 css 支援 `var(--…)` 並綁成 Variable；`border`、`padding`、`border-radius` 簡寫會被展開。
- whtml 會壓掉部分空白（`40%at`、`0-0.5rem`），仍是合法 CSS。
- `query_styles` 的單段 `name_path` 不會回傳 combo，要用兩段查。
- whtml 裡沒有對應 css 規則的新 class 不會被建立，元素會變成無 class（本區塊人數列的文字容器即是，無樣式需求，保留）。
- 一次送 40 個 `remove_style` 會讓工具逾時（60 秒），但伺服器端實際已全部刪完；逾時後先查現況，不要直接重送。
- whtml 裡沒有 css 規則的 combo（例如 `is-reverse`）不會被建立；需要狀態標記時用 data 屬性。
- JSON 參數可以直接寫中文，不需要 \\u 跳脫。
