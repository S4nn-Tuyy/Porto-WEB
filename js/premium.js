/* ============================================
   PREMIUM.JS — Luxury Interactions
   ============================================ */

// ─── FLOATING PARTICLES ─────────────────────
(function spawnParticles() {
  const count = 8;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${8 + Math.random() * 15}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    document.body.appendChild(p);
  }
})();

// ─── MAGNETIC BUTTONS ───────────────────────
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    setTimeout(() => el.style.transition = '', 500);
  });
});

// ─── NEON GLOW TRAIL ────────────────────────
const trail = [];
const TRAIL_LEN = 4;
for (let i = 0; i < TRAIL_LEN; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed; pointer-events:none; z-index:9994;
    width:${4 + i}px; height:${4 + i}px;
    border-radius:50%;
    background: rgba(0,255,136,${0.3 - i*0.03});
    box-shadow: 0 0 ${6 + i*2}px rgba(0,255,136,${0.4 - i*0.04});
    transform:translate(-50%,-50%);
    mix-blend-mode:screen;
    transition: left ${i*0.02}s, top ${i*0.02}s;
    will-change: left, top;
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
});
(function animateTrail() {
  let px = mouseX, py = mouseY;
  trail.forEach((t, i) => {
    t.el.style.left = px + 'px';
    t.el.style.top  = py + 'px';
    const next = trail[i + 1];
    if (next) {
      px = t.x = px * 0.5 + mouseX * 0.5;
      py = t.y = py * 0.5 + mouseY * 0.5;
    }
  });
  requestAnimationFrame(animateTrail);
})();

// ─── SECTION ENTRY ANIMATIONS ───────────────
const luxObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.animationDelay = (i * 0.1) + 's';
      e.target.classList.add('lux-in');
      luxObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.skill-cat, .proj-card, .cert-card, .tl-card, .stat-box').forEach(el => luxObs.observe(el));

// ─── CARD GLOW ON HOVER ─────────────────────
document.querySelectorAll('.proj-card, .cert-card, .skill-cat').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

// ─── TYPEWRITER ENHANCED ────────────────────
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  typeEl.style.borderRight = 'none'; // cursor handled by CSS
}

// ─── SCROLL PROGRESS BAR ────────────────────
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position:fixed; top:0; left:0; height:2px; z-index:9999;
  background: linear-gradient(90deg, #00ff88, #00ffcc, #06b6d4);
  box-shadow: 0 0 10px #00ff88, 0 0 20px rgba(0,255,136,0.4);
  width: 0%; transition: width 0.1s;
  border-radius: 0 2px 2px 0;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
});

// ─── SECTION NUMBER PARALLAX ────────────────
window.addEventListener('scroll', () => {
  document.querySelectorAll('.section-number').forEach(num => {
    const rect = num.closest('.section').getBoundingClientRect();
    const offset = rect.top * 0.15;
    num.style.transform = `translateY(${offset}px)`;
  });
});

// ─── STAT BOX HOVER GLOW ───────────────────
document.querySelectorAll('.stat-box').forEach(box => {
  box.addEventListener('mouseenter', () => {
    box.style.boxShadow = '0 0 30px rgba(0,255,136,0.15), inset 0 0 20px rgba(0,255,136,0.03)';
    box.style.transform = 'translateY(-4px) scale(1.02)';
    box.style.transition = 'all 0.3s cubic-bezier(0.23,1,0.32,1)';
  });
  box.addEventListener('mouseleave', () => {
    box.style.boxShadow = '';
    box.style.transform = '';
  });
});

// ─── GLITCH ON SECTION TITLE HOVER ─────────
document.querySelectorAll('.section-title').forEach(title => {
  title.addEventListener('mouseenter', () => {
    title.style.transition = 'filter 0.1s';
    title.style.filter = 'drop-shadow(0 0 15px rgba(0,255,136,0.6))';
  });
  title.addEventListener('mouseleave', () => {
    title.style.filter = '';
  });
});

// ─── TIMELINE ITEM STAGGER ─────────────────
const tlObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateX(0)';
      }, i * 100);
      tlObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'all 0.6s cubic-bezier(0.23,1,0.32,1)';
  tlObs.observe(item);
});

// ─── CURSOR CLICK BURST ─────────────────────
document.addEventListener('click', e => {
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement('div');
    const angle = (i / 6) * 360;
    const dist  = 20 + Math.random() * 20;
    spark.style.cssText = `
      position:fixed; pointer-events:none; z-index:9993;
      width:3px; height:3px; border-radius:50%;
      background:#00ff88;
      box-shadow: 0 0 6px #00ff88;
      left:${e.clientX}px; top:${e.clientY}px;
      transform:translate(-50%,-50%);
    `;
    document.body.appendChild(spark);
    spark.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      {
        transform: `translate(calc(-50% + ${Math.cos(angle * Math.PI/180) * dist}px), calc(-50% + ${Math.sin(angle * Math.PI/180) * dist}px)) scale(0)`,
        opacity: 0
      }
    ], { duration: 500, easing: 'ease-out' }).onfinish = () => spark.remove();
  }
});

console.log('%c⚡ PREMIUM MODE ACTIVE', 'color:#00ff88;font-size:16px;font-weight:bold;text-shadow:0 0 10px #00ff88;');
