#!/usr/bin/env python3
"""Build the Jubo AI native page payloads from this folder.

Outputs (default dist/ under this folder, not committed):
  whtml.json    root + one fragment per section for data_whtml_builder (each class's CSS sent once)
  head.html     page custom code, Inside <head>
  footer.html   page custom code, Before </body>: inline motion.js, or with --cdn the jsDelivr loader pinned to a commit (what Webflow uses)
  ix3.json      IX3 interaction payloads for data_interactions_tool
  preview.html  local preview: published page shell + this page + IX3 emulator (needs --shell)

Usage: python3 build.py [--shell path/to/published-page.html] [--cta path/to/glass-button.html] [--cdn <pushed commit>] [--out dir]
"""
import argparse, json, re
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
PAGE_ID = '6a8e58aec01bc6cda7004324'  # /ai/jubo-ai-v2 Draft
ap = argparse.ArgumentParser()
ap.add_argument('--shell'); ap.add_argument('--cta'); ap.add_argument('--terser', help='path to a terser binary; minifies the footer script'); ap.add_argument('--cdn', help='pushed commit SHA; footer.html loads motion.js from jsDelivr at that commit with SRI'); ap.add_argument('--out', default=str(HERE / 'dist'))
args = ap.parse_args()
OUT = Path(args.out); OUT.mkdir(parents=True, exist_ok=True)

icons = json.loads((HERE / 'icons.json').read_text())
def brand(name, cls):
    svg = (REPO / f'custom-code/brand/n-copilot/{name}.svg').read_text()
    svg = re.sub(r'\s*xmlns="[^"]*"', '', svg).replace(' role="img"', f' class="{cls}" aria-hidden="true" focusable="false"')
    return re.sub(r'>\s+<', '><', svg.strip())

src = (HERE / 'sections.html').read_text()
src = src[src.index('<!-- section:hero -->'):]  # skip the explanatory header comment
src = re.sub(r'\{\{ICON:([a-z0-9-]+)\}\}', lambda m: f'<svg class="jubo-ai-film_icon-svg" viewBox="0 0 24 24" stroke="url(#jaf-grad)" aria-hidden="true">{icons[m.group(1)]}</svg>', src)
src = src.replace('{{WORDMARK}}', brand('n-copilot-wordmark', 'jubo-ai-film_meet-svg')).replace('{{MARK}}', brand('n-copilot-mark', 'jubo-ai-film_chat-svg'))
sections = re.findall(r'<!-- section:([a-z]+) -->\s*(.*?)\s*<!-- /section -->', src, re.S)
sections = [(n, re.sub(r'>\s+<', '><', re.sub(r'\n\s*', '\n', h)).replace('\n', '')) for n, h in sections]
ROOT = ('<div class="jubo-ai-film_component" data-film-root="" lang="zh-Hant-TW">'
        '<svg class="jubo-ai-film_defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>'
        '<linearGradient id="jaf-grad" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">'
        '<stop offset="0" stop-color="#00a3ae"></stop><stop offset="0.55" stop-color="#3aa7d3"></stop><stop offset="1" stop-color="#57c79a"></stop>'
        '</linearGradient></defs></svg>'
        '<a class="jubo-ai-film_pause" href="#" role="button" data-motion-toggle="" aria-pressed="false">❚❚ 暫停動態</a></div>')

# ---- CSS: normalise shorthands WHTML mishandles, then split rules per class ----
css = (HERE / 'page.css').read_text()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
for a, b in [('flex:none', 'flex-grow:0;flex-shrink:0;flex-basis:auto'), ('flex:1 1 0%', 'flex-grow:1;flex-shrink:1;flex-basis:0%'),
             ('flex:1 1 auto', 'flex-grow:1;flex-shrink:1;flex-basis:auto'), ('place-items:center', 'align-items:center;justify-items:center')]:
    css = css.replace(a, b)
rules = []  # (media or '', selector, body)
for m in re.finditer(r'@media([^{]+)\{((?:[^{}]*\{[^}]*\})*)\s*\}|([^{}@]+)\{([^}]*)\}', css):
    if m.group(1):
        for r in re.finditer(r'([^{}]+)\{([^}]*)\}', m.group(2)): rules.append(('@media' + m.group(1).rstrip(), r.group(1).strip(), r.group(2).strip()))
    else: rules.append(('', m.group(3).strip(), m.group(4).strip()))
for _, sel, _ in rules:
    assert re.fullmatch(r'\.[a-z0-9_-]+(:hover)?', sel), f'non-Webflow selector: {sel}'
cls_of = lambda sel: sel.split(':')[0][1:]
defined = {cls_of(s) for _, s, _ in rules}
def css_for(classes):
    out, media = [], {}
    for mq, sel, body in rules:
        if cls_of(sel) not in classes: continue
        if mq: media.setdefault(mq, []).append(f'{sel}{{{body}}}')
        else: out.append(f'{sel}{{{body}}}')
    return '\n'.join(out + [f'{mq}{{{"".join(v)}}}' for mq, v in media.items()])
