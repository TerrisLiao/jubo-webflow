# 社群追蹤頁（`/community`）交接紀錄

> 用途：系統內 banner 導流的「追蹤官方社群」頁，三個頻道：Facebook、YouTube、LINE。
> 對象：已在使用 Jubo 系統的現有客戶（多半在電腦上點進來）。
> 狀態：**Draft，未 Publish**。目前完成第一段 Hero；第二段「三個頻道收合面板」等 Terris 提供細節與參考圖。
> 建立日期：2026-10-13

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
| 頁面 custom code | 無（複製後確認 head／footer 皆空） |

## 2. 設計決策

- 第一版提案（笑臉弧線、三段頻道介紹）被 Terris 否決：「設計好糟糕」。
- 改依 Terris 提供的參考圖：**人物手持手機＋四張 UI 通知卡環繞**。卡片內容對應三個頻道：
  - 左上 lime：Facebook 新活動（三三分享會 2026 秋季場）
  - 右上 lilac：YouTube 直播通知＋「預告 → 直播中 → 回放」進度
  - 左下 ink：LINE 新文章
  - 右下 cream：這週的新消息數
- 參考圖的酒紅改為深墨綠 `community/ink`；lime、lilac 取自 Jubo 漸層色的黃、紫色相並提高飽和度。
- Hero 只有一個主 CTA「選擇你的頻道」（錨點 `#channels`，目標 section 尚未建立），三個頻道 icon 為次要直連。
- 動畫全部用 **IX3**（Terris 指定），沒有寫頁面層 GSAP 程式碼。
- **出格設計（2026-10-13 第二輪）**：人物改為 Codex 生成的照服員去背照（手持手機）。teal 拱形框放在人物後面，人物底部（腰部水平切線）對齊框底，頭與拿手機的手超出框外。直播卡片疊在人物**後面**，手機壓住卡片下緣，做出跟參考圖一樣的前後層次。

## 3. 新增的 Variables（Jubo Variables collection）

沿用 `jubo-digital/*` 的頁面專屬變數慣例：

| 變數 | 值 |
|---|---|
| `community/lime` | `#DDEB4A` |
| `community/lilac` | `#CDBDFF` |
| `community/paper` | `#F1F4EF` |
| `community/cream` | `#FBFAF5` |
| `community/ink` | `#0E3B3B` |
| `community/ink-70` | `rgba(14, 59, 59, 0.72)` |
| `community/live-red` | `#F2192B` |

## 4. Class（folder `community-hero`）

結構：`section_community-hero` > `padding-global padding-section-large` > `container-large` > `community-hero_component`（`.9fr 1.1fr` 兩欄，medium 起單欄）。

| 區塊 | Class |
|---|---|
| 文字欄 | `_content`、`_kicker`、`_kicker-icons`、`_kicker-icon`、`_heading`（h1）、`_highlight`、`_highlight-bar`、`_lead`、`_actions`、`_cta`、`_cta-icon`、`_icon-small`、`_channels`、`_channel`、`_channel-icon` |
| 主視覺 | `_visual`（aspect-ratio 980/1224）、`_block`、`_frame`（teal 拱形框：left 16%／top 36%／62%×41%）、`_person-mask`（上方放開、下緣切在框底 bottom 23%，`overflow:hidden`，z 2）、`_person`（去背人物：left 21.8%、寬 60%、底部對齊）、`_spark`（`is-teal`／`is-lilac`／`is-red`） |
| 卡片 | `_card-wrap`（定位＋滑鼠視差用，`is-event`／`is-live`／`is-article`／`is-count`）、`_card`（進場、漂浮、hover 用，同四個 combo）、`_card-icon`、`_icon-medium`、`_icon-large`、`_card-source`（`is-spaced`／`is-lime`）、`_source-icon`、`_card-title`（`is-small`）、`_card-text`、`_card-go`（`is-lime`）、`_live-dot`、`_steps`、`_steps-line`、`_steps-fill`、`_step`、`_step-dot`（`is-done`／`is-now`）、`_count-label`、`_count-row`、`_count-number`、`_count-icons` |

**層次（z-index）**：`_frame`／`_block` 在最底 → `_card-wrap.is-live`（z 1）→ `_person-mask`（z 2）→ 其他三張 `_card-wrap`（z 3）。

**為什麼人物要包一層遮罩**：遮罩的下緣切在框底，人物從下往上升時只會從框底「冒出來」，不會在框的下方露出。

**為什麼卡片分兩層**：`_card-wrap` 給滑鼠視差（x/y），`_card` 給進場（scale/rotation/opacity）、漂浮（y）與 hover，避免多個 IX3 搶同一個 transform。

