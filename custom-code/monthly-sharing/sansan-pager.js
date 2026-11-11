/*
 * 三三分享會 /jubo-33-live-stream 集數列表的「上一頁／下一頁」玻璃按鈕
 * 部署位置：該頁 Page Settings → Custom Code → Before </body>（freeform footer，<script id="sansan-pager">）
 * 本檔是正本。
 *
 * 為什麼需要：Webflow 原生 Pagination 按鈕是英文且沒有設計；Glass Button 依規範只能用 Component，
 * 但 Component 本身是 <a>，不能塞進原生 Pagination 的 <a> 裡。
 * 做法：原生 Pagination 保留（class sansan-episodes_pagination-native，display:none），
 * 把它算好的 ?xxx_page=N 網址搬到兩顆 Glass Button 上；沒有上一頁／下一頁時隱藏那顆按鈕，兩顆都沒有就隱藏整列。
 */
(function () {
  function init() {
    document.querySelectorAll('.sansan-episodes_pager').forEach(function (row) {
      var slot = row.closest('.sansan-episodes_grid-slot') || document;
      var shown = 0;
      row.querySelectorAll('[data-sansan-pager]').forEach(function (item) {
        var dir = item.getAttribute('data-sansan-pager');
        var src = slot.querySelector(dir === 'prev' ? '.w-pagination-previous' : '.w-pagination-next');
        var href = src && src.getAttribute('href');
        var a = item.querySelector('a');
        if (!href || !a) { item.style.display = 'none'; return; }
        a.setAttribute('href', href.split('#')[0] + '#episodes');
        a.removeAttribute('target');
        shown++;
      });
      if (!shown) row.style.display = 'none';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
