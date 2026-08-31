# 16｜`.gradient-headline` 手機字級失控 — 診斷與修復紀錄

- 日期：2026-08-31
- 站台：`jubo-health.com`（site id `69ec2b02daa2e79f1da8772a`）
- 回報：手機版漸層標題明顯大於一般標題
- 狀態：**已修改、已 Publish（Terris 於 2026-08-31 自行發布）、已複驗通過**

---

## 1. 症狀

手機上，標題裡的漸層字（`.gradient-headline`）比同一個 `h1` / `h2` 裡的其他文字明顯大一截，行距也被擠壓。

## 2. 根因

`.gradient-headline` 只在 Desktop（main）寫死了 `font-size: 3.5rem`，**完全沒有任何 breakpoint 覆寫**；
但 `h1` / `h2` 的 tag selector 有完整的 RWD 縮放。螢幕愈小，落差愈大。

線上 CSS（`jubo-health.webflow.shared.cea744cd4.min.css`）實測：`.gradient-headline` 全檔只出現 **1 次**，0 個 media query。

| 斷點 | `h1` | `h2` | `.gradient-headline` | 落差 |
|---|---|---|---|---|
| Desktop >991 | 5rem (80px) | 3.8rem (60.8px) | 56px | 比 h1 小 |
| ≤991 平板 | 3.75rem (60px) | 3rem (48px) | 56px | 比 h2 **大 16%** |
| ≤767 | 3.5rem (56px) | 2.75rem (44px) | 56px | 比 h2 **大 27%** |
| ≤479 手機 | `10vw`（390px→39px） | 2rem (32px) | 56px | 比 h1 **大 43%**、比 h2 **大 75%** |

附帶效應：`h1` / `h2` 的 `line-height: 120%` 是百分比，會先用**母層自己的 font-size** 換算成 px 再繼承給子層。
手機上 h1 算出 46.8px 行高卻要裝 56px 的字 → 漸層那行行距不足、視覺上擠在一起。

## 3. 排除項目（不是這些原因）

- Class 名稱沒有被改。
- 沒有 combo class、沒有 element-level style override。
- 頁面 20 個 `<style>` 區塊內沒有任何 `gradient-headline` 規則。
- Slater CSS（`slater.app/20018/60294.css`）**完全沒有引用** `.gradient-headline`（0 筆）→ 與外部程式碼無關。

**驗證限制**：Webflow Data API 讀不到 style 的修改歷史，因此無法判定 `3.5rem` 是近期被改上去、還是廠商建置時就存在。
可確定的是它從未有過 RWD 版本，所以手機破版並非近期才發生。

## 4. 影響範圍（全站掃描）

掃 `sitemap.xml` 全部 **159 個已發布網址**：共 **75 個** `.gradient-headline` 實例，
parent 標籤為 `h1`(3) 或 `h2`(72)，**沒有任何一個是非標題用途**。

三個 `h1` 用法：

| 頁面 | 標記 |
|---|---|
| `/` | `重塑照護場域<br>為團隊打造新一代工作方式` |
| `/company` | `每一個人都值得<br><span>更好的照護</span>` |
| `/careers` | `Let's Build <span>Intelligence</span> that Cares` |

`/careers` 是**句中行內**用法（`Let's Build [漸層] that Cares`），漸層字必須與前後文同大小；
原本 56px vs 80px 在桌機上就已經是錯的。這也佐證這個 class 的設計意圖就是「只換顏色、不動字級」。

## 5. 已執行的修改

`.gradient-headline`（global utility，main breakpoint）移除兩個屬性：

- `font-size: 3.5rem` → 移除
- `font-weight: 300` → 移除

修改後只剩：

```
background-image: var(--gradient--headline)   /* linear-gradient(90deg, var(--primary--accent), var(--gradient--announce-bar-purple)) */
background-clip: text
```

（`-webkit-text-fill-color: transparent` 由 Webflow 隨 `background-clip: text` 自動輸出，本次未觸及。）

字級與字重改為**完全繼承母層標題**，所有斷點自動正確，日後不需要跟 `h1` / `h2` 的值手動同步。

### 為什麼移除 `font-weight` 是安全的

所有承載元素解析出來的字重都已經是 300：`h1` tag = 300、`h2` tag = 300、`/careers` 的 `.text-align-center.is-poppins` = 300。
移除後視覺不變，但讓 class 回到「純漸層」的正確語意。

### 預期的視覺變化

- **手機／平板**：漸層字縮回與母層標題同大小（本次要修的 bug）。
- **桌機**：3 個 `h1` 的漸層字從 56px 變成 80px、72 個 `h2` 的從 56px 變成 60.8px（+8.6%）。
  這是既定代價，已於修改前向 Terris 說明並取得同意。
- 若之後想恢復首頁 hero 的「兩段式」層次，做法是新增 `.gradient-headline.is-hero { font-size: 0.7em }`
  只掛在 `/` 與 `/company` 的 `h1` 上（用 `em` 才會跟著母層縮放）。**不要**改回固定 `rem`。
  `/careers` 因為是句中行內用法，不適用這個 combo。

## 6. Publish 後複驗（2026-08-31）

線上 CSS 由 `...cea744cd4.min.css` 換為 `...328eedf86.min.css`，`.gradient-headline` 全檔仍只出現 1 次，字級屬性已消失：

```
.gradient-headline{background-image:linear-gradient(90deg,var(--primary--accent),var(--gradient--announce-bar-purple));
-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text}
```

以 Chromium 實測 3 個含 `h1` 的頁面 × 4 個視窗寬度，共 42 組 span／母層比對，**全部 ratio = 1.00**：

| 視窗 | `h1` 內漸層字 | `h2` 內漸層字 | 母層 line-height | 溢出 |
|---|---|---|---|---|
| 390px | 39.0 / 39.0px | 32.0 / 32.0px | 46.8 / 38.4px | 無 |
| 480px | 56.0 / 56.0px | 44.0 / 44.0px | 67.2 / 52.8px | 無 |
| 768px | 60.0 / 60.0px | 48.0 / 48.0px | 72.0 / 57.6px | 無 |
| 1440px | 80.0 / 80.0px | 60.8 / 60.8px | 96.0 / 73.0px | 無 |

漸層本體正常：`background-image` 仍含 gradient、`-webkit-text-fill-color: rgba(0,0,0,0)`、`background-clip: text`。
字重 span／母層皆為 300，與修改前一致。行距擠壓問題連帶解決（字級不再超過母層算出的 line-height）。

`/careers` 的句中行內用法（`Let's Build [Intelligence] that Cares`）改善最明顯，漸層字終於與前後文同大小。

### 複驗方法與限制

Playwright 走不出本 session 的 agent proxy（relay 持續 `ws_closed_mid_exchange`），
因此改用 curl 抓下已發布的 HTML 與 CSS 建本地鏡像、外部請求全部 abort，再用 Chromium 量 computed style。
CSS cascade 與字級量測與線上一致；未載入的只有背景圖與外部 script，不影響字級判定。
`/style-guide`（Draft）仍因 API 429 未掃到，該頁未發布，不影響線上。

## 7. 相關規範

- `00_AI工作守則.md` 鐵律 4：尺寸一律用 `rem`。本次 hero 備案建議用 `em` 屬**刻意例外** —
  目的是讓子層字級跟隨母層標題縮放，改用 `rem` 會退回本次修掉的同一個問題。
- `00_AI工作守則.md` 鐵律 5：`.gradient-headline` 是全站共用 utility，本次修改影響 18 個頁面、75 個實例，已取得授權。