seen, frags = set(), []
for name, html in [('root', ROOT)] + sections:
    used = set(c for attr in re.findall(r'class="([^"]+)"', html) for c in attr.split())
    multi = [a for a in re.findall(r'class="([^"]+)"', html) if ' ' in a]
    assert not multi, f'{name}: multi-class {multi}'
    missing = {c for c in used if c.startswith('jubo-ai-film_') and c not in defined}
    assert not missing, f'{name}: no CSS for {missing}'
    new = used - seen; seen |= used
    frags.append({'name': name, 'html': html, 'css': css_for(new)})
(OUT / 'whtml.json').write_text(json.dumps(frags, ensure_ascii=False, indent=1))

head = (HERE / 'head.html').read_text()
motion = (HERE / 'motion.js').read_text()
if args.terser:
    import subprocess
    motion = subprocess.run([args.terser, '--compress', '--mangle', '--comments', '/^!|來源/'], input=motion, capture_output=True, text=True, check=True).stdout
footer = f'<script>\n{motion}</script>'
if args.cdn:
    import base64, hashlib, subprocess
    sha = subprocess.run(['git', 'rev-parse', args.cdn], cwd=REPO, capture_output=True, text=True, check=True).stdout.strip()
    src = subprocess.run(['git', 'show', f'{sha}:custom-code/jubo-ai-film/motion.js'], cwd=REPO, capture_output=True, check=True).stdout
    sri = 'sha384-' + base64.b64encode(hashlib.sha384(src).digest()).decode()
    footer = ('<!-- Jubo AI 原生頁動態。來源：repo custom-code/jubo-ai-film/motion.js，固定在 commit ' + sha[:7]
              + '；修改時先改 repo，再更新此處 commit 與 integrity。使用站上已載入的 GSAP 3.15＋ScrollTrigger。 -->\n'
              + f'<script src="https://cdn.jsdelivr.net/gh/TerrisLiao/jubo-webflow@{sha}/custom-code/jubo-ai-film/motion.js" integrity="{sri}" crossorigin="anonymous"></script>\n')
(OUT / 'head.html').write_text(head); (OUT / 'footer.html').write_text(footer)

# ---- IX3 interactions (Designer-visible): intro on load, headline lines and soft rises on scroll ----
A = lambda sel: {'extensionKey': 'wf:attribute', 'value': sel}
def act(i, name, targets, timing, props, **extra):
    return {'id': i, 'name': name, 'tt': 2, 'targets': targets, 'timing': timing, 'properties': {'wf:transform': props}, **extra}
RM = [{'type': 'prefers-reduced-motion', 'behavior': 'skip-to-end'}]
ix3 = [
 {'name': 'Jubo AI Film · 首屏進場', 'scope': {'type': 'pages', 'value': [PAGE_ID]},
  'triggers': [{'extensionKey': 'wf:load', 'config': {'control': 'play'}}],
  'timelines': [{'actions': [
   act('eyebrow', 'Eyebrow rise', [A('[data-ix-intro="eyebrow"]')], {'duration': 0.8, 'ease': 8, 'position': 0.1}, {'opacity': ['0%', '100%'], 'y': [16, 0]}),
   act('lines', 'Headline lines', [A('[data-ix-intro="line"]')], {'duration': 1.25, 'ease': 11, 'position': 0.2, 'stagger': {'each': 0.12}}, {'yPercent': [110, 0]}),
   act('lead', 'Lead rise', [A('[data-ix-intro="lead"]')], {'duration': 1, 'ease': 8, 'position': 0.7}, {'opacity': ['0%', '100%'], 'y': [18, 0]}),
   act('fins', 'Glass fins rise', [A('[data-ix-intro="fin"]')], {'duration': 1.7, 'ease': 26, 'position': 0.35, 'stagger': {'each': 0.09, 'from': 'center'}}, {'scaleY': [0, 1]}),
   act('think', 'Thinking pill', [A('[data-ix-intro="think"]')], {'duration': 1, 'ease': 26, 'position': 1.1}, {'opacity': ['0%', '100%'], 'scaleX': [0.3, 1]}),
   act('hint', 'Hint', [A('[data-ix-intro="hint"]')], {'duration': 0.8, 'ease': 5, 'position': 1.6}, {'opacity': ['0%', '100%']}),
  ]}], 'conditionalPlayback': RM},
 {'name': 'Jubo AI Film · 標題逐行', 'scope': {'type': 'pages', 'value': [PAGE_ID]},
  'triggers': [{'extensionKey': 'wf:scroll', 'target': A('data-ix-split'), 'config': {'scrollTriggerConfig': {'start': 'top 85%', 'end': 'bottom top', 'enter': 'play', 'leave': 'none', 'enterBack': 'none', 'leaveBack': 'none'}}}],
  'timelines': [{'actions': [act('split', 'Lines through masks', [{'extensionKey': 'wf:trigger-only', 'value': ''}], {'duration': 1.1, 'ease': 11, 'stagger': {'each': 0.1}}, {'yPercent': [110, 0]}, splitText={'type': 'lines', 'mask': 'lines'})]}],
  'conditionalPlayback': RM},
 {'name': 'Jubo AI Film · 柔和浮現', 'scope': {'type': 'pages', 'value': [PAGE_ID]},
  'triggers': [{'extensionKey': 'wf:scroll', 'target': A('data-ix-rise'), 'config': {'scrollTriggerConfig': {'start': 'top 88%', 'end': 'bottom top', 'enter': 'play', 'leave': 'none', 'enterBack': 'none', 'leaveBack': 'none'}}}],
  'timelines': [{'actions': [act('rise', 'Rise', [{'extensionKey': 'wf:trigger-only', 'value': ''}], {'duration': 0.9, 'ease': 8}, {'opacity': ['0%', '100%'], 'y': [24, 0]})]}],
  'conditionalPlayback': RM},
]
(OUT / 'ix3.json').write_text(json.dumps(ix3, ensure_ascii=False, indent=1))

