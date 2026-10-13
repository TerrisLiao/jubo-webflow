# Single source of truth for the four /security layer motion graphics.
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
P='security-mg'
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

# ================= CARD 1 · 帳號與權限 (product UI demo) =================
Q='security-mg1'
C(f'{Q}_ring',left='312px',top='131px',width='96px',height='96px',border_radius='28px')
C(f'{Q}_key',left='312px',top='131px',width='96px',height='96px',border_radius='28px',display='grid',place_items='center')
C(f'{Q}_key-rot',display='grid',place_items='center',color=V['deep'])
C(f'{Q}_key-svg',width='44px',height='44px')
C(f'{Q}_login',left='56px',top='84px',width='290px',padding='22px')
C(f'{Q}_who',display='flex',align_items='center',column_gap='12px',margin_bottom='18px')
C(f'{Q}_avatar',width='46px',height='46px',border_radius='50%',background_color=V['tint'],display='grid',place_items='center',color=V['deep'],flex='none')
C(f'{Q}_avatar-svg',width='22px',height='22px')
C(f'{Q}_who-title',font_size='17px',font_weight='600',line_height='1.3')
C(f'{Q}_who-sub',font_size='12px',color=V['mute'],line_height='1.4')
C(f'{Q}_field',height='44px',border_radius='11px',border='1.5px solid rgba(105,131,146,0.15)',border_color=HEX['line'],display='flex',align_items='center',padding='0px 14px',column_gap='8px',margin_bottom='10px')
C(f'{Q}_dot',width='9px',height='9px',border_radius='50%',background_color=V['ink'],flex='none')
C(f'{Q}_typed',font_size='15px',font_weight='700',letter_spacing='0.2em',font_family='ui-monospace, SFMono-Regular, Menlo, Consolas, monospace')
C(f'{Q}_code',margin_left='auto',padding='3px 9px',border_radius='7px',background_color=V['grey'],font_size='15px',font_weight='700',letter_spacing='0.2em',color=V['mute'],font_style='italic',font_family='ui-monospace, SFMono-Regular, Menlo, Consolas, monospace')
C(f'{Q}_btn',height='44px',border_radius='11px',background_color=V['acc'],display='grid',place_items='center',margin_top='12px')
C(f'{Q}_btn-text',font_size='16px',font_weight='600',color=V['white'])
C(f'{Q}_ok',left='322px',top='70px',width='34px',height='34px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center')
C(f'{Q}_ok-svg',width='18px',height='18px')
C(f'{Q}_beam',left='350px',top='224px',width='46px',height='2px',background_color=V['acc'],transform_origin='0% 50%')
C(f'{Q}_tile',position='absolute',width='136px',height='118px',padding='16px',display='flex',flex_direction='column',justify_content='space-between')
for i,(x,y) in enumerate([(404,84),(552,84),(404,214),(552,214)],1): C(f'{Q}_tile-{i}',left=f'{x}px',top=f'{y}px')
C(f'{Q}_tile-ico',width='40px',height='40px',border_radius='12px',display='grid',place_items='center',background_color=V['tint'],color=V['deep'])
C(f'{Q}_tile-svg',width='20px',height='20px')
C(f'{Q}_tile-label',font_size='15px',font_weight='600',color=V['ink'])
C(f'{Q}_tile-check',position='absolute',right='12px',top='12px',width='22px',height='22px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center')
C(f'{Q}_tile-check-svg',width='12px',height='12px')
C(f'{Q}_tile-glow',position='absolute',left='-2px',top='-2px',right='-2px',bottom='-2px',border='2px solid #00b2c0',border_color=V['acc'],border_radius='22px')
C(f'{Q}_tile-lockbox',width='20px',height='20px',color=HEX['idle'])
C(f'{Q}_tile-ico-lock',width='40px',height='40px',border_radius='12px',display='grid',place_items='center',background_color=HEX['idlebg'])
C(f'{Q}_tile-label-off',font_size='15px',font_weight='600',color=HEX['idle'])
tiles=[('file','照護紀錄'),('pill','用藥紀錄'),('pulse','生命徵象')]
th=''
for i,(ic,lab) in enumerate(tiles,1):
    th+=(f'<div class="{P}_card {Q}_tile {Q}_tile-{i}" data-mg="k_t{i}"><div class="{Q}_tile-glow" data-mg="k_g{i}"></div>'
         f'<div class="{Q}_tile-ico" data-mg="k_i{i}">{svg(ic,Q+"_tile-svg",1.8)}</div><div class="{Q}_tile-label" data-mg="k_b{i}">{lab}</div>'
         f'<div class="{Q}_tile-check" data-mg="k_s{i}">{svg("check",Q+"_tile-check-svg",3.5)}</div></div>')
