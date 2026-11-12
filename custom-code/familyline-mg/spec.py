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
        base=float(p['font_size'][:-2]) if 'font_size' in p and p['font_size'].endswith('px') else 16
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



# =====================================================================
# v3 (2026-11-12): copy the real 安心寶 LINE UI (Figma LTC - 安心寶, page "Line")
# The phone is built at the original 390-px design scale; the phone element
# carries font-size 0.6em, so every child written in design px scales by 0.6.
# =====================================================================
P='familyline-line'
CDN='https://cdn.prod.website-files.com/69ec2b02daa2e79f1da8772a/'
IMG={'menu':CDN+'6af5733dd17e817cf8a23a6a_fl-line-richmenu.webp',
     'bot':CDN+'6af5733d6f9624ce6c911480_fl-line-bot-avatar.webp',
     'kara':CDN+'6af5733ee95c96cee8e34b26_fl-line-photo-karaoke.webp',
     'lan1':CDN+'6af5733efd4887d22ad7bbb8_fl-line-photo-lantern-1.webp',
     'lan2':CDN+'6af5733ed17e817cf8a23ae9_fl-line-photo-lantern-2.webp',
     'group':CDN+'6af5733e34582d659c961dcd_fl-line-photo-group.webp'}
L={'chat':'#8cabd8','liff':'#eaf3f5','teal':'#0097a7','tealbg':'#e0f4f6','ink':'#1f2326','mute':'#7b868b','line':'#e6ebed',
   'orange':'#ee7c1e','orangebg':'#fde6d3','grey':'#f2f4f5','box':'#f5f7f7','yg':'#c9d84a'}
ICON.update({
'chev':'<path d="m15 18-6-6 6-6"/>',
'close':'<path d="M18 6 6 18M6 6l12 12"/>',
'search':'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
'note':'<rect width="16" height="18" x="4" y="3" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
'info':'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
'dl':'<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
'check':'<path d="M20 6 9 17l-5-5"/>',
})
FINGER=('<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ffd36b" stroke="#b86e0b" stroke-width="1.3" stroke-linejoin="round" '
        'd="M9 3.2a1.6 1.6 0 0 1 3.2 0v7.1l.4-.1a1.6 1.6 0 0 1 3 .6l.5-.1a1.6 1.6 0 0 1 2.9.9v.4a1.6 1.6 0 0 1 2.9.9v4.6c0 3.6-2.6 6.3-6.2 6.3h-1.6c-2.2 0-3.6-.8-5-2.4l-3.6-4.3a1.7 1.7 0 0 1 2.4-2.4L9 15.2Z"/></svg>')
GRAD={1:'radial-gradient(80% 110% at 0% 0%,#d9f6fb,transparent 60%),radial-gradient(70% 100% at 100% 100%,#e4dcff,transparent 60%),#eef2fb',
      2:'radial-gradient(80% 110% at 100% 0%,#fff6cf,transparent 60%),radial-gradient(70% 100% at 0% 100%,#d2f4f2,transparent 60%),#f1f7f3',
      3:'radial-gradient(80% 110% at 100% 0%,#e7ddff,transparent 60%),radial-gradient(70% 100% at 0% 100%,#d6f1fb,transparent 60%),#eef1fb'}
def bg(url): return f'url("{url}")'

# ---------- stage + right panel (stage px) ----------
C(f'{P}_stage',position='relative',width='720px',height='480px',overflow='hidden',color=L['ink'],flex='none')
C(f'{P}_abs',position='absolute')
for c in (1,2,3): C(f'{P}_bg-{c}',position='absolute',left='0px',top='0px',width='100%',height='100%',background_image=GRAD[c])
C(f'{P}_kicker',position='absolute',left='352px',top='30px',font_size='13px',font_weight='600',letter_spacing='0.08em',color=L['teal'],white_space='nowrap')
C(f'{P}_bar',position='absolute',left='338px',top='268px',width='4px',height='30px',border_radius='2px',background_color=L['teal'])
for i in range(4): C(f'{P}_step-{i}',position='absolute',left='352px',top=f'{64+i*68}px',width='330px',height='30px',display='flex',align_items='center',column_gap='12px')
C(f'{P}_num',width='30px',height='30px',border_radius='50%',border='2px solid #c9d3d6',display='grid',place_items='center',flex='none')
C(f'{P}_num-text',font_size='14px',font_weight='700',color='#9aa6aa')
C(f'{P}_num-on',width='30px',height='30px',border_radius='50%',background_color=L['teal'],display='grid',place_items='center',flex='none')
C(f'{P}_num-on-text',font_size='14px',font_weight='700',color='#ffffff')
C(f'{P}_step-text',font_size='18px',font_weight='500',color='#9aa6aa',white_space='nowrap')
C(f'{P}_step-on-text',font_size='18px',font_weight='700',color=L['ink'],white_space='nowrap')
C(f'{P}_zoom',left='352px',top='348px',width='328px',padding='16px 18px',border_radius='16px',background_color='#ffffff',
  box_shadow='0 1.25em 2.5em -1em rgba(11,53,88,0.28),0 0.125em 0.375em rgba(11,53,88,0.06)')
def steps(pre,labels):
    h=f'<div class="{P}_kicker">家屬在 LINE 的操作</div><div class="{P}_bar" data-mg="{pre}_bar"></div>'
    for i,t in enumerate(labels):
        h+=(f'<div class="{P}_step-{i}"><div class="{P}_num"><div class="{P}_num-text">{i+1}</div></div><div class="{P}_step-text">{t}</div></div>'
            f'<div class="{P}_step-{i}" data-mg="{pre}_s{i}"><div class="{P}_num-on"><div class="{P}_num-on-text">{i+1}</div></div><div class="{P}_step-on-text">{t}</div></div>')
    return h
def step_anim(card,pre,times,end):
    for i,t in enumerate(times): tl(card,f'{pre}_s{i}',[(t,{'o':0,'x':-3}),(t+350,{'o':1,'x':0},'eo'),(end,{'o':1}),(end+350,{'o':0},'io')])
    fr=[(times[0],{'o':0,'y':-680}),(times[0]+300,{'o':1},'po')]
    for i,t in enumerate(times[1:],1): fr+= [(t,{'y':round((i-1)*680/3-680,2)}),(t+400,{'y':round(i*680/3-680,2)},'eo')]
    fr+=[(end,{'o':1}),(end+350,{'o':0},'io')]
    tl(card,f'{pre}_bar',fr)

# ---------- phone (own props in stage px; children in 390-px design px) ----------
C(f'{P}_phone',position='absolute',left='64px',top='30px',width='234px',height='506px',font_size='9.6px',border_radius='34px',overflow='hidden',
  background_color=L['chat'],box_shadow='0 0 0 5px #1d2125,0 26px 50px -18px rgba(11,53,88,0.45)')
