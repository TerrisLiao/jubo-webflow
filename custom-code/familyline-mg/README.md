# 智齡安心寶（住宿型）v2：三張 LINE 操作流程 motion graphic

`/products/familyline-residential-v2`（草稿）三個 scroll card 右側的 3:2 動畫。**手機畫面照 Figma `LTC - 安心寶`（`epTBL1gVwoHNpKczaaYV3z`，Line 頁）重建**，稍作改編。做法沿用 [`../security-mg`](../security-mg/README.md)。

版面：左側一支手機（原稿 390 px 設計稿 ×0.6，手機元素 `font-size: 0.6em`，子元素直接寫設計稿 px），右側「家屬在 LINE 的操作」四步驟（目前步驟有直條指示），最後一步彈出放大卡。

| 卡 | 對應 Figma | 流程 |
|---|---|---|
| 01 生理數值 | 5.0 生理數值（`67:6068`、`110:14456`） | 聊天室 → 點圖文選單「生理數值」→ 模板訊息（體溫／血壓／脈搏／血糖／體重）→ 點「查看更多」→ LIFF 血壓頁：趨勢圖描繪、血壓紀錄逐列出現、偏低／偏高／異常標籤彈出 → 放大卡「224 / 85 偏高」 |
| 02 照片花絮 | 4.0 照片花絮（`41:2494`、`154:52622`） | 點圖文選單「照片花絮」→ 近半年照片花絮（依活動日期）→ 點照片 → 大圖對話框 1/2 → 左滑到 2/2 → 點「下載」→ 已下載提示 → 放大卡 |
| 03 家屬綁定 | 1.0 綁定 QR Code（`16:904`、`16:1815`、`16:1979`、`322:18044`） | 歡迎訊息 → 點「QR Code 綁定對象」→ 掃描框、掃描線、✓ → 確認身分頁 → 點「確認綁定」→ 綁定完成頁 → 放大卡 |

改編處：手指改為黃色指標並加點擊波紋；圖文選單點擊時加高亮；照片頁活動名稱縮短；聯絡電話改為 0912-345-678（原稿號碼不沿用）；不畫 LINE 商標，不呈現推播。

素材（Webflow Assets，從 Figma 匯出轉 WebP）：圖文選單 `6af5733dd17e817cf8a23a6a`、機器人頭像 `6af5733d6f9624ce6c911480`、活動照片 `6af5733ee95c96cee8e34b26`／`6af5733efd4887d22ad7bbb8`／`6af5733ed17e817cf8a23ae9`／`6af5733e34582d659c961dcd`。CSS 以 background-image 引用 CDN 網址。

## 檔案

| 檔案 | 用途 |
|---|---|
| `spec.py` | 唯一來源：前段共用函式取自 security-mg（已修正 font-size 基準判斷），v3 區塊為本頁內容 |
| `build_preview.py`／`merge.py`／`gen_ix3.py`／`audit.js`／`gsap_check.js` | 同 security-mg，改成本頁 class 前綴與 3 張卡 |
| `ids.txt` | `data-mg` 鍵 → Webflow element id（2026-11-12 讀回，76 個） |
| `sitecheck.js` | 把站上實際 CSS（`jubo-health.webflow.shared.*.css`）套進 preview 截圖，抓站上全域樣式造成的跑版：`DIR=$PWD CSS=<site.css> OUT=<dir> node sitecheck.js` |
| `shots.js`／`gif.js` | 本地截圖與錄製 GIF（輸出到 scratchpad，不進 git） |

## 重新產生

```
python3 spec.py && python3 build_preview.py && python3 merge.py && python3 gen_ix3.py
node audit.js
GSAP_PATH=<path>/gsap.min.js node gsap_check.js
```

2026-11-12 結果：GSAP 三輪逐元素比對誤差 0；audit 只回報 LIFF 頁在手機外待命時的「offstage」（被手機 overflow 裁掉，屬預期）。

## Webflow

- 舞台根元素設 `line-height: 1.35`：站上 body 的 `line-height: 150%` 會以固定 px 繼承，不設會讓縮小後的文字撐出按鈕與標籤（2026-11-12 Terris 回報跑版）。
- 舞台放在原 scroll card 的 `image-wrapper.is-layered`（`container-type: inline-size`），`familyline-line_stage` 字級 `calc(100cqw / 45)`。
- stage：`826a6f67-…29ef`、`d2d713af-…97e0`、`9b98a734-…ff4f`；186 個 `familyline-line*` class，每個元素只掛一個 class。
- IX3：`i-917b50eb`（01）、`i-8fdaf032`（02）、`i-11e62151`（03）。觸發是各 image-wrapper 捲動 `top 85%` 播放、`bottom 15%` 暫停；reduced-motion `dont-animate`，停在 class 的代表畫面。
- 第一版（通用卡片）的 `familyline-mg*` 114 個 class 已無元素使用，可在 Designer 用 Clean Up 清除。
