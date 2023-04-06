import { Button, Col, Input, InputRef, Row, Space, Table, Typography } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteAttribute, getAllAttributes } from '../../../api/attribute';
import { useEffect, useRef, useState } from 'react';

import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { IAttribute } from '../../../interfaces/attribute';
import { Link } from 'react-router-dom';
import ModalAdd from './components/ModalAdd';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useToggleModal } from '../../../hooks/useToggleValue';

type DataIndex = keyof IAttribute;

const ManagerCategories: React.FC = () => {
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IAttribute> => ({
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
  const columns: ColumnsType<IAttribute> = [
    {
      key: 'code',
      dataIndex: 'code',
      title: 'Code',
      ...getColumnSearchProps('code'),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      ...getColumnSearchProps('name'),
    },
    {
      key: 'value',
      dataIndex: 'value',
      title: 'Value',
      ...getColumnSearchProps('value'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: IAttribute) => {
        return (
          <Space>
            <Link to={`/admin/managers-categories/${record._id}`}>
              <Button className="flex items-center justify-center">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              className="flex items-center justify-center"
              onClick={() => handleClickDelete(record._id)}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];
  const handleClickDelete = async (id: string) => {
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
          const response = await deleteAttribute(id);
          if (response && response.data) {
            toast.success('Xóa danh mục thành công');
          }
        } catch (error) {
          toast.error('Lỗi khi xóa danh mục');
        }
      }
    });
  };
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const { value, handleToggleValue } = useToggleModal();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAttributes();
        if (response && response.data) {
          setAttributes(
            response.data.atributes.map((attributes: IAttribute) => ({
              ...attributes,
              key: attributes._id,
            }))
          );
        }
      } catch (error) {
        toast.error('Lỗi khi lấy dữ liệu');
      }
    };
    fetchData();
  }, [attributes]);
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
        <Col span={24} className="mt-5">
          <Table
            columns={columns}
            dataSource={attributes}
            pagination={{
              pageSize: 5,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total}`,
            }}
          />
        </Col>
      </Row>
      <ModalAdd isOpen={value} setIsOpen={handleToggleValue} />
    </>
  );
};

export default ManagerCategories;
