import type React from 'react';
import { Card as AntdCard } from 'antd';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'bordered' | 'gradient';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  style,
  variant = 'default',
  hoverable = false,
  padding = 'md',
}) => {
  const extra = subtitle ? (
    <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', opacity: 0.6 }}>
      {subtitle}
    </span>
  ) : undefined;

  return (
    <AntdCard
      title={title}
      extra={extra}
      hoverable={hoverable}
      bordered={variant === 'bordered'}
      className={className}
      style={style}
      styles={{
        body: padding === 'none' ? { padding: 0 } : undefined,
      }}
    >
      {children}
    </AntdCard>
  );
};
