# 部署紀錄

## 2026-10-20 文章文字連結

| 層次 | 狀態 | 驗證 |
|---|---|---|
| Git | `codex/cms-article-link-styles`；修改 `_article-links.css`、build、兩個 head 及交接文件 | 建置與 `git diff --check`；提交與 PR 另由 Git 記錄 |
| Webflow | news `69f82ba2b2602e6d6594d696` 與 customer-stories `6a1c22366d4d91ecdbddfca6` 的 head 已儲存 | 使用 `get_page_freeform_code`／`set_page_freeform_code`，先讀後寫再讀回；原有內容作完整前綴保留，兩個 footer 未改 |
| 瀏覽器 | 已發布的住宿補助文章暫時套用 CSS 模擬 | 1280／991／767／479 寬度的色彩、底線、hover 與 focus；表格／FAQ fixture 通過；CTA／圖片連結外觀未改 |
| staging | 未發布 | 無發布授權 |
| production | 未發布 | 仍為原有黑字無底線；下次網站發布後再確認 |

本機部署前後完整備份與驗證輸出保存於工作區 `outputs/cms-link-styles-2026-10-20/`（不提交大型截圖或可重建結果）。回退時只移除兩個模板 head 中 `style#cms-article-links` 區塊，並同步回退來源與重新建置；不得復原整份舊 head 而覆蓋後續修改。

## 2026-10-13 文件整理

| 層次 | 本輪狀態 | 證據與限制 |
|---|---|---|
| Git | 已匯入／分類並合併至 master（PR #20，2026-10-13） | [匯入清單](../../workflows/import-manifest.json) 記錄固定來源 SHA |
| Designer | 本輪未修改、未讀回 | master 已包含模板、中文排版、CLS／LCP 修正紀錄；原始碼位於 custom-code/cms-article。來源記錄已有正式站驗證，本輪只重建程式產物，未查正式站是否與 Git 一致。 |
| staging | 本輪未發布、未查證最新版本 | 以來源各日期驗證紀錄為參考 |
| production | 本輪未發布、未查證最新版本 | 不由 Git／staging 推定 |

下次部署另記時間、提交、Page／Embed ID、內容比對及回退方式。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。
