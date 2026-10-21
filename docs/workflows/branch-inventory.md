# 分支盤點與整合狀態

> 最新清理結果（2026-10-14）：社群追蹤頁結案後，使用者刪除 `claude/confident-curie-6r3n6b`、`codex/community-card-motion`、`claude/gallant-einstein-3tvafg`；GitHub 讀回共 23 個遠端分支，含 master。詳見文末。
>
> 前次清理（2026-10-13）：使用者已從 Mac 終端機批次刪除 11 個已合併分支；GitHub 重新讀回共 24 個遠端分支，含 master。下方 ahead／behind 為合併前快照。

檢查日期：2026-10-13（Asia/Taipei）。基準 master `c1a898d393e6ec2c285ffb497c9a326e55f6e717`。34 個遠端分支：11 個工作分支當時已完整包含在 master，22 個有獨有提交。

本輪準備的是文件／程式內容整理 PR，不是把 22 條分支歷史直接合併，也不操作 Webflow。所有來源分支保留；後續刪除先重新查 head 與活動依賴。

| 分支 | 固定 head | ahead／behind | 處理 |
|---|---|---|---|
| `claude/aeo-article-guidelines-hm6xr3` | `c53f0f7237a276a7d77beb43da1490927da673eb` | 1／97 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/article-aeo-compliance-review-aua6j4` | `058b66adc1759c173930336b6499cab2b9074bc3` | 0／108 | 2026-10-13 已刪除；提交保留於 master |
| `claude/beautiful-lovelace-x8dv2l` | `3d0349043aba552c71c5f00bb20fdc70e722f421` | 106／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/brave-hopper-6j5awf` | `e58465456f16afb985e473f78cc922b700356c81` | 14／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/cms-news-schema-planning-ae6bwp` | `18a06aa28fda0271643bed9e830873535f4d8c1d` | 1／97 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/confident-curie-6r3n6b` | `f01e920f00b7bb49427a947da5b09f7a5d2fcd9e` | 3／0 | community 已匯入；2026-10-14 結案後刪除 |
| `claude/confident-euler-xqs5ar` | `15acfcd50ca65e92c0e29c68c213d49e69df039e` | 1／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/contact-page-business-card-17ysv8` | `33a38d6bc5a7905d6922d789f3caf7885414496c` | 22／87 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/dreamy-meitner-6b0x2y` | `10cd0c84c1f25fee67839eae60857a7467763e17` | 0／49 | 2026-10-13 已刪除；提交保留於 master |
| `claude/friendly-keller-u7mpo9` | `4c2898d4637bd73ba2d24fa639d88ce08b5199ac` | 5／0 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/friendly-noether-53xomc` | `314f15dde1dd99b79509434c442e135feb1019da` | 16／0 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/gallant-ptolemy-p4oajd` | `d02ce74a27e8963c0cd9edb6b5c1a8f53873e413` | 1／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/github-standards-integration-qcjoeq` | `d7dbd532415c58f0188be6e3cd51abd1f3e04ce9` | 2／95 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/incognito-mode-page-load-1uxe8j` | `c94f37ace86568ecdaf8b38c4ab20b98120aa2ab` | 51／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/inspiring-rubin-uxwbp8` | `f2b23442ee48970de73391b99ae8bc47b022da63` | 0／44 | 2026-10-13 已刪除；提交保留於 master |
| `claude/japan-about-us-consolidation-42iafi` | `a288d2d176a03f654d98b93f2d98f17391cd3b1b` | 0／92 | 2026-10-13 已刪除；提交保留於 master |
| `claude/jp-about-us-scroll-top-cobqra` | `9f7416180fec87424287ea02234b619ce66c8229` | 3／87 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/jubo-website-guidelines-assets-kypoau` | `27504711f24c4090532ca6fdc0076760d0200a31` | 1／97 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/jubo-website-slow-load-na9ug4` | `662fd4be757b1f42935f68cf3194742b30e8b5ad` | 3／87 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/jupo-ai-redesign-evpg2c` | `b5989412cb286acbdfc33fe6999958ce696be41c` | 1／107 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/mobile-ceo-eyebrow-blocked-9rhded` | `2c6e6c2ff695689e8d077ee94e4c1c76425dae98` | 0／83 | 2026-10-13 已刪除；提交保留於 master |
| `claude/modest-einstein-m7v9bx` | `7e777b1840f95bbf9d2bed523a164bfc997b1654` | 0／61 | 2026-10-13 已刪除；提交保留於 master |
| `claude/practical-meitner-l8bg78` | `1fad5c6d52015704967e12b27330ef45c9280062` | 1／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/pricing-comparison-table-ihokyz` | `3cee6ed7fda01c3136efad95f5c9a27629701e9d` | 0／98 | 2026-10-13 已刪除；提交保留於 master |
| `claude/serene-lamport-ryq8qa` | `5eeb0303f1f579e0d8a02a0b4a097d190937697c` | 3／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/system-login-buttons-styles-judplj` | `b1a53123c65b0242906fe0f9ed7d4246eadf9b43` | 0／80 | 2026-10-13 已刪除；提交保留於 master |
| `claude/webflow-mobile-gradient-headline-et9tuw` | `d6ec91f4bf723966c547c081d7cad487f66e58b6` | 0／92 | 2026-10-13 已刪除；提交保留於 master |
| `claude/webflow-seo-latest-format-afbl5v` | `94b1f6d12bfc9c29010dbe350ba5c079bd8dd7e6` | 5／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/wizardly-edison-nhpu9r` | `b1e367b6c1c395dc4a52257df4124509bdbdc5e4` | 7／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `claude/youthful-ptolemy-u3bbzi` | `6abc4ad3389f5227ca29127c433cc748b50b2bff` | 0／72 | 2026-10-13 已刪除；提交保留於 master |
| `claude/zen-babbage-bqwpx0` | `5a549d9558e279da43f14a0df9a256f79f7fe1b1` | 2／74 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `codex/cms-rich-html-style-guidelines` | `f1fa2b74ec2365d8d0915c4b20ff657431a7abf2` | 3／100 | 內容已盤點／匯入或保存來源版本；保留分支 |
| `docs/css-audit-slater-constraints` | `45da1d2274dfc27a7af7fca09caa714204049c79` | 0／145 | 2026-10-13 已刪除；提交保留於 master |
| `master` | `c1a898d393e6ec2c285ffb497c9a326e55f6e717` | — | 長期主分支 |

