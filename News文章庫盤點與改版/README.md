# /news 舊文章庫盤點、授權清理與 pillar 整併

WordPress 搬到 Webflow 時整批倒進 `新聞中心s` 的舊文章，做兩件事：清掉著作權風險、把散落的舊文整併成少數幾支高品質 pillar。

**這份文件寫於 2026-09-03 的雲端 session，只是交接骨架。實際執行在 Terris 的 Mac 本機 session。**

## 現況一覽

| 項目 | 數字 | 讀回時間 |
|---|---|---|
| `新聞中心s` collection | **87 items** | 2026-09-03 |
| WordPress 遷移匯入批次 | **72 篇**（id 前綴 `6a1121*`/`6a1122*`，`createdOn` 全為 2026-05-23） | 2026-09-03 |
| Webflow 原生產出 | **15 篇**，其中 8 篇已合規 | 2026-09-03 |
| 誤放在 news collection 的 landing page | **2 篇** | 2026-09-03 |
| CrawlSEO 首爬 | 200 pages stored | `marketing-ops-stack` |
| Webflow Analyze | **未授權（403）** | 2026-09-03 實測 |
| 單篇 Rich Text 平均 | 約 40KB（87 篇約 3.5MB） | 2026-09-03 實測 |

⚠️ 這張表是 2026-09-03 的快照，不是 Webflow 自動同步資料。執行任何盤點或清理前**先讀回即時 CMS**（`CLAUDE.md` 核心原則：Webflow 即時讀回優先於 repository 快照）。`11_AEO稽核與優化計畫.md` 當時記載 79 篇，三個月就長了 8 篇。

## 文件索引

| 檔案 | 內容 | 狀態 |
|---|---|---|
| `01_專案目標與範圍.md` | 為什麼做、內容策略轉向依據、五個已確認前提、不做什麼 | 現行 |
| `02_逐篇盤點表.md` | 87 篇 × 全欄位，含 Terris 決策欄。**本專案核心產出** | 骨架；87 列待填 |
| `03_下架與301對照表.md` | 逐條含理由、執行日與實測結果 | 骨架 |
| `04_著作權處理紀錄.md` | 🔴 候選名單與逐篇決策；天下雜誌單獨一節 | 候選名單已列；決策待填 |
| `05_待辦與待確認.md` | P0/P1/P2 checkbox 與執行順序 | 現行 |
| `06_Pillar規格與整併對照.md` | 四支 pillar 的主關鍵字、GSC 訊號、要吸收哪些舊文 | 現行；整併對照待填 |
| `07_新鮮度SLA與30天回檢.md` | 主題 × 內容所有人 × 更新週期；回檢流程與紀錄 | 骨架 |
| `08_變更歷程.md` | 每批次執行紀錄 | 骨架 |
| `batches/` | 18 個批次盤點暫存檔，合併後保留供追溯 | 空 |
| `data/` | CrawlSEO / GSC sanitized 排序資料。**已 .gitignore** | 空 |

## 單一真實來源

| 問題 | 看哪裡 |
|---|---|
| 接下來做什麼 | `05_待辦與待確認.md` |
| 這篇文章要留還是砍 | `02_逐篇盤點表.md` 的「決策」欄 |
| 為什麼這樣決定 | `01_專案目標與範圍.md`；著作權的看 `04_` |
| 舊 URL 導去哪 | `03_下架與301對照表.md` |
| pillar 要寫什麼 | `06_Pillar規格與整併對照.md` |
| 怎麼寫才符合規範 | `Jubo官網AI開發規範/12_AEO文章寫作指南.md`（不複製，直接讀） |
| 哪些 class 不能動 | `custom-code/slater-selectors.md` |
| CrawlSEO 怎麼操作 | `TerrisLiao/marketing-ops-stack` 的 `crawlseo/README.md` |

## 執行環境：本機，不是雲端

CrawlSEO 是本專案的排序儀器，整套跑在 Terris 的 Mac：dashboard `localhost:3002`、Postgres `localhost:5433`、資料在本機 Docker named volume。

2026-09-03 在雲端容器實測的結果：

| 檢查 | 結果 |
|---|---|
| `docker ps` | CLI 存在，但 `/var/run/docker.sock` 不存在，**無 daemon** |
| `curl localhost:3002/api/health` | Connection refused |
| `127.0.0.1:5433` | Connection refused |
| `host.docker.internal` | Name or service not known |
| `ss -ltnp` | 無任何 listening socket |
| `ListAgents` | 無可達的其他 Claude session；Remote Control 未連線 |

CrawlSEO 本身沒問題，問題只在於雲端 session 不在那台機器上。**本機 session 沒有這個限制** —— docker、`localhost:3002`、`5433`、Webflow MCP、兩個 repo 全部到位。所以：

- 標「【本機】」的步驟只能在 Mac session 執行
- 雲端 session 不做 Webflow 寫入、不做 Publish、不碰 CrawlSEO

## 硬約束（每次動工前重讀）

- **未取得 Terris 明確授權不得 Publish。** 所有產出先進 Draft。
- **`status: "success"` 不等於真的寫進去了，一律讀回驗證。** schema 或 301 改完要抓線上 HTML 確認。
- **Webflow MCP 的 schema 查詢不一定會回傳 CMS Template 頁的 `jsonLdSchema`** —— `11_` 曾因此誤判，必須抓線上 HTML 驗證。
- **CrawlSEO findings 是報告，不是改 Webflow 的授權。**
- **不得把 raw GSC data、search queries、crawl exports 或個資進 git。** 只有去識別化的決策與行動項可以寫進文件。
- **不讀、不印、不複製 `crawlseo/.env`** 或任何金鑰。
- **不刪任何 CMS item。**
- snapshot 過期或拿不到 computed style 時**標示驗證限制，不宣稱完成**。

完整清單見 `01_專案目標與範圍.md`。
