# Community 頁面樣式與 IX3 交接

這個目錄保存 Webflow 頁面層設定與回退資料，不是頁面要載入的 JavaScript。

- [2026-10-13-card-motion.json](2026-10-13-card-motion.json)：本輪修改前／後的樣式、IX3、新增標籤 ID、來源新聞與驗證限制。
- [Community 專案](../../docs/projects/community/README.md)：現況、待辦與部署。

網站修改已寫入 Designer，本輪未 Publish。執行回退前讀回即時 Webflow 設定並核對是否有後續修改；只還原本輪範圍，不刪整頁或共用資產。

漸層使用既有色票組合。Webflow MCP 將含 `var()` 的 background-image 誤解析成第一個 Color Variable；建立 custom-value Color Variable 保存漸層也回 internal error。本輪以既有色票讀回值組出原生 gradient 字串，標籤文字／邊框與直播卡底色仍直接綁變數。gradientSources 記錄來源；色票更新後需重新套用漸層，不能宣稱漸層已自動綁定。
