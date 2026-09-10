# 聯絡頁導流改版（/contact）

> 目的：讓居服單位停止直接聯繫住宿／日照的區域客戶經理，改走居服專屬表單。
> 頁面：`聯絡` `/contact`（page id `6a029cadbc58c46b16389346`）
> 決策日：2026-09-10（Terris）｜執行：Claude Code
> 狀態：第一階段已做在 Webflow 上，**未 publish**，等 Terris 驗收

---

## 1. 現況診斷（2026-09-10 從 Webflow 與線上 HTML 讀回）

改版前的頁面順序：

1. Hero `section_about-hero`：H1「選擇您的機構類型」＋兩顆同款 `cta-button`
   （「我是居服單位」→ 外部 Microsoft Forms；「我是住宿/日照機構」→ `#sales`）
2. `#sales` `section_sales`：`銷售部門s` CMS，5 位區域客戶經理（照片、姓名、區域、Email、電話、LINE）
3. `#form` `section_contact-form`：站內 Webflow 表單，`data-ga-form-type="partnership"`，最後一欄「合作內容」
4. 居服 banner「派班更順手，核銷更省力」＋「申請 Demo」→ 原本指向 `#form`
5. 服務據點 CMS → `CTA Section #1` → Footer

問題（按影響排序）：

| # | 問題 | 證據 |
|---|---|---|
| 1 | `#sales` 完全沒有區塊標題 | `sales_component` 底下只有 CMS list，無 Section Tag／H2／說明 |
| 2 | 卡片沒有標示服務對象 | `category-tag` 只綁 CMS `Title`（區域職稱） |
| 3 | `#sales` 是滾動路徑上第一個內容區塊 | 居服單位在看到任何表單前先看到 5 張真人臉＋LINE |
| 4 | 居服有兩個互相衝突的目的地 | Hero → Microsoft Forms；居服 banner「申請 Demo」→ `#form`（partnership 表單） |
| 5 | 視覺權重反向 | Hero 兩顆按鈕同款無主次；真人卡片視覺強度遠高於按鈕 |

**量測盲點**：站台 head 的 GA4 程式在 `sales_contact_click` 一律預設
`solution_interest: 'residential_day_care'`，所以現有數據看不出有多少居服單位在點業務。

---

## 2. Terris 的決策（2026-09-10）

| 項目 | 決定 |
|---|---|
| 居服窗口卡形式 | **虛擬人物**，但不留電話與 LINE，唯一 CTA 是表單；視覺與業務卡對齊 |
| 頭像素材 | Terris 提供的既有照片（teal 平塗背景棚拍頭像，與 5 位業務照同風格） |
| 回覆時效 | **不寫**「一個工作日」之類的承諾 |
| 業務名單 | 先加標題與標籤，名單維持一直可見（不做隱藏／分流） |
| 居服表單 | 維持 Microsoft Forms，**統一入口**（Hero 與居服 banner 同一份） |
| 業務姓名標籤層級 | h2 → **h3** |

> Claude 對「虛擬人物」的保留意見已提出並被 Terris 確認採用：
> 官網掛查不到的員工，機構指名找人時會破功。因此實作採**角色優先**——
> 卡片標題目前是「居服顧問窗口」而非人名，未給虛構全名。若之後要改成人名，改 h3 一處即可。

---

## 3. 第一階段已完成（Webflow，未 publish）

### 3-1 新增區塊 `#homecare`（放在 Hero 之後、`#sales` 之前）

```
section#homecare.section_homecare-contact
└ .padding-global.padding-section-large
  └ .container-large
    └ .homecare-contact_component
      ├ .section-header_wrapper
      │   ├ [Section Tag] 「居家服務單位」
      │   ├ h2.text-align-center 「居服單位，由專屬窗口為你安排」
      │   └ p.text-align-center 「留下你的服務需求與所在區域，我們會安排對應的居服顧問與你聯繫。」
      └ .homecare-contact_card
        ├ .homecare-contact_portrait > img.homecare-contact_photo   ← 待放照片
        └ .homecare-contact_info-wrap
          ├ .homecare-contact_inner-wrap
          │   └ .homecare-contact_name-wrap
          │       ├ h3.card_h2 「居服顧問窗口」
          │       └ .category-tag > div 「居家服務單位專屬窗口」
          └ [CTA Button] 「填寫居服需求表單」→ Microsoft Forms（新分頁）
```

### 3-2 `#sales` 加上區塊標題

`sales_component` 最前面插入 `.section-header_wrapper`：

- [Section Tag]「住宿・日照機構」
- h2「找到你所在區域的客戶經理」
- p「以下客戶經理服務住宿型機構與日照中心；居服單位請由上方的居服顧問窗口填寫需求表單。」

