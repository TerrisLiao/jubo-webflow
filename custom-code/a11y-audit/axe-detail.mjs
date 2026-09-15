import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'fs';

const TARGETS = [
  ['home','https://www.jubo-health.com/'],
  ['news-list','https://www.jubo-health.com/news'],
  ['news-item','https://www.jubo-health.com/news/amy-lense-intro-2026'],
  ['contact','https://www.jubo-health.com/contact'],
  ['product-residential','https://www.jubo-health.com/products/residential-care'],
  ['iot-partners','https://www.jubo-health.com/resources/iot-partners'],
];
const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox','--disable-dev-shm-usage'] });
const detail = { contrast: {}, linkName: {}, region: {}, ariaHiddenFocus: {}, incompleteContrast: {} };
for (const [name, url] of TARGETS) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'zh-TW' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
  await page.waitForTimeout(3000);
  const res = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
  for (const v of res.violations) {
    if (v.id === 'color-contrast') for (const n of v.nodes) {
      const m = (n.failureSummary||'').match(/contrast of ([\d.]+) \(foreground color: (#\w+), background color: (#\w+), font size: ([^,]+), font weight: (\w+)\)/);
      const cls = (n.html.match(/class="([^"]*)"/)||[])[1] || n.target.join(' ');
      const key = `${cls}|${m?m[2]:'?'}on${m?m[3]:'?'}|${m?m[1]:'?'}|${m?m[4]:''}|${m?m[5]:''}`;
      (detail.contrast[key] ||= {count:0, pages:new Set(), text:''}); detail.contrast[key].count++;
      detail.contrast[key].pages.add(name);
      if(!detail.contrast[key].text) detail.contrast[key].text = n.html.replace(/\s+/g,' ').slice(0,130);
    }
    if (v.id === 'link-name') for (const n of v.nodes) {
      const key = n.html.replace(/\s+/g,' ').slice(0,150);
      (detail.linkName[key] ||= {count:0,pages:new Set()}); detail.linkName[key].count++; detail.linkName[key].pages.add(name);
    }
    if (v.id === 'region') for (const n of v.nodes) {
      const cls = (n.html.match(/class="([^"]*)"/)||[])[1] || n.target.join(' ');
      const root = cls.split(' ')[0];
      (detail.region[root] ||= {count:0,pages:new Set()}); detail.region[root].count++; detail.region[root].pages.add(name);
    }
  }
  for (const v of res.incomplete) {
    if (v.id === 'color-contrast') for (const n of v.nodes) {
      const cls = (n.html.match(/class="([^"]*)"/)||[])[1] || n.target.join(' ');
      (detail.incompleteContrast[cls.split(' ').slice(0,3).join(' ')] ||= {count:0,pages:new Set(),msg:''});
      const d = detail.incompleteContrast[cls.split(' ').slice(0,3).join(' ')]; d.count++; d.pages.add(name);
      if(!d.msg) d.msg=(n.any?.[0]?.message||n.failureSummary||'').replace(/\s+/g,' ').slice(0,140);
    }
    if (v.id === 'aria-hidden-focus') for (const n of v.nodes) {
      const cls = (n.html.match(/class="([^"]*)"/)||[])[1] || n.target.join(' ');
      (detail.ariaHiddenFocus[cls.split(' ').slice(0,3).join(' ')] ||= {count:0,pages:new Set()});
      const d=detail.ariaHiddenFocus[cls.split(' ').slice(0,3).join(' ')]; d.count++; d.pages.add(name);
    }
  }
  await ctx.close();
}
await browser.close();
const show = (title, obj, limit=40) => {
  console.log('\n=== ' + title + ' ===');
  Object.entries(obj).sort((a,b)=>b[1].count-a[1].count).slice(0,limit).forEach(([k,v])=>{
    console.log(String(v.count).padStart(4), '|', [...v.pages].join(','), '|', k);
    if (v.text) console.log('      ', v.text);
    if (v.msg) console.log('      ', v.msg);
  });
};
show('COLOR-CONTRAST failing (class|fg on bg|ratio|size|weight)', detail.contrast);
show('LINK-NAME failing', detail.linkName);
show('REGION (content outside landmarks) by root class', detail.region, 25);
show('COLOR-CONTRAST incomplete', detail.incompleteContrast, 20);
show('ARIA-HIDDEN-FOCUS incomplete', detail.ariaHiddenFocus, 15);
