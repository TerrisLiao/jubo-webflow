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
| staging | 2026-10-21 Terris 授權後整站發布到 `jubo-health.webflow.io`（publishTaskId `714eca81-1f2f-4af0-9906-79cb007c847e`），已驗證，見下 |
| production | **未發布**。單頁發布不支援（API 400 `Invalid parameter: pageId`）；整站發布會一併上線 2026-10-20 另一工作階段寫入、只在 staging 的 AEO `ul/li`（`list-contents`）5 頁修改，待 Terris 決定 |

修改值、元素 ID、驗證限制與回退步驟見 [方案一紀錄 §5](history/客戶故事單欄閱讀版面_方案一_研究與模擬.md)。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。

### staging 驗證（2026-10-21，實際 Webflow 輸出）

- 故事頁 jubostory14、jubostory03，寬度 1440／1280／1024／768／390：左欄 `display:none`；封面 1024／1024／896／736／366px；白卡 896px（≤991 隨容器）；內文 20px／行高 35px，390 為 18px／27px；文末 3 卡（≥768 grid、390 橫列）；按鈕列「看全部成功故事 → /customer-success-stories」「我想分享故事 → Forms（_blank）」；CTA 區塊 → `/contact`；不含目前文章；h1 只有 1 個；無水平捲動；無 console／page error；分頁元素不存在。
- `/news/ltc-guide` 內文仍是 18px／27px，未受 embed v14 影響；`/customer-success-stories` 的「我想分享故事」仍在。
- 手機 Glass Button 圖示圓圈為空白，與列表頁同一元件相同，非本次造成。

### 正式站發布前的阻擋事項

正式網域最後發布 2026-10-20 09:34 UTC；之後 `/`、`/contact`、`/company`、`/ai/jubo-ai`、`/products/day-care` 有 `ul.list-contents` 修改（紀錄見 `origin/claude/eloquent-feynman-p6is8u` 的 `docs/audits/aeo/Webflow_AEO_Assessment_2026-10-20.md` §C3，標示「未 Publish」）。2026-10-21 讀回：staging 有、正式站沒有。整站發布會把它一起上線，需 Terris 確認。
