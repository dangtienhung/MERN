import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';
import { createBrand, getAllBrands } from '../../api/brands';

import { IBrand } from '../../interfaces/brands';
import { toast } from 'react-toastify';

interface ModalAddProps {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  setBrands: (brands: IBrand[]) => void;
}

const ModalAdd = ({ isModalOpen, setIsModalOpen, setBrands }: ModalAddProps) => {
  const handleSubmit = async (value: string) => {
    try {
      const response = await createBrand(value);
      if (response && response.data) {
        await getAllBrands();
      }
      toast.success('Thêm nhãn hàng thành công');
      setIsModalOpen();
    } catch (error) {
      toast.error('Thêm nhãn hàng thất bại');
    }
  };
  const handleCancel = () => {
    setIsModalOpen();
  };
  return (
    <Modal
      width={980}
      title="Thêm nhãn hàng"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Tên nhãn hàng"
              name="name"
              rules={[{ message: 'Không được bỏ trống', required: true }]}
            >
              <Input placeholder="Tên nhãn hiệu" />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary hover:!bg-primary"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" className="bg-primary-admin">
                Thêm nhãn hàng
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
