# 現況

- 文件更新日期：2026-11-11
- Webflow 驗證日期與方式：
  - Designer：2026-11-03，Webflow MCP `query_elements` 讀回元素樹與 `fb-count-target` 屬性（本輪未重新讀回 Designer）。
  - production：2026-11-11（台北 23:36）curl `https://www.jubo-health.com` 四頁，HTML 註解 `Last Published: Tue Nov 10 2026 14:01:16 GMT`；下表「現值」13 列逐字出現，舊文案（`700+`、「全台每 3 家居服」「超過700家住宿型機構都使用智齡」等）均不存在。
  - staging：2026-11-11 curl `https://jubo-health.webflow.io` 四頁，Last Published 2026-11-11 13:50:12 UTC，`fb-count-target` 44／46／65 與 CTA 同 production。
- 頁面：`/solutions/residential-care`（Page `6a0d669af7fa369c6e79942f`）、`/solutions/day-care`（Page `6a0d66ac9cbdf126cd1e7e4a`）、`/solutions/home-care`（Page `6a0d66bf1177b147f53bfbf9`）、`/products/residential-care`（Page `6a029fcea88ff7b9b69bceec`）。

## 寫法

對外主打數字一律用市佔率（月報值四捨五入到整數：住宿型 44%、日照 46%、居服 65%），含統計卡大字、CTA 副標與住宿型產品頁。唯一保留機構數的地方是統計卡大字下方的描述行（「全台超過 700／500／1,400 家…」），作為市佔率的實際數字佐證。標題（`stats-h3`）不變。

## 目前文案（Designer 2026-11-03 讀回＝production 2026-11-11 curl）

| 頁面 | 位置 | 舊文案（回退值） | 現值 |
|---|---|---|---|
| residential | 數字＋`fb-count-target` | `700` | `44` |
| residential | 單位 | `+` | `%` |
| residential | 描述 | 全台不同規模、不同型態的住宿型機構與護理之家 | 全台超過 700 家住宿型機構使用智齡，涵蓋不同規模、不同型態的機構與護理之家。 |
| day-care | 數字＋`fb-count-target` | `30` | `46` |
| day-care | 單位 | `%` | `%` |
| day-care | 描述 | 全台日照中心廣泛採用，累積大量實務經驗。 | 全台超過 500 家日照中心使用智齡，累積大量實務經驗。 |
| home-care | 數字＋`fb-count-target` | `30` | `65` |
| home-care | 單位 | `%` | `%` |
| home-care | 描述 | 全台居服單位廣泛採用，累積大量實務經驗。 | 全台超過 1,400 家居服單位使用智齡，累積大量實務經驗。 |
| home-care | 步驟四 CTA 副標 | 全台每 3 家居服，就有 1 家使用智齡 | 全台 65% 居服單位都使用智齡 |
| residential | 步驟四 CTA 副標 | 超過700家住宿型機構都使用智齡 | 全台 44% 住宿型機構都使用智齡 |
| products/residential-care | 主要特色第一項（圖示旁文字） | 700+ 住宿型機構選擇 | 44% 住宿型機構選擇 |
| products/residential-care | 底部 CTA 副標 | 超過 700 家住宿型機構，使用 Jubo 減少重工、完成評鑑作業 | 全台 44% 住宿型機構，使用 Jubo 減少重工、完成評鑑作業 |

元素 ID（數字 String／數字 Block／單位 String／描述 String）：

- residential：`6c1fb460-c61b-0f7b-34ca-f81be34800ec`／`…00eb`／`…00ef`／`…00f4`
- day-care：`7a697196-22d0-2dd4-39ca-0be0d3ad0cb9`／`…0cb8`／`…0cbc`／`…0cc1`
- home-care：`b4c98535-e3bd-e165-c58f-cfa1fde3447f`／`…3447e`／`…34482`／`…34487`；CTA String `21d31568-45ed-cac5-648e-3aee0d085fd0`
- residential CTA String：`70e2a1e0-b19e-6f0e-27e5-c10dfdf820e7`
- products/residential-care：特色文字 String `adffc626-cca7-43e3-c2d2-89b3195ff3be`、CTA String `93fd74e7-89b8-c172-0b21-c361b86b4653`。旁邊圖示檔名含「700」，但圖片本身只有房屋與星星圖形、沒有數字，不需替換。

## 計數動畫

`@flowbase-co/boosters-countup@1.0.0` 依 `fb-count-target` 計數；目前三個目標值都是整數（44／46／65），與其他統計卡同類。第二輪曾用一位小數，函式庫模擬可正確停在小數值，第三輪改整數後不再需要。

## 已確認未受影響

- 三頁 JSON-LD 沒有市佔或機構數字。
- 同一統計區的「95% 客戶滿意度」「10+年 系統經驗」「30+億 照護資料累積」未修改。
- 日照頁底部 CTA「用科技減少重工，打造優質的日照中心」無數字，未修改。
- `/products/day-care`、`/products/home-care` 沒有機構數或市佔文案，未修改。
- Designer 讀回：住宿型兩頁已無「700+」「700 家」字樣，只剩統計卡描述行的「超過 700 家」。

## 未驗證

- 未在瀏覽器實測四斷點下百分比大字的寬度與換行；curl 只證明 HTML 內容，不證明版面與計數動畫。
- 發布紀錄：本專案沒有自己的 Publish 紀錄。2026-11-10 三三分享會專案（分支 `claude/christmas-sharing-page-3u67cr`，`docs/projects/monthly-sharing/changelog.md`）記錄當天多次正式發布（最早 10:30:53 UTC），哪一次最先帶上本專案修改未查證。
