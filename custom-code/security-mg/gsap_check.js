const { chromium } = require('playwright');
const fs=require('fs');
const PAY=JSON.parse(fs.readFileSync('ix3_payload.json','utf8'));
const IDS=Object.fromEntries(fs.readFileSync('ids.txt','utf8').trim().split('\n').map(l=>l.split(' ')).map(([k,v])=>[v,k]));
(async()=>{const b=await chromium.launch();const q=await b.newPage({viewport:{width:1600,height:1100}});
 const errs=[];q.on('pageerror',e=>errs.push(e.message));
 await q.goto('file://'+process.cwd()+'/preview.html');
 await q.addScriptTag({path:process.env.GSAP_PATH||'node_modules/gsap/dist/gsap.min.js'});
 const res=await q.evaluate(([PAY,IDS])=>{
  rest(); window.__pre=null; const EN={0:'none',4:'power2.in',5:'power2.out',9:'power3.inOut',14:'back.out',26:'expo.out'};
  const TL={};
  for(const c of [1,2,3,4]){const tl=gsap.timeline({paused:true});
   for(const a of PAY[c].timelines[0].actions){
     const els=a.targets.map(t=>document.querySelector(`#p${c} [data-mg="${IDS[t.value[1]]}"]`));
     const v={duration:a.timing.duration,ease:EN[a.timing.ease],repeat:a.timing.repeat,repeatDelay:a.timing.repeatDelay,overwrite:false};
     const f={};
     for(const [k,[x0,x]] of Object.entries(a.properties['wf:transform']||{})){ v[k]=k==='opacity'?parseFloat(x)/100:x; f[k]=k==='opacity'?parseFloat(x0)/100:x0;}
     for(const [k,[x0,x]] of Object.entries(a.properties['wf:style']||{})){ v[k]=x; f[k]=x0;}
     if(a.tt===2) tl.fromTo(els,f,v,a.timing.position); else tl.to(els,v,a.timing.position);}
   TL[c]=tl;}
  const cv=document.createElement('canvas').getContext('2d');
  const col=c=>{cv.fillStyle='#000';cv.fillStyle=c;const v=cv.fillStyle;if(v[0]==='#')return[parseInt(v.slice(1,3),16),parseInt(v.slice(3,5),16),parseInt(v.slice(5,7),16),1];return v.match(/[\d.]+/g).map(Number)};
  const out={};
  for(const c of [1,2,3,4]){const D=S.dur[c];let worst={d:0};let n=0;
   for(let t=0;t<=3*D;t+=10){TL[c].time(t/1000);
    if(t%100||t%D<5) continue;
    document.querySelectorAll(`#p${c} [data-mg]`).forEach(el=>{const id=c+'|'+el.dataset.mg;if(!S.inits[id])return;
     const st=stateAt(id,t%D); n++;
     const chk=(name,exp,got,tol)=>{const d=Math.abs(exp-got);if(d>tol&&d>worst.d)worst={d,t,key:el.dataset.mg,name,exp,got}};
     const MAP={o:'opacity',x:'xPercent',y:'yPercent',s:'scale',sx:'scaleX',sy:'scaleY',r:'rotation'};
     for(const [k,p] of Object.entries(MAP)){ if(!(k in st))continue; let g=+gsap.getProperty(el,p); let e=st[k];
       if(k==='sx'||k==='sy'){g=+gsap.getProperty(el,p); e=st[k]*(st.s??1);}
       if(k==='s'){ if('sx' in st||'sy' in st) continue; g=+gsap.getProperty(el,'scaleX'); }
       chk(k,e,g,k==='o'||k[0]==='s'?0.03:1.5);}
     for(const [k,p] of Object.entries({bg:'backgroundColor',bc:'borderTopColor',c:'color'})){ if(!(k in st))continue;
       const A=col(st[k]),B=col(getComputedStyle(el)[p]); A.forEach((v,i)=>chk(k+i,v,B[i]??1,i<3?6:0.05));}
    });}
   out[c]={samples:n,worst};}
  return out;},[PAY,IDS]);
 console.log(JSON.stringify(res,null,1),'errors',errs);await b.close();})();
