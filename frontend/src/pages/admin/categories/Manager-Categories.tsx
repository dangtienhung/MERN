import { Button, Col, Form, Input, Row, Typography } from 'antd';

import ModalAdd from './components/ModalAdd';
import { PlusOutlined } from '@ant-design/icons';
import { useToggleModal } from '../../../hooks/useToggleValue';

const ManagerCategories: React.FC = () => {
  const { value, handleToggleValue } = useToggleModal();
  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>Quản lý danh mục</Typography.Title>
        </Col>
        <Col span={24}>
          <Button
            onClick={() => handleToggleValue()}
            type="primary"
            className="bg-blue-500 flex justify-center items-center"
          >
            <PlusOutlined />
            Thêm danh mục
          </Button>
        </Col>
        <Col span={24}></Col>
      </Row>
      <ModalAdd isOpen={value} setIsOpen={handleToggleValue} />
    </>
  );
};

export default ManagerCategories;
