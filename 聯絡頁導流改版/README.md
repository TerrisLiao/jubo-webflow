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

改版後（2026-09-10 收工時）的順序：
Hero（置中，原按鈕列已隱藏）→ **`section_contact-router` 兩顆選擇按鈕** →
（選了才展開：**居服** = 居服窗口卡＋居服系統 banner｜**住宿／日照** = 5 位客戶經理）→
站內表單 `#form` → 服務據點 → CTA → Footer

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
> 卡片標題是職稱而非人名，未給虛構全名。若之後要改成人名，改 h3 一處即可。
>
> **2026-09-10 Terris 定案文案**：職稱用「**客戶成功顧問**」（原「居服顧問窗口」），
> 名稱下方那顆標籤（`.category-tag`「居家服務單位專屬窗口」）**移除**，
> CTA 改成「**立即預約居服展示**」，區塊標題改成「**居服單位請洽客戶成功顧問**」。

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
      │   ├ h2.text-align-center 「居服單位請洽客戶成功顧問」
      │   └ p.text-align-center 「留下你的服務需求與所在區域，我們會安排對應的客戶成功顧問與你聯繫。」
      └ .homecare-contact_card
        ├ .homecare-contact_portrait > img.homecare-contact_photo
        └ .homecare-contact_info-wrap
          ├ .homecare-contact_inner-wrap
          │   └ .homecare-contact_name-wrap
          │       └ h3.card_h2 「客戶成功顧問」
          └ [CTA Button] 「立即預約居服展示」→ Microsoft Forms（新分頁）
```

> **2026-09-10 文案定版**：名稱下方原本有一顆 `.category-tag` >
> div「居家服務單位專屬窗口」，已依 Terris 指示**移除**（區塊標題與 Section Tag
> 已經說明受眾，那顆標籤是重複資訊）。`.homecare-contact_name-wrap` 現在只剩 h3。
> 注意 `.category-tag` 本身仍被住宿卡的 `.category-tag.is-audience` 使用，**不要刪 class**。

### 3-2 `#sales` 加上區塊標題

`sales_component` 最前面插入 `.section-header_wrapper`：

- [Section Tag]「住宿・日照機構」
- h2「找到你所在區域的客戶經理」
- p「以下客戶經理服務住宿型機構與日照中心；居服單位請切回上方的「我是居服單位」，由客戶成功顧問為你安排。」

  > 這句原本寫「請由**上方的居服顧問窗口填寫需求表單**」。改名之後它同時壞了兩件事：
  > 指到一個已不存在的名稱，而且「上方」在改成 switcher 之後也不成立（兩個面板是切換、不是上下堆疊）。
  > 已一併改掉 —— 這是改名的連帶修正，不是額外的文案改動。

### 3-3 業務卡的服務對象標籤 —— 已移除（2026-09-10）

原本在 `.sales-info_inner-wrap` 內、`.sales-name_wrap` 之後新增了
`.category-tag.is-audience` > div「服務對象：住宿型機構・日照中心」，
`is-audience` 是 combo class（透明底＋1px teal 外框 `--primary--accent`）。

**Terris 於 2026-09-10 指示移除**，與居服卡那顆標籤一起收掉。
該元素在 CMS list item 的模板裡，移除一次即對五張卡片同時生效（已讀回確認 0 個殘留）。

改成 switcher 之後，受眾其實已經由「我是住宿／日照機構」這顆按鈕與區塊標題交代完，
每張卡片再重複一次同樣的字是多的。

> ⚠️ **`.category-tag.is-audience` 這個 combo class 現在沒有任何元素在用**。
> 它是本次專案新建的，尚未 publish（已確認不在正式站的樣式表裡），
> 所以沒有其他頁面依賴。要不要刪掉這個 combo class 待 Terris 決定 —— 我沒有自行刪。
> `.category-tag` 本體仍被業務卡的區域標籤使用，**絕對不要刪**。

### 3-4 入口統一與標籤層級

- 居服 banner「申請 Demo」的 Link 由 `pageSection → #form` 改為 Microsoft Forms（與 Hero 同一份）
- 業務卡姓名 `.card_h2` 由 `h2` 改為 `h3`（**只改 tag，class 名不動**）

### 3-6 「選了才展開」＋自訂展開動畫（2026-09-10 最終版）

Terris 的要求演進：不要一進來就攤開兩邊內容 → 要有 toggle down ＋ fade in → 按鈕太長 →
**改用自訂 code**。過程中做過兩個版本，最後定案在第三版。

| 版本 | 做法 | 為什麼換掉 |
|---|---|---|
| v1 | Webflow 原生 Tabs | 沒有淡入；`w--current` 選中樣式不在 MCP 可寫範圍；預設開啟的 tab 也讀不到 |
| v2 | 沿用 Slater 的 `initPlatformSwitcher()` | 只有 `opacity` 淡入，**沒有 height 0 → auto 的向下展開** |
| **v3（現行）** | **頁面層自訂 CSS ＋ JS** | Terris 明確要求用自訂 code，取得完整控制 |

> v2 那次讀 Slater JS 的收穫仍然有效，而且留下兩個沿用資產：
> `.top-switcher_wrapper.is-product`（白框、白 30% 底、blur、圓角 50px、`padding .25rem`、`position: static`）
> 與 `.top-switcher_item`（圓角 50px；`.is-active` 是實心 teal ＋ 白字；Slater CSS 另給 hover 淡青底 ＋ 0.15s transition）。
> **v3 的 JS 一樣是加 `.is-active`，所以選中樣式照舊由站上的 CSS 負責，沒有新造樣式。**

