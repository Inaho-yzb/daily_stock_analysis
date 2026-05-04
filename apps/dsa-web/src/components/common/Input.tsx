import React from 'react';
import { Input as AntdInput, Flex } from 'antd';
import type { InputRef } from 'antd';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  trailingAction?: React.ReactNode;
  allowTogglePassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  className = '',
  id,
  trailingAction,
  allowTogglePassword,
  ...props
}) => {
  const isPassword = props.type === 'password';
  const inputRef = React.useRef<InputRef>(null);

  if (isPassword && allowTogglePassword) {
    const passProps = props as Record<string, unknown>;
    return (
      <Flex vertical gap={4}>
        {label ? (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        ) : null}
        <AntdInput.Password
          ref={inputRef}
          id={id}
          className={className}
          visibilityToggle
          {...passProps}
        />
        {error ? (
          <span role="alert" className="text-xs text-red-400">
            {error}
          </span>
        ) : hint ? (
          <span className="text-xs text-secondary-text">{hint}</span>
        ) : null}
      </Flex>
    );
  }

  const inputProps = props as Record<string, unknown>;
  return (
    <Flex vertical gap={4}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      ) : null}
      <AntdInput
        ref={inputRef}
        id={id}
        className={className}
        status={error ? 'error' : undefined}
        suffix={trailingAction}
        {...inputProps}
      />
      {error ? (
        <span role="alert" className="text-xs text-red-400">
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs text-secondary-text">{hint}</span>
      ) : null}
    </Flex>
  );
};
