# 社群追蹤頁（`/community`）交接紀錄

> 用途：系統內 banner 導流的「追蹤官方社群」頁，三個頻道：Facebook、YouTube、LINE。
> 對象：已在使用 Jubo 系統的現有客戶（多半在電腦上點進來）。
> 狀態：**Draft，未 Publish**。單一畫面 Hero（不需捲動）：左欄標題＋三張頻道卡，右欄人物出格主視覺＋持續循環的通知 feed。
> 建立日期：2026-10-13；最後更新：2026-10-14（第八輪）
> 預覽 Artifact（與 Webflow 同參數的本機模擬）：<https://claude.ai/artifact/AQ7WLVe5MGP8aw47cyJBv1>

---

## 1. 頁面

| 項目 | 值 |
|---|---|
| Page ID | `6acde90ba4c1734c0e94b297` |
| 標題 | 社群追蹤（草稿） |
| Slug | `/community` |
| 建立方式 | 複製 `Amy 透鏡_Banner`（`6a969db7bc6a8b111e520617`）取得骨架，再刪掉原有內容 |
| 保留 | `Global Style`、`Cookies`、`page-wrapper`、`main-wrapper`、`Page Gradient BG`、`all-sections-wrapper` |
| 刪除 | `Navbar`、`Footer`、`CTA Section #1` 與 Amy 的 7 個 section（依 `00` §4 獨立 Landing Page 做法） |
| 頁面 custom code | 無 |

## 2. 設計決策（依輪次）

1. 第一版（笑臉弧線＋三段頻道介紹）被否決：「設計好糟糕」。
2. 改為 Terris 提供的參考：**人物手持手機＋UI 通知卡環繞**。人物用 Codex 生成的照服員去背照，做**出格**：teal 拱形框在人物後面，人物腰線對齊框底，頭與手機超出框外；直播卡疊在人物後面。
3. 第四輪（Terris：「背景、headline、eyebrow 都要參考我們的 git」）：
   - 背景改用站上 `Page Gradient BG`（移除自訂底色）。
   - 眉標改用 `Section Tag` component（外包 `community-hero_label`）。
   - h1 字重 300，「好消息」套 `gradient-headline`。
   - FB 卡文案改「客戶見面會」，直播卡改「三三分享會」並放專家頭像。
   - LINE 改用官方 logo。
   - 主 CTA 按鈕改為副標下方三張頻道卡。
   - 整頁單一畫面不捲動：section `min-height: 100svh`，主視覺 `max-width: min(38.75rem, calc((100svh - 6rem) * 0.8))`。
4. 第五輪（Terris：「右邊主視覺的數字或文字可以設計成動畫 loop，不停有 feed / event 的氛圍，參考 biosites.com」）：
   - 主視覺改為**持續循環的通知流**，規格見 §6 `i-ef730dca`。
   - 同輪先做了 Prospera 風格的「分層長卡」（blob 照片＋浮動 chip＋benefit pills），但沒有上線就被第六輪取代。
5. 第六輪（Terris 給 Tennis Programs 參考圖：「三個卡片的風格改成這樣」）：頻道卡改為**上半色塊＋下半圓角照片＋玻璃 CTA pill**。
   - FB 卡為 featured（lime 底），YT／LINE 為白底。
   - 上半：tag pills、右上頻道 logo、兩行大標、一行說明。
   - 下半：照片撐滿，左下為半透明玻璃 pill「追蹤粉專／訂閱頻道／加入好友 →」。
   - LINE 沒有合適照片，下半改用綠色漸層＋兩個聊天泡泡。
   - YT 照片改裁三三分享會歷期節目牆，避免單張縮圖的字被切掉。
