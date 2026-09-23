# 21｜Jubo 動效準則（IX3）

> 日期：2026-09-22　｜　狀態：**提案，待 Terris 審核**，尚未實作
> 前置：`20_IX2轉IX3遷移盤點與計畫.md`（盤點與試點結果）
> 上位規範：站上 Agent Instruction `jubo-web-visual-system.md` §13

---

## 0. 為什麼需要這份準則

遷移盤點發現兩件事，合起來就必須先定準則再動手：

1. **96 個動畫裡有 61 個是同一效果的複製品**（Glass Btn Hover ×27、Stats Color Hover ×26、
   FAQ accordion ×6、Product Item Scroll ×2）。沒有準則就會複製出第 28 份。
2. **78 個動畫用的 `CHILDREN` 範圍，IX3 根本沒有。** 逐個「盡量接近原本」只會做出 78 種
   互相不一致的近似品。

所以不是「把 IX2 翻譯成 IX3」，而是**重新定義一套 IX3 做得好的動效，然後全站套用**。

---

## 1. 硬性前提（IX3 的能力邊界，不是偏好）

### 1.1 目標型態只有六種

2026-09-22 在 Designer 面板實際確認，與 API 完全一致：

```
Trigger element · Element · Class · Attribute · Custom selector · Any element
```

**沒有「子元素」。** `Class` 是全站選取（hover 一張卡會動到全部 53 張）。

> ⚠️ **推論出的第一鐵律**：凡是需要「只動被觸發的那一個」的效果，
> **被動畫的元素必須就是觸發元素**（`Trigger element`）。
>
> 這反過來規定了設計：**效果要作用在使用者實際滑過／點擊的那個東西上**，
> 不是它裡面的某個零件。

（API 另有 Designer 未列出的 `wf:trigger-only-parent`，可處理「動父層」的情境。）

### 1.2 Hover 一律用 role 形式

split 形式（兩個 `wf:hover` 觸發器 ＋ `assignedGroupId`）**每次載入只會播一次**，
且主機不准改 `control: "restart"`。實測見 `20_` §4.5 發現 C。

**唯一正確寫法**：單一 `wf:hover` 觸發器 ＋ `pluginConfig: {multiTimeline: true}`，
兩個 timeline 各標 `triggerMetadata: {role: "mouseEnter"}` / `{role: "mouseLeave"}`。

### 1.3 每一個動效都要有 reduced-motion 保護

```json
"conditionalPlayback": [{"type": "prefers-reduced-motion", "behavior": "dont-animate"}]
```

這是 `visual-system` §13 的要求，IX2 做不到，IX3 沒有理由不做。

---

## 2. 動效 Token

不要每次現想數值。全站只用這幾組：

### 時間

| Token | 值 | 用在 |
|---|---|---|
| `fast` | 150ms | 按鈕、圖示、小元件 |
| `base` | 250ms | 卡片、區塊 |
| `slow` | 500ms | 捲動進場 |

### 緩動（IX3 只吃整數索引）

| Token | 索引 | 名稱 | 用在 |
|---|---|---|---|
| `out` | **5** | power2.out | 絕大多數（進入狀態） |
| `in` | 4 | power2.in | 離場、消失 |
| `inOut` | 6 | power2.inOut | 雙向、來回 |

🚫 **hover 不准用** back / elastic / bounce（索引 13–24）—— §13 明文禁止過度 Spring。

### 位移（固定 px，不用百分比）

| Token | 值 | 用在 |
|---|---|---|
| `nudge` | 2px | 按鈕、小元件 |
| `lift` | 3px | 卡片、區塊 |
| `enter` | 12px | 捲動進場的起始偏移 |

> 為什麼不用 `yPercent`：這些是固定的小位移，用百分比會隨元素高度放大，
> 大卡片會浮得很誇張。官方文件建議百分比是針對「滑入滑出整個元素」的情境。

### 透明度

| Token | 值 | 用在 |
|---|---|---|
| `dim` | 0.6 | hover 時的次要元素 |
| `soften` | 0.9 | hover 時的按鈕本體 |

---

## 3. 情境對應表

| # | 情境 | 效果 | 目標 | 參數 | 取代 |
|---|---|---|---|---|---|
| A | **卡片／連結區塊 hover** | 上浮 | Trigger element | `y: -3` · base · out | 新聞卡、案例卡 |
| B | **按鈕 hover** | 上浮 ＋ 微透明 | Trigger element | `y: -2` ＋ `opacity: .9` · fast · out | Glass Btn Hover ×27 |
| C | **統計數字 hover** | 上浮 | Trigger element | `y: -2` · fast · out | Stats Color Hover ×26 |
| D | **圖示／文字連結 hover** | 透明度 | Trigger element | `opacity: .6` · fast · out | footer linkedin 等 |
| E | **手風琴開合** | 展開／收合 | Trigger element ＋ Class | click · `togglePlayReverse` · base | FAQ accordion ×6 |
| F | **捲動進場** | ⚠️ **暫緩** —— 見 §10 發現 G。`wf:scroll` ＋ `wf:class` 會讓整批元素永久隱形 | — | — | 67 個捲動觸發器（尚無安全寫法） |
| G | **捲動視差／進度** | scrub | Class | `scrub` ＋ `start`/`end` | Product Item Scroll 等 |

### 為什麼 B、C 不再是「變色」

原本的 `Stats Color Hover` 是改顏色。§13 說 hover 以「輕微透明度或 1–2px 位移」為主，
沒有提顏色；而且顏色變化在 IX3 要用 `wf:style.color`，
對「只動被觸發的那一個」這條限制同樣受制。統一成位移最單純也最一致。

**若 Terris 認為統計數字非變色不可**，可以保留 —— 但要接受它必須是 `Trigger element`，
也就是整個統計卡變色，不是裡面的數字單獨變色。

---

## 4. 實作模板

### A｜卡片 hover 上浮（已在 `/news` 驗證通過）

```json
{
  "name": "<名稱>",
  "scope": {"type": "pages", "value": ["<pageId>"]},
  "conditionalPlayback": [{"type": "prefers-reduced-motion", "behavior": "dont-animate"}],
  "triggers": [{
    "extensionKey": "wf:hover",
    "config": {"control": "play", "pluginConfig": {"multiTimeline": true}},
    "target": {"extensionKey": "wf:class", "value": ["<觸發元素的 style block id>"]}
  }],
  "timelines": [
    {"name": "Lift in", "triggerMetadata": {"role": "mouseEnter"},
     "actions": [{"id": "lift-in", "name": "Lift", "tt": 0,
       "targets": [{"extensionKey": "wf:trigger-only", "value": ""}],
       "timing": {"duration": "250ms", "ease": 5},
       "properties": {"wf:transform": {"y": -3}}}]},
    {"name": "Lift out", "triggerMetadata": {"role": "mouseLeave"},
     "actions": [{"id": "lift-out", "name": "Settle", "tt": 0,
       "targets": [{"extensionKey": "wf:trigger-only", "value": ""}],
       "timing": {"duration": "250ms", "ease": 5},
       "properties": {"wf:transform": {"y": 0}}}]}
  ]
}
```

