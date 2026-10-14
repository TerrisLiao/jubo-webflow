# 變更歷程

- 2026-10-14（第六輪）：依使用者核准的提案，標籤改推薦組合文案與青→紫漸層框（hover 填滿去框＋光掃）、說明上方加固定更新承諾、LINE 電腦版點擊顯示 QR、「這週的新消息」換成三個依序打開的通知開關；刪除 odometer／+1 相關元素與 class。讀回與本機九寬度模擬通過，QR 解碼正確；未 Publish，Designer Preview 待驗。詳見 [第六輪紀錄](history/2026-10-14-ai-frame-qr-notify.md)。
- 2026-10-13（第五輪）：依 polish only 授權，保留版型；提高左卡說明可讀性、柔化陰影與色團、整理圖示與手機 padding，右側 hover 改單一正倒播、分離 intro 屬性，修正 NEW 循環端點。讀回與六寬度本機檢查通過，使用者原生 Preview 回覆「Looks smooth」確認右側 hover；完整循環與 reduced-motion 等仍待驗，未 Publish。詳見 [細修紀錄](history/2026-10-13-polish.md)。
- 2026-10-13（第四輪）：使用者回報左側配色灰濁、hover 結尾跳動，要求更靠邊裁切、向中間收後上翹。改為每頻道同色系兩種深淺、−24／−20px 偏移、單一 hover togglePlayReverse 與 .7 秒 power3.inOut；移除整張卡片抬升。樣式／互動讀回及 GSAP 核心連續性檢查通過，使用者 Preview 回覆 all done；本輪未 Publish。詳見 [連續 hover 紀錄](history/2026-10-13-hover-continuity.md)。
- 2026-10-13（第三輪）：依使用者提供的畫面與指示，大 tag 保留錯位尺寸但超出卡片部分隱藏；新增六種頻道主題漸層底層，hover 依序填色、離開淡回透明。三個 hover、底層與文字／連結讀回通過，四斷點本機檢查通過；本輪未 Publish。詳見 [標籤填色紀錄](history/2026-10-13-pill-fill.md)。
- 2026-10-13（第二輪）：依使用者新指示將左側滿版漸層改為上方柔焦色團與白底文字區，放大透明出格 pill、取消 clutch；右側採分層慢速進場與 32 秒通知循環，直播表情分段淡入淡出。設定讀回及四斷點本機版面檢查通過，實際 Preview 待驗、本輪未 Publish。詳見 [細調紀錄](history/2026-10-13-motion-refinement.md)。
- 2026-10-13：依目前 Webflow 場景版卡片加強漸層，新增透明 pill／clutch hover；LINE 輪播換成三篇正式站新聞，直播卡去紫色、專家頭像 hover，移除手機 ping。寫入 Designer 並讀回，本輪未 Publish；詳見 [本輪紀錄](history/2026-10-13-card-motion.md)。
- 2026-10-13：整理來源分支，建立現況／待辦／部署入口；本輪只修改 Git 文件，未操作 Webflow。
- 先前歷程保留在 [詳細來源](README.md)，不刪除舊實驗的可追溯證據。
