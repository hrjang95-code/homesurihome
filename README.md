# HOME SURI HOME — Web Introduction

> 사진 한 장으로 시작하는 AI 집수리 서비스 **HOME SURI HOME**을 소개하는 반응형 웹 소개 페이지입니다.

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111111" alt="JavaScript" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=111111" alt="GSAP" />
  <img src="https://img.shields.io/badge/Responsive_Web-8B6B52?style=flat-square" alt="Responsive Web" />
</p>

**Author** 장혜리  
**Role** Web Publisher / UI·UX Design / Interaction  
**Project Type** Portfolio Web Introduction  
**Repository** https://github.com/hrjang95-code/homesurihome-intro

---

## 🖼️ Demo

이 프로젝트는 별도의 빌드 과정 없이 실행할 수 있는 정적 웹 프로젝트입니다.

```text
1. 프로젝트 폴더를 다운로드합니다.
2. index.html을 브라우저에서 실행합니다.
3. 데스크톱에서 페이지를 스크롤하며 섹션별 인터랙션을 확인합니다.
```

ZIP 내부에는 별도의 배포 URL 설정 파일이 포함되어 있지 않으므로, README에는 확인 가능한 GitHub 저장소 주소만 표기했습니다.

---

## 📌 Project Overview

**HOME SURI HOME 웹 소개서**는 AI 기반 셀프 집수리 앱의 서비스 목적과 핵심 기능을 한 페이지 안에서 전달하기 위해 제작한 포트폴리오형 소개 웹사이트입니다.

사용자가 페이지를 위에서 아래로 읽는 흐름에 맞춰 문제 상황, 서비스 해결 방식, AI 수리 기능, 사용 과정, 커뮤니티, 서비스 비전, 다운로드 안내 순으로 내용을 구성했습니다.

단순한 정보 나열보다 스크롤 흐름 자체가 서비스 설명 과정이 되도록 GSAP ScrollTrigger를 활용했으며, 데스크톱에서는 스크롤 스크러빙과 일부 Pin 인터랙션을 적용하고 모바일에서는 가독성을 우선한 간소화 애니메이션으로 전환되도록 구현했습니다.

### 페이지 구성

```text
HERO
  ↓
WHY HomeSuriHome?
  ↓
OUR SOLUTION
  ↓
AI REPAIR
  ↓
HOW IT WORKS
  ↓
COMMUNITY
  ↓
OUR VISION
  ↓
DOWNLOAD
```

---

## ✨ 주요 기능 & 인터랙션

### 1. HERO 스크롤 스크러빙

첫 화면의 카피와 스마트폰 목업이 스크롤 진행도에 맞춰 각각 이동하도록 구현했습니다.

- Hero Copy: 위쪽으로 이동하면서 opacity 변화
- Phone Mockup: 위쪽으로 이동하며 scale 확대
- Scroll Hint: 스크롤 시작 시 자연스럽게 사라짐
- Scroll Hint Line: 반복 애니메이션으로 스크롤 방향 안내

GSAP의 `scrub` 옵션을 사용하여 사용자 스크롤 속도와 애니메이션 진행이 연결됩니다.

### 2. WHY HomeSuriHome? 3단계 Focus Interaction

집수리를 시작할 때 느끼는 세 가지 문제를 한 번에 모두 강조하지 않고, 스크롤에 따라 한 항목씩 Focus가 이동하도록 구성했습니다.

- 1번 → 2번 → 3번 순차 활성화
- 활성 항목 opacity / scale / y축 위치 변화
- 비활성 항목은 낮은 opacity로 전환
- 해당 섹션은 ScrollTrigger `pin`으로 고정
- `end: "+=1400"`, `scrub: 0.6` 설정으로 단계 전환 구간 제어

### 3. OUR SOLUTION 5단계 Journey Interaction

집수리 과정을 아래 5단계로 시각화했습니다.

1. 문제 사진 촬영
2. AI 분석 및 진단
3. 해결 방법 확인
4. 필요한 자재 추천
5. 직접 수리 완료

SVG Path를 따라 진행 상태를 표현하며, 스크롤이 진행될수록 각 단계의 아이콘과 텍스트가 Waiting → Active → Completed 상태로 변화합니다.

JavaScript에서 기존 SVG path를 복제해 진행용 highlight path를 만들고, `getTotalLength()`와 `getPointAtLength()`를 이용해 경로 진행도를 계산하도록 구현했습니다.

