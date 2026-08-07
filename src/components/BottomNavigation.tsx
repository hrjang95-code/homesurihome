import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { House, ScanLine, ShoppingBag, Users, UserRound } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const tabs = [
    { name: '홈', icon: House, path: '/' },
    { name: 'AI 스캔', icon: ScanLine, path: '/scan' },
    { name: '구매', icon: ShoppingBag, path: '/shop' },
    { name: '커뮤니티', icon: Users, path: '/community' },
    { name: '마이페이지', icon: UserRound, path: '/mypage' },
  ];

  const getIsActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '/home';
    }
    if (path === '/scan') {
      return pathname === '/result' || pathname === '/scan';
    }
    return pathname === path;
  };

  return (
    <NavContainer aria-label="하단 메뉴">
      {tabs.map((tab) => {
        const isActive = getIsActive(tab.path);
        const IconComponent = tab.icon;

        return (
          <NavItem
            key={tab.name}
            to={tab.path}
            className={isActive ? 'active' : ''}
            aria-current={isActive ? 'page' : undefined}
          >
            <IconComponent />
            <span>{tab.name}</span>
          </NavItem>
        );
      })}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  width: 100%;
  height: 82px;
  padding: 9px 12px 7px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: sticky;
  bottom: 0;
  z-index: 25;
  background: #fff;
  box-shadow: 0 -10px 28px rgba(91, 56, 34, 0.10);
  border-radius: 26px 26px 0 0;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  color: #9f938a;
  font-size: 9px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;

  svg {
    width: 19px;
    height: 19px;
  }

  &.active {
    color: #7a4d2e;

    svg {
      width: 40px;
      height: 40px;
      padding: 10px;
      border-radius: 50%;
      background: #98623c;
      color: #fff;
      box-sizing: border-box;
    }
  }
`;
