/* ============================================
   MAIN.JS — Core Portfolio Interactions
   ============================================ */

// ─── LOADER ──────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.animation = 'loaderOut 0.8s ease forwards';
    loader.addEventListener('animationend', () => { loader.style.display = 'none'; });
  }, 2200);
});

// ─── NAVBAR ──────────────────────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const navToggle = document.getElementById('nav-toggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  highlightNav();
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ─── ACTIVE NAV HIGHLIGHT ────────────────────
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// ─── SMOOTH SCROLL ───────────────────────────
window.scrollToSection = function(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ─── TYPEWRITER ──────────────────────────────
const roles = ['Full Stack Developer', 'Cyber Security Enthusiast', 'Mobile App Developer', 'Problem Solver'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = roles[roleIndex];
  if (deleting) {
    typeEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeWriter, 600); return; }
    setTimeout(typeWriter, 50);
  } else {
    typeEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
    setTimeout(typeWriter, 90);
  }
}
setTimeout(typeWriter, 2500);

// ─── SCROLL REVEAL ───────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── STAT COUNTERS ───────────────────────────
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
        else el.textContent = current;
      }, 40);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

// ─── SKILL BARS ──────────────────────────────
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(fill => {
        const pct = fill.closest('.skill-row').dataset.pct;
        fill.style.setProperty('--pct', pct + '%');
        fill.classList.add('animate-fill');
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-cat').forEach(el => skillObs.observe(el));

// ─── PROJECT FILTER ──────────────────────────
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ─── 3D TILT ─────────────────────────────────
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
    const ry = ((e.clientX - cx) / (rect.width  / 2)) *  12;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ─── CONTACT FORM ────────────────────────────
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('btn-send');
  const msg = document.getElementById('form-msg');
  btn.textContent = 'SENDING...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'SENT! ✓';
    btn.style.background = 'linear-gradient(90deg, #00c853, #00e676)';
    msg.textContent = '> Message received. I will get back to you soon!';
    msg.classList.add('success');
    document.getElementById('contact-form').reset();
    setTimeout(() => { btn.textContent = 'SEND_MESSAGE.EXE ✈'; btn.disabled = false; btn.style.background = ''; msg.textContent = ''; msg.classList.remove('success'); }, 4000);
  }, 1800);
});

// ─── HERO PARALLAX GEO ───────────────────────
document.addEventListener('mousemove', (e) => {
  const geos = document.querySelectorAll('.geo');
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  geos.forEach((g, i) => {
    const factor = (i % 2 === 0 ? 0.02 : 0.015);
    const dx = (e.clientX - cx) * factor;
    const dy = (e.clientY - cy) * factor;
    g.style.transform = `translate(${dx}px, ${dy}px)`;
  });
});

// ─── GLITCH INTERVAL ─────────────────────────
const glitchEl = document.querySelector('.glitch');
function triggerGlitch() {
  if (!glitchEl) return;
  glitchEl.classList.add('glitching');
  setTimeout(() => glitchEl.classList.remove('glitching'), 400);
  setTimeout(triggerGlitch, 3500 + Math.random() * 3000);
}
setTimeout(triggerGlitch, 4000);
