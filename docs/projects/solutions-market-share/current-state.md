# 現況

- 文件更新日期：2026-11-03
- Webflow 驗證日期與方式：2026-11-03，Webflow MCP `query_elements` 讀回 Designer 元素樹與 `fb-count-target` 屬性；發布站點仍是舊文案（未 Publish）。
- 頁面：`/solutions/day-care`（Page `6a0d66ac9cbdf126cd1e7e4a`）、`/solutions/home-care`（Page `6a0d66bf1177b147f53bfbf9`）；對照 `/solutions/residential-care`（Page `6a0d669af7fa369c6e79942f`，未修改）。

## Designer 目前文案

| 頁面 | 位置 | 原文 | 現值 |
|---|---|---|---|
| day-care | 統計卡數字（`stats-numbers`，`fb-count-target`） | `30` | `500` |
| day-care | 統計卡單位（`stats-unit`） | `%` | `+` |
| day-care | 統計卡標題（`stats-h3`） | 日照中心使用 | 不變 |
| day-care | 統計卡描述 | 全台日照中心廣泛採用，累積大量實務經驗。 | 全台近 46% 日照中心使用智齡，累積大量實務經驗。 |
| home-care | 統計卡數字（`fb-count-target`） | `30` | `1400` |
| home-care | 統計卡單位 | `%` | `+` |
| home-care | 統計卡標題 | 居服單位使用 | 不變 |
| home-care | 統計卡描述 | 全台居服單位廣泛採用，累積大量實務經驗。 | 全台近 65% 居服單位使用智齡，累積大量實務經驗。 |
| home-care | 步驟四 CTA 副標 | 全台每 3 家居服，就有 1 家使用智齡 | 超過1,400家居服單位都使用智齡 |

數字取法比照住宿型（748 → 700+）：日照 564 → 500+，居服 1,492 → 1,400+。計數器數字不加千分位逗號，與首頁 `2800+` 一致；CTA 句子內用 `1,400`。

元素 ID：day-care 數字 Block `7a697196-22d0-2dd4-39ca-0be0d3ad0cb8`；home-care 數字 Block `b4c98535-e3bd-e165-c58f-cfa1fde3447e`、CTA String `21d31568-45ed-cac5-648e-3aee0d085fd0`。

## 已確認未受影響

- 兩頁 JSON-LD 沒有市佔或機構數字。
- `/products/day-care`、`/products/home-care` 發布版沒有「30%」文案（住宿型產品頁有「700+ 住宿型機構選擇」，日照／居服產品頁沒有對應統計）。
- 同一統計區的「95% 客戶滿意度」「30+億 照護資料累積」未修改。

## 未驗證

- 未在瀏覽器實測計數動畫跑到 `1400` 時的寬度與四斷點換行。
- 未發布，正式站仍顯示 30%。
