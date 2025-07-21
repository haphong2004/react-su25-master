import { useQuery } from "@tanstack/react-query";
import { Image, Input, Space, Table } from "antd";
import Header from "./Header";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // Get search term from URL
  const name = searchParams.get("name") || "";

  // Update local state when URL search param changes
  useEffect(() => {
    setSearchValue(name);
  }, [name]);

  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:3001/products?name_like=${name}`
    );
    return res.json();
  };

  // Fetch products when search term changes
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", name], // Include name in queryKey to refetch when it changes
    queryFn: fetchProducts,
  });

  const handleSearch = (value: string) => {
    // Update URL with new search term
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }
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
        <Space direction="vertical" style={{ width: '100%', marginBottom: '20px' }}>
          <Input.Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            style={{ maxWidth: '500px' }}
          />
        </Space>
        
        {error && <p style={{ color: 'red' }}>Lỗi: {error.message}</p>}
        
        <Table
          dataSource={data}
          columns={columns}
          rowKey={"id"}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default ProductList;
