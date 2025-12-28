const parallaxEls = document.querySelectorAll(".parallax");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
const ease = 0.08;

/* ================= DESKTOP (MOUSE) ================= */
window.addEventListener("mousemove", (e) => {
  targetX = e.clientX - window.innerWidth / 2;
  targetY = e.clientY - window.innerHeight / 2;
});

/* ================= MOBILE (GYROSCOPE) ================= */
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    // gamma: left-right, beta: front-back
    targetX = e.gamma * 10; 
    targetY = e.beta * 10;
  });
}

/* ================= ANIMATION LOOP ================= */
function animateParallax() {
  currentX += (targetX - currentX) * ease;
  currentY += (targetY - currentY) * ease;

  parallaxEls.forEach(el => {
    const speedX = el.dataset.speedx || 0;
    const speedY = el.dataset.speedy || 0;

    el.style.setProperty("--x", `${-currentX * speedX}px`);
    el.style.setProperty("--y", `${currentY * speedY}px`);

    const scale = 1 + speedX * 0.03;
    el.style.setProperty("--scale", scale);
  });

  requestAnimationFrame(animateParallax);
}

animateParallax();
