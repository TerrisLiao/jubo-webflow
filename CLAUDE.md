# Jubo 官網（Webflow）專案說明

這個 repo 是 Jubo Webflow 官網（`jubo-health.com`）的輔助資料中心。網站本體、CMS、樣式與元件位於 Webflow 雲端；本 repo 保存規範、客製程式 selector、頁面交接與決策紀錄。

## 每次動工前必讀

1. `Jubo官網AI開發規範/00_AI工作守則.md`
2. `Jubo官網AI開發規範/01_Client-First規範摘要.md`
3. `Jubo官網AI開發規範/14_Webflow_Agent_Instructions同步規範.md`（站上另有一份會被 MCP 自動載入的規則，與本 repo 有差異）
4. 若動 class：`custom-code/slater-selectors.md`
5. 若處理日本頁：`JP日本市場頁面改版/README.md`、`02_頁面現況規格.md`、`05_待辦與待確認.md`、`11_2026-08-20_樣式與結構稽核.md`
6. 若撰寫 `/news` 文章（AEO 週稿）：`Jubo官網AI開發規範/12_AEO文章寫作指南.md`（不需要讀完整份 AEO 稽核報告）

## 核心原則

- Webflow 即時讀回優先於 repository 快照。
- 未取得明確授權不得 Publish。
- 不直接 rename 或修改共用 Component、utility、variable。
- 不因某一頁沒有實例就刪除全站 class；先查全站使用、Slater、IX2 與 Component。
- snapshot 過期或無法取得 computed style 時，必須標示驗證限制，不得宣稱完成。
- Webflow 站上的 Agent Instruction 是 repo 的衍生部署品；兩邊不一致時以 repo 為準，並登記差異。
- 外部 skill、框架或起手包未經 `Jubo官網AI開發規範/13_外部AI資源評估與採用紀錄.md` 評估，不得引入本專案。

## 資料夾用途

- `Jubo官網AI開發規範/`：全站設計系統與稽核基準。
- `JP日本市場頁面改版/`：日本市場頁面現況、決策、文案與待辦。
- `custom-code/`：外部 script selector、Embed 依賴與 POC。
- `.claude/skills/`：Three.js 專用 skills；不代表目前 Webflow 頁面一定使用 Three.js。

## 安全

- 不提交 Webflow token、密鑰或 `.env`。
- 大型圖片、影片與設計檔放 Webflow Assets 或核准的雲端儲存，不進 git。
