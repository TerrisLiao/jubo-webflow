> **快照提醒（2026-08-20）：** 本清單不是 Webflow 自動同步資料，可能不含 PR #2 之後新增或遷移中的 JP class。處理日本頁時同時閱讀 `../JP日本市場頁面改版/11_2026-08-20_樣式與結構稽核.md`，刪除前仍須查 Designer 全站使用與 Slater／IX2 依賴。

# 06｜自訂 Class 完整清單（依 Folder 分組）

全站 global class 共 **945** 個，其中含底線的自訂 class（custom class）共 **538** 個，分佈於 **165** 個 folder。

Client-First 規則：一個底線 `_` = 一層 folder。命名為 `folder_element`，folder 與 element 內部用連字號 `-` 連接。

> AI 使用原則：**先在本清單找有沒有現成的 class**，找到就直接沿用；找不到才依 `folder_element` 規則新建，且 folder 名稱要沿用既有慣例（例如 `product-features_`、`hero-solutions_`）。

### `section_` （59 個）

- `section_2col-sticky`
- `section_404`
- `section_IoT-filter`
- `section_about`
- `section_announce-bar`
- `section_big-text`
- `section_cases-slider`
- `section_client-logo`
- `section_client-meeting-event`
- `section_company-hero`
- `section_contact-form`
- `section_cta`
- `section_cta-process`
- `section_culture`
- `section_customer-story`
- `section_faq`
- `section_footer`
- `section_hero`
- `section_hero-customer-story`
- `section_hero-solutions`
- `section_home-about`
- `section_home-care-banner`
- `section_home-news`
- `section_home-solutions`
- `section_internship`
- `section_jubo-ai_cards`
- `section_location`
- `section_long-term-resource`
- `section_manifesto`
- `section_manual`
- `section_nav`
- `section_news-content`
- `section_news-grid`
- `section_page-header`
- `section_platform-form`
- `section_popup`
- `section_privacy-terms`
- `section_product-big-numbers`
- `section_product-cases`
- `section_product-features`
- `section_product-hero#1`
- `section_product-hero#2`
- `section_product-hero#3`
- `section_product-hero#4`
- `section_product-hero#5`
- `section_product-intro`
- `section_product-prices`
- `section_product-scroll-card`
- `section_product-switcher`
- `section_related-news`
- `section_sales`
- `section_share-event`
- `section_solutions-basic-model`
- `section_solutions-bento`
- `section_solutions-brand`
- `section_solutions-why-us`
- `section_tab`
- `section_tag`
- `section_testimonial_cards`

### `fs-styleguide_` （40 個）

- `fs-styleguide_1-col`
- `fs-styleguide_2-col`
- `fs-styleguide_3-col`
- `fs-styleguide_4-col`
- `fs-styleguide_background`
- `fs-styleguide_background-space`
- `fs-styleguide_buttons`
- `fs-styleguide_classes`
- `fs-styleguide_colors`
- `fs-styleguide_component`
- `fs-styleguide_empty-box`
- `fs-styleguide_header`
- `fs-styleguide_header-block`
- `fs-styleguide_heading-header`
- `fs-styleguide_heading-medium`
- `fs-styleguide_headings`
- `fs-styleguide_hero-label`
- `fs-styleguide_icons`
- `fs-styleguide_item`
- `fs-styleguide_item-header`
- `fs-styleguide_item-wrapper`
- `fs-styleguide_label`
- `fs-styleguide_margins`
- `fs-styleguide_max-width`
- `fs-styleguide_message`
- `fs-styleguide_other-tags`
- `fs-styleguide_paddings`
- `fs-styleguide_row`
- `fs-styleguide_section`
- `fs-styleguide_section-header`
- `fs-styleguide_spacer-box`
- `fs-styleguide_spacers`
- `fs-styleguide_spacing`
- `fs-styleguide_spacing-all`
- `fs-styleguide_spacing-directions`
- `fs-styleguide_spacing-sizes`
- `fs-styleguide_structure`
- `fs-styleguide_text-classes`
- `fs-styleguide_utility-classes`
- `fs-styleguide_webflow-elements`

