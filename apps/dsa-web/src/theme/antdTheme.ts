import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const commonToken: ThemeConfig['token'] = {
  borderRadius: 16,
  fontFamily:
    '"Inter", "SF Pro Display", "Segoe UI", system-ui, -apple-system, sans-serif',
  fontSize: 14,
  controlHeight: 42,
  lineHeight: 1.5,
};

const commonComponents: ThemeConfig['components'] = {
  Button: {
    borderRadius: 14,
    controlHeight: 42,
    fontWeight: 600,
  },
  Card: {
    borderRadiusLG: 20,
  },
  Input: {
    borderRadius: 12,
    controlHeight: 44,
  },
  Tag: {
    borderRadiusSM: 8,
  },
  Modal: {
    borderRadiusLG: 20,
  },
  Menu: {
    itemBorderRadius: 12,
    itemHeight: 44,
  },
  Drawer: {
    borderRadiusLG: 20,
  },
  Alert: {
    borderRadiusLG: 16,
  },
};

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    ...commonToken,
    colorPrimary: '#00b8d9',
    colorBgBase: '#ffffff',
    colorBgLayout: '#ffffff',
    colorTextBase: '#141726',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBorder: '#cad1db',
    colorBorderSecondary: '#dde1e7',
    colorError: '#e83158',
    colorSuccess: '#1f9c55',
    colorWarning: '#f59b0a',
    colorInfo: '#00b8d9',
  },
  components: commonComponents,
};
