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

## 5-3. 兩頁分工重切（2026-08-19 決議）

查證後發現：about-us 顯得空，主因是**它有四段與 /jp/overview 重複，而 overview 的版本做得更好**。

| about-us 段落 | overview 是否已有 | 誰的版本較完整 |
|---|---|---|
| CEO | ✅ 有肖像＋「康仕仲博士｜Jubo 創辦人暨執行長」 | overview |
| 沿革 | ✅ 3 段含圖（研究→北美→日本） | overview |
| 團隊 | ✅ 5 張職種照＋3 個數字 | overview |
| 價值主張 | ✅「不從技術出發」3 段 | overview |
| Manifesto＋手寫簽名 | ❌ | **about-us 獨有** |
| 公司概要表 | ❌ | **about-us 獨有** |
| 投資人與策略夥伴 | ❌ | **about-us 獨有** |
| 據點／認證 | ❌ | **about-us 獨有** |

**Terris 決議的新分工：**

- **about-us**：不放 hero。直接進公司資料 → 各據點（含 Google Map 連結）→ 聯絡資訊 → 日本市場專用表單。
- **overview**：在產品架構下方加上「我們的團隊組成」。

### 團隊組成要用的版型（2026-08-19 更正）

Terris 指的是 `/internship` 頁 `section_home-solutions`（`id="tracks"`）裡的
**cascading slider 四格玻璃卡**，四個部門為：

| 部門 | 職種標籤 | 背景圖 asset |
|---|---|---|
| 科技研發 | 軟體工程師／資料工程師／AI 工程師 | `6a421457a350acb9e3caa32c` |
| 體驗設計 | 視覺設計／UI 設計師／產品設計師 | `6a70340e231103663a398305` |
| 商業策略 | 行銷企劃／營運企劃／產品行銷 | `6a41d65aaec03e8e4d9ec33b` |
| 國際拓展 | 業務拓展／海外業務／國際行銷 | `6a83f320c194e073fb45f902` |

結構：
`.cascading-slider[data-cascading-slider-wrap] > .cascading-slider__collection > .cascading-slider__list[data-cascading-viewport] > .cascading-slider__item.<n>[data-cascading-slide] > .cascading-slider__item-inner > (.cascading-slider__item-bg > Image.cascading-slider__img) + .cascading-slider__item-content + (.cascading-slider_content-wrapper > Link.cascading-slider_content-wrap.is-readable + .cascading-slider_content-wrap.is-inactive)`

⚠️ **整組是 Slater `60292.js` 驅動的**。`.cascading-slider__*`、`.cascading-slider_content-wrap`、
`.category-tag` 都在鎖定名單上，class 名與 `data-cascading-*` 屬性必須原樣複製，否則不會動。
`.cascading-slider__item` 上那個數字第二 class（`1`/`2`/`3`/`4`）雖然違反命名規範，也必須照留。
`.category-tag` 另外被站台 head 的 GA4 用來推斷業務區域。

⚠️ 原版四張卡都連到 `/careers`（中文招募頁）。日文頁不適合把讀者導到全中文的台灣職缺，
**overview 版本的四張卡目前刻意不設 href**（仍是 Link Block，保留 Slater 需要的 `<a>` 結構）。
連結目標待 Terris 決定；在那之前，卡片是純展示。

### 施作狀態（2026-08-19）

已在 `/jp/overview` 建立新區塊，位置在 JuboLink 產品段之後、頁尾 CTA 之前，錨點 `#team`：

- `section_home-solutions` > `padding-global padding-section-large` > `container-large`
- 標題區用既有 `section_tag text-size-tiny is-eyebrow` ＋ `jp3-h2` ＋ `jp3-body`
  （overview 依先前決議刻意保留 jp3-* 骨架命名，故此處沿用而非新建）
- 四張卡的文案已改寫為「團隊組成」語境，不再是實習生視角
- 沒有新增任何 class，也沒有新增 HtmlEmbed（overview 的 Embed 數維持 8 個，都是原有的）

**兩頁維持分開**：Terris 決議 about-us 與 overview 各自獨立，about-us 現有段落本次不刪。

> 註：先前誤認為是 `intern-journey_*` 四格，已更正。`/internship` 頁確認沒有任何 HtmlEmbed 或 CodeBlock，
> 所謂「custom code 四格」其實是一般 Webflow class ＋ Slater 互動，搬用不違反鐵律 4。

