# Single source of truth for the three /products/familyline-residential motion graphics (adapted from custom-code/security-mg).
# Produces: Webflow whtml (html+css per card), IX3 segment list, and a local preview.
import json, re
OFF=100  # every real segment is shifted so the t=0 reset never collides
EASE={'eo':26,'io':9,'bk':14,'lin':0,'in':4,'po':5}
BEZ={26:'cubic-bezier(.16,1,.3,1)',9:'cubic-bezier(.65,0,.35,1)',14:'cubic-bezier(.34,1.56,.64,1)',0:'linear',4:'cubic-bezier(.55,0,1,.45)',5:'cubic-bezier(.25,.46,.45,.94)'}
V={'acc':'var(--primary--accent)','ink':'var(--neutral--black)','mute':'var(--neutral--black-60)','white':'var(--neutral--white)',
   'tint':'var(--gradient--teal)','deep':'var(--jubo-digital--deep-teal)','line':'var(--jbc-line)','grey':'var(--neutral--bg-grey)'}
HEX={'acc':'#00b2c0','deep':'#0b6f78','ink':'#151717','idle':'#9aa6aa','idlebg':'#f1f4f5','tint':'hsla(184,100%,38%,0.14)','line':'rgba(105,131,146,0.15)','clear':'rgba(0,178,192,0)','hl':'rgba(0,178,192,0.09)'}
SHADOW='0 1.375em 2.75em -1.125em rgba(11,53,88,0.3),0 0.125em 0.375em rgba(11,53,88,0.06)'
ICON={
'user':'<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>',
'key':'<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".6"/>',
'check':'<path d="M20 6 9 17l-5-5"/>',
'file':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
'pill':'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
'pulse':'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
'lockbody':'<rect width="18" height="11" x="3" y="11" rx="2"/>',
'shackle':'<path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
'cloud':'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
'eye':'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
'x':'<path d="M18 6 6 18M6 6l12 12"/>',
'pin':'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
'globe':'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
'shield':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
'server':'<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
'flask':'<path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0M5.52 16h12.96"/>',
}
def svg(name,cls,sw=1.7,mg=None):
    m=f' data-mg="{mg}"' if mg else ''
    return f'<svg class="{cls}"{m} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>'

CSS={}   # class -> dict(prop->value in px or str); font-size in px (leaf only)
def C(name,**p): CSS[name]=p
def em(v,base=16):
    def f(m):
        n=float(m.group(1));
        if abs(n)<=2: return m.group(0)
        return ('%.4f'%(n/base)).rstrip('0').rstrip('.')+'em'
    return re.sub(r'(-?\d+(?:\.\d+)?)px',f,v)
def css_text():
    out=[]
    for k,p in CSS.items():
        base=float(p['font-size'][:-2]) if 'font-size' in p and p['font-size'].endswith('px') else 16
        decl=[]
        for a,b in p.items():
            a=a.replace('_','-')
            if a=='font-size' and b.endswith('px'): b=('%.4f'%(float(b[:-2])/16)).rstrip('0').rstrip('.')+'em'
            else: b=em(b,base)
            decl.append(f'{a}:{b}')
        out.append(f'.{k}{{{";".join(decl)}}}')
    return '\n'.join(out)

# ---------- shared ----------
P='familyline-mg'
C(f'{P}_stage',position='relative',width='720px',height='450px',overflow='hidden',color=V['ink'])
C(f'{P}_abs',position='absolute')
C(f'{P}_card',background_color=V['white'],border_radius='20px',box_shadow=SHADOW)
C(f'{P}_cap',position='absolute',left='0px',right='0px',bottom='26px',margin_left='auto',margin_right='auto',width='max-content',
  display='flex',align_items='center',column_gap='8px',padding='9px 18px',border_radius='999px',background_color=V['white'],box_shadow='0 0.5em 1.5em -0.75em rgba(11,53,88,0.3)')
C(f'{P}_cap-dot',width='7px',height='7px',border_radius='50%',background_color=V['acc'],flex='none')
C(f'{P}_cap-text',font_size='16px',font_weight='500',white_space='nowrap',line_height='1.3')
C(f'{P}_ring',position='absolute',border='2px solid #00b2c0',border_color=V['acc'],border_radius='50%')
C(f'{P}_ico',display='grid',place_items='center',color=V['deep'])
C(f'{P}_lockbox',position='relative',display='grid',place_items='center')
C(f'{P}_lockpart',position='absolute',left='0px',top='0px',width='100%',height='100%')
def cap(key,text): return f'<div class="{P}_cap" data-mg="{key}"><div class="{P}_cap-dot"></div><div class="{P}_cap-text">{text}</div></div>'
def lock(cls,mgshk,sw=1.8,extra=''):
    return f'<div class="{P}_lockbox {cls}"{extra}>{svg("lockbody",P+"_lockpart",sw)}{svg("shackle",P+"_lockpart",sw,mgshk)}</div>'

