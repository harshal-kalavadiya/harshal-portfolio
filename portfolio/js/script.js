// Scroll-reveal for elements marked .reveal
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => io.observe(el));
} else {
  // Fallback: just show everything
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Stagger reveal slightly within the same section for a nicer cascade
document.querySelectorAll('.sheet').forEach((sheet) => {
  const items = sheet.querySelectorAll('.reveal');
  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
  });
});

// ---- Scroll-reactive navbar ----
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 24) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- Dark mode toggle (persisted) ----
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('hk-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  root.setAttribute('data-theme', 'dark');
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('hk-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('hk-theme', 'dark');
    }
  });
}

// ---- Cursor glow (desktop only) ----
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(hover: hover)').matches) {
  let raf = null;
  window.addEventListener('mousemove', (e) => {
    glow.classList.add('is-active');
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  });
  window.addEventListener('mouseleave', () => glow.classList.remove('is-active'));

  document.querySelectorAll('a, button, .project, .bento-card').forEach((el) => {
    el.addEventListener('mouseenter', () => glow.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => glow.classList.remove('is-hover'));
  });
}

// ---- Case study accordions ----
document.querySelectorAll('.case-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
    btn.textContent = '';
    const label = document.createElement('span');
    label.textContent = expanded ? 'Read full case study ' : 'Show less ';
    const arrow = document.createElement('span');
    arrow.className = 'case-arrow';
    arrow.textContent = '↓';
    btn.appendChild(label);
    btn.appendChild(arrow);
  });
});

// ---- Animated stat counters ----
const counters = document.querySelectorAll('.bento-num[data-count]');
if (counters.length && 'IntersectionObserver' in window) {
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => countIO.observe(el));
}
