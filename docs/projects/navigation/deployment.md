# 部署

## 2026-10-14 Footer 新增官方社群

- Designer：Footer Component 新增一個 `footer-link`（`117fd5b6-9a6f-8898-71a8-cca7e6bb397e`），文字「官方社群」、page link `6acde90ba4c1734c0e94b297`；讀回正確（Builder 先產生 placeholder 文字且未帶 link，已改寫並讀回）。
- 影響：Footer 為全站元件（約 33 個實例），下次發布全站生效。
- 發布：使用者 2026-10-14 06:47:55 UTC 全站發布；正式站首頁 Footer 已含「官方社群」`href="/community"`（curl 驗證）。回退：刪除該元素後重新發布。

Git：來源與分類已合併至 master（PR #20，2026-10-13）。Designer／staging／production：本輪未操作；來源記錄已發布，下一次工作仍需即時查證。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。
