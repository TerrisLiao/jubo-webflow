# 11 AEO 稽核與優化計畫

稽核日期：2026-08-20　｜　基準：Webflow × HubSpot《The AI Discovery Playbook》（40 頁）
稽核範圍：**中文正式站**（`jubo-health.com`，54 頁 + 12 個 CMS Collection）
**不含** `/jp` 日文改版頁（仍為 Draft，見 `../JP日本市場頁面改版/`）

---

## 這份文件在幹什麼

Terris 提供 Playbook 後要求針對全站內容提出優化方向。這不是「再做一次 SEO」——
Playbook 引用 G2 資料：**51% 的 B2B 買家現在從 AI chatbot 開始研究**（一年前 29%），
**69% 因為 AI 的建議換掉了原本打算選的廠商**。對 Jubo 這種決策週期長、
買方會大量「問問題比較方案」的 B2B 產品，答案引擎已經是第一接觸點。

**本次只做稽核與計畫，沒有動 Webflow 任何一個字。** 所有項目待 Terris 決定要不要執行。

### Playbook 的評分框架

四支柱 × 五級成熟度。Webflow 分析 2,000 個網站，**中位數只有 2/5**
（Content 1、Technical 1、Authority 2、Measurement 3）——多數品牌卡在基本功。

| 支柱 | Level 1 | Level 3 | Level 5 |
|---|---|---|---|
| Content | 關鍵字導向 | 回答問題叢集 | 程式化 AEO |
| Technical | 頁面關鍵字 SEO | 全站一致結構 + 速度 | MCP 與新標準 |
| Authority | 外部連結 | 主動數位 PR、思想領導 | 廣泛正面引用 |
| Measurement | 追蹤關鍵字排名 | 系統性追蹤 LLM 流量／提及／情緒 | 即時分析 |

### Playbook 點名的產業普遍缺口（用來對照 Jubo）

**新 AEO 基本功**：73% 缺乏廣泛提及｜57% 內容沒寫成「回答問題」｜55% 隱藏主題權威（無作者署名）
**傳統基本功**：62% 內部連結斷裂｜61% heading 層級斷裂｜60% metadata 缺漏｜54% 內容過期

---

## 一句話結論

**Jubo 的站內技術底子明顯優於產業中位數，真正的問題在「事實對不起來」。**

站上已有廣泛且客製化的 JSON-LD、一份寫得不錯的 `llms.txt`、100% 伺服器端渲染、
全站 h1 恰好一個、canonical 乾淨。Playbook 說 88% 的網站完全沒用 schema
——**Jubo 不在那 88% 裡**。所以這次是「修錯 + 補一致性」，不是「從零建立」。

但有兩類問題會直接傷害 AI 對 Jubo 的認知：
**① 站內 JSON-LD 有假數據與錯誤數據；② 站外對 Jubo 的描述有 8 個互相矛盾的版本。**

### 現況評分

| 支柱 | 產業中位數 | Jubo | 依據 |
|---|---|---|---|
| Content | 1 | **2** | solutions 頁有問句標題與 FAQ；但產品頁 0 問句、內容偏薄、發文 <1 篇/月 |
| Technical | 1 | **3** | JSON-LD 廣、SSR、canonical、h1 乾淨、有 llms.txt；但零 `<main>`/`<article>`、零 hreflang |
| Authority | 2 | **2**（敘事崩壞） | 媒體聲量領先所有台灣競品，但零維基／零評論平台／零社群討論，且對外數字矛盾 |
| Measurement | 3 | **1** | 只有 GTM + GA4 事件層；**完全沒有** AI 能見度量測 |

---

# P0-A ── 站內錯誤資料（成本極低、影響極高、含政策風險）

> 以下每一項都是**親自 curl 線上 HTML 逐字確認**，不是推論。
> JSON-LD 存放位置：**Webflow 頁面設定的原生 `jsonLdSchema` 欄位**（25/54 頁），
> 不是 custom code。這點很重要——見「規範衝突」一節。

## A1. 首頁 `numberOfEmployees` 寫成 330000

```json
"numberOfEmployees": { "@type": "QuantitativeValue", "value": "330000" }
```

33 萬是**專業照護使用者數**，被誤填進員工數。公司實際規模約 126 人
（聯合新聞網報導併購後約 120 人）。**這是機器可讀欄位，LLM 會照抄。**

## A2. 假的評分資料散佈在 8 個頁面（最高風險項）

| 頁面 | 內容 | 實際意義 |
|---|---|---|
| `/`（首頁） | `ratingValue: "5"`、`reviewCount: "2700"` | 2,700 是**客戶機構數**，不是評價數 |
| `/solutions/home-care` | `ratingValue: "4.75"`、`ratingCount: "100"` | ✅ 已親自確認。站上找不到 100 則評分的來源 |
| `/products/hiju-app`、`/products/familyline`、`/products/day-care` | `Review` + `Person` | — |
| 另 4 頁 | `aggregateRating` | — |

在 `Organization` / `Product` 上掛自評分數屬 **Google self-serving review 政策違規**範圍，
有人工處罰風險。**建議全部移除，不要試圖修數字**——沒有真實評論資料就不該有這個欄位。

## A3. 空殼 schema：結構在、資料沒填（比沒有更糟）

**首頁 `member`**：5 個 `Person` 只有 `jobTitle`、沒有 `name`。

```json
"member": [ {"@type":"Person","jobTitle":"AI資料科學家"}, … ]
```

**客戶案例的作者**（`/customer-stories/*`）：

```json
"author": { "@type": "Person", "name": "", "jobTitle": "", "image": {"@type":"ImageObject","url":""} }
```

`Person` 型別有了，但 **`name` 是空字串**。

> ✅ **Terris 說明**：這個 `author` 是**刻意為 AEO 加的，前台不顯示**，
> 目的只是讓 AI 爬得到署名。所以這裡**不需要建立作者體系或作者頁**
> ——只要填一個穩定值（例如「智齡科技客戶成功團隊」）即可。詳細修法見 P2-C。

但**空字串一定要處理**：`name: ""` 比欄位不存在更糟，
它主動告訴 AI「這篇文章沒有作者」，等於白做了這個欄位。

