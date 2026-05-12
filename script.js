(function () {
  'use strict';

  var overlay  = document.getElementById('gift-modal');
  var card     = document.getElementById('modal-card');
  var openBtn  = document.getElementById('js-open');
  var closeBtn = document.getElementById('js-close');

  var FOCUSABLE_SEL = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  function getFocusable() {
    return Array.prototype.slice.call(card.querySelectorAll(FOCUSABLE_SEL));
  }

  function open() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');

    var focusable = getFocusable();
    if (focusable.length) {
      focusable[0].focus();
    }
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
    openBtn.focus();
  }

  function trapFocus(e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key !== 'Tab') return;

    var focusable = getFocusable();
    if (!focusable.length) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  /* outside-click closes */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      close();
      return;
    }
    trapFocus(e);
  });

}());
