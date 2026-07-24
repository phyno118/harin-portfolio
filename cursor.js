(() => {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  const cursor = document.createElement('div');
  cursor.className = 'harin-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span>OPEN</span>';
  document.body.append(cursor);
  document.documentElement.classList.add('has-harin-cursor');

  const label = cursor.querySelector('span');
  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let started = false;

  const getLabel = (element) => {
    if (element.dataset.cursorLabel) return element.dataset.cursorLabel;
    if (element.matches('.project-card__more,.case-primary')) return 'VIEW';
    if (element.matches('.project-card__back,.case-back')) return 'BACK';
    if (element.matches('.next-project')) return 'NEXT';
    if (element.matches('.menu')) return 'MENU';
    if (element.matches('button')) return 'SELECT';
    return 'OPEN';
  };

  const render = () => {
    currentX += (targetX - currentX) * .22;
    currentY += (targetY - currentY) * .22;
    cursor.style.transform = `translate3d(${currentX}px,${currentY}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(render);
  };

  addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!started) {
      currentX = targetX;
      currentY = targetY;
      started = true;
    }
    cursor.classList.add('is-visible');
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    const action = event.target.closest('a,button,[role="button"],[data-cursor-label]');
    if (!action) return;
    label.textContent = getLabel(action);
    cursor.classList.add('is-active');
  });

  document.addEventListener('pointerout', (event) => {
    const action = event.target.closest('a,button,[role="button"],[data-cursor-label]');
    if (!action || action.contains(event.relatedTarget)) return;
    cursor.classList.remove('is-active');
  });

  addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
  addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  addEventListener('blur', () => cursor.classList.remove('is-visible'));
  render();
})();