6. 第七輪（Terris：「jubo 發布了一個訊息那個 logo 要用我們的直式 logo」「每個動畫有點動太快」「三個卡片有點凌亂，這種風格做得出來嗎」＋玻璃 3D icon 卡參考）：
   - toast 頭像改為 **Jubo 直式 logo**，右下角疊頻道 logo 小徽章（仿社群推播的「誰發的＋從哪來」）。
   - 全部動畫放慢：進場約 ×1.3、hover 0.7／0.8s、feed 循環從 10 秒拉長到 15 秒、feed 牆 28／34／40 秒（見 §6）。
   - 卡片改玻璃 3D 磚的方向在同輪被第八輪取代，沒有上線。
7. 第八輪（Terris：「保留每個頻道的 gradient color，拿掉 logo 改用 icon 放在 headline 旁；gradient 要 glow 並且會動，像 security 頁的 UI 卡」→「you need to use actual logo icon」）：
   - 頻道卡改為**頻道色直向漸層底＋兩顆模糊光暈緩慢漂移**，手法同站上 security 頁 UI 卡（radial-gradient blob＋`blur`，6–8.5 秒 yoyo、sine.inOut）。
   - 光暈下方一層 `_channel-fade` 把底部洗白，文字永遠落在淺色區，對比不受光暈位置影響。
   - 大標左側放 **FB／YouTube／LINE 官方 logo**（原色、正向，不旋轉不改色，以符合各平台品牌規範），用同色 `drop-shadow` 做 glow。
   - 右下 2.5rem 白色圓形箭頭；拿掉照片、tag pills、玻璃 CTA pill。
   - small 斷點：卡片改橫向 8.5rem，fade 改水平、箭頭在右側。
8. 動畫全部用 **IX3**（Terris 指定），沒有頁面層 GSAP 程式碼。

## 3. Variables（Jubo Variables collection，頁面專屬）

| 變數 | 值 | 備註 |
|---|---|---|
| `community/lime` | `#DDEB4A` | 活動卡、featured 頻道卡、色塊 |
| `community/lilac` | `#CDBDFF` | 直播卡 |
| `community/cream` | `#FBFAF5` | 數字卡、卡片 icon 底 |
| `community/ink` | `#0E3B3B` | LINE 文章卡、箭頭 |
| `community/live-red` | `#F2192B` | 直播紅點、NEW、未讀點、YT +1 |
| `community/facebook` | `#0866FF` | 第四輪新增 |
| `community/line` | `#06C755` | 第四輪新增 |

第四輪已刪除 `community/paper`、`community/ink-70`（改用站上背景與 `neutral/black-60`）。

**未變數化的頁面裝飾色**（只用在本頁、純裝飾，若要納入設計系統再補變數）：
- feed 牆：線條 `#CFE9EA`、圖片漸層 `#CDBDFF → #9FE7EC`。
- 直播反應泡泡：`#FFB800`、`#FF5C8A`。
- 頻道卡（第八輪）：
  - 底色漸層 `180deg`：FB `#DCE8FF`、YT `#FFE1E4`、LINE `#D7F6E3` → `#F4F7FD`（62%）→ `#FBFCFE`；卡片底色 `#FBFCFE`、1px 白邊。
  - 光暈 A／B（`radial-gradient(closest-side, …)`）：FB `rgba(61,139,255,.75)`／`rgba(177,124,255,.6)`；YT `rgba(255,77,94,.65)`／`rgba(255,170,100,.6)`；LINE `rgba(25,212,107,.6)`／`rgba(46,197,217,.55)`。
  - logo glow：FB `rgba(8,102,255,.45)`、YT `rgba(242,25,43,.4)`、LINE `rgba(6,199,85,.45)`。

## 4. Class（全部 `community-hero_*`，只有本頁使用）

結構：`section_community-hero` > `padding-global padding-section-small` > `container-large` > `community-hero_component`（`1fr 1fr` 兩欄，medium 起單欄）。

