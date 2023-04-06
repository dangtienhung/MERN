import { Col, Form, Input, Modal, Row } from 'antd';

interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalAdd = ({ isOpen, setIsOpen }: ModalAddProps) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Thêm danh mục"
      onCancel={() => setIsOpen(!isOpen)}
      open={isOpen}
      width={960}
      style={{ top: '20px' }}
      footer={null}
    >
      <Form layout="vertical" autoComplete="off" form={form} component={false}>
        <Row gutter={50}>
          <Col span={12}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ message: 'Không được bỏ trống!', required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ message: 'Không được bỏ trống!', required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ message: 'Không được bỏ trống!', required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ message: 'Không được bỏ trống!', required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
