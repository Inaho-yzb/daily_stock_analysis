import type React from 'react';
import { Card } from 'antd';

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  hint,
  icon,
  className,
}) => (
  <Card className={className}>
    <div className="text-xs text-secondary-text mb-1">{label}</div>
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xl font-semibold">{value}</span>
      {hint ? <span className="text-xs text-secondary-text">{hint}</span> : null}
    </div>
  </Card>
);
