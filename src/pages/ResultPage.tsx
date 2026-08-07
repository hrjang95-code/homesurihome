import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  House,
  Search,
  Bell,
  TriangleAlert,
  Wrench,
  Compass,
  Hammer,
  Brush,
  Gauge,
  Clock,
  Wallet,
  Users,
  CircleCheck,
  Star,
  Trophy,
  MessageCircle
} from 'lucide-react';

import '../styles/common.css';
import '../styles/result.css';

import { BottomNavigation } from '../components/BottomNavigation';
import { useToast } from '../components/ToastContext';
import { diagnosisResult as d } from '../data/resultData';

// 원본 이미지 임포트
import imgBeaverHammer from '../../original-design/img/1_002.png';
import imgBeaverComplete from '../../original-design/img/1_1_003.png';

// Lucide 아이콘 매퍼 정의
const IconMap: { [key: string]: React.ComponentType<any> } = {
  gauge: Gauge,
  clock: Clock,
  wallet: Wallet,
  wrench: Wrench,
  compass: Compass,
  hammer: Hammer,
  brush: Brush,
  'brush-cleaning': Brush
};

export const ResultPage: React.FC = () => {
  const showToast = useToast();
  const navigate = useNavigate();

  // 체크리스트 개별 체크 여부 상태
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(d.checklist.length).fill(false)
  );

  // 수리 완료 팝업 상태
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // 수리 완료 버튼 클릭 핸들러
  const handleCompleteBtn = () => {
    const isAllChecked = checkedItems.every(Boolean);
    if (isAllChecked) {
      setShowCompleteModal(true);
    } else {
      showToast('체크리스트를 모두 확인해주세요.');
    }
  };

  const handleExpertBtn = () => {
    showToast('전문가 연결 화면은 다음 단계에서 연결됩니다.');
    setTimeout(() => {
      navigate('/expert');
    }, 1500);
  };

  // 수리 완료 팝업 핸들러
  const handleLaterBtn = () => {
    showToast('후기는 나중에 작성할 수 있어요.');
    setShowCompleteModal(false);
  };

  const handleReviewBtn = () => {
    showToast('후기 작성 화면으로 이동합니다.');
    // TODO: 후기 작성 화면 연동 (현재 프로젝트 미구현 상태이므로 팝업만 닫음)
    setTimeout(() => {
      setShowCompleteModal(false);
    }, 500);
  };

  const handleCloseModal = () => {
    setShowCompleteModal(false);
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showCompleteModal) {
        setShowCompleteModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCompleteModal]);

  return (
    <div className="app-shell">
      {/* HOME SURI HOME 상단 헤더 */}
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
            onClick={() => showToast('검색 화면은 준비 중입니다.')}
          >
            <Search size={18} />
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="알림"
            onClick={() => showToast('새로운 알림이 없습니다.')}
          >
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* 분석 결과 메인 영역 */}
      <main className="result-main">
        <section className="result-hero" aria-labelledby="resultTitle">
          <img className="result-beaver" src={imgBeaverHammer} alt="망치를 들고 있는 비버 캐릭터" />
          <h1 id="resultTitle">분석 결과 요약</h1>
          <p className="issue-title" id="issueTitle">{d.issueTitle}</p>
          <span className="confidence-pill" id="confidencePill">AI 분석 신뢰도 {d.confidence}%</span>
        </section>

        {/* 요약 그리드 */}
        <section className="summary-grid" id="summaryGrid" aria-label="분석 요약">
          {d.summary.map((item, index) => {
            const IconComp = IconMap[item.icon.toLowerCase()] || Gauge;
            return (
              <article className="summary-card" key={index}>
                <span className="summary-icon">
                  <IconComp size={17} />
                </span>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </article>
            );
          })}
        </section>

        {/* 주의사항 카드 */}
        <section className="warning-card">
          <h2>
            <TriangleAlert size={18} /> 작업 전 주의사항
          </h2>
          <ul id="cautionList">
            {d.cautions.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </section>

        {/* 필요 공구 및 부품 */}
        <section className="section-block">
          <h2>필요한 공구 및 부품</h2>
          <div className="tool-grid" id="toolGrid">
            {d.requiredTools.map((item, index) => {
              const IconComp = IconMap[item.icon.toLowerCase()] || Wrench;
              return (
                <article className="tool-card" key={index}>
                  <IconComp size={17} />
                  <span>{item.label}</span>
                </article>
              );
            })}
          </div>

          <article className="part-card" id="partCard">
            <img src={d.part.image} alt={d.part.name} />
            <div className="part-info">
              <span className="part-badge">{d.part.badge}</span>
              <h3>{d.part.name}</h3>
              <p>{d.part.description}</p>
              <small>{d.part.note}</small>
            </div>
          </article>
        </section>

        {/* 단계별 수리 가이드 */}
        <section className="section-block">
          <div className="section-heading-row">
            <h2>단계별 수리 가이드</h2>
            <span id="stepCount">{d.steps.length}단계 중 1단계</span>
          </div>
          <div className="step-list" id="stepList">
            {d.steps.map((step, index) => (
              <article className="step-card" key={step.id}>
                <div className="step-image-wrap">
                  <img src={step.image} alt={step.title} />
                  <span className="step-badge">STEP 0{index + 1}</span>
                </div>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 최종 체크리스트 */}
        <section className="checklist-card">
          <h2>
            <TriangleAlert size={18} /> 최종 체크리스트
          </h2>
          <div id="checklist">
            {d.checklist.map((label, index) => (
              <label className="check-item" key={index}>
                <input
                  type="checkbox"
                  data-check={index}
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 전문가에게 맡기기 버튼 */}
        <button className="expert-link" type="button" id="expertBtn" onClick={handleExpertBtn}>
          <Users size={20} /> 전문가에게 맡기기
        </button>

        {/* 수리 완료 버튼 */}
        <button className="complete-button" type="button" id="completeBtn" onClick={handleCompleteBtn}>
          <CircleCheck size={20} /> 수리 완료
        </button>
      </main>

      {/* 공통 BottomNavigation */}
      <BottomNavigation />

      {/* ==================== 수리 완료 팝업 (4_1_HOME_SURI_HOME_repair_complete_modal) ==================== */}
      <div
        className={`modal-overlay ${showCompleteModal ? 'is-open' : ''}`}
        id="completeModal"
        role="presentation"
        onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}
      >
        <section
          className="complete-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="completeModalTitle"
          aria-describedby="completeModalDescription"
        >
          <div className="modal-handle" aria-hidden="true"></div>

          <img
            className="complete-beaver"
            src={imgBeaverComplete}
            alt="수리 완료를 축하하는 비버 캐릭터"
          />

          <header className="modal-copy">
            <h2 id="completeModalTitle">
              🎉 축하해요!<br />
              오늘의 집수리를 완료했어요!
            </h2>

            <p id="completeModalDescription">
              비버 덕분에 또 하나의 문제를 해결했어요!<br />
              여러분의 경험을 공유하면 다른 사용자에게도<br />
              큰 도움이 됩니다.
            </p>
          </header>

          <section className="benefit-card" aria-label="후기 작성 혜택">
            <div className="benefit-row">
              <Star size={17} />
              <span>후기 작성 시 +20 포인트 지급</span>
            </div>

            <div className="benefit-row">
              <Trophy size={17} />
              <span>집수리 경험 공유</span>
            </div>

            <div className="benefit-row">
              <MessageCircle size={17} />
              <span>다른 사용자에게 도움 주기</span>
            </div>
          </section>

          <div className="modal-actions">
            <button
              className="later-button"
              id="laterButton"
              type="button"
              onClick={handleLaterBtn}
            >
              나중에 할게요
            </button>

            <button
              className="review-button"
              id="reviewButton"
              type="button"
              onClick={handleReviewBtn}
            >
              후기 작성하기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
