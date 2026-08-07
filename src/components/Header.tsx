import React from 'react';
import styled from 'styled-components';
import { House, Search, Bell, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  hasBack?: boolean;
  backAction?: () => void;
  onSearchClick?: () => void;
  onBellClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  hasBack = false,
  backAction,
  onSearchClick,
  onBellClick,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backAction) {
      backAction();
    } else {
      navigate(-1);
    }
  };

  if (hasBack || title) {
    return (
      <PageHeaderContainer>
        <BackButton onClick={handleBack} aria-label="이전 페이지">
          <ArrowLeft size={21} />
        </BackButton>
        <PageTitle>{title}</PageTitle>
      </PageHeaderContainer>
    );
  }

  return (
    <TopbarContainer>
      <BrandLink to="/" aria-label="HOME SURI HOME 홈">
        <House size={18} />
        <span>HOME SURI HOME</span>
      </BrandLink>
      <TopActions>
        <IconButton type="button" aria-label="검색" onClick={onSearchClick}>
          <Search size={17} />
        </IconButton>
        <IconButton type="button" aria-label="알림" onClick={onBellClick}>
          <Bell size={17} />
        </IconButton>
      </TopActions>
    </TopbarContainer>
  );
};

const TopbarContainer = styled.header`
  height: 68px;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(251, 247, 242, 0.97);
  position: sticky;
  top: 0;
  z-index: 30;
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #7a4d2e;
  font-size: 15px;
  font-weight: 900;
  word-spacing: 2px;
  text-decoration: none;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const TopActions = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  color: #4f2d1b;
  box-shadow: 0 8px 20px rgba(106, 72, 45, 0.08);
  border: 0;
  cursor: pointer;

  svg {
    width: 17px;
    height: 17px;
  }
`;

const PageHeaderContainer = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid #DFD4CB;
  position: relative;
  flex-shrink: 0;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: #2B211C;
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`;

const PageTitle = styled.h1`
  font-size: 18px;
  font-weight: 900;
  color: #2B211C;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;