RWD：medium 單欄、視覺最寬 34rem；small 縮小卡片字級、內距、icon 與圓角（卡片採百分比定位，整組等比縮）。

## 5. 新增的 Assets

`community-icon-facebook.svg`、`-youtube.svg`、`-line.svg`、`-arrow-ink.svg`、`-arrow-lime.svg`、`-bell.svg`、`-check.svg`。
人物：`community-hero-person-caregiver.webp`（`6acdf2328abb70cd3d68bd72`，Codex 生成、透明背景，1112×1270，裁在腰部水平線，alt「照服員看著手機露出笑容」）。第一版暫用的 `jubo-homecare-window.webp` 已不在此頁使用（素材本身未刪）。

## 6. IX3 互動（皆 `scope: pages /community`）

| 名稱 | ID | 內容 | 降級 |
|---|---|---|---|
| Community Hero · Intro sequence (IX3) | `i-a0ad8508` | 0s teal 拱形框由下長出；0.2s 人物從框底升起（yPercent 55→0、1.3s expo.out）；0.15s lime 色塊由下長出；0.25s 標題逐行遮罩上推（splitText lines＋mask，間隔 0.14s）；0.6–1.11s 四張卡依序從人物方向彈出（scale .3→1、旋轉歸零、back.out）；0.95s 螢光筆底線由左刷出；1.0s 頻道 icon 旋轉彈入；1.1s 小圓點 elastic 彈出；1.4s 數字「3」彈跳；1.45s 直播進度條填滿 | reduced motion → `skip-to-end` |
| Community Hero · Ambient loops (IX3) | `i-7b432819` | 四張卡 3–4 秒不同週期上下漂浮；直播紅點脈動；「直播中」節點呼吸；三個小圓點漂移 | reduced motion → `dont-animate` |
| Community Hero · Mouse parallax (IX3) | `i-9e4ebc1f` | 滑鼠移動時卡片、色塊以不同深度位移（色塊反向）；框與人物**只做水平位移**（±4／±8px），避免底部切線和框底錯開，smoothness 0.85 | medium／small／tiny 與 reduced motion → `dont-animate` |
| Community Hero · CTA hover (IX3) | `i-39ec49c5` | 按鈕上浮 3px、箭頭圓轉 -45° 並放大 | reduced motion → `dont-animate` |
| Community Hero · Card & channel hover (IX3) | `i-4c15b37e` | 卡片放大 1.06＋微傾；頻道 icon 放大 1.15＋旋轉 | reduced motion → `dont-animate` |

## 7. 驗證限制（未完成項目）

- ⚠️ `element_snapshot_tool` 失敗（Designer 未開啟），**沒有拿到 Webflow 內的視覺快照**。
- ⚠️ IX3 依指南「建立成功不代表會播放」，**需在 Designer Preview 確認**：進場順序、人物從框底升起（遮罩裁切）、標題 splitText 遮罩（中文＋巢狀 highlight span）、無限循環、滑鼠視差、hover。
- 替代驗證：用相同 CSS 值與 GSAP 參數在本機 Chromium 模擬 1280px 與 400px（無橫向捲動、無 console error），預覽 Artifact：<https://claude.ai/artifact/AQ7WLVe5MGP8aw47cyJBv1>。模擬沒有 JuboFont 與 `Page Gradient BG`。
- 尚未確認 `Page Gradient BG` 疊在 `community/paper` 底色上的效果，Preview 時一起看；不合適再移除。

## 8. 待辦

- [ ] 第二段：三個頻道收合面板（點擊展開，含主視覺與頻道好處 tag）— 等 Terris 細節與參考圖；`#channels` 錨點放在這段
- [ ] 卡片文案確認：秋季場報名狀態、文章標題、「這週的新消息 3」是否保留數字
- [ ] GA4 `social_click` 追蹤（頻道連結已帶 `data-platform`，script 尚未加）
- [ ] banner 連結加 UTM（`utm_source=jubo-app&utm_medium=banner`）

## 9. 回退方式

1. 刪除 IX3 `i-a0ad8508`、`i-7b432819`、`i-9e4ebc1f`、`i-39ec49c5`、`i-4c15b37e`。
2. 刪除 `/community` 頁面（Draft，未發布，不影響線上）。
3. 從 Style Manager 刪除 `section_community-hero` 與所有 `community-hero_*` class（只有這頁使用；第一版的 `_photo-wrap`／`_photo` 已刪）。
4. 刪除 7 個 `community/*` 變數、7 個 `community-icon-*` asset 與 `community-hero-person-caregiver.webp`。
