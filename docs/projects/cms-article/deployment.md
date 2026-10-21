# 部署紀錄

| 層次 | 本輪狀態 | 證據與限制 |
|---|---|---|
| Git | 已匯入／分類並合併至 master（PR #20，2026-10-13） | [匯入清單](../../workflows/import-manifest.json) 記錄固定來源 SHA |
| Designer | 本輪未修改、未讀回 | master 已包含模板、中文排版、CLS／LCP 修正紀錄；原始碼位於 custom-code/cms-article。來源記錄已有正式站驗證，本輪只重建程式產物，未查正式站是否與 Git 一致。 |
| staging | 本輪未發布、未查證最新版本 | 以來源各日期驗證紀錄為參考 |
| production | 本輪未發布、未查證最新版本 | 不由 Git／staging 推定 |

下次部署另記時間、提交、Page／Embed ID、內容比對及回退方式。

## 2026-10-21 客戶故事方案一

| 層次 | 狀態 |
|---|---|
| Designer | 已修改客戶成功案例s Template（`6a1c22366d4d91ecdbddfca6`），四斷點讀回正確 |
| staging | 未發布 |
| production | 未發布；正式站仍是兩欄舊版 |

修改值、元素 ID、驗證限制與回退步驟見 [方案一紀錄 §5](history/客戶故事單欄閱讀版面_方案一_研究與模擬.md)。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。
