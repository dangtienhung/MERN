import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { getAttribute, updateAttribute } from '../../../api/attribute';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IAttribute } from '../../../interfaces/attribute';
import { toast } from 'react-toastify';

const ManageEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const onFinish = async (values: IAttribute) => {
    try {
      if (!id) return;
      const response = await updateAttribute(id, values);
      if (response && response.data) {
        toast.success('Cập nhật danh mục thành công!');
        navigate('/admin/managers-categories');
      }
    } catch (error) {
      toast.error('Cập nhật danh mục thất bại!');
    }
  };
  const [attribute, setAttribute] = useState<IAttribute>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await getAttribute(id);
        if (response && response.data) {
          const { atribute } = response.data;
          setAttribute(atribute);
        }
      } catch (error) {
        toast.error('Cập nhật danh mục thất bại!');
      }
    };
    fetchData();
  }, []);
  if (!attribute) return null;
  const initial = {
    code: attribute.code,
    name: attribute.name,
    value: attribute.value,
  };
  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3}>Cập nhật lại danh mục</Typography.Title>
      </Col>
      <Col span={24}>
        <Form layout="vertical" autoComplete="off" onFinish={onFinish} initialValues={initial}>
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item
                label="Code"
                name="code"
                rules={[{ message: 'Không được bỏ trống!', required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ message: 'Không được bỏ trống!', required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Value"
                name="value"
                rules={[{ message: 'Không được bỏ trống!', required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center mt-5">
              <Button type="primary" className="bg-blue-500" htmlType="submit">
                Thêm danh mục
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ManageEdit;
