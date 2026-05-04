import type React from 'react';
import { Card } from 'antd';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  actions,
  children,
  className,
}) => (
  <Card
    title={title}
    extra={
      subtitle ? (
        <span className="text-xs text-secondary-text">{subtitle}</span>
      ) : actions
    }
    className={className}
  >
    {children}
  </Card>
);
