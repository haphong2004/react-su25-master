import { Button, Card, Checkbox, Form, Input, Typography, message, Space, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const authMutation = useAuth('login');

  useEffect(() => {
    // Check for saved credentials if "remember me" was checked
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      form.setFieldsValue({ email: savedEmail, remember: true });
    }
  }, [form]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      // Save email if "remember me" is checked
      if (values.remember) {
        localStorage.setItem('savedEmail', values.email);
      } else {
        localStorage.removeItem('savedEmail');
      }

      await authMutation.mutateAsync({
        email: values.email,
        password: values.password
      });
      
      message.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 64px)',
        padding: '20px'
      }}>
        <Card 
          style={{ 
            width: '100%', 
            maxWidth: 450, 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: 8
          }}
          bodyStyle={{ padding: '40px 32px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={3} style={{ marginBottom: 8 }}>ĐĂNG NHẬP</Title>
            <Text type="secondary">Vui lòng nhập thông tin đăng nhập của bạn</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              rules={[
                { 
                  required: true, 
                  message: 'Vui lòng nhập email của bạn!' 
                },
                { 
                  type: 'email', 
                  message: 'Email không hợp lệ!' 
                }
              ]}
            >
              <Input 
                size="large" 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="Email" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { 
                  required: true, 
                  message: 'Vui lòng nhập mật khẩu của bạn!' 
                },
                { 
                  min: 6, 
                  message: 'Mật khẩu phải có ít nhất 6 ký tự!' 
                }
              ]}
            >
              <Input.Password 
                size="large"
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 0 }}>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">
                <Text type="secondary">Quên mật khẩu?</Text>
              </Link>
            </div>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                block
                loading={authMutation.isPending}
              >
                {authMutation.isPending ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
              </Button>
            </Form.Item>

            <Divider>Hoặc</Divider>

            <div style={{ textAlign: 'center' }}>
              <Text>Chưa có tài khoản? </Text>
              <Link to="/register">
                <Text strong>Đăng ký ngay</Text>
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;