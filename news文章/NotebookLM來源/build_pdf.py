# -*- coding: utf-8 -*-
"""把手寫的 HTML 報告轉成中文 PDF（reportlab + 文泉驛正黑）。"""
import sys, re
from html.parser import HTMLParser
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, KeepTogether)

FONT = "WQY"
pdfmetrics.registerFont(TTFont(FONT, "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc", subfontIndex=0))
pdfmetrics.registerFontFamily(FONT, normal=FONT, bold=FONT, italic=FONT, boldItalic=FONT)

TEAL, DARK, GREY = colors.HexColor("#00808a"), colors.HexColor("#111111"), colors.HexColor("#5a5a5a")
ACCENT, BOXBG, WARNBG = colors.HexColor("#00b2c0"), colors.HexColor("#f4fbfc"), colors.HexColor("#fff8ee")
WARNBORDER, THBG = colors.HexColor("#cc7700"), colors.HexColor("#eef6f7")

def S(name, **kw):
    kw.setdefault("fontName", FONT); kw.setdefault("textColor", DARK)
    kw.setdefault("wordWrap", "CJK")
    return ParagraphStyle(name, **kw)

ST = {
    "h1":   S("h1", fontSize=19, leading=26, textColor=DARK, spaceAfter=2),
    "meta": S("meta", fontSize=8.2, leading=12.5, textColor=GREY, spaceAfter=10),
    "h2":   S("h2", fontSize=13.5, leading=19, textColor=TEAL, spaceBefore=16, spaceAfter=6,
              borderPadding=0, leftIndent=8),
    "h3":   S("h3", fontSize=11, leading=16, textColor=DARK, spaceBefore=11, spaceAfter=4),
    "p":    S("p", fontSize=9.6, leading=15.4, spaceAfter=6),
    "li":   S("li", fontSize=9.6, leading=15.0, spaceAfter=3, leftIndent=12, bulletIndent=2),
    "td":   S("td", fontSize=8.8, leading=13.2),
    "th":   S("th", fontSize=8.8, leading=13.2, textColor=DARK),
    "src":  S("src", fontSize=8, leading=12, textColor=GREY, spaceBefore=10),
}
# 4 欄以內的欄寬配置
WIDTHS = {1: [1.0], 2: [0.34, 0.66], 3: [0.24, 0.46, 0.30], 4: [0.05, 0.33, 0.40, 0.22]}

def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

class Node:
    def __init__(s, tag, attrs=None):
        s.tag, s.attrs, s.kids, s.text = tag, dict(attrs or {}), [], ""

class P(HTMLParser):
    VOID = {"br", "meta", "img", "hr", "link"}
    SKIP = {"style", "script", "head", "title"}
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.root = Node("root"); s.stack = [s.root]; s.skip = 0
    def handle_starttag(s, tag, attrs):
        if tag in s.SKIP: s.skip += 1; return
        if s.skip: return
        n = Node(tag, attrs)
        s.stack[-1].kids.append(n)
        if tag not in s.VOID: s.stack.append(n)
    def handle_endtag(s, tag):
        if tag in s.SKIP: s.skip = max(0, s.skip - 1); return
        if s.skip or tag in s.VOID: return
        for i in range(len(s.stack) - 1, 0, -1):
            if s.stack[i].tag == tag: del s.stack[i:]; break
    def handle_data(s, d):
        if s.skip: return
        n = Node("#text"); n.text = d; s.stack[-1].kids.append(n)

def inline(node):
    """把一個區塊節點的內容轉成 reportlab Paragraph 可吃的字串。"""
    out = []
    for k in node.kids:
        if k.tag == "#text":
            out.append(esc(re.sub(r"\s+", " ", k.text)))
        elif k.tag == "br":
            out.append("<br/>")
        elif k.tag in ("strong", "b"):
            out.append('<font color="#00707a">' + inline(k) + "</font>")
        elif k.tag in ("em", "i"):
            out.append("<i>" + inline(k) + "</i>")
        elif k.tag == "code":
            out.append('<font color="#8a4b00">' + inline(k) + "</font>")
        else:
            out.append(inline(k))
    return "".join(out).strip()

BLOCK_TAGS = {"h1", "h2", "h3", "p", "ul", "ol", "table", "div", "body",
              "thead", "tbody", "tr", "td", "th", "li"}

