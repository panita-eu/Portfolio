document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal helper
function reveal(el) {
  el.style.opacity = 1;
  el.style.transform = 'translateY(0)';
}

// Subtle reveal on scroll — respects reduced motion
if (!reduceMotion) {
  const items = document.querySelectorAll('.entry, .work-card, .about, .resume, .contact');
  items.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => observer.observe(el));
}

// Work tabs — switch between company panels
const tabs = document.querySelectorAll('.work-tab');
const panels = document.querySelectorAll('.work-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.toggle('is-active', t === tab));
    panels.forEach(panel => {
      const active = panel.id === 'panel-' + target;
      panel.classList.toggle('is-active', active);
      // reveal contents of a newly shown panel so nothing stays invisible
      if (active) panel.querySelectorAll('.entry, .work-card').forEach(reveal);
    });
  });
});
