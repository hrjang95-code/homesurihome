# HOME SURI HOME - 수리 후기 작성 모달 수정본

## 반영 사항
- 눈누 CDN의 `BMHANNA Air` 폰트를 `common.css` 최상단에 적용
- 전체 요소에 `BMHANNA Air` 적용
- `font-weight: 900` 기준 유지
- 글꼴 렌더링 품질 속성 적용
- 비버 이미지 경로를 `../img/8_5_001.png`로 수정
- 별도의 `assets` 폴더 및 중복 이미지 폴더를 만들지 않음

## 프로젝트 배치 방법
압축을 푼 뒤 `review-modal` 폴더를 HOME SURI HOME 프로젝트의 페이지 폴더 위치에 넣어주세요.
기존 공용 `img` 폴더 안에는 아래 파일이 있어야 합니다.

```text
HOME SURI HOME
├─ img
│  └─ 8_5_001.png
└─ review-modal
   ├─ index.html
   ├─ common.css
   ├─ common.js
   ├─ review-modal.css
   └─ review-modal.js
```

## 실행
`review-modal/index.html`을 실행합니다.