## 5-4. 頁面瘦身與 Manifesto 移轉（2026-08-19 決議）

Terris：「about-us 比較像是公司 info 揭露，不是需要很重設計感。」

**已從 about-us 移除：** Hero、Jubo 歷程、資本與策略夥伴、Manifesto（Manifesto 移到 overview）。

**about-us 現在的段落順序：**

1. 創辦人短介紹（`8d7eb4c0`）
2. 多職能團隊（`30c2bcc3`）
3. 公司概要 label/value 表（`0358a1b5`）
4. 服務據點＋Google 地圖（`cdd74f9d`）
5. 日本市場詢問表單（`3b015b9a`）
6. CTA（`ea5c0c61`）

⚠️ **移除 Hero 後全頁 h1 數量為 0。** 這是可存取性與 SEO 的實質缺陷，需要指定一個段落標題升為 h1。
段落陣容還在調整，所以先標記不動手 —— 確定留哪些段落後，把第一段的 h2 改成 h1 即可。

### Manifesto 已移到 /jp/overview

位置：創辦人段（`708363d9…cb8`）正下方，結構與樣式完全沿用（`section_manifesto` >
`container-small` > `manifesto_component` > `manifesto_content-wrap` > `manifesto_content`）。

手寫簽名 Embed **原樣重建**（跨頁無法 move，只能重建）：
新 element `a775eb92-1eb9-fa9c-398b-821c05074272`。程式碼一字未改，
已將兩頁的 embed 內容讀出實際比對，9 條 pen path、animation delay 與 ink path 全部一致。
about-us 的 HtmlEmbed 數已歸零，`#kangSig` 在站上維持唯一。

### 創辦人段的內容檢查

交接文件 §6.2 要求的三個故事節點，overview 的創辦人段**內容其實已經符合**：
醫療家庭／醫院／長照場域成長 → 史丹佛土木與環境工程博士＋2008 年起與安養機構合作、
看見紙本與資訊斷裂 → 2018 年創立 Jubo。
缺的是**視覺上沒有拆成三個節點**，目前仍是兩段散文。這部分待施作。

## 5-5. 歷程改為捲動卡片堆疊（待決）

Terris 指定：overview 的歷程要改成 `/products/care-assistant-app` 頁面下方那種
「捲動會停住、卡片一張張翻過去」的效果，脈絡改為
**智齡聯盟 → 智齡科技 → 北美市場 → 日本市場**。

已查到來源版型：該頁的 `section_product-scroll-card`
（`padding-global padding-section-large` > `container-large` >
`product-scroll-card_component` > `product-scroll-card_list` > `product-scroll-card_item` ×3，
每張卡為 `product-scroll-card_content-left` ＋ `image-wrapper`）。

⚠️ **但那個「停住翻頁」的行為不在 CSS 裡。** 已查完 `product-scroll-card_item` 的
main／medium／small／tiny 四個斷點，**沒有任何 `position: sticky`**；
這些 class 也不在 `custom-code/slater-selectors.md` 的 Slater 鎖定清單上。
結論：效果幾乎確定來自 **Webflow Interactions（IX2）**，而 Webflow MCP 讀不到、也寫不了 IX2。

可行的兩條路：

1. **純 CSS sticky** — 新建 `jp-journey_*` 系列，卡片用 `position: sticky` ＋ `top`，
   靠捲動自然堆疊。不需要 custom code、不需要 IX2，MCP 就能完成，四斷點也好控制。
2. **沿用原版 IX2** — 我把結構與 class 原樣建好，Interaction 由 Terris 在 Designer 內手動套用或複製。

## 5-6. 頁面定案：会社概要（2026-08-19）

Terris：「about us 實際名稱就只是 **会社概要**」、「公司基本資訊以上的東西都可以移除了」、
「這個設計方式是主要給**代理商**，如果想跟我們接洽或是其他配合可以〔用表單〕，
想要購買產品就叫他導過去 MDX」。

**受眾定位**：代理商與合作夥伴，不是終端買家。購買意圖一律導向 MDX。

**已移除**：創辦人短介紹、多職能團隊（兩段 /jp/overview 都有更完整的版本）。

**目前段落（五段）**

1. 会社概要 標題色帶（`78beda0d`）
2. 公司概要 label/value 表（`0358a1b5`）
3. 服務據點＋Google 地圖（`cdd74f9d`）
4. 日本市場詢問表單（`3b015b9a`）
5. CTA：了解方案 → `/jp/overview`／購買洽詢 → MDX（`ea5c0c61`）

