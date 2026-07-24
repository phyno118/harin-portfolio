const projects = {
  lumirin: {
    label: 'BRAND EXPERIENCE · 2026',
    title: '빛의 온도를\n웹 경험으로.',
    summary: '감성 캔들 브랜드 LUMIRIN의 고요하고 따뜻한 분위기를 메인, 브랜드 스토리, 제품 컬렉션으로 이어지는 하나의 경험으로 설계했습니다.',
    role: 'Brand Web Designer', duration: 'Personal Sprint', contribution: '100% · 개인 작업', tools: 'Figma · AI · HTML/CSS',
    theme: 'lumirin', image: 'lumirin/assets/room-hero-hd.png', live: 'lumirin/index.html',
    overviewTitle: '브랜드의 온도를\n화면의 리듬으로 번역했습니다.',
    overviewLead: '제품을 먼저 보여주기보다, 사용자가 브랜드의 공기와 빛을 먼저 느끼게 하는 것이 이 프로젝트의 출발점이었습니다.',
    overviewCopy: ['세 페이지가 서로 다른 목적을 가지면서도 하나의 브랜드처럼 느껴지도록 여백, 이미지 비율, 타이포그래피의 리듬을 통일했습니다.', '감성에만 머물지 않도록 탐색 구조와 CTA의 우선순위를 명확하게 정리해 제품 발견까지 자연스럽게 연결했습니다.'],
    problemTitle: '감성과 구매 흐름 사이의\n균형이 필요했습니다.',
    problems: [['01','분위기는 강하지만 정보가 묻히는 문제','이미지 중심 구성에서도 핵심 메시지와 CTA가 놓치지 않도록 계층을 재정리했습니다.'],['02','세 페이지의 연결감 부족','메인·스토리·컬렉션에 공통된 그리드와 여백 규칙을 적용했습니다.'],['03','제품 탐색의 단조로움','호버와 스크롤 반응을 활용해 차분하지만 정적인 인상은 줄였습니다.']],
    designTitle: '조용한 장면 안에서\n정보가 또렷하게 보이도록.',
    designs: [['Editorial Layout','큰 이미지와 넉넉한 여백으로 브랜드의 고요한 인상을 유지했습니다.'],['Warm Neutral Palette','베이지와 아이보리의 미세한 온도 차이로 깊이를 만들었습니다.'],['Connected Journey','스토리에서 제품으로 자연스럽게 이어지는 탐색 흐름을 설계했습니다.']],
    motions: [['SCROLL','이미지가 천천히 드러나며 공간의 깊이를 전달합니다.'],['HOVER','제품과 링크의 반응은 작고 부드럽게 유지합니다.'],['TRANSITION','페이지 간 동일한 속도와 이징으로 브랜드 리듬을 맞춥니다.']],
    resultTitle: '세 개의 페이지가\n하나의 브랜드가 되었습니다.',
    resultLead: 'LUMIRIN의 감성을 유지하면서도 사용자가 길을 잃지 않는 브랜드 웹 경험으로 정리했습니다.',
    results: ['브랜드 스토리와 제품 탐색의 연결','반응형 환경에서도 유지되는 에디토리얼 리듬','감성을 해치지 않는 명확한 CTA 구조'], next: 'cgv'
  },
  cgv: {
    label: 'CINEMA REDESIGN · 2026',
    title: '영화를 고르는 순간부터\n몰입이 시작되도록.',
    summary: '복잡한 영화 정보와 프로모션을 빠르게 탐색하면서도 CGV 특유의 시네마틱한 인상을 느낄 수 있도록 메인 경험을 재구성했습니다.',
    role: 'UI/UX Redesign', duration: 'Personal Sprint', contribution: '100% · 개인 작업', tools: 'Figma · HTML/CSS · JS',
    theme: 'cgv', image: 'cgv/CGV image/hero_img.jpg', live: 'cgv/index.html',
    overviewTitle: '콘텐츠 탐색과\n시네마의 몰입을 연결했습니다.',
    overviewLead: '영화 사이트는 정보가 많지만, 사용자의 목적은 단순합니다. 지금 볼 영화를 찾고, 망설이지 않고 예매하는 것입니다.',
    overviewCopy: ['상영작, 특별관, 이벤트의 우선순위를 사용자의 탐색 순서에 맞춰 다시 배치했습니다.', '검정과 레드의 대비를 중심으로 시선이 영화 콘텐츠에 머물도록 구성했습니다.'],
    problemTitle: '많은 정보가 같은 목소리로\n말하고 있었습니다.',
    problems: [['01','콘텐츠 우선순위가 불분명','현재 상영작과 예매 행동을 화면의 가장 강한 계층으로 끌어올렸습니다.'],['02','프로모션 중심의 복잡한 첫인상','섹션별 목적을 분리하고 한 화면에 하나의 메시지만 남겼습니다.'],['03','브랜드 몰입감 부족','시네마틱 이미지, 레드 글로우, 깊이감 있는 전환을 적용했습니다.']],
    designTitle: '강한 비주얼 속에서도\n행동은 단순하게.',
    designs: [['Content First','영화 포스터와 핵심 정보가 가장 먼저 읽히는 구조를 만들었습니다.'],['Cinematic Contrast','블랙 바탕과 제한된 레드 포인트로 몰입을 강화했습니다.'],['Fast Booking','영화 탐색에서 예매까지 필요한 단계를 짧게 연결했습니다.']],
    motions: [['REVEAL','영화 정보가 순차적으로 등장해 시선의 순서를 만듭니다.'],['GLOW','레드 글로우는 선택된 콘텐츠와 주요 행동만 강조합니다.'],['PREVIEW','호버 시 이미지 확대와 정보 전환으로 탐색을 돕습니다.']],
    resultTitle: '정보는 가벼워지고,\n영화의 인상은 강해졌습니다.',
    resultLead: '사용자가 원하는 콘텐츠를 더 빠르게 발견하면서도 CGV다운 시네마 경험을 느끼도록 균형을 맞췄습니다.',
    results: ['상영작 중심의 명확한 정보 계층','예매 행동까지 이어지는 짧은 흐름','브랜드 컬러를 절제해 사용한 몰입형 UI'], next: 'petory'
  },
  petory: {
    label: 'PET COMPANION UX · 2026',
    title: '작은 기록이\n오래 남는 관계로.',
    summary: '반려동물의 일상을 부담 없이 기록하고 가족과 공유할 수 있도록 친근하고 단순한 기록 경험을 설계했습니다.',
    role: 'Product Designer', duration: 'UX Project', contribution: 'Research · UX · UI', tools: 'Figma · Prototype',
    theme: 'petory', image: null, live: null,
    overviewTitle: '기록의 부담은 줄이고,\n관계의 온도는 높였습니다.',
    overviewLead: '소중한 순간을 남기고 싶어도 기록 과정이 복잡하면 습관으로 이어지기 어렵습니다. PETORY는 가장 작은 행동으로 기록을 시작하게 합니다.',
    overviewCopy: ['사진과 짧은 문장만으로도 기록이 완성되도록 입력 단계를 줄였습니다.', '가족과의 공유, 건강 정보, 일상 아카이브를 하나의 친근한 톤으로 연결했습니다.'],
    problemTitle: '기록 앱이 또 하나의\n할 일이 되어서는 안 됐습니다.',
    problems: [['01','작성 과정의 부담','필수 입력을 최소화하고 사진 중심의 빠른 기록을 설계했습니다.'],['02','정보 유형의 혼재','일상·건강·추억을 목적에 따라 구분하고 탐색 규칙을 통일했습니다.'],['03','서비스의 딱딱한 인상','부드러운 핑크와 원형 그래픽으로 친근한 첫인상을 만들었습니다.']],
    designTitle: '손이 자주 가는 경험은\n가볍고 다정해야 합니다.',
    designs: [['Quick Record','한 화면에서 사진, 날짜, 짧은 메모로 기록을 마칩니다.'],['Soft Visual Language','둥근 형태와 낮은 대비로 편안한 인상을 유지합니다.'],['Shared Memory','가족이 같은 기록을 보고 반응할 수 있는 흐름을 구성했습니다.']],
    motions: [['ADD','추가 버튼은 가볍게 반응해 기록 시작을 유도합니다.'],['FEEDBACK','저장과 공유 상태를 작고 분명한 모션으로 알려줍니다.'],['ARCHIVE','시간순 기록이 부드럽게 쌓이며 성장의 흐름을 보여줍니다.']],
    resultTitle: '기록은 단순해지고,\n추억은 더 선명해졌습니다.',
    resultLead: '기능을 많이 보여주기보다 사용자가 오늘의 한 장면을 남기는 데 집중하도록 경험을 정리했습니다.',
    results: ['빠르게 시작하고 끝나는 기록 흐름','일상과 건강 정보를 구분한 정보 구조','반려 생활의 정서를 담은 일관된 비주얼'], next: 'flowly'
  },
  flowly: {
    label: 'AI PRODUCTIVITY · 2026',
    title: '흩어진 업무를\n하나의 흐름으로.',
    summary: 'AI를 활용한 빠른 탐색과 직접 구현·수정을 반복하며 업무 우선순위를 한눈에 이해할 수 있는 생산성 대시보드를 만들었습니다.',
    role: 'AI Product Designer', duration: 'Personal Sprint', contribution: 'UX · UI · Code · QA', tools: 'Figma · AI · React',
    theme: 'flowly', image: '../assets/flowly-dashboard-card.png', live: 'flowly-case-study-v12/index.html',
    overviewTitle: '더 많은 기능보다\n더 명확한 하루가 필요했습니다.',
    overviewLead: '생산성 도구는 많지만 업무가 여러 화면에 흩어지면 사용자는 오늘 무엇을 해야 하는지 다시 판단해야 합니다.',
    overviewCopy: ['오늘의 할 일, 집중 시간, 프로젝트 진행률을 한 화면에서 이해하도록 정보 우선순위를 재설계했습니다.', 'AI로 레이아웃 후보를 빠르게 탐색한 뒤 실제 브라우저에서 직접 구현하고 반복적으로 수정했습니다.'],
    problemTitle: '정보는 많았지만\n다음 행동은 보이지 않았습니다.',
    problems: [['01','같은 비중의 정보 카드','오늘의 할 일을 중심으로 KPI와 프로젝트 정보를 재배치했습니다.'],['02','일반적인 대시보드 인상','하나의 바이올렛 포인트와 촘촘한 컴포넌트 규칙을 적용했습니다.'],['03','시안과 구현의 간극','React로 직접 구현하며 반응형과 상호작용을 동시에 검증했습니다.']],
    designTitle: 'AI는 넓게 탐색하고,\n디자이너는 정확히 선택했습니다.',
    designs: [['AI Exploration','레이아웃과 문구 후보를 빠르게 생성하고 비교했습니다.'],['Human Priority','사용자의 하루를 기준으로 정보의 순서와 밀도를 직접 조정했습니다.'],['Build to Validate','코드로 구현해 실제 크기, 반응형, 상태 변화를 검증했습니다.']],
    motions: [['TASK','완료 상태가 즉시 반영되어 행동의 결과를 분명하게 전달합니다.'],['CHART','차트와 진행률은 진입 시 자연스럽게 나타나 정보 이해를 돕습니다.'],['RESPONSIVE','데스크톱의 밀도는 유지하고 모바일에서는 핵심 카드부터 재배치합니다.']],
    resultTitle: '예쁜 화면을 넘어\n다음 행동이 보이게 했습니다.',
    resultLead: 'AI의 속도와 디자이너의 판단, 코드 검증을 하나의 흐름으로 연결한 프로젝트입니다.',
    results: ['오늘의 행동이 먼저 보이는 대시보드','AI 초안에서 직접 수정까지 드러나는 과정','실제 작동하는 반응형 React 프로토타입'], next: 'lumirin'
  }
};

