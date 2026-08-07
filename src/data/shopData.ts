import { ToolShop } from '../types/shop';
import shopIntroBeaver from '../assets/images/beaver-shop-intro.png';
import featuredDrill from '../assets/images/product-featured-drill.png';
import recommendReasonBeaver from '../assets/images/beaver-recommend-reason.png';
import logoCoupang from '../assets/images/logo-coupang.png';
import logoNaver from '../assets/images/logo-naver.png';
import logoOhouse from '../assets/images/logo-ohouse.png';
import similarBosch from '../assets/images/product-bosch-drill.png';
import similarMakita from '../assets/images/product-makita-drill.png';
import similarDewalt from '../assets/images/product-dewalt-drill.png';
import mapStores from '../assets/images/map-stores.png';
import tipBeaver from '../assets/images/beaver-hammer.png';

export const toolShop: ToolShop = {
  intro: {
    title: "필요한 공구는\n제가 찾아드릴게요!",
    description: "수리에 필요한 자재를 가장 저렴하게 구매해보세요.",
    image: shopIntroBeaver
  },
  featuredProduct: {
    id: "product_001",
    badge: "AI 추천 제품",
    tag: "베스트셀러",
    image: featuredDrill,
    name: "프리미엄 다용도 전동 드릴 세트",
    rating: 4.9,
    reviewCount: 128,
    soldCount: 1352,
    price: 45900,
    stockLabels: [
      { label: "재고있음", tone: "" },
      { label: "당일배송", tone: "blue" },
      { label: "무료배송", tone: "green" }
    ]
  },
  recommendReason: {
    image: recommendReasonBeaver,
    title: "비버의 추천 이유",
    tag: "추천 이유를 설명하는 비버",
    badge: "AI 분석",
    text: "현재 분석한 방문 손잡이 교체에 가장 적합한 드릴이에요. 초보자도 쉽고 안전하게 사용할 수 있어요!"
  },
  priceComparison: [
    {
      id: "coupang",
      logo: logoCoupang,
      storeName: "쿠팡",
      price: 45900,
      note: "로켓배송 (내일 도착)",
      isLowest: false
    },
    {
      id: "naver",
      logo: logoNaver,
      storeName: "네이버",
      price: 42500,
      note: "포인트 1,200원 적립",
      isLowest: true
    },
    {
      id: "ohouse",
      logo: logoOhouse,
      storeName: "오늘의집",
      price: 48000,
      note: "첫구매 10% 할인 쿠폰",
      isLowest: false
    }
  ],
  similarProducts: [
    { id: "sim_001", image: similarBosch, name: "보쉬 충전 드릴", price: 38900, rating: 4.8 },
    { id: "sim_002", image: similarMakita, name: "마끼다 해머 드릴", price: 69000, rating: 4.9 },
    { id: "sim_003", image: similarDewalt, name: "디월트 임팩트 드릴", price: 72000, rating: 4.9 }
  ],
  nearbyStores: {
    mapImage: mapStores,
    locationLabel: "다이소 강남역점",
    stores: [
      { id: "store_001", name: "다이소 강남역점", distance: "450m", closeTime: "22:00 종료", stockStatus: "재고있음" },
      { id: "store_002", name: "현대철물공구", distance: "1.2km", closeTime: "19:00 종료", stockStatus: "재고문의" }
    ]
  },
  tip: {
    badge: "BIVER TIP",
    tag: "안전 수칙을 알려주는 비버",
    image: tipBeaver,
    text: "드릴을 사용할 때는 보호안경과 장갑을 착용하면 더 안전해요!"
  }
};
