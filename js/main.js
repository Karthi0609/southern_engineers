/* ============================================================
   main.js — company details binding, search, supporting
   sections and scroll reveal.
   ============================================================ */
(function () {
  'use strict';

  var D = window.APP.data;
  var SITE = D.SITE;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- 1. put company details everywhere they belong ---------- */
  function bindSite() {
    var addressFull = [SITE.address, SITE.city, SITE.district, SITE.state]
      .filter(Boolean).join(', ') + (SITE.pincode ? ' — ' + SITE.pincode : '');

    var map = {
      companyName: SITE.companyName,
      phone: SITE.phone,
      email: SITE.email,
      whatsappDisplay: SITE.whatsappDisplay,
      addressFull: addressFull,
      hours: SITE.hours,
      city: SITE.city
    };

    document.querySelectorAll('[data-site]').forEach(function (n) {
      var key = n.getAttribute('data-site');
      if (map[key]) n.textContent = map[key];
    });

    document.querySelectorAll('[data-site-href="tel"]').forEach(function (a) {
      a.href = 'tel:' + String(SITE.phoneDial).replace(/[^\d+]/g, '');
    });
    document.querySelectorAll('[data-site-href="mail"]').forEach(function (a) {
      a.href = 'mailto:' + SITE.email;
    });

    document.title = SITE.companyName +
      ' — Industrial Equipment Sales, Service & Fabrication in ' + SITE.city;
  }

  /* ---------- 2. supporting sections ---------- */
  function renderFeatured() {
    var box = document.getElementById('featuredGrid');
    if (!box) return;
    box.innerHTML = D.featured.map(function (f) {
      return '' +
        '<a class="feat-card reveal" href="' + esc(f.target) + '">' +
          '<img src="' + esc(f.image) + '" alt="" width="800" height="600" loading="lazy" decoding="async">' +
          '<div class="feat-body"><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p></div>' +
        '</a>';
    }).join('');
  }

  function renderIndustries() {
    var box = document.getElementById('industryGrid');
    if (!box) return;
    box.innerHTML = D.industries.map(function (i) {
      return '<li class="ind-item reveal">' + esc(i) + '</li>';
    }).join('');
  }

  function renderFooterLists() {
    var p = document.getElementById('footerProducts');
    var s = document.getElementById('footerServices');
    if (p) {
      p.innerHTML = D.products.slice(0, 6).map(function (i) {
        return '<li><a href="#products">' + esc(i.name) + '</a></li>';
      }).join('');
    }
    if (s) {
      s.innerHTML = D.services.slice(0, 6).map(function (i) {
        return '<li><a href="#services">' + esc(i.name) + '</a></li>';
      }).join('');
    }
    var dl = document.getElementById('itemOptions');
    if (dl) {
      dl.innerHTML = window.APP.catalogue.map(function (i) {
        return '<option value="' + esc(i.name) + '"></option>';
      }).join('');
    }
  }

  /* ---------- 3. search ---------- */
  function initSearch() {
    var input = document.getElementById('siteSearch');
    var list = document.getElementById('searchResults');
    var clear = document.getElementById('searchClear');
    if (!input || !list) return;

    var cursor = -1, matches = [];

    function hide() {
      list.hidden = true;
      list.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      cursor = -1;
    }

    function score(item, q) {
      var name = item.name.toLowerCase();
      if (name.indexOf(q) === 0) return 3;
      if (name.indexOf(q) > -1) return 2;
      if (item.category.toLowerCase().indexOf(q) > -1) return 1;
      if (item.tags.some(function (t) { return t.indexOf(q) > -1; })) return 1;
      return 0;
    }

    function run() {
      var q = input.value.trim().toLowerCase();
      clear.hidden = !q;
      if (q.length < 2) { hide(); return; }

      matches = window.APP.catalogue
        .map(function (i) { return { item: i, s: score(i, q) }; })
        .filter(function (r) { return r.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 8)
        .map(function (r) { return r.item; });

      if (!matches.length) {
        list.innerHTML = '<li class="search-none">Nothing matches “' + esc(input.value.trim()) +
          '”. Send it as an enquiry — we may still be able to supply it.</li>';
        list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        return;
      }

      list.innerHTML = matches.map(function (m, i) {
        return '<li role="option" id="sr-' + i + '" aria-selected="false" data-idx="' + i + '">' +
          '<img src="' + esc(m.image) + '" alt="" width="64" height="48" loading="lazy" decoding="async">' +
          '<span class="sr-text"><span class="sr-name">' + esc(m.name) + '</span>' +
          '<span class="sr-cat">' + esc(m.category) + '</span></span>' +
          '<span class="sr-kind">' + (m.type === 'product' ? 'Product' : 'Service') + '</span></li>';
      }).join('');
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    function choose(i) {
      var item = matches[i];
      if (!item) return;
      hide();
      input.value = '';
      clear.hidden = true;
      var section = document.getElementById(item.type === 'product' ? 'products' : 'services');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(function () { window.APP.modal.open(item); }, 320);
    }

    function move(step) {
      if (list.hidden || !matches.length) return;
      cursor = (cursor + step + matches.length) % matches.length;
      list.querySelectorAll('[role="option"]').forEach(function (n, i) {
        var on = i === cursor;
        n.classList.toggle('is-active', on);
        n.setAttribute('aria-selected', String(on));
      });
      input.setAttribute('aria-activedescendant', 'sr-' + cursor);
    }

    input.addEventListener('input', run);
    input.addEventListener('focus', function () { if (input.value.trim().length > 1) run(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') {
        if (!list.hidden && matches.length) { e.preventDefault(); choose(cursor > -1 ? cursor : 0); }
      } else if (e.key === 'Escape') { hide(); }
    });

    list.addEventListener('click', function (e) {
      var li = e.target.closest('[data-idx]');
      if (li) choose(parseInt(li.getAttribute('data-idx'), 10));
    });

    clear.addEventListener('click', function () {
      input.value = '';
      clear.hidden = true;
      hide();
      input.focus();
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-box')) hide();
    });
  }

  /* ---------- 4. scroll reveal ---------- */
  var observer = null;

  function reveal(scope) {
    var nodes = (scope || document).querySelectorAll('.reveal:not(.is-in)');
    if (!observer) { nodes.forEach(function (n) { n.classList.add('is-in'); }); return; }
    nodes.forEach(function (n) { observer.observe(n); });
  }

  function initReveal() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (n) { n.classList.add('is-in'); });
      window.APP.reveal = function (scope) {
        (scope || document).querySelectorAll('.reveal').forEach(function (n) { n.classList.add('is-in'); });
      };
      return;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    window.APP.reveal = reveal;
    reveal(document);
  }

  function init() {
    bindSite();
    renderFeatured();
    renderIndustries();
    renderFooterLists();
    initSearch();
    initReveal();

    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