### 4. AI REPAIR Parallax

AI 기능 소개 섹션에서는 텍스트와 이미지가 서로 다른 y축 위치에서 진입하도록 설정해 깊이감을 만들었습니다.

- 텍스트 블록 Fade + Y 이동
- 기능 이미지 Fade + Y 이동
- `scrub: 1.5` 기반의 부드러운 Parallax

### 5. HOW IT WORKS Scroll Animation

앱의 실제 사용 흐름 이미지를 한 장의 시각 자료로 보여주고, 섹션 진입 시 제목과 설명, 이미지가 스크롤에 따라 자연스럽게 등장하도록 구현했습니다.

### 6. COMMUNITY Scroll Animation

커뮤니티 섹션에서는 텍스트가 먼저 들어오고 실제 커뮤니티 화면 이미지가 뒤이어 나타나는 형태의 스크롤 애니메이션을 적용했습니다.

### 7. OUR VISION Depth Parallax

서비스가 지향하는 네 가지 가치를 카드 형태로 구성했습니다.

- 스스로 해결하는 자신감
- 불필요한 비용 절감
- 더 안전하고 쾌적한 집
- 함께 성장하는 수리 커뮤니티

배경의 대형 `OUR VISION` 텍스트, Section Head, Vision Card가 각각 다른 y축 이동량을 갖도록 설정해 가벼운 Depth Parallax 효과를 만들었습니다.

### 8. DOWNLOAD Ending Sequence

마지막 다운로드 섹션은 단순 Fade가 아니라 순차적으로 요소가 나타나는 Ending Sequence로 구성했습니다.

- 메인 카피 등장
- 비버 캐릭터와 손글씨 문구 등장
- 집 형태 SVG Outline Draw
- 집 이미지 Fade In
- QR Label / QR Code / 설명 순차 등장
- 마지막 비버 캐릭터 등장 및 짧은 Bounce

`toggleActions: "play none none reverse"`를 사용해 스크롤 방향에 따라 애니메이션이 재생/역재생됩니다.

### 9. Section Capsule Indicator

화면 오른쪽에 현재 페이지 위치를 보여주는 세로형 Section Indicator를 JavaScript로 생성합니다.

- `main .section`을 기준으로 버튼 자동 생성
- 현재 섹션은 `active`
- 지나온 섹션은 `past`
- 각 버튼 클릭 시 해당 섹션으로 Smooth Scroll
- ScrollTrigger가 만든 `.pin-spacer`까지 고려해 현재 섹션 위치 계산
- 900px 이하에서는 숨김 처리

### 10. Beaver Scroll Companion

데스크톱에서는 비버 캐릭터가 섹션 위치에 맞춰 화면 좌우를 이동합니다.

섹션별로 x/y 위치와 반전 여부를 JavaScript 배열에 지정하고, 현재 스크롤 위치에서 가장 가까운 섹션을 계산해 캐릭터 위치를 변경합니다.

일부 섹션에서는 캐릭터를 의도적으로 숨기며, `861px` 미만 화면에서는 콘텐츠 가독성을 위해 전체 비버 가이드를 비활성화합니다.

### 11. Scroll To Top

스크롤이 600px 이상 내려가면 Top 버튼을 표시하며, 클릭 시 `window.scrollTo()`의 `behavior: 'smooth'`를 이용해 페이지 최상단으로 이동합니다.

### 12. Reduced Motion / Mobile Fallback

```javascript
(prefers-reduced-motion: reduce), (max-width: 1023px)
```

환경에서는 복잡한 Pin/Scrub 애니메이션 대신 Section 단위 Fade & Y 이동 애니메이션을 적용합니다.

이를 통해 데스크톱 인터랙션을 그대로 축소하는 대신 모바일 콘텐츠 가독성과 움직임 접근성을 함께 고려했습니다.

---

## 🧭 User Flow

```text
[HOME SURI HOME 소개]
        │
        ▼
[집수리 문제 상황 공감]
WHY HomeSuriHome?
        │
        ▼
[서비스 해결 과정 이해]
OUR SOLUTION
        │
        ▼
[AI 진단 기능 확인]
AI REPAIR
        │
        ▼
[앱 사용 과정 이해]
HOW IT WORKS
        │
        ▼
[다른 사용자의 경험 확인]
COMMUNITY
        │
        ▼
[서비스 방향성 확인]
OUR VISION
        │
        ▼
[QR 코드로 앱 다운로드 안내]
DOWNLOAD
```

