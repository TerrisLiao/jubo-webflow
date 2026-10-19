#!/usr/bin/env node
// Browser acceptance for the native Jubo AI page (custom-code/jubo-ai-film): Webflow DOM + IX3 + GSAP + WebGL reeded glass.
// Usage: node tools/verify-jubo-ai-film.js <preview.html> [output-directory]
// Build the preview first: python3 custom-code/jubo-ai-film/build.py --shell <published page html> --cta <glass button html>
// (the shell is a saved copy of a published jubo.health page, so navbar, footer, site CSS, GSAP and Slater are real).
// The IX3 part runs through the preview's emulator, not the Webflow runtime; SwiftShader is not real GPU performance.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PREVIEW = process.argv[2] && path.resolve(process.argv[2]);
const OUT = path.resolve(process.argv[3] || '/tmp/jubo-ai-film');
if (!PREVIEW || !fs.existsSync(PREVIEW)) { console.error('Usage: node tools/verify-jubo-ai-film.js <preview.html> [out]'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });

const SCENES = ['hero', 'tech', 'data', 'secure', 'caps', 'suite', 'amy', 'ibee', 'copilot', 'next', 'close'];
const PINNED = 'amy,caps,copilot,data,hero,ibee,next,secure,suite,tech';
const BANNED = ['不用於訓練', '多因子', 'AES', '去識別化'];
const report = [];
const assert = (ok, message) => { if (!ok) throw new Error(message); };

