import type React from 'react';
import { Empty } from 'antd';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <Empty
      image={icon || Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <>
          <div style={{ fontWeight: 600, marginBottom: description ? 4 : 0 }}>
            {title}
          </div>
          {description ? (
            <div style={{ fontSize: 13, color: 'var(--text-secondary-text)' }}>
              {description}
            </div>
          ) : null}
        </>
      }
      className={className}
    >
      {action}
    </Empty>
  );
};
