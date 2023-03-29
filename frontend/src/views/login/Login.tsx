import { Button, Col, Form, Input, Row } from 'antd';

import type { FormItemProps } from 'antd';
import { IUserInfo } from '../../interfaces/UserInfo';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values: IUserInfo) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/login`, values);
      console.log('🚀 ~ file: Login.tsx:45 ~ onFinish ~ response:', response);
      if (response.status !== 200) {
        toast.error('Tài khoản or Mật khẩu không đúng');
        return;
      }
      localStorage.setItem('token', JSON.stringify(response.data.data.acessToken));
      localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
      navigate('/admin/products');
    } catch (error) {
      toast.error('Đăng nhập thất bại');
    }
  };

  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish} className="p-10">
      <Row>
        <Col span={24}>
          <MyFormItem
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" placeholder="Email" />
          </MyFormItem>
          <MyFormItem
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type="password" placeholder="Password" />
          </MyFormItem>
        </Col>
        <Col span={24} className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 mx-auto mt-10 w-full max-w-xs p-2 flex items-center justify-center"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