페이지 내 별도의 회원가입이나 앱 기능을 구현한 프로젝트가 아니라, **HOME SURI HOME 앱을 설명하기 위한 프로모션/포트폴리오 웹 페이지**에 초점을 맞췄습니다.

---

## 🗂️ 실제 Folder Structure

ZIP 내부에서 확인한 실제 프로젝트 구조입니다.

```text
HOME SURI HOME Web Introduction/
├── .git/
├── img/
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   ├── 5.png
│   ├── 6.png
│   ├── 7.png
│   ├── 8.png
│   ├── 9.png
│   ├── 10.png
│   ├── ai_repair.png
│   ├── beaver_follower.png
│   ├── beaver_follower.png.png
│   ├── community.png
│   ├── download_reference.png
│   ├── hero_phone.png
│   ├── how_it_works.png
│   ├── image 19.png
│   └── qr_code.png
├── index.html
├── script.js
├── style.css
└── README.txt
```

### 주요 파일 역할

| 파일 | 역할 |
|---|---|
| `index.html` | 전체 페이지의 시맨틱 구조와 서비스 콘텐츠 구성 |
| `style.css` | 레이아웃, 반응형 디자인, 컬러, 타이포그래피, 컴포넌트 스타일 |
| `script.js` | Section Indicator, 비버 가이드, Scroll To Top, GSAP/ScrollTrigger 인터랙션 |
| `img/` | 앱 목업, 기능 이미지, 비버 캐릭터, QR 코드 등 시각 리소스 |
| `README.txt` | 프로젝트 실행 방법과 간단한 구성 설명 |

---

## 🛠️ Tech Stack

### HTML5

- 시맨틱 `header`, `main`, `section`, `footer`, `nav` 구조
- `aria-label`, `aria-hidden`, 이미지 `alt` 속성 사용
- 섹션 ID 기반 내비게이션 구조
- SVG 아이콘을 HTML 내부에 직접 삽입

### CSS3

- CSS Variables
- Flexbox / Grid Layout
- `clamp()` 기반 반응형 크기 조절
- Media Query
- `backdrop-filter`
- Transition / Transform
- 반응형 이미지 및 카드 레이아웃

주요 반응형 분기점은 `1100px`, `900px`, `860px`, `768px`, `560px` 등으로 구성되어 있습니다.

### JavaScript (Vanilla JS)

- DOM Selection / Manipulation
- Event Listener
- `IntersectionObserver`
- `requestAnimationFrame`
- 동적 Section Indicator 생성
- Scroll Position 계산
- Smooth Scroll
- SVG Path Length 계산

### GSAP 3.12.2

CDN 방식으로 GSAP를 불러와 사용합니다.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

### GSAP ScrollTrigger

- `scrub`
- `pin`
- `pinSpacing`
- Timeline
- `toggleActions`
- `matchMedia()`
- Scroll Trigger Start / End 제어

### Typography

Google Fonts에서 영문 폰트 **Manrope**를 불러와 사용합니다.

```text
Manrope 400 / 500 / 600 / 700
```

CSS에는 한글 fallback으로 `Pretendard`가 지정된 영역도 있습니다.

---

## 🤖 AI 활용 프로세스

이 프로젝트에서는 AI를 완성 코드를 그대로 사용하는 도구보다, **디자인 요구사항을 구체화하고 HTML/CSS/JavaScript 수정 방향을 빠르게 정리하는 보조 도구**로 활용했습니다.

### 1. 기획 정리

서비스 기능을 웹 소개서에 그대로 나열하지 않고 사용자가 이해하기 쉬운 흐름으로 재구성했습니다.

```text
문제 제시
→ 해결 방법
→ 핵심 기능
→ 사용 과정
→ 사용자 경험
→ 서비스 비전
→ 다운로드
```

### 2. UI 구성 보조

각 섹션의 목적에 맞는 레이아웃, 카드 구조, 비버 캐릭터 위치, 이미지와 텍스트의 진입 순서를 반복적으로 조정했습니다.

### 3. Interaction 설계 보조

GSAP ScrollTrigger를 이용해 각 섹션에 필요한 동작을 구분했습니다.

- Pin이 필요한 설명형 구간
- Scrub만 사용하는 Parallax 구간
- 일반 Scroll Reveal 구간
- 마지막 Ending Sequence

### 4. 코드 수정 및 디버깅