SEG=[]   # (card, key, t0, dur, ease, props)
INIT={}  # (card,key) -> props at loop start
def tl(card,key,frames):
    """frames: [(t, {props}, ease)] — first frame = loop-start state; each later frame animates from previous to it."""
    t0,p0=frames[0][0],frames[0][1]
    INIT[(card,key)]={**INIT.get((card,key),{}),**p0}
    prev=t0
    for t,p,*e in frames[1:]:
        ez=EASE[e[0]] if e else 26
        SEG.append((card,key,prev+OFF,t-prev,ez,p)); prev=t
def capt(card,key,a,b):
    tl(card,key,[(a,{'o':0,'y':30}),(a+500,{'o':1,'y':0},'eo'),(b-400,{'o':1,'y':0}),(b,{'o':0,'y':-20},'io')])

HERO={}  # card -> time whose state becomes the resting (no-JS / reduced-motion) frame
CARDS={}
DUR={}


# ---------- familyline residential: extra icons ----------
ICON.update({
'image':'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
'calendar':'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
'music':'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
'sprout':'<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
'scissors':'<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
'chat':'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
})
HEX.update({'warn':'#e8590c','warnbg':'rgba(232,89,12,0.12)'})
GRAD={1:'radial-gradient(90% 120% at 0% 0%,#b4f6ff,transparent 55%),radial-gradient(80% 120% at 100% 100%,#d6b8ff,transparent 60%),#bccbff',
      2:'radial-gradient(90% 120% at 100% 0%,#fdffb0,transparent 55%),radial-gradient(80% 120% at 0% 100%,#9ef3f5,transparent 60%),#cfffd9',
      3:'radial-gradient(90% 120% at 100% 0%,#d9c4ff,transparent 55%),radial-gradient(80% 120% at 0% 100%,#aef1ff,transparent 60%),#c3d2ff'}
MONO='ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

# ---------- shared pieces: staff panel + family phone ----------
C(f'{P}_stage',position='relative',width='720px',height='480px',overflow='hidden',color=V['ink'],flex='none')
C(f'{P}_bg',position='absolute',left='0px',top='0px',width='100%',height='100%')
for c in (1,2,3): C(f'{P}_bg-{c}',background_image=GRAD[c])
C(f'{P}_desk',left='40px',top='56px',width='340px',padding='22px',display='flex',flex_direction='column',row_gap='12px')
C(f'{P}_head',display='flex',align_items='center',column_gap='12px',margin_bottom='4px')
C(f'{P}_chip',width='44px',height='44px',border_radius='13px',background_color=V['tint'],display='grid',place_items='center',color=V['deep'],flex='none')
C(f'{P}_chip-svg',width='22px',height='22px')
C(f'{P}_title',font_size='18px',font_weight='600',line_height='1.3')
C(f'{P}_sub',font_size='13px',color=V['mute'],line_height='1.4')
C(f'{P}_btn',height='44px',border_radius='11px',background_color=V['acc'],display='grid',place_items='center')
C(f'{P}_btn-text',font_size='16px',font_weight='600',color=V['white'],white_space='nowrap')
C(f'{P}_ok',height='34px',padding='0px 14px',border_radius='999px',background_color=V['acc'],color=V['white'],display='flex',align_items='center',column_gap='6px')
C(f'{P}_ok-svg',width='16px',height='16px')
C(f'{P}_ok-text',font_size='14px',font_weight='600',white_space='nowrap')
C(f'{P}_beam',left='392px',top='226px',width='52px',height='2px',background_color=V['acc'],transform_origin='0% 50%')
C(f'{P}_phone',left='452px',top='28px',width='232px',height='372px',border_radius='30px',overflow='hidden')
C(f'{P}_ph-head',position='absolute',left='0px',top='0px',width='100%',height='54px',background_color=V['deep'],display='flex',align_items='center',column_gap='8px',padding='0px 16px')
C(f'{P}_ph-svg',width='18px',height='18px',color=V['white'])
C(f'{P}_ph-title',font_size='13px',font_weight='600',color=V['white'],white_space='nowrap')
C(f'{P}_in',position='absolute',left='14px',width='204px')
C(f'{P}_ch',display='inline-block')
def head(icon,title,sub): return (f'<div class="{P}_head"><div class="{P}_chip">{svg(icon,P+"_chip-svg",1.9)}</div>'
                                  f'<div><div class="{P}_title">{title}</div><div class="{P}_sub">{sub}</div></div></div>')
def phone(key,inner): return (f'<div class="{P}_abs {P}_card {P}_phone" data-mg="{key}"><div class="{P}_ph-head">{svg("chat",P+"_ph-svg",2)}'
                              f'<div class="{P}_ph-title">機構 LINE 官方帳號</div></div>{inner}</div>')
def chars(cls,pre,text): return ''.join(f'<div class="{cls}" data-mg="{pre}{i}">{ch}</div>' for i,ch in enumerate(text))
def typed(card,pre,n,t,step=110):
    for i in range(n): tl(card,f'{pre}{i}',[(t+i*step,{'o':0,'y':40}),(t+i*step+220,{'o':1,'y':0},'bk')])
