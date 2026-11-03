# 現況

- 文件更新日期：2026-11-03
- Webflow 驗證日期與方式：2026-11-03，Webflow MCP `query_elements` 讀回 Designer 元素樹與 `fb-count-target` 屬性；發布站點仍是舊文案（未 Publish）。
- 頁面：`/solutions/residential-care`（Page `6a0d669af7fa369c6e79942f`）、`/solutions/day-care`（Page `6a0d66ac9cbdf126cd1e7e4a`）、`/solutions/home-care`（Page `6a0d66bf1177b147f53bfbf9`）。

## 寫法

統計卡大字放市佔率（月報值四捨五入到整數），描述行放機構數（取到百位數加「超過」，比照住宿型 CTA「超過700家」）。標題（`stats-h3`）不變。

## Designer 目前文案

| 頁面 | 位置 | 發布版原文 | 現值 |
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
| home-care | 步驟四 CTA 副標 | 全台每 3 家居服，就有 1 家使用智齡 | 超過1,400家居服單位都使用智齡 |

元素 ID（數字 String／數字 Block／單位 String／描述 String）：

- residential：`6c1fb460-c61b-0f7b-34ca-f81be34800ec`／`…00eb`／`…00ef`／`…00f4`
- day-care：`7a697196-22d0-2dd4-39ca-0be0d3ad0cb9`／`…0cb8`／`…0cbc`／`…0cc1`
- home-care：`b4c98535-e3bd-e165-c58f-cfa1fde3447f`／`…3447e`／`…34482`／`…34487`；CTA String `21d31568-45ed-cac5-648e-3aee0d085fd0`

## 計數動畫

`@flowbase-co/boosters-countup@1.0.0` 依 `fb-count-target` 計數；目前三個目標值都是整數（44／46／65），與其他統計卡同類。第二輪曾用一位小數，函式庫模擬可正確停在小數值，第三輪改整數後不再需要。

## 已確認未受影響

- 三頁 JSON-LD 沒有市佔或機構數字。
- 同一統計區的「95% 客戶滿意度」「10+年 系統經驗」「30+億 照護資料累積」未修改。
- 住宿型頁底部 CTA「超過700家住宿型機構都使用智齡」未修改；日照頁底部 CTA 無數字，未修改。
- `/products/residential-care` 的「700+ 住宿型機構選擇」未修改（不在本次範圍）。

## 未驗證

- 未在瀏覽器實測四斷點下百分比大字的寬度與換行。
- 未發布，正式站仍顯示舊文案。
