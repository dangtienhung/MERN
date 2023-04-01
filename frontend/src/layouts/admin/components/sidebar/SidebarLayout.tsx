import {
  LaptopOutlined,
  MobileOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';

import React from 'react';

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const menuLinks = [
  {
    key: '1',
    label: 'Điện thoại',
    icon: <MobileOutlined />,
    children: [
      {
        key: '1.1',
        label: 'Danh sách sản phẩm',
        link: '/admin/products',
      },
      {
        key: '1.2',
        label: 'Thêm sản phẩm',
        link: '/admin/products/add',
      },
      {
        key: '1.3',
        label: 'Danh sách thương hiệu',
        link: '/admin/brands',
      },
    ],
  },
  {
    key: '2',
    label: 'Laptop',
    icon: <LaptopOutlined />,
  },
];

const items2: MenuProps['items'] = [MobileOutlined, UserOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const SidebarLayout = () => {
  return (
    <Layout.Sider width={260}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        className="select-none"
        items={menuLinks}
      />
    </Layout.Sider>
  );
};

export default SidebarLayout;
