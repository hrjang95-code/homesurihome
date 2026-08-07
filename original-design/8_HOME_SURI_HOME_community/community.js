document.addEventListener("DOMContentLoaded", () => {
  const data = window.HOME_SURI_DATA;
  const post = data.featuredPost;

  document.querySelector("#featuredPost").innerHTML = `
    <div class="post-header">
      <img class="profile-image" src="${post.profileImage}" alt="${post.author}">

      <div class="author-copy">
        <strong>${post.author}</strong>
        <small>${post.location}</small>
      </div>

      <span class="ai-badge">✦ AI 추천</span>

      <button class="bookmark-button" type="button" aria-label="게시글 저장">
        <i data-lucide="bookmark"></i>
      </button>
    </div>

    <h1>${post.title}</h1>

    <div class="before-after-wrap">
      <img src="${post.image}" alt="${post.title}">
      <span class="before-label">BEFORE</span>
      <span class="after-label">AFTER</span>

      <span class="compare-handle" aria-hidden="true">
        <i data-lucide="chevrons-up-down"></i>
      </span>
    </div>

    <div class="post-facts">
      <span class="fact">
        <i data-lucide="wallet-cards"></i>
        ${post.price}
      </span>

      <span class="fact">
        <i data-lucide="clock-3"></i>
        ${post.duration}
      </span>

      <span class="fact">
        <i data-lucide="star"></i>
        ${post.level}
      </span>
    </div>

    <p class="post-description">${post.description}</p>

    <p class="tool-title">사용 공구</p>

    <div class="tool-tags">
      ${post.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join("")}
    </div>

    <div class="post-footer">
      <span class="footer-stat">
        <i data-lucide="heart"></i>
        ${post.likeCount}
      </span>

      <span class="footer-stat">
        <i data-lucide="message-square"></i>
        ${post.commentCount}
      </span>

      <button class="view-all" type="button" data-toast="게시글 전체보기는 다음 단계에서 연결됩니다.">
        전체 보기 ›
      </button>
    </div>

    <button class="similar-link" type="button" data-toast="비슷한 수리 사례를 보여드릴게요.">
      비슷한 수리 사례 보기
      <i data-lucide="arrow-right"></i>
    </button>
  `;

  document.querySelector("#similarPosts").innerHTML = data.similarPosts
    .map(
      item => `
        <article class="similar-card">
          <img src="${item.image}" alt="${item.title}">

          <div class="similar-card-body">
            <h3>${item.title}</h3>

            <div class="similar-meta">
              <span>${item.level}</span>
              <span>
                <i data-lucide="heart"></i>
                ${item.likeCount}
              </span>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelector("#reviewBanner").innerHTML = `
    <div class="review-bg-circle" aria-hidden="true"></div>
    <img class="review-beaver" src="${data.reviewBanner.image}" alt="오늘도 수리를 완료하셨나요? 후기 작성 비버">
    <button class="review-button" type="button" data-toast="수리 후기 작성 화면은 다음 단계에서 연결됩니다.">
      수리 후기 작성하기
      <i data-lucide="chevron-right"></i>
    </button>
  `;

  document.addEventListener("click", event => {
    const bookmark = event.target.closest(".bookmark-button");

    if (bookmark) {
      bookmark.classList.toggle("is-saved");

      window.HOME_SURI_COMMON.toast(
        bookmark.classList.contains("is-saved")
          ? "게시글을 저장했어요."
          : "저장을 해제했어요."
      );
    }

    const filterButton = event.target.closest(".filter-button");

    if (filterButton) {
      document
        .querySelectorAll(".filter-button")
        .forEach(button => button.classList.remove("active"));

      filterButton.classList.add("active");
    }

    const toastButton = event.target.closest("[data-toast]");

    if (toastButton) {
      window.HOME_SURI_COMMON.toast(toastButton.dataset.toast);
    }
  });

  window.HOME_SURI_COMMON.initIcons();
});
