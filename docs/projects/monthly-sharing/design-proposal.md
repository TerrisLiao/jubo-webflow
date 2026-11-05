# 三三分享會節目專區：設計提案

> 狀態：**提案，待 Terris 確認**。依 [設計權威與頁面選擇](../../standards/設計權威分層與頁面選擇矩陣.md) §1，七項定義、Section Flow 與元件對照表確認之前，不動 Webflow Designer。
> 提案日期：2026-11-05
> 預覽 Artifact（本機模擬，非 Webflow）：<https://claude.ai/artifact/3NqKptaKNGNQoGKdQABy5F>
> 預覽右下角的工具列可切換「預告中／直播當天／播出後」三種狀態，並標示每個元素對應的 CMS 欄位；工具列不屬於正式頁面。

## 1. 範圍

兩個網站交付物，對應 [行銷 SOP](reference/行銷執行SOP.md)「事前宣傳」第一、二項：

| 交付物 | 建議網址 | 類型 | 取代 |
|---|---|---|---|
| 節目專區（Hub） | `/monthly-sharing` | 靜態頁＋多個 Collection List | 目前沒有；只有 `/community` 一張 YT 卡 |
| 單集頁範本 | `/monthly-sharing/ep19` 等 | CMS Collection Template | 每集一篇 news 文章（例：`/news/monthly-third-wednesday-sharing-202607`） |

網址沿用既有命名（`monthly-third-wednesday-sharing-*`、`jubo-health.tw/monthly-sharing-*`）。最終 slug 待確認。

## 2. 七項定義（§1 要求）

| 項目 | 定義 |
|---|---|
| 1. 目標受眾 | 長照機構第一線與管理者：負責人／主任、護理長／護理師、社工／個管、居服督導、照服員。多數是 Jubo 既有客戶（由系統 Banner 導入），也包含從 YouTube／FB 進來的非客戶。 |
| 2. 單一轉換目標 | **開啟下一集直播提醒**（YouTube 訂閱＋小鈴鐺，或加 LINE 收 11:55 提醒）。 |
| 3. 核心價值主張 | 每月第三個週三中午一小時，第一線講者把評鑑、照護、管理的實務拆開講；錯過有回放、有簡報。 |
| 4. 訪客疑慮 | 要不要錢、要不要報名；時間撞到怎麼辦；主題跟我有沒有關係；是不是在推銷產品。 |
| 5. 信任證據 | 已播出 22 集（YouTube 播放清單可查）；講師來自真實機構與基金會（典寶、老吾老、士林靈糧堂、愛之希望協會等）；過去主題清單本身。 |
| 6. Section Flow | 見 §3。 |
| 7. CTA | Primary：訂閱頻道並開啟小鈴鐺（YT `?sub_confirmation=1`）。Secondary：加入 LINE（`lin.ee/Clf7lXr`）。各集卡片上的「看回放」「索取簡報」屬於內容導覽，不與主 CTA 搶權重。 |

## 3. Section Flow

頁面類型以 §4 矩陣的「活動頁」（活動價值 → 適合誰 → 議程 → 講者 → 報名）為底，但這是**常態節目**，所以「議程」換成可篩選的集數庫，「報名」換成直播提醒。

| # | Section | 內容 | 資料來源 |
|---|---|---|---|
| 1 | Hero | 左：節目名、價值主張、主副 CTA、三個事實（已播集數／每月第三個週三 12:00／60 分鐘免費）。右：**下一集卡**（封面、EP、主題、講師、迷你月曆標出當月第三個週三、倒數天數、提醒按鈕） | 下一集卡＝CMS |
| 2 | 關於節目＋適合誰 | 三個理由＋職務 chips | 靜態 |
| 3 | 主題系列 | 4 個系列卡（評鑑準備／照護實務／AI 與數位工具／經營管理與職場），點擊後篩選下方集數 | 系列＝Option 欄位；卡片靜態，集數計數手動 |
| 4 | 全部集數 | 最新一集大卡（回放＋簡報）＋系列篩選 chips＋集數 grid（先顯示 9 集） | CMS |
| 5 | 講師陣容 | 照片、姓名、職稱｜單位、主講集數 | CMS（Speakers） |
| 6 | 直播日期 | 接下來 6 個第三個週三＋「加入 Google 行事曆（每月重複）」 | CMS 預告項目；行事曆為靜態連結 |
| 7 | 怎麼參加 | 一個月前公布 → 11:55 LINE 提醒 → 12:00 直播 → 回放與簡報（對應 SOP 時程） | 靜態 |
| 8 | FAQ | 4 題 | 靜態 |
| 9 | 收尾 CTA | YT＋LINE＋LINE QR（桌機） | 靜態 |

