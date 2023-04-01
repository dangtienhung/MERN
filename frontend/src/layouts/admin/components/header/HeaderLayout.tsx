import { Input, Layout, Menu, Typography } from 'antd';

import { Link } from 'react-router-dom';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

const HeaderLayout = () => {
  return (
    <Layout.Header
      className="header bg-primary-admin text-white h-[64px] flex items-center"
      style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between items-center flex-1">
        <Link to="/admin/dashboard" className="flex items-center gap-[12px] h-[57px] w-[57px]">
          <img src="/anhhtus-logo_2.png" alt="logo" className="h-full w-full object-cover" />
          Dashboard
        </Link>

        <div className="!w-[500px]">
          <Input size="large" placeholder="Search" className="w-full" prefix={<SearchOutlined />} />
        </div>

        <div>
          <Typography.Title level={5} className="!mb-0 !text-white">
            Welcome, Dang Tien Hung
          </Typography.Title>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderLayout;
