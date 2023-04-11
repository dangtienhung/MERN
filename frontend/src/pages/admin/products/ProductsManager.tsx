import {
  Button,
  Carousel,
  Col,
  Divider,
  Image,
  Input,
  InputRef,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { IImage, IProduct } from '../../../interfaces/product';
import { deleteProduct, getAllProducts } from '../../../api/products';
import { useEffect, useRef, useState } from 'react';

import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import Preview from './components/Preview';
import Swal from 'sweetalert2';
import axios from 'axios';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { useFormatCurrent } from '../../../hooks/useFomatCurrent';
import { useToggleModal } from '../../../hooks/useToggleValue';

type DataIndex = keyof IProduct;

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '12px',
  overflow: 'hidden',
};

const ProductsManager = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IProduct> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            className="bg-blue-500"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  /* handleDelete */
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          const response = await deleteProduct(id);
          if (response && response.data) {
            toast.success('Delete product successfully');
          }
        }
      });
    } catch (error) {
      toast.error('Delete product failed');
    }
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => {
        return (
          <>
            <Row>
              <Col span={24}>
                <Carousel autoplay dots={false}>
                  {images.map((image: string) => (
                    <div style={contentStyle} key={image}>
                      <Image src={image} className="rounded-md" />
                    </div>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <Typography.Text>{useFormatCurrent(price)}đ</Typography.Text>,
    },
    {
      title: 'Sale',
      dataIndex: 'original_price',
      key: 'original_price',
      render: (original_price) => (
        <Typography.Text>{useFormatCurrent(original_price)}đ</Typography.Text>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand) => (
        <>
          <Tag color="blue" className="capitalize">
            {brand.name}
          </Tag>
        </>
      ),
    },
    {
      title: 'Specification',
      dataIndex: 'specifications',
      key: 'specifications',
      render: (specifications) => {
        return (
          <>
            <Tag color="blue" className="capitalize">
              {specifications.name}
            </Tag>
            <Divider />
            <Typography.Text>
              {specifications.attributes.code}-{specifications.attributes.name}-
              {specifications.attributes.value}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record: IProduct) => (
        <Space className="!flex-nowrap">
          <Button
            className="flex items-center justify-center"
            onClick={() => handlePreview(record)}
          >
            <EyeOutlined />
          </Button>
          <Link to={`/admin/mobile/edit/${record._id}`} className="inline-block">
            <Button className="flex items-center justify-center">
              <EditOutlined />
            </Button>
          </Link>
          <Button
            className="flex items-center justify-center"
            onClick={() => handleDelete(record._id as string)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  /* useState */
  const [products, setProducts] = useState<IProduct[]>([]);
  const [preview, setPriview] = useState<IProduct | null>(null);
  /* hooks */
  const { value: openModal, handleToggleValue: isOpenModal } = useToggleModal();

  /* handle preview */
  const handlePreview = (record: IProduct) => {
    setPriview(record);
    isOpenModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        if (response && response.data) {
          const { products } = response.data;
          setProducts(products.map((product: IProduct) => ({ ...product, key: product._id })));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [value, setValue] = useState('');
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?q=${value}`);
      if (response && response.data) {
        const { products } = response.data;
        setProducts(products.map((product: IProduct) => ({ ...product, key: product._id })));
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!products) return <>loading...</>;
  return (
    <>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Typography.Title level={3}>Danh sách điện thoại</Typography.Title>
            </Col>
            <Col span={12} className="text-right">
              <Row gutter={20}>
                <Col span={12}>
                  <Link to="/admin/mobile/add" className="inline-block">
                    <Button type="primary" className="flex items-center justify-center bg-blue-500">
                      <PlusOutlined />
                      Thêm sản phẩm
                    </Button>
                  </Link>
                </Col>
                <Col span={12}>
                  <div className="flex justify-center items-center">
                    <Input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search"
                      className="w-full"
                      prefix={<SearchOutlined />}
                    />
                    <Button className="flex justify-center items-center" onClick={handleSubmit}>
                      <SearchOutlined />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={products}
            scroll={{ x: 'calc(700px + 50%)' }}
            pagination={{
              pageSize: 3,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total}`,
            }}
          />
        </Col>
      </Row>
      {preview && <Preview openModal={openModal} isOpenModal={isOpenModal} preview={preview} />}
    </>
  );
};

export default ProductsManager;
