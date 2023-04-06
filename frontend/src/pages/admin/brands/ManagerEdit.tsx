import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { getOneBrand, updateBrand } from '../../../api/brands';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IBrand } from '../../../interfaces/brands';
import { toast } from 'react-toastify';

const ManagerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [brand, setBrand] = useState<IBrand>();
  const onFinish = async (values: string) => {
    if (!id) return;
    try {
      const response = await updateBrand(id, values);
      if (response && response.data) {
        toast.success('Sửa thành công');
        navigate('/admin/managers-brands');
      }
    } catch (error) {
      toast.error('Sửa không thành công!');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await getOneBrand(id);
        if (response && response.data) {
          const { brand } = response.data;
          setBrand(brand);
        }
      } catch (error) {
        toast.error('Lỗi sản phẩm');
      }
    };
    fetchData();
  }, []);
  if (!brand) return <div>Loading...</div>;
  const initialValues = {
    name: brand.name,
  };
  return (
    <Row>
      <Col>
        <Typography.Title level={3}>Sửa nhãn hàng</Typography.Title>
      </Col>
      <Col span={24}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={initialValues}
        >
          <Form.Item
            label="Tên nhãn hàng"
            name="name"
            rules={[{ message: 'Không được bỏ trống', required: true }]}
          >
            <Input placeholder="Tên nhãn hàng" />
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit" className="bg-blue-500 mt-5 px-6">
              Sửa
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default ManagerEdit;