**首頁 `sameAs: []`**：空陣列。這是 LLM 把散落各處的提及
**串成同一實體**最常用的橋樑，零成本可補。

## A4. 19/25 頁的 JSON-LD 使用相對 URL

schema.org 規格要求絕對 URL，相對路徑基本無效。

- 首頁：`"url": "/"`
- 新聞頁：`"url": "/news/..."`、`author.url: "/"`、`publisher.url: "/"`
- **最嚴重**：`/customer-success-stories` 的 `ItemList` 裡 **23 個 Article 的 URL 全是相對路徑**

## A5. 首頁沒宣告 `@id`，跨頁實體圖譜接不起來

`/solutions/residential-care` 正確引用 `"@id": "https://www.jubo-health.com/#organization"`，
**但首頁根本沒宣告這個 `@id`**。等於所有頁面都指向一個不存在的節點。

## A6. 首頁缺 `areaServed` / `address`，全站沒說自己在台灣

`/company` 有 `Country`×3、`/solutions/*` 有 `areaServed: Taiwan`，
**但首頁 Organization 兩者都沒有**。而首頁是 LLM 建立品牌實體的主入口。

首頁的 `<title>`、`<meta description>`、`<h1>` **也都沒有出現「台灣」**。
使用者問「台灣有哪些長照系統廠商」時，Jubo 首頁沒有任何一處說自己在台灣。

## A7. robots.txt 只有一行，對 AI 爬蟲零表態

全檔 **48 bytes**：

```
Sitemap: https://www.jubo-health.com/sitemap.xml
```

連 `User-agent: *` 都沒有。因為沒有任何 `Disallow`，所有 AI 爬蟲是**隱性全開放**
——抓取是通的，但**零控制、零意圖宣告**，未來想封 Bytespider 或對 Google-Extended
表態都沒有位置可寫。

**Terris 已決定：對 AI 爬蟲全面開放。** 建議把隱性開放改成**顯性宣告**，
明確列出 GPTBot、OAI-SearchBot、ChatGPT-User、ClaudeBot、Claude-User、
PerplexityBot、Google-Extended、CCBot、Applebot-Extended 的 `Allow`。

## A8. JSON-LD 文案與頁面 SEO 文案不同步

例：`/solutions/home-care` 的 schema `name` 是「居家服務管理系統推薦 | 智慧派案與照護紀錄解決方案」，
頁面 SEO title 卻是「居家照護管理系統｜居服派案、服務紀錄與核銷｜Jubo 智齡科技」。
schema 停在舊版文案。

---

# P0-B ── 站外事實統一（比站內任何一項都重要）

Playbook 把 **narrative accuracy（敘事準確性）列為行銷主管的第一優先**，
理由是「過期或衝突的資訊會迅速扭曲品牌故事」。Jubo 這一塊已經崩壞。

## B1. 服務機構數有 8 個版本在網路上流通

| 數字 | 來源 | 時間 |
|---|---|---|
| 200+ 家 | **Ankecare 供應商目錄** | 標示 2020 |
| 500+ 家 | 環球生技月刊 | ~2022 |
| **600 家、30% 市佔** | **Crunchbase**（AI 極高頻引用來源） | 2021 A 輪期 |
| 700 家 | `jubohealth.com`（北美站） | 不明 |
| 1,000+ 家 | 國家新創獎 | 2024 |
| **1,200+ 家、6.3 萬人** | **聯合新聞網**（訪談 CEO 的深度財經報導） | **2025-12-19** |
| **2,700+ 家、33 萬使用者** | **`jubo-health.com` 台灣官網** | 現行 |
| 51% 市佔 | Jubo 員工個人 LinkedIn | 不明 |

跨度 **13.5 倍**。官網說 2,700 家，四個月前的聯合新聞網說 1,200 家——
機構數差 2.25 倍、使用者數差 5.2 倍，**這不是成長速度能解釋的**。
最可能是計數定義不同（官網把醫療場域、診所、單一據點都算進去），
**但外界與 AI 都看不到這個定義**。

資料筆數也有四個版本：官網 30 億筆、UDN 報導 1,600 億筆（疑為誤植）、
智齡數據報告（2024/12）15 億筆、北美站 6 億筆。

## B2. 市佔率之爭：競爭對手的說法掛在證交所文件上

Jubo 的市佔有三個版本流通：13%（2022 環球生技）→ 30%（2025 UDN、Crunchbase）→ 51%（員工 LinkedIn）。

而**諾亞克科技（U-Ark，興櫃 7724）在證交所興櫃公開發行說明書上宣稱自己是
台灣長照 SaaS 市佔第一、約 40%**，並有法說會逐字紀錄與券商報告佐證。

也就是說：市場上兩家都自稱龍頭，其中一家的說法掛在**證交所文件與分析師報告**上
——那是 AI 權重遠高於廠商官網自述的來源類型。

## B3. LinkedIn 上的 Jubo 是一家加拿大公司

| 欄位 | LinkedIn 現值 |
|---|---|
| **總部** | **Calgary, Alberta, Canada** |
| 產業 | Software Development |
| 追蹤者 | 2,092 |
| 公司描述 | 只講 VitalLink、PointClickCare 同步、ISO 27001／HITRUST、服務美加 |

**完全沒有提到台灣業務、2,700 家機構、長照 3.0、住宿型／日照／居服系統。**
LinkedIn 是 AI 建立公司實體的高權重來源。目前 LLM 從 LinkedIn 取材，
會得到「一家加拿大的 PointClickCare 生態系軟體商」。

帳號是活的（近四個月持續發文），問題不是沒經營，而是**經營成了北美子品牌頁，
台灣母體敘事在 LinkedIn 上缺席**。

另外康仕仲執行長的 LinkedIn 身分是碎裂的（至少三個 profile），
且找不到持續發表產業觀點的證據——他的**學術足跡比產業意見領袖足跡更完整**，
對 AI 而言目前更像「一位教授」而非「一位長照科技產業領袖」。

## B4. 知識圖譜層：Jubo 不存在

