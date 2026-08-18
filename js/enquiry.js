/* ============================================================
   enquiry.js — turns a requirement into a WhatsApp message
   or a phone call. No backend involved.
   ============================================================ */
(function () {
  'use strict';

  var SITE = window.APP.data.SITE;
  var NUMBER = window.APP.data.WHATSAPP_NUMBER;

  /* ---------- WhatsApp opening line, tuned per requirement ---------- */
  function openingLine(subject, kind) {
    var s = String(subject || 'your products and services');

    if (/cattle|cow shed/i.test(s)) {
      return 'Hello, I would like to enquire about ' + s +
             ' fabrication. Please contact me with further details.';
    }
    if (kind === 'product') {
      return 'Hello, I would like to enquire about ' + s +
             '. Please provide product details and quotation.';
    }
    if (kind === 'service') {
      return 'Hello, I would like to enquire about ' + s +
             '. Please provide details and quotation.';
    }
    return 'Hello, I would like to enquire about ' + s + '. Please provide details and quotation.';
  }

  function buildMessage(subject, kind, fields) {
    var lines = [openingLine(subject, kind)];
    var label = kind === 'product' ? 'Product Required' :
                kind === 'service' ? 'Service Required' : 'Requirement';

    if (subject) lines.push('', label + ': ' + subject);

    (fields || []).forEach(function (f) {
      if (f.value) lines.push(f.label + ': ' + f.value);
    });
    return lines.join('\n');
  }

  function waLink(text) {
    return 'https://wa.me/' + String(NUMBER).replace(/[^\d]/g, '') +
           '?text=' + encodeURIComponent(text);
  }

  /* ---------- validation ---------- */
  function showError(input, on) {
    var msg = document.querySelector('[data-err-for="' + input.id + '"]');
    if (msg) msg.hidden = !on;
    input.classList.toggle('has-error', on);
    input.setAttribute('aria-invalid', on ? 'true' : 'false');
  }

  function validate(scope) {
    var ok = true, firstBad = null;
    scope.querySelectorAll('input, select, textarea').forEach(function (input) {
      if (input.closest('[hidden]')) return;
      var bad = false;
      if (input.required && !input.value.trim()) bad = true;
      if (input.type === 'email' && input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) bad = true;
      if (input.type === 'tel' && input.value.trim() && input.value.replace(/[^\d]/g, '').length < 7) bad = true;
      showError(input, bad);
      if (bad) { ok = false; if (!firstBad) firstBad = input; }
    });
    if (firstBad) firstBad.focus();
    return ok;
  }

  function val(id) {
    var n = document.getElementById(id);
    return n && !n.closest('[hidden]') ? n.value.trim() : '';
  }

  /* ---------- modal form ---------- */
  function modalFields() {
    return [
      { label: 'Name', value: val('m-name') },
      { label: 'Company', value: val('m-company') },
      { label: 'Phone', value: val('m-phone') },
      { label: 'Email', value: val('m-email') },
      { label: 'Requirement', value: val('m-requirement') },
      { label: 'Quantity', value: val('m-quantity') },
      { label: 'Location', value: val('m-location') },
      { label: 'Message', value: val('m-message') }
    ];
  }

  function modalSubject() {
    var item = window.APP.modal.current();
    var isObj = item && typeof item === 'object';
    return {
      subject: isObj ? item.name : String(item || 'General Enquiry'),
      kind: isObj ? item.type : 'general'
    };
  }

  function send(formEl, statusEl, subject, kind, fields) {
    if (!validate(formEl)) {
      statusEl.textContent = 'Check the highlighted fields and try again.';
      statusEl.className = 'form-status is-error';
      return;
    }
    var text = buildMessage(subject, kind, fields);
    statusEl.className = 'form-status is-ok';
    statusEl.textContent = 'Opening WhatsApp with your enquiry.';
    window.open(waLink(text), '_blank', 'noopener');
  }

  function init() {
    /* modal submit */
    var mForm = document.getElementById('enquiryForm');
    if (mForm) {
      var mStatus = document.getElementById('modalStatus');
      mForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var s = modalSubject();
        send(mForm, mStatus, s.subject, s.kind, modalFields());
      });
    }

    /* page contact form */
    var cForm = document.getElementById('contactForm');
    if (cForm) {
      var cStatus = document.getElementById('contactStatus');
      var contactFields = function () {
        return [
          { label: 'Name', value: val('cf-name') },
          { label: 'Phone', value: val('cf-phone') },
          { label: 'Email', value: val('cf-email') },
          { label: 'Requirement type', value: val('cf-type') },
          { label: 'Message', value: val('cf-message') }
        ];
      };
      var contactSubject = function () {
        return val('cf-item') || val('cf-type') || 'General Enquiry';
      };
      cForm.addEventListener('submit', function (e) {
        e.preventDefault();
        send(cForm, cStatus, contactSubject(), 'general', contactFields());
      });
    }

    /* every plain WhatsApp link on the page */
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      var subject = a.getAttribute('data-wa');
      var match = window.APP.catalogue.filter(function (i) { return i.name === subject; })[0];
      var kind = match ? match.type : 'general';
      var text = subject === 'General Enquiry'
        ? 'Hello, I would like to enquire about your industrial products and services. Please provide details and quotation.'
        : buildMessage(subject, kind, []);
      a.href = waLink(text);
      a.target = '_blank';
    });
  }

  window.APP.enquiry = { buildMessage: buildMessage, waLink: waLink, openingLine: openingLine };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
