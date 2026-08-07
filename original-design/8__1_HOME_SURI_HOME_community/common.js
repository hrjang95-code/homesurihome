"use strict";

/* 공통: 키보드 포커스 사용 여부 표시 */
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    document.documentElement.classList.add("using-keyboard");
  }
});

document.addEventListener("mousedown", () => {
  document.documentElement.classList.remove("using-keyboard");
});