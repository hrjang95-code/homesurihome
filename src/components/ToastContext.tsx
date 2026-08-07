import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ((message: string) => void) => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.showToast;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setIsVisible(true);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 1800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastWrapper $show={isVisible} role="status" aria-live="polite">
        {message}
      </ToastWrapper>
    </ToastContext.Provider>
  );
};

const ToastWrapper = styled.div<{ $show: boolean }>`
  position: absolute; /* app-shell의 overflow:hidden과 relative 기준 하단 정렬 */
  left: 50%;
  bottom: 104px;
  z-index: 100;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.colors.toastBg};
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  
  /* 애니메이션 */
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translate(-50%, ${({ $show }) => ($show ? '0' : '20px')});
  transition: opacity 0.25s ease, transform 0.25s ease;
  
  /* 실제 opacity가 0일 때는 숨겨줌 */
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
`;
