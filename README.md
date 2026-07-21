# HARIN Portfolio Profile

4개 프로젝트의 분위기를 바탕으로 만든 아이보리 계열 UI/UX 디자이너 프로필입니다.

## 실행

`index.html`을 더블클릭하면 별도 설치 없이 실행됩니다.

## 반영한 작업물

- PETORY - 반려동물 기록 공유 서비스
- LUMIRIN - 감성 캔들 브랜드 웹사이트
  - 메인 페이지
  - 브랜드 스토리 페이지
  - 제품/컬렉션 페이지
- CGV Redesign - 몰입형 시네마 UX 케이스 스터디
- Flowly - 생산성 대시보드 케이스 스터디

LUMIRIN 메인과 브랜드 스토리, CGV, Flowly 카드는 각각 `projects/lumirin`, `projects/lumirin/story`, `projects/cgv`, `projects/flowly-case-study-v12`의 실행 가능한 결과물로 연결됩니다.

## 수정할 내용

1. `index.html`에서 소개 문구, 이메일, 경력 정보를 실제 내용으로 변경합니다.
2. `.portrait-art` 내부를 실제 프로필 사진으로 교체합니다.
3. Archive 카드를 프로젝트 상세 페이지 링크와 연결합니다.

프로필 사진 교체 예시:

```html
<div class="portrait-art">
  <img src="assets/profile.jpg" alt="하린 프로필 사진">
</div>
```

`styles.css`에 아래 스타일을 추가하면 됩니다.

```css
.portrait-art img { width: 100%; height: 100%; object-fit: cover; }
```

## 디자인 방향

- 배경: 따뜻한 아이보리와 페이퍼 화이트
- 포인트: PETORY/To-do의 코랄 핑크
- 구조: LUMIRIN의 넉넉한 여백과 에디토리얼 레이아웃
- 모션: CGV 프로젝트에서 보인 스크롤 등장과 강한 타이포그래피
- 접근성: 키보드 메뉴, 모션 감소 환경 대응
