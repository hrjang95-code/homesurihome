import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  House,
  Search,
  Bell,
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  Phone,
  CalendarDays,
  NotebookPen,
  Users,
  UserRound,
  ScanLine
} from 'lucide-react';

import '../styles/common.css';
import '../styles/expert.css';

import { useToast } from '../components/ToastContext';
import { expertCategories as categories } from '../data/expertData';

// 원본 이미지 임포트
import imgBeaverExpertSos from '../../original-design/img/1_005.png';
import imgExpertKim from '../../original-design/img/2_005.png';
import imgExpertLee from '../../original-design/img/3_005.png';

// 데이터 정의 (이미지 파일명 오버라이드 포함)
const EXPERT_LIST_DATA = [
  {
    id: "expert_kim",
    category: "door",
    name: "김수리 반장님",
    image: imgExpertKim,
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
    image: imgExpertLee,
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

export const ExpertPage: React.FC = () => {
  const showToast = useToast();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 카테고리 변경 핸들러
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 전문가 목록 필터링
  const filteredExperts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return EXPERT_LIST_DATA.filter((expert) => {
      const categoryMatched =
        selectedCategory === 'all' || expert.category === selectedCategory;

      const keywordMatched =
        !keyword ||
        expert.name.toLowerCase().includes(keyword) ||
        expert.specialty.toLowerCase().includes(keyword) ||
        expert.tags.toLowerCase().includes(keyword);

      return categoryMatched && keywordMatched;
    });
  }, [selectedCategory, searchQuery]);

  // 전문가 카드 버튼 동작 토스트
  const handleActionClick = (action: 'quote' | 'call' | 'reserve', expertName: string) => {
    const messages = {
      quote: `${expertName}에게 견적 문의를 보냈어요.`,
      call: `${expertName}의 연락처를 확인합니다.`,
      reserve: `${expertName} 예약 화면으로 이동합니다.`,
    };
    showToast(messages[action]);
  };

  const handleMoreExperts = () => {
    showToast('가까운 전문가 목록을 불러오는 중입니다.');
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      showToast('이전 페이지가 없습니다.');
    }
  };

  return (
    <div className="expert-page">
      <div className="app-shell">
      {/* 상단 헤더 */}
      <header className="topbar">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); navigate('/'); }} aria-label="HOME SURI HOME 홈">
          <House size={18} aria-hidden="true" />
          <span>HOME SURI HOME</span>
        </a>

        <div className="topbar-actions">
          <button className="icon-button" type="button" aria-label="검색" onClick={() => showToast('검색 화면은 준비 중입니다.')}>
            <Search size={18} />
          </button>

          <button className="icon-button" type="button" aria-label="알림" onClick={() => showToast('새로운 알림이 없습니다.')}>
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="page-main">
        {/* 페이지 제목 */}
        <section className="page-title-row">
          <button className="back-button" type="button" aria-label="이전 페이지" onClick={handleBack}>
            <ArrowLeft size={19} />
          </button>
          <h1>전문가 찾기</h1>
        </section>

        {/* 검색 */}
        <section className="search-section" aria-label="전문가 검색">
          <label className="search-box">
            <Search size={21} aria-hidden="true" />
            <input
              id="expertSearch"
              type="search"
              placeholder="어떤 수리 전문가를 찾으시나요?"
              autoComplete="off"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </label>

          <div className="category-tabs" id="categoryTabs" role="tablist" aria-label="수리 분야">
            {categories.map((category) => {
              const isActive = category.id === selectedCategory;
              return (
                <button
                  key={category.id}
                  className={`category-button ${isActive ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 전문가 SOS 요약 */}
        <section className="sos-card">
          <img
            className="sos-beaver"
            src={imgBeaverExpertSos}
            alt="안전모를 쓰고 인사하는 비버 캐릭터"
          />

          <div className="sos-copy">
            <h2>전문가에게 SOS</h2>
            <p>
              직접 수리가 어렵다면 믿을 수 있는 전문가에게 맡겨보세요.
              AI가 현재 고장 유형을 분석하여 가장 적합한 전문가를 추천합니다.
            </p>
          </div>

          <div className="sos-stats">
            <article>
              <span>평균 예상 수리비</span>
              <strong>₩4.5만</strong>
            </article>

            <article>
              <span>평균 도착 시간</span>
              <strong>35분</strong>
            </article>

            <article>
              <span>AI 추천 전문가 수</span>
              <strong>12명</strong>
            </article>
          </div>
        </section>

        {/* 추천 전문가 */}
        <section className="recommended-section">
          <div className="section-heading">
            <div className="title-line">
              <h2>AI 추천 전문가</h2>
              <span className="match-label">BEST MATCH</span>
            </div>
            <p>현재 분석한 문제와 가장 잘 맞는 전문가입니다.</p>
          </div>

          <div className="expert-list" id="expertList">
            {filteredExperts.length === 0 ? (
              <div className="expert-card">
                <p style={{ margin: 0, textAlign: 'center' }}>
                  조건에 맞는 전문가가 없습니다.
                </p>
              </div>
            ) : (
              filteredExperts.map((expert) => (
                <article className="expert-card" key={expert.id}>
                  <div className="expert-top">
                    <img
                      className="expert-photo"
                      src={expert.image}
                      alt={`${expert.name} 전문가 프로필`}
                    />

                    <div>
                      <h3 className="expert-name">{expert.name}</h3>

                      <div className="expert-summary">
                        <span className="match-chip">
                          <strong>{expert.match}%</strong><br />
                          Match
                        </span>

                        <span className="specialty">
                          {expert.specialty}
                        </span>
                      </div>

                      <div className="rating-row">
                        <span className="star">★</span>
                        <span className="rating-value">{expert.rating}</span>
                        <span className="muted">(리뷰 {expert.reviewCount})</span>
                        <span className="muted">|</span>
                        <span className="muted">{expert.experience}</span>
                      </div>
                    </div>

                    <BadgeCheck className="badge-icon" size={19} />
                  </div>

                  <div className="expert-meta-row">
                    <span className="ai-badge">AI 인증률 {expert.match}%</span>
                    <p className="expert-tags">{expert.tags}</p>
                  </div>

                  <div className="service-box">
                    <div className="service-row">
                      <span>서비스 지역</span>
                      <strong>{expert.region}</strong>
                    </div>

                    <div className="service-row">
                      <span>예상 수리비 / 도착</span>
                      <strong className="price">
                        {expert.price} / {expert.arrival}
                      </strong>
                    </div>

                    <p className="review-copy">“{expert.review}”</p>
                  </div>

                  <div className="card-actions">
                    <button
                      className="action-button"
                      type="button"
                      onClick={() => handleActionClick('quote', expert.name)}
                    >
                      <NotebookPen size={16} />
                      견적 문의
                    </button>

                    <button
                      className="action-button"
                      type="button"
                      onClick={() => handleActionClick('call', expert.name)}
                    >
                      <Phone size={16} />
                      전화 연락
                    </button>

                    <button
                      className="action-button reserve"
                      type="button"
                      onClick={() => handleActionClick('reserve', expert.name)}
                    >
                      <CalendarDays size={16} />
                      예약하기
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          <button className="more-button" id="moreExperts" type="button" onClick={handleMoreExperts}>
            가까운 전문가 더 보기
            <ChevronDown size={18} />
          </button>
        </section>
      </main>

      {/* 하단 고정 네비게이션 (전문가 활성화 원본 구조 1:1 대응) */}
      <nav className="bottom-nav" aria-label="주요 메뉴">
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <House size={19} />
          <span>홈</span>
        </a>

        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/scan'); }}>
          <ScanLine size={19} />
          <span>AI 스캔</span>
        </a>

        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); navigate('/expert'); }}>
          <span className="active-icon">
            <Search size={21} />
          </span>
          <span>전문가</span>
        </a>

        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/community'); }}>
          <Users size={19} />
          <span>커뮤니티</span>
        </a>

        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/mypage'); }}>
          <UserRound size={19} />
          <span>마이</span>
        </a>
      </nav>
      </div>
    </div>
  );
};
