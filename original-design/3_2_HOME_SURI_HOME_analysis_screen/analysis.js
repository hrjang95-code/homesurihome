document.addEventListener("DOMContentLoaded", () => {
  const speechBubble = document.querySelector("#speechBubble");
  const stepTwo = document.querySelector("#stepTwo");
  const stepThree = document.querySelector("#stepThree");
  const progressLabel = document.querySelector("#progressLabel");
  const progressValue = document.querySelector("#progressValue");
  const toolButton = document.querySelector("#toolButton");
  const guideButton = document.querySelector("#guideButton");
  const toast = document.querySelector("#toast");

  const bubbleMessages = [
    "비버가 원인을<br>찾고 있어요!",
    "발생 원인을<br>분석하고 있어요!",
    "수리 방법을<br>비교하고 있어요!",
    "거의 끝났어요!",
  ];

  let progress = 0;
  let bubbleIndex = 0;
  let toastTimer = null;

  const showToast = message => {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  };

  const updateProgress = value => {
    progress = value;
    progressValue.style.width = `${value}%`;
    progressLabel.textContent = value >= 100 ? "완료 100%" : `진행중 ${value}%`;
  };

  setTimeout(() => {
    stepTwo.classList.add("is-visible", "is-complete");
    bubbleIndex = 1;
    speechBubble.innerHTML = bubbleMessages[bubbleIndex];
    updateProgress(24);
  }, 900);

  setTimeout(() => {
    stepThree.classList.add("is-visible");
    bubbleIndex = 2;
    speechBubble.innerHTML = bubbleMessages[bubbleIndex];
    updateProgress(47);
  }, 1800);

  setTimeout(() => {
    bubbleIndex = 3;
    speechBubble.innerHTML = bubbleMessages[bubbleIndex];
    updateProgress(72);
  }, 2800);

  setTimeout(() => {
    updateProgress(100);

    // 말풍선은 마지막 문구(거의 끝났어요!)를 그대로 유지
    speechBubble.innerHTML = bubbleMessages[3];

    toolButton.disabled = false;
    guideButton.disabled = false;
    toolButton.classList.add("is-active");
    guideButton.classList.add("is-active");

    showToast("분석이 완료됐어요!");
}, 4200);

  toolButton.addEventListener("click", () => {
    if (!toolButton.disabled) {
      showToast("필요 공구 목록으로 이동합니다.");
    }
  });

  guideButton.addEventListener("click", () => {
    if (!guideButton.disabled) {
      window.location.href = "../4_HOME_SURI_HOME_result_screen/result.html";
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