th+=(f'<div class="{P}_card {Q}_tile {Q}_tile-4" data-mg="k_t4"><div class="{Q}_tile-ico-lock" data-mg="k_i4">{lock(Q+"_tile-lockbox","k_shk")}</div>'
     f'<div class="{Q}_tile-label-off">財務報表</div></div>')
CARDS[1]=(f'<div class="{P}_stage" data-mg="stage1" aria-hidden="true">'
 f'<div class="{P}_ring {Q}_ring" data-mg="k_ring"></div>'
 f'<div class="{P}_abs {P}_card {Q}_key" data-mg="k_key"><div class="{Q}_key-rot" data-mg="k_keyrot">{svg("key",Q+"_key-svg",1.7)}</div></div>'
 f'<div class="{P}_abs {P}_card {Q}_login" data-mg="k_login"><div class="{Q}_who"><div class="{Q}_avatar">{svg("user",Q+"_avatar-svg",1.9)}</div><div><div class="{Q}_who-title">護理師帳號</div><div class="{Q}_who-sub">登入照護系統</div></div></div>'
 f'<div class="{Q}_field">'+''.join(f'<div class="{Q}_dot" data-mg="k_d{i}"></div>' for i in range(12))+'</div>'
 f'<div class="{Q}_field" data-mg="k_cf"><div class="{Q}_typed" data-mg="k_typed">7K4Q</div><div class="{Q}_code">7K4Q</div></div>'
 f'<div class="{Q}_btn" data-mg="k_btn"><div class="{Q}_btn-text">登入</div></div></div>'
 f'<div class="{P}_abs {Q}_ok" data-mg="k_ok">{svg("check",Q+"_ok-svg",3)}</div>'
 f'<div class="{P}_abs {Q}_beam" data-mg="k_beam"></div>'+th+
 cap('k_c1','每個人一組帳號')+cap('k_c2','高強度密碼＋圖形驗證碼')+cap('k_c3','依角色，只開放職務需要的資料')+'</div>')
D=8400; DUR[1]=D+OFF; HERO[1]=7000
tl(1,'k_key',[(0,{'o':0,'s':.5}),(550,{'o':1,'s':1},'bk'),(1250,{'o':1,'s':1}),(1750,{'o':0,'x':-241.7,'y':-26,'s':.45},'io')])
tl(1,'k_keyrot',[(300,{'r':-70}),(1000,{'r':0},'bk')])
tl(1,'k_ring',[(700,{'o':0,'s':1}),(760,{'o':.9},'lin'),(1400,{'o':0,'s':1.6},'eo')])
tl(1,'k_login',[(1450,{'o':0,'s':.9}),(2000,{'o':1,'s':1},'eo'),(7700,{'o':1,'s':1}),(8150,{'o':0,'y':-3.8},'io')])
for i in range(12): tl(1,f'k_d{i}',[(2050+i*60,{'o':0,'s':0}),(2300+i*60,{'o':1,'s':1},'bk')])
tl(1,'k_typed',[(2850,{'o':0}),(2950,{'o':1},'lin')])
tl(1,'k_cf',[(2700,{'bc':HEX['line']}),(2850,{'bc':HEX['acc']},'po'),(3250,{'bc':HEX['acc']}),(3400,{'bc':HEX['line']},'po')])
tl(1,'k_btn',[(3350,{'s':1}),(3470,{'s':.94},'io'),(3650,{'s':1},'eo')])
tl(1,'k_ok',[(3600,{'o':0,'y':29,'s':.4}),(4000,{'o':1,'y':0,'s':1},'bk'),(7700,{'o':1,'s':1}),(8100,{'o':0,'s':.6},'io')])
tl(1,'k_beam',[(4000,{'o':1,'sx':0}),(4400,{'sx':1},'io'),(7700,{'o':1}),(8100,{'o':0},'io')])
for i in range(4): tl(1,f'k_t{i+1}',[(4250+i*120,{'o':0,'y':15.3,'s':.94}),(4800+i*120,{'o':1,'y':0,'s':1},'eo'),(7700,{'o':1}),(8150,{'o':0,'y':-8.5},'io')])
for n in (1,2,3):
    s=5300+(n-1)*260
    tl(1,f'k_i{n}',[(s,{'bg':HEX['idlebg'],'c':HEX['idle'],'s':1}),(s+200,{'bg':HEX['tint'],'c':HEX['deep'],'s':1.12},'bk'),(s+450,{'s':1},'eo')])
    tl(1,f'k_b{n}',[(s,{'c':HEX['idle']}),(s+250,{'c':HEX['ink']},'po')])
    tl(1,f'k_g{n}',[(s,{'o':0}),(s+250,{'o':1},'po')])
    tl(1,f'k_s{n}',[(s+150,{'o':0,'s':0}),(s+500,{'o':1,'s':1},'bk')])
