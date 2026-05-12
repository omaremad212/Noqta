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

  /* ─── CONFETTI ─────────────────────────────────────────── */

  var CONFETTI_COLORS = ['#2A5540', '#8B6418', '#C4A86A', '#1A3225', '#3D7A5C', '#D4A853'];
  var CONFETTI_SHAPES = ['rect', 'circle'];

  function spawnPiece(delay) {
    setTimeout(function () {
      var el = document.createElement('div');
      var color  = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      var shape  = CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)];
      var size   = 5 + Math.random() * 7;
      var dur    = 1.6 + Math.random() * 2;
      var xPos   = Math.random() * 100;
      var rot    = Math.random() * 360;

      el.className = 'confetti-piece';
      el.style.cssText = [
        'left:'             + xPos + 'vw',
        'width:'            + size + 'px',
        'height:'           + (shape === 'circle' ? size : size * 1.6) + 'px',
        'background:'       + color,
        'border-radius:'    + (shape === 'circle' ? '50%' : '2px'),
        'transform:rotate(' + rot + 'deg)',
        'animation-duration:' + dur + 's'
      ].join(';');

      document.body.appendChild(el);

      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, (dur + 0.2) * 1000);
    }, delay);
  }

  function launchConfetti() {
    var total = 70;
    var spread = 800; /* ms over which pieces launch */
    for (var i = 0; i < total; i++) {
      spawnPiece(Math.random() * spread);
    }
  }

  /* ─── MODAL ────────────────────────────────────────────── */

  function open() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');
    launchConfetti();

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