C(f'{P}_fill',position='absolute',left='0px',top='0px',width='390px',height='844px')
C(f'{P}_sb',position='absolute',left='0px',top='0px',width='390px',height='47px')
C(f'{P}_sb-time',position='absolute',left='34px',top='14px',font_size='16px',font_weight='600',color='#ffffff')
C(f'{P}_sb-time-dark',position='absolute',left='34px',top='14px',font_size='16px',font_weight='600',color='#111111')
C(f'{P}_bat',position='absolute',left='334px',top='18px',width='26px',height='12px',border_radius='3px',border='2px solid #ffffff')
C(f'{P}_bat-dark',position='absolute',left='334px',top='18px',width='26px',height='12px',border_radius='3px',border='2px solid #111111')
C(f'{P}_lh',position='absolute',left='0px',top='47px',width='390px',height='50px',display='flex',align_items='center',padding='0px 14px',column_gap='8px',color='#ffffff')
C(f'{P}_ico',width='24px',height='24px',flex='none')
C(f'{P}_shield',width='18px',height='18px',border_radius='50%',background_color='rgba(255,255,255,0.85)',flex='none')
C(f'{P}_lh-title',font_size='17px',font_weight='700',color='#ffffff',white_space='nowrap',flex='1')
C(f'{P}_menu',position='absolute',left='0px',top='497px',width='390px',height='263px',background_image=bg(IMG['menu']),background_size='cover')
C(f'{P}_av',position='absolute',left='8px',width='30px',height='30px',border_radius='50%',background_image=bg(IMG['bot']),background_size='cover')
C(f'{P}_bubble',position='absolute',left='42px',width='272px',padding='12px 16px',border_radius='18px',background_color='#ffffff')
C(f'{P}_btext',font_size='15px',line_height='1.6',color=L['ink'])
C(f'{P}_tap',width='40px',height='40px',border_radius='50%',border='3px solid #ffd36b')
C(f'{P}_finger',width='38px',height='38px')
C(f'{P}_finger-svg',width='100%',height='100%')
# LIFF page chrome
C(f'{P}_liff',position='absolute',left='0px',top='0px',width='390px',height='844px',background_color=L['liff'])
C(f'{P}_top',position='absolute',left='0px',top='0px',width='390px',height='104px',background_color='#ffffff')
C(f'{P}_top-l',position='absolute',left='14px',top='62px',width='26px',height='26px',color='#111111')
C(f'{P}_top-r',position='absolute',left='350px',top='62px',width='26px',height='26px',color='#111111')
C(f'{P}_top-title',position='absolute',left='0px',right='0px',top='60px',text_align='center',font_size='16px',font_weight='700',color='#111111',white_space='nowrap')
C(f'{P}_top-url',position='absolute',left='0px',right='0px',top='82px',text_align='center',font_size='9px',color='#b9c0c3',white_space='nowrap')
C(f'{P}_card',position='absolute',left='16px',width='358px',border_radius='14px',background_color='#ffffff')
def sb(dark=False):
    d='-dark' if dark else ''
    return f'<div class="{P}_sb"><div class="{P}_sb-time{d}">9:41</div><div class="{P}_bat{d}"></div></div>'
def line_head():
    return (f'{sb()}<div class="{P}_lh">{svg("chev",P+"_ico",2.4)}<div class="{P}_shield"></div><div class="{P}_lh-title">智齡長照中心</div>'
            f'{svg("search",P+"_ico",2.2)}{svg("note",P+"_ico",2)}{svg("menu",P+"_ico",2.2)}</div>')
def liff_top(title):
    return (f'{sb(True)}<div class="{P}_top">{svg("chev",P+"_top-l",2.4)}<div class="{P}_top-title">{title}</div>'
            f'<div class="{P}_top-url">https://liff.line.me</div>{svg("close",P+"_top-r",2.2)}</div>')
def finger(key,x,y):  # tip lands on (x,y) design px
    return f'<div class="{P}_abs {P}_finger" style-pos="{x},{y}" data-mg="{key}">{FINGER.format(cls=P+"_finger-svg")}</div>'
POS={}  # per-element absolute positions written as their own classes
def at(name,x,y,**more):
    C(name,position='absolute',left=f'{x}px',top=f'{y}px',**more); return name
def press(card,key,t): tl(card,key,[(t,{'s':1}),(t+120,{'s':.94},'io'),(t+300,{'s':1},'eo')])
def tapring(card,key,t):
    tl(card,key,[(t,{'o':0,'s':.3}),(t+60,{'o':1},'lin'),(t+520,{'o':0,'s':1.7},'eo')])
def move_finger(card,key,frames):
    """frames: list of (t, x%, y%, extra) — x/y in % of finger box (38 px)"""
    tl(card,key,frames)
def pctx(dx): return round(dx/38*100,2)

