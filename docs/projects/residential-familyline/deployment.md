# 部署紀錄

| 層次 | 狀態 | 日期／版本 | 證據 |
|---|---|---|---|
| Git commit／PR | 規劃與部署文件在 `claude/optimistic-meitner-6s2xo4`；未開 PR | 2026-11-12 | 見分支 head |
| Figma | **現行檔** `C6MRciANWNRkAw0Vq03Foh`（Jubo Design Team Pro，帳號 Designer @Jubo），section `1:2`；舊檔 `gofe4JuGyJbLUTCE2ln7SJ`（Starter，已停用） | 2026-11-12 | 每張圖分 `bg`／`focal` 兩層，第 2、3 列為單層匯出 frame |
| Webflow Designer | **已修改**（見下表），全部以 MCP 讀回確認 | 2026-11-12 | 下表 element／page ID |
| staging | 未發布 | — | 未獲發布授權 |
| production | 未發布 | — | 未獲發布授權 |

## Webflow 修改明細（2026-11-12，Designer／Data API）

站點 `69ec2b02daa2e79f1da8772a`。

| 頁面 | Page ID | 修改 | 讀回 |
|---|---|---|---|
| **新頁** `/products/familyline-residential`「智齡安心寶（住宿型）」 | `6af52afbbf57c45cf03e4154` | `duplicateOf` 智慧照護助理 APP（`6a0d65cd5a43e6918fa6db1c`），**draft: true**；SEO title／description 已填；Hero、3 張 UI 卡、3 個 scroll card、CTA Section #2 文字與圖片全部換掉；Hero 加類型切換 `3c43990f-b25e-1e0f-6b48-3752af1af2bb` | ✅ |
| `/products/familyline`「智齡安心寶（日照型）」 | `6a0d663539a726fa38494be9` | 頁面 title、SEO title／description 改名（slug 不變）；Hero 加類型切換 `dda60deb-52cd-3eee-8397-92e7620d5533`（日照型 active） | ✅ |
| `/products/day-care` | `6a0d2a039ed816408e275943` | 附加產品 tab「智齡安心寶 APP」→「智齡安心寶（日照型）」（String `6ccabd06-9d74-fa24-4904-6bc38eb4bb1e`） | ✅ |
| `/products/residential-care` | `6a029fcea88ff7b9b69bceec` | 附加產品新增第 2 組 tab：content-item `94ce701a-d3b9-3c96-dc9f-fa0df695549c`（「智齡安心寶（住宿型）」＋「加購」），visual-item `2ffd3e2a-f15d-5eea-6f41-16b0aa5020b8`（`#tab3`，連到新頁）；順序 助理 APP → 安心寶 → 推車 | ✅ |
| Footer 元件（41 個 instance） | component `bf559d46-0de7-0e5d-3110-35684e2ba87f` | 只改一個文字節點「智齡安心寶APP」→「智齡安心寶」（`…2ba8bc`），連結不變（`/products/familyline`） | ✅ |

新增素材（7 張 WebP，皆設 alt text，CDN 200）：

| 用途 | Asset ID |
|---|---|
| UI Card 生理數值 | `6af52b0f27313a861de80587` |
| UI Card 外診 | `6af52b0a28a9c0c1625ac40a` |
| UI Card 帳單 | `6af52b0a54fc882ced2a0c2d` |
| 主題 1（另用於 Hero 右上） | `6af52b0ffe8c8a400767648c` |
| 主題 2 | `6af52b0fbf57c45cf03e4df3` |
| 主題 3 | `6af52b0f54fc882ced2a0e21` |
| 住宿頁 tab | `6af52b0a82e1b1efb1d5c0e2` |

**沒有新增任何 class、Variable 或客製程式碼。** 類型切換與 tab 都沿用既有 class；切換器不掛 `data-platform-switcher`，Slater 不接管。

## 動畫（IX3，2026-11-12，未發布）

新增樣式（僅此頁使用）：
- combo `image-wrapper.is-layered`（`d72af141-90dc-3364-1cb7-2eb9ea8d165d`）：`position: relative`。
- class `familyline-residential_layer`（`0ff49619-50c6-2476-76f2-640fafada147`）：`absolute`、`top/left 0`、`100%`、`object-fit: cover`，對齊原本 3:2 容器的 cover 裁切。

三個 scroll card 圖片改為兩層：原 Image 換成 bg 素材（alt 空白，裝飾用），其上新增 focal Image。

