# 社群追蹤頁現況

更新日期：2026-10-13；已讀回 Webflow 元素、四斷點樣式與 IX3。

左側目前為三張白底場景卡，青藍／暖紅 lime／綠 teal 色團只留在上方，blur 20px，向下 fade 到白色文字區。六個透明外框 pill 放大為 desktop 24px／mobile 22px，交錯靠左右、伸出卡片邊界。已取消 clutch；hover 改成標籤分層輕浮／微轉、柔焦色團漂移、logo 輕放大與箭頭滑動。Mobile 卡高 15rem，保留上方色彩與下方白底的分區。

右側 LINE 新文章已改為官網感染管制 B16、115 年住宿式機構補助、Amy 透鏡三篇的短文案，首尾重複維持輪播銜接。YouTube 直播卡為薄荷青綠到淺天空藍，專家頭像 hover 依序展開、抬升、回位；手機 ping glow 已隱藏且兩個循環動作已移除。

右側進場採框架／人物先出、資訊卡分層進場、內部 icon 後跟的時序。通知／計數／標題循環為 32 秒；標題每次移動 1.6 秒，文章之間約有 6.8 秒穩定閱讀時間。背景 feed 為 44／52／60 秒，卡片漂浮半週期 8.8–11.2 秒，直播表情改為 6.5 秒升起加分段淡入淡出。移除主要卡片的 back／elastic 誇張彈跳；IX3 reduced-motion 與手機關閉滑鼠視差仍保留。

頁面 metadata 為 `draft: false`、`shouldPublish: true`，與舊交接 Draft 快照不同。本輪未 Publish，也未改變該狀態；不能由 Git 或 metadata 推定本輪已上線。

九個 IX3 定義、卡片樣式與元素已讀回；本機樣式重建在 1440／991／767／390 無水平溢出，tag 的出格範圍與 hover 目標位置仍在 viewport 內，文字區白底、漸層非滿版。本機未載入圖片與 JuboFont、未執行 Webflow IX3 runtime；Designer 快照回 Invalid Base64 string，實際觀感仍待 Preview。

頁面範圍：`/community`。

目前採用 [柔焦卡片與慢速動效細調](history/2026-10-13-motion-refinement.md)；[前一輪更新](history/2026-10-13-card-motion.md) 的滿版漸層／小 pill clutch 已被取代，新聞與直播卡色彩仍沿用。詳細歷史與數值見 [專案入口](README.md)，發生差異時先即時讀回再更新，不從舊段落復原網站。
