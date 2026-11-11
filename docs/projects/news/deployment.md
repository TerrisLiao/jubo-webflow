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

## 2026-11-10：EP22／EP23 活動頁 staging

- CMS IDs：EP22 `6af2c8c0a69eb6564dfddd4c`；EP23 `6af2c91814b089835b99d460`。
- 使用者授權審核後正式發布，另核准 EP23 提前公開；兩篇 isDraft:false、日期 2026-11-10，保留原內容並補三三專區連結。
- staging：兩個 `/news/monthly-third-wednesday-sharing-202611`／`202612` 均 HTTP 200，一個 H1、日期正確、課程重點圖片載入、專區連結正常，1440／991／767／390 無橫向溢出。
- production：尚未發布；三三專區問卷送出因執行環境 Cloudflare 連線失敗，等待使用者一般瀏覽器驗證後再依既有授權發布。

## 2026-11-10：EP22／EP23 正式發布

- 使用者成功完成 EP12 問卷下載，Forms 入庫核對後，依既有授權正式發布。
- Webflow task `4e3ef6b6-d85f-4c6f-b47d-9be692311ca5`；www／apex lastPublished `2026-11-10T10:30:53.018Z`。
- 正式站兩篇 `/news/monthly-third-wednesday-sharing-202611`／`202612` 均 HTTP 200；標題、日期、課程重點圖片、專區連結正確，1440／991／767／390 無橫向溢出。EP23 已提前公開。
- 證據：`custom-code/monthly-sharing/2026-11-10-production-qa.json`。EP23 直播網址待活動前補上；雲端環境未驗證 YouTube 實際播放。

## 2026-11-10：EP23 直接直播網址

- 使用者提供 https://www.youtube.com/watch?v=tuOSh2o2qi0，已替換 12 月 News 的參加方式入口，移除「活動前公布」並保留歷屆播放清單，同步 EP23 集數資料。
- task `0a8e0707-34e2-4421-812d-0effccea913e`；www／apex lastPublished `2026-11-10T10:43:25.548Z`。
- 正式站／staging HTTP 200，直播 href 與文字正確，1440／390 無橫向溢出。證據 `custom-code/monthly-sharing/2026-11-10-ep23-link-qa.json`。
