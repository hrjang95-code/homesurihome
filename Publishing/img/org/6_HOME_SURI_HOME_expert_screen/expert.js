document.addEventListener("DOMContentLoaded", () => {
  const categoryTabs = document.querySelector("#categoryTabs");
  const expertList = document.querySelector("#expertList");
  const searchInput = document.querySelector("#expertSearch");
  const moreExpertsButton = document.querySelector("#moreExperts");
  const backButton = document.querySelector(".back-button");

  const data = window.HOME_SURI_DATA;
  let selectedCategory = "all";

  function renderCategories() {
    categoryTabs.innerHTML = data.expertCategories
      .map((category) => {
        const activeClass =
          category.id === selectedCategory ? "active" : "";

        return `
          <button
            class="category-button ${activeClass}"
            type="button"
            role="tab"
            aria-selected="${category.id === selectedCategory}"
            data-category="${category.id}"
          >
            ${category.label}
          </button>
        `;
      })
      .join("");
  }

  function getFilteredExperts() {
    const keyword = searchInput.value.trim().toLowerCase();

    return data.experts.filter((expert) => {
      const categoryMatched =
        selectedCategory === "all" ||
        expert.category === selectedCategory;

      const keywordMatched =
        !keyword ||
        expert.name.toLowerCase().includes(keyword) ||
        expert.specialty.toLowerCase().includes(keyword) ||
        expert.tags.toLowerCase().includes(keyword);

      return categoryMatched && keywordMatched;
    });
  }

  function createExpertCard(expert) {
    return `
      <article class="expert-card">
        <div class="expert-top">
          <img
            class="expert-photo"
            src="${expert.image}"
            alt="${expert.name} 전문가 프로필"
          />

          <div>
            <h3 class="expert-name">${expert.name}</h3>

            <div class="expert-summary">
              <span class="match-chip">
                <strong>${expert.match}%</strong><br />
                Match
              </span>

              <span class="specialty">
                ${expert.specialty}
              </span>
            </div>

            <div class="rating-row">
              <span class="star">★</span>
              <span class="rating-value">${expert.rating}</span>
              <span class="muted">(리뷰 ${expert.reviewCount})</span>
              <span class="muted">|</span>
              <span class="muted">${expert.experience}</span>
            </div>
          </div>

          <i class="badge-icon" data-lucide="badge-check"></i>
        </div>

        <div class="expert-meta-row">
          <span class="ai-badge">AI 인증률 ${expert.match}%</span>
          <p class="expert-tags">${expert.tags}</p>
        </div>

        <div class="service-box">
          <div class="service-row">
            <span>서비스 지역</span>
            <strong>${expert.region}</strong>
          </div>

          <div class="service-row">
            <span>예상 수리비 / 도착</span>
            <strong class="price">
              ${expert.price} / ${expert.arrival}
            </strong>
          </div>

          <p class="review-copy">“${expert.review}”</p>
        </div>

        <div class="card-actions">
          <button
            class="action-button"
            type="button"
            data-action="quote"
            data-name="${expert.name}"
          >
            <i data-lucide="list-pen"></i>
            견적 문의
          </button>

          <button
            class="action-button"
            type="button"
            data-action="call"
            data-name="${expert.name}"
          >
            <i data-lucide="phone"></i>
            전화 연락
          </button>

          <button
            class="action-button reserve"
            type="button"
            data-action="reserve"
            data-name="${expert.name}"
          >
            <i data-lucide="calendar-days"></i>
            예약하기
          </button>
        </div>
      </article>
    `;
  }

  function renderExperts() {
    const filteredExperts = getFilteredExperts();

    if (filteredExperts.length === 0) {
      expertList.innerHTML = `
        <div class="expert-card">
          <p style="margin:0; text-align:center;">
            조건에 맞는 전문가가 없습니다.
          </p>
        </div>
      `;
    } else {
      expertList.innerHTML = filteredExperts
        .map(createExpertCard)
        .join("");
    }

    window.HOME_SURI_COMMON.initIcons();
  }

  categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");

    if (!button) return;

    selectedCategory = button.dataset.category;

    renderCategories();
    renderExperts();
  });

  searchInput.addEventListener("input", renderExperts);

  expertList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const expertName = button.dataset.name;
    const action = button.dataset.action;

    const messages = {
      quote: `${expertName}에게 견적 문의를 보냈어요.`,
      call: `${expertName}의 연락처를 확인합니다.`,
      reserve: `${expertName} 예약 화면으로 이동합니다.`
    };

    window.HOME_SURI_COMMON.toast(messages[action]);
  });

  moreExpertsButton.addEventListener("click", () => {
    window.HOME_SURI_COMMON.toast(
      "가까운 전문가 목록을 불러오는 중입니다."
    );
  });

  backButton.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.HOME_SURI_COMMON.toast("이전 페이지가 없습니다.");
  });

  renderCategories();
  renderExperts();
  window.HOME_SURI_COMMON.initIcons();
});
