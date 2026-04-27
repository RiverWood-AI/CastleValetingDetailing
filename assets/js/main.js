(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  ready(() => {

    // Footer year
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initHeader();
    initMobileMenu();
    initReveal();
    initSwiper();
    initLightbox();
  });

  /* ------------------------------------------------------------------ */
  function initHeader() {
    const header = $('#siteHeader');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggle = $('.nav-toggle');
    const menu = $('#mobileMenu');
    if (!toggle || !menu) return;

    const close = () => {
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      menu.setAttribute('hidden', '');
      document.body.style.overflow = '';
    };
    const open = () => {
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.removeAttribute('hidden');
      requestAnimationFrame(() => menu.classList.add('open'));
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
      menu.classList.contains('open') ? close() : open();
    });

    $$('a', menu).forEach(a => a.addEventListener('click', close));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) close();
    });
  }

  /* ------------------------------------------------------------------ */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger within a single intersection batch
          const delay = Math.min(i * 80, 400);
          entry.target.style.setProperty('--reveal-delay', delay + 'ms');
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------------ */
  function initSwiper() {
    if (typeof window.Swiper === 'undefined') return;

    new window.Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      centeredSlides: false,
      loop: true,
      grabCursor: true,
      keyboard: { enabled: true },
      autoplay: reduceMotion ? false : {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      speed: 700,
      pagination: {
        el: '.gallery-swiper .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.gallery-swiper .swiper-button-next',
        prevEl: '.gallery-swiper .swiper-button-prev'
      },
      breakpoints: {
        640:  { slidesPerView: 1.3, spaceBetween: 18 },
        900:  { slidesPerView: 2.2, spaceBetween: 22 },
        1200: { slidesPerView: 3,   spaceBetween: 26 },
        1600: { slidesPerView: 4,   spaceBetween: 28 },
        2000: { slidesPerView: 5,   spaceBetween: 32 }
      }
    });
  }

  /* ------------------------------------------------------------------ */
  function initLightbox() {
    const lightbox = $('#lightbox');
    const img      = $('.lightbox-img', lightbox);
    const btnClose = $('.lightbox-close', lightbox);
    const btnPrev  = $('.lightbox-prev', lightbox);
    const btnNext  = $('.lightbox-next', lightbox);
    const triggers = $$('.slide-btn');
    if (!lightbox || !img || !triggers.length) return;

    // Build an ordered source list from the DOM order of slides (unique only).
    const uniqueSrcs = [];
    const seen = new Set();
    triggers.forEach(t => {
      const src = t.dataset.src;
      if (src && !seen.has(src)) { uniqueSrcs.push(src); seen.add(src); }
    });

    let current = 0;
    let lastFocused = null;

    const show = (i) => {
      current = (i + uniqueSrcs.length) % uniqueSrcs.length;
      img.src = uniqueSrcs[current];
      img.alt = 'Gallery image ' + (current + 1) + ' of ' + uniqueSrcs.length;
    };

    const open = (src) => {
      lastFocused = document.activeElement;
      const idx = uniqueSrcs.indexOf(src);
      show(idx === -1 ? 0 : idx);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    };

    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      img.src = '';
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    };

    triggers.forEach(t => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        open(t.dataset.src);
      });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => show(current - 1));
    btnNext.addEventListener('click', () => show(current + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    // Touch swipe
    let tx0 = 0;
    lightbox.addEventListener('touchstart', (e) => { tx0 = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - tx0;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    });
  }
})();
