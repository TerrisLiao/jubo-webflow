# 無障礙稽核工具

`../../Jubo官網AI開發規範/18_無障礙稽核與90%達標計畫.md` 那份報告的量測工具。
目的是讓「65% → 90%」這件事**可以被重跑驗收**，而不是每次重新人工抽查。

建立日期：2026-09-15　｜　基準快照：[`baseline-2026-09-15/`](baseline-2026-09-15/)

> 這裡的腳本**只讀線上已發布的 HTML**，不會碰 Webflow API、不會改站上任何東西。

---

## 怎麼跑

```bash
cd custom-code/a11y-audit
npm install                       # 裝在這一層，不要裝在 _work（ESM 從腳本所在位置往上找 node_modules）
bash fetch-pages.sh _work         # 抓 sitemap 全站 HTML（約 28MB）

cd _work
node ../audit.mjs                 # 156 頁結構指標      -> audit-raw.json
node ../report.mjs                # 彙總報表（看這個）
node ../alt-classify.mjs          # alt 裝飾/冗餘/要補   -> alt-informative.json
node ../axe-run.mjs               # axe-core 16 模板頁   -> axe-results.json
node ../axe-report.mjs            # axe 彙總
node ../score.mjs                 # JA11Y-23 分數與階段預測
```

也可以用 `package.json` 的捷徑（在 `custom-code/a11y-audit/` 執行）：
`npm run fetch` → `npm run audit` → `npm run alt` → `npm run axe` → `npm run score`

另外兩個是查細節用的，不是每次都要跑：

| 腳本 | 用途 |
|---|---|
| `axe-detail.mjs` | 列出對比／連結名稱／landmark 的**逐一節點**（要修哪個元素時看這個） |
| `alt-breakdown.mjs` / `alt-plan.mjs` | 空 alt 依「版位」分組與覆蓋率曲線（排 E 組工作順序時看這個） |
| `focus-test.mjs` | 實際 focus 前 30 個元素，讀 computed style 驗證焦點框 |

### 環境需求

- Node 18+（實測 22.22）
- 2026-09-15 的版本：cheerio 1.2.0、playwright 1.63.0、axe-core 4.13.0、Chromium 141
- Chromium。若 Playwright 找不到自己的瀏覽器，用 `CHROMIUM_PATH` 指過去：
  ```bash
  CHROMIUM_PATH=/path/to/chrome node ../axe-run.mjs
  ```

---

## 前後對照怎麼做

改完 Webflow 並 publish 之後（Publish 需要 Terris 授權）：

1. 重跑上面整串，產生新的 `audit-raw.json` / `axe-results.json`
2. 跟 `baseline-2026-09-15/` 比：
   - `node ../score.mjs` 的分數應該往上
   - `axe-report.mjs` 裡 `region` / `link-name` / `aria-command-name` 的節點數應該降到 0
3. **腳本只能證明機器測得到的部分。** 鍵盤走查、螢幕閱讀器、reduced-motion 實測
   仍然要照 `18_...md` 的「驗證方法」手動做一次

---

## JA11Y-23 計分模型在哪

在 `score.mjs` 的 `CRITERIA` 陣列裡，23 條判準、權重 1–4、單頁滿分 57。
2026-09-15 基準分 **40.9%**。

**這不是 Webflow AEO 報告那個 65%。** 兩套評分表不同、不可互換，
只用來追蹤我們自己的前後差。理由寫在 `18_...md` 的「計分模型」一節。

---

## 幾個會誤導的地方（先看這裡再看數字）

- **`alt=""` 不等於錯。** 純裝飾圖 `alt=""` 是正確做法。全站 1,196 張空 alt 裡只有 319 張要補，
  分類邏輯寫在 `alt-classify.mjs` 的 `CLASSIFY` 表，**那是人工判讀的結果，改站上結構後要重新校對**。
- **axe 只跑 16 頁。** `axe-run.mjs` 的 `TARGETS` 是手選的模板代表頁，不是全站。
  新增頁面模板時要把它加進去。
- **`incomplete` 沒有算進失敗數。** 2026-09-15 有 838 個對比節點是 `incomplete`
  （漸層背景、`data-button-animate-chars` 把字拆成單字元）。實際失敗只會更多。
- `audit.mjs` 是**正則與 DOM 查詢**，不是真的無障礙樹。它抓得到「有沒有 label」，
  抓不到「這個 label 寫得對不對」。
