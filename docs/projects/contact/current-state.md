# 聯絡頁導流現況

文件整理日期：2026-10-13；文件更新日期：2026-11-11（只補台南辦公室上線狀態，導流部分本輪未讀回 Webflow）。

來源最終做法為兩張選擇卡與選後展開導流，使用 contact-router.html；歷史內有 9/10 staging 實測，後續 9/11 仍有調整。文件開頭「未 publish」與後段紀錄不同，不以開頭單一句判斷現在 production 狀態。

頁面範圍：`/contact`。

詳細歷史與數值見 [專案入口](README.md)，發生差異時先即時讀回再更新，不從舊段落復原網站。

## 台南辦公室資訊（Webflow 2026-11-05 讀回；production 2026-11-11 curl 確認）

| 位置 | 舊值 | 新值 |
|---|---|---|
| CMS「全球服務據點」item `6a1d494769e6b56a2019e801`（slug `tainan`）address | 台南市歸仁區歸仁十三路一段6號625室 | 711臺南市歸仁區歸仁十五路5號A512室 |
| 同上 phone | (07) 9623-566 | 06-703-2166 |
| 同上 google-map-link | `https://maps.app.goo.gl/gmfsfN1v8sbr2Fsh9`（解析後指向十三路一段6號舊址） | Google Maps 搜尋連結 `臺南市歸仁區歸仁十五路5號` |
| `/contact` 頁 JSON-LD（page `6a029cadbc58c46b16389346`）台南 PostalAddress | 歸仁十三路一段6號625室／(07) 9623-566 | 歸仁十五路5號A512室／postalCode 711／06-703-2166 |

**已上線**。2026-11-11（台北 23:36）curl `https://www.jubo-health.com/contact`（Last Published 2026-11-10 14:01:16 UTC）：

- 卡片顯示「711臺南市歸仁區歸仁十五路5號A512室」與「06-703-2166」，地圖連結為 Google Maps 搜尋 `臺南市歸仁區歸仁十五路5號`。
- JSON-LD 台南 PostalAddress：`streetAddress` 歸仁十五路5號A512室、`postalCode` 711、`telephone` 06-703-2166。
- 舊址「歸仁十三路」、舊電話「9623-566」、舊短網址 `gmfsfN1v8sbr2Fsh9` 都不再出現。
- 推斷隨 2026-11-10 三三分享會全站發布上線，非本專案 agent 發布。staging（Last Published 2026-11-11 13:50:12 UTC）同樣是新電話。

已知未同步：`/jp/about-us` 靜態據點區塊地址已是新址，但電話仍為 `+886-7-9623-566`、地圖連結仍是舊址短網址（2026-11-05 讀線上 HTML；2026-11-11 curl 正式站仍相同）。屬 JP 專案範圍，本輪未改。
