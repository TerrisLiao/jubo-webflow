# 部署紀錄

| 層次 | 本輪狀態 | 證據與限制 |
|---|---|---|
| Git | 已匯入／分類並合併至 master（PR #20，2026-10-13） | [匯入清單](../../workflows/import-manifest.json) 記錄固定來源 SHA |
| Designer | 本輪未修改、未讀回 | 來源截至 2026-10-13 §12-65：Hero 照片只做 opacity 0→100% 淡入，2.4 秒；頁尾 CTA 只保留標題「想進一步了解智齡的資安策略？」與「與我們聯絡」→ /contact。來源記錄 Draft、未 Publish；實際觀感尚未瀏覽器目視。v1–v12 早期版型保留作歷史，不能直接當現況。 |
| staging | 本輪未發布、未查證最新版本 | 以來源各日期驗證紀錄為參考 |
| production | 本輪未發布、未查證最新版本 | 不由 Git／staging 推定 |

下次部署另記時間、提交、Page／Embed ID、內容比對及回退方式。

## 2026-11-11 §12-66 ISO/IEC 29191 上線確認

| 層次 | 狀態 | 證據 |
|---|---|---|
| Git | §12-66 只在 `claude/beautiful-lovelace-x8dv2l` @ `b0ac499e0960e643d8a645c701f98baa97506fb7`（PR #18 未合併）；本輪在 master 專案文件記錄上線狀態，未匯入歷史正文 | 來源紀錄寫「2026-11-09，未 Publish」 |
| Designer | 2026-11-09 修改並讀回（來源 §12-66）；本輪未重新讀回 | 新格 `51c24456-…5eb6`，Page `6aaa6709b9f4c19aae5a5d4f` |
| staging | 已發布（含 29191 格） | 2026-11-11 curl；站點 Last Published 2026-11-11 13:50:12 UTC |
| production | **已上線**（非本專案 agent 發布；推斷隨 2026-11-10 三三分享會全站發布） | 2026-11-11 curl `/security`，Last Published 2026-11-10 14:01:16 UTC：8 格、29191 格、說明段落、meta／OG／JSON-LD 皆符合 §12-66，medium 2 欄 CSS 已發布；細節見 [現況](current-state.md) |

§12-66 之前 §12-61～§12-65 的修改是否也一併上線，本輪沒有逐項比對；不要由本表推定。

回退：刪除 29191 格、Bluetooth 格加回 `is-center`、medium 改回 3 欄、說明段落與 SEO／JSON-LD 改回不含 29191，再另取發布授權。

首頁資安卡片的 29191 徽章不屬本頁：staging 已有、production 尚無（2026-11-11 curl），見 `claude/wizardly-euler-pkb3in` 的 `docs/projects/home-notes/deployment.md`。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。
