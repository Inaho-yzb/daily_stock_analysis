import type React from 'react';
import { Select as AntdSelect } from 'antd';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  label,
  placeholder = '请选择',
  disabled = false,
  className = '',
}) => {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      ) : null}
      <AntdSelect
        id={id}
        value={value || undefined}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: '100%' }}
      />
    </div>
  );
};
