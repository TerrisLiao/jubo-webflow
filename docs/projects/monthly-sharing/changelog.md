# 變更歷程

- 2026-11-05：專案建立。讀取 AGENTS／設計權威／Client-First／community 專案文件；HTTP 讀取正式站首頁、`/community`、EP19 與 2025 Q1–Q3 活動頁；讀取 YouTube 播放清單取得 20 集標題；以 Mobbin 搜尋 webinar hub、回放庫、講師牆、podcast 頁共 4 組參考。產出 [設計提案](design-proposal.md)、Hub 與單集頁預覽 Artifact、[集數資料](reference/集數資料.md)、[SOP 原文](reference/行銷執行SOP.md)。未動 Webflow，未發布。
- 2026-11-05：依使用者要求加入 Email 訂閱（Hub Hero、收尾區塊、單集頁勾選、FAQ、時間線）；提案新增 §6-5 名單工具選項與每集 Email 節奏。預覽 Artifact 更新為 Version 2。
- 2026-11-05：依使用者回饋改第二版：Hero 日期第一、主題第二；刪除直播日期區塊；智齡同仁合併為「智齡科技團隊」；新增講師彈窗。從 Canva `DAGLvkPY5mw` 取得 EP01–EP22 講師、單位與日期，[集數資料](reference/集數資料.md) 全面更新；EP22 直播日更正為 2026-11-18。預覽 Artifact 更新為 Version 3（14 位外部講師大頭照取自 Canva 縮圖，裁成正方形）。
- 2026-11-06：依使用者指示在 Webflow 建立草稿頁 `/monthly-sharing`（draft）、兩個 CMS collection（37 筆草稿項目）、34 個素材、8 個區塊與 18 個 IX3 互動；未 Publish。Designer App 未連線，僅 Data API 讀回，Preview 驗收待做。詳見 [deployment.md](deployment.md)。
- 2026-11-06：使用者回報清單全空；原因為項目是草稿。37 筆改為可發布（未發布），隱藏三個預設空狀態；記錄 Template page 無法用 API 設 Draft 的風險。
- 2026-11-06：第二輪修改（使用者截圖回饋）：主題系列改為四個分類「機構經營管理／照護實務技巧／長照評鑑準備／AI與數位工具」（Option 選項名稱無法用 API 改，新增「分類」欄位、22 集一對一轉換後刪除舊「主題系列」欄位）；Hero 大字日期補上下 padding 修正被切；集數卡 EP 標籤移到右上；講師彈窗先關閉（互動刪除、定義備份）；刪除「每一集的時間線」區塊；FAQ 改用首頁 FAQ 結構與全站開合腳本；分頁按鈕改為兩個 Glass Button＋中文，以頁面腳本接原生分頁網址；頁面網址改為 `/jubo-33-live-stream`。仍為草稿、未發布。
- 2026-11-06：何憲欽、侯怡岑、吳淑芬三位講師照片改用 Canva 高解析匯出重新裁切，臉部置中，已換入 CMS（未發布）。
- 2026-11-06：依使用者指示移除 Email 訂閱（表單、Hero 連結、FAQ 題目），提醒改推 LINE 官方帳號。單集頁網址改為 `/jubo-33-live-stream/epXX` 無法用 API 完成，待 Designer 改 Collection URL。