- **中文／英文 Wikipedia**：無條目
- **Wikidata**：搜尋「智齡科技」明確回傳零結果

沒有 Wikidata entity，AI 就無法把 **Jubo／智齡科技／Smart Ageing Tech／
Jubo Health Technologies** 綁成同一個實體——這正是 B1 敘事分裂難以收斂的結構原因。

Wikidata 可自行提交、成本低，是投報率很高的一步。

## B5. 評價層與社群層：全部為零

| 平台 | 狀況 |
|---|---|
| G2 | 無產品頁、無評論 |
| Capterra（美／澳 Long Term Care 目錄） | 查無 Jubo（目錄裡是 AxisCare、MatrixCare、AlayaCare） |
| Software Advice | 查無 |
| PTT / Dcard | **查無任何長照資訊系統選型討論串**（搜到的全是長輩智慧手錶等消費品開箱） |
| Reddit | 查無 |
| Facebook 長照社群 | 主要是政府單位與照顧者向帳號，非機構採購決策者討論選型的場所 |

**沒有任何一個非 Jubo 出資、非 Jubo 提供的聲音在評價這個產品。**
所有正面描述都可追溯到 Jubo 自己的說法。引用量不小，
但引用的**多樣性與獨立性接近零**。

> 註：台灣競品也全數缺席這些平台，所以在台灣市場不是劣勢差距。
> 但 Jubo 主打北美市場（VitalLink、PointClickCare 夥伴）時，
> G2／Capterra 是北美買家必查的基礎設施，這時就是實質競爭劣勢。

## B6. 仁寶併購尚未反映在任何站外來源

2025-10-13 簽約、2026-01-01 合併基準日（仁寶健康成為 Jubo 100% 子公司，
仁寶持 Jubo 完全稀釋後約 11.1%）。UDN 報導 2025 營收 16 億、併購後約 23 億、
2026 目標 30 億、併購後 120 人、2026 規劃 C 輪。

**Crunchbase、CB Insights、LinkedIn、Ankecare 目錄全部沒更新。**
今天問 AI「Jubo 的規模與股東結構」，拿到的是併購前的世界。

CB Insights 的財務資料還是壞的：`Total Funding $19.5M` 顯然是把 A 輪
「NT$1.95 億」當成美金；B 輪標 $7.62M／「兩年前」，與 2024/07 的 NT$250M B 輪對不上。

## B7. 唯一的原創研究資產已經全毀

《智齡數據報告 2025》是 Jubo 唯一的原創研究，也是 Playbook 說建立權威最強的手段
（發布時還辦了研討會、邀衛福部官員出席，這步做對了）。現況：

| 項目 | 狀態 |
|---|---|
| 落地頁 `/jubo-data-report2025/` | **404** |
| PDF `/wp-content/uploads/2099/01/...pdf` | **301 後 404**（已親自實測，PDF 本身也下線了） |
| 上傳路徑日期 | **`2099/01`** —— WordPress 上傳日期設定錯誤，爬蟲推斷時間性會拿到 2099 年 |
| 外部引用 | **零** |

同領域真正被引用的是 PwC《2025 高齡與長照產業發展趨勢》、衛福部長照 3.0 核定本、
工研院白皮書、報導者——**沒有一份引用智齡數據報告**。

Jubo 手上握有全台最大的長照營運資料池（報告內宣稱 15 億筆），
卻沒讓它進入產業引用鏈。**這是整份稽核最可惜的一項——資產做出來了，
但發布工程、維護與外部推廣全斷。**

---

# P1 ── 語意結構：LLM 分不清「本文」與「樣板」

**站內最弱、影響最深的一項。**

| 問題 | 實測 |
|---|---|
| **5 個受測頁全部沒有 `<main>`、全部沒有 `<article>`** | 整站是 Webflow 預設 `<div>` 堆疊；`role="main"` 也幾乎沒有 |
| 新聞內頁是 `h1` + **30 個 h2** 的扁平結構 | **只有前 5 個屬於本文**，後 25 個全是頁尾「相關文章」清單裡**別人的**文章標題 |
| 每頁約 500 字 Cookie 同意書出現在 H1 **之前** | 在 `/products/vitaltrolley` 佔全頁文字 **22%**，且是抽取器讀到的第一段實質文字 |

三者疊加的後果很具體：**LLM 讀一篇 Jubo 新聞時，會把 25 篇別人的標題
當成這篇文章的章節，開頭還先吃 500 字 Cookie 條文。**
沒有 `<article>` 就沒有任何訊號能排除這些。

> ✅ **修它是「回歸規範」，不是違反規範。**
> `02_核心結構與版面.md` L9-32 寫的標準骨架**本來就是 `<main class="main-wrapper">`**，
> 實際站上卻是 `div`。這是規範與實作脫鉤。
> （PR #2 的 `/jp/about-us` 踩過同一個坑：`main-wrapper` 的 tag 是 `div`。）

---

# P2 ── 內容寫法（Playbook 的 Content 支柱）

Playbook 的規則：**開頭直接給答案｜用問句當標題｜買家要比較時給表格｜
在自然位置放 FAQ｜放原創案例與數據並標明出處。**

## P2-A. 最高投報動作：FAQ 區塊 + FAQPage schema

Playbook 裡**唯一有完整數字支撐**的實驗：Webflow 挑 **6 個核心產品頁**，
把「頁面上已經有的資訊」重新整理成 FAQ 再掛 schema，**兩週內**——

- **330+ 個新引用**
- 在一個約 **250,000 頁**的站上，**這 6 頁貢獻了全部新引用的 57%**
- 自然曝光 **+24%**

### Jubo 的現成素材（不需要生產新內容）

| 素材 | 現況 |
|---|---|
| 「常見問題」CMS collection | **7 筆，全部已發佈**。問題在 `name`、答案在 `answers`(RichText) |
| **`schema-plain-text` 欄位** | 存 answers 的純文字版，**明顯就是為 FAQPage JSON-LD 準備的，但目前沒有任何頁面在用** |
| 既有 class | `section_faq`、`faq_component`、`faq5_*`、`accordion-question/-answer` |
| solutions 頁 JSON-LD 裡的問答 | 4 組寫得很好的問答（見 P2-B） |

