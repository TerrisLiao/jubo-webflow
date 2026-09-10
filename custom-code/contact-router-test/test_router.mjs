import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';

// harness.html 是模板；把真正要裝到 Webflow 的那份 code 原封不動塞進去，
// 保證「測試跑的」與「站上跑的」是同一份。
const snippet = readFileSync(process.env.ROUTER_SRC || '../contact-router.html', 'utf8');
const template = readFileSync('harness.html', 'utf8');
if (!template.includes('<!-- ROUTER_SNIPPET -->')) {
  console.error('harness.html 少了 <!-- ROUTER_SNIPPET --> 佔位符');
  process.exit(2);
}
const generated = 'harness.generated.html';
writeFileSync(generated, template.replace('<!-- ROUTER_SNIPPET -->', snippet));

const url = 'file://' + process.cwd() + '/' + generated;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const fails = [];
const ok = [];
function check(name, cond, extra = '') { (cond ? ok : fails).push(name + (extra ? ' — ' + extra : '')); }

await p.goto(url);

const state = async (key) => p.evaluate((k) => {
  const el = document.querySelector(`[data-router-panel="${k}"]`);
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return { disp: cs.display, op: parseFloat(cs.opacity), open: el.classList.contains('is-open'),
           top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
}, key);

const stage = () => p.evaluate(() => {
  const el = document.querySelector('[data-router="stage"]');
  return { h: Math.round(el.getBoundingClientRect().height), inline: el.style.height,
           overflow: getComputedStyle(el).overflow };
});

// 高度取樣：切換全程每一格都記 stage 與整頁高度，用來抓「歸零再長回來」
const startSampling = () => p.evaluate(() => {
  window.__samples = [];
  window.__rec = true;
  const el = document.querySelector('[data-router="stage"]');
  (function loop() {
    if (!window.__rec) return;
    window.__samples.push([el.getBoundingClientRect().height, document.documentElement.scrollHeight]);
    requestAnimationFrame(loop);
  })();
});
const stopSampling = () => p.evaluate(() => {
  window.__rec = false;
  const s = window.__samples;
  return { n: s.length,
           minStage: Math.round(Math.min(...s.map(x => x[0]))),
           minDoc: Math.min(...s.map(x => x[1])),
           maxDoc: Math.max(...s.map(x => x[1])) };
});

// ---- 1. 初始狀態（由 Webflow class 決定，不依賴這支 JS）----
let hc = await state('homecare'), rs = await state('residential');
let st = await stage();
check('初始：居服面板 display:none', hc.disp === 'none', `display=${hc.disp}`);
check('初始：住宿面板 display:none', rs.disp === 'none', `display=${rs.disp}`);
check('初始：stage 高度 0 且 overflow hidden', st.h === 0 && st.overflow === 'hidden', `h=${st.h} overflow=${st.overflow}`);

// ---- 2. 點居服 ----
await p.click('[data-router-target="homecare"]');
await p.waitForTimeout(120);
const early = await stage();
check('展開是動畫不是瞬移（120ms 時高度介於 0 與最終值之間）', early.h > 0 && early.h < 1200, `h=${early.h}`);
await p.waitForTimeout(1500);
hc = await state('homecare');
st = await stage();
const placement = await p.evaluate(() => ({
  wrapTop: Math.round(document.querySelector('[data-router="wrapper"]').getBoundingClientRect().top),
  navH: Math.round(document.querySelector('.navbar_component').getBoundingClientRect().height),
  chooseTop: Math.round(document.getElementById('choose').getBoundingClientRect().top),
  viewportH: window.innerHeight }));
check('點居服：面板展開且不透明', hc.open && hc.disp === 'block' && hc.op === 1 && hc.height > 500, `h=${hc.height} op=${hc.op}`);
check('點居服：stage 收尾交還 height:auto（內容變高不會被切）', st.inline === 'auto', `inline=${st.inline}`);
check('點居服：按鈕變 is-active', await p.evaluate(() => document.querySelector('[data-router-target="homecare"]').classList.contains('is-active')));
check('點居服：GA 事件送出 home_care', await p.evaluate(() => window.__ga.some(e => e.si === 'home_care')));
// 捲動的目的是「選到的那張卡停在 navbar 正下方」，不是把 #choose 頂到某個固定位置。
// 直接斷言意圖：入口卡剛好在 navbar 底下（clearance 是 navbar 高度 +24），
// 而剛展開的面板起點還在視窗內。入口從 pill 換成選擇卡之後高度會變，
// 所以不要拿 #choose 的絕對座標當門檻。
check('點居服：入口卡停在 navbar 正下方',
      placement.wrapTop >= placement.navH && placement.wrapTop <= placement.navH + 40,
      `wrapTop=${placement.wrapTop}px navbar=${placement.navH}px`);
check('點居服：剛展開的面板起點在視窗內',
      placement.chooseTop > placement.wrapTop && placement.chooseTop < placement.viewportH,
      `chooseTop=${placement.chooseTop}px viewport=${placement.viewportH}px`);

const panelStartY = hc.top;
const openHeightHc = hc.height;

// ---- 3. 切到住宿：時序 + 全程高度連續 ----
await startSampling();
await p.click('[data-router-target="residential"]');
await p.waitForTimeout(150);   // 淡出進行中（FADE_OUT=300）
const mid = await p.evaluate(() => {
  const oldP = document.querySelector('[data-router-panel="homecare"]');
  const newP = document.querySelector('[data-router-panel="residential"]');
  const stg = document.querySelector('[data-router="stage"]');
  return { oldH: Math.round(oldP.getBoundingClientRect().height),
           oldOp: parseFloat(getComputedStyle(oldP).opacity),
           oldFading: oldP.classList.contains('is-fading'),
           newOpen: newP.classList.contains('is-open'),
           stageH: Math.round(stg.getBoundingClientRect().height) };
});
check('時序：舊卡片在淡出（高度還在、opacity 正在降）',
      mid.oldFading && mid.oldH > 500 && mid.oldOp < 0.9, `h=${mid.oldH} op=${mid.oldOp.toFixed(2)}`);
check('時序：淡出期間新卡片還沒開始展開', mid.newOpen === false);
check('時序：淡出期間 stage 高度鎖住（版面不動）',
      Math.abs(mid.stageH - openHeightHc) <= 2, `stage=${mid.stageH} 原=${openHeightHc}`);
await p.waitForTimeout(1600);
const samples = await stopSampling();
hc = await state('homecare'); rs = await state('residential');
st = await stage();

check('切換：居服面板 display:none', !hc.open && hc.disp === 'none', `display=${hc.disp}`);
check('切換：住宿面板展開且不透明', rs.open && rs.disp === 'block' && rs.op === 1 && rs.height > 700, `h=${rs.height} op=${rs.op}`);
check('切換：新面板起點與舊面板同一位置（由上往下長）',
      Math.abs(rs.top - panelStartY) <= 2, `舊=${panelStartY} 新=${rs.top}`);
// 這條就是 Terris 回報的「section 一條線跳出」：舊架構切換時 stage 會先歸零
check('切換：stage 高度全程沒有歸零（不會有 section 開又關的邊界閃過）',
      samples.minStage >= Math.min(openHeightHc, rs.height) - 8,
      `全程最低=${samples.minStage} 應 ≥ ${Math.min(openHeightHc, rs.height) - 8}（取樣 ${samples.n} 格）`);
check('切換：整頁高度全程沒有塌陷（漸層背景不會猛地重算）',
      samples.maxDoc - samples.minDoc <= Math.abs(openHeightHc - rs.height) + 8,
      `整頁 ${samples.minDoc}–${samples.maxDoc}，兩張卡片高度差 ${Math.abs(openHeightHc - rs.height)}`);
check('切換：GA 事件送出 residential_day_care', await p.evaluate(() => window.__ga.some(e => e.si === 'residential_day_care')));
check('切換：document bubble 的捲動被擋掉', await p.evaluate(() => window.__bubbleScrolls === 0), `bubbleScrolls=${await p.evaluate(() => window.__bubbleScrolls)}`);
check('切換：面板內容 transform 歸零', await p.evaluate(() => {
  const el = document.querySelector('[data-router-panel="residential"]').firstElementChild;
  const t = getComputedStyle(el).transform;
  return t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)';
}));
check('切換：stage 收尾交還 height:auto', st.inline === 'auto', `inline=${st.inline}`);

// ---- 4. 點同一顆 → 收起來 ----
await p.click('[data-router-target="residential"]');
await p.waitForTimeout(1500);
rs = await state('residential');
st = await stage();
check('點同一顆：面板收起（display:none）', !rs.open && rs.disp === 'none', `display=${rs.disp}`);
check('點同一顆：stage 高度回到 0', st.h === 0, `h=${st.h}`);
check('點同一顆：按鈕的 is-active 移除', await p.evaluate(() => !document.querySelector('[data-router-target="residential"]').classList.contains('is-active')));

await b.close();
console.log('PASS ' + ok.length + ' / FAIL ' + fails.length);
ok.forEach(t => console.log('  ✅ ' + t));
fails.forEach(t => console.log('  ❌ ' + t));
process.exit(fails.length ? 1 : 0);