### B｜按鈕 hover（上浮 ＋ 微透明）

同上，但 `duration: "150ms"`，properties 改成：

```json
"properties": {"wf:transform": {"y": -2, "opacity": "90%"}}
```

> `opacity` 放在 `wf:transform`，**不是** `wf:style`。放錯會被拒絕。

### F｜捲動進場

```json
"triggers": [{
  "extensionKey": "wf:scroll",
  "target": {"extensionKey": "wf:class", "value": ["<style block id>"]},
  "config": {"scrollTriggerConfig": {
    "start": "top 85%", "end": "bottom top",
    "enter": "play", "leave": "none", "enterBack": "none", "leaveBack": "none"
  }}
}],
"timelines": [{"actions": [{"id": "reveal", "name": "Fade up", "tt": 2,
  "targets": [{"extensionKey": "wf:class", "value": ["<style block id>"]}],
  "timing": {"duration": "500ms", "ease": 5},
  "properties": {"wf:transform": {"opacity": ["0%", "100%"], "y": [12, 0]}}}]}]
```

> `start: "top 85%"` ＋ duration ≥ 500ms 是官方文件實測建議的組合。
> `"top bottom"` 會讓動畫在元素還在螢幕最下緣時就播完，等於沒人看到。
> 捲動進場用 `wf:class` 是可以的 —— 每個元素各自進入視窗，不會互相牽動。

---

## 5. 禁止清單

| 🚫 | 原因 |
|---|---|
| `scale` 超過 1.02 | §13「避免大幅 Scale」 |
| hover 用 back / elastic / bounce 緩動 | §13「避免 Bounce 或過度 Spring」 |
| hover 超過 400ms | 滑過就結束了，只會讓介面感覺遲鈍 |
| split hover 形式（`assignedGroupId` ＋ 兩個觸發器） | 每次載入只播一次，見 `20_` §4.5 發現 C |
| 省略 `conditionalPlayback` | 違反 §13 |
| `opacity` 放進 `wf:style` | 會被拒絕，正確是 `wf:transform` |
| `ease` 傳字串（如 `"power2.out"`） | 只吃整數索引，傳字串會被拒絕 |
| 裸數字 duration（如 `400`） | 那是 400 **秒**。要寫 `"400ms"` 或 `0.4` |
| 同一效果再複製一份 | 這份準則存在的理由 |

---

## 6. 每一個動效上線前的驗證清單

`20_` §4.5 的教訓：寫入成功、讀回正確、第一次觸發也正常，
**但第二次就死掉** —— 所以驗證必須包含重複觸發。

1. **重複觸發 4 次**，每次都要有反應（抓 split-form 那個坑）
2. **只動被觸發的那一個**，同頁其他同類元素不受影響
3. **`prefers-reduced-motion: reduce`** 下完全不觸發
4. **四個斷點**都檢查（main / medium / small / tiny）
5. **無版面位移**（`transform` 不影響 layout，但仍要量 grid top 前後）
6. **無 JS 錯誤**
7. **發布到 staging 實測** —— 官方文件：
   `A successful create is not proof it played.`
8. **🔴 全頁可見度普查**：不是只驗剛改的那個動效，而是**掃過整頁所有元素**，
   確認沒有任何東西停在 `opacity: 0` / `visibility: hidden` / 高度 0。
   reveal 類動效的失效是**靜默的** —— 沒有錯誤訊息，只有看不到的內容。
   （2026-09-22 因為漏做這一項，讓 `/news` 的 53 張卡片在 staging 上全部隱形。）

---

## 7. 預估收斂結果

| | 現況（IX2） | 套用本準則後 |
|---|---|---|
| Action list 數 | 96 | **約 12–15** |
| 其中重複實作 | 61 | 0 |
| 有 reduced-motion 保護 | 0 | 全部 |
| 合乎 §13 的 hover | 部分（1.03 縮放不合規） | 全部 |

比先前估的「96 → 42」更激進，因為那個估計只合併了「標題相同」的複製品；
套用統一準則後，同類情境不分頁面都用同一個 IX3 互動（`scope: site` 或多頁）。

---

## 8. 待 Terris 決定的三件事

1. **統計數字**（情境 C）要位移還是保留變色？變色的話整張卡一起變，可以嗎？
2. **Navbar / Dropdown 那 6 個**（IX3 沒有對應觸發器）—— 留在 IX2，還是用 click 重做？
3. **實作順序**：先做收斂效益最大的 B（27 份 → 1），還是先做風險最低的？

---

## 9. 驗證限制

- 情境 A 已在 `/news` staging 實測通過；**B–G 尚未實作、未驗證**。
- Token 數值（2px / 3px / 12px、150/250/500ms）是依 §13 的文字訂的，
  **沒有經過視覺審查**。Terris 看實品後可能要調。
- 收斂預估「12–15 個」是依情境表推算，實際要看有多少頁面需要各自的 scope。

---

## 10. B 版（進階氛圍）實測紀錄 — 2026-09-22

Terris 要求試做「更高級的氛圍」版本。在 `/news` staging 實作了兩個動效，正式站未動。

| 互動 | id | 內容 |
|---|---|---|
| `B｜Page Headline Reveal (splitText)` | `i-8a44c92a` | H1 逐字浮現 ＋ 副標延後 0.3s 跟上 |
| `B｜News Card Scroll Entrance` | `i-b7f7cbaf` | 卡片各自在進入視窗時淡入上移 |

### 🔴 發現 E：`splitText: "words"` 對中文完全無效

第一版用 `words`，實測 **整句被當成「一個詞」** —— 因為中文沒有空格。
標題只是整塊淡入，逐詞效果根本沒發生。

**中文一律用 `"chars"`。** 改用 `chars` 後正常拆成 10 個字元。

> 這條對 Jubo 特別重要：全站標題都是中文，**任何 splitText 動效都不能用 `words`**。
> 英文頁（若有）或日文頁的假名／漢字混排需另外測。

### ✅ 拆字不影響排版（最大的疑慮已排除）

| | 桌機 H1 | 手機 H1 |
|---|---|---|
| A 正式站（未拆字） | 800 × 96 | 366 × 94（2 行） |
| B staging（拆成 10 個 span） | 800 × 96 | 366 × 94（2 行） |

逐像素相同，無橫向溢出。GSAP 的 SplitText 有正確處理換行。

### ✅ 韌性：reveal 不會把內容永久藏起來

這是 reveal 類動效最大的風險（`20_` 稽核報告裡「JS 沒跑完就看不到內容」正是這一類）。
兩項都通過：

| 測試 | 結果 |
|---|---|
| `prefers-reduced-motion: reduce` | 標題 **可見**（`skip-to-end` 生效） |
| 擋掉 IX3 的 GSAP（模擬 CDN 掛掉） | 標題 **仍可見**，高 96px |

