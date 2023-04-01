import HeaderLayout from './components/header';
import { Layout } from 'antd';
import MainLayout from './components/main';
import React from 'react';
import SidebarLayout from './components/sidebar';

const LayoutAdmin: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderLayout />
      <Layout>
        <SidebarLayout />
        <MainLayout />
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
