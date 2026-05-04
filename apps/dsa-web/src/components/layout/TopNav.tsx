import { useState } from 'react';
import { Badge, Button, Drawer, Flex, Menu, Modal } from 'antd';
import type { MenuProps } from 'antd';
import {
  BarChartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAgentChatStore } from '../../stores/agentChatStore';

const NAV_ITEMS: MenuProps['items'] = [
  { key: '/', icon: <HomeOutlined />, label: '首页' },
  { key: '/chat', icon: <MessageOutlined />, label: '问股' },
  { key: '/portfolio', icon: <WalletOutlined />, label: '持仓' },
  { key: '/backtest', icon: <BarChartOutlined />, label: '回测' },
  { key: '/settings', icon: <SettingOutlined />, label: '设置' },
];

export const TopNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authEnabled, logout } = useAuth();
  const completionBadge = useAgentChatStore((state) => state.completionBadge);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const selectedKey = '/' + location.pathname.split('/')[1];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    setMobileOpen(false);
  };

  const menuItems = NAV_ITEMS.map((item) => {
    if (item?.key === '/chat' && completionBadge) {
      return {
        ...item,
        label: (
          <Flex gap={4} align="center">
            <span>问股</span>
            <Badge dot size="small" />
          </Flex>
        ),
      };
    }
    return item;
  });

  return (
    <>
      {/* Desktop top nav */}
      <header className="sticky top-0 z-50 hidden border-b border-border/70 bg-background/85 backdrop-blur-md lg:block">
        <div className="mx-auto flex h-14 max-w-[1680px] items-center gap-6 px-5">
          <Flex className="shrink-0" align="center" gap={10}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-gradient text-[hsl(var(--primary-foreground))] shadow-[0_8px_20px_var(--nav-brand-shadow)]">
              <BarChartOutlined className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-foreground">DSA</span>
          </Flex>

          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
            className="flex-1 border-0 bg-transparent"
            style={{ borderBottom: 'none' }}
          />

          <Flex align="center" gap={8}>
            {authEnabled ? (
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => setShowLogoutConfirm(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-secondary-text hover:text-foreground"
                aria-label="退出登录"
              />
            ) : null}
          </Flex>
        </div>
      </header>

      {/* Mobile header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/70 bg-background/85 px-4 py-2 backdrop-blur-md lg:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileOpen(true)}
          className="h-10 w-10 rounded-xl"
          aria-label="打开导航菜单"
        />
        <Flex align="center" gap={8}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-gradient text-[hsl(var(--primary-foreground))]">
            <BarChartOutlined className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-foreground">DSA</span>
        </Flex>
      </header>

      {/* Mobile drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="导航菜单"
        placement="left"
        width={280}
        styles={{ body: { padding: 0 } }}
      >
        <div className="flex h-full flex-col p-4">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
            className="flex-1 border-0 bg-transparent"
            style={{ borderInlineEnd: 'none' }}
          />
          {authEnabled ? (
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => setShowLogoutConfirm(true)}
              className="flex h-11 w-full items-center rounded-2xl text-secondary-text"
            >
              退出
            </Button>
          ) : null}
        </div>
      </Drawer>

      <Modal
        title="退出登录"
        open={showLogoutConfirm}
        onOk={() => {
          setShowLogoutConfirm(false);
          void logout();
        }}
        onCancel={() => setShowLogoutConfirm(false)}
        okText="确认退出"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      />
    </>
  );
};
