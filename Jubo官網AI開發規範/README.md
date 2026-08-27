> **文件新鮮度：** class 清單與稽核報告皆為有日期的快照，不會隨 Webflow 自動更新。執行結構或清理工作前先讀回即時 Designer；日本頁另讀 `../JP日本市場頁面改版/11_2026-08-20_樣式與結構稽核.md`。

# Jubo 官網 AI 開發規範

Jubo Webflow 官網（`jubo-health.com`）的設計系統完整清單與 AI 工作守則。
建立日期：2026-08-13　｜　基準：Finsweet Client-First v2 + Webflow 實況稽核

---

## 給 AI 的使用方式

**每次要對 Jubo 官網做任何 Webflow 工作之前，先讀 `00_AI工作守則.md`。**

可以把這句話貼在對話開頭：

> 請先讀「Jubo官網AI開發規範」資料夾裡的 `00_AI工作守則.md` 與 `14_Webflow_Agent_Instructions同步規範.md`，並嚴格遵守。
> 需要查 class 就看 `03`（工具類）與 `06`（自訂 class 完整清單），
> 需要查顏色與間距就看 `04`，需要查現成元件就看 `05`。
> 遇到不確定的命名，回頭比對 `01_Client-First規範摘要.md`。

---

## 檔案說明

| 檔案 | 內容 | 什麼時候看 |
|---|---|---|
| **`00_AI工作守則.md`** ⭐ | 五條鐵律、檢查清單、已知地雷 | **每次動工前必讀** |
| `01_Client-First規範摘要.md` | Finsweet Client-First v2 完整規則 | 判斷命名對不對時 |
| `02_核心結構與版面.md` | 骨架、container 寬度、section padding、斷點、字級（實際數值） | 排版時 |
| `03_全域工具類清單.md` | 275 個 utility class ＋ 實際 CSS 值 | 找現成工具類時 |
| `04_設計變數與色彩.md` | 39 個 Variables 完整表 | 用顏色、間距時 |
| `05_元件清單.md` | 36 個 Component 與用途 | 建立區塊前 |
| `06_自訂Class完整清單.md` | 538 個 custom class，依 165 個 folder 分組 | 找可沿用的 class 時 |
| `07_合規稽核報告.md` | 廠商原始 vs 後來加的、不合規清單、清理建議 | 決定要不要沿用某個舊 class 時 |
| `08_頁面與資訊架構.md` | 53 個頁面、資料夾結構、參考頁面 | 規劃新頁面時 |
| **`09_GSAP動畫與互動規範.md`** | 動畫架構、GSAP 寫法、SaaS/AI Agent 頁動效做法、無障礙 | **做任何動畫前** |
| **`11_AEO稽核與優化計畫.md`** | AI 答案引擎（AEO）稽核：JSON-LD 現況與錯誤、語意結構、FAQ、站外敘事一致性、量測 | **動 SEO / schema / metadata / 內容結構前** |
| **`12_AEO文章寫作指南.md`** | 給每週產出 `/news` 文章的人：Playbook 內容寫法規則、現有選題缺口、結構與發文節奏檢查清單 | **寫 AEO 文章前**（不需要先讀 `11`） |
| **`13_外部AI資源評估與採用紀錄.md`** | 外部 skill／框架的評估結論（SML 不採用、Webflow 官方 skill 的採用邊界） | **要引入任何外部 AI 工具前** |
| **`14_Webflow_Agent_Instructions同步規範.md`** ⭐ | 站上那份會被 MCP 自動載入的規則、逐條差異對照、同步程序 | **每次動工前**（尤其是只連 MCP、沒有 clone repo 的 session） |
| `../custom-code/slater-selectors.md` | Slater 外部 CSS/JS 鎖住的 class（**不可改名**） | 改任何 class 名之前 |

---

## 稽核摘要

| 項目 | 數量 |
|---|---|
| 全站 style 總數 | 1,261 |
| Global class | 945 |
| Combo class | 291 |
| Tag selector | 25 |
| Client-First 官方 utility | 130 ✅ |
| Jubo 專案擴充 utility | 145 ✅ |
| 自訂 class（`folder_element`） | 538 ✅ |
| Component 定義 | 36 |
| Variables | 39 |
| 頁面 | 53 |
| **不合規、後來加上的扁平 class** | **111 ❌** |
| **Webflow 預設名未改** | **21 ❌** |
| **Combo 沒用 `is-` 前綴** | **41 ⚠️** |
| **BEM 雙底線寫法** | **43 ⚠️** |

**結論**：廠商最初建置的部分**確實遵守了 Client-First**，核心結構、utility class、Style Guide 頁面都完整。
雜亂的部分集中在後續（多為 AI 或非原廠）加上的日文版頁面與比較區塊，特徵是「扁平連字號命名 + 帶版本號 + 變體不用 `is-`」。
詳見 `07_合規稽核報告.md`。

---

## 官方參考

- Client-First 文件：https://finsweet.com/client-first/docs
- 站內 Style Guide 頁：`/style-guide`（Draft，所有 utility class 的視覺樣本）
