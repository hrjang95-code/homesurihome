"use strict";

const reviewModal = document.getElementById("reviewModal");
const reviewForm = document.getElementById("reviewForm");
const ratingValue = document.getElementById("ratingValue");
const stars = [...document.querySelectorAll(".star")];
const difficultyValue = document.getElementById("difficultyValue");
const difficultyButtons = [...document.querySelectorAll(".difficulty-chip")];
const toolsValue = document.getElementById("toolsValue");
const toolButtons = [...document.querySelectorAll("[data-tool]")];
const addToolButton = document.getElementById("addToolButton");
const toolModal = document.getElementById("toolModal");
const customToolInput = document.getElementById("customToolInput");
const cancelToolButton = document.getElementById("cancelToolButton");
const confirmToolButton = document.getElementById("confirmToolButton");
const toast = document.getElementById("toast");

let toastTimer;

/* 별점 선택 */
function setRating(rating) {
  ratingValue.value = String(rating);

  stars.forEach((star) => {
    const starValue = Number(star.dataset.rating);
    const isActive = starValue <= rating;

    star.classList.toggle("is-active", isActive);
    star.setAttribute("aria-checked", String(starValue === rating));
  });
}

stars.forEach((star) => {
  star.addEventListener("click", () => {
    setRating(Number(star.dataset.rating));
  });
});

/* 사진 업로드 미리보기 */
document.querySelectorAll(".photo-field").forEach((field) => {
  const input = field.querySelector(".photo-input");
  const box = field.querySelector("[data-photo-box]");
  const preview = field.querySelector(".photo-preview");

  input.addEventListener("change", () => {
    const [file] = input.files;

    if (!file) {
      box.classList.remove("has-image");
      preview.removeAttribute("src");
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      preview.src = String(reader.result);
      box.classList.add("has-image");
    });

    reader.readAsDataURL(file);
  });
});

/* 사용 공구 값 갱신 */
function updateToolsValue() {
  const selectedTools = [...document.querySelectorAll("[data-tool].is-selected")]
    .map((button) => button.dataset.tool);

  toolsValue.value = selectedTools.join(",");
}

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-selected");
    updateToolsValue();
  });
});

/* 난이도 단일 선택 */
difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    difficultyButtons.forEach((item) => {
      item.classList.remove("is-selected");
    });

    button.classList.add("is-selected");
    difficultyValue.value = button.dataset.difficulty;
  });
});

/* 기타 공구 입력 모달 */
function openToolModal() {
  toolModal.hidden = false;
  customToolInput.value = "";
  window.setTimeout(() => customToolInput.focus(), 0);
}

function closeToolModal() {
  toolModal.hidden = true;
  addToolButton.focus();
}

function addCustomTool() {
  const toolName = customToolInput.value.trim();

  if (!toolName) {
    customToolInput.focus();
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice-chip is-selected";
  button.dataset.tool = toolName;
  button.textContent = toolName;

  button.addEventListener("click", () => {
    button.classList.toggle("is-selected");
    updateToolsValue();
  });

  addToolButton.before(button);
  updateToolsValue();
  closeToolModal();
}

addToolButton.addEventListener("click", openToolModal);
cancelToolButton.addEventListener("click", closeToolModal);
confirmToolButton.addEventListener("click", addCustomTool);

customToolInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addCustomTool();
  }
});

toolModal.addEventListener("click", (event) => {
  if (event.target === toolModal) {
    closeToolModal();
  }
});

/* 모달 닫기 */
function closeReviewModal() {
  reviewModal.hidden = true;
}

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeReviewModal);
});

reviewModal.addEventListener("click", (event) => {
  if (event.target === reviewModal) {
    closeReviewModal();
  }
});

/* ESC: 하위 모달 우선 닫기 */
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (!toolModal.hidden) {
    closeToolModal();
    return;
  }

  if (!reviewModal.hidden) {
    closeReviewModal();
  }
});

/* 후기 등록 */
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearTimeout(toastTimer);
  toast.classList.add("is-visible");

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
});