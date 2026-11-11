/*
 * 三三分享會節目專區：最新消息卡與底部釘選條的「下載簡報」按鈕（共用 Glass Button）
 * 部署位置：/resources/jubo-33-live-stream 的 Page Settings → Custom Code → Before </body>（freeform footer，<script id="sansan-latest-deck">）
 * 搭配 head 的 <style id="sansan-latest-deck-css">（未開啟前先隱藏，避免閃現）。本檔是正本。
 *
 * 維護人員不需要改這段程式，全部由 CMS「三三分享會集數」控制：
 *   - 開放簡報 關 → 不顯示（Webflow 本身就不輸出按鈕）
 *   - 下載入口 = 先不顯示 → 不顯示
 *   - 下載入口 = 立即顯示 → 顯示
 *   - 下載入口 = 自動或空白 → 「直播時間」到了才顯示（頁面開著時每分鐘檢查一次）
 * 讀不到時間或程式出錯時，按鈕維持隱藏（不會提早曝光）。
 * 測試用：網址加 ?sansan-gate=open 可在不改 CMS 的情況下預覽按鈕。
 *
 * 按鈕外層容器（包住共用 Glass Button 元件，元件本身不改）的屬性（Webflow 綁定）：data-sansan-gate（latest／pin）、
 * data-sansan-slug（Slug）、data-sansan-start（直播時間，Webflow 輸出只有日期，例 November 18, 2026）、data-sansan-mode（下載入口）。
 * 網址寫到容器內的第一個 <a>（Glass Button）；容器本身若就是 <a> 也可。
 */
(function () {
  var DEFAULT_BASE = '/monthly-sharing/';
  var TAIPEI_OFFSET_H = 8;

  function startTime(raw) {
    raw = (raw || '').trim();
    if (!raw) return null;
    // 帶時區的 ISO（例 2026-11-18T04:00:00.000Z）直接解析
    if (/T\d{2}:\d{2}.*(Z|[+-]\d{2}:?\d{2})$/.test(raw)) {
      var iso = Date.parse(raw);
      return isNaN(iso) ? null : iso;
    }
    var d = new Date(raw);
    if (isNaN(d.getTime())) return null;
    var y = d.getFullYear(), m = d.getMonth(), day = d.getDate();
    // 沒有時間（例 November 18, 2026）：三三分享會固定台北時間 12:00 開播
    if (!/\d{1,2}:\d{2}/.test(raw)) return Date.UTC(y, m, day, 12 - TAIPEI_OFFSET_H, 0);
    // 有時間沒時區：視為台北時間
    return Date.UTC(y, m, day, d.getHours() - TAIPEI_OFFSET_H, d.getMinutes());
  }

  function base() {
    var found = DEFAULT_BASE;
    [].some.call(document.querySelectorAll('a.sansan-ep_deck-link[data-sansan-slug]'), function (a) {
      var href = a.getAttribute('href') || '', slug = a.getAttribute('data-sansan-slug');
      if (slug && /^\/[^#?]+$/.test(href) && href.slice(-slug.length - 1) === '/' + slug) {
        found = href.slice(0, href.length - slug.length);
        return true;
      }
      return false;
    });
    return found;
  }

  function shouldOpen(a, now) {
    if (/[?&]sansan-gate=open\b/.test(location.search)) return true;
    var mode = (a.getAttribute('data-sansan-mode') || '').trim();
    if (mode === '先不顯示') return false;
    if (mode === '立即顯示') return true;
    var t = startTime(a.getAttribute('data-sansan-start'));
    return t !== null && now >= t;
  }

  function update() {
    var gates = document.querySelectorAll('[data-sansan-gate][data-sansan-slug]');
    if (!gates.length) return false;
    var b = base(), now = Date.now(), pending = false;
    [].forEach.call(gates, function (a) {
      var slug = a.getAttribute('data-sansan-slug');
      var link = a.tagName === 'A' ? a : a.querySelector('a');
      var href = link ? link.getAttribute('href') || '' : '';
      if (link && slug && href.slice(-slug.length - 1) !== '/' + slug) {
        link.setAttribute('href', b + slug);
        link.removeAttribute('target');
      }
      var open = shouldOpen(a, now);
      if (open) a.setAttribute('data-sansan-gate-open', '');
      else { a.removeAttribute('data-sansan-gate-open'); pending = true; }
      // 釘選條：開放後把「開啟提醒」換成「下載簡報」，標籤「下一集」改「本集」
      if (a.getAttribute('data-sansan-gate') === 'pin') {
        var inner = a.parentElement;
        [].forEach.call(inner.querySelectorAll('.sansan-pin_cta:not([data-sansan-gate])'), function (c) {
          c.style.display = open ? 'none' : '';
        });
        var label = inner.querySelector('.sansan-pin_label > div:last-child');
        if (label) {
          if (!label.hasAttribute('data-sansan-label')) label.setAttribute('data-sansan-label', label.textContent);
          label.textContent = open ? '本集' : label.getAttribute('data-sansan-label');
        }
      }
    });
    return pending;
  }

  function init() {
    if (update()) {
      var timer = setInterval(function () { if (!update()) clearInterval(timer); }, 60000);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
