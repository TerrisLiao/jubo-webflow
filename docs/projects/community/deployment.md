# 部署紀錄

## 2026-10-13 卡片與動效修改

- Designer：本輪已寫入並讀回六個透明 tag、漸層、八處文章文案與 IX3 修改；新增專家 hover `i-f5df8ee0`。
- Page metadata：`draft: false`、`shouldPublish: true`；本輪未更改頁面發布設定。
- staging／production：本輪均未 Publish；尚未驗證本輪更新的發布站點。
- 驗證：元素／設定讀回及四斷點本機樣式重建通過；無 Designer 快照，實際 IX3 播放、圖片與字體待 Preview。
- 設定與回退：[community snapshot](../../../custom-code/community/2026-10-13-card-motion.json)。
- Git：`codex/community-card-motion`，更新交接並建立獨立 PR；與以下文件整理合併紀錄分開。

## 文件整理時的基準狀態（PR #20）

以下保留文件整理當時的快照；Designer 最新狀態以上方卡片與動效修改紀錄為準。

| 層次 | 文件整理當時的狀態 | 證據與限制 |
|---|---|---|
| Git | 已匯入／分類並合併至 master（PR #20，2026-10-13） | [匯入清單](../../workflows/import-manifest.json) 記錄固定來源 SHA |
| Designer | 本輪未修改、未讀回 | 最新來源紀錄 2026-10-13 第六輪：三張頻道卡、人物出格主視覺與 IX3 通知 feed。Draft，未 Publish。來源 snapshot／本機模擬不等於實際動畫驗收。 |
| staging | 本輪未發布、未查證最新版本 | 以來源各日期驗證紀錄為參考 |
| production | 本輪未發布、未查證最新版本 | 不由 Git／staging 推定 |

下次部署另記時間、提交、Page／Embed ID、內容比對及回退方式。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。
