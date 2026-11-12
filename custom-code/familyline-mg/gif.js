const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const q=await b.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1});
await q.goto('file://'+process.cwd()+'/preview.html');await q.waitForTimeout(300);
const dur=await q.evaluate(()=>S.dur);const out=process.env.OUT;
for(const c of [1,2,3]){for(let t=0,i=0;t<dur[c];t+=100,i++){await q.evaluate(([c,t])=>seek(c,t),[c,t]);const el=await q.$('#p'+c);await el.screenshot({path:`${out}/f${c}_${String(i).padStart(3,'0')}.png`});}}
await b.close();})();
