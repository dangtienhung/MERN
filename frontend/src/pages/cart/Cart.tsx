import { Col, Image, Row, Typography } from 'antd';

import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const CartPage = () => {
  return (
    <div className="min-h-screen">
      <Row className="mt-5">
        <Col span={24}>
          <Row>
            <Col span={4}>
              <Link to="/" className="gap-x-2 flex items-center justify-center">
                <LeftOutlined />
                Quay lại
              </Link>
            </Col>
            <Col span={20}>
              <Typography.Title level={3} className="text-center">
                Giỏ hàng
              </Typography.Title>
            </Col>
          </Row>
        </Col>
        <Col span={6}></Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Image
                    src="https://sgmall.vn/wp-content/uploads/2019/06/iphone-11-sgmall.jpg"
                    alt="image"
                    className="object-cover h-[200px] w-[200px]"
                  />
                </Col>
                <Col span={12}>
                  <Typography.Title>ahihii</Typography.Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};

export default CartPage;
