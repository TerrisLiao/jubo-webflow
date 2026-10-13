import json,re
exec(open('spec.py').read().split("if __name__=='__main__':")[0])
d=json.load(open('spec.json'))
CSS['security-mg_hide']={'opacity':'0'}
def props(cls):
    return CSS.get(cls,{})
merged={}   # name -> (tuple(classes), props)
def merge_attr(m):
    classes=m.group(1).split()
    if len(classes)==1: return m.group(0)
    hide='security-mg_hide' in classes
    core=[c for c in classes if c!='security-mg_hide']
    name=core[-1]+('-rest' if hide else '')
    p={}
    for c in classes: p.update(props(c))
    key=tuple(classes)
    if name in merged and merged[name][0]!=key: raise SystemExit(f'collision {name}: {merged[name][0]} vs {key}')
    merged[name]=(key,p)
    return f'class="{name}"'
html={c:re.sub(r'class="([^"]+)"',merge_attr,h) for c,h in d['html'].items()}
used=set(re.findall(r'class="([^"]+)"',' '.join(html.values())))
final={}
for n in sorted(used):
    if n in merged: final[n]=merged[n][1]
    elif n in CSS: final[n]=CSS[n]
    else: raise SystemExit('no css for '+n)
CSS.clear(); CSS.update(final)
css=css_text().replace('place-items:center','align-items:center;justify-items:center').replace('flex:none','flex-grow:0;flex-shrink:0;flex-basis:auto')
css=css.replace('.security-mg_stage{','.security-mg_stage{font-size:calc(100cqw / 45);')
json.dump({'css':css,'html':html},open('wf_payload.json','w'),ensure_ascii=False)
print('classes:',len(final),'css bytes:',len(css))
multi=[m for h in html.values() for m in re.findall(r'class="([^"]+\s[^"]+)"',h)]
print('multi-class left:',multi)