### `fs-cc-prefs_` （21 個）

- `fs-cc-prefs_button`
- `fs-cc-prefs_buttons-wrapper`
- `fs-cc-prefs_checkbox`
- `fs-cc-prefs_checkbox-field`
- `fs-cc-prefs_checkbox-label`
- `fs-cc-prefs_close`
- `fs-cc-prefs_close-icon`
- `fs-cc-prefs_component`
- `fs-cc-prefs_content`
- `fs-cc-prefs_form`
- `fs-cc-prefs_label`
- `fs-cc-prefs_option`
- `fs-cc-prefs_overlay`
- `fs-cc-prefs_space-medium`
- `fs-cc-prefs_space-small`
- `fs-cc-prefs_submit-hide`
- `fs-cc-prefs_text`
- `fs-cc-prefs_title`
- `fs-cc-prefs_toggle`
- `fs-cc-prefs_toggle-wrapper`
- `fs-cc-prefs_trigger`

### `jp-partner-v4_` （18 個）

- `jp-partner-v4_category`
- `jp-partner-v4_copy`
- `jp-partner-v4_cta-slot`
- `jp-partner-v4_feature`
- `jp-partner-v4_features`
- `jp-partner-v4_image`
- `jp-partner-v4_lockup`
- `jp-partner-v4_media`
- `jp-partner-v4_merit`
- `jp-partner-v4_merit-copy`
- `jp-partner-v4_merit-index`
- `jp-partner-v4_merit-title`
- `jp-partner-v4_merits`
- `jp-partner-v4_note`
- `jp-partner-v4_panel`
- `jp-partner-v4_product-logo-large`
- `jp-partner-v4_title`
- `jp-partner-v4_value-block`

### `cascading-slider_` （12 個）

- `cascading-slider__collection`
- `cascading-slider__img`
- `cascading-slider__item`
- `cascading-slider__item-bg`
- `cascading-slider__item-content`
- `cascading-slider__item-inner`
- `cascading-slider__list`
- `cascading-slider_content-wrap`
- `cascading-slider_content-wrapper`
- `cascading-slider_icon`
- `cascading-slider_icon-wrap`
- `cascading-slider_text-wrap`

### `customer-story_` （11 個）

- `customer-story_cms-item`
- `customer-story_cms-list`
- `customer-story_cms-list-wrap`
- `customer-story_content-wrap`
- `customer-story_image-wrap`
- `customer-story_other-content-wrap`
- `customer-story_pagination`
- `customer-story_template-component`
- `customer-story_template-headline-wrap`
- `customer-story_template-left-wrap`
- `customer-story_template-right-wrap`

### `footer_` （11 個）

- `footer_bottom-wrap`
- `footer_col-inner-wrap`
- `footer_col-link-wrap`
- `footer_col-wrap`
- `footer_component`
- `footer_content`
- `footer_left-wrap`
- `footer_path-left`
- `footer_path-wrap`
- `footer_right-wrap`
- `footer_utility-link-wrap`

### `product-hero#3_` （10 個）

- `product-hero#3_button-wrapper`
- `product-hero#3_component`
- `product-hero#3_content-bottom`
- `product-hero#3_content-top`
- `product-hero#3_image`
- `product-hero#3_image-list`
- `product-hero#3_image-list-bottom`
- `product-hero#3_image-list-top`
- `product-hero#3_image-wrapper`
- `product-hero#3_images-layout`

### `tab-content_` （9 個）

- `tab-content__bottom`
- `tab-content__inner`
- `tab-content__item`
- `tab-content__item-bottom`
- `tab-content__item-main`
- `tab-content__wrap`
- `tab-content_img-bg-shadow`
- `tab-content_img-wrapper`
- `tab-content_text-wrapper`

### `fs-cc-banner_` （8 個）

- `fs-cc-banner_button`
- `fs-cc-banner_buttons-wrapper`
- `fs-cc-banner_close`
- `fs-cc-banner_component`
- `fs-cc-banner_container`
- `fs-cc-banner_text`
- `fs-cc-banner_text-link`
- `fs-cc-banner_trigger`

### `jp-partner_` （8 個）