# ================= CARD 1 · 生理數值 =================
Q='familyline-line1'
C(f'{Q}_tpl',position='absolute',left='42px',top='104px',width='272px',padding='18px 20px 14px',border_radius='18px',background_color='#ffffff')
C(f'{Q}_tpl-title',font_size='19px',font_weight='700',margin_bottom='10px',white_space='nowrap')
C(f'{Q}_row',display='flex',align_items='center',justify_content='space-between',padding='7px 0px',border_bottom='1px solid #e6ebed')
C(f'{Q}_k',font_size='15px',line_height='1.25',white_space='nowrap')
C(f'{Q}_ks',font_size='11px',color=L['mute'],white_space='nowrap')
C(f'{Q}_v',font_size='15px',font_weight='500',white_space='nowrap')
C(f'{Q}_u',font_size='12px',color=L['mute'],white_space='nowrap')
C(f'{Q}_more',margin_top='12px',height='40px',border_radius='8px',background_color=L['grey'],display='grid',place_items='center')
C(f'{Q}_more-text',font_size='15px',font_weight='500',white_space='nowrap')
C(f'{Q}_hl1',position='absolute',left='8px',top='541px',width='182px',height='100px',border_radius='12px',background_color='rgba(0,151,167,0.28)')
C(f'{Q}_hl2',position='absolute',left='62px',top='416px',width='232px',height='40px',border_radius='8px',background_color='rgba(0,151,167,0.22)')
C(f'{Q}_c1',top='118px',height='372px')
C(f'{Q}_tabs',position='absolute',left='0px',top='0px',width='358px',height='50px',display='flex',justify_content='space-around',align_items='center',border_bottom='1px solid #e6ebed')
C(f'{Q}_tab',font_size='14px',color='#5f6a6f',white_space='nowrap')
C(f'{Q}_tab-on',font_size='14px',font_weight='700',color=L['teal'],white_space='nowrap')
C(f'{Q}_uline',position='absolute',left='90px',top='47px',width='54px',height='3px',background_color=L['teal'])
C(f'{Q}_chip',position='absolute',top='64px',height='32px',padding='0px 12px',border_radius='16px',display='grid',place_items='center',border='1px solid #c9d3d6')
C(f'{Q}_chip-a',left='72px'); C(f'{Q}_chip-b',left='184px',border_color=L['teal'],background_color=L['tealbg'])
C(f'{Q}_chip-text',font_size='13px',white_space='nowrap',color='#4b5458')
C(f'{Q}_chip-on-text',font_size='13px',white_space='nowrap',color=L['teal'],font_weight='600')
C(f'{Q}_plot',position='absolute',left='40px',top='118px',width='300px',height='170px')
C(f'{Q}_band',position='absolute',left='0px',top='120px',width='100%',height='40px',background_color='rgba(201,216,74,0.14)')
C(f'{Q}_dot1',position='absolute',left='0px',top='10px',width='100%',height='0px',border_top='1px dashed rgba(0,151,167,0.55)')
C(f'{Q}_dot2',position='absolute',left='0px',top='92px',width='100%',height='0px',border_top='1px dashed rgba(0,151,167,0.55)')
C(f'{Q}_svg',position='absolute',left='0px',top='0px',width='100%',height='100%',overflow='visible')
C(f'{Q}_cover',position='absolute',left='-2px',top='-6px',width='306px',height='180px',background_color='#ffffff',transform_origin='100% 50%')
for i,(t,y) in enumerate([('165',122),('110',204),('63',272)]): C(f'{Q}_yl-{i}',position='absolute',left='12px',top=f'{y}px',font_size='11px',color='#8c979c')
for i,(t,x) in enumerate([('3/1',38),('3/15',176),('3/28',314)]): C(f'{Q}_xl-{i}',position='absolute',left=f'{x}px',top='296px',font_size='11px',color='#8c979c')
C(f'{Q}_legend',position='absolute',left='0px',right='0px',top='326px',display='flex',justify_content='center',column_gap='18px')
C(f'{Q}_lg',display='flex',align_items='center',column_gap='6px')
C(f'{Q}_lgd-a',width='8px',height='8px',border_radius='50%',background_color=L['teal'])
C(f'{Q}_lgd-b',width='8px',height='8px',border_radius='50%',background_color=L['yg'])
C(f'{Q}_lg-text',font_size='12px',color='#5f6a6f',white_space='nowrap')
C(f'{Q}_c2',top='504px',height='330px',padding='0px 16px')
C(f'{Q}_c2-head',display='flex',align_items='center',justify_content='space-between',height='54px')
C(f'{Q}_c2-title',font_size='17px',font_weight='500',white_space='nowrap')
C(f'{Q}_help',display='flex',align_items='center',column_gap='4px',color=L['teal'])
C(f'{Q}_help-ico',width='16px',height='16px')
C(f'{Q}_help-text',font_size='13px',color=L['teal'],white_space='nowrap')
C(f'{Q}_rec',display='flex',align_items='center',height='46px',column_gap='6px',border_bottom='1px solid #e6ebed',border_radius='6px',padding='0px 4px')
C(f'{Q}_rv',font_size='17px',white_space='nowrap')
C(f'{Q}_rv-o',font_size='17px',white_space='nowrap',color=L['orange'])
C(f'{Q}_rvw',display='flex',align_items='baseline',column_gap='4px')
C(f'{Q}_rs',font_size='17px',color=L['ink'])
C(f'{Q}_ru',font_size='12px',color=L['mute'],white_space='nowrap')
C(f'{Q}_badge',padding='1px 7px',border_radius='9px',background_color=L['orangebg'])
C(f'{Q}_badge-text',font_size='11px',color=L['orange'],white_space='nowrap',font_weight='600')
C(f'{Q}_rt',margin_left='auto',font_size='13px',color='#5f6a6f',white_space='nowrap')
# zoom card (stage px)
C(f'{Q}_z-k',font_size='13px',color=L['mute'],white_space='nowrap',margin_bottom='6px')
C(f'{Q}_z-row',display='flex',align_items='baseline',column_gap='8px')
C(f'{Q}_z-v',font_size='30px',font_weight='700',color=L['orange'],white_space='nowrap',line_height='1.1')
C(f'{Q}_z-v2',font_size='30px',font_weight='700',white_space='nowrap',line_height='1.1')
C(f'{Q}_z-u',font_size='14px',color=L['mute'],white_space='nowrap')
C(f'{Q}_z-badge',padding='2px 10px',border_radius='11px',background_color=L['orangebg'],align_self='center')
C(f'{Q}_z-badge-text',font_size='14px',font_weight='700',color=L['orange'],white_space='nowrap')
C(f'{Q}_z-t',margin_left='auto',font_size='14px',color='#5f6a6f',white_space='nowrap',align_self='center')

def poly(pts): return ' '.join(f'{x},{y}' for x,y in pts)
SYS=[(0,92),(10,80),(18,88),(26,74),(34,86),(42,72),(52,84),(62,70),(72,78),(82,64),(94,72),(106,58),(118,66),(130,50),(142,38),(152,24),(162,40),(172,54),(180,30),(186,18),(193,50),(202,54),(214,40),(224,48),(236,52),(248,44),(258,50),(266,52),(272,8),(280,62),(290,72),(300,58)]
DIA=[(0,140),(12,134),(24,142),(36,130),(48,138),(62,132),(76,140),(90,128),(104,136),(118,130),(132,138),(146,126),(160,134),(174,128),(188,136),(202,130),(216,124),(230,118),(244,130),(258,134),(272,128),(286,132),(300,130)]
chart_svg=(f'<svg class="{Q}_svg" viewBox="0 0 300 170" preserveAspectRatio="none" aria-hidden="true">'
           f'<polyline points="{poly(SYS)}" fill="none" stroke="#0097a7" stroke-width="2.2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>'
           f'<polyline points="{poly(DIA)}" fill="none" stroke="#c9d84a" stroke-width="2.2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>')
vit=[('體溫','6 小時前','38.4','°C'),('血壓','3 天前','123 / 89','mmHg'),('脈搏','6 小時前','72','次/分'),('血糖','22 天前','98','mg/dL'),('體重','22 天前','52.4','kg')]
tpl_rows=''.join(f'<div class="{Q}_row" data-mg="h_tr{i}"><div><div class="{Q}_k">{a}</div><div class="{Q}_ks">{b}</div></div>'
                 f'<div class="{Q}_v">{v} <span class="{Q}_u">{u}</span></div></div>' for i,(a,b,v,u) in enumerate(vit))
