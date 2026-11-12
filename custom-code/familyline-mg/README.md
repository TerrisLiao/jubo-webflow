# 智齡安心寶（住宿型）v2：三張操作流程 motion graphic

`/products/familyline-residential-v2`（草稿）三個 scroll card 右側的 3:2 動畫。做法沿用 [`../security-mg`](../security-mg/README.md)：先在本地用 spec 產生 HTML／CSS／關鍵影格，稽核後用 whtml 寫入 Webflow，再產生 IX3 循環互動。

| 卡 | 內容 | 字卡 |
|---|---|---|
| 01 健康狀況 | 護理師在系統逐字輸入體溫／血壓／脈搏 → 按儲存、「已同步」 → 家屬端（機構 LINE 官方帳號）血壓趨勢長條長出、三列數值、「偏高」標籤彈出 → 外診紀錄卡滑入 | 護理師照常登錄生理數值／家屬在 LINE 看趨勢，偏高直接標示／外診院所、科別、時間同步更新 |
| 02 生活點滴 | 工作人員在照片格點選兩張（點擊圈、勾選） → 已選 2 張、按分享 → 家屬端照片泡泡、下載鈕跳動 → 近一年活動列表 | 工作人員挑選後才分享／家屬在 LINE 看照片，也能下載／參與過的活動一次看 |
| 03 家屬綁定 | 住民檔案按「產生綁定 QR Code」→ QR 彈出 → 家屬端掃描框、掃描線、✓ → 確認身分表單逐字輸入姓名、按確認 → 綁定完成與可查看項目 | 機構從住民檔案產生 QR Code／家屬在 LINE 掃描、確認身分／綁定完成，資料自動同步 |

示範資料（王奶奶、152/93、○○醫院、王小美、A-203）都是虛構。手機畫面不放 LINE 商標，也不呈現「推播」（尚未確認屬實）。

## 檔案

| 檔案 | 用途 |
|---|---|
| `spec.py` | 唯一來源：前段共用函式取自 security-mg，`CARD 1–3` 為本頁內容 |
| `build_preview.py`／`merge.py`／`gen_ix3.py`／`audit.js`／`gsap_check.js` | 同 security-mg，改成本頁 class 前綴與 3 張卡 |
| `ids.txt` | `data-mg` 鍵 → Webflow element id（2026-11-12 讀回，88 個） |
| `shots.js`／`gif.js` | 本地截圖與錄製 GIF（輸出到 scratchpad，不進 git） |

## 重新產生

```
python3 spec.py && python3 build_preview.py && python3 merge.py && python3 gen_ix3.py
node audit.js
GSAP_PATH=<path>/gsap.min.js node gsap_check.js
```

2026-11-12 結果：audit 0 溢出／0 非預期重疊；GSAP 三輪逐元素比對誤差 0。

## Webflow

- 舞台放在原 scroll card 的 `image-wrapper.is-layered`（已加 `container-type: inline-size`），`familyline-mg_stage` 字級 `calc(100cqw / 45)`，任何寬度等比縮放。
- 共 114 個 `familyline-mg*` class，每個元素只掛一個 class。whtml 會截斷 font-family，`familyline-mg1_char` 已用 style tool 補回完整等寬字體堆疊。
- IX3：`i-6893ee2b`（01）、`i-dbbae4a0`（02）、`i-3fdf5897`（03）。觸發是各 image-wrapper 捲動 `top 85%` 播放、`bottom 15%` 暫停；reduced-motion `dont-animate`，停在 class 的代表畫面。
