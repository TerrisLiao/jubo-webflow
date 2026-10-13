# 決策入口

採用版本以 [現況](current-state.md) 為入口；多輪決策與授權原文保留在 [詳細來源](README.md)。提案、已取代與採用分開辨識；文件匯入不新增 Webflow 修改／發布授權。

2026-10-13 第四輪依使用者確認，跳動範圍是左側 hover 結尾／移開。採用固定卡片命中範圍、單一 trigger＋timeline 的 togglePlayReverse；明確 FromTo 端點及 .7 秒 power3.inOut，以同一進度進退。兩個 trigger play／reverse 共用 group 的試作在 Preview 不會回位，已棄用；API 成功不能證明原生回位。最後使用者回覆 all done。配色與背景色團皆收斂為各頻道同色系深淺，不再混入 YouTube lime 或 LINE cyan。詳見 [本輪採用決策](history/2026-10-13-hover-continuity.md)。

2026-10-13 第三輪使用者要求 tag 出格部分不要顯示、留在白色卡片內，並讓每卡兩個 tag 在 hover 填上不同頻道主題色。採用 card overflow hidden 與六個原生裝飾底層；漸層字串保持固定，IX3 只動畫 opacity，不嘗試動畫不支援的 backgroundImage。底層 aria-hidden、pointer-events none，文字與既有卡片連結保留。第二輪 overflow visible 已取代；詳見 [目前左側決策](history/2026-10-13-pill-fill.md)。

2026-10-13 第二輪使用者要求右側「每一個動畫再慢一點」且增加 motion 細節，並明確取消左側滿版漸層與 clutch，改大標籤出格、下方白底。採用柔焦色團分區、標籤輕浮、分層進場與 32 秒敘事循環；使用者的本輪設計指示優先於標準預設時長。滑鼠視差為指標驅動，保持 percent canvas 1、不假借 duration 放慢；改 smoothness 0.92 → 0.97、縮小位移。詳見 [目前動效決策](history/2026-10-13-motion-refinement.md)。前一輪的小 pill／clutch／滿版漸層只供追溯。

2026-10-13 本輪經使用者授權更新卡片漸層、透明 pill、hover、新聞文案、直播卡色彩與專家頭像，移除手機 glow。沿用即時場景版，不復原交接文件早期照片版；所有動畫使用 IX3，保留 reduced-motion。漸層受 MCP Variable 解析限制，使用既有色票讀回值的原生 gradient 字串並記錄來源；未更改共用色票。詳見 [決策與驗證](history/2026-10-13-card-motion.md)。
