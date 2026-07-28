document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.quick-add');
  const input = document.querySelector('.task-input');
  const taskList = document.querySelector('.task-list');
  const tabs = [...document.querySelectorAll('.tabs button')];
  const primaryButton = document.querySelector('.primary-button');
  let currentFilter = '오늘';

  const modalStyles = document.createElement('style');
  modalStyles.textContent = `
    .flowly-modal{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:20px;background:rgba(24,24,31,.42);backdrop-filter:blur(4px)}
    .flowly-modal[hidden]{display:none}
    .flowly-modal__panel{width:min(440px,100%);padding:28px;border:1px solid #e7e5ef;border-radius:18px;background:#fff;box-shadow:0 24px 80px rgba(32,28,60,.22)}
    .flowly-modal__panel h2{margin:0;color:#24242a;font-size:22px}
    .flowly-modal__panel p{margin:8px 0 20px;color:#8d8b98;font-size:14px}
    .flowly-modal__panel input{box-sizing:border-box;width:100%;height:50px;padding:0 14px;border:1px solid #dcd9e9;border-radius:10px;outline:0;color:#24242a;font:inherit}
    .flowly-modal__panel input:focus{border-color:#6c5ce7;box-shadow:0 0 0 3px rgba(108,92,231,.12)}
    .flowly-modal__actions{display:flex;justify-content:flex-end;gap:10px;margin-top:18px}
    .flowly-modal__actions button{min-width:92px;height:42px;padding:0 16px;border-radius:9px;font-size:14px;font-weight:700}
    .flowly-modal__cancel{color:#666370;background:#f3f2f7}
    .flowly-modal__submit{color:#fff;background:#6c5ce7}
  `;
  document.head.appendChild(modalStyles);

  const showToast = (message) => {
    let toast = document.querySelector('.flowly-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'flowly-toast';
      Object.assign(toast.style, {
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: '100',
        padding: '13px 18px',
        borderRadius: '10px',
        color: '#fff',
        background: '#24242a',
        boxShadow: '0 12px 35px rgba(36,36,42,.18)',
        fontSize: '14px',
        transition: 'opacity .25s ease, transform .25s ease'
      });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
    }, 1800);
  };

  const taskRows = () => [...document.querySelectorAll('.task-list .task-row')];

  const setRowState = (row, done) => {
    row.classList.toggle('done', done);
    row.dataset.status = done ? '완료' : '오늘';
    const check = row.querySelector('.check-button');
    if (check) {
      check.textContent = done ? '✓' : '';
      check.setAttribute('aria-label', done ? '미완료로 변경' : '완료로 변경');
    }
  };

  const refreshFilter = () => {
    taskRows().forEach((row) => {
      const visible =
        currentFilter === '전체' ||
        (currentFilter === '완료' && row.dataset.status === '완료') ||
        (currentFilter === '오늘' && row.dataset.status !== '완료') ||
        currentFilter === '예정';
      row.hidden = currentFilter === '예정' ? true : !visible;
    });
  };

  const bindRow = (row) => {
    setRowState(row, row.classList.contains('done'));
    row.querySelector('.check-button')?.addEventListener('click', () => {
      setRowState(row, !row.classList.contains('done'));
      refreshFilter();
      showToast(row.classList.contains('done') ? '할 일을 완료했어요.' : '할 일을 다시 진행합니다.');
    });
    row.querySelector('.delete-button')?.addEventListener('click', () => {
      row.remove();
      showToast('할 일을 삭제했습니다.');
    });
  };

  taskRows().forEach(bindRow);

  const createTask = (title) => {
    const row = document.createElement('div');
    row.className = 'task-row';
    row.dataset.status = '오늘';

    const check = document.createElement('button');
    check.className = 'check-button';
    check.setAttribute('aria-label', '완료로 변경');

    const copy = document.createElement('div');
    copy.className = 'task-copy';
    const strong = document.createElement('strong');
    strong.textContent = title;
    const meta = document.createElement('span');
    meta.textContent = '# 새 할 일 · 오늘';
    copy.append(strong, meta);

    const priority = document.createElement('span');
    priority.className = 'priority medium';
    priority.textContent = '보통';

    const remove = document.createElement('button');
    remove.className = 'delete-button';
    remove.setAttribute('aria-label', '할 일 삭제');
    remove.textContent = '×';

    row.append(check, copy, priority, remove);
    taskList?.prepend(row);
    bindRow(row);
    currentFilter = '오늘';
    tabs.forEach((tab) => tab.classList.toggle('active', tab.textContent.trim().startsWith('오늘')));
    refreshFilter();
    showToast('새 할 일을 추가했습니다.');
  };

  const modal = document.createElement('div');
  modal.className = 'flowly-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <form class="flowly-modal__panel" role="dialog" aria-modal="true" aria-labelledby="flowly-modal-title">
      <h2 id="flowly-modal-title">새 할 일 추가</h2>
      <p>오늘 처리할 업무를 입력해 주세요.</p>
      <input type="text" maxlength="80" placeholder="할 일 제목" aria-label="할 일 제목" />
      <div class="flowly-modal__actions">
        <button class="flowly-modal__cancel" type="button">취소</button>
        <button class="flowly-modal__submit" type="submit">추가하기</button>
      </div>
    </form>
  `;
  document.body.appendChild(modal);
  const modalInput = modal.querySelector('input');

  const closeModal = () => {
    modal.hidden = true;
    primaryButton?.focus();
  };

  const openModal = () => {
    modal.hidden = false;
    modalInput.value = '';
    window.setTimeout(() => modalInput.focus(), 0);
  };

  modal.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = modalInput.value.trim();
    if (!title) {
      modalInput.focus();
      return;
    }
    createTask(title);
    closeModal();
  });
  modal.querySelector('.flowly-modal__cancel').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = input?.value.trim();
    if (!title) {
      input?.focus();
      return;
    }
    createTask(title);
    input.value = '';
  });

  primaryButton?.addEventListener('click', openModal);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      currentFilter = tab.textContent.trim().replace(/\d+$/, '');
      tabs.forEach((item) => item.classList.toggle('active', item === tab));
      refreshFilter();
    });
  });

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      showToast(`${button.textContent.trim().replace(/\d+$/, '')} 화면을 선택했습니다.`);
    });
  });

  const search = document.querySelector('input[placeholder="업무, 프로젝트 검색..."]');
  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    taskRows().forEach((row) => {
      row.hidden = query ? !row.textContent.toLowerCase().includes(query) : false;
    });
  });

  document.querySelector('.notification')?.addEventListener('click', () => showToast('새로운 알림이 없습니다.'));
  document.querySelector('.invite')?.addEventListener('click', () => showToast('초대 링크를 준비했습니다.'));
});
