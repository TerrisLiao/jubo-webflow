# 部署紀錄

| 層次 | 狀態 | 日期／版本 | 證據 |
|---|---|---|---|
| Git commit／PR | 已提交到 `claude/clever-ride-c8mw09`（head `279a1898ef71c88bcf9ff432fc91b51ca75c4961`）；2026-11-11 併入 `claude/awesome-keller-cz6e8g` 一起更新上線狀態 | 2026-11-03／2026-11-11 | 本專案文件 |
| Webflow Designer | 已修改並讀回（第四輪：三個解決方案頁＋住宿型產品頁全面改市佔） | 2026-11-03 | MCP `query_elements`／`get_attributes` 讀回值見 [現況](current-state.md) |
| staging | 已發布（內容同 production） | 2026-11-11 curl 確認；站點 Last Published 2026-11-11 13:50:12 UTC | `curl` 四頁：`fb-count-target` 44／46／65、兩則 CTA、產品頁 44% |
| production | **已上線**（非本專案 agent 發布；推斷隨 2026-11-10 三三分享會全站發布） | 2026-11-11 curl 確認；站點 Last Published 2026-11-10 14:01:16 UTC | `curl` 四頁：[現況](current-state.md) 表格「現值」13 列皆在、舊文案皆無 |

2026-11-03 production curl 仍為舊文案（30%／700+）；2026-11-11 再查已是新文案。中間的發布非本專案執行，最早可能是三三分享會 2026-11-10 10:30:53 UTC 的正式發布（見 `claude/christmas-sharing-page-3u67cr` 的 `docs/projects/monthly-sharing/changelog.md`），未逐次查證。

回退方式：把 [現況](current-state.md) 表格「原文」欄寫回同一元素（數字 String、`fb-count-target`、單位、描述、CTA）。
