#!/usr/bin/env node
// Browser acceptance for the Jubo AI v11 (borderless reeded-glass fins, security-style tech map, gradient icons).
// Usage: node tools/verify-jubo-ai-v11.js [output-directory] [preview-fixture.html]
// Opens the canonical file directly (file://). Requires Node Playwright and Chromium;
// set POC_CHROMIUM_PATH to override the browser. HTTPS assets go through the
// environment's existing proxy; no browser security settings are changed.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const URL = 'file://' + path.join(ROOT, 'custom-code/poc/jubo-ai-agentic-v11.html');
const OUT = path.resolve(process.argv[2] || '/tmp/v11');
const FIXTURE = process.argv[3] ? path.resolve(process.argv[3]) : null;
fs.mkdirSync(OUT, { recursive: true });

const QUESTIONS = ['如果變化能更早被看見？', '如果團隊能多一點時間陪伴長輩？', '如果主管能更清楚看見全貌？'];
const PINNED = 'amy,caps,copilot,data,ibee,next,secure,tech';
const report = [];
const assert = (ok, message) => { if (!ok) throw new Error(message); };

(async () => {
  const executablePath = process.env.POC_CHROMIUM_PATH || chromium.executablePath();
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined;
  const browser = await chromium.launch({ executablePath, proxy, args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });

  async function open(width, options = {}, url = URL) {
    const height = options.height || (width >= 768 ? 900 : 812);
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: options.dpr || 1, reducedMotion: options.reduced ? 'reduce' : 'no-preference' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/GPU stall|WebGL-/.test(m.text())) errors.push(m.text()); });
    if (options.blockThree) await page.route('**/three.min.js', route => route.abort());
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    return { page, context, errors };
  }
  const goTo = async (page, id, progress, wait = 1400) => { await page.evaluate(([id, p]) => juboAIVisual.goTo(id, p), [id, progress]); await page.waitForTimeout(wait); };
  const scenes = page => page.evaluate(() => juboAIVisual.scenes);
  const opacity = (page, sel) => page.evaluate(s => Number(getComputedStyle(document.querySelector(s)).opacity), sel);

  for (const width of [1440, 991, 767, 375]) {
    const { page, context, errors } = await open(width);
    const scrub = width >= 768;
    const base = await page.evaluate(() => ({
      lang: document.documentElement.lang, webgl: document.documentElement.dataset.webgl, scrub: document.documentElement.dataset.scrub,
      canvases: document.querySelectorAll('canvas').length, calls: juboAIVisual.drawCalls, gsap: !!window.gsap,
      overflow: document.documentElement.scrollWidth - innerWidth, pinned: juboAIVisual.pinned.join(','),
      circle: !!document.querySelector('[data-orb-anchor]'), cta: document.querySelector('a.glass-button').textContent.trim(),
      purple: /#(?:8f5bff|7438ee|b15dff|2747e6)/i.test(document.documentElement.outerHTML), paper: getComputedStyle(document.body).backgroundColor,
      media: [...document.querySelectorAll('[data-media]')].map(m => { const c = getComputedStyle(m); return c.borderTopWidth + ' ' + c.borderTopLeftRadius + ' ' + c.boxShadow; }),
      heroWidth: document.querySelector('[data-media="hero"]').getBoundingClientRect().width / innerWidth,
      icons: document.querySelectorAll('.jubo-ai_gicon').length, lines: juboAIVisual.techLines,
    }));
    assert(base.lang === 'zh-Hant-TW' && base.webgl === 'ready' && base.gsap, `${width}: language, WebGL or GSAP`);
    assert(base.scrub === String(scrub) && base.pinned === (scrub ? PINNED : ''), `${width}: scrub ${base.scrub} pinned ${base.pinned}`);
    assert(base.canvases === 1 && base.calls === 1 && !base.circle, `${width}: one canvas, one draw call, no circle`);
    assert(base.overflow <= 0 && base.cta === '預約諮詢', `${width}: overflow ${base.overflow} / CTA ${base.cta}`);
    assert(!base.purple && base.paper === 'rgb(246, 245, 241)', `${width}: palette ${base.purple} ${base.paper}`);
    assert(base.media.every(m => m === '0px 0px none') && base.heroWidth > .97, `${width}: borderless full-bleed media ${base.media} ${base.heroWidth}`);
    assert(base.icons === 9 && base.lines === 4, `${width}: ${base.icons} gradient icons, ${base.lines} tech lines`);

    // Thinking light loops and the status line keeps typing.
    const t0 = await page.evaluate(() => [juboAIVisual.time, juboAIVisual.scenes.think]);
    await page.waitForTimeout(2600);
    const t1 = await page.evaluate(() => [juboAIVisual.time, juboAIVisual.scenes.think]);
    assert(t1[0] - t0[0] > .5 && t1[1] !== t0[1], `${width}: loop ${t0} -> ${t1}`);
    await page.screenshot({ path: `${OUT}/${width}-hero.png` });
    if (width >= 991) {
      const panel = await page.locator('[data-media="hero"]').boundingBox();
      const y = panel.y + panel.height * .5;
      await page.mouse.move(panel.x + panel.width * .15, y, { steps: 5 }); await page.waitForTimeout(700);
      const a = await page.evaluate(() => juboAIVisual.pointer);
      await page.mouse.move(panel.x + panel.width * .85, y, { steps: 5 }); await page.waitForTimeout(700);
      const b = await page.evaluate(() => juboAIVisual.pointer);
      const m = await page.evaluate(() => juboAIVisual.media);
      assert(a.on > .5 && b.x - a.x > panel.width * .4 && m.name === 'hero' && m.on > .9, `${width}: pointer ${JSON.stringify([a, b, m])}`);
      await page.mouse.click(panel.x + panel.width * .5, y);
    }

    if (scrub) {
      await goTo(page, 'tech', .14);
      assert(await opacity(page, '[data-tech="a"]') > .85, `${width} tech: line A`);
      await goTo(page, 'tech', 1);
      const drawn = await page.evaluate(() => [juboAIVisual.techReady, [...document.querySelectorAll('[data-tech-path]')].map(p => parseFloat(p.style.strokeDashoffset))]);
      assert(drawn[0] && drawn[1].every(o => o < 1), `${width} tech: lines drawn ${JSON.stringify(drawn)}`);
      assert(await opacity(page, '[data-tech-core]') > .85 && await opacity(page, '[data-tech="caption"]') > .85, `${width} tech: map`);
      await page.screenshot({ path: `${OUT}/${width}-tech.png` });
      await goTo(page, 'data', .98);
      assert(await opacity(page, '[data-data="stats"]') > .85, `${width} data: stats`);
      await page.screenshot({ path: `${OUT}/${width}-data.png` });
      await goTo(page, 'secure', .02);
      const few = (await scenes(page)).checks;
      await goTo(page, 'secure', .95);
      const all = (await scenes(page)).checks;
      assert(few < 3 && all === 8, `${width} secure: checks ${few} -> ${all}`);
      if (width >= 991) {
        const box = await page.locator('[data-lens]').boundingBox();
        await page.mouse.move(box.x + 30, box.y + box.height / 2); await page.waitForTimeout(200);
        const l1 = await page.evaluate(() => document.querySelector('[data-lens]').style.getPropertyValue('--lx'));
        await page.mouse.move(box.x + box.width - 30, box.y + box.height / 2, { steps: 4 }); await page.waitForTimeout(200);
        const l2 = await page.evaluate(() => document.querySelector('[data-lens]').style.getPropertyValue('--lx'));
        assert(parseFloat(l2) > parseFloat(l1) + 100, `${width} lens ${l1} -> ${l2}`);
      }
      await page.screenshot({ path: `${OUT}/${width}-secure.png` });
      for (let i = 0; i < 5; i++) { await goTo(page, 'caps', (i + .5) / 5, 900); assert((await scenes(page)).cap === i, `${width} caps ${i}`); }
      await page.screenshot({ path: `${OUT}/${width}-caps.png` });
      await goTo(page, 'amy', .97);
      assert((await scenes(page)).amy === 5, `${width} amy`);
      await page.screenshot({ path: `${OUT}/${width}-amy.png` });
      await goTo(page, 'ibee', .97);
      assert(await page.evaluate(() => document.querySelectorAll('.jubo-ai_ibee-col.is-right span[data-on="true"]').length) === 3, `${width} ibee`);
      await page.screenshot({ path: `${OUT}/${width}-ibee.png` });
      await goTo(page, 'copilot', .05);
      assert(!(await scenes(page)).chatOpen && await opacity(page, '[data-chat]') < .1 && (await page.evaluate(() => juboAIVisual.media.name)) !== 'copilot', `${width} copilot closed first`);
      await goTo(page, 'copilot', .7, 2000);
      assert((await scenes(page)).chatOpen && (await page.evaluate(() => juboAIVisual.media.name)) === 'copilot', `${width} copilot opens with its panel`);
      await page.waitForSelector('.jubo-ai_review-button', { timeout: 12000 });
      await page.screenshot({ path: `${OUT}/${width}-copilot.png` });
      for (let i = 0; i < 3; i++) { await goTo(page, 'next', (i + .6) / 3, 900); assert((await scenes(page)).question === QUESTIONS[i], `${width} next ${i}`); }
    } else {
      const s = await scenes(page);
      assert(s.chatOpen && s.checks === 8 && s.amy === 5, `${width}: flow states ${JSON.stringify(s)}`);
      await page.locator('.jubo-ai_question').scrollIntoViewIfNeeded();
      const q1 = (await scenes(page)).question; await page.waitForTimeout(4500);
      assert((await scenes(page)).question !== q1, `${width}: question typer`);
    }

    // Conversation examples, sources, review, rapid switching.
    await page.locator('[data-chat]').scrollIntoViewIfNeeded();
    for (const prompt of ['interview', 'plan', 'summary']) {
      await page.click(`[data-prompt="${prompt}"]`);
      await page.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
      await page.click('.jubo-ai_chat-sources summary');
      await page.click('.jubo-ai_review-button');
      assert(await page.locator('[data-chat]').getAttribute('data-status') === 'reviewed', `${width}: ${prompt} reviewed`);
    }
    await page.click('[data-prompt="interview"]'); await page.waitForTimeout(150);
    await page.click('[data-chat-send]');
    await page.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
    const outs = await page.evaluate(() => [...document.querySelectorAll('.jubo-ai_chat-output strong')].map(e => e.textContent));
    assert(outs.length === 1 && outs[0] === '訪談重點', `${width}: rapid switch ${outs}`);

    if (scrub) await goTo(page, 'next', .5, 900); else await page.locator('[data-idea-current]').scrollIntoViewIfNeeded();
    await page.locator('[data-idea-current]').focus();
    await page.keyboard.press('Enter');
    assert(await page.evaluate(() => document.querySelector('[data-idea-dialog]').open), `${width}: idea opens`);
    await page.keyboard.press('Shift+Tab');
    assert(await page.evaluate(() => document.querySelector('[data-idea-dialog]').contains(document.activeElement)), `${width}: focus trapped`);
    await page.keyboard.press('Escape');
    assert(await page.evaluate(() => document.activeElement.matches('[data-idea-current]')), `${width}: focus returns`);

    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(900);
    await page.click('[data-motion-toggle]');
    const p0 = await page.evaluate(() => [juboAIVisual.draws, juboAIVisual.time, juboAIVisual.scenes.think]);
    await page.waitForTimeout(1500);
    const p1 = await page.evaluate(() => [juboAIVisual.draws, juboAIVisual.time, juboAIVisual.scenes.think]);
    assert(p1[0] <= p0[0] + 1 && p1[1] === p0[1] && p1[2] === p0[2], `${width}: pause ${p0} -> ${p1}`);
    await page.click('[data-motion-toggle]'); await page.waitForTimeout(600);
    assert(await page.evaluate(() => juboAIVisual.draws) > p1[0] + 3, `${width}: resume`);
    assert(errors.length === 0, `${width}: errors ${errors.join(' | ')}`);
    report.push({ width, ...base, result: 'pass' });
    await context.close();
  }

  for (const width of [1440, 375]) {
    const { page, context, errors } = await open(width, { reduced: true });
    const s = await page.evaluate(() => ({ scrub: document.documentElement.dataset.scrub, pinned: juboAIVisual.pinned.length, think: juboAIVisual.scenes.think, ideas: [...document.querySelectorAll('.jubo-ai_idea-list button')].filter(b => b.getClientRects().length).length, ...juboAIVisual.scenes }));
    const d0 = await page.evaluate(() => juboAIVisual.draws);
    await page.waitForTimeout(1200);
    assert(s.scrub === 'false' && s.pinned === 0 && s.ideas === 3 && s.checks === 8 && s.chatOpen && s.amy === 5, `reduced ${width}: ${JSON.stringify(s)}`);
    assert(await page.evaluate(() => juboAIVisual.draws) <= d0 + 1 && (await scenes(page)).think === s.think, `reduced ${width}: idle`);
    await page.locator('.jubo-ai_idea-list button').first().click();
    assert(await page.evaluate(() => document.querySelector('[data-idea-dialog]').open), `reduced ${width}: idea list`);
    await page.keyboard.press('Escape');
    assert(errors.length === 0, `reduced ${width}: errors`);
    await page.screenshot({ path: `${OUT}/reduced-${width}.png` });
    report.push({ width, reducedMotion: 'pass' });
    await context.close();
  }
  for (const [width, cap] of [[1440, 1.5], [375, 1.25]]) {
    const { page, context } = await open(width, { dpr: 3 });
    const dpr = await page.evaluate(() => juboAIVisual.pixelRatio);
    assert(dpr <= cap, `dpr ${width}: ${dpr}`);
    report.push({ width, dpr });
    await context.close();
  }
  {
    const { page, context } = await open(1280, { height: 600 });
    assert(await page.evaluate(() => document.documentElement.dataset.scrub) === 'false', 'short viewport uses flow');
    report.push({ width: 1280, height: 600, shortViewport: 'flow' });
    await context.close();
  }
  {
    const { page, context, errors } = await open(1440, { blockThree: true });
    assert(await page.evaluate(() => document.documentElement.dataset.webgl) === 'unavailable', 'fallback flag');
    assert(await page.evaluate(() => getComputedStyle(document.querySelector('[data-media="hero"]')).backgroundImage.includes('gradient')), 'fallback visual');
    await goTo(page, 'copilot', .7, 2000);
    await page.click('[data-prompt="plan"]');
    await page.waitForSelector('.jubo-ai_review-button', { timeout: 12000 });
    assert(errors.filter(e => !/three\.min\.js|ERR_FAILED/.test(e)).length === 0, 'fallback errors');
    await page.screenshot({ path: `${OUT}/fallback-1440.png` });
    report.push({ fallback: 'pass' });
    await context.close();
  }
  if (FIXTURE) {
    for (const width of [1440, 375]) {
      const { page, context, errors } = await open(width, {}, 'file://' + FIXTURE);
      const frame = page.frames().find(f => f !== page.mainFrame());
      await frame.waitForFunction(() => document.documentElement.dataset.webgl === 'ready' && !!window.juboAIVisual, null, { timeout: 25000 });
      const info = await frame.evaluate(() => ({ lang: document.documentElement.lang, canvases: document.querySelectorAll('canvas').length, contact: document.querySelector('a.glass-button').href, scrub: document.documentElement.dataset.scrub }));
      assert(info.lang === 'zh-Hant-TW' && info.canvases === 1 && info.contact === 'https://www.jubo-health.com/contact' && info.scrub === String(width >= 768), `fixture ${width}: ${JSON.stringify(info)}`);
      if (width >= 768) { await frame.evaluate(() => juboAIVisual.goTo('copilot', .7)); await page.waitForTimeout(2000); } else await frame.locator('[data-chat]').scrollIntoViewIfNeeded();
      await frame.click('[data-chat-send]');
      await frame.waitForSelector('.jubo-ai_review-button', { timeout: 12000 });
      await frame.click('.jubo-ai_review-button');
      assert(errors.length === 0, `fixture ${width}: errors ${errors}`);
      await page.screenshot({ path: `${OUT}/fixture-${width}.png` });
      report.push({ fixture: width, ...info });
      await context.close();
    }
  }
  await browser.close();
  fs.writeFileSync(`${OUT}/acceptance.json`, JSON.stringify(report, null, 2));
  console.log('All v11 browser checks passed');
})().catch(error => { console.error(error); process.exit(1); });
