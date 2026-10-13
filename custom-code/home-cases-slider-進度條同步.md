# Home Cases Slider：換片與進度條對不上（2026-10-13）

**程式位置**：Slater 專案 20018，`60292.js` 內「Home Cases Slider」區塊（`https://slater.app/20018/60292.js`）。
這支程式在 Slater 雲端，repo 只留紀錄；**修改要在 Slater 編輯器貼上，repo 內沒有可部署的檔案。**
選取的 class：`.slider-cms-list`、`.slider-cms-item`、`.slider-cms-wrap`、`.slider__pagination`、`.slider_btn-wrap`（見 `slater-selectors.md`）。

## 現象
卡片換片時，右下角的進度條（每張一格，漸層填滿）看起來慢半拍：上一格還沒填滿就換片、換片後新的一格要過一下才開始跑。

## 原因（讀程式碼＋本機重現）
參數：`AUTOPLAY_MS = 3500`（換片間隔）、`TRANSITION_MS = 600`（換片動畫）。

自動輪播每 3500ms 呼叫一次 `slideTo(current + 1)`，但進度條是等到 `TRANSITION_MS + 20 = 620ms` 後才由 `updateDots(current)` 啟動，且仍然跑滿 3500ms：

```js
autoTimer = setInterval(function () {
  slideTo(current + 1);
  setTimeout(function () { updateDots(current); }, TRANSITION_MS + 20); // ← 晚 620ms 才開始跑
}, AUTOPLAY_MS);
```

所以第二輪起，每一格的進度條是在換片後 0.62 秒才開始，到下一次換片時只填到約 **83%**（(3500−620)/3500）；剩下 17% 在換片動畫期間和之後才補完，接著才輪到下一格。
**只有第一張、以及點擊箭頭／圓點後的第一輪是對的**（因為 `startAutoplay()` 立刻呼叫 `updateDots`），所以肉眼會覺得時好時壞。

本機重現（把這段 IIFE 抽出來跑 5 張卡、取樣進度條）：

| | 換片時刻 | 進度條填滿時刻 |
|---|---|---|
| 修改前 | 3800 / 7300 / 10800 ms | 4429 / 7933 / 11433 ms（**晚約 0.63 秒**，換片當下約 83%） |
| 修改後 | 3800 / 7300 / 10800 ms | 3817 / 7315 / 10799 ms（**與換片同時**，誤差 ≤ 20ms） |

## 修法（只改一處）
換片的同一刻就讓「下一格」開始跑進度條，這樣 3500ms 後剛好滿格、同時換下一片。先算好下一張索引，因為 `current` 要等動畫結束才更新；並加上 `isAnimating` 防呆。

```js
autoTimer = setInterval(function () {
  if (isAnimating) return;
  var nextIdx = (current + 1) % total;
  slideTo(current + 1);
  updateDots(nextIdx);
}, AUTOPLAY_MS);
```

其他位置（`startAutoplay()` 一開始的 `updateDots(current)`、箭頭與圓點點擊後的流程）不用改，已經是對的。

## 驗證與限制
- 以 Playwright 在本機用 5 張假卡片重現，數字如上；**未**在真實首頁上跑（Slater 腳本要在 Slater 貼上並 Publish 才會生效）。
- 套用後請在首頁連續看 3 輪以上，確認進度條在換片瞬間剛好滿格；也要試點箭頭、點圓點後的第一輪與第二輪。

## 另外觀察到、本次沒動的問題
1. `cardStep`（卡片寬度＋間距）只在初始化時量一次；視窗縮放或旋轉手機後，位移距離會錯。
2. 切到別的分頁再回來時，`setInterval` 被瀏覽器節流，進度條動畫和換片可能暫時錯開。
3. 初始化延遲 300ms 才建立圓點，載入初期右下角會先出現 HTML 內的 4 個預設圓點再被換成 N 個。
