import type React from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { lightTheme } from './antdTheme';

type AntdThemeProviderProps = {
  children: React.ReactNode;
};

export const AntdThemeProvider: React.FC<AntdThemeProviderProps> = ({
  children,
}) => {
  return (
    <ConfigProvider theme={lightTheme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
};
