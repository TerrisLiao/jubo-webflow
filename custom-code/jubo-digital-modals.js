/*
 * 智齡數位專案介紹彈窗 — 腳本
 * 部署位置：Webflow 頁面 /ecosystem/jubo-digital（page id 6a0d68268bcb665e0371bacd）→ Page Settings → Custom Code → Before </body>（<script id="jd-modals">）
 * 本檔是正本；站上那份是衍生部署品。
 *
 * 取代 IX2「Modal 1/2/3 [Open]」「Modal 1/2/3 [Close]」。
 * 2026-09-24 移除 IX2 時，3 顆「了解更多」（glass-button, href="#"）上的點擊事件一併被刪，彈窗打不開。
 *
 * 開啟：按鈕加上屬性 data-jd-modal="1|2|3"，對應 .modal1_component / .modal2_component / .modal3_component
 * 關閉：.modal_close-button、.modal_background-overlay、Esc
 * 不鎖整頁捲動：鎖捲動會讓捲軸消失、觸發 ScrollTrigger 重新計算，彈窗動畫會卡 1–2 秒（原 IX2 也沒鎖）。
 * 動態照原 IX2：外層 opacity 0→1（200ms），.modal_content-wrapper translateY 100%→0（500ms ease）；關閉反向（300/500ms）
 */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = null, lastFocus = null;

  function wrapperOf(modal) { return modal.querySelector('.modal_content-wrapper'); }

  function openModal(n, trigger) {
    var modal = document.querySelector('.modal' + n + '_component');
    if (!modal || modal === current) return;
    if (current) closeModal(true);
    current = modal; lastFocus = trigger || document.activeElement;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    var title = modal.querySelector('.modal-content .text-size-medium, .modal-content h2, .modal-content h3');
    if (title) { if (!title.id) title.id = 'jd-modal-title-' + n; modal.setAttribute('aria-labelledby', title.id); }
    var wrap = wrapperOf(modal);
    if (wrap) wrap.setAttribute('data-lenis-prevent', '');
    modal.style.display = 'flex';
    if (reduce) { modal.style.opacity = '1'; if (wrap) wrap.style.transform = 'none'; }
    else {
      modal.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease', fill: 'forwards' });
      if (wrap) wrap.animate([{ transform: 'translate3d(0,100%,0)' }, { transform: 'translate3d(0,0,0)' }], { duration: 500, easing: 'ease', fill: 'forwards' });
    }
    var close = modal.querySelector('.modal_close-button');
    if (close) { close.setAttribute('aria-label', '關閉'); setTimeout(function () { close.focus({ preventScroll: true }); }, 50); }
  }

  function closeModal(instant) {
    var modal = current; if (!modal) return;
    current = null;
    var wrap = wrapperOf(modal);
    function done() {
      modal.getAnimations().forEach(function (a) { a.cancel(); });
      if (wrap) wrap.getAnimations().forEach(function (a) { a.cancel(); });
      modal.style.display = 'none'; modal.style.opacity = '0';
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    if (instant || reduce) { done(); return; }
    modal.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease', fill: 'forwards' });
    var anim = wrap ? wrap.animate([{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(0,100%,0)' }], { duration: 500, easing: 'ease', fill: 'forwards' }) : null;
    setTimeout(done, anim ? 500 : 300);
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-jd-modal]');
    if (opener) { e.preventDefault(); openModal(opener.getAttribute('data-jd-modal'), opener); return; }
    if (current && e.target.closest('.modal_close-button, .modal_background-overlay')) { e.preventDefault(); closeModal(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && current) closeModal(); });
})();