def press(card,key,t): tl(card,key,[(t,{'s':1}),(t+120,{'s':.94},'io'),(t+300,{'s':1},'eo')])
def pop(card,key,t,end=None,s0=.6):
    f=[(t,{'o':0,'s':s0}),(t+420,{'o':1,'s':1},'bk')]
    if end: f+=[(end,{'o':1,'s':1}),(end+350,{'o':0,'s':.9},'io')]
    tl(card,key,f)
def enter(card,key,t,end,x=0,y=0):
    tl(card,key,[(t,{'o':0,'x':x,'y':y}),(t+550,{'o':1,'x':0,'y':0},'eo'),(end,{'o':1,'x':0,'y':0}),(end+400,{'o':0,'x':0,'y':-4},'io')])

# ================= CARD 1 · 健康狀況 =================
Q='familyline-mg1'
C(f'{Q}_row',display='flex',align_items='center',column_gap='12px')
C(f'{Q}_label',width='44px',font_size='15px',color=V['mute'],flex='none')
C(f'{Q}_field',flex='1',height='42px',border_radius='11px',border='1.5px solid rgba(105,131,146,0.15)',border_color=HEX['line'],display='flex',align_items='center',padding='0px 12px')
C(f'{Q}_char',font_size='18px',font_weight='700',font_family=MONO)
C(f'{Q}_unit',margin_left='auto',font_size='13px',color=V['mute'],white_space='nowrap')
C(f'{Q}_ok-pos',left='262px',top='38px')
C(f'{Q}_chart-title',top='70px',font_size='13px',font_weight='600',white_space='nowrap')
C(f'{Q}_chart',top='96px',height='84px',display='flex',align_items='flex-end',column_gap='9px',padding='0px 4px',border_bottom='1.5px solid rgba(105,131,146,0.15)')
C(f'{Q}_bar',width='16px',border_radius='5px 5px 0px 0px',background_color=V['tint'],transform_origin='50% 100%')
for i,h in enumerate([40,46,38,50,44,54,60,80]): C(f'{Q}_bar-{i}',height=f'{h}px')
C(f'{Q}_bar-hi',background_color=HEX['warn'])
C(f'{Q}_vrow',height='40px',border_radius='11px',background_color=V['grey'],display='flex',align_items='center',padding='0px 12px',column_gap='8px')
for i,y in enumerate([194,242,290]): C(f'{Q}_vrow-{i}',top=f'{y}px')
C(f'{Q}_vlabel',font_size='13px',color=V['mute'],white_space='nowrap')
C(f'{Q}_vval',margin_left='auto',font_size='15px',font_weight='700',white_space='nowrap')
C(f'{Q}_badge',padding='2px 8px',border_radius='999px',background_color=HEX['warnbg'],color=HEX['warn'],font_size='12px',font_weight='700',white_space='nowrap')
C(f'{Q}_out',left='10px',top='182px',width='212px',padding='16px',display='flex',flex_direction='column',row_gap='6px')
C(f'{Q}_out-head',display='flex',align_items='center',column_gap='8px',margin_bottom='4px')
C(f'{Q}_out-ico',width='32px',height='32px',border_radius='10px',background_color=V['tint'],display='grid',place_items='center',color=V['deep'],flex='none')
C(f'{Q}_out-svg',width='17px',height='17px')
C(f'{Q}_out-title',font_size='15px',font_weight='700',white_space='nowrap')
C(f'{Q}_out-line',font_size='14px',line_height='1.5',white_space='nowrap')
C(f'{Q}_out-mute',font_size='13px',color=V['mute'],white_space='nowrap')
def field(key,lab,pre,val,unit):
    return (f'<div class="{Q}_row"><div class="{Q}_label">{lab}</div><div class="{Q}_field" data-mg="{key}">'
            f'{chars(Q+"_char",pre,val)}<div class="{Q}_unit">{unit}</div></div></div>')
