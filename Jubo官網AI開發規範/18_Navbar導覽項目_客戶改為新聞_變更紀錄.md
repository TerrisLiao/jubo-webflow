# 18｜Navbar 主導覽「客戶」改為「新聞」— 變更紀錄

- 日期：2026-09-14
- 站台：`jubo-health.com`（site id `69ec2b02daa2e79f1da8772a`）
- 對象：`Navbar` Component Definition（component id `24d484de-b8de-0ddb-97f8-bf58fc68c6bf`，33 個實例）
- 委託：Terris — 「把導覽的『客戶』改為『新聞』，連結指到新聞中心」
- 主管理由：客戶成功故事已有多個進入管道，新聞只有首頁才進得去，入口分配不合理
- 狀態：**已修改、已 Publish**（Terris 於 2026-09-14 自行發布）

---

## 1. 改動內容

| 位置 | element id | 改動前 | 改動後 |
|---|---|---|---|
| 桌機主導覽 | `24d484de-b8de-0ddb-97f8-bf58fc68c77a`（`a.nav-link`） | 文字「客戶」／連結 page `6a1cd470a75f99c148ea2cfe`（`/customer-success-stories`） | 文字「新聞」／連結 page `6a029c4af6ffcfde1b409c31`（`/news`） |
| 手機抽屜 | `a3551443-ffb4-e33f-9306-1ced04a31a03`（`a.mobile-menu-link`） | 同上 | 同上 |

桌機列現為：`找到適合你的方案 / 產品 / 資源 / 新聞 / 公司`　＋　`.nav-utility_wrapper`（`預約諮詢`、`登入`）。
手機抽屜現為：`首頁 / …（mega menu 手風琴）/ 新聞 / 公司 / 登入`。

---

## 2. 做法與合規性

- 兩處都用 `linkType: page` 指向 page id，**沒有寫死路徑**，與站上既有寫法一致。
- **沒有新增、改名或刪除任何 class。** 桌機仍是
  `<a class="nav-link"><span class="btn-animate-chars__text" data-button-animate-chars>新聞</span></a>`，
  手機仍是 `<a class="mobile-menu-link"><div>新聞</div></a>`，結構與兄弟項目完全相同。
- `.nav-link`、`.mobile-menu_wrap` 等被 Slater（`slater.app/20018/60292.js`／`60294.css`）以 class 選擇器抓取
  （見 `custom-code/slater-selectors.md`），本次**只改文字與連結目標，未動 class**，因此不影響外部程式碼。
- 沒有動 mega menu、沒有動 `Glass Button` component、沒有新增 HTML Embed、沒有自訂 CSS。

### 實作備註

手機那則的文字節點包在一個沒有 class 的 `div` 裡，`set_text` 對該 `div` 會回
「This element doesn't support text」；要直接對 String 節點（`a3551443-ffb4-e33f-9306-1ced04a31a05`）下 `set_text` 才成功。
桌機的 `set_text` 會**替換掉舊的 String 節點**：原 `24d484de-b8de-0ddb-97f8-bf58fc68c77c` 已不存在，
新節點 id 為 `7ffb4166-f271-6f6e-2908-74af4b62d593`。`span` 與 `a` 本身的 id 不變。

---

## 3. 驗證

以 `query_elements` 讀回 Navbar component tree（2026-09-14）：

- 桌機 `a.nav-link` → `link: { linkType: page, pageId: 6a029c4af6ffcfde1b409c31 }`，子節點文字「新聞」。
- 手機 `a.mobile-menu-link` → 同一個 pageId，子節點文字「新聞」。
- 全 Navbar component tree 以 `text: "客戶"` 搜尋，**0 筆**（改動前為 2 筆），確認沒有漏改的第二處。
- `data-button-animate-chars` 屬性仍在，字元動畫不受影響。

**驗證限制**

- 未取截圖：本次只改文字與連結，未動樣式；且依 `17` 的經驗，頁面上的 Navbar instance 截圖會拿到快取畫面。
- 讀回驗證是在 Publish **之前**做的（Designer 端）；發布後未再以線上 CSS／DOM 複驗，若要確認線上結果，開 `jubo-health.com` 檢查 header 的第四個導覽項目是否為「新聞」且 href 指向 `/news`。
- 手機抽屜在桌機斷點是 `display: none`，僅以元素樹確認。

---

## 4. 影響與待確認

1. **`/customer-success-stories` 失去主導覽入口。** 這是本次調整刻意的取捨（主管認為該頁已有多個進入管道）。
   實際仍可從首頁客戶案例區、各解決方案頁、CMS 案例卡等進入；若日後發現流量明顯下降，可考慮把它收進
   `資源` mega menu，而不是放回第一層。
2. **已 Publish（2026-09-14，Terris 自行發布）。** Navbar 是 Component Definition，這次發布同時更新 33 個實例，等於全站生效。
3. `17_系統登入頁_結構與樣式修正紀錄.md` 內文出現的「…/ 資源 / 客戶 / 公司 / …」是當時的歷史紀錄，**不回頭修改**；
   導覽現況以本檔為準。
