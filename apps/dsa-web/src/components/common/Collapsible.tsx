import type React from 'react';
import { Collapse } from 'antd';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultOpen = false,
  icon,
  className = '',
}) => {
  return (
    <Collapse
      defaultActiveKey={defaultOpen ? ['panel'] : []}
      className={className}
      expandIconPosition="end"
      items={[
        {
          key: 'panel',
          label: (
            <span className="flex items-center gap-2">
              {icon}
              {title}
            </span>
          ),
          children,
        },
      ]}
    />
  );
};