### 標題色帶的做法（參考 nature.global/about）

實際量測參考站：`min-height: 430px` 的窄帶、flex 置中、白字，
英文大字（42px）在上、日文小字（20px）在下 —— **不是滿版 hero**。

Jubo 版：`section_jp-about-hero` = `min-height: 24rem`（small 斷點降為 16rem）、flex 置中、
底色綁 `--primary--ocean`；`jp-about_hero-title`（h1「会社概要」，3rem，白字，
small 2.25rem／tiny 1.875rem）＋ `jp-about_hero-lead`（副標，白字）。
白字對 `#175e5e` 的對比約 7.5:1，遠高於 AA 門檻。這也把先前移除 hero 造成的 **h1 缺失補回來了**。

> 註：Terris 原話是「壓一個新底色」，目前用的是深色 ocean 底＋白字。
> 若要改成淺底深字，只需改 `section_jp-about-hero` 的 background 與兩個文字 class 的顏色。

### ⚠️ Webflow API 陷阱：page 模式的連結不會寫入

`set_link` 帶 `linkType: "page"` 會回報 `status: success`，但讀回來仍是 `linkType: "none"`。
2026-08-19 因此有兩顆跨頁 CTA 被靜默留成死連結。

**改用 `linkType: "url"` ＋ 路徑字串，並且設完一定要讀回來驗證。**
目前兩頁導線都已改為 URL 模式並驗證通過：
`/jp/about-us` 的「了解日本市場解決方案」→ `/jp/overview`；
`/jp/overview` 的「認識 Jubo」→ `/jp/about-us`。三個 Google 地圖連結也已驗證。

### 待確認

Terris 指出「表格的設計有誤」，但未說明是版式還是欄位內容。待釐清後再改。

## 5-7. 公司概要表最終定案與辦公室橫幅（2026-08-19）

Terris 提供／決議：

- 移除「認證與獲獎」列（CMS collection `69f9554e6698270dac268497` 未在頁面上使用，數據仍在 CMS 保留）。
- **資本額：9.9 億元**（新增列，放在成立日期之後）。
- **從業人員：126 人（兼職 18 人）**（新增列，放在資本額之後）。
- **事業內容改為四行條列**（原本是一句話）：
  1. 長照與醫療機構管理系統（住宿型機構、日間照顧中心、居家服務單位）
  2. 照護現場行動應用與 IoT 生理量測設備整合
  3. 照護資料應用與 AI 服務
  4. 醫療與長照組織的系統整合與數位轉型專案
  （四行文字由我方依站上既有產品線歸納撰寫，Terris 尚未逐句核可，發布前需確認）
- 頁面上方加入辦公室照片橫幅：asset `6a42225819368178f7ee4d13`，
  置於標題色帶正下方、公司概要表之前，`height: 22rem`、`object-fit: cover`、
  以負 margin 疊上色帶邊緣做視覺銜接。

**目前 label/value 表最終欄位（依序）**：公司名稱、英文名稱、品牌、代表人、成立日期、
**資本額**、**從業人員**、事業內容（四行）、據點、投資人與策略夥伴、日本合作窗口、聯絡方式。

⚠️ 標題色帶第一次被清空時，判斷為 `remove_element` 的副作用，已重建並驗證——
這個判斷後來被 Terris 更正。

## 5-8. Terris 在 Designer 手動精簡 about-us（2026-08-19）

Terris 直接在 Designer 裡移除了標題色帶、辦公室照片橫幅、CTA 段（了解方案／聯絡 MDX 兩顆按鈕）。
**這些都是 Terris 主動的刪除，不是 `remove_element` 的副作用或事故**——上面關於「意外事故」的
判斷是錯的，已更正。

現在 about-us 只剩三段：公司概要表、服務據點、日本市場詢問表單。沒有標題、沒有 CTA、
沒有辦公室照片。頁面上僅存的 h1 是公司概要表區塊裡的「基本資訊與日本合作窗口」
（已從 h2 手動升級，純語意調整，沒有動到外觀）。

CTA 是否需要以其他形式補回，待 Terris 定案 about-us 的版面後再談，目前不動。

## 5-9. 北美分部改名、投資人列移除、經營團隊區塊（2026-08-19）

Terris 決議與提供：

