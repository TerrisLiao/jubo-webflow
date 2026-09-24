/*
 * 智齡數位頁首「最後一哩路」捲動動畫 — 腳本
 * 部署位置：Webflow 頁面 /ecosystem/jubo-digital → Page Settings → Custom Code → Before </body>（<script id="jd-hero">）
 * 本檔是正本；站上那份是衍生部署品。搭配 custom-code/jubo-digital-hero.css。
 * 依賴：全站 Footer 已載入的 gsap@3.15 + ScrollTrigger（jsdelivr）。沒有 gsap 或使用者開啟「減少動態」時不執行，頁面維持靜止排版。
 *
 * 為什麼不用 IX3：照片落點、連線長度、卡片位置都要依當下螢幕寬高計算；IX3 只能填固定數值，
 * 在 1920×1080、1280×720 等不同比例下會跑位（下排照片壓到標語）。GSAP 是 IX3 的底層引擎，行為相同。
 *
 * 分鏡（捲動進度 0 → 1，sticky 區塊固定期間）：
 *   聚攏 0–0.34   照片縮小、傾斜，交錯飛到標語四角；標語從區塊下方外側升到中央
 *   串聯 0.30–0.64 點陣網格／光暈淡入，01→04 順時針畫出漸層連線，節點卡片浮現、漸層光暈開、文字逐字打出
 *   點亮 0.38–      標語逐字由淺灰變深
 *   散開 0.80–1    卡片、連線、網格、照片往外飄散淡出，只留下標語
 */