스크롤 튕김, 요소 정렬, 모바일 가독성, 캐릭터 겹침 등 실제 브라우저에서 확인된 문제를 기준으로 코드 수정 방향을 정리한 후 HTML/CSS/JavaScript에 반영했습니다.

### 5. 최종 검수

PC와 작은 화면에서 레이아웃과 애니메이션 방식을 나눠 확인하고, 모바일에서는 복잡한 floating interaction을 제거하는 방식으로 최종 정리했습니다.

---

## 💬 AI Prompt Example

실제 작업에서 사용할 수 있는 형태로 정리한 프롬프트 예시입니다.

```text
HOME SURI HOME 웹 소개서의 기존 HTML/CSS/JavaScript 구조는 유지해줘.

현재 WHY HomeSuriHome 섹션은 3개의 캐릭터 카드가 한 번에 보여서
사용자가 어느 내용을 먼저 봐야 하는지 집중이 잘 되지 않아.

GSAP ScrollTrigger를 사용해서 이 섹션을 스크롤하는 동안만 pin 처리하고,
1번 → 2번 → 3번 순서로 포커스가 이동하게 수정해줘.

조건:
- 새로운 라이브러리는 추가하지 말 것
- 기존 3개 카드의 HTML 구조와 이미지 파일은 유지할 것
- 활성 카드: opacity 1, scale 약 1.04, y -6px
- 지나간 카드: opacity 약 0.12, scale 약 0.94
- 아직 활성화되지 않은 카드는 더 낮은 opacity 사용
- 전환은 클릭이 아니라 스크롤 진행도에 연결할 것
- pin 종료 후 다음 섹션으로 튕기지 않도록 pinSpacing과 ScrollTrigger 범위를 확인할 것
- 모바일에서는 pin을 사용하지 않고 일반 Fade In 방식으로 보여줄 것

수정 후 변경한 JavaScript 구간과 이유를 함께 설명해줘.
```

---

## 🩹 Troubleshooting

### Issue 01. Pin 섹션 전환 시 페이지가 튀거나 다음 섹션 위치가 불안정함

**Issue**  
WHY와 OUR SOLUTION처럼 긴 스크롤 구간을 Pin 처리할 때 Pin 해제 시점에서 다음 콘텐츠가 갑자기 이동하는 문제가 발생할 수 있었습니다.

**Cause**  
ScrollTrigger가 생성하는 고정 구간의 높이와 실제 문서 흐름 사이의 계산이 정확하지 않으면, Pin 해제 시 레이아웃 위치가 어긋날 수 있습니다.

**Solution**  
WHY 섹션에는 다음 옵션을 적용해 고정 영역의 공간과 리프레시 시 레이아웃 계산을 안정화했습니다.

```javascript
scrollTrigger: {
  trigger: whySection,
  start: "top 5%",
  end: "+=1400",
  pin: true,
  pinSpacing: true,
  scrub: 0.6,
  anticipatePin: 1,
  invalidateOnRefresh: true
}
```

---

### Issue 02. Pin 처리된 섹션에서 Section Indicator의 현재 위치 계산이 어긋남

**Issue**  
오른쪽 Section Capsule Indicator가 일반 섹션에서는 정상 작동하지만, GSAP Pin이 적용된 영역에서는 현재 섹션 판단 기준이 실제 화면과 달라질 수 있었습니다.

**Cause**  
GSAP ScrollTrigger가 Pin 적용 시 원래 섹션 바깥에 `.pin-spacer`를 생성하기 때문에 기존 element의 `offsetTop`만 사용하면 실제 스크롤 영역과 차이가 생깁니다.

**Solution**  
JavaScript에서 부모가 `.pin-spacer`인 경우 해당 spacer의 `offsetTop`과 `offsetHeight`를 기준으로 현재 섹션을 계산하도록 처리했습니다.

```javascript
if (sec.parentElement && sec.parentElement.classList.contains('pin-spacer')) {
  elTop = sec.parentElement.offsetTop;
  elHeight = sec.parentElement.offsetHeight;
}
```

이 방식은 비버 가이드의 현재 섹션 계산에도 동일하게 적용되어 있습니다.

---

### Issue 03. 데스크톱용 비버 플로팅 캐릭터가 작은 화면에서 콘텐츠를 가림

**Issue**  
데스크톱에서는 비버 캐릭터가 서비스 안내 요소로 작동하지만, 모바일 화면에서는 캐릭터가 텍스트나 이미지와 겹쳐 가독성을 떨어뜨릴 수 있습니다.

