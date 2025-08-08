import { Button, Form, Input, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

function RegisterPage() {
    const authMutation = useAuth("register");
    const [form] = Form.useForm();
    
    const onSubmit = async (values: any) => {
        try {
            await authMutation.mutateAsync(values);
            form.resetFields();
        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    return (
        <div>
            <Header />
            <div style={{ 
                maxWidth: 500, 
                margin: '40px auto',
                padding: '0 16px'
            }}>
                <Card 
                    title={
                        <Title level={3} style={{ textAlign: 'center', margin: 0 }}>
                            ĐĂNG KÝ TÀI KHOẢN
                        </Title>
                    }
                    bordered={false}
                    style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onSubmit}
                        autoComplete="off"
                        style={{ marginTop: 20 }}
                    >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ email' },
                        { 
                            type: 'email', 
                            message: 'Địa chỉ email không hợp lệ' 
                        },
                        {
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Vui lòng nhập đúng định dạng email'
                        }
                    ]}
                >
                    <Input 
                        size="large" 
                        placeholder="Nhập địa chỉ email của bạn" 
                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>
                
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu' },
                        { 
                            min: 6, 
                            message: 'Mật khẩu phải có ít nhất 6 ký tự' 
                        },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                            message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
                        }
                    ]}
                >
                    <Input.Password 
                        size="large"
                        placeholder="Nhập mật khẩu mạnh" 
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>
                
                <Form.Item
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { 
                            required: true, 
                            message: 'Vui lòng xác nhận lại mật khẩu' 
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password 
                        size="large"
                        placeholder="Nhập lại mật khẩu" 
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>
                
                <Form.Item style={{ marginTop: 32 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        block
                        size="large"
                        loading={authMutation.isPending}
                        style={{
                            background: '#1890ff',
                            fontWeight: 500,
                            height: 44
                        }}
                    >
                        {authMutation.isPending ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
                    </Button>
                </Form.Item>
                
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: '1px solid #f0f0f0'
                }}>
                    <Text style={{ color: '#666' }}>Bạn đã có tài khoản? </Text>
                    <Link 
                        to="/login" 
                        style={{ 
                            color: '#1890ff',
                            fontWeight: 500
                        }}
                    >
                        Đăng nhập ngay
                    </Link>
                </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
export default RegisterPage;