> ⚠️ **reveal 類動效的 `conditionalPlayback` 必須用 `skip-to-end`，不可用 `dont-animate`。**
> `dont-animate` 在 FromTo 動畫上可能讓元素停在 from 狀態（opacity 0）＝永久隱形。
> hover 類才用 `dont-animate`。

### ⚠️ 成本：FCP 約 +376ms

| | FCP（三次 / 中位數） |
|---|---|
| A 正式站 | 3016 / 2200 / 2004 → **2200ms** |
| B staging | 2140 / 2576 / 2588 → **2576ms** |

兩邊區間大幅重疊，成本存在但不大。合理對應下面這項。

> **量測教訓**：第一次單次量到 A 1584ms / B 3148ms，看起來像 +1.5s 的大幅退步，
> 重複三次後發現是雜訊。**單次量測不可下效能結論。**

### 🔴 發現 F：IX3 會重複載入 GSAP（違反 §13）

```
cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js       28,343 bytes  ← Slater 用
cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js    28,343 bytes  ← IX3 自帶
```

同一版本、位元組完全相同，載兩次。`visual-system` §13 明文「**不得重複載入 Library**」。

**解法是把遷移做完，不是停手**：jsDelivr 那組
（gsap 28 ＋ ScrollTrigger 18 ＋ Draggable 13 ＋ Inertia 3 = **63 KB**）
純粹為 Slater 而載。Slater 的互動全部搬到 IX3 之後可整組刪除 → **淨省 35 KB**。

| 階段 | GSAP 成本 |
|---|---|
| 現在（純 IX2） | 63 KB（jsDelivr 四支） |
| 過渡期（IX2 ＋ IX3 並存） | 91 KB ⚠️ 違反 §13 |
| 完成後（純 IX3） | **28 KB** |

**半途而廢是三種狀態裡最貴的。** 這是「要嘛不做，要嘛做完」的理由。

### 🔴🔴 發現 G：捲動進場把整份列表變成永久隱形（已移除）

**這是本次工作階段最嚴重的一次失誤，而且是 Terris 發現的，不是我測出來的。**

`B｜News Card Scroll Entrance`（`i-b7f7cbaf`）上線後，`/news` 的 **53 張卡片全部
停在 `opacity: 0`，捲到任何位置都不會出現** —— 整份新聞列表變成一片空白。

實測診斷：

```
載入後        53 張 → 可見 0、隱形 53
捲到 1000px   53 張 → 可見 0、隱形 53
捲到 2500px   53 張 → 可見 0、隱形 53
捲到 5000px   53 張 → 可見 0、隱形 53
用 lenis.scrollTo 53 張 → 可見 0、隱形 53
ScrollTrigger: { hasScrollTrigger: true, count: 1 }   ← 53 張卡只註冊了 1 個
JS 錯誤：無
```

#### 根因

```json
"triggers": [{ "extensionKey": "wf:scroll",
               "target": {"extensionKey": "wf:class", "value": ["<list-item 的 class>"]} }],
"timelines": [{ "actions": [{ "tt": 2,
   "targets": [{"extensionKey": "wf:trigger-only", "value": ""}],
   "properties": {"wf:transform": {"opacity": ["0%","100%"], "y": [16,0]}} }]}]
```

`wf:scroll` ＋ `wf:class` **只註冊一個 ScrollTrigger**，不是每個元素一個。
但 `tt: 2`（FromTo）的 from 狀態（`opacity: 0`）**卻套用到該 class 的全部 53 個元素**。

→ 一個觸發器永遠無法讓 53 個元素現身。**沒有任何錯誤訊息。**

#### 由此得出的鐵律

> 🚫 **`wf:scroll` 不可搭配 `wf:class` 觸發目標做 reveal。**
>
> 需要「每個元素各自進場」時，目前沒有安全的 API 寫法。
> 除非能確認每個元素各自註冊了一個 ScrollTrigger，否則**不要對重複元素做 reveal**。

補充判斷：53 筆的長列表本來就不適合逐一進場動畫 —— 使用者快速捲動時，
動畫只會延遲內容出現。**這個效果不只是實作有問題，需求本身也可疑。**

#### 我的流程失誤（要記取的部分）

我在同一輪加了**兩個**互動（標題浮現 ＋ 卡片進場），但驗證腳本
`bver.mjs` / `chars.mjs` **只檢查了標題**，完全沒量卡片的 opacity。

> **規則：加了 N 個動效，就要驗 N 個 —— 而且要驗「整頁還看得見嗎」，
> 不是只驗剛剛改的那一個。**

這也正好印證 `18_載入效能稽核` 開頭的判斷：
**「JS 沒跑完就看不到內容」是這個站最該防的失效模式** —— 結果我自己犯了一次。

#### 處理

- 互動 `i-b7f7cbaf` 已 `delete_interaction` 移除
- staging 已重新發布，實測 **53 張卡全部可見、H1 正常、無 JS 錯誤**
- **正式站全程未受影響**（所有 staging 發布都用 `publishToWebflowSubdomain: true`
  且不帶 customDomains，實測正式站同樣 53/53 可見）

---

### 待 Terris 目視判斷

數據都通過了，但「氛圍是否更高級」只能看實品：
**https://jubo-health.webflow.io/news**（對照 https://www.jubo-health.com/news）

看點：
1. 進頁時標題逐字浮現的節奏（0.035s/字，10 字共 0.35s）是否合適
2. 往下捲時卡片逐一淡入的感覺
3. 卡片 hover 上浮 3px 是否足夠、或太含蓄

---

## §11 上線前完整驗證（8 項清單全跑）—— 2026-09-22

刪掉問題互動後，**把第 8 項「全頁可見度普查」也跑了一次**。
剛因為漏驗才寫下的規則，如果下一輪就跳過，等於沒寫。

### 結果

| # | 項目 | 結果 |
|---|---|---|
| 1 | 重複 hover 4 次 | ✅ 4/4 都是 `matrix(1,0,0,1,0,-3)` |
| 2 | 卡片數 | ✅ staging 53 ＝ 正式站 53 |
| 3 | `prefers-reduced-motion` | ✅ 卡片 53/53 可見、H1 opacity 1、高 96px |
| 4 | 四斷點（1440 / 991 / 767 / 479） | ✅ 卡片全滿、H1 未溢出 |
| 5 | Finsweet 分類篩選 | ✅ 七類皆正常（媒體報導 16、最新消息 23、長照觀點 6、科技浪潮 5、其餘 0） |
| 6 | JS 錯誤 | ✅ 無 |
| 7 | 擋掉 IX3 的 GSAP | ✅ 卡片 53/53 可見、H1 opacity 1 |
| 8 | 全頁可見度普查 | ⚠️ 1 項差異 → **查清楚了，見下** |

### 第 8 項的差異：`img-mask.is-news-card` staging 隱藏 3/53、正式站 0/53

**先查證，不臆測。** 逐一比對三張卡的實測資料：

| 卡片 | staging mask 高 | 正式站 mask 高 | `<img>` class |
|---|---|---|---|
| 血糖試紙滿百盒送機器 | 0 px | 234 px | `news-card_cover-img w-dyn-bind-empty` |
| Daycare Banner Landing Page-1 | 0 px | 234 px | 同上 |
| VitalLink Banner Landing Page | 0 px | 234 px | 同上 |

