# 部署紀錄

| 層次 | 本輪狀態 | 證據與限制 |
|---|---|---|
| Git | 已匯入／分類並合併至 master（PR #20，2026-10-13） | [匯入清單](../../workflows/import-manifest.json) 記錄固定來源 SHA |
| Designer | 本輪未修改、未讀回 | 來源截至 2026-10-13 §12-65：Hero 照片只做 opacity 0→100% 淡入，2.4 秒；頁尾 CTA 只保留標題「想進一步了解智齡的資安策略？」與「與我們聯絡」→ /contact。來源記錄 Draft、未 Publish；實際觀感尚未瀏覽器目視。v1–v12 早期版型保留作歷史，不能直接當現況。 |
| staging | 本輪未發布、未查證最新版本 | 以來源各日期驗證紀錄為參考 |
| production | 本輪未發布、未查證最新版本 | 不由 Git／staging 推定 |

## 2026-10-19 production 首頁資安 Banner 讀回（只讀，未修改／未發布）

- 證據：抓取 `https://www.jubo-health.com/` HTML、`jubo-health.webflow.shared.b5cc9c14e.min.css`、`webflow.01629685.971f7c374ec73b66.js`，並用 Chromium 1440px 載入截圖。
- 結果：`section_home-security` 已在 production（§12-44 標題「認證與法規雙重把關／資料安心交給智齡」、盾牌、玻璃光暈、光帶、8 個 logo）；CSS 與 IX3 `i-9edbc02d`（timeline `t-59a71be6`：g1–g4、s1/s1f、s2/s2f、sh、r1、r2）都已發布。Chromium 下動畫正常播放；reduced-motion 時靜止但光暈與盾牌仍可見。
- 使用者回報的畫面右側只剩條紋、沒有漸層，且標題左側盾牌整個消失。這 9 個元素正是 IX3 目標；Webflow 會注入 `html.w-mod-js:not(.w-mod-ix3) [data-wf-target…] {visibility:hidden !important}`（非 reduced-motion 時），IX3 `register` 完成才加上 `w-mod-ix3`。結論：該瀏覽器的 IX3 沒有完成初始化，目標元素一直被隱藏，不是 CSS 或發布缺漏。
- 已排除：reduced-motion；擋掉 jsDelivr、Slater、Webflow／jsDelivr GSAP、Google WebFont 時 Chromium 仍會加上 `w-mod-ix3`。站上自訂程式碼沒有改寫 `<html>` class。
- 限制：本環境沒有 Safari／WebKit，無法重現使用者的瀏覽器；需使用者提供瀏覽器版本、Console 錯誤與 `w-mod-ix3` 是否存在。

下次部署另記時間、提交、Page／Embed ID、內容比對及回退方式。

## 文件整理合併證據

- PR：[#20](https://github.com/TerrisLiao/jubo-webflow/pull/20)，2026-10-13 已合併。
- master 合併提交：`fcbb26d8d4d190676e71a9542c97221365affeb6`。
- 合併後 Documentation checks：success。
- 本次合併只影響 Git；未修改／發布 Webflow，來源文件的網站驗證限制仍適用。
