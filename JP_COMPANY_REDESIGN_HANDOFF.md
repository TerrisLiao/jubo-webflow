# /jp/about-us（原 /jp/company）重新設計與 Claude Code 交接

> 狀態：待實作。現有 Webflow Company 頁只有內容骨架與初步排版，**不可視為設計完成**。
>
> 2026-08-19 決議：頁面改名為 **About Us**，slug `company` → `about-us`，publishedPath `/jp/about-us`。
> 頁面從未發布過，沒有 SEO 或外部連結風險。
>
> 工作範圍：Webflow Draft 頁面 /jp/about-us，以及 /jp/overview 與公司頁的導線。不得發布。

## 1. 任務目標

把現有 /jp/about-us 從文字骨架重做成符合 Jubo 設計系統、也符合日本 B2B／醫療科技公司信任邏輯的正式公司介紹頁。

必須解決目前問題（以下為 2026-08-19 透過 Webflow MCP 逐項查證後的實況，
比本文件初稿描述的更空 — 初稿把它寫成「排版不佳」，實際上是「尚未套用設計系統」）：

| 項目 | 實際查到 |
|---|---|
| Component 實例 | **0 個**。Global Style、Cookies、Page Gradient BG、CTA Button 全都沒放。不是漸層看不到，是根本沒有。 |
| Image 元素 | **0 個**。全頁純文字，沒有人物、團隊、投資人 Logo、據點等任何視覺證據。 |
| `main-wrapper` tag | `div`，不是 `main`。24 個 section 也全部是 `<div>`。 |
| Legacy class | 29 個元素掛 `jp3-h2` / `jp3-body`，4 個掛 `jp-partner_*`。 |
| Section 命名 | `section_about` 重複用 4 次、`section_company-hero` 重複 2 次，語意不成立。 |
| 連結 | 全頁只有 3 個 Link，其中 `9543cf4a-02fb-a170-f1ee-06774720a70e` **沒有設 href**。 |
| Heading 層級 | h1×1、h2×7、h3×15（`stats-h3`），層級本身沒有跳級。 |
| 簽名 Embed | `7fc435ad-224b-e755-6fbb-5980aa3b1042` 存在，且是全頁唯一 HtmlEmbed。 |
| 頁面狀態 | `draft: true` ✅ |

由此衍生的工作：

- 補上獨立 Landing Page 必備的 Global Style、Cookies、Page Gradient BG。
- 修正 Hero 的對比與可讀性，並讓 Page Gradient BG 在第一屏真的看得見。
- 補上真實圖像證據（素材對照見第 8 節）。
- 多數區塊只是重複灰色文字卡，沒有日式企業網站常見的清楚層級與節奏。
- 公司概要做成行銷卡片；應改為容易掃讀的 label/value 資料表或 definition list。
- 把 `jp3-*`、`jp-partner_*` 換成 `folder_element` 命名，新頁不得繼續擴充舊命名。

完成後仍維持 Webflow Draft，待日文老師校稿後再換入日文與發布。

## 2. 必讀與優先順序

開始前完整閱讀：

1. CLAUDE.md
2. Jubo官網AI開發規範/00_AI工作守則.md
3. Jubo官網AI開發規範/01_Client-First規範摘要.md
4. Jubo官網AI開發規範/02_核心結構與版面.md
5. Jubo官網AI開發規範/04_設計變數與色彩.md
6. Jubo官網AI開發規範/05_元件清單.md
7. Jubo官網AI開發規範/06_自訂Class完整清單.md
8. Jubo官網AI開發規範/08_頁面與資訊架構.md
9. custom-code/slater-selectors.md

優先順序：本交接的內容與成果需求 > 上列網站規範 > 現有頁面的錯誤實作。若現有頁與規範衝突，修正現有頁，不要沿用錯誤。

## 3. Webflow 目標與現況

