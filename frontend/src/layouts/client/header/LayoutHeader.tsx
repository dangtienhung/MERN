import {
  AimOutlined,
  CarryOutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { Input } from 'antd';
import { Link } from 'react-router-dom';

const LayoutHeader = () => {
  return (
    <div className="flex h-[70px] justify-between items-center py-2 px-12 bg-primary text-white">
      <Link to="/" className="inline-block">
        <img src="/anhhtus-logo_2.png" alt="logo" className="h-16 w-16 object-cover" />
      </Link>
      <div className="flex-1 text-center">
        <Input placeholder="search" prefix={<SearchOutlined />} className="w-full max-w-xs" />
      </div>
      <div className="flex items-center gap-x-10">
        <div>
          <p>Gọi mua hàng</p>
          <p>1800.2097</p>
        </div>
        <Link to="/" className="flex items-center gap-x-3">
          <p>
            <AimOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </p>
          <div>
            <p>Cửa hàng</p>
            <p>gần bạn</p>
          </div>
        </Link>
        <div className="flex items-center gap-x-3">
          <p>
            <CarryOutOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </p>
          <div>
            <p>Tra cứu</p>
            <p>đơn hàng</p>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <p>
            <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </p>
          <div>
            <p>Giỏ</p>
            <p>hàng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