tl(1,'k_shk',[(6300,{'y':-30}),(6500,{'y':0},'bk')])
tl(1,'k_i4',[(6450,{'r':0}),(6530,{'r':-12},'io'),(6650,{'r':10},'io'),(6770,{'r':-5},'io'),(6880,{'r':0},'eo')])
capt(1,'k_c1',200,1600); capt(1,'k_c2',1900,3900); capt(1,'k_c3',4300,8000)

# ================= CARD 2 · 傳輸加密 (cinematic journey) =================
Q='security-mg2'
C(f'{Q}_tube',left='222px',width='292px',height='2px',background_image='repeating-linear-gradient(90deg,#ffffff 0px,#ffffff 7px,rgba(255,255,255,0) 7px,rgba(255,255,255,0) 13px)',transform_origin='0% 50%')
C(f'{Q}_tube-top',top='208px'); C(f'{Q}_tube-bot',top='262px')
C(f'{Q}_dev',left='30px',top='96px',width='188px',height='210px',padding='14px')
C(f'{Q}_screen',width='100%',height='100%',border_radius='12px',background_color=V['grey'],padding='14px',display='flex',flex_direction='column',row_gap='9px')
C(f'{Q}_ln',height='8px',border_radius='4px',background_color='rgba(105,131,146,0.15)')
C(f'{Q}_ln-a',width='60%'); C(f'{Q}_ln-b',width='82%'); C(f'{Q}_ln-gap',height='58px'); C(f'{Q}_ln-c',width='70%'); C(f'{Q}_ln-d',width='44%')
C(f'{Q}_srv',left='520px',top='96px',width='156px',height='210px',padding='18px',display='flex',flex_direction='column',align_items='center',justify_content='center',row_gap='10px')
C(f'{Q}_cloud',width='64px',height='64px',border_radius='18px',background_color=V['tint'],display='grid',place_items='center',color=V['deep'])
C(f'{Q}_cloud-svg',width='34px',height='34px')
C(f'{Q}_srv-label',font_size='15px',font_weight='600')
C(f'{Q}_land',height='34px',padding='0px 12px',border_radius='10px',background_color=V['tint'],display='flex',align_items='center')
C(f'{Q}_land-text',font_size='14px',font_weight='600',white_space='nowrap')
C(f'{Q}_srvring',left='520px',top='96px',width='156px',height='210px',border_radius='20px')
C(f'{Q}_probe',left='359px',top='100px',width='2px',height='118px',background_image='repeating-linear-gradient(180deg,#151717 0px,#151717 5px,rgba(21,23,23,0) 5px,rgba(21,23,23,0) 10px)',transform_origin='50% 0%')
C(f'{Q}_eye',left='330px',top='40px',width='60px',height='60px',border_radius='50%',display='grid',place_items='center',color=V['ink'])
C(f'{Q}_eye-svg',width='28px',height='28px')
C(f'{Q}_eye-x',position='absolute',right='-6px',top='-6px',width='24px',height='24px',border_radius='50%',background_color=V['ink'],color=V['white'],display='grid',place_items='center')
C(f'{Q}_eye-x-svg',width='12px',height='12px')
C(f'{Q}_pk',left='38px',top='212px',width='172px',height='46px',border_radius='12px',padding='0px 12px',display='flex',align_items='center',column_gap='8px')
C(f'{Q}_pk-lock',width='24px',height='24px',border_radius='50%',background_color=V['acc'],color=V['white'],flex='none',display='grid',place_items='center')
C(f'{Q}_pk-lockbox',width='13px',height='13px')
C(f'{Q}_pk-text',position='relative',flex='1',height='20px')
C(f'{Q}_pk-plain',position='absolute',left='0px',top='0px',font_size='15px',font_weight='600',white_space='nowrap',line_height='1.3')
C(f'{Q}_pk-ciph',position='absolute',left='0px',top='2px',font_size='13px',font_weight='700',white_space='nowrap',color=V['deep'],letter_spacing='0.02em',line_height='1.3',font_family='ui-monospace, SFMono-Regular, Menlo, Consolas, monospace')
C(f'{Q}_pin',left='534px',top='320px',height='36px',padding='0px 12px',border_radius='999px',display='flex',align_items='center',column_gap='6px')
C(f'{Q}_pin-svg',width='16px',height='16px',color=V['deep'])
C(f'{Q}_pin-text',font_size='14px',font_weight='600',white_space='nowrap')
CARDS[2]=(f'<div class="{P}_stage" data-mg="stage2" aria-hidden="true">'
 f'<div class="{P}_abs {Q}_tube {Q}_tube-top" data-mg="t_top"></div><div class="{P}_abs {Q}_tube {Q}_tube-bot" data-mg="t_bot"></div>'
 f'<div class="{P}_abs {P}_card {Q}_dev" data-mg="t_dev"><div class="{Q}_screen"><div class="{Q}_ln {Q}_ln-a"></div><div class="{Q}_ln {Q}_ln-b"></div><div class="{Q}_ln-gap"></div><div class="{Q}_ln {Q}_ln-c"></div><div class="{Q}_ln {Q}_ln-d"></div></div></div>'
 f'<div class="{P}_abs {P}_card {Q}_srv" data-mg="t_srv"><div class="{Q}_cloud" data-mg="t_cloud">{svg("cloud",Q+"_cloud-svg",1.7)}</div><div class="{Q}_srv-label">雲端主機</div>'
 f'<div class="{Q}_land" data-mg="t_land"><div class="{Q}_land-text">血壓 128/82</div></div></div>'
 f'<div class="{P}_ring {Q}_srvring" data-mg="t_srvring"></div>'
 f'<div class="{P}_abs {Q}_probe" data-mg="t_probe"></div>'
 f'<div class="{P}_abs {P}_card {Q}_eye" data-mg="t_eye">{svg("eye",Q+"_eye-svg",1.8)}<div class="{Q}_eye-x" data-mg="t_x">{svg("x",Q+"_eye-x-svg",3)}</div></div>'
 f'<div class="{P}_abs {P}_card {Q}_pk" data-mg="t_pk"><div class="{Q}_pk-lock" data-mg="t_lk">{lock(Q+"_pk-lockbox","t_shk",2.6)}</div>'
 f'<div class="{Q}_pk-text"><div class="{Q}_pk-plain" data-mg="t_plain">血壓 128/82</div><div class="{Q}_pk-ciph" data-mg="t_ciph">7f3a·c91e·04bd</div></div></div>'
 f'<div class="{P}_abs {P}_card {Q}_pin" data-mg="t_pin">{svg("pin",Q+"_pin-svg",2.2)}<div class="{Q}_pin-text">存放在台灣</div></div>'
 +cap('t_c1','資料離開裝置前就加密')+cap('t_c2','路上被攔，也只看到亂碼')+cap('t_c3','抵達雲端，存放在台灣')+'</div>')
