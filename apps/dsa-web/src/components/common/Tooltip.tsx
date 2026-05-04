import type React from 'react';
import { Tooltip as AntdTooltip } from 'antd';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
  className?: string;
  contentClassName?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  className = '',
  contentClassName = '',
}) => {
  return (
    <AntdTooltip
      title={content}
      placement={side}
      overlayClassName={contentClassName}
    >
      <span className={className}>{children}</span>
    </AntdTooltip>
  );
};
