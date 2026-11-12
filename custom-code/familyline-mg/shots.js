const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const q=await b.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1});
await q.goto('file://'+process.cwd()+'/preview.html');await q.waitForTimeout(300);
const T=JSON.parse(process.env.T);
for(const [c,ts] of Object.entries(T)){for(const t of ts){await q.evaluate(([c,t])=>seek(+c,t),[c,t]);const el=await q.$('#p'+c);await el.screenshot({path:`shot_${c}_${t}.png`});}}
await q.evaluate(()=>rest());for(const c of [1,2,3]){const el=await q.$('#p'+c);await el.screenshot({path:`rest_${c}.png`});}
await b.close();})();
