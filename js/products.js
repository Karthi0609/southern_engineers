/* ============================================================
   products.js — renders the product grid and its filters.
   Reads from APP.data.products. Add an object there, it appears.
   ============================================================ */
(function () {
  'use strict';

  var items = window.APP.data.products;
  var grid, filterBar, empty;
  var active = 'All';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function groups() {
    var seen = ['All'];
    items.forEach(function (p) { if (seen.indexOf(p.group) === -1) seen.push(p.group); });
    return seen;
  }

  function card(p) {
    var wa = window.APP.enquiry.waLink(
      window.APP.enquiry.buildMessage(p.name, 'product', [])
    );
    return '' +
      '<article class="card reveal" data-group="' + esc(p.group) + '" data-id="' + esc(p.id) + '">' +
        '<div class="card-media">' +
          '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' schematic" width="800" height="600" loading="lazy" decoding="async">' +
          '<span class="card-code">' + esc(p.code) + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-cat">' + esc(p.category) + '</p>' +
          '<h3 class="card-title">' + esc(p.name) + '</h3>' +
          '<p class="card-text">' + esc(p.description) + '</p>' +
          '<div class="card-actions">' +
            '<button type="button" class="btn btn-sm btn-primary" data-quote-open="' + esc(p.name) + '">Request Quote</button>' +
            '<a class="btn btn-sm btn-icon" href="' + wa + '" target="_blank" rel="noopener" aria-label="Enquire about ' + esc(p.name) + ' on WhatsApp">' +
              '<svg viewBox="0 0 24 24" class="ico" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.3A10 10 0 1 0 12 2zm5.6 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6a11.4 11.4 0 0 1-4.4-4.4c-.5-.9-.8-1.7-.8-2.4 0-.8.4-1.5.9-1.9.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a8.6 8.6 0 0 0 3.6 3.1c.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l1.7.8c.2.1.3.2.4.3z"/></svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function render(group) {
    active = group || 'All';
    var list = active === 'All' ? items : items.filter(function (p) { return p.group === active; });
    grid.innerHTML = list.map(card).join('');
    empty.hidden = list.length > 0;
    if (window.APP.reveal) window.APP.reveal(grid);
  }

  function buildFilters() {
    filterBar.innerHTML = groups().map(function (g) {
      return '<button type="button" class="chip' + (g === 'All' ? ' is-active' : '') +
             '" data-filter="' + esc(g) + '" aria-pressed="' + (g === 'All') + '">' + esc(g) + '</button>';
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
    grid = document.getElementById('productGrid');
    filterBar = document.getElementById('productFilters');
    empty = document.getElementById('productEmpty');
    if (!grid || !filterBar) return;
    buildFilters();
    render('All');

    empty.addEventListener('click', function (e) {
      if (!e.target.closest('[data-reset="products"]')) return;
      filterBar.querySelector('[data-filter="All"]').click();
    });
  }

  window.APP.products = { render: render, filter: function (g) { render(g); } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