| 區塊 | Class |
|---|---|
| 文字欄 | `_content`、`_label`、`_heading`（h1）、`_lead` |
| 頻道卡（第八輪） | `_channel-cards`（3 欄；small 單欄）、`_channel-card`（`is-facebook`／`is-youtube`／`is-line` 帶漸層；高 19.5rem、圓角 1.75rem、`isolation: isolate`；small 高 8.5rem）、`_channel-scene`（絕對定位滿版、`overflow: hidden`）、`_channel-glow`（寬 95%、`blur(14px)`；`is-fb-a`／`is-fb-b`／`is-yt-a`／`is-yt-b`／`is-line-a`／`is-line-b`）、`_channel-fade`、`_channel-body`（絕對定位於卡底）、`_channel-head`、`_channel-logo`（1.875rem，small 1.625rem；`is-facebook`／`is-youtube`／`is-line` 帶 drop-shadow）、`_channel-name`、`_channel-desc`、`_channel-go`（2.5rem 白圓）、`_channel-cta-arrow` |
| 主視覺骨架 | `_visual`、`_block`、`_frame`（新增 `overflow: hidden`）、`_person-mask`、`_person`、`_spark`（`is-teal`／`is-lilac`／`is-red`） |
| 通知卡 | `_card-wrap`、`_card`（`is-event`／`is-live`／`is-article`／`is-count`）、`_card-icon`（新增 `position: relative`）、`_icon-small`／`_icon-medium`／`_icon-large`、`_card-source`（`is-spaced`／`is-lime`）、`_source-icon`、`_card-title`（`is-small`）、`_card-text`、`_card-go`（`is-lime`）、`_live-dot`、`_experts`、`_expert-avatars`、`_expert`、`_experts-text`、`_count-label`、`_count-row`、`_count-number`、`_count-icons` |
| Feed 循環（第五輪） | `_feed`、`_feed-col`、`_feed-track`、`_feed-post`（`is-image`）、`_feed-avatar`、`_feed-line`（`is-short`）、`_feed-pill`、`_feed-image`、`_toasts`、`_toast`、`_toast-avatar`、`_toast-logo`（Jubo 直式 logo）、`_toast-badge`（頻道 logo）、`_toast-title`、`_toast-time`、`_ticker`（`is-article`）、`_ticker-track`、`_ticker-item`（`is-article`）、`_card-dot`、`_new-badge`、`_odometer`、`_odometer-track`、`_plus`（`is-facebook`／`is-youtube`／`is-line`）、`_reacts`、`_react`（`is-red`／`is-gold`／`is-pink`／`is-blue`）、`_ping`、`_ping-ring` |

已刪除（不再使用）：
- 第一至第四輪：`_kicker*`、`_highlight*`、`_cta*`、`_steps*`、`_channel`、`_channel-icon`、`_photo-wrap`、`_photo`。
- 第五輪分層長卡與第四輪平卡：`_channel-body`、`_channel-bar`、`_channel-arrow`、`_channel-top`、`_channel-float*`、`_channel-bottom`、`_channel-benefit(s)`、`_channel-cta-dot`。
- 各卡的頻道色 combo：`is-facebook`／`is-youtube`／`is-line` 掛在 `_channel-tag`／`_channel-cta`／`_channel-bar` 上的版本（`_channel-card` 的同名 combo 在第八輪以漸層重建）。
- 第八輪：`_channel-tags`、`_channel-tag`（`is-light`）、`_channel-media`（`is-line`）、`_channel-photo`、`_channel-cta`、`_channel-cta-icon`、`_channel-bubble`（`is-first`／`is-second`）、`_channel-card.is-featured`、`_toast-icon`。

**頻道卡 DOM**：`_channel-card.is-*` > `_channel-scene` >（`_channel-glow.is-*-a`、`_channel-glow.is-*-b`、`_channel-fade`）；`_channel-body` > `_channel-head` >（`img _channel-logo.is-*`、`_channel-name`）、`p _channel-desc`；`_channel-go` > `img _channel-cta-arrow`。

