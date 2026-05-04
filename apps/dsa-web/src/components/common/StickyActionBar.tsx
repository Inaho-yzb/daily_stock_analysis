import type React from 'react';
import { Affix } from 'antd';

interface StickyActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export const StickyActionBar: React.FC<StickyActionBarProps> = ({ children, className }) => (
  <Affix offsetBottom={16} className={className}>
    {children}
  </Affix>
);
