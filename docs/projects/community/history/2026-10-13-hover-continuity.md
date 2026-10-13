# 社群追蹤頁：同色系配色、邊緣裁切與連續 hover

日期：2026-10-13（第四輪），Page `6acde90ba4c1734c0e94b297`，`/community`。
續作 `codex/community-card-motion`、[PR #21](https://github.com/TerrisLiao/jubo-webflow/pull/21)。

使用者要求重選灰濁的配色、檢查動畫結尾跳動、更靠左右邊緣裁切，hover 時先向中間集中再上翹。經詢問，跳動範圍明確為左側卡片 hover 完成或移開；後續要求進場與退場都具有 After Effects 式加速／緩停。

## 目前採用

| 項目 | 設定 |
|---|---|
| 平時邊緣位置 | tag 群組 left／right desktop −1.5rem（−24px），small 以下 −1.25rem（−20px）；仍由白卡 overflow hidden 裁切 |
| 先向內收 | 第一 tag x 0→28，.48 秒起點 0；第二 x 0→−28，.48 秒起點 .05 |
| 再微翹 | 第一 y 0→−6、rotation 0→−3，.38 秒從 .24 開始；第二 y 0→−5、rotation 0→3，.38 秒從 .29 開始；scale 1→1.02 |
| 填色 | .38 秒淡入，起點 .10／.16；文字仍為 community/ink |
| 其他細節 | logo 與箭頭 .52 秒；柔焦色團 x／y 漂移 .7 秒 |
| 速度曲線 | 全部 ease 9，power3.inOut；總長 .7 秒，兩端速度為零、中央加速 |
| Hover 控制 | 一個 wf:hover trigger：control togglePlayReverse，pluginConfig multiTimeline false；一個 timeline，10 個明確 FromTo actions |
| 回位 | 同一個進度倒播；不保留另一條 mouseLeave 時間軸，不設定 eventMode／groupId |
| 命中範圍 | 移除 card 本體 lift，trigger 邊界保持固定，避免邊緣滑鼠因卡片抬升反覆進出 |

## 乾淨配色

背景雙色團與 pill 皆改成同一頻道色相的深淺，不再混入暖橘／lime／teal 等不同色相來填色。White fade 與下方白底保留。

| 頻道 | 第一 pill | 第二 pill | 背景色團 |
|---|---|---|---|
| Facebook | #78AEFF → #B8D4FF | #CDE5FF → #ECF5FF | #0866FF／#CDE5FF |
| YouTube | #FF7A87 → #FFABB5 | #FFDCE1 → #FFF0F2 | #FF7A87／#FFDCE1 |
| LINE | #42D77F → #8CEAAF | #D2F6DF → #F0FFF6 | #06C755／#D2F6DF |

沒有新建 Variable、沒有新增元素／素材／頁面 JS，也沒有改右側六個 IX3、共用 Component 或 Slater。

## 已否定的控制方式

先試過兩個 hover trigger 指向同一 group，enter play／leave reverse。API 接受，但使用者 Preview 回報「碰了之後動畫不會回去」。這不是可沿用的實作，也不能把本機 GSAP 的 play／reverse 結果當成 Webflow 兩 trigger 會共用進度的證明。

最後改為單一 hover owner，三卡一起更新；請使用者重新 Preview 進出及快速來回 hover 後，使用者回覆 **「all done」**，記錄為本輪左側確認。

## 驗證邊界

- 三個最終 hover 與預期定義逐項讀回一致，14 組樣式更新值一致；另六個既有 IX3 定義未變。
- 本機用相同的 GSAP 3.15.0 核心、目標、時長與 power3.inOut 重建；僅測核心正播／倒播，不注入到網站。
- 在 .12／.24／.40／.61 秒快速改變播放方向，切換當下最大屬性差為 0；完整到尾保持靜止，desktop／mobile 各兩次進出重播回到原值。
- 1440／1024／991／767／390／320 六個寬度無水平溢出，card 裁切與命中範圍保持固定，兩 tag 向內位移 ±28。
- 核心模型未執行 Webflow 觸發綁定、未載入圖片或 JuboFont；原生回位確認來自使用者 Preview 回覆。右側完整循環、發布站點及 reduced-motion 不由此推定已驗收。
- 本輪未 Publish。GSAP 測試檔只在 /tmp，網站仍只使用原生 IX3，沒有新增 script。

[第四輪快照](../../../../custom-code/community/2026-10-13-hover-continuity.json) 保存受影響樣式與三個互動的前／後設定、配色、測試限制與失效試作紀錄。回退先讀即時狀態；只回退列出範圍，不刪 tag 或填色底層。全部回退順序為第四輪 → 第三輪 → 第二輪 → 第一輪。
