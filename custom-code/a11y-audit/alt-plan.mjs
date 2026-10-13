import * as cheerio from 'cheerio';
import fs from 'fs';
const files = fs.readdirSync('pages').filter(f=>f.endsWith('.html'));
const slots = {};
let total=0, empty=0;
for (const f of files) {
  const $ = cheerio.load(fs.readFileSync('pages/'+f,'utf8'));
  $('img').each((_, el) => {
    const $e = $(el); total++;
    if ((($e.attr('alt'))||'') !== '') return;
    empty++;
    const cls = ($e.attr('class')||'(no-class)').split(' ').filter(c=>!/^w-/.test(c)).join(' ') || '(no-class)';
    const par = ($e.parent().attr('class')||'').split(' ').filter(c=>!/^w-/.test(c)).slice(0,2).join(' ');
    const k = cls + '  << ' + par;
    (slots[k] ||= {n:0, pages:new Set()}); slots[k].n++; slots[k].pages.add(f);
  });
}
const rows = Object.entries(slots).sort((a,b)=>b[1].n-a[1].n);
let cum = 0; const marks = [5,10,20,30,50,80];
console.log(`total img ${total} | alt="" ${empty} | distinct slots ${rows.length}\n`);
rows.forEach(([k,v],i)=>{ cum+=v.n; if(marks.includes(i+1)) console.log(`top ${String(i+1).padStart(3)} slots cover ${String(cum).padStart(4)} / ${empty}  (${(100*cum/empty).toFixed(0)}%)`); });
console.log(`all ${rows.length} slots cover ${cum}`);
console.log('\n--- slots ranked 36..end ---');
rows.slice(35).forEach(([k,v])=>console.log(String(v.n).padStart(4), String(v.pages.size).padStart(4), k));
