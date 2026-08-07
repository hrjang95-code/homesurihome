import { ExpertCategory, ExpertInfo } from '../types/expert';
import profileKim from '../assets/images/profile-expert-kim.png';
import profileLee from '../assets/images/profile-expert-lee.png';

export const expertCategories: ExpertCategory[] = [
  {
    id: "all",
    label: "전체"
  },
  {
    id: "water",
    label: "수도"
  },
  {
    id: "electric",
    label: "전기"
  },
  {
    id: "door",
    label: "도어락"
  }
];

export const experts: ExpertInfo[] = [
  {
    id: "expert_kim",
    category: "door",
    name: "김수리 반장님",
    image: profileKim,
    match: 98,
    specialty: "Door Lock & Hinge Specialist",
    rating: 4.9,
    reviewCount: 128,
    experience: "경력 15년",
    tags: "도어락, 방화문, 현관 교체 전문",
    region: "서울 강남구 (1.2km)",
    price: "₩50,000~",
    arrival: "25분 내",
    review: "고장난 부분을 정확히 파악해서 꼼꼼하게 고쳐주셨어요. 추천합니다!"
  },
  {
    id: "expert_lee",
    category: "water",
    name: "이지안 명장",
    image: profileLee,
    match: 92,
    specialty: "Bathroom Repair Specialist",
    rating: 5.0,
    reviewCount: 84,
    experience: "경력 8년",
    tags: "배관 수리, 싱크대 막힘 해결",
    region: "서울 서초구 (0.8km)",
    price: "₩40,000~",
    arrival: "15분 내",
    review: "싱크대 물이 안 내려갔는데 10분만에 오셔서 뚫어주셨어요!"
  }
];