| 卡片 | 卡片 ID | logo | 光暈 A／B | 箭頭 |
|---|---|---|---|---|
| FB | `038a7c40-b65b-8068-033f-b63fcf89e6d0` | `66acfb7c-b532-ae74-1cff-b308990e4fe0` | `038a7c40…e6c1`／`…e6c2` | `038a7c40…e6ce` |
| YT | `e1eef104-938b-47ef-e851-d56c3d3bd185` | `ba6c5d9a-fd80-a962-0805-b961fda0fb95` | `e1eef104…d176`／`…d177` | `e1eef104…d183` |
| LINE | `48d99acf-5242-b5df-e4cf-798fd86d9857` | `1484d02d-fb3d-d8b6-9fcc-484df96beacd` | `48d99acf…9848`／`…9849` | `48d99acf…9855` |

連結皆 `open_in_new_tab`＋`rel="noopener"`，並保留 `data-platform`。

**層次（z-index）**：`_frame`（含 feed 牆）／`_block` → `_card-wrap.is-live`（z 1）→ `_person-mask`（z 2）→ 其他卡片、`_toasts`、`_ping`（z 3）。

**為什麼人物要包一層遮罩**：遮罩下緣切在框底，人物升起時只會從框底「冒出來」。

**為什麼卡片分兩層**：`_card-wrap` 給滑鼠視差，`_card` 給進場、漂浮與 hover，避免多個 IX3 搶同一個 transform。

**跑馬燈的無縫接法**：`_ticker-track`／`_odometer-track` 都是 4 格（最後一格＝第一格的複本），每步 `yPercent -25`。timeline 重播時倒回起點，畫面從複本跳回第一格，看起來一樣。`_feed-track` 內容重複兩次，`yPercent 0 → -50` 線性無限循環。

## 5. Assets

| 檔案 | Asset ID | 用途 |
|---|---|---|
| `community-hero-person-caregiver.webp` | `6acdf2328abb70cd3d68bd72` | 出格人物（Codex 生成、透明背景，alt「照服員看著手機露出笑容」） |
| `community-expert-1/2/3.webp` | `6acdf536e432f3f956865b10` 等 | 直播卡專家頭像（取自三三分享會宣傳圖，alt「三三分享會主講人」） |
| `community-icon-facebook.svg` | `6acde95fdaa2c2462312dee0` | FB 官方 logo（頻道卡、toast 徽章） |
| `community-icon-youtube.svg` | `6acde95f4726a0720e3302aa` | YouTube 官方 logo（頻道卡、toast 徽章） |
| `community-icon-line-logo.svg` | `6acdf536e432f3f956865afe` | LINE 官方 logo（頻道卡、toast 徽章） |
| `community-icon-arrow-ink.svg` | `6acde95f5241e7cd3129a025` | 頻道卡箭頭 |
| `community-jubo-logo-vertical.webp` | `6ace01c72f27502d08c10e27` | toast 頭像（第七輪）。站上 Assets 沒有直式 logo，依 Terris 提供的 Jubo LINE 官方帳號截圖重建，放在品牌 teal 平底上。**若品牌部有原始向量檔，請替換成正式檔** |
| `community-icon-arrow-lime.svg`、`-bell.svg`、`-check.svg` | — | 第一輪上傳的 icon |

⚠️ 以下 asset **目前沒有使用**，可刪除，但刪 asset 無法復原，需 Terris 同意：
- `community-channel-youtube.webp`（`6acdfabb66939a7554f81939`）：第五輪單張縮圖版。
- `community-channel-facebook.webp`（`6acdfabaad6a494592025206`）、`community-channel-youtube-episodes.webp`（`6acdfce4a140b1710e072367`）：第六輪卡片照片，第八輪拿掉。
- `community-glyph-facebook.svg`／`-youtube.svg`／`-line.svg`（`6ace01c6b2532f896b63cfd4`、`6ace01c7f7eab331be4bfc2e`、`6ace01c7b2532f896b63d05b`）：第八輪中途的單色線條 icon，後改用官方 logo。