bars=''.join(f'<div class="{Q}_bar {Q}_bar-{i}{" "+Q+"_bar-hi" if i==7 else ""}" data-mg="h_bar{i}"></div>' for i in range(8))
vrows=[('體溫','36.8°C',''),('血壓','152/93',f'<div class="{Q}_badge" data-mg="h_hi">偏高</div>'),('脈搏','78 次/分','')]
vr=''.join(f'<div class="{P}_in {Q}_vrow {Q}_vrow-{i}" data-mg="h_r{i}"><div class="{Q}_vlabel">{a}</div>{badge}<div class="{Q}_vval">{b}</div></div>' for i,(a,b,badge) in enumerate(vrows))
CARDS[1]=(f'<div class="{P}_stage" data-mg="stage1" aria-hidden="true"><div class="{P}_bg {P}_bg-1"></div>'
 f'<div class="{P}_abs {P}_card {P}_desk" data-mg="h_desk">{head("pulse","王奶奶・生理量測","住宿型照護系統")}'
 +field('h_f0','體溫','h_a','36.8','°C')+field('h_f1','血壓','h_b','152/93','mmHg')+field('h_f2','脈搏','h_c','78','次/分')+
 f'<div class="{P}_btn" data-mg="h_btn"><div class="{P}_btn-text">儲存</div></div></div>'
 f'<div class="{P}_abs {P}_ok {Q}_ok-pos" data-mg="h_ok">{svg("check",P+"_ok-svg",3)}<div class="{P}_ok-text">已同步</div></div>'
 f'<div class="{P}_abs {P}_beam" data-mg="h_beam"></div>'
 +phone('h_ph',f'<div class="{P}_in {Q}_chart-title" data-mg="h_ct">血壓趨勢・近兩個月</div><div class="{P}_in {Q}_chart">{bars}</div>{vr}'
   f'<div class="{P}_abs {P}_card {Q}_out" data-mg="h_out"><div class="{Q}_out-head"><div class="{Q}_out-ico">{svg("calendar",Q+"_out-svg",2)}</div>'
   f'<div class="{Q}_out-title">外診紀錄</div></div><div class="{Q}_out-line">○○醫院・心臟內科</div><div class="{Q}_out-line">11/14（五）09:30</div>'
   f'<div class="{Q}_out-mute">目的：定期回診</div></div>')
 +cap('h_cap1','護理師照常登錄生理數值')+cap('h_cap2','家屬在 LINE 看趨勢，偏高直接標示')+cap('h_cap3','外診院所、科別、時間同步更新')+'</div>')
D=10000; DUR[1]=D+OFF; HERO[1]=6600
tl(1,'h_desk',[(0,{'o':0,'s':.94}),(500,{'o':1,'s':1},'eo'),(9300,{'o':1,'s':1}),(9700,{'o':0,'y':-3},'io')])
for k,t0,t1 in (('h_f0',600,1250),('h_f1',1350,2250),('h_f2',2350,2750)):
    tl(1,k,[(t0,{'bc':HEX['line']}),(t0+150,{'bc':HEX['acc']},'po'),(t1,{'bc':HEX['acc']}),(t1+150,{'bc':HEX['line']},'po')])
typed(1,'h_a',4,700); typed(1,'h_b',6,1450); typed(1,'h_c',2,2450)
press(1,'h_btn',2950)
pop(1,'h_ok',3250,9200)
tl(1,'h_beam',[(3550,{'o':1,'sx':0}),(3900,{'sx':1},'io'),(9200,{'o':1}),(9500,{'o':0},'io')])
tl(1,'h_ph',[(3750,{'o':0,'x':8}),(4300,{'o':1,'x':0},'eo'),(9300,{'o':1,'x':0}),(9700,{'o':0,'y':-3},'io')])
tl(1,'h_ct',[(4200,{'o':0}),(4500,{'o':1},'po')])
for i in range(8): tl(1,f'h_bar{i}',[(4300+i*80,{'sy':0}),(4750+i*80,{'sy':1},'eo')])
for i in range(3): tl(1,f'h_r{i}',[(5000+i*150,{'o':0,'y':30}),(5450+i*150,{'o':1,'y':0},'eo')])
tl(1,'h_hi',[(5700,{'o':0,'s':.4}),(6050,{'o':1,'s':1.15},'bk'),(6250,{'s':1},'eo')])
tl(1,'h_out',[(7100,{'o':0,'y':40}),(7650,{'o':1,'y':0},'eo')])
capt(1,'h_cap1',200,3350); capt(1,'h_cap2',3650,7000); capt(1,'h_cap3',7150,9700)