就是先前已知、Terris 也確認過「本來就沒有封面圖」的那三筆。

**成因（已驗證）**

- CMS 封面欄位是空的 → Webflow 掛上 `w-dyn-bind-empty`
  → base CSS `display:none!important` 把 `<img>` 收掉
- `.img-mask.is-news-card` 本身**沒有任何高度規則**
  （實測published CSS 只有 `border-bottom-*-radius:0`，連 `aspect-ratio` 都沒有）
- 舊結構的高度來自被我移除的 `.single-news_cover-img` 包裹層（它帶 `aspect-ratio:16/9`）
  → 包裹層一拿掉，空圖的遮罩就塌成 0

### 但實際截圖顯示：塌掉的是**改善**，不是缺陷

| | 正式站（現況） | staging（新結構） |
|---|---|---|
| 畫面 | 灰底、對角線、正中央寫著 **「Background Image」** | 沒有圖片區，直接顯示分類標籤＋標題 |
| 判定 | 🔴 Webflow Designer 的**佔位圖漏到正式站** | ✅ 乾淨的純文字卡 |

`.single-news_cover-img` 是 Block＋CMS 背景圖。背景圖為空時，
Webflow 不會隱藏這個 div（`w-dyn-bind-empty` 只作用在綁定元素本身，
背景圖綁定不算），於是 Designer 的預設佔位圖就這樣出現在線上。

**換成 `<img>` 之後，空值才會被正確地收掉。**
所以第 8 項這個紅旗的方向是反的：**新結構修掉了一個正式站現存的視覺瑕疵。**

### 結論與後續

- ❌ **不需要**為此補 `min-height` 或 `aspect-ratio`。補了反而會把空白框加回來。
- ✅ 這三筆真正該做的是**在 CMS 補上封面圖**（內容工作，不是 CSS 工作）。
- 補圖之後，卡片會自動恢復成 16:9 的正常樣子，不需要再改結構。

### 驗證限制

- Collection List 內的元素無法取得 Designer 畫布截圖（既有限制），
  以上全部改用**已發布頁面的瀏覽器實測**（computed style ＋ 元素截圖）取得。
- 量測時間 2026-09-22 16:59 UTC，staging 為當下最新發布版本。


---

## §12 驗證清單第 7 項的修正（2026-09-23）

**原本的第 7 項沒有測到它要測的東西。**

`/news` 驗證時我只擋了 `cdn.prod.website-files.com/gsap/3.15.0/`（IX3 自帶的那份），
但頁面上還有 Slater 從 `cdn.jsdelivr.net/npm/gsap@3.15` 載入的另一份，
IX3 會直接用 `window.gsap`，所以動畫照跑，測試等於沒擋。

**修正後的做法：用 `/gsap/` 擋掉兩份。** 重測結果：

| | staging | 正式站 |
|---|---|---|
| `/news` H1 | opacity 1、高 96px ✅ | 同左 |
| `/news` 卡片 | 53/53 可見 ✅ | 同左 |
| 手機選單 | ❌ 打不開 | ❌ 打不開（**既有問題**，不是這次造成的） |

手機選單在 GSAP 或 Slater 任一個沒載入時都打不開（Slater 開頭就呼叫 `gsap`，
整支 script 中斷）。這是 `18_載入效能稽核` P1-1 的單點故障，不是 IX3 遷移造成的。

> 教訓：頁面上有**兩份**同一個函式庫時，擋掉其中一份不叫「擋掉」。
> 驗證前先列出所有來源。

---

## §13 導覽列 C 版（兩段式）上 staging —— 2026-09-23

Terris 選 C，並已在 Designer 刪除漢堡鈕上 2 個 IX2 Click 觸發器。

互動 `i-8ae0e508`，scope `site`：

| 動作 | 目標 | 值 | 時間 |
|---|---|---|---|
| 收攏 | `.mobile-menu-icon_wrap .menu-top-lline` / `.menu-bottom-line` | y ±3.95px | 0–150ms，ease 4 |
| 旋轉 | 同上 | rotation ±45° | 150–400ms，ease 5 |
| 項目淡入 | `.mobile-menu_link-wrap > .mobile-menu-link`、`… .accordion-question.is-mobile-drawer`、`.mobile-menu_btn-wrap` | opacity 0→100% | 200ms 起，500ms，each 30ms |

觸發：`wf:click` on `.mobile-menu-icon_wrap`，`control: togglePlayReverse`。

- 3.95px 是實測值（Pixel 7、iPhone SE、900px 三種寬度相同）：兩條線中心距 7.89px 的一半
- 用 `wf:selector` 而不是 `wf:class`：`.accordion-question` 也用在其他頁的 FAQ，只選類別會連 FAQ 一起淡入

### 驗證結果

| 項目 | 結果 |
|---|---|
| staging IX2 是否還綁漢堡鈕 | ✅ 0 次（正式站仍 8 次，未受影響） |
| 開關 3 輪（`/news`、`/`） | ✅ 每輪都正確開成 X、關回 ≡ |
| X 交點 | ✅ 誤差 0.01px（原 IX2 偏 1.5px） |
| 兩段式 | ✅ 140ms 時 y=±2.75、尚未旋轉 |
| 抽屜內手風琴（Slater） | ✅ 展開 148px |
| JS 錯誤 | ✅ 無 |
| reduced-motion | ⚠️ 見下 |

### 🔴 reduced-motion 踩到的坑：`skip-to-end` 不能用在 toggle

第一版設 `skip-to-end`：**每次點擊都跳到終點**，所以關掉選單後漢堡鈕仍是 X。
改成 `dont-animate` 後：選單正常開關、項目可見，但**漢堡鈕在這個模式下不會變 X**
（按 ≡ 一樣可以關）。

> 規則：`togglePlayReverse` 的互動，reduced-motion 一律用 `dont-animate`。
> `skip-to-end` 只適合單向播放（load、scroll 進場）。


---

## §14 🔴 IX3「起始值」會讓內容在 webflow.js 載入前被隱藏（2026-09-23）

### 發現

只要 IX3 動作帶有**靜止時的起始值**（`tt: 1`／`tt: 2`，例如 `opacity: ["0%","100%"]`），
Webflow 發布時會自動在 `<head>` 插入：

```css
html.w-mod-js:not(.w-mod-ix3) :is(目標選取器…) { visibility: hidden !important; }
```

`w-mod-js` 在 head 的 inline script 就加上；`w-mod-ix3` 要等 **391 KB 的 webflow.js 下載並執行完**才加。
中間這段時間，所有目標都是 `visibility:hidden`。webflow.js 載入失敗的話，就**永遠**看不到。

### 實測（Pixel 7、1.6 Mbps／150 ms、CPU ×4，各 3 次取中位數）

| | 正式站 | staging（有標題逐字浮現） |
|---|---|---|
| 首次繪製 FCP | 2,096 ms | 2,272 ms |
| **`/news` 標題可見** | **2,013 ms** | **10,054 ms** |
| 擋掉 webflow.js | 標題可見 | **標題永遠隱藏** |

