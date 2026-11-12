import json
import os
P=os.environ.get("FL_PAGE","6af55d996d00f5158ae0ac24")  # v2；v3 = 6af5c887d15f0b638d81d010
VER=os.environ.get("FL_VER","v2")
d=json.load(open('spec.json')); OFF=d['off']
ids=dict(l.split() for l in open('ids.txt'))
STEP={1:"7d6813d3-b523-500c-4049-9abeb0e4f873",2:"304d247c-f64f-db28-f070-1579a2c9fe18",3:"46306b54-e327-5c8d-a505-6e134ac9baf3"}
# v3：卡 1、2 在分頁面板內（隱藏時尺寸為 0），改由永遠可見的面板容器觸發
if VER=="v3": STEP={1:"adc59f93-780d-a76b-3013-5d6fd077a49e",2:"adc59f93-780d-a76b-3013-5d6fd077a49e",3:STEP[3]}
NAME={1:"生理數值",2:"照片花絮",3:"家屬綁定"}
TF={'o':'opacity','x':'xPercent','y':'yPercent','s':'scale','sx':'scaleX','sy':'scaleY','r':'rotation'}
ST={'bg':'backgroundColor','bc':'borderColor','c':'color'}
def num(v):
    v=round(float(v),4); return int(v) if v==int(v) else v
def props(p):
    out={}
    for k,v in p.items():
        if k in TF:
            val=f"{num(v*100)}%" if k=='o' else num(v)
            out.setdefault('wf:transform',{})[TF[k]]=[None,val]
        elif k in ST: out.setdefault('wf:style',{})[ST[k]]=[None,v]
        else: raise ValueError(k)
    return out
def rgba_eps(c):
    import re
    c=c.strip()
    if c.startswith('#'):
        r,g,b=(int(c[i:i+2],16) for i in (1,3,5)); a=1.0
    elif c.startswith('rgba'):
        r,g,b,a=[float(x) for x in re.findall(r'[\d.]+',c)]
    elif c.startswith('hsla'):
        import colorsys
        h,s_,l,a=[float(x) for x in re.findall(r'[\d.]+',c)]
        rr,gg,bb=colorsys.hls_to_rgb(h/360,l/100,s_/100); r,g,b=round(rr*255),round(gg*255),round(bb*255)
    else: raise ValueError(c)
    a=a-0.001 if a>=0.001 else a+0.001
    return f"rgba({int(r)},{int(g)},{int(b)},{round(a,4)})"
EPS={'o':0.0001,'x':0.01,'y':0.01,'s':0.0001,'sx':0.0001,'sy':0.0001,'r':0.01}
def nudge(p):
    # GSAP drops a property whose end equals the start it captured on first run;
    # an invisible offset keeps every reset property live on each repeat.
    out={}
    for k,v in p.items():
        if k in EPS: out[k]=v-EPS[k] if (k=='o' and v>=0.5) else v+EPS[k]
        else: out[k]=rgba_eps(v)
    return out
def tgt(key): return {"extensionKey":"wf:inst","value":[P,ids[key]]}
def build(card):
    DUR=d['dur'][str(card)]
    inits={k.split('|')[1]:v for k,v in d['inits'].items() if k.startswith(f'{card}|')}
    segs=sorted([s for s in d['segs'] if s['card']==card],key=lambda s:s['t0'])
    # drop unchanged props (state tracking), group identical tweens
    state={k:dict(v) for k,v in inits.items()}
    groups={}
    for s in segs:
        assert s['t0']+s['dur']<=DUR, s
        st=state[s['key']]
        p={k:v for k,v in s['p'].items() if st.get(k)!=v}
        missing=[k for k in s['p'] if k not in st]; assert not missing,(s,missing)
        st.update(s['p'])
        if not p: continue
        gk=(s['t0'],s['dur'],s['ease'],json.dumps(p,sort_keys=True))
        groups.setdefault(gk,[]).append(s['key'])
    acts=[]
    # resets grouped by identical init
    rg={}
    for k,v in inits.items(): rg.setdefault(json.dumps(v,sort_keys=True),[]).append(k)
    def chunks(l):
        for i in range(0,len(l),20): yield l[i:i+20]
    n=0
    for pj,keys in rg.items():
        for ch in chunks(keys):
            n+=1
            ini=json.loads(pj); a=props(ini); b=props(nudge(ini))
            for ext in a:
                for k in a[ext]: a[ext][k]=[a[ext][k][1],b[ext][k][1]]
            acts.append({"id":f"r{n}","name":f"Reset {','.join(ch)[:40]}","tt":2,"targets":[tgt(k) for k in ch],
              "timing":{"duration":OFF/1000,"position":0,"ease":0,"repeat":-1,"repeatDelay":round((DUR-OFF)/1000,3)},
              "properties":a})
    n=0
    for (t0,dur,ease,pj),keys in sorted(groups.items()):
        for ch in chunks(keys):
            n+=1
            acts.append({"id":f"s{n}","name":f"{','.join(ch)[:40]} @{t0}","tt":0,"targets":[tgt(k) for k in ch],
              "timing":{"duration":round(dur/1000,3),"position":round(t0/1000,3),"ease":ease,"repeat":-1,"repeatDelay":round((DUR-dur)/1000,3)},
              "properties":props(json.loads(pj))})
    assert len(acts)<=200
    inter={"name":f"安心寶住宿型 {VER} · LINE 0{card} {NAME[card]} (IX3)","scope":{"type":"pages","value":[P]},
      "triggers":[{"extensionKey":"wf:scroll","config":{"scrollTriggerConfig":{"start":"top 85%","end":"bottom 15%","enter":"play","leave":"pause","enterBack":"play","leaveBack":"pause"}},"target":tgt_step(card)}],
      "timelines":[{"name":f"MG loop 0{card}","actions":acts}],
      "conditionalPlayback":[{"type":"prefers-reduced-motion","behavior":"dont-animate"}]}
    return inter
def tgt_step(c): return {"extensionKey":"wf:inst","value":[P,STEP[c]]}
out={}
for c in (1,2,3):
    it=build(c); out[c]=it
    b=len(json.dumps(it,ensure_ascii=False).encode())
    print(c,len(it['timelines'][0]['actions']),'actions',b,'bytes')
json.dump(out,open('ix3_payload.json','w'),ensure_ascii=False)