EMU = r'''<script>/* Preview only: plays the IX3 payloads with GSAP the way the Webflow runtime does. */
document.addEventListener('DOMContentLoaded',()=>{const P=__IX3__;const E=['none','power1.in','power1.out','power1.inOut','power2.in','power2.out','power2.inOut','power3.in','power3.out','power3.inOut','power4.in','power4.out','power4.inOut','back.in','back.out','back.inOut','bounce.in','bounce.out','bounce.inOut','circ.in','circ.out','circ.inOut','elastic.in','elastic.out','elastic.inOut','expo.in','expo.out','expo.inOut','sine.in','sine.out','sine.inOut'];
const g=gsap;g.registerPlugin(ScrollTrigger,SplitText);const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sel=t=>t.extensionKey==='wf:attribute'?(t.value[0]==='['?t.value:'['+t.value+']'):'.'+t.value;
const val=(k,x)=>k==='opacity'&&typeof x==='string'?parseFloat(x)/100:x;
function build(it,el){const tl=g.timeline({paused:true});for(const T of it.timelines)for(const a of T.actions){let ts=a.targets.flatMap(t=>t.extensionKey==='wf:trigger-only'?[el]:[...document.querySelectorAll(sel(t))]);
 if(a.splitText)ts=ts.flatMap(x=>new SplitText(x,{type:a.splitText.type,mask:a.splitText.mask})[a.splitText.type]);
 const f={},to={};for(const[k,v]of Object.entries(a.properties['wf:transform'])){f[k]=val(k,v[0]);to[k]=val(k,v[1]);}
 const tm=a.timing;tl.fromTo(ts,f,{...to,duration:tm.duration,ease:E[tm.ease],stagger:tm.stagger?{each:tm.stagger.each,from:tm.stagger.from||'start'}:0,immediateRender:true},tm.position||0);}return tl;}
window.__ix3=[];for(const it of P){const skip=red&&(it.conditionalPlayback||[]).length;for(const tr of it.triggers){
 if(tr.extensionKey==='wf:load'){const tl=build(it);window.__ix3.push(tl);skip?tl.progress(1):tl.play();}
 else document.querySelectorAll(sel(tr.target)).forEach(el=>{const tl=build(it,el);window.__ix3.push(tl);if(skip)return tl.progress(1);const c=tr.config.scrollTriggerConfig;ScrollTrigger.create({trigger:el,start:c.start,end:c.end,once:true,onEnter:()=>tl.play()});});}}});
</script>'''
if args.shell:
    shell = Path(args.shell).read_text()
    a = shell.index('</nav>') + len('</nav>'); b = shell.index('<div class="all-sections-wrapper">')
    shell = shell[:a] + shell[b:]
    s0 = shell.index('<div class="all-sections-wrapper">') + len('<div class="all-sections-wrapper">'); f0 = shell.index('<footer')
    body = ROOT[:-len('</div>')] + ''.join(h for _, h in sections) + '</div>'
    if args.cta:
        cta = Path(args.cta).read_text().replace('Talk to Jubo', '預約諮詢')
        body = body.replace('<div class="jubo-ai-film_close-actions" data-close-actions="">', '<div class="jubo-ai-film_close-actions" data-close-actions="">' + cta)
    shell = shell[:s0] + body + shell[f0:]
    shell = shell.replace('</head>', f'<style>{(HERE / "page.css").read_text()}</style>{head}</head>', 1)
    tail = ('<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>' + footer
            + EMU.replace('__IX3__', json.dumps(ix3, ensure_ascii=False)))
    i = shell.rindex('</body>'); shell = shell[:i] + tail + shell[i:]
    (OUT / 'preview.html').write_text(shell)
print(json.dumps({'fragments': [(f['name'], len(f['html']), len(f['css'])) for f in frags], 'head': len(head), 'footer': len(footer), 'ix3': len(json.dumps(ix3))}, ensure_ascii=False))