# ================= CARD 2 · 生活點滴 =================
Q='familyline-mg2'
C(f'{Q}_grid',display='grid',grid_template_columns='1fr 1fr 1fr',column_gap='8px',row_gap='8px')
C(f'{Q}_tile',position='relative',height='70px',border_radius='12px',display='grid',place_items='center',color='rgba(255,255,255,0.9)')
TILE=['#8fd3dc','#f5c39b','#b9c8f5','#cfe8a9','#e8b9d6','#a9dcc8']
for i,c in enumerate(TILE): C(f'{Q}_tile-{i}',background_color=c)
C(f'{Q}_tile-svg',width='24px',height='24px')
C(f'{Q}_glow',position='absolute',left='-3px',top='-3px',right='-3px',bottom='-3px',border='3px solid #00b2c0',border_color=V['acc'],border_radius='14px')
C(f'{Q}_check',position='absolute',right='6px',top='6px',width='22px',height='22px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center')
C(f'{Q}_check-svg',width='12px',height='12px')
C(f'{Q}_tap',left='204px',top='145px',width='40px',height='40px',border_radius='50%',border='2px solid #ffffff',background_color='rgba(21,23,23,0.18)')
C(f'{Q}_foot',display='flex',align_items='center',column_gap='12px')
C(f'{Q}_count',font_size='14px',color=V['mute'],white_space='nowrap')
C(f'{Q}_send',flex='1',height='44px',border_radius='11px',background_color=V['acc'],display='grid',place_items='center')
C(f'{Q}_bub',top='68px',padding='12px',border_radius='16px',background_color=V['grey'])
C(f'{Q}_thumbs',display='flex',column_gap='8px',margin_bottom='10px')
C(f'{Q}_thumb',flex='1',height='84px',border_radius='10px',display='grid',place_items='center',color='rgba(255,255,255,0.9)')
C(f'{Q}_thumb-1',background_color=TILE[1]); C(f'{Q}_thumb-2',background_color=TILE[4])
C(f'{Q}_bub-foot',display='flex',align_items='center',justify_content='space-between')
C(f'{Q}_bub-text',font_size='13px',font_weight='600',white_space='nowrap')
C(f'{Q}_dl',width='30px',height='30px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center')
C(f'{Q}_dl-svg',width='16px',height='16px')
C(f'{Q}_act',left='10px',top='172px',width='212px',padding='14px',display='flex',flex_direction='column',row_gap='6px')
C(f'{Q}_act-title',font_size='14px',font_weight='700',white_space='nowrap',margin_bottom='2px')
C(f'{Q}_arow',display='flex',align_items='center',column_gap='10px',padding='3px 6px',border_radius='10px')
C(f'{Q}_aico',width='30px',height='30px',border_radius='9px',background_color=V['tint'],display='grid',place_items='center',color=V['deep'],flex='none')
C(f'{Q}_asvg',width='16px',height='16px')
C(f'{Q}_aname',font_size='14px',font_weight='600',white_space='nowrap')
C(f'{Q}_adate',margin_left='auto',font_size='12px',color=V['mute'],white_space='nowrap')
tiles=''
for i in range(6):
    sel=i in (1,4)
    tiles+=(f'<div class="{Q}_tile {Q}_tile-{i}" data-mg="p_t{i}">{svg("image",Q+"_tile-svg",1.8)}'
            +(f'<div class="{Q}_glow" data-mg="p_g{i}"></div><div class="{Q}_check" data-mg="p_k{i}">{svg("check",Q+"_check-svg",3.5)}</div>' if sel else '')+'</div>')
acts=[('scissors','手作課','11/08'),('music','音樂律動','10/30'),('sprout','園藝活動','10/21')]
arows=''.join(f'<div class="{Q}_arow" data-mg="p_a{i}"><div class="{Q}_aico">{svg(ic,Q+"_asvg",2)}</div><div class="{Q}_aname">{n}</div><div class="{Q}_adate">{d}</div></div>' for i,(ic,n,d) in enumerate(acts))
CARDS[2]=(f'<div class="{P}_stage" data-mg="stage2" aria-hidden="true"><div class="{P}_bg {P}_bg-2"></div>'
 f'<div class="{P}_abs {P}_card {P}_desk" data-mg="p_desk">{head("image","活動照片・手作課","挑選要分享給家屬的照片")}'
 f'<div class="{Q}_grid">{tiles}</div><div class="{Q}_foot"><div class="{Q}_count" data-mg="p_cnt">已選 2 張</div>'
 f'<div class="{Q}_send" data-mg="p_send"><div class="{P}_btn-text">分享給家屬</div></div></div></div>'
 f'<div class="{P}_abs {Q}_tap" data-mg="p_tap"></div>'
 f'<div class="{P}_abs {P}_beam" data-mg="p_beam"></div>'
 +phone('p_ph',f'<div class="{P}_in {Q}_bub" data-mg="p_bub"><div class="{Q}_thumbs"><div class="{Q}_thumb {Q}_thumb-1" data-mg="p_th1">{svg("image",Q+"_tile-svg",1.8)}</div>'
   f'<div class="{Q}_thumb {Q}_thumb-2" data-mg="p_th2">{svg("image",Q+"_tile-svg",1.8)}</div></div>'
   f'<div class="{Q}_bub-foot"><div class="{Q}_bub-text">手作課・11/08</div><div class="{Q}_dl" data-mg="p_dl">{svg("download",Q+"_dl-svg",2.4)}</div></div></div>'
   f'<div class="{P}_abs {P}_card {Q}_act" data-mg="p_act"><div class="{Q}_act-title">近一年參與的活動</div>{arows}</div>')
 +cap('p_cap1','工作人員挑選後才分享')+cap('p_cap2','家屬在 LINE 看照片，也能下載')+cap('p_cap3','參與過的活動一次看')+'</div>')
