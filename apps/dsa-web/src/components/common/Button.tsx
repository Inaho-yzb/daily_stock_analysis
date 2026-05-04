import React from 'react';
import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';

type LegacyVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'gradient'
  | 'danger'
  | 'danger-subtle'
  | 'settings-primary'
  | 'settings-secondary'
  | 'action-primary'
  | 'action-secondary'
  | 'home-action-ai'
  | 'home-action-report';

type LegacySize = 'xsm' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  variant?: LegacyVariant;
  size?: LegacySize;
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: unknown;
}

const SIZE_MAP: Record<string, AntdButtonProps['size']> = {
  xsm: 'small',
  sm: 'small',
  md: 'middle',
  lg: 'large',
  xl: 'large',
};

function mapLegacyVariant(
  v: LegacyVariant
): Pick<AntdButtonProps, 'type' | 'danger'> {
  switch (v) {
    case 'primary':
    case 'gradient':
    case 'settings-primary':
    case 'action-primary':
    case 'home-action-ai':
      return { type: 'primary' };
    case 'danger':
      return { type: 'primary', danger: true };
    case 'danger-subtle':
      return { type: 'default', danger: true };
    case 'ghost':
      return { type: 'text' };
    case 'secondary':
    case 'outline':
    case 'settings-secondary':
    case 'action-secondary':
    case 'home-action-report':
    default:
      return { type: 'default' };
  }
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  style,
  type: htmlType = 'button',
  children,
  ...rest
}) => {
  const { type, danger } = mapLegacyVariant(variant);

  return (
    <AntdButton
      type={type}
      danger={danger}
      size={SIZE_MAP[size]}
      loading={isLoading}
      htmlType={htmlType}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};
