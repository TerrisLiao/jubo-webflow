# 社群追蹤頁：漸層、透明標籤與新聞輪播更新

日期：2026-10-13。頁面 `/community`，Page ID `6acde90ba4c1734c0e94b297`。
Git 工作分支：`codex/community-card-motion`。原 `claude/confident-curie-6r3n6b` 保留。

## 動工前即時狀態

即時元素樹與交接照片版不同：左側已改成三張 `community-hero_channel-card` Link，內含 `channel-scene`、雙 glow、fade 與底部文案。沒有照片媒體區或現存 tag；因此沿用現場結構新增 tag，而未恢復早期照片版。

Webflow page metadata 為 `draft: false`、`shouldPublish: true`。本輪保留頁面狀態，所有修改尚未由本輪 Publish；不能把舊交接的 Draft 快照當即時狀態。

## 本輪結果

| 區域 | 結果 |
|---|---|
| Facebook 卡片 | 青藍漸層加強；透明外框 tag「活動報名」「現場花絮」 |
| YouTube 卡片 | 暖紅／lime 漸層加強；tag「三三分享會」「專家觀點」 |
| LINE 卡片 | 綠／teal 漸層加強；tag「照護新知」「文章推播」 |
| 卡片漸層 | glow blur 14px → 10px；fade 高度 58% → 44%，減少白色遮蓋 |
| 頻道 hover | 保留卡片、logo、箭頭動作；兩個 tag x +8／−8、rotation −5／+5、scale 1.025，並讓雙 glow 小幅位移 |
| 右側 YouTube 直播 | lilac 底改為薄荷青綠 → 白 → 淺天空藍；淺藍取既有 Facebook 藍的 22% 透明度，避開原 indigo/lavender 觀感 |
| 專家頭像 | 直播卡 hover 依序小幅展開、抬升、轉動；離開還原。新 IX3 `i-f5df8ee0`，只綁直播卡 |
| 手機 glow | `community-hero_ping` 設 display none；Feed loop 刪除 `ping-1`／`ping-2`，其餘 32＋11 個動作保留 |

三張頻道卡 hover 和既有通知卡 hover 改成 `multiTimeline: true` 的 `mouseEnter`／`mouseLeave` role pair，避免 split 形式只播放一次。所有修改保留 reduced-motion 的 `dont-animate`。卡片 lift／logo／箭頭、進場、視差與其他 feed 循環未重新設計。

## LINE 新文章來源

CMS 來源均有 lastPublished，並從正式官網確認標題與內容；不使用原本虛構的評鑑／交班範例。

| 卡片兩行文案 | 官網來源 |
|---|---|
| 感染管制 B16／計畫與紀錄怎麼準備 | [感染管制計畫與評鑑指標 B16](https://www.jubo-health.com/news/b16-infection-control-plan) |
| 115 年住宿式補助／新制資格一次看懂 | [115 年住宿式機構補助新制](https://www.jubo-health.com/news/residential-institution-subsidy-2026) |
| Amy 透鏡／家訪前先掌握個案脈絡 | [Amy 透鏡個案脈絡報告](https://www.jubo-health.com/news/amy-lense-intro-2026) |

第 4 格逐字複製第 1 格，保留原本 yPercent 輪播的循環銜接。

## 樣式與工具限制

新增兩個頁面 class：`community-hero_channel-tags`、`community-hero_channel-tag`；三個群組、六個 tag 全部是原生元素，未新增 Embed／頁面程式。

tag background-color 為 transparent；文字、邊框綁 `community/ink`。手機在 small 以下 tag 位於 top .625rem，文案 top 2.125rem，避免互相遮蓋。

gradient 的 Color Variable 自動綁定受 MCP 限制，最終採既有色票讀回值編譯成 gradient 字串；來源色票與實際字串皆保存。沒有新增色票，也沒有修改既有 Variable／共用 Component／Slater。詳見 [設定與回退資料](../../../../custom-code/community/README.md)。

## 驗證

- 六個 tag 讀回有正確 style、文案與透明背景；沒有預設 placeholder。
- 八處文章文字讀回與準備內容逐字一致。
- 三張 hover、Feed loop、通知卡 hover 與專家 hover 重新 get，確認目標、role pair、timing 與 reduced-motion。
- 修改前後 action 比對：只有兩個 ping action 移除；其餘既有動作的 properties、timing、targets 一致。
- 本機以即時元素樹／樣式重建：1440／991／767／390 四個寬度無水平溢出，六個 tag 全部在卡片內，背景 rgba(0,0,0,0)，ping display none。
- **限制**：Designer snapshot 回 status false；本機圖片沒有載入、未使用 JuboFont，也未執行 Webflow IX3 runtime。此檢查只能佐證本輪 tag／樣式排版，不能宣稱照片、字體、動畫及發布站點已驗收。
- 本輪未 Publish；需 Designer Preview 確認實際漸層、clutch／hover、頭像、輪播銜接後，另取得發布授權。

## 回退

[設定快照](../../../../custom-code/community/2026-10-13-card-motion.json) 保存本輪前／後的 affected styles 與完整 IX3 definitions。還原前先查後續版本；只還原列出的樣式與既有互動，移除本輪新增 tag 群組及 `i-f5df8ee0`。不得引用早期交接的「刪整頁」方案來回退這次微調。