- **overview 團隊組成第四張卡**：「國際拓展」改為「**北美分部**」。原本的文案
  （「理解各地市場與在地需求，把台灣經驗帶到日本與其他場域」）與地點卡不符，已改寫成
  「以加拿大 Calgary 為據點，服務北美地區的照護與長照客戶，並支援跨區協作。」，
  三個職能標籤改為「北美業務」「客戶成功」「當地合作支援」（這三個標籤是我方推斷撰寫，
  非站上既有資料，發布前需 Terris 確認）。
- **about-us 公司概要表**：移除「投資人與策略夥伴」列。
- **新增「經營團隊」區塊**：插在 about-us 最前面（標題色帶已被移除，故現在是全頁第一段），
  四欄 CxO 卡片（桌面 4 欄、平板 2 欄、手機 1 欄），依序：
  - 康仕仲（Jessy Kang, Ph.D.）｜創辦人暨執行長（CEO）
  - 謝美芬（Lisa Hsieh）｜副執行長暨營收長（CRO）
  - 古凱元（Kai-Yuan Ku）｜技術長（CTO）
  - 李泓其（Hung-Chi Lee, Ph.D.）｜數位長（CDO）

  COO 陳依伶（I-Ling Chen）**未列入**，Terris 說明其照片尚未更新，待補後再加。
  Bio 文字是把 Terris 提供的完整介紹濃縮為 1–2 句，逐句對照過原文用字（例如刻意保留
  「商業模型」「擔任」「雲端平台」等原詞，不擅自替換同義詞）。

### 素材處理紀錄

- Terris 貼的照片是內嵌在對話裡的圖片，MCP／Bash 都無法直接讀取 bytes；
  最終改由 Terris 存成本機檔案（`~/Downloads/OneDrive_1_2026-8-19/{CEO,CRO,CTO,CDO}.jpg`）取得。
- 四張原始照片有三張是 4160×6240、6–14 MB 的全尺寸檔，先用 `sips` 縮到最長邊 1200px、
  JPEG quality 82，壓到 90–135 KB 才上傳，避免把未經最佳化的巨大圖檔放上站。
- 上傳流程：`data_assets_tool > create_asset` 取得 S3 presigned POST 參數，
  用 `curl -F` 送出 multipart/form-data，四張皆回應 201 且 ETag 與本機 MD5 一致。
- Asset ID：CEO `6a857fcbf552990ef3662318`｜CRO `6a857fcb93054a61a653e6bc`｜
  CTO `6a857fcb07716c68705bac2f`｜CDO `6a857fcbcdb2e1fe13fd2088`。

### ⚠️ 打字錯 vs 平台問題：這次先誤判方向，已修正判斷方法

寫入姓名與 bio 後第一次讀回，「康仕仲」變成「康仂仲」、「李泓其」變成「李泹其」，
「史丹佛」變成「審佛」，一度以為是 §5-6 那個 `set_link` 的同類「回報成功但沒真的寫入」問題。
**逐字比對後發現：是我自己輸入時把生僻字打錯**（仕→仂、泓→泹皆為外形相近的錯字），
連修正時都重複打錯一次同一個字。真正的教訓不是「Webflow 不可信」，而是
**寫入人名、學位、專有名詞這類不可用近似字代替的內容時，要逐字核對來源文字，
不能憑記憶重打**，而且修正後一定要用 `element_id` 精確查詢重新讀回，
不能只看 API 回報的 `status: success`。

## 5-10. 經營團隊照片裁切對齊（2026-08-19）

Terris 回報 CEO／CDO 照片頭部被切到；修正後又發現四張頭部高度沒對齊。

**根本原因**：四張原始照片都是同尺寸（800×1200，2:3 直式），但每個人在照片裡的
構圖不同——用程式量測髮際線像素位置（背景灰階 vs 頭髮灰階差值 >40 判定）：

| 人物 | 髮際線位置（佔圖高比例） |
|---|---|
| CEO 康仕仲 | 14% |
| CDO 李泓其 | 15% |
| CRO 謝美芬 | 21% |
| CTO 古凱元 | 20% |

正方形裁切若用同一個裁切錨點，CEO／CDO 因為頭離頂端較近，會被切到；
改成統一往上偏（`object-position: 50% 20%`）之後，CEO／CDO 對了，
但 CRO／CTO 的頭因為原本頭頂上方留白較多，看起來比另外兩人矮一截。

