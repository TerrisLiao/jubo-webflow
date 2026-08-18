# Slater 外部程式碼引用的 Class 清單（**這些 class 不可改名**）

> 建立日期：2026-08-18　｜　來源：實際抓取線上檔案內容比對

## 這份文件在幹嘛

Jubo 官網的站台設定（Site Settings → Custom Code）在 **head 與 footer** 載入了兩個 **Slater 託管**的外部檔案：

| 檔案 | 位置 | 內容 |
|---|---|---|
| `https://slater.app/20018/60294.css` | head | 全站互動樣式、`@font-face JuboFont`、hover 動畫 |
| `https://slater.app/20018/60292.js` | footer | GSAP／Swiper 驅動的互動（slider、parallax、mega menu、marquee…） |

**這兩個檔案不在 Webflow 裡，Webflow MCP 也看不到它們。**
它們用 **class 選擇器**直接抓 Webflow 的元素。所以：

> ⚠️ **只要改掉下列任何一個 class 的名字，線上就會壞版或壞互動，而且 Webflow 內完全不會報錯。**
> 這也是為什麼有些看起來「很髒」的命名（例如雙底線 BEM）**不能**照 Client-First 正名 — 它們被外部程式碼鎖住了。

Slater 屬於「整個網站的背景設施」，**不在一般改版的討論與修改範圍內**。

---

## 一、Slater CSS（60294.css）引用的 class

### Cascading Slider（暑期實習頁在用）
`.cascading-slider__item-inner`　`.cascading-slider__item-bg`　`.cascading-slider__img`
`.cascading-slider__item-content`　`.cascading-slider__list`
`.cascading-slider_content-wrapper`　`.cascading-slider_content-wrap`　`.cascading-slider_text-wrap`
`.is-inactive`

> 這批同時存在**雙底線**（`__`）與**單底線**（`_`）兩種寫法，且 `_content-wrap` 與 `_content-wrapper` 兩個近似名稱並存。
> 看起來像錯誤，但**兩種都被 Slater CSS 引用中，一律不可動**。
> 狀態切換是靠 `[data-cascading-slide][data-status="active"]` 這類**屬性選擇器**，不是 class。

### 按鈕與圖示
`.cta-button`　`.cta-button_bg`　`.cta-button.is-filter`
`.glass-button`　`.glass-text_wrapper`
`.gradient-icon.is-1`　`.gradient-icon.is-2`　`.gradient-icon.is-news-1`　`.gradient-icon.is-news-2`
`.icon-embed-medium`

### 導覽
`.nav-link`　`.nav-icon`　`.nav-icon.is-mobile`
`.mega-menu_wrapper`　`.mega-menu_inner-wrapper`　`.mega-menu_close`　`.mm-is-open`　`.mm-single-text_wrapper`
`.mobile-menu_wrap`　`.mobile-menu_inner-wrap`　`.mobile-menu-icon_wrap`　`.mobile-menu-is-open`
`.mobile-accordion`　`.accordion-question.is-mobile-drawer`　`.accordion-answer.is-mobile-drawer`
`.divider.is-drawer`

### Tabs／切換器
`.tab-content__bottom`　`.tab-content__item`　`.tab-content__item-bottom`　`.tab-content__item-main`
`.tab-visual__item`　`.active`
`.top-switcher_item`　`.is-active`
`.is-platform`　`.is-jubo-ai`　`.is-aa`　`.is-bb`

### 新聞與篩選
`.news_icon-wrap`　`.single-home-news_wrap`
`.news-filter_form`　`.news-filter_dropdown-highlight`
`.news-category_list`　`.news-category_list-wrap`　`.news-category_item`
`.category-radio_field.is-mobile`　`.category-radio_arrow`　`.category-radio_text`

### 客戶案例
`.single-customer-story_wrap`　`.customer-story_image-wrap`　`.customer-story_headline-wrap`　`.customer-story_pagination`

### Slider／Marquee／其他
`.slider-cms-list`　`.slider-cms-item`　`.slider-cms-wrap`　`.slider__pagination`　`.slider_btn-wrap`
`.gsap-slider__control`　`.demo-card`　`.demo-card__tag`
`.logo-marquee`　`.logo-marquee-line`　`.is-bottom`
`.marquee-expand-outer`　`.single-marquee_wrap`　`.track-vertical`　`.track-vertical-alt`
`.preview-follower__inner`　`.preview-follower__label`
`.card-wrapper`　`.home-gradient-bg`　`.richtext`
`.founder_left-wrap`　`.home-solutions_icon-link`
`.iot_cms-item`　`.single-iot_wrap.is-last-visible`　`.mobile_list-header`
`.fs-cc-prefs_component`　`.fs-cc-prefs_content`

### Slater CSS 定義／使用的 CSS 變數
`--gap`　`--radius`　`--slider-status`　`--slider-spv`　`--slider-gap`

> `cascading-slider__item` 的 `clip-path: inset(0px calc(var(--clip) * 1px) round var(--radius))` 就是靠這組變數運作，
> 由 Slater JS 在執行期寫入。**Webflow 裡看到的 `var(--radius)` 不是 Jubo Variables，不要試圖改綁。**

---

## 二、站台 head 內嵌分析程式碼引用的 class

Site Settings → Custom Code → Head 有一段 Jubo 自家的 GA4 事件程式碼，它會讀：

`.single-sales_wrap`　`.category-tag`　`.sales-contact_wrap p`　`.w-form`　`.w-form-done`

> `.category-tag` 被用來**推斷業務負責區域**（比對文字判斷「基隆新北桃園」等）。
> 改掉這個 class 名 → 業務來源分析會靜默失效，且**不會有任何錯誤訊息**。

---

## 三、動手前的檢查規則

1. 要改任何 class 名之前，先 `Ctrl+F` 搜這份文件。**有出現 → 不准改名。**
2. 真的需要調整外觀時，**改 CSS 值可以，改名字不行**。
3. 如果某個 class 又醜又被鎖住（例如 `cascading-slider__item-inner`），正確做法是**在文件註記原因**，不是硬改。
4. 這份清單會隨 Slater 上的程式碼變動而過期。Slater 有改動時，請重新比對後更新本檔。
