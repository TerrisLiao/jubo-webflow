/* ============================================================
   CMS 文章 FAQ 手風琴：平滑展開動畫
   2026-09-22 v2　Jubo 官網

   為什麼需要這段：
   站上的文章 FAQ 有兩種寫法，行為各不相同——
   1. 最單純的 <details><summary>（例如成大研究那篇）：
      瀏覽器原生展開是「瞬間跳出」，完全沒有動畫。
   2. 舊版 .aeo-faq（例如補助新制那篇）：內容自帶腳本，
      有動畫，但用的是 520ms / cubic-bezier(.22,.61,.36,1)，
      跟首頁不一樣，看起來前快後拖。

   首頁的 FAQ（外包版本）是 Webflow IX2 做的 height 動畫，
   從 IX2 設定讀到的參數是 duration 400ms / easing "ease"。
   這段腳本用同一組參數接管上面兩種寫法，讓全站 FAQ 一致。

   作法：
   - 舊版 .aeo-faq：直接沿用它既有的 .aeo-faq__answer 當動畫容器，
     並把 <summary> 換成複製品以卸掉舊腳本綁的事件（不改 CMS 內容）。
   - 其他 <details>：把 <summary> 以外的內容包進 .jb-faq__panel。
   兩者之後都由這裡接手點擊，改成 height 過場。
   ============================================================ */
(function () {
  var DUR = 400;          // 與首頁 FAQ 相同（Webflow IX2: STYLE_SIZE duration 400）
  var EASE = 'ease';      // 與首頁 FAQ 相同（Webflow IX2: easing "ease"）

  function reduced() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function panelOf(d) {
    // 舊版 .aeo-faq 已經有一層 .aeo-faq__answer，沿用它就好
    var legacy = d.querySelector('.aeo-faq__answer');
    if (legacy) {
      legacy.style.transition = '';
      legacy.style.opacity = '';   // 舊腳本會留下 opacity:0，清掉
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

    // 換成複製品：卸掉文章內容自帶腳本綁的 click，避免兩套邏輯打架。
    // 只動瀏覽器裡的 DOM，CMS 內容不變。
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
