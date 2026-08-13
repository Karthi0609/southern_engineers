/* ============================================================
   modal.js — one enquiry modal, reused by every product,
   every service and every "Request a Quote" button.
   ============================================================ */
(function () {
  'use strict';

  var modal, panel, form, lastFocused = null, current = null;

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function el(id) { return document.getElementById(id); }

  function lockScroll(on) {
    if (on) {
      var y = window.scrollY;
      document.body.dataset.scrollY = String(y);
      document.body.style.top = -y + 'px';
      document.body.classList.add('is-locked');
    } else {
      var back = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.classList.remove('is-locked');
      document.body.style.top = '';
      window.scrollTo(0, back);
    }
  }

  /* item may be a product/service object, or a plain subject string */
  function open(item) {
    if (!modal) return;
    lastFocused = document.activeElement;
    current = item;

    var isObject = item && typeof item === 'object';
    var kind = isObject ? item.type : 'general';
    var name = isObject ? item.name : String(item || 'General Enquiry');

    el('modalTitle').textContent = isObject ? 'Enquire about ' + item.name : 'Request a Quote';
    el('modalCategory').textContent = isObject ? item.category : 'Enquiry';
    el('modalDesc').textContent = isObject
      ? item.description
      : 'Send your requirement and we will get back with details and a quotation.';

    var img = el('modalImg');
    if (isObject && item.image) {
      img.src = item.image;
      img.alt = item.name + ' illustration';
      img.hidden = false;
    } else {
      img.hidden = true;
    }

    el('modalSubjectLabel').textContent =
      kind === 'product' ? 'Product Required' : kind === 'service' ? 'Service Required' : 'Requirement';
    el('modalSubjectValue').textContent = name;

    /* show only the field that belongs to this kind of enquiry */
    panel.querySelectorAll('[data-only]').forEach(function (f) {
      f.hidden = f.getAttribute('data-only') !== kind;
    });

    el('modalStatus').textContent = '';
    panel.querySelectorAll('.err').forEach(function (e) { e.hidden = true; });
    panel.querySelectorAll('.field input, .field textarea').forEach(function (i) {
      i.classList.remove('has-error');
    });

    modal.hidden = false;
    lockScroll(true);
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
      var first = el('m-name');
      if (first) first.focus();
    });
  }

  function close() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    lockScroll(false);
    window.setTimeout(function () {
      modal.hidden = true;
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }, 180);
  }

  function trap(e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;

    var nodes = Array.prototype.filter.call(
      panel.querySelectorAll(FOCUSABLE),
      function (n) { return n.offsetParent !== null; }
    );
    if (!nodes.length) return;
    var first = nodes[0], last = nodes[nodes.length - 1];

    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function init() {
    modal = el('enquiryModal');
    if (!modal) return;
    panel = modal.querySelector('.modal-panel');
    form = el('enquiryForm');

    el('modalClose').addEventListener('click', close);
    modal.querySelectorAll('[data-modal-close]').forEach(function (n) {
      n.addEventListener('click', close);
    });
    document.addEventListener('keydown', trap);

    /* Any element with data-quote-open="Subject" opens the modal.
       Cards add their own listeners with the full object. */
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-quote-open]');
      if (!trigger) return;
      e.preventDefault();
      var subject = trigger.getAttribute('data-quote-open');
      var match = window.APP.catalogue.filter(function (i) { return i.name === subject; })[0];
      open(match || subject);
    });
  }

  window.APP = window.APP || {};
  window.APP.modal = { open: open, close: close, current: function () { return current; } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