**做法**：新建兩個 combo class `is-cro`（`object-position: 50% 40%`）與
`is-cto`（`object-position: 50% 37%`），只套在這兩張照片上，讓四人的髮際線
落在裁切框內的同一個相對高度。CEO／CDO 沿用 base class 的 `50% 20%` 不動。

這是目前 Client-First 命名規範裡少見的「combo 只為了裁切位置微調」用法，
若未來再加新的經營團隊成員，同樣要先用這個方法量出髮際線位置再決定
是否需要建新的 `is-*` 變體，不要直接套用 base class 就假設四人一致。

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

## 5-11 經營團隊卡片改版：2×2 玻璃疊層卡（2026-08-19）

Terris 對經營團隊卡片提出兩項變更：版面改成 2 欄 × 2 列（原本桌面 4 欄一排），
且視覺要參考站上既有的玻璃質感設計，卡片文字改用「照片鋪滿卡片 + 底部玻璃面板疊字」的作法，
玻璃面板要提高透明度、帶一點漸層底色，而不是純白實色卡。

**參考的既有玻璃樣式**：`/internship` 頁的 `.intern-voice_card` 系列
（`intern-voice_card` 卡片外框、`intern-voice_bg` 漸層底、`intern-voice_content-wrap` 絕對定位貼齊底部、
`intern-voice_content` 玻璃面板：`rgba(255,255,255,.55)` + `backdrop-filter: blur(8px)`）。
站上另有一組更複雜的 `glass-effect__*` 多層堆疊系統（用於 glass-button），
但那是按鈕專用的高光/陰影堆疊，不適合套在人像卡片上，故未採用。

**改動內容**：
- `.jp-about_leaders-grid` 桌面斷點 `grid-template-columns` 從 `repeat(4, 1fr)` 改為 `repeat(2, 1fr)`
  （medium/tiny 原本就是 2 欄／1 欄，未變動），並把 gap 放大到 `2.5rem` / `3rem` 以配合變大的卡片。
- `.jp-about_leader-card`：從 `display:flex; flex-direction:column`（照片在上、文字在下的堆疊排版）
  改成 `position:relative; overflow:hidden; aspect-ratio:3/4`，讓照片可以鋪滿整張卡。
- `.jp-about_leader-photo`：從限高的方形小圖（`aspect-ratio:1` + 自己的圓角）
  改成 `position:absolute; inset:0; width/height:100%`，鋪滿整張卡片、由卡片的 `overflow:hidden` 負責裁切。
  每人各自的 `object-position`（含 `is-cro`/`is-cto` combo）維持不變，不受影響。
- 新增兩個 class：
  - `.jp-about_leader-overlay`（`position:absolute; inset:0; display:flex; align-items:flex-end; padding:0.75rem`）
    負責把玻璃面板貼齊卡片底部。
  - `.jp-about_leader-glass`（玻璃面板本體）：
    `background-image: linear-gradient(135deg, rgba(255,255,255,.5), rgba(210,225,245,.28))`
    （帶一點藍色調的漸層，且比 intern-voice 的純白面板更透）+ `backdrop-filter: blur(16px) saturate(160%)`，
    圓角綁同一顆 radius 變數（`variable-d797394d-...`，跟卡片圓角一致），
    加了 `1px` 的半透明白色上邊框模擬玻璃反光。
- 把每張卡原本平鋪在卡片下的 `jp-about_leader-name` / `-title` / `-bio` 三段文字，
  搬進新建的 `.jp-about_leader-glass` div 內（保留原本順序：姓名 → 職稱 → 簡介）。

四張卡（CEO/CRO/CTO/CDO）都用 `data_element_tool > query_elements` 以 element_id 直接查詢驗證過，
確認 Image → overlay → glass → [name, title, bio] 的巢狀結構與順序正確。

⚠️ 待辦／待確認：玻璃面板的透明度是我抓的預估值（.5 / .28 + blur 16px），
Draft 頁面上實際看起來的可讀性請 Terris 用 Designer 預覽確認，字看不清楚的話可以再調高面板不透明度。

## 5-12 經營團隊卡片微調：縮小照片比例、拉長版面、加強模糊（2026-08-19）

Terris 看過 5-11 的玻璃卡改版後回饋：圖片現在太大、文字有點不清楚，希望版面更長、圖片不要那麼大、模糊再加強。