- `jp-partner_hero-actions`
- `jp-partner_hero-full`
- `jp-partner_hero-glow`
- `jp-partner_hero-inner`
- `jp-partner_hero-kicker`
- `jp-partner_hero-lead`
- `jp-partner_hero-primary`
- `jp-partner_hero-title`

### `navbar3_` （8 個）

- `navbar3_container`
- `navbar3_link`
- `navbar3_logo`
- `navbar3_logo-link`
- `navbar3_menu`
- `navbar3_menu-background`
- `navbar3_menu-button`
- `navbar3_menu_wrap`

### `product-hero#4_` （8 個）

- `product-hero#4_component`
- `product-hero#4_content-bottom`
- `product-hero#4_content-right`
- `product-hero#4_content-wrapper`
- `product-hero#4_gallery`
- `product-hero#4_image`
- `product-hero#4_image-wrapper`
- `product-hero#4_ix-trigger`

### `glass-effect_` （7 個）

- `glass-effect__edge-dark`
- `glass-effect__edge-light`
- `glass-effect__fill`
- `glass-effect__fill-burn`
- `glass-effect__highlight-soft`
- `glass-effect__highlight-strong`
- `glass-effect__inner-glow`

### `header#1_` （7 個）

- `header#1_component`
- `header#1_content`
- `header#1_image`
- `header#1_image-wrapper`
- `header#1_images-wrapper-left`
- `header#1_images-wrapper-right`
- `header#1_ix-trigger`

### `hero-solutions_` （7 個）

- `hero-solutions_component`
- `hero-solutions_content`
- `hero-solutions_image`
- `hero-solutions_image-wrapper`
- `hero-solutions_images-wrapper`
- `hero-solutions_inner-wrapper`
- `hero-solutions_ix-trigger`

### `jubo-ai_` （7 個）

- `jubo-ai_cards_component`
- `jubo-ai_cards_content-item`
- `jubo-ai_cards_content-left`
- `jubo-ai_cards_content-right`
- `jubo-ai_image_wrap`
- `jubo-ai_info`
- `jubo-ai_item`

### `IoT_` （6 個）

- `IoT_cms-item`
- `IoT_cms-list`
- `IoT_cms-list-wrap`
- `IoT_filter`
- `IoT_table-header`
- `IoT_table-wrap`

### `cta-process_` （6 個）

- `cta-process_component`
- `cta-process_content`
- `cta-process_tab-link`
- `cta-process_tab-progress-wrapper`
- `cta-process_tab-wrapper`
- `cta-process_tabs-menu`

### `news-content_` （6 個）

- `news-content_component`
- `news-content_cover-img`
- `news-content_list`
- `news-content_list-item`
- `news-content_list-wrap`
- `news-content_wrap`

### `product-scroll-card_` （6 個）

- `product-scroll-card_component`
- `product-scroll-card_content`
- `product-scroll-card_content-left`
- `product-scroll-card_content_wrap`
- `product-scroll-card_item`
- `product-scroll-card_list`

### `testimonial32_` （6 個）

- `testimonial32_client`
- `testimonial32_client-image-wrapper`
- `testimonial32_client-info`
- `testimonial32_customer-image`
- `testimonial32_rating-icon`
- `testimonial32_rating-wrapper`

### `css-tooltip_` （5 個）

- `css-tooltip__box`
- `css-tooltip__box-inner`
- `css-tooltip__card`
- `css-tooltip__card-text`
- `css-tooltip__card-title`

### `footer7_` （5 個）

- `footer7_link`
- `footer7_link-list`
- `footer7_logo`
- `footer7_logo-link`
- `footer7_top-wrapper`

### `hero-customer-story_` （5 個）

- `hero-customer-story_component`
- `hero-customer-story_content`
- `hero-customer-story_image_mask`
- `hero-customer-story_item`
- `hero-customer-story_wrapper`

### `home-news_` （5 個）

- `home-news_cms-item`
- `home-news_cms-list`
- `home-news_cms-list-wrap`
- `home-news_component`
- `home-news_headline-wrap`

### `mobile-menu_` （5 個）