#### 修掉的居服／住宿混在一起

`section_home-care-banner`（Section Tag「居服系統」、H2「派班更順手，核銷更省力」、
CTA「申請 Demo」→ 居服 Microsoft Forms）原本在 switcher **外面**，現已移進居服面板。

> ⚠️ **2026-09-10 更正**：我起初寫的理由是「選住宿／日照的人會撞到一整段居服推銷」，
> 這是**錯的**。回頭讀站上 CSS，`.section_home-care-banner` 的 **base 層就是 `display: none`**，
> 也就是這段 banner 在改版前**根本沒有顯示**，沒有任何受眾混淆發生。
> 搬進居服面板本身沒有壞處（它仍然是 `display:none`，不會出現），
> 但它現在的位置代表「日後若要讓這段 banner 現身，該由居服單位看到」。
> **待 Terris 決定**：居服訪客到底該不該看到這段 banner？要的話得先解掉 base 層的 `display:none`
> （那是共用 class，改動要先確認沒有別的頁面依賴）。

判斷留在面板外的內容：站內表單 `#form`（異業合作／其他洽詢）、服務據點、`CTA Section #1`
都是共通資訊，維持在面板外。

#### 現行結構

> **2026-09-10 追加調整**：選擇按鈕原本放在 `section_contact-router` 最上方，
> 結果剛好壓在 Hero 與下一段的背景交界上，看起來像被切一刀（Terris 回報）。
> 已把整組入口**搬進 Hero 的 `product-hero_center-wrap`**
> （原本那兩顆 CTA 的位置，它們仍是隱藏狀態），面板留在下方的 router section。
> `bringIntoView()` 的捲動目標也跟著改成入口本身，這樣入口會停在 navbar 下方、
> 剛展開的面板正好在它底下。

#### 入口從 segmented pill 改成兩張選擇卡（2026-09-10）

Terris 回報：**同事一開始沒選擇時，不知道下面還有內容**。

診斷：問題不是「按鈕不夠明顯」，是**控件的形狀在傳達錯的意思**。
`top-switcher_wrapper.is-product` 是 segmented pill（半透明白底、細字、兩段等寬），
這種控件的語意是「在已經看得到的東西之間切換」。但這裡它下面什麼都沒有，
而且**兩段都沒有 `.is-active`**（沒選之前整顆只是一片淡淡的白），所以它讀起來像裝飾。
再加上標籤是身分句（「我是居服單位」）而不是動作句，更像篩選器的選項。

改法（Terris 選定「把按鈕獨立出來」）：

- 新增 `.contact-choice_wrap[data-router="wrapper"]`，內含兩張
  `.contact-choice_item`（Link Block），各自有 `.contact-choice_title`
  ＋ `.contact-choice_desc`（一行說明）＋ `.contact-choice_arrow`（→）。
- **舊的 `top-switcher_wrapper.is-product` 設為隱藏，並移除它的 `data-router="wrapper"`**，
  確保頁面上只有一個 router wrapper（已讀回確認 total_matches = 1）。
  沒有刪除，待 Terris 確認後再刪（見待辦）。
- 下方加一行 `.contact-choice_hint`「選擇後，下方會顯示對應的聯絡窗口」——
  直接講出「下面有東西」，這是同事漏看的那件事。

**為什麼是上下堆疊而不是並排**：入口一度放在 `.product-hero_center-wrap`
（`max-width: 45rem` 又位在 `.product-hero_component` 的 `.85fr` 欄裡，桌機實測只有 573px）。
兩張 22rem（352px）的卡片要並排需要 728px，塞不進去。實測比較過兩案：

| | 卡片實際寬度 | 觀感 |
|---|---|---|
| 並排（縮到 15rem） | 240px | 塞得下，但卡片變小 —— 跟「要更明顯」的目標相反 |
| **上下堆疊（採用）** | **576px × 102px** | 兩顆大按鈕，很難漏看 |

#### 入口最後放在 `section#choose`，不在 hero（2026-09-10 Terris 指示）

Terris 回報「完全是錯誤的沒辦法點，直接把按鈕做到下一個 section，不要放到 hero」。
已把 `contact-choice_wrap` ＋ `contact-choice_hint` 整組移到 `section#choose` 最上方的
`padding-global > container-large` 裡，面板留在下方的
`contact-router_component > contact-router_stage`。
因為 `container-large` 是 82rem，入口卡另加 `max-width: 36rem` ＋ 左右 `auto` 置中
（實測 576px，與先前在 hero 欄裡驗過的 573px 幾乎一致）。

> **關於「沒辦法點」的原因**：我在 hero 的 CSS 裡**找不到**會擋住點擊的覆蓋層 ——
> `.product-hero_twoside-wrap` 雖然是 `position: absolute; inset: 0` 蓋住整個 hero，
> 但 `.product-hero_center-wrap` 有 `z-index: 4`（`.hero-top-img` 只有 2／3），
> 入口卡在它上面、應該收得到點擊。
> 最可能的原因是**Preview 不執行 page custom code**：點下去 JS 沒跑、
> 面板由 class 保持 `display: none`，而 `href="#choose"` 就在附近，
> anchor 跳轉幾乎看不出移動 —— 看起來就完全沒反應。
> **staging 實測支持這個推論**：入口卡的中心點用 `document.elementFromPoint()` 測，
> 最上層就是卡片本身（`blockedBy: null`），沒有任何覆蓋層。

