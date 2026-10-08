const { chromium } = require('playwright');
const INTENT=[/w_q1 x w_gate/,/t_dev x t_pk/,/k_key x k_login/,/w_gate x w_q/,/w_q\d x w_gate/];
(async () => { const b=await chromium.launch(); const q=await b.newPage({viewport:{width:1600,height:1100}});
 const errs=[]; q.on('pageerror',e=>errs.push(e.message)); q.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await q.goto('file://'+process.cwd()+'/preview.html',{waitUntil:'networkidle'}); await q.addStyleTag({content:'.panel{width:'+(process.env.W||720)+'px!important}'}); await q.waitForTimeout(300);
 const dur=await q.evaluate(()=>S.dur); const found={};
 for(const c of [1,2,3,4]){ for(let t=0;t<dur[c];t+=100){ await q.evaluate(([c,t])=>seek(c,t),[c,t]);
  const r=await q.evaluate(c=>{const st=document.querySelector('#p'+c+' .security-mg_stage'),sb=st.getBoundingClientRect(),out=[];
   const vis=el=>{let e=el;while(e&&e!==st){const cs=getComputedStyle(e);if(+cs.opacity<.35)return false;e=e.parentElement}return true};
   st.querySelectorAll('[class*="text"],[class*="label"],[class*="title"],[class*="sub"],[class*="typed"],[class*="code"],[class*="plain"],[class*="ciph"],[class*="role"],[class*="act"],[class*="time"]').forEach(x=>{
     if(!vis(x)||!x.textContent.trim())return; const xr=x.getBoundingClientRect(); let p=x.parentElement; while(p&&p!==st&&!p.className.baseVal&&!(getComputedStyle(p).boxShadow!=='none'||/_land|_pk|_mask|_row|_tile|_q|_pin|_cap/.test(p.className)))p=p.parentElement;
     if(p&&p!==st){const pr=p.getBoundingClientRect(); if(xr.right>pr.right+1||xr.left<pr.left-1||xr.bottom>pr.bottom+1) out.push('spill:'+x.textContent.trim().slice(0,14));}
     if(xr.right>sb.right+1||xr.left<sb.left-1||xr.bottom>sb.bottom+1||xr.top<sb.top-1) out.push('offstage:'+x.textContent.trim().slice(0,14));});
   const cards=[...st.querySelectorAll('[data-mg]')].filter(e=>{const cs=getComputedStyle(e);return cs.boxShadow!=='none'&&/255, 255, 255/.test(cs.backgroundColor)}).filter(vis);
   for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++){const A=cards[i],B=cards[j];if(A.contains(B)||B.contains(A))continue;const a=A.getBoundingClientRect(),d=B.getBoundingClientRect();
     const ox=Math.min(a.right,d.right)-Math.max(a.left,d.left),oy=Math.min(a.bottom,d.bottom)-Math.max(a.top,d.top); if(ox>4&&oy>4) out.push('overlap:'+A.dataset.mg+' x '+B.dataset.mg);}
   return out;},c);
  r.forEach(k=>{(found[c+' | '+k]=found[c+' | '+k]||[]).push(t)}); } }
 for(const [k,ts] of Object.entries(found)){const tag=INTENT.some(rx=>rx.test(k))?'  (intended)':''; console.log(k,'@',ts[0]+'-'+ts[ts.length-1],'('+ts.length+')'+tag);}
 await q.evaluate(()=>rest()); await q.screenshot({path:'rest_'+(process.env.W||720)+'.png',fullPage:true});
 console.log('cards-checked-ok','errors',errs); await b.close();})();