- `mobile-menu_btn-wrap`
- `mobile-menu_content-wrap`
- `mobile-menu_inner-wrap`
- `mobile-menu_link-wrap`
- `mobile-menu_wrap`

### `news_` （5 個）

- `news_category-wrap`
- `news_component`
- `news_cover-img`
- `news_cover-img-wrap`
- `news_icon-wrap`

### `news-card_` （5 個）

- `news-card_category-date-wrap`
- `news-card_headline-inner-wrap`
- `news-card_headline-wrap`
- `news-card_hidden`
- `news-card_wrap`

### `product-features_` （5 個）

- `product-features_component`
- `product-features_tabs-content`
- `product-features_tabs-menu`
- `product-features_tabs-pane`
- `product-features_tabs_tab-link`

### `testimonial_` （5 個）

- `testimonial_cards_component`
- `testimonial_cards_content-item`
- `testimonial_cards_content-left`
- `testimonial_cards_content-right`
- `testimonial_cards_content-wrap`

### `2col-sticky_` （4 個）

- `2col-sticky_component`
- `2col-sticky_headline-wrap`
- `2col-sticky_left-wrap`
- `2col-sticky_right-wrap`

### `category-radio_` （4 個）

- `category-radio_arrow`
- `category-radio_btn`
- `category-radio_field`
- `category-radio_text`

### `location_` （4 個）

- `location_cms-item`
- `location_cms-list`
- `location_cms-list-wrap`
- `location_component`

### `mega-menu_` （4 個）

- `mega-menu_blur`
- `mega-menu_content-component`
- `mega-menu_inner-wrapper`
- `mega-menu_wrapper`

### `sales_` （4 個）

- `sales_cms-list`
- `sales_cms-list-item`
- `sales_cms-list-wrap`
- `sales_component`

### `solutions-basic-model_` （4 個）

- `solutions-basic-model_accordion`
- `solutions-basic-model_component`
- `solutions-basic-model_list`
- `solutions-basic-model_wrap`

### `announce-bar_` （3 個）

- `announce-bar_bg`
- `announce-bar_component`
- `announce-bar_link`

### `bento_` （3 個）

- `bento_item`
- `bento_text_btn-wrapper`
- `bento_title`

### `cards-stack_` （3 個）

- `cards-stack__collection`
- `cards-stack__item`
- `cards-stack__list`

### `cases_` （3 個）

- `cases_content`
- `cases_content-wrap`
- `cases_info_wrap`

### `comparison_` （3 個）

- `comparison_col`
- `comparison_item`
- `comparison_wrap`

### `faq5_` （3 個）

- `faq5_answer`
- `faq5_icon-wrapper`
- `faq5_question`

### `founder-info_` （3 個）

- `founder-info_content-wrap`
- `founder-info_img-wrap`
- `founder-info_text-wrap`

### `hero_` （3 個）

- `hero_component`
- `hero_image-wrapper`
- `hero_main-img-wrapper`

### `home-care-banner_` （3 個）

- `home-care-banner_component`
- `home-care-banner_grid`
- `home-care-banner_right-wrap`

### `manifesto_` （3 個）

- `manifesto_component`
- `manifesto_content`
- `manifesto_content-wrap`

### `marquee-advanced_` （3 個）

- `marquee-advanced__collection`
- `marquee-advanced__item`
- `marquee-advanced__scroll`

### `menu-icon3_` （3 個）

- `menu-icon3_line-bottom`
- `menu-icon3_line-middle`
- `menu-icon3_line-top`

### `modal_` （3 個）

- `modal_background-overlay`
- `modal_close-button`
- `modal_content-wrapper`

### `news-category_` （3 個）

- `news-category_item`
- `news-category_list`
- `news-category_list-wrap`

### `news-filter_` （3 個）

- `news-filter_form`
- `news-filter_form-block`
- `news-filter_radio-btn`

### `product-hero_` （3 個）

- `product-hero_center-wrap`
- `product-hero_component`
- `product-hero_twoside-wrap`

### `slider_` （3 個）

- `slider__pagination`
- `slider_btn-wrap`
- `slider_content`

### `tab_` （3 個）