9/22 驗證時量的是 FCP，FCP 只差 +376 ms，所以沒發現。**FCP 量的是「有東西畫出來」，不是「標題看得到」。**

### 鐵律

> 🚫 **靜止時不得留起始值。** 需要「從 0 淡入」時，改用：
> `tt: 3` Set `opacity: "0%"`（position 0）＋ `tt: 0` To `opacity: "100%"`。
> Set 只在觸發時才執行，靜止時元素是原本的樣子，Webflow 就不會產生隱藏規則。
>
> 例外：真正在「首屏」的 load 進場動畫，這個寫法會變成「先看到 → 消失 → 再浮現」，
> 在慢速網路上更糟。**首屏內容不做 load 進場動畫。**

驗證清單新增第 9 項：**發布後檢查 `<head>` 有沒有 `w-mod-ix3` 隱藏規則，有的話逐一確認目標。**
並且在慢速網路條件下量「關鍵內容可見時間」，不只量 FCP。

### 已處理

- 選單 C 版（`i-8ae0e508`）項目淡入改為 Set＋To，隱藏規則中已不再出現選單項目 ✅
- `/news` 標題逐字浮現（`i-8a44c92a`）：**Terris 2026-09-23 決定保留**（「我覺得那個動畫沒問題」）

### 決策紀錄：標題逐字浮現保留

三種網路條件實測（各 3 次中位數，`/news` 標題可見時間）：

| 條件 | 正式站 | staging（有動畫） | 差距 |
|---|---|---|---|
| PageSpeed 行動版標準（1.6 Mbps／150 ms／CPU ×4） | 1,930 ms | 9,886 ms | +8.0 s |
| 一般 4G（9 Mbps／60 ms／CPU ×2） | 823 ms | 2,540 ms | +1.7 s |
| Wi-Fi 桌機（50 Mbps／20 ms／CPU ×1） | 811 ms | 1,486 ms | +0.7 s |

已知且接受的風險：
- webflow.js 載入失敗（被擋、CDN 異常）時，`/news` 標題不會顯示
- PageSpeed Insights 行動版分數預期會反映這段延遲

若日後要回頭處理：刪除互動 `i-8a44c92a` 並發布即可，不影響其他元素。

---

## §15 Cookie 與 Glass 按鈕遷移（2026-09-23）

### Cookie（Finsweet Cookie Consent v1）

Finsweet 用 `dispatchEvent("click")` 點 `[fs-cc="interaction"]` 隱藏元素：第一下顯示、第二下隱藏，
自己記錄狀態。所以 IX3 用 `wf:click` ＋ `togglePlayReverse` 可以直接接上。

| 互動 | id | 內容 |
|---|---|---|
| Cookie Banner Toggle | `i-2573cdba` | Set display flex ＋ Set yPercent 100 → To yPercent 0（400ms，ease 5） |
| Cookie Preferences Toggle | `i-25e6a62c` | Set display flex ＋ Set opacity 0／y 12 → To opacity 1／y 0（300ms，ease 5） |

- **刻意不加 reduced-motion 條件**：顯示／隱藏寫在動畫裡，`dont-animate` 會讓橫幅永遠不出現、無法同意 Cookie
- 注意：CSS 在 ≤991px 把 `.fs-cc-banner_component` 設為 `display:flex`，
  但 Finsweet 自己會注入 `display:none` 並在元素上寫 inline `display:none`，所以不依賴 IX2 初始狀態

### 偏好設定開關 → CSS

改讀 `:checked`（見 `custom-code/jubo-motion.css`）。已驗證原本的 IX2 **沒有**狀態脫鉤問題
（Finsweet 重開時會用模擬點擊還原），但有一個既有瑕疵：**未勾選時底色是品牌青色**，看起來像已開啟。CSS 版改為 #ccc。

### Glass 按鈕箭頭 → CSS

- IX3 做不到：箭頭是觸發元素的子元素，且同一元件在全站重複
- 實測原效果：箭頭 is-1 由 0 → +27px 滑出、is-2 由 −27px → 0 滑入，約 150ms 延遲後才開始
- CSS 版：`.5s cubic-bezier(.625,.05,0,1)`，**與 Slater 的文字逐字翻滾同一條曲線、同時開始**
- 以 `.glass-element.is-cta` 限定，排除「回到頂部」按鈕

### 部署位置

CSS 放在 **Site Settings → Custom Code → Footer** 的 `<style id="jubo-motion">`。
不放 head：head 有 15 KB 既有程式碼，API 寫入是整段取代，重打風險太高；footer 只有 6 行。

### 驗證狀態

| 項目 | 狀態 |
|---|---|
| Glass 靜止／hover 3 次／離開 | ✅（模擬移除 IX2 後） |
| 偏好設定視窗開關 | ✅（模擬移除 IX2 後） |
| 橫幅收起、開關取消勾選 | ⏸ 模擬不乾淨（IX2 已先寫入 inline 樣式），**等 Designer 實際刪除 IX2 後重測** |


### §15 補充：Cookie 實測通過（Designer 已刪除 IX2 後）

staging IX2 事件 384 → 374（漢堡鈕 4 ＋ Cookie 6），Cookie 相關殘留 0。

| 情境 | 桌機 1440 | 手機 Pixel 7 | 平板 900 |
|---|---|---|---|
| 首次載入橫幅滑入 | ✅ 837→799 | ✅ 726→593 | ✅ |
| 點「Cookie 偏好設定」→ 橫幅收、視窗開 | ✅ | ✅ | — |
| 開關 3 次（勾／取消／勾） | ✅（桌機渲染較慢，約 250ms 才起動，1.5s 內到位） | ✅ | — |
| 未勾選底色 | ✅ 灰 | ✅ 灰 | — |
| 儲存並關閉 → 換頁不再出現 | ✅ | ✅ | — |
| 重開偏好設定，狀態正確還原 | ✅ 分析 ☑ 20px 青 | ✅ | — |
| 按 X 關閉 | ✅ | ✅ | — |
| 接受全部 → 換頁 | — | ✅ 不再出現 | — |
| 拒絕全部 → 換頁 | — | — | ✅ 不再出現 |
| JS 錯誤 | 無 | 無 | — |

### §15 補充：Glass 動畫還用在首頁「解決方案」輪播

15 個綁 Glass IX2 的元素中，首頁 4 個是 `.cascading-slider_content-wrap` 卡片裡的 `.home-solutions_icon-link`，
不是 `.glass-button`。Slater 在卡片 hover 時對箭頭送假 mouseover 觸發 IX2。
已在 `jubo-motion.css` 補上 `.cascading-slider_content-wrap:hover` 規則，**刪 IX2 前必須先有這條**，否則首頁卡片會失去箭頭效果。

### §15 補充：Glass 按鈕驗證（2026-09-23，Designer 刪除 IX2 後）

staging 全站 IX2 事件 354 個，仍綁元素 119 個（遷移前 149）。