單集頁 Flow：麵包屑 → Hero（EP、系列、主題、時間、講師、回放／直播按鈕、封面）→ 卡關情境 → 聽完你會學到（3 點）→ 課程大綱 → 影片段落（定剪後補）→ 講師介紹 → 右側黏著「索取課程簡報」表單 → 同系列其他集 → 上一集／下一集。內容結構取自現行 EP19 頁。

## 4. Mobbin 參考與採用點

| 參考 | 採用 | 不採用 |
|---|---|---|
| [Miro webinars](https://mobbin.com/sites/sections/cd13e7bc-74ad-42e7-95f5-e57569aeb742)（Every Month 標籤＋單場大卡） | 首屏直接放「下一集」，頻率寫在標籤上 | 照片拼貼 |
| [Mural upcoming／on-demand](https://mobbin.com/sites/sections/ca210fbf-3b8c-4521-ac54-47b0b15152b1) | Hero 右側即將播出卡；回放庫加分類 chips | 黑底 Hero（違反站上禁用深色區塊） |
| [Riverside](https://mobbin.com/sites/sections/32a523f8-f6aa-49fb-902d-d3dd6122e2b0) | 日期＋標題＋說明＋封面講者的橫向卡 | — |
| [User Interviews 回放庫](https://mobbin.com/sites/sections/ca4e36d8-5a71-41fc-a17e-b2d106d34126) | 主題篩選＋縮圖卡片 grid | 左側欄搜尋（集數不多，不需要） |
| [incident.io The Debrief](https://mobbin.com/sites/sections/ae6544fb-7884-4828-b95b-bffec413bd31) | 卡片上的 EP 編號 | — |
| [Upwork Featured Past Speakers](https://mobbin.com/sites/sections/ab3a9ce6-e784-4fff-b5db-87706e9198fe) | 歷次講師牆（頭像＋職稱） | — |
| [Front](https://mobbin.com/sites/sections/52926602-e3ba-4632-a182-4e174797809e)／[Dropbox](https://mobbin.com/sites/sections/9cbd5e61-189b-4257-9de1-5ca39e199dcb) podcast | 「最新一集」大卡與其他集數分層 | 內嵌播放器（改為導 YouTube） |

本頁的獨有細節：**迷你月曆**標出當月第三個週三，「直播日期」區塊列出未來六個第三個週三，把節目名稱的由來變成可用資訊。

## 5. 元件對照（Tier A／B 優先）

| 區塊 | 使用 | 新增頁面 class（前綴 `monthly-sharing_`） |
|---|---|---|
| 全頁 | `Navbar`、`Footer`、`Page Gradient BG`、`padding-global`、`padding-section-*`、`container-large` | — |
| 標籤 | `Section Tag` component | — |
| 標題 | `h1`／`h2` tag style、`gradient-headline` | — |
| 按鈕 | `cta-button`（主）、`glass-button`（副） | — |
| 版面 | `_3col-grid`（關於、集數）、`_4col-grid`（系列） | — |
| 集數篩選 | `tab_*`（Tier B），每個 tab 一個已篩選的 Collection List | `_card`、`_card-media`、`_card-ep` |
| Hero 下一集卡 | — | `_next-card`、`_mini-cal`、`_when` |
| 講師牆、日期列、時間線 | — | `_speaker`、`_sched-day`、`_step` |
| 收尾 CTA | 優先評估既有 `CTA Section #1`；若內容不合，再做頁面專屬區塊 | `_final` |
| 簡報索取 | Webflow 原生 Form（`form-submit-btn`） | `_deck` |

不新增 Variables。系列色只用既有 `primary/accent`、`gradient/*` 的低透明度底色；若需新透明度，依 [設計變數](../../inventories/設計變數與色彩.md) 規定新增 Variable，不用 `color-mix()`。不使用深色區塊。

## 6. CMS 模型與維護

### 6-1. Collection：三三分享會集數（Episodes）

| 欄位 | 類型 | 用途 |
|---|---|---|
| Name | Plain text | 主題（例：如何與 A 個管建立良好合作關係，輕鬆通過品質監測？） |
| Slug | — | `ep19` |
| 集數 | Number | 排序、顯示 EP19 |
| 直播時間 | Date/Time | 下一集判斷、月曆、倒數 |
| 主題系列 | Option（4 選項） | 篩選 tabs |
| 狀態 | Option：預告／已播出 | 決定按鈕與 Collection List 篩選（見 6-3） |
| 封面圖 | Image | 2 個月前上傳 |
| 講師 | Multi-reference → Speakers | 一集可多位講師（EP10） |
| 卡關情境 | Rich text | 單集頁 |
| 學到 1–3 標題／說明 | Plain text ×6 | 單集頁三張卡 |
| 講綱 | Rich text | 單集頁 |
| 直播／回放連結 | Link | YouTube 同一網址 |
| 段落摘要 | Rich text（選填） | 定剪後補；空值時顯示「定剪後補上」 |
| 開放簡報 | Switch | 講師授權後打開；控制表單顯示 |
| 簡報下載連結 | Link | 表單成功後顯示 |
| 精華文章 | Reference → 新聞中心（選填） | 例：成茵茵 B16 精華文 |
| SEO 標題／描述 | Plain text | |

### 6-2. Collection：三三分享會講師（Speakers）

姓名、照片（需講師授權）、職稱、單位、簡介、是否為智齡團隊（Switch）。講師牆排序：外部講師在前。

### 6-3. 每月維護節奏（對應 SOP）

| 時間 | SOP 項目 | 網站動作 |
|---|---|---|
| 每半年 | 主題規劃與講師推薦 | 建立未來 6 集項目（狀態＝預告，只填集數與直播時間），讓「直播日期」區塊自動列出 |
| 3 個月前 | 確認講師通告 | 建立／更新 Speaker；填主題、講綱、系列 |
| 2 個月前 | 封面圖 | 上傳封面圖 |
| 1 個月前 | 系統 Banner 曝光 | **Publish**：Hub 下一集卡與單集頁上線，Banner 連到單集頁 |
| 直播後 | YT 上架 | 狀態改「已播出」，確認回放連結 |
| 2–3 天後 | 定剪、段落摘要 | 補段落摘要；講師同意後打開「開放簡報」並填下載連結 |
| 2 週後 | FB 回顧 | 若有精華文章，加上 Reference |

> ⚠️ 未驗證：Webflow Collection List 的日期篩選（「直播時間在未來」）是否在每次請求即時計算，或只在 Publish 時計算。若只在 Publish 時計算，直播後就要重新 Publish，否則「下一集」會卡在已播出的那集。實作前先在 staging 驗證；在驗證之前，以「狀態」欄位手動切換為準。

### 6-4. 程式碼

只有兩處需要少量客製程式：倒數天數與迷你月曆（讀取 `data-` 屬性中的直播時間）、篩選 tabs 若改用 chips 外觀。原始碼放 `custom-code/monthly-sharing/`，依 [Slater 鎖定清單](../../../custom-code/slater-selectors.md) 不改既有 class。

## 7. 待確認

1. 網址：`/monthly-sharing` 是否可用；舊 news 文章與 `jubo-health.tw/monthly-sharing-*` 短網址是否轉址到新單集頁。
2. 舊集數是否全部搬進 CMS（EP01–EP22，播放清單缺 EP02、EP05），還是只從新集數開始。
3. 未知講師資料（EP01、EP02、EP04、EP05、EP13–EP18、EP20、EP21）與講師照片授權。
4. 簡報索取表單：Webflow 原生表單，或串 HubSpot（本 session 的 HubSpot 連線失敗，未查證現況）。
5. 頁面入口：Navbar「資源」下拉、Footer、`/community` YT 卡是否改連本頁。
6. 「聊天室留言提問」是否為實際直播做法（預覽文案已寫入，未查證）。
7. 是否保留 2025 年的「填問卷抽獎」機制；若保留，單集頁需加活動辦法區塊（不公開得獎者個資）。