### 3-3 業務卡加服務對象標籤

`.sales-info_inner-wrap` 內、`.sales-name_wrap` 之後新增
`.category-tag.is-audience` > div「服務對象：住宿型機構・日照中心」。

`is-audience` 是 combo class：透明底＋1px teal 外框（`--primary--accent`），
與填色的區域標籤形成主次差異。

### 3-4 入口統一與標籤層級

- 居服 banner「申請 Demo」的 Link 由 `pageSection → #form` 改為 Microsoft Forms（與 Hero 同一份）
- 業務卡姓名 `.card_h2` 由 `h2` 改為 `h3`（**只改 tag，class 名不動**）

### 3-5 新增的 class（全部照 Client-First `folder_element` 命名）

| Class | 用途 | 關鍵值 |
|---|---|---|
| `section_homecare-contact` | 區塊容器 | 無樣式（照鐵律 3） |
| `homecare-contact_component` | 內容容器 | flex column, center, gap `--desktop-spacer--regular` |
| `homecare-contact_card` | 卡片 | `aspect-ratio 2/3`、`width 24rem`、`radius 1.25rem`、`overflow clip`；medium → ratio auto；small → 100% / max 24rem |
| `homecare-contact_portrait` | 頭像框 | `aspect-ratio 1/1.15`、`overflow clip` |
| `homecare-contact_photo` | 頭像圖 | `100% / 100% / object-fit cover` |
| `homecare-contact_info-wrap` | 資訊層 | padding `--desktop-spacer--small`、bg `--neutral--white-50`、`backdrop-filter blur(5px)` |
| `homecare-contact_inner-wrap` | 內層 | flex column, gap `--desktop-spacer--small`（small → mobile 版） |
| `homecare-contact_name-wrap` | 名稱列 | flex column, gap .5rem |
| `.category-tag.is-audience` | 服務對象標籤（combo） | 透明底＋1px `--primary--accent` 外框 |

幾何值刻意抄自 `.single-sales_wrap` / `.sales-portrait` / `.sales-info_wrap`，
讓居服卡與業務卡並排時完全對齊。**沒有修改任何既有共用 class 的值，也沒有新增自訂 CSS 或 HTML Embed。**

---

## 4. 待辦

| # | 事項 | 負責 |
|---|---|---|
| 1 | ~~照片上架~~ **已完成 2026-09-10**：asset `6aa22521339ce4908d70c4bb`（`jubo-homecare-window.webp`，132 KB），alt「Jubo 居服顧問窗口示意形象」；`.homecare-contact_photo` 的 `object-position` 設 `50% 22%`，因為原圖是 2:3、卡片框是 1:1.15，會從上下裁切，往上偏才不會切到頭 | 已完成 |
| 2 | 決定卡片標題是否改成人名（目前是「居服顧問窗口」） | Terris |
| 3 | 桌機／平板／手機三個斷點目視驗收 | Terris |
| 4 | Publish | Terris 授權後 |
| 5 | 第二階段：Hero 兩顆按鈕做主次、或用 Finsweet `fs-list` 讓業務名單只在選了住宿／日照後顯示 | 未排 |
| 6 | 第三階段：`#form` 正名為「異業合作與其他洽詢」；`銷售部門s` 加「服務對象」欄位 | 未排 |
| 7 | `06_自訂Class完整清單.md` 需重新讀回快照（本次新增 8 個 class ＋ 1 個 combo） | 未排 |

---

## 5. 技術限制與注意事項

- **不要把居服卡改掛 `single-sales_wrap` / `sales-contact_wrap`。** 站台 head 的 GA4 程式會掃
  `.single-sales_wrap`，把 `.sales-contact_wrap p` 裡像電話的段落自動包成 `tel:` 連結，
  並對卡內 line.me／tel 點擊送 `sales_contact_click`（`solution_interest` 預設 `residential_day_care`）。
  沿用會讓居服卡被誤記成業務接觸。
- **居服卡的量測不需要改 head 程式**：該程式對 `/contact` 上任何指向 `forms.cloud.microsoft`
  的連結會自動送 `contact_route_select(home_care)` ＋ `homecare_form_open`。
- CTA Button 的 `rel` prop 會在 body 裡渲染出一個多餘的 `<link rel="noopener noreferrer">`
  （Hero 居服按鈕就有）。本次新增的兩顆按鈕**只設 openInNewTab、沒設 rel**，避免再增加。
- **驗證限制**：本帳號沒有 Webflow Analyze 權限（實測 403 `Analyze entitlement required`），
  無法從 MCP 取得改版前後的點擊數，成效要看 GA4／GTM。
- Slater 的 `60294.css` / `60292.js` 是外部檔案，MCP 讀不到，只能確認 head 內嵌程式的行為。
