import type React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';

const { Content } = Layout;

export const Shell: React.FC = () => {
  return (
    <Layout className="min-h-screen bg-background">
      <TopNav />
      <Layout className="bg-background mx-auto w-full max-w-[1680px] px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
        <Content className="min-h-0 min-w-0 flex-1">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
