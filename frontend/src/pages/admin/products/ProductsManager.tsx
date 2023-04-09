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
import Swal from 'sweetalert2';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';

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
                  {images.map((image: IImage) => (
                    <div style={contentStyle} key={image._id}>
                      <Image src={image.base_url} className="rounded-md" />
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
    },
    {
      title: 'Sale',
      dataIndex: 'original_price',
      key: 'original_price',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
      render: (description) => <>{parse(description)}</>,
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
          <Button className="flex items-center justify-center">
            <EyeOutlined />
          </Button>
          <Button className="flex items-center justify-center">
            <EditOutlined />
          </Button>
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
  }, [products]);
  if (!products) return <>loading...</>;
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
  );
};

export default ProductsManager;
