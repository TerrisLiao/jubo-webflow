# 變更歷程

- 2026-10-13：整理來源分支，建立現況／待辦／部署入口；本輪只修改 Git 文件，未操作 Webflow。
- 先前歷程保留在 [詳細來源](README.md)，不刪除舊實驗的可追溯證據。
- 2026-10-20：`/news/system-cybersecurity`（CMS item `6ad58c06a97067448a667937`）文末資安 banner 收尾。Codex 已完成：移除「資安與隱私」小標、四張標章卡說明文字對齊、按鈕換成首頁同款 `glass-button`（on-dark variant，class 與首頁逐字相同）。Claude 補修：「更多驗證與法規遵循」四個 logo 寬度不一，造成右側文字起點不齊（手機版 PDPA 與 ISO 13485 差 15px、PIPEDA 與 HIPAA 差 44px），改為每個 logo 包一個固定 3.5rem 寬、置中的 `data-security-more-logo` 容器。只動這四處，其餘內容不變；已寫入 CMS 並讀回，未發布。
- 2026-10-20（續）：Terris 在 Webflow Editor 把「長期的維運投入」改為「長期的經驗投入」後存檔，Editor 把表格、資安 banner、FAQ 三個 `w-embed` 消毒成純文字（FAQ 四個問題消失、12 筆 `class="reference"` 被移除），並於 09:40:45 上線。Claude 以 9:30 讀回的版本為來源還原，只套用這一個字的修改，09:46 寫入 CMS 並只發布這一篇（`publish_collection_items`）。線上複驗：table 1、banner 1、aeo-faq 1、details 5、more-logo 4、reference 12，CMS 全部文字皆出現在線上頁面；表格與 FAQ 截圖正常。還原用的完整 HTML 存於 [articles/2026-10-20_system-cybersecurity_CMS.html](articles/2026-10-20_system-cybersecurity_CMS.html)。寫作指南已補「w-embed 擋不住 Editor 存檔」的更正。
- 2026-10-20（續）：依 Terris 指示改兩個 H2（`#jubo-security` →「智齡照護系統，擁有國際級的資安標準」、`#hospital-cases` →「醫院端重大資安事件案例」，id 不變），並移除參考文獻「智齡科技。（無日期）。醫療照護資安與隱私」。以 API 寫入並只發布此篇；線上複驗表格、banner、FAQ、11 筆參考文獻皆正常。備份 HTML 已同步更新。
