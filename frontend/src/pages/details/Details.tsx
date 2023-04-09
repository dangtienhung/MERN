import './style.scss';

import { Button, Carousel, Col, Image, Row, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { IProduct } from '../../interfaces/product';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { getProductById } from '../../api/products';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await getProductById(id);
        if (response && response.data) {
          const { product } = response.data;
          setProduct(product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (!product)
    return (
      <Row>
        <Col span={24} style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </Col>
      </Row>
    );
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'left' }}>
        <Typography.Title level={2} className="text-lg text-left">
          {product?.name}
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={50}>
          <Col span={8}>
            <Carousel autoplay className="!rounded-lg">
              {product?.images.map((image) => (
                <div key={image._id} className="!rounded-lg">
                  <Image src={image.thumb_url} className="rounded-lg" />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24} className="mb-7">
                <div className="gap-x-5 flex items-center">
                  <Typography.Title level={3} style={{ margin: 0 }} className="!text-primary">
                    {product?.price} đ
                  </Typography.Title>
                  <Typography.Title
                    level={3}
                    style={{ margin: 0, textDecoration: 'line-through' }}
                    className="!text-base"
                  >
                    {product?.original_price} đ
                  </Typography.Title>
                </div>
              </Col>
              <Col span={24}>
                <Typography.Text>
                  <span className="text-primary">Trả góp 0%</span> - Thanh toán khi nhận hàng
                </Typography.Text>
              </Col>
              <Col span={24} className="mt-24">
                <Button
                  type="primary"
                  className="!rounded-lg bg-blue-500 flex justify-center items-center"
                >
                  <ShoppingCartOutlined />
                  Giỏ hàng
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24} className="mt-24">
        <Typography.Title level={3} className="!text-center !text-primary">
          Đặc điểm nổi bật
        </Typography.Title>
        <Row>
          <Col>
            <Typography.Text>{parse(product?.description)}</Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Details;
