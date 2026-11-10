# 現況

2026-10-14：Footer Component（`bf559d46-0de7-0e5d-3110-35684e2ba87f`）「其他」欄在「聯絡」之後新增「官方社群」，連到 `/community`（page `6acde90ba4c1734c0e94b297`），元素 `117fd5b6-9a6f-8898-71a8-cca7e6bb397e`，沿用 `footer-link`＋`data-underline-link` 結構；已讀回，並於 2026-10-14 06:47:55 UTC 由使用者發布、正式站驗證。全站 Navbar 定義未修改（使用者確認不在全站導覽列加入口）。

來源 PR #13 已包含在 master，記錄 Navbar 主導覽「客戶」改為「新聞」並已 Publish。這是來源紀錄，本輪未重新讀回 Designer／production，不從 Git 合併推定現在連結與文案。

## 2026-11-10 第二十一輪：Footer 與資源頁入口

- 使用者明確要求在 Footer「資源」新增三三分享會，並指定長照專業成長頁的 CTA 改為「了解更多三三分享會」、連到節目專區。
- 共用 Footer definition `bf559d46-0de7-0e5d-3110-35684e2ba87f`：在「長照專業成長」後新增 `88d97a56-e3b4-4044-a064-a371269ceb55`，文字「三三分享會」、`footer-link`、`data-underline-link`，URL `/resources/jubo-33-live-stream`。前後完整樹比對，扣除此新增子樹後完全一致。
- `/resources/education`（page `6a2e38cda77c1ee08c7f8ba1`）Glass Button instance `2179076d-4294-fc5f-f4b8-650f613dd46d`：只覆寫 CTA Text 與 CTA Links，不改 Glass Button definition、樣式與其他實例。
- 已正式發布 task `9de59f8f-6ad3-447f-8f72-041d614e48ef`，www／apex lastPublished 均 `2026-11-10T11:03:04.349Z`，並發布 staging。驗證見 `custom-code/monthly-sharing/2026-11-10-entrances-qa.json`。