D=8600; DUR[2]=D+OFF; HERO[2]=7200
tl(2,'t_dev',[(0,{'o':0,'x':-12.8}),(550,{'o':1,'x':0},'eo'),(7750,{'o':1}),(8200,{'o':0},'io')])
tl(2,'t_srv',[(250,{'o':0,'x':15.4}),(800,{'o':1,'x':0},'eo'),(7750,{'o':1}),(8200,{'o':0},'io')])
tl(2,'t_top',[(700,{'o':1,'sx':0}),(1400,{'sx':1},'io'),(8000,{'o':1}),(8300,{'o':0},'io')])
tl(2,'t_bot',[(800,{'o':1,'sx':0}),(1500,{'sx':1},'io'),(8000,{'o':1}),(8300,{'o':0},'io')])
tl(2,'t_pk',[(1300,{'o':0,'s':.8,'x':0,'y':0}),(1700,{'o':1,'s':1},'eo'),(2100,{'o':1}),(2500,{'x':7,'y':-13,'s':1.06},'eo'),(3300,{'x':127.9,'y':0,'s':1},'io'),
   (4300,{'x':151.2},'lin'),(5050,{'x':168.6,'s':.96},'io'),(5400,{'o':0,'x':197.7,'y':-30,'s':.35},'in')])
tl(2,'t_lk',[(2200,{'o':0,'s':0}),(2500,{'o':1,'s':1},'bk')])
tl(2,'t_shk',[(2550,{'y':-30}),(2750,{'y':0},'bk')])
tl(2,'t_plain',[(2700,{'o':1}),(2950,{'o':0},'po')])
tl(2,'t_ciph',[(2800,{'o':0}),(3100,{'o':1},'po')])
tl(2,'t_eye',[(3200,{'o':0,'y':-33,'s':.8}),(3650,{'o':1,'y':0,'s':1},'bk'),(4900,{'o':1}),(5300,{'o':0,'y':-26},'io')])
tl(2,'t_probe',[(3600,{'o':.75,'sy':0}),(4000,{'sy':1},'io'),(4700,{'o':.75}),(5000,{'o':0},'io')])
tl(2,'t_x',[(4300,{'o':0,'s':0}),(4650,{'o':1,'s':1},'bk')])
tl(2,'t_srvring',[(5450,{'o':0,'s':1}),(5500,{'o':.9},'lin'),(6200,{'o':0,'s':1.12},'eo')])
tl(2,'t_cloud',[(5450,{'s':1}),(5650,{'s':1.15},'bk'),(5900,{'s':1},'eo')])
tl(2,'t_land',[(5600,{'o':0,'y':22}),(6000,{'o':1,'y':0},'eo'),(8000,{'o':1}),(8300,{'o':0},'io')])
tl(2,'t_pin',[(6200,{'o':0,'y':39,'s':.85}),(6700,{'o':1,'y':0,'s':1},'bk'),(8000,{'o':1}),(8300,{'o':0},'io')])
capt(2,'t_c1',1600,3200); capt(2,'t_c2',3500,5300); capt(2,'t_c3',5800,8300)

