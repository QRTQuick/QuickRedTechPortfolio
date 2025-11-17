// Main interactive behaviors for Quick Red Tech portfolio
document.addEventListener('DOMContentLoaded', () => {
  // Respect reduced motion preference
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Floating orbs for subtle motion
  const ORB_COUNT = reducedMotion ? 6 : 12;
  for (let i = 0; i < ORB_COUNT; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    const size = Math.round(18 + Math.random() * 64);
    orb.style.width = orb.style.height = size + 'px';
    orb.style.left = Math.random() * 100 + '%';
    orb.style.bottom = -50 - Math.random() * 120 + 'px';
    orb.style.animationDuration = 6 + Math.random() * 10 + 's';
    orb.style.opacity = 0.06 + Math.random() * 0.12;
    document.body.appendChild(orb);
  }

  // Create Back-to-top button
  const back = document.createElement('button');
  back.className = 'back-to-top';
  back.setAttribute('aria-label', 'Back to top');
  back.innerHTML = '↑';
  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(back);

  // Helper: debounce
  function debounce(fn, wait = 100) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
  }

  // Staggered reveal for sections and cards
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (!entry.isIntersecting) return;
      if (el.dataset.revealed) return;
      el.dataset.revealed = 'true';
      el.classList.add('show');

      const cards = el.querySelectorAll('.card');
      cards.forEach((card, i) => {
        const delay = i * 80; // ms
        card.style.transitionDelay = delay + 'ms';
        const icon = card.querySelector('.card-icon');
        if (icon) setTimeout(() => icon.classList.add('pop'), delay + 60);
        setTimeout(() => card.classList.add('show'), delay + 40);
      });
      // trigger typewriter for section h2 if present
      const h2 = el.querySelector('h2');
      if (h2 && !h2.dataset.typed) {
        h2.dataset.typed = 'true';
        const original = h2.textContent.trim();
        h2.textContent = '';
        typeWriter(h2, original, { delay: 30, cursor: true });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('section').forEach((s) => obs.observe(s));

  // Mobile nav toggle + accessibility
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');
  if (toggle && navList) {
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.setAttribute('aria-label', 'Toggle menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('show');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) toggle.focus();
      // If on larger screens, toggle circular layout on the nav
      const nav = document.querySelector('nav');
      if (window.innerWidth > 640) {
        nav.classList.toggle('circular');
        if (nav.classList.contains('circular')) layoutCircularMenu(nav.querySelector('ul'));
      }
    });
    toggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); } });

    // Close menu on outside click
    document.addEventListener('click', (ev) => {
      if (!navList.classList.contains('show')) return;
      const path = ev.composedPath ? ev.composedPath() : (ev.path || []);
      if (!path.includes(navList) && !path.includes(toggle)) {
        navList.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && navList.classList.contains('show')) {
        navList.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Layout nav items in a circular/radial pattern around center
  function layoutCircularMenu(ul){
    if (!ul) return;
    const items = Array.from(ul.querySelectorAll('li'));
    const radius = 84; // px radius from center
    const centerX = ul.clientWidth/2;
    const centerY = ul.clientHeight/2;
    const count = items.length;
    items.forEach((li, i)=>{
      // angle spread across -90deg to -450deg (full circle) so first item sits at top
      const angle = (i / count) * Math.PI * 2 - Math.PI/2;
      const x = Math.round(centerX + Math.cos(angle) * radius);
      const y = Math.round(centerY + Math.sin(angle) * radius);
      li.style.left = x + 'px';
      li.style.top = y + 'px';
    });
    // show items after layout
    setTimeout(()=> ul.classList.add('show'), 60);
  }

  // Re-layout if the window resizes while circular active
  window.addEventListener('resize', debounce(()=>{
    const nav = document.querySelector('nav');
    if (nav && nav.classList.contains('circular')) {
      layoutCircularMenu(nav.querySelector('ul'));
    }
  }, 120));

  // Smooth scroll for internal links (enhanced)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navList && navList.classList.contains('show')) navList.classList.remove('show');
      }
    });
  });

  // Lazy-load images (add loading attribute where missing)
  document.querySelectorAll('img').forEach(img => { if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy'); });

  // Show back-to-top when scrolled
  const checkScroll = () => {
    const sc = window.scrollY || document.documentElement.scrollTop;
    if (sc > window.innerHeight * 0.6) back.classList.add('show'); else back.classList.remove('show');
    // nav scrolled class
    const nav = document.querySelector('nav');
    if (nav) {
      if (sc > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', debounce(checkScroll, 50));
  checkScroll();

  // Hero parallax: throttle mouse move
  const hero = document.querySelector('.hero');
  const heroTitle = hero ? hero.querySelector('h1') : null;
  if (!reducedMotion && hero && heroTitle) {
    let ticking = false;
    hero.addEventListener('mousemove', (ev) => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (ev.clientX - cx) / rect.width; // -0.5 .. 0.5
        const dy = (ev.clientY - cy) / rect.height;
        const x = dx * 10; // px
        const y = dy * 8; // px
        heroTitle.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
        ticking = false;
      });
    });
    hero.addEventListener('mouseleave', () => { heroTitle.style.transform = ''; });
  }

  // Add a subtle animated bg layer element
  if (!document.querySelector('.animated-bg')){
    const bg = document.createElement('div');
    bg.className = 'animated-bg';
    document.body.appendChild(bg);
  }

  // Add a sharper animated background (skipped if reduced motion)
  if (!reducedMotion && !document.querySelector('.bg-sharp')){
    const sharp = document.createElement('div');
    sharp.className = 'bg-sharp';
    document.body.appendChild(sharp);
    // occasional subtle flash to make it feel sharp without being distracting
    setTimeout(()=> sharp.classList.add('flash'), 800);
    setTimeout(()=> sharp.classList.remove('flash'), 2000);
  }

  // TYPEWRITER: helper function
  function typeWriter(el, text, opts = {}){
    const speed = opts.delay || 40;
    const cursor = opts.cursor !== false;
    if (cursor) el.classList.add('typing-cursor');
    let i = 0;
    return new Promise((resolve) => {
      function tick(){
        if (i <= text.length - 1) {
          el.textContent += text.charAt(i);
          i += 1;
          setTimeout(tick, speed + Math.random()*8);
        } else {
          if (cursor) el.classList.remove('typing-cursor');
          resolve();
        }
      }
      tick();
    });
  }

  // Kick off hero typing (only if not reduced motion)
  if (!reducedMotion && heroTitle && !heroTitle.dataset.typed){
    const intro = heroTitle.textContent.trim();
    heroTitle.dataset.typed = 'true';
    heroTitle.textContent = '';
    // small delay so hero anims finish
    setTimeout(()=> typeWriter(heroTitle, intro, { delay: 40, cursor: true }), 220);
  }

  // Simple visitor counter (localStorage-based)
  try {
    const VISITOR_KEY = 'qrt_visits_v1';
    const prev = parseInt(localStorage.getItem(VISITOR_KEY) || '0', 10);
    const now = prev + 1;
    localStorage.setItem(VISITOR_KEY, String(now));
    const countEl = document.getElementById('visitor-count');
    if (countEl) {
      // animate counting from previous to now
      let displayed = prev;
      const step = Math.max(1, Math.floor((now - prev) / 12));
      const intv = setInterval(() => {
        displayed += step;
        if (displayed >= now) displayed = now;
        countEl.textContent = displayed.toString();
        if (displayed >= now) clearInterval(intv);
      }, 40);
    }
  } catch (e) {
    // localStorage may be disabled; fail silently
    console.warn('visitor counter disabled', e);
  }

});
