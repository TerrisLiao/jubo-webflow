# 社群追蹤頁：AI 漸層框標籤、固定更新承諾、LINE 掃碼、通知開關卡

日期：2026-10-14（第六輪）。Page `6acde90ba4c1734c0e94b297`，`/community`。
Git：`claude/gallant-einstein-3tvafg`（以 `codex/community-card-motion` @ `8313c55` 為基底續作）。

## 授權與範圍

使用者先看過 [提案頁](https://claude.ai/artifact/3KKb2B7vYFme7MkRCr1W3d)，回覆：

- 標籤裁切是刻意設計，保留；採用「推薦組合」文案＋「AI 漸層框」樣式，**漸層刷上時去掉框線**。
- 固定更新承諾照建議執行，Facebook 寫「每週更新」。
- 「這週的新消息」計數卡由 agent 自選替代方案 → 選 1「通知開關」。
- LINE 電腦版掃碼加入照提案做。

未授權 Publish；本輪未發布 staging／production。版型、人物、32 秒敘事時間點、三頻道 hover 的 10 個既有動作都保留。

## 已套用

| 範圍 | 結果 |
|---|---|
| 標籤文案 | FB「活動搶先報名／每週更新」、YT「三三分享會／每月直播」、LINE「補助評鑑整理／新文章推播」 |
| 標籤樣式 | 移除 1px ink 外框；標籤本身背景改青→紫漸層（#00B2C0 → #B15DFF，與標題「好消息」同色），內層白底 `community-hero_channel-tag-inner` 內縮 1px 形成漸層框；padding 各加 1px 維持原尺寸 |
| 漸層刷上去框 | 六個填色底層改為不透明青→紫淡色（#C7EEF1 → #ECD8FF），hover 淡入後完整蓋住漸層框，框線消失；離開時倒播、框線回來 |
| 光掃過 | 每個標籤新增 `community-hero_channel-tag-sheen`；三個 hover 時間軸各加 2 個動作（xPercent 0→300，.5 秒，起點 .14／.20），總長仍 .7 秒 |
| 標籤字級 | main `min(1.5rem, 1.7vw)`：1440 以上仍 24px，1280 約 21.8px，讓 6 字標籤滑入後不被裁切；medium 以下維持 1.5rem／small 1.375rem |
| 固定更新承諾 | 每張卡新增 `community-hero_channel-cadence`（ink、500 字重）在說明上方：「每週更新」「每月第三個週三 12:00」「新文章上架當天」；說明改單行「見面會與活動花絮」「三三分享會專家直播」「推播到你的手機」，說明的兩行最小高度取消，整體高度不變 |
| LINE 掃碼（桌機／平板） | 卡片格線加 `position: relative`；新增透明按鈕 `community-hero_line-qr-trigger` 覆蓋 LINE 卡，點擊顯示 `community-hero_line-qr` 面板（LINE 綠框、QR、說明、「直接開啟 LINE →」連結、關閉鈕）；LINE 卡內加「掃碼」提示。small 以下三者皆 display none，手機維持直接連到 lin.ee |
| LINE hover 觸發 | 因覆蓋按鈕接手滑鼠事件，LINE hover 的 trigger 改指向覆蓋按鈕；API 拒絕在非 role 模式保留 `triggerMetadata.role`，因此 LINE 時間軸移除該 metadata，動作本身不變（FB／YT 仍保留） |
| 通知開關卡 | 標籤改「通知設定」；移除 odometer（3→6）、平台 icon 列與三個「+1」，新增三列 icon＋灰條＋開關（`community-hero_notify-*`）與「✓ 都開好了」徽章 |
| 32 秒循環 | 移除 18 個數字／+1／icon 跳動動作；新增開關動作，與通知同步：FB 5.6 秒、YT 14 秒、LINE 22.4 秒依序打開，23.4 秒徽章彈出，31.2–32 秒全部關回；週期仍 32 秒 |
| 進場 | 原「數字彈跳」動作改為開關列淡入（3.1 秒、1.4 秒） |
| 孤兒 class | 刪除只屬本頁、已無元素使用的 `community-hero_count-row`、`count-number`、`count-icons`、`odometer`、`odometer-track`、`plus`（含三個 combo）；修改前數值存於快照 |

新素材：`community-line-qr.svg`（asset `6acf1f5a750cff32e1dab768`），由 lin.ee/Clf7lXr 產生。新 IX3：`i-17fa7c24`（QR 開啟，click restart）、`i-f1d7e120`（QR 關閉）；reduced-motion 皆為 skip-to-end，確保減少動態時仍能開關。

沒有新增頁面 JS／Embed、Variable、共用 Component，未改 Slater class。漸層因 MCP 的 var() 解析限制使用色碼，來源色為 `primary/accent` 與標題漸層終點。

## 驗證

- Webflow 讀回：六個標籤文字、三段承諾與說明、QR 面板文字與連結、通知卡元素與徽章文字逐項讀回正確。Builder 建立 TextBlock 時會留下預設 placeholder，已逐一改寫並讀回。
- IX3 讀回：三個 hover 原 10 動作值不變、各加 2 個 sheen；LINE trigger 指向覆蓋按鈕；feed loop 新增 13 個開關動作、保留其餘動作與另兩條時間軸；intro 只換掉一個動作。
- QR：以 jsQR 解碼上傳後的 CDN 檔，結果 `https://lin.ee/Clf7lXr`。
- 本機模擬（staging HTML＋本輪樣式）於 1440／1366／1280／1024／991／800／767／390／320：無水平溢出；承諾與說明各一行（1024 例外）；hover 終點標籤在卡內（1024 例外）；覆蓋按鈕與 LINE 卡完全重疊；QR 面板內容不溢出；通知卡標籤與開關不重疊。
- **限制**：模擬沒有 JuboFont、沒有跑 Webflow IX3 runtime。Designer App 未連線，沒有 Designer snapshot／Preview。hover 光掃、QR 開關、32 秒開關節奏與 reduced-motion 需在 Designer Preview 驗收。
- **1024 寬（992–1100px）**：卡片只有約 129px，兩個 6 字標籤滑入後仍超出約 10px，YT 承諾換兩行。這是改版前就存在的窄桌機問題（原 4 字標籤在 1024 超出 49px），列為待辦，未在本輪擴大處理。

## 回退

[設定快照](../../../../custom-code/community/2026-10-14-ai-frame-qr-notify.json) 保存修改前文字、樣式、被刪元素結構與被移除的 IX3 動作。回退前先讀回即時狀態；新增的元素、class 與兩個 QR 互動可直接刪除，被刪的計數卡元素需依快照重建。
