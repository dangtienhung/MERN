import {
  LaptopOutlined,
  MobileOutlined,
  NotificationOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const items: MenuProps['items'] = [
  getItem(<Link to="/admin/dashboard">Dashboard</Link>, '/admin/dashboard', <LaptopOutlined />),
  getItem('Quản lý chung', '/admin/managers', <LaptopOutlined />, [
    getItem(
      <Link to="/admin/managers-brands">Quản lý nhãn hàng</Link>,
      '/admin/managers-brands',
      <LaptopOutlined />
    ),
    getItem(
      <Link to="/admin/managers-categories">Quản lý danh mục</Link>,
      '/admin/managers-categories',
      <LaptopOutlined />
    ),
    getItem(
      <Link to="/admin/manager-specifications">Quản lý danh mục</Link>,
      '/admin/manager-specifications',
      <LaptopOutlined />
    ),
    getItem(
      <Link to="/admin/manager-carts">Quản lý danh mục</Link>,
      '/admin/manager-carts',
      <ShoppingCartOutlined />
    ),
  ]),
  getItem('Điện thoại', 'mobile', <MobileOutlined />, [
    getItem(<Link to="/admin/mobile">Danh sách điện thoại</Link>, '/admin/mobile'),
    getItem(<Link to="/admin/mobile/add">Thêm điện thoại</Link>, '/admin/mobile/add'),
  ]),
  getItem('Laptop', 'laptop', <LaptopOutlined />, [
    getItem(<Link to="/admin/laptop">Danh sách laptop</Link>, '/admin/laptop'),
    getItem(<Link to="/admin/laptop/add">Thêm laptop</Link>, '/admin/laptop/add'),
  ]),
  getItem('Phụ kiện', 'accessories', <NotificationOutlined />, [
    getItem(<Link to="/admin/accessories">Danh sách phụ kiện</Link>, '/admin/accessories'),
    getItem(<Link to="/admin/accessories/add">Thêm phụ kiện</Link>, '/admin/accessories/add'),
  ]),
  getItem('Tài khoản', 'account', <UserOutlined />, [
    getItem(<Link to="/admin/account">Danh sách tài khoản</Link>, '/admin/account'),
    getItem(<Link to="/admin/account/add">Thêm tài khoản</Link>, '/admin/account/add'),
  ]),
];
