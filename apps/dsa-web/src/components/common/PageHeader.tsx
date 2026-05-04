import type React from 'react';
import { Typography, Flex } from 'antd';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  actions,
  className,
}) => (
  <Flex justify="space-between" align="start" className={className}>
    <div>
      {eyebrow ? (
        <Typography.Text type="secondary" className="text-xs uppercase tracking-wider">
          {eyebrow}
        </Typography.Text>
      ) : null}
      <Typography.Title level={3} className="mt-1 mb-0">
        {title}
      </Typography.Title>
      {description ? <Typography.Text type="secondary">{description}</Typography.Text> : null}
    </div>
    {actions}
  </Flex>
);
