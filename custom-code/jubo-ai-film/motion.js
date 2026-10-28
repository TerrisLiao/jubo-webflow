/* Jubo AI 原生頁動態（page settings → Before </body>）。來源：custom-code/jubo-ai-film/motion.js
 * 使用站上已載入的 GSAP 3.15＋ScrollTrigger（不重複載入、不初始化 Lenis）。
 * WebGL 只畫「思考光」與半透明的光之花瓣：位置全部讀自 Webflow 元素（data-light／data-fin 錨點），
 * 所以在 Designer 移動錨點，花瓣就跟著動。IX3 負責進場與標題逐行出現；本檔負責捲動分鏡。 */
(() => {
 'use strict';
 const root = document.querySelector('[data-film-root]');
 if (!root || root.dataset.filmReady) return;
 root.dataset.filmReady = '1';
 const $ = (s, c = root) => c.querySelector(s), $$ = (s, c = root) => [...c.querySelectorAll(s)];
 const gsap = window.gsap, ST = window.ScrollTrigger;
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const fine = matchMedia('(hover:hover) and (pointer:fine)');
 const SCRUB = '(min-width: 992px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)';
 const FLOW = '(max-width: 991px) and (prefers-reduced-motion: no-preference), (max-height: 619px) and (prefers-reduced-motion: no-preference)';
 const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
 const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
 let paused = reduced.matches, think = 0, thinkTarget = 0, raf = 0, last = performance.now(), time = 0, draws = 0;

 /* ---------- Pause control and visibility-gated loops ---------- */
 const loops = [];
 function loop(el, start, stop) {
  const l = { el, start, stop, inView: false, running: false };
  l.run = () => { if (!l.running && l.inView && !paused) { l.running = true; start(); } };
  l.halt = () => { if (l.running) { l.running = false; stop(); } };
  loops.push(l); io.observe(el); return l;
 }
 const io = new IntersectionObserver(es => es.forEach(e => {
  const l = loops.find(x => x.el === e.target); if (!l) return;
  l.inView = e.isIntersecting; l.inView ? l.run() : l.halt();
 }), { threshold: .2 });
 const toggle = $('[data-motion-toggle]');
 function setPaused(v) {
  paused = v; root.dataset.paused = String(v);
  if (toggle) { toggle.setAttribute('aria-pressed', String(v)); toggle.textContent = v ? '▶ 繼續動態' : '❚❚ 暫停動態'; }
  loops.forEach(l => v ? l.halt() : l.run()); wake();
 }
 if (toggle) toggle.addEventListener('click', e => { e.preventDefault(); setPaused(!paused); });
 root.addEventListener('keydown', e => { // links with role="button" also answer the space bar
  if (e.key === ' ' && e.target.matches('a[role="button"]')) { e.preventDefault(); e.target.click(); }
 });
 setPaused(paused);

 /* ---------- WebGL: thinking light and translucent petals (positions from data-fin anchors) ---------- */
 const MAXF = 8;
 const canvas = document.createElement('canvas');
 canvas.className = 'jaf-gl'; canvas.setAttribute('aria-hidden', 'true');
 Object.assign(canvas.style, { position: 'fixed', left: '0', top: '0', width: '100%', height: '100vh', zIndex: '0', pointerEvents: 'none' });
 root.prepend(canvas);
 const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec4 uLight;uniform vec4 uLightB;uniform vec3 uPtr;uniform vec3 uRip;
uniform vec4 uFin[${MAXF}];uniform vec4 uFinA[${MAXF}];uniform vec2 uRoot;
const vec3 PAPER=vec3(.965,.961,.945);const vec3 PEARL=vec3(1.,.992,.982);const vec3 PEACH=vec3(1.,.84,.72);
float sq(float x){return x*x;}
float blob(vec2 p,vec2 c,vec2 s){vec2 v=(p-c)/s;return exp(-dot(v,v));}
vec4 field(vec2 p){
 vec2 R=max(uLight.zw,vec2(1.));vec2 q=(p-uLight.xy)/R;float t=uTime;float h=uLightB.y;
 vec3 c1=vec3(.36,.82,.84);vec3 c2=mix(vec3(.62,.83,.98),vec3(.66,.93,.84),smoothstep(.2,.5,h));
 vec3 c3=mix(vec3(1.,.8,.66),vec3(.86,.95,.64),smoothstep(.3,.62,h));vec3 c4=mix(vec3(1.,.78,.8),vec3(.64,.86,.98),h);
 vec2 b1=vec2(-.42+.13*sin(t*.21),.05+.15*sin(t*.17+1.));vec2 b2=vec2(.4+.11*cos(t*.19),-.04+.16*cos(t*.23+.4));
 vec2 b3=vec2(.12*sin(t*.13),-.26+.1*sin(t*.29+2.));vec2 pp=(uPtr.xy-uLight.xy)/R;
 vec2 b4=mix(vec2(.22*cos(t*.11),.16*sin(t*.15)),pp,uPtr.z);vec2 s=vec2(.44,.56);
 float w1=blob(q,b1,s),w2=blob(q,b2,s),w3=blob(q,b3,s*vec2(1.3,.8))*.85,w4=blob(q,b4,s*.72)*(.45+.55*uPtr.z);
 vec3 col=(c1*w1+c2*w2+c3*w3+c4*w4)/max(w1+w2+w3+w4,1e-4);
 float a=clamp((w1+w2+w3+w4)*1.05,0.,1.)*smoothstep(1.4,.55,length(q*vec2(.82,1.)));
 return vec4(col,a*uLightB.x);
}
float capsule(vec2 p,float r1,float r2,float h){p.x=abs(p.x);float b=(r1-r2)/h;float a=sqrt(max(1.-b*b,0.));float k=dot(p,vec2(-b,a));
 if(k<0.)return length(p)-r1;if(k>a*h)return length(p-vec2(0.,h))-r2;return dot(p,vec2(a,b))-r1;}
void main(){
 vec2 p=gl_FragCoord.xy;vec4 f=field(p);vec3 col=mix(PAPER,f.rgb,f.a*.4);
 float rip=0.;if(uRip.z>.001){float d=length(p-uRip.xy);float rr=(1.-uRip.z)*uLight.w*1.6;rip=exp(-sq((d-rr)/(uLight.w*.05+1.)))*uRip.z;}
 col=mix(col,vec3(1.),rip*.22*f.a);
 for(int i=0;i<${MAXF};i++){
  vec4 r=uFin[i];vec4 A=uFinA[i];
  if(A.x<.003||r.z<2.||r.w<2.)continue;
  vec2 c=r.xy+r.zw*.5;
  bool lying=r.z>r.w*1.4;
  vec2 B=uRoot,T=vec2(c.x,r.y+r.w);
  if(lying){B=c-vec2(r.z*.5,0.);T=c+vec2(r.z*.5,0.);}
  float R=lying?r.w*.62:A.z*.5;
  vec2 lo=min(B,T)-R*1.8,hi=max(B,T)+R*1.8;
  if(p.x<lo.x||p.x>hi.x||p.y<lo.y||p.y>hi.y)continue;
  float sway=.04*sin(uTime*.42+A.w*1.7)+.018*sin(uTime*.9+A.w*3.1);
  float rnd=fract(sin(A.w*12.9898+4.1)*43758.5453)-.5;
  float d,t,side;
  if(lying){ // horizontal anchor: a lying leaf
   vec2 hw=vec2(r.z*.5,R);vec2 q=p-c;q.y-=q.x*sway*.6+hw.y*.25*sin(q.x/hw.x*3.1+uTime*.5);
   float e=length(q/hw);d=(e-1.)*min(hw.x,hw.y);t=q.x/hw.x*.5+.5;side=clamp(q.y/hw.y,-1.,1.);
  }else{ // petal growing from the shared root to the top of its anchor
   vec2 v0=T-B;float L=length(v0);if(L<4.)continue;
   float an=atan(v0.x,v0.y)+sway+rnd*.06;vec2 dir=vec2(sin(an),cos(an));
   float r0=R*.12;vec2 v=p-B;vec2 q=vec2(dot(v,vec2(dir.y,-dir.x)),dot(v,dir));
   float tt=clamp(q.y/L,0.,1.);
   q.x-=(A.y*.7+rnd*.3)*q.y*tt*.55;q.x*=1.+rnd*.3*tt;
   float top=smoothstep(.45,1.,tt);q.y+=top*(R*.22*rnd*q.x/R+R*.06);
   float hh=max(L-R-r0,1.);d=capsule(q,r0,R,hh);
   t=tt;d+=R*.07*sin(t*4.4+uTime*.5+A.w*2.1)+R*.04*sin(q.x/R*2.+uTime*.7+A.w);side=clamp(q.x/R,-1.,1.);
  }
  float a=A.x;
  float soft=1.5+R*.06;
  float inside=smoothstep(soft,-soft,d);
  float depth=clamp(-d/(R*.8),0.,1.);
  float stem=lying?1.:smoothstep(0.,.2,t);
  float h=uLightB.y;
  float k=fract(A.w*.618+.15);
  vec3 deep=k<.34?vec3(.5,.84,.87):k<.67?vec3(.69,.82,.97):vec3(.62,.9,.82);
  deep=mix(deep,vec3(1.,.8,.7),smoothstep(.55,1.,fract(A.w*.382+h))*.55);
  vec4 g=field(p+vec2(side*R*.5,R*.3));deep=mix(deep,g.rgb,g.a*.3);
  vec3 body=mix(PEARL,deep,pow(depth,.7)*(.55+.3*t));
  body=mix(body,vec3(1.,.9,.8),sq(1.-t)*.75*(1.-depth*.3));
  body*=1.-.07*side*depth;
  float edge=smoothstep(.0,.35,depth);
  float rim=exp(-sq(d/(soft*2.2)))*.55;
  float sweep=exp(-sq((t-(fract(uTime*(.05+uLightB.z*.2)+A.w*.21)*1.4-.2))/.1));
  vec2 dp=(p-uPtr.xy)/(uLight.w*.35+1.);float near=uPtr.z*exp(-dot(dp,dp));
  float halo=exp(-max(d,0.)/(R*.4+1.))*(1.-inside);
  col=mix(col,vec3(1.,.97,.94),halo*.32*a*stem);
  col=mix(col,body,inside*(.58+.3*edge)*a*stem);
  col=mix(col,vec3(1.,.99,.975),inside*(1.-edge)*(.45+.25*sweep+.25*near+.15*uLightB.z)*a*stem);
  col=mix(col,vec3(1.,.99,.975),rim*(.6+.4*sweep)*a*stem);
 }
 col+=(fract(sin(dot(floor(p),vec2(12.9898,78.233)))*43758.5453)-.5)*.02;
 gl_FragColor=vec4(col,1.);
}`;
 let gl = null, U = {}, aura = null; // aura is declared before the try so fallback() can run inside it
 try {
  gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' });
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  for (const n of ['uRes', 'uTime', 'uLight', 'uLightB', 'uPtr', 'uRip', 'uFin', 'uFinA', 'uRoot']) U[n] = gl.getUniformLocation(prog, n);
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); fallback(); });
  root.dataset.gl = 'on';
 } catch (err) { fallback(); }
 function fallback() {
  gl = null; root.dataset.gl = 'off'; canvas.hidden = true;
  if (!aura) { aura = document.createElement('div'); aura.className = 'jaf-aura'; aura.setAttribute('aria-hidden', 'true'); root.prepend(aura); }
 }

 /* ---------- Director: blends the anchors of the scenes on screen ---------- */
 const scenes = $$('[data-scene]').map(el => {
  const fins = []; $$('[data-fin]', el).forEach(f => { fins[+f.dataset.fin] = f; });
  return { el, name: el.dataset.scene, stage: $('[data-stage]', el) || el, fins, light: $('[data-light]', el), w: 0 };
 });
 const cur = Array.from({ length: MAXF }, () => ({ x: 0, y: 0, w: 0, h: 0, a: 0 }));
 const light = { x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth * .4, ry: innerHeight * .3, hue: 0, gain: 0 };
 const ptr = { x: innerWidth / 2, y: innerHeight / 2, on: 0, tx: innerWidth / 2, ty: innerHeight / 2, ton: 0 };
 const rip = { x: 0, y: 0, v: 0 };
 const finData = new Float32Array(MAXF * 4), finA = new Float32Array(MAXF * 4);
 let vw = innerWidth, vh = innerHeight, dpr = 1;
 function resize() { // resizing clears the WebGL buffer, so redraw in the same task
  const nvw = innerWidth, nvh = innerHeight, nd = Math.min(devicePixelRatio || 1, nvw < 768 ? 1.25 : 1.5);
  const W = Math.round(nvw * nd), H = Math.round(nvh * nd);
  vw = nvw; vh = nvh; dpr = nd; canvas.style.height = vh + 'px';
  if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; if (gl) gl.viewport(0, 0, W, H); if (scenes.length) draw(); }
  wake();
 }
 function opacityOf(el, stop) {
  let o = 1;
  for (let n = el; n && n !== stop; n = n.parentElement) {
   const cs = getComputedStyle(n);
   if (cs.display === 'none' || cs.visibility === 'hidden') return 0;
   o *= +cs.opacity;
  }
  return o;
 }
 function weightOf(s) {
  const r = s.stage.getBoundingClientRect();
  if (r.bottom <= 0 || r.top >= vh || r.height < 1) return 0;
  return smooth(.1, .85, (Math.min(r.bottom, vh) - Math.max(r.top, 0)) / Math.min(r.height, vh));
 }
 function direct(dt) {
  let W = 0;
  for (const s of scenes) { s.w = weightOf(s); W += s.w; }
  const k = 1 - Math.exp(-dt * 11), kl = 1 - Math.exp(-dt * 4);
  let moving = false;
  for (let i = 0; i < MAXF; i++) {
   let sw = 0, x = 0, y = 0, w = 0, h = 0, a = 0;
   for (const s of scenes) {
    const el = s.fins[i]; if (!el || s.w <= 0) continue;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
    const o = opacityOf(el, s.el);
    sw += s.w; x += r.left * s.w; y += r.top * s.w; w += r.width * s.w; h += r.height * s.w; a += o * s.w;
   }
   const c = cur[i];
   if (sw > 0) {
    x /= sw; y /= sw; w /= sw; h /= sw; a /= Math.max(W, 1);
    if (c.a < .02) { c.x = x; c.y = y; c.w = w; c.h = h; }
    const d = Math.abs(x - c.x) + Math.abs(y - c.y) + Math.abs(w - c.w) + Math.abs(h - c.h);
    if (d > .5) moving = true;
    c.x += (x - c.x) * k; c.y += (y - c.y) * k; c.w += (w - c.w) * k; c.h += (h - c.h) * k;
   } else a = 0;
   if (Math.abs(a - c.a) > .002) moving = true;
   c.a += (a - c.a) * k;
  }
  let lx = 0, ly = 0, lrx = 0, lry = 0, lh = 0, lg = 0, lw = 0;
  for (const s of scenes) {
   if (!s.light || s.w <= 0) continue;
   const r = s.light.getBoundingClientRect(); if (r.width < 1) continue;
   const g = (parseFloat(getComputedStyle(s.light).getPropertyValue('--light-gain')) || 1) * opacityOf(s.light, s.el);
   lw += s.w; lx += (r.left + r.width / 2) * s.w; ly += (r.top + r.height / 2) * s.w;
   lrx += r.width * .62 * s.w; lry += r.height * .62 * s.w; lh += (+s.light.dataset.lightHue || 0) * s.w; lg += g * s.w;
  }
  if (lw > 0) {
   const t = { x: lx / lw, y: ly / lw, rx: lrx / lw, ry: lry / lw, hue: lh / lw, gain: lg / Math.max(W, 1) };
   for (const key in t) { const v = key === 'hue' || key === 'gain' ? kl : k; if (Math.abs(t[key] - light[key]) > .001) moving = true; light[key] += (t[key] - light[key]) * v; }
  } else { light.gain += (0 - light.gain) * kl; if (light.gain > .002) moving = true; }
  return moving;
 }
 function draw() {
  const r = root.getBoundingClientRect();
  canvas.style.clipPath = `inset(${Math.max(0, r.top)}px 0 ${Math.max(0, vh - r.bottom)}px 0)`;
  if (!gl) {
   if (aura) Object.assign(aura.style, { left: light.x - light.rx + 'px', top: light.y - light.ry + 'px', width: light.rx * 2 + 'px', height: light.ry * 2 + 'px', opacity: clamp(light.gain) });
   return;
  }
  const H = canvas.height;
  // Petals share one root under the middle of the cluster on screen and fan out to their anchors.
  let sx = 0, sa = 0, sb = 0, spread = 1;
  for (const c of cur) if (c.a > .02 && c.w <= c.h * 1.4) { sx += (c.x + c.w / 2) * c.a; sb += (c.y + c.h) * c.a; sa += c.a; }
  const cx = sa ? sx / sa : vw / 2, by = sa ? sb / sa : vh;
  for (const c of cur) if (c.a > .02) spread = Math.max(spread, Math.abs(c.x + c.w / 2 - cx));
  gl.uniform2f(U.uRoot, cx * dpr, H - by * dpr);
  for (let i = 0; i < MAXF; i++) {
   const c = cur[i];
   const lean = clamp((c.x + c.w / 2 - cx) / spread, -1, 1) * .36;
   finData.set([c.x * dpr, H - (c.y + c.h) * dpr, c.w * dpr, c.h * dpr], i * 4);
   finA.set([clamp(c.a), lean, Math.max(18, Math.min(c.h * .62, Math.max(c.w * 1.45, c.h * .32))) * dpr, i], i * 4);
  }
  gl.uniform2f(U.uRes, canvas.width, H);
  gl.uniform1f(U.uTime, time);
  gl.uniform4f(U.uLight, light.x * dpr, H - light.y * dpr, light.rx * dpr, light.ry * dpr);
  gl.uniform4f(U.uLightB, clamp(light.gain, 0, 1.6) * (vw < 768 ? .72 : 1), light.hue, think, 0);
  gl.uniform3f(U.uPtr, ptr.x * dpr, H - ptr.y * dpr, ptr.on);
  gl.uniform3f(U.uRip, rip.x * dpr, H - rip.y * dpr, rip.v);
  gl.uniform4fv(U.uFin, finData); gl.uniform4fv(U.uFinA, finA);
  gl.drawArrays(gl.TRIANGLES, 0, 3); draws++;
 }
 function frame(now) {
  raf = 0;
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (!paused) time += dt * (1 + think * 1.8);
  think += (thinkTarget - think) * (1 - Math.exp(-dt * 3));
  ptr.x += (ptr.tx - ptr.x) * (1 - Math.exp(-dt * 6)); ptr.y += (ptr.ty - ptr.y) * (1 - Math.exp(-dt * 6));
  ptr.on += (ptr.ton - ptr.on) * (1 - Math.exp(-dt * 4));
  rip.v = Math.max(0, rip.v - dt * .9);
  const moving = direct(dt);
  draw();
  const r = root.getBoundingClientRect(), onScreen = r.bottom > 0 && r.top < vh;
  if (!document.hidden && onScreen && (!paused || moving || rip.v > 0)) raf = requestAnimationFrame(frame);
 }
 function wake() { if (!raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } }
 addEventListener('scroll', wake, { passive: true });
 addEventListener('resize', resize, { passive: true });
 document.addEventListener('visibilitychange', wake);
 addEventListener('pointermove', e => {
  if (e.pointerType === 'touch' || !fine.matches || reduced.matches) return;
  ptr.tx = e.clientX; ptr.ty = e.clientY;
  const dx = (e.clientX - light.x) / Math.max(light.rx, 1), dy = (e.clientY - light.y) / Math.max(light.ry, 1);
  ptr.ton = paused ? 0 : clamp(1.6 - Math.hypot(dx, dy)) * clamp(light.gain); wake();
 }, { passive: true });
 addEventListener('pointerdown', e => {
  if (reduced.matches || paused) return;
  const dx = (e.clientX - light.x) / Math.max(light.rx, 1), dy = (e.clientY - light.y) / Math.max(light.ry, 1);
  if (Math.hypot(dx, dy) < 1.1 && light.gain > .3) { rip.x = e.clientX; rip.y = e.clientY; rip.v = 1; wake(); }
 }, { passive: true });
 resize();

 /* ---------- Helpers ---------- */
 function chars(el) { // split text into inline-block characters; gradient words stay one unit
  if (el.dataset.splitDone) return $$('.jaf-ch', el);
  el.dataset.splitDone = '1';
  const out = [];
  const walk = node => [...node.childNodes].forEach(n => {
   if (n.nodeType === 3) {
    const frag = document.createDocumentFragment();
    for (const ch of n.textContent) {
     if (ch === ' ') { frag.append(' '); continue; }
     const s = document.createElement('span'); s.className = 'jaf-ch'; s.textContent = ch;
     s.style.display = 'inline-block'; frag.append(s); out.push(s);
    }
    n.replaceWith(frag);
   } else if (n.nodeType === 1) {
    if (/key|accent/.test(n.className)) { n.classList.add('jaf-ch'); n.style.display = 'inline-block'; out.push(n); } else walk(n);
   }
  });
  walk(el); return out;
 }
 const fmt = (n, el) => (el.dataset.prefix || '') + Math.round(n).toLocaleString('en-US') + (el.dataset.suffix || '');
 function counter(el, tl, at, dur) {
  const o = { v: 0 }, to = +el.dataset.count;
  tl.fromTo(o, { v: 0 }, { v: to, duration: dur, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v, el); } }, at);
 }
 const sceneOf = name => scenes.find(s => s.name === name);
 const triggers = {};
 function pinTl(name, len, extra = {}) {
  const s = sceneOf(name);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: s.stage, start: 'top top', end: '+=' + len, pin: true, scrub: .9, anticipatePin: 1, invalidateOnRefresh: true, ...extra } });
  triggers[name] = tl.scrollTrigger; return tl;
 }
 function playTl(name) {
  const s = sceneOf(name);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: s.stage, start: 'top 70%', once: true } });
  triggers[name] = tl.scrollTrigger; return tl;
 }
 const blurIn = { opacity: 0, filter: 'blur(14px)', yPercent: 35 };
 const clear = { opacity: 1, filter: 'blur(0px)', yPercent: 0 };

 /* ---------- Scenes ---------- */
 function hero(pinned) {
  if (!pinned) return;
  const s = sceneOf('hero'), f = s.fins;
  const tl = pinTl('hero', '115%');
  tl.to({}, { duration: .42 })
   .to($('[data-hero-copy]', s.el), { yPercent: -20, opacity: 0, filter: 'blur(12px)', ease: 'power2.in', duration: .58 }, .42)
   .to([$('.jubo-ai-film_think', s.el), $('[data-pointer-hint]', s.el)], { opacity: 0, y: -28, filter: 'blur(8px)', ease: 'power2.in', duration: .4 }, .36)
   .to($('[data-hero-glass]', s.el), { scale: 1.5, yPercent: -12, ease: 'power2.inOut', duration: .58 }, .42)
   .to(f[0], { xPercent: -170, ease: 'power2.in', duration: .58 }, .42).to(f[4], { xPercent: 170, ease: 'power2.in', duration: .58 }, .42)
   .to(f[1], { xPercent: -70, ease: 'power2.in', duration: .58 }, .42).to(f[3], { xPercent: 70, ease: 'power2.in', duration: .58 }, .42);
 }

 function tech(pinned) {
  const s = sceneOf('tech'), el = s.el;
  const a = $('[data-tech="a"]', el), b = $('[data-tech="b"]', el), strike = $('[data-tech="strike"]', el);
  const strong = $('.jubo-ai-film_say-strong', el), no = chars($('.jubo-ai-film_say-no', el));
  const b1 = chars($('.jubo-ai-film_say-line', el)), b2 = chars($('.jubo-ai-film_say-line-2', el));
  const core = $('[data-tech="core"]', el), coreFins = $$('[data-fin]', core), label = $('[data-tech="core-label"]', el);
  const systems = $$('[data-system]', el), caption = $('[data-tech="caption"]', el);
  const svg = $('[data-tech-lines]', el); const paths = [], pulses = [];
  const NS = 'http://www.w3.org/2000/svg';
  systems.forEach(() => {
   const track = document.createElementNS(NS, 'path'); track.setAttribute('class', 'jaf-track');
   Object.assign(track.style, { stroke: 'rgba(0,124,133,.14)', strokeWidth: '1', fill: 'none', opacity: pinned ? '0' : '1' });
   const p = document.createElementNS(NS, 'path'); Object.assign(p.style, { stroke: 'url(#jaf-line)', strokeWidth: '1.6', fill: 'none', strokeLinecap: 'round' });
   svg.append(track, p); paths.push({ track, p, len: 1 });
   for (let k = 0; k < 2; k++) { const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', '3.2'); Object.assign(c.style, { fill: '#00a3ae', opacity: '0', filter: 'drop-shadow(0 0 4px rgba(0,178,192,.9))' }); svg.append(c); pulses.push({ c, line: paths.length - 1, off: k * .5 }); }
  });
  if (!svg.querySelector('#jaf-line')) svg.insertAdjacentHTML('afterbegin', '<defs><linearGradient id="jaf-line" x1="0" x2="1"><stop offset="0" stop-color="#00a3ae"/><stop offset="1" stop-color="#8fd0ff"/></linearGradient></defs>');
  function layoutLines() { // offsets ignore the GSAP transforms on systems, so lines end where systems settle
   if (!svg.getBoundingClientRect().width) return;
   const cx0 = core.offsetLeft, cy0 = core.offsetTop, cw = core.offsetWidth, ch = core.offsetHeight;
   systems.forEach((sys, i) => {
    const ic = $('.jubo-ai-film_icon', sys);
    const sx = sys.offsetLeft + ic.offsetLeft + ic.offsetWidth / 2, sy = sys.offsetTop + ic.offsetTop + ic.offsetHeight / 2;
    const left = sx < cx0 + cw / 2;
    const ex = left ? cx0 + cw * .12 : cx0 + cw * .88, ey = cy0 + ch * (sy < cy0 + ch / 2 ? .32 : .68);
    const x0 = sx + (left ? 1 : -1) * ic.offsetWidth * .75, dx = (ex - x0) * .55;
    const d = `M${x0.toFixed(1)},${sy.toFixed(1)} C${(x0 + dx).toFixed(1)},${sy.toFixed(1)} ${(ex - dx).toFixed(1)},${ey.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`;
    const L = paths[i]; L.track.setAttribute('d', d); L.p.setAttribute('d', d);
    try { L.len = L.p.getTotalLength() || 1; } catch (err) { L.len = 1; }
    L.p.style.strokeDasharray = L.len; if (!L.drawn) L.p.style.strokeDashoffset = L.len;
   });
  }
  layoutLines(); ST.addEventListener('refreshInit', layoutLines);
  const draw = { v: 0 };
  const setDraw = () => paths.forEach((L, i) => { const t = clamp(draw.v * 1.6 - i * .2); L.p.style.strokeDashoffset = L.len * (1 - t); L.drawn = t >= 1; });
  let pulseOn = false;
  gsap.ticker.add(() => {
   if (!pulseOn || paused) return;
   const t = time * .22;
   pulses.forEach(P => { const L = paths[P.line]; if (L.len < 2) return; const u = (t + P.off + P.line * .13) % 1; const pt = L.p.getPointAtLength(u * L.len); P.c.setAttribute('cx', pt.x); P.c.setAttribute('cy', pt.y); P.c.style.opacity = String(Math.sin(u * Math.PI) * .95); });
  });
  const pulse = v => { pulseOn = v; if (!v) pulses.forEach(P => { P.c.style.opacity = '0'; }); };
  if (pinned) {
   gsap.set([strong, ...no, ...b1, ...b2], blurIn);
   gsap.set(strike, { scaleX: 0, opacity: 1 });
   gsap.set(coreFins, { scaleY: 0 }); gsap.set([label, caption], { opacity: 0, y: 24 });
   systems.forEach((sys, i) => gsap.set(sys, { opacity: 0, filter: 'blur(10px)', x: (i % 2 ? 1 : -1) * innerWidth * .12, y: (i < 2 ? -1 : 1) * innerHeight * .08 }));
   const tl = pinTl('tech', '330%', { onUpdate: st => pulse(st.progress > .78) });
   tl.to(strong, { ...clear, duration: 1 }, 0)
    .to(no, { ...clear, duration: 1, stagger: .07 }, .25)
    .to(strike, { scaleX: 1, duration: .8, ease: 'power2.inOut' }, 1.9)
    .to([strong, ...no], { opacity: 0, filter: 'blur(14px)', yPercent: -45, duration: .8, stagger: .03, ease: 'power2.in' }, 2.9)
    .to(strike, { opacity: 0, duration: .5 }, 3.1)
    .to(b1, { ...clear, duration: .9, stagger: .045 }, 3.6)
    .to(b2, { ...clear, duration: .9, stagger: .06 }, 4.2)
    .fromTo($('.jubo-ai-film_say-key', el), { backgroundPosition: '100% 50%' }, { backgroundPosition: '0% 50%', duration: 1.2, ease: 'power1.inOut' }, 4.6)
    .to(b, { scale: .46, y: () => -innerHeight * .37, duration: 1.2, ease: 'power3.inOut' }, 5.7)
    .to(coreFins, { scaleY: 1, duration: 1.1, stagger: .12, ease: 'expo.out' }, 6.0)
    .fromTo(core, { '--light-gain': .35 }, { '--light-gain': 1.35, duration: 1.6, ease: 'power2.out' }, 6.0)
    .to(label, { opacity: 1, y: 0, duration: .8 }, 6.7)
    .to(systems, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: .22, ease: 'expo.out' }, 6.5)
    .to(paths.map(L => L.track), { opacity: 1, duration: .8 }, 7.0)
    .to(draw, { v: 1, duration: 1.6, ease: 'none', onUpdate: setDraw }, 7.4)
    .to(caption, { opacity: 1, y: 0, duration: .8 }, 8.9)
    .to({}, { duration: .9 }, 9.7);
  } else {
   gsap.set([...no, ...b1, ...b2], blurIn); gsap.set(strike, { scaleX: 0, opacity: 1 }); gsap.set(systems, { opacity: 0, y: 30 });
   const tl = playTl('tech');
   tl.to(no, { ...clear, duration: .8, stagger: .05 }, 0).to(strike, { scaleX: 1, duration: .6 }, .9)
    .to(a, { opacity: .35, duration: .6 }, 1.5).to(b1, { ...clear, duration: .8, stagger: .03 }, 1.3).to(b2, { ...clear, duration: .8, stagger: .04 }, 1.7)
    .to(systems, { opacity: 1, y: 0, duration: .8, stagger: .12 }, 2.1)
    .to(draw, { v: 1, duration: 1.4, ease: 'none', onUpdate: setDraw, onComplete: () => pulse(true) }, 2.4);
  }
 }

 function data(pinned) {
  const s = sceneOf('data'), el = s.el;
  const count = $('[data-data="count"]', el), num = $('[data-count="30"]', el), unit = $('.jubo-ai-film_count-unit', el), label = $('.jubo-ai-film_count-label', el);
  const streams = $$('[data-stream]', el), windows = $$('.jubo-ai-film_stream-window', el), tracks = $$('[data-stream-track]', el), labels = $$('.jubo-ai-film_stream-label', el);
  const stats = $('[data-data="stats"]', el), statNums = $$('.jubo-ai-film_stat-num', el), note = $('[data-data="note"]', el);
  if (pinned) {
   gsap.set(streams, { scaleY: 0 }); gsap.set([...windows, ...labels], { opacity: 0 }); gsap.set([stats, note], { opacity: 0, y: 24 });
   gsap.set(unit, { opacity: 0, scale: 1.5 }); gsap.set(label, { opacity: 0, yPercent: 40 });
   const tl = pinTl('data', '340%');
   counter(num, tl, 0, 1.8);
   tl.to(unit, { opacity: 1, scale: 1, duration: .7, ease: 'back.out(2)' }, 1.4)
    .to(label, { opacity: 1, yPercent: 0, duration: .7 }, 1.7)
    .to(count, { scale: .42, y: () => -(count.getBoundingClientRect().top - innerHeight * .02), duration: 1.2, ease: 'power3.inOut' }, 2.6)
    .fromTo(s.light, { '--light-gain': .2 }, { '--light-gain': 1.1, duration: 1.4 }, 2.8)
    .to(streams, { scaleY: 1, duration: 1.3, stagger: .14, ease: 'expo.out' }, 3.0)
    .to(windows, { opacity: 1, duration: .8, stagger: .1 }, 3.5)
    .fromTo(tracks, { yPercent: 0 }, { yPercent: -50, duration: 5.5, ease: 'none' }, 3.5)
    .to(labels, { opacity: 1, duration: .6, stagger: .12 }, 4.4)
    .to(stats, { opacity: 1, y: 0, duration: .8 }, 6.2)
    .to(note, { opacity: 1, y: 0, duration: .8 }, 7.4)
    .to({}, { duration: .6 }, 8.4);
   statNums.forEach(n => counter(n, tl, 6.3, 1.4));
  } else {
   gsap.set(streams, { scaleY: 0 });
   const tl = playTl('data');
   counter(num, tl, 0, 1.6);
   tl.to(streams, { scaleY: 1, duration: 1.1, stagger: .1, ease: 'expo.out' }, .3);
   statNums.forEach(n => counter(n, tl, .8, 1.4));
   tracks.forEach((t, i) => loop(t, () => { t.style.animation = `jaf-flow ${16 + i * 2}s linear infinite`; t.style.animationPlayState = 'running'; }, () => { t.style.animationPlayState = 'paused'; }));
  }
 }

 function secure(pinned) {
  const s = sceneOf('secure'), el = s.el;
  const record = $('[data-secure="record"]', el), shield = $('[data-secure="shield"]', el), posts = $$('[data-fin]', $('[data-secure="vault"]', el));
  const checks = $$('[data-check]', el), link = $('.jubo-ai-film_link', el);
  const rows = $$('[data-mask]', el).map(v => {
   const clearSpan = document.createElement('span'); clearSpan.className = 'jaf-clear'; clearSpan.textContent = v.textContent; clearSpan.style.display = 'inline-block';
   const mask = document.createElement('span'); mask.className = 'jubo-ai-film_record-mask'; mask.textContent = v.dataset.mask; mask.setAttribute('aria-hidden', 'true');
   v.textContent = ''; v.append(clearSpan, mask); return { clearSpan, mask };
  });
  const wipe = { p: 0 };
  const setWipe = () => {
   const w = record.clientWidth;
   gsap.set(shield, { x: (wipe.p * 1.25 - .28) * w, opacity: wipe.p > 0 && wipe.p < 1 ? 1 : 0 });
   rows.forEach((r, i) => { const t = clamp(wipe.p * 1.25 - .05 - i * .04); r.mask.style.clipPath = `inset(-20% ${(1 - t) * 100}% -20% 0)`; r.clearSpan.style.clipPath = `inset(-20% 0 -20% ${t * 100}%)`; });
  };
  const ticks = checks.map(c => [$('.jubo-ai-film_check-ring', c), $('.jubo-ai-film_check-tick', c)]);
  ticks.flat().forEach(p => { const L = p.getTotalLength ? p.getTotalLength() : 30; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.dataset.len = L; });
  const checkTl = (tl, at, gap) => checks.forEach((c, i) => {
   tl.fromTo(c, { opacity: .25, x: -10 }, { opacity: 1, x: 0, duration: .5 }, at + i * gap)
    .to(ticks[i], { strokeDashoffset: 0, duration: .6, stagger: .15, ease: 'power2.out' }, at + i * gap);
  });
  if (pinned) {
   gsap.set(record, { opacity: 0, y: 40, filter: 'blur(10px)' }); gsap.set(posts, { scaleY: 0 }); gsap.set(link, { opacity: 0 });
   const tl = pinTl('secure', '270%');
   tl.to(record, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, .2)
    .to(posts, { scaleY: 1, duration: 1.2, stagger: .15, ease: 'expo.out' }, .4)
    .to(wipe, { p: 1, duration: 2.6, ease: 'power1.inOut', onUpdate: setWipe }, 1.6);
   checkTl(tl, 2.2, .55);
   tl.to(link, { opacity: 1, duration: .6 }, 7.0).to({}, { duration: .8 }, 7.6);
  } else {
   const tl = playTl('secure');
   checkTl(tl, .2, .18);
   loop(record, () => { record._sweep = gsap.fromTo(wipe, { p: 0 }, { p: 1, duration: 3.2, ease: 'power1.inOut', repeat: -1, repeatDelay: 1.6, yoyo: true, onUpdate: setWipe }); }, () => record._sweep && record._sweep.kill());
  }
 }

 function caps(pinned) {
  const s = sceneOf('caps'), el = s.el;
  const items = $$('[data-cap]', el), descs = $$('.jubo-ai-film_cap-desc', el), scanner = $('[data-caps="scanner"]', el);
  if (!pinned) { items.forEach(i => { i.dataset.on = 'true'; }); return; }
  gsap.set(items, { opacity: .16 }); gsap.set(descs, { height: 0, opacity: 0, overflow: 'hidden' }); gsap.set(scanner, { scaleX: 0, opacity: 0 });
  const tops = () => { let y = 0; return items.map(i => { const t = y; y += i.offsetHeight + 5.6; return t; }); };
  let T = tops();
  ST.addEventListener('refreshInit', () => { gsap.set(descs, { height: 0 }); T = tops(); });
  const state = { i: -1 };
  const tl = pinTl('caps', '380%');
  tl.eventCallback('onUpdate', () => { const idx = Math.min(items.length - 1, Math.floor((tl.time() - 1.2) / 1.75)); if (idx !== state.i) { state.i = idx; items.forEach((it, k) => { it.dataset.on = String(k === idx); }); } });
  tl.to(scanner, { scaleX: 1, opacity: 1, height: () => items[0].offsetHeight, duration: .9, ease: 'expo.out' }, .6);
  items.forEach((it, i) => {
   const at = 1.2 + i * 1.75;
   if (i) tl.to(scanner, { y: () => T[i], height: () => items[i].offsetHeight, duration: .9, ease: 'power3.inOut' }, at);
   tl.to(it, { opacity: 1, duration: .5 }, at + .1).to(descs[i], { height: 'auto', opacity: 1, duration: .7 }, at + .2);
   if (i < items.length - 1) tl.to(it, { opacity: .16, duration: .5 }, at + 1.6).to(descs[i], { height: 0, opacity: 0, duration: .6 }, at + 1.55);
  });
  tl.to({}, { duration: .8 }, 10.2);
 }

 function suite(pinned) {
  const s = sceneOf('suite'), el = s.el, track = $('[data-suite="track"]', el), works = $$('[data-work]', el);
  const run = (tl, w, at) => {
   const raw = $$('[data-raw] span', w), sum = $$('.jubo-ai-film_sum-item', w);
   tl.to(raw, { x: () => w.offsetWidth * .2, opacity: 0, scaleX: .3, duration: .9, stagger: .07, ease: 'power2.in' }, at)
    .fromTo(sum, { opacity: 0, x: -24, filter: 'blur(6px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: .8, stagger: .18 }, at + .7);
  };
  if (pinned) {
   const tl = pinTl('suite', '330%');
   tl.fromTo(track, { x: 0 }, { x: () => -(track.scrollWidth - innerWidth), duration: 10, ease: 'none' }, 0);
   works.forEach((w, i) => run(tl, w, .6 + i * 3.2));
  } else {
   works.forEach(w => { const tl = gsap.timeline({ scrollTrigger: { trigger: w, start: 'top 70%', once: true } }); run(tl, w, .1); });
  }
 }

 function amy(pinned) {
  const s = sceneOf('amy'), el = s.el, fin = $('[data-amy="fin"]', el), sources = $$('[data-source]', el), report = $$('[data-report]', el);
  const toFin = (src, axis) => () => { const a = src.getBoundingClientRect(), b = fin.getBoundingClientRect(); return axis === 'x' ? (b.left + b.width / 2) - (a.left + a.width / 2) : (b.top + b.height / 2) - (a.top + a.height / 2); };
  const build = (tl, t0, gap) => {
   tl.fromTo(fin, { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'expo.out' }, t0)
    .fromTo(sources, { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: .6, stagger: .08 }, t0 + .3);
   sources.forEach((src, i) => tl.to(src, { x: toFin(src, 'x'), y: toFin(src, 'y'), scale: .5, opacity: 0, duration: 1, ease: 'power3.in' }, t0 + 1.5 + i * gap));
   tl.fromTo(s.light, { '--light-gain': .8 }, { '--light-gain': 1.5, duration: .8, yoyo: true, repeat: 1 }, t0 + 1.8)
    .fromTo(report, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .8, stagger: gap * 1.4 }, t0 + 2.6);
  };
  if (pinned) { const tl = pinTl('amy', '250%'); build(tl, .2, .22); tl.to({}, { duration: .8 }); }
  else { const tl = playTl('amy'); build(tl, 0, .12); }
 }

 function ibee(pinned) {
  const s = sceneOf('ibee'), el = s.el, from = $$('[data-from]', el), to = $$('[data-to]', el), steps = $$('[data-step]', el), fin = $('[data-ibee="fin"]', el), beam = $('[data-ibee="beam"]', el);
  const setStep = n => steps.forEach((st, i) => { st.dataset.on = String(i <= n); });
  const build = (tl, t0) => {
   tl.fromTo(from, { opacity: .25 }, { opacity: 1, duration: .5, stagger: .2, onStart: () => setStep(0) }, t0)
    .fromTo(beam, { y: 0, opacity: 0 }, { y: () => fin.offsetHeight, opacity: 1, duration: 1.4, ease: 'power1.inOut', onStart: () => setStep(1) }, t0 + 1)
    .to(beam, { opacity: 0, duration: .3 }, t0 + 2.3)
    .fromTo(to, { opacity: .25 }, { opacity: 1, duration: .5, stagger: .25, onStart: () => { setStep(2); to.forEach(t => { t.dataset.on = 'true'; }); }, onReverseComplete: () => { setStep(1); to.forEach(t => { t.dataset.on = 'false'; }); } }, t0 + 2.4);
  };
  const tl = pinned ? pinTl('ibee', '220%') : playTl('ibee');
  setStep(-1); build(tl, pinned ? .3 : 0); if (pinned) tl.to({}, { duration: .8 });
  const replay = $('[data-ibee="replay"]', el);
  replay.onclick = e => {
   e.preventDefault(); if (paused) return;
   const beam2 = beam.cloneNode(); fin.append(beam2); setStep(-1); to.forEach(t => { t.dataset.on = 'false'; });
   gsap.timeline({ onComplete: () => beam2.remove() })
    .call(() => setStep(0)).fromTo(from, { opacity: .25 }, { opacity: 1, duration: .3, stagger: .12 })
    .call(() => setStep(1)).fromTo(beam2, { y: 0, opacity: 1 }, { y: fin.offsetHeight, duration: 1, ease: 'power1.inOut' }).to(beam2, { opacity: 0, duration: .2 })
    .call(() => { setStep(2); to.forEach((t, i) => setTimeout(() => { t.dataset.on = 'true'; }, i * 180)); });
  };
 }

 /* N.Copilot conversation (illustrative only) */
 const prompts = {
  summary: { q: '幫我整理這位個案的派案資料重點。', reply: '以下是派案前需要先掌握的重點：', src: ['派案單', '照顧計畫', '近期服務紀錄'], title: '派案資料摘要', items: ['基本資料與目前狀況', '照顧需求與既有支持', '派案前需要確認的事項'] },
  interview: { q: '幫我整理這次訪談的重點。', reply: '這次訪談可以整理成以下幾個面向：', src: ['訪談逐字稿', '個案資料'], title: '訪談重點', items: ['個案與家屬最在意的事', '目前的支持與日常作息', '需要追問與後續追蹤的地方'] },
  plan: { q: '幫我準備一份照顧計畫草稿。', reply: '先根據現有資料整理架構，再逐段檢視：', src: ['個案資料', '訪談紀錄', '機構範本'], title: '照顧計畫起點', items: ['依紀錄描述照顧需求', '擬定待討論的目標', '列出需專業確認的措施'] }
 };
 const chat = $('[data-chat]'), thread = $('[data-chat-thread]'), status = $('[data-chat-status]'), field = $('[data-chat-input]');
 const markSvg = (($('.jubo-ai-film_chat-logo svg') || {}).outerHTML) || '';
 let selected = 'summary', ctl = null, chatRan = false;
 const wait = (ms, sig) => new Promise((res, rej) => { const t = setTimeout(res, paused ? 0 : ms); sig.addEventListener('abort', () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); }, { once: true }); });
 const setState = (st, txt) => { chat.dataset.status = st; status.textContent = txt; thinkTarget = st === 'working' ? 1 : 0; wake(); };
 const scrollChat = () => thread.scrollTo({ top: thread.scrollHeight, behavior: paused ? 'auto' : 'smooth' });
 async function converse() {
  if (ctl) ctl.abort(); ctl = new AbortController(); const sig = ctl.signal; chatRan = true;
  const c = prompts[selected]; thread.replaceChildren();
  const u = document.createElement('p'); u.className = 'jaf-msg-user'; u.textContent = c.q; thread.append(u);
  const ai = document.createElement('div'); ai.className = 'jaf-msg-ai'; ai.innerHTML = markSvg; const body = document.createElement('div'); ai.append(body); thread.append(ai);
  const st = document.createElement('p'); st.textContent = '正在讀取示意資料…'; body.append(st);
  setState('working', '思考中'); scrollChat();
  try {
   await wait(900, sig); st.textContent = c.reply;
   const det = document.createElement('details'); const sm = document.createElement('summary'); sm.textContent = '參考資料・' + c.src.length;
   const ul = document.createElement('ul'); c.src.forEach(x => { const li = document.createElement('li'); li.textContent = x; ul.append(li); }); det.append(sm, ul); body.append(det);
   await wait(600, sig);
   const out = document.createElement('div'); out.className = 'jaf-out'; const tt = document.createElement('strong'); tt.textContent = c.title; const ol = document.createElement('ol'); out.append(tt, ol); body.append(out);
   for (const x of c.items) { await wait(420, sig); const li = document.createElement('li'); li.textContent = x; ol.append(li); scrollChat(); }
   const rv = document.createElement('button'); rv.type = 'button'; rv.className = 'jaf-review'; rv.textContent = '標記為已確認';
   rv.addEventListener('click', () => { rv.textContent = '已由你確認'; rv.disabled = true; setState('reviewed', '已確認'); });
   out.append(rv); setState('ready', '等待你確認'); scrollChat();
  } catch (err) { if (err.name !== 'AbortError') throw err; }
 }
 $$('[data-prompt]').forEach(btn => btn.addEventListener('click', e => {
  e.preventDefault(); selected = btn.dataset.prompt; field.textContent = prompts[selected].q;
  $$('[data-prompt]').forEach(b => b.setAttribute('aria-pressed', String(b === btn))); converse();
 }));
 $('[data-chat-send]').addEventListener('click', e => { e.preventDefault(); converse(); });

 function copilot(pinned) {
  const s = sceneOf('copilot'), el = s.el, meet = $('[data-copilot="meet"]', el), word = chars($('.jubo-ai-film_meet-word', el)), mark = $('.jubo-ai-film_meet-mark', el), sub = $('[data-copilot="sub"]', el);
  const zone = $('[data-copilot="zone"]', el), fins = $$('[data-fin]', zone), prompts$ = $$('[data-prompt]', el);
  gsap.set(word, blurIn); gsap.set(mark, { clipPath: 'inset(0% 100% 0% 0%)' }); gsap.set(sub, { opacity: 0, y: 20 });
  gsap.set(chat, { opacity: 0, scale: .9, y: 70, filter: 'blur(12px)' }); gsap.set(fins, { scaleY: 0 }); gsap.set(prompts$, { opacity: 0, y: 12 });
  const build = (tl, t0, big) => {
   tl.to(word, { ...clear, duration: .9, stagger: .12 }, t0)
    .to(mark, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut' }, t0 + .5)
    .to(sub, { opacity: 1, y: 0, duration: .7 }, t0 + 1.4);
   if (big) tl.fromTo(meet, { scale: 1.18 }, { scale: .5, y: () => -(meet.getBoundingClientRect().top - innerHeight * .035), duration: 1.2, ease: 'power3.inOut', immediateRender: false }, t0 + 2.6);
   tl.to(fins, { scaleY: 1, duration: 1.1, stagger: .15, ease: 'expo.out' }, t0 + (big ? 3.0 : 1.6))
    .to(chat, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'back.out(1.4)' }, t0 + (big ? 3.2 : 1.8))
    .to(prompts$, { opacity: 1, y: 0, duration: .5, stagger: .1 }, t0 + (big ? 4.0 : 2.4));
  };
  if (pinned) {
   gsap.set(meet, { scale: 1.18 });
   const tl = pinTl('copilot', '230%', { onUpdate: st => { if (st.progress > .72 && !chatRan) converse(); } });
   build(tl, 0, true); tl.to({}, { duration: 1 });
  } else { const tl = playTl('copilot'); build(tl, 0, false); tl.call(() => { if (!chatRan) converse(); }); }
 }

 /* What-if typer and idea dialog */
 const questions = $$('[data-idea]').map(a => a.textContent.trim());
 const qText = $('[data-question-text]');
 const typeTo = (txt, n) => { qText.textContent = txt.slice(0, n); };
 function next(pinned) {
  const s = sceneOf('next'), el = s.el, fins = $$('[data-fin]', $('[data-next="ask"]', el));
  if (pinned) {
   gsap.set(fins, { opacity: .3 });
   const prog = { v: 0 }; let lastQ = -1;
   const tl = pinTl('next', '260%');
   tl.to(prog, { v: 3, duration: 9, ease: 'none', onUpdate: () => {
    const q = Math.min(2, Math.floor(prog.v)), local = prog.v - q, txt = questions[q];
    const shown = local < .62 ? Math.round(txt.length * smooth(.05, .55, local)) : Math.round(txt.length * (1 - smooth(.86, .99, local)));
    typeTo(txt, q === 2 && local > .62 ? txt.length : shown);
    if (q !== lastQ) { lastQ = q; fins.forEach((f, i) => gsap.to(f, { opacity: i === q ? 1 : .3, duration: .6, overwrite: true })); }
   } }, 0);
   tl.fromTo(s.light, { '--light-gain': .5 }, { '--light-gain': 1.2, duration: 9, ease: 'none' }, 0);
  } else {
   let qi = 0, n = 0, dir = 1, timer = 0;
   const tick = () => {
    const txt = questions[qi]; n += dir; typeTo(txt, n);
    let delay = 85;
    if (n >= txt.length) { dir = -1; delay = 2200; } else if (n <= 0) { dir = 1; qi = (qi + 1) % questions.length; delay = 400; }
    timer = setTimeout(tick, delay);
   };
   loop($('[data-next="ask"]', el), () => { n = 0; dir = 1; tick(); }, () => clearTimeout(timer));
  }
 }
 const ideas = {
  signals: ['如果變化能更早被看見？', '想像一個工具，把近期量測與照護紀錄放在同一個畫面，協助團隊注意值得多看一眼的變化。', '照護專業人員依脈絡判斷，決定下一步。'],
  time: ['如果團隊能多一點時間陪伴長輩？', '想像更多小工具，從工作流程裡既有的資料準備例行草稿，讓人員有更清楚的起點。', '團隊檢視並調整後才使用。'],
  picture: ['如果主管能更清楚看見全貌？', '想像把訪視、服務與日常紀錄裡的樣態放進同一個視角，幫助團隊對照護提出更好的問題。', '洞察用來支持討論與專業判斷，不替人做照護決定。']
 };
 const dialog = $('[data-idea-dialog]'); let opener = null;
 const focusables = () => $$('a[href],button:not([disabled])', dialog);
 function openIdea(btn) {
  opener = btn; const [t, c, r] = ideas[btn.dataset.idea];
  $('[data-idea-title]', dialog).textContent = t; $('[data-idea-copy]', dialog).textContent = c; $('[data-idea-review]', dialog).textContent = r;
  dialog.hidden = false; if (window.lenis) window.lenis.stop();
  if (!reduced.matches) gsap.fromTo($('.jubo-ai-film_dialog-card', dialog), { opacity: 0, y: 24, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: .5, ease: 'back.out(1.4)' });
  $('[data-dialog-close]', dialog).focus();
 }
 function closeIdea() { dialog.hidden = true; if (window.lenis) window.lenis.start(); if (opener) opener.focus(); }
 $$('[data-idea]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openIdea(b); }));
 $('[data-dialog-close]', dialog).addEventListener('click', e => { e.preventDefault(); closeIdea(); });
 dialog.addEventListener('click', e => { if (e.target === dialog) closeIdea(); });
 dialog.addEventListener('keydown', e => {
  if (e.key === 'Escape') { e.preventDefault(); closeIdea(); }
  if (e.key !== 'Tab') return;
  const f = focusables(), first = f[0], lastF = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastF.focus(); } else if (!e.shiftKey && document.activeElement === lastF) { e.preventDefault(); first.focus(); }
 });

 function close(pinned) {
  const s = sceneOf('close');
  gsap.fromTo(s.fins.filter(Boolean), { scaleY: .15 }, { scaleY: 1, ease: 'none', stagger: .05, scrollTrigger: { trigger: s.stage, start: 'top bottom', end: pinned ? 'center center' : 'top 30%', scrub: .8 } });
 }

 /* Thinking pill typer (hero) */
 const thinkEl = $('[data-think-text]');
 const thinking = ['正在比對交班紀錄', '正在讀取今日生命徵象', '正在整理家訪重點', '正在摘要照護紀錄'];
 { let qi = 0, n = thinking[0].length, dir = -1, timer = 0;
  const tick = () => { const t = thinking[qi]; n += dir; thinkEl.textContent = t.slice(0, Math.max(0, n));
   let d = dir > 0 ? 95 : 40;
   if (n >= t.length) { dir = -1; d = 2400; } else if (n <= 0) { dir = 1; qi = (qi + 1) % thinking.length; d = 300; }
   timer = setTimeout(tick, d); };
  loop($('.jubo-ai-film_think'), () => { timer = setTimeout(tick, 1800); }, () => clearTimeout(timer)); }
 const hint = $('[data-pointer-hint]'); if (hint && !fine.matches) hint.textContent = '輕觸畫面，花瓣裡的光會回應你';

 /* ---------- Modes ---------- */
 const mm = gsap.matchMedia();
 mm.add({ scrub: SCRUB, flow: FLOW, still: '(prefers-reduced-motion: reduce)' }, ctx => {
  const { scrub, still } = ctx.conditions;
  root.dataset.filmMode = scrub ? 'scrub' : still ? 'still' : 'flow';
  if (!still) [hero, tech, data, secure, caps, suite, amy, ibee, copilot, next, close].forEach(f => f(!!scrub));
  ST.refresh(); wake();
  return () => { root.dataset.filmMode = 'off'; Object.keys(triggers).forEach(k => delete triggers[k]); loops.forEach(l => l.halt()); };
 });
 reduced.addEventListener('change', () => setPaused(reduced.matches));
 // IX3 keeps its own ScrollTrigger instance; a resize after load makes it re-measure around our pins.
 addEventListener('load', () => setTimeout(() => dispatchEvent(new Event('resize')), 300), { once: true });

 /* Read-only diagnostics for acceptance tests; no case or user data. */
 window.juboAIFilm = {
  get mode() { return root.dataset.filmMode; }, get gl() { return root.dataset.gl; }, get draws() { return draws; }, get time() { return time; },
  get paused() { return paused; }, get think() { return think; }, get pins() { return Object.keys(triggers).filter(k => triggers[k] && triggers[k].pin).sort(); },
  fins: () => cur.map(c => ({ x: Math.round(c.x), y: Math.round(c.y), w: Math.round(c.w), h: Math.round(c.h), a: +c.a.toFixed(2) })),
  light: () => ({ ...light }), weights: () => Object.fromEntries(scenes.map(s => [s.name, +s.w.toFixed(2)])),
  goTo(name, p) { const t = triggers[name]; if (!t) return false; const y = t.start + (t.end - t.start) * p; if (window.lenis) window.lenis.scrollTo(y, { immediate: true, force: true }); else scrollTo(0, y); ST.update(); wake(); return true; }
 };
 wake();
})();