# ================= CARD 3 · 應用與雲端環境 (stream through a gate) =================
Q='security-mg3'
C(f'{Q}_globe',left='36px',top='177px',width='96px',height='96px',border_radius='28px',display='grid',place_items='center',color=V['deep'])
C(f'{Q}_globe-svg',width='42px',height='42px')
C(f'{Q}_gate',left='300px',top='165px',width='120px',height='120px',border_radius='34px',display='grid',place_items='center',color=V['deep'])
C(f'{Q}_gate-box',position='relative',width='54px',height='54px')
C(f'{Q}_gate-svg',position='absolute',left='0px',top='0px',width='100%',height='100%')
C(f'{Q}_ring',left='300px',top='165px',width='120px',height='120px',border_radius='34px',border_color=V['ink'])
C(f'{Q}_env',width='200px',height='150px',display='flex',flex_direction='column',align_items='center',justify_content='center',row_gap='12px')
C(f'{Q}_prod',left='500px',top='150px'); C(f'{Q}_test',left='420px',top='150px')
C(f'{Q}_env-ico',width='58px',height='58px',border_radius='16px',background_color=V['tint'],display='grid',place_items='center',color=V['deep'])
C(f'{Q}_env-ico-off',width='58px',height='58px',border_radius='16px',background_color=V['grey'],display='grid',place_items='center',color=V['mute'])
C(f'{Q}_env-svg',width='28px',height='28px')
C(f'{Q}_env-label',font_size='17px',font_weight='600')
C(f'{Q}_glow',position='absolute',left='-2px',top='-2px',right='-2px',bottom='-2px',border='2px solid #00b2c0',border_color=V['acc'],border_radius='22px')
C(f'{Q}_wall',left='359px',top='130px',width='2px',height='190px',background_image='repeating-linear-gradient(180deg,#151717 0px,#151717 6px,rgba(21,23,23,0) 6px,rgba(21,23,23,0) 12px)',transform_origin='50% 0%')
C(f'{Q}_q',left='150px',top='207px',width='124px',height='36px',border_radius='999px',display='flex',align_items='center',justify_content='center',column_gap='7px')
C(f'{Q}_q-ok',width='20px',height='20px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center',flex='none')
C(f'{Q}_q-bad',width='20px',height='20px',border_radius='50%',background_color=V['ink'],color=V['white'],display='grid',place_items='center',flex='none')
C(f'{Q}_q-svg',width='11px',height='11px')
C(f'{Q}_q-text',font_size='14px',font_weight='600',white_space='nowrap')
C(f'{Q}_q-up',top='166px')
C(f'{Q}_bit',left='150px',top='219px',width='12px',height='12px',border_radius='50%')
C(f'{Q}_bit-ok',background_color=V['acc'],box_shadow='0 0 0 0.25em rgba(0,178,192,0.18)')
C(f'{Q}_bit-bad',background_color=V['ink'],box_shadow='0 0 0 0.25em rgba(21,23,23,0.12)')
def q(key,ok,label,extra=''):
    b=f'<div class="{Q}_q-ok">{svg("check",Q+"_q-svg",3.5)}</div>' if ok else f'<div class="{Q}_q-bad">{svg("x",Q+"_q-svg",3.5)}</div>'
    return f'<div class="{P}_abs {P}_card {Q}_q{extra}" data-mg="{key}">{b}<div class="{Q}_q-text">{label}</div></div>'
