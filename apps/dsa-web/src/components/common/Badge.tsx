import React from 'react';
import { Tag } from 'antd';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'history';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

const COLOR_MAP: Record<BadgeVariant, string> = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  info: 'processing',
  history: 'purple',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...rest
}) => {
  return (
    <Tag
      color={COLOR_MAP[variant]}
      className={cn(size === 'sm' ? 'text-xs' : 'text-sm', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
