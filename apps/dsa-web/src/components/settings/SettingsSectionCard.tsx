import type React from 'react';
import { Card } from 'antd';

interface SettingsSectionCardProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SettingsSectionCard: React.FC<SettingsSectionCardProps> = ({
  title,
  description,
  actions,
  children,
  className = '',
}) => {
  return (
    <Card
      title={
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider">
            {title}
          </span>
          {description ? (
            <p className="text-xs font-normal normal-case text-muted-text mt-1">
              {description}
            </p>
          ) : null}
        </div>
      }
      extra={actions}
      className={className}
    >
      {children}
    </Card>
  );
};