### 但 FAQ 的量與涵蓋範圍都不足

現有 7 題（每題答案 100–180 字，寫得紮實，含具體數字）：

1. 智齡科技（Jubo）是什麼公司？　⚠️ 開頭有多餘半形空白
2. Jubo 提供哪些產品？適用哪些機構？
3. 什麼是照護管理系統？機構為什麼需要數位化？
4. Jubo 的 AI 能在照護中做什麼？
5. 導入 Jubo 需要多久？如何開始使用？
6. Jubo 怎麼收費？
7. Jubo 的資料安全與隱私如何保障？能否介接政府核銷／申報系統？

**全部是品牌／公司層級的 top-of-funnel 問題**（我們是誰、賣什麼、多少錢、多久上線）。

**完全沒有情境化／長尾的照護實務問題**，例如：
「日照中心評鑑要準備哪些文書」「居服核銷退件怎麼處理」「長照 3.0 有什麼變化」
「藍牙血壓計怎麼配對」「舊系統資料怎麼轉移」。也沒有依機構類型（住宿型／日照／居服）分眾。

Playbook 說這些問題的來源就在公司內部：**業務每週回答的相同異議、
客戶成功團隊反覆解釋的相同流程、客服解決的相同問題**——比關鍵字清單更有價值。

### 而且 FAQ 頁面根本沒有被索引

- `/chang-jian-wen-ti` → **404**（已親自實測）
- **sitemap 裡 FAQ item URL 數量：0**

7 題紮實的答案躺在 CMS 裡，但**沒有任何一個可索引的頁面承載它們**。

**建議**：挑 6 頁（3 個 `/solutions/*` + 3 個主力 `/products/*`）做可見 FAQ 區塊 + schema，
不要一次全站鋪。同時把 FAQ 題庫從 7 題擴充到分眾的實務問題。

> ⚠️ 動手前先查一條既有線索：`07_合規稽核報告.md` L174 記錄了
> `.solutions-basic-model_accordion.faq-schema-item` —— 全 repo 唯一帶 "schema" 字樣的東西。
> 要確認它是否已有配套 embed，還是只留了個沒用的名字。

## P2-B. FAQ 內容只存在於 JSON-LD，頁面上看不到

`/solutions/residential-care` 的 JSON-LD 有 4 組品質很好的問答：

- 住宿型長照機構常遇到哪些管理與照護紀錄問題？
- Jubo 如何協助住宿型長照機構減少重複作業？
- 除了系統之外，Jubo 是否提供導入與教育訓練？
- Jubo AI 可以如何支援住宿型機構的照護現場？

**但這 4 個問題在頁面可見的 heading 序列裡找不到對應。**

這不只是浪費——**FAQPage schema 標了頁面上看不到的內容，
本身是 Google 政策風險**（structured data 必須反映可見內容）。
把它們搬成可見 FAQ 區塊，同時解掉政策風險 + 拿到 P2-A 的引用效益。

**另外三頁不一致**：`FAQPage` 掛在 `/ai/amy`、`/solutions/day-care`、
`/solutions/residential-care`、`/resources/care-facility-matching-platform`，
但 **`/solutions/home-care` 沒有**。

## P2-C. 作者署名：只差「把空欄位填上」，不需要建作者體系

Playbook 點名 **55% 的品牌「隱藏主題權威」**（85%+ 該有作者署名的頁面沒有署名）。
Jubo 的狀況比這個描述好——**署名的結構已經做好了，只是資料沒填**。

| Collection | 現況 | 要做什麼 |
|---|---|---|
| 新聞中心（79 筆） | JSON-LD 已有 `author: {"@type":"Organization","name":"Jubo Health 智齡科技"}` ——**已填、沒問題** | 只需把 `url` 從相對改絕對（見 A4） |
| 客戶成功案例（23 筆） | `author: {"@type":"Person","name":""}` ——**型別在、名字空** | **填一個穩定值即可** |

### 建議修法（依 Terris 的定位：純為 AEO、前台不顯示）

既然署名代表的是**一個團隊**而不是特定個人，語意上最正確的寫法是把型別
從 `Person` 改成 `Organization`：

```json
"author": {
  "@type": "Organization",
  "name": "智齡科技客戶成功團隊",
  "url": "https://www.jubo-health.com/"
}
```

**為什麼建議改型別**：`Person` 在 schema.org 的定義是一個自然人，
給它一個團隊名稱是型別錯用；而 `Organization` 用在團隊產出的內容上是標準做法，
Google 的文件也明確接受。順帶可以把同樣空著的 `jobTitle` 與 `image.url` 一起移除
——**空字串屬性一律刪掉，不要留著**。

若日後想改回具名個人，客戶案例的 collection 已經有 `editor` 欄位可以綁，
不需要改結構。

### 順帶一提：這個 collection 有一組沒用到的現成素材

`person-name`／`title`／`service-unit`／`reviews` 四個欄位
——這是現成的**受訪客戶** `Review` + `Organization` schema 素材，目前完全沒用到。

> ⚠️ 但要注意：這個和 A2 要移除的假 `aggregateRating` **性質完全不同**。
> 這裡是**真實客戶的具名推薦**（有姓名、職稱、服務單位），
> 屬於 Playbook 說的 Experience（客戶故事與實務見證），是可以放心用的。
> 假的是那個沒有來源的 `4.75/100` 評分。

### 兩個 collection 都缺 `dateModified`

只有 Webflow 系統的 `lastUpdated`（API 可讀，綁不進頁面）。
新聞的 JSON-LD 目前有 `dateModified`，但那是 Webflow 自動帶的系統值
（實測值 `2026-08-18T06:11:31.198Z`），不是編輯有意義的「內容更新日」。

## P2-D. 產品頁：0 問句標題、內容偏薄、heading 跳級

以 `/products/vitaltrolley` 為例（標價 **NT$58,000** 的硬體產品頁）：

