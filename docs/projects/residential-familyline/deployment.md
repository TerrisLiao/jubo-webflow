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
