/* ============================================================
   navigation.js — header behaviour and the mobile menu.
   ============================================================ */
(function () {
  'use strict';

  var header, toggle, closeBtn, menu, scrim, links;
  var open = false;

  function lockScroll(on) {
    document.documentElement.classList.toggle('no-scroll', on);
    document.body.classList.toggle('no-scroll', on);
  }

  function setMenu(state) {
    open = state;
    toggle.setAttribute('aria-expanded', String(state));
    toggle.setAttribute('aria-label', state ? 'Close menu' : 'Open menu');
    toggle.classList.toggle('is-open', state);
    menu.setAttribute('aria-hidden', String(!state));
    lockScroll(state);

    if (state) {
      menu.hidden = false;
      scrim.hidden = false;
      requestAnimationFrame(function () {
        menu.classList.add('is-open');
        scrim.classList.add('is-open');
        var first = menu.querySelector('a, button');
        if (first) first.focus();
      });
    } else {
      menu.classList.remove('is-open');
      scrim.classList.remove('is-open');
      window.setTimeout(function () {
        if (!open) { menu.hidden = true; scrim.hidden = true; }
      }, 250);
    }
  }

  function trap(e) {
    if (!open || e.key !== 'Tab') return;
    var nodes = Array.prototype.slice.call(
      menu.querySelectorAll('a[href], button:not([disabled])')
    );
    if (!nodes.length) return;
    var first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function spy() {
    var y = window.scrollY + 140;
    var current = '';
    document.querySelectorAll('main section[id]').forEach(function (sec) {
      if (sec.offsetTop <= y) current = sec.id;
    });
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + current;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  function init() {
    header = document.getElementById('siteHeader');
    toggle = document.getElementById('navToggle');
    closeBtn = document.getElementById('navClose');
    menu = document.getElementById('mobileNav');
    scrim = document.getElementById('navScrim');
    if (!header || !toggle || !menu) return;

    links = Array.prototype.slice.call(document.querySelectorAll('.nav-desktop a, .mobile-tabbar a'));

    toggle.addEventListener('click', function () { setMenu(!open); });
    closeBtn.addEventListener('click', function () { setMenu(false); toggle.focus(); });
    scrim.addEventListener('click', function () { setMenu(false); });

    /* close when a menu link is used */
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    /* ESC closes — unless the enquiry modal is on top of it */
    document.addEventListener('keydown', function (e) {
      var modal = document.getElementById('enquiryModal');
      if (e.key === 'Escape' && open && (!modal || modal.hidden)) {
        setMenu(false);
        toggle.focus();
      }
      trap(e);
    });

    /* click outside the panel */
    document.addEventListener('click', function (e) {
      if (!open) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setMenu(false);
    });

    /* menu is desktop-irrelevant: close it if the viewport grows */
    var mq = window.matchMedia('(min-width: 1024px)');
    var onChange = function (e) { if (e.matches && open) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('is-stuck', window.scrollY > 24);
        spy();
        ticking = false;
      });
    }, { passive: true });

    spy();
  }

  window.APP.navigation = { close: function () { if (open) setMenu(false); } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
