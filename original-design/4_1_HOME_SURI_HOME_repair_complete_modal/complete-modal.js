document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#completeModal");
  const openButton = document.querySelector("#openCompleteModal");
  const laterButton = document.querySelector("#laterButton");
  const reviewButton = document.querySelector("#reviewButton");
  const toast = document.querySelector("#toast");

  let previousFocusedElement = null;
  let toastTimer = null;

  const showToast = message => {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  };

  const openModal = () => {
    previousFocusedElement = document.activeElement;

    modal.hidden = false;

    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      reviewButton.focus();
    });

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";

    setTimeout(() => {
      modal.hidden = true;

      if (previousFocusedElement) {
        previousFocusedElement.focus();
      }
    }, 240);
  };

  openButton.addEventListener("click", openModal);

  laterButton.addEventListener("click", () => {
    showToast("후기는 나중에 작성할 수 있어요.");
    closeModal();
  });

  reviewButton.addEventListener("click", () => {
    showToast("후기 작성 화면으로 이동합니다.");

    setTimeout(() => {
      window.location.href = "../review/review.html";
    }, 500);
  });

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("is-open")
    ) {
      closeModal();
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