- Webflow Site ID：69ec2b02daa2e79f1da8772a
- /jp/overview Page ID：6a848bfa57437623d952f944
- /jp/about-us Page ID：6a8537247cf50018fca7c68d（slug 待從 `company` 改為 `about-us`）
- /jp/about-us root element：f1e5920f-a6c9-5244-9116-755da162b421
- 現有 signature Embed element：7fc435ad-224b-e755-6fbb-5980aa3b1042
- 中文公司頁的原始 signature Embed：
  - Page ID：69f3f3b4a6b6d4165031a4e7
  - Element ID：fdb136b7-bca6-c4f2-eaf9-7477010347bf

Webflow 網頁在雲端；本 repo 是規範與交接資料，不是網站原始碼。

## 4. 不可違反的實作規則

- 使用 Client-First 核心結構：
  page-wrapper > main-wrapper > section_* > padding-global + padding-section-* > container-*
- 既有 all-sections-wrapper 可以保留。
- 獨立 Landing Page 可以不放 Navbar、Footer、Announce Bar，但必須保留 Global Style、Cookies、Page Gradient BG。
- 不修改 Component definition、utility class 或 variables。
- 不用自訂 CSS／HTML 做版面。
- 唯一允許的 HtmlEmbed 是現有手寫簽名動畫；原樣複用，不改程式。
- 色彩、間距、圓角使用 Webflow variables，不得硬寫 hex 或 px。
- 可用漸層 variables：
  --gradient--teal、--gradient--light-teal、--gradient--blue、--gradient--purple、--gradient--yellow
- 主色使用 --primary--accent 與既有 dark ocean、neutral variables。
- 優先複用既有元件：Page Gradient BG、Section Tag、CTA Button、Glass Button、CTA Section #1/#2/#3/#JP、stats cards。
- 新 custom class 使用 folder_element，combo 使用 is-*，單一元素最多四個 class。
- 新頁不要增加 jp3-*、jp-partner-* 等 legacy class。
- 驗證 main wrapper 的 HTML tag 是 main。
- 四個斷點都要處理：main、medium、small、tiny。
- 不發布。

## 5. 已研究的日本網站與待補研究

目前有可追溯的 **39 家不重複官方網站樣本**，不是 50 家。不得在交付中誤稱已完成 50 家。

已研究：
SmartHR、freee、Money Forward、kubell、LegalOn Technologies、LayerX、Makuake、Sansan、Mercari、Preferred Networks、ispace、CADDi、HERP、Kyash、KAKEHASHI、Ubie、NOT A HOTEL、RevComm、Shippio、HENNGE、Finatext Holdings、Asuene、ABEJA、SmartDrive、Josys、Hacobu、Rapyuta Robotics、OPEN8、AGRIST、Lightblue、Hmcomm、GROOVE X、Magic Moment、Medley、VisasQ、Kyoto Fusioneering、Findy、TSUKURUBA、Loglass。

參考入口：https://www.mucap.co.jp/portfolio/

實作前補看至少 11 家 MUCAP 投資組合中的日本公司官網，使樣本達到至少 50 家不重複網站。只需留下精簡紀錄：公司名、官方 URL、Company／会社概要入口、可借鏡的 1–2 個 pattern。不要把研究備註放到老師的 Notion 校對表。

39 家樣本已形成的共識：

- Company Profile／会社概要必須可由主導覽或明確頁內入口找到，不能只藏 footer。
- 最小可信資訊：法定公司名、代表人、成立日、總公司完整地址／據點、事業內容。
- 資本額、員工數、集團、投資人、認證／協會等資訊，僅在可維護與可查證時加入。
- 日本 B2B、醫療、金融網站更重視可驗證的企業信用，而不是只有品牌宣言。
- 常見順序為 Mission／CEO → 公司概要／沿革 → 團隊／夥伴 → Access／Contact。
- 公司概要通常使用 label/value 表格，不是多張行銷卡。
- Access 常獨立呈現地圖、交通或聯絡方式。
- Footer 的入口只是第二入口，不應取代頁面中的明確 Company 導線。

## 5-1. 指定參考站：BETA株式会社 About Us

2026-08-19 由 Terris 指定：<https://b-inc.co.jp/about-us#outline>「整體會是這樣」。
這是本次設計方向的主要視覺與版式基準，優先於本文件原本較泛的描述。

