# 待辦

| 優先級 | 工作 | 驗收條件 | 狀態／證據 |
|---|---|---|---|
| P0 | 在 Designer 把兩個 CMS Template page 設為 Draft（API 設定無效） | 讀回 `draft: true`；全站發布不會帶出未設計的單集頁 | 未開始，需 Designer |
| P0 | Designer Preview 驗收 `/jubo-33-live-stream` | 四斷點排版；Hero 日期不被切；四張分類卡圖示持續循環、點選後漸層底條移到該卡且下方只出現該分類回放；YouTube CTA 新分頁開播放清單；FAQ 樣式同首頁（開合需 staging） | 未開始（Designer App 未連線） |
| P0 | 在 Designer 把「三三分享會集數」Collection URL 改為 `jubo-33-live-stream` | 讀回 Template page `publishedPath: /jubo-33-live-stream`；單集頁為 `/jubo-33-live-stream/ep22` | 使用者已同意；API 無此動作，需 Designer |
| P1 | 設計集數 Template page（`/monthly-sharing/ep19` 等） | 依預覽 Artifact 單集頁；含簡報索取表單 | 未開始 |
| P1 | 講師照片原圖（≥400 px）與官網使用授權；講師簡介由講師提供後替換 CMS「簡介」 | 每位外部講師一筆完整資料 | 未開始（目前為 Canva 縮圖與依事實寫的一句話） |
| P2 | 王雪珮照片背景含灰白格紋、劉旻宜照片模糊：向講師索取原圖；成茵茵可視需要放寬裁切 | 照片乾淨、與其他講師一致 | 未開始 |
| P1 | 行銷確認 hero 使用的 5 張直播畫格截圖（含講師與線上參與者小視窗）可用於官網 | 書面同意或換圖 | 未開始 |
| P1 | hero 留言區張照服員頭像：重新取得圖片檔後上傳並替換 | 剩 2 個 `.sansan-chat_avatar` 換成 `img.sansan-chat_avatar-img` | 5/6 完成，等待張照服員圖片 |
| P1 | 確認 EP22「講綱」三點（目前為依主題擬的草稿） | 講師或行銷確認後修改 CMS | 待確認 |
| P2 | 每集 SOP 加入：Canva 宣傳頁做無字版 → 上傳「卡片背景圖」；填寫「講綱」三點 | 行銷每月更新 | 未開始 |
| P1 | 確認 EP02 講師姓名（陳姝娟／李姝娟） | 行銷部回覆 | 未開始 |
| P1 | Publish 前把 CMS 項目改為可發布、頁面取消 draft | 使用者明確授權 Publish | 未授權 |
| P2 | 舊 news 文章與 `jubo-health.tw/monthly-sharing-*` 短網址轉址規劃 | 轉址表＋SEO 檢查 | 未開始 |
| P2 | Navbar「資源」、Footer、`/community` 入口 | 使用者授權後修改共用元件 | 未開始 |
| P3 | 分類卡鍵盤操作（目前 IX3 只接滑鼠點擊，Tab 可聚焦但 Enter 不會切換） | 需另寫腳本或改原生元件 | 未開始 |
