# /security 多層防護：四張橫式 motion graphic

`/security` 頁「多層防護」sticky 區塊右側的四張 16:10 動畫，原始碼與驗證腳本都放在這裡。
Webflow 上的元素、class、IX3 interaction 都是從這裡產生的。要修改時先改這裡，再重新產生並寫回。

## 檔案

| 檔案 | 用途 |
|---|---|
| `spec.py` | 唯一來源：四張卡的 HTML、CSS（px 寫法，自動轉 em）、每個元素的關鍵影格 |
| `build_preview.py` | 產生 `spec.json`（HTML／CSS／segments／初始狀態）與本地 `preview.html` |
| `merge.py` | 把多 class 元素合併成單一 class（避免 whtml 產生 combo class），輸出 `wf_payload.json` |
| `gen_ix3.py` | 由 `spec.json` 與 `ids.txt` 產生四個 IX3 interaction payload（`ix3_payload.json`） |
| `ids.txt` | `data-mg` 鍵 → Webflow element id 對照表（2026-10-08 讀回） |
| `floors.json` | 寫入 Webflow 後追加的最小字級（`max(Nem, 8px)`／字卡 `max(1em, 11px)`） |
| `audit.js` | 跑版稽核：每 100ms 檢查文字溢出卡片、溢出舞台、白卡互相重疊。`W=350 node audit.js` 指定面板寬 |
| `layer-dots.footer.html` | 手機版頁碼圓點的同步 script，與 /security 頁面 Footer Code 內容相同（改這裡就要一起改站上） |
| `swipe_check.js`／`dots_check.js` | 手機版左右滑動與圓點同步的本地驗證 |
| `gsap_check.js` | 用真正的 GSAP 跑三個循環，逐元素比對 `preview.html` 的取樣器，確認 IX3 迴圈不漂移 |

`gsap_check.js` 的 GSAP 只用於本地驗證，不進網站（IX3 本身就是 GSAP runtime）。
執行前在任一暫存目錄 `npm install gsap@3.12.5`，再以 `GSAP_PATH=<path>/gsap.min.js` 指定。

## 重新產生流程

```
python3 build_preview.py      # spec.json + preview.html
python3 merge.py              # wf_payload.json（whtml 用）
python3 gen_ix3.py            # ix3_payload.json（IX3 用）
node audit.js; node gsap_check.js
```

## IX3 迴圈做法（重要）

- 每個動作都是 `repeat: -1`，`repeatDelay = 週期 − 動作長度`，所有動作共用同一週期。
- 每張卡在 position 0 有一組 **FromTo reset**（init → init+ε，長度 100ms）。
  不能用極短的 To：GSAP 在重複時若該 tween 的區域時間仍等於 duration 會跳過 render，reset 不會生效。
  也不能讓 reset 的起點等於終點：GSAP 會略過沒有變化的屬性，所以終點加上看不出來的 ε。
- 真正的動畫全部延後 100ms（`OFF`），不與 reset 重疊。
- class 的靜止狀態就是「代表畫面」（hero frame），給 reduced-motion（`dont-animate`）與 Designer 畫布使用。
- 觸發：各自的 step item 進入 `top 85%` 播放、離開 `bottom 15%` 暫停。