def rec(i,a,b,lowA,lowB,badge,time):
    va=f'<span class="{Q}_rv-o">{a}</span>' if lowA else f'<span class="{Q}_rv">{a}</span>'
    vb=f'<span class="{Q}_rv-o">{b}</span>' if lowB else f'<span class="{Q}_rv">{b}</span>'
    bd=f'<div class="{Q}_badge" data-mg="h_bd{i}"><div class="{Q}_badge-text">{badge}</div></div>' if badge else ''
    return f'<div class="{Q}_rec" data-mg="h_rc{i}"><div class="{Q}_rvw">{va}<span class="{Q}_rs">/</span>{vb}</div><div class="{Q}_ru">mmHg</div>{bd}<div class="{Q}_rt">{time}</div></div>'
recs=(rec(0,'123','52',False,True,'偏低','3/12 09:45')+rec(1,'123','89',False,False,'','3/12 09:45')+
      rec(2,'224','85',True,False,'偏高','3/12 10:00')+rec(3,'235','45',True,True,'異常','3/12 10:15'))
tabs=''.join(f'<div class="{Q}_tab{"-on" if t=="血壓" else ""}">{t}</div>' for t in ['體溫','血壓','脈搏','血糖','體重'])
C(f'{Q}_greet',top='104px'); C(f'{Q}_av1',top='104px')
C(f'{Q}_fin',position='absolute',left='88px',top='586px',width='38px',height='38px')
C(f'{Q}_ring1',position='absolute',left='80px',top='569px'); C(f'{Q}_ring2',position='absolute',left='158px',top='416px')
liff1=(f'<div class="{P}_liff" data-mg="h_liff">{liff_top("簡智齡 生理數值")}'
  f'<div class="{P}_card {Q}_c1"><div class="{Q}_tabs">{tabs}</div><div class="{Q}_uline"></div>'
  f'<div class="{Q}_chip {Q}_chip-a"><div class="{Q}_chip-text">2026 年 2 月</div></div><div class="{Q}_chip {Q}_chip-b"><div class="{Q}_chip-on-text">2026 年 3 月</div></div>'
  +''.join(f'<div class="{Q}_yl-{i}">{t}</div>' for i,t in enumerate(['165','110','63']))+
  f'<div class="{Q}_plot"><div class="{Q}_band"></div><div class="{Q}_dot1"></div><div class="{Q}_dot2"></div>{chart_svg}<div class="{Q}_cover" data-mg="h_cov"></div></div>'
  +''.join(f'<div class="{Q}_xl-{i}">{t}</div>' for i,t in enumerate(['3/1','3/15','3/28']))+
  f'<div class="{Q}_legend"><div class="{Q}_lg"><div class="{Q}_lgd-a"></div><div class="{Q}_lg-text">收縮壓</div></div>'
  f'<div class="{Q}_lg"><div class="{Q}_lgd-b"></div><div class="{Q}_lg-text">舒張壓</div></div></div></div>'
  f'<div class="{P}_card {Q}_c2"><div class="{Q}_c2-head"><div class="{Q}_c2-title">血壓紀錄</div><div class="{Q}_help">{svg("info",Q+"_help-ico",2)}<div class="{Q}_help-text">說明</div></div></div>{recs}</div></div>')
CARDS[1]=(f'<div class="{P}_stage" data-mg="stage1" aria-hidden="true"><div class="{P}_bg-1"></div>'
 f'<div class="{P}_phone" data-mg="h_ph">{line_head()}'
 f'<div class="{P}_av {Q}_av1"></div><div class="{P}_bubble {Q}_greet" data-mg="h_greet"><div class="{P}_btext">感謝您加入！請由下方選單查詢長輩的照護資訊。</div></div>'
 f'<div class="{Q}_tpl" data-mg="h_tpl"><div class="{Q}_tpl-title">簡智齡 生理數值</div>{tpl_rows}'
 f'<div class="{Q}_more" data-mg="h_more"><div class="{Q}_more-text">查看更多</div></div></div>'
 f'<div class="{P}_menu"></div><div class="{Q}_hl1" data-mg="h_hl1"></div><div class="{Q}_hl2" data-mg="h_hl2"></div>'
 f'{liff1}'
 f'<div class="{P}_tap {Q}_ring1" data-mg="h_ring1"></div><div class="{P}_tap {Q}_ring2" data-mg="h_ring2"></div>'
 f'<div class="{Q}_fin" data-mg="h_fin">{FINGER.format(cls=P+"_finger-svg")}</div></div>'
 +steps('h',['點選單「生理數值」','最新五項，一次看完','查看兩個月趨勢','偏高偏低，直接標示'])+
 f'<div class="{P}_abs {P}_zoom" data-mg="h_zoom"><div class="{Q}_z-k">血壓紀錄・3/12 10:00</div><div class="{Q}_z-row">'
 f'<div class="{Q}_z-v">224</div><div class="{Q}_z-v2">/ 85</div><div class="{Q}_z-u">mmHg</div>'
 f'<div class="{Q}_z-badge"><div class="{Q}_z-badge-text">偏高</div></div></div></div></div>')
D=12000; DUR[1]=D+OFF; HERO[1]=9500
E=11200
tl(1,'h_ph',[(0,{'o':0,'y':3}),(600,{'o':1,'y':0},'eo'),(E,{'o':1,'y':0}),(E+400,{'o':0,'y':-2},'io')])
step_anim(1,'h',[300,2000,4200,7000],E)
# finger: base position is on the 生理數值 tile; dx/dy to 查看更多 = (+78,-132) design px
FX,FY=pctx(73.3),pctx(-152.7)
tl(1,'h_fin',[(700,{'o':0,'x':60,'y':80,'s':1}),(1000,{'o':1},'po'),(1500,{'x':0,'y':0},'io'),(1560,{'s':.86},'io'),(1720,{'s':1},'eo'),
              (3100,{'x':FX,'y':FY},'io'),(3160,{'s':.86},'io'),(3320,{'s':1},'eo'),(3700,{'o':0},'po')])
