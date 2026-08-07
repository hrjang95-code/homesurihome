# HOME SURI HOME 사진 스캔 모달

## 포함 파일

- `index.html`
- `modal.css`
- `modal.js`
- `assets/scan-beaver.jpg`

## 사용 방법

1. 폴더 전체를 프로젝트 안에 복사합니다.
2. `index.html`을 Live Server로 실행합니다.
3. `스캔 모달 열기` 버튼을 누르면 모달이 표시됩니다.

## 기존 홈 화면에 연결하는 방법

홈 화면의 AI 스캔 버튼에 아래 ID를 적용합니다.

```html
<button id="openScanModal" type="button">
  AI 스캔 시작하기
</button>
```

그리고 `index.html`의 모달 마크업을 홈 페이지의 `.app-shell` 마지막 부분에 넣고,
`modal.css`, `modal.js`를 연결하면 됩니다.

## 동작

- 직접 촬영하기: 모바일 카메라 파일 입력 열기
- 갤러리에서 선택: 일반 이미지 파일 입력 열기
- 취소 버튼, 바깥 배경 클릭, ESC 키로 닫기
