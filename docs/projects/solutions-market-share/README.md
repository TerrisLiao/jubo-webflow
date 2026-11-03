# 解決方案頁市佔數字

狀態：Webflow Designer 已修改並讀回；**尚未發布**（staging／production 皆未 Publish）。

先讀 [現況](current-state.md)，再看 [待辦](tasks.md)、[決策](decisions.md)、[歷程](changelog.md)、[部署](deployment.md)。

## 範圍

`/solutions/day-care`、`/solutions/home-care` 的「實績」統計卡原寫「30% 日照中心使用／30% 居服單位使用」，改為比照 `/solutions/residential-care`「700+ 住宿型機構使用」的機構數寫法，描述行補上最新市佔率。居服頁底部 CTA 一併更新。

## 數據來源

使用者 2026-11-03 提供的內部報表截圖「TW-B2B 月報摘要」（未存入 repo）：

| 類型 | 全國機構總數 | 智齡機構總數 | 智齡系統／仁寶系統 | 市佔率 |
|---|---|---|---|---|
| 長照（住宿型） | 1,696 | 748 | 748／0 | 44.1% |
| 日照 | 1,230 | 564 | 396／168 | 45.9% |
| 居服 | 2,298 | 1,492 | 132／1,360 | 64.9% |
| 合計 | 5,224 | 2,804 | 1,276／1,528 | 53.7% |

## 來源分支

`claude/clever-ride-c8mw09`（從 master `6b84235` 開出）。
