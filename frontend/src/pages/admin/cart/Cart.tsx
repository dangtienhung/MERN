import { Button, Col, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    try {
    } catch (error) {
      toast.error('Lỗi khi lấy giỏ hàng');
    }
  }, []);
  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3}>Giỏ hàng</Typography.Title>
      </Col>
      <Col span={24}>
        <Space>
          <Button type="primary" className="bg-blue-500">
            Quản lý đơn hàng
          </Button>
          <Button type="primary" className="bg-blue-500">
            Thanh toán
          </Button>
        </Space>
      </Col>
      <Col span={24}></Col>
    </Row>
  );
};

export default Cart;
