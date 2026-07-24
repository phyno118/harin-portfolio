# HARIN — AI-Native UI/UX Portfolio

디자인, AI, 코드, 모션을 하나의 흐름으로 연결하는 하린의 포트폴리오입니다. 따뜻한 아이보리를 바탕으로 Apple·Linear·Notion 계열의 절제된 타이포그래피와 인터랙션을 적용했습니다.

## 실행

정적 HTML 프로젝트이므로 별도 설치가 필요하지 않습니다. 파일 경로로 직접 여는 것보다 프로젝트 폴더에서 로컬 서버를 실행하는 방식을 권장합니다.

```powershell
python -m http.server 5500
```

브라우저에서 `http://localhost:5500`을 엽니다.

## 주요 구성

- Full Page Layout — 주요 섹션을 `100vh` 단위로 구성하고 세로 Scroll Snap 적용
- Signature Hero — 디자이너의 강점을 대형 한글 타이포그래피로 표현
- About Me — Structure, AI Collaboration, Interaction, Build & Ship 키워드 카드
- How I Work — Design → AI → Code → Motion → Deploy 작업 흐름
- AI Collaboration — AI 탐색과 디자이너의 직접 수정 과정을 비교
- Selected Projects — 4개 작업의 대표 이미지와 핵심 설명을 한 화면에서 비교
- Simple Work Cards — 목록에서는 이미지, 제목, 한 줄 설명과 `See more`만 보여주고 상세 정보는 전체 화면에서 제공
- Full-screen Preview — 각 카드의 `See more` 버튼으로 프로젝트를 전체 화면에서 확인
- LUMIRIN Story — Overview, 핵심 역할, 세 페이지의 디자인 의도, 문제 해결, 회고만 간결하게 제공
- Custom Cursor — 코랄 링과 `VIEW`·`BACK`·`OPEN` 상태 라벨을 사용하는 데스크톱 커서
- Case Study — Overview, Problem, Design, Motion, Result 공통 구조

## 반영한 작업물

- PETORY - 반려동물 기록 공유 서비스
- LUMIRIN - 감성 캔들 브랜드 웹사이트
  - 메인 페이지
  - 브랜드 스토리 페이지
  - 제품/컬렉션 페이지
- CGV Redesign - 몰입형 시네마 UX 케이스 스터디
- Flowly - 생산성 대시보드 케이스 스터디

각 프로젝트 카드는 `projects/case-study.html?project=프로젝트명` 형식의 케이스 스터디로 연결됩니다. 실제 결과물은 케이스 스터디 내부의 `View Project`에서 확인할 수 있습니다.

## 수정할 내용

1. 기본 소개와 프로젝트 내용: `index.html`
2. 리디자인 전용 스타일: `redesign.css`
3. 메인 인터랙션: `script.js`
4. 프로젝트 상세 데이터: `projects/case-study.js`
5. 프로젝트 상세 스타일: `projects/case-study.css`

## 디자인 방향

- 원칙: Less but Better — 프로젝트와 정보가 장식보다 먼저 보이도록 구성
- 배경: 따뜻한 아이보리와 페이퍼 화이트
- 포인트: 하린을 상징하는 단일 코랄 컬러
- 구조: 넉넉한 여백, 에디토리얼 그리드, 강한 한글 타이포그래피
- 모션: Full Page 스크롤 전환, 짧은 reveal, 절제된 카드 hover, AI 비교 탭
- 접근성: 키보드 메뉴, 모션 감소 환경 대응
