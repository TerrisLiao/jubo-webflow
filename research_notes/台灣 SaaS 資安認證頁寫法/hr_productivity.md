# 台灣 HR／生產力／流程 B2B SaaS 的資安・信任・認證頁寫法（2026-10-08 擷取）

範圍：MAYOHR（Apollo）、NUEIP 人易科技、104 資訊科技（HR Max）、Ragic（立即科技）、SurveyCake（新芽網路 25sprout）、KDAN 凱鈿（含點點簽 DottedSign）。
方法：官方頁面以 curl 抓取 HTML，再抽出純文字逐字引用（2026-10-08）。標「僅新聞」者表示沒有在官方頁面看到，未經驗證。
公司背景：Apollo XE 是 MAYOHR 的產品（`https://apolloxe.mayohr.com/` 由 mayohr.com 首頁連出），頁尾寫「© MAYO Human Capital Inc.」。中文公司名「鼎恒數位」只出現在新聞摘要中，本次沒有在官方頁面上核實。

## 1. 資安／信任頁的網址（或認證出現的位置）

### Takeaway
只有 KDAN 有完整的「信任中心」，Ragic 有完整的「Security at Ragic」說明頁。NUEIP、MAYOHR、SurveyCake 都沒有專門的認證頁，認證只以一個區塊、一張卡片或頁尾徽章出現在首頁、產品頁或企業版頁。104 沒有找到任何對外的產品資安頁。