(async () => {
  const executablePath = process.env.POC_CHROMIUM_PATH || chromium.executablePath();
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined;
  const launch = extra => chromium.launch({ executablePath, proxy, args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', ...extra] });
  const browser = await launch([]);

  async function open(b, width, height, options = {}) {
    const context = await b.newContext({ viewport: { width, height }, reducedMotion: options.reduced ? 'reduce' : 'no-preference' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/GPU stall|WebGL-|Failed to load resource/.test(m.text())) errors.push(m.text()); });
    await page.goto('file://' + PREVIEW, { waitUntil: 'networkidle', timeout: 90000 });
    await page.addStyleTag({ content: '[fs-cc="banner"]{display:none!important}' });
    await page.waitForTimeout(3500);
    return { page, context, errors };
  }
  const state = page => page.evaluate(() => ({ mode: juboAIFilm.mode, gl: juboAIFilm.gl, pins: juboAIFilm.pins.join(','), draws: juboAIFilm.draws }));
  const shot = (page, name) => page.screenshot({ path: path.join(OUT, name + '.png') });

  // 1. Desktop: pinned scrub film, WebGL on, every scene reachable, fins follow anchors.
  {
    const { page, context, errors } = await open(browser, 1440, 900);
    const s = await state(page);
    assert(s.mode === 'scrub', `desktop mode ${s.mode}`);
    assert(s.gl === 'on', `desktop gl ${s.gl}`);
    assert(s.pins === PINNED, `desktop pins ${s.pins}`);
    const dom = await page.evaluate(() => ({
      scenes: [...document.querySelectorAll('[data-film-root] [data-scene]')].map(x => x.dataset.scene),
      fins: document.querySelectorAll('[data-fin]').length, lang: document.querySelector('[data-film-root]').lang,
      text: document.querySelector('[data-film-root]').innerText, overflow: document.documentElement.scrollWidth - innerWidth,
      cta: [...document.querySelectorAll('[data-close-actions] a')].map(a => a.getAttribute('href'))
    }));
    assert(dom.scenes.join() === SCENES.join(), `scene order ${dom.scenes}`);
    assert(dom.lang === 'zh-Hant-TW', 'root lang');
    assert(dom.overflow <= 1, `desktop horizontal overflow ${dom.overflow}`);
    assert(dom.cta.includes('/contact'), `close CTA ${dom.cta}`);
    for (const w of BANNED) assert(!dom.text.includes(w), `unapproved claim on page: ${w}`);
    const before = await page.evaluate(() => juboAIFilm.fins());
    for (const name of SCENES.filter(n => PINNED.split(',').includes(n))) {
      assert(await page.evaluate(n => juboAIFilm.goTo(n, .6), name), `goTo ${name}`);
      await page.waitForTimeout(1400);
      await shot(page, `desktop-${name}`);
    }
    const after = await page.evaluate(() => juboAIFilm.fins());
    assert(JSON.stringify(before) !== JSON.stringify(after), 'fins did not morph between scenes');
    const d1 = (await state(page)).draws; await page.waitForTimeout(800);
    assert((await state(page)).draws > d1, 'WebGL loop not drawing on a visible scene');
    // Chat: a prompt button runs the illustrative conversation through to review.
    await page.evaluate(() => juboAIFilm.goTo('copilot', .95)); await page.waitForTimeout(1200);
    await page.click('[data-prompt="plan"]');
    await page.waitForFunction(() => document.querySelector('[data-chat]').dataset.status === 'ready', null, { timeout: 8000 });
    assert(await page.$eval('[data-prompt="plan"]', b => b.getAttribute('aria-pressed')) === 'true', 'prompt aria-pressed');
    await shot(page, 'desktop-chat');
    // What-if dialog: opens, traps focus on close, Esc returns focus.
    await page.evaluate(() => juboAIFilm.goTo('next', .9)); await page.waitForTimeout(1200);
    await page.click('[data-idea="time"]');
    assert(await page.$eval('[data-idea-dialog]', d => !d.hidden), 'dialog did not open');
    assert(await page.evaluate(() => document.activeElement.matches('[data-dialog-close]')), 'dialog focus');
    await shot(page, 'desktop-dialog');
    await page.keyboard.press('Escape');
    assert(await page.$eval('[data-idea-dialog]', d => d.hidden), 'Esc did not close dialog');
    assert(await page.evaluate(() => document.activeElement.matches('[data-idea="time"]')), 'focus not returned');
    assert(!errors.length, `desktop errors ${errors.join(' | ')}`);
    report.push({ check: 'desktop 1440×900', ...s, scenes: dom.scenes.length, fins: dom.fins });
    await context.close();
  }

  // 2. Short laptop and phone: no pins, time-based flow, no horizontal scroll.
  for (const [w, h] of [[1280, 600], [375, 812]]) {
    const { page, context, errors } = await open(browser, w, h);
    const s = await state(page);
    assert(s.mode === 'flow' && s.pins === '', `${w}×${h} mode ${s.mode} pins ${s.pins}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert(overflow <= 1, `${w}×${h} horizontal overflow ${overflow}`);
    await page.evaluate(() => scrollTo(0, document.querySelector('[data-scene="copilot"]').offsetTop)); await page.waitForTimeout(1500);
    await shot(page, `flow-${w}-copilot`);
    assert(!errors.length, `${w}×${h} errors ${errors.join(' | ')}`);
    report.push({ check: `flow ${w}×${h}`, ...s });
    await context.close();
  }

  // 3. Reduced motion: still mode, content visible without timelines.
  {
    const { page, context, errors } = await open(browser, 1440, 900, { reduced: true });
    const s = await state(page);
    assert(s.mode === 'still' && s.pins === '', `reduced mode ${s.mode}`);
    const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-film-root] h1,[data-film-root] h2')].filter(h => +getComputedStyle(h).opacity < .5).length);
    assert(hidden === 0, `reduced: ${hidden} headings hidden`);
    assert(!errors.length, `reduced errors ${errors.join(' | ')}`);
    report.push({ check: 'reduced motion', ...s });
    await context.close();
  }
  await browser.close();

  // 4. No WebGL: CSS frosted fins fallback.
  {
    const b = await chromium.launch({ executablePath, proxy, args: ['--disable-webgl', '--disable-3d-apis'] });
    const { page, context, errors } = await open(b, 1440, 900);
    const s = await state(page);
    assert(s.gl === 'off', `fallback gl ${s.gl}`);
    await shot(page, 'fallback-hero');
    assert(!errors.length, `fallback errors ${errors.join(' | ')}`);
    report.push({ check: 'no WebGL fallback', ...s });
    await context.close(); await b.close();
  }

  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  console.log('PASS', OUT);
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
