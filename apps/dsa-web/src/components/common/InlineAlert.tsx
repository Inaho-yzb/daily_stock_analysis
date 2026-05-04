import type React from 'react';
import { Alert } from 'antd';

type InlineAlertVariant = 'info' | 'success' | 'warning' | 'danger';

interface InlineAlertProps {
  title?: string;
  message: React.ReactNode;
  variant?: InlineAlertVariant;
  action?: React.ReactNode;
  className?: string;
}

const TYPE_MAP: Record<InlineAlertVariant, 'info' | 'success' | 'warning' | 'error'> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
};

export const InlineAlert: React.FC<InlineAlertProps> = ({
  title,
  message,
  variant = 'info',
  action,
  className = '',
}) => {
  return (
    <Alert
      type={TYPE_MAP[variant]}
      message={title || message}
      description={title ? message : undefined}
      action={action}
      className={className}
      showIcon
    />
  );
};
