import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  House,
  Search,
  Bell,
  ScanLine,
  Bath,
  Lightbulb,
  DoorOpen,
  Star,
  ThumbsUp,
  MessageSquare,
  Droplets,
  Leaf,
  PiggyBank,
  ShoppingBag,
  Users,
  UserRound
} from 'lucide-react';

import '../styles/common.css';
import '../styles/home.css';

import imgSeasonal from '../../original-design/img/3_001.png';
import imgDiagSink from '../../original-design/img/4_001.png';
import imgDiagBoiler from '../../original-design/img/5_001.png';
import imgGuideSilicon from '../../original-design/img/6_001.png';
import imgGuideTools from '../../original-design/img/7_001.png';
import imgCommunity from '../../original-design/img/8_001.png';
import imgAvatar from '../../original-design/img/9_001.png';

// 데이터 정의 (original-design/3_HOME_SURI_HOME_home_screen/data.js 변환)
const HOME_SURI_DATA = {
  topRepairs: [
    {
      icon: Bath,
      title: "수전 누수/교체",
      countLabel: "오늘 1,240건 진단됨"
    },
    {
      icon: Lightbulb,
      title: "전등 깜빡임 수리",
      countLabel: "오늘 892건 진단됨"
    },
    {
      icon: DoorOpen,
      title: "문경첩 소음 제거",
      countLabel: "오늘 547건 진단됨"
    }
  ],

  seasonalRecommend: {
    image: imgSeasonal,
    badgeLabel: "※ WINTER SPECIAL GUIDE",
    title: "동파 예방 & 외풍 차단",
    description: "본격적인 추위가 오기 전 꼭 확인해야 할 집 관리 방법을 비버가 알려드려요."
  },

  recentDiagnosis: [
    {
      image: imgDiagSink,
      title: "주방 싱크대 수전",
      date: "2023.11.24 진단",
      description: "본체 하부 미세 누수 확인됨",
      status: "수리 필요",
      tone: "red"
    },
    {
      image: imgDiagBoiler,
      title: "거실 보일러 조절기",
      date: "2023.11.15 진단",
      description: "작동 상태 양호 (배터리 교체 권장)",
      status: "정상",
      tone: "blue"
    }
  ],

  guides: [
    {
      image: imgGuideSilicon,
      title: "초보자도 쉬운 실리콘 재시공",
      rating: "4.9",
      viewLabel: "조회 2.4k"
    },
    {
      image: imgGuideTools,
      title: "가정용 필수 공구 정리",
      rating: "4.8",
      viewLabel: "조회 1.8k"
    }
  ],

  community: {
    image: imgCommunity,
    badge: "인기 리모델링",
    title: "3만원으로 화장실 수납장 살리기",
    description: "생각보다 너무 간단해서 놀랐어요! 페인트칠 손잡이만 바꿨는데 새것 같네요.",
    author: "홈드레싱_지니",
    likeCount: 142,
    commentCount: 28
  },

  aiRecommendation: {
    title: "수압이 약해졌나요?",
    description: "지난주 진단 데이터와 비교했을 때 급수 밸브 점검이 필요해 보입니다."
  }
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // 토스트 메시지 상태 관리 (original-design/3_HOME_SURI_HOME_home_screen/common.js 변환)
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastTimer, setToastTimer] = useState<any>(null);

  const handleToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 1800);

    setToastTimer(timer);
  };

  // 컴포넌트 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => {
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
    };
  }, [toastTimer]);

  const data = HOME_SURI_DATA;
  const seasonal = data.seasonalRecommend;
  const post = data.community;
  const ai = data.aiRecommendation;

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#" aria-label="HOME SURI HOME 홈" onClick={(e) => e.preventDefault()}>
          <House size={18} />
          <span>HOME SURI HOME</span>
        </a>

        <div className="top-actions">
          <button
            className="icon-button"
            type="button"
            aria-label="검색"
            onClick={() => handleToast('검색 화면은 준비 중입니다.')}
          >
            <Search size={17} />
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="알림"
            onClick={() => handleToast('새로운 알림이 없습니다.')}
          >
            <Bell size={17} />
          </button>
        </div>
      </header>

      <main className="home-main">
        {/* Section 1: search-wrap */}
        <section className="search-wrap" aria-label="수리 검색">
          <Search size={15} />
          <input
            type="search"
            placeholder="어떤 수리가 필요하신가요?"
            aria-label="수리 검색어"
          />
        </section>

        {/* Section 2: hero-card */}
        <section className="hero-card">
          <span className="eyebrow">✦ NEW AI 솔루션</span>

          <h1>
            문제가 있는 곳을<br />
            카메라로 비춰보세요
          </h1>

          <p>
            AI가 즉시 고장 부위를 스캔하고 정확한<br />
            수리 방법과 예상 견적을 알려드려요.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() => handleToast('AI 스캔 화면은 다음 단계에서 연결됩니다.')}
          >
            AI 스캔 시작하기
            <ScanLine size={16} />
          </button>

          <div className="scan-visual" aria-hidden="true">
            <House size={23} />
          </div>
        </section>

        {/* Section 3: 오늘의 집수리 TOP 3 */}
        <section className="section-block">
          <h2>오늘의 집수리 TOP 3 ↗</h2>
          <div className="stack-list" id="topRepairList">
            {data.topRepairs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <article className="repair-row" key={index}>
                  <span className="repair-icon">
                    <IconComponent size={16} />
                  </span>

                  <div className="row-content">
                    <strong>{item.title}</strong>
                    <small>{item.countLabel}</small>
                  </div>

                  <button
                    className="row-link"
                    type="button"
                    onClick={() => handleToast('가이드 화면은 다음 단계에서 연결됩니다.')}
                  >
                    가이드 ›
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 4: 계절별 추천 수리 */}
        <section className="section-block">
          <h2>계절별 추천 수리</h2>
          <article className="season-card" id="seasonalCard">
            <img src={seasonal.image} alt={seasonal.title} />
            <div className="season-card-body">
              <span className="badge">{seasonal.badgeLabel}</span>
              <h3>{seasonal.title}</h3>
              <p>{seasonal.description}</p>
              <button
                className="ghost-button"
                type="button"
                onClick={() => handleToast('전체 가이드 화면은 다음 단계에서 연결됩니다.')}
              >
                전체 가이드 보기 ↗
              </button>
            </div>
          </article>
        </section>

        {/* Section 5: 최근 진단 기록 */}
        <section className="section-block">
          <div className="section-title-row">
            <h2>최근 진단 기록</h2>

            <button
              className="text-link"
              type="button"
              onClick={() => handleToast('최근 진단 기록 전체보기는 다음 단계에서 연결됩니다.')}
            >
              더보기 ›
            </button>
          </div>

          <div className="stack-list" id="recentDiagnosisList">
            {data.recentDiagnosis.map((item, index) => (
              <article className="diagnosis-row" key={index}>
                <img className="diagnosis-thumb" src={item.image} alt={item.title} />

                <div className="row-content">
                  <strong>{item.title}</strong>
                  <small>
                    {item.date}<br />
                    {item.description}
                  </small>
                </div>

                <span className={`status-pill ${item.tone}`}>
                  {item.status}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Section 6: 인기 수리 가이드 */}
        <section className="section-block">
          <h2>인기 수리 가이드</h2>
          <div className="horizontal-grid" id="guideGrid">
            {data.guides.map((item, index) => (
              <article className="guide-card" key={index}>
                <img src={item.image} alt={item.title} />

                <div className="guide-card-body">
                  <h3>{item.title}</h3>

                  <div className="guide-meta">
                    <span className="guide-rating">
                      <Star size={11} fill="currentColor" />
                      <strong>{item.rating}</strong>
                    </span>

                    <span>{item.viewLabel}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 7: 인기 커뮤니티 게시글 */}
        <section className="section-block">
          <h2>인기 커뮤니티 게시글</h2>
          <article className="community-card" id="communityCard">
            <img src={post.image} alt={post.title} />

            <div className="community-body">
              <span className="badge">{post.badge}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>

              <div className="community-meta">
                <img className="avatar" src={imgAvatar} alt={post.author} />
                <span>{post.author}</span>
                <span className="meta-spacer"></span>

                <span className="meta-stat">
                  <ThumbsUp size={10} />
                  {post.likeCount}
                </span>

                <span className="meta-stat">
                  <MessageSquare size={10} />
                  {post.commentCount}
                </span>
              </div>
            </div>
          </article>
        </section>

        {/* Section 8: 나를 위한 AI 추천 수리 */}
        <section className="section-block">
          <h2>✦ 나를 위한 AI 추천 수리</h2>

          <article className="ai-card" id="aiRecommendation">
            <div className="drop-icon">
              <Droplets size={16} />
            </div>

            <h3>{ai.title}</h3>
            <p>{ai.description}</p>

            <button
              className="small-brown-button"
              type="button"
              onClick={() => handleToast('자가진단 화면은 다음 단계에서 연결됩니다.')}
            >
              자가진단 시작
            </button>
          </article>

          <div className="ai-shortcuts">
            <button
              type="button"
              onClick={() => handleToast('친환경 수리 화면은 다음 단계에서 연결됩니다.')}
            >
              <Leaf size={18} />
              <span>친환경 수리</span>
            </button>

            <button
              type="button"
              onClick={() => handleToast('비용 절감 화면은 다음 단계에서 연결됩니다.')}
            >
              <PiggyBank size={18} />
              <span>비용 절감</span>
            </button>
          </div>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="하단 메뉴">
        <button
          className="nav-item active"
          type="button"
          onClick={() => handleToast('현재 홈 화면입니다.')}
        >
          <House size={19} />
          <span>홈</span>
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={() => navigate('/scan')}
        >
          <ScanLine size={19} />
          <span>AI 스캔</span>
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={() => navigate('/shop')}
        >
          <ShoppingBag size={19} />
          <span>구매</span>
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={() => navigate('/community')}
        >
          <Users size={19} />
          <span>커뮤니티</span>
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={() => navigate('/mypage')}
        >
          <UserRound size={19} />
          <span>마이페이지</span>
        </button>
      </nav>

      <div className={`toast ${showToast ? 'show' : ''}`} id="toast" role="status" aria-live="polite">
        {toastMessage}
      </div>
    </>
  );
};
