# Jubo 官網（Webflow）專案說明

這個 repo 是 Jubo Webflow 官網（`jubo-health.com`）的**輔助資料中心**：規範文件、客製程式碼、CMS 結構等。
網站本體（頁面、CMS 資料、樣式）住在 Webflow 雲端，透過 Webflow MCP 讀寫；本 repo 放的是 MCP 讀不到、且需要跨裝置/跨 AI 工具共用的東西。

## 每次動工前必讀

先讀 [`Jubo官網AI開發規範/00_AI工作守則.md`](Jubo官網AI開發規範/00_AI工作守則.md)，並嚴格遵守其中的五條鐵律。
其餘規範文件索引見 [`Jubo官網AI開發規範/README.md`](Jubo官網AI開發規範/README.md)。

## 資料夾用途

- `Jubo官網AI開發規範/` — Client-First 規範、class 清單、變數、元件、頁面架構、稽核報告
- （之後視需要新增）`custom-code/` — Webflow 頁面內嵌的 script/style、Embed 元件程式碼
- （之後視需要新增）`cms-schema/` — CMS Collection 欄位結構文件化

## 注意事項

- 不要把 Webflow API token 或任何密鑰放進這個 repo（用 `.env`，已在 `.gitignore`）。
- 大型二進位檔（圖片、影片、設計檔匯出）不要放進 repo，另外用雲端硬碟或 Webflow Assets 管理。
