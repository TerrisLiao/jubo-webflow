# 新聞中心與內容治理現況

文件整理日期：2026-10-13；本輪未讀回 Webflow。

分類整理、客戶故事入口與 CMS 程式紀錄已在 master；News 盤點、內容清理與 9/17 稿件已集中保存。9/22 封面 Image／效能改動來自未合併 PR #16，來源 staging 驗證不等於 production 完成。

頁面範圍：`/news`。

詳細歷史與數值見 [專案入口](README.md)，發生差異時先即時讀回再更新，不從舊段落復原網站。

## 2026-11-10：三三分享會 EP22／EP23

已用 Webflow CMS 與真實 staging 檢查兩篇新 Landing Page：`monthly-third-wednesday-sharing-202611`、`monthly-third-wednesday-sharing-202612`。日期（11/18、12/16 均週三）、12:00–13:00、講師及主題一致，未見需要重寫的明顯文案錯誤；圖片載入、標題、專區連結及四斷點無橫向溢出已驗證。

使用者指定 EP23 本次提前公開，News 日期由 12/1 改 11/10，兩篇設可發布並已上 staging；只補三三專區連結，其他文案保留。專區問卷人工送出／下載與 Forms 入庫通過後，已於 2026-11-10T10:30:53.018Z 一起正式發布；兩篇正式網址 HTTP 200、圖片與日期／專區連結核對正確、四尺寸無橫向溢出。CMS HTML 維護來源在 `custom-code/monthly-sharing/news-ep22.html`／`news-ep23.html`。EP23 直播連結尚未提供，頁面已明確寫活動前公告。
