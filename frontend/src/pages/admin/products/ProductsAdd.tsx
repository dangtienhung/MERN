import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import type { UploadFile } from 'antd/es/upload/interface';
import { Button, Col, Form, Input, Row, Select, Typography, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [imageUrl, setImageUrl] = useState('');
  console.log('🚀 ~ file: ProductsAdd.tsx:11 ~ Products ~ imageUrl:', imageUrl);
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    console.log('🚀 ~ file: ProductsAdd.tsx:13 ~ onFinish ~ values:', values);
  };
  const uploadImage = async (file: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post(
        'https://api.imgbb.com/1/upload?key=87c6dbc457af9764143a48715ccc1fc7',
        formData
      );
      setImageUrl(res.data.data.url);
      setLoading(false);
    } catch (error) {
      message.error('Tải lên hình ảnh thất bại!');
      setLoading(false);
    }
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      uploadImage(info.file.originFileObj);
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên tệp JPG/PNG!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Hình ảnh phải có kích thước nhỏ hơn 2MB!');
      return false;
    }
    return true;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3}>Thêm sản phẩm</Typography.Title>
      </Col>
      <Col span={24}>
        <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: 'Không được bỏ trống' }]}
              >
                <Input placeholder="Tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá khuyến mại"
                name="original_price"
                rules={[{ required: true, message: 'Không được bỏ trống' }]}
              >
                <Input placeholder="Giá khuyến mại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá sản phẩm"
                name="price"
                rules={[{ required: true, message: 'Không được bỏ trống' }]}
              >
                <Input placeholder="Giá sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thương hiệu"
                name="brand"
                rules={[{ required: true, message: 'Không được bỏ trống' }]}
              >
                <Select placeholder="Thương hiệu">
                  <Select.Option value="ahih">ahihi</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh mục sản phẩm"
                name="specification"
                rules={[{ required: true, message: 'Không được bỏ trống' }]}
              >
                <Select placeholder="Danh mục sản phẩm">
                  <Select.Option value="ahih">ahihi</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col span={12}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={12}></Col>
            <Col span={24} className="mt-5 text-center">
              <Button type="primary" className="bg-blue-500" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Products;
