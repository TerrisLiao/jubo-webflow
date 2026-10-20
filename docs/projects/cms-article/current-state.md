# CMS 文章閱讀表面現況

文件更新與即時驗證日期：2026-10-20。原始碼位於 custom-code/cms-article；Webflow 已儲存的內容已讀回比對，發布站點與本機模擬仍分開記錄。

## 文章文字連結

news／customer-stories 模板 head 已加入 _article-links.css。文字連結使用既有 primary/Ocean 深青綠色及常駐底線，hover 加深、鍵盤焦點有外框，排除按鈕及圖片連結。兩模板原有 head 完整保留、footer 未改。四種寬度的本機瀏覽器驗證通過。

## FAQ 現行設計

資安文章的 FAQ 以 w-embed 包住語意化 details/summary，保留行內白底、細框、圓角及內距，讓編輯器未載入模板 CSS 時仍有完整卡片外觀。圖示為**透明背景、沒有圓底的青綠至紫色漸層線條加號**；展開後旋轉 45 度，舊版紫色實心圓底已取代。

圖示直線標記為 data-faq-line=vertical；模板 _faq-icon-state.css 只負責整個圖示的旋轉、鍵盤焦點與減少動態偏好，開合沿用原有 400ms/ease 腳本。1280／991／767／479／390 寬度的開合、Enter 鍵及圖示狀態通過本機驗證，問答文字未變。

## 文章資安入口現行設計

使用者先要求沿用首頁資安 banner，之後要求按鈕與 logo 更突出。現行為文章專用版：深色柔和漸層、醒目的白色 CTA；ISO 27001、ISO 27701、Google Cloud、Cloudflare 四個原始主標章放大，其餘四個原始標章保留在下方。兩個連結（按鈕與主標章區）均導向 /security，位於智齡介紹末尾。

核心排版／色彩／標章尺寸在 HTML embed 行內保留，Flex 在手機自然換成兩欄，不依賴新模板 CSS。_home-security-banner.css 只補互動效果。此文章版不再沿用首頁的整套 home-security_* 排版或 Glass Button DOM；首頁、共用 Component、Variables、Slater 均未修改。

新版在 1280／991／767／479／390 寬度檢查：主標章桌機一列、手機兩列，8 個標章全部載入，沒有溢出，CTA 位於卡片內並可鍵盤聚焦。未套用新頁面 CSS 前也已確認白色 CTA 與基本版型能顯示。

## CMS 與發布狀態

文章 6ad58c06a97067448a667937 的 banner、FAQ 圖示及 news 模板的兩個 style block 已儲存並讀回確認。標題、封面、法規、醫院案例、4 張資訊圖、表格、FAQ 問答及參考文獻保留；智齡資訊引用中文 /security。

使用者曾於 2026-10-20 08:35 UTC 發布此文章，isDraft:false 屬正常狀態，本次未改動。此次儲存後 lastPublished 仍為 2026-10-20T08:35:00.966Z；未呼叫 CMS publish、staging publish 或 production publish。所有版型驗證均為本機測試瀏覽器，不能當成新版正式站畫面。

頁面範圍為 /news/*、/customer-stories/*。中文排版與 CLS/LCP 基線保留於 [專案入口](README.md) 的歷史來源，後續變更先即時讀回，不由舊版筆記復原網站。
