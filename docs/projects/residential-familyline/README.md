# 住宿型安心寶產品頁

狀態：採用 v2（`6af55d996d00f5158ae0ac24`），已修改 Webflow Designer，尚未發布。Hero 最新主標為「不論身在何處／隨時掌握機構近況」；現行內容與驗證限制見下列入口。

新增住宿型安心寶產品頁，並在 `/products/residential-care` 的「附加產品」加入對應 tab。住宿型安心寶是住宿型照護系統的**加購項目**，與日照的智齡安心寶（`/products/familyline`）功能不同，頁面與文案分開。

先讀 [現況](current-state.md)、[待辦](tasks.md)、[決策](decisions.md)、[部署](deployment.md)，再讀詳細規格。

## 詳細來源

- [頁面規格與文案.md](reference/頁面規格與文案.md)
- [Hero 文案與情境圖更新](reference/Hero文案與情境圖更新_2026-11-13.md)（現行 Hero；含素材索引與回退方式）

## 工作分支

- `claude/optimistic-meitner-6s2xo4`，基底 master `6b84235d9db02e098422bf9cc4192ebba4edf164`。
- Hero 更新：`codex/familyline-hero-mobile`，承接上述未合併的 v2 工作分支 `4be3847a7a597989bd97d2847a347a33771bfdb5`；不重複建立整頁。此分支的文件 PR 以來源工作分支為整合目標。
