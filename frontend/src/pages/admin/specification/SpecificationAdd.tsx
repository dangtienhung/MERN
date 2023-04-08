import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { IAttribute } from '../../../interfaces/attribute';
import { ISpecification } from '../../../interfaces/specification';
import { createSpecification } from '../../../api/specification';
import { getAllAttributes } from '../../../api/attribute';
import { toast } from 'react-toastify';

const SpecificationAdd = () => {
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const onFinish = async (values: ISpecification) => {
    try {
      const response = await createSpecification(values);
      if (response && response.data) {
        toast.success('Thêm thành công');
        navigate('/admin/manager-specifications');
      }
    } catch (error) {
      toast.error('Thêm thất bại');
    }
  };
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await getAllAttributes();
        if (response && response.data) {
          const { atributes } = response.data;
          setAttributes(atributes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttributes();
  }, []);
  return (
    <Row>
      <Col span={24}>
        <div className="flex items-center justify-between">
          <Typography.Title level={3}>Thêm Specification</Typography.Title>
          <Link to={'/admin/manager-specifications'}>Trở về</Link>
        </div>
      </Col>
      <Col span={24}>
        <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item
                label="Tên"
                name={'name'}
                rules={[{ required: true, message: 'Không được bỏ trống!' }]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Attribute"
                name={'attributes'}
                rules={[{ required: true, message: 'Không được bỏ trống!' }]}
              >
                <Select placeholder="Chọn">
                  {attributes.map((attribute) => {
                    return (
                      <Select.Option value={attribute._id} key={attribute._id}>
                        {attribute.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col span={24} className="text-center">
              <Button htmlType="submit" type="primary" className="bg-blue-500">
                Thêm
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default SpecificationAdd;
