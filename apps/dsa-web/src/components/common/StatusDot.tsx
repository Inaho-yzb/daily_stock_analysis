import type React from 'react';
import { Badge as AntdBadge } from 'antd';

type StatusDotTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: StatusDotTone;
  pulse?: boolean;
  className?: string;
}

const STATUS_MAP: Record<StatusDotTone, 'success' | 'warning' | 'error' | 'processing' | 'default'> = {
  success: 'success',
  warning: 'warning',
  danger: 'error',
  info: 'processing',
  neutral: 'default',
};

export const StatusDot: React.FC<StatusDotProps> = ({
  tone = 'neutral',
  className = '',
  ...rest
}) => {
  return (
    <AntdBadge
      status={STATUS_MAP[tone]}
      className={className}
      {...rest}
    />
  );
};
