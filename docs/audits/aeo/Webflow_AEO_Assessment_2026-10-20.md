# Webflow AEO Assessment 判讀與待辦（2026-10-20）

來源：Webflow 寄送的 [AEO Assessment：jubo-health.com](https://webflow.com/aeo-assessment/jubo-healthdotcom)。報告頁的 `data-pages`／`data-details` 屬性列出了各項的「Pages to fix」清單，本文已逐筆對照。
線上複驗：2026-10-20 以 curl 抓 `www.jubo-health.com` 線上 HTML。只做稽核，**沒有修改或 Publish Webflow**。
前次基準：[AEO稽核與優化計畫.md](AEO稽核與優化計畫.md)（8/20 稽核、10/1 複驗）。

## 報告分數

| 項目 | 結果 |
|---|---|
| 整體成熟度 | 3／5 |
| Content／Technical／Authority／Measurement | 皆 Level 3 |
| Mention／Citation／Share of voice | 69%／69%／98% |
| Sentiment／Accuracy／Message pull-through | 76%／71%／60% |
| 競品 | PointClickCare、MatrixCare (WellSky) |

## 先釐清：報告有兩處判讀錯誤

### 1. 「平均 43 words」主要是中文斷詞誤差

報告用空白切詞，中文沒有空白，所以字數被嚴重低估：

| 頁面 | 報告字數 | 線上 HTML 的中文字數（含導覽列與頁尾） | 以空白切詞 |
|---|---|---|---|
| `/` | 126 | 4,400 | 461 |
| `/ai/jubo-ai` | 62 | 2,574 | 276 |
| `/company` | 47 | 2,738 | 254 |
| `/contact` | 27 | 1,643 | 222 |
| `/ecosystem/jubo-digital` | 45 | 2,328 | 209 |

**不要為了湊 300 words 加長頁面。** 真正要處理的是：AI 抽取工具判斷「本文」時的語意結構不足（全站仍沒有 `<main>`，見下方 T3），以及產品頁缺少可抽取的條列或表格。
Content gate 的「Pages to fix」也列出 `/ecosystem/jubo-digital3`，線上已 404，是 Webflow 爬蟲的舊資料。

### 2. 報告把「30 億筆照護資料」翻成 30+ billion

首頁寫的是「30 億筆」，也就是 **3 billion**。Webflow 的 AI visibility 摘要寫成「30+ billion care data records」，是單位換算錯誤。
這正好說明 Message pull-through 為何只有 60%：中文數字被 AI 轉成英文時會出錯。官方 Fact Sheet 應同時寫中英文與阿拉伯數字（例：3,000,000,000+／30 億筆），llms.txt 也一樣。

## 10/1 待辦的進度（10/20 線上複驗）

| 項目 | 10/1 | 10/20 |
|---|---|---|
| A1 首頁 `numberOfEmployees: 330000` | ❌ | ✅ 首頁已移除；`/company` 為 110 |
| A2 假評分（首頁、solutions ×3、products ×2） | ❌ | ✅ 全部 0 筆 `aggregateRating`／`Review` |
| A3–A6 首頁 `@id`、`sameAs`、`areaServed`、絕對 URL | ❌ | ✅ 已改為 `@graph`，含 `@id`、地址、`areaServed`、`alternateName` |
| A7 robots.txt 只有一行 | ❌ | ✅ 已明確列出 AI 搜尋爬蟲（`Sitemap:` 行重複兩次，無害） |
| 客戶案例 `author` | 空字串 | ✅ `Organization`：智齡科技客戶成功團隊（前台沒有顯示作者） |
| N1 solutions 三頁 2.3MB 內嵌圖 | ❌ | ❌ **仍在**：三頁 HTML 都約 2.6MB，最大 `data:image` 為 2,328,678 字元 |
| sitemap 收錄 `/demo/*` | ❌ 6 個 | ❌ 仍有 6 個（139 個 URL）；`/demo/jubo-ai-tech-02` 仍可被索引 |
| llms.txt 連結非 www | ❌ | ❌ 未修 |
| FAQ CMS template | 404 | ❌ `/faq`、`/chang-jian-wen-ti` 仍 404 |

## 這次的建議（依投報比）

### 立即可做：不改版面，Webflow 設定層

| # | 動作 | 對應報告 | 依據 |
|---|---|---|---|
| T1 | sitemap 內 6 個 `/demo/*` 頁（`home`、`jubo-ai-tech-01`、`jubo-ai-tech-02`、`jubo-demo-01`～`03`）勾選 **Exclude from sitemap**；其中 **`/demo/jubo-ai-tech-02` 仍沒有 noindex**（title 與 Jubo AI 頁重疊），要補上 | Technical：Crawlability 95% | 報告的不可索引清單就是 `/demo/*` 加 `/security`；sitemap 送出 noindex 頁是互相矛盾的訊號 |
| T2 | 確認 `/security` 的狀態 | 同上 | 線上回 200，帶 `noindex`；repo 記錄仍是 Draft、未 Publish。若尚未完成就維持 noindex 並移出 sitemap；完成後依 [security 專案](../../projects/security/README.md) 發布並拿掉 noindex |
| T3 | solutions 三頁的 2.3MB 內嵌圖改用 Assets 圖片 | Technical | Google 只處理 HTML 前 2MB，主內容可能被截斷（10/1 的 N1） |
| T4 | 首頁 `sameAs` 補 LinkedIn 公司頁（**先修正 LinkedIn 上的總部地點**，見 B3）；有 Wikidata 後也補上 | Authority | 目前只有 Facebook、YouTube |
| T5 | llms.txt 連結改 www；加一段英文 Key facts（2,800+ facilities、330,000+ users、3 billion+ care records，各附統計日期） | Accuracy／Message pull-through | 報告指出 Claude 回答曾把公司名寫成「聚寶科技」；英文事實段讓 AI 有標準答案可抄 |

### 短期：需要 Designer，但不動共用元件

| # | 動作 | 對應報告 |
|---|---|---|
| C1 | **`/contact` 表單 7 個欄位加 `<label>`**（目前只有 placeholder；報告：form labels 25%） | Technical：Accessibility 65% |
| C2 | 加「跳到主要內容」skip link 與 `<main>` landmark（10/1 計畫 #11；需走 Client-First 與 Component 規範） | Technical：Accessibility、Content 抽取 |
| C3 | 首頁、`/ai/jubo-ai`、`/company`、`/contact`、`/products/day-care` 把現有卡片文案改成真正的 `<ul>`／`<ol>`（例：功能清單、適用機構、導入步驟、聯絡方式） | Technical：Add structure（約 1/3 頁面有條列） |
| C4 | 產品頁補「規格／方案比較表」與 3–5 題可見 FAQ（10/1 計畫 #5、#6、#16） | Content：Question coverage |

### 需要決策：作者署名

報告要求至少 15% 內容頁有**前台可見**的作者署名與 `Person` schema。點名的頁面是：
`/resources/care-facility-matching-platform`、`/resources/iot-partners`、`/resources/training`、`/customer-success-stories`、`/customer-stories/customer-success-stories-jubostory11`。

8/20 的決定是作者只放 schema、前台不顯示；現在的 `Organization` 作者不符合這個 gate。建議：

- 客戶案例與新聞文章頁尾加一行「採訪撰文：〇〇〇｜內容審閱：〇〇〇（職稱）」，CMS 新增作者 collection（姓名、職稱、簡介、LinkedIn），schema 改為 `Person` 並用 `worksFor` 連到 `#organization`。
- 照護、臨床相關文章優先由具護理或照護背景的同仁具名審閱，對 E-E-A-T 最有效。
- 需 Terris 決定：誰可以具名、是否願意露出個人頁。

### 中長期：Authority 與 Measurement

| # | 動作 | 對應報告 |
|---|---|---|
| A1 | 建立 Wikidata entity（10/1 計畫 B4），之後才談 Wikipedia；Wikipedia 需要多篇獨立媒體報導，不能自己寫 | Authority：Wikipedia presence |
| A2 | 產業媒體（Ankecare 供應商目錄）、合作夥伴（IoT 夥伴、仁寶）、學研（台大智齡聯盟）頁面請對方加上正確公司名與連結 | Authority：industry mentions 30%→40% |
| A3 | 重建《智齡數據報告》為可引用的 HTML 頁（10/1 計畫 B7） | Authority、Content long-form |
| A4 | Prompt Library 30–50 題，每月跑 ChatGPT／Perplexity／Gemini／Claude，記錄提及、引用、公司名、數字是否正確；另加一欄「是否說出核心價值」（減少行政負擔、把時間還給照護） | Measurement、Message pull-through |
| A5 | GA4 建立 AI referral 管道（chatgpt.com、perplexity.ai、gemini.google.com、claude.ai、copilot），比較轉換率 | Measurement：competitive AEO metrics |
| A6 | 針對 PointClickCare、MatrixCare 寫比較型內容（台灣法規、長照 2.0 核銷、中文介面），讓 AI 在被問到國際系統時也會提到 Jubo | Share of voice |

## 不建議做的事

- 為了字數門檻在頁面塞文字：中文字數早已達標，加長只會稀釋重點。
- 把評分或評論加回 schema：A2 剛修好，沒有可驗證的第三方評分來源前不要再加。
- 自行建立 Wikipedia 條目：違反維基利益衝突規範，容易被刪除並留下紀錄。

## 執行原則

所有 Webflow 修改需 Terris 授權後才 Publish；Publish 後用 curl 抓線上 HTML 驗證，再更新本文件。
