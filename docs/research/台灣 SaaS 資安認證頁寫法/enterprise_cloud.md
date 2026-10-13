# 台灣企業軟體／雲端／資安廠商的資安認證頁寫法（enterprise_cloud）

研究日期：2026-10-08。方法：直接 `curl` 官方頁面原始 HTML 並抽出文字（引文為從 HTML 逐字抽出，非 AI 摘要）；無法取得官方頁面的部分僅有搜尋引擎摘要，已標為「未驗證」。
涵蓋公司：趨勢科技 Trend Micro、叡揚資訊 GSS（Vital SaaS）、網擎資訊 Openfind（MailCloud）、萬里雲 CloudMile、精誠資訊 SYSTEX、宏碁集團（宏碁資訊／宏碁資安 ACSI）、中華電信 hicloud（替代）。

---

## Q1. 各公司的信任／資安／認證頁網址

### Takeaway
只有趨勢科技有完整的 Trust Center 合規頁（中英對照）。叡揚與網擎把認證放在產品官網首頁的一個區塊，或一條 banner。萬里雲只放了一份 ISMS 政策文件頁。精誠、宏碁、hicloud 的官方認證頁這次都沒抓到。

### Cited Findings
- **趨勢科技（中文）**：頁面標題「法規遵循 - Trust Center | 趨勢科技」，位於 Trust Center 導覽下（分頁：隱私權／法規遵循／公司形象／資安實務原則／產品與服務）。 — [Trend Micro TW Compliance](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- **趨勢科技（英文）**：頁面標題 "Compliance - Trust Center | Trend Micro (US)"。 — [Trend Micro US Compliance](https://www.trendmicro.com/en_us/about/trust-center/compliance.html)
- **叡揚 Vital SaaS**：沒有獨立的資安頁。gsscloud.com 會導向 /tw/，首頁有一個 `<section class="section-iso section-iso--home" id="iso">` 區塊，可用錨點 `#iso` 直接連到；footer 也有 4 個 ISO 圖示連到證書 PDF。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)
- **網擎 MailCloud**：同樣沒有獨立的資安頁。認證出現在 MailCloud 產品官網首頁的輪播 banner 和功能區塊，並放了一個 SGS 標誌。 — [mailcloud.com.tw/web](https://www.mailcloud.com.tw/web/)
- **網擎集團官網**：首頁有一條產品 banner 寫「符合 ISO 27001 認證 安全分享、隨時存取」，這次沒找到認證專頁。 — [openfind.com.tw/taiwan](https://www.openfind.com.tw/taiwan/)
- **萬里雲 CloudMile**：footer 的「資訊安全政策」連到 /tw/security（英文版 /en/security）。內容是 ISMS 政策全文，沒有認證區塊。 — [cloudmile.ai/tw/security](https://cloudmile.ai/tw/security)；[cloudmile.ai/en/security](https://cloudmile.ai/en/security)
- **精誠 SYSTEX**：tw.systex.com 是 JS 渲染的頁面（抓到的 HTML 只有 5.5KB 外殼），公司簡介 PDF 也抓不回來。沒找到可驗證的認證專頁網址。 — [tw.systex.com](https://tw.systex.com/)
- **宏碁資安 ACSI**：www.acsi.com.tw 的連線被本環境 proxy 拒絕（connect_rejected），沒能讀取。
- **中華電信 hicloud**：hicloud.hinet.net 會導向 cloud.hinet.net/hicloud/index.html，內容只有 1.7KB 的 JS 外殼，沒抓到資安頁。

### Inferences
- 真正做成 Trust Center 的只有規模最大的跨國廠商（趨勢）。中型 SaaS 的常見做法是把認證放在首頁的「信任區塊」或 footer，再直接連到證書 PDF，或連到驗證機構的查詢頁。

### Gaps
- 精誠、宏碁資安、hicloud 的官方頁面這次都沒能抓到，需要用一般瀏覽器人工確認。

---

## Q2. 區塊標題與副標（逐字）

### Takeaway
趨勢用的是正式的「聚焦資安與法規遵循／通過認證是我們的資安承諾」。叡揚用口語的「我們重視資安」。網擎走行銷 banner 語氣：「高品質 3 重把關！網擎資訊是值得您信賴的雲端服務商」。

### Cited Findings
- 趨勢（中文）頁首標題：「聚焦資安與法規遵循」。列表上方的副標：「通過認證是我們的資安承諾」。認證清單依 A–Z 字母索引排列（A, C, D, F, G, H, I, N, P, R, S, T, U, W）。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 叡揚區塊標題（`section-iso__title`）：「我們重視資安」。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)
- 網擎 MailCloud banner 主標：「高品質 3 重把關！網擎資訊是值得您信賴的雲端服務商」，副標：「具備 ISO27001, ISO27017, ISO 27018 三項國際重要標準」。另一個區塊的標題是「MailCloud 一站搞定 / 通過 ISO27001、資安符規與稽核」。 — [mailcloud.com.tw/web](https://www.mailcloud.com.tw/web/)
- 萬里雲政策頁標題：「資訊安全政策 / INFORMATION SECURITY POLICY」，標題下方加註「版號資訊：V1.2 發佈日期：2026/08/10」（英文版："Version Number：v1.2, Date of update: 10 Aug, 2026"）。 — [cloudmile.ai/tw/security](https://cloudmile.ai/tw/security)；[cloudmile.ai/en/security](https://cloudmile.ai/en/security)
- 萬里雲首頁的「認證」區塊（RECOGNITION）標題：「國際技術認證」。這裡講的是技術人員證照，不是 ISO 管理系統驗證。 — [cloudmile.ai/tw](https://cloudmile.ai/tw)

### Inferences
- 台灣廠商常在標題放「我們重視資安」或「值得信賴」這類價值宣示，副標再列出 ISO 編號。只有趨勢用「法規遵循」這種偏合規的語彙。

### Gaps
- 趨勢英文版頁首的 hero 標題沒有逐字抓到（抽取時只取到卡片內文）。

---

## Q3. 認證周邊的說明文案（逐字）

### Takeaway
趨勢每張認證卡都有 1–3 句說明，寫出標準內容和適用範圍。叡揚只有一句。網擎則是 banner 短句。

### Cited Findings
- 趨勢頁首說明：「隨著政府與產業規範日益嚴格，您面臨的挑戰是既要達成這些規範、又要對抗越來越多的威脅。為了協助您，趨勢科技設計了各種認證、資安文件以及企業評量來幫助您更了解我們如何確保我們產品的安全，以及如何保護您的資料。」 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢「ISO 27001、27014 與 27034」卡：「ISO/IEC 27001:2022 是一套透過資訊安全管理系統 (ISMS) 與資安控管來確保產品安全運作的認證標準。這套標準還有兩項延伸標準：ISO/IEC 27014:2020 與 ISO/IEC 27034-1:2011。前者著重於資安治理，並延伸至企業的許多其他面向；後者則著重於應用程式層次的資安控管。我們的軟體服務 (SaaS) 產品與資料中心皆已通過這些全球標準的認證。」 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
  - 英文："ISO/IEC 27001:2022 is a standard that attests to a product's security operation via an information security management system (ISMS) and security controls. ... Our SaaS offerings and data centers are certified under these global standards." — [Trend Micro US](https://www.trendmicro.com/en_us/about/trust-center/compliance.html)
- 趨勢「ISO 27017」卡：「趨勢科技致力保護雲端產品的安全與隱私，並通過 ISO/IEC 27017:2015 認證，符合該規範有關雲端服務供應及使用上的資安控管要求。」 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢「SOC 2 Type II」卡：「趨勢科技通過 SOC 2 Type II 稽核，就是我們透明度與安全性的一項展現，這項稽核說明了我們如何運用內部控管來保護客戶資料，以及這些控管的運作成效如何。」 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢「CSA Star Level 2」卡：「身為雲端資安領導廠商，雲端安全聯盟 (CSA) 的 CSA Star Level 2 認證象徵我們對保護雲端部署的承諾。CSA STAR 認證是一項嚴格的獨立第三方雲端服務供應商安全性評估。」 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢「ISO 20000」卡：「為確保我們的威脅偵測及回應團隊能蒐集到高品質的資料，趨勢科技已通過 ISO/IEC 20000-1:2018 認證。該規範要求企業機構必須建立、實施、維護，並持續改善其服務管理系統 (SMS)。」 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢「HIPAA」卡：「HIPAA 與 HITECH 對於受保護的醫療資訊 (PHI) 該如何使用與揭露都有明確的規範。HIPAA 規範要求企業機構應與其商業夥伴簽署一項協議來確保 PHI 獲得充分保護。」CTA 為「檢視商業夥伴協議」。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 叡揚完整內文（`section-iso__content`）：「叡揚資訊 Vital 通過國際資安 ISO27001、ISO27017、ISO27018、ISO27701 驗證，保障使用者的資訊安全」。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)
- 網擎 MailCloud 區塊說明：「備份、個資、洩露預防 (DLP)，資安稽核關鍵重點一步到位」「稽核視角比較表，資安人員可快速掌握功能符規要點」「政府、金融保險、高科技製造業，一致信賴選擇」。 — [mailcloud.com.tw/web](https://www.mailcloud.com.tw/web/)
- 萬里雲政策目的段：「鑑於資訊安全乃維繫各項服務安全運作之基礎，為確保英屬開曼群島商萬里雲互聯股份有限公司（CLOUD MILE INC.）（以下簡稱本公司）人員、資料、資訊系統、設備及網路之安全，特訂定資訊安全政策……作為本公司資訊安全管理系統(以下簡稱ISMS)的最高指導原則。」 — [cloudmile.ai/tw/security](https://cloudmile.ai/tw/security)

### Inferences
- 趨勢的卡片寫法是一個可以照用的模板：先講這個標準在管什麼，再寫範圍（「我們的 SaaS 產品與資料中心」），最後放 CTA（檢視證書或索取報告）。
- 醫療相關的 HIPAA 卡，趨勢只寫法規要求和 BAA（商業夥伴協議），沒有宣稱「通過 HIPAA 認證」。這是在用字上避開不存在的認證。

### Gaps
- 叡揚、網擎都沒有逐張證書的說明文字。

---

## Q4. 顯示哪些認證、用什麼形式、有沒有範圍與驗證機構

### Takeaway
三種形式。趨勢是依 A–Z 字母排列的文字卡片，每張附說明和 CTA，沒有 logo 牆。叡揚是一句話加 4 枚 ISO 徽章（108×106px），footer 另有可點的圖示。網擎是 banner 文字加 SGS logo，logo 連到 SGS 證書查詢目錄。

### Cited Findings
- 趨勢列出的項目包括：ACN（義大利）、CCN、C5 Type 2、Common Criteria EAL2+、CSA Star Level 2、新加坡 CSA、DESC、BSI APT 回應服務、FedRAMP、FIPS 140-2、GovRAMP、HIPAA、ICSA Labs、ISMAP（日本）、IRAP、ISO 20000、ISO 27001/27014/27034、ISO 27017、ISO 20243、菲律賓 NPC、NetSecOPEN、NHS DSPT、PCI DSS、PrivacyMark、羅馬尼亞、SOC 2 Type II、TX-RAMP、英國 Cyber Essentials、UK NCSC、WEEE。其中**沒有** ISO 27018、ISO 27701。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢的範圍寫法：ISO 27001 卡寫「我們的軟體服務 (SaaS) 產品與資料中心」。部分卡片在說明下方列出適用產品，例如 CCN 列「Vision One Endpoint Security / Vision One 電子郵件及協同作業防護 / Deep Discovery Inspector / TippingPoint」，PCI DSS 列「Trend Vision One：PCI 報告 / 責任矩陣 / 適用性指南」。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢的卡片內文沒有寫出 ISO 驗證機構名稱（驗證機構要點開證書 PDF 才看得到）。CC 卡寫明產品名稱；ICSA 卡寫「第三方獨立機構 ICSA Labs」。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 叡揚徽章：`iso27001.png`、`iso27017.svg`、`iso27018.png`、`iso27701.png`，alt 文字分別是 iso27001／iso27017／iso27018／iso27701。區塊內文沒有寫範圍或驗證機構。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)
- 叡揚的驗證機構：數位時代報導寫叡揚「2025 年 7 月才同時通過由 SGS 查驗的 ISO 27001、27701 個資保護、27017 雲端資安及 27018 雲端個資等多項驗證」（**只看到搜尋摘要，未開原文**）。 — [數位時代 bnext](https://www.bnext.com.tw/article/84195/gss_checkmarx)
- 網擎 MailCloud 的 SGS logo：`<a href="https://www.sgs.com/en/certified-clients-and-products/certified-client-directory"><img src="images/SGS.png" alt="SGS"></a>`，用來暗示可以到驗證機構的目錄自行查證。 — [mailcloud.com.tw/web](https://www.mailcloud.com.tw/web/)
- 網擎的認證時間：iThome 產業新聞稿（2025-09-15）寫「網擎資訊自 2009 年起即取得 ISO27001 國際資訊安全管理系統驗證……在 2024 年通過 ISO27001:2022 最新版本轉版驗證外，更於今年 8 月通過 ISO27017 雲服務資訊安全管理及 ISO27018 雲端個人資料保護管理驗證。」（**只看到搜尋摘要**） — [iThome PR](https://www.ithome.com.tw/pr/87134?page=50)
- 萬里雲在政策頁中寫明 ISMS 適用範圍：「MSP(Managed Service Provider)服務之規劃、建置、營運、託管、MileLync軟體開發及作業環境。」「MSSP(Managed security Service Provider) - 資通安全監控管理(SOC)服務之規劃、建置、營運、託管之業務活動。」整頁沒有出現 "ISO" 字樣（HTML 中 ISO 出現 0 次）。 — [cloudmile.ai/tw/security](https://cloudmile.ai/tw/security)
- 萬里雲首頁的「認證」指的是人員技術證照：「具備 250+ 國際技術認證，其中超過 165 張 Google Cloud 專業技術認證……」。 — [cloudmile.ai/tw](https://cloudmile.ai/tw)
- 精誠：依搜尋摘要，2026-03 版公司簡介 PDF 列出 CNS/ISO 27001、ISO 9001、BS 10012、ISO 20000-1、ISO 22301（**未驗證**，PDF 抓取失敗）。 — [SYSTEX Company Profile 2025 PDF](https://tw.systex.com/wp-content/uploads/sites/2/2025-SYSTEX-Company-Profile-20260318TWV1-1.pdf)
- 精誠軟體服務（子公司）：CIO Taiwan 2023-12-29 報導，2023 年 10 月底由 SGS 台灣驗證，ISO 27001 範圍擴大到整體資訊整合業務流程，並導入 ISO 27701（**只看到搜尋摘要**）。 — [CIO Taiwan](https://www.cio.com.tw/full-implementation-of-security-protection-and-protection-of-capital-protection-software-services-through-iso-27001-information-security-expansion-verification-synchronous-import-of-iso-27701-privacy/)
- 宏碁：宏碁 2020 永續報告寫「子公司宏碁資訊通過 ISO 27001 資訊安全管理系統暨 ISO 27701 個人資料保護認證」（**只看到搜尋摘要**）。 — [Acer 2020 CR Report](https://www.acer.com/sustainability/uploads/files/shares/sustainability-report/2020_CR_Report_ES_zh.pdf)。Acer 社群文章寫 "Acer was officially ISO 27001 certified on December 17, 2019 after more than a year of hard work with help from ACSI"（**只看到搜尋摘要**）。 — [Acer Community](https://community.acer.com/en/discussion/590249/acer-receives-iso-27001-information-security-certification)
- hicloud：CSA STAR Registry 有「hicloud CaaS / CVPC」條目（依摘要，最後更新 2022-10-04，Level 1 自評，CAIQ 4.0.2）。 — [CSA STAR Registry](https://cloudsecurityalliance.org/star/registry/services/hicloud-caas-cvpc)。數位時代 2023-09 報導 hicloud 每年接受 ISO 27001／27017／27018 複查，並在 2022 Q1 完成 CSA STAR CCMv4 更版（**只看到搜尋摘要**）。 — [數位時代](https://www.bnext.com.tw/article/76032/chthicloud_202309)

### Inferences
- 台灣 SaaS 中，只有叡揚 Vital 在官網上同時亮出 ISO 27001／27017／27018／27701 四張。這組 ISO 27K 是台灣雲端 SaaS 目前最常見的組合。網擎有 27001／27017／27018 三張（沒找到 27701）。SOC 2 和 CSA STAR 只出現在趨勢（以及歷史上的 hicloud），台灣中型 SaaS 很少用。
- 「不寫驗證機構名稱，但放 SGS logo 或連到 SGS 目錄」是台灣廠商常見的做法。

### Gaps
- 叡揚、網擎證書 PDF 上的驗證機構與範圍原文沒有逐字讀取（PDF 可能是掃描圖檔）。
- 萬里雲是否持有 ISO 27001 證書沒能確認。政策頁的寫法（ISMS、PDCA、適用範圍）很像 ISO 27001 的必要文件，但頁面本身沒有宣稱已通過認證。

---

## Q5. 有沒有證書編號、日期、可下載的 PDF

### Takeaway
趨勢和叡揚都直接連到證書 PDF。卡片和區塊文字裡都不寫證書編號或效期，效期只能從 PDF 或檔名推測。萬里雲在政策上標版號和發佈日期。

### Cited Findings
- 趨勢的證書 PDF 連結（英文頁）：`/content/dam/trendmicro/global/en/global/docs/legal/certification/en-global-iso-27001-certificate.pdf`、`en-global-iso-27017-certificate.pdf`、`csa-star-certificate.pdf`、`en-global-iso-20000-certificate.pdf`、`en-global-iso-20243-2025-certificate.pdf`、`uk-cyberessentials-certificate.pdf`；SOC 3 報告公開下載：`/content/dam/trendmicro/global/en/core/docs/trust-center/report/rpt-soc-3.pdf`。FIPS 卡直接連到 NIST CMVP 證書頁（#3125、#3140、#3613）。 — [Trend Micro US](https://www.trendmicro.com/en_us/about/trust-center/compliance.html)
- 叡揚 footer 的證書 PDF：`https://www.gss.com.tw/images/stories/ISO/ISO_27001_2022UKAS_2025.pdf`、`ISO_27017_2015_2025.pdf`、`ISO_27018_2019_2025.pdf`、`ISO_27701_2019_2025_2028UKAS.pdf`（`target="_blank"`）。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)
- 萬里雲：「版號資訊：V1.2 發佈日期：2026/08/10」，並寫「本文件應於重大變更或至少每年評估審查一次」。 — [cloudmile.ai/tw/security](https://cloudmile.ai/tw/security)

### Inferences
- 叡揚的檔名透露了標準版本（27001:2022、27017:2015、27018:2019、27701:2019）、UKAS 認可，以及 2025 發證、27701 到 2028。這只是從檔名推測，沒有讀過 PDF 內容。

### Gaps
- 這幾家都沒有在頁面文字中直接寫證書編號或到期日。

---

## Q6. CTA（下載／索取／聯絡）

### Takeaway
趨勢的 CTA 最完整，分兩級：公開的直接下載（證書、SOC 3），機敏的走表單索取（SOC 2、C5）。台灣中型 SaaS 只有「點徽章看 PDF」或產品試用 CTA，沒有專門的資安文件索取 CTA。

### Cited Findings
- 趨勢的 CTA 原文：「檢視認證書」「檢視認證資訊」「檢視 SOC 3 報告」「索取 SOC 2 報告」「Request C5 - Type 2 報表」「檢視商業夥伴協議」「檢視 ISMAP 報告」「檢視評估信函」「參閱雲端服務通知」。英文："View certificate" "View SOC 3 report" "Request SOC 2 report"。索取 SOC 2 會導到表單 `https://resources.trendmicro.com/GLB-SOC2-Report-Request.html`，C5 是 `GLB-C5-Report-Request.html`。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)；[Trend Micro US](https://www.trendmicro.com/en_us/about/trust-center/compliance.html)
- 叡揚認證區塊附近的 CTA（同一頁）：「聯絡我們」「訂閱電子報」「索取案例集」，沒有和資安相關的 CTA。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)
- 網擎 MailCloud：「立即免費體驗 MM 視訊會議……」等產品 CTA。認證部分只有 SGS logo 外連。 — [mailcloud.com.tw/web](https://www.mailcloud.com.tw/web/)

### Inferences
- 對 B2B 醫療或照護客戶來說，「公開證書＋表單索取 SOC 2 或稽核報告」這種兩級 CTA 是台灣同業少見的做法，可以拿來做差異化。

### Gaps
- 沒找到台灣中型 SaaS 提供資安白皮書或安全問卷（CAIQ）下載。

---

## Q7. 語氣、人稱、第三方稽核與持續改善的說法

### Takeaway
趨勢混用「趨勢科技」和「我們」，加上「您」，語氣正式。叡揚用「我們重視資安」，主詞是公司名「叡揚資訊 Vital」。網擎是驚嘆號式的行銷語氣。萬里雲是法規條文式的「本公司」。

### Cited Findings
- 趨勢的人稱：「您面臨的挑戰」「幫助您更了解我們如何確保我們產品的安全」「趨勢科技通過 SOC 2 Type II 稽核」「我們的軟體服務 (SaaS) 產品與資料中心」。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢的第三方說法：「CSA STAR 認證是一項嚴格的獨立第三方雲端服務供應商安全性評估」「能過通過第三方獨立機構 ICSA Labs 持續的安全測試認證」（原文就有錯字「能過」）。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢的持續改善說法：「建立、實施、維護，並持續改善其服務管理系統 (SMS)」。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 叡揚：「我們重視資安」+「叡揚資訊 Vital 通過國際資安……驗證，保障使用者的資訊安全」。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)
- 網擎：「高品質 3 重把關！網擎資訊是值得您信賴的雲端服務商」。 — [mailcloud.com.tw/web](https://www.mailcloud.com.tw/web/)
- 萬里雲的 PDCA 段落：「ISMS之實施應依據規劃（Plan）、執行（Do）、查核（Check）及改善（Act）流程模式，以週而復始、循序漸進的精神，確保ISMS及所需過程及其互動之有效性。」溝通段落：「應以網站公告、電子郵件……告知或與內外部關注方溝通，如：內部員工、客戶、合作夥伴、供應商等。」 — [cloudmile.ai/tw/security](https://cloudmile.ai/tw/security)
- 叡揚在媒體上的說法（天下雜誌，**只看到摘要**）：「要求人員與系統必須通過 ISO 27001、ISO 27017、ISO 27018 與 ISO 27701 的認證，經由內外部層層要求、稽核」。 — [天下雜誌](https://www.cw.com.tw/article/5139129)

### Inferences
- 台灣中型 SaaS 的官網認證文案很短（一句話），比較深入的說法（內外部稽核、SGS 查驗）都放在新聞稿或媒體專訪。官網和 PR 之間有落差，Jubo 可以把 PR 等級的說法收進官網。

### Gaps
- 無。

---

## Q8. 其他值得注意的模式

### Takeaway
趨勢用「各國政府認證」（ISMAP、IRAP、FedRAMP、C5 等）展示在地合規，但台灣的資通安全管理法沒有出現在 Trust Center 合規頁。台灣廠商會在產品頁強調「政府機關信賴」或產業合規（SEMI E187、TISAX），作為在地合規訊號。

### Cited Findings
- 趨勢的 ISMAP 卡：「資訊系統安全管理與評估計畫 (……ISMAP) 是日本政府一個評估雲端服務供應商安全性的系統。趨勢科技雲端產品皆通過 ISMAP 的評估及認證並且名列在 ISMAP 官方的雲端服務清單上。」（和 Jubo 日本頁有關） — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢的 NHS 卡（醫療相關）：「所有能夠存取 NHS 病患資料和系統的機構都必須使用 Data Security and Protection Toolkit……趨勢科技已經完成這項評估，並且將詳細內容發布在 NHS 網站上。」 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 趨勢合規頁的 Trust Center 分頁包含「隱私權」「資安實務原則」「產品與服務」。合規頁內文沒有出現台灣資通安全管理法。 — [Trend Micro TW](https://www.trendmicro.com/zh_tw/about/trust-center/compliance.html)
- 網擎 MailCloud：「通過政府機關信賴，連續 6 年評選第一」「24 小時在地客服、99.95% SLA 系統穩定度」。網擎官網文章提到「SEMI E187 資安精神」「面對 TISAX 合規要求」，另有新聞「全面落實 SBOM 軟體物料清單管理機制」。 — [mailcloud.com.tw/web](https://www.mailcloud.com.tw/web/)；[openfind.com.tw/taiwan](https://www.openfind.com.tw/taiwan/)
- 網擎 2019 年通過 ISO 27550（Privacy by Design）符合性查核，自稱「第一家通過 ISO 27550 的郵件資安服務廠商」（**只看到摘要**）。 — [yam 新聞](https://n.yam.com/Article/20190422303423)
- 叡揚首頁的產業頁提到「政府組織 數位轉型……兼顧資安防護與跨部會協作」。 — [gsscloud.com/tw](https://www.gsscloud.com/tw/)

### Inferences
- 「台灣第一家」或「業界首家」是台灣廠商在 PR 中常用的認證敘事（網擎 27550、hicloud CSA STAR、網擎 2009 年第一家郵件代管通過 27001），官網上則少用。
- 這次沒看到任何一家在認證區塊放 PSIRT、bug bounty 或資料落地（data residency）說明。

### Gaps
- 沒找到台灣廠商官網上的資安 FAQ、PSIRT 或漏洞通報頁（趨勢應有 PSIRT 相關頁，但不在本次的合規頁範圍內）。資通安全管理法相關文案也沒找到官方範例。
