import { Button, Col, Input, InputRef, Row, Space, Table, Tag, Typography } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteUser, getAllUsers } from '../../../api/users';
import { useEffect, useRef, useState } from 'react';

import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { IUserData } from '../../../interfaces/UserInfo';
import ModalAdd from './components/ModalAdd';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useToggleModal } from '../../../hooks/useToggleValue';

type DataIndex = keyof IUserData;

const ManagerUsers = () => {
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUserData> => ({
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

  /* useState */
  const [users, setUsers] = useState<IUserData[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response && response.data) {
          setUsers(response.data.map((user: IUserData) => ({ ...user, key: user._id })));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  /* handle delete */
  const handleDelete = (id: string) => {
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
          try {
            const response = await deleteUser(id);
            if (response && response.data) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              toast.success('Xóa người dùng thành công');
              setUsers(users.filter((user) => user._id !== id));
            }
          } catch (error: any) {
            console.log('🚀 ~ file: ManagerUsers.tsx:151 ~ handleDelete ~ error:', error);
            toast.error('Xóa người dùng thất bại');
          }
        }
      });
    } catch (error) {
      toast.error('Xóa người dùng thất bại');
    }
  };

  /* handle add */
  const { value: isOpenAdd, handleToggleValue: setIsOpenAdd } = useToggleModal();

  const columns: ColumnsType<IUserData> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '30%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      render: (role) => <Tag color={role === 'admin' ? 'success' : 'warning'}>{role}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, recored) => (
        <Space size="middle">
          <Button
            onClick={() => handleDelete(recored._id)}
            type="primary"
            className="bg-red-400 hover:!bg-red-400 flex justify-center items-center"
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>Quản lý người dùng</Typography.Title>
        </Col>
        <Col span={24}>
          <Button
            onClick={() => setIsOpenAdd()}
            type="primary"
            className="bg-blue-500 flex justify-center items-center"
          >
            <PlusOutlined />
            Thêm người dùng
          </Button>
        </Col>
        <Col span={24} className="mt-5">
          <Table columns={columns} dataSource={users} />
        </Col>
      </Row>
      <ModalAdd setIsOpenAdd={setIsOpenAdd} isOpenAdd={isOpenAdd} />
    </>
  );
};

export default ManagerUsers;
