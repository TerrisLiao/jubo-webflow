import { chromium } from 'playwright';
import { existsSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import zlib from 'node:zlib';

if (!existsSync('wf.css')) {
  console.error('缺 wf.css — 先跑 ./fetch-site-css.sh 抓正式站的樣式表');
  process.exit(2);
}

// 跟站上照片同比例（2:3）的測試圖。比例才是重點：這支測試就是在抓
// 「圖片的原生比例把外框宣告的 aspect-ratio 蓋掉」這個坑。
if (!existsSync('portrait_2x3.png')) {
  const W = 800, H = 1200;
  const raw = Buffer.concat(Array.from({ length: H }, () =>
    Buffer.concat([Buffer.from([0]), Buffer.alloc(W * 3).fill(0)])));
  const chunk = (t, d) => {
    const body = Buffer.concat([Buffer.from(t), d]);
    const len = Buffer.alloc(4); len.writeUInt32BE(d.length);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32 ? zlib.crc32(body) : 0);
    return Buffer.concat([len, body, crc]);
  };
  try {
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
    ihdr[8] = 8; ihdr[9] = 2;
    writeFileSync('portrait_2x3.png', Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
  } catch {
    execSync(`python3 -c "
import zlib,struct
W,H=${W},${H}
raw=b''.join(b'\\\\x00'+bytes((0,178,192))*W for _ in range(H))
def chunk(t,d):
    c=t+d
    return struct.pack('>I',len(d))+c+struct.pack('>I',zlib.crc32(c)&0xffffffff)
open('portrait_2x3.png','wb').write(b'\\\\x89PNG\\\\r\\\\n\\\\x1a\\\\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(raw,6))+chunk(b'IEND',b''))
"`);
  }
}

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
await p.goto('file://' + process.cwd() + '/cards.html');
await p.waitForTimeout(500);

const m = await p.evaluate(() => {
  const box = (s) => { const el = document.querySelector(s);
    const r = el.getBoundingClientRect();
    return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), ratio: +(r.height / r.width).toFixed(3) }; };
  return { salesCard: box('.single-sales_wrap'), salesPortrait: box('.sales-portrait'),
           hcCard: box('.homecare-contact_card'), hcPortrait: box('.homecare-contact_portrait') };
});
await b.close();

const fails = [], ok = [];
const check = (name, cond, extra = '') => (cond ? ok : fails).push(name + (extra ? ' — ' + extra : ''));

check('業務頭像框是宣告的 1:1.15', Math.abs(m.salesPortrait.ratio - 1.15) <= 0.01,
      `ratio=${m.salesPortrait.ratio}`);
// 這是本測試的重點：居服頭像用的是 <img>，業務頭像用 background-image。
// <img> 會給欄向 flex item 一個「內容最小高度」，把外框的 aspect-ratio 蓋掉，
// 讓頭像變成圖片自己的 2:3（實測 576px 而不是 442px）。修法是 min-height: 0。
check('居服頭像框是宣告的 1:1.15，沒有被圖片原生比例（2:3）蓋掉',
      Math.abs(m.hcPortrait.ratio - 1.15) <= 0.01,
      `ratio=${m.hcPortrait.ratio}（若接近 1.5 就是 min-height:0 被移掉了）`);
check('居服頭像與業務頭像同寬', Math.abs(m.hcPortrait.w - m.salesPortrait.w) <= 1,
      `居服=${m.hcPortrait.w} 業務=${m.salesPortrait.w}`);
check('居服頭像與業務頭像同高', Math.abs(m.hcPortrait.h - m.salesPortrait.h) <= 1,
      `居服=${m.hcPortrait.h} 業務=${m.salesPortrait.h}`);

console.log('量到的尺寸（1440px 視窗、desktop 斷點）：');
console.log(JSON.stringify(m, null, 2));
console.log('PASS ' + ok.length + ' / FAIL ' + fails.length);
ok.forEach(t => console.log('  ✅ ' + t));
fails.forEach(t => console.log('  ❌ ' + t));
process.exit(fails.length ? 1 : 0);