| 問題 | 實測 |
|---|---|
| 問句式標題 | **0 個**（6 個 heading 全無問句） |
| 主內容區字數 | 約 **1,030 個中文字** |
| 缺什麼 | 無規格表、無支援設備清單、無電池續航、無尺寸重量、無 FAQ |
| heading 序列 | `h1, h3, h3, h3, h2, h2` —— **跳級且順序錯亂** |

heading 那項的實質後果：三個核心產品賣點（行動量測更順手／生命徵象數據自動上傳／
離線暫存，資料不中斷）被標成 h3，反而排在「使用者回饋」的 h2 **之前**。
對 LLM 等於宣告「賣點的層級低於使用者回饋」。

內容厚度的實質後果：LLM 想回答「智齡照護推車支援哪些量測設備？」
只能拿到「整合多種藍牙設備」這種模糊句。

## P2-E. 內容更新頻率：不到 1 篇/月，且 3 篇卡在 draft

Playbook：**95% 的 ChatGPT 引用來自過去 10 個月內更新過的頁面**，
且 54% 的網站有「內容過期」問題。

新聞 collection 共 79 筆。最近 10 筆：

| 發布日 | 標題 | 狀態 |
|---|---|---|
| 2026-08-11 | 智齡科技推出「Amy 透鏡」 | **draft（卡 9 天）** |
| 2026-07-09 | 三三分享會 EP 19 | 已發佈 |
| 2026-07-01 | 🐝 iBee 照管小幫手，正式登場！ | 已發佈 |
| 2026-05-10 | Jubo 攜手 i 照護，擴大照護生態圈 | **draft** |
| 2026-04-29 | 智齡系統應用工作坊 | **draft**（`short-summary` 也空白） |
| 2026-03-01 | 告別評鑑焦慮：長照3.0時代的隱形競爭力 | 已發佈 |
| 2026-02-04 | 智齡住宿型照護系統新首頁 | 已發佈 |
| 2026-01-14 | 代收支付導入長照機構！ | 已發佈 |
| 2025-12-31 | 【系統操作培訓班】 | 已發佈 |
| 2025-12-31 | 住宿型品質獎勵計畫指標四 | 已發佈 |

**過去 8 個月只上線約 7 篇（<1 篇/月）**，且 2026-03-01 到 2026-04-29 有近兩個月空窗。

最新一篇「Amy 透鏡」卡在 draft 已 9 天，**而 `/ai/amy` 頁面本身已經上線且有完整 JSON-LD**
——兩邊步調不一致。

內容型態以「產品發布／活動報名／培訓課程」的公告為主，
真正能回答買家問題的知識型文章很少。

## P2-F. 低成本動作：文章加目錄

Playbook：Webflow 的 AEO/SEO Lead 在部落格文章加上目錄，四週內
**AI 來源流量 +59%、SEO 流量 +23%**。Jubo 有 74 篇 `/news` 在 sitemap 裡，是現成施作面。

## P2-G. 圖片 alt 空值率 41%

| 頁面 | `<img>` | `alt=""` | 空值率 |
|---|---|---|---|
| `/company` | 25 | **15** | **60%** |
| `/` | 51 | 23 | 45% |
| `/solutions/residential-care` | 41 | 16 | 39% |
| `/news/...` | 16 | 6 | 38% |
| `/products/vitaltrolley` | 26 | 6 | 23% |
| **合計** | **159** | **66** | **41%** |

好消息：沒有任何一張圖是「完全缺少 alt 屬性」。
壞消息：新聞內頁 H1 下方的主視覺就是 `alt=""`，
而那張圖含**活動時間、主題、主講人**資訊，對 LLM 完全不可見。

## P2-H. OG（社群分享）：全站沒有一頁有自己的文案

| 狀況 | 頁數 |
|---|---|
| OG 沿用 SEO 設定（`titleCopied` + `descriptionCopied` 皆 true） | **42** |
| OG 完全空白（沒沿用也沒填） | **12** |
| **OG 獨立撰寫** | **0** |

且**除 5 頁例外，其餘 49 頁全部共用同一張 OG 圖**
（asset `6a82c57be33c51d36b51d332`，檔名「**未命名設計 (40).png**」）。
分享到 LINE／FB 時每一頁長得一樣。

---

# P3 ── 國際化訊號與其他技術債

## P3-A. `/jptest`：一個純日文頁對外宣告自己是繁體中文

雖然本次範圍不含 `/jp` 改版，但這一項**現在就在線上傷害中文站**：

- `/jptest` 是**完整的日文頁面**，HTTP 200、**在 sitemap 裡**、**沒有 noindex**
  （title `Jubo｜医療・ケア現場を支える台湾発のテクノロジーチーム`，實測含 1,521 個假名字元）
- 而它的 **`<html lang="zh-TW">`**
- 全站 hreflang 出現次數 **0**
- `/jp` 與 `/ja` 皆 404 —— 日文內容只存在於帶「test」字樣的 URL 上，且已被送去索引
- 它也是唯一 OG 完全空白的正式頁

`08_頁面與資訊架構.md` L103 已警告「不要參考 `/jptest`」，但**沒人處理它的索引狀態**。

**最低成本處置**：加 `noindex` 並從 sitemap 移除。等 `/jp` 正式上線再處理 hreflang 與 `lang`。

## P3-B. 其他技術債

