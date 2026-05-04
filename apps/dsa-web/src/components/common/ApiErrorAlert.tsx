import type React from 'react';
import { Alert, Button } from 'antd';
import type { ParsedApiError } from '../../api/error';

interface ApiErrorAlertProps {
  error: ParsedApiError;
  className?: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissLabel?: string;
  onDismiss?: () => void;
}

export const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({
  error,
  className = '',
  actionLabel,
  onAction,
  dismissLabel = '关闭',
  onDismiss,
}) => {
  const showDetails =
    error.rawMessage.trim() &&
    error.rawMessage.trim() !== error.message.trim();

  const description = (
    <>
      <p>{error.message}</p>
      {showDetails ? (
        <details style={{ marginTop: 8 }}>
          <summary style={{ cursor: 'pointer', fontSize: 12, opacity: 0.8 }}>
            查看详情
          </summary>
          <pre
            style={{
              marginTop: 8,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: 11,
              opacity: 0.85,
            }}
          >
            {error.rawMessage}
          </pre>
        </details>
      ) : null}
    </>
  );

  const action =
    actionLabel && onAction ? (
      <Button size="small" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : undefined;

  return (
    <Alert
      type="error"
      message={error.title}
      description={description}
      closable={!!onDismiss}
      onClose={onDismiss}
      closeText={dismissLabel}
      action={action}
      className={className}
      showIcon
    />
  );
};
