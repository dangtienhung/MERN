import { Button, Form, Input, Layout, Menu, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const HeaderLayout = () => {
  const [value, setValue] = useState('');
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?q=${value}`);
      if (response && response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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

        <div className="!w-[500px] gap-x-2 flex justify-center items-center">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            className="w-full"
            prefix={<SearchOutlined />}
          />
          <Button className="flex justify-center items-center" onClick={handleSubmit}>
            <SearchOutlined />
          </Button>
        </div>

        <div>
          <Typography.Title level={5} className="!mb-0 !text-white cursor-pointer">
            Welcome, Admin
          </Typography.Title>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderLayout;
