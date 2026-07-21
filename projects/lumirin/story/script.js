const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
      entry.target.classList.add('visible');
    } else if (!entry.isIntersecting) {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: [0, 0.22, 0.5], rootMargin: '-5% 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.target.classList.toggle('in-view', entry.isIntersecting && entry.intersectionRatio > 0.35));
}, { threshold: [0.15, 0.35, 0.65] });

document.querySelectorAll('main section').forEach((section) => sectionObserver.observe(section));
