# contact-router 行為測試

驗證 [`../contact-router.html`](../contact-router.html)（/contact 分流面板的展開動畫）的邏輯。
2026-09-10 建立，起因：前面幾版都是「寫完直接裝上去、沒有實機驗證」，
接連被 Terris 抓到卡片沒隱藏、捲太深、方向不一致三個問題。

`harness.html` 用**站上 Webflow class 的實際值**重建一個最小頁面，並模擬三件站上的事：

| 模擬對象 | 做法 |
|---|---|
| 站台 head 的 GA4 | `document.addEventListener('click', …, true)`（capture），記錄到 `window.__ga` |
| Webflow／Lenis 的 anchor 平滑捲動 | 掛在 document 的 **bubble** 監聽，記錄到 `window.__bubbleScrolls` |
| Navbar | 固定 72px 的 `.navbar_component`，測 `bringIntoView()` 的 clearance 計算 |

## 跑法

```bash
npm install playwright        # 只裝套件，不要跑 playwright install
node test_router.mjs
```

容器內已有 Chromium（`/opt/pw-browsers/chromium`），版本與 npm 上的 playwright 不一定相符，
所以測試裡直接指定 `executablePath`，不要改成預設路徑。

## 涵蓋的檢查（14 項）

1. 初始兩個面板都隱藏（`height 0` / `visibility hidden`）
2. 點居服 → 展開、按鈕加 `.is-active`、GA 送 `home_care`
3. 捲動把選擇器帶到 navbar 下方（實測 top=96px）
4. 切換 → 舊面板瞬間收掉、新面板展開
5. **新面板起點與舊面板同一位置**（證明是由上往下長，不是被回流往上拉）
6. 切換 → GA 送 `residential_day_care`
7. document bubble 的捲動被 `stopPropagation()` 擋掉（`__bubbleScrolls === 0`）
8. 面板內容的 `transform` 歸零
9. 點同一顆 → 收合、`.is-active` 移除

第 5 項當初是 fail：`contact-router_component` 的 `row-gap: 2rem` 讓收合的面板
（高度 0 但仍佔一個 flex row）多產生一次 gap，兩個面板起點差 32px。
改成 `row-gap: 0` 後通過——面板內的 section 本來就帶 `padding-section-large`，那 2rem 是多的。

> 改動 `contact-router.html` 或那兩個 class 的值之後，記得回來重跑一次。
