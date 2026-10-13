# 社群追蹤頁現況

更新日期：2026-10-13；第五輪 polish 已讀回 Webflow 元素、四斷點樣式與 IX3。保留整頁版型，最新細修見 [第五輪紀錄](history/2026-10-13-polish.md)。

左側目前為三張白底場景卡，Facebook 藍／冰藍、YouTube 珊瑚紅／淡玫瑰、LINE 綠／薄荷的同色系色團只留在上方，blur 24px、opacity .9，向下 fade 到白色文字區。六個 pill 維持 desktop 24px／mobile 22px；群組左右偏移 desktop −24px／mobile −20px，超出部分由 card overflow hidden 裁切。靜止透明；hover 同色系兩種深淺漸層填色，標籤先 x +28／−28 向內收，再 y −6／−5 微翹、rotation −3／+3。文字維持 community/ink。卡片本體不再抬升，hover 命中範圍固定；Mobile 卡高 15rem、下方文字白底。說明字級 .8125rem、行高 1.55、至少兩行高度；卡片陰影已減輕。

左側目前為單一 hover trigger、單一 10-action timeline：`control: togglePlayReverse`、`multiTimeline: false`，沒有 eventMode／groupId。總長 .7 秒、ease 9（power3.inOut），進退皆加速後緩停。兩個 trigger 指向同一 group 的 play／reverse 試作雖被 API 接受，但使用者 Preview 回報不會回位，已取代，不能照抄。最後使用者重新 Preview 回覆「all done」，完成本輪左側確認。

右側 LINE 新文章已改為官網感染管制 B16、115 年住宿式機構補助、Amy 透鏡三篇的短文案，首尾重複維持輪播銜接。YouTube 直播卡為薄荷青綠到淺天空藍，右側卡片與專家 hover 皆改單一 togglePlayReverse，.7 秒 power3.inOut；專家起點 0／.08／.16 秒，依序展開、抬升、回位；手機 ping glow 已隱藏且兩個循環動作已移除。

右側進場採框架／人物先出、資訊卡分層進場、內部 icon 後跟的時序。通知／計數／標題循環為 32 秒；標題每次移動 1.6 秒，文章之間約有 6.8 秒穩定閱讀時間。背景 feed 為 44／52／60 秒，卡片漂浮半週期 8.8–11.2 秒，直播表情改為 6.5 秒升起加分段淡入淡出。第五輪卡片／專家 intro 改 opacity＋yPercent，scale／rotation 留給 hover；左卡進場也改 power3.out。NEW 每輪起點 Set scale 0，0→1 進場與回到 0 的退場銜接。環境漂浮位移縮至 65%，small／tiny 停止；IX3 reduced-motion 與手機關閉滑鼠視差仍保留。

頁面 metadata 為 `draft: false`、`shouldPublish: true`，與舊交接 Draft 快照不同。本輪未 Publish，也未改變該狀態；不能由 Git 或 metadata 推定本輪已上線。

第四輪曾確認左側 hover；第五輪九組樣式與五個 IX3 讀回一致，另四個 IX3 保留、整頁元素樹不變。以 GSAP 3.15 核心重建於 1440／1024／991／767／390／320 無水平溢出，快速方向切換沒有瞬間跳值，desktop／mobile 完整進出重播能回到靜止狀態。這是本機核心測試，沒有執行 Webflow 觸發綁定、沒有圖片／JuboFont；左側原生 Preview 確認來自使用者「all done」回覆。右側完整播放與 reduced-motion 尚待另驗。

頁面範圍：`/community`。

左側目前採用 [同色系配色與連續 hover](history/2026-10-13-hover-continuity.md)，沿用 [第三輪填色底層](history/2026-10-13-pill-fill.md)；右側以 [第五輪細修](history/2026-10-13-polish.md) 為最新，保留 [第二輪](history/2026-10-13-motion-refinement.md) 的慢速節奏。較早輪次的 mixed-hue、兩條 hover 時間軸與 card 抬升已取代。詳細歷史與數值見 [專案入口](README.md)，先即時讀回再更新，不從舊段落復原網站。

第五輪本機六寬度亦通過裁切／可讀性幾何與 hover 端點測試，NEW 在首輪與後續兩輪邊界 scale 均為 0。這是 GSAP 核心取樣、非原生連續播放。使用者在第五輪原生 Preview 詢問後回覆「Looks smooth」，確認右側卡片／專家 hover 進退與快速回位平順；此前 all done 涵蓋第四輪左側。完整 32 秒循環、實際字體／素材、keyboard focus 與 reduced-motion 尚未明確確認。
