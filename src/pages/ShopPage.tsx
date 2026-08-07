import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {
  Star,
  Heart,
  ShoppingCart,
  Store,
  Phone,
  Navigation,
  MapPin,
} from 'lucide-react';

import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useToast } from '../components/ToastContext';
import { toolShop as d } from '../data/shopData';

export const ShopPage: React.FC = () => {
  const showToast = useToast();
  const storeSectionRef = useRef<HTMLDivElement>(null);

  const [isLiked, setIsLiked] = useState(false);

  const handleFavoriteToggle = () => {
    setIsLiked((prev) => {
      const next = !prev;
      showToast(next ? '찜 목록에 저장했어요.' : '찜을 해제했어요.');
      return next;
    });
  };

  const handleOnlineBuy = () => {
    showToast('온라인 구매처를 확인할게요.');
  };

  const handleScrollToStores = () => {
    storeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStoreBuy = () => {
    showToast('구매 페이지는 추후 연결됩니다.');
  };

  const handlePhoneCall = (storeName: string) => {
    showToast(`${storeName} 전화 연결을 확인합니다.`);
  };

  const handleNavigation = (storeName: string) => {
    showToast(`${storeName} 길찾기 화면으로 이동합니다.`);
  };

  const formatPrice = (value: number) => {
    return `₩${value.toLocaleString('ko-KR')}`;
  };

  const p = d.featuredProduct;

  return (
    <Container>
      <Header />
      <MainContent>
        <ShopIntro id="shopIntro">
          <img src={d.intro.image} alt="공구를 추천하는 비버 캐릭터" />
          <div>
            <h1>
              {d.intro.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <p>{d.intro.description}</p>
          </div>
        </ShopIntro>

        <FeaturedCard id="featuredProduct">
          <ProductImageWrap>
            <span className="product-badge">✦ {p.badge}</span>
            <FavoriteBtn
              type="button"
              $liked={isLiked}
              onClick={handleFavoriteToggle}
              aria-label="찜하기"
            >
              <Heart fill={isLiked ? '#cb742c' : 'transparent'} size={20} />
            </FavoriteBtn>
            <img src={p.image} alt={p.name} />
          </ProductImageWrap>
          <FeaturedBody>
            <span className="kicker">{p.tag}</span>
            <h2>{p.name}</h2>
            <div className="product-meta">
              <span className="rating">
                <Star size={12} fill="#F7BD4C" stroke="#F7BD4C" />
                <strong>{p.rating}</strong>
              </span>
              <span className="meta-divider"></span>
              <span>리뷰 {p.reviewCount}</span>
              <span className="meta-divider"></span>
              <span>판매 {p.soldCount.toLocaleString('ko-KR')}</span>
            </div>

            <div className="price">
              <span className="won-symbol">₩ </span>
              <strong>{p.price.toLocaleString('ko-KR')}</strong>
            </div>

            <StockRow>
              {p.stockLabels.map((item, idx) => (
                <StockPill key={idx} $tone={item.tone}>
                  {item.label}
                </StockPill>
              ))}
            </StockRow>

            <ProductActions>
              <PrimaryBuy type="button" onClick={handleOnlineBuy}>
                <ShoppingCart size={16} />
                <span>온라인 구매</span>
              </PrimaryBuy>

              <OutlineBuy type="button" onClick={handleScrollToStores}>
                <Store size={16} />
                <span>주변 철물점</span>
              </OutlineBuy>
            </ProductActions>
          </FeaturedBody>
        </FeaturedCard>

        <ReasonCard id="recommendReason">
          <img src={d.recommendReason.image} alt="추천 이유를 설명하는 비버" />
          <div>
            <h3>
              {d.recommendReason.title}
              <span className="ai-label">{d.recommendReason.badge}</span>
            </h3>
            <p>{d.recommendReason.text}</p>
          </div>
        </ReasonCard>

        <SectionBlock>
          <div className="section-title-row">
            <h2>
              <ShoppingCart size={15} /> 온라인 최저가 비교
            </h2>
          </div>
          <PriceComparisonContainer id="priceComparison">
            {d.priceComparison.map((item) => (
              <PriceRow key={item.id} $lowest={item.isLowest}>
                <img className="store-logo" src={item.logo} alt={item.storeName} />
                <div className="price-info">
                  <strong>
                    {item.storeName} {formatPrice(item.price)}
                  </strong>
                  <small>{item.note}</small>
                </div>
                <BuySmall type="button" onClick={handleStoreBuy}>
                  구매하기
                </BuySmall>
              </PriceRow>
            ))}
          </PriceComparisonContainer>
        </SectionBlock>

        <SectionBlock>
          <SectionTitleRow>
            <h2>비슷한 추천 상품</h2>
            <MoreLink type="button" onClick={() => showToast('상품 목록을 더 불러오는 중입니다.')}>
              더보기 ›
            </MoreLink>
          </SectionTitleRow>
          <HorizontalProducts id="similarProducts">
            {d.similarProducts.map((item) => (
              <MiniProduct key={item.id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <strong>{formatPrice(item.price)}</strong>
                <small>★ {item.rating}</small>
              </MiniProduct>
            ))}
          </HorizontalProducts>
        </SectionBlock>

        <SectionBlock ref={storeSectionRef} id="storeSection">
          <SectionTitleRow>
            <h2>
              <MapPin size={15} /> 주변 철물점
            </h2>
            <MoreLink type="button" onClick={() => showToast('주변 가게를 더 탐색합니다.')}>
              더보기 ›
            </MoreLink>
          </SectionTitleRow>
          <MapCard id="nearbyStores">
            <div className="map-image-wrap">
              <img src={d.nearbyStores.mapImage} alt="주변 철물점 지도" />
              <span className="map-location">● {d.nearbyStores.locationLabel}</span>
            </div>
            <StoreList>
              {d.nearbyStores.stores.map((store) => (
                <StoreItem key={store.id}>
                  <div className="store-info">
                    <strong>
                      {store.name} <small>{store.distance}</small>
                    </strong>
                    <small>
                      <span className="open">영업 중</span> · {store.closeTime} ·{' '}
                      <span className="stock-ok">{store.stockStatus}</span>
                    </small>
                  </div>
                  <StoreActions>
                    <button
                      type="button"
                      aria-label={`${store.name} 전화`}
                      onClick={() => handlePhoneCall(store.name)}
                    >
                      <Phone size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label={`${store.name} 길찾기`}
                      onClick={() => handleNavigation(store.name)}
                    >
                      <Navigation size={14} />
                    </button>
                  </StoreActions>
                </StoreItem>
              ))}
            </StoreList>
          </MapCard>
        </SectionBlock>

        <TipCard id="tipCard">
          <div>
            <h3>{d.tip.badge}</h3>
            <p>
              드릴을 사용할 때는 <a href="#" onClick={(e) => { e.preventDefault(); showToast('안전 가이드로 이동합니다.'); }}>보호안경과 장갑</a>을 착용하면 더 안전해요!
            </p>
          </div>
          <img src={d.tip.image} alt="안전 수칙을 알려주는 비버" />
        </TipCard>
      </MainContent>
      <BottomNavigation />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ShopIntro = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;

  img {
    width: 68px;
    height: 68px;
    object-fit: contain;
  }

  h1 {
    font-size: 19px;
    font-weight: 900;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 4px 0;
  }

  p {
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.muted};
    margin: 0;
  }
`;

const FeaturedCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

const ProductImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: #fcf9f5;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 180px;
    object-fit: contain;
  }

  .product-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: #d37a3f;
    color: ${({ theme }) => theme.colors.white};
    font-size: 9px;
    font-weight: 900;
    padding: 4px 8px;
    border-radius: 6px;
  }
`;

const FavoriteBtn = styled.button<{ $liked: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.white};
  display: grid;
  place-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  color: ${({ $liked }) => ($liked ? '#cb742c' : '#b5a599')};
  cursor: pointer;
  transition: all 0.2s;
`;

const FeaturedBody = styled.div`
  padding: 18px 16px;

  .kicker {
    font-size: 10px;
    font-weight: 800;
    color: #cb742c;
  }

  h2 {
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text};
    margin: 4px 0 8px 0;
  }

  .product-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.muted};
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 3px;
    color: ${({ theme }) => theme.colors.text};

    strong {
      font-weight: 800;
    }
  }

  .meta-divider {
    width: 1px;
    height: 10px;
    background: #dfd4cb;
  }

  .price {
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.text};

    .won-symbol {
      font-size: 13px;
      font-weight: 900;
    }

    strong {
      font-size: 21px;
      font-weight: 950;
    }
  }
