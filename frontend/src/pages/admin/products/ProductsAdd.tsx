import 'react-quill/dist/quill.snow.css';

import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import type { UploadFile } from 'antd/es/upload/interface';

const Products = () => {
  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3}>Thêm sản phẩm</Typography.Title>
      </Col>
      <Col span={24}>
        <Form>
          <Row>
            <Col span={12}></Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Products;