D=9900; DUR[2]=D+OFF; HERO[2]=6000
tl(2,'p_desk',[(0,{'o':0,'s':.94}),(500,{'o':1,'s':1},'eo'),(9200,{'o':1,'s':1}),(9600,{'o':0,'y':-3},'io')])
for i in range(6): tl(2,f'p_t{i}',[(300+i*70,{'o':0,'s':.85}),(700+i*70,{'o':1,'s':1},'eo')])
# tap ring: appear on tile 1, press, glide to tile 4 (78px down = 195% of its 40px), press, leave
tl(2,'p_tap',[(1300,{'o':0,'s':1.6,'y':0}),(1550,{'o':1,'s':1},'eo'),(1650,{'s':.8},'io'),(1800,{'s':1},'eo'),
              (2050,{'y':195},'io'),(2250,{'s':.8},'io'),(2400,{'s':1},'eo'),(2600,{'o':0,'s':1.4},'po')])
for i,t in ((1,1650),(4,2250)):
    tl(2,f'p_g{i}',[(t,{'o':0}),(t+200,{'o':1},'po')])
    tl(2,f'p_k{i}',[(t+80,{'o':0,'s':0}),(t+420,{'o':1,'s':1},'bk')])
tl(2,'p_cnt',[(2500,{'o':0,'y':30}),(2800,{'o':1,'y':0},'eo')])
press(2,'p_send',3000)
tl(2,'p_beam',[(3300,{'o':1,'sx':0}),(3650,{'sx':1},'io'),(9100,{'o':1}),(9400,{'o':0},'io')])
tl(2,'p_ph',[(3500,{'o':0,'x':8}),(4050,{'o':1,'x':0},'eo'),(9200,{'o':1,'x':0}),(9600,{'o':0,'y':-3},'io')])
tl(2,'p_bub',[(3950,{'o':0,'y':20}),(4500,{'o':1,'y':0},'eo')])
tl(2,'p_th1',[(4250,{'o':0,'s':.8}),(4650,{'o':1,'s':1},'bk')]); tl(2,'p_th2',[(4400,{'o':0,'s':.8}),(4800,{'o':1,'s':1},'bk')])
tl(2,'p_dl',[(5000,{'s':1,'y':0}),(5180,{'s':1.18,'y':-10},'po'),(5400,{'s':1,'y':0},'bk'),(5600,{'y':-10},'po'),(5800,{'y':0},'bk')])
tl(2,'p_act',[(6500,{'o':0,'y':40}),(7050,{'o':1,'y':0},'eo')])
for i in range(3): tl(2,f'p_a{i}',[(6850+i*200,{'o':0,'x':-6}),(7300+i*200,{'o':1,'x':0},'eo')])
tl(2,'p_a0',[(7700,{'bg':HEX['clear']}),(7900,{'bg':HEX['hl']},'po'),(8600,{'bg':HEX['clear']},'po')])
capt(2,'p_cap1',200,3200); capt(2,'p_cap2',3450,6400); capt(2,'p_cap3',6600,9600)