`;

const StockRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 14px;
`;

const StockPill = styled.span<{ $tone: string }>`
  font-size: 9px;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 4px;

  ${({ $tone, theme }) => {
    if ($tone === 'blue') {
      return `
        color: #2b70cb;
        background: #f0f5fc;
      `;
    }
    if ($tone === 'green') {
      return `
        color: #1e8a4a;
        background: #eef7f1;
      `;
    }
    return `
      color: ${theme.colors.muted};
      background: #f3ece6;
    `;
  }}
`;

const ProductActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
`;

const PrimaryBuy = styled.button`
  height: 48px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 6px 14px rgba(247, 189, 76, 0.15);
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

const OutlineBuy = styled.button`
  height: 48px;
  border: 1px solid #dcd1c4;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  &:active {
    background-color: rgba(122, 82, 48, 0.04);
  }
`;

const ReasonCard = styled.section`
  background: #fdf5ec;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: 14px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    margin-top: 2px;
  }

  h3 {
    font-size: 13px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 6px 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ai-label {
    font-size: 8px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.primaryLight};
    padding: 2px 6px;
    border-radius: 4px;
  }

  p {
    font-size: 11px;
    font-weight: 700;
    color: #766353;
    line-height: 1.45;
    margin: 0;
  }
`;

const SectionBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    font-size: 15px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const PriceComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceRow = styled.article<{ $lowest: boolean }>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  ${({ $lowest }) =>
    $lowest &&
    `
    border: 1px solid #f7bd4c;
    background: #fffdf9;
  `}

  .store-logo {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 6px;
    background: #fdfaf7;
  }

  .price-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 12px;
      font-weight: 900;
      color: ${({ theme }) => theme.colors.text};
    }

    small {
      font-size: 10px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.muted};
      margin-top: 2px;
    }
  }