## 進行中工作分支

- `claude/compassionate-sagan-qkygoc`（2026-10-21 起，基於 master `6b84235`）：客戶故事模板單欄版面研究、方案一規格與 Designer 修改紀錄；2026-10-21 已發布正式站並驗證。

## 未合併 PR

- [#12](https://github.com/TerrisLiao/jubo-webflow/pull/12)：JP 返回頂部；較新的 JP 校訂與來源待辦需一併核對。
- [#16](https://github.com/TerrisLiao/jubo-webflow/pull/16)：效能、IX3、子品牌；內容已按主題分類，提案保留待審。
- [#18](https://github.com/TerrisLiao/jubo-webflow/pull/18)：資安與 Schema；以 10/13 最新摘要為入口，原歷程保留。

這些 PR 本輪未合併／關閉。整理 PR 合併後，核對最新 source head 是否新增提交，再決定關閉已被內容整合取代的 PR；勿因文件搬移就宣稱原 PR 的 Webflow QA 完成。

## 清理順序

1. 整理 PR 審查合併；確認文件／程式／來源索引可取得。
2. 重新檢查 11 個已包含分支的 head 與工作區依賴，保存 SHA 後刪除。
3. 其餘 22 個保留；確認匯入清單、外部檔案、剩餘版本差異與活動工作區後才結案。
4. 新任務用有用途的短期分支；已合併分支不再續用。

## 整理合併後、刪除前的歷史狀態（2026-10-13）

- PR #20 已合併，master 提交 `fcbb26d8d4d190676e71a9542c97221365affeb6`，合併後文件 CI 通過。
- 上方 34 個分支與 ahead／behind 是合併前固定快照，不是合併後即時值。
- 11 個清理候選仍保留：執行環境的 Git 無法連上設定的代理；GitHub 連接器未提供刪分支功能。本輪未聲稱刪除成功。
- `claude/confident-curie-6r3n6b` 原 head `f01e920f00b7bb49427a947da5b09f7a5d2fcd9e` 已重新確認仍存在；使用者指定保留。

## 清理完成紀錄（2026-10-13）

- 刪除方式：使用者執行暫存 bare repo 驗證 ancestor、force-with-lease 與 atomic push，11 個分支均回傳 deleted。
- GitHub 獨立讀回：以上 11 個分支均已不存在；共 24 個遠端分支（master、22 個原工作分支及已合併的整理分支）。
- `claude/confident-curie-6r3n6b` 保留，head `f01e920f00b7bb49427a947da5b09f7a5d2fcd9e`。
- 其餘 22 個原工作分支與整理分支本次未刪除；PR #12、#16、#18、#19 未因本次清理而合併或關閉。

## 清理完成紀錄（2026-10-14）

社群追蹤頁結案（PR #22 以 merge commit 合併，master `b584e022688a14dc29bd90ce41d9bfcea2353deb`；PR #21 隨之標為已合併）後刪除：

| 分支 | 刪除前 head | 刪除依據 |
|---|---|---|
| `claude/gallant-einstein-3tvafg` | `eeb7d45d412a59bbd922bd1d0968890d7c7dc632` | 為 master 祖先 |
| `codex/community-card-motion` | `8313c55db7bf1a7ee0913847861819529f986ac8` | 為 master 祖先 |
| `claude/confident-curie-6r3n6b` | `f01e920f00b7bb49427a947da5b09f7a5d2fcd9e` | 非祖先；唯一新增檔 `社群追蹤頁/README.md` 與 master `docs/projects/community/reference/README.md` 逐字相同，CLAUDE.md 一行索引已由新結構取代，匯入清單保存 SHA |

- 刪除方式：agent 環境的 Git 代理拒絕刪除遠端分支（HTTP 403），由使用者在 Mac 以暫存空 repo 執行 `git push <repo URL> --delete …`，三個分支均回傳 deleted。
- GitHub 讀回：三個分支均不存在，遠端共 23 個分支。
- `claude/gallant-einstein-3tvafg` 之後若因平台指定再出現，為新的短期工作分支，與上表刪除的版本無關。