**已刪乾淨並驗證通過**（靜止 0/−27 → hover 27/0 → 離開 0/−27，連續 3 次；無 IX2 inline 殘留）：

| 位置 | 結果 |
|---|---|
| Navbar「預約諮詢」（元件，全站） | ✅ |
| 首頁解決方案箭頭 ×4（直接 hover／整張卡片 hover 都正確） | ✅ |
| 住宿型照護系統 詳細介紹 ×2 | ✅ |
| 日照型照護系統 詳細介紹 ×1 | ✅ |
| 居服照護系統 `is-aa` 清單 ×2 | ✅ |
| 手機（≤991px）第二個箭頭維持隱藏、無 transform | ✅ |

**尚未刪除**（仍綁 IX2，CSS 被 inline 蓋過，行為與正式站相同）：

- 居服照護系統 `tab-layout__wrap is-bb` 清單內 2 顆（本頁第 7、8 個 `tab-content__wrap is-product`）
- 智齡數位 3 顆「了解更多」（本頁第 1、3、5 個 `tab-content__wrap is-product`）

**全頁可見度普查**（第 8 項）：10 頁 × 桌機／手機，staging 相對正式站多出的隱藏元素 **0 項**，JS 錯誤 0。

---

## §16 智齡數位彈窗：誤刪復原＋修掉正式站既有 bug（2026-09-23）

### 發生了什麼

`/ecosystem/jubo-digital` 的 3 顆「了解更多」（`href="#"`，本頁第 1、3、5 個 `tab-content__wrap is-product`）
同一顆按鈕上綁了兩種 IX2：Glass hover **＋ 點擊開啟 Modal 1/2/3**。
刪除 Glass hover 時連同點擊一起刪掉，staging 上彈窗打不開。

**流程失誤（我的）**：給刪除清單時只列了 Glass 的 hover，沒有先檢查同一元素上是否還有其他 IX2。
→ 規則：**給 Designer 刪除清單前，必須列出該元素上的全部 IX2 事件，並明確標示「只刪哪一個」。**

另外發現按鈕 3 的 hover-out 原本綁的是 `Stats Color Hover Out 13`（接錯動畫，既有瑕疵），已隨刪除消失。

### 🔴 正式站既有 bug：用 X 關閉彈窗後整頁被隱形遮罩擋住

實測（正式站，桌機）：點 X 後彈窗 `display:flex; opacity:0`，**沒有收起**，
`modal_background-overlay`（z-index 99、全螢幕）擋住整頁，「了解更多」按鈕也點不到。
點背景關閉則正常。

原因：IX2 `Modal N [Close]` 的內容位移用 `useEventTarget: SIBLINGS`，X 按鈕不是 `.modal_content-wrapper` 的兄弟，
該動作找不到目標，第二組（`display: none`）永遠不執行。

### 處理（全部 IX3，scope 限本頁）

| 互動 | id | 內容 |
|---|---|---|
| Modal 1 Open | `i-fde5a41e` | click（wf:inst 按鈕 1）restart：Set display flex／opacity 0／內容 yPercent 100 → To opacity 1（200ms）＋ yPercent 0（500ms） |
| Modal 2 Open | `i-3f709c38` | 同上，按鈕 2 |
| Modal 3 Open | `i-38967c27` | 同上，按鈕 3 |
| Modal Close | `i-9e2c8559` | click `.modal_close-button` 或 `.modal_background-overlay` restart：To opacity 0 ＋ 內容 yPercent 100（300ms，ease 4）→ **Set display none（300ms）** |

- 用 `restart`：每次點擊都要能重新打開／關閉
- 不加 reduced-motion 條件：顯示／隱藏寫在動畫裡（同 Cookie）
- 關閉一律作用在三個彈窗（同時只會開一個），避開「只關自己那個」需要的子元素目標

### 驗證（staging）

| | 結果 |
|---|---|
| 3 個彈窗 × 開→X 關 × 2 輪 | ✅ 每次關閉都 `display:none`，按鈕可再點 |
| 點背景關閉 | ✅ |
| 手機 Pixel 7 | ✅ |
| 點擊後捲動位置不跳 | ✅ |
| JS 錯誤 | 無 |

### 待刪

IX2 `Modal 1/2/3 [Close]` 仍在（6 個：每個彈窗的 X 按鈕與背景各 1），與 IX3 並存時無害
（IX3 最後一定會 `display:none`），但遷移完成前要刪掉。

---

## §17 Stats 卡片 hover（照片淡入＋文字轉白）→ CSS（2026-09-23）

### 原本的效果（IX2 `Stats Color Hover In/Out`，34 個觸發器、13+13 份重複 action list）

整張 `.single-stats_wrapper` hover 時：
- 背景照片 `.big-numbers-stats-bg`：opacity 0 → 1（300ms ease）
- `.stats-unit_wrapper`／`.stats-h3`／`.stats-headline_wrap`：黑（`--neutral--black`）→ 白（`--neutral--white`）

靜止時照片隱藏是 **class 本身的 `opacity:0`**，不是 IX2，所以刪 IX2 不會讓照片冒出來。
手機點擊原本就沒有效果，新版維持。

### 為什麼是 CSS

「hover 卡片 → 改卡片裡的照片與文字」＝ 觸發元素的子元素，IX3 做不到；
`.single-stats_wrapper:hover .big-numbers-stats-bg` 是 CSS 的基本能力。

### 範圍

| | 卡片數 | 處理 |
|---|---|---|
| 有照片、有 IX2（首頁 3、公司 5、三個解決方案頁各 3） | 17 | ✅ 套用 |
| 有照片、無 IX2（`/jp/overview`） | 3 | ✅ 2026-09-23 Terris 決定一併加上（原本無 hover，推測複製頁面時漏掉） |
| 無照片（長照專業成長 14、Jubo AI 4、暑期實習 4 等） | 31 | ✅ 以 `:has(.big-numbers-stats-bg)` 排除，避免白底白字 |

### 驗證（staging，擋掉含 IX2 的 webflow.js 以模擬刪除後）

- 用 CDP `CSS.forcePseudoState` 強制 `:hover`（不依賴滑鼠座標），並暫時關閉 transition 驗證邏輯：
  17 張全部「圖 0／黑 → 圖 1／白 → 圖 0／黑」✅；日本頁 3 張不變 ✅；無照片 22 張（抽 3 頁）文字不變 ✅
- **測試方法教訓**：這些頁面有 Slater 視差與 Lenis 平滑捲動，`scrollIntoView` 後立刻用滑鼠座標 hover，
  卡片還在移動，結果會隨機錯誤。**有視差／平滑捲動的頁面，hover 測試用 forcePseudoState。**
- ⏸ 過渡時間（300ms）在擋掉 webflow.js 的情況下幀率不穩，無法量準；**待 Designer 刪 IX2 後，以真實頁面量測**。


### ⚠️ 待確認：日本頁「AI 不得自行 Publish（含 staging）」與本次遷移流程的衝突

