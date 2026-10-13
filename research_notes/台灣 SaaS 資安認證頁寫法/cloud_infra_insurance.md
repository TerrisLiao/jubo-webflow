# 台灣公司如何描述「雲端基礎設施／資料存放／資安保險」

> 2026-10-12 為 /security「智齡的雲端服務」段標題蒐集。引文為原文；標「二手」者未在官方頁面核實。

| 公司 | 位置 | 標題（原文） | 描述（原文） |
|---|---|---|---|
| 點點簽 DottedSign | [信任中心](https://www.dottedsign.com/zh-tw/trust/security-certifications) | H3「AWS 架構完善框架」「AWS 認證軟體服務」「資料備份」「平台穩定性」 | 「作為通過國際認證信賴的AWS合作夥伴，點點簽遵循AWS最嚴格的資料保護和隱私標準」「點點簽的使用者資料每日都會在AWS網路上進行仔細的備份，所有備份皆會進行加密，且分散儲存於多個地點。」 |
| 凱鈿 KDAN | [資訊安全政策](https://www.kdan.com/zh-tw/security) | H3「客戶資料安全」「備份」「實體安全協定」 | 「凱鈿之伺服器建構於Amazon Web Services（AWS）之基礎上。AWS 之服務受業界信賴」「每天皆會備份所有資料。備份之資料經加密後發配至各個位置，且會保留30 天。」「資料主要儲存在AWS S3，位於美國東部、日本」 |
| NUEIP 人易科技 | [首頁](https://www.nueip.com/) | H2「技術聯盟合作夥伴」 | 「架構部署、儲存運算、資安控管等相關技術，皆與 Google Cloud 雲端運算服務夥伴緊密合作，帶給您最值得信任的雲端企業管理平台。」 |
| Appier 沛星 | [Trust Center](https://www.appier.com/trust-center-security) | 「Built on the World's Most Trusted Cloud Infrastructure」 | 「Powered by Google Cloud Platform (GCP) and Amazon Web Services (AWS)」「ISO 27001, 27017, 27018, and SOC 2 certified infrastructure」 |
| Ragic 立即科技 | [Security at Ragic](https://www.ragic.com/intl/en/doc-kb/22/Security-at-Ragic) | 「Physical Server Security」「Backup and Disaster Prevention」「Network and System Security」 | 「Our servers are provided by well-known public clouds (Google, AWS)」「We have European servers located in Belgium and Ireland.」「All Ragic servers are fully backed up on a daily basis」 |
| SurveyCake | [企業版](https://www.surveycake.com/enterprise/) | 「金融認證高規格資安」副標「全方位守護每一筆填答隱私」 | 「SurveyCake Enterprise 支援 AWS 私有雲或企業自有主機部署，讓資料存放位置由企業自行決定，不經過共用伺服器。」「彈性雲端部署，支援代建代管雲端主機」 |
| iCHEF | [隱私權政策](https://www.ichefpos.com/zh-tw/privacy-policy) | H3「我們如何保護您的資料」 | 「本服務使用 Amazon.com, Inc 提供的元件。本公司可能將您的個人資料，透過AWS資料庫儲存。」 |
| 網擎 MailCloud | [官網](https://www.mailcloud.com.tw/web/) | 「高品質 3 重把關！網擎資訊是值得您信賴的雲端服務商」 | 「具備 ISO27001, ISO27017, ISO 27018 三項國際重要標準」「24 小時在地客服、99.95% SLA 系統穩定度」 |
| 群暉 Synology C2 | [官方新聞](https://www.synology.com/zh-tw/company/news/article/Synology_C2/%E5%8A%A9%E4%BC%81%E6%A5%AD%E6%8E%8C%E6%8F%A1%E9%9B%B2%E7%AB%AF%E6%88%90%E6%9C%AC%EF%BC%8CSynology%20%E6%89%93%E9%80%A0%E5%AE%8C%E6%95%B4%E9%9B%B2%E6%9C%8D%E5%8B%99%E9%8F%88) | 「台灣資料中心正式啟用，滿足在地產業關鍵資料落地需求」 | 「作為 100% MIT 的產品開發、營運與資料落地」「圍繞「資料保護」核心，讓企業安全上雲」 |
| SHOPLINE（二手） | [uptogo 轉述](https://uptogo.com.tw/?p=438775)；[AWS 案例](https://aws.amazon.com/jp/solutions/case-studies/shopline) | 「【資料儲存於 AWS 新加坡伺服器】」 | 「所有用戶的資料皆進行硬碟加密存放於新加坡 AWS 伺服器，且採用 AWS Shield Advanced 以及 WAF 抵禦 DDOS 以及駭客攻擊」 |

另查：Whoscall [安全頁](https://web.whoscall.com/zh-hant/security) 沒有提到雲端供應商或資料位置，只寫加密。

## 觀察

1. **標題多是功能名詞**：「資料備份」「平台穩定性」「實體安全協定」「技術聯盟合作夥伴」。行銷口號型只有網擎（「高品質 3 重把關！」）和 Appier（「World's Most Trusted Cloud Infrastructure」）。
2. **主句型是「建構於／採用 + 雲端大廠」，再借大廠的信任**：「伺服器建構於 AWS 之基礎上。AWS 之服務受業界信賴」「皆與 Google Cloud……緊密合作，帶給您最值得信任的……」。
3. **寫出資料存放地的很少**：只有凱鈿（美國東部、日本）、Ragic（比利時、愛爾蘭）、SHOPLINE（新加坡，二手）、群暉（台灣）。強調「資料在台灣」的只有群暉，而且當作主標題。
4. **網路防護點名供應商的只有 SHOPLINE（二手）**：寫的是 AWS Shield Advanced＋WAF。十家都沒有提 Cloudflare。
5. **備份寫法一致**：每日、加密、異地／多地點（點點簽、凱鈿、Ragic）。
6. **資安保險：十家都沒有提**。搜尋也找不到台灣 SaaS 在官網寫已投保資安險。Jubo 寫出來會是少數，但也沒有現成寫法可參考，建議只寫事實（保額＋保障範圍），不要加評價詞。
7. **要避免的詞**：「最嚴格」「最高層級」「最值得信任」「World's Most Trusted」這類最高級說法，同業常用，但 Jubo 規範不允許。
