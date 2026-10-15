# 部署紀錄

| 層次 | 本輪狀態 | 證據與限制 |
|---|---|---|
| Git | 已匯入／分類並合併至 master（PR #20，2026-10-13） | [匯入清單](../../workflows/import-manifest.json) 記錄固定來源 SHA |
| Designer | 本輪未修改、未讀回 | 分類整理、客戶故事入口與 CMS 程式紀錄已在 master；News 盤點、內容清理與 9/17 稿件已集中保存。9/22 封面 Image／效能改動來自未合併 PR #16，來源 staging 驗證不等於 production 完成。 |
| staging | 本輪未發布、未查證最新版本 | 以來源各日期驗證紀錄為參考 |
| production | 本輪未發布、未查證最新版本 | 不由 Git／staging 推定 |

下次部署另記時間、提交、Page／Embed ID、內容比對及回退方式。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。

## 2026-10-15 待發布修正

- Git：`codex/article-journey-tracking`，新增 [Head 原始碼與驗證](../../../custom-code/analytics/README.md)。
- Webflow：site `69ec2b02daa2e79f1da8772a` Head 已儲存並逐字讀回；collection `69f82ba2b2602e6d6594d689`、item `6aab4d29bc0fa97a7847135a` 僅更新 content 欄位並讀回相符。
- 文章 lastPublished 仍為 `2026-09-22T00:38:22.420Z`。未發布 staging、production 或 GTM。
- 本機事件／consent 邏輯測試通過；公開資源隔離執行三種 consent 情境通過，正式環境須另驗證。
- 回退檔與內容雜湊見 verification.json；後續有修改時先比對，不覆蓋他人變更。

- GitHub：遠端同名分支已建立於基底 `6b84235d9db02e098422bf9cc4192ebba4edf164`；上傳 tree 被自動審核拒絕，要求對完整 Head、追蹤程式與部署文件外送至該 repo 的明確授權。修改僅保存在本機，PR 尚未建立。

- 2026-10-15 使用者明確授權將修正更新至 repo，並指示「還不要發佈」。本輪只同步 Git 分支及建立審閱 PR；Webflow staging／production 均不得發布。前述自動審核阻擋已取得上傳授權，遠端同步結果以 PR 為準。
