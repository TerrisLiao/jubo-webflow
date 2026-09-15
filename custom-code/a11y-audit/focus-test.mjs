import { chromium } from 'playwright';
const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox','--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'zh-TW' });
const page = await ctx.newPage();
await page.goto('https://www.jubo-health.com/contact', { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
await page.waitForTimeout(2500);
// Tab through the first 25 focusable elements and record the focus ring
const out = await page.evaluate(() => {
  const sel = 'a[href], button, input:not([type=hidden]), select, textarea, [tabindex]:not([tabindex="-1"])';
  const els = [...document.querySelectorAll(sel)].filter(e => e.offsetParent !== null || e.getClientRects().length);
  const res = [];
  for (const el of els.slice(0, 30)) {
    el.focus();
    const cs = getComputedStyle(el);
    res.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.className || '').toString().slice(0, 44),
      outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor,
      boxShadow: cs.boxShadow === 'none' ? '' : cs.boxShadow.slice(0, 40),
      borderBottom: cs.borderBottomWidth + ' ' + cs.borderBottomColor,
      focused: document.activeElement === el,
    });
  }
  return res;
});
console.log('tag'.padEnd(9), 'outline(style/width/color)'.padEnd(42), 'boxShadow'.padEnd(20), 'class');
let noRing = 0;
for (const r of out) {
  const ring = `${r.outlineStyle}/${r.outlineWidth}/${r.outlineColor}`;
  const visible = r.outlineStyle !== 'none' && parseFloat(r.outlineWidth) > 0 || r.boxShadow;
  if (!visible) noRing++;
  console.log(r.tag.padEnd(9), ring.padEnd(42), (r.boxShadow||'-').padEnd(20), (visible?'OK  ':'NONE') , r.cls);
}
console.log(`\n${noRing} of ${out.length} focusable elements have NO visible focus indicator`);
await browser.close();
