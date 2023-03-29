import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';

import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  getItem('Quản lý sản phẩm', '1', <AppstoreOutlined />, [
    getItem('Thêm sản phẩm', '/admin/product/add'),
    getItem('Quản lý sản phẩm', '/admin/products'),
  ]),
  getItem('Quản lý người dùng', '2', <MailOutlined />, [
    getItem('Thêm người dùng', '/admin/user/add'),
    getItem('Quản lý người dùng', '/admin/users'),
  ]),
];

const Sidebars: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebars;
