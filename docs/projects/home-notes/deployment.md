# 部署紀錄

| 層次 | 狀態 | 日期／版本 | 證據 |
|---|---|---|---|
| Git commit／PR | 已提交於 `claude/wizardly-euler-pkb3in`，未開 PR | 2026-11-11 | 本分支 |
| Webflow Designer | 已寫入**草稿頁** `/home-notes-draft`（page `6af435313191d17e194df8e1`） | 2026-11-11 | Data API 讀回元素、樣式、Embed code、IX3 |
| 正式首頁（Designer） | 未改動 | — | — |
| staging | 未發布 | — | — |
| production | 未發布 | — | — |

## 客製程式

| 檔案 | 部署位置 | 版本 |
|---|---|---|
| `custom-code/home-notes/home-notes-embed.html` | 草稿頁 HtmlEmbed `c85b8868-4624-6379-19d8-02c2b23fe785`（`section_home-notes` 最後一個子元素） | 2026-11-11；Webflow 上是去掉註解與縮排的同一份程式 |
| `custom-code/home-notes/home-notes.css` | Webflow Style（非 Embed）；class 定義的來源紀錄 | 2026-11-11 |

## IX3

第四輪重建後：`i-01561aa9`（進場）、`i-c6a6fd0a`（漸層漂移）、`i-3516cd82`（hover）。前三輪的 `i-667c58c2`、`i-bec9fa2c`、`i-9451ac8f` 已刪除。scope 皆為草稿頁。

## 發布前必須滿足

1. 客戶授權完成，卡片文字依授權結果更新。
2. Terris 在 Designer Preview 驗收。
3. Terris 明確授權 Publish。

## 搬進正式首頁的步驟（未執行）

1. 在正式首頁 `section_cases-slider` 之後用同一份 HTML 重建（class 已存在，不需再帶 css）。
2. 重建 HtmlEmbed。
3. 把三個 interaction 的 scope 與 `wf:inst` 目標改成正式首頁的 page id 與新 element id（或另建一組）。
4. 讀回驗證後，刪除草稿頁與它的 interaction。

## 回退

刪除草稿頁上的 `section_home-notes`（含 Embed）與三個 interaction 即可；正式站不受影響。若要連 class 一起清掉，刪除 `section_home-notes` 與 `home-notes_*`（確認無其他頁面使用後）。