bits=[('w_b1',1),('w_b2',0),('w_b3',1),('w_b4',0),('w_b5',0),('w_b6',1)]
CARDS[3]=(f'<div class="{P}_stage" data-mg="stage3" aria-hidden="true">'
 f'<div class="{P}_abs {P}_card {Q}_globe" data-mg="w_globe">{svg("globe",Q+"_globe-svg",1.5)}</div>'
 f'<div class="{P}_abs {P}_card {Q}_env {Q}_prod" data-mg="w_prod"><div class="{Q}_glow" data-mg="w_pg"></div><div class="{Q}_env-ico">{svg("server",Q+"_env-svg",1.7)}</div><div class="{Q}_env-label">正式環境</div></div>'
 f'<div class="{P}_abs {P}_card {Q}_env {Q}_test" data-mg="w_test"><div class="{Q}_env-ico-off">{svg("flask",Q+"_env-svg",1.7)}</div><div class="{Q}_env-label">測試環境</div></div>'
 f'<div class="{P}_abs {Q}_wall" data-mg="w_wall"></div>'
 f'<div class="{P}_ring {Q}_ring" data-mg="w_ring"></div>'
 +q('w_q1',1,'正常請求')+q('w_q2',0,'惡意爬蟲')+q('w_q3',0,'DDoS 流量',f' {Q}_q-up')
 +''.join(f'<div class="{P}_abs {Q}_bit {Q}_bit-{"ok" if ok else "bad"}" data-mg="{k}"></div>' for k,ok in bits)+
 f'<div class="{P}_abs {P}_card {Q}_gate" data-mg="w_gate"><div class="{Q}_gate-box">{svg("shield",Q+"_gate-svg",1.5)}{svg("check",Q+"_gate-svg",1.5,"w_chk")}</div></div>'
 +cap('w_c1','所有連線，先經過一道防護')+cap('w_c2','惡意流量擋在外面')+cap('w_c3','正式與測試環境獨立分開')+'</div>')
D=10200; DUR[3]=D+OFF; HERO[3]=2050
tl(3,'w_globe',[(0,{'o':0,'s':.6,'x':0}),(500,{'o':1,'s':1},'bk'),(6000,{'o':1}),(6400,{'o':0,'x':-31},'io')])
tl(3,'w_gate',[(400,{'o':0,'s':.5,'y':0}),(950,{'o':1,'s':1},'bk'),(6200,{'s':1,'y':0}),(6800,{'y':-98,'s':.55},'io'),(9600,{'o':1}),(10000,{'o':0},'io')])
tl(3,'w_chk',[(950,{'o':0,'s':.3}),(1250,{'o':1,'s':1},'bk')])
tl(3,'w_prod',[(1100,{'o':0,'x':10}),(1600,{'o':1,'x':0},'eo'),(6400,{'x':0}),(7100,{'x':-195},'io'),(9600,{'o':1}),(10000,{'o':0},'io')])
tl(3,'w_pg',[(2950,{'o':0}),(3100,{'o':1},'po'),(3600,{'o':0},'po')])
def passq(k,s): tl(3,k,[(s,{'o':0,'x':-16,'s':.9}),(s+350,{'o':1,'x':0,'s':1},'eo'),(s+500,{'x':0}),(s+1250,{'x':179},'io'),(s+1450,{'o':0,'x':200,'s':.6},'in')])
def bounce(k,s): tl(3,k,[(s,{'o':0,'x':-16,'s':.9,'y':0,'r':0}),(s+350,{'o':1,'x':0,'s':1},'eo'),(s+500,{'x':0}),(s+1000,{'x':21},'in'),(s+1180,{'x':-8,'r':-10},'eo'),
   (s+1290,{'x':0,'r':6},'po'),(s+1400,{'x':-3,'r':0},'po'),(s+1800,{'o':0,'y':100,'s':.8},'in')])
passq('w_q1',1500); bounce('w_q2',2700); bounce('w_q3',4100)
tl(3,'w_ring',[(3680,{'o':0,'s':1}),(3720,{'o':.8},'lin'),(4250,{'o':0,'s':1.4},'eo'),(5050,{'s':1},'lin'),(5100,{'o':.8},'lin'),(5650,{'o':0,'s':1.4},'eo')])
def bitp(k,s): tl(3,k,[(s,{'o':0,'x':0,'s':1}),(s+100,{'o':1},'lin'),(s+900,{'x':2750},'lin'),(s+1050,{'o':0,'x':3000},'lin')])
def bitb(k,s): tl(3,k,[(s,{'o':0,'x':0,'s':1}),(s+100,{'o':1},'lin'),(s+600,{'x':1150},'lin'),(s+750,{'o':0,'s':2.2},'po')])
bitp('w_b1',4900); bitb('w_b2',5050); bitp('w_b3',5200); bitb('w_b4',5350); bitb('w_b5',5450); bitp('w_b6',5550)
tl(3,'w_test',[(6700,{'o':0,'x':20}),(7300,{'o':1,'x':0},'eo'),(9600,{'o':1}),(10000,{'o':0},'io')])
tl(3,'w_wall',[(7100,{'o':.75,'sy':0}),(7700,{'sy':1},'io'),(9600,{'o':.75}),(10000,{'o':0},'io')])
capt(3,'w_c1',700,2600); capt(3,'w_c2',2800,6300); capt(3,'w_c3',6900,9900)

