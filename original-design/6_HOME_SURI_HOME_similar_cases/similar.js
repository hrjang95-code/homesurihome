document.addEventListener("DOMContentLoaded", () => {
  const data = window.HOME_SURI_DATA;

  const best = data.bestCase;

  document.querySelector("#bestCaseCard").innerHTML = `
    <div class="best-image-wrap">
      <img src="${best.image}" alt="${best.title}">
      <span class="case-badge">${best.badge}</span>
      <span class="best-match">★ Best Match</span>
    </div>

    <div class="best-case-body">
      <h3>${best.title}</h3>

      <div class="tag-row">
        <span class="info-tag">◫ ${best.difficulty}</span>
        <span class="info-tag">◷ ${best.duration}</span>
      </div>

      <div class="cost-card">
        <div>
          <small>사용된 공구</small>
          <strong>${best.tools}</strong>
        </div>

        <div class="cost-price">
          <small>총 지출 비용</small>
          <strong>${best.cost}</strong>
        </div>
      </div>

      <div class="card-footer">
        <span class="card-stat">
          <i data-lucide="heart"></i>
          ${best.likeCount}
        </span>

        <span class="card-stat">
          <i data-lucide="message-square"></i>
          ${best.commentCount}
        </span>

        <button
          class="case-arrow"
          type="button"
          data-toast="해결 사례 상세 화면은 다음 단계에서 연결됩니다."
          aria-label="해결 사례 상세 보기"
        >
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  const progress = data.progressCase;

  document.querySelector("#progressCaseCard").innerHTML = `
    <img src="${progress.image}" alt="${progress.title}">

    <div class="progress-case-copy">
      <div class="progress-case-meta">
        <span class="progress-status">${progress.status}</span>
        <span class="progress-date">${progress.date}</span>
      </div>

      <strong>${progress.title}</strong>

      <div class="progress-price-row">
        <span>ⓢ <em>${progress.price}</em></span>
        <span>◷ ${progress.duration}</span>
      </div>
    </div>

    <button
      type="button"
      data-toast="진행 중 사례 상세 화면은 다음 단계에서 연결됩니다."
      aria-label="진행 중 사례 보기"
    >
      <i data-lucide="chevron-right"></i>
    </button>
  `;

  document.querySelector("#similarGrid").innerHTML = data.similarCases
    .map(
      item => `
        <article class="similar-card">
          <div class="similar-image-wrap">
            <img src="${item.image}" alt="${item.title}">

            <button
              class="bookmark-button"
              type="button"
              aria-label="사례 저장"
            >
              <i data-lucide="bookmark"></i>
            </button>
          </div>

          <h3>${item.title}</h3>
          <span class="match-rate">${item.matchRate}</span>
        </article>
      `
    )
    .join("");

  document.addEventListener("click", event => {
    const bookmark = event.target.closest(".bookmark-button");

    if (bookmark) {
      bookmark.classList.toggle("is-saved");

      window.HOME_SURI_COMMON.toast(
        bookmark.classList.contains("is-saved")
          ? "사례를 저장했어요."
          : "저장을 해제했어요."
      );
    }

    const toastButton = event.target.closest("[data-toast]");

    if (toastButton) {
      window.HOME_SURI_COMMON.toast(toastButton.dataset.toast);
    }
  });

  window.HOME_SURI_COMMON.initIcons();
});
