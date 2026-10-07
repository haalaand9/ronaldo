const revealElements = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-target]');
const themeToggle = document.getElementById('themeToggle');
const goalCards = document.querySelectorAll('.goal-card');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const animateCounter = (element) => {
  const target = Number(element.dataset.target);
  const duration = 1500;
  const start = performance.now();

  const update = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = value + (target >= 800 ? '+' : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + (target >= 800 ? '+' : '');
    }
  };

  requestAnimationFrame(update);
};

counters.forEach((counter) => {
  animateCounter(counter);
});

goalCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.25}s`;
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});

const year = new Date().getFullYear();
const footerText = document.querySelector('.site-footer p:last-child');
if (footerText) {
  footerText.textContent = `Built with love for football greatness — ${year}.`;
}
