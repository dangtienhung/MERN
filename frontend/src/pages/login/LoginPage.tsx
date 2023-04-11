import { Button, Col, Form, Image, Input, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import type { FormItemProps } from 'antd';
import { IUserInfo } from '../../interfaces/UserInfo';
import React from 'react';
import { login } from '../../api/users';
import { toast } from 'react-toastify';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (value: IUserInfo) => {
    try {
      const response = await login(value);
      if (response && response.data) {
        toast.success(response.data.message);
        localStorage.setItem('token', JSON.stringify(response.data.data.acessToken));
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        navigate('/');
      }
    } catch (error) {
      toast.error('Register failed');
    }
  };
  return (
    <Row className="w-[800px]">
      <Col span={16}>
        <Form name="form_item_path" layout="vertical" onFinish={onFinish} autoComplete="off">
          <MyFormItem
            name="email"
            label="Email"
            rules={[
              {
                message: 'Please input your email!',
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </MyFormItem>
          <MyFormItem
            name="password"
            label="Passwrod"
            rules={[
              {
                message: 'Please input your password!',
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </MyFormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary w-full hover:!bg-primary hover:bg-opacity-50 mt-5"
          >
            Submit
          </Button>
          <Col span={24} className="mt-5">
            Bạn không có tài khoản?
            <Link to="/register" className="text-primary">
              đăng ký
            </Link>
          </Col>
        </Form>
      </Col>
      <Col span={8} className="flex justify-center items-center">
        <Link to="/" className="flex justify-center items-center">
          <Image src="/anhhtus-logo_2.png" preview={false} className="h-full w-full object-cover" />
        </Link>
      </Col>
    </Row>
  );
};

export default LoginPage;
