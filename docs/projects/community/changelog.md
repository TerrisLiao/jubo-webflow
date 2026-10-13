# 變更歷程

- 2026-10-13（第四輪）：使用者回報左側配色灰濁、hover 結尾跳動，要求更靠邊裁切、向中間收後上翹。改為每頻道同色系兩種深淺、−24／−20px 偏移、單一 hover togglePlayReverse 與 .7 秒 power3.inOut；移除整張卡片抬升。樣式／互動讀回及 GSAP 核心連續性檢查通過，使用者 Preview 回覆 all done；本輪未 Publish。詳見 [連續 hover 紀錄](history/2026-10-13-hover-continuity.md)。
- 2026-10-13（第三輪）：依使用者提供的畫面與指示，大 tag 保留錯位尺寸但超出卡片部分隱藏；新增六種頻道主題漸層底層，hover 依序填色、離開淡回透明。三個 hover、底層與文字／連結讀回通過，四斷點本機檢查通過；本輪未 Publish。詳見 [標籤填色紀錄](history/2026-10-13-pill-fill.md)。
- 2026-10-13（第二輪）：依使用者新指示將左側滿版漸層改為上方柔焦色團與白底文字區，放大透明出格 pill、取消 clutch；右側採分層慢速進場與 32 秒通知循環，直播表情分段淡入淡出。設定讀回及四斷點本機版面檢查通過，實際 Preview 待驗、本輪未 Publish。詳見 [細調紀錄](history/2026-10-13-motion-refinement.md)。
- 2026-10-13：依目前 Webflow 場景版卡片加強漸層，新增透明 pill／clutch hover；LINE 輪播換成三篇正式站新聞，直播卡去紫色、專家頭像 hover，移除手機 ping。寫入 Designer 並讀回，本輪未 Publish；詳見 [本輪紀錄](history/2026-10-13-card-motion.md)。
- 2026-10-13：整理來源分支，建立現況／待辦／部署入口；本輪只修改 Git 文件，未操作 Webflow。
- 先前歷程保留在 [詳細來源](README.md)，不刪除舊實驗的可追溯證據。