| 圖 | bg asset | focal asset | focal element |
|---|---|---|---|
| 主題 1 | `6af557d040294b72a8e3334c` | `6af557d0837451deed81fd2e` | `a097d9cc-f444-324d-38d9-ca52e1711660` |
| 主題 2 | `6af557d09a5a91142776be48` | `6af557d06a611ebb0cc854ec` | `65e9ca0e-2255-3179-9f3b-776edd2f9630` |
| 主題 3 | `6af557d1837451deed81fdb5` | `6af557d2837451deed81fe70` | `7ce54dfd-88f2-d1a4-5a5e-f798b8d3f853` |

IX3 互動，範圍限新頁，捲動 `top 80%` 播放一次，`prefers-reduced-motion` 時 skip-to-end：

| ID | 內容 |
|---|---|
| `i-ae5f8375`／`i-3c78cf47`／`i-4046bbb2` | 主題 1–3：bg 先 Set opacity 0、scale 1.04，再 To 1.2s expo.out；focal 先 Set opacity 0、y 24，再於 0.25s 開始 To 0.7s power3.out |
| `i-73eebfd0` | 3 張 UI 卡（共用元件不改結構，整張動）：Set opacity 0、y 12、scale .95，再依序 0／0.1／0.2s To 0.6s power3.out |

依 IX3 準則 §14，全部用 Set＋To，靜止時沒有起始值，Webflow 不會在 webflow.js 載入前隱藏圖片。

**未驗證**：Designer 截圖工具失敗，畫面與動態都沒有目視確認；需在 Designer Preview 或 staging 實際捲動檢查（含重複捲動、手機、reduced-motion），發布後檢查 `<head>` 有無 `w-mod-ix3` 隱藏規則。

## v2 可讀性優化草稿（2026-11-12，未發布）

依 Mobbin 研究另開草稿頁比較，**v1 保留不動**。

| 項目 | 值 |
|---|---|
| 頁面 | `6af55d996d00f5158ae0ac24` `/products/familyline-residential-v2`「智齡安心寶（住宿型）v2 可讀性優化」，`duplicateOf` v1，draft |
| 既有元素 | element ID 與 v1 相同（component 改為 v2 page ID） |

修改（全部以 MCP 讀回確認，頁面無殘留 builder 預設字）：

| 區塊 | 內容 | 元素 |
|---|---|---|
| Hero | tag「住宿型照護系統加購」；說明改為「家屬用機構的 LINE 官方帳號就能查看…機構不用另外整理。」；CTA「洽詢加購」 | tag `4d043323-…f476`、段落 `…4131`、按鈕 `…4133` |
| UI 卡區 | 卡片上方加總標題 H2「家屬最常問的三件事」＋副標「打開 LINE 就有答案，不用再打電話問。」 | `section-header_wrapper` `330b6005-5bdd-87de-9b76-babfa098e2a6` |
| Scroll card | H3 上方加編號 tag「01 健康狀況／02 生活點滴／03 家屬綁定」；主題 1 刪第 4 點，三張卡列點縮短到 20 字內 | tag `22fdf7c8-…86bb`、`713a45a0-…f3d2`、`699b325d-…6283` |
| 三步驟（新） | H2「三步驟開始使用」：機構加購開通 → 家屬掃碼綁定 → 開始查看 | section `a0d00f85-52e0-90be-3474-f062faf89155` |
| FAQ（新） | 沿用住宿型系統頁 FAQ class 結構與 + icon（`jubo-faq.js` 全站自動接管），5 題：收費、需先用住宿系統、免下載 App、綁定人數、照片不自動分享 | `section_faq` `d7064f46-b47b-9e24-5d52-86241c650dc9` |

區塊順序：Hero → UI 卡（含總標題）→ 3 個 scroll card → 三步驟 → FAQ → CTA。

IX3（範圍限 v2 頁，設定同 v1）：`i-537f3db3`／`i-0d2dc678`／`i-3bec7923`（主題 1–3）、`i-a70ea19d`（UI 卡）。

**沒有新增 class。** 三步驟區沿用 `padding-global`、`padding-section-large`、`container-large`、`section-header_wrapper`、`3col-grid`、`section_tag`、`text-size-tiny`、`text-size-regular`（站上沒有 `padding-section-medium`）。

做不到／未做：
- CTA 主次按鈕：`CTA Section #2` 元件只有 base variant，要改需動共用元件，未做。
- FAQ H2 未套 `gradient-headline` 漸層 span（builder 無法在 Heading 內建 span）；三步驟卡片無底色卡片樣式。需在 Designer 目視決定是否補。
- FAQ 第 1 題「收費」與第 2 題答案依操作手冊與加購定位撰寫，**價格與是否必須搭配住宿系統需業務確認**。

