import type React from 'react';
import { Alert, Button } from 'antd';

interface SettingsAlertProps {
  title: string;
  message: string;
  variant?: 'error' | 'success' | 'warning';
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const typeMap: Record<string, 'error' | 'success' | 'warning'> = {
  error: 'error',
  success: 'success',
  warning: 'warning',
};

export const SettingsAlert: React.FC<SettingsAlertProps> = ({
  title,
  message,
  variant = 'error',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <Alert
      type={typeMap[variant]}
      message={title}
      description={message}
      showIcon
      className={className}
      action={
        actionLabel && onAction ? (
          <Button size="small" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : undefined
      }
    />
  );
};
