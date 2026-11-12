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
