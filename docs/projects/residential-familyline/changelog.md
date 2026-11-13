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
- 依 Terris「新做一個」另開 v2 草稿頁 `/products/familyline-residential-v2`，套用可讀性優化：Hero tag／說明／CTA、UI 卡總標題、scroll card 編號與縮短列點、新增三步驟與 FAQ 5 題、重建 4 個 IX3。v1 保留供比較。未發布。
- Terris 回饋後：三頁移除 Hero 類型切換器（擋住 eyebrow，且兩頁應分開），改為頁面下方一行文字連結；v2 三張主題圖改為比照資安頁的操作流程 motion graphic（輸入、點擊、送出、數值與標籤彈出），原始碼在 `custom-code/familyline-mg`。未發布。
- 依 Terris 回饋，v2 三張動畫改為照 Figma `LTC - 安心寶` 的 LINE 畫面重建（聊天室、圖文選單、模板訊息、LIFF 生理數值／照片花絮、QR 綁定流程），右側加四步驟與放大卡。未發布。
- Terris 回報動畫文字跑版：原因是站上 body `line-height: 150%` 以固定 px 繼承進舞台。舞台改設 `line-height: 1.35`，用站上實際 CSS 重新截圖確認；陷阱寫入 `docs/standards/Webflow實作陷阱.md`。
- Terris 回報步驟 pill 跑版、動畫背景與照片問題、QR 不好看：三步驟項加 `familyline-residential_step` 讓 pill 依內容寬度；動畫手機常駐不再淡出，循環結尾只把手機內畫面淡回 LINE 聊天室；卡 3 紙本改為真實 QR 卡（segno 產生、指向 jubo-health.com）；三個 IX3 依新時間軸重建（`i-34e11391`／`i-8cd635a5`／`i-241c174f`），GSAP 實跑 3 輪誤差 0。未發布。
- 依 Terris 要求，v2 三張 scroll card 右半改用動畫的漸層（由左淡入、非 50/50），舞台改透明並加下緣淡出；順便修正舞台漸層在站上失效的問題（background-image 結尾帶純色）。未發布。
- 依 Terris 要求，手機放大到 0.72 倍，舞台改 720×560 並用負 margin 讓底部貼齊玻璃卡下緣（手機被卡片切掉）；右側步驟同步下移。未發布。
- Terris 反映背景四張照片擋路：v2 Hero 照片 wrapper 改為只在 Hero 內（combo `is-in-hero`），不再固定在整頁。v1 未改。未發布。
- 依 Terris「好更改看看」實作改版提案：另開 v3 草稿頁，Hero 改系統＋手機組合畫面與事實條、5 分頁功能展示（1、5 沿用 LINE 動畫）、機構端流程、三步驟加綁定動畫、隱私段；刪除舊 UI 卡與捲動卡；建立 3 個 LINE 動畫與 5 個分頁切換 IX3。未發布。
- v3 Hero 改成參考 Lassie 的流光背景（直向模糊色帶緩慢流動＋直紋），上方浮 LINE 手機與同步狀態卡；日照型頁與住宿型系統頁的連結改指 v3；刪除 v1 專用互動，v1 頁待 Terris 在 Designer 刪除。未發布。
- v3 功能分頁改無邊框玻璃風格（淡彩底條上的半透明白卡），各漸層面板加毛玻璃層並移除邊框。未發布。
- 依 Terris 參考圖，v3 分頁改淺灰無邊框膠囊（選中為白），面板改白卡＋邊緣彩虹光＋白邊毛玻璃。未發布。

## 2026-11-13

- Terris 定案 v2。v2：動畫步驟改一般字重並放大、Hero 左下照片換成長輩活動照、Hero 標籤改產品名＋「住宿型」漸層小標、Hero CTA 改連 /contact、刪除頁尾日照型連結、動畫改捲到該功能才從頭播放；日照型頁與住宿型系統頁連結改回 v2；新增給 Codex 的文案審稿提示詞。未發布。
- Terris 決定刪除 v3：刪除 v3 的 9 個互動，v2 互動範圍改回只限 v2；v1、v3 頁待 Terris 在 Designer 手動刪除。
- 套用 Codex 文案審稿 14 項建議到 v2（Hero 標題第二行、說明、按鈕「洽詢加購方案」、UI 卡區、功能卡、綁定步驟、動畫小標「家屬操作示範」、三步驟、FAQ）；紀錄見 reference/文案審稿-codex回覆.md。未發布。
- 依顧問回饋（先免費、預計一年後收費）改 v2 FAQ：「需要另外收費嗎？」答案改為目前免費、預計一年後改收費；FAQ 標題「加購前常見問題」改「開通前常見問題」。未發布。
- Footer「住宿型照護系統」欄新增「智齡安心寶」連到 v2（共用 Footer 元件，Terris 要求）。取代 2026-11-12「Footer 只放一個」的決定。未發布。
- 定案頁改用 `/products/familyline-residential`（v1 讓出 slug 並標待刪除，v3 標待刪除）；加 JSON-LD；全站安心寶住宿型「加購」字樣改為「免費開通」。未發布。