tapring(1,'h_ring1',1560); tapring(1,'h_ring2',3160)
tl(1,'h_hl1',[(1560,{'o':0}),(1650,{'o':1},'po'),(2000,{'o':0},'po')])
tl(1,'h_greet',[(1800,{'o':1,'y':0}),(2150,{'o':0,'y':-40},'io')])
tl(1,'h_tpl',[(2000,{'o':0,'y':10}),(2500,{'o':1,'y':0},'eo')])
for i in range(5): tl(1,f'h_tr{i}',[(2250+i*90,{'o':0,'x':-3}),(2600+i*90,{'o':1,'x':0},'eo')])
tl(1,'h_hl2',[(3160,{'o':0}),(3240,{'o':1},'po'),(3600,{'o':0},'po')])
tl(1,'h_liff',[(3600,{'y':100}),(4200,{'y':0},'eo')])
tl(1,'h_cov',[(4500,{'sx':1,'o':1}),(5900,{'sx':0},'io')])
for i in range(4): tl(1,f'h_rc{i}',[(5900+i*140,{'o':0,'y':30}),(6300+i*140,{'o':1,'y':0},'eo')])
for i in (0,2,3): tl(1,f'h_bd{i}',[(6500+i*120,{'o':0,'s':.4}),(6850+i*120,{'o':1,'s':1},'bk')])
tl(1,'h_rc2',[(7100,{'bg':'rgba(238,124,30,0)'}),(7300,{'bg':'rgba(238,124,30,0.1)'},'po'),(E,{'bg':'rgba(238,124,30,0.1)'})])
tl(1,'h_zoom',[(7200,{'o':0,'y':12,'s':.94}),(7750,{'o':1,'y':0,'s':1},'eo'),(E,{'o':1}),(E+400,{'o':0},'io')])

# ================= CARD 2 · 照片花絮 =================
Q='familyline-line2'
C(f'{Q}_greet',top='104px'); C(f'{Q}_av1',top='104px')
C(f'{Q}_hl1',position='absolute',left='262px',top='648px',width='120px',height='102px',border_radius='12px',background_color='rgba(0,151,167,0.28)')
C(f'{Q}_fin',position='absolute',left='310px',top='694px',width='38px',height='38px')
C(f'{Q}_ring1',position='absolute',left='302px',top='677px')
C(f'{Q}_h1',position='absolute',left='22px',top='118px',font_size='21px',font_weight='500',color='#3f6f7b',white_space='nowrap')
C(f'{Q}_list',top='162px',height='620px',padding='4px 20px')
C(f'{Q}_date',font_size='19px',font_weight='500',white_space='nowrap',margin_top='14px')
C(f'{Q}_ev',font_size='13px',color='#5f6a6f',white_space='nowrap',margin_top='2px',margin_bottom='10px')
C(f'{Q}_ph',display='grid',grid_template_columns='1fr 1fr',column_gap='6px',padding_bottom='14px',border_bottom='1px solid #e6ebed')
C(f'{Q}_ph2',display='grid',grid_template_columns='1fr 1fr',column_gap='6px')
for k,u in (('kara',IMG['kara']),('lan1',IMG['lan1']),('lan2',IMG['lan2'])):
    C(f'{Q}_img-{k}',height='118px',background_image=bg(u),background_size='cover',background_position='50% 40%')
C(f'{Q}_img-kara2',height='118px',background_image=bg(IMG['kara']),background_size='cover',background_position='20% 40%')
C(f'{Q}_hl2',position='absolute',left='36px',top='441px',width='156px',height='118px',background_color='rgba(255,255,255,0.35)')
C(f'{Q}_ring2',position='absolute',left='94px',top='480px')
C(f'{Q}_dim',position='absolute',left='0px',top='104px',width='390px',height='740px',background_color='rgba(20,24,28,0.5)')
C(f'{Q}_dlg',left='16px',top='150px',height='590px',overflow='hidden')
C(f'{Q}_dlg-title',position='absolute',left='22px',top='26px',font_size='19px',font_weight='600',white_space='nowrap')
C(f'{Q}_cnt',position='absolute',left='306px',top='72px',width='40px',height='26px',border_radius='13px',background_color='#6f7578')
C(f'{Q}_cnt-text',position='absolute',left='0px',right='0px',top='4px',text_align='center',font_size='12px',color='#ffffff')
C(f'{Q}_strip',position='absolute',left='-358px',top='150px',width='716px',height='260px',display='flex')
C(f'{Q}_big-a',width='358px',height='260px',background_image=bg(IMG['group']),background_size='cover',background_position='50% 50%',flex='none')
C(f'{Q}_big-b',width='358px',height='260px',background_image=bg(IMG['lan1']),background_size='cover',background_position='50% 50%',flex='none')
C(f'{Q}_foot',position='absolute',left='22px',right='22px',top='540px',display='flex',justify_content='space-between',align_items='center')
C(f'{Q}_dl',display='flex',align_items='center',column_gap='6px',color=L['teal'])
C(f'{Q}_dl-ico',width='18px',height='18px')
C(f'{Q}_teal',font_size='15px',color=L['teal'],white_space='nowrap')
C(f'{Q}_toast',position='absolute',left='95px',top='468px',padding='10px 18px',border_radius='22px',background_color='rgba(30,34,38,0.86)',display='flex',align_items='center',column_gap='6px',color='#ffffff')
C(f'{Q}_toast-text',font_size='14px',color='#ffffff',white_space='nowrap')
C(f'{Q}_fin2',position='absolute',left='262px',top='300px',width='38px',height='38px')
C(f'{Q}_ring3',position='absolute',left='45px',top='681px')
C(f'{Q}_z-head',display='flex',align_items='center',column_gap='12px')
C(f'{Q}_z-img',width='76px',height='54px',border_radius='8px',background_image=bg(IMG['group']),background_size='cover',flex='none')
C(f'{Q}_z-t1',font_size='16px',font_weight='700',white_space='nowrap')
C(f'{Q}_z-t2',font_size='13px',color=L['mute'],white_space='nowrap',margin_top='2px')
C(f'{Q}_z-ok',margin_left='auto',width='30px',height='30px',border_radius='50%',background_color=L['teal'],color='#ffffff',display='grid',place_items='center',flex='none')
C(f'{Q}_z-ok-svg',width='16px',height='16px')
liff2=(f'<div class="{P}_liff" data-mg="p_liff">{liff_top("簡智齡 照片花絮")}<div class="{Q}_h1">近半年照片花絮</div>'
  f'<div class="{P}_card {Q}_list"><div class="{Q}_date">115/07/07</div><div class="{Q}_ev">重陽敬老活動</div>'
  f'<div class="{Q}_ph"><div class="{Q}_img-kara" data-mg="p_i0"></div><div class="{Q}_img-kara2" data-mg="p_i1"></div></div>'
  f'<div class="{Q}_date">115/06/12</div><div class="{Q}_ev">藝術治療・燈籠手作活動</div>'
  f'<div class="{Q}_ph2"><div class="{Q}_img-lan1" data-mg="p_i2"></div><div class="{Q}_img-lan2" data-mg="p_i3"></div></div></div>'
  f'<div class="{Q}_hl2" data-mg="p_hl2"></div><div class="{Q}_dim" data-mg="p_dim"></div>'
  f'<div class="{P}_card {Q}_dlg" data-mg="p_dlg"><div class="{Q}_dlg-title">115/06/12 燈籠手作活動</div>'
  f'<div class="{Q}_cnt"><div class="{Q}_cnt-text" data-mg="p_n1">1/2</div><div class="{Q}_cnt-text" data-mg="p_n2">2/2</div></div>'
  f'<div class="{Q}_strip" data-mg="p_strip"><div class="{Q}_big-a"></div><div class="{Q}_big-b"></div></div>'
  f'<div class="{Q}_foot"><div class="{Q}_dl">{svg("dl",Q+"_dl-ico",2.4)}<div class="{Q}_teal">下載</div></div><div class="{Q}_teal">關閉</div></div>'
  f'<div class="{Q}_toast" data-mg="p_toast">{svg("check",Q+"_dl-ico",2.6)}<div class="{Q}_toast-text">已下載到手機</div></div></div></div>')