## 6. IX3 互動（皆 `scope: pages /community`）

| 名稱 | ID | 內容 | 降級 |
|---|---|---|---|
| Intro sequence | `i-a0ad8508` | 第七輪整體放慢約 1.3 倍：0s 拱形框由下長出（1.35s）；0.26s 人物從框底升起（1.76s）；0.33s 標題逐行遮罩上推；0.78–1.44s 四張通知卡依序彈出；1.04s 三張頻道卡上浮（class 目標，自動套到新卡）；1.43s 小圓點；1.76s 專家頭像；1.82s 數字彈跳（`_count-number` class，含 odometer 的 4 個數字） | reduced motion → `skip-to-end` |
| Ambient loops | `i-7b432819` | 四張通知卡漂浮（5–6.4s）、直播紅點脈動、小圓點漂移；**第八輪加 6 個頻道卡光暈漂移**：光暈 A `scale 1→1.15`、`xPercent 35`、`yPercent 25`，6／6.5／7s；光暈 B `xPercent -35`、`yPercent 22`，7.5／8／8.5s；yoyo、sine.inOut，三張卡錯開 0／0.8／1.6s | reduced motion → `dont-animate` |
| Mouse parallax | `i-9e4ebc1f` | 卡片與色塊分層視差；框與人物只做水平位移；第七輪 smoothness 0.92（跟手更慢） | medium／small／tiny 與 reduced motion → `dont-animate` |
| Notification card hover | `i-4c15b37e` | 通知卡放大＋微傾（進 0.7s／出 0.8s） | reduced motion → `dont-animate` |
| Facebook／YouTube／LINE channel card hover | `i-0aad7a13`／`i-422da1c0`／`i-74f97dba` | 第八輪：卡片上浮 6px（0.7s、power3.out）、logo 放大 1.12（不旋轉，保持官方 logo 正向）、箭頭右移 4px；離開 0.8s、power3.inOut | reduced motion → `dont-animate` |
| **Feed loop**（第五輪新增） | `i-ef730dca` | 見下方兩條 timeline | reduced motion → `dont-animate` |

**Feed loop（`i-ef730dca`）**：page load 觸發，兩條 timeline。

Timeline 1「Feed cycle」：`settings.repeat -1`，第七輪起一輪 15 秒，三拍依序 FB → YT → LINE（2.0s／6.5s／11.0s）。
- 每一拍：
  - 對應頻道的 toast（Jubo 直式 logo＋頻道徽章）從下方彈入，停留約 2.6 秒後上移淡出（5.4／9.9／14.4s）。
  - 「這週的新消息」數字往上翻一格（3→4→5→6），14.4s 淡出，重播時回到 3。
  - 對應頻道 icon 彈跳。
  - 頻道色「+1」浮起後淡出。
- 活動卡跑馬燈：2.4s／6.9s／11.4s 換下一則（客戶見面會 → 見面會花絮 → 三三分享會主題預告），每步 1.1s。
- LINE 文章卡跑馬燈：4.2s／8.7s／12.9s 換下一篇。
- 活動卡鈴鐺紅點：2.0s 彈出、6.0s 消失。
- LINE「NEW」標籤：4.4s 彈出、8.2s 消失。
- 寫法：每個跑馬燈的第一步用 FromTo、之後用 To，timeline 重播倒回時 To 會還原成起點，不會被 FromTo 的 from-state 蓋掉。

Timeline 2「Continuous」：各 action 自帶 `repeat -1`。
- 拱形框內三欄 feed 牆線性捲動，28／34／40 秒（第七輪放慢），中間欄反向，仿 biosites 的漂移牆。
- 手機位置兩圈 ping 波紋，每圈 3.2 秒、間隔 1.6 秒。
- 直播卡右上四個反應泡泡（♥ ★）錯開往上飄（3.8–4.8 秒），帶左右搖擺。

