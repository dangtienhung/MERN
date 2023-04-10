import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';

import { IUser } from '../../../../interfaces/UserInfo';
import { PlusOutlined } from '@ant-design/icons';
import { register } from '../../../../api/users';
import { toast } from 'react-toastify';

interface IModalAddProps {
  isOpenAdd: boolean;
  setIsOpenAdd: (isOpenAdd: boolean) => void;
}

const ModalAdd = ({ isOpenAdd, setIsOpenAdd }: IModalAddProps) => {
  const handleCancel = () => {
    setIsOpenAdd(false);
  };
  const handleFisnish = async (values: IUser) => {
    try {
      const response = await register(values);
      if (response && response.data) {
        toast.success('Thêm người dùng thành công');
        // handleAdd([...])
        setIsOpenAdd(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Modal
      title="Thêm người dùng"
      open={isOpenAdd}
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
                onClick={() => setIsOpenAdd(false)}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                className="bg-blue-500 flex justify-center items-center"
                htmlType="submit"
              >
                <PlusOutlined />
                Thêm người dùng
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
