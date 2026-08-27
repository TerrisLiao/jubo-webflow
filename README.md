# jubo-webflow

Jubo Webflow 官網的輔助資料庫。網站本體、CMS、樣式與元件位於 Webflow 雲端；本 repo 保存 AI 工作規範、客製程式 selector、頁面交接與歷史決策。

## 開始前

1. 讀 `CLAUDE.md`。
2. 讀 `Jubo官網AI開發規範/00_AI工作守則.md`。
3. 讀 `Jubo官網AI開發規範/14_Webflow_Agent_Instructions同步規範.md`。站上另有兩份會被 MCP 自動載入的規則，與本 repo 有差異；**兩邊不一致時以 repo 為準**。
   規劃新頁面／Landing Page 時再讀 `Jubo官網AI開發規範/15_設計權威分層與頁面選擇矩陣.md`。
4. 若處理日本頁，讀 `JP日本市場頁面改版/README.md`、`02`、`05`、`11`。
5. 若會動 class，先讀 `custom-code/slater-selectors.md`。
6. 用 Webflow 讀回即時結構；repository 文件可能落後，不可直接拿快照覆蓋 Designer。
7. 要引入任何外部 skill／框架前，先讀 `Jubo官網AI開發規範/13_外部AI資源評估與採用紀錄.md`。

## 目錄

- `Jubo官網AI開發規範/`：Client-First、utilities、variables、components、IA 與全站稽核基準。
- `JP日本市場頁面改版/`：`/jp/overview`、`/jp/about-us` 的現況、決策與待辦。
- `custom-code/`：外部程式 selector 文件與 POC。
- `.claude/skills/`：本 repo 內供 Claude 使用的 Three.js skills；與 Webflow 頁面規範分開管理。

## 文件新鮮度

- `as-built`、class 清單、稽核報告都是有日期的快照，不是自動同步資料。
- 每次 Webflow 結構性修改後，更新對應頁面的 `02`／`05`／變更歷程。
- 不確定時以即時 Webflow 讀回為準，並在文件中明確標示「待 Designer 驗證」。
- 不把 Webflow API token、密鑰或大型二進位素材提交到 repo。
