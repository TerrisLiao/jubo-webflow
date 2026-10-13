# 台灣健康科技／醫療 SaaS 的資安・隱私・認證頁寫法（health-tech peers）

調查日期：2026-10-08。官網內容是當天直接抓回 HTML（curl）或用 WebFetch 讀的；只在搜尋摘要或媒體報導裡看到的內容，會標「未在官網驗證」。
最後涵蓋的公司：Health2Sync 智抗糖（H2 Inc.）、aetherAI 雲象科技、長佳智能 EverFortune.AI、dentall 台灣牙e通、優品生醫（威力德生醫子公司）、H2U 永悅健康（官網上找不到任何認證區塊）。
沒有做或找不到資料的：采威國際、宇康醫電、醫守科技／Ainos、慧康資訊、衛采／醫揚，原因見最後一節的 Gaps。依指示，直接競爭的長照紀錄 SaaS 一律排除。

---

## Q1. 每家公司的資安／隱私／認證頁網址，以及認證出現在哪裡

### Takeaway
受查的台灣健康科技公司都沒有像國際 SaaS 那樣的獨立 Trust/Security 頁。認證放的位置有四種：首頁上一個區塊（Health2Sync）、About 頁的「Certificates」清單和里程碑（aetherAI）、投資人／公司治理底下的「資訊安全政策」頁（長佳智能，上市櫃公司的典型放法），或者只見於第三方驗證機構的新聞稿（dentall、優品生醫）。

