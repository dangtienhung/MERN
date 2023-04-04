import 'react-quill/dist/quill.snow.css';

import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import type { UploadFile } from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Products = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  /* react quill */
  const [content, setContent] = useState('');
  const [desc1, setDesc1] = useState('');
  const [desc2, setDesc2] = useState('');

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Row>
        <Col span={24}>
          <Typography.Title level={4}>Thêm sản phẩm</Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </Col>
                <Col span={24} className="mt-5">
                  {/* <Typography.Title level={5}>Mô tả ngắn sản phẩm</Typography.Title> */}
                  <Form.Item
                    label="Mô tả ngắn"
                    rules={[{ required: true, message: 'Trường này không được bỏ trống' }]}
                    name={'content'}
                  >
                    <ReactQuill theme="snow" value={content} onChange={setContent} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Typography.Text>Thông tin sản phẩm</Typography.Text>
              <Divider />
              <Row gutter={20}>
                <Col span={24}>
                  <Form.Item
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                    name={'name'}
                  >
                    <Input placeholder="Tên sản phẩm" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Giá gốc"
                    rules={[{ message: 'Trường này là bắt buộc', required: true }]}
                    name={'price'}
                  >
                    <Input placeholder="Giá gốc" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Giá khuyến mại">
                    <Input placeholder="Giá khuyến mãi" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Danh mục"
                    rules={[{ message: 'Trường này là bắt buộc', required: true }]}
                    name={'brand'}
                  >
                    <Select placeholder="Danh mục">
                      <Select.Option value="ahihi">ahihi</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={'desc1'}
                    label="Đặc điểm nổi bật"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <ReactQuill theme="snow" value={desc1} onChange={setDesc1} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={'desc2'}
                    label="Thông tin chi tiết"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                  >
                    <ReactQuill theme="snow" value={desc2} onChange={setDesc2} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button type="primary" htmlType="submit" className="bg-blue-500">
                    Thêm mới
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default Products;