const key = new URLSearchParams(location.search).get('project') || 'lumirin';
const project = projects[key] || projects.lumirin;
document.body.dataset.theme = project.theme;
document.title = `${project.title.replace(/\n/g, ' ')} — HARIN`;

const setText = (field, value) => document.querySelectorAll(`[data-field="${field}"]`).forEach((node) => { node.textContent = value; });
['label','summary','role','duration','contribution','tools','overviewLead','resultLead'].forEach((field) => setText(field, project[field]));
['title','overviewTitle','problemTitle','designTitle','resultTitle'].forEach((field) => {
  const node = document.querySelector(`[data-field="${field}"]`);
  if (node) node.innerHTML = project[field].split('\n').join('<br />');
});

const live = document.querySelector('[data-field="live"]');
if (project.live) live.href = project.live;
else live.remove();

if (key === 'lumirin' && live) {
  live.innerHTML = '메인 <span>↗</span>';
  const readStory = document.querySelector('.case-actions a[href="#overview"]');
  [['브랜드 스토리','lumirin/story/index.html'],['제품 컬렉션','lumirin/collection/index.html']].forEach(([label, href]) => {
    const link = document.createElement('a');
    link.className = 'case-primary';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener';
    link.innerHTML = `${label} <span>↗</span>`;
    readStory.before(link);
  });
}

