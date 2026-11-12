const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const q=await b.newPage({viewport:{width:1600,height:1100}});
await q.goto('file://'+process.env.DIR+'/preview.html');
await q.addStyleTag({path:process.env.CSS});
await q.addStyleTag({content:'.panel{container-type:inline-size;width:600px!important}'});
await q.waitForTimeout(500);
for(const [c,t] of [[1,6400],[1,2700],[2,5000],[3,6200],[3,8600]]){await q.evaluate(([c,t])=>seek(c,t),[c,t]);const el=await q.$('#p'+c);await el.screenshot({path:`${process.env.OUT}/site_${c}_${t}.png`});}
await b.close();})();
