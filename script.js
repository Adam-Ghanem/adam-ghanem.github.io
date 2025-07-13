// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Scroll-spy for nav
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
const indicators = document.querySelectorAll('.indicator');
let index = 0;

// Update carousel position
function updatePosition() {
  const containerWidth = track.parentElement.offsetWidth;
  track.style.transform = `translateX(${-index * containerWidth}px)`;
  
  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
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

// Indicator click handlers
indicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    index = parseInt(indicator.getAttribute('data-index'));
    updatePosition();
  });
});

// Auto-play infinite
let carouselInterval = setInterval(() => {
  index = (index + 1) % items.length;
  updatePosition();
}, 5000);

// Pause autoplay when hovering over carousel
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
  clearInterval(carouselInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
  carouselInterval = setInterval(() => {
    index = (index + 1) % items.length;
    updatePosition();
  }, 5000);
});

// Initialize
window.addEventListener('load', updatePosition);
window.addEventListener('resize', updatePosition);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});