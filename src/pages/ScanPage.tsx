import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  House,
  Search,
  Bell,
  ScanLine,
  Camera,
  Image as ImageIcon,
  Sun,
  Hand,
  Check,
  Settings,
  Wrench,
  NotebookTabs,
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
import '../styles/scan.css';

import imgSeasonal from '../../original-design/img/3_001.png';
import imgDiagSink from '../../original-design/img/4_001.png';
import imgDiagBoiler from '../../original-design/img/5_001.png';
import imgGuideSilicon from '../../original-design/img/6_001.png';
import imgGuideTools from '../../original-design/img/7_001.png';
import imgCommunity from '../../original-design/img/8_001.png';
import imgAvatar from '../../original-design/img/9_001.png';

// AI 스캔 이미지
import imgScanBeaver from '../../original-design/img/1_001.png';
import imgBlurryBeaver from '../../original-design/img/1_1_002.png';
import imgAnalysisBeaver from '../../original-design/img/1_1_001.png';

// 데이터 정의 (홈 화면 배경 렌더링용)
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

type ScanStep = 'scan_main' | 'scan_modal' | 'blurry_modal' | 'analyzing';

export const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ScanStep>('scan_main');

  // 토스트 메시지 상태
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

  useEffect(() => {
    return () => {
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, [toastTimer]);

  // 파일 입력 리프
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // 3_1 스캔 모달 핸들러
  const handleCameraClick = () => {
    if (cameraInputRef.current) cameraInputRef.current.click();
  };

  const handleGalleryClick = () => {
    if (galleryInputRef.current) galleryInputRef.current.click();
  };

  // 사진 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isRetry: boolean = false) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (!isRetry) {
        // 첫 번째 업로드: 흐림 안내 모달(3_3)을 띄우는 시뮬레이션
        setStep('blurry_modal');
      } else {
        // 흐림 안내 모달에서 재시도하여 정상 업로드 완료 시
        const isCamera = e.target.id.includes('camera') || e.target.id.includes('Retry');
        handleToast(isCamera ? "새 사진을 불러왔어요." : "갤러리 사진을 선택했어요.");
        setStep('analyzing');
      }
    }
  };

  // 모달 닫기 핸들러
  const handleCloseScanModal = () => {
    setStep('scan_main');
  };

  const handleCloseBlurryModal = () => {
    setStep('scan_main');
  };

  // 3_2 정밀 진단 상태 애니메이션 관리
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [stepTwoClasses, setStepTwoClasses] = useState('analysis-step');
  const [stepThreeClasses, setStepThreeClasses] = useState('analysis-step matching-step');
  const [buttonsActive, setButtonsActive] = useState(false);

  const bubbleMessages = [
    "비버가 원인을<br>찾고 있어요!",
    "발생 원인을<br>분석하고 있어요!",
    "수리 방법을<br>비교하고 있어요!",
    "거의 끝났어요!"
  ];

  useEffect(() => {
    if (step !== 'analyzing') {
      setAnalysisProgress(0);
      setBubbleIndex(0);
      setStepTwoClasses('analysis-step');
      setStepThreeClasses('analysis-step matching-step');
      setButtonsActive(false);
      return;
    }

    const t1 = setTimeout(() => {
      setStepTwoClasses('analysis-step is-visible is-complete');
      setBubbleIndex(1);
      setAnalysisProgress(24);
    }, 900);

    const t2 = setTimeout(() => {
      setStepThreeClasses('analysis-step matching-step is-visible');
      setBubbleIndex(2);
      setAnalysisProgress(47);
    }, 1800);

    const t3 = setTimeout(() => {
      setBubbleIndex(3);
      setAnalysisProgress(72);
    }, 2800);

    const t4 = setTimeout(() => {
      setAnalysisProgress(100);
      setButtonsActive(true);
      handleToast("분석이 완료됐어요!");
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [step]);

  // ESC 키 이벤트 리스너 (scan_modal, blurry_modal 닫기)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (step === 'scan_modal') {
          handleCloseScanModal();
        } else if (step === 'blurry_modal') {
          handleCloseBlurryModal();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [step]);

  const data = HOME_SURI_DATA;
  const seasonal = data.seasonalRecommend;
  const post = data.community;
  const ai = data.aiRecommendation;

  return (
    <>
      {step === 'analyzing' ? (
        // ==================== [분석 진행 화면] (3_2_HOME_SURI_HOME_analysis_screen) ====================
        <>
          <header className="topbar">
            <a className="brand" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} aria-label="HOME SURI HOME 홈">
              <House size={18} />
              <span>HOME SURI HOME</span>
            </a>

            <div className="top-actions">
              <button className="icon-button" type="button" aria-label="검색" onClick={() => handleToast('검색 화면은 준비 중입니다.')}>
                <Search size={18} />
              </button>

              <button className="icon-button" type="button" aria-label="알림" onClick={() => handleToast('새로운 알림이 없습니다.')}>
                <Bell size={18} />
              </button>
            </div>
          </header>

          <main className="analysis-main">
            <section className="character-section">
              <div className="speech-bubble" id="speechBubble" dangerouslySetInnerHTML={{ __html: bubbleMessages[bubbleIndex] }} />

              <img
                className="analysis-beaver"
                src={imgAnalysisBeaver}
                alt="돋보기로 누수 원인을 확인하는 비버 캐릭터"
              />
            </section>

            <section className="analysis-copy">
              <span className="analysis-badge">AI ANALYSIS IN PROGRESS</span>
              <h1>정밀 진단 중</h1>
              <p>
                이미지 픽셀 데이터를 분석하여<br />
                수리 방안을 설계하고 있습니다.
              </p>
            </section>

            <section className="analysis-steps" aria-label="분석 진행 단계">
              <article className="analysis-step is-complete" id="stepOne">
                <span className="step-icon">
                  <Check size={18} />
                </span>
                <strong>손상 부위 실시간 감지 완료</strong>
              </article>

              <article className={stepTwoClasses} id="stepTwo">
                <span className="step-icon">
                  <Check size={18} />
                </span>
                <strong>발생 원인 다각도 분석 완료</strong>
              </article>

              <article className={stepThreeClasses} id="stepThree">
                <div className="matching-copy">
                  <span className="gear-icon">
                    <Settings size={17} />
                  </span>
                  <strong>최적의 수리 솔루션 매칭</strong>
                </div>

                <span className="progress-label" id="progressLabel">
                  {analysisProgress >= 100 ? "완료 100%" : `진행중 ${analysisProgress}%`}
                </span>

                <div className="progress-track">
                  <span className="progress-value" id="progressValue" style={{ width: `${analysisProgress}%` }}></span>
                </div>
              </article>
            </section>

            <section className="result-actions">
              <button
                className={`result-action ${buttonsActive ? 'is-active' : ''}`}
                id="toolButton"
                type="button"
                disabled={!buttonsActive}
                onClick={() => handleToast('필요 공구 목록으로 이동합니다.')}
              >
                <Wrench size={20} />
                <span>필요 공구<br />리스트업</span>
              </button>

              <button
                className={`result-action ${buttonsActive ? 'is-active' : ''}`}
                id="guideButton"
                type="button"
                disabled={!buttonsActive}
                onClick={() => navigate('/result')}
              >
                <NotebookTabs size={20} />
                <span>상세 수리<br />가이드 생성</span>
              </button>
            </section>
          </main>

          <nav className="bottom-nav" aria-label="하단 메뉴">
            <button className="nav-item" type="button" onClick={() => navigate('/')}>
              <House size={19} />
              <span>홈</span>
            </button>

            <button className="nav-item active" type="button" onClick={() => setStep('scan_main')}>
              <ScanLine size={19} />
              <span>AI 스캔</span>
            </button>

            <button className="nav-item" type="button" onClick={() => navigate('/shop')}>
              <ShoppingBag size={19} />
              <span>구매</span>
            </button>

            <button className="nav-item" type="button" onClick={() => navigate('/community')}>
              <Users size={19} />
              <span>커뮤니티</span>
            </button>

            <button className="nav-item" type="button" onClick={() => navigate('/mypage')}>
              <UserRound size={19} />
              <span>마이페이지</span>
            </button>
          </nav>
        </>
      ) : (
        // ==================== [AI 스캔 메인 화면 & 팝업 모달] ====================
        <>
          {/* AI 스캔 메인 화면 (뒷배경) */}
          <div style={{ opacity: step === 'scan_main' ? 1 : 0.5, pointerEvents: step === 'scan_main' ? 'auto' : 'none' }}>
            <header className="topbar">
              <a className="brand" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} aria-label="HOME SURI HOME 홈">
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
                <span className="eyebrow">✦ NEW AI 스캔</span>

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
                  onClick={() => setStep('scan_modal')}
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
                className="nav-item"
                type="button"
                onClick={() => navigate('/')}
              >
                <House size={19} />
                <span>홈</span>
              </button>

              <button
                className="nav-item active"
                type="button"
                onClick={() => setStep('scan_main')}
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
          </div>

          {/* ==================== [3_1_HOME_SURI_HOME_scan_modal] ==================== */}
          <div
            className={`modal-overlay ${step === 'scan_modal' ? 'is-open' : ''}`}
            id="scanModal"
            role="presentation"
            onClick={(e) => { if (e.target === e.currentTarget) handleCloseScanModal(); }}
          >
            <section
              className="scan-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="scanModalTitle"
              aria-describedby="scanModalDescription"
            >
              <div className="modal-handle" aria-hidden="true"></div>

              <div className="character-wrap">
                <img
                  src={imgScanBeaver}
                  alt="노트북으로 사진을 확인하는 비버 캐릭터"
                />

                <span className="scan-badge" aria-hidden="true">
                  <ScanLine size={21} />
                </span>
              </div>

              <header className="modal-copy">
                <h2 id="scanModalTitle">사진을 스캔해볼까요?</h2>

                <p id="scanModalDescription">
                  수리가 필요한 곳을 찍거나<br />
                  앨범에서 사진을 선택해주세요.
                </p>
              </header>

              <div className="scan-actions">
                <button
                  className="scan-option"
                  id="cameraButton"
                  type="button"
                  onClick={handleCameraClick}
                >
                  <span className="option-icon">
                    <Camera size={29} />
                  </span>

                  <strong>직접 촬영하기</strong>
                  <small>AI가 바로 분석해드려요</small>
                </button>

                <button
                  className="scan-option"
                  id="galleryButton"
                  type="button"
                  onClick={handleGalleryClick}
                >
                  <span className="option-icon">
                    <ImageIcon size={29} />
                  </span>

                  <strong>갤러리에서 선택</strong>
                  <small>저장된 사진 불러오기</small>
                </button>
              </div>

              <button
                className="cancel-button"
                id="closeScanModal"
                type="button"
                onClick={handleCloseScanModal}
              >
                취소
              </button>

              {/* 퍼블리싱용 숨김 파일 입력 */}
              <input
                id="cameraInput"
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                onChange={(e) => handleFileChange(e, false)}
                style={{ display: 'none' }}
              />

              <input
                id="galleryInput"
                type="file"
                accept="image/*"
                ref={galleryInputRef}
                onChange={(e) => handleFileChange(e, false)}
                style={{ display: 'none' }}
              />
            </section>
          </div>

          {/* ==================== [3_3_HOME_SURI_HOME_blurry_photo_modal] ==================== */}
          <div
            className={`modal-overlay ${step === 'blurry_modal' ? 'is-open' : ''}`}
            id="blurryModal"
            role="presentation"
            onClick={(e) => { if (e.target === e.currentTarget) handleCloseBlurryModal(); }}
          >
            <section
              className="blurry-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="blurryModalTitle"
              aria-describedby="blurryModalDescription"
            >
              <div className="modal-handle" aria-hidden="true"></div>

              <img
                className="blurry-beaver"
                src={imgBlurryBeaver}
                alt="흐린 사진을 보고 당황한 비버 캐릭터"
              />

              <header className="modal-copy">
                <h2 id="blurryModalTitle">사진이 조금 흐려요 😥</h2>

                <p id="blurryModalDescription">
                  더 선명하게 찍어주시면<br />
                  정확한 진단에 도움이 돼요.
                </p>
              </header>

              <section className="tip-card" aria-label="사진 촬영 팁">
                <div className="tip-row">
                  <Sun size={17} />
                  <span>밝은 곳에서 촬영해주세요.</span>
                </div>

                <div className="tip-row">
                  <Camera size={17} />
                  <span>문제 부위를 가까이 찍어주세요.</span>
                </div>

                <div className="tip-row">
                  <Hand size={17} />
                  <span>흔들리지 않게 고정 후 촬영해주세요.</span>
                </div>
              </section>

              <div className="modal-actions">
                <button
                  className="retry-button"
                  id="retryButton"
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('cameraInputRetry');
                    if (el) el.click();
                  }}
                >
                  다시 촬영하기
                </button>

                <button
                  className="select-button"
                  id="selectButton"
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('galleryInputRetry');
                    if (el) el.click();
                  }}
                >
                  사진 선택하기
                </button>
              </div>

              {/* 흐림 팝업 내 재도전용 숨김 파일 인풋 */}
              <input
                id="cameraInputRetry"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileChange(e, true)}
                style={{ display: 'none' }}
              />

              <input
                id="galleryInputRetry"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, true)}
                style={{ display: 'none' }}
              />
            </section>
          </div>
        </>
      )}

      {/* 토스트 */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast" role="status" aria-live="polite">
        {toastMessage}
      </div>
    </>
  );
};
