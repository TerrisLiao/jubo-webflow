import { chromium } from 'playwright';

const url = 'file://' + process.cwd() + '/harness.html';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const fails = [];
const ok = [];
function check(name, cond, extra='') { (cond ? ok : fails).push(name + (extra ? ' — ' + extra : '')); }

await p.goto(url);

const state = async (key) => p.evaluate((k) => {
  const el = document.querySelector(`[data-router-panel="${k}"]`);
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return { h: cs.height, vis: cs.visibility, op: cs.opacity, open: el.classList.contains('is-open'),
           top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
}, key);

// 1. 初始狀態
let hc = await state('homecare'), rs = await state('residential');
check('初始：居服面板隱藏', hc.height === 0 && hc.vis === 'hidden', `h=${hc.h} vis=${hc.vis}`);
check('初始：住宿面板隱藏', rs.height === 0 && rs.vis === 'hidden', `h=${rs.h} vis=${rs.vis}`);

// 2. 點居服
await p.click('[data-router-target="homecare"]');
await p.waitForTimeout(950);
hc = await state('homecare');
const chooserTopAfterHc = await p.evaluate(() => Math.round(document.getElementById('choose').getBoundingClientRect().top));
check('點居服：展開', hc.open && hc.height > 500 && hc.vis === 'visible', `h=${hc.height}`);
check('點居服：按鈕變 is-active', await p.evaluate(() => document.querySelector('[data-router-target="homecare"]').classList.contains('is-active')));
check('點居服：GA 事件送出 home_care', await p.evaluate(() => window.__ga.some(e => e.si === 'home_care')));
check('點居服：捲動有把選擇器帶到 navbar 下方（0–200px）', chooserTopAfterHc >= 0 && chooserTopAfterHc < 200, `top=${chooserTopAfterHc}px`);

// 3. 記錄居服面板此刻的頁面座標（= 面板起點，應該就在按鈕下方）
const panelStartY = hc.top;

// 4. 切到住宿：檢查新面板的起點是否與舊面板相同（沒有被往上拉）
await p.click('[data-router-target="residential"]');
await p.waitForTimeout(950);
hc = await state('homecare'); rs = await state('residential');
check('切換：居服瞬間收掉', !hc.open && hc.height === 0, `h=${hc.height}`);
check('切換：住宿展開', rs.open && rs.height > 700, `h=${rs.height}`);
check('切換：新面板起點與舊面板同一位置（由上往下長，不是被往上拉）',
      Math.abs(rs.top - panelStartY) <= 2, `舊=${panelStartY} 新=${rs.top}`);
check('切換：GA 事件送出 residential_day_care', await p.evaluate(() => window.__ga.some(e => e.si === 'residential_day_care')));
check('切換：document bubble 的捲動被擋掉', await p.evaluate(() => window.__bubbleScrolls === 0), `bubbleScrolls=${await p.evaluate(() => window.__bubbleScrolls)}`);

// 5. 內容位移歸零（由上往下就位）
check('切換：面板內容 transform 歸零', await p.evaluate(() => {
  const el = document.querySelector('[data-router-panel="residential"]').firstElementChild;
  const t = getComputedStyle(el).transform;
  return t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)';
}));

// 6. 點同一顆 → 收合
await p.click('[data-router-target="residential"]');
await p.waitForTimeout(950);
rs = await state('residential');
check('點同一顆：收合', !rs.open && rs.height === 0, `h=${rs.height}`);
check('點同一顆：按鈕的 is-active 移除', await p.evaluate(() => !document.querySelector('[data-router-target="residential"]').classList.contains('is-active')));

await b.close();
console.log('PASS ' + ok.length + ' / FAIL ' + fails.length);
ok.forEach(t => console.log('  ✅ ' + t));
fails.forEach(t => console.log('  ❌ ' + t));
process.exit(fails.length ? 1 : 0);
