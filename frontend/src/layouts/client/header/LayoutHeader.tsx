import {
  AimOutlined,
  CarryOutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Carousel, Col, Drawer, Form, Image, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '../../../redux/store';
import { getOneProductToCart } from '../../../redux/reducers/cartSlice';

const LayoutHeader = () => {
  /* redux */
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <>
      <div className="flex h-[70px] justify-between items-center py-2 px-12 bg-primary text-white">
        <Link to="/" className="inline-block">
          <img src="/anhhtus-logo_2.png" alt="logo" className="h-16 w-16 object-cover" />
        </Link>
        <div className="flex-1 text-center">
          <Form layout="vertical" onFinish={onFinish}>
            <Input placeholder="search" prefix={<SearchOutlined />} className="w-full max-w-xs" />
          </Form>
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
          <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => handleLogin()}>
            <p>
              <UserOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </p>
            <div>
              <p>Đăng nhập</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => showDrawer()}>
            <Badge count={cart.length}>
              <p>
                <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />
              </p>
            </Badge>
            <div>
              <p>Giỏ</p>
              <p>hàng</p>
            </div>
          </div>
        </div>
      </div>
      <Drawer title="Giỏ hàng" placement="right" onClose={onClose} open={open}>
        <Row gutter={16}></Row>
      </Drawer>
    </>
  );
};

export default LayoutHeader;