(function () {
  function start() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var comp = document.querySelector('.product-hero-4_component');
    var stage = document.querySelector('.product-hero-4_content-bottom');
    var spacer = document.querySelector('.product-hero-4_ix-trigger');
    var tagEl = document.querySelector('.header156_text-wrapper');
    var phs = gsap.utils.toArray('.product-hero-4_image-wrapper');
    if (!comp || !stage || !spacer || !tagEl || phs.length !== 4) return;
    gsap.registerPlugin(ST);

    // 標語拆字（保留 <br>）
    var p = tagEl.querySelector('p') || tagEl;
    Array.prototype.slice.call(p.childNodes).forEach(function (node) {
      if (node.nodeType !== 3) return;
      var frag = document.createDocumentFragment();
      Array.from(node.textContent).forEach(function (ch) {
        if (ch === ' ' || ch === '\n') { frag.appendChild(document.createTextNode(ch)); return; }
        var s = document.createElement('span'); s.className = 'jd-c'; s.textContent = ch; frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    });

    // 裝飾層：網格、光暈、連線、節點卡片（純裝飾，對輔助技術隱藏）
    function el(tag, cls, parent, text) { var e = document.createElement(tag); e.className = cls; if (text) e.textContent = text; (parent || stage).appendChild(e); return e; }
    el('div', 'jd-grid').setAttribute('aria-hidden', 'true');
    el('div', 'jd-glow').setAttribute('aria-hidden', 'true');
    var netWrap = el('div', 'jd-net'); netWrap.setAttribute('aria-hidden', 'true');
    var net = { t: el('i', 'jd-ln is-h is-t', netWrap), r: el('i', 'jd-ln is-v is-r', netWrap), b: el('i', 'jd-ln is-h is-b', netWrap), l: el('i', 'jd-ln is-v is-l', netWrap) };
    // photo index: 0 顧問女士 / 1 西裝男士 / 2 護理師 / 3 拿平板的 Jubo 同仁
    var nodes = [ { p: 1, n: '01', t: '政策與補助案' }, { p: 0, n: '02', t: '需求訪談' }, { p: 3, n: '03', t: 'AI 系統整合' }, { p: 2, n: '04', t: '場域落地' } ];
    var cards = nodes.map(function (d) {
      var c = el('div', 'jd-card'); c.setAttribute('aria-hidden', 'true'); c.dataset.p = d.p;
      el('i', 'jd-card-glow', c); el('span', 'jd-card-num', c, d.n);
      var lab = el('span', 'jd-card-label', c);
      Array.from(d.t).forEach(function (ch) { if (ch === ' ') { lab.appendChild(document.createTextNode(' ')); return; } var s = document.createElement('span'); s.className = 'jd-lc'; s.textContent = ch; lab.appendChild(s); });
      return c;
    });

    comp.classList.add('jd-hero-on');

    // 落點：以 sticky 區塊的比例表示（p1 右上、p2 左上、p3 左下、p4 右下 → 01 左上、02 右上、03 右下、04 左下 順時針）
    var spots = [ { x: .80, y: .24, r: 5 }, { x: .20, y: .25, r: -6 }, { x: .21, y: .77, r: 4 }, { x: .79, y: .78, r: -4 } ];
    var geo;
    function measure() {
      gsap.set(phs.concat([tagEl]), { clearProps: 'transform' });
      var s = stage.getBoundingClientRect(), t = tagEl.getBoundingClientRect();
      var narrow = s.width < 768, share = narrow ? 0.19 : 0.24;
      var cx = function (sp) { return s.width * sp.x; };
      var cy = function (sp) { return s.height * (narrow ? (sp.y < .5 ? .28 : .76) : sp.y); };
      var TL = spots[1], TR = spots[0], BR = spots[3], BL = spots[2];
      gsap.set(net.t, { left: cx(TL), top: cy(TL), width: cx(TR) - cx(TL) });
      gsap.set(net.b, { left: cx(BL), top: cy(BR), width: cx(BR) - cx(BL) });
      gsap.set(net.l, { left: cx(TL), top: cy(TL), height: cy(BL) - cy(TL) });
      gsap.set(net.r, { left: cx(TR), top: cy(TR), height: cy(BR) - cy(TR) });
      var phH = s.height * share, phW = phH * 0.75;
      cards.forEach(function (c) {
        var sp = spots[+c.dataset.p], below = sp.y > .5, right = sp.x > .5, h = c.offsetHeight;
        gsap.set(c, { left: right ? 'auto' : Math.max(8, cx(sp) - phW / 2 - 16), right: right ? Math.max(8, s.width - (cx(sp) + phW / 2) - 16) : 'auto',
                      top: below ? cy(sp) - phH / 2 - h / 2 : cy(sp) + phH / 2 - h / 2, bottom: 'auto' });
      });
      geo = {
        tagY: (s.top + s.height / 2) - (t.top + t.height / 2),
        ph: phs.map(function (ph, i) {
          var r = ph.getBoundingClientRect(), sp = spots[i];
          return { k: phH / r.height, dx: (s.left + cx(sp)) - (r.left + r.width / 2), dy: (s.top + cy(sp)) - (r.top + r.height / 2), r: sp.r,
                   ox: (sp.x < .5 ? -1 : 1) * s.width * 0.12, oy: (sp.y < .5 ? -1 : 1) * s.height * 0.10 };
        })
      };
    }
    measure();

    var chars = gsap.utils.toArray(tagEl.querySelectorAll('.jd-c'));
    var ink = getComputedStyle(p).getPropertyValue('--neutral--black').trim() || '#151717';
    var tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: spacer, start: 'top bottom', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true, onRefreshInit: measure } });
    // 1. 聚攏
    phs.forEach(function (ph, i) {
      tl.to(ph, { x: function () { return geo.ph[i].dx; }, y: function () { return geo.ph[i].dy; }, scale: function () { return geo.ph[i].k; }, rotation: function () { return geo.ph[i].r; }, ease: 'power2.inOut', duration: 0.34 }, i * 0.02);
      var img = ph.querySelector('img'); if (img) tl.to(img, { scale: 1.12, duration: 0.9 }, 0);
    });
    tl.to(tagEl, { y: function () { return geo.tagY; }, ease: 'power3.out', duration: 0.3 }, 0.08);
    // 2. 串聯
    tl.to('.jd-grid', { opacity: 1, duration: 0.2 }, 0.3)
      .to('.jd-glow', { opacity: 1, duration: 0.2 }, 0.34)
      .to(net.t, { scaleX: 1, duration: 0.07 }, 0.36)
      .to(net.r, { scaleY: 1, duration: 0.07 }, 0.43)
      .to(net.b, { scaleX: 1, duration: 0.07 }, 0.50)
      .to(net.l, { scaleY: 1, duration: 0.07 }, 0.57);
    cards.forEach(function (c, i) {
      var at = 0.34 + i * 0.07;
      tl.fromTo(c, { opacity: 0, y: 10, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.04 }, at);
      tl.fromTo(c.querySelector('.jd-card-glow'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.06 }, at + 0.02);
      tl.fromTo(c.querySelectorAll('.jd-lc'), { opacity: 0 }, { opacity: 1, stagger: { each: 0.006 }, duration: 0.01 }, at + 0.01);
    });
    // 3. 點亮
    tl.to(chars, { color: ink, stagger: { each: 0.008 }, duration: 0.06 }, 0.38);
    // 4. 散開
    phs.forEach(function (ph, i) {
      tl.to(ph, { x: function () { return geo.ph[i].dx + geo.ph[i].ox; }, y: function () { return geo.ph[i].dy + geo.ph[i].oy; }, opacity: 0, scale: function () { return geo.ph[i].k * 0.85; }, ease: 'power1.in', duration: 0.18 }, 0.8 + i * 0.015);
    });
    tl.to(cards, { opacity: 0, y: -8, duration: 0.1, stagger: 0.01 }, 0.8)
      .to(netWrap, { opacity: 0, duration: 0.12 }, 0.8)
      .to(['.jd-grid', '.jd-glow'], { opacity: 0, duration: 0.16 }, 0.82)
      .to({}, { duration: 0.02 }, 0.98);

    ST.refresh();
  }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
