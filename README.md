# 박우상 — Portfolio

Apple.com의 공개된 디자인 패턴(edge-to-edge tiles, single Action Blue accent, SF Pro typography)을 학습 목적으로 적용한 정적 포트폴리오 페이지입니다. 의존성은 외부 폰트(Pretendard CDN) 하나뿐이고, 빌드 단계가 없는 순수 정적 파일이라 GitHub Pages에 그대로 올릴 수 있습니다.

## 구조

```
portfolio/
├── index.html      # 메인 페이지 (모든 섹션 포함)
├── styles.css      # 디자인 토큰 + 레이아웃 (DESIGN-apple.md 1:1 매핑)
├── script.js       # 부드러운 스크롤 + sub-nav 카테고리 자동 갱신
├── .nojekyll       # GitHub Pages가 Jekyll로 처리하지 않게
└── README.md
```

## 로컬에서 보기

별도 빌드가 필요 없습니다. `index.html`을 브라우저로 열어도 되고, 가벼운 정적 서버를 쓰셔도 됩니다.

```bash
# Python이 있다면
python3 -m http.server 8080
# → http://localhost:8080
```

## GitHub Pages 배포 (3가지 방법)

### 방법 A — 사용자 페이지 (`username.github.io`)

가장 깔끔합니다. 이 방식이면 `https://sang4004.github.io/` 로 바로 열립니다.

1. `sang4004.github.io` 라는 이름으로 새 레포 생성 (Public).
2. 이 폴더의 파일 4개(`index.html`, `styles.css`, `script.js`, `.nojekyll`)를 레포 루트에 push.
3. 레포 → Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `/ (root)` 저장.
4. 1~2분 기다리면 `https://sang4004.github.io/` 에서 열립니다.

### 방법 B — 프로젝트 페이지 (예: `portfolio` 레포)

URL은 `https://sang4004.github.io/portfolio/` 가 됩니다.

1. `portfolio`(혹은 원하는 이름)로 레포 생성.
2. 파일 4개를 레포 루트에 push.
3. Settings → Pages → Branch: `main` / `/ (root)` 저장.

### 방법 C — `gh-pages` 브랜치

`main`에는 다른 코드가 있고 정적 산출물만 따로 배포하고 싶을 때:

```bash
git checkout --orphan gh-pages
git rm -rf .
# 이 폴더의 파일들을 복사해 넣고
git add .
git commit -m "Deploy portfolio"
git push origin gh-pages
```

Settings → Pages → Branch: `gh-pages` / `/ (root)` 저장.

## 디자인 시스템 메모

`DESIGN-apple.md`의 토큰을 그대로 CSS 변수로 옮겼습니다:

- **단일 액센트 색상**: Action Blue `#0066cc` (다크 타일 위에서는 Sky Link Blue `#2997ff`)
- **타이포그래피**: SF Pro Display (영문) + Pretendard Variable (한글) — 두 폰트 모두 SF Pro 특유의 negative letter-spacing(`-0.28 ~ -0.374px`)을 그대로 받습니다.
- **본문 17px / line-height 1.47** — Apple만의 "reading not scanning" 페이스.
- **단일 그림자**: `rgba(0,0,0,0.22) 3px 5px 30px` — Hero의 코드 plinth에만 적용. 카드·버튼·텍스트에는 절대 적용 안 함.
- **Press 모션**: 모든 버튼이 `transform: scale(0.95)` — Apple의 시스템-와이드 마이크로 인터랙션.
- **풀블리드 타일 교차** (light/parchment/dark) — 색 변화 자체가 divider 역할. 타일 간 gap 0px.
- **Pill (`border-radius: 9999px`)은 "click me" 신호로만 사용** — 1차 CTA, sub-nav buy, search, configurator chip.

## 콘텐츠 수정

모두 `index.html` 한 파일 안에 있어서, VSCode에서 열어 텍스트만 바꾸시면 됩니다. 시맨틱한 클래스(`tile--dark`, `display-lg`, `bullets` 등)로 구성돼 있어 디자인 시스템을 깨뜨릴 일이 적습니다.

추가하고 싶은 섹션이 있다면:

```html
<section class="tile tile--parchment tile--text">
  <p class="tile__eyebrow">새 섹션</p>
  <h2 class="display-md">제목</h2>
  <p class="body">본문 ...</p>
</section>
```

`tile--light` ↔ `tile--dark` 사이에 한 번씩 `tile--parchment` 또는 `tile--dark-2`를 끼워주면 단조롭지 않고 Apple의 호흡이 살아납니다.

## 라이선스 / 출처

- 디자인 시스템 패턴은 Apple.com의 공개 페이지를 학습 목적으로 모사.
- Pretendard 폰트: SIL Open Font License 1.1 (https://github.com/orioncactus/pretendard)
- 콘텐츠(이력 · 프로젝트 설명): © 박우상