### Cited Findings
- **Health2Sync 智抗糖**：認證區塊在英文官網首頁，沒有獨立 security 頁。`/security`、`/zh-tw/`、`/zh-tw/privacy` 都回 404。首頁連到兩份 PDF 證書：`/h2-website-static/pdf/certificate_iso_27001.pdf` 和 `/h2-website-static/pdf/certificate_iso_27017.pdf`。隱私政策在 `/privacy-policy` — [Health2Sync 首頁](https://www.health2sync.com/)
- **aetherAI 雲象科技**：首頁沒有資安或認證區塊，只有頁尾的 Privacy Policy 連結 — [aetherAI 首頁](https://www.aetherai.com/)。認證出現在 About 頁的「Certificates」清單和「Milestones」時間軸 — [aetherAI About Us](https://www.aetherai.com/about)
- **長佳智能 EverFortune.AI**：認證在「投資人與利害關係人 > 公司治理 > 資訊安全政策」，網址 `/investors/governance12`，頁尾也有「資訊安全政策」連結 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)；[長佳智能 首頁](https://www.everfortuneai.com.tw/)
- **dentall 台灣牙e通**：官網 `dentall.io` 是 SPA，抓回的 HTML 只有 1.4KB 的殼，看不到內容。認證資訊的主要來源是 BSI 台灣的新聞稿 — [BSI 新聞稿](https://www.bsigroup.com/zh-TW/insights-and-media/media-centre/press-releases/2024/202401/dentall/)
- **優品生醫（威力德生醫子公司）**：只找到媒體報導（工商時報，2024-08-09），沒找到官網的認證頁 — [工商時報](https://www.ctee.com.tw/news/20240809700890-431202)
- **H2U 永悅健康**：首頁和 `/sustainable-development`（永續發展）都沒有資安、隱私或 ISO 認證內容。永續頁只列「環境保護」「員工健康照顧」「合作夥伴」「公益捐贈」四項 — [H2U 首頁](https://www.h2u.io/)；[H2U 永續發展](https://www.h2u.io/sustainable-development)

### Inferences
- 台灣健康科技公司的認證多半被當成「公司治理／投資人揭露」或「里程碑」處理，不太當成給買方看的銷售內容。Health2Sync 是例外，它在首頁就用面向用戶的區塊呈現，可能和它服務美、日、澳等海外用戶有關。
- 已上市櫃的公司（長佳 6841、雲象 7803、永悅 7835）的資安說明，比較可能出現在投資人專區或年報，不在產品頁。

### Gaps
- dentall 官網是 JS 渲染，這次沒有渲染出來，所以無法確認官網有沒有認證區塊。
- H2U 的公開說明書和年報（InvestorZone 的 PDF）沒有逐一讀，不確定裡面有沒有資安認證揭露。

---

## Q2. 區塊標題和副標的原文

### Takeaway
英文頁的標題偏「功能宣稱」（Health2Sync：「Safe and ISMS regulated healthcare services」），或者乾脆只寫名詞清單（aetherAI：「Certificates」）。中文頁用的是治理語言（長佳：「資訊安全政策」）。

### Cited Findings
- Health2Sync 首頁區塊標題原文：「**Safe and ISMS regulated healthcare services**」 — [Health2Sync 首頁](https://www.health2sync.com/)
- aetherAI About 頁的認證清單標題原文：「**Certificates**」，時間軸標題：「**Milestones**」 — [aetherAI About Us](https://www.aetherai.com/about)
- 長佳智能頁面標題：「**資訊安全政策**」，麵包屑「首頁 > 投資人與利害關係人 > 公司治理」；同頁小節「資安教育訓練」 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)
- BSI 為 dentall 發的新聞稿標題：「**台灣牙ｅ通獲頒 ISO 國際資安雙驗證**」 — [BSI 新聞稿](https://www.bsigroup.com/zh-TW/insights-and-media/media-centre/press-releases/2024/202401/dentall/)

### Inferences
- 沒有一家用「國際標準」「國際認證」當官網區塊標題。「國際資安雙驗證」只出現在第三方新聞稿。
- Health2Sync 標題裡的「ISMS regulated」把管理系統名稱直接塞進標題，偏工程師語氣，一般讀者不一定看得懂。

### Gaps
- 沒找到任何一家有中文版的面向用戶認證區塊（Health2Sync 的中文頁 404）。

---

## Q3. 認證周邊的說明文案原文

### Takeaway
Health2Sync 的寫法是一句總述加每張證書一句「標準定義」，定義幾乎照抄 ISO 官方摘要。長佳用 CIA 三要素（機密性、完整性、可用性）寫政策，認證只用一句話帶過。aetherAI 完全不寫說明。

### Cited Findings
- Health2Sync 總述原文：「**Health2Sync has certified our products and cloud-based services under the following global/national standards.**」 — [Health2Sync 首頁](https://www.health2sync.com/)
- Health2Sync ISO 27001 卡片原文：「**ISO 27001:2022** — ISO/IEC 27001:2022 specifies the requirements for establishing, implementing, maintaining, and continually improving an information security management system within the organization's context.」，下面接按鈕「View Certificate」 — [Health2Sync 首頁](https://www.health2sync.com/)
- Health2Sync ISO 27017 卡片原文：「**ISO 27017:2015** — ISO/IEC 27017:2015 gives guidelines for information security controls applicable to the provision and use of cloud services.」，下面接按鈕「View Certificate」 — [Health2Sync 首頁](https://www.health2sync.com/)
- 長佳智能政策條列原文：「落實資安管理政策」「全面導入資訊安全管理制度」「培訓人才之資安能力」「強化資安環境及資訊安全應變能力」「達成資訊安全管理政策量測指標」 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)
- 長佳智能目標原文：「機密性(Confidentiality)：保障企業所有資訊只有「取得授權者」可獲取，維護企業與用戶資訊的保密和機密性。」「完整性(Integrity)：保障資訊不被未經授權的方式修改或竄寫，確保資訊準確度與完整性。」「可用性(Availability)：保障資訊的流暢性，讓資訊可被授權者隨時取用，不因任何因素而中斷。」 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)（WebFetch 讀取；工具限制單段引用長度，所以是分段引用）
- 長佳智能認證句原文：「本公司已完成ISO 27001認證」；ISO 27701 的說法：「在接受獨立第三方的稽核之後，已獲得值得信賴的 ISO/IEC 27701 PII 處理者認證」 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)
- aetherAI 時間軸條目原文：「**Achieved ISO/IEC 27001 certification.**」 — [aetherAI About Us](https://www.aetherai.com/about)
- BSI 新聞稿裡 dentall 的定位句原文：「全台第一間通過 ISO 27001:2022 資訊安全管理系統以及 ISO 27701:2019 隱私安全管理系統，國際級資安雙驗證的牙科病歷系統商」 — [BSI 新聞稿](https://www.bsigroup.com/zh-TW/insights-and-media/media-centre/press-releases/2024/202401/dentall/)
- 優品生醫報導原文：「通過ISO 27001:2022資訊安全管理系統與ISO 27701:2019隱私資訊管理系統雙重國際驗證」；「為保障客戶個資安全及隱私權，今年導入全球公認安全管理標準ISO27001及ISO 27701」；「以確保合作夥伴、客戶及民眾個人資料受到完善保護」 — [工商時報 2024-08-09](https://www.ctee.com.tw/news/20240809700890-431202)

### Inferences
- 中文寫法慣例是「ISO 27001:2022 資訊安全管理系統」「ISO 27701:2019 隱私資訊管理系統」，也就是標準編號加版本年，後面接中文全名。注意 dentall 的稿子寫「隱私安全管理系統」，優品生醫寫「隱私資訊管理系統」，兩邊譯名不一致。
- 動詞的選用：長佳說「完成…認證」「獲得…認證」，dentall 和優品生醫說「通過…驗證」，Health2Sync 說「has certified」。中文媒體與 BSI、SGS 新聞稿偏好「驗證」，公司自述偏好「認證」。

### Gaps
- 長佳那段 27701 敘述的前後文沒有完整取得，因為 WebFetch 有引用長度限制。

---

## Q4. 列出哪些認證、怎麼呈現（logo／卡片／清單）、適用範圍、驗證機構

### Takeaway
呈現方式由簡到繁依序是：純文字清單（aetherAI）、logo 加一句話（長佳）、標準徽章卡片加定義和可下載證書（Health2Sync）。只有 Health2Sync 讓人看得到完整範圍和驗證機構（SGS），而且得點開 PDF 才看得到。其他家的官網都沒寫驗證機構。

### Cited Findings
- **Health2Sync**：兩張卡片，各有徽章圖（alt="ISO 27001:2022"、alt="ISO 27017:2015"）、一段定義和「View Certificate」按鈕 — [Health2Sync 首頁](https://www.health2sync.com/)
  - ISO/IEC 27017:2015 證書：驗證機構 **SGS Taiwan Limited**，證書號 **TW20/00042**，持有人「H2 INC. TAIWAN BRANCH (CAYMAN ISLANDS)」。範圍原文：「The provision of Health2Sync (product name in Japan: SyncHealth) and Patient Management Platform SaaS services, which includes marketing, promotion and customer service in Japan.」第二頁另列日本據點「シンクヘルス株式会社」 — [Health2Sync ISO 27017 證書 PDF](https://www.health2sync.com/h2-website-static/pdf/certificate_iso_27017.pdf)
  - ISO/IEC 27001:2022 證書：據搜尋工具對 PDF 的摘要，驗證機構是 SGS，證書號 TW20/00041，範圍涵蓋 Health2Sync／SyncHealth 和 Patient Management Platform SaaS 的開發、維運，以及相關基礎設施、網路服務和日本的行銷客服。**未逐字驗證**：PDF 我已下載，但這個環境沒辦法轉出文字，WebFetch 也回 403 — [Health2Sync ISO 27001 證書 PDF](https://www.health2sync.com/h2-website-static/pdf/certificate_iso_27001.pdf)
- **aetherAI**：About 頁「Certificates」底下是純文字清單，原文依序為「QMS Manufacturing License」「Medical Device Business Permit」「Taiwan FDA Medical Device License」「ISO-13485 Certification」「ISO-27001 Certification」「D&B D-U-N-S® Certified」。沒寫範圍和驗證機構 — [aetherAI About Us](https://www.aetherai.com/about)
  - 產品法規許可（aetherSlide 取得 US FDA 和歐盟 IVDR，aetherAI Endo／Hema 取得 TFDA 和 CE）只見於媒體報導，About 頁的 Certificates 清單沒有把它們和 ISO 並列 — [經濟日報](https://money.udn.com/money/story/5607/9457583)；[聯合新聞網](https://udn.com/news/story/7254/9457657)（**未在官網驗證**）
- **長佳智能**：頁面有 ISO 27001 logo 加一句話，27701 則用一段文字說明；沒寫範圍、驗證機構、證書號和日期 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)
  - 子公司長聯科技的照護機器人「愛寶」據報導取得五項認證，原文：「系統亦同步取得ISO 27001、27701、27017、27018及22301等五項資訊安全與個資保護相關國際認證，強化未來進軍醫療機構與長照市場的競爭力。」報導沒寫驗證機構，官網資安頁也沒列 27017、27018、22301 — [旺得富 2026-06-04](https://wantrich.chinatimes.com/news/20260604900658-420101)
  - 醫材許可原文：「長佳目前已累積取得55張國內外醫材許可證，包括15張美國FDA、22張台灣TFDA及18張其他國家許可」 — [旺得富 2026-06-04](https://wantrich.chinatimes.com/news/20260604900658-420101)。官網首頁卻有「取得醫材許可證」統計數字顯示為 0，前後不一致，可能是動態數字沒有渲染出來 — [長佳智能 首頁](https://www.everfortuneai.com.tw/)
- **dentall**：驗證機構是 **BSI**，範圍是產品「雲端病歷管理系統「dentallHiS」」 — [BSI 新聞稿](https://www.bsigroup.com/zh-TW/insights-and-media/media-centre/press-releases/2024/202401/dentall/)
- **優品生醫**：報導沒有明寫驗證機構，但頒證照片說明是「SGS營運總監何星翰（左起）」；範圍是「醫療資訊服務平台」 — [工商時報](https://www.ctee.com.tw/news/20240809700890-431202)

### Inferences
- 台灣醫療 SaaS 最常見的組合是 ISO 27001 加 27701。雲端導向的公司會再加 27017（Health2Sync）或 27017、27018（長佳子公司、華碩 xHIS）。
- 在台灣，SGS 和 BSI 是醫療資訊業者最常出現的兩家驗證機構，但幾乎沒人在自家官網寫出驗證機構名稱，Health2Sync 也是靠證書 PDF 間接揭露。
- 「範圍」寫在證書上，不寫在網頁文案裡，所以要看實際涵蓋哪個產品和據點，就得點開證書。

### Gaps
- aetherAI 的 ISO 13485 和 ISO 27001 是哪家機構發證、範圍為何，官網沒寫，也沒找到新聞稿。

---

## Q5. HIPAA、GDPR 怎麼寫；ISO 13485 和資安標準怎麼並列

### Takeaway
受查的台灣健康科技官網都沒有提到 HIPAA 或 GDPR，所以找不到「HIPAA compliant」這類寫法的台灣範例。ISO 13485 只在 aetherAI 出現，它和 ISO 27001、TFDA 醫材許可證、QMS 製造許可放在同一份清單，沒有區分「品質管理」和「資訊安全」。

### Cited Findings
- Health2Sync 首頁和隱私政策都沒有 HIPAA、GDPR 字樣。隱私政策（Last Updated: August 12, 2026）的安全措施原文：「To protect Google Health data, Health2Sync applies the following security measures:」「Data is transmitted over encrypted connections (TLS)」「Data is stored with encryption at rest」「Security practices are reviewed regularly」 — [Health2Sync Privacy Policy](https://www.health2sync.com/privacy-policy)
- Health2Sync 隱私政策的外洩通報承諾原文：「In the event there has been a leak of your personal information which has exposed your rights or freedom to substantial risk, the Company will inform you within 72 hours of our discovery of the leak.」 — [Health2Sync Privacy Policy](https://www.health2sync.com/privacy-policy)（這是 GDPR 式的 72 小時通報條款，但全文沒寫 GDPR 三個字）
- aetherAI 的清單把「QMS Manufacturing License」「Medical Device Business Permit」「Taiwan FDA Medical Device License」「ISO-13485 Certification」「ISO-27001 Certification」平列 — [aetherAI About Us](https://www.aetherai.com/about)
- aetherAI 首頁有一篇法規團隊文章，標題原文「Regulatory Affairs Department: The Immune System that Defends and Enhances Product Competitiveness」，開頭「At aetherAI, alongside the product development team, our Regulatory Affairs (RA) partners form a nimble task force.」 — [aetherAI 首頁](https://www.aetherai.com/)；[文章](https://www.aetherai.com/post/regulatory-affairs-department-the-immune-system-that-defends-and-enhances-product-competitiveness)
- dentall 的稿子把認證動機連到台灣法規，而不是 HIPAA。原文：「2022 年衛福部公告新版電子病歷上雲法規，為加強雲端資安管理，今年發函至各大醫療系統服務商，明示未來皆需取得國際資安驗證」 — [BSI 新聞稿](https://www.bsigroup.com/zh-TW/insights-and-media/media-centre/press-releases/2024/202401/dentall/)

### Inferences
- 台灣醫療 SaaS 用來說明「為什麼要這張證」的在地依據是衛福部的電子病歷上雲規定和個資法，不是 HIPAA。Jubo 如果提 HIPAA 或 GDPR，台灣同業裡找不到可直接參照的寫法，得自己定規則。建議用「參照／對齊」，不要寫「通過」或「認證」，因為 HIPAA 本身沒有認證制度。
- 有 ISO 13485 的公司（醫材 AI）會把它和醫材許可證放在一起，讀者看到的是「法規資格」而非「資安」。如果 Jubo 沒有 13485，就不需要學這種混列。

### Gaps
- 沒找到任何台灣健康科技公司的官網 HIPAA 措辭，所以無法提供在地範例。
- 沒找到 aetherAI 用中文寫 13485 或 27001 的官網頁面。

---

## Q6. 有沒有證書號、日期；有沒有下載或索取文件的 CTA

### Takeaway
只有 Health2Sync 提供可下載證書，CTA 是「View Certificate」，證書號和效期寫在 PDF 裡，網頁上沒有。其他家都沒有證書號、日期，也沒有索取文件的 CTA。長佳列的是資安教育訓練日期，不是證書日期。

### Cited Findings
- Health2Sync 兩張卡片的 CTA 原文都是「**View Certificate**」，直接連到 PDF — [Health2Sync 首頁](https://www.health2sync.com/)
- Health2Sync 的 27017 證書日期原文：「This certificate is valid from 25 March 2026 until 10 March 2029 and remains valid subject to satisfactory surveillance audits.」「Issue 5. Certified since 10 March 2020」「Recertification audit date 10 February 2026」 — [ISO 27017 證書 PDF](https://www.health2sync.com/h2-website-static/pdf/certificate_iso_27017.pdf)
- 長佳列出的日期是教育訓練，不是證書：「2024-12-06 資安教育訓練 昊翰企業顧問股份有限公司」「2024-11-22 資安教育訓練 內部教育宣導」 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)
- 長佳頁尾聯絡 CTA 原文：「一起加入智慧化解決方案的行列」「歡迎您來電或來信，我們將有專人為您服務。」這是通用聯絡 CTA，不是索取資安文件 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)
- 從 aetherAI 時間軸的排列看，「Achieved ISO/IEC 27001 certification.」和「Officially listed on Taiwan's Emerging Stock Board on November 26, 2024.」在同一年份群組，推定是 2024 年取得（**推論**，因為年份標籤是拆開渲染的） — [aetherAI About Us](https://www.aetherai.com/about)

### Inferences
- 台灣同業普遍不在網頁上放證書號，Health2Sync 那種「公開 PDF」的做法最透明，但缺點是證書每三年換發一次，PDF 要記得跟著更新。
- 「向我們索取資安文件、問卷、SOC 報告」這類 B2B 採購 CTA，在受查的台灣健康科技公司裡完全沒出現。

### Gaps
- 沒查到任何台灣同業放 Trust Center 或「索取 NDA 文件」入口。

---

## Q7. 語氣：正式或口語、用「我們」或公司名、有沒有安撫患者／用戶的語言

### Takeaway
三種語氣都有：英文首頁偏用戶導向（Health2Sync，主詞用公司名加「our」），中文公司治理頁用「本公司」加政策條列，媒體稿用「全台第一」和高層引言。直接對病人說「你的資料很安全」的安撫句，只出現在隱私政策和新聞稿，認證區塊裡沒有。

### Cited Findings
- Health2Sync 主詞是公司名，混用「our」：「Health2Sync has certified our products and cloud-based services…」 — [Health2Sync 首頁](https://www.health2sync.com/)
- Health2Sync 隱私政策開頭原文：「H2 Inc., … respects and promises to protect your privacy.」，屬於對用戶的承諾句 — [Health2Sync Privacy Policy](https://www.health2sync.com/privacy-policy)
- 長佳用「本公司」，例如「本公司已完成ISO 27001認證」，語氣正式，是治理文件的口吻 — [長佳智能 資訊安全政策](https://www.everfortuneai.com.tw/investors/governance12)
- dentall 執行長引言原文：「以最高標準維護客戶和患者資料的安全隱私，是我們始終堅守的原則」；技術副總的說法：「關鍵優勢在於系統自 2018 年即領先同業超前部署」 — [BSI 新聞稿](https://www.bsigroup.com/zh-TW/insights-and-media/media-centre/press-releases/2024/202401/dentall/)
- 優品生醫把保護對象寫成三方：「合作夥伴、客戶及民眾」 — [工商時報](https://www.ctee.com.tw/news/20240809700890-431202)
- H2U 只在上市新聞稿有原則性說法：「嚴守資訊安全與合規」（**依搜尋摘要轉述，未逐字驗證原文**） — [H2U 創新板審議新聞](https://www.h2u.io/articles/f8c64c37-f46b-1410-81b4-00e827562b5c)

### Inferences
- 對長照 SaaS 最值得借鏡的安撫句型是 dentall 那種「客戶和患者資料」並列，把機構客戶和被照顧者一起寫進保護對象。
- 「全台第一」「首家」是台灣認證新聞的常見賣點，但只能用在經過查證的範圍，例如限定「牙科病歷系統商」。

### Gaps
- 沒找到台灣同業在認證區塊使用第二人稱「您」的例子。

---

## 未涵蓋或無法驗證的公司（Gaps 彙整）
- **采威國際**：搜尋「采威國際 ISO 27001 醫療資訊」沒有任何相關結果，正式公司名和官網都無法確認 — [搜尋結果中無相關條目；參考同結果的其他案例：聯合新聞網 中化 ISO 27001](https://udn.com/news/story/7241/9580329)
- **慧康資訊**：沒有查證。另外要注意，「慧康生活科技」是 Health2Sync 的中文公司名（[INSIDE 標籤頁](https://www.inside.com.tw/tag/2130-%E6%99%BA%E6%8A%97%E7%B3%96)），和醫院資訊系統的「慧康資訊」很容易混淆。
- **宇康醫電、醫守科技／Ainos、衛采／醫揚**：因工具呼叫預算限制沒有查。Ainos 的公司註冊地和是否在台灣創立也沒有確認。
- **H2U 永悅健康**：多次搜尋都沒找到 ISO 27001 或 27701 的公開資料。搜尋工具提醒，同時取得 27001 和 27701 的是「優品生醫」，不是 H2U，避免混淆 — [工商時報](https://www.ctee.com.tw/news/20240809700890-431202)
- **其他可參考但不屬於新創的案例**（只見於搜尋摘要，未讀全文）：華碩 xHIS 取得 ISO 27001、27701、27017、27018 — [ASUS 新聞稿](https://press.asus.com/news/press-releases/asus-smart-healthcare-platform-achieves-iso-cybersecurity-certifications)；中國醫藥大學附設醫院自稱「全國醫療領域首家」取得 ISO/CNS 27001:2022 加 ISO 27701:2019 — [蕃新聞](https://n.yam.com/Article/20240405292657)
