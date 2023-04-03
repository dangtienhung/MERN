import { Button, Col, Form, Image, Input, Row } from 'antd';

import type { FormItemProps } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

interface IUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginPage = () => {
  const onFinish = (value: IUser) => {
    console.log(value);
  };
  return (
    <Row className="w-[800px]">
      <Col span={16}>
        <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
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
