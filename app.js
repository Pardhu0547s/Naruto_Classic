const parallaxEls = document.querySelectorAll(".parallax");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
const ease = 0.08;

/* ================= DESKTOP MOUSE ================= */
window.addEventListener("mousemove", (e) => {
  targetX = e.clientX - window.innerWidth / 2;
  targetY = e.clientY - window.innerHeight / 2;
});

/* ================= MOBILE GYRO ================= */
let gyroEnabled = false;

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    if (!gyroEnabled) return;

    targetX = e.gamma * 10; // left-right
    targetY = e.beta * 10;  // front-back
  });
}

/* ================= GYRO PERMISSION (iOS ONLY) ================= */
const gyroBtn = document.getElementById("gyroBtn");

if (
  gyroBtn &&
  typeof DeviceOrientationEvent !== "undefined" &&
  typeof DeviceOrientationEvent.requestPermission === "function"
) {
  gyroBtn.style.display = "block";

  gyroBtn.addEventListener("click", async () => {
    try {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission === "granted") {
        gyroEnabled = true;
        gyroBtn.style.display = "none";
      }
    } catch (err) {
      console.error(err);
    }
  });
} else {
  // Desktop + Android
  gyroEnabled = true;
  if (gyroBtn) gyroBtn.style.display = "none";
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

    const scale = 1 + Math.abs(speedX) * 0.03;
    el.style.setProperty("--scale", scale);
  });

  requestAnimationFrame(animateParallax);
}

animateParallax();