# ================= CARD 3 · 家屬綁定 =================
Q='familyline-mg3'
C(f'{Q}_desk',left='40px',top='56px',width='320px',padding='22px',display='flex',flex_direction='column',row_gap='12px')
C(f'{Q}_ln',height='10px',border_radius='5px',background_color='rgba(105,131,146,0.15)')
C(f'{Q}_ln-a',width='78%'); C(f'{Q}_ln-b',width='56%')
C(f'{Q}_qrwrap',display='flex',justify_content='center',margin_top='4px')
C(f'{Q}_qr',width='112px',height='112px',padding='8px',border_radius='12px',border='1.5px solid rgba(105,131,146,0.15)',color=V['ink'])
C(f'{Q}_qr-svg',width='100%',height='100%')
C(f'{Q}_scan',left='36px',top='74px',width='160px',height='160px')
C(f'{Q}_corner',position='absolute',width='34px',height='34px',border_color=V['acc'],border_style='solid',border_width='0px')
C(f'{Q}_corner-tl',left='0px',top='0px',border_top_width='4px',border_left_width='4px',border_top_left_radius='12px')
C(f'{Q}_corner-tr',right='0px',top='0px',border_top_width='4px',border_right_width='4px',border_top_right_radius='12px')
C(f'{Q}_corner-bl',left='0px',bottom='0px',border_bottom_width='4px',border_left_width='4px',border_bottom_left_radius='12px')
C(f'{Q}_corner-br',right='0px',bottom='0px',border_bottom_width='4px',border_right_width='4px',border_bottom_right_radius='12px')
C(f'{Q}_sqr',position='absolute',left='24px',top='24px',width='112px',height='112px',color=V['ink'])
C(f'{Q}_line',position='absolute',left='10px',top='12px',width='140px',height='4px',border_radius='2px',background_color=V['acc'])
C(f'{Q}_scan-ok',position='absolute',left='56px',top='56px',width='48px',height='48px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center')
C(f'{Q}_scan-ok-svg',width='26px',height='26px')
C(f'{Q}_form',top='70px',display='flex',flex_direction='column',row_gap='10px')
C(f'{Q}_form-title',font_size='15px',font_weight='700',white_space='nowrap')
C(f'{Q}_who',display='flex',align_items='center',column_gap='10px',padding='10px',border_radius='12px',background_color=V['grey'])
C(f'{Q}_av',width='34px',height='34px',border_radius='50%',background_color=V['tint'],color=V['deep'],display='grid',place_items='center',flex='none')
C(f'{Q}_av-svg',width='18px',height='18px')
C(f'{Q}_who-name',font_size='14px',font_weight='600',white_space='nowrap')
C(f'{Q}_who-sub',font_size='12px',color=V['mute'],white_space='nowrap')
C(f'{Q}_flabel',font_size='12px',color=V['mute'])
C(f'{Q}_field',height='40px',border_radius='10px',border='1.5px solid rgba(105,131,146,0.15)',border_color=HEX['line'],display='flex',align_items='center',padding='0px 12px')
C(f'{Q}_char',font_size='16px',font_weight='600')
C(f'{Q}_done',top='82px',display='flex',flex_direction='column',align_items='center',row_gap='10px')
C(f'{Q}_done-ok',width='64px',height='64px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center')
C(f'{Q}_done-svg',width='34px',height='34px')
C(f'{Q}_done-title',font_size='17px',font_weight='700',white_space='nowrap')
C(f'{Q}_tags',display='grid',grid_template_columns='1fr 1fr',column_gap='8px',row_gap='8px',width='100%',margin_top='6px')
C(f'{Q}_tag',height='36px',border_radius='10px',background_color=V['tint'],display='grid',place_items='center')
C(f'{Q}_tag-text',font_size='13px',font_weight='600',color=V['deep'],white_space='nowrap')
QR=[(0,0),(0,1),(1,0),(2,2),(3,1),(4,0),(3,3),(1,4),(4,4),(2,5),(5,3),(6,6),(3,6),(5,5)]
def qrsvg(cls):
    r=''
    for x,y in ((0,0),(14,0),(0,14)):
        r+=f'<rect x="{x}" y="{y}" width="7" height="7" rx="1.2"/><rect x="{x+1.5}" y="{y+1.5}" width="4" height="4" rx=".6" fill="#ffffff"/><rect x="{x+2.5}" y="{y+2.5}" width="2" height="2"/>'
    for x,y in QR: r+=f'<rect x="{x*2+8}" y="{y*2+8}" width="2" height="2"/>'
    for x,y in ((15,15),(17,16),(19,18),(16,19),(20,15),(9,1),(11,3),(1,9),(3,11),(10,10)): r+=f'<rect x="{x}" y="{y}" width="2" height="2"/>'
    return f'<svg class="{cls}" viewBox="0 0 21 21" fill="currentColor" aria-hidden="true">{r}</svg>'
tags=''.join(f'<div class="{Q}_tag" data-mg="b_g{i}"><div class="{Q}_tag-text">{t}</div></div>' for i,t in enumerate(['生理數值','外診紀錄','帳單收據','生活照片']))
CARDS[3]=(f'<div class="{P}_stage" data-mg="stage3" aria-hidden="true"><div class="{P}_bg {P}_bg-3"></div>'
 f'<div class="{P}_abs {P}_card {Q}_desk" data-mg="b_desk">{head("user","王○○ 奶奶","住民檔案・A-203")}'
 f'<div class="{Q}_ln {Q}_ln-a"></div><div class="{Q}_ln {Q}_ln-b"></div>'
 f'<div class="{P}_btn" data-mg="b_btn"><div class="{P}_btn-text">產生綁定 QR Code</div></div>'
 f'<div class="{Q}_qrwrap"><div class="{Q}_qr" data-mg="b_qr">{qrsvg(Q+"_qr-svg")}</div></div></div>'
 f'<div class="{P}_abs {P}_beam" data-mg="b_beam"></div>'
 +phone('b_ph',f'<div class="{P}_abs {Q}_scan" data-mg="b_scan"><div class="{Q}_corner {Q}_corner-tl"></div><div class="{Q}_corner {Q}_corner-tr"></div>'
   f'<div class="{Q}_corner {Q}_corner-bl"></div><div class="{Q}_corner {Q}_corner-br"></div><div class="{Q}_sqr" data-mg="b_sqr">{qrsvg(Q+"_qr-svg")}</div>'
   f'<div class="{Q}_line" data-mg="b_line"></div><div class="{Q}_scan-ok" data-mg="b_sok">{svg("check",Q+"_scan-ok-svg",3)}</div></div>'
   f'<div class="{P}_in {Q}_form" data-mg="b_form"><div class="{Q}_form-title">確認身分</div>'
   f'<div class="{Q}_who"><div class="{Q}_av">{svg("user",Q+"_av-svg",2)}</div><div><div class="{Q}_who-name">王○○ 奶奶</div><div class="{Q}_who-sub">要綁定的住民</div></div></div>'
   f'<div class="{Q}_flabel">您的姓名</div><div class="{Q}_field" data-mg="b_fd">{chars(Q+"_char","b_n","王小美")}</div>'
   f'<div class="{P}_btn" data-mg="b_send"><div class="{P}_btn-text">確認綁定</div></div></div>'
   f'<div class="{P}_in {Q}_done" data-mg="b_done"><div class="{Q}_done-ok" data-mg="b_dok">{svg("check",Q+"_done-svg",3)}</div>'
   f'<div class="{Q}_done-title">綁定完成</div><div class="{Q}_tags">{tags}</div></div>')
 +cap('b_cap1','機構從住民檔案產生 QR Code')+cap('b_cap2','家屬在 LINE 掃描、確認身分')+cap('b_cap3','綁定完成，資料自動同步')+'</div>')