`JP日本市場頁面改版/README.md` 規定 AI 不得自行發布，含 staging。
本輪遷移為了驗證，多次做了**全站** staging 發布（選單、Cookie、Glass、彈窗），這些全站改動因此也出現在日本頁的 staging 上。
日本頁本身的元素與 class 未被修改，但發布行為本身與該規則衝突，當時未先確認。
→ **2026-09-23 Terris 回覆「日本可以」**：遷移專案期間可發布 staging（含日本頁）；正式站仍須另行授權。已記入 `JP日本市場頁面改版/README.md`。

---

## §18 FAQ 手風琴 → 15 行 JS 管狀態＋CSS 管動畫（2026-09-23）

### 原本的 IX2：兩套疊在一起

| | 內容 | 評估 |
|---|---|---|
| Class 觸發 `.faq5_question`（e-301/302） | 旁邊 `.faq5_answer` 高度 0↔auto（400ms）、`.faq5_icon-wrapper` 轉 45°（＋→×） | **真正在做事的** |
| 元素觸發 ×8（Jubo AI 5、照護推車 3） | 動畫目標寫死成 Jubo AI 第 1 題的第二個圖示；部分綁在**答案內文**上 | 殘骸：點 Jubo AI 第 2～5 題會動到第 1 題的圖示；照護推車頁目標不存在 |

5 頁（首頁 7 題 CMS、Jubo AI 5、照護推車 5、Amy 8、Amy Banner 8）結構一致：
`.solutions-basic-model_accordion > .faq5_question + .faq5_answer(1 子元素)`。Amy 兩頁的題目沒有圖示（正式站也不會轉）。

### 為什麼不是 IX3 或純 CSS

- IX3：「點題目 → 開**旁邊**那個答案」＝ 觸發元素的兄弟，且每頁多題，無法只開被點的那一題
- 純 CSS：沒有地方存「開／關」狀態（除非改成 `<details>`，要在 Designer 重做 5 頁結構）
- → **JS 只切換 `.is-faq-open` class（`custom-code/jubo-faq.js`），動畫全部交給 CSS（`jubo-motion.css`）**

### 設計

- `grid-template-rows: 0fr ↔ 1fr` 做 height:auto 的過渡，不用 JS 量高度；400ms ease、圖示 200ms ease（同原值）
- 答案內 `.margin-bottom.margin-small` 的 1rem 外距 → 改為內層 `padding-bottom`：外距會在收合後殘留 16px，
  放在同一層的 padding 也會殘留（padding 不會被自己的高度裁掉），必須放到再內一層
- 以後代選取器覆寫，**不改共用 utility `margin-small`**
- 補無障礙：`role=button`、`tabindex=0`、`aria-expanded`、`aria-controls`、Enter／空白鍵、`:focus-visible` 外框
- 各題獨立開關（同原 IX2，不自動收起其他題）

### 驗證（注入正式站頁面，未發布）

| | 結果 |
|---|---|
| 5 頁 × 桌機＋首頁手機：靜止高度 | ✅ 全部 0 |
| 展開高度 | ✅ 與 IX2 完全相同（首頁 124、Jubo AI 70、照護推車 43、Amy 97/70；手機 232/205） |
| 多題各自開關、再關閉 | ✅ |
| `aria-expanded` | ✅ 每次切換正確 |
| 鍵盤 Enter 開／空白鍵關 | ✅ |
| 與舊 IX2 並存（刪除前就發布的情況） | ✅ 不衝突（`height:auto!important` 蓋掉 IX2 的 inline 高度；圖示兩邊同步旋轉） |

**測試環境限制**：此雲端容器無 GPU，實站僅約 14 fps（擋掉 webflow.js 時 7 fps），
過渡動畫的時間在這裡量不準，會出現「慢一拍」的讀數。**邏輯驗證一律關閉 transition 或等畫面靜止後讀值**；
實際流暢度待發布後在真機確認。

### 待 Designer 刪除（先列出元素上的全部動作）

| 位置 | 元素 | 該元素上的全部 IX2 | 刪什麼 |
|---|---|---|---|
| 任一頁任一題 | `faq5_question`（class 觸發） | Mouse click（Open 3／Close 3） | 刪 Mouse click（class 觸發，刪一次全站） |
| Jubo AI 第 1 題 | `faq5_question` | 另有元素觸發 Mouse click（Open／Close） | 刪 |
| Jubo AI 第 2 題 | 外層 `solutions-basic-model_accordion` | Mouse click（Open／Close） | 刪 |
| Jubo AI 第 3 題 | 答案內的段落（無 class） | Mouse click | 刪 |
| Jubo AI 第 4 題 | 答案內 `max-width-large` | Mouse click | 刪 |
| Jubo AI 第 5 題 | 答案內 `margin-bottom margin-small` | Mouse click | 刪 |
| 照護推車 第 3／4／5 題 | 同 Jubo AI 第 3／4／5 題 | Mouse click | 刪 |

這些元素上**沒有其他 IX2 動作**，整個刪除即可。

### §17／§18 補充：發布 staging 後的真實頁面驗證（2026-09-23）

Designer 已刪 Stats 與 FAQ 的 IX2；staging 仍綁元素的 IX2 **99 → 47**，Stats 0、FAQ 0。
Webflow 原本烘焙在 HTML 的 `.faq5_answer{height:0}` inline 已消失（`height:auto!important` 之後可移除）。

| | 結果（真實 staging，未擋任何程式、未注入） |
|---|---|
| Stats 6 頁（含日本頁）強制 `:hover` | ✅ 全部「0 黑 → 1 白 → 0 黑」 |
| FAQ 5 頁桌機＋2 頁手機：開、開第二題、關、Enter、aria | ✅ 全部正確，高度與原本一致 |
| FAQ 過渡動畫 | ✅ 會執行（700ms 內展開完成）；容器 fps 極低，點擊後約 300ms 才開始推進，**需真機確認手感** |
| JS 錯誤 | 無 |
| 全頁可見度普查（12 頁 × 桌機／手機，含日本頁、智齡數位） | ✅ 相對正式站多出的隱藏元素 0 項 |

---

## §19 IX2 刪除流程改進：由 MCP 代為選取元素（2026-09-23）

MCP **無法刪除 IX2**，但 `designer_tool` 可以操作 Terris 開著的 Designer：`switch_page`、`select_element`。

新流程：
1. 我先列出元素上的**全部** IX2 動作（§16 教訓）
2. 用 `designer_tool` 切頁、選好元素
3. Terris 在右側 Interactions 分頁刪除，回覆「下一個」
4. 全部刪完後發布 staging，重新解析 IX2 驗證

條件：Designer 必須開著且連上 MCP Bridge。隱藏元素（如彈窗內）選取時畫布上可能看不到外框，以 Navigator 與右側 class 名稱確認。

首次使用：智齡數位 Modal 2／3 的 X 按鈕，刪除後彈窗完全由 IX3 控制，驗證通過。
仍綁元素的 IX2：47 → **45**。

---

## §20 相關新聞與客戶案例卡片：IX3 上浮＋改用 Image 元素（2026-09-23）

