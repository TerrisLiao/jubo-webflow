#!/usr/bin/env node
/*
  捲動式原型的視覺驗證：逐格截圖＋拼成一張總覽（contact sheet）。
  用法：node tools/poc-scroll-shots.js <html 檔> <輸出資料夾> [寬度,寬度...]
  例：  node tools/poc-scroll-shots.js custom-code/poc/jubo-ai-agentic-v3.html /tmp/shots 1440,375
  需求：Playwright（雲端環境已預裝於全域 node_modules；瀏覽器在 /opt/pw-browsers）。
  產出：<寬>-00.png … 每格截圖、console 錯誤列表、scrollWidth（檢查水平捲動）。
  拼圖請另用 Python PIL（見 docs/projects/jubo-ai/reference/codex-v3-交接.md §8）。
*/
const path = require('path');
const { execSync } = require('child_process');
let pw;
try { pw = require('playwright'); } catch (e) { pw = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); }

(async () => {
  const [file, out, widthsArg] = process.argv.slice(2);
  if (!file || !out) { console.error('用法：node tools/poc-scroll-shots.js <html> <outdir> [1440,375]'); process.exit(1); }
  const url = 'file://' + path.resolve(file);
  const widths = (widthsArg || '1440,375').split(',').map(Number);
  require('fs').mkdirSync(out, { recursive: true });
  // swiftshader 讓無 GPU 的環境也能跑 WebGL
  const browser = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  for (const w of widths) {
    const h = w >= 768 ? 900 : 812;
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const errs = [];
    page.on('pageerror', e => errs.push('pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(4000); // 等開場動畫
    await page.screenshot({ path: `${out}/${w}-00.png` });
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const steps = w >= 768 ? 16 : 12;
    for (let i = 1; i <= steps; i++) {
      // 用滾輪而不是 scrollTo：ScrollTrigger 的 scrub／pin 要逐步經過才會正確觸發
      await page.mouse.wheel(0, (total - h) / steps);
      await page.waitForTimeout(1300);
      await page.screenshot({ path: `${out}/${w}-${String(i).padStart(2, '0')}.png` });
    }
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`${w}px：scrollWidth=${sw}${sw > w ? '（⚠️ 有水平捲動）' : ''}，高度=${total}，錯誤=${errs.length ? '\n  ' + errs.join('\n  ') : '無'}`);
    await page.close();
  }
  await browser.close();
})();
