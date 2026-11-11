# 部署紀錄

| 層次 | 本輪狀態 | 證據與限制 |
|---|---|---|
| Git | 已匯入／分類並合併至 master（PR #20，2026-10-13） | [匯入清單](../../workflows/import-manifest.json) 記錄固定來源 SHA |
| Designer | 本輪未修改、未讀回 | 來源最終做法為兩張選擇卡與選後展開導流，使用 contact-router.html；歷史內有 9/10 staging 實測，後續 9/11 仍有調整。文件開頭「未 publish」與後段紀錄不同，不以開頭單一句判斷現在 production 狀態。 |
| staging | 本輪未發布、未查證最新版本 | 以來源各日期驗證紀錄為參考 |
| production | 本輪未發布、未查證最新版本 | 不由 Git／staging 推定 |

下次部署另記時間、提交、Page／Embed ID、內容比對及回退方式。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。

## 2026-11-05 台南辦公室資訊

| 層次 | 狀態 | 證據 |
|---|---|---|
| Designer／CMS | 已修改並讀回 | CMS item `6a1d494769e6b56a2019e801` lastUpdated `2026-11-05T08:10:58Z`；page `6a029cadbc58c46b16389346` JSON-LD lastUpdated `2026-11-05T08:11:06Z` |
| staging | 已發布（內容同 production） | 2026-11-11 curl staging `/contact` 有 06-703-2166、無 9623-566；站點 Last Published 2026-11-11 13:50:12 UTC |
| production | **已上線**（非本專案 agent 發布；推斷隨 2026-11-10 三三分享會全站發布） | 2026-11-05 線上仍為舊址與 (07) 9623-566；2026-11-11 curl `/contact`（Last Published 2026-11-10 14:01:16 UTC）卡片、地圖連結與 JSON-LD 皆為新址新電話，舊值不存在，見 [現況](current-state.md) |

回退：CMS 與 JSON-LD 改回 [現況](current-state.md) 表格的舊值。發布時需同時發布 CMS item 與網站（JSON-LD 為頁面設定）。
