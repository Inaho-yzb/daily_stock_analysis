import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="API Key" name="api_key" />);

    expect(screen.getByText('API Key')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with hint text', () => {
    render(<Input label="API Key" hint="Stored locally" name="api_key" />);

    expect(screen.getByText('Stored locally')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Input label="Code" error="Required" name="stock_code" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('renders a trailing action when provided', () => {
    render(
      <Input
        label="Password"
        name="password"
        trailingAction={<button type="button">显示</button>}
      />
    );

    expect(screen.getByRole('button', { name: '显示' })).toBeInTheDocument();
  });

  it('renders password input with toggle', () => {
    render(<Input label="密码" type="password" allowTogglePassword />);

    const input = screen.getByLabelText('密码');
    expect(input).toHaveAttribute('type', 'password');
  });
});
