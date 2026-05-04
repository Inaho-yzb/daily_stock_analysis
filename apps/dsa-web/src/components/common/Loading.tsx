import type React from 'react';
import { Spin } from 'antd';

interface LoadingProps {
  label?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ label = '正在加载', className = '' }) => {
  return <Spin tip={label} className={className} />;
};