**從參考站抽出的做法：**

| 元素 | BETA 的做法 | 對應到 Jubo |
|---|---|---|
| 頁名 | `ABOUT US` 英文大字襯線體 + 日文一句 slogan（終わりなきアップデート。） | 英文大標 `ABOUT US` + 中文／日文一句話，slug 改 `about-us` |
| Hero | **滿版真實空間照 + 深色 overlay**，標題壓在左下 | ⚠️ 與本文件 §6.1「白／淺灰基底、明亮節制」衝突，需 Terris 定案（見下方註記） |
| 頁內導覽 | Hero 底部一條 sticky anchor rail：ミッション・ビジョン／代表メッセージ／経営陣／社外役員・監査役／会社概要，各帶 ↓ | **值得照做**。不改內容順序，只是加上跳段導覽，正好解決本文件「Company 導線不能只藏 footer」的要求 |
| 標題系統 | 每段 `{ - MISSION }` 英文 eyebrow + 日文大標的雙層結構 | 用既有 `section_tag` component 當 eyebrow，維持同一套雙層節奏 |
| VALUE | `01 / 02 / 03` 編號 + 短句 | 可用在 Manifesto 或 Timeline 的年份 anchor |
| CEO | 長文訊息 + 署名「代表取締役 長沼 健一」+ 獨立的「経営陣」人物卡（職稱／姓名／學經歷段落） | CEO 段照本文件三段故事節點；人物卡格式可沿用 |
| 会社概要 | **一張很長的 label/value 表**：会社名／設立／資本金／本社所在地／各オフィス／従業員数／代表者／事業内容／取引銀行／主要株主／許可・認定／顧問弁護士／監査法人／顧問税理士／主な取引先 | 證實本文件 §6.7 的判斷正確。Jubo 只填**已確認可查證**的欄位，不硬湊 |
| Access | **緊接在会社概要同一段內**，每個據點一行地址 + GoogleMap 連結 | 照做：地址 + 地圖連結，不另做獨立區塊 |
| 結尾 CTA | **兩個分層 CTA**：SERVICE CONTACT（導到服務網站）／COMPANY CONTACT（取材・業務提携・採用） | 正好對應本文件「MDX 合作導線與一般公司聯絡資訊要分層」：CTA 1 → MDX／JuboLink for Dental，CTA 2 → 一般聯絡 |

### Hero 明暗方向 — 已定案（2026-08-19）

參考站 BETA 的 Hero 是深色滿版照 + overlay，與本文件 §1／§6.1 的「明亮節制」不相容。
**Terris 決議：採本文件原方向的明亮 split。**

- 白／淺灰基底，Page Gradient BG 在第一屏就要看得見。
- 左側標題（`ABOUT US` 英文大字 + 中文一句話）、簡介與 CTA；右側真實照片。
- 不使用深色滿版 hero，也不使用目前那個低對比黑底。
- BETA 的其他做法（anchor rail、eyebrow 標題系統、長 label/value 表、內嵌 Access、雙層 CTA）
  **仍然照上表採用** — 只有 hero 的明暗這一項不跟。

## 5-2. 結構轉向：條列優先，不是卡片（2026-08-19 決議）

Terris 檢視後的判斷：目前這頁「本身有點空」，而且「用卡片做很難讀」。
診斷正確 —— 空的原因不是頁面不該存在，是它把**可查證的事實寫成了行銷散文再裝進卡片**。
BETA 那頁之所以不空，是因為 15 列 label/value 表裡塞滿主要株主、取引銀行、認証、主な取引先。

**決議：保留 /jp/about-us 這一頁，但把主要表達形式從卡片改為條列／表格。**

不併進 /jp/overview 的理由：overview 已經很長且是產品導向，公司信用資料併進去會被埋掉 ——
正是 §5 那 39 家研究點名的失敗模式（「Footer 的入口只是第二入口，不應取代明確的 Company 導線」）。
日本 B2B 客戶查公司信用與看產品說明是兩種閱讀情境，不該擠在同一頁。

