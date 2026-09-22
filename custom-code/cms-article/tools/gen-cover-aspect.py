#!/usr/bin/env python3
"""產生封面圖 aspect-ratio 的 CSS（給 /news 與 /customer-stories 模板 Embed 用）。

為什麼需要這個：
  封面圖是 Webflow Designer 的 Image 元素，綁 CMS 的 cover-image 欄位。
  Webflow 無法在編譯期知道每篇文章封面的尺寸，所以輸出的 <img> 沒有
  width/height，瀏覽器在圖片載入前預留 0 高度 —— 載入後整篇內文往下掉，
  這就是 CLS 的來源（實測 /news 0.06、/customer-stories 0.09，
  最差的一篇 0.22）。

  直接加 width/height 屬性會壞版（模板沒有設 height:auto，屬性會贏過
  CSS，封面從 896x504 變成 896x810）。改用 aspect-ratio 則尺寸完全不變、
  CLS 歸零 —— 這是實測比較過的結果，見 18_CMS文章閱讀表面 §27。

用法：
  python3 gen-cover-aspect.py covers.json > cover-aspect.css

  covers.json 格式：{"<封面圖 URL>": [width, height], ...}
  URL 取自 CMS item 的 cover-image.url；尺寸用瀏覽器讀 naturalWidth/Height。
  新文章上線後要重跑一次，沒跑到的文章只是回到今天的行為，不會壞。
"""
import json, sys, re, collections

SEL = {"news": ".news-content_cover-img", "story": ".client-story_template-img"}
ID = re.compile(r"/([0-9a-f]{24})_")
KEY = 24  # 必須用完整資產 ID：同批上傳的圖片前 12 碼會一樣，縮短會誤中別張圖


def build(sel, pairs):
    by = collections.OrderedDict()
    for url, (w, h) in pairs:
        m = ID.search(url)
        if not m or not w or not h:
            continue
        by.setdefault((w, h), []).append(m.group(1)[:KEY])
    out = []
    for (w, h), ids in by.items():
        sels = ",\n".join(f'{sel}[src*="{i}"]' for i in sorted(set(ids)))
        out.append(f"{sels} {{ aspect-ratio: {w} / {h}; }}")
    return "\n".join(out)


if __name__ == "__main__":
    data = json.load(open(sys.argv[1]))
    for kind in ("news", "story"):
        pairs = data.get(kind, [])
        if pairs:
            print(f"/* ---- {kind} 封面比例（自動產生，勿手改） ---- */")
            print(build(SEL[kind], pairs))
            print()
