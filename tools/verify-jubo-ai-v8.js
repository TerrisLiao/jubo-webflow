#!/usr/bin/env node
// Browser acceptance for the Jubo AI v8 scroll showcase.
// Usage: node tools/verify-jubo-ai-v8.js [output-directory] [preview-fixture.html]
// Opens the canonical file directly (file://). Requires Node Playwright and Chromium;
// set POC_CHROMIUM_PATH to override the browser. HTTPS assets go through the
// environment's existing proxy; no browser security settings are changed.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const URL = 'file://' + path.join(ROOT, 'custom-code/poc/jubo-ai-agentic-v8.html');
const OUT = path.resolve(process.argv[2] || '/tmp/v8');
const FIXTURE = process.argv[3] ? path.resolve(process.argv[3]) : null;
fs.mkdirSync(OUT, { recursive: true });

const LISTEN = ['Every record', 'Every vital sign', 'Every handover', 'Every home visit', 'Every conversation'];
const QUESTIONS = ['What if changes were easier to spot?', 'What if teams had more time for care?', 'What if the bigger picture was clearer?'];
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
  const goTo = async (page, id, progress) => {
    await page.evaluate(([id, p]) => juboAIVisual.goTo(id, p), [id, progress]);
    await page.waitForTimeout(1300);
  };
  const scenes = page => page.evaluate(() => juboAIVisual.scenes);

  for (const width of [1440, 991, 767, 375]) {
    const { page, context, errors } = await open(width);
    const scrub = width >= 768;
    const base = await page.evaluate(() => ({
      lang: document.documentElement.lang, webgl: document.documentElement.dataset.webgl, scrub: document.documentElement.dataset.scrub,
      canvases: document.querySelectorAll('canvas').length, calls: juboAIVisual.drawCalls, gsap: !!window.gsap,
      overflow: document.documentElement.scrollWidth - innerWidth, cjk: /[぀-ヿ㐀-鿿]/.test(document.body.innerText),
      pinned: juboAIVisual.pinned.sort().join(','),
    }));
    assert(base.lang === 'en' && base.webgl === 'ready' && base.gsap, `${width}: language, WebGL or GSAP`);
    assert(base.scrub === String(scrub), `${width}: scrub ${base.scrub}`);
    assert(base.canvases === 1 && base.calls === 1, `${width}: one canvas / one draw call`);
    assert(base.overflow <= 0 && !base.cjk, `${width}: overflow ${base.overflow} / CJK ${base.cjk}`);
    assert(base.pinned === (scrub ? 'apps,listen,understand,whatif' : ''), `${width}: pinned ${base.pinned}`);

    // Key visual loops by itself and the prompt bar keeps typing.
    const t0 = await page.evaluate(() => [juboAIVisual.time, document.querySelector('[data-ask-text]').textContent]);
    await page.waitForTimeout(2500);
    const t1 = await page.evaluate(() => [juboAIVisual.time, document.querySelector('[data-ask-text]').textContent]);
    assert(t1[0] - t0[0] > .5 && t1[1] !== t0[1], `${width}: loop ${t0} -> ${t1}`);
    await page.screenshot({ path: `${OUT}/${width}-hero.png` });

    if (width >= 991) {
      const box = await page.locator('[data-orb-anchor="hero"]').boundingBox();
      await page.mouse.move(box.x + box.width * 1.1, box.y + box.height * .5, { steps: 6 });
      await page.waitForTimeout(900);
      const right = await page.evaluate(() => ({ g: juboAIVisual.gaze, p: juboAIVisual.pointer }));
      await page.mouse.move(box.x - box.width * .1, box.y + box.height * .5, { steps: 6 });
      await page.waitForTimeout(900);
      const left = await page.evaluate(() => ({ g: juboAIVisual.gaze, p: juboAIVisual.pointer }));
      assert(right.g.x > .4 && left.g.x < -.4 && right.p.on > .3 && right.p.x > left.p.x, `${width}: pointer ${JSON.stringify([right, left])}`);
      await page.mouse.click(box.x + box.width * .5, box.y + box.height * .2);
      await page.mouse.move(5, 5);
    }

    if (scrub) {
      for (let i = 0; i < LISTEN.length; i++) {
        await goTo(page, 'listen', (i + .6) / LISTEN.length);
        const s = await scenes(page);
        const on = await page.evaluate(() => [...document.querySelectorAll('[data-cloud] [data-on="true"]')].map(c => Number(c.dataset.group)));
        assert(s.listen === i && s.listenText === LISTEN[i] && on.length && on.every(g => g === i), `${width} listen ${i}: ${JSON.stringify(s)} ${on}`);
        if (i % 2 === 0) await page.screenshot({ path: `${OUT}/${width}-listen-${i}.png` });
      }
      await goTo(page, 'understand', .02);
      const small = await page.evaluate(() => juboAIVisual.orb.r);
      await goTo(page, 'understand', .98);
      await page.waitForTimeout(600);
      const large = await page.evaluate(() => juboAIVisual.orb.r);
      assert(large > small * 1.4, `${width} understand orb ${small} -> ${large}`);
      await page.screenshot({ path: `${OUT}/${width}-understand.png` });
      await page.locator('#capabilities').scrollIntoViewIfNeeded();
      await page.evaluate(() => scrollBy(0, 500));
      await page.waitForTimeout(1600);
      const cards = await page.evaluate(() => [...document.querySelectorAll('[data-card]')].filter(c => getComputedStyle(c).opacity === '1').length);
      assert(cards >= 4, `${width} bento cards visible ${cards}`);
      await page.screenshot({ path: `${OUT}/${width}-capabilities.png` });
      for (let i = 0; i < 3; i++) {
        await goTo(page, 'apps', (i + .5) / 3);
        const s = await page.evaluate(() => ({ app: juboAIVisual.scenes.app, live: [...document.querySelectorAll('[data-panel]')].filter(p => !p.inert).length, tab: document.querySelector('[aria-current="step"]').dataset.tab }));
        assert(s.app === i && s.live === 1 && s.tab === String(i), `${width} apps ${i}: ${JSON.stringify(s)}`);
        await page.screenshot({ path: `${OUT}/${width}-app-${i}.png` });
      }
      for (let i = 0; i < 3; i++) {
        await goTo(page, 'whatif', (i + .6) / 3);
        const s = await scenes(page);
        assert(s.question === QUESTIONS[i], `${width} what if ${i}: ${s.question}`);
      }
      await page.screenshot({ path: `${OUT}/${width}-whatif.png` });
    } else {
      const visible = await page.evaluate(() => [...document.querySelectorAll('[data-panel]')].filter(p => !p.inert && getComputedStyle(p).visibility !== 'hidden').length);
      assert(visible === 3, `${width}: all application panels in flow`);
      await page.locator('#listen').scrollIntoViewIfNeeded();
      const a = (await scenes(page)).listenText;
      await page.waitForTimeout(2200);
      const b = (await scenes(page)).listenText;
      assert(a !== b, `${width}: listen typer loops`);
    }

    // Prompt bar sends its example to the N.Copilot demo.
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(600);
    await page.click('.jubo-ai_ask-send');
    await page.waitForSelector('.jubo-ai_review-button', { timeout: 12000 });
    for (const prompt of ['interview', 'plan', 'summary']) {
      await page.click(`[data-prompt="${prompt}"]`);
      await page.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
      await page.click('.jubo-ai_review-button');
      assert(await page.locator('[data-chat]').getAttribute('data-status') === 'reviewed', `${width}: ${prompt} reviewed`);
    }
    await page.click('[data-prompt="interview"]');
    await page.waitForTimeout(150);
    await page.click('[data-prompt="plan"]');
    await page.waitForSelector('.jubo-ai_review-button', { timeout: 10000 });
    const outputs = await page.evaluate(() => [...document.querySelectorAll('.jubo-ai_chat-output strong')].map(e => e.textContent));
    assert(outputs.length === 1 && outputs[0] === 'Care-plan starting point', `${width}: rapid switch ${outputs}`);

    // Idea dialog by keyboard.
    if (scrub) await goTo(page, 'whatif', .5); else await page.locator('[data-idea-current]').scrollIntoViewIfNeeded();
    const trigger = page.locator('[data-idea-current]');
    await trigger.focus();
    await page.keyboard.press('Enter');
    assert(await page.evaluate(() => document.querySelector('[data-idea-dialog]').open), `${width}: idea opens`);
    await page.keyboard.press('Shift+Tab');
    assert(await page.evaluate(() => document.querySelector('[data-idea-dialog]').contains(document.activeElement)), `${width}: focus trapped`);
    await page.keyboard.press('Escape');
    assert(await page.evaluate(() => document.activeElement.matches('[data-idea-current]')), `${width}: focus returns`);

    // Pause stops the light, the typers and the loops; resume restarts them.
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(900);
    await page.click('[data-motion-toggle]');
    const p0 = await page.evaluate(() => [juboAIVisual.draws, juboAIVisual.time, document.querySelector('[data-ask-text]').textContent]);
    await page.waitForTimeout(1500);
    const p1 = await page.evaluate(() => [juboAIVisual.draws, juboAIVisual.time, document.querySelector('[data-ask-text]').textContent]);
    assert(p1[0] <= p0[0] + 1 && p1[1] === p0[1] && p1[2] === p0[2], `${width}: pause ${p0} -> ${p1}`);
    await page.click('[data-motion-toggle]');
    await page.waitForTimeout(600);
    assert(await page.evaluate(() => juboAIVisual.draws) > p1[0] + 3, `${width}: resume`);
    assert(errors.length === 0, `${width}: errors ${errors.join(' | ')}`);
    report.push({ width, ...base, result: 'pass' });
    await context.close();
  }

  // Reduced motion: no pins, no loops, every idea listed.
  for (const width of [1440, 375]) {
    const { page, context, errors } = await open(width, { reduced: true });
    const s = await page.evaluate(() => ({ scrub: document.documentElement.dataset.scrub, pinned: juboAIVisual.pinned.length, listen: juboAIVisual.scenes.listenText, ideas: [...document.querySelectorAll('.jubo-ai_idea-list button')].filter(b => b.getClientRects().length).length, dim: [...document.querySelectorAll('.jubo-ai_word')].filter(w => getComputedStyle(w).opacity !== '1').length }));
    const d0 = await page.evaluate(() => juboAIVisual.draws);
    await page.waitForTimeout(1200);
    assert(s.scrub === 'false' && s.pinned === 0 && s.listen === 'Every record' && s.ideas === 3 && s.dim === 0, `reduced ${width}: ${JSON.stringify(s)}`);
    assert(await page.evaluate(() => juboAIVisual.draws) <= d0 + 1 && (await scenes(page)).listenText === 'Every record', `reduced ${width}: idle`);
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
    const s = await page.evaluate(() => ({ webgl: document.documentElement.dataset.webgl, orb: Number(getComputedStyle(document.querySelector('.jubo-ai_fallback-orb')).opacity) }));
    assert(s.webgl === 'unavailable' && s.orb > .5, `fallback ${JSON.stringify(s)}`);
    await page.click('.jubo-ai_ask-send');
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
      assert(info.lang === 'en' && info.canvases === 1 && info.contact === 'https://www.jubo-health.com/contact' && info.scrub === String(width >= 768), `fixture ${width}: ${JSON.stringify(info)}`);
      await frame.click('.jubo-ai_ask-send');
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
  console.log('All v8 browser checks passed');
})().catch(error => { console.error(error); process.exit(1); });