### 可用的既有 CMS 資料（2026-08-19 查證）

這頁不需要手刻資料，站上已經有兩個現成 collection 可直接綁 Collection List，
之後在 CMS 改就好，不用再動頁面：

**全球服務據點** `6a1d47c90db8f890f96dc723`（4 筆，欄位齊全：address／phone／email／google-map-link／cover-image）

| 名稱 | 地址 | 電話 | Email |
|---|---|---|---|
| 台北研發總部 | 新北市新店區北新路三段213號6樓 | (02) 5568-6435 | info@jubo.health |
| 台南辦公室 | 台南市歸仁區歸仁十三路一段6號625室 | (07) 9623-566 | — |
| 北美分公司 | 4030 8 ST SE, Calgary, AB, T2G 3A7, Canada | — | sales@jubohealth.com |
| 日本市場業務 | （尚未填，且該筆目前是 draft） | — | global@jubo.health |

⚠️「日本市場業務」那筆是 draft 且沒有地址。日本頁要用它的話，需要 Terris 補資料並取消 draft。

**專業認證** `69f9554e6698270dac268497`（4 筆，都有 logo 圖）

第16屆國家新創・初創企業獎（2019）／新創事業金質獎（2019）／
Neo Star 年度 30 最具潛力新創（2020）／第21屆國家新創・永續典範獎 + SNQ 國家品質標章（2024）

### 各段改寫方向

| 段落 | 現況 | 改成 | 形式 |
|---|---|---|---|
| Hero | 黑底低對比文字 | 明亮 split + 底部 anchor rail | — |
| CEO | 三張灰卡 | 肖像 + 三段故事節點 | **保留敘事** |
| Manifesto | 灰卡 | editorial panel + 原簽名 Embed | **保留敘事** |
| 沿革 | 四張相同的卡 | 年份 + 一行事件 | 條列時間軸 |
| 團隊 | 五個等重方塊 | 照片 + 職稱 + 一句價值 | 職種列表 |
| 資本與夥伴 | 一句文字宣稱 | 五家股東 logo | logo grid |
| 公司概要 | 行銷卡片 | 公司名／英文名／品牌／代表人／成立日／資本額／員工數／據點／事業內容／主要股東／認證與獲獎 | **label/value 表** |
| Access | 無 | 四個據點各一列，含 Google Map 連結 | 綁「全球服務據點」CMS |
| CTA | 兩個裸連結 | MDX 日本窗口 ／ 一般聯絡 | 雙層 CTA |

原則：**該掃讀的資料就讓人掃讀，該讀故事的地方才用散文。** 只有 CEO 與 Manifesto 兩段維持敘事。

### 待補欄位

**資本額**與**員工數**站上查不到，Terris 決議**先留空不放這兩列**，之後補。
不猜、不寫約數 —— 日本 B2B 頁面的信任來自可查證，寫錯一個數字比少一列傷害大。

## 6. 固定內容順序與設計線框

內容順序不得改動，但每一區都要有明確視覺設計。

> **以 §5-2 的形式決議為準。** 本節寫於結構轉向之前，凡提到「卡片」的地方，
> 除 CEO 與 Manifesto 兩段外，一律改用 §5-2 表列的條列／表格形式。

### 1. 關於 Jubo／Hero

目標：第一屏就同時傳達「醫療照護現場」、「科技能力」、「日本合作」與「可信的公司」。

- 採明亮、節制的日本企業網站風格：白／淺灰基底、柔和 teal 與多色漸層光暈。
- Page Gradient BG 在第一屏可辨識，不可只是載入但看不到。
- 使用 split layout：左側標題、簡介與 CTA；右側放真實的創辦人、公司、醫療／照護現場相關照片。
- 不可使用目前的低對比黑色 Hero。
- 可在 Hero 下方放精簡 trust rail／數字證據，但不可改變七大內容順序。
- 主 CTA：認識 Jubo／查看公司資訊；次 CTA 可導回 /jp/overview 或日本合作窗口。

### 2. 創辦人暨執行長短介紹