#### staging 實測（2026-09-10，已發布輸出）

發布到 `jubo-health.webflow.io` 之後，把**已發布的 HTML 與它引用的 19 個 CSS／JS
全部抓到本機**（站上的 Lenis、Webflow JS、Slater、GSAP、jQuery 都在），
用容器內的 Chromium 實際點擊。這是整個功能第一次在真實輸出上被驗證：

| 步驟 | stage 高度 | 居服面板 | 住宿面板 | active |
|---|---|---|---|---|
| 初始 | 0（inline 空） | `display:none` | `display:none` | 無 |
| 點「我是居服單位」 | 1214（inline `auto`） | `block`、`is-open` | `none` | homecare |
| 切「我是住宿・日照機構」 | 1832（inline `auto`） | `none` | `block`、`is-open` | residential |
| 再點同一顆 | 0 | `none` | `none` | 無 |

另外確認：

- **`window.lenis` 存在** → 站上跑的是 `bringIntoView()` 的 Lenis 分支
  （帶 navbar clearance 的那條），fallback 那條不會用到。
- **入口卡收得到點擊**：兩張卡在中心點的 `elementFromPoint()` 都是卡片自己，
  `blockedBy: null`，尺寸 576×102。
- 頁面沒有來自這支 code 的 JS 錯誤（只有兩個是本機 harness 造成的：
  `about:blank` 下讀 cookie 被拒、以及被 abort 的外部 script 造成的語法錯誤）。

> 抓資源的做法留在 `custom-code/contact-router-test/`（`fetch-site-css.sh` 同款）。
> 容器內的瀏覽器沒有外網，所以是「抓到本機再攔截請求供應」，
> 圖片與 Google Fonts 直接 abort —— **行為驗得準，視覺不代表站上**。

#### 副標題移除 ＋ 留白加大（2026-09-10 Terris 指示）

Terris：「整體的 space 我希望多一點，然後卡片的副標題不需要保留。」

- 兩張卡的 `.contact-choice_desc`（「由客戶成功顧問為你安排」／「找你所在區域的客戶經理」）
  **已移除元素**。卡片高度 102px → **77px**。
  `.contact-choice_desc` 這個 class 現在沒有元素在用（未刪，見待辦）。
- 新增 `.contact-choice_layout` 掛在入口的外層 div，取代原本的 `padding-global`。
  **為什麼不並用兩個 class**：MCP 的 `set_style` 一次給兩個 class 會回
  `One or more styles not found`（`TabsMenu` 那次也一樣）。
  所以把 `padding-global` 的左右值逐一抄進 `contact-choice_layout`
  （desktop `--desktop-spacer--medium`、tablet `--tablet-spacer--small`、
  mobile `--mobile-spacer--small`），再加上自己的上下留白
  （desktop 4rem／tablet 3rem／mobile 2rem）。
  ⚠️ 之後如果 `padding-global` 的值有變，這裡要一起改。
- 卡片間距 1rem → **1.5rem**；提示行 `margin-top` .75rem → **1.5rem**。

#### 再一輪：拿掉提示行、卡片縮短、箭頭改 gradient arrow（2026-09-11）

Terris：「這個說明文字我覺得不需要，然後整個卡片不需要那麼長，你可以把箭頭製作成 gradient arrow。」
（附了 navbar「預約諮詢」那顆按鈕的截圖當參考）

- **提示行 `contact-choice_hint` 元素已移除**（class 未刪，見待辦）。
- **卡片寬度 36rem → 24rem**（實測 576px → **384px**）。
  24rem 不是隨便挑的：業務卡 `.single-sales_wrap` 與居服卡 `.homecare-contact_card`
  都是 24rem，這樣全頁的卡片同寬。
  > 我把「不需要那麼長」讀成**寬度**（跟先前「按鈕有點太長」同一個用法）。
  > 若指的是高度，把 `.contact-choice_item` 的上下 padding 從 1.5rem 調小即可。
- **箭頭改用站上現成的 gradient arrow**，不自己配色：
  來源是 navbar `.glass-button`「預約諮詢」裡的 `.gradient-icon` —— 一支 18×18 的 SVG，
  `linearGradient` 由 `#00B2C0`（offset .389）漸層到 `#3B58FF`（opacity .72）。
  做法是 `.contact-choice_arrow`（2rem 白色圓形徽章）內放一個 HTML Embed
  `.contact-choice_arrow-icon`（1.125rem）承載該 SVG。

  ⚠️ **SVG 的 id 一定要改過**：原檔的 `mask0_9287_5721` / `paint0_linear_9287_5721`
  在 navbar 已經出現，同一頁重複 id 會讓 `fill="url(#…)"` 指到**文件中第一個**同名
  gradient（也就是 navbar 那個）。這裡改成 `cc_arrow_homecare` / `cc_arrow_residential`。

  站上那顆徽章 `.glass-element.is-icon` 另外有 `transform: rotate(-45deg)`（所以看起來是 ↗）
  與 7 層 `glass-effect__*`。**我沒有照抄那兩件**：箭頭維持指向右（→），
  因為 ↗ 的語意是「開到別的地方」，而這兩顆是原地展開。要改成斜的就是加一行 rotate。

republish 後實測（桌機 1440）：卡片 **384 × 82**、箭頭徽章 32 × 32、徽章內確認有 `linearGradient`；
hero 底到第一張卡 64px、兩張卡之間 24px、最後一張卡底到下一段 64px。
行為未受影響（stage 0 → 1214 → 1832 → 0）。

