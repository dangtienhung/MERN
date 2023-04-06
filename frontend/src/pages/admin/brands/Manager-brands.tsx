import { Button, Col, Input, InputRef, Row, Space, Table, Typography } from 'antd';
import { ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteBrand, getAllBrands } from '../../../api/brands';
import { useEffect, useRef, useState } from 'react';

import { ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { IBrand } from '../../../interfaces/brands';
import ModalAdd from '../../../modules/brands/ModalAdd';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useToggleModal } from '../../../hooks/useToggleValue';

type DataIndex = keyof IBrand;

const ManagerBrands: React.FC = () => {
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IBrand> => ({
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
            className="bg-blue-500"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
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
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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
    onFilter: (value, record) =>
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

  const columns: ColumnsType<IBrand> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên thương hiệu',
      ...getColumnSearchProps('name'),
    },
    {
      key: 'slug',
      dataIndex: 'slug',
      title: 'Slug',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: IBrand) => {
        return (
          <Space>
            <Button className="flex items-center justify-center">
              <EditOutlined />
            </Button>
            <Button
              className="flex items-center justify-center"
              onClick={() => handleDelete(record._id)}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];
  /* handleDelete */
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      text: 'Bạn sẽ không thể hoàn nguyên điều này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Xóa thành công.', 'success');
        try {
          const response = await deleteBrand(id);
          if (response && response.data) {
            toast.success('Xóa thành công');
            const newBrands = brands.filter((brand) => brand._id !== id);
            setBrands(newBrands);
          }
        } catch (error) {
          toast.error('Xoá không thành công!');
        }
      }
    });
  };
  /* useState */
  const { value: isModalOpen, handleToggleValue: setIsModalOpen } = useToggleModal();
  const [brands, setBrands] = useState<IBrand[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBrands();
        if (response && response.data) {
          const { brands } = response.data;
          setBrands(brands.map((brand: IBrand) => ({ ...brand, key: brand._id })));
        }
      } catch (error) {
        toast.error('Lỗi sản phẩm');
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={3}>Quản lý các nhãn hàng</Typography.Title>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <Button type="primary" className="bg-blue-500" onClick={() => setIsModalOpen()}>
                Thêm nhãn hàng
              </Button>
            </Col>
            <Col span={24} className="mt-5">
              <Table
                columns={columns}
                dataSource={brands}
                pagination={{
                  pageSize: 5,
                  showTotal: (total, range) => `${range[0]}-${range[1]} của ${total}`,
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalAdd isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setBrands={setBrands} />
    </>
  );
};

export default ManagerBrands;
