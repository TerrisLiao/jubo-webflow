#!/usr/bin/env python3
"""產生內文圖片 aspect-ratio 的 CSS（給 /news 與 /customer-stories 模板 Embed 用）。

為什麼需要這個：
  Webflow 後台插入的內文圖片，存進 CMS 時屬性是 width="auto" height="auto"，
  而發布時 Webflow 會把 auto 當成無效值直接拿掉 —— 線上的 <img> 因此完全
  沒有尺寸資訊，瀏覽器在圖片載入前預留 0 高度。

  實測（節流網路 + 捲動到底）：
    只修封面          /news 1.83、/customer-stories 0.31   ← 比不修還糟
    封面 + 內文圖片   兩者都是 0.0000
  所以兩份對照表要一起用，不能只做一半。見規範 18 §27。

  為什麼不直接把 width/height 寫進 CMS 內文：
    (1) 後台用編輯器存檔時，Webflow 會把它改回 width="auto"，撐不久；
    (2) 會動到 78 篇文章的內文，風險遠高於改模板 CSS。

用法：
  python3 gen-img-aspect.py ratios.json > img-aspect.css

  ratios.json 格式：{"news": {"649x511": ["<完整24碼資產ID>", ...]}, "story": {...}}
  ※ 一定要用完整 24 碼。同一批上傳的圖片前 12 碼會相同，截短會讓一條規則
    同時選到好幾張比例不同的圖，把圖片拉變形（2026-09-22 實際踩過）。
  新文章上線後要重跑一次；沒列到的圖片只是回到原本行為，不會壞。
"""
import json, sys

# 只選 figure 底下的圖片（Webflow 後台插入的內文圖都在 figure 裡）。
# 刻意不用泛用的 .richtext img，避免影響 Webflow 後台編輯器的圖片顯示 ——
# 2026-09-21 就是泛用 img 規則害後台看不到圖，見規範 18 §19。
SEL = ".richtext figure img"


def build(ratios):
    seen = [i for ids in ratios.values() for i in ids]
    assert len(seen) == len(set(seen)), "資產 ID 重複"
    for a in seen:
        assert len(a) == 24, f"資產 ID 必須是完整 24 碼：{a}"
        for c in seen:
            assert c == a or a not in c, f"{a} 是 {c} 的前綴，選擇器會互相誤中"
    out = []
    for wh, ids in ratios.items():
        w, h = wh.split("x")
        sels = ",\n".join(f'{SEL}[src*="{i}"]' for i in sorted(set(ids)))
        out.append(f"{sels} {{ aspect-ratio: {w} / {h}; }}")
    return "\n".join(out)


if __name__ == "__main__":
    data = json.load(open(sys.argv[1]))
    for kind in ("news", "story"):
        if data.get(kind):
            print(f"/* ---- {kind} 內文圖片比例（自動產生，勿手改） ---- */")
            print(build(data[kind]))
            print()