#### 再一輪：箭頭交棒動畫、玻璃質感、/login 的服務 icon（2026-09-11）

Terris：「指標會有一個箭頭動畫你沒有做進去，然後玻璃感跟其他的做得不一樣，
可以幫我加點陰影跟模砂增加質感。然後新增放在登入畫面裡面的 icon。」

**1. 箭頭交棒動畫** —— navbar 的 `.glass-button` 裡本來就有兩顆 `.gradient-icon`
（`is-1` / `is-2`），hover 時一顆滑出、一顆滑進。我先前只放了一顆，所以沒有動畫。
現在每個徽章放兩顆（`.contact-choice_arrow-icon.is-1` / `.is-2`），
位移與時序寫在 page head code（見下方說明）。

> **MCP 小發現**：`set_style` 一次給兩個**獨立的 global class** 會失敗
> （`One or more styles not found`），但給「base + combo」的**組合鏈**是可以的。
> 所以 `["contact-choice_arrow-icon", "is-1"]` 成功，
> 而稍早 `["padding-global", "contact-choice_layout"]` 失敗。

**2. 玻璃質感** —— 原本是 `white-50` ＋ `blur(5px)` ＋ 一條淡灰邊，比站上其他玻璃薄。
改成直接抄 `/login` 的 `.card-wrapper.is-login-hub`（站上最完整的一套）：

| | 之前 | 現在 |
|---|---|---|
| 底色 | `--neutral--white-50`（0.5） | `#ffffffd1`（0.82） |
| 模糊 | `blur(5px)` | **`blur(22px)`** |
| 邊框 | `--jbc-line` | `#ffffffc7` |
| 陰影 | 無 | `0 10px 28px #22393c14, inset 0 1px #ffffffe0` |
| hover | 只換邊框色 | `0 20px 54px #22393c1c, inset 0 1px #ffffffe0` ＋ 邊框 `#00b2c06b` |

選中（teal）狀態另給 `0 14px 34px #00b2c047, inset 0 1px #ffffff59`，
箭頭徽章也加了 `0 4px 10px #00b2c024, inset 0 0 0 1px #ffffffc7`。

> 這些是**色碼字面值不是變數** —— 因為我是逐項照抄 `.card-wrapper.is-login-hub`
> 與 `.glass-element` 的既有寫法，站上那些規則本來就用字面值。

**3. /login 的服務 icon** —— 來源 `.login-hub_service-icon`（`/login` 三張卡片上的那組）：
**月亮＝住宿型、太陽＝日照、手捧愛心＝居服**。對應到兩張入口卡：

- 「我是居服單位」→ 手捧愛心 × 1
- 「我是住宿・日照機構」→ 月亮 ＋ 太陽

尺寸用 2rem（`/login` 是 2.5rem，這裡小一號才不會把卡片撐高），
`filter: drop-shadow(0 8px 12px #00b2c029)` 照抄。

> ⚠️ **SVG 的 fill 改成吃 CSS variable**：選中的卡片是實心 teal，而 icon 的圓底
> 也是 `#00B2C0`，兩者同色會讓圓底「消失」、只剩淺色圖形浮著。
> 所以把兩個 fill 改成 `var(--cc-icon-bg, #00B2C0)` / `var(--cc-icon-fg, #F0FEFF)`
> —— **預設值就是 /login 的原色，靜止時與原檔完全一致**；
> 選中時在 head code 裡對調成白底 teal 圖形，跟同一張卡上的白色箭頭徽章一致。

**已發布輸出上實測 13 項全過**，包含動畫本身：靜止時箭頭 1 在中央、箭頭 2 藏在
左邊 −31px；hover 700ms 後箭頭 1 到 +31px、箭頭 2 回到 0。
四個 gradient id 都不重複也沒撞到 navbar 的。

republish 到 staging 後實測（桌機 1440）：

| | 改之前 | 現在 |
|---|---|---|
| hero 底 → 第一張卡 | 0px（直接貼著） | **64px** |
| 兩張卡之間 | 16px | **24px** |
| 提示行底 → 下一段的線 | 33px | **64px** |
| 卡片高度 | 102px | 77px |
| router section 總高 | 253px | 351px |

行為未受影響（stage 0 → 1214 → 1832 → 0，active 正確換手）。

#### 那條「線」是什麼（2026-09-10 查清）

Terris 回報入口卡下面有一條線。在已發布輸出上把 hero 到 footer 之間
每個 section 的背景都量過，結論很乾淨：

| Section | 位置 | 背景 |
|---|---|---|
| `section_about-hero` | 116 → 621 | 透明 |
| `section_contact-router` | 621 → 972 | 透明 |
| **`section_contact-form`** | **972 → 2313** | **`rgba(255,255,255,0.3)`** |
| `section_location` | 2313 → 3400 | 透明 |
| `section_cta` | 3400 → 4111 | 透明 |
| `section_footer` | 4111 → 4828 | `#175e5e` |

`body` 是 `#f8f8f8`。所以**section 層裡只有 `section_contact-form` 有背景**，
它的白 30%（`--neutral--white-30`）疊在 #f8f8f8 上，上緣就是那條線。

section 之外還有兩個背景層（都是站上原有的，與這條線無關）：

- `.home-gradient-bg` × 2 —— `radial-gradient` ＋ `filter: blur(50px)`，
  y 0→900（hero 的動態光暈，就是畫面上那片藍青色）
