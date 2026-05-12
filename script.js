(function () {
  'use strict';

  const overlay    = document.getElementById('giftModal');
  const card       = document.getElementById('modalCard');
  const openBtn    = document.getElementById('openModalBtn');
  const closeBtn   = document.getElementById('closeModalBtn');

  const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function openModal() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const focusable = card.querySelectorAll(FOCUSABLE);
    if (focusable.length) focusable[0].focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (!card.contains(e.target)) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = Array.from(card.querySelectorAll(FOCUSABLE));
      if (!focusable.length) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

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
  });
}());
