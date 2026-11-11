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

## 2026-11-10 第二十一輪：Footer 與資源頁入口

- 使用者明確要求在 Footer「資源」新增三三分享會，並指定長照專業成長頁的 CTA 改為「了解更多三三分享會」、連到節目專區。
- 共用 Footer definition `bf559d46-0de7-0e5d-3110-35684e2ba87f`：在「長照專業成長」後新增 `88d97a56-e3b4-4044-a064-a371269ceb55`，文字「三三分享會」、`footer-link`、`data-underline-link`，URL `/resources/jubo-33-live-stream`。前後完整樹比對，扣除此新增子樹後完全一致。
- `/resources/education`（page `6a2e38cda77c1ee08c7f8ba1`）Glass Button instance `2179076d-4294-fc5f-f4b8-650f613dd46d`：只覆寫 CTA Text 與 CTA Links，不改 Glass Button definition、樣式與其他實例。
- 已正式發布 task `9de59f8f-6ad3-447f-8f72-041d614e48ef`，www／apex lastPublished 均 `2026-11-10T11:03:04.349Z`，並發布 staging。驗證見 `custom-code/monthly-sharing/2026-11-10-entrances-qa.json`。

回退：移除新增 Footer link，復原資源頁兩個 instance props 後重新發布。原 Footer 既有節點與設定已逐樹核對未變。

驗證完成：正式站首頁、資源頁、三三專區與 12 月 News，以及 staging 資源頁，每頁僅一個 Footer 新入口；點擊 Footer／資源頁 CTA 均到專區，四尺寸無橫向溢出、無 JS pageerror，Footer 新連結字色／字級／行高與相鄰連結一致。
