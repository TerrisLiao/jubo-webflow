import fs from 'fs';
const rows = JSON.parse(fs.readFileSync('audit-raw.json','utf8'));
const axe = JSON.parse(fs.readFileSync('axe-results.json','utf8'));
const INF = JSON.parse(fs.readFileSync('alt-informative.json','utf8'));
const axeBy = {}; axe.forEach(p => axeBy[p.url.replace(/\/$/,'')] = p);
const axeNodes = (url,id) => { const p=axeBy[url.replace(/\/$/,'')]; if(!p) return null;
  const v=p.violations.find(v=>v.id===id); return v? v.nodes : 0; };

const C = [
  ['3.1.1 lang',            3, r => !(/\/jp\//.test(r.url)) && r.htmlLang==='zh-TW'],
  ['2.4.6 one h1',          2, r => r.h1===1],
  ['1.3.1 heading order',   3, r => r.headingSkips===0 && r.headingEmpty===0],
  ['1.3.1 <main>',          3, r => r.main>=1 || r.roleMain>=1],
  ['1.3.1 <nav>',           2, r => r.nav>=1 || r.roleNav>=1 || /\/jp\/|\/demo\//.test(r.url)],
  ['1.3.1 contentinfo',     2, r => r.footer>=1 || r.roleContentinfo>=1 || /\/jp\/|\/demo\//.test(r.url)],
  ['2.4.1 skip link',       3, r => r.skipLink===1],
  ['2.4.4 link name',       4, r => r.linksEmpty===0 && r.imgLinkNoName===0 && (axeNodes(r.url,'link-name')??1)===0],
  ['1.3.1 field label',     4, r => r.fieldsUnlabeled===0],
  ['4.1.3 form status',     2, () => false],
  ['1.3.5 autocomplete',    1, r => r.fieldsNoAutocomplete===0],
  ['4.1.1 dup ids',         2, r => r.dupIds===0],
  ['1.4.3 contrast',        4, r => (axeNodes(r.url,'color-contrast')??1)===0],
  ['4.1.2 aria cmd name',   3, r => (axeNodes(r.url,'aria-command-name')??1)===0],
  ['4.1.2 disclosure',      3, r => r.ariaExpanded>0 || r.linksHashOnly===0],
  ['1.1.1 informative alt', 4, r => (INF[r.url]??0)===0],
  ['BP  region',            2, r => (axeNodes(r.url,'region')??1)===0],
  ['4.1.2 iframe title',    1, r => r.iframesNoTitle===0],
  ['1.2.2 media',           1, r => r.videoNoTrack===0],
  ['2.2.2 reduced motion',  2, () => false],
  ['2.4.7 focus ring',      3, () => false],
  ['1.3.1 table headers',   1, r => r.tablesNoTh===0],
  ['4.1.2 tab roles',       2, r => r.tabLinksNoRole===0],
];
const W = C.reduce((a,c)=>a+c[1],0);
const scored = rows.filter(r => axeBy[r.url.replace(/\/$/,'')]);
const N = scored.length;
const pass = C.map((c,i)=>scored.filter(r=>c[2](r)).length);
const base = C.reduce((a,c,i)=>a+c[1]*pass[i],0);
const pct = pts => (100*pts/(W*N)).toFixed(1)+'%';
const gain = name => { const i=C.findIndex(c=>c[0]===name); return C[i][1]*(N-pass[i]); };

console.log('基準:', pct(base), `(每頁滿分 ${W}，${N} 頁)\n`);
console.log('每條判準「全部修好」可以拿回多少分：');
C.forEach((c,i)=>{ const g=c[1]*(N-pass[i]); if(g) console.log('  +'+(100*g/(W*N)).toFixed(1)+'%  '+c[0]+`  (${pass[i]}/${N})`); });

const CONTRAST = gain('1.4.3 contrast');
const DISCLOSE = gain('4.1.2 disclosure');
const ALL = C.reduce((a,c,i)=>a+c[1]*(N-pass[i]), 0);

console.log('\n=== 上限（在三個限制下，其餘全部做完）===');
console.log('  情境 1  顏色不動 + 收合狀態不修 :', pct(base + ALL - CONTRAST - DISCLOSE), '  ← 90% 門檻:', (base+ALL-CONTRAST-DISCLOSE)/(W*N)>=0.9?'過':'不過');
console.log('  情境 2  顏色不動 + 用另外的 Webflow script 修收合狀態 :', pct(base + ALL - CONTRAST), '  ← 90% 門檻:', (base+ALL-CONTRAST)/(W*N)>=0.9?'過':'不過');
console.log('  （參考）三項都做 :', pct(base + ALL));

// 情境 2 的分階段推進
const phases = [
  ['A 組 共用元件（logo/漢堡/cookie 關閉/<main>+skip link）', ['2.4.4 link name','4.1.2 aria cmd name','2.4.1 skip link','1.3.1 <main>','BP  region']],
  ['A3+ 收合狀態（另外的 Webflow script，不動 Slater）', ['4.1.2 disclosure']],
  ['B 組 焦點框 + reduced motion（Global Style embed，不含顏色）', ['2.4.7 focus ring','2.2.2 reduced motion']],
  ['C 組 表單（label/autocomplete/aria-live/radio id）', ['1.3.1 field label','4.1.3 form status','1.3.5 autocomplete','4.1.1 dup ids']],
  ['D 組 語意（heading/h1/jp lang/iframe/影片/tab）', ['1.3.1 heading order','3.1.1 lang','4.1.2 iframe title','2.4.6 one h1','1.2.2 media','4.1.2 tab roles']],
  ['E 組 319 張 alt', ['1.1.1 informative alt']],
];
console.log('\n=== 情境 2 分階段（顏色永遠不動）===');
let run = base;
for (const [name, crits] of phases) {
  for (const cn of crits) run += gain(cn);
  const p = run/(W*N);
  console.log(`  ${pct(run)}${p>=0.9?'  ✅ 過門檻':''}  after  ${name}`);
}
