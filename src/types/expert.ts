export interface ExpertCategory {
  id: string;
  label: string;
}

export interface ExpertInfo {
  id: string;
  category: string;
  name: string;
  image: string;
  match: number;
  specialty: string;
  rating: number;
  reviewCount: number;
  experience: string;
  tags: string;
  region: string;
  price: string;
  arrival: string;
  review: string;
}
