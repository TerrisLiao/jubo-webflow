# 歷程

## 2026-11-12

- 讀取操作手冊 PDF／PPTX、Figma `LTC - 安心寶`、線上住宿型／日照型／日照安心寶頁與 Slater tab 程式。
- 建立專案文件與頁面規格草稿，送 Terris 確認。未修改 Webflow。
- 依 Terris 指示改為官網附加產品頁版型（第二版規格），取代第一版 7 段 Section Flow。
- 在新 Figma 檔 `gofe4JuGyJbLUTCE2ln7SJ` 完成 3 張 UI 卡、3 張主題圖、1 張 tab 圖。曾誤放於設計團隊檔 02 頁的區塊已刪除。
- 依 Terris 意見精修 7 張圖：每張只留一個視覺焦點，其餘 UI 淡化；主題 3 改為「家屬綁定簡單安心」（帳單只由 UI 卡 3 呈現）。
- Terris 確認：Footer 只放「智齡安心寶」、兩頁加類型切換、不升級 Figma。Figma MCP 達 Starter 上限，改由手動匯出圖片。
- Webflow：建立草稿新頁 `/products/familyline-residential`（複製智慧照護助理 APP 頁並替換內容）、日照頁改名與加類型切換、日照型系統頁 tab 改名、住宿型系統頁加第三個 tab、Footer 改字；上傳 7 張素材。未發布。詳見 [部署紀錄](deployment.md)。
- Designer 截圖發現：兩頁類型切換器與住宿頁 tab「加購」標籤顯示 Webflow 預設字「This is some text inside of a div block.」（element builder 建 TextBlock 時 set_text 未生效）。已改寫 String 子節點修正；H1 第二行縮短為「家屬 LINE 隨時看」。
- 改用 Pro 帳號（Designer @Jubo），在 Jubo Design Team 新檔 `C6MRciANWNRkAw0Vq03Foh` 重建 7 張圖並分成 bg／focal 兩層；匯出 12 張分層 WebP（頁面背景需設透明，否則匯出會合成畫布底色）。發布動態預覽 artifact，待 Terris 確認後再寫入 Webflow IX3。
- Webflow：主題圖改為 bg／focal 兩層並建立 4 個 IX3 進場互動（Set＋To，reduced-motion skip-to-end）。Mobbin 研究附加產品頁可讀性，建議見 decisions／tasks。
- 依 Terris「新做一個」另開 v2 草稿頁 `/products/familyline-residential-v2`，套用可讀性優化：Hero tag／說明／CTA、UI 卡總標題、scroll card 編號與縮短列點、新增三步驟與 FAQ 5 題、重建 4 個 IX3。v1 保留供比較。未發布。- Terris 回饋後：三頁移除 Hero 類型切換器（擋住 eyebrow，且兩頁應分開），改為頁面下方一行文字連結；v2 三張主題圖改為比照資安頁的操作流程 motion graphic（輸入、點擊、送出、數值與標籤彈出），原始碼在 `custom-code/familyline-mg`。未發布。
