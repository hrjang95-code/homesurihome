import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../components/ToastContext';
import { BottomNavigation } from '../components/BottomNavigation';

import logoBrand from '../assets/images/logo-brand.png';
import beaverLogin from '../assets/images/beaver-login.png';
import logoGoogle from '../assets/images/logo-google.png';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const showToast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast('이메일을 입력해주세요.');
      const emailInput = document.getElementById('email');
      emailInput?.focus();
      return;
    }

    if (!password.trim()) {
      showToast('비밀번호를 입력해주세요.');
      const pwInput = document.getElementById('password');
      pwInput?.focus();
      return;
    }

    showToast('로그인되었습니다.');
    setTimeout(() => {
      navigate('/result');
    }, 650);
  };

  const handleGoogleLogin = () => {
    showToast('Google 로그인은 준비 중입니다.');
  };

  const handlePlaceholderLink = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast('다음 단계에서 연결됩니다.');
  };

  return (
    <Container>
      <MainContent>
        <BrandVisual>
          <img src={logoBrand} alt="HOME SURI HOME 로고" />
        </BrandVisual>

        <CharacterVisual>
          <img src={beaverLogin} alt="망치를 들고 집을 수리하는 비버 캐릭터" />
        </CharacterVisual>

        <LoginCopy>
          <h1>사진 한 장으로, <em>집수리가 쉬워집니다.</em></h1>
          <p>AI가 문제를 분석하고, 해결 방법을 알려드려요.</p>
        </LoginCopy>

        <LoginCard>
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <FieldLabel htmlFor="email">이메일</FieldLabel>
              <FieldWrap>
                <Mail size={18} />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@homesuri.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldWrap>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="password">비밀번호</FieldLabel>
              <FieldWrap>
                <LockKeyhole size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordToggle
                  type="button"
                  onClick={handleTogglePassword}
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </PasswordToggle>
              </FieldWrap>
            </FieldGroup>

            <LoginButton type="submit">로그인</LoginButton>

            <Divider>
              <span>간편 로그인</span>
            </Divider>

            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <img src={logoGoogle} alt="Google" />
              <span>Google로 계속하기</span>
            </GoogleButton>

            <AccountLinks>
              <a href="#" onClick={handlePlaceholderLink}>아이디/비밀번호 찾기</a>
              <a href="#" onClick={handlePlaceholderLink}>회원가입</a>
            </AccountLinks>
          </form>
        </LoginCard>

        <CustomerLink>
          도움이 필요하신가요?{' '}
          <a href="#" onClick={handlePlaceholderLink}>
            고객센터 문의하기
          </a>
        </CustomerLink>
      </MainContent>
      <BottomNavigation />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
`;

const BrandVisual = styled.div`
  width: 230px;
  margin-top: 36px;
  margin-bottom: 24px;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const CharacterVisual = styled.div`
  width: 250px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    height: 240px;
    object-fit: contain;
  }
`;

const LoginCopy = styled.section`
  text-align: center;
  margin-bottom: 28px;

  h1 {
    font-size: 23px;
    font-weight: 800;
    margin: 0 0 8px 0;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: -0.5px;
    line-height: 1.35;
  }

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  p {
    font-size: 13px;
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 700;
  }
`;

const LoginCard = styled.section`
  width: 100%;
  padding: 26px 24px 28px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

const FieldGroup = styled.div`
  margin-bottom: 18px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.muted};
`;

const FieldWrap = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;
  border-radius: 12px;
  background: #f8f5f0;
  border: 1px solid #ede4db;
  color: #8d8178;

  svg {
    flex-shrink: 0;
    margin-right: 12px;
  }

  input {
    flex: 1;
    height: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: #3a302a;
    font-size: 13px;

    &::placeholder {
      color: #b9ada4;
      opacity: 1;
    }
  }

  /* 패스워드 입력 스타일 */
  input[type='password'] {
    font-family: Arial, 'Noto Sans KR', sans-serif;
    font-size: 17px;
    letter-spacing: 3px;
    color: #8f837a;
  }
`;

const PasswordToggle = styled.button`
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border: 0;
  background: transparent;
  color: #8d8178;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 58px;
  margin-top: 26px;
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0 10px 22px rgba(242, 184, 62, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 12px 25px rgba(242, 184, 62, 0.34);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Divider = styled.div`
  margin: 22px 0 16px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  color: #5f554e;
  font-size: 12px;

  &::before,
  &::after {
    content: '';
    height: 1px;
    background: ${({ theme }) => theme.colors.divider};
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  color: #2f2925;
  font-size: 13px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 10px 24px rgba(106, 72, 45, 0.12);
  }

  &:active {
    transform: translateY(1px);
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
  }
`;

const AccountLinks = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 11px;
  font-weight: 800;

  a:first-child {
    color: #5e544d;
  }

  a:last-child {
    color: ${({ theme }) => theme.colors.primary};
  }

  a:hover {
    text-decoration: underline;
  }
`;

const CustomerLink = styled.p`
  width: 100%;
  margin: 34px 0 42px;
  text-align: center;
  color: #5e544d;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;
