import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';

import { CheckOutlined } from '@ant-design/icons';
import { IUser } from '../../../../interfaces/UserInfo';

interface IModalEditProps {
  isOpenEdit: boolean;
  setIsOpenEdit: (isOpenEdit: boolean) => void;
}

const ModalEdit = ({ isOpenEdit, setIsOpenEdit }: IModalEditProps) => {
  const handleCancel = () => {
    setIsOpenEdit(false);
  };
  const handleFisnish = async (values: IUser) => {
    console.log('🚀 ~ file: ModalEdit.tsx:13 ~ handleFisnish ~ values:', values);
  };
  return (
    <Modal
      title="Thêm người dùng"
      open={isOpenEdit}
      onCancel={() => handleCancel()}
      footer={null}
      style={{ top: '20px' }}
      width={960}
    >
      <Form layout="vertical" autoComplete="off" onFinish={handleFisnish}>
        <Row gutter={50}>
          <Col span={12}>
            <Form.Item
              label="Tên người dùng"
              name={'username'}
              rules={[
                { required: true, message: 'Không được bỏ trống' },
                { min: 6, message: 'Tên người dùng phải có ít nhất 6 ký tự' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email người dùng"
              name={'email'}
              rules={[
                { required: true, message: 'Email không hợp lệ' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mật khẩu"
              name={'password'}
              rules={[
                { required: true, message: 'Không được bỏ trống' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mật khẩu xác nhận"
              name={'confirmPassword'}
              rules={[{ required: true, message: 'Không được bỏ trống' }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="text-center">
            <Space align="center">
              <Button
                className="flex justify-center items-center"
                onClick={() => setIsOpenEdit(false)}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                className="bg-blue-500 flex justify-center items-center"
                htmlType="submit"
              >
                <CheckOutlined />
                Sửa người dùng
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