回退：刪除 v2 頁與 4 個 `i-…` 互動即可，v1 與其他頁不受影響。

## 2026-11-12 第二輪：切換器移除、主題圖改為操作流程 motion graphic（未發布）

依 Terris 回饋（動畫要像資安頁一樣是真的 UI 操作流程；Hero 的類型切換不對且擋住 eyebrow）：

**類型切換器 → 頁面下方文字連結**

| 頁面 | 移除 | 新增（Section > `padding-global padding-section-small` > `text-align-center` > Link） |
|---|---|---|
| 日照型 `6a0d663539a726fa38494be9` | 切換器 `dda60deb-…` | section `3258f5ec-69d4-f1c6-b40a-c21459e3c748`，放在 `section_cta` 前；「住宿型機構請看：智齡安心寶（住宿型） →」連到 v1 新頁 |
| v1 `6af52afbbf57c45cf03e4154` | 切換器 `3c43990f-…` | section `c50522aa-4b06-be5d-894a-ab6d7e788a71`，scroll card 後；「日照中心請看：智齡安心寶（日照型） →」 |
| v2 `6af55d996d00f5158ae0ac24` | 切換器 `3c43990f-…` | section `f842cacc-4a3c-88f8-c3ca-241beda9fc54`，FAQ 後；同上 |

連結以 `set_link` 設為 page link 並讀回。若最後採用 v2 並改回正式 slug，日照頁連結的目標要改成 v2 page ID。

**v2 主題圖 → 三張操作流程 motion graphic**（原始碼與流程：[`custom-code/familyline-mg`](../../../custom-code/familyline-mg/README.md)）

- 刪除 v2 三個 image-wrapper 內的 bg／focal 圖片與舊互動 `i-537f3db3`／`i-0d2dc678`／`i-3bec7923`。
- whtml 插入三個 `familyline-mg_stage`：`8ec5ceeb-f179-ba2f-04a7-fc6e1321e4f1`、`fbdf902d-c09f-196a-a923-8155dbe659c5`、`ef7add7c-7bc5-75ba-ffbd-799767f26d11`；114 個 `familyline-mg*` class（只在本頁用）。
- `image-wrapper.is-layered` combo 加 `container-type: inline-size`（只在本專案頁使用）。
- 新 IX3：`i-6893ee2b`（健康狀況）、`i-dbbae4a0`（生活點滴）、`i-3fdf5897`（家屬綁定），範圍限 v2，捲動進入播放、離開暫停，reduced-motion `dont-animate`。
- 本地驗證：跑版稽核 0 問題；GSAP 三輪比對誤差 0。**Designer 截圖仍失敗，Webflow 畫面未目視。**
- v1 的主題圖與動畫未改。

## 2026-11-12 第三輪：動畫改為照 LTC 安心寶 LINE 畫面重建（未發布）

Terris：動畫要照實際 UI 設計，主要是 LINE 裡的手機畫面，可稍作改編。

- 刪除第二輪三個舞台與互動 `i-6893ee2b`／`i-dbbae4a0`／`i-3fdf5897`。
- 新舞台（whtml）：`826a6f67-bfe5-6fd5-83b3-433c270f29ef`、`d2d713af-435a-3d90-d0f7-32c223b297e0`、`9b98a734-e9a0-d8e7-14ab-e45ed235ff4f`；186 個 `familyline-line*` class。
- 新素材 6 張（圖文選單、機器人頭像、4 張活動照片，來自 Figma `LTC - 安心寶`），CDN 200。
- 新 IX3：`i-34e11391`（生理數值）、`i-8cd635a5`（照片花絮）、`i-241c174f`（家屬綁定）。（2026-11-12 第四輪重建，舊 `i-917b50eb`／`i-8fdaf032`／`i-11e62151` 已刪除）
- 卡 3 紙本改為 QR 卡元素 `2ed4b1cb-e07a-eb16-6e78-26374047d50b`（class `familyline-line3_qcard*`，QR 為 segno 產生、指向 jubo-health.com）；舊紙本元素已刪除。
- 三步驟區塊：新增 class `familyline-residential_step`（flex column、align-items flex-start），套用到 3 個步驟項，修正步驟 pill 撐滿整列。
- 細節與對應 Figma 節點：[`custom-code/familyline-mg`](../../../custom-code/familyline-mg/README.md)。
- 本地 GSAP 三輪比對誤差 0。Designer 截圖仍失敗，Webflow 畫面未目視。
- 第一版 `familyline-mg*` class 已無元素使用，待清除。