Terris：「改成 IX3」「評估完之後可以優化，不一定要按照原設計」。

### 原本（IX2 `Img Hover [In]/[Out]`，6 個觸發器）

| 頁面 | 卡片 | 效果 |
|---|---|---|
| `/news` | 列表 53 張 | 封面圖 scale 1.03＋標題 opacity 0.6（350ms outQuad） |
| 新聞內頁（範本，50 篇） | 相關新聞 22–23 張 | 同上 |
| `/customer-success-stories` | 23 張 | 同上 |

### 評估與優化

| 原效果 | 問題 | 處理 |
|---|---|---|
| 封面 scale 1.03 | 子元素目標，IX3 做不到；站上規範「避免大幅 Scale」 | 改為**整張卡片上浮 3px**（`wf:trigger-only`） |
| 標題淡化 0.6 | 子元素目標；**hover 時使用者正要讀標題，字卻變淡** | 拿掉 |

→ 三種頁面共用**同一個** IX3（`i-b019b836`，scope 由 `/news` 改為 **site**），不再各自一份。

### 順帶的效能修正

新聞內頁的相關新聞與客戶案例頁都是 23 張 **background-image** 卡片 —— 與 `18_載入效能稽核` P0-1 的 `/news` 同一個問題
（無 lazy load、無 srcset，全部原圖）。比照 `19_news封面圖改用Image元素` 的做法：

| 頁面 | 新增 Image（`.news-card_cover-img`） | assetId 綁定 | altText 綁定 |
|---|---|---|---|
| 新聞中心s Template `69f82ba2…d696` | `4aaef260-aa23-4e7a-7534-307443eaf82e` | 新聞中心s → Cover Image | Name |
| 客戶成功案例 `6a1cd470…2cfe` | `de015a64-a10c-409d-5f96-4327bbeca7c0` | 客戶成功案例s → Article Cover Image | Article Headline |

綁定前已驗證：客戶案例卡片的背景圖確實是 `Article Cover Image`（asset ID 與 CMS 一致），不是 `Slider Headshot`。

### staging 驗證（2026-09-23，IX2 刪除＋staging 發布後）

| 頁面 | 卡片 | `<img>` | 與 prod 圖片 asset 對照 | alt | lazy | hover（進/出 ×2） | 首屏載入圖片 prod → staging |
|---|---|---|---|---|---|---|---|
| `/news` | 53 | 53 | 53/53 相同 | 0 缺 | 53 | -3 → 0 → -3 → 0 | 4,434KB → 4,421KB（已於 19 修過，持平） |
| `/news/ai-transformation-culture`（範本） | 4 | 4 | 4/4 相同 | 0 缺 | 4 | -3 → 0 → -3 → 0 | 6 張 1,406KB → 2 張 **187KB** |
| `/customer-success-stories` | 23 | 23 | 23/23 相同 | 0 缺 | 23 | -3 → 0 → -3 → 0 | 23 張 3,164KB → 6 張 **557KB** |

- IX2 `Img Hover` 綁定數：6 → **0**；三頁皆無 JS 錯誤。
- 全頁可見性掃描（13 頁 × 桌機／手機，staging 對 prod）：差異 **0 項**。
- 圖片 `object-fit: cover`，尺寸與原背景圖卡片一致（416×234／728×410）。
- 範本頁相關新聞的 `srcset` 為 0：Webflow 對部分 CMS 圖片沒有產生 responsive 版本（不影響顯示；lazy load 已經拿到主要效益）。
- 驗證限制：hover 以 Playwright 真實滑鼠事件測試邏輯；容器無 GPU，過場手感需實機確認。

### 可清理候選（未授權刪除）

- `.single-news_cover-img`：新聞範本與客戶案例的舊背景圖 div 已移除，此 class 可能全站無實例。刪除前依 CLAUDE.md 先查 Slater、IX2、Component。

## §21 CTA 67 照片牆與導入流程進度條：改用 CSS（2026-09-23）

Terris 同意順序後進行；兩者都是「不需要 JS 的純視覺動畫」，改寫在 `custom-code/jubo-motion.css`（站上 Footer `<style id="jubo-motion">`）。

### CTA 67 image top / bottom [Loop]（6 個觸發器 → 0）

| | 原本（IX2） | 現在（CSS） |
|---|---|---|
| 頁面 | 智齡照顧網、Jubo 健康 APP、長照專業成長 的頁首照片牆 | 同 |
| 動作 | 50 秒平移 -50%（下排 +50%），結束瞬間歸零，無限重複 | `@keyframes` 50 秒 linear infinite |
| 接縫 | 每排是兩份相同清單＋16px gap；只移 50% 會**每圈跳 8px** | 移 `50% + 8px`＝剛好一份，實測一圈位移＝一份寬（2,592px／4,320px） |
| 暫停 | 無 | 滑鼠停在照片牆上暫停（WCAG 2.2.2） |
| reduced-motion | 照動 | 不動 |
| 依賴 | webflow.js 載入後才開始動 | 無 JS 依賴，首屏就開始 |

- 智齡照顧網、Jubo 健康 APP 的下排 `.product-hero-3_image-list-bottom` 帶 `.hide`（display:none），CSS 對它無影響。
- keyframes 必須寫 `from`；沒寫的話起點會吃到元素當下的 inline transform（IX2 殘留時會亂跳）。

### timeline_progress_bar（1 個 class 觸發器 → 0）

| | 原本（IX2） | 現在（CSS） |
|---|---|---|
| 位置 | `Section CTA Process` 元件（三個解決方案頁、智齡安心寶、IoT 設備列表） | 同 |
| 動作 | 捲動 scrub：寬度 0 → 400%（keyframe 0→50） | `animation-timeline: view()`、`animation-range: cover 0% cover 50%` |
| 手機 | 容器 display:none，無效果 | 同 |
| 不支援 view() | — | 直接顯示填滿（`@supports not`） |
| reduced-motion | 照動 | 直接顯示填滿 |

- 祖先 `.page-wrapper`、`.all-sections-wrapper` 是 `overflow: clip`（不是 hidden），不會變成 scroll container，`view()` 綁得到視窗。若日後有人改成 `overflow: hidden`，進度條會停在 0% —— 動這兩個 class 前要注意。
- 進度條在 `Section CTA Process` 元件裡，Designer 要進元件 canvas 才選得到（`designer_tool open_canvas component_id`）。

### staging 驗證

| 項目 | 結果 |
|---|---|
| IX2 綁定 | 39 → **32** |
| 照片牆 3 頁 | 動畫 `jubo-marquee-l/r` 執行中、inline IX2 殘留無、接縫 0px |
| 進度條 5 頁（桌機） | 畫面 y=1000→0%、800→88%、600→265%、300→400%（5 頁一致） |
| reduced-motion | 照片牆不動；進度條 5 頁皆 400% |
| 可見性掃描（6 頁 × 桌機／手機） | 差異 0 |

驗證限制：容器無 GPU，只驗數值與邏輯；Firefox／舊 Safari 的 fallback 未實機測（邏輯為 `@supports not` → 填滿）。