CARDS[2]=(f'<div class="{P}_stage" data-mg="stage2" aria-hidden="true"><div class="{P}_bg-2"></div>'
 f'<div class="{P}_phone" data-mg="p_ph">{line_head()}'
 f'<div class="{P}_av {Q}_av1"></div><div class="{P}_bubble {Q}_greet"><div class="{P}_btext">感謝您加入！請由下方選單查詢長輩的照護資訊。</div></div>'
 f'<div class="{P}_menu"></div><div class="{Q}_hl1" data-mg="p_hl1"></div>{liff2}'
 f'<div class="{P}_tap {Q}_ring1" data-mg="p_ring1"></div><div class="{P}_tap {Q}_ring2" data-mg="p_ring2"></div><div class="{P}_tap {Q}_ring3" data-mg="p_ring3"></div>'
 f'<div class="{Q}_fin" data-mg="p_fin">{FINGER.format(cls=P+"_finger-svg")}</div></div>'
 +steps('p',['點選單「照片花絮」','近半年照片，依活動整理','點開照片，左右滑動','喜歡的照片，直接下載'])+
 f'<div class="{P}_abs {P}_zoom" data-mg="p_zoom"><div class="{Q}_z-head"><div class="{Q}_z-img"></div><div><div class="{Q}_z-t1">照片已下載</div>'
 f'<div class="{Q}_z-t2">115/06/12 燈籠手作活動</div></div><div class="{Q}_z-ok">{svg("check",Q+"_z-ok-svg",3)}</div></div></div></div>')
D=12000; DUR[2]=D+OFF; HERO[2]=10000
E=11200
tl(2,'p_ph',[(0,{'o':0,'y':3}),(600,{'o':1,'y':0},'eo'),(E,{'o':1,'y':0}),(E+400,{'o':0,'y':-2},'io')])
step_anim(2,'p',[300,2300,4600,7600],E)
# finger base: 照片花絮 tile. moves: to photo (lantern-1 at 114,511) dx=-208,dy=-188; swipe on dialog photo; to 下載 (40,700)
tl(2,'p_fin',[(700,{'o':0,'x':40,'y':80,'s':1}),(1000,{'o':1},'po'),(1500,{'x':0,'y':0},'io'),(1560,{'s':.86},'io'),(1720,{'s':1},'eo'),
              (3900,{'x':pctx(-212.7),'y':pctx(-196.7)},'io'),(3960,{'s':.86},'io'),(4120,{'s':1},'eo'),
              (5000,{'x':pctx(-26.7),'y':pctx(-266.7)},'io'),(5100,{'s':.9},'io'),(5700,{'x':pctx(-206.7),'y':pctx(-266.7)},'io'),(5800,{'s':1},'eo'),
              (7300,{'x':pctx(-261.7),'y':pctx(4.3)},'io'),(7360,{'s':.86},'io'),(7520,{'s':1},'eo'),(7900,{'o':0},'po')])
tapring(2,'p_ring1',1560); tapring(2,'p_ring2',3960); tapring(2,'p_ring3',7360)
tl(2,'p_hl1',[(1560,{'o':0}),(1650,{'o':1},'po'),(2000,{'o':0},'po')])
tl(2,'p_liff',[(1800,{'y':100}),(2400,{'y':0},'eo')])
for i in range(4): tl(2,f'p_i{i}',[(2600+i*160,{'o':0,'s':.92}),(3050+i*160,{'o':1,'s':1},'eo')])
tl(2,'p_hl2',[(3960,{'o':0}),(4040,{'o':1},'po'),(4400,{'o':0},'po')])
tl(2,'p_dim',[(4300,{'o':0}),(4600,{'o':1},'po')])
tl(2,'p_dlg',[(4300,{'o':0,'s':.92}),(4800,{'o':1,'s':1},'eo')])
tl(2,'p_strip',[(5100,{'x':50}),(5700,{'x':0},'io')])
tl(2,'p_n1',[(5500,{'o':1}),(5650,{'o':0},'po')]); tl(2,'p_n2',[(5550,{'o':0}),(5750,{'o':1},'po')])
tl(2,'p_toast',[(7500,{'o':0,'y':30}),(7850,{'o':1,'y':0},'eo'),(9300,{'o':1}),(9600,{'o':0},'io')])
tl(2,'p_zoom',[(7800,{'o':0,'y':12,'s':.94}),(8350,{'o':1,'y':0,'s':1},'eo'),(E,{'o':1}),(E+400,{'o':0},'io')])