## 發布注意（重要）

- 住宿型照護系統頁的新 tab、日照頁的切換器都**連到仍是 Draft 的新頁**。發布前要先把新頁 `draft` 改成 false，或兩者同一次發布，否則線上會出現指向未發布頁的連結。
- Footer 改字會隨下一次全站發布帶到 41 頁。

## 2026-11-12 修正

- 用 `data_element_builder` 建立 TextBlock 時，`set_text` 沒有寫入，留下預設字。影響：新頁切換器 2 個、日照頁切換器 2 個、住宿頁 tab「加購」標籤 1 個。已直接改 String 子節點並讀回確認。
- 這是工具陷阱：之後用 builder 建 TextBlock，要讀回 String 子節點確認文字。

## 未驗證

- 四斷點視覺：agent 無法在 Designer 截圖，草稿頁也沒有公開網址。需在 Designer 或 staging 目視檢查切換器在 Hero 中的間距、tab 第 3 組輪播。
- Hero 左側兩張人物照與右下照片沿用範本頁素材，未換。

## 回退方式

- 新頁：保持 draft 即不影響線上；要撤銷可刪除頁面與 7 個素材。
- 其他頁：把上表文字改回原值，刪除兩個切換器與住宿頁新 tab 的兩個元素（ID 見上表）。

### 2026-11-12 卡片右半漸層

- 舞台漸層原本寫在 `familyline-line_bg-N` 的 `background-image`，結尾帶一個純色值，整條規則失效，所以站上看不到漸層。已移除該屬性，舞台改透明。
- 新增 combo `product-scroll-card_item.is-fl-1／2／3`（`2565c86b-…`、`d574153c-…`、`287f631e-…`）：右上與下方兩個 radial＋由左往右淡入的 linear，左側文字區保持原玻璃底，沒有 50/50 硬切。small 斷點改成由上往下淡入（圖在下方）。
- 套用到三個 scroll card item：`7d6813d3-…f858`、`304d247c-…fe07`、`46306b54-…badf`。

### 2026-11-12 手機放大、底部貼齊玻璃

- `image-wrapper.is-layered`：`aspect-ratio: 9/7`、`align-self: end`、`margin-bottom: -4rem`（medium −2rem、small −1.5rem，等於卡片 padding），舞台底部貼齊玻璃卡下緣，手機被卡片圓角切掉。
- `familyline-line_stage` 高度 30em → 35em（720×560），移除下緣淡出 mask。
- `familyline-line_phone` 縮放 0.6 → 0.72（left 36、top 28、281×608 stage px）；右側 kicker／step／bar／zoom 往下移 44 px。
- IX3 皆為自身百分比，不需重建。

### 2026-11-12 Hero 四張照片不再跟著捲動

- 原因：Hero 沿用 Relume `header#1`，`header#1_images-wrapper-left／right` 是 `position: fixed`，原頁靠頁面專屬互動把照片移走；複製到新頁後沒有該互動，四張照片整頁固定在畫面兩側，擋在後面各區塊上。
- v2 兩個 wrapper（`04a36172-…0374`、`04a36172-…037d`）加 combo `is-in-hero`（`position: absolute`），照片留在 Hero（90vh）內，捲過就離開。global class 未動，其他頁不受影響。
- v1 `/products/familyline-residential` 仍是原狀，未處理。

## v3 改版草稿（2026-11-12，未發布）

