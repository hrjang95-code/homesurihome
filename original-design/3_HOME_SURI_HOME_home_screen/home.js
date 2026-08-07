document.addEventListener("DOMContentLoaded", () => {
  const data = window.HOME_SURI_DATA;

  document.querySelector("#topRepairList").innerHTML = data.topRepairs
    .map(
      item => `
        <article class="repair-row">
          <span class="repair-icon">
            <i data-lucide="${item.icon}"></i>
          </span>

          <div class="row-content">
          <strong>${item.title}</strong>
          <small>${item.countLabel}</small>
          </div>

          <button class="row-link" type="button" data-toast="가이드 화면은 다음 단계에서 연결됩니다.">
            가이드 ›
          </button>
        </article>
      `
    )
    .join("");

  const seasonal = data.seasonalRecommend;
  document.querySelector("#seasonalCard").innerHTML = `
    <img src="${seasonal.image}" alt="${seasonal.title}">
    <div class="season-card-body">
      <span class="badge">${seasonal.badgeLabel}</span>
      <h3>${seasonal.title}</h3>
      <p>${seasonal.description}</p>
      <button class="ghost-button" type="button" data-toast="전체 가이드 화면은 다음 단계에서 연결됩니다.">
        전체 가이드 보기 ↗
      </button>
    </div>
  `;

  document.querySelector("#recentDiagnosisList").innerHTML = data.recentDiagnosis
    .map(
      item => `
        <article class="diagnosis-row">
          <img class="diagnosis-thumb" src="${item.image}" alt="${item.title}">

          <div class="row-content">
            <strong>${item.title}</strong>
            <small>${item.date}<br>${item.description}</small>
          </div>

          <span class="status-pill ${item.tone}">
            ${item.status}
          </span>
        </article>
      `
    )
    .join("");

  document.querySelector("#guideGrid").innerHTML = data.guides
    .map(
      item => `
        <article class="guide-card">
          <img src="${item.image}" alt="${item.title}">

          <div class="guide-card-body">
            <h3>${item.title}</h3>

            <div class="guide-meta">
            <span class="guide-rating">
              <i data-lucide="star"></i>
              <strong>${item.rating}</strong>
            </span>
          
            <span>${item.viewLabel}</span>
          </div>
          </div>
        </article>
      `
    )
    .join("");

  const post = data.community;
  document.querySelector("#communityCard").innerHTML = `
    <img src="${post.image}" alt="${post.title}">

    <div class="community-body">
      <span class="badge">${post.badge}</span>
      <h3>${post.title}</h3>
      <p>${post.description}</p>

      <div class="community-meta">
      <img class="avatar" src="../img/9_001.png" alt="${post.author}">
      <span>${post.author}</span>
        <span class="meta-spacer"></span>

        <span class="meta-stat">
          <i data-lucide="thumbs-up"></i>
          ${post.likeCount}
        </span>

        <span class="meta-stat">
          <i data-lucide="message-square"></i>
          ${post.commentCount}
        </span>
      </div>
    </div>
  `;

  const ai = data.aiRecommendation;
  document.querySelector("#aiRecommendation").innerHTML = `
    <div class="drop-icon">
      <i data-lucide="droplets"></i>
    </div>

    <h3>${ai.title}</h3>
    <p>${ai.description}</p>

    <button class="small-brown-button" type="button" data-toast="자가진단 화면은 다음 단계에서 연결됩니다.">
      자가진단 시작
    </button>
  `;

  document.addEventListener("click", event => {
    const toastButton = event.target.closest("[data-toast]");
    if (toastButton) {
      window.HOME_SURI_COMMON.toast(toastButton.dataset.toast);
    }

    const scanButton = event.target.closest("[data-scan]");
    if (scanButton) {
      window.HOME_SURI_COMMON.toast("AI 스캔 화면은 다음 단계에서 연결됩니다.");
    }
  });

  window.HOME_SURI_COMMON.initIcons();
});
