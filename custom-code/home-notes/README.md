# 首頁「現場小紙條」客製程式

專案文件：[docs/projects/home-notes](../../docs/projects/home-notes/README.md)。部署位置與版本見該專案的 deployment.md。

| 檔案 | 用途 |
|---|---|
| `home-notes.css` | `section_home-notes` 與 `home-notes_*` class 的定義。以 `data_whtml_builder` 的 `css` 參數寫進 Webflow Style；Webflow 讀回才是部署現況 |
| `home-notes-embed.html` | 區塊內 HtmlEmbed 的原始碼：兩排對話泡泡的慢速反向移動（無縫循環、停留暫停、拖曳、手機 scroll-snap），並注入幾條樣式面板做不到的 CSS |

進場、光暈、hover 動畫在 Webflow IX3，不在這裡。改 Git 不等於改 Webflow。