| 問題 | 實測 | 影響 |
|---|---|---|
| sitemap 154 個 URL，**0 個 `lastmod`** | 也無 `changefreq`／`priority`／hreflang | 等於放棄宣告內容新鮮度（對照 Playbook 的「95% 引用來自 10 個月內更新的頁面」） |
| sitemap 收錄 noindex 的 `/demo/*` | 6 個裡 5 個確認 noindex | sitemap 說「請索引」、頁面說「不要」，訊號打架 |
| **`/demo/jubo-ai-tech-02` 是唯一沒加 noindex 的 demo 頁** | 7 個 demo 頁裡唯一 | 內部 demo 頁會被索引 |
| **`/residential-care-copy`（draft）** | SEO 幾乎與 `/solutions/residential-care` 重複，且**兩頁掛完全相同的 9,086 字元 JSON-LD**（含 FAQPage） | 現在是 draft 沒事，**一旦發佈就是完整的重複內容 + 重複 schema** |
| 21/54 頁沒有 SEO description | 9 個 CMS template + 12 個 demo/工具/草稿頁 | 見下方「已檢查」一節的重要釐清 |
| 9 個 CMS template 完全沒有 SEO title/description/noindex | `certifications`、`news-categories`、`product-categories`、`iot-equipment-categories`、`iotshe-bei`、`iot-partners`、`sales-team`、`quan-qiu-fu-wu-ju-dian`、`chang-jian-wen-ti` | 會落回 Webflow 預設值，可能產生重複 title |
| `/news` 列表頁零 JSON-LD | 對比 `/customer-success-stories` 有 `CollectionPage` + `ItemList` | 漏掉 |
| 無 `<time datetime>`、無可見更新日期 | 日期只是純文字 `<p class="text-size-tiny">2026-07-09</p>`；JSON-LD 有 `dateModified` 但頁面不顯示 | — |
| `llms.txt` 13 條連結全寫非 www | 每條都多一次 301 | 小 |
| `llms-full.txt` | 404 | 可考慮產生 |
| 首頁 canonical 無結尾斜線 | `https://www.jubo-health.com` vs 實際 `.../` | 小 |
| Registered script `WhyUsCompareTabs` v1.0.0 | 註冊了但**沒套用到任何頁面** | 清理項 |
| **全球服務據點 collection** | 有 `address`／`phone`／`email`／`google-map-link` —— **現成的 `LocalBusiness`／`PostalAddress` schema 素材，完全沒用到**，且 template 連 SEO title 都沒填 | 機會 |

---

# ✅ 已檢查且無需處理（避免日後重複稽核）

這幾項實測後確認 Jubo 優於產業中位數。**寫下來，讓下一輪不用重新查。**

| 項目 | 實測結果 | Playbook 產業對照 |
|---|---|---|
| **已發佈內容頁的 SEO metadata** | **29 個正式內容頁 100% 都有 title + description + og:description**，description 平均 75.8 字、無一頁超過 160 字 | 60% 的網站在 20%+ 頁面缺 metadata |
| **H1 唯一性** | 29 個核心頁 + 額外 13 頁抽驗，**全部恰好 1 個 h1** | 61% 的網站 heading 結構斷裂 |
| **伺服器端渲染** | curl 就拿到完整正文，`w-dyn-bind-empty` 出現 **0** 次，TTFB 0.4–0.9 秒 | Playbook 最擔心的「內容藏在互動後面」 |
| **canonical** | 全站正確自我指向 www 絕對路徑；非 www → www 單次 301 | — |
| **`llms.txt`** | 已存在（1,964 bytes、13 條帶說明連結），**實測 13 條全部回 200，無死連結** | 多數品牌還沒做 |
| **JSON-LD 覆蓋** | 25/54 頁；型別廣且客製（`Product`／`SoftwareApplication`／`Service`+`OfferCatalog`／`FAQPage`／`BreadcrumbList`／`NewsArticle`／`CollectionPage`+`ItemList`／`ContactPage`／`AboutPage`） | **88% 的網站完全沒用 schema** |
| **舊 WordPress 網址** | 實測 `/about-us/` → 正確 301 → `/company`。**不是問題**（唯一小瑕疵是 3 次跳轉可壓短） | — |
| **追蹤基礎設施** | GTM `GTM-WMQG6WS` + Google Consent Mode v2（default denied）+ Finsweet opt-in cookie consent + Search Console / Bing 驗證 + 自製第一方 event layer（9 個白名單事件，程式碼註明不送 PII） | 合規做得比多數站好 |

## ⚠️ 釐清：「21 頁缺 SEO description」沒有聽起來那麼糟

Webflow 後台顯示 54 頁中有 21 頁沒有 SEO description，聽起來很糟，
但拆開看**其實不是內容問題**：

- **9 頁是 CMS template**（分類頁、認證、銷售部門、據點、FAQ 等）——
  這些該補，但影響面小
- **12 頁是 demo / 404 / 401 / style-guide / draft** ——
  這些**本來就不該有**，多數已正確設 noindex

**真正的正式內容頁 29 頁，覆蓋率 100%。**
所以 Jubo 沒有 Playbook 說的那個「60% 網站的 metadata 缺漏」問題。

## ⚠️ 一個需要更正的稽核錯誤（本次自我修正）

稽核過程中，Webflow MCP 的查詢結果顯示「新聞與客戶案例 template 沒有 JSON-LD，
79 篇新聞完全沒有 NewsArticle schema」。**這是錯的。**

親自 curl 線上頁面確認：`/news/monthly-third-wednesday-sharing-202607`
**確實有完整的 `NewsArticle` schema**（含動態綁定的 headline、
`datePublished`、`dateModified`、`publisher.logo`），
`/customer-stories/*` 也確實有 `Article` + `Person`。

**教訓（值得寫進 `06_Webflow實作陷阱.md`）**：
Webflow MCP 的 schema 查詢**不一定會回傳 CMS Template 頁的 `jsonLdSchema`**。
稽核 CMS 頁的 structured data 時，**一定要抓線上 HTML 驗證，不能只信 API**
——這與該文件既有的第 1、6、7 條（回報成功不等於寫入、廣泛查詢有延遲、
snapshot 會過期）是同一類問題。

---

# 不建議做的事（避免日後重複提案）

