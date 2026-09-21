/* ============================================================
   CMS 文章 FAQ 手風琴：平滑展開動畫
   2026-09-21　Jubo 官網

   為什麼需要這段：
   新文章（例如成大研究那篇）的 FAQ 是最單純的 <details><summary>，
   瀏覽器原生的展開是「瞬間跳出」，沒有任何動畫。
   首頁的 FAQ（外包版本）是 Webflow IX2 做的 height 動畫，
   從 IX2 設定讀到的參數是 duration 400ms / easing "ease"，
   這段腳本就是用同樣的參數，讓文章 FAQ 跟首頁一致。

   作法：把 <details> 裡除了 <summary> 以外的內容包進一個
   .jb-faq__panel，接手 summary 的點擊，改成 height 過場。

   已經自帶動畫腳本的舊版 .aeo-faq 會被跳過，不重複綁定。
   ============================================================ */
(function () {
  var DUR = 400;          // 與首頁 FAQ 相同（Webflow IX2: STYLE_SIZE duration 400）
  var EASE = 'ease';      // 與首頁 FAQ 相同（Webflow IX2: easing "ease"）

  function reduced() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function panelOf(d) {
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
    // 舊版 .aeo-faq 自帶動畫腳本，不重複綁定
    if (d.querySelector('.aeo-faq__answer')) return;

    var summary = d.querySelector('summary');
    if (!summary) return;

    var panel = panelOf(d);
    d.setAttribute('data-jb-faq', '1');
    summary.setAttribute('aria-expanded', d.open ? 'true' : 'false');
    if (!d.open) panel.style.height = '0px';

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
