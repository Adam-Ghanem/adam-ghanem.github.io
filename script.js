// Initialize AOS
AOS.init({ duration: 800, once: true });

// Scroll‑spy for nav
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 100;
  links.forEach(link => {
    const section = document.querySelector(link.hash);
    if (!section) return;
    link.classList.toggle('active',
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    );
  });
});

// Carousel logic
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

// Center the active item
function updatePosition() {
  const containerWidth = track.parentElement.offsetWidth;
  const itemWidth = items[0].getBoundingClientRect().width;
  const offset = (containerWidth - itemWidth) / 2;
  track.style.transform = `translateX(${-index * itemWidth + offset}px)`;
}

// Prev/Next handlers
prevBtn.addEventListener('click', () => {
  index = (index - 1 + items.length) % items.length;
  updatePosition();
});
nextBtn.addEventListener('click', () => {
  index = (index + 1) % items.length;
  updatePosition();
});

// Auto-play infinite
setInterval(() => {
  index = (index + 1) % items.length;
  updatePosition();
}, 4000);

// Initialize
window.addEventListener('load', updatePosition);
window.addEventListener('resize', updatePosition);
