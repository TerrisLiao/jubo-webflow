# 變更歷程

- 2026-10-13：整理來源分支，建立現況／待辦／部署入口；本輪只修改 Git 文件，未操作 Webflow。
- 先前歷程保留在 [詳細來源](README.md)，不刪除舊實驗的可追溯證據。
- 2026-10-20：`/news/system-cybersecurity`（CMS item `6ad58c06a97067448a667937`）文末資安 banner 收尾。Codex 已完成：移除「資安與隱私」小標、四張標章卡說明文字對齊、按鈕換成首頁同款 `glass-button`（on-dark variant，class 與首頁逐字相同）。Claude 補修：「更多驗證與法規遵循」四個 logo 寬度不一，造成右側文字起點不齊（手機版 PDPA 與 ISO 13485 差 15px、PIPEDA 與 HIPAA 差 44px），改為每個 logo 包一個固定 3.5rem 寬、置中的 `data-security-more-logo` 容器。只動這四處，其餘內容不變；已寫入 CMS 並讀回，未發布。
