/* ============================================
   CURSOR.JS — Custom Cursor & Click Ripple
   ============================================ */
(function () {
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  const rippleCont = document.getElementById('ripple-container');

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  // Move dot instantly
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px)`;
  });

  // Lag the ring
  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animRing);
  }
  animRing();

  // Scale on hover
  document.querySelectorAll('a, button, .tilt, .f-btn, .pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorRing.classList.add('ring-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorRing.classList.remove('ring-hover');
    });
  });

  // Hide/show on leave/enter
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorRing.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorRing.style.opacity = '1'; });

  // Click ripple
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('click-ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top  = e.clientY + 'px';
    rippleCont.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.35;
      const dy   = (e.clientY - cy) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
