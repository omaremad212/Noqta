(function () {
  'use strict';

  /* ── elements ───────────────────────────────────────────── */
  var overlay  = document.getElementById('gift-modal');
  var card     = document.getElementById('modal-card');
  var openBtn  = document.getElementById('js-open');
  var closeBtn = document.getElementById('js-close');
  var canvas   = document.getElementById('confetti-canvas');
  var ctx      = canvas.getContext('2d');

  /* ── focus trap ─────────────────────────────────────────── */
  var FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

  function getFocusable() {
    return Array.prototype.slice.call(card.querySelectorAll(FOCUSABLE));
  }

  /* ── confetti ───────────────────────────────────────────── */
  var COLORS = ['#2A5540', '#F2EDD8', '#1C3829', '#C4A86A', '#3D7A5C'];
  var raf    = null;

  function launchConfetti() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '1';

    /* spawn particles from upper-center */
    var cx = canvas.width  * 0.5;
    var cy = canvas.height * 0.35;
    var particles = [];

    for (var i = 0; i < 52; i++) {
      var angle = (Math.random() * Math.PI * 2);
      var speed = 3 + Math.random() * 5;
      particles.push({
        x:    cx,
        y:    cy,
        vx:   Math.cos(angle) * speed,
        vy:   Math.sin(angle) * speed - 3,   /* bias upward */
        size: 4 + Math.random() * 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot:  Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.18,
        shape: Math.random() > 0.45 ? 'circle' : 'rect',
        alpha: 1
      });
    }

    var start = null;
    var DURATION = 1600;

    function tick(ts) {
      if (!start) start = ts;
      var progress = (ts - start) / DURATION;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var alive = false;
      particles.forEach(function (p) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.22;            /* gravity */
        p.vx *= 0.995;           /* slight air resistance */
        p.rot += p.rotV;
        p.alpha = Math.max(0, 1 - progress * 1.1);

        if (p.alpha <= 0) return;
        alive = true;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size * 0.5, -p.size * 0.25, p.size, p.size * 0.5);
        }

        ctx.restore();
      });

      if (alive && progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.opacity = '0';
        raf = null;
      }
    }

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  /* ── open / close ───────────────────────────────────────── */
  function open() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');

    launchConfetti();

    var focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
    openBtn.focus();
  }

  /* ── event listeners ────────────────────────────────────── */
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

    if (e.key === 'Tab' && overlay.classList.contains('is-open')) {
      var focusable = getFocusable();
      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
  });

}());
