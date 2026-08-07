document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#blurryModal");
  const openButton = document.querySelector("#openBlurryModal");
  const retryButton = document.querySelector("#retryButton");
  const selectButton = document.querySelector("#selectButton");
  const cameraInput = document.querySelector("#cameraInput");
  const galleryInput = document.querySelector("#galleryInput");
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
      retryButton.focus();
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

  retryButton.addEventListener("click", () => {
    cameraInput.click();
  });

  selectButton.addEventListener("click", () => {
    galleryInput.click();
  });

  cameraInput.addEventListener("change", () => {
    if (cameraInput.files.length > 0) {
      showToast("새 사진을 불러왔어요.");
      closeModal();
    }
  });

  galleryInput.addEventListener("change", () => {
    if (galleryInput.files.length > 0) {
      showToast("갤러리 사진을 선택했어요.");
      closeModal();
    }
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
