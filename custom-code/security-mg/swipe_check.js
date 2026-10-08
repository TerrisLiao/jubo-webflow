const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 for(const [vw,pgs] of [[390,'1.25rem'],[390,'1rem'],[360,'1.25rem'],[767,'1.25rem']]){
  const ctx=await b.newContext({viewport:{width:vw,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});const q=await ctx.newPage();
  await q.goto('file://'+process.cwd()+'/swipe_mock.html'); await q.addStyleTag({content:`:root{--pgs:${pgs}}`}); await q.waitForTimeout(200);
  const r=await q.evaluate(()=>{const L=document.getElementById('lay');const vis=[...document.querySelectorAll('.security-sticky_visual')],it=[...document.querySelectorAll('.security-sticky_item')];
   const out={docOverflow:document.documentElement.scrollWidth-innerWidth, lay:[L.clientWidth,L.scrollWidth], cols:[]};
   vis.forEach((v,i)=>{const a=v.getBoundingClientRect(),t=it[i].getBoundingClientRect(),st=v.querySelector('.security-mg_stage').getBoundingClientRect();
     const spill=[...it[i].querySelectorAll('*')].some(e=>{const r=e.getBoundingClientRect();return r.right>t.right+1});
     out.cols.push({vx:Math.round(a.left),vw:Math.round(a.width),vh:Math.round(a.height),stage:[Math.round(st.width),Math.round(st.height)],tx:Math.round(t.left),tw:Math.round(t.width),th:Math.round(t.height),textSpill:spill,below:t.top>=a.bottom-1})});
   return out});
  // snap test: scroll partially and see where it settles
  const snaps=[];for(const frac of [0.4,1.3,2.6,3.5]){await q.evaluate(f=>{const L=document.getElementById('lay');const w=document.querySelector('.security-sticky_visual').getBoundingClientRect().width+16;L.scrollTo({left:w*f,behavior:'instant'})},frac);await q.waitForTimeout(400);snaps.push(await q.evaluate(()=>Math.round(document.getElementById('lay').scrollLeft)));}
  console.log(vw,pgs,JSON.stringify(r),'snaps',snaps);
  await q.evaluate(()=>document.getElementById('lay').scrollTo({left:0,behavior:'instant'}));await q.waitForTimeout(300);
  if(vw===390&&pgs==='1.25rem'){ for(const k of [0,1,3]){await q.evaluate(k=>{const L=document.getElementById('lay');const w=document.querySelector('.security-sticky_visual').getBoundingClientRect().width+16;L.scrollTo({left:w*k,behavior:'instant'})},k);await q.waitForTimeout(400);await q.locator('.container-large').screenshot({path:`sw_${k}.png`});}}
  await ctx.close();}
 const ctx=await b.newContext({viewport:{width:1440,height:900}});const q=await ctx.newPage();await q.goto('file://'+process.cwd()+'/swipe_mock.html');await q.evaluate(()=>scrollTo(0,250));await q.waitForTimeout(200);await q.screenshot({path:'desk_1440.png'});
 console.log('desk title lines',await q.evaluate(()=>[...document.querySelectorAll('.security-bento_title')].map(h=>Math.round(h.getBoundingClientRect().height/50))));
 await b.close();})();
