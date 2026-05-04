import type React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckboxProps {
  label?: string;
  containerClassName?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  containerClassName = '',
  onChange,
  checked,
  disabled,
  id,
}) => {
  return (
    <div className={containerClassName}>
      <AntdCheckbox
        id={id}
        className={className}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      >
        {label}
      </AntdCheckbox>
    </div>
  );
};