D=9900; DUR[3]=D+OFF; HERO[3]=8000
tl(3,'b_desk',[(0,{'o':0,'s':.94}),(500,{'o':1,'s':1},'eo'),(9200,{'o':1,'s':1}),(9600,{'o':0,'y':-3},'io')])
press(3,'b_btn',900)
tl(3,'b_qr',[(1150,{'o':0,'s':.5,'r':-8}),(1650,{'o':1,'s':1,'r':0},'bk')])
tl(3,'b_beam',[(2100,{'o':1,'sx':0}),(2450,{'sx':1},'io'),(9100,{'o':1}),(9400,{'o':0},'io')])
tl(3,'b_ph',[(2300,{'o':0,'x':8}),(2850,{'o':1,'x':0},'eo'),(9200,{'o':1,'x':0}),(9600,{'o':0,'y':-3},'io')])
tl(3,'b_scan',[(2700,{'o':0,'s':.9}),(3100,{'o':1,'s':1},'eo'),(4300,{'o':1,'s':1}),(4600,{'o':0,'s':.92},'io')])
tl(3,'b_sqr',[(2900,{'o':0}),(3200,{'o':1},'po')])
tl(3,'b_line',[(3200,{'o':0,'y':0}),(3300,{'o':1},'lin'),(3950,{'y':3400},'io'),(4050,{'o':0},'lin')])
tl(3,'b_sok',[(3950,{'o':0,'s':.4}),(4300,{'o':1,'s':1},'bk')])
tl(3,'b_form',[(4500,{'o':0,'y':12}),(4950,{'o':1,'y':0},'eo'),(6300,{'o':1,'y':0}),(6600,{'o':0,'y':-6},'io')])
tl(3,'b_fd',[(5000,{'bc':HEX['line']}),(5150,{'bc':HEX['acc']},'po'),(5650,{'bc':HEX['acc']}),(5800,{'bc':HEX['line']},'po')])
typed(3,'b_n',3,5100,150)
press(3,'b_send',5900)
tl(3,'b_done',[(6500,{'o':0}),(6700,{'o':1},'po')])
tl(3,'b_dok',[(6550,{'o':0,'s':.3}),(7000,{'o':1,'s':1},'bk')])
for i in range(4): tl(3,f'b_g{i}',[(7000+i*120,{'o':0,'y':30,'s':.9}),(7450+i*120,{'o':1,'y':0,'s':1},'eo')])
capt(3,'b_cap1',200,2300); capt(3,'b_cap2',2550,6300); capt(3,'b_cap3',6450,9600)
# ================= derived data =================
TRACKS={'x':'T','y':'T','s':'T','sx':'T','sy':'T','r':'T','o':'o','bg':'bg','bc':'bc','c':'c'}
DEF={'x':0,'y':0,'s':1,'sx':1,'sy':1,'r':0,'o':1}
def used_props(card,key):
    u=set(INIT.get((card,key),{}).keys())
    for c,k,t,d,e,p in SEG:
        if c==card and k==key: u|=set(p.keys())
    return u
def full_init(card,key):
    init=dict(INIT.get((card,key),{}))
    for p in used_props(card,key):
        if p not in init: init[p]=DEF.get(p)
    return init
def state_at(card,key,t):
    st=full_init(card,key)
    for c,k,t0,d,e,p in sorted([s for s in SEG if s[0]==card and s[1]==key],key=lambda s:s[2]):
        if t0+d<=t: st.update(p)
    return st
def hero_hidden(card):
    """elements hidden in the resting (hero) frame + transform sanity check"""
    hid=[];warn=[]
    keys={k for (c,k) in INIT if c==card}
    for k in sorted(keys):
        st=state_at(card,k,HERO[card]+OFF)
        if st.get('o',1)<0.5 or st.get('sx',1)==0 or st.get('sy',1)==0: hid.append(k); continue
        for p,idv in (('x',0),('y',0),('s',1),('sx',1),('sy',1),('r',0)):
            if p in st and abs(st[p]-idv)>1e-6: warn.append((k,p,st[p]))
    return hid,warn
if __name__=='__main__':
    for c in (1,2,3):
        h,w=hero_hidden(c); print('card',c,'hidden at rest:',len(h),'transform warnings:',w)
