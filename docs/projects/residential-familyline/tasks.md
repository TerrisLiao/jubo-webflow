# 待辦

- [ ] Terris 在 Designer 預覽 v3：分頁切換、三段 LINE 動畫、Hero 組合畫面、四斷點。
- [ ] v3 外診／帳單／活動紀錄是否補做動畫（目前靜態）。
- [ ] v2 讀回 draft=false，確認是否改回 draft，避免整站發布時一起上線。

| 優先 | 事項 | 驗收條件 |
|---|---|---|
| P0 | Terris 在 Designer 目視檢查新頁、兩頁切換器、住宿頁第 3 個 tab（四斷點） | 確認後回報 |
| P0 | Terris 授權發布：新頁 draft → false，與其他頁同次發布 | 分別記錄 staging、production；線上 HTML 讀回 |
| P1 | 確認範例照片（LTC 設計檔長輩照片）可用於官網 | 不可用則換主題 2 圖 |
| P2 | Hero 左側人物照是否換成安心寶相關照片 | Terris 指定素材 |
| P0 | Terris 在 Designer Preview 檢查 4 個 IX3 動畫 | 重複捲動、手機、reduced-motion 皆正常 |
| P0 | Terris 在 Designer 並排比較 v1 `/products/familyline-residential` 與 v2 `/products/familyline-residential-v2`，選定上線版本 | 選 v2 則把 v2 slug 改回正式 slug、刪 v1；選 v1 則刪 v2 與其 4 個互動 |
| P1 | 業務確認 v2 FAQ「收費」「需先使用住宿型照護系統」答案 | 確認或改寫 |
| P2 | v2 FAQ 標題是否補漸層字、三步驟卡片是否加底色 | Designer 目視後決定 |
| P1 | 取得 Jubo Design Team 內原始「Jubo_Website - To Client」連結，新增一頁放住宿型安心寶圖檔，之後統一在該檔更新 | 不改設計團隊既有頁面 |
| P0 | Terris 在 Designer Preview 檢查 v2 三張 motion graphic（桌機、平板、手機寬度字是否太小） | 無跑版；手機字太小則比照資安頁加最小字級 |
| P1 | 檢查 scroll card 左欄：`product-scroll-card_content-left` 是 space-between，編號 tag／H3／列點可能被拉開 | 目視後決定是否把 tag 與 H3 包成一組 |
| P1 | UI 卡 3 張是否也改成操作流程動畫（目前仍是整張進場） | Terris 決定 |
| P1 | 確認 LTC 設計檔的活動照片（長輩）可用於官網動畫 | 不可用則換圖 |
| P2 | Designer Clean Up 清除第一版未使用的 `familyline-mg*` class | 清除後讀回 |
