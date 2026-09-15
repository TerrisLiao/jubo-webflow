import fs from 'fs';
const rows = JSON.parse(fs.readFileSync('audit-raw.json','utf8'));
const axe = JSON.parse(fs.readFileSync('axe-results.json','utf8'));
const axeBy = {}; axe.forEach(p => axeBy[p.url.replace(/\/$/,'')] = p);
const axeNodes = (url, id) => {
  const p = axeBy[url.replace(/\/$/,'')]; if (!p) return null;
  const v = p.violations.find(v=>v.id===id); return v ? v.nodes : 0;
};
// site-wide facts established by the audit
const INF = JSON.parse(fs.readFileSync('alt-informative.json','utf8'));
const SITE = { reducedMotion: false, focusStyleGlobal: false, skipLink: false };

// slots judged DECORATIVE (alt="" is correct) from the manual pass
const DECORATIVE = new Set(['footer_path-left','big-numbers-stats-bg','hero-solutions_image','header-1_image',
  'hero-top-img','cascading-slider__img','portrait-icon','image-mask','jp-partner-hero-image','product-hero-3_image',
  'product-hero-4_image','hero-intern_img','tradeshow-image']);

const CRITERIA = [
  ['3.1.1  html lang matches content', 'A', 3, r => !(/\/jp\//.test(r.url)) && r.htmlLang === 'zh-TW'],
  ['2.4.6  exactly one h1',            'BP',2, r => r.h1 === 1],
  ['1.3.1  no heading level skips',    'A', 3, r => r.headingSkips === 0 && r.headingEmpty === 0],
  ['1.3.1  <main> landmark',           'A', 3, r => r.main >= 1 || r.roleMain >= 1],
  ['1.3.1  <nav> landmark',            'A', 2, r => r.nav >= 1 || r.roleNav >= 1 || /\/jp\/|\/demo\//.test(r.url)],
  ['1.3.1  contentinfo landmark',      'A', 2, r => r.footer >= 1 || r.roleContentinfo >= 1 || /\/jp\/|\/demo\//.test(r.url)],
  ['2.4.1  skip link',                 'A', 3, r => r.skipLink === 1],
  ['2.4.4  every link has a name',     'A', 4, r => r.linksEmpty === 0 && r.imgLinkNoName === 0 && (axeNodes(r.url,'link-name') ?? 1) === 0],
  ['1.3.1  every field has a label',   'A', 4, r => r.fieldsUnlabeled === 0],
  ['4.1.3  form status announced',     'AA',2, r => false],
  ['1.3.5  autocomplete on identity',  'AA',1, r => r.fieldsNoAutocomplete === 0],
  ['4.1.1  no duplicate ids',          'A', 2, r => r.dupIds === 0],
  ['1.4.3  contrast AA',               'AA',4, r => (axeNodes(r.url,'color-contrast') ?? 1) === 0],
  ['4.1.2  ARIA commands named',       'A', 3, r => (axeNodes(r.url,'aria-command-name') ?? 1) === 0],
  ['4.1.2  disclosure exposes state',  'A', 3, r => r.ariaExpanded > 0 || r.linksHashOnly === 0],
  ['1.1.1  informative img has alt',   'A', 4, r => (INF[r.url] ?? 0) === 0],
  ['BP     content inside landmarks',  'BP',2, r => (axeNodes(r.url,'region') ?? 1) === 0],
  ['4.1.2  iframes titled',            'A', 1, r => r.iframesNoTitle === 0],
  ['1.2.2  media alternatives',        'A', 1, r => r.videoNoTrack === 0],
  ['2.2.2  reduced motion respected',  'AA',2, () => SITE.reducedMotion],
  ['2.4.7  visible focus indicator',   'AA',3, () => SITE.focusStyleGlobal],
  ['1.3.1  tables have headers',       'A', 1, r => r.tablesNoTh === 0],
  ['4.1.2  tab widgets have roles',    'A', 2, r => r.tabLinksNoRole === 0],
];
const W = CRITERIA.reduce((a,c)=>a+c[2],0);

// only score pages axe actually visited (so contrast/region are real, not assumed)
const scored = rows.filter(r => axeBy[r.url.replace(/\/$/,'')]);
console.log('scored pages (axe-visited):', scored.length, '| total weight per page:', W, '\n');

const perCrit = CRITERIA.map(c=>({name:c[0], lvl:c[1], w:c[2], pass:0}));
let totalPts = 0;
for (const r of scored) {
  CRITERIA.forEach((c,i)=>{ if (c[3](r)) { totalPts += c[2]; perCrit[i].pass++; } });
}
const score = 100 * totalPts / (W * scored.length);
console.log('criterion'.padEnd(36), 'lvl'.padEnd(4), 'w'.padStart(2), ' pass/pages  contribution');
perCrit.forEach(c=>{
  const rate = c.pass/scored.length;
  console.log(c.name.padEnd(36), c.lvl.padEnd(4), String(c.w).padStart(2),
    ` ${String(c.pass).padStart(2)}/${scored.length}`.padEnd(12),
    (100*c.w*rate/W).toFixed(1)+' / '+(100*c.w/W).toFixed(1)+' pts');
});
console.log('\n>>> BASELINE SCORE: ' + score.toFixed(1) + '%');

// projected score after each phase
const phases = {
  'P1 global components (logo name, hamburger name, mega-menu state, cookie close, mega-menu+footer alt, skip link, <main>)':
    ['2.4.4  every link has a name','4.1.2  ARIA commands named','4.1.2  disclosure exposes state','2.4.1  skip link','1.3.1  <main> landmark','BP     content inside landmarks'],
  'P2 contrast tokens + focus ring + reduced motion':
    ['1.4.3  contrast AA','2.4.7  visible focus indicator','2.2.2  reduced motion respected'],
  'P3 forms (contact labels, autocomplete, aria-live, radio ids)':
    ['1.3.1  every field has a label','4.1.3  form status announced','1.3.5  autocomplete on identity','4.1.1  no duplicate ids'],
  'P4 content alt text + heading order + lang on /jp + iframes':
    ['1.1.1  informative img has alt','1.3.1  no heading level skips','3.1.1  html lang matches content','4.1.2  iframes titled','2.4.6  exactly one h1','1.2.2  media alternatives','4.1.2  tab widgets have roles'],
};
let cleared = new Set(); let running = totalPts;
console.log('\n--- projected cumulative score by phase ---');
for (const [name, crits] of Object.entries(phases)) {
  for (const cn of crits) {
    const i = CRITERIA.findIndex(c=>c[0]===cn);
    if (i<0) { console.log('  !! unknown criterion', cn); continue; }
    if (cleared.has(cn)) continue; cleared.add(cn);
    running += CRITERIA[i][2] * (scored.length - perCrit[i].pass);
  }
  console.log((100*running/(W*scored.length)).toFixed(1)+'%  after  '+name);
}
