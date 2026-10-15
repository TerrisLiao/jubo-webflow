# 文章到產品／聯絡頁的追蹤修正

2026-10-15：`site-head.html` 是本次讀回並修改的全站 Head 完整原始碼，已存入 Webflow 待發布設定；正式站尚未發布。不要用過期快照覆寫後續修改。

## 修正

- 文章／案例等內容頁到 `/products` 的點擊，與 `/solutions`、`/contact` 一起記錄 `content_cta_click`。辨識路徑邊界，排除外站及 `/products-fake`。
- 帶入 `content_id`、`solution_interest`、`cta_location`、`destination_type`。既有 GTM v55 已有這些參數映射；保留目前白名單與去重。
- Cookie Preferences 不屬於 partnership form。只追蹤明確標註的合作表單；未傳送輸入值、姓名、電話或 email。
- GTM 初始化前從既有 Finsweet `fs-cc` 讀取已保存的選擇；未知或損壞資料維持 denied。已明確同意 analytics 的返回訪客不再等待一個不會出現的 consent update。marketing 同意獨立判斷。
- 補助文既有「使用智齡住宿系統協助核對補助資料」段落後、FAQ 前，僅加入 `subsidy-article-cta.html` 的產品與諮詢連結。未改政策、金額、日期、SEO 或 schema。

## 證據與限制

[verification.json](verification.json) 保存雜湊、Webflow ID 與測試結果。Webflow Head 與文章儲存後已逐字讀回相符；文章 `lastPublished` 未變。

對公開頁面的隔離瀏覽器測試攔截 GA／Ads collection 並回 204，不污染正式資料。修正前：首次接受可送 page_view，接續產品頁未見 page_view；移除重複 denied 預設的隔離比較恢復跨頁瀏覽。修正後，將較短的觀察視窗改為 10 秒後，接受／拒絕／僅 analytics 三情境均通過。較早的短觀察測試曾失敗，仍需發布後以 Tag Assistant/DebugView 驗證載入順序及每頁一筆，不能將隔離驗證當作正式環境完成。

本次沒有發布 GTM、Webflow staging 或 production，也沒有真的送出表單。`partner_inquiry_submit` 的測試是本機成功訊息顯示模擬，不代表收到一筆有效商機。

## 本機檢查

需要 Node.js 與既有 Playwright；不新增網站套件或框架。

```sh
node custom-code/analytics/consent-unit-tests.mjs
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node custom-code/analytics/event-tests.mjs
```

## 發布後量測

以發布時間為分界，先確認補助文、產品頁、聯絡頁的每頁 page_view 與 page_referrer，再驗證 `content_cta_click` 的 `content_cluster=residential_subsidy`、`cta_location=article_system_section` 與目的類別。不要把全站導覽／頁尾點擊算入文章內文 CTA 成效。

GA4 同一工作階段的順序漏斗：補助文 page_view → 產品／聯絡頁 page_view → 聯絡方式點擊或成功提交事件。允許中間存在其他頁，不要求直接下一頁。分母使用該期間看過文章且可量測的工作階段，不使用 GSC 點擊數或事件總數。只有總表交叉比對不能證明是同一人；既有缺漏無法回補。`content_id` 尚未註冊為 GA4 自訂維度時，先用 `page_location` 配合既有維度分析；註冊只影響之後資料。

產品詢問的最終數量仍以 Webflow 實際 submissions 分類並去重。LINE、電話或外部表單開啟屬聯絡意圖，不能稱為有效名單。若要逐筆連結實際提交與文章旅程，需另外設計不含個資的 lead identifier 並驗證，現況不宣稱已完成。

## 回退

套用 `rollback-head.patch` 可將此版 Head 還原成本次修改前內容（限後續尚無他人修改時）。CMS 僅移除帶 `data-ga-content-section="subsidy-system-cta"` 的新增段落，即可還原原文；先核對 verification 的原文雜湊。回退設定後同樣需要明確發布授權。