`;

const BuySmall = styled.button`
  padding: 6px 12px;
  background: #fdf5f0;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid #ebdcd0;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;

  &:active {
    background-color: #ebdcd0;
  }
`;

const SectionTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoreLink = styled.button`
  font-size: 11px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
`;

const HorizontalProducts = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MiniProduct = styled.article`
  flex-shrink: 0;
  width: 108px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  img {
    width: 100%;
    height: 80px;
    object-fit: contain;
    background: #fcf9f5;
    border-radius: 8px;
    margin-bottom: 6px;
  }

  h3 {
    font-size: 10px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    font-size: 11px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2px;
  }

  small {
    font-size: 9px;
    font-weight: 800;
    color: #e59344;
  }
`;

const MapCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  .map-image-wrap {
    position: relative;
    width: 100%;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .map-location {
      position: absolute;
      bottom: 12px;
      left: 12px;
      background: rgba(43, 33, 28, 0.85);
      color: ${({ theme }) => theme.colors.white};
      font-size: 9px;
      font-weight: 900;
      padding: 4px 10px;
      border-radius: 6px;
    }
  }
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 12px 12px;
`;

const StoreItem = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f6f0eb;

  &:last-child {
    border-bottom: 0;
  }

  .store-info {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 12px;
      font-weight: 900;
      color: ${({ theme }) => theme.colors.text};

      small {
        font-size: 10px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.muted};
        margin-left: 4px;
      }
    }

    small {
      font-size: 9px;
      font-weight: 750;
      color: #9c8e83;
      margin-top: 4px;

      .open {
        color: #2b70cb;
      }

      .stock-ok {
        color: #cb742c;
        font-weight: 800;
      }
    }
  }
`;

const StoreActions = styled.div`
  display: flex;
  gap: 8px;

  button {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid #ebdcd0;
    color: ${({ theme }) => theme.colors.primary};
    background: #fdf8f4;
    display: grid;
    place-items: center;
    cursor: pointer;

    &:active {
      background-color: #ebdcd0;
    }
  }
`;

const TipCard = styled.section`
  background: #fcf9f5;
  border: 1px solid #ede4db;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  div {
    flex: 1;
  }

  h3 {
    font-size: 11px;
    font-weight: 900;
    color: #e59344;
    margin: 0 0 6px 0;
  }

  p {
    font-size: 11px;
    font-weight: 700;
    color: #635345;
    line-height: 1.45;
    margin: 0;

    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
  }

  img {
    width: 56px;
    height: 56px;
    object-fit: contain;
  }
`;
