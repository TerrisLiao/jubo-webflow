import json,re,sys
exec(open('spec.py').read().split("if __name__=='__main__':")[0])
C(f'{P}_hide',opacity='0')
def add_hide(html,card):
    hid,_=hero_hidden(card)
    for k in hid:
        html=re.sub(r'class="([^"]*)"((?:\s+[a-z-]+="[^"]*")*?)\s+data-mg="%s"'%re.escape(k), lambda m:f'class="{m.group(1)} {P}_hide"{m.group(2)} data-mg="{k}"', html,count=1)
    return html
HTML={c:add_hide(CARDS[c],c) for c in CARDS}
segs=[dict(card=c,key=k,t0=t0,dur=d,ease=e,p=p) for c,k,t0,d,e,p in SEG]
inits={f'{c}|{k}':full_init(c,k) for (c,k) in INIT}
json.dump(dict(html=HTML,css=css_text(),segs=segs,inits=inits,dur=DUR,hero=HERO,off=OFF),open('spec.json','w'),ensure_ascii=False)
grad={1:'radial-gradient(90% 120% at 0% 0%,#fdffb0,transparent 55%),radial-gradient(80% 120% at 100% 100%,#8ff0f2,transparent 60%),#cfffd9',
 2:'radial-gradient(90% 120% at 0% 0%,#b4f6ff,transparent 55%),radial-gradient(80% 120% at 100% 100%,#d6b8ff,transparent 60%),#bccbff',
 3:'radial-gradient(90% 120% at 100% 0%,#d9c4ff,transparent 55%),radial-gradient(80% 120% at 0% 100%,#aef1ff,transparent 60%),#c3d2ff',
 4:'radial-gradient(90% 120% at 100% 100%,#fdffb0,transparent 55%),radial-gradient(80% 120% at 0% 0%,#9ef3f5,transparent 60%),#cfffd9'}
page=f'''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><style>
:root{{--primary--accent:#00b2c0;--neutral--black:#151717;--neutral--black-60:hsla(180,4.55%,8.63%,.6);--neutral--white:#fff;--gradient--teal:hsla(184.375,100%,37.65%,.14);
--jubo-digital--deep-teal:#0B6F78;--jbc-line:rgba(105,131,146,.15);--neutral--bg-grey:#f8f8f8}}
*{{box-sizing:border-box;margin:0}} body{{font-family:"Noto Sans TC","WenQuanYi Zen Hei",sans-serif;background:#eef2f3}}
.sheet{{display:grid;grid-template-columns:repeat(2,max-content);gap:24px;padding:24px}}
.panel{{position:relative;border-radius:28px;overflow:hidden;font-size:16px}}
{css_text()}
</style></head><body><div class="sheet">'''+''.join(f'<div class="panel" id="p{c}" style="background:{grad[c]}">{HTML[c]}</div>' for c in (1,2,3,4))+'''</div>
<script>
const S=__SPEC__;
const E={0:t=>t,4:t=>t*t*t,5:t=>1-Math.pow(1-t,3),9:t=>t<.5?8*t**4:1-8*(1-t)**4,14:t=>{const s=1.70158;t-=1;return t*t*((s+1)*t+s)+1},26:t=>t>=1?1:1-Math.pow(2,-10*t)};
const cv=document.createElement('canvas').getContext('2d');
function rgba(c){cv.fillStyle='#000';cv.fillStyle=c;const v=cv.fillStyle;if(v[0]==='#'){return [parseInt(v.slice(1,3),16),parseInt(v.slice(3,5),16),parseInt(v.slice(5,7),16),1]}const m=v.match(/[\\d.]+/g).map(Number);return [m[0],m[1],m[2],m[3]??1]}
const lerp=(a,b,k)=>a+(b-a)*k;
function mix(a,b,k){if(typeof a==='number')return lerp(a,b,k);const A=rgba(a),B=rgba(b);return `rgba(${A.map((v,i)=>i<3?Math.round(lerp(v,B[i],k)):+lerp(v,B[i],k).toFixed(3)).join(',')})`}
const bykey={};S.segs.forEach(s=>{(bykey[s.card+'|'+s.key]=bykey[s.card+'|'+s.key]||[]).push(s)});Object.values(bykey).forEach(a=>a.sort((x,y)=>x.t0-y.t0));
function stateAt(id,t){const st={...S.inits[id]};for(const s of (bykey[id]||[])){if(t<=s.t0)break;const k=Math.min(1,(t-s.t0)/Math.max(s.dur,1));const e=E[s.ease](k);
  for(const [p,v] of Object.entries(s.p)){const from=st[p]??({x:0,y:0,s:1,sx:1,sy:1,r:0,o:1})[p];st[p]=k>=1?v:mix(from,v,e)}}return st}
window.seek=(card,t)=>{const root=document.getElementById('p'+card);
 root.querySelectorAll('[data-mg]').forEach(el=>{const id=card+'|'+el.dataset.mg;if(!S.inits[id])return;const st=stateAt(id,t%S.dur[card]);
  const tr=`translate(${st.x??0}%,${st.y??0}%) rotate(${st.r??0}deg) scale(${(st.s??1)*(st.sx??1)},${(st.s??1)*(st.sy??1)})`;el.style.transform=tr;
  if('o' in st)el.style.opacity=st.o; if(st.bg)el.style.backgroundColor=st.bg; if(st.bc)el.style.borderColor=st.bc; if(st.c)el.style.color=st.c;})};
window.rest=()=>document.querySelectorAll('[data-mg]').forEach(el=>{el.style.transform='';el.style.opacity='';el.style.backgroundColor='';el.style.borderColor='';el.style.color=''});
</script></body></html>'''
page=page.replace('__SPEC__',json.dumps(dict(segs=segs,inits=inits,dur=DUR),ensure_ascii=False))
open('preview.html','w',encoding='utf-8').write(page); print('ok', len(page))