## 7. 驗證狀態與限制

- ⚠️ **第七、八輪尚未取得 snapshot**：2026-10-14 對頻道卡 grid 與 FB 卡呼叫 `element_snapshot_tool` 都回 `status: false`（研判 Designer 沒開在本頁或連線中斷）。style、元素結構、asset 連結與 IX3 都已用 API 寫入並讀回，但**頻道卡光暈、官方 logo、toast 頭像的實際畫面尚未在 Webflow 端確認**，請在 Designer Preview 驗收。
- 本機模擬（Artifact v8，第八輪）：無 console error，400px 寬無橫向捲動。
- 以下為第六輪的 snapshot 結果（卡片版面已改，僅 feed 部分仍適用）。
- ✅ `element_snapshot_tool` 讀回：
  - 活動卡與文章卡的跑馬燈第一則正確；odometer 顯示 3。
  - toast、+1、反應泡泡在靜態下隱藏（opacity 0／scale 0）。
- ⚠️ snapshot **不會渲染圖片**（照片、logo、人物、頭像都是空白，URL 皆確認 200），而且卡片陰影與 backdrop-filter 會畫成色帶。所以光暈與 blur、官方 logo、toast 頭像、人物出格都要在 Designer Preview 看。
- ⚠️ snapshot 中活動卡鈴鐺旁的紅色未讀點畫成約 3rem 大圓。class 設定已確認是 0.75rem、絕對定位、無 inline style，研判是 snapshot 渲染問題。**Preview 時請確認紅點大小**。
- ⚠️ IX3「建立成功不代表會播放」，需在 Designer Preview 確認：
  - feed cycle 重播銜接（跑馬燈從複本跳回第一則、數字 6→3）。
  - feed 牆無縫循環。
  - toast 與 +1 節奏。
  - 頻道卡 hover 與光暈漂移（光暈在 `_channel-scene` 內被裁切，不應溢出卡片圓角）。
  - toast 頭像的 Jubo logo 與右下頻道徽章位置。
- 本機模擬（Artifact，1280／1366×768／400px）：無 console error、無橫向捲動；1366×768 頻道卡底緣在畫面內。模擬沒有 JuboFont。
- 輪播文案是**範例**：
  - 見面會花絮相簿、三三分享會主題預告。
  - 文章標題「評鑑季來了／照護紀錄這樣準備」「交班不再漏訊息／護理站的 3 個習慣」。
  - 數字 3→6。
  - 需換成實際內容或確認可用。

## 8. 待辦

- [ ] Designer Preview 驗收（§7 各項），特別是頻道卡光暈、未讀紅點大小與 feed 牆在 small 的密度
- [ ] 輪播文案確認：活動／文章跑馬燈的實際標題、toast 文案、「這週的新消息」是否保留數字
- [ ] 專家頭像使用授權確認
- [ ] 刪除 §5 列出的 6 個未使用 asset（需同意）
- [ ] Jubo 直式 logo 換成品牌部正式檔（目前為截圖重建）
- [ ] GA4 `social_click` 追蹤（頻道卡已帶 `data-platform`，script 尚未加）
- [ ] banner 連結加 UTM（`utm_source=jubo-app&utm_medium=banner`）

## 9. 回退方式

1. 刪除 IX3：`i-a0ad8508`、`i-7b432819`、`i-9e4ebc1f`、`i-4c15b37e`、`i-0aad7a13`、`i-422da1c0`、`i-74f97dba`、`i-ef730dca`。
2. 刪除 `/community` 頁面（Draft，未發布，不影響線上）。
3. 從 Style Manager 刪除 `section_community-hero` 與所有 `community-hero_*` class（只有這頁使用）。
4. 刪除 7 個 `community/*` 變數，以及 §5 列出的 `community-*` assets。