- `.section_nav` —— `linear-gradient(rgba(255,255,255,.7) …)`，y 0→116

這條線在改版前就存在，只是以前入口不在它正上方所以沒人注意。

**已處理（2026-09-10，Terris 選定「拿掉表單段的背景」）**：

1. 先把線推遠：入口的上下留白讓提示行底到線的距離 33px → 64px。
2. 動手前**掃過全站**確認 `section_contact-form` 的使用範圍 ——
   從 sitemap 取 162 個 URL、按路徑前綴收斂成 26 個代表頁（同模板的只取一個）逐頁抓，
   結果**只有 `/contact` 用到，且只有一個實例**，其他頁面都是 0。
3. 讀回該 class 的完整樣式：**它只有一個屬性** `background-color: --neutral--white-30`，
   沒有任何斷點變體。移除該屬性後這個 class 變成空的（元素仍掛著，只是沒樣式）。

republish 後實測，hero 到 CTA 之間**每一個 section 都是透明**，
只有 footer 有背景（`#175e5e`，本來就該有）。線消失。

> 這是唯一能真正讓線消失的一刀。把入口段改成同樣的白 30% 只會把邊界搬到
> hero 底部（也就是搬到卡片上方），不會更好。

> ⚠️ **副作用（待 Terris 決定）**：hero 的 h1 還是「選擇您的機構類型」，
> 但 hero 裡已經沒有可選的東西了。入口移到下一段之後，
> 桌機上可能剛好落在折線附近 —— 這跟「同事不知道下面有內容」是同一個風險。
> 建議在 `section#choose` 補一組 section header（Section Tag ＋ 短標題），
> 讓那一段自己有標題；或把 hero 的 h1 改成會往下指的說法。我沒有自行改。

`.contact-choice_item` 的 `.is-active` 是實心 teal ＋ 白字；
說明與箭頭都用 `color: currentColor`（說明另加 `opacity: .65`），
所以選中時整張卡的文字會一起轉白，不需要為每個子元素再開 combo class。

自訂 code **完全不用改** —— 它只認 `[data-router="wrapper"]` /
`[data-router-target]` / `[data-router-panel]`，不綁 class。
harness 換成新 markup 後 25 項全過。

```
section.section_about-hero
└ … product-hero_center-wrap
   ├ Section Tag「聯絡我們」／h1「選擇您的機構類型」／說明段
   ├ div.contact-routing_buttons.is-center（舊的兩顆 CTA，已隱藏）
   └ div.top-switcher_wrapper.is-product（舊的 pill，已隱藏、已移除 data-router）

section#choose.section_contact-router
├ div.contact-choice_layout                             ← 分流入口在這裡（2026-09-10 從 hero 搬來）
│   └ div.container-large
│       └ div.contact-choice_wrap[data-router="wrapper"]   （max-width 24rem 置中，實測 384px）
│           ├ a.contact-choice_item[data-router-target="homecare"]     href="#choose"
│           │   ├ .contact-choice_icon-row > .contact-choice_service-icon > Embed（手捧愛心＝居服）
│           │   ├ .contact-choice_text-wrap > .contact-choice_title「我是居服單位」
│           │   └ .contact-choice_arrow                    （2rem 圓形徽章、overflow clip 當遮罩）
│           │       ├ .contact-choice_arrow-icon.is-1 > Embed（gradient arrow）
│           │       └ .contact-choice_arrow-icon.is-2 > Embed（同一支，hover 交棒用）
│           └ a.contact-choice_item[data-router-target="residential"]  href="#choose"
│               ├ .contact-choice_icon-row                （月亮＝住宿型、太陽＝日照）
│               │   ├ .contact-choice_service-icon > Embed
│               │   └ .contact-choice_service-icon > Embed
│               ├ .contact-choice_text-wrap > .contact-choice_title「我是住宿・日照機構」
│               └ .contact-choice_arrow > .is-1 / .is-2
└ div.contact-router_component
   └ div.contact-router_stage[data-router="stage"]        ← 高度過場在這一層
      ├ div.contact-router_panel[data-router-panel="homecare"]
      │   ├ section#homecare.section_homecare-contact   （居服窗口卡）
      │   └ div.section_home-care-banner                （居服系統 ＋ 申請 Demo，base 層 display:none）
      └ div.contact-router_panel[data-router-panel="residential"]
          └ div#sales.section_sales                      （5 位區域客戶經理）
```

`contact-router_component` 的 `row-gap` 必須是 **0**：收合的面板高度是 0 但仍佔一個 flex row，
留 gap 會讓兩個面板的起點差一個 gap 的距離（原本 2rem），切換時看起來就會錯位。

- **高度動畫由 `stage` 那一層負責，面板自己只管 `display` 與 `opacity`**。
  所以面板可以（也應該）用 `display: none` 收合 —— 高度動畫不在面板上，不會失效。
  收合狀態的正本在 Webflow class（見下一節），不在 custom code。
- v2 的「隱藏 placeholder item ＋ 空面板」那套 hack 已移除，自訂 code 的預設狀態本來就是全收合。
- 兩顆按鈕保留 `href`（`#homecare` / `#sales`），因為站台 head 的 GA4 只監聽 `a[href]`；
  JS 會 `preventDefault()` 擋掉 anchor 跳轉，但 GA4 是 **capture 階段**監聽，會在那之前就送出事件。

#### 收合狀態放在 class，不放在 custom code（2026-09-10 修正）

