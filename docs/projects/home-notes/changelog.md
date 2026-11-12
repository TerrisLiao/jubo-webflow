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

第五輪（同日）：

19. Terris 回報中間仍有格線。把區塊插進正式首頁實際截圖後找到兩個原因：(a) 背景光暈的徑向遮罩在區塊上緣仍有約三成不透明，被 `overflow: hidden` 硬切；(b) 本區有 30% 白底、下方資安卡那段沒有。修正：遮罩改為上下線性淡出；底色改成 `background-image` 由 30% 白往下淡到透明（移除 background-color）。
20. 人物資訊收進卡片、加引號：`home-notes_bubble` 改為直排卡片（引號 → 引言 → 細線 → 頭像與署名），同排等高、固定寬 24rem；新增 `home-notes_quote-mark`（Georgia「“」青→紫漸層）與 `home-notes_text`。刪除兩排後重建，逐則讀回 14 則引言與署名，全部相符。
21. whtml 把 `font-family` 截成 `Georgia`，已用 style API 補回 `Georgia, "Times New Roman", serif`。
22. 進場動畫：原「署名列上浮」改為「引號依序跳出」。

第六輪（同日）：

23. Terris：交界線已消失；卡片間隔太大；機構名＋系統別＋功能名資訊太多，首頁不顯示系統別。
24. 卡片左右間距 5rem → 2rem、兩排間距 2.5rem → 2rem。
25. 移除系統別：重建兩排，`home-notes_from` 只放功能名（深青、粗體）；刪除 `home-notes_from-sep`、`home-notes_from-feature`。逐則讀回 14 則引言、署名、功能，全部相符。
26. 引號改用 SVG：Terris 的 Designer 截圖中「“」字型引號相對引言向右偏約 55px，原因未確認（推測與字型或文字裁切有關）。改成 `background-image` data URI 的漸層 SVG，固定 2rem × 1.5rem、靠左，不再依賴字型；元素內不留文字。

第七輪（同日）：

27. Terris：功能名移到卡片右上角、顏色淡一點；姓名與機構留在下方。重建兩排：新增 `home-notes_card-top`（引號＋功能名同列）；`home-notes_from` 改為 `primary/tag-text`、一般字重、靠右；`home-notes_org` 改為固定換行。逐則讀回 14 則，全部相符。
28. 產出「首頁夥伴回饋_證言上架確認表.xlsx」給 CS 顧問向客戶確認授權：14 則依網站順序，附顧問原始紀錄、需特別確認事項、同意與否下拉選單。檔案含客戶姓名，不進 repo，交給 Terris 保存。

第八輪（同日）：首頁資安卡片新增 ISO/IEC 29191（不屬於夥伴回饋區，順手記在這裡）

29. Terris：新取得 ISO/IEC 29191，徽章要和現有 ISO 徽章完全一樣，只改數字。
30. 以 `jubo-cert-iso-27001-slate-v3.webp`（293×360、透明底、單色約 #49525E）為底：保留上方地球與「ISO」，數字列（第 280–339 列）清空後重畫「29191」。字型用 Liberation Sans Bold，比對現有數字字形最接近；字高、字寬比例、置中位置都依 27001 量測值。用同方法重畫「27001」比對原圖，數字列平均 alpha 誤差約 3.4／255。
31. 上傳為 asset `6af471398e5b13707f905cc1`（`jubo-cert-iso-29191-slate-v3.webp`），CDN 回 200。
32. **正式首頁**（page `69ec2b03daa2e79f1da8772e`）資安卡片 logo 列：在 ISO 13485 之後新增 Image `51f5ef32-28b6-cace-289e-3bf4a7ef85d5`，class `home-security_logo` + `is-badge`，alt「ISO/IEC 29191」。草稿頁同位置也加了一張（`067819e5-17dc-c919-77fa-0b7a7c32de3d`）。
33. 用 Playwright 在正式首頁注入同一張圖量測：1280／1440／1920 寬下 logo 列都沒有溢出（最後一個 logo 右緣等於容器右緣）；手機 390 寬會換成三列。未 Publish。
34. Terris 授權先放 staging：只發布 webflow.io 子網域（`customDomains: []`），正式網域未動。發布前確認草稿頁 `draft: true` 會被排除；發布後 `/home-notes-draft` 在 staging 回 404，首頁 logo 列出現 ISO/IEC 29191。
35. 2026-11-12：Terris 把確認表放到自己的 OneDrive（「官網客戶回饋卡片_資訊確認表.xlsx」，14 則）。依同格式擴充成 2026 全年版：首頁 14 則＋卡片牆預備 36 則（A 27、B 9），另一頁列 10 則暫不上架（C 級）及原因；新增放置位置、季度、分級、職務分類欄。Microsoft 365 連線只有讀取權限，無法直接寫入 OneDrive，改傳檔案由 Terris 覆蓋。檔案含客戶姓名，不進 repo。

工具筆記：
- whtml 會丟掉 `<script>`；Embed 要用 element builder 的 `HtmlEmbed` ＋ `settings: [{key: "code", static_text}]`。
- whtml 的 css 支援 `var(--…)` 並綁成 Variable；`border`、`padding`、`border-radius` 簡寫會被展開。
- whtml 會壓掉部分空白（`40%at`、`0-0.5rem`），仍是合法 CSS。
- `query_styles` 的單段 `name_path` 不會回傳 combo，要用兩段查。
- whtml 裡沒有對應 css 規則的新 class 不會被建立，元素會變成無 class（本區塊人數列的文字容器即是，無樣式需求，保留）。
- 一次送 40 個 `remove_style` 會讓工具逾時（60 秒），但伺服器端實際已全部刪完；逾時後先查現況，不要直接重送。
- whtml 裡沒有 css 規則的 combo（例如 `is-reverse`）不會被建立；需要狀態標記時用 data 屬性。
- JSON 參數可以直接寫中文，不需要 \\u 跳脫。