- 使用真實 CEO 肖像，不要只放一段文字。
- 內容保持簡短，視覺上拆成三個故事節點：
  1. 在醫療家庭與醫院、長照場域成長。
  2. 以工程與資訊研究處理複雜現場；2008 年起與安養機構合作，看見紙本、重複記錄與資訊斷裂。
  3. 2018 年創立 Jubo，把 AI、資料與工作流程做成現場可用的工具。
- 保留「史丹佛土木與環境工程博士」等準確背景，但不可把故事寫成單純「土木轉 AI」。
- 可用 portrait + editorial text／milestones，不要做成三張相同灰卡。

### 3. Manifesto 與手寫簽名

- 使用較有品牌感的 editorial panel：玻璃、柔和漸層、留白與引言層級。
- 只複用現有手寫簽名 Embed，程式碼完全不改。
- Designer 中出現「custom code only works in preview/published」提示屬預期；不要因此刪除 Embed。
- Manifesto 本文需維持高對比與舒適行長。

### 4. Jubo 發展歷程

- 保留 2008、2009、2018、2024 的敘事。
- 改成有節奏的 timeline：交錯圖文、年份 anchor、照片或產品／現場資產。
- 避免四張完全相同的灰色卡片。
- mobile 改為單欄垂直 timeline。

### 5. 多職能團隊

- 用真實團隊照片、角色圖示或視覺 role matrix，呈現照護、醫療、產品、工程、營運的協作。
- 不做五個空洞、等重的文字方塊。
- 每個角色只留一個精準價值句，避免履歷牆。

### 6. 資本與策略夥伴

- 從 Webflow Assets 找到並使用真實投資人／夥伴 Logo。
- 使用乾淨 logo grid、適量留白與必要的合作說明。
- 不可只用一句文字宣稱「受到支持」。
- 只列可驗證、公司已公開的名稱，不自行新增投資人。
- 如需要日期或輪次，先找公司現有頁／新聞稿確認。

### 7. 公司概要與日本合作窗口

- 公司概要改為日式 label/value table／definition list：
  - 公司名稱：智齡科技股份有限公司
  - 英文名稱：Smart Ageing Tech Co., Ltd.
  - 品牌：Jubo
  - 負責人：康仕仲
  - 成立日期：2018 年 8 月 30 日
  - 地址：新北市新店區北新路三段 213 號 6 樓
  - 電話：(02) 5568-6435
  - Email：info@jubo.health
  - 事業內容：採目前已確認的公司描述，若要改寫需保留準確性
- 右側或下方以 Access／Contact 卡呈現地址、地圖／交通（若既有元件與資產可安全使用）與聯絡按鈕。
- 日本合作窗口須突出 MDX 合作導線，與一般公司聯絡資訊分層。
- Footer 只可作第二入口；本次不另做「JP 專用 Footer」，除非使用者另行批准。

### 8. CTA

雖然主要內容是七個段落，頁尾仍需 CTA 收束。

- 優先複用 CTA Section #JP 或其他既有 CTA 元件。
- 使用既有 Glass Button／CTA Button 與漸層 accent。
- 連到 /jp/overview 與 MDX／日本合作窗口。
- 檢查所有 link target 與 keyboard focus。

## 7. /jp/overview 的配合修改

- 保留現有產品、團隊能力、JuboLink for Dental、MDX 合作導線。
- 保留並確認公司導線：
  - 標題：從台灣照護現場出發，走向日本
  - 內文：Jubo 長期與醫療、照護及高齡服務現場合作，將 AI、資料與工作流程轉化為能被團隊日常使用的工具。
  - 按鈕：認識 Jubo → /jp/about-us
- 檢查兩頁導線為雙向且正確。
- 不把中文提前換成未校對日文。

## 8. 圖像與視覺語言

- 優先使用站上既有的 CEO 肖像、團隊／辦公室、照護現場、產品與投資人 Logo。
- 有真實資產時，不使用生成式人物或泛用庫存照。

### 8-1. 素材對照表（2026-08-19 查證）