# ================= CARD 4 · 資料保存 (build-up stack + timeline) =================
Q='security-mg4'
C(f'{Q}_stack',left='265px',top='92px',width='190px',height='200px',z_index='2')
C(f'{Q}_ghost-1',left='265px',top='92px',width='190px',height='200px',z_index='1')
C(f'{Q}_ghost-2',left='265px',top='92px',width='190px',height='200px',z_index='0')
C(f'{Q}_slab',position='absolute',left='0px',width='190px',height='70px')
for i in range(3): C(f'{Q}_slab-{i}',top=f'{i*44}px')
C(f'{Q}_ring',left='225px',top='150px',width='270px',height='90px',z_index='3')
C(f'{Q}_lock',left='334px',top='60px',width='52px',height='52px',border_radius='50%',background_color=V['acc'],color=V['white'],display='grid',place_items='center',z_index='3',box_shadow='0 0.625em 1.5em -0.5em rgba(0,178,192,0.8)')
C(f'{Q}_lockbox',width='24px',height='24px')
C(f'{Q}_week',left='232px',top='316px',display='flex',column_gap='8px')
C(f'{Q}_day',width='28px',height='28px',border_radius='8px',background_color=V['white'],display='grid',place_items='center',box_shadow='0 0.375em 0.875em -0.5em rgba(11,53,88,0.4)')
C(f'{Q}_day-text',font_size='12px',font_weight='700',color=V['deep'])
C(f'{Q}_tl',left='262px',top='70px',width='430px',padding='14px 14px 14px 36px')
C(f'{Q}_tl-line',position='absolute',left='20px',top='26px',bottom='26px',width='2px',background_color='rgba(105,131,146,0.15)',transform_origin='50% 0%')
C(f'{Q}_row',position='relative',display='flex',align_items='center',column_gap='10px',height='62px',padding='0px 10px',border_radius='12px')
C(f'{Q}_row-dot',position='absolute',left='-21px',top='26px',width='10px',height='10px',border_radius='50%',background_color=V['acc'],box_shadow='0 0 0 0.1875em #ffffff')
C(f'{Q}_time',font_size='12px',font_weight='700',color=V['mute'],width='40px',flex='none',font_family='ui-monospace, SFMono-Regular, Menlo, Consolas, monospace')
C(f'{Q}_who',width='30px',height='30px',border_radius='50%',background_color=V['tint'],display='grid',place_items='center',flex='none')
C(f'{Q}_who-text',font_size='13px',font_weight='700',color=V['deep'])
C(f'{Q}_role',font_size='14px',font_weight='600',white_space='nowrap')
C(f'{Q}_act',font_size='14px',color=V['mute'],white_space='nowrap')
C(f'{Q}_mask',margin_left='auto',position='relative',width='104px',height='18px',flex='none')
C(f'{Q}_mask-text',position='absolute',right='0px',top='0px',font_size='13px',font_weight='700',white_space='nowrap',font_family='ui-monospace, SFMono-Regular, Menlo, Consolas, monospace')
def slabs(fill,stroke,ids):
    o=''
    for i in (2,1,0):
        m=f' data-mg="d_s{i}"' if ids else ''
        o+=(f'<svg class="{Q}_slab {Q}_slab-{i}"{m} viewBox="0 0 190 70" fill="none" stroke-width="1.5" aria-hidden="true">'
            f'<path d="M1 22v26a94 21 0 0 0 188 0V22" fill="{fill}" stroke="{stroke}"/><ellipse cx="95" cy="22" rx="94" ry="21" fill="#ffffff" stroke="{stroke}"/></svg>')
    return o
rows=[('09:12','林','護理師','修改紀錄','王小明','王○明'),('09:15','陳','社工','查詢個案','A123456789','A12*****89'),('09:21','張','照服員','新增量測','0912-345-678','0912-***-678')]
rh=''
for i,(t,w,r,a,n,m) in enumerate(rows,1):
    rh+=(f'<div class="{Q}_row" data-mg="d_r{i}"><div class="{Q}_row-dot"></div><div class="{Q}_time">{t}</div><div class="{Q}_who"><div class="{Q}_who-text">{w}</div></div>'
         f'<div class="{Q}_role">{r}</div><div class="{Q}_act">{a}</div><div class="{Q}_mask"><div class="{Q}_mask-text" data-mg="d_n{i}">{n}</div><div class="{Q}_mask-text" data-mg="d_m{i}">{m}</div></div></div>')
