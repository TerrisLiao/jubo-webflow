/*
 * Jubo FAQ accordion — 部署位置：Webflow Site Settings → Custom Code → Footer（<script id="jubo-faq">）
 * 本檔是正本。取代 IX2「FAQ 5 accordion [Open]/[Close]」。
 *
 * 只負責狀態：點 .faq5_question → 切換父層 .solutions-basic-model_accordion 的 .is-faq-open。
 * 動畫在 custom-code/jubo-motion.css。
 * 順帶補上無障礙：role=button、tabindex=0、aria-expanded、aria-controls、Enter／空白鍵操作
 * （原本題目是純 div，鍵盤無法操作）。
 * 各題獨立開關（與原本 IX2 行為相同，不會自動收起其他題）。
 */
(function () {
  var Q = '.faq5_question';
  function answerOf(q) { var a = q.nextElementSibling; return a && a.classList.contains('faq5_answer') ? a : null; }
  function init() {
    document.querySelectorAll(Q).forEach(function (q, i) {
      var a = answerOf(q); if (!a) return;
      if (!a.id) a.id = 'faq-answer-' + i;
      q.setAttribute('role', 'button'); q.setAttribute('tabindex', '0');
      q.setAttribute('aria-expanded', 'false'); q.setAttribute('aria-controls', a.id);
    });
  }
  function toggle(q) {
    if (!answerOf(q)) return;
    var open = q.parentElement.classList.toggle('is-faq-open');
    q.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  document.addEventListener('click', function (e) { var q = e.target.closest && e.target.closest(Q); if (q) toggle(q); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var q = e.target.closest && e.target.closest(Q); if (!q) return;
    e.preventDefault(); toggle(q);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
