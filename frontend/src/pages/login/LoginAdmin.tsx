import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { IUserInfo } from '../../interfaces/UserInfo';
import { login } from '../../api/users';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: IUserInfo) => {
    try {
      const response = await login(values);
      if (response.status === 200) {
        if (response.data.data.user.role !== 'admin') {
          toast.error('Bạn không có quyền truy cập trang này!');
          return;
        }
        localStorage.setItem('token', response.data.data.acessToken);
        localStorage.setItem('admin', JSON.stringify(response.data.data.user));
        navigate('/admin/dashboard');
        toast.success('Đăng nhập thành công!');
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại!');
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Row>
        <Col span={24}>
          <Typography.Title level={4} className="text-center">
            Đăng nhập vào Admin
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Form autoComplete="off" layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name={'email'}
              label="Email"
              rules={[{ required: true, message: 'Please enter your email!', type: 'email' }]}
            >
              <Input placeholder="Enter your email" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name={'password'}
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password placeholder="Enter your password" prefix={<LockOutlined />} />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-primary hover:!bg-primary mt-5"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginAdmin;