**Cause**  
비버 위치가 `vw` / `vh` 기준의 fixed interaction으로 설계되어 있어 작은 viewport에서는 콘텐츠 영역과 충돌하기 쉽습니다.

**Solution**  
JavaScript와 CSS 모두에서 작은 화면에서는 비버 가이드를 사용하지 않도록 분리했습니다.

```javascript
if (!beaverGuide || window.innerWidth < 861) return;
```

```css
@media (max-width: 860px) {
  .beaver-guide {
    display: none !important;
  }
}
```

모바일/태블릿에서는 별도의 간단한 Section Fade Animation을 사용하도록 구성했습니다.

---

### Issue 04. 데스크톱의 복잡한 스크롤 인터랙션을 모바일에 그대로 적용하기 어려움

**Issue**  
Pin, Scrub, Parallax를 그대로 모바일에 적용하면 화면 높이 차이와 성능 문제로 콘텐츠 탐색이 불편해질 수 있었습니다.

**Cause**  
모바일은 viewport가 작고 스크롤 거리가 짧아 데스크톱에 맞춘 ScrollTrigger 시작/종료 지점이 동일한 경험을 만들지 못합니다.

**Solution**  
`gsap.matchMedia()`를 사용해 데스크톱과 모바일/Reduced Motion 환경의 애니메이션을 분리했습니다.

```javascript
mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
  // Desktop scroll interaction
});

mm.add("(prefers-reduced-motion: reduce), (max-width: 1023px)", () => {
  // Simple section fade animation
});
```

---

## 💡 What I Learned

### 1. 스크롤 인터랙션은 화려함보다 콘텐츠 순서가 중요하다는 점

스크롤 효과를 많이 넣는 것보다 사용자가 어떤 내용을 먼저 보고 다음 내용을 어떻게 이해하는지가 더 중요했습니다. 특히 WHY와 OUR SOLUTION 섹션을 작업하면서 인터랙션 자체보다 정보의 활성 순서와 스크롤 거리를 조절하는 과정이 중요하다는 점을 배웠습니다.

### 2. Pin과 Scrub은 레이아웃 구조까지 함께 고려해야 한다는 점

ScrollTrigger의 `pin`은 단순히 요소를 고정하는 옵션이 아니라 문서 높이와 다음 섹션 위치까지 바꾸기 때문에 `pinSpacing`, Start/End, `.pin-spacer` 등 전체 레이아웃 구조를 함께 확인해야 했습니다.

### 3. Desktop Interaction을 Mobile에 그대로 적용하지 않아도 된다는 점

반응형 작업은 크기만 줄이는 것이 아니라 화면 환경에 맞춰 인터랙션 자체를 다시 선택해야 한다는 것을 배웠습니다. 이번 프로젝트에서는 모바일의 비버 floating effect와 복잡한 Pin 효과를 제거하고 간단한 Fade 방식으로 전환했습니다.

### 4. SVG를 JavaScript와 결합해 진행 상태를 표현하는 방법

OUR SOLUTION 섹션에서 SVG path의 길이를 계산하고 path 진행도와 각 Step 상태를 연결하면서 SVG와 JavaScript를 함께 사용하는 방식을 경험했습니다.

### 5. 웹 퍼블리싱에서도 사용자 흐름을 설계해야 한다는 점

HTML/CSS 구현뿐 아니라 `문제 → 해결 → 기능 → 사용 과정 → 비전 → 다운로드`라는 전체 스토리 흐름을 먼저 정리한 것이 페이지 완성도에 직접 영향을 준다는 점을 배웠습니다.

---

## 📄 License

ZIP 내부에는 별도의 `LICENSE` 파일이 포함되어 있지 않습니다.

페이지 Footer에는 아래 저작권 문구가 표시되어 있습니다.

```text
© 2026 HomeSuriHome. All rights reserved.
Design & Publish by JANG HYERI.
```

본 프로젝트는 **장혜리의 웹 퍼블리셔 포트폴리오용 개인 프로젝트**입니다. 프로젝트에 포함된 디자인, 이미지 및 결과물의 재사용 시에는 각 리소스의 권리와 사용 조건을 별도로 확인해야 합니다.

---

<p align="center">
  <strong>HOME SURI HOME</strong><br>
  AI Home Repair Service · Web Introduction<br><br>
  Designed & Published by <strong>JANG HYERI</strong>
</p>
