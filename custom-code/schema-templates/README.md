# CMS Template JSON-LD（需在 Designer 手動貼上）

CMS template 的 schema 用到 `{{wf {&quot;path&quot;:…\} }}` 這種動態欄位寫法。
裡面的 `\}` 不是合法的 JSON，所以 **Webflow API（MCP）會拒絕寫入**（400 "must be valid JSON"）。
如果改用物件格式寫入，動態欄位會失效，輸出空字串。
2026-10-05 新聞 template 就是這樣壞掉的：54 篇新聞的 NewsArticle 全部變成空值。
詳見 `Jubo官網AI開發規範/19_全站Schema檢查_2026-10-13.md`。

**規則：CMS template 的 schema 一律在 Designer 的 Page Settings 手動貼上，不要用 API 寫。**

| 檔案 | Template | Webflow page id |
|---|---|---|
| `news-template.jsonld.html` | 新聞中心 Template（/news/*） | `69f82ba2b2602e6d6594d696` |
| `customer-stories-template.jsonld.html` | 客戶成功案例 Template（/customer-stories/*） | `6a1c22366d4d91ecdbddfca6` |
| `features-template.jsonld.html` | 功能介紹 Template（/features/*） | `6a0d64191ac60d030cd5838d` |

## 貼上步驟

1. Designer 開啟該 CMS Template 頁 → Page Settings → Schema markup（JSON-LD）。
2. 清空原內容，把檔案內容整段貼上（含 `<script>` 標籤）。
3. 儲存後，用 Preview 切換一篇 CMS 項目，確認欄位都有帶入。
4. Publish 後抓線上 HTML 驗證，再跑 Google Rich Results Test。

## 這版改了什麼

- 全部網址改為 `https://www.jubo-health.com/...` 絕對網址。
- publisher 改用完整 logo（`…_Frame-1.png`，原本是半邊圖形 `path-left.svg`），並加上 `@id` `#organization`，與首頁串接。
- `inLanguage` 改為 `zh-Hant-TW`。
- 新聞：作者改為智齡科技（`@id` 串首頁），新增 `mainEntityOfPage`。
- 客戶案例：作者由空白的 `Person` 改為 `Organization`「智齡科技客戶成功團隊」。拿掉受訪者 Person 與 `about.name`，因為 9 篇沒有填，會輸出空字串。
- 功能介紹：麵包屑改為絕對網址，`isPartOf` 加 `@id` `#website`，`about` 加 provider。
