import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Card, Typography } from 'antd';
import { UserAddOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const { Title } = Typography;
const { Option } = Select;

interface UserFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

const UserCreate: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mutation để tạo user mới
  const createUser = useMutation({
    mutationFn: async (values: Omit<UserFormValues, 'confirmPassword'>) => {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          id: Date.now().toString(), // Tạo ID tạm thời
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return response.json();
    },
    onSuccess: () => {
      message.success('Thêm người dùng thành công');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/users');
    },
    onError: () => {
      message.error('Có lỗi xảy ra khi thêm người dùng');
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onFinish = (values: UserFormValues) => {
    setIsSubmitting(true);
    // Loại bỏ confirmPassword trước khi gửi lên server
    const { confirmPassword, ...userData } = values;
    createUser.mutate(userData);
  };

  const validatePassword = ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
    },
  });

  return (
    <div className="p-6">
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Quay lại
      </Button>
      
      <Card className="max-w-2xl mx-auto">
        <Title level={3} className="text-center mb-6">
          <UserAddOutlined /> Thêm người dùng mới
        </Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              validatePassword,
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            initialValue="user"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Select>
              <Option value="admin">Quản trị viên</Option>
              <Option value="user">Người dùng</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            initialValue="active"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Vô hiệu hóa</Option>
            </Select>
          </Form.Item>

          <Form.Item className="text-center">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isSubmitting}
              className="w-full max-w-xs"
            >
              Thêm người dùng
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserCreate;