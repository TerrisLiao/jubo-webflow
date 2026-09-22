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
| F | **捲動進場** | 淡入上移 | Class | `opacity 0→100` ＋ `y 12→0` · slow · out · `start: "top 85%"` | 67 個捲動觸發器 |
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
