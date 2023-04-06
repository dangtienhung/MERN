import { Button, Col, Form, Input, Modal, Row } from 'antd';

import { IAttribute } from '../../../../interfaces/attribute';
import { createAttribute } from '../../../../api/attribute';
import { toast } from 'react-toastify';

interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalAdd = ({ isOpen, setIsOpen }: ModalAddProps) => {
  const [form] = Form.useForm();
  const onFinish = async (values: IAttribute) => {
    try {
      const response = await createAttribute(values);
      if (response && response.data) {
        toast.success('Thêm danh mục thành công!');
        setIsOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error('Thêm danh mục thất bại!');
    }
  };
  return (
    <Modal
      title="Thêm danh mục"
      onCancel={() => setIsOpen(!isOpen)}
      open={isOpen}
      width={960}
      style={{ top: '20px' }}
      footer={null}
    >
      <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
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
    </Modal>
  );
};

export default ModalAdd;