CARDS[4]=(f'<div class="{P}_stage" data-mg="stage4" aria-hidden="true">'
 f'<div class="{P}_abs {Q}_ghost-2" data-mg="d_gh2">{slabs("#f4fbfc","#c9ecef",False)}</div>'
 f'<div class="{P}_abs {Q}_ghost-1" data-mg="d_gh1">{slabs("#f4fbfc","#c9ecef",False)}</div>'
 f'<div class="{P}_abs {Q}_stack" data-mg="d_stack">{slabs("#e3f7f9","#a9e3e8",True)}</div>'
 f'<div class="{P}_ring {Q}_ring" data-mg="d_ring"></div>'
 f'<div class="{P}_abs {Q}_lock" data-mg="d_lock">{lock(Q+"_lockbox","d_shk",2.3)}</div>'
 f'<div class="{P}_abs {Q}_week">'+''.join(f'<div class="{Q}_day" data-mg="d_w{i}"><div class="{Q}_day-text">{c}</div></div>' for i,c in enumerate('一二三四五六日'))+'</div>'
 f'<div class="{P}_abs {P}_card {Q}_tl" data-mg="d_tl"><div class="{Q}_tl-line" data-mg="d_tlv"></div>{rh}</div>'
 +cap('d_c1','每一筆照護資料')+cap('d_c2','靜態資料加密保存')+cap('d_c3','每日自動備份')+cap('d_c4','每一筆操作，都追溯得到人')+cap('d_c5','敏感欄位可設定遮蔽')+'</div>')
D=11200; DUR[4]=D+OFF; HERO[4]=3300
for j,i in enumerate((2,1,0)): t=150+j*330; tl(4,f'd_s{i}',[(t,{'o':0,'y':-65.7}),(t+500,{'o':1,'y':0},'bk')])
tl(4,'d_stack',[(6200,{'o':1,'x':0,'y':0,'s':1}),(6900,{'x':-107.9,'y':5,'s':.55},'io'),(10700,{'o':1}),(11100,{'o':0},'io')])
tl(4,'d_ring',[(1900,{'o':0,'s':.6}),(2400,{'o':.9,'s':1},'eo'),(2900,{'o':.9}),(3500,{'o':0,'s':1.25},'eo')])
tl(4,'d_lock',[(2100,{'o':0,'y':-96,'x':0,'s':.7}),(2600,{'o':1,'y':0,'s':1},'bk'),(6200,{'x':0,'y':0,'s':1}),(6900,{'x':-394,'y':111.5,'s':.55},'io'),(10700,{'o':1}),(11100,{'o':0},'io')])
tl(4,'d_shk',[(2700,{'y':-30}),(2920,{'y':0},'bk')])
tl(4,'d_gh1',[(4000,{'o':0,'x':0,'y':0,'s':1}),(4600,{'o':.75,'x':78.9,'y':-5,'s':.78},'eo'),(6100,{'o':.75}),(6600,{'o':0,'x':31.6,'y':0,'s':.7},'io')])
tl(4,'d_gh2',[(4150,{'o':0,'x':0,'y':0,'s':1}),(4750,{'o':.5,'x':142,'y':-10,'s':.6},'eo'),(6100,{'o':.5}),(6600,{'o':0,'x':63,'y':0,'s':.5},'io')])
for i in range(7): tl(4,f'd_w{i}',[(4300+i*110,{'o':0,'y':35.7}),(4650+i*110,{'o':1,'y':0},'bk'),(6100,{'o':1}),(6500,{'o':0},'io')])
tl(4,'d_tl',[(6600,{'o':0,'x':7}),(7200,{'o':1,'x':0},'eo'),(10700,{'o':1}),(11100,{'o':0,'y':-5},'io')])
tl(4,'d_tlv',[(7000,{'sy':0}),(8000,{'sy':1},'io')])
for i in range(3): tl(4,f'd_r{i+1}',[(7200+i*330,{'o':0,'x':-3.3}),(7700+i*330,{'o':1,'x':0},'eo')])
tl(4,'d_r1',[(7700,{'bg':HEX['clear']}),(7900,{'bg':HEX['hl']},'po'),(8500,{'bg':HEX['clear']},'po')])
for i in range(3):
    s=9200+i*150
    tl(4,f'd_n{i+1}',[(s,{'o':1}),(s+250,{'o':0},'po')])
    tl(4,f'd_m{i+1}',[(s+60,{'o':0}),(s+360,{'o':1},'po')])
capt(4,'d_c1',300,1800); capt(4,'d_c2',2000,3900); capt(4,'d_c3',4100,6200); capt(4,'d_c4',7000,9000); capt(4,'d_c5',9100,11000)

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
    for c in (1,2,3,4):
        h,w=hero_hidden(c); print('card',c,'hidden at rest:',len(h),'transform warnings:',w)
