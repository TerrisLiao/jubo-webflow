# 台灣電商／零售／POS／金流 SaaS 的資安認證頁寫法（ecommerce）

研究日期：2026-10-08。所有頁面都在這一天用 curl 抓取原始 HTML，再轉成純文字核對；證書內容則是直接檢視各官網公開的證書圖檔。引號內的文字都照原文抄錄，沒有改寫。
涵蓋對象：91APP、CYBERBIZ、SHOPLINE（台灣法人；品牌源自香港，見下方註記）、WACA、藍新 NewebPay、綠界 ECPay，以及查無認證內容的 meepShop、iCHEF、1shop。

範圍註記：SHOPLINE 品牌 2013 年在香港創立（[shopline.hk FAQ](https://shopline.hk/en/faq/about)，此資訊來自搜尋摘要，我沒有親自抓取該頁）。台灣站營運主體是 SHOPLINE Tech Co., Ltd.，頁面上明寫台灣法人獨立營運（[shopline.tw/compliance-center](https://shopline.tw/compliance-center)）。因為任務指定要涵蓋，所以保留，但嚴格來說它不屬於「台灣創立」的公司。iCHEF 目前列在 91APP 的「關係企業」下（[91app.com/soc-2-type-ii](https://91app.com/soc-2-type-ii/) 頁尾）。

---

## Q1. 資安／信任／合規頁的確切 URL，認證放在哪裡

### Takeaway
6 家有公開認證內容，但沒有一家用「Trust Center」這類英文命名。常見位置有四種：放在頁尾連到隱私權政策頁的錨點（CYBERBIZ）、獨立的「資格與認證」頁（SHOPLINE）、支援中心文章（WACA）、頁尾「資安認證」頁（藍新），以及放在投資人／企業責任選單底下的「資訊安全政策」加「專業認證」（綠界）。91APP 則是產品頁的一個區塊，連到單一認證的落地頁。

### Cited Findings
- **91APP**：首頁產品卡片有一行 "國際資安認證與完整防護"，按「了解更多」會連到 Commerce Cloud 產品頁 — [91app.com](https://www.91app.com/)。產品頁上的區塊標題是 "國際資安認證建立完整資訊防護"，區塊裡的 "SOC 2 Type II" 連到獨立頁 — [91app.com/commerce-cloud](https://91app.com/commerce-cloud/)；落地頁 `<title>` 是 "SOC 2 Type II 認證 | 91APP" — [91app.com/soc-2-type-ii](https://91app.com/soc-2-type-ii/)。投資人新聞稿（2025-09-11）也提到每年做 SOC 2 — [ir.91app.com news id=106](https://ir.91app.com/en/news_detail.php?id=106)。
- **CYBERBIZ**：首頁頁尾寫著 "ISO/IEC 27001:2022認證"、"PCI DSS 認證" 兩行 — [cyberbiz.io](https://www.cyberbiz.io/)。內容寫在隱私權政策頁，錨點 `#Security`、`#ISO`、`#PCIDSS`，該頁側欄分成 "▌安全認證"、"▌交易信賴"、"▌隱私權保護政策的適用範圍" 三組 — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)。
- **SHOPLINE**：頁尾連結 "資格與認證" 指向獨立頁，頁面 `<title>` 是 "資格與認證｜SHOPLINE 全方位零售整合專家"，分頁籤：簡介／SHOPLINE - 共同責任模型／資料處理補充條款／PCI／CBPR／ISO — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。另有頁首與頁尾的 "資訊安全保護專區"，連到行銷子網域的反詐騙頁 — [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。
- **WACA**：頁尾 "資安保護" 連到支援中心「資安小教室」分類下的文章 "WACA 防範詐騙暨個資保護措施說明"，文章標示 "最後更新 2026-06-11" — [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- **藍新 NewebPay**：頁尾 "資安認證" 連到 [newebpay.com/website/Page/content/sercurity_guarantee](https://www.newebpay.com/website/Page/content/sercurity_guarantee)（網址拼成 "sercurity"，照原樣記錄）。
- **綠界 ECPay**：企業站選單「企業責任 > 資訊安全」底下有三頁："資訊安全政策"、"安全漏洞回報獎勵計畫"、"安全漏洞回報致謝" — [corp.ecpay.com.tw 資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。證書另外放在 "專業認證" 頁 — [corp.ecpay.com.tw 專業認證](https://corp.ecpay.com.tw/%e5%b0%88%e6%a5%ad%e8%aa%8d%e8%ad%89/)。漏洞獎勵頁在 [corp.ecpay.com.tw/bug-bounty](https://corp.ecpay.com.tw/bug-bounty/)。
- **meepShop（美客商店）**：首頁原始碼找不到 ISO／PCI／資安字樣 — [meepshop.com](https://www.meepshop.com/)。隱私權頁只有一節 "第二節、安全性"，寫的是 "我們會對您的信用卡資料和特殊訊息進行加密，但無法確保您個人資料100%的安全性" — [meepshop.com/privacy](https://www.meepshop.com/privacy)。
- **iCHEF**：首頁和隱私權政策都沒有提到任何認證，隱私權政策只說使用 AWS，以及 "We take appropriate data protection, storage and processing mechanisms and data security measures…" — [ichefpos.com/zh-tw/privacy-policy](https://www.ichefpos.com/zh-tw/privacy-policy)。`/zh-tw/security` 回傳 404。
- **1shop**：首頁沒有任何資安或認證內容 — [1shop.tw](https://1shop.tw/)。

### Inferences
- 台灣電商 SaaS 習慣把認證「藏」在隱私權政策、支援文章或頁尾，很少做成獨立的品牌化 Trust Center。SHOPLINE 的「資格與認證」最接近 Trust Center，但它是全球 SHOPLINE 的合規框架翻譯過來的。
- 有自建金流的業者（綠界、藍新、SHOPLINE Payments、CYBERBIZ）都會把 PCI DSS 和 ISO 27001 放在一起展示。

### Gaps
- meepShop、1shop 首頁可能有部分內容由 JS 載入，抓到的靜態 HTML 不一定完整。不過搜尋也找不到這兩家（以及 iCHEF）有任何資安認證。
- 91APP 的永續報告書 PDF 沒有取得，無法確認是否揭露 ISO 27001 或其他認證。

---

## Q2. 區塊標題與副標（原文照錄）

### Takeaway
標題主要有三種寫法：直接寫認證名稱（"SOC 2 II 認證"、"資安認證"）、品牌加認證（"CYBERBIZ 安全認證"）、價值主張型（91APP "國際資安認證建立完整資訊防護"、"金融業等級資安認證，做品牌經營業績的最強後盾"）。

### Cited Findings
- **91APP**（Commerce Cloud 區塊）："國際資安認證建立完整資訊防護" → 卡片 "SOC 2 Type II" → 卡片說明 "金融業等級資安認證，做品牌經營業績的最強後盾" — [91app.com/commerce-cloud](https://91app.com/commerce-cloud/)。首頁版本是 "國際資安認證與完整防護" — [91app.com](https://www.91app.com/)。落地頁 H1 寫的是 "SOC 2 II 認證"（少了 "Type"，照原文）— [91app.com/soc-2-type-ii](https://91app.com/soc-2-type-ii/)。
- **CYBERBIZ**：一處寫 "CYBERBIZ 安全認證"，另一處（同頁的第二個版本）只寫 "安全認證"。子標題各自是 "ISO"／"ISO/IEC 27001:2022" 和 "PCI DSS" — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)。
- **SHOPLINE**：H1 是 "資格與認證"，子段落是 "簡介"、"SHOPLINE - 共同責任模型"、"資料處理補充條款"、"PCI"（裡面是 FAQ 式小標 "什麼是 PCI-DSS 合規？"、"SHOPLINE PAYMENT 是否就 PCI 之部分合規？"）、"CBPR"、"ISO/IEC 27001:2022" — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。反詐騙頁標題是 "SHOPLINE 反詐騙暨資安保護應變措施"，副標 "與您站在一起" — [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。
- **WACA**：文章 H1 是 "WACA 防範詐騙暨個資保護措施說明"，小標 "WACA 資訊安全規格"、"關於 ISO 27001 認證"、"| 什麼是 ISO 27001 認證？ |"、"| ISO 27001 缺一不可的 CIA 三大要素 |"、"| 通過 ISO 27001 認證有哪些好處？ |"、"系統定期執行弱點掃描及滲透測試"、"關於您的商店資訊安全" — [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- **藍新**：H1 是 "資安認證"，四張卡片標題："SSL 256 bit加密技術"、"PCI-DSS 4.0.1支付卡產業資料安全標準認證"、"ISO 27001：2022 資訊安全管理系統認證"、"會員安全驗證機制" — [newebpay sercurity_guarantee](https://www.newebpay.com/website/Page/content/sercurity_guarantee)。
- **綠界**：政策頁標題 "資訊安全政策"、"資訊安全規劃"，編號小節 "1.資訊安全管理組織"、"2.資訊安全管理系統及安全標準"、"3.資訊安全風險具體管理與持續改善架構"、"4.資訊安全風險與因應措施"、"5.投入資訊安全管理之資源" — [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。證書頁 H1 是 "專業認證"，卡片標籤 "ISO 27001"、"國際PCI DSS 認證"、"綠界Pay_ 行動應用APP基本資安檢測合格證明"、"綠界廠商專區_ 行動應用APP基本資安檢測合格證明" — [綠界專業認證](https://corp.ecpay.com.tw/%e5%b0%88%e6%a5%ad%e8%aa%8d%e8%ad%89/)。

### Inferences
- 只有 91APP 把認證寫成商業利益導向的句子（"做品牌經營業績的最強後盾"）。其他家都是說明式標題。
- 「金融業等級」是 91APP 用來替 SOC 2 定位的詞，屬於行銷形容，不是認證本身的用語。

### Gaps
- 無。

---

## Q3. 認證周邊的說明文字（原文照錄）

### Takeaway
文字大致分兩派：一派「解釋標準是什麼」（CYBERBIZ、SHOPLINE、WACA 花很多篇幅介紹 ISO 27001 或 PCI DSS 本身）；另一派「說明公司何時取得什麼」（藍新、綠界是事實陳述，附時間和稽核頻率）。

### Cited Findings
- **91APP**："91APP 符合美國註冊會計師協會（AICPA）認證的服務準則，提供安全性、保密、隱私權、可用性及處理完整性，五大面向全面保障。" — [91app.com/soc-2-type-ii](https://91app.com/soc-2-type-ii/)。新聞稿（英文）："The company prioritizes information security through a dedicated InfoSec Committee, annual SOC 2 certification, and collaboration with government agencies on e-Commerce cybersecurity defense initiatives, safeguarding customer data and strengthening industry trust." — [ir.91app.com id=106](https://ir.91app.com/en/news_detail.php?id=106)（2025-09-11）。
- **CYBERBIZ**："對於CYBERBIZ，我們始終將客戶服務的穩定性與資訊安全視為首要任務。為了確保平台的可靠性，我們不懈努力地加強系統穩定性，同時也積極投資於各項國際認證，以展現我們對品質與資訊安全的承諾。" 以及 "每一項認證的背後，都代表我們對細節的重視與不懈努力。我們希望藉由這些專業認可，讓客戶更加安心地使用 CYBERBIZ 的服務，並與我們一同邁向更高的目標。" ISO 段落結尾是 "於2022/10/24更新2022版本，主要著重於對網路安全和隱私保護作加強。" — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)。
- **SHOPLINE**（簡介）："SHOPLINE的資訊安全方針是「保護用戶資產，提供安全、穩定的用戶服務」，SHOPLINE致力於為用戶提供更安全的服務，並在合規上不斷進步。" 以及 "合規內容，逐步通過第三方審核報告以披露 SHOPLINE 在合規的實踐和服務能力。我們客戶的成功是 SHOPLINE 最大的成就，因此，請即時向我們反饋您的合規要求，我們將繼續改進。" CBPR 段落："為了嚴格遵守跨境數據法規並更好地為新加坡以及各個國家的市場提供服務，SHOPLINE 已申請並成功獲得 CBPR 認證，遵守不同國家的跨境數據要求。" — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。
- **SHOPLINE**（反詐騙頁）："【國際安全認證】：通過 ISO27001:2022、CPBR 等國際安全認證確保用戶資料之安全"（頁面把 CBPR 誤植成 "CPBR"，照原文）— [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。
- **WACA**："WACA 自 2020 年起，每年皆取得國際 ISO 27001 驗證，具備完整規劃的資訊安全管理系統。" — [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- **藍新**："藍新科技股份有限公司於 2026 年 6 月取得PCI-DSS支付卡產業資料安全標準(Payment Card Industry Data Security Standard) 4.0.1認證，讓持卡人資料的安全得到更可靠的保障。"（年份和月份由 `<span id="year">`、`<span id="date">` 動態帶入）；"藍新科技股份有限公司於 2024年 11月取得 ISO 27001：2022 資訊安全管理系統(Information Security Management System) 認證，資訊安全管理系統與國際標準接軌。" — [newebpay sercurity_guarantee](https://www.newebpay.com/website/Page/content/sercurity_guarantee)。
- **綠界**："本公司藉由 ISO 27001 及 PCI DSS 兩項資訊安全國際標準制度為骨幹，系統性地規劃及佈署各項管理規範及實作措施，建立持續改善之管理流程…" 以及 "ISO 27001每三年需重審更新證書，PCI DSS則為每年更新。上述兩項國際標準每年皆會由外部驗證單位執行公正獨立之第三方稽核，確保本公司相關管理措施均妥善持續運作。"（"資訊安全規劃" 最後更新日期：2025/04/10）— [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。

### Inferences
- 寫法最「可查證」的是藍新和綠界：寫明取得年月、版本（4.0.1／2022）以及稽核頻率。CYBERBIZ 和 WACA 篇幅多半在教育讀者認識標準，對自家驗證範圍著墨很少。
- 綠界的「每三年重審、每年外部稽核」是少數明確寫出持續驗證節奏的範例，適合當作 ISO 段落的參考寫法。

### Gaps
- 無。

---

## Q4. 展示了哪些認證、用什麼形式；有無範圍聲明、是否寫出驗證機構

### Takeaway
ISO/IEC 27001:2022 是共同標配（91APP 除外，它公開的是 SOC 2）。PCI DSS 出現在有金流的業者。沒有任何一家展示 ISO/IEC 27701。只有 91APP 展示 SOC 2。網頁文字幾乎都不寫驗證機構，機構名稱只出現在證書圖檔上。

### Cited Findings
- **91APP**：只展示 SOC 2 Type II，以文字卡片呈現，落地頁有圖但 alt 是空的。只提到 AICPA 準則，沒有寫查核會計師事務所 — [91app.com/soc-2-type-ii](https://91app.com/soc-2-type-ii/)。
- **CYBERBIZ**：ISO/IEC 27001:2022 和 PCI DSS 各配一段說明文字和一張證書全圖（alt 空白），網頁文字沒寫範圍或機構 — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)。證書圖上的資訊如下：
  - ISO 證書（中文譯本）："此為證書 TW25/00000127 譯本"，組織 "順立智慧股份有限公司"，標準 "ISO/IEC 27001:2022 資訊安全、網宇安全及隱私保護 – 資訊安全管理系統 – 要求事項"，範圍寫 "註冊範圍顯示在本證書的第二頁"（第二頁沒有公開），有效期 "2026 年 06 月 06 日 至 2028 年 02 月 18 日"，"版次 2. 原始註冊日期 2025 年 02 月 18 日"，簽發單位 SGS United Kingdom Ltd，認證標誌 UKAS／IAF — [證書圖檔](https://www.cyberbiz.io/wp-content/uploads/2026/06/ISO_證書2027-1084x1536-1-723x1024.png)。
  - PCI 證書："Has been assessed by Secure Vectors Information Technologies Inc. and found to be compliant against PCI Data Security Standard Version 4.0.1 Merchants Level 1."，有效期 "18 December 2025 – 17 December 2026"，QSA "Mr. Vincent Huang"，編號 "SVG-2025233" — [證書圖檔](https://www.cyberbiz.io/wp-content/uploads/2026/01/PCIDSS_證書-2026.webp)。注意等級是 **Merchants** Level 1，不是 Service Provider。
- **SHOPLINE**：PCI DSS、CBPR、ISO/IEC 27001:2022 三項，各配 Logo 圖（alt 分別是 "SHOPLINE PCI DSS"、"SHOPLINE CBPR"、"SHOPLINE ISO/IEC 27001:2022"）和說明。PCI 有寫範圍："是的，SHOPLINE PAYMENT 符合 Payment Card Industry Data Security Standards（PCI DSS）並且獲得了 Level 1 服務提供者的認證。" 也就是說範圍是 SHOPLINE Payments，不是整個網店平台。ISO 段落只介紹標準，沒寫範圍或驗證機構 — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。反詐騙頁另外寫了 "SHOPLINE Payments 服務串接符合 PCI DSS Level 1，並於 2024 年通過數位發展部 第三方支付服務機構服務能量登錄"，以及加入 "台灣 TWCERT 資安聯盟" — [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。
- **WACA**：只有 ISO 27001，展示一張證書全圖（alt "哇寶國際資訊ISO27001證書"）。證書圖上寫：AFNOR Certification，"N° 2026/118107.1"，組織 "WABOW INFORMATION.INC. 哇寶國際資訊股份有限公司"，範圍 "CLOUD SERVICES FOR E-COMMERCE. THIS IS IN ACCORDANCE WITH THE STATEMENT OF APPLICABILITY, VERSION 1.0, DATED NOVEMBER 3, 2025. 電子商務的雲端服務，依據 2025 年 11 月 3 日發行之適用性聲明書 1.0 版。"，標準 "ISO/IEC 27001:2022 (International) - NF EN ISO/IEC 27001:2023 (Europe)"，有效期 "2026-05-29" 至 "2029-05-28"，認證標誌 COFRAC，附 QR code "Scan this QR code to check the validity of the certificate." — [證書圖檔](https://img.waca.net/uploads/blog/559/2026_iso27001.png)；所在頁面 [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- **藍新**：PCI DSS 4.0.1 和 ISO 27001:2022 各配一張證書縮圖，另有 SSL 和會員驗證卡片 — [newebpay sercurity_guarantee](https://www.newebpay.com/website/Page/content/sercurity_guarantee)。證書圖上的資訊如下：
  - PCI："Neweb Technologies Co., Ltd. 藍新科技股份有限公司 Has been assessed by Secure Vectors Information Technologies Inc. and found to be compliant against PCI Data Security Standard Version 4.0.1 Service Provider Level 1."，"26 June 2026 – 25 June 2027"，"SVG-2026092" — [圖檔](https://www.newebpay.com/ud/img/pci-dss/2026_6.png?v20260629)。
  - ISO："證書 TW21/00477"，範圍 "依據適用性聲明書版本 3，提供藍新金流系統之資訊安全管理、軟體開發、系統維運活動，包含: ・金流服務系統 ・捐款服務系統 ・收據服務系統 ・電子發票系統 及支援性設施及網路服務之資訊安全維運管理。"，有效期 "2024 年 11 月 24 日 至 2027 年 11 月 24 日"，"版次 2. 原始註冊日期 2021 年 11 月 24 日"，簽發單位 "台灣檢驗科技股份有限公司"（SGS Taiwan），認證標誌 TAF／IAF — [圖檔](https://www.newebpay.com/ud/img/pci-dss/2024_11_1.jpg)。
- **綠界**："專業認證" 頁有四張卡：ISO 27001（中、英文證書 PDF）、PCI DSS、兩張「行動應用APP基本資安檢測合格證明」— [綠界專業認證](https://corp.ecpay.com.tw/%e5%b0%88%e6%a5%ad%e8%aa%8d%e8%ad%89/)。證書圖上的資訊如下：
  - ISO："此為證書 TW21/00341 譯本"，"綠界科技股份有限公司"，"ISO/IEC 27001:2022"，範圍 "註冊範圍顯示在本證書的第二頁"，有效期 "2025 年 07 月 24 日 至 2027 年 08 月 13 日"，"版次 5. 原始註冊日期 2021 年 08 月 13 日"，SGS United Kingdom Ltd，UKAS／IAF — [圖檔](https://corp.ecpay.com.tw/wp-content/uploads/2025/09/ISO-27001證書2025中文.png)。
  - PCI："Green World FinTech Service Co., Ltd. 綠界科技股份有限公司 … Secure Vectors Information Technologies Inc. … PCI Data Security Standard Version 4.0.1 Service Provider Level 1."，"31 July 2026 – 30 July 2027"，"SVG-2026118" — [圖檔](https://corp.ecpay.com.tw/wp-content/uploads/2026/07/PCIDSS26-27.png)。
  - 前一版 ISO 證書 PDF（2024/09 上傳）的範圍文字是 "金流、物流與電子發票相關的系統開發與維運…"，這段只出現在搜尋摘要，未經驗證 — [ISO-27001證書電子檔CHT.pdf](https://corp.ecpay.com.tw/wp-content/uploads/2024/09/ISO-27001證書電子檔CHT.pdf)。
- 政策頁另外列出專責人員持有的個人證照（ISO 27001 LA、ISO 29100 LA、BS 10012 LA、CEH、ECSA、OSCP）— [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。
- 6 家公開頁面都沒有提到 ISO/IEC 27701（以上各 URL 均已用 grep 確認沒有 "27701"）。

### Inferences
- 台灣業者的主流做法是直接貼整張證書圖，不做精簡的 badge 牆。好處是透明（編號、效期、機構都看得到），缺點是 alt 文字幾乎都空白，SEO 和無障礙都不友善。
- 金流業者（綠界、藍新）和 CYBERBIZ 的 PCI DSS 都由 Secure Vectors（QSA）評估，ISO 27001 都由 SGS 簽發（英國或台灣分支）。
- 「範圍」只有證書圖上的 WACA、藍新寫得清楚；網頁文字只有 SHOPLINE 的 PCI 段落說明範圍（SHOPLINE PAYMENT）。

### Gaps
- CYBERBIZ 和綠界 ISO 證書第二頁（註冊範圍）沒有公開，無法得知範圍。
- SHOPLINE 的 ISO 與 CBPR 證書編號、驗證機構、效期都沒有在網頁上公開，Logo 圖檔我也沒有逐一檢視。
- 91APP SOC 2 的查核期間、會計師事務所、報告類型細節都沒有公開。

---

## Q5. 是否公開證書編號、發證／到期日、稽核日期

### Takeaway
網頁「文字」幾乎都不寫編號和效期，只有藍新文字寫了取得年月。實際的編號和效期都在證書圖上（CYBERBIZ、WACA、藍新、綠界都有）。SHOPLINE 和 91APP 都沒有公開。

### Cited Findings
- 藍新文字寫了 "於 2026 年 6 月取得PCI-DSS…4.0.1認證"、"於 2024年 11月取得 ISO 27001：2022" — [newebpay sercurity_guarantee](https://www.newebpay.com/website/Page/content/sercurity_guarantee)。
- WACA 文字寫了 "自 2020 年起，每年皆取得"，證書圖有編號和效期（2026-05-29～2029-05-28）— [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- 綠界文字寫了頻率（ISO 每三年重審、PCI 每年、每年第三方稽核），證書圖有編號 TW21/00341、SVG-2026118 和效期 — [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)、[綠界專業認證](https://corp.ecpay.com.tw/%e5%b0%88%e6%a5%ad%e8%aa%8d%e8%ad%89/)。
- CYBERBIZ 文字只有標準版本日期（"於2022/10/24更新2022版本"），證書圖有 TW25/00000127、SVG-2025233 和效期 — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)。CYBERBIZ 檔名有 "ISO_證書2027"、"PCIDSS_證書-2026"，看得出是按年度替換圖檔。
- SHOPLINE：沒有編號或日期，只寫 "AoC 是供 SHOPLINE PAYMENT 證明其年度 PCI DSS 合規性評估結果的文件" — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。
- 91APP：沒有任何日期或報告期間，只有新聞稿說 "annual SOC 2 certification" — [ir.91app.com id=106](https://ir.91app.com/en/news_detail.php?id=106)。

### Inferences
- 藍新用 `<span id="year">` 和 `<span id="date">` 動態帶入取得年月、圖檔加版本參數 `?v20260629`，表示每年更新證書時只換資料、不改文案。這種結構適合 Webflow CMS 欄位化。

### Gaps
- 無。

---

## Q6. 有無下載／索取證書、報告，或聯絡資安團隊的 CTA

### Takeaway
沒有任何一家提供「下載 SOC 2 報告」或「索取證書」的表單。最接近的是綠界的證書 PDF 直接下載，以及 SHOPLINE「AoC 請聯繫商戶成功經理」。只有綠界有 bug bounty 回報信箱。

### Cited Findings
- **SHOPLINE**："我還有其他關於PCI-DSS的問題"、"有關 SHOPLINE PAYMENT 的服務供應商 PCI DSS 合規性證明（AoC*），請聯繫您的商戶成功經理。"、"*AoC 是供 SHOPLINE PAYMENT 證明其年度 PCI DSS 合規性評估結果的文件，屬於高度保密和特許文件。" 頁尾 CTA 是 "全球超過 700,000 商家已使用 SHOPLINE"、"免費試用 14 天" — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。反詐騙頁有 "現成宣導 Banner 下載"（反詐騙素材，不是證書）— [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。
- **綠界**：ISO 證書可下載 PDF（[中文](https://corp.ecpay.com.tw/wp-content/uploads/2025/09/ISO-27001證書2025中文-2.pdf)、[英文](https://corp.ecpay.com.tw/wp-content/uploads/2025/09/ISO-27001證書2025英文.pdf)），但連結沒有文字標籤，是點圖片下載 — [綠界專業認證](https://corp.ecpay.com.tw/%e5%b0%88%e6%a5%ad%e8%aa%8d%e8%ad%89/)。漏洞回報 CTA："請您發現漏洞後依據規範（詳閱三、通報規範）書寫並寄至 bugbounty@ecpay.com.tw 。"、"本公司將於 20 個工作天內回覆您並根據漏洞嚴重性儘速修正問題。"（頁面標示最後更新日期：2026/10/08）— [corp.ecpay.com.tw/bug-bounty](https://corp.ecpay.com.tw/bug-bounty/)。
- **WACA**：CTA 指向客服，不是證書："若商家有任何緊急問題，歡迎至官網及商店後台右下角客服系統尋求協助，或洽詢顧客經營團隊 LINE OA"，以及 "免費預約專人諮詢" — [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- **91APP**：落地頁沒有下載或索取 CTA，導覽列只有通用的 "專人聯繫" — [91app.com/soc-2-type-ii](https://91app.com/soc-2-type-ii/)。
- **CYBERBIZ**：沒有證書 CTA，側欄浮動按鈕是 "顧問諮詢"、"講座報名" — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)。
- **藍新**：頁面上沒有 CTA，只有頁尾客服信箱 "cs@newebpay.com" — [newebpay sercurity_guarantee](https://www.newebpay.com/website/Page/content/sercurity_guarantee)。

### Inferences
- 在台灣電商 SaaS 圈，「索取 SOC 2／ISO 報告」的 B2B 流程還沒成為公開頁面的慣例。報告大多由業務或客戶成功窗口私下提供（SHOPLINE 明白寫出這點）。

### Gaps
- 無。

---

## Q7. 語氣：正式或口語；用「我們」還是公司名；第三方稽核／年度複核的說法

### Takeaway
金流業者（綠界、藍新）用第三人稱「本公司／藍新科技股份有限公司」，語氣正式、接近法遵文件。電商平台（CYBERBIZ、SHOPLINE、WACA）混用「我們」和品牌名，語氣偏溫和、帶情感。91APP 最短，也最偏行銷。

### Cited Findings
- **綠界**用「本公司」、編號條列，像治理文件："上述兩項國際標準每年皆會由外部驗證單位執行公正獨立之第三方稽核" — [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。
- **藍新**用全名 "藍新科技股份有限公司於…取得…"，句型固定、正式 — [newebpay sercurity_guarantee](https://www.newebpay.com/website/Page/content/sercurity_guarantee)。
- **CYBERBIZ**混用「我們」和品牌名，帶情感用語（"不懈努力"、"更加安心"、"與我們一同邁向更高的目標"），沒有提到第三方稽核 — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)。
- **SHOPLINE**混用：簡介用品牌名加「我們」（"請即時向我們反饋您的合規要求"），寫出第三方審核（"逐步通過第三方審核報告以披露"），反詐騙頁語氣更柔軟（"與您站在一起"、引用企業使命 "唯有品牌的成功，才是我們的成功。"）；也寫了 "【每年委由第三方進行滲透測試】" — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)、[marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。
- **WACA**以品牌名為主語，口語加符號裝飾（"➜"、結尾 "：)"），寫出第三方滲透測試："定期委請第三方資安公司，針對系統進行更進一步且詳細的滲透測試" — [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- **91APP**以品牌名為主語，一句話完結，強調 "五大面向全面保障" — [91app.com/soc-2-type-ii](https://91app.com/soc-2-type-ii/)。

### Inferences
- 對 B2B 決策者（法遵、IT）來說，綠界和藍新那種「主詞＋時間＋版本＋稽核頻率」的寫法最可信。CYBERBIZ 那種情感語句一旦和具體事實脫鉤，就容易流於空泛。

### Gaps
- 無。

---

## Q8. 其他值得注意的寫法（資料落地、SLA、FAQ、bug bounty 等）

### Takeaway
值得借鏡的元素包括：SHOPLINE 的「共同責任模型」、資料儲存地與 TWCERT 聯盟；91APP 把 SLA 和效能數字放在認證旁邊；綠界的 bug bounty、DDoS/EDR/DLP 條列、人力數字；WACA 列出平台資安功能清單，並附「商家可以做什麼」。

### Cited Findings
- **資料落地**（SHOPLINE）："【資料儲存於 AWS 新加坡伺服器】：所有用戶的資料皆進行硬碟加密存放於新加坡 AWS 伺服器，且採用 AWS Shield Advanced 以及 WAF 抵禦 DDOS 以及駭客攻擊，所有用戶的資料皆遵循最小權限原則進行存取，並由台灣團隊進行維運" — [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。
- **共同責任模型**（SHOPLINE）："安全和合規是 SHOPLINE 和商家之間的共同責任。"，並把控制分成「繼承控制／共同控制／商家控制」— [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。
- **人力與組織**：SHOPLINE 寫 "【配置兩位全職人員專職處理資訊安全】：台灣團隊設置獨立資訊安全官" — [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。綠界寫 "資訊安全管理工作小組之相關作業人員共計13人，個人資料管理工作小組之相關作業人員共計36人。隸屬資訊安全部之專責資安人員共計5人" — [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。
- **SLA／效能**（91APP，與 SOC 2 區塊相鄰）："高乘載量能"、"每分鐘可處理高達 30,000 筆訂單，即使高流量區間購物體驗依然流暢無延遲。"、"高穩定性 SLA 99.97%"、"即使在購物高峰期，也能提供穩定且高效的服務，確保網站穩定運行。" — [91app.com/commerce-cloud](https://91app.com/commerce-cloud/)。
- **綠界**：CDN+WAF 寫 "導入 Akamai CDN+WAF 服務…該服務保證100% SLA"；bug bounty 寫 "綠界科技於2025年正式啟動「漏洞賞金計畫（Bug Bounty）」"；社交工程演練寫 "113年共計執行 6 次社交工程電子郵件演練" — [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。另有 "安全漏洞回報致謝" 名單頁（選單可見）。
- **掃描與測試頻率**：SHOPLINE "【每季進行資安弱點掃描】"、"【每年委由第三方進行滲透測試】" — [marketing.shopline.tw/anti-fraud](https://marketing.shopline.tw/anti-fraud)。WACA "系統每月執行弱點掃描" — [waca.net/support/id/559](https://www.waca.net/support/id/559)。綠界 "每季執行弱點掃瞄" — [綠界資訊安全政策](https://corp.ecpay.com.tw/%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8%e6%94%bf%e7%ad%96/)。
- **平台資安功能清單**（WACA）："高強度密碼驗證／定期更換密碼通知／帳號登入兩步驟驗證／可疑 IP 排除／登入成功/失敗通知信／帳號操作歷程紀錄／30分鐘閒置登出機制" — [waca.net/support/id/559](https://www.waca.net/support/id/559)。
- **FAQ 格式**：SHOPLINE 的 PCI 段落是問答形式 — [shopline.tw/compliance-center](https://shopline.tw/compliance-center)。
- **政府與產業連結**：SHOPLINE 寫 "加入 台灣資安組織 TWCERT/CC，同時也是資策會資安所科專合作夥伴"；藍新頁尾有 "服務能量登錄" 連結；綠界展示 "行動應用APP基本資安檢測合格證明" — 依序見 [SHOPLINE anti-fraud](https://marketing.shopline.tw/anti-fraud)、[newebpay](https://www.newebpay.com/website/Page/content/sercurity_guarantee)、[綠界專業認證](https://corp.ecpay.com.tw/%e5%b0%88%e6%a5%ad%e8%aa%8d%e8%ad%89/)。
- **反詐騙捆綁**：SHOPLINE、WACA、CYBERBIZ（側欄 "反詐騙聲明"）、藍新（"防詐騙宣導"）都把資安頁和反詐騙宣導放在一起 — [cyberbiz.io/privacy-policy](https://www.cyberbiz.io/privacy-policy/)、[newebpay](https://www.newebpay.com/website/Page/content/sercurity_guarantee)。
- **更新日期**：綠界政策頁分段標註 "最後更新日期：2022/01/06"（政策）和 "最後更新日期：2025/04/10"（規劃）；WACA 標註 "最後更新 2026-06-11" — 同上各頁。

### Inferences
- 台灣電商 SaaS 的資安頁常常和「反詐騙」綁在一起，這是因為消費端詐騙壓力大（數發部、165）。B2B 醫療照護 SaaS 不一定需要這個框架。
- 對 Jubo 比較有參考價值的是：①綠界的「標準 → 稽核頻率 → 實作措施 → 人力」層次；②SHOPLINE 的共同責任模型和資料落地聲明；③藍新的「主詞＋取得年月＋版本」單句範式；④WACA 的「平台做了什麼／客戶可以做什麼」雙欄。

### Gaps
- 91APP 的 SOC 2 頁沒有提到資料落地、bug bounty 或報告索取流程。
- 沒有任何一家公開 status page 或 uptime 歷史頁（只有 91APP 寫 SLA 數字）。這是根據已抓取的頁面判斷，沒有逐站搜尋 status 子網域。
