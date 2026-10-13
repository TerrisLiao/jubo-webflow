# 新專案文件範本

在 `docs/projects/<topic>/` 建立以下六份文件；將本目錄的範本複製後填入實際資料，不保留空白 placeholder 宣稱完成。

| 文件 | 用途 |
|---|---|
| README.md | 專案目的、讀取順序、來源分支與狀態 |
| current-state.md | 目前採用做法；標示驗證日期與證據 |
| tasks.md | 未完成事項、優先級、驗收條件 |
| decisions.md | 決策及提案狀態；引用來源 |
| changelog.md | 按日期的歷程，保留被取代方案 |
| deployment.md | Git／Designer／staging／production 各自狀態 |

文件更新日與現況驗證日分開。既有交接匯入只表示 Git 文件已保存，不表示 Webflow 已讀回或網站已發布。

新專案登記到 `docs/projects/README.md`。共用規則放 standards，日期快照放 inventories／audits，研究放 research。用描述性名稱，不增設全域 `18_`、`19_` 等編號。

## 建立方式

從 repo 根目錄執行 `python tools/new_project.py --slug new-topic --title "專案名稱"`。工具建立六份文件，拒絕覆蓋既有專案；填入真實資料後手動登記到專案列表。Git 分支另外依工作流程建立，工具不建立 Webflow 頁面或自動發布。
