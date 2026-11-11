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

工具筆記：
- whtml 會丟掉 `<script>`；Embed 要用 element builder 的 `HtmlEmbed` ＋ `settings: [{key: "code", static_text}]`。
- whtml 的 css 支援 `var(--…)` 並綁成 Variable；`border`、`padding`、`border-radius` 簡寫會被展開。
- whtml 會壓掉部分空白（`40%at`、`0-0.5rem`），仍是合法 CSS。
- `query_styles` 的單段 `name_path` 不會回傳 combo，要用兩段查。
- whtml 裡沒有對應 css 規則的新 class 不會被建立，元素會變成無 class（本區塊人數列的文字容器即是，無樣式需求，保留）。
