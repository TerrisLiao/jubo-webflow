/* ============================================================
   CMS 文章 FAQ 手風琴：平滑展開動畫
   2026-09-22 v2　Jubo 官網
   參數 400ms / ease 取自首頁 FAQ 的 Webflow IX2 設定。
   同時接管純 <details> 與舊版 .aeo-faq 兩種寫法，不改 CMS 內容。
   ============================================================ */
(function () {
  var DUR = 400;
  var EASE = 'ease';

  function reduced() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function panelOf(d) {
    var legacy = d.querySelector('.aeo-faq__answer');
    if (legacy) {
      legacy.style.transition = '';
      legacy.style.opacity = '';
      return legacy;
    }
    var existing = d.querySelector('.jb-faq__panel');
    if (existing && existing.parentNode === d) return existing;
    var panel = document.createElement('div');
    panel.className = 'jb-faq__panel';
    var move = [];
    for (var i = 0; i < d.children.length; i++) {
      if (d.children[i].tagName !== 'SUMMARY') move.push(d.children[i]);
    }
    for (var j = 0; j < move.length; j++) panel.appendChild(move[j]);
    d.appendChild(panel);
    return panel;
  }

  function bind(d) {
    if (d.getAttribute('data-jb-faq') === '1') return;

    var old = d.querySelector('summary');
    if (!old) return;

    var summary = old.cloneNode(true);
    old.parentNode.replaceChild(summary, old);

    var panel = panelOf(d);
    d.setAttribute('data-jb-faq', '1');
    summary.setAttribute('aria-expanded', d.open ? 'true' : 'false');
    panel.style.height = d.open ? 'auto' : '0px';

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.dataset.jbAnimating === '1') return;

      if (reduced()) {
        d.open = !d.open;
        panel.style.height = d.open ? 'auto' : '0px';
        summary.setAttribute('aria-expanded', d.open ? 'true' : 'false');
        return;
      }

      d.dataset.jbAnimating = '1';
      panel.style.transition = 'height ' + DUR + 'ms ' + EASE;

      if (!d.open) {
        d.open = true;
        summary.setAttribute('aria-expanded', 'true');
        panel.style.height = '0px';
        var target = panel.scrollHeight;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { panel.style.height = target + 'px'; });
        });
        var onOpen = function (ev) {
          if (ev.propertyName !== 'height') return;
          panel.removeEventListener('transitionend', onOpen);
          panel.style.height = 'auto';
          panel.style.transition = '';
          delete d.dataset.jbAnimating;
        };
        panel.addEventListener('transitionend', onOpen);
      } else {
        summary.setAttribute('aria-expanded', 'false');
        panel.style.height = panel.scrollHeight + 'px';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { panel.style.height = '0px'; });
        });
        var onClose = function (ev) {
          if (ev.propertyName !== 'height') return;
          panel.removeEventListener('transitionend', onClose);
          d.open = false;
          panel.style.transition = '';
          delete d.dataset.jbAnimating;
        };
        panel.addEventListener('transitionend', onClose);
      }
    });
  }

  function run() {
    var list = document.querySelectorAll('.richtext details');
    for (var i = 0; i < list.length; i++) bind(list[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