- `tab_blur-wrap`
- `tab_component`
- `tab_img-wrap`

### `tab-layout_` （3 個）

- `tab-layout__col`
- `tab-layout__col__wrap`
- `tab-layout__wrap`

### `tab-visual_` （3 個）

- `tab-visual__inner`
- `tab-visual__item`
- `tab-visual__wrap`

### `timeline15_` （3 個）

- `timeline15_circle`
- `timeline15_progress-bar`
- `timeline15_tab-progress`

### `ai-big-numbers_` （2 個）

- `ai-big-numbers_item`
- `ai-big-numbers_wrapper`

### `bento-content_` （2 個）

- `bento-content_text_bottom`
- `bento-content_wrapper`

### `cases-slider_` （2 個）

- `cases-slider_component`
- `cases-slider_swiper-wrap`

### `client-story_` （2 個）

- `client-story_template-h1`
- `client-story_template-img`

### `contact_` （2 個）

- `contact_form`
- `contact_text-area`

### `contact-form_` （2 個）

- `contact-form_block`
- `contact-form_component`

### `header156_` （2 個）

- `header156_content-left`
- `header156_text-wrapper`

### `home-solutions_` （2 個）

- `home-solutions_content`
- `home-solutions_icon-link`

### `jubo-digital_` （2 個）

- `jubo-digital_category-tag`
- `jubo-digital_category-tag-wrapper`

### `mm_` （2 個）

- `mm_inner-left-wrapper`
- `mm_inner-right-wrapper`

### `privacy-terms_` （2 個）

- `privacy-terms_component`
- `privacy-terms_wrap`

### `product-features-tabs_` （2 個）

- `product-features-tabs_component`
- `product-features-tabs_wrapper`

### `sales-info_` （2 個）

- `sales-info_inner-wrap`
- `sales-info_wrap`

### `single-product-ui_` （2 個）

- `single-product-ui_image`
- `single-product-ui_wrapper`

### `solutions-bento_` （2 個）

- `solutions-bento_component`
- `solutions-bento_wrapper`

### `stats_` （2 個）

- `stats_grid`
- `stats_img`

### `top-switcher_` （2 個）

- `top-switcher_item`
- `top-switcher_wrapper`

### `why-us_` （2 個）

- `why-us_items`
- `why-us_wrapper`

### `4col_` （1 個）

- `4col_img-wrap`

### `IoT-filter_` （1 個）

- `IoT-filter_component`

### `about_` （1 個）

- `about_component`

### `about-content_` （1 個）

- `about-content_wrap`

### `accordion-answer_` （1 個）

- `accordion-answer_inner`

### `back-to-page_` （1 個）

- `back-to-page__wrap`

### `big-text_` （1 個）

- `big-text_component`

### `btn-animate-chars_` （1 個）

- `btn-animate-chars__text`

### `card_` （1 個）

- `card_h2`

### `client-logo_` （1 個）

- `client-logo_component`

### `client-meeting-event_` （1 個）

- `client-meeting-event_component`

### `contact-form-field_` （1 個）

- `contact-form-field_wrap`

### `contact-routing_` （1 個）

- `contact-routing_buttons`

### `content-form_` （1 個）

- `content-form_wrap`

### `cookie-banner_` （1 個）

- `cookie-banner_btn-wrap`

### `css-tootlip_` （1 個）

- `css-tootlip__tip`

### `cta_` （1 個）

- `cta_component`

### `cta-button_` （1 個）

- `cta-button_bg`

### `culture_` （1 個）

- `culture_component`

### `demo_` （1 個）

- `demo_hide`

### `faq_` （1 個）

- `faq_component`

### `footer-icon_` （1 個）

- `footer-icon_wrap`

### `footer-lang_` （1 個）

- `footer-lang_wrap`

### `form-success_` （1 個）

- `form-success_wrap`

### `form-text_` （1 個）

- `form-text_field`

### `form-text-field_` （1 個）

- `form-text-field_wrap`

### `founder_` （1 個）

- `founder_intro`

### `full-img_` （1 個）

- `full-img_wrap`

### `glass-text_` （1 個）

- `glass-text_wrapper`

