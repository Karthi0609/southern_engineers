/* ============================================================
   gallery.js — project showcase. Reads APP.data.projects.
   Work images are mapped from the site data array; gallery filter
   and tile rendering follow the declared project categories.
   ============================================================ */
(function () {
  'use strict';

  var items = window.APP.data.projects;
  var grid, filterBar;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function categories() {
    var list = ['All'];
    items.forEach(function (p) { if (list.indexOf(p.category) === -1) list.push(p.category); });
    return list;
  }

  function tile(p) {
    return '' +
      '<figure class="tile reveal" data-cat="' + esc(p.category) + '">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" width="800" height="600" loading="lazy" decoding="async">' +
        (p.placeholder ? '<span class="tile-flag">Placeholder</span>' : '') +
        '<figcaption>' +
          '<span class="tile-cat">' + esc(p.category) + '</span>' +
          '<span class="tile-title">' + esc(p.title) + '</span>' +
        '</figcaption>' +
      '</figure>';
  }

  function render(cat) {
    var list = (!cat || cat === 'All') ? items : items.filter(function (p) { return p.category === cat; });
    grid.innerHTML = list.map(tile).join('');
    if (window.APP.reveal) window.APP.reveal(grid);
  }

  function init() {
    grid = document.getElementById('galleryGrid');
    filterBar = document.getElementById('galleryFilters');
    if (!grid || !filterBar) return;

    filterBar.innerHTML = categories().map(function (c, i) {
      return '<button type="button" class="chip' + (i === 0 ? ' is-active' : '') +
             '" data-filter="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + '</button>';
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

    render('All');
  }

  window.APP.gallery = { render: render };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
