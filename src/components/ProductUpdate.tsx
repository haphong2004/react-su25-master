import { Button, Form, Input, InputNumber, Select, Card, Typography, message, Space } from "antd";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOne } from "../hooks/useOne";
import { useUpdate } from "../hooks/useUpdate";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

interface Brand {
  id: string;
  name: string;
  status: string;
}

interface Category {
  id: number | string;
  name: string;
  description?: string;
}

interface ProductFormValues {
  name: string;
  price: number;
  image: string;
  brandId?: string;
  categoryId?: number | string;
}

const ProductUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: product } = useOne("products", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch brands and categories in parallel
        const [brandsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:3001/brands?status=active'),
          axios.get('http://localhost:3001/categories')
        ]);
        
        setBrands(brandsRes.data);
        setCategories(categoriesRes.data);

        // Set form values after data is loaded
        if (product) {
          form.setFieldsValue({
            ...product,
            brandId: product.brandId?.toString(),
            categoryId: product.categoryId?.toString()
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Không thể tải dữ liệu thương hiệu và danh mục');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product, form]);

  const updateMutation = useUpdate(id || '');

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);
      // Convert string IDs to appropriate types
      const updatedValues = {
        ...values,
        price: Number(values.price),
        brandId: values.brandId || null,
        categoryId: values.categoryId ? 
          (typeof values.categoryId === 'string' ? 
            (values.categoryId.includes('.') ? 
              parseFloat(values.categoryId) : 
              parseInt(values.categoryId, 10)) : 
            values.categoryId) : 
          null
      };
      
      await updateMutation.mutateAsync(updatedValues);
      message.success('Cập nhật sản phẩm thành công');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 1000, margin: '24px auto', padding: '0 16px' }}>
        <Card 
          title={
            <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
              CHỈNH SỬA SẢN PHẨM
            </Title>
          }
          bordered={false}
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên sản phẩm' },
                { min: 3, message: 'Tên sản phẩm phải có ít nhất 3 ký tự' },
                { max: 100, message: 'Tên sản phẩm không vượt quá 100 ký tự' }
              ]}
            >
              <Input size="large" placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              label="Hình ảnh sản phẩm"
              name="image"
              rules={[
                { required: true, message: 'Vui lòng nhập URL hình ảnh' },
                { type: 'url', message: 'Vui lòng nhập URL hợp lệ' }
              ]}
            >
              <Input size="large" placeholder="https://example.com/image.jpg" />
            </Form.Item>

            <Form.Item
              label="Giá sản phẩm (VND)"
              name="price"
              rules={[
                { required: true, message: 'Vui lòng nhập giá sản phẩm' },
                { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' }
              ]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                size="large" 
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value ? parseInt(value.replace(/\D/g, '')) || 0 : 0}
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Thương hiệu"
              name="brandId"
              rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
            >
              <Select 
                size="large" 
                placeholder="Chọn thương hiệu"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option?.children).toLowerCase().includes(input.toLowerCase())
                }
                loading={loading}
              >
                {brands.map(brand => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name="categoryId"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
            >
              <Select 
                size="large" 
                placeholder="Chọn danh mục"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option?.children).toLowerCase().includes(input.toLowerCase())
                }
                loading={loading}
              >
                {categories.map(category => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
              <Space>
                <Button 
                  type="default" 
                  onClick={() => navigate('/products')}
                  size="large"
                >
                  Hủy bỏ
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  size="large"
                  style={{ minWidth: 120 }}
                >
                  {loading ? 'Đang xử lý...' : 'Cập nhật'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ProductUpdate;