const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load', () => {
  const intro = document.querySelector('.intro');

  if (!intro) {
    document.body.classList.remove('intro-active');
    return;
  }

  if (reduced) {
    intro.remove();
    document.body.classList.remove('intro-active');
    return;
  }

  let finished = false;
  const finishIntro = () => {
    if (finished) return;
    finished = true;
    document.body.classList.remove('intro-active');
    document.body.classList.remove('intro-revealing');
    intro.remove();
  };

  intro.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'transform') finishIntro();
  });

  window.setTimeout(() => {
    document.body.classList.add('intro-revealing');
    intro.classList.add('done');
  }, 1150);
  window.setTimeout(finishIntro, 2850);
});

const scrollProgress = document.querySelector('.scroll-progress i');
const updateScrollProgress = () => {
  if (!scrollProgress) return;
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  scrollProgress.style.width = `${scrollable > 0 ? (scrollY / scrollable) * 100 : 0}%`;
};
updateScrollProgress();
addEventListener('scroll', updateScrollProgress, { passive: true });
addEventListener('resize', updateScrollProgress);

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12, rootMargin: '0px 0px -35px' });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const archive = document.querySelector('.archive');
const profile = document.querySelector('#profile');
if (archive && profile) profile.before(archive);
const archiveCount = archive?.querySelector('[data-count]');
if (archive) {
  const activateArchive = () => {
    archive.classList.add('archive-active');
    const target = Number(archiveCount.dataset.count || 4);
    if (!archiveCount) return;
    if (reduced) {
      archiveCount.textContent = String(target).padStart(2, '0');
      return;
    }
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

const workflow = document.querySelector('.workflow');
if (workflow) {
  const workflowObserver = new IntersectionObserver((entries, currentObserver) => {
    if (!entries[0].isIntersecting) return;
    workflow.classList.add('workflow-active');
    currentObserver.disconnect();
  }, { threshold: .25 });
  workflowObserver.observe(workflow);
}

const aiTabs = document.querySelectorAll('[data-ai-view]');
const aiStates = document.querySelectorAll('[data-ai-state]');
aiTabs.forEach((tab) => tab.addEventListener('click', () => {
  const target = tab.dataset.aiView;
  aiTabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  aiStates.forEach((state) => {
    const active = state.dataset.aiState === target;
    state.hidden = !active;
    state.classList.toggle('is-active', active);
  });
}));

const projectCards = [...document.querySelectorAll('.project-card')];
let expandedProject = null;

const openProject = (card, moveFocus = false) => {
  if (!card || expandedProject === card) return;
  if (expandedProject) closeProject(expandedProject, false);
  expandedProject = card;
  card.classList.add('is-expanded');
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');
  document.body.classList.add('project-expanded');
  document.documentElement.style.overflow = 'hidden';
  if (moveFocus) card.querySelector('.project-card__back')?.focus({ preventScroll: true });
};

const closeProject = (card = expandedProject, restoreFocus = true) => {
  if (!card) return;
  card.classList.remove('is-expanded');
  card.removeAttribute('role');
  card.removeAttribute('aria-modal');
  document.body.classList.remove('project-expanded');
  document.documentElement.style.overflow = '';
  expandedProject = null;
  if (restoreFocus) card.querySelector('.project-card__more')?.focus({ preventScroll: true });
};

projectCards.forEach((card) => {
  const more = card.querySelector('.project-card__more');
  const back = card.querySelector('.project-card__back');

  more?.addEventListener('click', (event) => {
    event.preventDefault();
    openProject(card, true);
  });

  back?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeProject(card);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && expandedProject) closeProject();
});

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
