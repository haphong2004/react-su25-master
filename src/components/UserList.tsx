import { useState } from 'react';
import { Table, Input, Button, Space, message, Popconfirm, Typography } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const { Title } = Typography;

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");

  // Get search params from URL
  const name = searchParams.get("name") || "";

  const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch('http://localhost:3001/users');
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  };

  // Fetch all users
  const { data: allUsers = [], isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      message.success('Xóa người dùng thành công');
    },
    onError: (error) => {
      message.error('Có lỗi xảy ra khi xóa người dùng');
      console.error('Error deleting user:', error);
    },
  });

  // Filter users based on search criteria (simple contains search)
  const filteredUsers = allUsers.filter((user: User) => {
    if (!name) return true;

    const searchTerm = name.toLowerCase();
    const userName = user.username.toLowerCase();
    const userEmail = user.email.toLowerCase();

    return userName.includes(searchTerm) || userEmail.includes(searchTerm);
  });

  if (error) {
    return <div>Đã xảy ra lỗi khi tải danh sách người dùng</div>;
  }

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const params = new URLSearchParams();
    if (value) params.set('name', value);
    setSearchParams(params);
  };

  // Handle input change separately from search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleDelete = (id: string) => {
    deleteUser.mutate(id);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: User, b: User) => a.id.localeCompare(b.id),
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
      sorter: (a: User, b: User) => a.username.localeCompare(b.username),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'User', value: 'user' },
      ],
      onFilter: (value: any, record: User) => record.role === value,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
        </span>
      ),
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Vô hiệu hóa', value: 'inactive' },
      ],
      onFilter: (value: any, record: User) => record.status === value,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Link to={`/users/edit/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small" />
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    return <div>Đã xảy ra lỗi khi tải danh sách người dùng</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Quản lý người dùng</Title>
        <Link to="/users/create">
          <Button type="primary" icon={<UserAddOutlined />}>
            Thêm người dùng
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-4 mb-4">
          <Input
            placeholder="Tìm kiếm người dùng..."
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={handleInputChange}
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`
          }}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default UserList;