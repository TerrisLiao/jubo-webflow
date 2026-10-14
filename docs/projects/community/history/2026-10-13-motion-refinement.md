# 社群追蹤頁：柔焦白底卡片、大標籤與慢速動效

日期：2026-10-13（第二輪）。Site `69ec2b02daa2e79f1da8772a`，Page `6acde90ba4c1734c0e94b297`，路徑 `/community`。
續作 `codex/community-card-motion`、[PR #21](https://github.com/TerrisLiao/jubo-webflow/pull/21)。

## 使用者指示與目前採用設計

使用者要求右側每一個動畫慢一點、增加專業 motion graphic 細節；隨後要求左側漸層不要滿版、文字白底、模糊漸層往下 fade，tag 更大且可出格，取消 clutch，由 agent 設計新 hover。

這次用「層次、閱讀停留、緩慢跟隨」增加細節。取代前一輪滿版 gradient、小 tag 與 clutch；官網新聞、直播卡非紫色漸層、手機 ping 隱藏繼續沿用。

## 左側卡片

| 項目 | 目前設定 |
|---|---|
| 底色／文字區 | 卡片及文案區直接綁 neutral/white，移除三個 card combo 的 background-image |
| 色團 | 保留既有頻道色票的雙 radial glow；blur 10px → 20px，width 105% |
| 場景範圍 | desktop 高 64%，small 以下 58%；scene 自身 overflow hidden，保留卡片上圓角 |
| Fade | 垂直透明 → 白，92% 已達白；mobile 也改垂直淡出 |
| 大 tag | 24px／mobile 22px，透明背景、ink 文字與外框；群組交錯高度、第二個靠右 |
| 出格 | 卡片 overflow visible，群組 desktop 左右 −.5rem／mobile −.25rem；只有裝飾 tag 伸出，文字區維持卡片內 |
| 尺寸 | 卡高 desktop 20rem／mobile 15rem；手機增大卡間距，保留上方色彩與下方內容 |
| Hover | 第一 tag y −6、rotation −3；第二 y −3、rotation +2，晚 .1 秒跟隨；離開平順回位 |
| 其他 hover | 卡片抬升 −3px、logo scale 1.06、箭頭滑動、柔焦色團漂移；約 .85–1.2 秒，無 clutch |

只新增 `.community-hero_channel-tag.is-offset`，套在三張卡的第二個 pill。沒有新增素材、頁面 JS／Embed、Variable；沒有改共用 Component／Slater。

## 右側時間設計

| 層次 | 改動 |
|---|---|
| 框架／人物 | 框架與 block 1.85 秒，人物 2.4 秒，起點錯開 |
| 資訊卡 | 四卡自 1.15／1.65／2.15／2.65 秒進場，時長各 1.65 秒；scale .88 → 1，轉角僅 ±3–4°，ease power3.out，取代 .3 起始縮放／back 彈跳 |
| 內部細節 | 活動 icon、直播來源 icon、LINE icon 在所屬卡片之後揭露，時長 1.1 秒 |
| 專家／數字／裝飾 | 頭像 1.1 秒、stagger .16；數字 1.4 秒；裝飾 2.1 秒、固定次序，降低 elastic 觀感 |
| 卡片漂浮 | 半週期 8.8／10.4／9.6／11.2 秒、位移 5–6px，sine.inOut |
| Live dot／裝飾漂浮 | Live dot 2.6 秒、scale 1.18／opacity 65%；裝飾 10.8–12.4 秒且縮小位移 |
| 滑鼠視差 | smoothness .92 → .97，位移縮至約 70%；維持 canvasDuration 1 與 mouseX／mouseY 角色，不用時間長度假裝放慢輸入 |
| 右卡 hover | 進／出 1／1.1 秒、scale 1.025、rotation −.75°；專家 .85／.95 秒，依序跟隨 |
| 通知敘事 | 完整週期 32 秒；FB／YT／LINE 分別從 4.6／13／21.4 秒進場，1.15 秒入、5.8 秒後開始 .9 秒退出 |
| 文章／活動 | 每次切換 1.6 秒；文章切換起點 7.8／16.2／24.6 秒，兩次切換之間約 6.8 秒穩定文字 |
| 計數 | 位移 1.45 秒，平台 icon .65 秒抬升／1.6 秒回位；末段先淡出數字、隱藏時 rewind、.65 秒淡回原值 |
| 背景 feed | 三欄 linear 循環 44／52／60 秒 |
| 直播表情 | 新 timeline `t-3b83476f`：四個表情分別在 4／11／18／25 秒出現，.65 秒柔和浮現、6.5 秒上升與左右擺移、最後 .75 秒淡出；32 秒 rest 並重複 |

直播表情的舊八個重複 tween 已移出背景 feed，拆成同一 interaction 的第三個時間軸；opacity 的淡入／淡出在時間上不重疊。手機 ping 沒有復原。永久 ambient 與 hover 的 glow 不再共用 scale，減少搶同一 transform 屬性的情況。

## 驗證與限制

- 九個 interaction 重新 get，遞迴比對與預期一致（忽略 host version、filterContext、pageId 與新 timeline 自動 ID）。
- 對所有修改保留 reduced-motion；進場 skip-to-end，循環／hover dont-animate，滑鼠視差維持 medium／small／tiny 不播放。
- 四斷點樣式與六個 tag 元素讀回，三個第二 pill 正確掛 is-offset；卡片 background-image 為 none，scene 自身裁切、card 允許 tag 出格。
- 本機結構／樣式重建於 1440／991／767／390：無水平溢出；文案與卡片為白底，scene 小於卡高 70%，pill 背景全透明；靜止與 hover 目標位置均在 viewport 內。出格是本輪要求，不能沿用上一輪「tag 必須在卡片內」的驗收條件。
- Designer 快照回 `Invalid Base64 string`，無可用影像。本機未載入圖片／JuboFont、未執行 Webflow IX3 runtime。**時間軸讀回及本機版面檢查不等於實際播放驗收。**
- 本輪未 Publish。Preview 待驗：人物與 icon、真實字體、重複 hover、32 秒循環、數字 reset、表情淡出與 reduced-motion。

## 接續與回退

[第二輪設定快照](../../../../custom-code/community/2026-10-13-motion-refinement.json) 保存受影響樣式、九個 IX3 修改前／後及元素 class 指派。執行前先讀回是否有後續修改；只回退列出的範圍。若要退兩輪，先還原本輪、再依前一輪快照回退，不可刪整頁或共用資產。
