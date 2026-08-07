document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#signupForm");
  const emailInput = document.querySelector("#signupEmail");
  const nicknameInput = document.querySelector("#nickname");
  const verifyButton = document.querySelector("#verifyEmail");
  const emailMessage = document.querySelector("#emailMessage");

  let emailVerified = false;

  function setInvalid(input, isInvalid) {
    const fieldWrap = input.closest(".field-wrap");

    if (!fieldWrap) return;

    fieldWrap.classList.toggle("invalid", isInvalid);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  verifyButton.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      emailVerified = false;
      setInvalid(emailInput, true);
      emailMessage.textContent = "올바른 이메일 주소를 입력해주세요.";
      return;
    }

    emailVerified = true;
    setInvalid(emailInput, false);
    emailMessage.textContent = "인증 메일을 보냈어요.";
    window.HOME_SURI_COMMON.toast("이메일 인증 메일을 보냈어요.");
  });

  emailInput.addEventListener("input", () => {
    emailVerified = false;
    setInvalid(emailInput, false);
    emailMessage.textContent = "";
  });

  nicknameInput.addEventListener("input", () => {
    setInvalid(nicknameInput, false);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const nickname = nicknameInput.value.trim();

    const emailValid = isValidEmail(email);
    const nicknameValid =
      nickname.length >= 2 &&
      nickname.length <= 12;

    setInvalid(emailInput, !emailValid);
    setInvalid(nicknameInput, !nicknameValid);

    if (!emailValid) {
      emailMessage.textContent = "올바른 이메일 주소를 입력해주세요.";
      emailInput.focus();
      return;
    }

    if (!emailVerified) {
      emailMessage.textContent = "이메일 인증을 먼저 진행해주세요.";
      verifyButton.focus();
      return;
    }

    if (!nicknameValid) {
      window.HOME_SURI_COMMON.toast(
        "닉네임은 2자 이상 12자 이하로 입력해주세요."
      );
      nicknameInput.focus();
      return;
    }

    window.HOME_SURI_COMMON.toast(
      "회원가입 1단계가 완료되었습니다."
    );
  });

  document
    .querySelectorAll("[data-placeholder-button]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        window.HOME_SURI_COMMON.toast(
          "퍼블리싱 단계의 버튼입니다."
        );
      });
    });

  window.HOME_SURI_COMMON.initIcons();
});
