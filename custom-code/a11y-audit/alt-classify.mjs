import * as cheerio from 'cheerio';
import fs from 'fs';

// Manual classification from reading every slot >=1 occurrence (63 slots).
// DECORATIVE  = alt="" is the CORRECT answer (pure ornament, or text duplicated adjacent)
// REDUNDANT   = image sits inside a link/card whose visible text already names it -> alt="" acceptable
// INFORMATIVE = image carries information not available as text -> alt="" is a WCAG 1.1.1 failure
const CLASSIFY = [
  [/^mega-menu-img/,                 'REDUNDANT'],   // card has visible label 我是住宿機構 etc.
  [/^footer_path-left/,              'DECORATIVE'],
  [/^big-numbers-stats-bg/,          'DECORATIVE'],  // backdrop behind a text number
  [/^hero-solutions_image/,          'DECORATIVE'],
  [/^header-1_image/,                'DECORATIVE'],
  [/^hero-top-img/,                  'DECORATIVE'],
  [/^cascading-slider__img/,         'REDUNDANT'],
  [/^hero-intern_img/,               'DECORATIVE'],
  [/^jp-partner-hero-image/,         'DECORATIVE'],
  [/^product-hero-[34]_image/,       'DECORATIVE'],
  [/^tradeshow-image/,               'DECORATIVE'],
  [/^news-content_cover-img/,        'INFORMATIVE'], // article hero: posters carry date/topic/speaker
  [/^news_cover-img/,                'REDUNDANT'],   // card title adjacent
  [/^client-story_template-img/,     'INFORMATIVE'],
  [/^cases-img/,                     'INFORMATIVE'],
  [/^stats_img/,                     'INFORMATIVE'], // America.svg / Japan.svg = region identity
  [/^icon-embed-xlarge-png/,         'REDUNDANT'],   // step label adjacent
  [/^client-logo|^logo-marquee/,     'INFORMATIVE'], // customer logos = the only identification
  [/^location-img/,                  'INFORMATIVE'],
  [/^intern-journey_img/,            'INFORMATIVE'],
  [/^is-new_ui_image|^app-image|^jubo-ai-svg-image|^ai-tech-link/, 'INFORMATIVE'], // product UI screenshots
  [/^product-hero-3_image/,          'DECORATIVE'],
  [/^image$/,                        'INFORMATIVE'],
];
const parentRule = [
  [/tab-layout__col is-product/,     'INFORMATIVE'], // product screenshots, no class on img
  [/portrait-icon/,                  'DECORATIVE'],
  [/image-mask|hero-customer-story_image_mask/, 'DECORATIVE'],
  [/image-wrapper/,                  'INFORMATIVE'],
  [/product-hero_center-wrap/,       'DECORATIVE'],
];
function classify(cls, parent) {
  for (const [re, v] of CLASSIFY) if (re.test(cls)) return v;
  for (const [re, v] of parentRule) if (re.test(parent)) return v;
  return 'INFORMATIVE'; // unclassified (rich-text body images from the WP import) -> treat as informative
}

const files = fs.readdirSync('pages').filter(f=>f.endsWith('.html'));
const out = {}; const tally = { DECORATIVE:0, REDUNDANT:0, INFORMATIVE:0 };
const infSlots = {};
for (const f of files) {
  const $ = cheerio.load(fs.readFileSync('pages/'+f,'utf8'));
  const url = 'https://www.jubo-health.com' + (f === '_home.html' ? '/' : f.replace(/\.html$/,'').replace(/_/g,'/'));
  let inf = 0;
  $('img').each((_, el) => {
    const $e = $(el); if ((($e.attr('alt'))||'') !== '') return;
    const cls = ($e.attr('class')||'').split(' ').filter(c=>!/^w-/.test(c)).join(' ');
    const par = ($e.parent().attr('class')||'');
    const v = classify(cls, par); tally[v]++;
    if (v === 'INFORMATIVE') { inf++; const k = (cls||'(no-class) << '+par.split(' ').slice(0,2).join(' ')); (infSlots[k] ||= {n:0,pages:new Set()}); infSlots[k].n++; infSlots[k].pages.add(f); }
  });
  out[url] = inf;
}
fs.writeFileSync('alt-informative.json', JSON.stringify(out, null, 1));
console.log('empty-alt classification across 156 pages:');
console.log(tally, ' total', Object.values(tally).reduce((a,b)=>a+b,0));
console.log('\npages with >=1 INFORMATIVE empty alt:', Object.values(out).filter(n=>n>0).length, '/ 156');
console.log('\nINFORMATIVE slots to fix (n, pages, slot):');
Object.entries(infSlots).sort((a,b)=>b[1].n-a[1].n).forEach(([k,v])=>console.log(String(v.n).padStart(4), String(v.pages.size).padStart(4), k));
