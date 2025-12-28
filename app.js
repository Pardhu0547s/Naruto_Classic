function toggleMenu(el) {
    el.classList.toggle("active");
}

const parallaxEls = document.querySelectorAll(".parallax");

// Target mouse position
let mouseX = 0;
let mouseY = 0;

// Current animated position
let currentX = 0;
let currentY = 0;

// Smoothness factor (lower = smoother)
const ease = 0.08;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
});

function animateParallax() {
    // Smooth interpolation (LERP)
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    parallaxEls.forEach((el) => {
        const speedX = el.dataset.speedx;
        const speedY = el.dataset.speedy;

        const x = -currentX * speedX;
        const y = currentY * speedY;

        el.style.transform = `
            translate3d(
                calc(-50% + ${x}px),
                calc(-50% + ${y}px),
                0
            )
        `;
    });

    requestAnimationFrame(animateParallax);
}

animateParallax();
