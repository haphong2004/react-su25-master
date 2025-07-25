import { Table, Button, Space, Input, Modal, Form, message, Popconfirm, Typography, Card, Select } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const { Title } = Typography;

interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  status: 'active' | 'inactive';
}

const BrandList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [form] = Form.useForm();
  const searchValue = searchParams.get('search') || '';

  // Fetch brands
  const { data: brands = [], isLoading } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/brands');
      if (!res.ok) {
        throw new Error('Failed to fetch brands');
      }
      return res.json();
    },
  });

  // Create/Update brand
  const saveBrand = useMutation({
    mutationFn: async (values: Omit<Brand, 'id'> & { id?: string }) => {
      const method = editingBrand ? 'PUT' : 'POST';
      const url = editingBrand 
        ? `http://localhost:3001/brands/${editingBrand.id}`
        : 'http://localhost:3001/brands';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingBrand ? { ...editingBrand, ...values } : values),
      });

      if (!response.ok) {
        throw new Error(editingBrand ? 'Failed to update brand' : 'Failed to create brand');
      }
      return response.json();
    },
    onSuccess: () => {
      message.success(editingBrand ? 'Cập nhật thương hiệu thành công' : 'Thêm thương hiệu thành công');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      handleCancel();
    },
    onError: () => {
      message.error('Đã xảy ra lỗi');
    },
  });

  // Delete brand
  const deleteBrand = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost:3001/brands/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete brand');
      }
      return response.json();
    },
    onSuccess: () => {
      message.success('Xóa thương hiệu thành công');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });

  const handleSearch = (value: string) => {
    const params = new URLSearchParams();
    if (value) params.set('search', value);
    setSearchParams(params);
  };

  const showModal = (brand: Brand | null = null) => {
    setEditingBrand(brand);
    if (brand) {
      form.setFieldsValue(brand);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingBrand(null);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    saveBrand.mutate(values);
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    (brand.description && brand.description.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: Brand, b: Brand) => a.id.localeCompare(b.id),
    },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Brand, b: Brand) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || '--',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
        </span>
      ),
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Ngừng hoạt động', value: 'inactive' },
      ],
      onFilter: (value: any, record: Brand) => record.status === value,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Brand) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
            size="small"
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa thương hiệu này?"
            onConfirm={() => deleteBrand.mutate(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Quản lý thương hiệu</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Thêm thương hiệu
        </Button>
      </div>

      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Tìm kiếm thương hiệu..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            defaultValue={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredBrands} 
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Tổng ${total} thương hiệu`
          }}
        />
      </Card>

      <Modal
        title={editingBrand ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="Tên thương hiệu"
            rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}
          >
            <Input placeholder="Nhập tên thương hiệu" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả thương hiệu" />
          </Form.Item>

          <Form.Item
            name="logo"
            label="Logo URL"
          >
            <Input placeholder="Nhập đường dẫn logo" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
          >
            <Select>
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Ngừng hoạt động</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleCancel}>
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={saveBrand.isPending}
            >
              {editingBrand ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandList;