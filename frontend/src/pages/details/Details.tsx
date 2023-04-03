import './style.scss';

import { Button, Col, Divider, Row, Typography } from 'antd';
import React, { useState } from 'react';

import Slider from 'react-slick';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'left' }}>
        <Typography.Title level={2} className="text-lg text-left">
          Samsung Galaxy A73 (5G) 256GB
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row>
          <Col span={8} style={{ height: '100vh' }}>
            Lorem ipsum dolor sit amet.
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24} className="mb-7">
                <div className="flex gap-x-5 items-center">
                  <Typography.Title level={3} style={{ margin: 0 }} className="!text-primary">
                    12.000.000đ
                  </Typography.Title>
                  <Typography.Title
                    level={3}
                    style={{ margin: 0, textDecoration: 'line-through' }}
                    className="!text-base"
                  >
                    12.000.000đ
                  </Typography.Title>
                </div>
              </Col>
              <Col span={24}>
                <Typography.Text>
                  Mô tả ngắn: Trước khi mua bất kỳ chiếc điện thoại nào, người dùng cũng sẽ quan tâm
                  đến thiết kế sản phẩm trước. Với phiên bản A73, Samsung đã tạo nên một chiếc
                  smartphone với vẻ ngoài mang đến cảm giác sang trọng và tinh tế.
                </Typography.Text>
              </Col>
              <Col
                span={24}
                style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                <h1 className="mt-auto">hihi</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Typography.Title level={3} className="!text-center !text-primary">
          Đặc điểm nổi bật
        </Typography.Title>
        <Row>
          <Col>
            <Typography.Text>
              Camera chất lượng, bắt trọn từng khoảng khắc - Cụm 4 camera với cảm biến chính lên đến
              108 MP
            </Typography.Text>
            <br />
            <Typography.Text>
              Thưởng thức không gian giải trí cực đỉnh - Màn hình lớn 6.7 inch, độ phân giải Full
              HD+, 120Hz mượt mà
            </Typography.Text>
            <br />
            <Typography.Text>
              Cấu hình Galaxy A73 5G được nâng cấp mạnh với chip Snapdragon 778G, RAM lên đến 8 GB
            </Typography.Text>
            <br />
            <Typography.Text>
              Chiến game thoải mái không lo gián đoạn - Viên pin lớn 5000 mAh, hỗ trợ sạc nhanh 25 W
            </Typography.Text>
          </Col>
          <Col span={24}>
            Năm 2022 hứa hẹn sẽ là một năm rất đáng trông đợi đối với những ai là fan của thương
            hiệu điện thoại Samsung. Mới đây, hãng sẽ tiếp tục cho ra mắt nhiều smartphone với sự
            cải tiến trong thiết kế và cấu hình, trong đó phải kể đến chiếc Samsung Galaxy A73 với
            nhiều cải tiến so với thế hệ trước. Vậy sản phẩm có gì nổi bật, giá bao nhiêu và liệu có
            nên mua không? Tìm hiểu ngay nhé!
          </Col>
          <Button type="primary" className="!bg-blue-500 mx-auto">
            Load more
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default Details;
