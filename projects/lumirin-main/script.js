const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-button');
menu.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.site-header a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .12 });
document.querySelectorAll('section').forEach(section => reveal.observe(section));

const scentTrack = document.querySelector('.scent-track');
const scentCards = [...document.querySelectorAll('.scent-card')];
const scentProgress = document.querySelector('.scent-progress span');
const scentPrev = document.querySelector('.scent-prev');
const scentNext = document.querySelector('.scent-next');
let isDragging = false;
let dragStart = 0;
let scrollStart = 0;

function cardStep() {
  const first = scentCards[0];
  return first ? first.getBoundingClientRect().width + 24 : 320;
}

function updateScentProgress() {
  const max = scentTrack.scrollWidth - scentTrack.clientWidth;
  const ratio = max > 0 ? scentTrack.scrollLeft / max : 0;
  scentProgress.style.transform = `translateX(${ratio * (scentCards.length - 1) * 100}%)`;
}

function moveScents(direction) {
  scentTrack.scrollBy({ left: cardStep() * direction, behavior: 'smooth' });
}

scentPrev.addEventListener('click', () => moveScents(-1));
scentNext.addEventListener('click', () => moveScents(1));
scentTrack.addEventListener('scroll', updateScentProgress, { passive: true });
scentTrack.addEventListener('wheel', event => {
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault();
    scentTrack.scrollLeft += event.deltaY;
  }
}, { passive: false });
scentTrack.addEventListener('pointerdown', event => {
  isDragging = true;
  dragStart = event.clientX;
  scrollStart = scentTrack.scrollLeft;
  scentTrack.classList.add('dragging');
  scentTrack.setPointerCapture(event.pointerId);
});
scentTrack.addEventListener('pointermove', event => {
  if (isDragging) scentTrack.scrollLeft = scrollStart - (event.clientX - dragStart);
});
scentTrack.addEventListener('pointerup', () => {
  isDragging = false;
  scentTrack.classList.remove('dragging');
});
scentTrack.addEventListener('pointercancel', () => {
  isDragging = false;
  scentTrack.classList.remove('dragging');
});
updateScentProgress();
