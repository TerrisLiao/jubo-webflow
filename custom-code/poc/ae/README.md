# After Effects 腳本

這裡放透過 `AfterEffectsMCP` 的 `run-script` 執行的 ExtendScript。

## 為什麼腳本要放在 repo，而不是塞進 run-script 的參數

長腳本直接當參數傳會被長度限制和跳脫字元搞死。改成一行載入器：

```javascript
$.evalFile("/Users/<你>/jubo-webflow/custom-code/poc/ae/build-logo.jsx");
```

好處：用正常的編輯工具改檔案、進 git 有版本紀錄、雲端那邊的 session 也看得到。

## 那支 MCP 的真實能力

工具清單看起來只能做基本 transform，但 **`run-script` 等於完整的 AE scripting API** ——
套任何效果、建 mask、track matte、precomp、運算式、匯入、render queue，全都能做。
其他工具只是糖衣。

## 三個地雷

1. **套效果要用 matchName，不是顯示名稱。**
   `addProperty("Glow")` 在非英文介面會失敗，`addProperty("ADBE Glo2")` 不會。
   不要憑記憶猜 —— 先跑 `00-dump-effects.jsx` 在這台機器上問一次。

2. **ExtendScript 是 ES3。**
   沒有 `let` / `const` / 箭頭函式 / 樣板字串，`forEach` 不保證有。
   一律 `var` ＋ 傳統 `for`，不然會靜默出錯。

3. **包 undo group。**
   `app.beginUndoGroup("名稱")` … `app.endUndoGroup()`，
   否則腳本建的每個動作都是獨立 undo 步驟。

## 視覺迴圈（很重要）

MCP 沒有 render 工具，但 `comp.saveFrameToPng()` 存出來的 PNG 就在本機硬碟上，
**本機的 Claude 可以直接用 Read 工具打開來看**。

所以流程是：**改腳本 → `$.evalFile` 執行 → 跑 `90-save-frame.jsx` 存一格 → Read 那張 PNG → 再改**。

沒有這一步就是在盲寫，做出來的東西不會好。

## 檔案

| 檔案 | 用途 |
|---|---|
| `00-dump-effects.jsx` | dump 所有效果的 matchName 到桌面 `ae-effects.txt` |
| `90-save-frame.jsx` | 把目前 comp 的某一格存成桌面 `ae-frame.png` |

## 規格來源

標誌動態的 timing sheet 在 [`../n-copilot-logo-motion-v2.html`](../n-copilot-logo-motion-v2.html)，
「進場 74 格 @ 30fps」那張表就是要照著建的內容。

向量素材用 [`../../brand/n-copilot/ae/n-copilot-mark.pdf`](../../brand/n-copilot/ae/n-copilot-mark.pdf)
（AE 不吃 SVG），匯入後 `Layer > Create > Create Shapes from Vector Layer`。

幾何數值與品牌色見 [`../../brand/n-copilot/README.md`](../../brand/n-copilot/README.md)。
