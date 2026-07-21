const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load', () => setTimeout(() => document.querySelector('.intro')?.classList.add('done'), reduced ? 0 : 1150));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12, rootMargin: '0px 0px -35px' });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const archive = document.querySelector('.archive');
const archiveCount = archive?.querySelector('[data-count]');
if (archive) {
  const activateArchive = () => {
    archive.classList.add('archive-active');
    if (!archiveCount || reduced) return;
    const target = Number(archiveCount.dataset.count || 4);
    const started = performance.now();
    archiveCount.textContent = '00';
    const countUp = (now) => {
      const progress = Math.min((now - started) / 760, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      archiveCount.textContent = String(Math.round(target * eased)).padStart(2, '0');
      if (progress < 1) requestAnimationFrame(countUp);
    };
    requestAnimationFrame(countUp);
  };
  if (reduced) activateArchive();
  else {
    const archiveObserver = new IntersectionObserver((entries, currentObserver) => {
      if (!entries[0].isIntersecting) return;
      activateArchive();
      currentObserver.disconnect();
    }, { threshold: .2 });
    archiveObserver.observe(archive);
  }
}

const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
menu?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
}));

if (!reduced && matchMedia('(pointer:fine)').matches) {
  const cursor = document.querySelector('.cursor');
  window.addEventListener('mousemove', (event) => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; });
  document.querySelectorAll('a,button,.skill,.work-pill').forEach((item) => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
  document.querySelectorAll('.magnetic').forEach((item) => {
    item.addEventListener('mousemove', (event) => { const box=item.getBoundingClientRect(); item.style.transform=`translate(${(event.clientX-box.left-box.width/2)*.16}px,${(event.clientY-box.top-box.height/2)*.16}px)`; });
    item.addEventListener('mouseleave', () => { item.style.transform=''; });
  });
  window.addEventListener('scroll', () => document.querySelectorAll('[data-parallax]').forEach((item) => {
    const move = scrollY * Number(item.dataset.parallax); item.style.marginTop = `${move}px`;
  }), { passive:true });

  const preview = document.querySelector('.project-preview');
  const previewLabel = preview?.querySelector('.project-preview__inner>b');
  const projectCards = document.querySelectorAll('.archive .work-pill[data-project]');
  if (preview && projectCards.length) {
    let x = -300, y = -300, targetX = -300, targetY = -300, frame;
    const renderPreview = () => {
      x += (targetX - x) * .18;
      y += (targetY - y) * .18;
      preview.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = preview.classList.contains('is-visible') ? requestAnimationFrame(renderPreview) : null;
    };
    const positionPreview = (event) => {
      targetX = Math.min(event.clientX + 24, innerWidth - 250);
      targetY = Math.min(event.clientY + 22, innerHeight - 190);
    };
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', (event) => {
        positionPreview(event);
        x = targetX; y = targetY;
        preview.dataset.project = card.dataset.project;
        previewLabel.textContent = card.querySelector('h3')?.textContent || '';
        preview.classList.add('is-visible');
        if (!frame) frame = requestAnimationFrame(renderPreview);
      });
      card.addEventListener('mousemove', positionPreview);
      card.addEventListener('mouseleave', () => preview.classList.remove('is-visible'));
    });
  }
}