### Cited Findings
- **KDAN 凱鈿**：信任中心中文版 `https://www.kdan.com/zh-tw/about/trust-center`、英文版 `https://www.kdan.com/about/trust-center`，另有一頁服務安全性 `https://www.kdan.com/zh-tw/security`（頁尾連結文字為「服務安全性」）— [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **點點簽 DottedSign**（KDAN 旗下產品）：產品自己的認證頁，中文版 `https://www.dottedsign.com/zh-tw/trust/security-certifications`（title：「安全、合法且符合國際級資安規範的電子簽名解決方案 | 點點簽」），英文版 `https://www.dottedsign.com/trust/security-certifications`（title：「Sign with Advanced Security and Data Protection | DottedSign」）— [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)；[DottedSign EN](https://www.dottedsign.com/trust/security-certifications)
- **Ragic**：知識庫頁「Security at Ragic」`https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic`，另有行銷頁，英文 `https://www.ragic.com/intl/en/product-cloud-security`、中文 `https://www.ragic.com/intl/zh-TW/product-cloud-security`。中文知識庫網址 `/intl/zh-TW/doc-kb/22/` 回應 404 — [Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)；[Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)
- **NUEIP**：認證放在首頁區塊「ISO27001國際資安認證」，頁尾也有 ISO 徽章。另有一頁「資安政策」`https://www.nueip.com/securitypolicy`（英文 `https://www.nueip.com/en/securitypolicy`），但只是政策條文，本文沒有提到 ISO — [NUEIP 首頁](https://www.nueip.com/)；[NUEIP 資安政策](https://www.nueip.com/securitypolicy)
- **MAYOHR / Apollo**：首頁沒有資安頁連結。認證只出現在 Apollo 產品頁的一張功能卡「頂規資安防護」中，關於我們頁的使命卡「責任管理」也有提到資安 — [Apollo 產品頁](https://www.mayohr.com/tw/product/Apollo)；[MAYOHR 關於我們](https://www.mayohr.com/tw/about)
- **SurveyCake**：沒有資安頁。全站頁尾放了 BSI「ISO/IEC 27001 資訊安全管理 CERTIFIED」徽章（img alt 為空）。認證文案只出現在企業版頁與金融產業頁 — [SurveyCake 企業版](https://www.surveycake.com/enterprise)；[SurveyCake 金融保險業](https://www.surveycake.com/industries/finance-and-insurance-services)
- **104 資訊科技**：corp.104.com.tw 是 JS 單頁應用，curl 拿不到內容（ESG、IR 路徑都只回傳 1,178 bytes 的空殼）。搜尋也沒有找到 104 或 HR Max 的產品資安認證頁。ISO 27001 的說法只出現在新聞稿 — [鉅亨網 2026-01-20](https://news.cnyes.com/news/id/6316667)

### Inferences
- 台灣 HR SaaS（NUEIP、MAYO）多半把 ISO 27001 當作首頁或產品頁上的一個「賣點區塊」，不是獨立的 Trust Center。只有已上櫃、主攻國際市場的 KDAN，以及以海外用戶為主的 Ragic，才有成熟的 trust／security 頁。

### Gaps
- 104 官網（corp.104.com.tw）需要瀏覽器渲染，沒有取得 ESG／資安頁原文。也沒有確認 HR Max 產品頁是否有認證區塊。
- Ragic 的中文版 Security KB 實際網址沒有找到，只取得中文行銷頁。

## 2. 區塊標題與副標（逐字）

### Takeaway
最常見的寫法是「國際＋資安＋認證」或「國際產業標準＋合規」。KDAN 和點點簽用 H2 總標，底下每張卡片的 H3 是「標準名＋中文全名」。Ragic 直接用「通過 ISO/IEC 27001」。HR 業者（NUEIP、MAYO）則把認證包裝成形容詞式標題，例如「國際資安認證」「頂規資安防護」。

### Cited Findings
- **KDAN 信任中心（中）**：H1「信任中心」。H2「探索 KDAN 的法律政策，全面保障您的使用安全」。認證區 H2「採用且符合多項國際產業標準與合規要求」，卡片 H3 依序為「歐盟一般資料保護規則」「ISO 27001 資訊安全管理系統」「ISO 27017 雲端服務資訊安全管理」「ISO 27018 雲端服務個人資料保護」「加州消費者隱私保護法 (CCPA)」「美國健康保險流通與責任法案 (HIPAA)」。資源區 H2「其他資源」— [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **KDAN 信任中心（英）**：H1「Trust Center」、H2「Adhering to International Standards and Compliance」，卡片 H3 為「ISO 27001」「ISO 27017」「ISO 27018」，H2「Resources」— [KDAN Trust Center](https://www.kdan.com/about/trust-center)
- **點點簽（中）**：H1「領先資安科技，守護您的簽署資訊」。認證區 H2「透過精密的技術構築嚴密的資訊安全」，卡片 H3 為「ISO/IEC 27001認證」「ISO/IEC 27017雲端安全管理」「ISO/IEC 27018」「CSA STAR 認證」「台灣電子簽章解決方案服務能量登錄」「日本法務省認證電子簽章」「AWS 架構完善框架」「AWS 認證軟體服務」等。技術措施區 H2「卓越的技術，升級簽署安全性」— [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **點點簽（英）**：H2 包括「Secure Your Signature with Advanced Security and Protection」「Setting the Bar High with Unwavering Standards」「Safeguarding Every Signature with Top-Notch Security」— [DottedSign EN](https://www.dottedsign.com/trust/security-certifications)
- **Ragic 行銷頁（中）**：H2「雲端安全有保障」，副標「Ragic 用多重機制守護你的資料與隱私」。三張卡片的 H3 為「資料保護」「支援地端」「合規認證」，「合規認證」卡內文為「ISO 27001、Privacy Shield 認證、GDPR、HIPAA 合規」。之後的 H2「通過 ISO/IEC 27001」— [Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)
- **Ragic 行銷頁（英）**：H2「Cloud Security, Guaranteed」，H3「Security Standards」，H2「ISO/IEC 27001 Information Security」— [Ragic Cloud Security](https://www.ragic.com/intl/en/product-cloud-security)
- **Ragic KB**：H1「Security at Ragic」，H2「Certification」，H3「ISO 27001 Information Security」「Data Privacy Framework」，H2「Compliance」— [Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **NUEIP 首頁**：H2「ISO27001國際資安認證」，前一個區塊 H2 為「技術聯盟合作夥伴」（Google Cloud）— [NUEIP 首頁](https://www.nueip.com/)
- **NUEIP 資安政策頁**：H1「NUEIP 資安政策」，條文 H3 為「第一條：政策目的與承諾」到「第五條：審查與更新」— [NUEIP 資安政策](https://www.nueip.com/securitypolicy)
- **MAYOHR Apollo**：功能卡 H3「頂規資安防護」，圖示 alt 為「Apollo獲得國際級資安認證」— [Apollo 產品頁](https://www.mayohr.com/tw/product/Apollo)
- **SurveyCake 企業版**：hero 下方 H4「高資安防護，確保資料安全」。H2「高階資安、深度整合，滿足企業的需要」，FEATURE 01 H3「金融認證高規格資安」，副標「全方位守護每一筆填答隱私」— [SurveyCake 企業版](https://www.surveycake.com/enterprise)
- **SurveyCake 金融頁**：H3「資安題型 × 問卷防護機制｜安全防護資料安全」「合規配套支援 × 彈性雲端｜滿足金融產業資安要求」— [SurveyCake 金融保險業](https://www.surveycake.com/industries/finance-and-insurance-services)

### Inferences
- 中文標題常用「國際」「頂規」「高規格」「金融級」這類程度詞，很少直接寫「第三方稽核」。英文版（KDAN、Ragic）的標題則比較中性，例如「Certification」「Adhering to International Standards and Compliance」。

### Gaps
- 無。

## 3. 認證周邊的說明文案（逐字）

### Takeaway
說明文案的公式幾乎固定：「〔公司〕通過／符合 ISO XXXX，〔建立系統化管理〕，〔保障客戶資料／降低風險〕」，一到兩句。KDAN 對 27001 用「通過」，對 27017／27018 用「符合」。點點簽英文版則全部用「certified」。

### Cited Findings
- **KDAN（中）ISO 27001**：「KDAN 通過 ISO 27001，建立國際標準資安管理系統，全面識別、管理並降低資安風險。」— [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **KDAN（中）ISO 27017**：「KDAN 符合 ISO 27017，產品與服務的資安、風險管理皆符合國際標準，確保客戶的雲端環境不會受到快速變化的網路威脅。」— [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **KDAN（中）ISO 27018**：「KDAN 符合 ISO 27018，我們保證嚴格的隱私防護措施、數據處理透明度，並防止任何未經授權的存取。」— [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **KDAN（中）hero**：「我們致力於守護您的資訊安全與隱私，並採用企業級國際安全防護與合規措施，確保您對資料擁有完全掌控權。」— [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **KDAN（英）**：「KDAN is ISO 27001 certified, establishing an international-standard security management system to identify, manage, and mitigate security risks.」「KDAN complies with ISO 27017, the international standard for cloud service information security management.」— [KDAN Trust Center](https://www.kdan.com/about/trust-center)
- **點點簽（中）認證區副標**：「點點簽採用多層安全保護，符合多項國際產業標準和合規要求，讓您隨時隨地放心簽署。」— [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **點點簽（中）ISO/IEC 27001**：「點點簽高度重視資料安全，通過 ISO/IEC 27001 認證—國際資訊安全管理標準，證明點點簽在資訊安全風險管理的成熟度與承諾。」— 同上
- **點點簽（中）ISO/IEC 27017**：「點點簽符合 ISO/IEC 27017 雲端運算產業資訊安全管理的國際標準，展現了我們在雲端資安管理上的承諾。此認證強化點點簽的雲端安全管理機制，降低潛在風險，進一步保護使用者的雲端數據安全。」— 同上
- **點點簽（中）ISO/IEC 27018**：「點點簽符合 ISO/IEC 27018 標準—國際認可的公有雲PII處理者保護個人識別資訊標準。遵循此國際標準，點點簽在服務中實踐了個人資料保護及維護用戶隱私的承諾……」— 同上
- **點點簽（中）CSA STAR**：「由雲端安全聯盟（Cloud Security Alliance, CSA）創立的安全性、信任、保證與風險（STAR）計劃，是業界最具影響力的雲端安全框架。點點簽遵循共識評估倡議問卷（Consensus Assessments Initiative Questionnaire, CAIQ）所規範之要求及雲端資安管控措施記錄，展現我們對於實踐資訊透明、嚴格稽核、雲端安全與資料隱私等方面的堅定承諾。」— 同上
- **點點簽（英）ISO/IEC 27001**：「DottedSign takes data security seriously. It is ISO/IEC 27001 certified and recognized by information security management systems. By conforming with ISO/IEC 27001, DottedSign demonstrates that its data security risk management framework is built upon top-notch practices.」— [DottedSign EN](https://www.dottedsign.com/trust/security-certifications)
- **Ragic（中）**：「Ragic 已取得 ISO/IEC 27001：2022 認證，遵循相關資安流程。」— [Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)
- **Ragic（英 KB）**：先介紹標準本身，「ISO/IEC 27001 is a global standard for managing information security, introduced by ISO and IEC in 2005 and updated in 2013 and 2022. It provides guidelines for creating and continually improving an Information Security Management System (ISMS)...」，接著是「Ragic has been certified with the ISO/IEC 27001:2022 standard. We implement information security protection and prevention measures following relevant governance methods.」— [Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **NUEIP**：「NUEIP人易科技擁有國際級 ISO27001 認證，透過系統化的資訊安全管理制度，嚴格把關資訊的安全性與穩定性，為企業鞏固資安的強力防護網，達到永續經營的目標。」前一區塊為「NUEIP雲端企業管理系統之架構部署、儲存運算、資安控管等相關技術，皆與 Google Cloud 雲端運算服務夥伴緊密合作，帶給您最值得信任的雲端企業管理平台。」— [NUEIP 首頁](https://www.nueip.com/)
- **MAYOHR Apollo**：卡片內文只有一串名詞：「ISO27001認證、IMPERVA WAF雲端防火牆、TDE透明資料加密、DR跨四地備份與災難復原、定期第三方滲透測試。」產品介紹另有「Apollo 雲端人資系統擁有國際頂尖的資安防護，讓企業能安心無虞地專注在經營與擴張。」— [Apollo 產品頁](https://www.mayohr.com/tw/product/Apollo)
- **MAYOHR 關於我們**：「責任管理：資訊安全由我們為你把關，這是作為SaaS系統服務商最重要的一環。」— [MAYOHR 關於我們](https://www.mayohr.com/tw/about)
- **SurveyCake 企業版**：「獲取 ISO 認證，保護您的資料安全。」（沒有寫是哪一項 ISO）。另有「SurveyCake 提供企業級資安防護與完整合規配套，協助企業安心蒐集敏感資料，全面支援資安需求，配合內部合規流程。」條列為「配合企業需求，提供資安報告與合規文件／依據企業規範，定期進行資安檢測／彈性雲端部署，支援代建代管雲端主機」— [SurveyCake 企業版](https://www.surveycake.com/enterprise)

### Inferences
- 「通過」和「符合」混用：KDAN 對 27017／27018 用「符合」，點點簽英文卻寫「certified」，中英措辭的強度不一致。寫文案時要依實際證書範圍選字。
- MAYO 的「名詞堆疊」卡片（ISO＋WAF＋加密＋備援＋滲透測試）資訊密度最高，但沒有任何解釋。

### Gaps
- 無。

## 4. 列出哪些認證、呈現形式、範圍聲明、驗證機構

### Takeaway
ISO 27001 是共同標配。KDAN 和點點簽再加 27017、27018；點點簽另有 CSA STAR（Level 1 徽章、CAIQ 自評）。本次涵蓋的公司沒有一家在官網聲稱 ISO 27701 或 SOC 2。版面多為「徽章／圖示＋標題＋一句說明」卡片；SurveyCake 只有頁尾徽章。官方頁面都沒有寫範圍聲明（scope）。驗證機構通常只出現在新聞稿或徽章圖上（BSI 最常見）。

### Cited Findings
- **KDAN**：卡片式。每張卡有 license 圖（`license_1.png`～`license_6.png`）、H3 和一句說明，再加「了解更多」，連到部落格新聞稿。信任中心沒有寫驗證機構 — [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **KDAN 驗證機構（官方部落格）**：ISO 27001 授證照片說明為「ISO27001授證儀式：凱鈿商務開發副總經理張博瀚與BSI行銷部協理簡慧伶」，輔導顧問為「領導力企業管理顧問有限公司」。27017／27018 授證照片說明為「凱鈿點點簽事業群副總經理張博瀚(中)、勤業眾信確信服務協理周哲賢(左)、BSI企業服務部副協理林應祥(右)」— [KDAN ISO27001 新聞](https://www.kdan.com/zh-tw/blog/about/iso27001/)；[KDAN ISO27017/27018 新聞](https://www.kdan.com/zh-tw/blog/about/iso27017-27018/)
- **KDAN 範圍說法（新聞稿，非信任中心）**：「我們建立了涵蓋基礎架構（ISO 27001）、雲端控管（ISO 27017）及個人隱私資料保護（ISO 27018）的三重資安防護體系」，並自稱「台灣少數同時擁有三項國際資訊安全標準認證的軟體公司之一」— [KDAN ISO27017/27018 新聞](https://www.kdan.com/zh-tw/blog/about/iso27017-27018/)
- **點點簽**：11 張以上的卡片（附「顯示更多」）。合規法規（GDPR、HIPAA、CCPA）、ISO 標準、政府資格（台灣數位發展部「電子簽章解決方案服務能量登錄」、日本法務省）、雲端夥伴資格（AWS Well-Architected、AWS FTR Qualified Software）、CSA STAR 都放在同一層級。CSA STAR 圖檔名為 `csa-star-level-1-badge.webp`，「瞭解更多」連到 CSA STAR Registry — [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **Ragic**：中文行銷頁先用三張卡片摘要，再放一個 ISO/IEC 27001 區塊，附證書圖片（檔名含「IEC 27001 資通安全-2025」）和「點此下載證書」。KB 頁在「Certification」下列 ISO 27001 和 Data Privacy Framework，「Compliance」下列 GDPR 和 HIPAA。另在「Physical Server Security」寫明雲端供應商（Google、AWS）的「Annual audits for the following standards: ISO 27001, SOC1, SSAE16 / ISAE 3402 Type II: SOC 2, SOC 3, PCI DSS v3.0」，與 Ragic 自身的認證分開列 — [Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)；[Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **Ragic 驗證機構**：頁面沒有寫機構名，只請讀者到 globalcertdb.org 搜尋「Ragic」— [Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **NUEIP**：H2＋一段文字＋徽章圖（`Afaq-ISO27001.png`，紫色「afaq ISO 27001 Information Security」標誌）＋「了解更多」。「了解更多」外連到 INSIDE 的 2022 年報導，不是官方證書 — [NUEIP 首頁](https://www.nueip.com/)
- **NUEIP 驗證機構（僅新聞）**：2022-12 的報導說取得「ISO / IEC 27001:2013」，由「BSI 資深經理陳承恩授予證書」— [工商時報](https://www.ctee.com.tw/news/20221228700821-431202)；[INSIDE](https://www.inside.com.tw/article/30213-NUEIP)。官網徽章是 AFNOR 的 afaq 標誌，與新聞寫的 BSI 不一致（見 Inferences）。
- **MAYOHR**：沒有徽章，認證只是功能卡裡的文字。驗證機構只見於新聞：SGS 頒發、資誠 PwC 輔導，自稱「微軟Azure合作夥伴中，第一個通過ISO27001認證的人資SaaS解決方案」— [工商時報（僅新聞）](https://ctee.com.tw/industrynews/247839.html)
- **SurveyCake**：頁尾放 BSI Kitemark 樣式徽章，圖上文字為「bsi. ISO/IEC 27001 資訊安全管理 CERTIFIED」，沒有 alt 文字也沒有連結。企業版頁的文案只寫「ISO 認證」— [SurveyCake 首頁](https://www.surveycake.com/)；[SurveyCake 企業版](https://www.surveycake.com/enterprise)
- **104**：新聞稿寫「該公司內部作業嚴格遵循 ISO 27001 等多項國際資安標準，並已連續在 2022 年、2023 年榮獲 TCSA 台灣企業永續獎資訊安全領袖獎」，另於 2026-01 宣布加入 FIRST — [鉅亨網 2026-01-20](https://news.cnyes.com/news/id/6316667)

### Inferences
- NUEIP 官網用的是 afaq（AFNOR）徽章，但 2022 年新聞說證書由 BSI 授予。可能已換驗證機構，也可能只是徽章素材誤用。無法驗證，copywriter 不應拿這個例子當作「正確放徽章」的範本。
- 本次 6 家都沒有在官網聲稱 ISO 27701 或 SOC 2。在台灣 HR／生產力 SaaS 中，27701 和 SOC 2 目前不是常見的對外訴求，KDAN 的 27017／27018 已經算是同類中層級最高的組合。

### Gaps
- 沒有任何一家在官方頁面寫出 ISO 27001 的適用範圍（scope／SoA）。
- Ragic 的驗證機構無法從頁面得知（globalcertdb 證書圖沒有逐一開啟）。

## 5. 是否揭露證書編號、發證／到期日、稽核日期

### Takeaway
幾乎都不揭露。只有 Ragic 提供證書下載（間接揭露編號和日期），版本號也寫到「:2022」。KDAN 和 NUEIP 的版本、日期只能從新聞稿推算，官方頁面上的版本也可能已經過時。

### Cited Findings
- **Ragic**：寫明「ISO/IEC 27001:2022」，提供下載連結（英文 KB 連到 `ragic.com/sims/file.jsp?...ISO27001證書_Ragic_USA.pdf`，中文頁連到 `globalcertdb.org/certification/..._TW.jpg`，連結文字「點此下載證書」），證書圖檔名含「2025」— [Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)；[Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **KDAN／點點簽**：信任中心和點點簽認證頁都沒有證書編號或日期。點點簽頁唯一的編號是台灣電子簽章能量登錄 PDF 檔名「113-電簽-0003」。版本與日期只在新聞稿：ISO 27001:2013 公告於 2023-03-28；2025-03-12 公告「ISO 27001:2022、ISO 27017與ISO 27018」— [KDAN ISO27001 新聞](https://www.kdan.com/zh-tw/blog/about/iso27001/)；[KDAN ISO27017/27018 新聞](https://www.kdan.com/zh-tw/blog/about/iso27017-27018/)；[DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **NUEIP**：官網沒有版本、編號或日期。首頁媒體區把該則新聞標為 2022-12-29（INSIDE）— [NUEIP 首頁](https://www.nueip.com/)
- **MAYOHR、SurveyCake、104**：官網都沒有編號或日期 — [Apollo 產品頁](https://www.mayohr.com/tw/product/Apollo)；[SurveyCake 企業版](https://www.surveycake.com/enterprise)

### Inferences
- 以 ISO 證書三年效期推算，NUEIP 2022-12 取得的 27001:2013 證書已過效期，又必須在 2025-10-31 前轉版到 2022 版。官網沒有更新任何日期或版本，外界無法從頁面判斷證書是否仍有效。（推論，未查證書狀態）

### Gaps
- 沒有查詢 BSI、SGS 證書資料庫來核實各家證書的現行狀態。

## 6. CTA：下載證書、SOC 報告、白皮書、聯絡

### Takeaway
最成熟的是 Ragic（直接下載證書，並引導到第三方資料庫自行查證）和 KDAN（「其他資源」區提供 DPA、AWS 責任共擔模型 PDF 下載，結尾放「聯絡我們」）。SurveyCake 改走「需要時向業務索取」：可提供 ISO 認證文件、資安報告、弱掃紀錄。HR 業者（NUEIP、MAYO）的 CTA 只有外連新聞或一般的預約諮詢。

### Cited Findings
- **Ragic**：中文「點此下載證書」，英文「You can search for "Ragic" at this link for relevant information and click here to download the certificate.」。DPF 則是「點此並搜尋 Ragic 以查看公開紀錄」— [Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)；[Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **KDAN**：「其他資源」列出「資料處理協議 下載檔案」「第三方套件與開源聲明 下載檔案」「AWS 雲端資訊安全責任共擔模型 下載檔案」「凱鈿商標使用規範 下載檔案」「防詐騙提醒 了解更多」，結尾為「選擇 KDAN，讓我們守護您的資訊安全」加「聯絡我們」（連到 `/zh-tw/contact?contact=others`）。每張認證卡都是「了解更多」，連到新聞稿 — [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **點點簽**：頂部與結尾都是「聯繫專人」「立即開始」，CSA STAR 卡的「瞭解更多」連到 CSA Registry，另有「資安指南與服務濫用檢舉」區 — [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **SurveyCake 企業版 FAQ**：問「SurveyCake ENTERPRISE 能提供哪些資安合規文件配合 IT 審核？」，答「SurveyCake Enterprise 可提供 ISO 認證文件、資安報告與弱點掃描紀錄，配合企業 IT 或法遵部門的採購審核流程。對於需要定期提交合規文件的金融業或醫療業，SurveyCake 可依企業內部規範安排定期資安檢測並出具書面紀錄。」CTA 為「預約試用」— [SurveyCake 企業版](https://www.surveycake.com/enterprise)
- **SurveyCake 金融頁**：「無論是招標、弱掃報告或雲端部署要求，皆可彈性配合。」「支援資安問卷填寫與資安政策文件提供」「提供完整的弱點掃描、壓力測試報告，符合企業需求」，CTA 為「立即諮詢」— [SurveyCake 金融保險業](https://www.surveycake.com/industries/finance-and-insurance-services)
- **NUEIP**：認證區塊的「了解更多」外連到 INSIDE 報導，頁尾 CTA 為「預約顧問諮詢」— [NUEIP 首頁](https://www.nueip.com/)
- **MAYOHR**：資安卡片沒有 CTA — [Apollo 產品頁](https://www.mayohr.com/tw/product/Apollo)

### Inferences
- 沒有一家提供 SOC 2 報告或資安白皮書的索取流程。KDAN 的白皮書入口是 AI 主題，與資安無關。最接近 B2B 採購需求的寫法是 SurveyCake 的 FAQ：直接回答「IT 審核需要哪些文件」。

### Gaps
- 無。

## 7. 語氣：正式或口語、「我們」或公司名、第三方稽核與持續改善的說法

### Takeaway
多數用公司名或品牌名當主詞（「KDAN 通過…」「點點簽符合…」「NUEIP人易科技擁有…」「Ragic 已取得…」），只在承諾句才轉成「我們」。語氣正式偏行銷，常用「國際級」「頂規」「金融級」「最高規格」這類強化詞。只有 MAYO 明講「第三方滲透測試」，只有 NUEIP 的政策頁寫出「定期審查」這類持續改善機制。

### Cited Findings
- **KDAN**：認證卡以公司名開頭，hero 句用「我們致力於守護您的資訊安全與隱私」。結尾口號「選擇 KDAN，讓我們守護您的資訊安全」— [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **點點簽**：品牌名與「我們」混用，例如「展現了我們在雲端資安管理上的承諾」。CSA 卡寫「實踐資訊透明、嚴格稽核」— [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **KDAN 新聞稿（持續改善）**：「我們將持續秉持……同時提升資安防護機制及企業內部的資安意識」，並解釋 ISO 27001「要求組織建立、實施、維護和持續改進資訊安全管理系統」— [KDAN ISO27001 新聞](https://www.kdan.com/zh-tw/blog/about/iso27001/)
- **Ragic**：中文行銷頁用「你」（「Ragic 用多重機制守護你的資料與隱私」），語氣最口語。英文 KB 偏技術說明，第一人稱用「We implement information security protection and prevention measures following relevant governance methods.」— [Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)；[Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **MAYOHR**：用「你」（「資訊安全由我們為你把關」），強化詞為「頂規」「國際頂尖」。第三方說法為「定期第三方滲透測試」— [MAYOHR 關於我們](https://www.mayohr.com/tw/about)；[Apollo 產品頁](https://www.mayohr.com/tw/product/Apollo)
- **NUEIP 資安政策頁**：法規條文式、最正式，「本公司致力於提供安全、穩定且值得信賴的服務。」「全體同仁每年皆須接受資訊安全教育訓練」「本政策由資訊安全委員會定期審查，並隨法規、技術及業務之變更進行最適修訂」— [NUEIP 資安政策](https://www.nueip.com/securitypolicy)
- **SurveyCake**：強化詞為「高規格」「金融認證高規格資安」「最高資安規格」，持續性說法為「依據企業規範，定期進行資安檢測」— [SurveyCake 企業版](https://www.surveycake.com/enterprise)；[SurveyCake 金融保險業](https://www.surveycake.com/industries/finance-and-insurance-services)

### Inferences
- 「金融認證高規格資安」（SurveyCake）的標題容易被讀成「取得某種金融認證」，但頁面上沒有對應的認證名稱，有誤導風險。寫標題時應避免拿「認證」修飾沒有對應證書的形容詞。

### Gaps
- 無。

## 8. 其他值得注意的寫法

### Takeaway
常見的配套寫法有：搭上雲端大廠（Google Cloud、AWS、Azure）的信任、具體的加密規格、備份與異地備援、私有雲或地端部署選項、海外資料落地（Ragic 的歐洲機房）、FAQ 回答 IT 審查問題、政府資格（電子簽章能量登錄）、HIPAA。本次 6 家都沒有強調「資料存放在台灣」。

### Cited Findings
- **加密規格**：點點簽「點點簽的簽署流程經過TLS/SSL、AES-256和RSA-2048等多重加密」。KDAN 服務安全性頁寫「我們採用 CloudFront TLSv1.2_2021 版本……來保護資料」「每天皆會備份所有資料。備份之資料經加密後發配至各個位置，且會保留30 天。」— [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)；[KDAN 服務安全性](https://www.kdan.com/zh-tw/security)
- **Ragic 技術細節**：「All data written to disk is encrypted on the fly and then transmitted and stored in encrypted form.」「All data transmissions support bank level HTTPS/SSL encryption.」。資料落地：「We have European servers located in Belgium and Ireland.」。另聲稱「Ragic complies with the Health Insurance Portability and Accountability Act (HIPAA)」— [Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic)
- **雲端夥伴背書**：NUEIP 寫「皆與 Google Cloud 雲端運算服務夥伴緊密合作」，並連到 Google Cloud 客戶案例。點點簽寫「AWS 認證軟體服務……通過基礎技術審核（FTR）作為Qualified Software」— [NUEIP 首頁](https://www.nueip.com/)；[DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **部署彈性**：SurveyCake 寫「SurveyCake Enterprise 支援 AWS 私有雲或企業自有主機部署，讓資料存放位置由企業自行決定，不經過共用伺服器。此選項特別適合對雲端部署規範有嚴格要求的金融機構、醫療院所與公部門組織。」Ragic 卡片寫「支援地端：提供私有主機版本」— [SurveyCake 企業版](https://www.surveycake.com/enterprise)；[Ragic 雲端安全（中）](https://www.ragic.com/intl/zh-TW/product-cloud-security)
- **個資加密功能**：SurveyCake 寫「提供個資加密題型，填答者輸入的敏感資訊（如：身分證字號、病歷號碼）在傳輸與儲存過程中均經過加密處理。」— [SurveyCake 企業版](https://www.surveycake.com/enterprise)
- **政府、法遵資格**：點點簽寫「點點簽通過台灣數位發展部「電子簽章解決方案服務能量登錄」審核，為政府認證之電子簽章合格廠商。符合台灣《電子簽章法》，且由政府核可的第三方憑證機構（中華電信快意簽）簽發數位憑證」。NUEIP 政策寫「嚴格遵守國家相關法律法規（如個人資料保護法）。」— [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)；[NUEIP 資安政策](https://www.nueip.com/securitypolicy)
- **HIPAA 加適用範圍註記**：KDAN 在 CCPA、HIPAA 卡片上註明「（目前適用於點點簽 DottedSign）」，是本次唯一出現的範圍限定寫法 — [KDAN 信任中心](https://www.kdan.com/zh-tw/about/trust-center)
- **社會證明併列**：點點簽在認證後接著放「獲全球百萬用戶信賴」和評分（96% 符合需求、99% 優良企業夥伴）— [DottedSign 中文](https://www.dottedsign.com/zh-tw/trust/security-certifications)
- **MAYO 的 2023 年說法（僅新聞）**：Microsoft Azure、Imperva 防火牆、四地備援、每年一次第三方滲透測試 — [數位時代（僅新聞）](https://www.bnext.com.tw/article/77885/mayohr2023)
- **104 的反例**：2026-10-06 重大訊息揭露「偵測到 App 系統出現異常讀取情形，經調查確認，約有 12 萬筆履歷資料遭未經授權讀取」，公司「結合外部公正第三方資安機構進行鑑識與強化作業」。同年 1 月才宣布加入 FIRST，並稱遵循 ISO 27001 — [TechNews 2026-10-06](https://finance.technews.tw/2026/10/06/104-corporation-hacked/)；[鉅亨網 2026-01-20](https://news.cnyes.com/news/id/6316667)

### Inferences
- 對健康照護 SaaS（Jubo）可以借鏡的寫法：(1) Ragic 的「下載證書＋第三方資料庫查證」；(2) KDAN 的「適用範圍註記」，例如「（目前適用於○○產品）」；(3) SurveyCake 的 FAQ「能提供哪些資安合規文件配合 IT 審核」。應避免的寫法：沒有對應證書的「金融認證」字樣、徽章與驗證機構不一致、只外連新聞報導當證明。
- 104 事件顯示，只寫「遵循 ISO 27001」並不能保證不出事。資安頁宣稱的強度應與實際範圍相符，避免使用「零風險」「最高」這類絕對語。

### Gaps
- 沒有找到 MAYO 現行官方頁面上的 SGS、Azure 字樣（只見於新聞）。
- 1111、喬睿 eHRMS 未調查：已有 6 家（含點點簽為 7 個頁面），時間有限。
