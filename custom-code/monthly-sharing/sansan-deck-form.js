/*
 * 三三分享會單集頁（CMS Template「三三分享會集數 Template」）課後問卷修正
 * 部署位置：該 Template 的 Page Settings → Custom Code → Before </body>（freeform footer，<script id="sansan-deck-form">）
 * 本檔是正本。
 *
 * 為什麼需要：
 * 1. Data API 建立的 radio，Webflow 會給每個選項不同的 name（radio-8、radio-9…），
 *    同一題的選項無法互斥、點了也換不掉，必填還會要求每個選項都勾；送出時 Webflow 也是用 name 找已選的值。
 *    API 無法改 name，所以這裡把 name 改成該題的 data-name（Group Name，例「Q1 機構類型」）。
 * 2. 隱藏欄位「索取集數」用 API 寫入的 {{wf …}} CMS 標記不會轉換，
 *    這裡改由頁面上的集數（.sansan-deck_ep）與標題（.sansan-deck_title）組成，例「EP22 長照職場性騷擾與照護界線」。
 * 3. 清除 Webflow 自動產生的「Example Text」預設提示；保留其他已撰寫的 placeholder。
 */
(function () {
  function init() {
    var form = document.getElementById('sansan-deck-form');
    if (!form) return;
    form.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (field) {
      if ((field.getAttribute('placeholder') || '').trim() === 'Example Text') {
        field.removeAttribute('placeholder');
      }
    });
    form.querySelectorAll('input[type="radio"][data-name]').forEach(function (r) {
      r.name = r.getAttribute('data-name');
    });
    var hidden = form.querySelector('input[name="索取集數"]');
    var ep = document.querySelector('.sansan-deck_ep');
    var title = document.querySelector('.sansan-deck_title');
    var text = ((ep ? ep.textContent : '') + ' ' + (title ? title.textContent : '')).replace(/\s+/g, ' ').trim();
    if (hidden && text) hidden.value = text;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
