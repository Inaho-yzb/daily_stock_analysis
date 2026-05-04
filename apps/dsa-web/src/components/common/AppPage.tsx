import type React from 'react';

interface AppPageProps {
  children: React.ReactNode;
  className?: string;
}

export const AppPage: React.FC<AppPageProps> = ({ children, className }) => (
  <main className={className}>{children}</main>
);
