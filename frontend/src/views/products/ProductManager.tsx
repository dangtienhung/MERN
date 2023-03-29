import { Button, Col, Form, Input, Modal, Row, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { toast } from 'react-toastify';

interface DataSource {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductManager: React.FC = () => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataSource> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DataSource) => {
        return (
          <Space size="middle" key={record._id}>
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/admin/product/preview/${record._id}`)}
              className="flex items-center justify-center"
            />
            <Button icon={<EditOutlined />} className="flex items-center justify-center" />
            <Button
              icon={<DeleteOutlined />}
              className="flex items-center justify-center"
              onClick={() => handleDelete(record._id)}
            />
          </Space>
        );
      },
    },
  ];
  /* useState */
  const [products, setProducts] = useState([]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const dataSource: DataSource[] = products.map((product: DataSource) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
  }));
  /* useEffect */
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/api/products`);
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    };
    fetchData();
  }, []);
  /* handleDelete */
  const handleDelete = async (id: string) => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        const parseToken = JSON.parse(token);
        const response = await axios.delete(`http://localhost:8080/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${parseToken}`,
          },
        });
        if (response.status === 200) {
          const productNew = products.filter((product: DataSource) => product._id !== id);
          setProducts(productNew);
          toast.success(response.data.message);
        }
      } else {
        toast.error('Invalid token');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row style={{ padding: '10px' }}>
        <Col span={24} className="mb-5">
          <Typography.Title level={4}>Quản lý sản phẩm</Typography.Title>
        </Col>
        <Col span={24} className="mb-5">
          <Space>
            <Button
              onClick={() => setOpenAdd(true)}
              type="primary"
              className="flex items-center bg-blue-500 text-white"
            >
              <PlusOutlined />
              Thêm sản phẩm
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <Table dataSource={dataSource} columns={columns} className="w-full" />
        </Col>
      </Row>
      <Modal
        title="Thêm sản phẩm"
        open={openAdd}
        onOk={() => setOpenAdd(!openAdd)}
        onCancel={() => setOpenAdd(!openAdd)}
        width={1000}
        style={{ top: '20px' }}
      >
        <Form autoComplete="off" layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="productName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên sản phẩm" name="productName">
                <Input placeholder="Tên sản phẩm" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ProductManager;
