const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});const q=await ctx.newPage();
 const errs=[];q.on('pageerror',e=>errs.push(e.message));
 await q.goto('file://'+process.cwd()+'/swipe_mock_dots.html');await q.waitForTimeout(300);
 const cur=()=>q.evaluate(()=>[...document.querySelectorAll('.security-layer_dot')].findIndex(d=>d.classList.contains('is-current')));
 const out=[];out.push(['load',await cur()]);
 for(const f of [1,2,3,0]){await q.evaluate(f=>{const L=document.querySelector('.security-sticky_layout');const w=document.querySelector('.security-sticky_visual').getBoundingClientRect().width+16;L.scrollTo({left:w*f,behavior:'instant'})},f);await q.waitForTimeout(400);out.push(['swipe'+f,await cur()]);}
 for(const k of [2,3,1]){await q.locator('.security-layer_dot').nth(k).click();await q.waitForTimeout(900);out.push(['click'+k,await cur(),await q.evaluate(()=>Math.round(document.querySelector('.security-sticky_layout').scrollLeft)),await q.evaluate(()=>location.hash)]);}
 await q.locator('.security-layer_dot').nth(0).focus();await q.keyboard.press('Enter');await q.waitForTimeout(900);out.push(['key0',await cur()]);
 await q.locator('.security-layer_dot').nth(2).click();await q.waitForTimeout(900);
 await q.locator('.container-large').screenshot({path:'../dots_390.png'});
 const dsk=await b.newPage({viewport:{width:1440,height:900}});await dsk.goto('file://'+process.cwd()+'/swipe_mock_dots.html');
 out.push(['desktopDotsDisplay',await dsk.evaluate(()=>getComputedStyle(document.querySelector('.security-layer_dots')).display)]);
 console.log(JSON.stringify(out),'errors',errs);await b.close();})();