依[改版提案](https://claude.ai/artifact/TL5WuTUmGhVnaXhQ2F45K7)實作。四個待決事項先用提案的建議做法：拿掉 Hero 人物照、外診／帳單／活動先用靜態畫面、不做示範影片、另開 v3。

| 項目 | 內容 |
|---|---|
| 頁面 | `6af5c887d15f0b638d81d010` `/products/familyline-residential-v3`，`duplicateOf` v2，draft，放在 products 資料夾 |
| 區塊順序 | Hero → 家屬看得到什麼（5 分頁）→ 機構端流程 → 三步驟（含綁定動畫）→ 隱私與把關 → FAQ → 日照型連結 → CTA |
| Hero | 刪除 `header#1_images-wrapper-left／right`；`header#1_component` 加 combo `is-fl3`（height auto、padding-top 8rem）；CTA 改兩顆（`fl3-hero_ctas`，原 CTA Button 移入＋「看操作示範」連到 `#features`）；新增系統＋手機組合畫面 `fl3-hero_visual` `92501a29-…0917` 與事實條 `fl3-facts` `6f5d5acf-…2871` |
| 功能分頁 | section `adc59f93-…a4a1`（id `features`）。分頁 `fl3-tab` ×5、面板 `fl3-panel` ×5（漸層在 `fl3-panel_bg-1～5`），選中狀態 combo `fl3-tab.is-fl3-tab-on`（`…a4a9`）、`fl3-panel.is-fl3-panel-on`（`…a4ae`）。面板 1、5 放原本的 LINE 動畫（image-wrapper `7d6813d3-…f873`、`304d247c-…fe18` 移入 `fl3-stage-box`）；面板 2–4 為靜態手機畫面 `fl3-static*` |
| 機構端／隱私 | `fl3-how` section `b19e3b0e-…1692`、`4e6ab4e0-…0e8e`（`fl3-trust`） |
| 三步驟 | 3col 後加 `fl3-bind` `898af960-…2f85`，綁定動畫 image-wrapper `46306b54-…baf3` 移入 |
| 刪除 | 原 UI 卡 section `450c939f-…014d`、scroll card section `7d6813d3-…f847`（移出動畫後） |
| 斷點 | medium／small／tiny 都有覆寫：分頁 3 欄→2 欄、tiny 隱藏分頁說明；Hero 手機版隱藏側欄、tiny 只留手機；面板 padding 與手機負 margin 同步 |

IX3（範圍限 v3）：

- LINE 動畫：`i-a04fa156`（生理數值）、`i-44c76e57`（照片花絮）、`i-d20944f0`（家屬綁定）。卡 1、2 改由面板容器 `adc59f93-…a49e` 捲動觸發，因為隱藏的面板尺寸為 0，ScrollTrigger 量不到。產生方式：`FL_PAGE=6af5c887d15f0b638d81d010 FL_VER=v3 python3 gen_ix3.py`。
- 分頁切換：`i-b53b24d8`、`i-b03e4423`、`i-f9f0f2c4`、`i-f9c55561`、`i-f1aaeb5a`，各自 click `restart`，用 `wf:class` 移除其他分頁／面板的選中 combo、加到自己。多群組的 click 只能用 `play`，第二次點同一分頁會沒反應，所以拆成五個。

未驗證：Webflow 元素截圖工具無法使用，分頁切換與動畫需在 Designer 預覽或發布到 staging 後確認。

另注意：讀回 v2 頁的 `draft` 為 `false`，若整站發布會一起上線。

### 2026-11-12 v3 Hero 改流光背景（參考 Lassie）

- 刪除桌機系統畫面 `fl3-hero_visual`，改為 `fl3-aura` `23a589e6-…b394`：9 條直向模糊色帶 `fl3-aura_s1～s9`（`filter: blur(34px)`）＋兩層 repeating-linear-gradient 直紋 `fl3-aura_flute`＋上亮下暗 `fl3-aura_shade`；上面浮 LINE 手機 `fl3-aura_phone`（底部被卡片切掉）、同步狀態卡 `fl3-aura_status`（兩句訊息輪播）與「已送到家屬 LINE」標籤。本機原型：`custom-code/familyline-mg/aura/hero-aura-mock.html`（CSS keyframes 版，只供預覽）。
- IX3 `i-ef308d5f`（wf:load）：每條色帶 11–16 秒左右來回（xPercent ±35、scaleX），狀態訊息 8 秒輪播；reduced-motion 不播。
- medium／small／tiny 斷點：手機版狀態卡移到上方、手機置右或置中，tiny 隱藏標籤。

### 2026-11-12 v1 刪除前置

- Terris 同意刪除 v1、保留 v2。Webflow MCP 沒有刪除頁面的功能，v1 頁需在 Designer 手動刪除。
- 已先處理指向 v1 的連結：日照型頁 `1ff3848e-…7a91` 與住宿型系統頁附加產品 tab `2ffd3e2a-…20b8` 改連 v3 `6af5c887d15f0b638d81d010`。
- 已刪除只作用於 v1 元素的 IX3：`i-ae5f8375`、`i-3c78cf47`、`i-4046bbb2`、`i-73eebfd0`。

### 2026-11-12 分頁玻璃風格、面板毛玻璃

- `fl3-tab`：移除邊框，改半透明白＋`backdrop-filter: blur(18px) saturate(160%)`＋內側高光陰影；選中 `is-fl3-tab-on` 改不透明度較高的白與較深陰影。`fl3-tabs` 外層加 8px 內距與淡彩漸層底，讓玻璃效果看得出來。
- `fl3-panel`、`fl3-bind` 移除邊框；`fl3-panel_bg-1～6` 改成較集中的三團色塊；每個面板在漸層層之後加 `fl3-frost`（`backdrop-filter: blur(30px)`、上方亮面、淡直紋、內側白邊），共 6 個元素。

### 2026-11-12 分頁與面板改參考圖風格（白卡＋彩虹邊緣光）

- 依 Terris 提供的參考圖（白色卡片、邊緣柔和彩虹光、無邊框灰色膠囊）：
  - `fl3-tabs` 拿掉彩色底條；`fl3-tab` 改淺灰半透明、無陰影、圓角 20px；選中改白底＋柔和陰影。
  - `fl3-panel`、`fl3-bind` 白底、圓角 2.5rem、外陰影；底部內距加 14px（各斷點 `calc(… + 14px)`），讓手機停在白邊內。
  - `fl3-panel_bg-1～6` 統一為「中心白、四周粉橘／綠／粉紅／淡紫／淡青」的邊緣光。
  - `fl3-frost` 改成 `inset 0 0 0 14px #fff`（白邊）＋大範圍內側白霧＋`backdrop-filter: blur(26px)`，移除直紋與亮面。
  - `fl3-static_phone` 加 `clip-path: inset(-12px -12px 0 -12px)`，底部邊框不露出。

## 2026-11-13 定案 v2 與修飾

Terris 決定採用 v2（`6af55d996d00f5158ae0ac24`）。v3 保留未刪，之後不再更新。

| 項目 | 內容 |
|---|---|
| 動畫步驟文字 | `familyline-line_step-text`、`familyline-line_step-on-text` 改 `font-weight: 400`、`font-size: 1.375em`（22 stage px）；列高、編號圈、進度條不變，避免進度條位移對不齊。global class，v3 同步受影響 |
| Hero 照片 | 左下 `04a36172-…0378` 原為照護助理 APP 的手機照，換成長輩燈籠手作照 `6af5733e34582d659c961dcd`（asset alt 已設）。照片使用權仍待確認 |
| Hero 標籤 | Section Tag 文字改「智齡安心寶」；新增 `fl-hero_tagrow` `75c04145-…9d7f` 把標籤與漸層小標 `fl-hero_pill`「住宿型」並排 |
| Hero 說明 | 改為「家屬加入機構的 LINE 官方帳號，就能看到…機構不必另外整理。」 |
| Hero CTA | CTA Button 連結改 `/contact`，文字「預約產品說明」 |
| 刪除 | 頁尾日照型連結 section `f842cacc-…fc54` |
| 動畫觸發 | `i-34e11391`、`i-8cd635a5`、`i-241c174f` 的 scroll trigger 改 `start: top 55%`、`end: bottom 25%`，`enter`／`enterBack` 改 `restart`（捲到該功能才從頭播，離開暫停） |
| 連結 | 日照型頁 `1ff3848e-…7a91`、住宿型系統頁 tab `2ffd3e2a-…20b8` 改回連 v2 |

文案審稿：提示詞見 [文案審稿提示詞-codex.md](reference/文案審稿提示詞-codex.md)。

### 2026-11-13 v3 刪除前置

- Terris 決定刪除 v3。Webflow MCP 沒有刪頁功能，v3 頁 `6af5c887d15f0b638d81d010` 需在 Designer 手動刪除（v1 `6af52afbbf57c45cf03e4154` 同）。
- 已刪除 v3 專屬 IX3 9 個：`i-a04fa156`、`i-44c76e57`、`i-d20944f0`、`i-b53b24d8`、`i-b03e4423`、`i-f9f0f2c4`、`i-f9c55561`、`i-f1aaeb5a`、`i-ef308d5f`。
- 複製 v2 建 v3 時，v2 的 4 個互動範圍被自動加入 v3；已改回只限 v2：`i-a70ea19d`、`i-34e11391`、`i-8cd635a5`、`i-241c174f`。
- 頁面刪除後，`fl3-*` class 會變成未使用，可用 Designer Style Manager 的 Clean Up 清掉，或交給 Claude 逐一移除。`fl-hero_*`（v2 Hero 標籤列）仍在使用，不能刪。
