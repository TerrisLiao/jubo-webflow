# 部署紀錄

## 2026-10-13 第五輪：細修已寫入 Designer

- Designer：九組樣式及五個 IX3 已寫入並讀回；整頁結構／內容及三個左側 hover 保留。詳見 [細修紀錄](history/2026-10-13-polish.md)。
- 驗證：六寬度本機 Chromium／GSAP 核心檢查通過；使用者原生 Preview 回覆「Looks smooth」，確認右側卡片／專家 hover 進退與快速回位。完整 32 秒循環、實際字體／素材、keyboard focus 及 reduced-motion 仍待驗。
- Git：續作 [PR #21](https://github.com/TerrisLiao/jubo-webflow/pull/21)，[第五輪快照](../../../custom-code/community/2026-10-13-polish.json) 保存前後設定；未合併。
- staging／production：未 Publish；本輪未改發布 metadata。

## 2026-10-13 第四輪：連續 hover 與乾淨配色

- Designer：六組填色、六個背景色團及標籤左右偏移更新；三個 hover 為單 trigger／單 timeline／10 actions，.7 秒 power3.inOut、togglePlayReverse，卡片本體固定。
- 原生 Preview：使用者在修正後回覆「all done」，記錄為本輪左側確認。先前兩 trigger 的 play／reverse 試作不會回位，未採用。
- 本機：GSAP 3.15 核心模型六寬度裁切檢查、快速方向切換及 desktop／mobile 兩次完整重播通過；不是 Webflow 觸發器自動化測試。
- Git：續作 [PR #21](https://github.com/TerrisLiao/jubo-webflow/pull/21)，尚未合併；設定與回退見 [第四輪快照](../../../custom-code/community/2026-10-13-hover-continuity.json)。
- staging／production：本輪未 Publish，發布站點未驗證；右側播放／reduced-motion 未由本輪左側確認推定。

## 2026-10-13 第三輪：標籤裁切與漸層填色

- Designer：card overflow hidden、tag 本身裁切與隔離；新增六個原生漸層裝飾底層，三個頻道 hover 為各 9＋9 actions，進／出填色 .75／.65 秒。
- Git：續作 [PR #21](https://github.com/TerrisLiao/jubo-webflow/pull/21)，保存第三輪前／後設定與六個底層 ID；尚未合併。
- staging／production：本輪未 Publish，未驗證本輪發布站點。
- 驗證：三個 hover 與六個底層讀回，整頁文字／連結保持一致；四斷點本機裁切／透明／填色檢查通過。未執行 Webflow IX3 runtime，Designer Preview 待驗。
- 設定與回退：[第三輪快照](../../../custom-code/community/2026-10-13-pill-fill.json)。全部回退需依第三輪 → 第二輪 → 第一輪順序。

## 2026-10-13 第二輪：白底卡片與慢速動效

- Designer：左側柔焦漸層只佔上方、文字白底，大型透明 tag 出格與輕浮 hover；九個 IX3 修改已讀回，新增反應表情時間軸 `t-3b83476f`，通知敘事 32 秒。
- Git：續作 `codex/community-card-motion`、[PR #21](https://github.com/TerrisLiao/jubo-webflow/pull/21)，保存前／後設定與交接；尚未合併。
- staging／production：本輪均未 Publish；不能由 Designer 或 Git 推定已上線。
- 驗證：九個 IX3 與預期設定一致；本機四斷點白底、非滿版漸層、透明大 tag 的靜止／hover 邊界通過。Designer snapshot 回 Invalid Base64 string，未驗收原生播放、圖片與字體。
- 設定與回退：[第二輪快照](../../../custom-code/community/2026-10-13-motion-refinement.json)。兩輪都要回退時，先還原第二輪，再依第一輪快照處理；不可刪整頁。

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
