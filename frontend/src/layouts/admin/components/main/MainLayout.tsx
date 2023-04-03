import { Breadcrumb, Layout, theme } from 'antd';

import { Outlet } from 'react-router-dom';
import React from 'react';

const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="site-layout">
      <Breadcrumb
        style={{ margin: '16px 24px' }}
        items={[{ title: 'home' }, { title: 'home' }, { title: 'home' }]}
      />
      <Layout.Content
        style={{
          padding: 24,
          margin: '0 16px',
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;
