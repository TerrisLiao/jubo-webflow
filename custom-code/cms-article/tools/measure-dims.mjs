// 讀一批圖片 URL 的實際像素尺寸（給 gen-cover-aspect.py / gen-img-aspect.py 用）。
//
//   node tools/measure-dims.mjs urls.json out.json
//
// urls.json：["https://cdn.prod.website-files.com/.../xxx.png", ...]
// out.json ：{"<url>": [width, height], ...}
//
// 為什麼要用瀏覽器量而不是讀 Webflow 資產 API：
//   文章圖片掛在 69f82ba1d504290f910e8826 這個 bucket，不是本站的資產，
//   資產 API 查不到（見規範 18 §28-1）。直接載入圖片讀 naturalWidth 最可靠，
//   也自動處理 png / webp / jpg 的差異。
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const [, , inPath, outPath] = process.argv;
const urls = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const browser = await chromium.launch({ args: ['--ignore-certificate-errors'] });
const page = await (await browser.newContext({ ignoreHTTPSErrors: true })).newPage();
await page.goto('https://jubo-health.webflow.io/', { waitUntil: 'domcontentloaded', timeout: 60000 });

const out = {};
for (let i = 0; i < urls.length; i += 12) {
  const batch = urls.slice(i, i + 12);
  const got = await page.evaluate(list => Promise.all(list.map(u => new Promise(res => {
    const im = new Image();
    im.onload = () => res([u, im.naturalWidth, im.naturalHeight]);
    im.onerror = () => res([u, 0, 0]);
    im.src = u;
    setTimeout(() => res([u, im.naturalWidth || 0, im.naturalHeight || 0]), 20000);
  }))), batch);
  for (const [u, w, h] of got) out[u] = [w, h];
  process.stderr.write(`${Object.keys(out).length}/${urls.length}\r`);
}
fs.writeFileSync(outPath, JSON.stringify(out));
const failed = Object.entries(out).filter(([, v]) => !v[0]);
console.log(`\n量到 ${Object.keys(out).length} 張，失敗 ${failed.length}`);
failed.forEach(([u]) => console.log('  載入失敗（可能是死連結）：', u));
await browser.close();
