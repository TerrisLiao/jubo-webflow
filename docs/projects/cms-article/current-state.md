# CMS 文章閱讀表面現況

文件更新與即時驗證日期：2026-10-21。原始碼位於 custom-code/cms-article；Webflow 已儲存的內容已讀回比對，發布站點與本機模擬仍分開記錄。

## 文章文字連結

news／customer-stories 模板 head 已加入 _article-links.css。文字連結使用既有 primary/Ocean 深青綠色及常駐底線，hover 加深、鍵盤焦點有外框，排除按鈕及圖片連結。兩模板原有 head 完整保留、footer 未改。四種寬度的本機瀏覽器驗證通過。

## FAQ 現行設計

資安文章的 FAQ 以 w-embed 包住語意化 details/summary，保留行內白底、細框、圓角及內距，讓編輯器未載入模板 CSS 時仍有完整卡片外觀。圖示為**透明背景、沒有圓底的青綠至紫色漸層線條加號**；展開後旋轉 45 度，舊版紫色實心圓底已取代。

圖示直線標記為 data-faq-line=vertical；模板 _faq-icon-state.css 只負責整個圖示的旋轉、鍵盤焦點與減少動態偏好，開合沿用原有 400ms/ease 腳本。1280／991／767／479／390 寬度的開合、Enter 鍵及圖示狀態通過本機驗證，問答文字未變。

## 文章資安入口現行設計

使用者先要求沿用首頁資安 banner，之後要求按鈕與 logo 更突出；最新指定移除「資安與隱私」小標、標章說明對齊、換回首頁玻璃按鈕，均已完成。現行為文章專用深色柔和漸層，CTA 完整沿用首頁原版 Glass Button On Dark；四個主標章使用相同 3.5rem 高圖框，說明文字基線對齊，其餘四個標章保留在下方。按鈕與主標章區均導向 /security，位於智齡介紹末尾。

核心排版／色彩／標章尺寸在 HTML embed 行內保留，Flex 在手機自然換成兩欄。玻璃按鈕使用首頁原始 DOM 與已發布的共用樣式，不仿製結構或修改定義。_home-security-banner.css 不再覆寫 CTA 背景或 hover；首頁、共用 Component、Variables、Slater 均未修改。

新版在 1280／991／767／479／390 寬度檢查：每列標章的說明文字 top 差值皆為 0；CTA 為白字、8% 半透明底與 blur(12px) saturate(1.4)，與首頁原版一致。沒有溢出，CTA 位於卡片內並可鍵盤聚焦，圖卡其他內容及 FAQ 未變。

## CMS 與發布狀態

文章 6ad58c06a97067448a667937 的 banner、FAQ 圖示及 news 模板的兩個 style block 已儲存並讀回確認。標題、封面、法規、醫院案例、4 張資訊圖、表格、FAQ 問答及參考文獻保留；智齡資訊引用中文 /security。

2026-10-21 即時讀回顯示使用者後續曾發布，lastPublished 為 2026-10-20T10:26:37.138Z，isDraft:false 屬正常狀態。本次文案儲存 updated 為 2026-10-21T13:00:16.414Z，lastPublished 不變；未呼叫 CMS publish、staging publish 或 production publish。所有版型驗證均為本機測試瀏覽器，不能當成新版正式站畫面。

頁面範圍為 /news/*、/customer-stories/*。中文排版與 CLS/LCP 基線保留於 [專案入口](README.md) 的歷史來源，後續變更先即時讀回，不由舊版筆記復原網站。

## 2026-10-21 備份與復原文案

依主管回饋補強「備份也可能一併受害」：風險表格的備份列加入權限隔離與防刪除保護、表後補上雲端備份不能單憑存放位置保證可還原的說明，FAQ 第 3 題同步 schema-plain-text。醫院案例後補充既有公開資訊不足以確認完整復原成本與處理細節，不暗示兩院備份全遭加密或曾支付贖金。新增 CISA 2023 指引與資通安全署 2026-07-27 公告的標題超連結。

本次從即時 CMS 內容修改，保留使用者 2026-10-20 後續自行調整；只更新 content 與 schema-plain-text。法規全文、智齡段落與 banner、圖片、表格／FAQ 結構與樣式皆逐字比對保留，標題封面與其他欄位不變。
