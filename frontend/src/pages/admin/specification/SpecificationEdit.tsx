import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getSpecification, updateSpecification } from '../../../api/specification';

import { IAttribute } from '../../../interfaces/attribute';
import { ISpecification } from '../../../interfaces/specification';
import { getAllAttributes } from '../../../api/attribute';
import { toast } from 'react-toastify';

const SpecificationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specification, setSpecification] = useState<ISpecification>();
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await getSpecification(id);
        if (response && response.data) {
          setSpecification(response.data);
        }
      } catch (error) {
        toast.error('Lỗi khi lấy dữ liệu');
      }
    };
    fetchData();
  }, []);
  const onFinish = async (value: ISpecification) => {
    try {
      if (!id) return;
      const response = await updateSpecification(id, value);
      if (response && response.data) {
        toast.success('Cập nhật thành công');
        navigate('/admin/manager-specifications');
      }
    } catch (error) {
      toast.error('Lỗi khi lấy dữ liệu');
    }
  };
  if (!specification) return <div>Loading...</div>;
  const intialValues = {
    name: specification.name,
    attributes: specification.attributes._id,
  };
  return (
    <Row>
      <Col span={24}>
        <div className="flex items-center justify-between">
          <Typography.Title level={3}>Thêm Specification</Typography.Title>
          <Link to={'/admin/manager-specifications'}>Trở về</Link>
        </div>
      </Col>
      <Col span={24}>
        <Form layout="vertical" autoComplete="off" onFinish={onFinish} initialValues={intialValues}>
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

export default SpecificationEdit;
