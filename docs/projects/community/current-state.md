# 社群追蹤頁現況

更新日期：2026-10-13；已讀回 Webflow 元素、四斷點樣式與 IX3。

左側目前為三張白底場景卡，青藍／暖紅 lime／綠 teal 色團只留在上方，blur 20px，向下 fade 到白色文字區。六個 pill 維持 desktop 24px／mobile 22px 與左右錯位，但卡片 overflow hidden，超出卡片的部分不顯示。靜止為透明外框；hover 時每張卡的兩個 pill 依序填上不同主題漸層：Facebook 藍青／淺天空藍、YouTube 珊瑚紅橘／蜜桃 lime、LINE 綠 mint／teal cyan。填色位於文字下方，文字維持 community/ink。分層輕浮、柔焦色團漂移、logo 與箭頭動作沿用，沒有 clutch。Mobile 卡高 15rem，保留上方色彩與下方白底的分區。

右側 LINE 新文章已改為官網感染管制 B16、115 年住宿式機構補助、Amy 透鏡三篇的短文案，首尾重複維持輪播銜接。YouTube 直播卡為薄荷青綠到淺天空藍，專家頭像 hover 依序展開、抬升、回位；手機 ping glow 已隱藏且兩個循環動作已移除。

右側進場採框架／人物先出、資訊卡分層進場、內部 icon 後跟的時序。通知／計數／標題循環為 32 秒；標題每次移動 1.6 秒，文章之間約有 6.8 秒穩定閱讀時間。背景 feed 為 44／52／60 秒，卡片漂浮半週期 8.8–11.2 秒，直播表情改為 6.5 秒升起加分段淡入淡出。移除主要卡片的 back／elastic 誇張彈跳；IX3 reduced-motion 與手機關閉滑鼠視差仍保留。

頁面 metadata 為 `draft: false`、`shouldPublish: true`，與舊交接 Draft 快照不同。本輪未 Publish，也未改變該狀態；不能由 Git 或 metadata 推定本輪已上線。

第三輪三個頻道 hover（各 9＋9 actions）、六個漸層底層、卡片裁切與元素已讀回，整頁文字與連結未變。本機樣式重建在 1440／991／767／390 無水平溢出；卡片裁切、填色靜止透明／hover 目標滿色、文字白底通過。本機未載入圖片與 JuboFont、未執行 Webflow IX3 runtime；先前 Designer 快照回 Invalid Base64 string，本輪未取得可用快照，實際觀感仍待 Preview。

頁面範圍：`/community`。

左側目前採用 [標籤裁切與頻道漸層填色](history/2026-10-13-pill-fill.md)；右側沿用 [慢速動效細調](history/2026-10-13-motion-refinement.md)。第二輪允許標籤顯示在卡片外的做法已取代；第一輪滿版漸層／小 pill clutch 只供追溯。詳細歷史與數值見 [專案入口](README.md)，發生差異時先即時讀回再更新，不從舊段落復原網站。
