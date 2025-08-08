import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Category {
  id?: number;
  name: string;
  description: string;
}

const CategoryCreate: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: Category) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          id: Date.now()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Không thể thêm danh mục');
      }
      
      message.success('Thêm danh mục thành công!');
      navigate('/categories');
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
      message.error('Có lỗi xảy ra khi thêm danh mục');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        Quay lại
      </Button>
      
      <Card 
        title={
          <Title level={3} style={{ margin: 0 }}>
            THÊM DANH MỤC MỚI
          </Title>
        }
        bordered={false}
        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ maxWidth: 600, margin: '0 auto' }}
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên danh mục' },
              { min: 3, message: 'Tên danh mục phải có ít nhất 3 ký tự' },
              { max: 50, message: 'Tên danh mục không vượt quá 50 ký tự' }
            ]}
          >
            <Input 
              size="large" 
              placeholder="Nhập tên danh mục" 
              style={{ borderRadius: 6 }}
            />
          </Form.Item>
          
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { max: 500, message: 'Mô tả không vượt quá 500 ký tự' }
            ]}
          >
            <TextArea 
              rows={4} 
              placeholder="Nhập mô tả cho danh mục (không bắt buộc)"
              style={{ borderRadius: 6 }}
            />
          </Form.Item>
          
          <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                loading={loading}
                style={{ minWidth: 120, height: 40 }}
              >
                Lưu lại
              </Button>
              <Button 
                onClick={() => form.resetFields()}
                disabled={loading}
                style={{ height: 40 }}
              >
                Đặt lại
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CategoryCreate;