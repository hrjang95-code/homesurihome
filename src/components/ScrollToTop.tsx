import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // app-shell 이나 viewport 스크롤 초기화
    window.scrollTo(0, 0);
    
    // 모바일 셸 내부 컨테이너 스크롤도 리셋 (필요할 경우)
    const shell = document.querySelector('.app-shell');
    if (shell) {
      shell.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};
