import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const dir = 'pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const urlFor = f => 'https://www.jubo-health.com' + (f === '_home.html' ? '/' : f.replace(/\.html$/,'').replace(/_/g,'/'));

const GENERIC_LINK = ['點此','點我','了解更多','更多','read more','more','click here','here','看更多','詳情','立即','了解','查看','link','連結'];
const MEANINGLESS_ALT = /^(image|img|photo|picture|icon|logo|圖片|圖|照片|banner|vector|frame|group|rectangle|ellipse|mask group|layer|asset|untitled|未命名|screenshot|shape)\b|^[\w\-. ()]+\.(png|jpe?g|svg|gif|webp|avif)$|^(group|frame|rectangle|ellipse|vector|mask group|layer)\s*\d*$/i;

const rows = [];
for (const f of files) {
  const html = fs.readFileSync(path.join(dir, f), 'utf8');
  const $ = cheerio.load(html);
  const r = { file: f, url: urlFor(f), bytes: html.length };

  // --- lang / title ---
  r.htmlLang = $('html').attr('lang') || '';
  r.title = ($('title').first().text() || '').trim();
  r.langAttrsElsewhere = $('[lang]').length - ($('html').attr('lang') ? 1 : 0);

  // --- images ---
  const imgs = $('img');
  r.img = imgs.length;
  r.imgNoAltAttr = 0; r.imgAltEmpty = 0; r.imgAltOk = 0; r.imgAltMeaningless = 0;
  r.altMeaninglessSamples = []; r.altEmptySamples = [];
  imgs.each((_, el) => {
    const a = $(el).attr('alt');
    const src = ($(el).attr('src')||'').split('/').pop().split('?')[0];
    const inLink = $(el).closest('a').length > 0;
    const linkHasText = inLink ? ($(el).closest('a').text().trim().length > 0) : false;
    if (a === undefined) { r.imgNoAltAttr++; }
    else if (a.trim() === '') { r.imgAltEmpty++; if (r.altEmptySamples.length < 6) r.altEmptySamples.push({src, inLink, linkHasText}); }
    else if (MEANINGLESS_ALT.test(a.trim())) { r.imgAltMeaningless++; if (r.altMeaninglessSamples.length < 6) r.altMeaninglessSamples.push(a.trim()); }
    else r.imgAltOk++;
  });
  // image inside link where link has no other text and img alt empty -> definite failure (WCAG 2.4.4 + 1.1.1)
  r.imgLinkNoName = 0; r.imgLinkNoNameSamples = [];
  $('a').each((_, a) => {
    const $a = $(a);
    const txt = $a.text().replace(/\s+/g,'').trim();
    if (txt) return;
    const $imgs = $a.find('img');
    if ($imgs.length === 0) return;
    const named = $imgs.toArray().some(i => ($(i).attr('alt')||'').trim() !== '');
    const aria = $a.attr('aria-label') || $a.attr('aria-labelledby') || $a.attr('title');
    if (!named && !aria) { r.imgLinkNoName++; if (r.imgLinkNoNameSamples.length<5) r.imgLinkNoNameSamples.push(($a.attr('href')||'').slice(0,60)); }
  });

  // --- inline svg ---
  const svgs = $('svg');
  r.svg = svgs.length;
  r.svgUnlabeled = 0;
  svgs.each((_, el) => {
    const $s = $(el);
    if ($s.attr('aria-hidden') === 'true') return;
    if ($s.attr('role') === 'presentation' || $s.attr('role') === 'none') return;
    if ($s.attr('aria-label') || $s.find('title').length) return;
    r.svgUnlabeled++;
  });

  // --- forms ---
  r.forms = $('form').length;
  const fields = $('input, select, textarea').toArray().filter(el => {
    const t = ($(el).attr('type')||'').toLowerCase();
    return !['hidden','submit','button','image','reset'].includes(t);
  });
  r.fields = fields.length;
  r.fieldsUnlabeled = 0; r.fieldsPlaceholderOnly = 0; r.fieldSamples = [];
  r.fieldsNoAutocomplete = 0;
  for (const el of fields) {
    const $e = $(el);
    const id = $e.attr('id');
    const hasFor = id ? $(`label[for="${id.replace(/"/g,'')}"]`).length > 0 : false;
    const wrapped = $e.closest('label').length > 0;
    const aria = $e.attr('aria-label') || $e.attr('aria-labelledby');
    const ph = $e.attr('placeholder');
    const title = $e.attr('title');
    const type = ($e.attr('type')||$e.get(0).tagName).toLowerCase();
    const name = $e.attr('name')||'';
    if (!hasFor && !wrapped && !aria) {
      r.fieldsUnlabeled++;
      if (ph || title) r.fieldsPlaceholderOnly++;
      if (r.fieldSamples.length < 12) r.fieldSamples.push({type, name, id: id||'', placeholder: ph||'', title: title||'', form: $e.closest('form').attr('id')|| $e.closest('form').attr('name')||''});
    }
    if (['text','email','tel','name','organization'].includes(type) && !$e.attr('autocomplete')) r.fieldsNoAutocomplete++;
  }
  // required fields without aria-required/required
  r.fieldsRequiredMarked = $('input[required], select[required], textarea[required], [aria-required="true"]').length;
  // fieldset/legend for radio+checkbox groups
  r.radioCheckbox = $('input[type=radio], input[type=checkbox]').length;
  r.fieldsets = $('fieldset').length;
  // submit buttons without value/text
  r.submitNoName = $('input[type=submit]').toArray().filter(el => !($(el).attr('value')||'').trim() && !$(el).attr('aria-label')).length;

  // --- landmarks / semantics ---
  r.main = $('main').length; r.article = $('article').length; r.nav = $('nav').length;
  r.header = $('header').length; r.footer = $('footer').length; r.aside = $('aside').length;
  r.section = $('section').length; r.roleMain = $('[role=main]').length;
  r.roleNav = $('[role=navigation]').length; r.roleBanner = $('[role=banner]').length;
  r.roleContentinfo = $('[role=contentinfo]').length;
  r.div = $('div').length;
  r.hasMainWrapper = $('.main-wrapper').length;
  r.mainWrapperTag = $('.main-wrapper').first().get(0)?.tagName || '';
  r.navTagOfNavbar = $('.navbar_component, [class*=navbar]').first().get(0)?.tagName || '';
  r.footerTag = $('[class*=footer]').first().get(0)?.tagName || '';
  r.time = $('time').length;
  r.ul = $('ul').length; r.ol = $('ol').length;

  // --- headings ---
  const hs = $('h1,h2,h3,h4,h5,h6').toArray().map(el => ({lvl: +el.tagName[1], text: $(el).text().replace(/\s+/g,' ').trim()}));
  r.h1 = hs.filter(h=>h.lvl===1).length;
  r.headings = hs.length;
  r.headingEmpty = hs.filter(h=>!h.text).length;
  r.headingSeq = hs.map(h=>h.lvl).join(',');
  let skips = [], prev = 0;
  hs.forEach((h,i) => { if (prev && h.lvl > prev + 1) skips.push(`${prev}->${h.lvl}@${i}`); prev = h.lvl; });
  r.headingSkips = skips.length; r.headingSkipDetail = skips.slice(0,6).join(' ');
  r.h2Count = hs.filter(h=>h.lvl===2).length;
  r.firstHeading = hs[0]?.lvl || 0;
  // heading-like: div/p with big text class used instead of heading
  r.fauxHeading = $('.heading-style-h1, .heading-style-h2, .heading-style-h3, .heading-style-h4, .heading-style-h5, .heading-style-h6').toArray()
    .filter(el => !/^h[1-6]$/i.test(el.tagName)).length;

  // --- links ---
  const links = $('a').toArray();
  r.links = links.length;
  r.linksEmpty = 0; r.linksGeneric = 0; r.linksNewTabNoWarn = 0; r.linksHashOnly = 0;
  r.genericSamples = [];
  for (const el of links) {
    const $a = $(el);
    const txt = $a.text().replace(/\s+/g,' ').trim();
    const acc = txt || $a.attr('aria-label') || $a.attr('title') || '';
    const href = $a.attr('href')||'';
    if (!acc && $a.find('img,svg').length === 0) r.linksEmpty++;
    if (acc && GENERIC_LINK.some(g => acc.toLowerCase() === g.toLowerCase())) { r.linksGeneric++; if (r.genericSamples.length<5) r.genericSamples.push(acc); }
    if ($a.attr('target') === '_blank' && !/新視窗|new window|開新|external/i.test(($a.attr('aria-label')||'') + txt)) r.linksNewTabNoWarn++;
    if (href === '#') r.linksHashOnly++;
  }
  r.skipLink = $('a[href^="#"]').toArray().some(el => /跳至|skip to|主要內容|main content/i.test($(el).text())) ? 1 : 0;

  // --- buttons / interactive divs ---
  r.buttons = $('button').length;
  r.buttonsNoName = $('button').toArray().filter(el => !$(el).text().trim() && !$(el).attr('aria-label') && !$(el).attr('title')).length;
  r.roleButtonDivs = $('div[role=button], span[role=button]').length;
  r.divOnClick = $('[onclick]').toArray().filter(el => !['a','button','input'].includes(el.tagName)).length;
  r.tabindexPositive = $('[tabindex]').toArray().filter(el => +($(el).attr('tabindex')) > 0).length;

  // --- aria usage ---
  r.ariaLabel = $('[aria-label]').length;
  r.ariaLabelledby = $('[aria-labelledby]').length;
  r.ariaHidden = $('[aria-hidden]').length;
  r.ariaExpanded = $('[aria-expanded]').length;
  r.ariaCurrent = $('[aria-current]').length;
  r.ariaLive = $('[aria-live]').length;
  r.roleAttrs = $('[role]').length;

  // --- tables, media, iframes ---
  r.tables = $('table').length;
  r.tablesNoTh = $('table').toArray().filter(el => $(el).find('th').length === 0).length;
  r.iframes = $('iframe').length;
  r.iframesNoTitle = $('iframe').toArray().filter(el => !($(el).attr('title')||'').trim()).length;
  r.video = $('video').length; r.audio = $('audio').length;
  r.videoNoTrack = $('video').toArray().filter(el => $(el).find('track').length===0).length;
  r.autoplay = $('[autoplay]').length;

  // --- duplicate ids ---
  const ids = $('[id]').toArray().map(el => $(el).attr('id'));
  const seen = new Map(); const dups = [];
  ids.forEach(i => { seen.set(i,(seen.get(i)||0)+1); });
  for (const [k,v] of seen) if (v>1) dups.push(`${k}(${v})`);
  r.dupIds = dups.length; r.dupIdSamples = dups.slice(0,6).join(', ');

  // --- tab/accordion widgets ---
  r.wTabs = $('.w-tabs, [class*=w-tab-menu]').length;
  r.tabLinks = $('.w-tab-link').length;
  r.tabLinksNoRole = $('.w-tab-link').toArray().filter(el => $(el).attr('role') !== 'tab').length;
  r.dropdownToggles = $('.w-dropdown-toggle').length;
  r.dropdownNoExpanded = $('.w-dropdown-toggle').toArray().filter(el => $(el).attr('aria-expanded') === undefined).length;
  r.sliders = $('.w-slider').length;
  r.lightbox = $('.w-lightbox').length;

  rows.push(r);
}

fs.writeFileSync('audit-raw.json', JSON.stringify(rows, null, 1));
console.log('pages audited:', rows.length);
