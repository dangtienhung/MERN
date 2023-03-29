import { Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

interface IProductInfo {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductPreview = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<IProductInfo>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        if (res.status === 200) {
          setProductInfo(res.data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-3">
      <Row gutter={20}>
        <Col span={12}>
          <Typography.Title>{productInfo?._id}</Typography.Title>
        </Col>
        <Col span={12}>
          <Typography.Title>{productInfo?.name}</Typography.Title>
        </Col>
        <Col span={12}>
          <Typography.Title>{productInfo?.description}</Typography.Title>
        </Col>
        <Col span={12}>
          <Typography.Title>{productInfo?.price}</Typography.Title>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPreview;
