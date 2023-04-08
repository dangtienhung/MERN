import { Button, Col, Input, InputRef, Row, Space, Table, Typography } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { deleteSpecification, getAllSpecifications } from '../../../api/specification';

import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { ISpecification } from '../../../interfaces/specification';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

type DataIndex = keyof ISpecification;

const Specification = () => {
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ISpecification> => ({
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
            className="bg-blue-500"
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

  const columns: ColumnsType<ISpecification> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      title: 'Attributes',
      dataIndex: 'attributes',
      key: 'attributes',
      render: (attributes) => {
        return (
          <>
            <>
              <p>Name: {attributes.name}</p>
              <p>Value: {attributes.value}</p>
              <p>Code: {attributes.code}</p>
            </>
          </>
        );
      },
    },
    {
      key: 'action',
      dataIndex: 'action',
      title: 'Action',
      render: (text, record: ISpecification) => {
        return (
          <Space>
            <Link to={`/admin/manager-specifications/edit/${record._id}`}>
              <Button className="flex justify-center items-center">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              className="flex justify-center items-center"
              onClick={() => handleDelete(record._id)}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];
  const handleDelete = async (id: string) => {
    try {
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
            const response = await deleteSpecification(id);
            if (response && response.data) {
              const newSpecifications = specifications.filter(
                (specification: ISpecification) => specification._id !== id
              );
              setSpecifications(newSpecifications);
              toast.success('Xóa thành công');
            }
          } catch (error) {
            toast.error('Lỗi khi xóa danh mục');
          }
        }
      });
    } catch (error) {
      toast.error('Lỗi khi xóa');
    }
  };
  const [specifications, setSpecifications] = useState<ISpecification[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSpecifications();
        if (response && response.data) {
          setSpecifications(
            response.data.map((specification: ISpecification) => {
              return {
                ...specification,
                key: specification._id,
              };
            })
          );
        }
      } catch (error) {
        toast.error('Lỗi khi lấy dữ liệu');
      }
    };
    fetchData();
  }, []);
  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3}>Thêm Specification</Typography.Title>
      </Col>
      <Col span={24}>
        <Link to="/admin/manager-specifications/add" className="inline-block">
          <Button type="primary" className="bg-blue-500">
            Thêm sản phẩm
          </Button>
        </Link>
      </Col>
      <Col span={24} className="mt-5">
        <Table columns={columns} dataSource={specifications} />
      </Col>
    </Row>
  );
};

export default Specification;
