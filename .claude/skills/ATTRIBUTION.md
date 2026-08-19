# Skills 來源標註

## `threejs-*`（10 個）— 第三方，非本專案撰寫

以下 10 個 skill **直接取自外部開源專案**，本專案未修改內容：

```
threejs-fundamentals   threejs-geometry      threejs-materials
threejs-lighting       threejs-textures      threejs-animation
threejs-loaders        threejs-shaders       threejs-postprocessing
threejs-interaction
```

| 項目 | 內容 |
|---|---|
| 來源 | <https://github.com/CloudAI-X/threejs-skills> |
| 取得路徑 | `skills/threejs-*/SKILL.md` |
| 取得日期 | 2026-08-19 |
| 授權 | 原作者於 README 聲明 **MIT License — "Feel free to use, modify, and distribute."**（repo 內無 LICENSE 檔案） |

### 更新方式

上游有更新時重新抓取即可（**不要手改這 10 個檔案**，否則下次更新會衝突）：

```bash
for s in fundamentals geometry materials lighting textures animation loaders shaders postprocessing interaction; do
  gh api "repos/CloudAI-X/threejs-skills/contents/skills/threejs-$s/SKILL.md" \
    --jq '.content' | base64 -d > ".claude/skills/threejs-$s/SKILL.md"
done
```

### ⚠️ 使用前必讀

1. **這 10 個 skill 的範例全部是 ES module（`import * as THREE from "three"`）。**
   本專案是 Webflow 站、用 UMD 全域 `window.THREE`，**照抄會壞**。
   轉換方式與原因見 `threejs-jubo-context`。
2. **它們沒有效能上限的概念。** 本專案有硬性預算（一個 canvas、draw calls ≤ 10、
   後製鏈預設不用），一律以 `threejs-jubo-context` §3 為準。
3. **不要照上游 README 的安裝說明操作。** 它的 `git clone` 指向另一個不相干的 repo
   （`pinkforest/threejs-playground`），目錄路徑也寫錯，README 內還有未完成的佔位符。
   內容以 `skills/*/SKILL.md` 本身為準。

評估過程與判斷理由記錄於
[`Jubo官網AI開發規範/09_GSAP動畫與互動規範.md`](../../Jubo官網AI開發規範/09_GSAP動畫與互動規範.md) §11-1。

---

## `threejs-jubo-context` — 本專案自己寫的

這個是 **Jubo 專案的約束層**，用來蓋掉上面 10 個 skill 的通用假設：
UMD 而非 ES module、Slater 不可動、效能預算、狀態機留在程式碼、技術選型結論。

**做任何 Three.js 工作時先讀它，再看 `threejs-*`。**

---

## 沒有採用的資源

`scottstts/Threejs-Awesome-Graphics-Agent-Skills` — 評估後不採用。
理由（規格過大、無效能預算、路由邏輯誘導堆效果）見 `09_GSAP動畫與互動規範.md` §11-2。