### `hightlight_` （1 個）

- `hightlight_items`

### `icon-title_` （1 個）

- `icon-title_wrapper`

### `is-new_` （1 個）

- `is-new_ui_image`

### `jubo-digital-footer_` （1 個）

- `jubo-digital-footer_component`

### `jubo-digital-navbar_` （1 個）

- `jubo-digital-navbar_component`

### `location-info_` （1 個）

- `location-info_wrap`

### `long-term-resource_` （1 個）

- `long-term-resource_component`

### `manual_` （1 個）

- `manual_component`

### `marquee_` （1 個）

- `marquee__advanced__p`

### `mm-headline-text_` （1 個）

- `mm-headline-text_wrapper`

### `mm-single-text_` （1 個）

- `mm-single-text_wrapper`

### `mm-text_` （1 個）

- `mm-text_icon`

### `mobile_` （1 個）

- `mobile_list-header`

### `mobile-inner_` （1 個）

- `mobile-inner_contact-wrap`

### `mobile-menu-icon_` （1 個）

- `mobile-menu-icon_wrap`

### `mobile-single-tab_` （1 個）

- `mobile-single-tab_wrap`

### `mobile-sub_` （1 個）

- `mobile-sub_link`

### `modal1_` （1 個）

- `modal1_component`

### `modal2_` （1 個）

- `modal2_component`

### `modal3_` （1 個）

- `modal3_component`

### `nav_` （1 個）

- `nav_component`

### `nav-link_` （1 個）

- `nav-link_wrapper`

### `news-grid_` （1 個）

- `news-grid_component`

### `platform-form_` （1 個）

- `platform-form_component`

### `preview-follower_` （1 個）

- `preview-follower__inner`

### `price-list_` （1 個）

- `price-list_items`

### `product_` （1 個）

- `product_category-tag`

### `product-big-numbers_` （1 個）

- `product-big-numbers_component`

### `product-features-cards_` （1 個）

- `product-features-cards_component`

### `product-price_` （1 個）

- `product-price_component`

### `product-scroll-card-2-col_` （1 個）

- `product-scroll-card-2-col_item`

### `product-switcher_` （1 個）

- `product-switcher_component`

### `related-news_` （1 個）

- `related-news_component`

### `sales-contact_` （1 個）

- `sales-contact_wrap`

### `sales-contact-btn_` （1 個）

- `sales-contact-btn_wrap`

### `sales-link_` （1 個）

- `sales-link_wrap`

### `sales-name_` （1 個）

- `sales-name_wrap`

### `section-header_` （1 個）

- `section-header_wrapper`

### `share-event_` （1 個）

- `share-event_component`

### `single-IoT_` （1 個）

- `single-IoT_wrap`

### `single-customer-story_` （1 個）

- `single-customer-story_wrap`

### `single-home-news_` （1 個）

- `single-home-news_wrap`

### `single-icon#1_` （1 個）

- `single-icon#1_wrapper`

### `single-icon#2_` （1 個）

- `single-icon#2_wrapper`

### `single-icon#3_` （1 個）

- `single-icon#3_wrapper`

### `single-location_` （1 個）

- `single-location_wrap`

### `single-news_` （1 個）

- `single-news_cover-img`

### `single-price_` （1 個）

- `single-price_wrapper`

### `single-sales_` （1 個）

- `single-sales_wrap`

### `single-slider_` （1 個）

- `single-slider_card`

### `single-stats_` （1 個）

- `single-stats_wrapper`

### `single-ui-content_` （1 個）

- `single-ui-content_wrapper`

### `solution_` （1 個）

- `solution_content-wrapper`

### `stats-content_` （1 個）

- `stats-content_wrapper`

### `stats-headline_` （1 個）

- `stats-headline_wrap`

### `stats-unit_` （1 個）

- `stats-unit_wrapper`

### `tab-switcher_` （1 個）

- `tab-switcher_item-text`

### `team_` （1 個）

- `team_tag-wrapper`

### `why-us-content_` （1 個）

- `why-us-content_wrapper`

### `why-us-list_` （1 個）

- `why-us-list_wrapper`
