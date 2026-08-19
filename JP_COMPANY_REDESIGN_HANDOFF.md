# /jp/company 重新設計與 Claude Code 交接

> 狀態：待實作。現有 Webflow Company 頁只有內容骨架與初步排版，**不可視為設計完成**。
>
> 工作範圍：Webflow Draft 頁面 /jp/company，以及 /jp/overview 與公司頁的導線。不得發布。

## 1. 任務目標

把現有 /jp/company 從文字骨架重做成符合 Jubo 設計系統、也符合日本 B2B／醫療科技公司信任邏輯的正式公司介紹頁。

必須解決目前問題：

- Hero 是黑底配低對比深色文字，閱讀性不合格。
- 頁面缺少 Page Gradient BG，沒有承接 Jubo 既有視覺語言。
- 幾乎沒有圖片、人物、團隊、投資人 Logo、據點等視覺證據。
- 多數區塊只是重複灰色文字卡，沒有日式企業網站常見的清楚層級與節奏。
- 公司概要做成行銷卡片；應改為容易掃讀的 label/value 資料表或 definition list。
- 目前使用部分舊 class（例如 jp3-*、jp-partner_*），新頁不得繼續擴充這些命名。
- Company 頁缺少獨立 Landing Page 必備的 Global Style、Cookies、Page Gradient BG。

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
- /jp/company Page ID：6a8537247cf50018fca7c68d
- /jp/company root element：f1e5920f-a6c9-5244-9116-755da162b421
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

## 6. 固定內容順序與設計線框

內容順序不得改動，但每一區都要有明確視覺設計。

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
  - 按鈕：認識 Jubo → /jp/company
- 檢查兩頁導線為雙向且正確。
- 不把中文提前換成未校對日文。

## 8. 圖像與視覺語言

- 優先使用 Webflow Assets 中既有 CEO 肖像、團隊／辦公室、照護現場、產品與投資人 Logo。
- 有真實資產時，不使用生成式人物或泛用庫存照。
- 版面基調：大量留白、明確網格、可信的企業資訊、少量柔和漸層做品牌識別。
- 避免整頁深色、黑底黑字、背景效果不可見、卡片海與所有區塊同一節奏。
- 漸層不是裝飾補丁：Hero、Manifesto、CTA 三處建立一致的視覺節奏，其餘區塊保持克制。

## 9. Notion 邊界

現有老師校對頁：

- /jp/overview：
  https://app.notion.com/p/3b1d4f1889c5819e85cfdf512368a57e?pvs=204
- /jp/company：
  https://app.notion.com/p/3c1d4f1889c5817497dbec682c6884ad?pvs=204

兩頁只保留三欄：區塊／中文／日文。日文留白給老師。

不要把設計規格、研究備註、來源連結、工作流程或內部 TODO 放入 Notion。若 Webflow 中文內容有實質變更，再同步老師需要翻譯的中文原文即可。

## 10. 實作代辦

### P0：結構與可讀性

- [ ] 先補足 11 家不重複日本官網研究並留下精簡紀錄。
- [ ] 備份／記錄現有 /jp/company 的結構，避免誤刪簽名 Embed。
- [ ] 加入 Global Style、Cookies、Page Gradient BG。
- [ ] 修正 Hero 低對比與黑底問題。
- [ ] 確認 main tag、Client-First nesting 與 container。
- [ ] 移除新頁對 jp3-*、jp-partner-* legacy class 的依賴。
- [ ] 不修改全站 Component、utility、variables。

### P1：完整視覺重做

- [ ] Hero 加入可見漸層、真實照片、CTA 與 trust hierarchy。
- [ ] CEO 區加入肖像與三段故事節點。
- [ ] Manifesto 建立 editorial／glass／gradient panel，保留原 signature Embed。
- [ ] Timeline 改成交錯圖文或有年份 anchor 的視覺時間軸。
- [ ] Team 改為照片／角色矩陣，不用五張普通灰卡。
- [ ] Partners 使用真實 Logo grid。
- [ ] Company Profile 改為 label/value table。
- [ ] Access／日本合作窗口做成清楚的雙欄或上下層級。
- [ ] CTA 複用既有元件並檢查連結。
- [ ] /jp/overview 與 /jp/company 雙向導線正確。

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
