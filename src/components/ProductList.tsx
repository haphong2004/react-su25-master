import { useQuery } from "@tanstack/react-query";
import { Image, Input, Select, Space, Table, Radio, Typography } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const { Title } = Typography;

interface Product {
  id: string;
  name: string;
  price: number;
}
type FilterType = 'contains' | 'startsWith' | 'exact';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState<FilterType>('contains');

  // Get search params from URL
  const name = searchParams.get("name") || "";
  const type = (searchParams.get("type") as FilterType) || 'contains';

  // Update local state when URL search params change
  useEffect(() => {
    setSearchValue(name);
    setFilterType(type);
  }, [name, type]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3001/products');
    return res.json();
  };

  // Fetch all products
  const { data: allProducts = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Filter products based on search criteria
  const filteredProducts = allProducts.filter((product: Product) => {
    if (!name) return true;
    
    const searchTerm = name.toLowerCase();
    const productName = product.name.toLowerCase();

    switch (filterType) {
      case 'contains':
        return productName.includes(searchTerm);
      case 'startsWith':
        return productName.startsWith(searchTerm);
      case 'exact':
        return productName === searchTerm;
      default:
        return true;
    }
  });

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("name", value);
      params.set("type", filterType);
    } else {
      params.delete("name");
      params.delete("type");
    }
    setSearchParams(params);
  };

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    setSearchParams(params);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => {
        return <Link to={`/product/detail/${id}`}>ID: {id}</Link>; // Tạo liên kết đến chi tiết sản phẩm
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (src: string, recourd: Product, index: number) => {
        return <Image src={src} width={300} alt={recourd.name} />;
      },
    },
    {
      title: "Description",
    },
  ];
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <Title level={3} style={{ marginBottom: '24px' }}>Danh sách sản phẩm</Title>
        
        <Space direction="vertical" style={{ width: '100%', marginBottom: '20px' }}>
          <Space>
            <Input
              placeholder="Nhập tên sản phẩm..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={(e) => handleSearch(e.currentTarget.value)}
              style={{ width: 300 }}
            />
            <Select
              value={filterType}
              onChange={handleFilterTypeChange}
              style={{ width: 180 }}
              size="large"
              options={[
                { value: 'contains', label: 'Chứa từ khóa' },
                { value: 'startsWith', label: 'Bắt đầu bằng' },
                { value: 'exact', label: 'Chính xác' },
              ]}
            />
            <button 
              onClick={() => handleSearch(searchValue)}
              style={{
                padding: '8px 20px',
                fontSize: '16px',
                backgroundColor: '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Tìm kiếm
            </button>
          </Space>
        </Space>
        
        {error && <p style={{ color: 'red' }}>Lỗi: {error.message}</p>}
        
        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey={"id"}
          loading={isLoading}
          pagination={{ 
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Tổng ${total} sản phẩm`
          }}
          locale={{
            emptyText: name ? 'Không tìm thấy sản phẩm nào' : 'Không có dữ liệu'
          }}
        />
      </div>
    </div>
  );
}

export default ProductList;
