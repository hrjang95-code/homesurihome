document.addEventListener("DOMContentLoaded", () => {
  const d = window.HOME_SURI_DATA.toolShop;
  const won = value => `₩${Number(value). toLocaleString("ko-KR")}`;

  document.querySelector("#shopIntro").innerHTML = `
    <img src="${d.intro.image}" alt="공구를 추천하는 비버 캐릭터">
    <div>
      <h1>${d.intro.title.replace("\n", "<br>")}</h1>
      <p>${d.intro.description}</p>
    </div>
  `;

  const p = d.featuredProduct;
  document.querySelector("#featuredProduct").innerHTML = `
    <div class="product-image-wrap">
      <span class="product-badge">✦ ${p.badge}</span>
      <button class="favorite-btn" id="favoriteBtn" type="button" aria-label="찜하기">
        <i data-lucide="heart"></i>
      </button>
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="featured-body">
      <span class="kicker">${p.tag}</span>
      <h2>${p.name}</h2>
      <div class="product-meta">
      <span class="rating">
        <i data-lucide="star"></i>
        <strong>${p.rating}</strong>
      </span>
    
      <span class="meta-divider"></span>
    
      <span>리뷰 ${p.reviewCount}</span>
    
      <span class="meta-divider"></span>
    
      <span>판매 ${p.soldCount.toLocaleString("ko-KR")}</span>
    </div>
    
    <div class="price">
      <span class="won-symbol">₩ </span>
      <strong>${Number(p.price).toLocaleString("ko-KR")}</strong>
    </div>
      <div class="stock-row">
        ${p.stockLabels.map(item => `<span class="stock-pill ${item.tone}">${item.label}</span>`).join("")}
      </div>
      <div class="product-actions">
      <button class="primary-buy" type="button" data-action="online">
        <i data-lucide="shopping-cart"></i>
        <span>온라인 구매</span>
      </button>
    
      <button class="outline-buy" type="button" data-action="nearby">
        <i data-lucide="store"></i>
        <span>주변 철물점</span>
      </button>
    </div>
    </div>
  `;

  document.querySelector("#recommendReason").innerHTML = `
    <img src="${d.recommendReason.image}" alt="추천 이유를 설명하는 비버">
    <div>
      <h3>${d.recommendReason.title}<span class="ai-label">${d.recommendReason.badge}</span></h3>
      <p>${d.recommendReason.text}</p>
    </div>
  `;

  document.querySelector("#priceComparison").innerHTML = d.priceComparison.map(item => `
    <article class="price-row ${item.isLowest ? "lowest" : ""}">
      <img class="store-logo" src="${item.logo}" alt="${item.storeName}">
      <div class="price-info">
        <strong>${item.storeName} ${won(item.price)}</strong>
        <small>${item.note}</small>
      </div>
      <button class="buy-small" type="button" data-store="${item.id}">구매하기</button>
    </article>
  `).join("");

  document.querySelector("#similarProducts").innerHTML = d.similarProducts.map(item => `
    <article class="mini-product">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <strong>${won (item.price)}</strong>
      <small>★ ${item.rating}</small>
    </article>
  `).join("");

  document.querySelector("#nearbyStores").innerHTML = `
    <div class="map-image-wrap">
      <img src="${d.nearbyStores.mapImage}" alt="주변 철물점 지도">
      <span class="map-location">● ${d.nearbyStores.locationLabel}</span>
    </div>
    <div class="store-list">
      ${d.nearbyStores.stores.map(store => `
        <article class="store-item">
          <div class="store-info">
            <strong>${store.name} <small>${store.distance}</small></strong>
            <small><span class="open">영업 중</span> · ${store.closeTime} · <span class="stock-ok">${store.stockStatus}</span></small>
          </div>
          <div class="store-actions">
            <button type="button" aria-label="${store.name} 전화"><i data-lucide="phone"></i></button>
            <button type="button" aria-label="${store.name} 길찾기"><i data-lucide="navigation"></i></button>
          </div>
        </article>
      `).join("")}
    </div>
  `;

  document.querySelector("#tipCard").innerHTML = `
    <div>
      <h3>${d.tip.badge}</h3>
      <p>드릴을 사용할 때는 <a href="#">보호안경과 장갑</a>을 착용하면 더 안전해요!</p>
    </div>
    <img src="${d.tip.image}" alt="안전 수칙을 알려주는 비버">
  `;

  document.addEventListener("click", event => {
    const favorite = event.target.closest("#favoriteBtn");
    if (favorite) {
      favorite.classList.toggle("liked");
      window.HOME_SURI_COMMON.toast(favorite.classList.contains("liked") ? "찜 목록에 저장했어요." : "찜을 해제했어요.");
    }

    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "online") {
      window.HOME_SURI_COMMON.toast("온라인 구매처를 확인할게요.");
    }
    if (action?.dataset.action === "nearby") {
      document.querySelector("#storeSection").scrollIntoView({ behavior: "smooth" });
    }

    const storeBuy = event.target.closest("[data-store]");
    if (storeBuy) {
      window.HOME_SURI_COMMON.toast("구매 페이지는 추후 연결됩니다.");
    }
  });

  window.HOME_SURI_COMMON.initIcons();
});