| ❌ 不做 | 理由 |
|---|---|
| **修 `aggregateRating` 的數字讓它「看起來合理」** | 沒有真實評論資料就不該有這個欄位。造一個看似合理的假數字，政策風險完全一樣。**直接移除** |
| **為了補 alt 而把 66 張圖全部寫上文字** | 純裝飾圖 `alt=""` 是**正確做法**（無障礙規範）。只補「承載資訊的圖」——優先新聞主視覺與 `/company` 那 15 張 |
| **把 `/llms.txt` 改寫得更長更詳細** | 現有版本 13 條連結全通、結構清楚，品質已經好。優先做 `llms-full.txt` 前先確認有沒有人在用 |
| **一次為全站 54 頁補 schema** | Playbook 的實驗是**6 頁貢獻 57% 的引用**。集中在高價值頁，不要鋪平 |
| **為了 AEO 改動 Slater 鎖定的 class** | `.richtext`、`.card-wrapper`、`.accordion-question/-answer`、`.tab-content__*` 全被外部 JS 以選擇器驅動，改名等於功能靜默失效 |
| **現在就處理 `/jp` 的 hreflang** | Terris 已決定範圍不含 `/jp`。現在只需把 `/jptest` 設 noindex 止血 |
| **為了作者署名而建作者頁、作者制度或新增 CMS author 欄位** | Terris 已定調：署名是**純為 AEO、前台不顯示**。既有結構填上「智齡科技客戶成功團隊」就夠了（見 P2-C）。新聞的 `author` 本來就已經填好 `Organization`，沒問題 |
| **導入付費 AEO 監測工具** | Measurement 是最短的板，但先用零成本的人工 baseline 建立起來再談工具（見下節） |

---

# 與既有規範的衝突與解法

| 潛在衝突 | 解法 |
|---|---|
| **鐵律 4「不要寫自訂 CSS／不要用 HTML Embed 做版面」** | ✅ **完全沒有衝突。** 稽核確認站上的 JSON-LD 是放在 **Webflow 頁面設定的原生 `jsonLdSchema` 欄位**（25 頁），不是 custom code、不是 Embed。這是 Webflow 內建功能，不產生任何視覺輸出。MCP 對應 `data_pages_tool` 的 schema 欄位 |
| **鐵律 5「不得修改 `h1`~`h6` tag selector」** | 修 heading 層級是改**元素的標籤設定**（h3 → h2），不動 tag CSS，不衝突 |
| **不可 rename 既有 class**（`slater-selectors.md`） | 加 FAQ 區塊時**只加不改名**；行為鉤子一律用 `data-*` 屬性——這正是 `09_GSAP動畫與互動規範.md` L44-56「行為掛 `data-*`、樣式掛 class」的既有慣例 |
| **`00` §6-8「重構不可以改到設計」** | 加 `<main>`／`<article>` 是**換標籤不換樣式**，視覺零變化；FAQ 區塊沿用既有 `faq_component` 版式 |
| **四斷點檢查**（`00` §6-7） | 新增 FAQ 區塊時仍須逐一檢查 main／medium／small／tiny |
| **維持 Draft、不自行發佈**（`00` 收工清單） | 本次不動站；日後執行時每一項都待 Terris 在 Designer 確認後才發佈 |

---

# 文件缺口：站上做了但 repo 沒記載

**這是本次稽核最該補的元問題。**

我一開始依 repo 文件推論「Jubo 站沒有任何 structured data」——
因為 repo 裡完全查不到 schema／JSON-LD 的檔案或規範。**實測證明完全相反。**

站上做了但 repo **完全沒有任何記載**的東西：

- 25 頁的 JSON-LD（含 CMS template 的動態 schema）
- `/llms.txt`
- robots.txt 與 sitemap 設定
- GTM 容器、Google Consent Mode v2、Finsweet cookie consent 配置
- 自製第一方 analytics event layer（9 個白名單事件）
- Search Console / Bing 驗證
- 各頁 SEO/OG 的實際值與 OG 共用圖

`08_頁面與資訊架構.md` 只有 8 行 SEO 敘述（L107-114），完全沒提 structured data。

> **教訓：repo 沒有記載 ≠ 站上沒有做。**
> 不補這個缺口，下一個人（或下一個 AI）會像我一樣先做出錯誤判斷、白做一輪。

**建議**：把上述現況補進 `08_頁面與資訊架構.md`（或新開一份 `12_技術SEO與追蹤現況.md`），
並把「Webflow MCP 查不到 CMS template 的 jsonLdSchema」寫進 `06_Webflow實作陷阱.md`。

---

# Measurement：怎麼知道有沒有效

這是四支柱裡 Jubo 最短的板（1/5）。站上有完整的 GTM + GA4 + 自製 event layer，
**但完全沒有任何 AI 能見度的量測**。

> 註：GTM 容器 `GTM-WMQG6WS` 內部裝了哪些 tag（GA4 measurement ID 等），
> Webflow MCP 查不到，需開 GTM 後台確認。

## Playbook 的五個指標

| 指標 | 追蹤什麼 | 為什麼重要 |
|---|---|---|
| Brand visibility | 品牌有沒有出現在 AI 答案裡 | 基礎可偵測性 |
| Citations | 網站被引用的頻率 | 在 AI 眼中的權威 |
| Prominence | 提及有多顯著 | 提及的深度 |
| Sentiment | 正／負／中性 | 品牌故事的準確性 |
| Share of voice | 相對競品的提及頻率 | 競爭定位 |

## 零成本的起步方式（建議先做這個，不要先買工具）

挑 15–20 個買家真實會問的中文 prompt，每月固定在 ChatGPT／Gemini／Perplexity
各問一次，用一張表記錄：Jubo 有沒有出現、**數字對不對**、跟誰一起出現、語氣正負。

建議的 prompt 方向：

- 台灣有哪些長照照護紀錄系統可以選？
- 住宿型長照機構的照護管理系統怎麼挑？
- 護理之家評鑑文書可以用系統產出嗎？
- 居服單位核銷申報有什麼系統可以用？
- 智齡科技和諾亞克差在哪？
- 智齡科技服務多少家機構？　←**這題直接驗證 B1 的敘事矛盾修好了沒**
- 智齡科技是哪一國的公司？　←**直接驗證 B3 的 LinkedIn 問題修好了沒**

**Playbook 的提醒**：拿到同一份推薦清單兩次的機率低於 1/100，
同樣順序約 1/1000——所以**單次查詢不能當結論，要看趨勢**。
而且一定要同時記錄競品，否則能見度下降時無法分辨是自己的問題還是平台改演算法。

## 另外兩個現成但沒用的資料源

- **Search Console 與 Bing Webmaster 都已驗證** —— 可以直接看 AI Overviews 帶來的曝光變化
- **自製 event layer 已有 9 個事件** —— 可加一個「referrer 來自 LLM 網域」的維度，
  就能量到 AI 來源流量（Playbook：Webflow 有 8% 的新註冊直接來自 LLM）

