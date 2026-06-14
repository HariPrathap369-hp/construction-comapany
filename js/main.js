/* ===================================================================
   MCB BROTHERS CONSTRUCTION — interactions
   Vanilla JS, no dependencies.
   =================================================================== */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ----------  Current year in footer  ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------  Navbar: solid on scroll + scroll progress + back-to-top  ---------- */
  const nav      = $('#nav');
  const progress = $('#scrollProgress');
  const toTop    = $('#toTop');

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;

    if (nav) nav.classList.toggle('is-scrolled', y > 30);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);

    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ----------  Mobile menu  ---------- */
  const toggle   = $('#navToggle');
  const navLinks = $('#navLinks');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close after tapping a link
    $$('a', navLinks).forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ----------  Reveal on scroll  ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ----------  Animated counters  ---------- */
  const counters = $$('.stat__num[data-count]');   /* skip non-numeric stats like "24/7" */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isFloat = !Number.isInteger(target);
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      const val = target * eased;
      el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(c => { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
  }

  /* ----------  Scrollspy: highlight active nav link  ---------- */
  const sections = $$('main section[id]');
  const linkFor  = id => $('.nav__links a[href="#' + id + '"]');
  if ('IntersectionObserver' in window && sections.length) {
    const sio = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          $$('.nav__links a.is-active').forEach(a => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.5, rootMargin: '-20% 0px -40% 0px' });
    sections.forEach(s => sio.observe(s));
  }

  /* ----------  Projects filter  ---------- */
  const chips    = $$('.chip');
  const projects = $$('.project');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;
      projects.forEach(p => {
        const show = filter === 'all' || p.dataset.cat === filter;
        p.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ----------  Graceful image fallback  ---------- */
  $$('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.background = 'linear-gradient(135deg,#1c1f26,#2a2e37)';
      img.style.minHeight = '180px';
      img.removeAttribute('alt');
    }, { once: true });
  });

  /* ----------  Contact form (validation + send to email via FormSubmit)  ----------
     Submissions are emailed through FormSubmit (no backend needed). The first
     submission triggers a one-time activation email to the owner address below;
     click "Activate" once and every later submission is delivered automatically.
  --------------------------------------------------------------------------------- */
  const FORM_ENDPOINT = 'https://formsubmit.co/ajax/mcbbrothers@gmail.com';

  const form = $('#quoteForm');
  const note = $('#formNote');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      ['name', 'phone', 'email'].forEach(name => {
        const input = form.elements[name];
        const field = input.closest('.field');
        const ok = input.value.trim() !== '' &&
                   (name !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
        field.classList.toggle('is-invalid', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        note.textContent = 'Please fill in your name, a valid email, and phone.';
        note.className = 'form__note err';
        return;
      }

      const firstName = form.elements['name'].value.trim().split(' ')[0];
      const submitBtn = form.querySelector('button[type="submit"]');
      note.textContent = 'Sending…';
      note.className = 'form__note';
      if (submitBtn) submitBtn.disabled = true;

      const data = new FormData(form);
      data.append('_subject', 'New quote request — MCB Brothers website');
      data.append('_template', 'table');
      data.append('_captcha', 'false');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      })
        .then(r => r.json())
        .then(() => {
          note.textContent = `Thanks, ${firstName}! Your request has been sent — we'll be in touch within one business day.`;
          note.className = 'form__note ok';
          form.reset();
        })
        .catch(() => {
          note.textContent = 'Sorry, that didn’t go through — please call or WhatsApp us at +91 98430 70880.';
          note.className = 'form__note err';
        })
        .finally(() => { if (submitBtn) submitBtn.disabled = false; });
    });

    // Clear the invalid state as the user types
    $$('.field input, .field select', form).forEach(el =>
      el.addEventListener('input', () => el.closest('.field').classList.remove('is-invalid')));
  }
})();
