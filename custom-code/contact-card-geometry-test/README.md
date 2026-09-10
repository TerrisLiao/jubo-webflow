# 居服卡 vs 業務卡的頭像幾何測試

起因：2026-09-10 Terris 回報「居服顧問人物頭像的大小沒有跟業務的一樣，現在太長太大張」。

## 診斷結果

用正式站的樣式表 ＋ 正式站的業務卡 markup ＋ 從 MCP 逐項讀回的居服卡 class 值，
在本機重建兩張卡片實測（1440px 視窗、desktop 斷點）：

| | 卡片 | 頭像框 | 頭像佔卡片高 |
|---|---|---|---|
| 業務卡 | 384 × 659.6 | 384 × **441.6**（1:1.15） | 66.9% |
| 居服卡（修好前） | 384 × 718 | 384 × **576**（1:**1.5**） | 80.2% |
| 居服卡（修好後） | 384 × 583.6 | 384 × **441.6**（1:1.15） | 75.7% |

兩個頭像框宣告的 `aspect-ratio` **本來就都是 `1/1.15`**，但居服卡實際算出來是 **1:1.5**
——也就是照片自己的 2:3 比例。差了 134px，所以看起來又長又大。

## 為什麼

`.homecare-contact_portrait` 是 `.homecare-contact_card`（欄向 flex）的 flex item，
`min-height` 預設是 `auto`，對欄向 flex item 來說**自動最小高度＝內容高度**。
框裡放的是 `<img class="homecare-contact_photo">`（`width:100%; height:100%`），
`height:100%` 遇到不確定的父高度會退回圖片的原生高度（照寬度 384 換算 = 576px）。
576 > 441.6，於是這個「內容最小高度」把外框宣告的 `aspect-ratio: 1/1.15` 頂開。

**業務卡沒事，是因為它的頭像根本沒有內容**：`.sales-portrait` 是一個
`background-image` 的空 div，沒有 in-flow 內容，所以沒有內容最小高度，
`aspect-ratio` 就照著算。

> 抄幾何值（`aspect-ratio: 1/1.15`）不等於抄到一樣的結果——
> `background-image` 的空 div 與包 `<img>` 的框，在 flex 裡的行為不同。

## 修法

`.homecare-contact_portrait` 加 **`min-height: 0`**（base 層，讓所有斷點都吃到）。
拿掉自動最小高度之後，外框回到 441.6px，`<img>` 的 `object-fit: cover`
＋ `object-position: 50% 22%` 照原本設計從上下裁切。

## 跑法

```bash
./fetch-site-css.sh      # 抓正式站的 HTML，取出當前版號的 Webflow CSS（檔名每次 publish 都會變）
npm install playwright   # 只裝套件，不要跑 playwright install
node test_cards.mjs
```

容器內已有 Chromium（`/opt/pw-browsers/chromium`），版本與 npm 上的 playwright 不一定相符，
所以測試裡直接指定 `executablePath`。

`wf.css`、`contact.html`、`portrait_2x3.png` 都是抓下來／產生的，不進 git。

## 檢查項目（4 項）

1. 業務頭像框是宣告的 1:1.15
2. **居服頭像框是宣告的 1:1.15，沒有被圖片原生比例（2:3）蓋掉** ← 本次的 bug
3. 居服頭像與業務頭像同寬
4. 居服頭像與業務頭像同高

反向對照跑過：把 `min-height: 0` 從 `cards.html` 拿掉，第 2、4 項會 fail
（`ratio=1.5`、`居服=576 業務=441.6`），確認這兩項抓得到這個 bug。

## 還沒對齊的地方（刻意）

修好後兩張卡的**頭像尺寸完全一致**（384×441.6），但卡片總高仍差 76px：
業務卡的資訊區有 218px（姓名列＋區域標籤＋服務對象標籤＋Email／電話／LINE），
居服卡只有 142px（職稱＋一顆 CTA）。所以頭像佔比是 75.7% 對 66.9%。

這是資訊量的差異，不是幾何設定的差異。若之後要連卡片外框都一樣高，
可以在 `.homecare-contact_card` 加 `min-height: 41.25rem`（= 業務卡實測的 659.6px），
資訊區的 `flex-grow: 1` ＋ `justify-content: space-between` 會把 CTA 壓到卡片底部
——但那樣資訊區會多出 76px 空白，而且兩張卡片分屬 switcher 的兩個面板、
**永遠不會同時出現在畫面上**，所以先不做。
