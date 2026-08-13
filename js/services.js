/* ============================================================
   services.js — renders the services grid and its filters.
   Reads from APP.data.services.
   ============================================================ */
(function () {
  'use strict';

  var items = window.APP.data.services;
  var ORDER = ['All Services', 'Fabrication', 'Roofing', 'Structural Work', 'Industrial Service'];
  var grid, filterBar, empty;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function groups() {
    var found = ORDER.filter(function (g) {
      return g === 'All Services' || items.some(function (s) { return s.group === g; });
    });
    items.forEach(function (s) { if (found.indexOf(s.group) === -1) found.push(s.group); });
    return found;
  }

  function card(s) {
    var wa = window.APP.enquiry.waLink(
      window.APP.enquiry.buildMessage(s.name, 'service', [])
    );
    return '' +
      '<article class="card reveal" data-group="' + esc(s.group) + '" data-id="' + esc(s.id) + '">' +
        '<div class="card-media">' +
          '<img src="' + esc(s.image) + '" alt="' + esc(s.name) + ' illustration" width="800" height="600" loading="lazy" decoding="async">' +
          '<span class="card-code">' + esc(s.code) + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-cat">' + esc(s.category) + '</p>' +
          '<h3 class="card-title">' + esc(s.name) + '</h3>' +
          '<p class="card-text">' + esc(s.description) + '</p>' +
          '<div class="card-actions">' +
            '<button type="button" class="btn btn-sm btn-primary" data-quote-open="' + esc(s.name) + '">Get a Quote</button>' +
            '<a class="btn btn-sm btn-icon" href="' + wa + '" target="_blank" rel="noopener" aria-label="Enquire about ' + esc(s.name) + ' on WhatsApp">' +
              '<svg viewBox="0 0 24 24" class="ico" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.3A10 10 0 1 0 12 2zm5.6 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6a11.4 11.4 0 0 1-4.4-4.4c-.5-.9-.8-1.7-.8-2.4 0-.8.4-1.5.9-1.9.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a8.6 8.6 0 0 0 3.6 3.1c.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l1.7.8c.2.1.3.2.4.3z"/></svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function render(group) {
    var all = !group || group === 'All Services';
    var list = all ? items : items.filter(function (s) { return s.group === group; });
    grid.innerHTML = list.map(card).join('');
    empty.hidden = list.length > 0;
    if (window.APP.reveal) window.APP.reveal(grid);
  }

  function buildFilters() {
    filterBar.innerHTML = groups().map(function (g, i) {
      return '<button type="button" class="chip' + (i === 0 ? ' is-active' : '') +
             '" data-filter="' + esc(g) + '" aria-pressed="' + (i === 0) + '">' + esc(g) + '</button>';
    }).join('');

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filterBar.querySelectorAll('.chip').forEach(function (c) {
        var on = c === btn;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      render(btn.getAttribute('data-filter'));
    });
  }

  function init() {
    grid = document.getElementById('serviceGrid');
    filterBar = document.getElementById('serviceFilters');
    empty = document.getElementById('serviceEmpty');
    if (!grid || !filterBar) return;
    buildFilters();
    render();

    empty.addEventListener('click', function (e) {
      if (!e.target.closest('[data-reset="services"]')) return;
      filterBar.querySelector('.chip').click();
    });
  }

  window.APP.services = { render: render };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
