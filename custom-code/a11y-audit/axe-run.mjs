import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'fs';

const TARGETS = [
  ['home','https://www.jubo-health.com/'],
  ['company','https://www.jubo-health.com/company'],
  ['contact','https://www.jubo-health.com/contact'],
  ['news-list','https://www.jubo-health.com/news'],
  ['news-item','https://www.jubo-health.com/news/amy-lense-intro-2026'],
  ['solution-res','https://www.jubo-health.com/solutions/residential-care'],
  ['product-vitaltrolley','https://www.jubo-health.com/products/vitaltrolley'],
  ['product-residential','https://www.jubo-health.com/products/residential-care'],
  ['customer-stories-list','https://www.jubo-health.com/customer-success-stories'],
  ['customer-story','https://www.jubo-health.com/customer-stories/daycare-story-1'],
  ['feature-item','https://www.jubo-health.com/features/jia-fang-guan-li'],
  ['ai-jubo-ai','https://www.jubo-health.com/ai/jubo-ai'],
  ['careers','https://www.jubo-health.com/careers'],
  ['login','https://www.jubo-health.com/login'],
  ['jp-overview','https://www.jubo-health.com/jp/overview'],
  ['iot-partners','https://www.jubo-health.com/resources/iot-partners'],
];

const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox','--disable-dev-shm-usage'] });
const out = [];
for (const [name, url] of TARGETS) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'zh-TW' });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch { try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch(e) { console.log('FAIL', name, e.message); await ctx.close(); continue; } }
  await page.waitForTimeout(3500);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'])
    .analyze();
  const rec = {
    name, url,
    violations: results.violations.map(v => ({ id: v.id, impact: v.impact, tags: v.tags.filter(t=>/^wcag|best-practice/.test(t)), nodes: v.nodes.length,
      help: v.help, sample: v.nodes.slice(0,3).map(n => ({ target: n.target.join(' '), html: (n.html||'').slice(0,180), msg: (n.failureSummary||'').replace(/\s+/g,' ').slice(0,200) })) })),
    passes: results.passes.length,
    incomplete: results.incomplete.map(v => ({ id: v.id, nodes: v.nodes.length, help: v.help })),
    inapplicable: results.inapplicable.length,
  };
  out.push(rec);
  const tot = rec.violations.reduce((a,v)=>a+v.nodes,0);
  console.log(name.padEnd(24), 'violations:', String(rec.violations.length).padStart(2), 'nodes:', String(tot).padStart(4), '| passes:', rec.passes, '| incomplete:', rec.incomplete.length);
  await ctx.close();
}
await browser.close();
fs.writeFileSync('axe-results.json', JSON.stringify(out, null, 1));
