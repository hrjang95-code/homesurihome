window.HOME_SURI_COMMON = {
  initIcons() {
    if (window.lucide) window.lucide.createIcons();
  },
  toast(message) {
    const el = document.querySelector('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }
};
