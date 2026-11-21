# hass6784.github.io — 작업 안내

장성일(웹디자이너 · 퍼블리셔)의 포트폴리오 사이트입니다. GitHub Pages로 배포합니다. (https://hass6784.github.io)

## 원칙
- 프레임워크 없이 **HTML · CSS · JavaScript만** 씁니다. 빌드 단계가 없습니다.
- 디자인 원본은 Figma 파일 `1ClGZfx7ervEHwIhbEvR0R`의 **Portfolio Site** 페이지입니다. 문구나 레이아웃을 바꿀 때는 피그마와 맞춰 주세요.
- 이미지 원본은 같은 파일의 **Export — Site Assets** 페이지에 있습니다. 레이어 이름이 곧 파일 경로입니다(`img/home/featured-irecell` → `img/home/featured-irecell.webp`).
- 이미지는 WebP(quality 90)로 넣습니다. 큰 화면용은 폭 1920px 이하.
- 원본(시안 JPG · 캡처 · PPT PNG)이 있으면 Figma를 거치지 않고 원본에서 바로 한 번만 변환합니다. Figma 내보내기는 여러 조각을 합친 이미지(목업 등)에만 씁니다.

## 폴더 구조
```
index.html            메인 (Hero · About · Work · Other Works · Contact)
work/*.html           프로젝트 상세 7개
  allagelab → genova → irecell → libropia → cnb → signature → lupiel → (처음으로)  ※ 그룹 안에서 최신순
css/common.css        토큰(컬러 · 타이포 · 간격), 리셋, 헤더, 푸터, 공통 컴포넌트
css/home.css          메인 전용
css/work.css          상세 페이지 공통 템플릿
js/common.js          헤더 스크롤 상태, 모바일 메뉴, 스크롤 등장 효과(data-reveal)
js/home.js            배경 글씨 전환, Work hover, 라이트박스 갤러리
img/                  프로젝트별 이미지
pdf/portfolio.pdf     Contact의 "PDF 포트폴리오" 링크 대상 (직접 넣어야 함)
```

## 디자인 토큰 (Figma 변수와 동일)
| 토큰 | 값 | 용도 |
|---|---|---|
| --color-primary | #1925AA | 메인 블루 (Blueprint Blue) |
| --color-primary-soft | #E8EAF7 | 태그, hover 배경 |
| --color-bg | #F5F4F0 | 페이지 배경 |
| --color-surface | #FFFFFF | 카드, 구분 섹션 |
| --color-text / -sub | #111111 / #6B6B6B | 본문 / 보조 |
| --color-border | #DEDBD4 | 구분선 |
| --color-bg-text | primary 7% | 배경 큰 글씨 |

서체: Pretendard Variable (jsDelivr CDN). 텍스트 스타일 클래스: `.t-hero .t-h1 .t-h2 .t-h3 .t-body-l .t-caption .t-eyebrow`

## 인터랙션
- **Hero 배경 글씨**: DESIGN → PUBLISH → INTERACTION, 2.5초 간격 (`data-words`)
- **Work 배경 글씨**: 카드/목록에 마우스를 올리면 `data-bg-word` 값으로 바뀜. 터치 기기에서는 화면 가운데 온 항목 기준
- **More Works 행**: hover 시 연한 블루 배경 + 썸네일 등장
- **라이트박스**: `[data-lightbox]` 썸네일 클릭, ESC · 좌우 화살표 · 스와이프 지원
- `prefers-reduced-motion`이면 모든 모션을 끕니다

## 상세 페이지 구성
제목(태그 · 날짜) → 대표 이미지 → 정보(dl) + 요약 → 블록들 → 다음 프로젝트 → Contact
블록 클래스: `.points`(핵심 포인트) `.steps`(작업 과정) `.figs`(이미지 그리드) `.stack`(섹션별 화면) `.full`(전체폭 이미지) `.pair`(PC+모바일) `.compare`(기획안 vs 최종) `.duo`(두 칸 글) `.result` `.result-blue`

## 콘텐츠 주의사항
- 환자 사진, 시술 전후 사진은 넣지 않습니다.
- 퇴사 관련 이야기는 사이트에 쓰지 않습니다.
- 수치(성과 %)는 넣지 않기로 했습니다. 면접에서 설명합니다.
- GENOVA LAB은 퍼블리싱 전 종료, 올에이지랩은 콘텐츠 확정 전 단계까지 참여 — 이 표현을 유지합니다.