⚠️ 這些素材**不是**翻 Webflow Assets 清單就找得到的。CEO 肖像綁在 class 的
`background-image` 上、投資人 Logo 在首頁的 marquee 結構裡 —
只查 asset 清單或只查頁面的 Image 元素，兩種都會漏掉。

**CEO 肖像**（class 背景圖，非 Image 元素）

| Class | Asset | 備註 |
|---|---|---|
| `.jp-ceo_portrait` | `@img_6a34bc79e22db33d6ea1c733` | JP 版。`background-position: 50% 20%`、24px 圓角（硬寫值，改用時要改綁 radius 變數） |
| `.founder-info_img-wrap` | `@img_69f96030f9fd9a020433e339` | 中文 `/company`（`69f3f3b4a6b6d4165031a4e7`）版本，1:1 aspect ratio，圓角已綁變數 |
| `.internship-ceo_portrait` | `@img_6a420a5cfbb5d60e2baf0274` | `/internship` 版本，命名與變數綁定最符合規範，可作為新 class 的範本 |

`.jp-ceo_grid` 已經是 `minmax(280px,.85fr) minmax(0,1.15fr)` 的 portrait + editorial 雙欄，
構圖可直接沿用，只需改名成 `folder_element` 命名。

**投資人／策略夥伴 Logo**（首頁 `69ec2b03daa2e79f1da8772e`，
結構為 `section_client-logo` → `client-logo_component` → `logo-marquee`）

| 夥伴 | Asset ID |
|---|---|
| Wistron 緯創 | `69f6bc9584a10822d05a6d00` |
| 聯合報系 | `69f6bc951976e2f7598b0ac1` |
| ITIC 工業技術投資 | `69f6bc95348244fb7e900eba` |
| Darwin 達盈管顧 | `69f6bc952b175af5c71bc0c8` |
| 嘉新企業集團 CHC | `69f6bc955adb69631fcda9c2` |

五個 Image 都已有中文／英文 alt，沿用即可。**只列這五家已公開的名稱，不自行增補投資人。**

⚠️ `.logo-marquee`、`.logo-marquee-line`、`.client-logo` 在
[`custom-code/slater-selectors.md`](custom-code/slater-selectors.md) 的鎖定名單上，
由 Slater 託管的 `60292.js` 用 class 選擇器驅動跑馬燈。**這三個 class 必須原名沿用、不可改名**。
好處是 script 全站載入，把結構複製到 /jp/about-us 後動畫會自動生效；
要新命名只能加在外層容器（例如 `jp-about_partners-wrap`）。

**團隊角色照**（`/jp/overview` `6a848bfa57437623d952f944` 上的 Image 元素，帶職種 alt）

| 角色 | Asset ID |
|---|---|
| AI・データサイエンティスト | `6a43c5d4dd160f38c4cdcc89` |
| ソフトウェアエンジニア | `6a43c58bba6bdd450838c700` |
| 看護師 | `6a43c58bfb0d489ab98367d3` |
| ソーシャルワーカー | `6a43c58ce42f82c0da515488` |
| 公衆衛生の専門家 | `6a43c58c263a2780ef8bf53e` |

**其他可用照片**：辦公室／團隊 `6a4214570f8b718ed79b20b7`、
照護現場 `6a421457d04cc2155fc9d382`、明亮醫療空間 `6a42861624ec5ffc1da72820`。

**已確認可直接複製的 Component 實例**（都在 `/jp/overview` 上）：
Global Style、Cookies、Page Gradient BG、CTA Button。
- 版面基調：大量留白、明確網格、可信的企業資訊、少量柔和漸層做品牌識別。
- 避免整頁深色、黑底黑字、背景效果不可見、卡片海與所有區塊同一節奏。
- 漸層不是裝飾補丁：Hero、Manifesto、CTA 三處建立一致的視覺節奏，其餘區塊保持克制。

## 9. Notion 邊界

現有老師校對頁：

- /jp/overview：
  https://app.notion.com/p/3b1d4f1889c5819e85cfdf512368a57e?pvs=204
- /jp/about-us：
  https://app.notion.com/p/3c1d4f1889c5817497dbec682c6884ad?pvs=204