第一次裝自訂 code 時，把「預設收合」也寫在 code 的 CSS 裡，結果 Terris 在 Preview 看到的是
**卡片沒有隱藏、按鈕只會 scroll**。原因：**Webflow 的 Designer 與 Preview 都不執行 page custom code**，
只有發布出去（staging 或正式站）才會跑。所以在 Preview 等於「沒有 code」的狀態——
面板沒被隱藏（`display:none` 已被移除），按鈕的 `href="#homecare"` 就只剩下 anchor 捲動。

修正方式：把狀態搬進 Webflow 的 class，code 只留 JS。

| 選擇器 | 內容 |
|---|---|
| `.contact-router_stage` | `width:100%`、`height:0`、`overflow:hidden`、`transition: height 800ms cubic-bezier(.22,.61,.36,1)` |
| `.contact-router_panel` | `width:100%`、`display:none`、`opacity:0`、`transition: opacity 900ms ease 150ms` |
| `.contact-router_panel.is-open` | `display:block`、`opacity:1` |

這樣「沒按按鈕時是隱藏的」在 **canvas、Preview、發布後三個地方都一致**，JS 掛掉也還是隱藏。
`.is-open` 還有一個好處：**在 Designer 要編輯面板內容時，暫時把 `is-open` 這個 combo class
加到面板上就會顯示**（同時要把 stage 的 `height` 臨時改成 `auto`），編完再移除。
（執行期 JS 寫的 inline `height` / `opacity` 優先於 class，不會互相干擾。）

#### 為什麼要多一層 `stage`（2026-09-10 修，Terris 回報「切換時 section 一條線跳出」）

前一版是**每個面板自己動高度**：切換時舊面板高度先歸零，新面板再從 0 長起來。
中間那一瞬間兩個面板都是 0，**頁面總高度會瞬間掉 1300 多 px 再長回來**。
整頁漸層 `.gradient-bg`（`position: absolute; inset: 0`）跟著猛地重算，
畫面上就看到一道區塊邊界閃過 —— Terris 形容「像是一整個 section 開又關」。

改成由 `.contact-router_stage` 這一層擁有高度之後，高度是從**舊面板的高度**
連續動到**新面板的高度**（實測 1328px → 1028px），中間不歸零，頁面高度全程連續。
自動測試裡有兩項專測這件事（見 5b），並做過反向對照：把切換那一段改回「瞬間歸零」會 fail。

收尾時 JS 把 stage 的 inline height 交還給 `auto`，
這樣面板內容日後變高（CMS、換行、RWD）也不會被 `overflow: hidden` 切掉。

#### 自訂 code

- **位置**：`/contact` 的 Page Settings → Custom Code → Inside `<head>`（**只有這一頁**，不是站台層）
- **只負責時序**：鎖 stage 當下高度、量新面板高度、把 stage 高度動到那個值、切 `.is-open`、
  `preventDefault()` ＋ `stopPropagation()`，加上內容 `translateY(-1.5rem) → 0` 的位移。
  所有「狀態」與「過場曲線」都在 Webflow class 上。

#### 按鈕的 href 為什麼指向 `#choose`（2026-09-10 修正）

原本兩顆按鈕的 href 是 `#homecare` / `#sales`（指向自己面板裡的區塊），
用意是保留 `a[href]` 讓 head 的 GA4 抓得到。但 Terris 回報「選住宿型時畫面捲太下面」——
`#sales` 在展開的居服面板下面，一跳就跳很深。兩種情況都會這樣：

1. 在 Preview（custom code 不跑）→ 純瀏覽器 anchor 跳轉
2. 已發布，但 **Webflow 自己的平滑捲動或站上載入的 Lenis** 不理 `preventDefault()`

修法兩層保險：

- `section_contact-router` 加上 DOM id `choose`，兩顆按鈕的 href 改成 `#choose`（指向選擇器自己），
  所以就算真的被捲，也只是原地。
- code 裡多一行 `event.stopPropagation()`，擋掉 Webflow 與 Lenis 掛在 **document bubble 階段**的
  捲動處理。GA4 那段是 `capture: true`，在 bubble 之前就跑完，事件照樣送。

`#homecare` / `#sales` 這兩個 DOM id 保留（可能有站外連結指過來），只是不再被按鈕使用。
- **原始檔**：[`custom-code/contact-router.html`](../custom-code/contact-router.html)（repo 為準，改動請兩邊同步）
- **選擇器範圍**：只有 `[data-router="wrapper"]`、`[data-router-target]`、`[data-router-panel]`。
  刻意不用 Slater 的 `data-platform-switcher`／`data-platform-panel`，避免兩套程式同時控制同一個面板。
- **切換時序**（2026-09-10 由 Terris 指定，共改過三輪）：

  1. 舊卡片**直接淡出** —— 先把 **stage** 的 `height` 鎖成當下的實際高度，再給舊卡片
     `.is-fading`（`opacity: 0`，300ms）。淡出期間版面完全不動、不會回流
  2. 淡完 → 舊卡片 `display:none`、新卡片 `display:block`（此時仍透明、且內容位移在上方）
  3. **stage 高度從舊高度連續動到新高度** ＋ 新卡片淡入 ＋ 內容由上往下滑入就位

  第 2 步的 inline 起始值（`opacity: 0` ＋ `translateY`）必須由 JS 寫上、下一格 rAF 才清掉；
  否則元素剛從 `display: none` 變出來的那一格瀏覽器不會跑 transition，會直接跳出來。

  「點同一顆關閉」走另一條路：舊卡片淡出，同時 stage 高度動到 0。

