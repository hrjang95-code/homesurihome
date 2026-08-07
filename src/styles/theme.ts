import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#7A5230',       // 브라운 700
    primaryDark: '#4F2D1B',   // 브라운 900
    primaryLight: '#98623C',  // 브라운 600
    accent: '#F7BD4C',        // 옐로우/골드
    cream: '#FBF7F2',         // 아이보리 배경
    white: '#FFFFFF',
    text: '#2B211C',          // 다크 브라운 텍스트
    muted: '#8E7E73',         // 회갈색 텍스트
    divider: '#DFD4CB',
    toastBg: '#3C2B20',
  },
  shadows: {
    default: '0 14px 32px rgba(106, 72, 45, 0.12)',
    soft: '0 8px 20px rgba(106, 72, 45, 0.08)',
    bottomNav: '0 -10px 28px rgba(91, 56, 34, 0.10)',
    shell: '0 0 36px rgba(84, 57, 39, 0.13)',
  },
  borderRadius: {
    card: '20px',
    button: '15px',
    pill: '999px',
  }
};
