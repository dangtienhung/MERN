import { Button, Col, Form, FormItemProps, Image, Input, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { IUser } from '../../interfaces/UserInfo';
import React from 'react';
import { register } from '../../api/users';
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
const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (value: IUser) => {
    try {
      const response = await register(value);
      if (response && response.data) {
        toast.success(response.data.message);
        navigate('/login');
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
            name="username"
            label="Username"
            rules={[
              {
                message: 'Please input your username!',
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </MyFormItem>
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
            <Input placeholder="Enter your password" />
          </MyFormItem>
          <MyFormItem
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              {
                message: 'Please input your confirm password!',
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter your password" />
          </MyFormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary w-full hover:!bg-primary hover:bg-opacity-50 mt-5"
          >
            Submit
          </Button>
          <Col span={24} className="mt-5">
            Bạn có tài khoản?
            <Link to="/login" className="text-primary">
              đăng nhập
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

export default RegisterPage;
