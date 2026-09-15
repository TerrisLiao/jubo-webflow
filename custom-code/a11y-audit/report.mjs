import fs from 'fs';
const rows = JSON.parse(fs.readFileSync('audit-raw.json','utf8'));
const sum = k => rows.reduce((a,r)=>a+(r[k]||0),0);
const pagesWith = k => rows.filter(r=>(r[k]||0)>0).length;
const group = r => {
  const u = r.url;
  if (/\/news\//.test(u)) return 'news-item';
  if (/\/customer-stories\//.test(u)) return 'customer-story';
  if (/\/features\//.test(u)) return 'feature-item';
  if (/\/products\//.test(u)) return 'product';
  if (/\/solutions\//.test(u)) return 'solution';
  if (/\/demo\//.test(u)) return 'demo';
  if (/\/jp\//.test(u)) return 'jp';
  if (/\/ai\//.test(u)) return 'ai';
  if (/\/ecosystem\/|\/resources\//.test(u)) return 'eco-res';
  return 'top-level';
};
const groups = {};
rows.forEach(r => { (groups[group(r)] ||= []).push(r); });

console.log('=== TOTALS across', rows.length, 'live pages ===');
const keys = ['img','imgNoAltAttr','imgAltEmpty','imgAltMeaningless','imgAltOk','imgLinkNoName','svg','svgUnlabeled',
 'forms','fields','fieldsUnlabeled','fieldsPlaceholderOnly','fieldsNoAutocomplete','radioCheckbox','fieldsets','submitNoName',
 'main','article','nav','header','footer','aside','section','roleMain','roleNav','roleBanner','roleContentinfo','time',
 'h1','headings','headingEmpty','headingSkips','fauxHeading','links','linksEmpty','linksGeneric','linksNewTabNoWarn','linksHashOnly','skipLink',
 'buttons','buttonsNoName','roleButtonDivs','divOnClick','tabindexPositive','ariaLabel','ariaLabelledby','ariaHidden','ariaExpanded','ariaCurrent','ariaLive','roleAttrs',
 'tables','tablesNoTh','iframes','iframesNoTitle','video','videoNoTrack','audio','autoplay','dupIds','wTabs','tabLinks','tabLinksNoRole','dropdownToggles','dropdownNoExpanded','sliders','lightbox'];
for (const k of keys) console.log(k.padEnd(22), String(sum(k)).padStart(6), '  pages>0:', pagesWith(k));

console.log('\n=== ALT by group ===');
console.log('group'.padEnd(16),'pages','  img','  noAttr',' empty',' meaningless','  ok','  emptyRate');
for (const [g, rs] of Object.entries(groups)) {
  const s = k => rs.reduce((a,r)=>a+(r[k]||0),0);
  const img = s('img');
  console.log(g.padEnd(16), String(rs.length).padStart(5), String(img).padStart(5), String(s('imgNoAltAttr')).padStart(7), String(s('imgAltEmpty')).padStart(6), String(s('imgAltMeaningless')).padStart(11), String(s('imgAltOk')).padStart(5), '  ' + (img? (100*(s('imgAltEmpty')+s('imgNoAltAttr'))/img).toFixed(0):0)+'%');
}

console.log('\n=== LANDMARKS by group (avg per page) ===');
console.log('group'.padEnd(16),'main','article','nav','header','footer','section','mainWrapperTag');
for (const [g, rs] of Object.entries(groups)) {
  const s = k => rs.reduce((a,r)=>a+(r[k]||0),0);
  const tags = [...new Set(rs.map(r=>r.mainWrapperTag))].join('/');
  console.log(g.padEnd(16), String(s('main')).padStart(4), String(s('article')).padStart(7), String(s('nav')).padStart(3), String(s('header')).padStart(6), String(s('footer')).padStart(6), String(s('section')).padStart(7), ' ', tags);
}

console.log('\n=== HEADING ISSUES (pages with skips or 0/2+ h1) ===');
rows.filter(r=>r.headingSkips>0 || r.h1!==1).slice(0,40).forEach(r=>console.log(String(r.h1).padStart(2),'h1 |', String(r.headingSkips).padStart(2),'skips |', r.headingSkipDetail.padEnd(28), r.url.replace('https://www.jubo-health.com','')));
console.log('total pages with heading skips:', rows.filter(r=>r.headingSkips>0).length, '| pages with h1!=1:', rows.filter(r=>r.h1!==1).length);

console.log('\n=== FORMS ===');
rows.filter(r=>r.fields>0).forEach(r=>console.log(String(r.forms),'form', String(r.fields).padStart(2),'fields', String(r.fieldsUnlabeled).padStart(2),'unlabeled', String(r.fieldsPlaceholderOnly).padStart(2),'ph-only |', r.url.replace('https://www.jubo-health.com','')));
console.log('\nsample unlabeled fields:');
const seenF = new Set();
rows.forEach(r => r.fieldSamples.forEach(s => { const k = JSON.stringify(s); if(!seenF.has(k)&&seenF.size<30){seenF.add(k);console.log(' ', k);} }));

console.log('\n=== htmlLang distribution ===');
const lang = {}; rows.forEach(r=>lang[r.htmlLang]=(lang[r.htmlLang]||0)+1); console.log(lang);
console.log('\n=== dup ids sample ===');
rows.filter(r=>r.dupIds>0).slice(0,10).forEach(r=>console.log(r.dupIds, r.dupIdSamples, '|', r.url.replace('https://www.jubo-health.com','')));
console.log('pages with dup ids:', rows.filter(r=>r.dupIds>0).length);
