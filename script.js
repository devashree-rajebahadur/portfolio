// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  })
);

// Highlight the current section in the nav
const links = [...navLinks.querySelectorAll('a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

// Topographic contour lines behind the hero (generated, so no image file needed)
(function drawContours() {
  const svg = document.getElementById('contours');
  const W = 1200, H = 700, cx = W * 0.72, cy = H * 0.5;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  let paths = '';
  for (let i = 1; i <= 22; i++) {
    const r = i * 32, pts = [];
    for (let a = 0; a < 360; a += 6) {
      const t = a * Math.PI / 180;
      const wobble = 1 + 0.16 * Math.sin(3 * t + i * 0.18) + 0.09 * Math.sin(5 * t - i * 0.12);
      pts.push([cx + r * 1.5 * wobble * Math.cos(t), cy + r * wobble * Math.sin(t)]);
    }
    paths += '<path d="M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z"/>';
  }
  svg.innerHTML = paths;
})();

// If a project image or the portrait is missing, show a contour placeholder instead of a broken icon
document.querySelectorAll('.project img, .portrait img, .figure img').forEach(img => {
  img.addEventListener('error', () => {
    if (img.closest('.portrait')) { img.style.display = 'none'; return; }
    const ph = document.createElement('div');
    ph.className = 'ph';
    ph.textContent = 'Add your map here: ' + img.getAttribute('src');
    img.replaceWith(ph);
  });
});