def blocks(node, width):
    """把節點的子元素轉成 flowables。散落在區塊外的 inline 內容會併成一個段落。"""
    out = []
    buf = []          # 尚未輸出的 inline 節點

    def flush():
        if not buf:
            return
        holder = Node("p")
        holder.kids = list(buf)
        buf.clear()
        txt = inline(holder)
        if txt:
            out.append(Paragraph(txt, ST["p"]))

    for k in node.kids:
        t = k.tag
        if t not in BLOCK_TAGS:
            # #text / strong / br / em / code / a ... 先收著
            if not (t == "#text" and not k.text.strip()):
                buf.append(k)
            continue
        flush()
        if t in ("h1", "h2", "h3"):
            txt = inline(k)
            if t == "h2":
                # 標題左邊加一條色塊
                tb = Table([[Paragraph(txt, ST["h2"])]], colWidths=[width])
                tb.setStyle(TableStyle([("LINEBEFORE", (0, 0), (0, 0), 3, ACCENT),
                                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                                        ("TOPPADDING", (0, 0), (-1, -1), 8),
                                        ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
                out.append(tb)
            else:
                out.append(Paragraph(txt, ST[t]))
                if t == "h1":
                    out.append(Table([[""]], colWidths=[width], rowHeights=[3],
                                     style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), ACCENT)])))
                    out.append(Spacer(1, 8))
        elif t == "p":
            cls = k.attrs.get("class", "")
            out.append(Paragraph(inline(k), ST.get(cls if cls in ST else "p", ST["p"])))
        elif t in ("ul", "ol"):
            n = 0
            for li in [x for x in k.kids if x.tag == "li"]:
                n += 1
                bullet = "•" if t == "ul" else f"{n}."
                out.append(Paragraph(inline(li), ST["li"], bulletText=bullet))
            out.append(Spacer(1, 5))
        elif t == "table":
            out.append(build_table(k, width)); out.append(Spacer(1, 7))
        elif t == "div":
            cls = k.attrs.get("class", "")
            inner = blocks(k, width - 20)
            bg, bd = (WARNBG, WARNBORDER) if cls == "warn" else (BOXBG, ACCENT)
            tb = Table([[inner]], colWidths=[width])
            tb.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg),
                                    ("BOX", (0, 0), (-1, -1), 0.8, bd),
                                    ("LEFTPADDING", (0, 0), (-1, -1), 9),
                                    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
            out.append(Spacer(1, 4)); out.append(tb); out.append(Spacer(1, 8))
        elif t == "body":
            out.extend(blocks(k, width))
    flush()
    return out

def build_table(node, width):
    rows = []
    trs = [x for x in node.kids if x.tag == "tr"]
    for sec in node.kids:
        if sec.tag in ("thead", "tbody"):
            trs.extend([x for x in sec.kids if x.tag == "tr"])
    trs.sort(key=lambda x: 0)  # 保持原順序（kids 已是文件順序）
    data, head = [], []
    ordered = []
    for c in node.kids:
        if c.tag == "tr": ordered.append(c)
        elif c.tag in ("thead", "tbody"):
            ordered.extend([x for x in c.kids if x.tag == "tr"])
    for ri, tr in enumerate(ordered):
        cells = [c for c in tr.kids if c.tag in ("td", "th")]
        is_head = all(c.tag == "th" for c in cells) and cells
        head.append(is_head)
        data.append([Paragraph(inline(c), ST["th"] if is_head else ST["td"]) for c in cells])
    if not data: return Spacer(1, 1)
    ncol = max(len(r) for r in data)
    for r in data:
        while len(r) < ncol: r.append(Paragraph("", ST["td"]))
    w = WIDTHS.get(ncol, [1.0 / ncol] * ncol)
    tb = Table(data, colWidths=[width * x for x in w], repeatRows=1 if head and head[0] else 0)
    style = [("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#c4c4c4")),
             ("VALIGN", (0, 0), (-1, -1), "TOP"),
             ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
             ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]
    for i, h in enumerate(head):
        if h: style.append(("BACKGROUND", (0, i), (-1, i), THBG))
    tb.setStyle(TableStyle(style))
    return tb

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont(FONT, 7.5); canvas.setFillColor(GREY)
    canvas.drawString(18 * mm, 12 * mm, "住宿式機構補助 115 年新制｜資料彙整　2026-09-17　智齡科技內部參考")
    canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, "第 %d 頁" % doc.page)
    canvas.setStrokeColor(colors.HexColor("#dddddd")); canvas.setLineWidth(0.4)
    canvas.line(18 * mm, 15 * mm, A4[0] - 18 * mm, 15 * mm)
    canvas.restoreState()

def main(src, dst):
    html = open(src, encoding="utf-8").read()
    p = P(); p.feed(html)
    doc = BaseDocTemplate(dst, pagesize=A4,
                          leftMargin=18 * mm, rightMargin=18 * mm,
                          topMargin=16 * mm, bottomMargin=20 * mm,
                          title="住宿式機構補助 115 年新制｜資料彙整",
                          author="智齡科技")
    fw = A4[0] - 36 * mm
    frame = Frame(18 * mm, 20 * mm, fw, A4[1] - 36 * mm, id="n",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])
    def find(n, tag):
        if n.tag == tag: return n
        for k in n.kids:
            r = find(k, tag)
            if r is not None: return r
        return None
    body = find(p.root, "body") or p.root
    story = blocks(body, fw)
    if not story:
        raise SystemExit("解析後沒有任何內容，請檢查 HTML 結構")
    doc.build(story)
    print("built:", dst, "pages:", doc.page)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
