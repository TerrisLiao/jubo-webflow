# jubo-webflow

Jubo Webflow 官網的規範、專案交接與客製程式維護庫。網站本體位於 Webflow，Git 狀態與網站發布狀態分開記錄。

## 開始工作

1. 所有 agent 先讀 [AGENTS.md](AGENTS.md)；Claude 入口 [CLAUDE.md](CLAUDE.md) 引用同一份流程。
2. 讀 [Git 分支流程](docs/workflows/git-workflow.md)，確認工作區與遠端分支，再開始修改。
3. 從 [文件入口](docs/README.md) 找任務規範，讀 [專案列表](docs/projects/README.md) 的現況、待辦與部署紀錄。
4. 新專案使用 [文件範本](docs/templates/project/README.md)，不得只追加歷史而不更新現況。

## 目錄

- `docs/standards/`：工作與設計規範。
- `docs/inventories/`：帶日期的設計系統快照。
- `docs/projects/`：各頁面／專案的現況、待辦、歷史與部署。
- `docs/audits/`、`docs/research/`：稽核證據與研究。
- `docs/proposals/`：未核准的共用提案。
- `docs/archive/`：重疊分支原文與歷史證據，不能當現行規範。
- `custom-code/`：維護原始碼、工具及明確標示的 POC。
- `.claude/skills/`：既有 Three.js skills；先讀專案約束與來源標註。

## 整理與既有工作

- [分支盤點與清理紀錄](docs/workflows/branch-inventory.md)：含固定 head、ahead／behind、保留／清理判斷。
- [匯入清單](docs/workflows/import-manifest.json)：22 個分支內容與舊新路徑對照。
- [社群追蹤頁](docs/projects/community/README.md)：既有分支 `claude/confident-curie-6r3n6b`；不是待建立分支。
- 舊中文目錄僅保留導引；新內容寫入 docs。
