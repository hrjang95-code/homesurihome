import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      accent: string;
      cream: string;
      white: string;
      text: string;
      muted: string;
      divider: string;
      toastBg: string;
    };
    shadows: {
      default: string;
      soft: string;
      bottomNav: string;
      shell: string;
    };
    borderRadius: {
      card: string;
      button: string;
      pill: string;
    };
  }
}
