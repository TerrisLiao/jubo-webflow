import * as cheerio from 'cheerio';
import fs from 'fs';
const files = fs.readdirSync('pages').filter(f=>f.endsWith('.html'));
const byClass = {}, bySrc = {};
let total = 0, empty = 0;
for (const f of files) {
  const $ = cheerio.load(fs.readFileSync('pages/'+f,'utf8'));
  $('img').each((_, el) => {
    const $e = $(el); total++;
    if (($e.attr('alt')||'') !== '') return;
    empty++;
    const key = ($e.attr('class')||'(no-class)').split(' ').filter(c=>!/^w-/.test(c)).join(' ') || '(no-class)';
    const pkey = ($e.parent().attr('class')||'').split(' ').filter(c=>!/^w-/.test(c)).slice(0,2).join(' ');
    const k = key + '  << ' + pkey;
    (byClass[k] ||= {n:0, pages:new Set(), srcs:new Set()});
    byClass[k].n++; byClass[k].pages.add(f);
    const src = decodeURIComponent(($e.attr('src')||'').split('/').pop().split('?')[0]).slice(0,40);
    if (byClass[k].srcs.size < 4) byClass[k].srcs.add(src);
  });
}
console.log(`TOTAL <img>: ${total}   alt="": ${empty}  (${(100*empty/total).toFixed(1)}%)\n`);
console.log('n'.padStart(5), 'pages'.padStart(6), ' class  << parent');
const rows = Object.entries(byClass).sort((a,b)=>b[1].n-a[1].n);
let cum = 0;
for (const [k,v] of rows) {
  cum += v.n;
  console.log(String(v.n).padStart(5), String(v.pages.size).padStart(6), ' ', k);
  console.log(' '.repeat(14), '↳', [...v.srcs].join(' | '));
}
console.log('\ndistinct empty-alt image slots (class+parent):', rows.length);
console.log('top 5 slots account for', rows.slice(0,5).reduce((a,r)=>a+r[1].n,0), 'of', empty);
