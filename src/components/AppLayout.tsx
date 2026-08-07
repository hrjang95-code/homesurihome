import React from 'react';
import '../styles/common.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <div className="app-shell">{children}</div>;
};
