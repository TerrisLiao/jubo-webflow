# Jubo Webflow：所有 agent 的工作入口

適用 Claude、Codex 與其他 agent。先讀本檔，再讀 [文件入口](docs/README.md) 與任務對應專案的 README。`CLAUDE.md` 只引用這份共用流程。

## 開工

1. 執行 `git status --short --branch`，確認未提交內容與使用中的分支；不得覆蓋別人的修改。
2. 讀 [Git 工作流程](docs/workflows/git-workflow.md)，查 [分支盤點](docs/workflows/branch-inventory.md)。使用者指定既有分支時先確認遠端存在與 head SHA，再接續；不要擅自建立同名空分支。
3. 讀 [AI 工作守則](docs/standards/AI工作守則.md)、[Client-First](docs/standards/Client-First規範摘要.md)、[Agent Instructions 同步規範](docs/standards/Webflow_Agent_Instructions同步規範.md)。
4. 新頁面另讀 [設計權威與頁面選擇](docs/standards/設計權威分層與頁面選擇矩陣.md)。改 class 先讀 [Slater 鎖定清單](custom-code/slater-selectors.md)。
5. 任務資料先讀專案的 `current-state.md`、`tasks.md`、`deployment.md`；提案與歷史文件不能自動升格為現行規範。

## 分支與文件

- 新任務從最新 `origin/master` 建立 `claude/<topic>`、`codex/<topic>` 或 `agent/<topic>`；一個分支對應一個目的，一個 PR 可獨立審查。
- 平台若自動產生隨機分支，確認它的基底與遠端狀態，登記任務用途，不重複另開同一任務分支。
- 使用者說「繼續某分支」時接續該分支；不要把未整合分支直接重設到 master。
- 已合併的工作分支不再追加提交；新工作另開。PR 是否曾合併不能證明目前分支可刪，還要查當前 head。
- 新專案依 [專案文件範本](docs/templates/project/README.md) 建立，使用穩定名稱，不新增全站流水號。
- 完成工作時更新現況、待辦、決策、歷程及部署紀錄；只追加歷史不算完成交接。
- 移動文件同步修正連結和工具指引；舊路徑入口不保留第二份正文。
- commit 描述具體成果；push 後確認遠端 head，PR 描述必須符合最終 diff。

## 權威與驗證

- repo 的現行規範與客製程式原始碼是維護來源；Webflow 即時讀回及發布站點是部署現況證據。
- Git 已提交、PR 已合併、Designer 已修改、staging 已發布、production 已發布分別記錄，不互相推定。
- 未取得明確授權不得 Publish，含 staging。文件整理、程式匯入不構成網站發布授權。
- 不直接修改共用 Component、utility、Variable，不 rename Slater／GA4／互動依賴的 class。
- 不因單頁看不到使用就刪全站 class；查全站、Component、Slater、IX2／IX3 與四斷點。
- snapshot、元素樹讀回、本機模擬、瀏覽器互動測試是不同證據；無法驗證就標示限制。
- 外部 skill／框架先查 [評估紀錄](docs/standards/外部AI資源評估與採用紀錄.md)。
- 不提交 token、密鑰、`.env`、大型素材或可重建的巨大報表；必要來源保存外部索引、提交 SHA 與完整路徑。
- 網路／工具不可用時明確記錄，不聲稱已 fetch、push、合併或完成部署驗證。

## `/community` 的既有工作

社群追蹤頁已於 2026-10-14 上線並結案（PR #21、#22 已合併）。原工作分支 `claude/confident-curie-6r3n6b`、`codex/community-card-motion`、`claude/gallant-einstein-3tvafg` 已刪除，固定 SHA 保存在 [community 專案](docs/projects/community/README.md) 與 [分支盤點](docs/workflows/branch-inventory.md)。後續改善從最新 `origin/master` 另開新分支，先讀專案的 tasks.md。