兩頁只保留三欄：區塊／中文／日文。日文留白給老師。

不要把設計規格、研究備註、來源連結、工作流程或內部 TODO 放入 Notion。若 Webflow 中文內容有實質變更，再同步老師需要翻譯的中文原文即可。

## 10. 實作代辦

### P0：結構與可讀性

- [x] ~~補足 11 家不重複日本官網研究~~ — **2026-08-19 Terris 決議跳過**。現有 39 家已收斂出明確共識，且已指定 BETA 為具體參考範例，邊際效益不足以再花時間。
- [ ] 頁面 slug 從 `company` 改為 `about-us`，SEO title／描述一併更新。
- [ ] 備份／記錄現有 /jp/about-us 的結構，避免誤刪簽名 Embed。
- [ ] 加入 Global Style、Cookies、Page Gradient BG 三個 component 實例（目前頁面 component 數為 0）。
- [ ] `main-wrapper` 的 tag 從 `div` 改為 `main`；各 section 的 tag 從 `div` 改為 `section`。
- [ ] Hero 依已定案的「明亮 split」施作（見 §5-1）。
- [ ] 重新命名重複的 section：`section_about` ×4、`section_company-hero` ×2。
- [ ] 補上沒有設 href 的連結 `9543cf4a-02fb-a170-f1ee-06774720a70e`。
- [ ] 移除新頁對 jp3-*、jp-partner-* legacy class 的依賴（29 + 4 個元素）。
  用「複製屬性到新 class 再改掛」的方式，**不可 rename** — class 是站台全域的，會動到已發布的 /jptest。
- [ ] 不修改全站 Component、utility、variables。

### P1：完整視覺重做

- [ ] Hero 加入可見漸層、真實照片、CTA 與 trust hierarchy。
- [ ] Hero 下方加入 sticky 頁內 anchor rail（照 BETA 做法，見 §5-1）。
- [ ] CEO 區加入肖像與三段故事節點。
- [ ] Manifesto 建立 editorial／glass／gradient panel，保留原 signature Embed。
- [ ] Timeline 改成年份 + 一行事件的條列時間軸（不是四張卡）。
- [ ] Team 改為「照片 + 職稱 + 一句價值」的職種列表。
- [ ] Partners 使用真實 Logo grid。
- [ ] Company Profile 改為 label/value table，資本額與員工數兩列先不放。
- [ ] Access 綁「全球服務據點」CMS collection（4 筆，含 Google Map 連結）。
- [ ] 認證與獲獎綁「專業認證」CMS collection（4 筆，含 logo）。
- [ ] Access／日本合作窗口做成清楚的雙欄或上下層級。
- [ ] CTA 複用既有元件並檢查連結。
- [ ] /jp/overview 與 /jp/about-us 雙向導線正確。

### P2：驗收

- [ ] 所有新增文字為繁體中文，日文尚未替換。
- [ ] main、medium、small、tiny 四斷點完成。
- [ ] 無水平 overflow、文字截斷、重疊或不合理留白。
- [ ] heading hierarchy 連續，按鈕與連結可鍵盤操作。
- [ ] 對比合格；尤其 Hero 與漸層上的文字。
- [ ] Page Gradient BG 確實可見。
- [ ] 除 signature 外沒有新增 HtmlEmbed 或 custom code。
- [ ] 提供 desktop、tablet、mobile portrait、mobile landscape 的畫面或 snapshot 供 review。
- [ ] Webflow 保持 Draft，沒有 publish。

## 11. 完成定義

只有在以下條件同時成立時，才可回報設計完成：

1. 第一屏明顯看得到 Jubo 的漸層與真實圖像，不是只有文字。
2. CEO、Timeline、Team、Partners、Company Profile 各有不同且合理的視覺呈現。
3. 公司概要像日本企業網站的可信資料區，而不是行銷卡片。
4. 所有實作符合 repo 規範，未污染全站共用樣式。
5. 四個斷點有證據可驗收。
6. 所有頁面仍是 Draft，等待老師日文校對。
