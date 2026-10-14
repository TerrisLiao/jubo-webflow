# 部署紀錄

## 2026-10-14 結案：已發布並於正式站驗收

- 發布：使用者 2026-10-14 06:47:55 UTC 全站發布（含 `www.jubo-health.com`、`jubo-health.com`）；非 agent 執行。
- 內容比對（curl）：`/community` 含新標籤、三段承諾、`community-hero_line-qr-trigger`、QR 素材 `6acf1f5a750cff32e1dab768`、「通知設定」「都開好了」與 `section_nav`，不再含「這週的」；首頁 Footer 有「官方社群」`href="/community"`。發布 CSS `jubo-health.webflow.shared.35b136fe7.min.css` 含新的 hero min-height、visual max-width 與標籤樣式。
- Runtime（Playwright＋正式站實際 IX3）：FB hover 填色 opacity 1、sheen 移至 300%、標籤位移 (28,−6)＋−3°，離開回 0；LINE 由覆蓋按鈕觸發同樣結果；QR 開啟 display flex／opacity 1、關閉 display none、可重開；開關 t3 全關、t7 FB 開、t15.5 FB+YT、t25 全開＋徽章、t33.5 下一輪歸零；reduced-motion 靜態全開、QR 仍可開；390px 無水平溢出、QR 觸發與提示隱藏、LINE 卡直連 lin.ee、Navbar 68px；console 無錯誤。
- 已知限制：1366×768 頻道卡底部 799px，超出第一屏 31px；992–1100px 窄桌機標籤超出（皆列於待辦）。

## 2026-10-14 追加：Navbar 放回、Footer 入口

- Designer：`/community` 插入 Navbar instance `9736c483-5d48-8e9d-7219-c03395d12a2f`；`section_community-hero` min-height（main `calc(100svh - 7.25rem)`、medium `calc(100svh - 4.25rem)`，原 `100svh`）與 `community-hero_visual` max-width（原 `min(38.75rem, calc((100svh - 6rem) * 0.8))`）已更新並讀回。Footer 新增「官方社群」見 [導覽部署紀錄](../navigation/deployment.md)。
- 驗證：以 staging HTML 插入 116px 佔位模擬五種桌機尺寸；非實際 Navbar 渲染。
- staging／production：未 Publish。回退：刪除 Navbar instance，兩個樣式改回原值。

## 2026-10-14 第六輪：AI 漸層框、承諾、LINE 掃碼、通知開關

- Designer（以 Data API 寫入，Designer App 未連線）：樣式、元素、六個 IX3 更新／新增均已讀回。詳見 [第六輪紀錄](history/2026-10-14-ai-frame-qr-notify.md)。
- 素材：新增 `community-line-qr.svg`（`6acf1f5a750cff32e1dab768`）。
- 驗證：本機以 staging HTML 套用本輪結構／樣式，九寬度量測與 QR 解碼通過；非 IX3 runtime、無 JuboFont。Designer Preview 未驗收。
- Git：`claude/gallant-einstein-3tvafg`，以 `codex/community-card-motion`（PR #21）為基底；設定與回退見 [第六輪快照](../../../custom-code/community/2026-10-14-ai-frame-qr-notify.json)。
- staging／production：本輪未 Publish。staging 最後發布為 2026-10-13 12:47 UTC（早於第五輪細修），production 自 2026-10-07 後未發布；先前各輪「未 Publish」的紀錄與 staging 已有 `/community` 不一致，發布來源待查。
- 2026-10-14 補記：site 讀回顯示 2026-10-14 06:07:18 UTC（台北 14:07）有一次全站發布，含 production `www.jubo-health.com`，非本 agent 執行。`/community` 因 `draft: false` 已在正式站回 200；curl 比對正式站與 staging 皆為**第六輪之前**的版本（舊標籤「活動報名」、「這週的新消息」計數卡），第六輪修改（Designer 最後更新 06:37 UTC）尚未上線。

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
