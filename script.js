document.getElementById('year').textContent = new Date().getFullYear();

// Subtle reveal on scroll for ledger entries — respects reduced motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const entries = document.querySelectorAll('.entry, .about, .resume, .contact');
  entries.forEach(el => { el.style.opacity = 0; el.style.transform = 'translateY(16px)'; el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; });

  const observer = new IntersectionObserver((items) => {
    items.forEach(item => {
      if (item.isIntersecting) {
        item.target.style.opacity = 1;
        item.target.style.transform = 'translateY(0)';
        observer.unobserve(item.target);
      }
    });
  }, { threshold: 0.1 });

  entries.forEach(el => observer.observe(el));
}