# ================= CARD 3 · 家屬綁定 =================
Q='familyline-line3'
C(f'{Q}_av1',top='104px'); C(f'{Q}_av2',top='196px')
C(f'{Q}_b1',top='104px'); C(f'{Q}_b2',top='196px',padding='12px 12px 12px 16px')
C(f'{Q}_qbtn',margin_top='14px',height='44px',border_radius='8px',background_color=L['teal'],display='grid',place_items='center')
C(f'{Q}_qbtn-text',font_size='15px',color='#ffffff',white_space='nowrap')
C(f'{Q}_bar',position='absolute',left='0px',top='760px',width='390px',height='84px',background_color='#ffffff')
C(f'{Q}_fin',position='absolute',left='163.3px',top='337.3px',width='38px',height='38px')
C(f'{Q}_ring1',position='absolute',left='160px',top='320px')
# scanner
C(f'{Q}_scan',position='absolute',left='0px',top='0px',width='390px',height='844px',background_image='linear-gradient(160deg,#5a5047 0%,#2b2622 45%,#1a1715 100%)')
C(f'{Q}_cam-desk',position='absolute',left='-40px',top='560px',width='480px',height='320px',background_image='linear-gradient(170deg,#7a5536,#4d321f)',transform_origin='50% 50%')
C(f'{Q}_paper',position='absolute',left='86px',top='330px',width='218px',height='270px',background_color='#f7f5f0',border_radius='4px',padding='26px 30px')
C(f'{Q}_paper-t',font_size='12px',color='#55606a',text_align='center',white_space='nowrap',margin_bottom='10px')
C(f'{Q}_paper-qr',width='158px',height='158px',color='#111111')
C(f'{Q}_scan-t',position='absolute',left='0px',right='0px',top='236px',text_align='center',font_size='16px',font_weight='700',color='#ffffff',line_height='1.6')
C(f'{Q}_frame',position='absolute',left='44px',top='312px',width='302px',height='302px')
for n,k in (('tl','top:0px;left:0px'),('tr','top:0px;right:0px'),('bl','bottom:0px;left:0px'),('br','bottom:0px;right:0px')):
    d=dict(x.split(':') for x in k.split(';'))
    bw={'tl':('border_top_width','border_left_width'),'tr':('border_top_width','border_right_width'),'bl':('border_bottom_width','border_left_width'),'br':('border_bottom_width','border_right_width')}[n]
    C(f'{Q}_cn-{n}',position='absolute',width='44px',height='44px',border_style='solid',border_color='#ffffff',border_width='0px',**{bw[0]:'4px',bw[1]:'4px'},**d)
C(f'{Q}_sline',position='absolute',left='12px',top='14px',width='278px',height='4px',border_radius='2px',background_color='#4fe3f0',box_shadow='0 0 12px 2px rgba(79,227,240,0.7)')
C(f'{Q}_sok',position='absolute',left='115px',top='115px',width='72px',height='72px',border_radius='50%',background_color=L['teal'],color='#ffffff',display='grid',place_items='center')
C(f'{Q}_sok-svg',width='38px',height='38px')
# confirm + done
C(f'{Q}_cf',top='120px',height='560px',padding='26px 18px')
C(f'{Q}_h',font_size='17px',font_weight='700',text_align='center',white_space='nowrap')
C(f'{Q}_d',font_size='13px',color='#5f6a6f',text_align='center',line_height='1.6',margin_top='10px')
C(f'{Q}_box',margin_top='16px',padding='8px 16px',border_radius='10px',background_color=L['box'])
C(f'{Q}_kv',display='flex',justify_content='space-between',padding='8px 0px')
C(f'{Q}_kv-sep',display='flex',justify_content='space-between',padding='8px 0px',border_top='1px solid #e3e8ea',margin_top='4px')
C(f'{Q}_k',font_size='14px',color='#5f6a6f',white_space='nowrap')
C(f'{Q}_v',font_size='14px',font_weight='600',white_space='nowrap')
C(f'{Q}_v2',font_size='14px',white_space='nowrap')
C(f'{Q}_note',font_size='12px',color='#5f6a6f',text_align='center',margin_top='14px',white_space='nowrap')
C(f'{Q}_btns',display='grid',grid_template_columns='1fr 1fr',column_gap='10px',margin_top='12px')
C(f'{Q}_no',height='42px',border_radius='6px',border='1px solid #0097a7',display='grid',place_items='center')
C(f'{Q}_ok',height='42px',border_radius='6px',background_color=L['teal'],display='grid',place_items='center')
C(f'{Q}_tt',font_size='14px',color=L['teal'],white_space='nowrap')
C(f'{Q}_tw',font_size='14px',color='#ffffff',white_space='nowrap')
C(f'{Q}_done-c',margin_left='auto',margin_right='auto',width='80px',height='80px',border_radius='50%',background_color='#c5f0f7',color=L['teal'],display='grid',place_items='center',margin_bottom='16px')
C(f'{Q}_done-svg',width='40px',height='40px')
C(f'{Q}_start',margin_top='18px',height='44px',border_radius='6px',background_color=L['teal'],display='grid',place_items='center')
C(f'{Q}_fin2',position='absolute',left='0px',top='0px')
C(f'{Q}_ring2',position='absolute',left='258px',top='474px')
C(f'{Q}_z-head',display='flex',align_items='center',column_gap='12px')
C(f'{Q}_z-ok',width='40px',height='40px',border_radius='50%',background_color='#c5f0f7',color=L['teal'],display='grid',place_items='center',flex='none')
C(f'{Q}_z-ok-svg',width='22px',height='22px')
C(f'{Q}_z-t1',font_size='17px',font_weight='700',white_space='nowrap')
C(f'{Q}_z-t2',font_size='13px',color=L['mute'],white_space='nowrap',margin_top='2px')
def qrsvg(cls):
    QR=[(0,0),(0,1),(1,0),(2,2),(3,1),(4,0),(3,3),(1,4),(4,4),(2,5),(5,3),(3,6),(5,5)]
    r=''
    for x,y in ((0,0),(14,0),(0,14)):
        r+=f'<rect x="{x}" y="{y}" width="7" height="7" rx="1.2"/><rect x="{x+1.5}" y="{y+1.5}" width="4" height="4" rx=".6" fill="#ffffff"/><rect x="{x+2.5}" y="{y+2.5}" width="2" height="2"/>'
    for x,y in QR: r+=f'<rect x="{x*2+8}" y="{y*2+8}" width="2" height="2"/>'
    for x,y in ((15,15),(17,16),(19,18),(16,19),(9,1),(11,3),(1,9),(3,11),(10,10),(18,14),(14,18)): r+=f'<rect x="{x}" y="{y}" width="2" height="2"/>'
    return f'<svg class="{cls}" viewBox="0 0 21 21" fill="currentColor" aria-hidden="true">{r}</svg>'
info=(f'<div class="{Q}_kv"><div class="{Q}_k">住民</div><div class="{Q}_v">簡智齡</div></div><div class="{Q}_kv"><div class="{Q}_k">床號</div><div class="{Q}_v2">A3-302</div></div>'
      f'<div class="{Q}_kv-sep"><div class="{Q}_k">身分</div><div class="{Q}_v">子女 - 大女兒</div></div><div class="{Q}_kv"><div class="{Q}_k">姓名</div><div class="{Q}_v">陳美玲</div></div>'
      f'<div class="{Q}_kv"><div class="{Q}_k">聯絡電話</div><div class="{Q}_v2">0912-345-678</div></div>')
