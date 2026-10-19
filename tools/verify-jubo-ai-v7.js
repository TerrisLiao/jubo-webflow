#!/usr/bin/env node
// Browser acceptance for the Jubo AI v7 prototype.
// Usage: node tools/verify-jubo-ai-v7.js [output-directory] [preview-fixture.html]
// Opens the canonical file directly (file://). Requires Node Playwright and Chromium;
// set POC_CHROMIUM_PATH to override the browser. HTTPS assets go through the
// environment's existing proxy; no browser security settings are changed.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const URL = 'file://' + path.join(ROOT, 'custom-code/poc/jubo-ai-agentic-v7.html');
const OUT = path.resolve(process.argv[2] || '/tmp/v7');
const FIXTURE = process.argv[3] ? path.resolve(process.argv[3]) : null;
fs.mkdirSync(OUT, { recursive: true });

const EXPECT = {
  foundation: ['Care records.', 'Vital signs.', 'Handover notes.', 'Home visit records.', 'Family updates.'],
  capabilities: ['Find answers.', 'Summarize records.', 'Notice changes.', 'Draft content.', 'Discover insights.'],
  applications: ['N.Copilot', 'Amy', 'iBee'],
};
const report = [];
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const executablePath = process.env.POC_CHROMIUM_PATH || chromium.executablePath();
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined;
  const browser = await chromium.launch({ executablePath, proxy, args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });

  async function open(width, options = {}, url = URL) {
    const height = options.height || (width >= 768 ? 900 : 812);
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: options.dpr || 1, reducedMotion: options.reduced ? 'reduce' : 'no-preference', hasTouch: !!options.touch });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/GPU stall|WebGL-/.test(m.text())) errors.push(m.text()); });
    if (options.blockThree) await page.route('**/three.min.js', route => route.abort());
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    return { page, context, errors };
  }
  const go = async (page, id, index) => {
    await page.evaluate(([id, i]) => juboAIVisual.goToPanel(id, i), [id, index]);
    await page.waitForFunction(([id, i]) => juboAIVisual.stages.find(s => s.id === id).active === i, [id, index], { timeout: 8000 });
    await page.waitForTimeout(1400);
  };

  for (const width of [1440, 991, 767, 375]) {
    const { page, context, errors } = await open(width);
    const scrub = width >= 768;
    const base = await page.evaluate(() => ({
      lang: document.documentElement.lang, webgl: document.documentElement.dataset.webgl, scrub: document.documentElement.dataset.scrub,
      canvases: document.querySelectorAll('canvas').length, calls: juboAIVisual.drawCalls,
      overflow: document.documentElement.scrollWidth - innerWidth,
      cjk: /[぀-ヿ㐀-鿿]/.test(document.body.innerText),
      ideas: document.querySelectorAll('[data-idea]').length,
      font: getComputedStyle(document.body).fontFamily, bodySize: getComputedStyle(document.body).fontSize,
    }));
    assert(base.lang === 'en' && base.webgl === 'ready', `${width}: language or WebGL`);
    assert(base.scrub === String(scrub), `${width}: scrub mode ${base.scrub}`);
    assert(base.canvases === 1 && base.calls === 1, `${width}: one canvas / one draw call`);
    assert(base.overflow <= 0, `${width}: horizontal overflow ${base.overflow}`);
    assert(!base.cjk, `${width}: CJK text found`);
    assert(base.ideas === 3, `${width}: three ideas`);
    await page.screenshot({ path: `${OUT}/${width}-hero.png` });

    for (const [id, titles] of Object.entries(EXPECT)) {
      for (let i = 0; i < titles.length; i++) {
        if (scrub) {
          await go(page, id, i);
          const state = await page.evaluate(([id, i]) => {
            const panels = [...document.querySelectorAll(`#${id} [data-panel]`)];
            const p = panels[i]; const r = p.getBoundingClientRect();
            const kids = [...p.querySelectorAll('*')].map(e => e.getBoundingClientRect()).filter(b => b.height);
            const head = document.querySelector(`#${id} .jubo-ai_stage-head`).getBoundingClientRect();
            return {
              text: p.innerText, opacity: getComputedStyle(p).opacity,
              live: panels.filter(x => !x.inert).length,
              top: Math.min(...kids.map(b => b.top)), bottom: Math.max(...kids.map(b => b.bottom)), headBottom: head.bottom,
              tab: document.querySelector(`#${id} [data-tab="${i}"]`).getAttribute('aria-current'),
            };
          }, [id, i]);
          assert(state.text.includes(titles[i]), `${width} ${id}#${i}: title`);
          assert(state.opacity === '1' && state.live === 1 && state.tab === 'step', `${width} ${id}#${i}: active state`);
          assert(state.top >= state.headBottom - 1 && state.bottom <= (await page.evaluate(() => innerHeight)) + 1, `${width} ${id}#${i}: panel fits between header and fold (${Math.round(state.top)}-${Math.round(state.bottom)}, head ${Math.round(state.headBottom)})`);
          await page.screenshot({ path: `${OUT}/${width}-${id}-${i}.png` });
        } else {
          const text = await page.locator(`#${id} [data-panel="${i}"]`).innerText();
          assert(text.includes(titles[i]), `${width} ${id}#${i}: title in flow mode`);
        }
      }
    }

    // Conversations: run, sources, review, rapid switching keeps only the last answer.
    if (scrub) await go(page, 'applications', 0); else await page.locator('[data-chat]').scrollIntoViewIfNeeded();
    for (const prompt of ['summary', 'interview', 'plan']) {
      await page.click(`[data-prompt="${prompt}"]`);
      await page.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
      await page.click('.jubo-ai_chat-sources summary');
      await page.click('.jubo-ai_review-button');
      assert(await page.locator('[data-chat]').getAttribute('data-status') === 'reviewed', `${width}: ${prompt} reviewed`);
    }
    await page.click('[data-prompt="interview"]');
    await page.waitForTimeout(150);
    await page.click('[data-prompt="summary"]');
    await page.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
    const outputs = await page.evaluate(() => [...document.querySelectorAll('.jubo-ai_chat-output strong')].map(e => e.textContent));
    assert(outputs.length === 1 && outputs[0] === 'Case overview', `${width}: rapid switch kept ${outputs}`);

    // Idea dialogs by keyboard.
    for (const idea of ['signals', 'time', 'picture']) {
      const button = page.locator(`[data-idea="${idea}"]`);
      await button.scrollIntoViewIfNeeded();
      await button.focus();
      await page.keyboard.press('Enter');
      assert(await page.evaluate(() => document.querySelector('[data-idea-dialog]').open), `${width}: ${idea} opens`);
      await page.keyboard.press('Shift+Tab');
      assert(await page.evaluate(() => document.querySelector('[data-idea-dialog]').contains(document.activeElement)), `${width}: focus stays in dialog`);
      await page.keyboard.press('Escape');
      assert(await page.evaluate(i => document.activeElement === document.querySelector(`[data-idea="${i}"]`), idea), `${width}: focus returns`);
    }

    // Pause / resume stops and restarts the render loop.
    // Paused frames still redraw on scroll, so settle the page before counting.
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(900);
    await page.click('[data-motion-toggle]');
    const pausedAt = await page.evaluate(() => juboAIVisual.draws);
    await page.waitForTimeout(700);
    assert(await page.evaluate(() => juboAIVisual.draws) <= pausedAt + 1, `${width}: paused draws`);
    await page.click('[data-motion-toggle]');
    await page.waitForTimeout(500);
    assert(await page.evaluate(() => juboAIVisual.draws) > pausedAt + 3, `${width}: resumed draws`);

    // Pointer pulls the orb's light toward the cursor on desktop.
    if (width >= 991) {
      const box = await page.locator('[data-orb-anchor="hero"]').boundingBox();
      await page.mouse.move(box.x + box.width * .95, box.y + box.height * .5, { steps: 6 });
      await page.waitForTimeout(800);
      const right = await page.evaluate(() => juboAIVisual.gaze);
      await page.mouse.move(box.x + box.width * .05, box.y + box.height * .5, { steps: 6 });
      await page.waitForTimeout(800);
      const left = await page.evaluate(() => juboAIVisual.gaze);
      assert(right.x > .4 && left.x < -.4 && right.strength > .4, `${width}: gaze ${right.x} / ${left.x}`);
    }
    assert(errors.length === 0, `${width}: errors ${errors.join(' | ')}`);
    report.push({ width, ...base, result: 'pass' });
    await context.close();
  }

  // Reduced motion: natural flow, full text, no word dimming, no render loop.
  for (const width of [1440, 375]) {
    const { page, context, errors } = await open(width, { reduced: true });
    const state = await page.evaluate(() => ({
      scrub: document.documentElement.dataset.scrub,
      hidden: [...document.querySelectorAll('[data-panel]')].filter(p => getComputedStyle(p).opacity !== '1' || p.inert).length,
      dim: [...document.querySelectorAll('.jubo-ai_word')].filter(w => getComputedStyle(w).opacity !== '1').length,
      motion: document.documentElement.dataset.motionState,
    }));
    const draws = await page.evaluate(() => juboAIVisual.draws);
    await page.waitForTimeout(700);
    assert(state.scrub === 'false' && state.hidden === 0 && state.dim === 0 && state.motion === 'paused', `reduced ${width}: ${JSON.stringify(state)}`);
    assert(await page.evaluate(() => juboAIVisual.draws) <= draws + 1, `reduced ${width}: render loop idle`);
    await page.click('[data-prompt="plan"]');
    await page.waitForSelector('.jubo-ai_review-button', { timeout: 5000 });
    assert(errors.length === 0, `reduced ${width}: errors`);
    report.push({ width, reducedMotion: 'pass' });
    await page.screenshot({ path: `${OUT}/reduced-${width}.png`, fullPage: false });
    await context.close();
  }

  // Pixel ratio caps.
  for (const [width, cap] of [[1440, 2], [375, 1.5]]) {
    const { page, context } = await open(width, { dpr: 3 });
    const dpr = await page.evaluate(() => juboAIVisual.pixelRatio);
    assert(dpr <= cap, `dpr ${width}: ${dpr}`);
    report.push({ width, dpr });
    await context.close();
  }

  // Short desktop viewport falls back to natural flow.
  {
    const { page, context } = await open(1280, { height: 640 });
    assert(await page.evaluate(() => document.documentElement.dataset.scrub) === 'false', 'short viewport flow');
    report.push({ width: 1280, height: 640, shortViewport: 'flow' });
    await context.close();
  }

  // Three.js unavailable: CSS orb and every interaction still work.
  {
    const { page, context, errors } = await open(1440, { blockThree: true });
    const state = await page.evaluate(() => ({ webgl: document.documentElement.dataset.webgl, orb: getComputedStyle(document.querySelector('.jubo-ai_fallback-orb')).opacity }));
    assert(state.webgl === 'unavailable' && Number(state.orb) > .5, `fallback ${JSON.stringify(state)}`);
    await go(page, 'applications', 0);
    await page.click('[data-prompt="interview"]');
    await page.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
    assert(errors.filter(e => !/three\.min\.js|ERR_FAILED/.test(e)).length === 0, 'fallback errors');
    await page.screenshot({ path: `${OUT}/fallback-1440.png` });
    report.push({ fallback: 'pass' });
    await context.close();
  }

  // Exported sandbox fixture (built by tools/pack-jubo-ai-preview.py --version 7).
  if (FIXTURE) {
    for (const width of [1440, 375]) {
      const { page, context, errors } = await open(width, {}, 'file://' + FIXTURE);
      const frame = page.frames().find(f => f !== page.mainFrame());
      await frame.waitForFunction(() => document.documentElement.dataset.webgl === 'ready', null, { timeout: 20000 });
      const info = await frame.evaluate(() => ({ lang: document.documentElement.lang, canvases: document.querySelectorAll('canvas').length, contact: document.querySelector('a.glass-button').href }));
      assert(info.lang === 'en' && info.canvases === 1 && info.contact === 'https://www.jubo-health.com/contact', `fixture ${width}: ${JSON.stringify(info)}`);
      if (width >= 768) await frame.evaluate(() => juboAIVisual.goToPanel('applications', 0)); else await frame.locator('[data-chat]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await frame.click('[data-prompt="plan"]');
      await frame.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
      await frame.click('.jubo-ai_review-button');
      assert(errors.length === 0, `fixture ${width}: errors ${errors}`);
      await page.screenshot({ path: `${OUT}/fixture-${width}.png` });
      report.push({ fixture: width, ...info });
      await context.close();
    }
  }

  await browser.close();
  fs.writeFileSync(`${OUT}/acceptance.json`, JSON.stringify(report, null, 2));
  console.log('All v7 browser checks passed');
})().catch(error => { console.error(error); process.exit(1); });