- **時間參數**

  | 項目 | 值 | 定義在哪 |
  |---|---|---|
  | 舊卡片淡出 | 300ms ease | code 的 `.is-fading` ＋ `FADE_OUT` |
  | stage 高度 | 800ms `cubic-bezier(.22,.61,.36,1)` | class `.contact-router_stage` ＋ code 的 `EXPAND` |
  | 新卡片淡入 | 900ms、延遲 150ms | class `.contact-router_panel` |
  | 新卡片滑入 | `translateY(-1.5rem) → 0`、900ms、延遲 150ms | code |
  | 捲動 | 1.4s（Lenis） | code 的 `SCROLL` |

  ⚠️ **兩組必須成對維護**：`EXPAND` = `.contact-router_stage` 上 height 的 duration；
  `FADE_OUT` = `.is-fading` 的 opacity duration。不一致的話高度會在過場途中被改成
  `auto` 而跳一下，或舊卡片還沒淡完就被換掉。

- **方向一律由上往下**。之前讓兩個面板同時變高變矮，下面那個會被回流往上拉，
  看起來像由下往上冒出來 —— 所以才改成「先淡出、再換」，並把高度收到 stage 一層。
- **捲動**：`bringIntoView()` 把**按鈕**帶到 navbar 下方（navbar 高度執行期量測 ＋24px），
  優先用站上的 `window.lenis.scrollTo`，沒有才退回 `scrollIntoView`。
  捲動是在舊卡片淡出結束、新卡片開始展開時才觸發。
- **行為**：點另一顆 → 舊的收合、新的展開；點同一顆 → 收合（真 toggle）。
- **保護**：`prefers-reduced-motion: reduce` 時不做過場；`<noscript>` 會把面板還原成展開，
  JS 掛掉時內容不會消失。
- **驗收限制（重要）**：page custom code **在 Preview 也不會跑**。
  Preview 只能確認「預設是隱藏的」；**要看展開動畫必須發布到 staging（webflow.io）或正式站**。
  想要在 Preview 就能看到動畫，唯一的路是改用 Webflow Interactions（IX2），而 MCP 碰不到 IX2。

> **鐵律 4 的例外登記**：`00_AI工作守則.md` 鐵律 4 寫「不要寫自訂 CSS」。
> 本次是 2026-09-10 Terris 明確指示「動畫就用自訂寫 code」後採用，範圍限定 `/contact` 一頁、
> 只作用在 `data-router-*`，不影響任何共用 class 與其他頁面。

**新增 class**：`section_contact-router`、`contact-router_component`、`contact-router_stage`、`contact-router_panel`（＋ combo `is-open`）、
`contact-choice_wrap`、`contact-choice_item`（＋ combo `is-active`、hover）、`contact-choice_text-wrap`、
`contact-choice_title`、`contact-choice_desc`、`contact-choice_arrow`、`contact-choice_hint`。

### 3-5 新增的 class（全部照 Client-First `folder_element` 命名）

| Class | 用途 | 關鍵值 |
|---|---|---|
| `section_homecare-contact` | 區塊容器 | 無樣式（照鐵律 3） |
| `homecare-contact_component` | 內容容器 | flex column, center, gap `--desktop-spacer--regular` |
| `homecare-contact_card` | 卡片 | `aspect-ratio 2/3`、`width 24rem`、`radius 1.25rem`、`overflow clip`；medium → ratio auto；small → 100% / max 24rem |
| `homecare-contact_portrait` | 頭像框 | `aspect-ratio 1/1.15`、`overflow clip`、**`min-height 0`** |
| `homecare-contact_photo` | 頭像圖 | `100% / 100% / object-fit cover` |
| `homecare-contact_info-wrap` | 資訊層 | padding `--desktop-spacer--small`、bg `--neutral--white-50`、`backdrop-filter blur(5px)` |
| `homecare-contact_inner-wrap` | 內層 | flex column, gap `--desktop-spacer--small`（small → mobile 版） |
| `homecare-contact_name-wrap` | 名稱列 | flex column, gap .5rem |
| `.category-tag.is-audience` | ~~服務對象標籤（combo）~~ **2026-09-10 標籤已移除，此 combo class 現為未使用** | 透明底＋1px `--primary--accent` 外框 |

幾何值刻意抄自 `.single-sales_wrap` / `.sales-portrait` / `.sales-info_wrap`，
讓居服卡與業務卡並排時完全對齊。**沒有修改任何既有共用 class 的值，也沒有新增自訂 CSS 或 HTML Embed。**

#### `homecare-contact_portrait` 的 `min-height: 0` 是必要的（2026-09-10 修）

Terris 回報「居服頭像太長太大張，沒跟業務的一樣」。實測後發現**兩個頭像框宣告的
`aspect-ratio` 本來就都是 `1/1.15`，但居服卡實際算出來是 1:1.5**（384×576，
而不是 384×441.6）—— 那正是照片自己的 2:3 比例。

原因：`.homecare-contact_portrait` 是欄向 flex item，`min-height` 預設 `auto`，
對欄向 flex item 來說**自動最小高度＝內容高度**。框裡的
`<img class="homecare-contact_photo">` 是 `height: 100%`，遇到不確定的父高度會退回
圖片原生高度（照 384px 寬換算 = 576px），把外框的 `aspect-ratio` 頂開。

**業務卡沒事是因為 `.sales-portrait` 是 `background-image` 的空 div**，
沒有 in-flow 內容就沒有內容最小高度。