scan=(f'<div class="{Q}_scan" data-mg="b_scan"><div class="{Q}_cam-desk"></div>'
      f'<div class="{Q}_paper" data-mg="b_paper"><div class="{Q}_paper-t">智齡長照中心・家屬綁定</div><div class="{Q}_paper-qr">{qrsvg(P+"_finger-svg")}</div></div>'
      f'{sb()}<div class="{P}_top">{svg("chev",P+"_top-l",2.4)}<div class="{P}_top-title">QR Code 綁定對象</div><div class="{P}_top-url">https://liff.line.me</div>{svg("close",P+"_top-r",2.2)}</div>'
      f'<div class="{Q}_scan-t">請將機構提供的<br>LINE 綁定 QR Code 對準框內</div>'
      f'<div class="{Q}_frame"><div class="{Q}_cn-tl"></div><div class="{Q}_cn-tr"></div><div class="{Q}_cn-bl"></div><div class="{Q}_cn-br"></div>'
      f'<div class="{Q}_sline" data-mg="b_line"></div><div class="{Q}_sok" data-mg="b_sok">{svg("check",Q+"_sok-svg",3)}</div></div></div>')
conf=(f'<div class="{P}_liff" data-mg="b_conf">{liff_top("綁定對象")}<div class="{P}_card {Q}_cf"><div class="{Q}_h">請先確認以下身分，以完成綁定</div>'
      f'<div class="{Q}_d">綁定後即可查看家人在機構的照護狀況、外診紀錄與相關資料</div><div class="{Q}_box">{info}</div>'
      f'<div class="{Q}_note">若以上資料不是您本人，請勿綁定並聯絡機構確認</div>'
      f'<div class="{Q}_btns"><div class="{Q}_no"><div class="{Q}_tt">不是我</div></div><div class="{Q}_ok" data-mg="b_ok"><div class="{Q}_tw">確認綁定</div></div></div></div></div>')
done=(f'<div class="{P}_liff" data-mg="b_done">{liff_top("綁定對象")}<div class="{P}_card {Q}_cf"><div class="{Q}_done-c" data-mg="b_dc">{svg("check",Q+"_done-svg",3)}</div>'
      f'<div class="{Q}_h">綁定完成</div><div class="{Q}_d">您已成功綁定對象，可開始使用家屬服務</div><div class="{Q}_box">{info}</div>'
      f'<div class="{Q}_start"><div class="{Q}_tw">開始使用</div></div></div></div>')
CARDS[3]=(f'<div class="{P}_stage" data-mg="stage3" aria-hidden="true"><div class="{P}_bg-3"></div>'
 f'<div class="{P}_phone" data-mg="b_ph">{line_head()}'
 f'<div class="{P}_av {Q}_av1" data-mg="b_a1"></div><div class="{P}_bubble {Q}_b1" data-mg="b_b1"><div class="{P}_btext">歡迎加入！請完成身分驗證以綁定您的家人資料。</div></div>'
 f'<div class="{P}_av {Q}_av2" data-mg="b_a2"></div><div class="{P}_bubble {Q}_b2" data-mg="b_b2"><div class="{P}_btext">請掃描機構提供的 LINE 綁定 QR Code 以完成身分綁定。綁定後就可即時查看健康數據、活動行程、外診紀錄等資訊。</div>'
 f'<div class="{Q}_qbtn" data-mg="b_qb"><div class="{Q}_qbtn-text">QR Code 綁定對象</div></div></div><div class="{Q}_bar"></div>'
 f'{scan}{conf}{done}'
 f'<div class="{P}_tap {Q}_ring1" data-mg="b_ring1"></div><div class="{P}_tap {Q}_ring2" data-mg="b_ring2"></div>'
 f'<div class="{Q}_fin" data-mg="b_fin">{FINGER.format(cls=P+"_finger-svg")}</div></div>'
 +steps('b',['點「QR Code 綁定對象」','掃描機構提供的 QR Code','確認住民與家屬身分','綁定完成，開始使用'])+
 f'<div class="{P}_abs {P}_zoom" data-mg="b_zoom"><div class="{Q}_z-head"><div class="{Q}_z-ok">{svg("check",Q+"_z-ok-svg",3)}</div>'
 f'<div><div class="{Q}_z-t1">綁定完成</div><div class="{Q}_z-t2">簡智齡・A3-302・子女 - 大女兒</div></div></div></div></div>')
D=12000; DUR[3]=D+OFF; HERO[3]=10000
E=11200
tl(3,'b_ph',[(0,{'o':0,'y':3}),(600,{'o':1,'y':0},'eo'),(E,{'o':1,'y':0}),(E+400,{'o':0,'y':-2},'io')])
for k,t in (('b_a1',500),('b_b1',500),('b_a2',1000),('b_b2',1000)): tl(3,k,[(t,{'o':0,'y':12}),(t+450,{'o':1,'y':0},'eo')])
step_anim(3,'b',[1400,2900,5600,8200],E)
# finger: base on QR button (186,455); to 確認綁定 (+96,+122)
tl(3,'b_fin',[(1500,{'o':0,'x':40,'y':80,'s':1}),(1800,{'o':1},'po'),(2300,{'x':0,'y':0},'io'),(2360,{'s':.86},'io'),(2520,{'s':1},'eo'),(2750,{'o':0},'po'),
              (6600,{'o':0,'x':pctx(98),'y':pctx(194)}),(6800,{'o':1},'po'),(7200,{'y':pctx(154)},'io'),(7260,{'s':.86},'io'),(7420,{'s':1},'eo'),(7800,{'o':0},'po')])
tapring(3,'b_ring1',2360); tapring(3,'b_ring2',7260)
press(3,'b_qb',2360); press(3,'b_ok',7260)
tl(3,'b_scan',[(2500,{'y':100}),(3050,{'y':0},'eo')])
tl(3,'b_paper',[(3000,{'o':1,'x':0,'y':40,'r':-6}),(3900,{'y':0,'r':0},'eo')])
tl(3,'b_line',[(3700,{'o':0,'y':0}),(3800,{'o':1},'lin'),(4700,{'y':6800},'io'),(4800,{'o':0},'lin')])
tl(3,'b_sok',[(4750,{'o':0,'s':.4}),(5100,{'o':1,'s':1},'bk')])
tl(3,'b_conf',[(5400,{'y':100}),(5950,{'y':0},'eo')])
tl(3,'b_done',[(7600,{'o':0,'s':.98}),(8000,{'o':1,'s':1},'eo')])
tl(3,'b_dc',[(7800,{'s':.3}),(8300,{'s':1},'bk')])
tl(3,'b_zoom',[(8500,{'o':0,'y':12,'s':.94}),(9050,{'o':1,'y':0,'s':1},'eo'),(E,{'o':1}),(E+400,{'o':0},'io')])
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
