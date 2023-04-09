import './style.scss';

import {
  Card,
  Carousel,
  Col,
  Image,
  Pagination,
  PaginationProps,
  Rate,
  Row,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

import { IProduct } from '../../interfaces/product';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { getAllProducts } from '../../api/products';

const contentStyle: React.CSSProperties = {
  height: '460px',
  width: '100%',
};

const HomeComponent: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = products.slice(startIndex, startIndex + pageSize);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        if (response && response.data) {
          const { products } = response.data;
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="mt-8">
        <Carousel autoplay effect="scrollx" dots={false}>
          <div style={contentStyle}>
            <Image
              src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/redmi-note12-pre-sliding-0034.png"
              className="object-cover w-full h-full rounded"
              alt="ahihh"
              preview={false}
            />
          </div>

          <div style={contentStyle}>
            <Image
              src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/oppo-flip-pre-order-sliding-new.png"
              className="object-cover w-full h-full"
              alt="ahihh"
              preview={false}
            />
          </div>
        </Carousel>
      </div>
      <Row className="mt-5">
        <Col span={24}>
          <Typography.Title level={4}>ĐIỆN THOẠI NỔI BẬT NHẤT</Typography.Title>
          <Row gutter={[16, 16]}>
            {visibleData.map((item, index) => (
              <Col span={6} key={index}>
                <Card
                  hoverable
                  cover={
                    <Link to={`/${item._id}`} className="inline-block w-full">
                      <img
                        alt="example"
                        src={item.images[0].thumb_url}
                        className="w-full h-[260px] object-cover mx-auto"
                      />
                    </Link>
                  }
                >
                  <Link to={`/${item._id}`}>
                    <Typography.Title level={5} className="line-clamp-1">
                      {item.name}
                    </Typography.Title>
                    <div className="flex items-center justify-between">
                      <Typography.Text type="danger">{item.price}đ</Typography.Text>
                      <Typography.Text type="secondary" className="text-sm">
                        {item.original_price}
                      </Typography.Text>
                    </div>
                  </Link>
                  <div className="flex justify-between mt-3">
                    <div className="gap-x-1 flex">
                      <Rate defaultValue={Math.floor(Math.random() * 5) + 1} />
                    </div>
                    <span>{Math.floor(Math.random() * 100)} đánh giá</span>
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
            total={products.length}
            pageSize={pageSize}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomeComponent;
