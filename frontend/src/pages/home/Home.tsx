import { Card, Carousel, Col, Image, Pagination, PaginationProps, Row, Typography } from 'antd';

import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { useState } from 'react';

const contentStyle: React.CSSProperties = {
  height: '460px',
  width: '100%',
  objectFit: 'cover',
};

const linkImages = [
  {
    id: 1,
    image: '/image 1.png',
  },
  {
    id: 2,
    image: '/image 2.png',
  },
  {
    id: 3,
    image: '/Rectangle (1).png',
  },
];

const HomeComponent: React.FC = () => {
  const [data] = useState(Array(13).fill(null));
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = data.slice(startIndex, startIndex + pageSize);
  return (
    <>
      <Row className="mt-5">
        <Col>
          <Carousel autoplay dots={false}>
            {linkImages.map((item) => (
              <div key={item.id}>
                <div style={contentStyle}>
                  <Image src={item.image} alt="" preview={false} />
                </div>
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col span={24}>
          <Typography.Title level={4}>ĐIỆN THOẠI NỔI BẬT NHẤT</Typography.Title>
          <Row gutter={[16, 16]}>
            {visibleData.map((item, index) => (
              <Col span={6} key={index}>
                <Card
                  hoverable
                  cover={
                    <Link to="/ahihi" className="w-full inline-block">
                      <img
                        alt="example"
                        src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/_/1_252.jpg"
                        className="w-[260px] h-[260px] object-cover mx-auto"
                      />
                    </Link>
                  }
                >
                  <Link to="/abcba">
                    <Typography.Title level={5} className="line-clamp-2">
                      Samsung Galaxy S22 Plus (8GB + 128GB)
                    </Typography.Title>
                    <div className="flex justify-between items-center">
                      <Typography.Text type="danger">20.190.000 ₫</Typography.Text>
                      <Typography.Text type="secondary" className="text-sm">
                        25.990.000 ₫
                      </Typography.Text>
                    </div>
                  </Link>
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-x-1">
                      {Array(5)
                        .fill(null)
                        .map((item, index) => (
                          <StarFilled key={index} />
                        ))}
                    </div>
                    <span>1 đánh giá</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={24} className="mt-10 text-center">
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            onChange={onChange}
            total={data.length}
            pageSize={pageSize}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomeComponent;
