import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { AppLayout } from './components/AppLayout';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';

// 페이지 컴포넌트 임포트
import { LoginPage } from './pages/LoginPage';
import { ResultPage } from './pages/ResultPage';
import { ShopPage } from './pages/ShopPage';
import { ExpertPage } from './pages/ExpertPage';
import { HomePage } from './pages/HomePage';
import { ScanPage } from './pages/ScanPage';

// 준비 중 화면용 임시 컴포넌트
const FallbackPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <FallbackContainer>
      <Header />
      <FallbackContent>
        <Emoji>🛠️</Emoji>
        <h2>{title} 화면 준비 중</h2>
        <p>더 멋진 기능을 준비하고 있어요. 조금만 기다려주세요!</p>
      </FallbackContent>
      <BottomNavigation />
    </FallbackContainer>
  );
};

export const App: React.FC = () => {
  return (
    <AppLayout>
      <ScrollToTop />
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 메인 비즈니스 페이지들 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/expert" element={<ExpertPage />} />

        {/* 준비 중/추후 구현 예정인 페이지들 */}
        <Route path="/community" element={<FallbackPage title="커뮤니티" />} />
        <Route path="/mypage" element={<FallbackPage title="마이페이지" />} />

        {/* 잘못된 경로는 로그인으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AppLayout>
  );
};

// Styled Components
const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const FallbackContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;

  h2 {
    font-size: 18px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text};
    margin: 16px 0 8px 0;
  }

  p {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.muted};
    margin: 0;
    line-height: 1.5;
  }
`;

const Emoji = styled.div`
  font-size: 48px;
`;
