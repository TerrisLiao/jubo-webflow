# 社群追蹤頁現況

更新日期：2026-10-13；已讀回 Webflow 元素、四斷點樣式與 IX3。

左側目前為三張白底場景卡，Facebook 藍／冰藍、YouTube 珊瑚紅／淡玫瑰、LINE 綠／薄荷的同色系色團只留在上方，blur 20px，向下 fade 到白色文字區。六個 pill 維持 desktop 24px／mobile 22px；群組左右偏移 desktop −24px／mobile −20px，超出部分由 card overflow hidden 裁切。靜止透明；hover 同色系兩種深淺漸層填色，標籤先 x +28／−28 向內收，再 y −6／−5 微翹、rotation −3／+3。文字維持 community/ink。卡片本體不再抬升，hover 命中範圍固定；Mobile 卡高 15rem、下方文字白底。

左側目前為單一 hover trigger、單一 10-action timeline：`control: togglePlayReverse`、`multiTimeline: false`，沒有 eventMode／groupId。總長 .7 秒、ease 9（power3.inOut），進退皆加速後緩停。兩個 trigger 指向同一 group 的 play／reverse 試作雖被 API 接受，但使用者 Preview 回報不會回位，已取代，不能照抄。最後使用者重新 Preview 回覆「all done」，完成本輪左側確認。

右側 LINE 新文章已改為官網感染管制 B16、115 年住宿式機構補助、Amy 透鏡三篇的短文案，首尾重複維持輪播銜接。YouTube 直播卡為薄荷青綠到淺天空藍，專家頭像 hover 依序展開、抬升、回位；手機 ping glow 已隱藏且兩個循環動作已移除。

右側進場採框架／人物先出、資訊卡分層進場、內部 icon 後跟的時序。通知／計數／標題循環為 32 秒；標題每次移動 1.6 秒，文章之間約有 6.8 秒穩定閱讀時間。背景 feed 為 44／52／60 秒，卡片漂浮半週期 8.8–11.2 秒，直播表情改為 6.5 秒升起加分段淡入淡出。移除主要卡片的 back／elastic 誇張彈跳；IX3 reduced-motion 與手機關閉滑鼠視差仍保留。

頁面 metadata 為 `draft: false`、`shouldPublish: true`，與舊交接 Draft 快照不同。本輪未 Publish，也未改變該狀態；不能由 Git 或 metadata 推定本輪已上線。

第四輪三個 hover 與 14 組樣式更新已讀回，另六個 IX3 定義逐項未變。以 GSAP 3.15 核心重建於 1440／1024／991／767／390／320 無水平溢出，快速方向切換沒有瞬間跳值，desktop／mobile 完整進出重播能回到靜止狀態。這是本機核心測試，沒有執行 Webflow 觸發綁定、沒有圖片／JuboFont；左側原生 Preview 確認來自使用者「all done」回覆。右側完整播放與 reduced-motion 尚待另驗。

頁面範圍：`/community`。

左側目前採用 [同色系配色與連續 hover](history/2026-10-13-hover-continuity.md)，沿用 [第三輪填色底層](history/2026-10-13-pill-fill.md)；右側沿用 [慢速動效細調](history/2026-10-13-motion-refinement.md)。較早輪次的 mixed-hue、兩條 hover 時間軸與 card 抬升已取代。詳細歷史與數值見 [專案入口](README.md)，先即時讀回再更新，不從舊段落復原網站。
