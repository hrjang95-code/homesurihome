export interface StockLabel {
  label: string;
  tone: string; // 'blue' | 'green' | ''
}

export interface FeaturedProduct {
  id: string;
  badge: string;
  tag: string;
  image: string;
  name: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  price: number;
  stockLabels: StockLabel[];
}

export interface RecommendReason {
  image: string;
  title: string;
  tag: string;
  badge: string;
  text: string;
}

export interface PriceComparison {
  id: string;
  logo: string;
  storeName: string;
  price: number;
  note: string;
  isLowest: boolean;
}

export interface SimilarProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

export interface StoreInfo {
  id: string;
  name: string;
  distance: string;
  closeTime: string;
  stockStatus: string;
}

export interface NearbyStores {
  mapImage: string;
  locationLabel: string;
  stores: StoreInfo[];
}

export interface TipInfo {
  badge: string;
  tag: string;
  image: string;
  text: string;
}

export interface ToolShop {
  intro: {
    title: string;
    description: string;
    image: string;
  };
  featuredProduct: FeaturedProduct;
  recommendReason: RecommendReason;
  priceComparison: PriceComparison[];
  similarProducts: SimilarProduct[];
  nearbyStores: NearbyStores;
  tip: TipInfo;
}
