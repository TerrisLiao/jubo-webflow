# 台灣 martech / AI B2B SaaS 的資安、信任中心與認證頁寫法

研究日期：2026-10-08。頁面以 curl 抓取原始 HTML 後轉成純文字，再逐字擷取（不經摘要模型），引文均為原文。另讀取了 Appier 兩張 SGS 證書圖片。凡是只來自搜尋摘要或摘要模型、未經原文確認的內容，都標為「未驗證」。

涵蓋公司：Appier、Vpon（威朋）、iKala、Gogolook（Whoscall）、Crescendo Lab（漸強實驗室）、Omnichat（**註：總部在香港，不是台灣創立**，見下方說明）、意藍資訊 eLand（找不到認證內容）、91APP（找不到認證內容，為替代人選）。

---

## Q1. 資安／信任／合規頁的網址（中英文版）；若沒有專頁，認證放在哪裡

### Takeaway
Appier、Vpon、iKala、Gogolook（Whoscall）都有固定的資安或信任頁。Crescendo Lab 和 Omnichat 沒有資安專頁，認證只出現在首頁的一段文字或一張徽章，以及新聞稿。意藍和 91APP 在官網上找不到任何認證內容。

### Cited Findings
- **Appier**：英文「Trust Center」放在 About 選單下，入口頁有三張卡片（Security／Compliance／Privacy），分別連到 `/trust-center-security`、`/trust-center-compliance`、`/trust-center-privacy`。中文版 `https://www.appier.com/zh-tw/trust-center-compliance` 回傳 404，所以信任中心只有英文。— [Appier Trust Center](https://www.appier.com/trust-center); [Compliance](https://www.appier.com/trust-center-compliance); [Security](https://www.appier.com/trust-center-security)
- **Appier**：每張證書各有一個頁面，`/en/sgs-27001` 和 `/en/sgs-27701`。頁面標題是「SGS Report」，內容是證書的掃描圖片。— [Appier sgs-27001](https://www.appier.com/en/sgs-27001); [Appier sgs-27701](https://www.appier.com/en/sgs-27701)
- **Vpon**：英文 `https://www.vpon.com/en/security-profile/`，中文 `https://www.vpon.com/zh-hant/security-profile/`。選單分組叫「Security & Trust Center」，底下有「Security Profile／Privacy Policy／Privacy Statement – Data SDK／Privacy Statement – Website / Platform」。中文版的正文仍是英文，只有導覽是中文，例如「安全中心」「保護及維護隱私是我們認為最重要的事」。日文網址 `/ja/security-profile/` 會導回英文版。頁面 schema 的 datePublished 是 2022-05-18，dateModified 是 2025-03-17。— [Vpon EN](https://www.vpon.com/en/security-profile/); [Vpon 中文](https://www.vpon.com/zh-hant/security-profile/)
- **iKala**：中文「資訊安全管理」頁在 `https://ikala.ai/zh-tw/information-security/`，英文「Information Security Management」頁在 `https://ikala.ai/information-security-management/`。頁尾有連結，首頁 FAQ 的答案也會連過去。中文頁 dateModified 為 2025-08-08。— [iKala 中文](https://ikala.ai/zh-tw/information-security/); [iKala EN](https://ikala.ai/information-security-management/)
- **iKala**：「獎項與榮耀／Milestones & Awards」頁另有一段 ISO 27001 的歷史紀錄。— [iKala milestones](https://ikala.ai/milestones-awards/)
- **Gogolook**：認證放在消費者產品 Whoscall 的「安全」頁，中文 `https://whoscall.com/zh-hant/security`，英文 `https://whoscall.com/en/security`，兩者都會轉到 `web.whoscall.com`。B2B 母公司官網 `gogolook.com` 首頁沒有認證內容（grep 首頁文字，找不到 ISO 或資安字樣）。— [Whoscall 安全](https://whoscall.com/zh-hant/security); [Whoscall security EN](https://whoscall.com/en/security); [Gogolook](https://www.gogolook.com/)
- **Crescendo Lab**：沒有資安專頁。首頁只有一個「Certification」區塊，用一句話帶過 ISO27001。另外有中英文新聞稿頁 `/tw/newsroom/iso27001` 和 `/en/newsroom/iso27001`，頁尾只連到隱私權政策。— [漸強首頁](https://www.cresclab.com/tw); [漸強新聞稿 中文](https://www.cresclab.com/tw/newsroom/iso27001); [EN](https://www.cresclab.com/en/newsroom/iso27001)
- **Omnichat**：沒有資安專頁。首頁的合作夥伴徽章列裡有一張 ISO 27001:2022 徽章圖（`1-Omnichat-ISO-27001-2022.png`，alt 為「Omnichat ISO logo」），另有部落格公告（香港中文版、英文版）和 SGS 香港的新聞稿。台灣版網址 `/zh-tw/` 回傳 404。— [Omnichat zh-hk](https://www.omnichat.ai/zh-hk/); [Blog 中文(香港)](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/); [Blog EN](https://blog.omnichat.ai/omnichat-iso-270012022-certification/); [SGS HK 新聞](https://www.sgs.com/en-hk/news/2024/12/sgs-awards-iso-27001-information-security-management-systems-certification-to-omnichat-limited)
- **Omnichat 不是台灣創立**：SGS 新聞稿原文為「Founded in 2017 with its headquarter in Hong Kong, Omnichat is an omnichannel chat commerce solution provider…」— [SGS HK](https://www.sgs.com/en-hk/news/2024/12/sgs-awards-iso-27001-information-security-management-systems-certification-to-omnichat-limited)

### Inferences
- 版位可分三級：(a) 專門的 Trust Center，每張證書一個子頁（Appier）；(b) 單頁的 Security Profile，或資安政策頁（Vpon、iKala、Whoscall）；(c) 首頁一句話或一張徽章，再加新聞稿（Crescendo Lab、Omnichat）。
- 台灣廠商的資安頁常常只有英文。Appier 完全沒有中文，Vpon 的中文版只翻了導覽，iKala 是少數中英都完整的。

### Gaps
- Gogolook 的永續報告書和年報裡是否有 ISO 揭露，沒有抓到原文。
- 意藍資訊官網（https://www.eland.com.tw/）首頁找不到 ISO 或資安字樣，兩次搜尋也沒有相關報導。91APP 搜尋同樣沒有結果（[91APP IR](https://ir.91app.com/en/news_detail.php?id=117) 只出現在搜尋結果，沒有確認內容）。兩家都沒有找到可引用的認證內容。

---

## Q2. 區塊標題與副標（原文照錄）

### Takeaway
英文頁多用「Certified」「Independently Verified」這類驗證字眼。中文頁偏好「國際…標準驗證」「國際資安認證」，或者用比較感性的標語，例如「賦予企業安心感」「強化資訊防護體系」。

### Cited Findings
- **Appier Trust Center 入口**：H2「Welcome to Our Trust Center」，頁底 CTA 區標題「Start Growing Your Business Today with Appier」。— [Appier Trust Center](https://www.appier.com/trust-center)
- **Appier Compliance 頁**：H1「Compliance」，日期「Last Updated: 2025/10/23」，認證區塊的 H1 就叫「ISO」。— [Appier Compliance](https://www.appier.com/trust-center-compliance)
- **Appier Security 頁**：H1「Built on the World's Most Trusted Cloud Infrastructure」。小節依序為「Enterprise-Grade Foundation」「Advanced Encryption Standards」「Zero-Trust Security Architecture」「Security by Design」「Industry-Leading Certifications」，認證小節的副標是「Independently Verified Security」。— [Appier Security](https://www.appier.com/trust-center-security)
- **Vpon**：兩張卡的標題結構相同。第一張是「Information Security Management Certified」，副標「Information Security Management System(ISMS) Certified」，展開後有「Overview」「ISO/IEC 27001 Overview」「Vpon Big Data and ISO/IEC 27001」。第二張是「Privacy Information Management Certified」，副標「Privacy Information Management System (PIMS) Certified」，展開後有「ISO/IEC 27701 Overview」「Vpon Big Data and ISO/IEC 27701」。— [Vpon](https://www.vpon.com/en/security-profile/)
- **iKala 中文**：標題「資訊安全管理」，副標「建構穩固的資訊安全管理制度，強化資訊防護體系」。小節為「資通安全風險管理架構」「資通安全規劃」「短期目標／中期目標／長期目標」。— [iKala 中文](https://ikala.ai/zh-tw/information-security/)
- **iKala 英文**：標題「Information Security Management」，副標「iKala builds a robust information security management system to strengthen its protection framework」。小節為「Information Security Risk Management Framework」「Information Security Strategy」「Short-Term Goals／Mid-Term Goals／Long-Term Goals」。— [iKala EN](https://ikala.ai/information-security-management/)
- **iKala milestones**：條目標題「ISO 27001 Certified」。— [iKala milestones](https://ikala.ai/milestones-awards/)
- **Whoscall 中文**：頁首「一起建立信任」，認證區標題「通過國際資訊安全與品質標準驗證」。英文版是「Certified by international information security and quality standards」。— [Whoscall 中文](https://whoscall.com/zh-hant/security); [EN](https://whoscall.com/en/security)
- **Crescendo Lab 首頁**：眉標「Certification」，標題「用專業與創新，賦予企業安心感」。— [漸強首頁](https://www.cresclab.com/tw)
- **Crescendo Lab 新聞稿**：標題「漸強實驗室獲 ISO 27001 資安認證　提升全球 500+ 公司客戶資料安全」，英文「Crescendo Lab Achieves ISO 27001 Certification, Elevating Data Security for 500+ Companies Globally」。— [中文](https://www.cresclab.com/tw/newsroom/iso27001); [EN](https://www.cresclab.com/en/newsroom/iso27001)
- **Omnichat 部落格**：H1「Omnichat 榮獲 ISO/IEC 27001:2022 資訊安全管理系統認證，符合國際標準」，H2 為「ISO/IEC 27001:2022 認證— 國際資訊安全管理標準」和「ISO 認證對 Omnichat 客戶的重要性」。首頁徽章列上方的文字是「官方 WhatsApp Business Solution Provider（BSP）、Meta Business Partner 與 LINE 認證合作夥伴」，ISO 徽章和 Meta、LINE、AWS 夥伴徽章排在同一列。— [Omnichat Blog](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/); [Omnichat zh-hk](https://www.omnichat.ai/zh-hk/)

### Inferences
- 中文標題有兩種寫法：「通過…驗證」是事實陳述（Whoscall）；「賦予企業安心感」「強化資訊防護體系」是講結果和感受（漸強、iKala）。
- Crescendo Lab 和 Omnichat 把 ISO 和平台夥伴認證（LINE、Meta、Google Cloud、AWS）放在同一個「信任徽章」區。這種寫法把資安認證和商業夥伴資格混在一起呈現。

### Gaps
- 沒有檢查 Appier 日文站是否另有信任中心。

---

## Q3. 認證周圍的說明文字（原文 1–3 句）

### Takeaway
各家都會先用一兩句解釋標準是什麼（「全球最廣泛認可的 ISMS 標準」），再接一句「這代表我們…」。Appier、Vpon 的說明最長，Whoscall 只寫一句。

### Cited Findings
- **Appier Compliance**：「Appier maintains ISO/IEC 27001 and ISO/IEC 27701.」「ISO/IEC 27001 is the world’s most recognized standard for information security management systems (ISMS). Conformity with ISO/IEC 27001 demonstrates that Appier has established a robust framework to identify, manage, and mitigate risks associated with the data it owns or processes.」— [Appier Compliance](https://www.appier.com/trust-center-compliance)
- **Appier Compliance**（27701）：「On the other hand, ISO/IEC 27701 extends ISO/IEC 27001 by specifying requirements and providing guidance for establishing, implementing, maintaining and continually improving a Privacy Information Management System (PIMS). Conformity with ISO/IEC 27701 reflects Appier’s commitment to strengthening privacy management, enhancing our existing ISMS to reduce risks to individual privacy rights as well as to the organization itself.」— [Appier Compliance](https://www.appier.com/trust-center-compliance)
- **Appier Compliance 引言**：「Appier maintains strict adherence to global data protection and privacy regulations, including GDPR, CPRA and ISO 27001, among the most comprehensive frameworks & standards for information security worldwide. Our solutions are built with compliance-by-design principles, incorporating multiple layers of protection to defend against potential vulnerabilities.」— [Appier Compliance](https://www.appier.com/trust-center-compliance)
- **Appier Security 引言**：「At Appier, we understand that trust is the foundation of every successful partnership. … Beyond leveraging the world's most trusted cloud infrastructure, we safeguard all the information by implementing the principle of Security by Design across our operations and continuously maintain industry leading certifications.」— [Appier Security](https://www.appier.com/trust-center-security)
- **Vpon**（27001）：「As a leading big data company, Vpon Big Data Group Vpon is constantly committed to ensuring data security and compliance with information security regulations. By introducing Information Security Management System (ISMS) as required under ISO/IEC 27001, Vpon Big Data Group completed a thorough audit across up to 35 categories and 114 controls certified by British Standards Institute (BSI), a globally well-known third-party certification body, for Vpon’s service and products including our Data Platform and Advertising Delivery Platform.」— [Vpon](https://www.vpon.com/en/security-profile/)
- **Vpon**（27701）：「Vpon Big Data successfully completed the audit of ISO/IEC 27701 certified by British Standards Institute (BSI), a globally well-known third-party certification body, recognizing Vpon Big Data’s high-level regulation compliance and risk management for privacy protection.」— [Vpon](https://www.vpon.com/en/security-profile/)
- **Vpon** 的標準說明段寫的是「ISO/IEC 27001：2013 is the widely known international standard for information security…」和「ISO/IEC 27701:2019 is built as an extension of the widely used ISO/IEC 27001…」，引用的是 2013 年版。— [Vpon](https://www.vpon.com/en/security-profile/)
- **iKala 中文**：「為強化 iKala 的資訊安全防護與管理，我們將依循 ISO/IEC 27001:2022 國際標準，制訂並落實本資通安全政策。本政策旨在維護公司核心系統與資訊資產的機密性、完整性、可用性，以確保業務永續運作，並保障所有利害關係人（包括客戶、員工及合作夥伴）的權益。」— [iKala 中文](https://ikala.ai/zh-tw/information-security/)
- **iKala 中文**（短期目標）：「確保法規遵循與標準化：維持 ISO 27001:2022 有效性」。英文版寫的是「Ensure compliance and standardization: Maintain ISO 27001:2022 certification」。— [iKala 中文](https://ikala.ai/zh-tw/information-security/); [iKala EN](https://ikala.ai/information-security-management/)
- **iKala 首頁 FAQ**：中文「資料安全是 iKala 的核心原則。我們建立了完整的資訊安全管理框架，從資料整合、模型訓練到部署的每個階段，都採用嚴謹的安全與隱私標準，確保企業資料受到妥善保護。」英文「Data security is foundational at iKala. We maintain a comprehensive information security management framework, applying rigorous security and privacy standards at every stage — from data integration and model training to deployment — so your enterprise data stays protected.」— [iKala 中文首頁](https://ikala.ai/zh-tw/); [iKala EN 首頁](https://ikala.ai/)
- **iKala milestones**：「iKala CDP was accredited by British Standards Institution (BSI), and obtained the accreditation of ISO/IEC 27001:2013 on Information Security Management, 2021」— [iKala milestones](https://ikala.ai/milestones-awards/)
- **Whoscall**：「Whoscall 持續強化資訊安全與管理措施，以保障用戶資料並確保高品質服務。此應用程式已通過 ISO 27001、27701 及 9001 驗證。」— [Whoscall 中文](https://whoscall.com/zh-hant/security)
- **Crescendo Lab 首頁**：「漸強實驗室在台灣、泰國與日本三大市場皆獲得 LINE 認證，更是全台唯一連續五年獲選 LINE 金級夥伴的技術商。我們亦取得 ISO27001 國際資安認證，能為企業數據安全嚴格把關。」— [漸強首頁](https://www.cresclab.com/tw)
- **Crescendo Lab 新聞稿**：「ISO 27001 是全球最廣泛認可的資訊安全管理系統（ISMS）國際標準，要求申請者必須有系統地檢查資安風險，並建立、實施、維護一套資訊安全管理措施，確保為其客戶和合作夥伴等打造安全、安心的數位環境。」「為此，漸強實驗室成立了資訊安全管理團隊，分別為應用層、資料層、網路層三方面訂定相關措施，尤其在資料傳輸與儲存皆採用銀行級別的加密標準，且建立完善的備份與恢復機制。」— [漸強新聞稿](https://www.cresclab.com/tw/newsroom/iso27001)
- **Omnichat 部落格**：「作為亞洲領先的全渠道客戶體驗平台，Omnichat 很榮幸宣布成功獲得由 SGS 頒發的 ISO/IEC 27001:2022 資訊安全管理系統認證證書。這一成就不僅體現了我們對資訊安全的高度重視，更證明了我們遵從著嚴格的資訊安全管理體系。」— [Omnichat Blog](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/)

### Inferences
- 常見的句型是「標準定義句＋『這證明／代表 X 公司…』」。中文常用的詞有「機密性、完整性、可用性」「國際級」「銀行級別的加密」。
- iKala 中文頁沒有寫「已取得證書」。它寫的是「將依循」標準制訂政策，以及「維持…有效性」。英文版則直接寫「Maintain ISO 27001:2022 certification」。中英文的確定程度不一樣。

### Gaps
- iKala 的資安頁沒有寫出現行證書的發證機構和範圍。首頁 schema 的 credential 寫「ISO/IEC 27001:2013 Information Security Management (certified by BSI)」（[iKala 首頁原始碼](https://ikala.ai/)），和資安頁寫的 2022 版不一致。

---

## Q4. 列出哪些認證、用什麼形式呈現；有無範圍說明、是否寫出發證機構

### Takeaway
這批公司實際擁有的認證只有 ISO/IEC 27001、27701、9001。沒有一家自己持有 SOC 2、CSA STAR 或 PCI DSS。Appier 提到 SOC 2，但那是 GCP／AWS 的認證。呈現形式從長文、卡片、徽章加一行說明，到單一徽章都有。只有 Vpon（BSI）和 Omnichat（SGS）在文字裡寫出發證機構，Appier 則是要點開證書圖片才看得到 SGS。

### Cited Findings
- **Appier**：自有 ISO/IEC 27001 和 ISO/IEC 27701，用文字段落加「Access Certificate:」連結呈現。Security 頁另有一組條列：「ISO 27001 certified Information Security Management System」「ISO 27701 certified Privacy Information Management System」「Regular third-party security audits and assessments」「Continuous compliance monitoring and improvement」。— [Appier Security](https://www.appier.com/trust-center-security); [Compliance](https://www.appier.com/trust-center-compliance)
- **Appier** 把雲端供應商的認證另列一行：「Powered by Google Cloud Platform (GCP) and Amazon Web Services (AWS)」「ISO 27001, 27017, 27018, and SOC 2 certified infrastructure」。— [Appier Security](https://www.appier.com/trust-center-security)
- **Appier 證書內容**（讀取證書圖片）：發證機構為「SGS United Kingdom Ltd」，有 UKAS 和 IAF 標誌。ISO/IEC 27001:2022 證書的範圍寫「Provision of information security and privacy management for the full lifecycle of Appier’s AI-powered, cloud-based marketing and advertising platforms — audience behavior platforms (AIQUA, AIXON, AiDeal, BotBonnie, Woopra, and AIRIS), creative generation platform (AdCreative.ai), and advertising platform (Ad Cloud)…」。— [Appier sgs-27001 證書圖](https://www.appier.com/hs-fs/hubfs/SGS_ISO_IEC%2027001_2022_TW2000009_EN_page-0001.jpg)
- **Appier** 的 27701 證書第 1 頁寫「The Scope of Registration appears on page 2 of this certificate」，標準為「ISO/IEC 27701:2019」。— [Appier sgs-27701](https://www.appier.com/en/sgs-27701)
- **Vpon**：ISO/IEC 27001 和 ISO/IEC 27701 各一張可展開的卡片，文字寫出 BSI 和範圍（「Data Platform and Advertising Delivery Platform」）。頁尾另有一張圖，alt 為「ISO-27001 資訊安全管理認證」。— [Vpon](https://www.vpon.com/en/security-profile/)
- **iKala**：資安頁只在文字裡寫 ISO/IEC 27001:2022，沒有徽章或證書。milestones 頁寫的是 BSI、範圍為「iKala CDP」、2013 年版、2021 年。— [iKala 中文](https://ikala.ai/zh-tw/information-security/); [milestones](https://ikala.ai/milestones-awards/)
- **Whoscall**：三張徽章卡（ISO 27001／27701／9001），每張有一行說明：「資訊安全管理系統，ISMS」「隱私資訊管理系統，PIMS」「品質管理系統，QMS」，下面是「下載證書」。頁面上沒有寫發證機構。— [Whoscall 中文](https://whoscall.com/zh-hant/security)
- **Crescendo Lab**：首頁只在文字裡帶到「ISO27001」，新聞稿有一張團隊手持證書的合照，圖說是「▲漸強實驗室執行長薛覲（右四）與工程團隊手持 ISO 27001 證書開心合影。」。新聞稿沒有寫發證機構、範圍或版本。— [漸強新聞稿](https://www.cresclab.com/tw/newsroom/iso27001)
- **Omnichat**：首頁一張徽章圖。部落格寫出 SGS 和 ISO/IEC 27001:2022，還用一段文字比較 2022 版和 2013 版的差異。SGS 新聞稿描述的範圍是「protecting both customer and employee information through comprehensive security management protocols」。— [Omnichat Blog](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/); [SGS HK](https://www.sgs.com/en-hk/news/2024/12/sgs-awards-iso-27001-information-security-management-systems-certification-to-omnichat-limited)

### Inferences
- 在台灣 martech 這一類，「27001＋27701」是第一梯隊的組合（Appier、Vpon、Gogolook 都有）。SOC 2 只在借用雲端供應商認證的時候出現。
- 寫出驗證機構時，Vpon 會加一句「a globally well-known third-party certification body」來強調機構的公信力。

### Gaps
- Gogolook 的證書 PDF 是掃描圖檔，無法擷取文字，因此發證機構、範圍、日期都還不知道。PDF 的 metadata 顯示掃描日期為 2023-11-22（Canon SC1001）。— [27001 PDF](https://files.gogolook.com/ISO:IEC%2027001-2022.pdf); [27701 PDF](https://files.gogolook.com/ISO27701-2019%20CERT.pdf)

---

## Q5. 是否寫出證書編號、發證日／到期日、稽核日

### Takeaway
網頁正文都沒有寫證書編號或到期日。Appier 和 Gogolook 讓讀者打開證書原件，資料寫在證書上。Appier 只在頁面上標了「Last Updated」。

### Cited Findings
- **Appier 27001 證書**：「Certificate TW20/00009」「This certificate is valid from 13 January 2026 until 13 January 2029 and remains valid subject to satisfactory surveillance audits.」「Issue 7. Certified since 13 January 2020」。— [Appier 27001 證書圖](https://www.appier.com/hs-fs/hubfs/SGS_ISO_IEC%2027001_2022_TW2000009_EN_page-0001.jpg)
- **Appier 27701 證書**：「Certificate TW25/00000990」「This certificate is valid from 21 July 2026 until 31 October 2028 and remains valid subject to satisfactory surveillance audits.」「Issue 3. Certified since 23 October 2025」。— [Appier 27701 證書圖](https://www.appier.com/hs-fs/hubfs/SGS_ISO_IEC%2027701_2019_TW2500000990_EN%20(1)-1.png)
- **Appier** 頁面只標「Last Updated: 2025/10/23」，正文沒有編號或日期。— [Appier Compliance](https://www.appier.com/trust-center-compliance)
- **Vpon、iKala、Crescendo Lab、Omnichat** 的頁面都沒有證書編號或有效期。iKala milestones 只寫了年份「2021」。— [Vpon](https://www.vpon.com/en/security-profile/); [iKala milestones](https://ikala.ai/milestones-awards/); [漸強](https://www.cresclab.com/tw/newsroom/iso27001); [Omnichat](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/)
- **新聞稿日期**：Omnichat 部落格 datePublished 為 2024-12-09，dateModified 為 2025-02-14（取自頁面 schema）。SGS 新聞網址的年月是 2024/12。Crescendo Lab 新聞稿在 2024 年 1 月發布，經 PR Newswire 發送；摘要模型讀到 cresclab 頁面上的日期是 2024-01-22，其他轉載稿是 1 月 24–25 日（未逐一核對）。— [Omnichat Blog](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/); [Kyodo PR Wire](https://kyodonewsprwire.jp/release/202401255746); [AAP](https://www.aap.com.au/aapreleases/cision20240124ae19990/)

### Inferences
- Vpon 頁面還寫著 ISO/IEC 27001:2013，但 2013 年版證書的轉版期限是 2025-10-31（一般 ISO 轉版規則）。所以要嘛文案過期，要嘛實際證書已經換成 2022 版。iKala milestones 的 2013 年版紀錄也一樣。這說明頁面不寫日期，很容易造成內容過期又沒人發現。
- Appier 的 27701 證書頁內容（2026-07 才生效的版本）比 Compliance 頁的「Last Updated」還新，表示證書子頁是另外更新的。

### Gaps
- Vpon、iKala、Crescendo Lab、Omnichat 的證書現在是否仍有效、是否已經換證，無法從官方頁面確認。

---

## Q6. 是否有下載證書、索取 SOC 2 報告、白皮書或聯絡資安團隊的 CTA

### Takeaway
只有 Appier（「Access Certificate:」）和 Whoscall（「下載證書」／「Download certificate」）提供證書原件。沒有一家提供 SOC 2 報告、資安白皮書、安全問卷或資安聯絡窗口。其他公司的 CTA 都導向業務諮詢。

### Cited Findings
- **Appier**：「Access Certificate: https://www.appier.com/en/sgs-27001」「Access Certificate: https://www.appier.com/en/sgs-27701」。信任中心頁底的 CTA 是業務導向：「Take the first step to engage your customers with our AI solution.」，按鈕「Contact Us」。— [Appier Compliance](https://www.appier.com/trust-center-compliance); [Trust Center](https://www.appier.com/trust-center)
- **Whoscall**：每張徽章卡下有「下載證書」，連到 PDF（`files.gogolook.com/ISO:IEC 27001-2022.pdf`、`ISO27701-2019 CERT.pdf`）。英文版是「Download certificate」。另一個 CTA 是「了解我們的隱私權政策」。— [Whoscall 中文](https://whoscall.com/zh-hant/security); [EN](https://whoscall.com/en/security)
- **Vpon**：頁面上只有「CONTACT US」，沒有證書下載。— [Vpon](https://www.vpon.com/en/security-profile/)
- **Omnichat 部落格**：文末 CTA 是「立即填表預約諮詢」和「預約諮詢」。— [Omnichat Blog](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/)
- **iKala、Crescendo Lab**：資安內容旁邊沒有任何資安相關的 CTA。— [iKala](https://ikala.ai/zh-tw/information-security/); [漸強](https://www.cresclab.com/tw)

### Inferences
- 「可下載證書」在這一類公司裡算少見，可以當成差異化做法。附上 PDF 或圖片，讓採購和資安審查人員自己核對證書編號與範圍。

### Gaps
- 沒有找到任何一家提供資安聯絡信箱、漏洞回報管道或 security.txt（沒有逐一檢查 `/.well-known/security.txt`）。

---

## Q7. 語氣：正式或口語；用「我們」還是公司名稱；有沒有第三方稽核、持續監控等說法

### Takeaway
整體語氣偏正式、偏企業。英文多用公司名稱當主詞再穿插「we/our」。中文新聞稿用第三人稱（「漸強實驗室表示」），官網段落則用「我們」。「第三方稽核」「持續監控」的說法以 Appier、Vpon 最明確。

### Cited Findings
- **Appier**：公司名和 we 混用，例如「Appier takes privacy and security with the utmost seriousness and continuously strives to earn and maintain your trust every day.」。也有稽核與監控的說法：「Regular third-party penetration testing by certified security firms」「Regular third-party security audits and assessments」「Continuous compliance monitoring and improvement」「Real-time monitoring with automated threat detection」。— [Appier Compliance](https://www.appier.com/trust-center-compliance); [Security](https://www.appier.com/trust-center-security)
- **Vpon**：全文用第三人稱「Vpon Big Data Group」，並強調「a thorough audit across up to 35 categories and 114 controls」。— [Vpon](https://www.vpon.com/en/security-profile/)
- **iKala**：中文用「我們」，偏政策公文語氣，例如「本政策適用於 iKala 所有部門、員工、承攬商及任何與本公司業務相關的第三方。我們將持續檢討與改進，確保資訊安全管理系統能與時俱進，應對不斷變化的資安威脅。」，也提到治理組織「資安管理委員會」和「PDCA（計畫-執行-查核-行動）」。— [iKala 中文](https://ikala.ai/zh-tw/information-security/)
- **Whoscall**：中文用產品名當主詞，語氣較親切，例如「Whoscall 將您的安全放在首位。…讓您使用更加安心。」；FAQ 用「我們」：「我們採用雙重加密機制：行動裝置採用 AES 加密，資料傳輸過程中使用 SSL 加密。」— [Whoscall 中文](https://whoscall.com/zh-hant/security)
- **Crescendo Lab**：首頁用「我們亦取得…」，新聞稿用第三人稱「漸強實驗室表示，作為一家「B2B2C」的 SaaS 供應商…」，並強調效能：「實現 99.9% 的訊息發送穩定度」。— [漸強首頁](https://www.cresclab.com/tw); [新聞稿](https://www.cresclab.com/tw/newsroom/iso27001)
- **Omnichat**：用「我們」，有一句持續監督的說法：「我們會定期進行合規更新與監督審核，確保服務質素符合各地數據隱私規範。」— [Omnichat Blog](https://blog.omnichat.ai/hk/omnichat-iso-270012022-certification-zh/)

### Inferences
- 中文資安文案常拿「銀行級」「國際級」「全球最高標準」當形容詞（漸強、Omnichat），但這類最高級說法沒有證據支撐。Appier 和 Vpon 則用具體數字或機制，例如「35 categories and 114 controls」「AES-256」「TLS 1.2/1.3」「MFA mandatory」。

### Gaps
- 無。

---

## Q8. 其他值得注意的寫法（FAQ、資料落地、次處理者清單、狀態頁、漏洞賞金）

### Takeaway
沒有一家公開次處理者清單、狀態頁或漏洞賞金計畫。常見的附加內容是加密規格、雲端基礎設施、隱私權法規（GDPR、CPRA、IAB TCF）和 FAQ。iKala 是唯一寫出資安治理藍圖（短中長期目標）的公司。

### Cited Findings
- **Appier** 的 Security 頁列出技術控制：「AES-256 encryption for all stored data」「TLS 1.2/1.3 encryption for all data transmissions」「Multi-factor authentication (MFA) mandatory for all access」「Complete data segregation between customers」「Automated security scanning in CI/CD pipelines」。Privacy 卡片提到 GDPR、CPRA 和 IAB Transparency and Consent Framework。— [Appier Security](https://www.appier.com/trust-center-security); [Appier Trust Center](https://www.appier.com/trust-center)
- **Appier** 的 Compliance 頁下方放了投資人資料：「Corporate Governance Report FY2021」，以及 Contact IR、ESG、Stock Quote 卡片。這是上市公司的做法。資料來自摘要模型的讀取，未逐字確認。— [Appier Compliance](https://www.appier.com/trust-center-compliance)
- **Whoscall** 有 FAQ 和隱私承諾小卡：「嚴格的資料控管」「完全匿名化」「不索取非必要權限」，例如「您的資料安全受到保障，我們絕不會出售或與第三方共享。」— [Whoscall 中文](https://whoscall.com/zh-hant/security)
- **iKala** 寫了三階段資安路線圖，例如中期「部署進階資安技術：導入 EDR 端點防護、規劃社交工程演練」、長期「整合風險管理：建立資安治理委員會」。— [iKala 中文](https://ikala.ai/zh-tw/information-security/)
- **Vpon** 把資安頁和三份隱私聲明（Privacy Policy、Data SDK、Website / Platform）放在同一個「Security & Trust Center」選單群組。— [Vpon](https://www.vpon.com/en/security-profile/)
- **Gogolook** 的資安事件揭露：2024 年 6 月 4 日依證交所規定發布重大訊息。這項資訊來自 iThome 鐵人賽文章，屬第三方來源，未讀取原文。— [iThome 鐵人賽](https://ithelp.ithome.com.tw/articles/10390996)

### Inferences
- 台灣 martech 的資安頁在「透明度設施」上還很少見，例如 sub-processor 清單、status page、security.txt、bug bounty、可索取 SOC 2 報告。只要 Jubo 提供其中任一項，就可以和同業做出區隔。
- 寫出具體的技術控制（加密、MFA、滲透測試頻率）比只放徽章更有說服力。Appier 是這類寫法裡最完整的範例。

### Gaps
- 沒有找到任何一家的資料落地（data residency）說明。Appier 只寫了 GCP／AWS，沒有寫區域。
