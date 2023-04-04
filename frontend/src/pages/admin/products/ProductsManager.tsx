import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button className="flex items-center justify-center">
          <EyeOutlined />
        </Button>
        <Button className="flex items-center justify-center">
          <EditOutlined />
        </Button>
        <Button className="flex items-center justify-center">
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
];

const ProductsManager = () => {
  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>Danh sách điện thoại</Typography.Title>
          </Col>
          <Col span={12} className="text-right">
            <Link to="/admin/mobile/add" className="inline-block">
              <Button type="primary" className="flex items-center justify-center bg-blue-500">
                <PlusOutlined />
                Thêm sản phẩm
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={data} />
      </Col>
    </Row>
  );
};

export default ProductsManager;