> 教訓：抄幾何值不等於抄到一樣的結果。`background-image` 的空 div 與包 `<img>` 的框，
> 在 flex 裡的行為不一樣。

修法是 `min-height: 0`（base 層，所有斷點都吃到）。已有自動測試守著：
`custom-code/contact-card-geometry-test/`（4 項，含反向對照）。

修好之後兩張卡的**頭像尺寸完全一致**（384×441.6）。移除服務對象標籤後，
卡片總高只差 22px（業務卡資訊區 165.6px、居服卡 142px），頭像佔比 72.9% 對 75.7%。
那是資訊量差異，不是幾何設定差異，而且兩張卡分屬 switcher 的兩個面板、
永遠不會同時出現，所以沒有強制對齊。

---

## 4. 待辦

| # | 事項 | 負責 |
|---|---|---|
| 1 | ~~照片上架~~ **已完成 2026-09-10**：asset `6aa22521339ce4908d70c4bb`（`jubo-homecare-window.webp`，132 KB），alt「Jubo 客戶成功顧問示意形象」（隨改名同步更新）；`.homecare-contact_photo` 的 `object-position` 設 `50% 22%`，因為原圖是 2:3、卡片框是 1:1.15，會從上下裁切，往上偏才不會切到頭 | 已完成 |
| 2 | ~~決定卡片標題~~ **已定案 2026-09-10**：用職稱「客戶成功顧問」，不用人名 | 已完成 |
| 3 | ~~要看展開動畫必須發布到 staging~~ **已完成 2026-09-10**：Terris 授權後發布到 `jubo-health.webflow.io`（`publishToWebflowSubdomain: true`、`customDomains: []`，兩個正式域名沒有動）。已在已發布輸出上實測通過，見下方「staging 實測」 | 已完成 |
| 4 | 動畫參數要調（stage 高度 800ms、淡出 300ms、淡入 900ms delay 150ms、滑入 `translateY(-1.5rem)`、捲動 1.4s）就直接說。改 `custom-code/contact-router.html` → 重跑測試 → 再同步到頁面 head（2026-09-10 已確認 repo 與站上 head 逐字一致） | Claude |
| 5 | 桌機／平板／手機三個斷點目視驗收（含頭像裁切 `object-position: 50% 22%` 要不要微調） | Terris |
| 5c | 頭像幾何已有自動測試：`custom-code/contact-card-geometry-test/`（4 項全過，用正式站樣式表 ＋ 正式站業務卡 markup 實測）。改 `homecare-contact_portrait` / `homecare-contact_photo` / `sales-portrait` 之後要重跑 | Claude |
| 5b | 行為邏輯已有自動測試：`custom-code/contact-router-test/`（容器內 Chromium，**24 項**檢查全過，含切換時序、以及「切換全程 stage／整頁高度不歸零」）。測試會把 `contact-router.html` 原封不動塞進 harness 模板再跑，所以驗過的就是裝上去的那份。改 code 或改那幾個 class 的值之後要重跑 | Claude |
| 6 | Hero 那兩顆隱藏的舊 CTA Button ＋ 隱藏的 `top-switcher_wrapper.is-product` 確認可以刪了再刪（都還留著、都已設為隱藏） | Terris |
| 7 | Publish | Terris 授權後 |
| 8 | 第三階段：`#form` 正名為「異業合作與其他洽詢」；`銷售部門s` 加「服務對象」欄位 | 未排 |
| 9 | `06_自訂Class完整清單.md` 需重新讀回快照（本次新增 12 個 class，含 `contact-router_stage`） | 未排 |
| 11 | ~~拿掉 `.section_contact-form` 的背景~~ **已完成 2026-09-10**：Terris 選定移除。全站掃過只有 `/contact` 用到、只有一個實例；該 class 也只有這一個屬性。移除後 hero 到 CTA 全透明，線消失。**副作用**：聯絡表單那一段失去原本那層白 30%，現在與其他段同為 `#f8f8f8` | 已完成 |
| 10b | `.contact-choice_desc` 與 `.contact-choice_hint` 現在都沒有元素在用（副標題與提示行已移除）。要刪嗎？ | Terris |
| 10a | `.category-tag.is-audience` combo class 現在沒有元素在用（標籤已移除、尚未 publish、正式站樣式表裡沒有它）。要刪嗎？ | Terris |
| 10 | **居服訪客該不該看到 `section_home-care-banner`？** 它的 base 層是 `display: none`（改版前就沒顯示過）。要讓它現身得先解掉那條規則，而那是共用 class，需先查全站有無其他頁面依賴 | Terris |

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
- **Webflow MCP 不支援 Interactions（IX2）**：沒有任何 interactions 工具，所以「點擊 → 淡入展開 → 自動捲動」
  這種體驗必須在 Designer 手動建。本次改用原生 Tabs 就是為了避開這個限制。
- **agent 看不到渲染結果**：展開動畫、收合行為、頭像裁切位置都需要人在 Preview 確認。
  自訂 code 是寫完直接裝上去的，**沒有經過任何實機驗證**。
- **Slater 外部檔案是可以讀的**：`https://slater.app/20018/60294.css` 與 `60292.js` 都是公開 URL，
  用 curl 抓下來就能看。`00_AI工作守則.md` §6-6 寫「MCP 也讀不到」是指 MCP，不代表讀不到內容。
  這次就是靠讀 JS 才發現站上已經有 switcher 可以沿用。**但仍然不可以改 Slater 上的程式碼。**