const media = document.querySelector('[data-field="media"]');
if (project.image) media.innerHTML = `<img src="${project.image}" alt="${project.title.replace(/\n/g,' ')} 프로젝트 대표 화면" />`;
else media.innerHTML = '<div class="petory-art" aria-label="PETORY 브랜드 그래픽"><i></i><i></i><i></i><strong>PETORY</strong><small>small records, lasting memories.</small></div>';

document.querySelector('[data-field="overviewCopy"]').innerHTML = project.overviewCopy.map((item) => `<p>${item}</p>`).join('');
document.querySelector('[data-field="problems"]').innerHTML = project.problems.map(([number,title,copy]) => `<article><span>${number}</span><h3>${title}</h3><p>${copy}</p></article>`).join('');
document.querySelector('[data-field="designs"]').innerHTML = project.designs.map(([title,copy], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${copy}</p></article>`).join('');
document.querySelector('[data-field="motions"]').innerHTML = project.motions.map(([title,copy], index) => `<article><div class="motion-demo motion-demo--${index + 1}"><i></i><i></i><i></i></div><small>${title}</small><p>${copy}</p></article>`).join('');
document.querySelector('[data-field="results"]').innerHTML = project.results.map((item, index) => `<p><span>0${index + 1}</span>${item}</p>`).join('');

const next = projects[project.next];
const nextLink = document.querySelector('.next-project');
nextLink.href = `case-study.html?project=${project.next}`;
nextLink.querySelector('span').textContent = next.title.replace(/\n/g, ' ');

const progress = document.querySelector('.case-progress i');
const sideIndex = document.querySelector('.case-index');
const sections = [...document.querySelectorAll('[data-section]')];
const updatePage = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  const current = sections.filter((section) => section.getBoundingClientRect().top < innerHeight * .45).pop() || sections[0];
  sideIndex.querySelector('span').textContent = current.dataset.section;
  sideIndex.querySelector('p').textContent = current.dataset.label;
};
updatePage();
addEventListener('scroll', updatePage, { passive: true });

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('is-visible');
  revealObserver.unobserve(entry.target);
}), { threshold: .12 });
document.querySelectorAll('.case-heading,.case-overview__grid,.case-list article,.design-decisions article,.design-system,.motion-grid article,.result-grid').forEach((item) => revealObserver.observe(item));
