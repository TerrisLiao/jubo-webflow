# Git 分支、提交與交接流程

## 新任務

確認工作區乾淨；若有修改，先辨識歸屬，不自動 stash、reset 或 checkout 覆蓋。

```bash
git status --short --branch
git fetch origin
git switch -c claude/community-copy origin/master
# Codex 用 codex/<topic>；其他 agent 用 agent/<topic>
```

分支名稱描述目的，例如 `claude/community-copy`、`codex/cms-caption-fix`、`agent/schema-audit`。不為每輪視覺微調另開分支，也不在同一分支加入無關頁面。

平台指定的分支可沿用，先確認 `git merge-base HEAD origin/master`、ahead／behind 與任務歸屬；無須為改名字擅自刪遠端分支。

## 延續已有分支

以下以 `claude/<topic>` 代表使用者指定的既有分支；必須先確認本機修改與已有 local branch，以下用於尚無同名本機分支的乾淨工作區：

```bash
git ls-remote --heads origin refs/heads/claude/<topic>
git fetch origin refs/heads/claude/<topic>:refs/remotes/origin/claude/<topic>
git switch --track origin/claude/<topic>
```

已有本機分支則 `git switch claude/<topic>`，比較本機／遠端提交後再決定 fast-forward。不得 `reset --hard` 或 force push 去覆蓋不同版本。

整理 PR 合併後，舊分支可能沒有新的 AGENTS.md。繼續舊任務前先讀最新 master 的共用流程，明確合併 master 並解決文件路徑衝突；不要直接重放舊檔覆蓋新架構。

## 提交與 PR

1. 修改前記錄來源與目標；結束時檢查 `git diff --check`、實際 diff 及敏感／大型檔案。
2. 用具體訊息，例如 `docs(community): record preview blockers`。避免只寫「update」。
3. 確認要提交的檔案後精準 stage，不把其他任務的修改一併提交。
4. `git push -u origin <branch>`；讀回遠端 head SHA，確認與準備的提交一致。
5. 開 PR 至 `master`；提案或尚未完成的整合用 Draft。正文包含問題、結果、驗證、Webflow 實際修改及發布狀態。
6. 任務擴大時拆 PR 或重新描述範圍，不能讓 PR 標題停在舊目的。
7. 頻繁 push 可保留過程；合併時依審查需要 squash 零碎試作。不得為美化歷史改寫 master。

## 清理

```bash
git fetch origin --prune
git merge-base --is-ancestor origin/<branch> origin/master
git log --oneline origin/master..origin/<branch>
```

只有當前 head 已包含在 master、沒有開啟 PR 或活動工作區／其他任務依賴，才列為可刪。squash 匯入或文件收斂不等於原提交已包含；要核對內容與來源清單。

曾合併但又追加提交的分支不能直接刪，例如盤點時的 `claude/github-standards-integration-qcjoeq` 和 `codex/cms-rich-html-style-guidelines`。

刪除前記錄 head SHA、保留原因及必要的 tag／其他保存入口。分支清理與 GitHub branch protection 設定分開處理。
