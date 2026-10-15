import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('./site-head.html',import.meta.url),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function run(cookie){let calls=[];vm.runInNewContext(source,{document:{cookie},window:{},dataLayer:{push:(x)=>calls.push(Array.from(x))}});return calls[0][2];}
for(const cookie of ['', 'fs-cc=invalid', 'fs-cc=%E0%A4%A', 'fs-cc='+encodeURIComponent(JSON.stringify({consents:{analytics:'true',marketing:'true'}}))]){const d=run(cookie);assert.equal(d.analytics_storage,'denied');assert.equal(d.ad_storage,'denied');assert.equal(d.wait_for_update,500);}
for(const count of [0,1,2]){let value=JSON.stringify({consents:{analytics:true,marketing:false}});for(let i=0;i<count;i++)value=encodeURIComponent(value);const d=run('other=x; fs-cc='+value);assert.equal(d.analytics_storage,'granted');assert.equal(d.ad_storage,'denied');assert.equal(d.wait_for_update,undefined);}
console.log('PASS: unknown, malformed and non-boolean choices denied; saved analytics choice restored independently of marketing.');