- `.jp-about_leader-card` `aspect-ratio` 從 `3 / 4` 拉長為 `3 / 5`（版面更長）。
- `.jp-about_leader-photo` 原本 `top/left/right/bottom` 四邊都 0（鋪滿整張卡），
  改成拿掉 `bottom`、改用 `height: 76%`（`top:0` 不變），讓照片只佔卡片上方 76% 高度，
  底部露出卡片背景色（`#eef0f3`），減少照片頂到卡片邊緣的壓迫感。
- `.jp-about_leader-glass` 模糊從 `blur(16px)` 加倍為 `blur(32px)`，
  漸層底色也從 `rgba(255,255,255,.5)→rgba(210,225,245,.28)` 微調不透明度到
  `rgba(255,255,255,.68)→rgba(210,225,245,.48)`，在維持玻璃透光感的同時提高文字可讀性。

⚠️ 待確認：這輪調整的具體數值（76% / blur 32px / .68-.48 不透明度）一樣是估值，
麻煩 Terris 在 Designer 預覽看四張卡是否已經達到想要的比例與清晰度，不夠再繼續微調。

## 5-13 修正誤解：玻璃卡片應疊在照片內，不是把照片切小露底色（2026-08-19）

Terris 糾正了 5-12 的理解錯誤：5-11 的「照片鋪滿卡片、玻璃面板疊在照片上」才是對的方向，
5-12 把照片改成只佔卡片上方 76% 高度、底部露出卡片背景色，這個「切開」的做法是錯的。
人物照片看起來太大/太近的問題，不該用「縮小照片區域、露出背景」解決，而是要在維持「照片鋪滿整卡、
玻璃面板疊在照片上」的前提下處理。

- `.jp-about_leader-photo` 移除 5-12 加的 `height: 76%`，改回 `bottom: 0%`（四邊 inset 0，鋪滿整張卡）。
- 卡片本身 5-12 拉高的 `aspect-ratio: 3 / 5`（原 5-11 是 `3 / 4`）維持不變 —
  card 3/5（寬高比 0.6）比人像照片原始比例（800×1200 = 0.667）更窄更高，
  以 `object-fit: cover` 計算，容器寬高比 < 圖片寬高比時裁切的是左右兩側而非上下，
  人物不會被垂直裁得更近，比原本 3/4（0.75 > 0.667，垂直裁切、等於局部放大臉部）更不會有「人被放大」的錯覺，
  這樣同時滿足「玻璃卡片疊在照片裡面」與「人物圖片不要太大」兩個要求，不需要把照片區域切開。
- Blur（32px）與玻璃面板不透明度維持 5-12 的數值不變，這輪沒被提出異議。

## 5-14 修正照片底部露灰的 bug，並用「卡片比例=照片原始比例」讓人物不再被放大裁切（2026-08-19）

**Bug 根因**：5-13 把 `jp-about_leader-photo` 改回 `bottom: 0%` 時沒有一併補上明確的 `height: 100%`。
`<img>` 是 replaced element，`position: absolute` 且 `height` 為預設值 `auto` 時，
瀏覽器是用「圖片原始比例 × 已定的 width」去算 `height`，並不會因為同時設了 `top:0` 和 `bottom:0`
就自動撐滿容器高度。因為卡片（`3:5`）比照片原始比例（`2:3` ≈ `0.667`）更瘦長，
算出來的圖片高度撐不滿卡片，卡片底部就露出了 `background-color: #eef0f3`（那道灰色）。
**修正**：明確補上 `height: 100%`，讓圖片依 inset 撐滿整個容器高度，不再交給瀏覽器用比例推算。

**「人物還是太大張」**：四張人物照全部是同一個原始比例 2:3（4160×6240 或等比例縮圖），
之前卡片比例先是 `3:4`、後改 `3:5`，兩者都跟照片原始比例不同，`object-fit: cover` 就得裁掉一部分
（`3:4` 裁上下、`3:5` 裁左右）才能填滿卡片，裁掉的部分等於局部放大。
這次把卡片 `aspect-ratio` 直接改成 `2 / 3`，跟照片原始比例完全一致 ——
在 `cover` 模式下，容器比例等於圖片比例時裁切量是零，等同會顯示攝影師原本拍到的完整畫面，
是「不留白邊、又最不放大人物」的技術極限，不需要犧牲滿版設計。

⚠️ 這個修法的前提是四張照片的原始比例一致（都是 2:3）；如果之後任何一位主管換照片，
且新照片比例不同，`2 / 3` 這個卡片比例就需要跟著那張新照片重新核對，否則裁切量會跑掉。
