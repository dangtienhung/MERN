import { Carousel, Col, Image, Modal, Row, Typography } from 'antd';

import { IProduct } from '../../../../interfaces/product';
import parse from 'html-react-parser';
import { useFormatCurrent } from '../../../../hooks/useFomatCurrent';

interface IPreviewProps {
  openModal: boolean;
  isOpenModal: () => void;
  preview: IProduct;
}

const Preview = ({ openModal, isOpenModal, preview }: IPreviewProps) => {
  return (
    <Modal
      title="Xem trước sản phẩm"
      onCancel={() => isOpenModal()}
      open={openModal}
      footer={null}
      style={{ top: '20px' }}
      width={960}
    >
      <Row gutter={50}>
        <Col span={24} className="mb-7">
          <Row>
            <Col span={6}>
              <Carousel autoplay className="!rounded-lg">
                {preview?.images.map((image: string) => (
                  <div key={image} className="!rounded-lg">
                    <Image src={image} className="h-[200px] object-cover" />
                  </div>
                ))}
              </Carousel>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={24} className="mb-7">
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {preview.name}
                  </Typography.Title>
                </Col>
                <Col span={24} className="mb-7">
                  <Typography.Text className="text-primary mr-5">
                    {useFormatCurrent(preview.price)}đ
                  </Typography.Text>
                  <Typography.Text className="!text-sm line-through">
                    {useFormatCurrent(preview.original_price)}đ
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Text>{parse(preview.description)}</Typography.Text>
        </Col>
      </Row>
    </Modal>
  );
};

export default Preview;
