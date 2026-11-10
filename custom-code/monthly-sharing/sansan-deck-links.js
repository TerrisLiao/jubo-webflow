/*
 * 三三分享會節目專區「過去直播」卡片下的「填問卷下載簡報 →」連結保底
 * 部署位置：/resources/jubo-33-live-stream 的 Page Settings → Custom Code → Before </body>（freeform footer，<script id="sansan-deck-links">）
 * 本檔是正本。
 *
 * 為什麼需要：Data API 設定的「連到目前 CMS 項目頁」連結，發布後可能輸出 href="#"。
 * 每個連結有 data-sansan-slug（綁 CMS Slug）。若某個連結已正確解析（例 /monthly-sharing/ep18），
 * 就從它推出單集頁路徑前綴；否則用 DEFAULT_BASE。只修 href 是空的、"#" 或不是站內路徑的連結。
 * Collection URL 改成 jubo-33-live-stream 時，記得同步改 DEFAULT_BASE。
 */
(function () {
  var DEFAULT_BASE = '/monthly-sharing/';
  function init() {
    var links = [].slice.call(document.querySelectorAll('a.sansan-ep_deck-link[data-sansan-slug]'));
    if (!links.length) return;
    var base = DEFAULT_BASE;
    links.some(function (a) {
      var href = a.getAttribute('href') || '';
      var slug = a.getAttribute('data-sansan-slug');
      if (slug && /^\/[^#?]+$/.test(href) && href.slice(-slug.length - 1) === '/' + slug) {
        base = href.slice(0, href.length - slug.length);
        return true;
      }
      return false;
    });
    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var slug = a.getAttribute('data-sansan-slug');
      if (slug && !/^\/[^#?]+$/.test(href)) a.setAttribute('href', base + slug);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
