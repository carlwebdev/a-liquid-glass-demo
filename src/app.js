const canvas = document.getElementById('liquid-canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;

const bubbles = Array.from({ length: 9 }, (_, idx) => ({
  hue: 210 + idx * 18,
  x: Math.random(),
  y: Math.random(),
  r: 160 + Math.random() * 220,
  driftX: (Math.random() - 0.5) * 0.0004,
  driftY: (Math.random() - 0.5) * 0.0006,
}));

const pointer = { x: 0.5, y: 0.5, active: false };

function resizeCanvas() {
  const { innerWidth: width, innerHeight: height } = window;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw() {
  const { innerWidth: width, innerHeight: height } = window;
  ctx.clearRect(0, 0, width, height);

  bubbles.forEach((bubble) => {
    bubble.x += bubble.driftX;
    bubble.y += bubble.driftY;

    if (bubble.x < -0.15 || bubble.x > 1.15) bubble.driftX *= -1;
    if (bubble.y < -0.15 || bubble.y > 1.15) bubble.driftY *= -1;

    const px = bubble.x * width;
    const py = bubble.y * height;

    const gradient = ctx.createRadialGradient(px, py, bubble.r * 0.2, px, py, bubble.r);
    gradient.addColorStop(0, `hsla(${bubble.hue}, 95%, 72%, 0.8)`);
    gradient.addColorStop(1, `hsla(${bubble.hue + 40}, 95%, 55%, 0)`);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(px, py, bubble.r, 0, Math.PI * 2);
    ctx.fill();
  });

  if (pointer.active) {
    const gradient = ctx.createRadialGradient(
      pointer.x * width,
      pointer.y * height,
      0,
      pointer.x * width,
      pointer.y * height,
      280
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    gradient.addColorStop(0.35, 'rgba(140, 123, 255, 0.18)');
    gradient.addColorStop(1, 'rgba(140, 123, 255, 0)');

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(pointer.x * width, pointer.y * height, 360, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

function handlePointer(e) {
  const { clientX, clientY } = e.touches ? e.touches[0] : e;
  pointer.x = clientX / window.innerWidth;
  pointer.y = clientY / window.innerHeight;
  pointer.active = true;
}

function disablePointer() {
  pointer.active = false;
}

resizeCanvas();
draw();

window.addEventListener('resize', resizeCanvas);
window.addEventListener('pointermove', handlePointer, { passive: true });
window.addEventListener('pointerleave', disablePointer);
window.addEventListener('touchmove', handlePointer, { passive: true });
window.addEventListener('touchend', disablePointer);

// update motion token attributes for demo readability
document.querySelectorAll('.motion-pill').forEach((pill) => {
  const ease = pill.dataset.ease;
  pill.style.setProperty('--ease', ease);
});