---

# 優化清單（依投報比排序）

| # | 項目 | 對應 | 影響 | 成本 | 誰做 |
|---|---|---|---|---|---|
| 1 | **移除 8 頁的 `aggregateRating` 與 3 頁的 `Review`** | A2 | 高（政策風險 + 假資料） | 極低 | Webflow |
| 2 | **修首頁 `numberOfEmployees`** | A1 | 高（LLM 會照抄） | 極低 | Webflow |
| 3 | **統一官方數字並附定義**（機構數／使用者數／市佔／資料筆數） | B1 B2 | **最高** | 低（但需決策） | **Terris** |
| 4 | **修 LinkedIn 公司頁總部與描述** | B3 | 高 | 極低 | 行銷 |
| 5 | robots.txt 補齊 AI 爬蟲顯性 `Allow` | A7 | 中高（取回控制權） | 極低 | Webflow |
| 6 | 首頁補 `@id`／`sameAs`／`areaServed`／絕對 URL；移除空殼 `member` | A3 A4 A5 A6 | 高（實體圖譜） | 低 | Webflow |
| 7 | **更新 Ankecare 供應商目錄頁**（現為 2020 年 200 家） | B1 | 高（台灣唯一 AI 級產業權威媒體） | 極低 | 行銷 |
| 8 | `/jptest` 設 noindex + 移出 sitemap；`/demo/jubo-ai-tech-02` 補 noindex | P3-A P3-B | 中高 | 極低 | Webflow |
| 9 | **建立 Wikidata entity** | B4 | 高（知識圖譜地基） | 低 | 行銷 |
| 10 | **6 頁做可見 FAQ 區塊 + FAQPage schema**（含把 solutions 的 4 組問答搬上頁面） | P2-A P2-B | **最高**（Playbook 唯一有數字的實驗） | 中 | Webflow + 內容 |
| 11 | Webflow 模板加 `<main>`；新聞／案例模板加 `<article>` | P1 | 高（本文邊界） | 中 | Webflow |
| 12 | 新聞頁「相關文章」25 個 h2 降級成 h3/h4 | P1 | 中高 | 低 | Webflow |
| 13 | **救回《智齡數據報告》**：修 404、修 `2099/01` 路徑、做可引用的 HTML 摘要頁 | B7 | 高（唯一原創研究） | 中 | 行銷 + Web |
| 14 | 更新 Crunchbase／CB Insights（含仁寶併購、幣別修正） | B5 B6 | 中高 | 低 | 行銷 |
| 15 | **客戶案例的空 `author` 填上「智齡科技客戶成功團隊」並改型別為 `Organization`**（刪掉空字串屬性） | P2-C A3 | 中高（E-E-A-T） | **極低** | Webflow |
| 16 | `/products/vitaltrolley` 修 heading 跳級、補規格表與 FAQ、加問句標題 | P2-D | 中高（轉換頁） | 中 | Webflow + 內容 |
| 17 | `/solutions/home-care` 補 FAQPage；schema 文案與 SEO 文案同步 | P2-B A8 | 中 | 低 | Webflow |
| 18 | sitemap 補 `lastmod`；移除 noindex 的 `/demo/*` | P3-B | 中 | 低 | Webflow |
| 19 | 74 篇新聞加目錄 | P2-F | 中（+59% AI 流量） | 中 | Webflow |
| 20 | **建立 AI 能見度人工 baseline**（15–20 個 prompt，每月一次） | Measurement | 中高（沒有它無法驗證前面 19 項） | 低 | 行銷 |
| 21 | FAQ 題庫從 7 題擴充到分眾實務問題 | P2-A | 中高 | 中 | 內容 |
| 22 | 補「承載資訊」的圖片 alt（優先新聞主視覺、`/company` 15 張） | P2-G | 中 | 中 | Webflow |
| 23 | 恢復發文節奏（目前 <1 篇/月）；清掉 3 篇卡住的 draft | P2-E | 中（95% 引用來自 10 個月內更新） | 持續 | 內容 |
| 24 | 9 個 CMS template 補 SEO title/description 或設 noindex | P3-B | 中低 | 低 | Webflow |
| 25 | 各頁補獨立 OG 文案與圖（現在 49 頁共用「未命名設計 (40).png」） | P2-H | 中低 | 中 | 行銷 + 設計 |
| 26 | `/news` 列表頁補 `CollectionPage` + `ItemList` | P3-B | 低中 | 低 | Webflow |
| 27 | 全球服務據點做 `LocalBusiness` schema（素材已現成） | P3-B | 低中 | 低 | Webflow |
| 28 | `llms.txt` 連結改 www；清掉未使用的 `WhyUsCompareTabs` | P3-B | 低 | 極低 | Webflow |
| 29 | 處理 `/residential-care-copy`（發佈前必須解決重複 schema） | P3-B | 低（但發佈即高） | 低 | Webflow |

## 「這週就能做完」的一組（Playbook 的 start-small 建議）

**第 1、2、5、8、15 項**——全部是移除或填幾個欄位，零設計風險、零版面影響，
但直接解掉「LLM 引用假評分與錯誤員工數」、「內部 demo 頁與錯誤語言頁被索引」、
以及「客戶案例對 AI 宣告自己沒有作者」。

**第 3、4、7 項**不用碰 Webflow，但影響比站內任何一項都大。

---

## 執行前必做的三件事

1. **公司事實由 Terris 逐字核對。** 員工數、資本額、據點、客戶數這些要寫進
   Organization schema 的欄位，`06_Webflow實作陷阱.md` 第 10 條的經驗是
   「連人名都會打錯」，數字更不能憑記憶。
   ⚠️ 已知外部矛盾：登記資本額 6.24 億（商業司 2025/05）vs 民報報導 6.6 億。
2. **schema 修改先過 validator** —— Schema Markup Validator + Google Rich Results Test。
3. **改完一定抓線上 HTML 驗證**，不要只看 API 回報成功
   （本次稽核已經抓到 MCP 漏報 CMS template schema 的實例）。
