/* ============================================
   MATRIX.JS — Canvas Background Effect
   ============================================ */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>?/\\|ｦｧｨｩｪｫ';
  const fontSize = 13;
  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(6,13,6,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    cols = Math.floor(canvas.width / fontSize);
    while (drops.length < cols) drops.push(Math.random() * -100);

    ctx.font = fontSize + 'px JetBrains Mono, monospace';

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const opacity = Math.random() * 0.6 + 0.1;
      // Vary between bright and dim green
      if (Math.random() > 0.95) {
        ctx.fillStyle = `rgba(57,255,20,${opacity})`;        // bright
      } else {
        ctx.fillStyle = `rgba(0,180,80,${opacity * 0.5})`;  // dim
      }
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // Pause animation when tab is hidden
  let animInterval;
  function startAnim() { animInterval = setInterval(draw, 80); }
  function stopAnim()  { clearInterval(animInterval); }
  startAnim();
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAnim() : startAnim();
  });
})();
