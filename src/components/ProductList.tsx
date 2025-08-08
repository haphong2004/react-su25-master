import React from 'react';
import { Button, Image, Popconfirm, Table } from "antd";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useList } from "../hooks/useList";
import { useDelete } from "../hooks/useDelete";

interface Brand {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brandId: string;
  categoryId: string;
  brand?: Brand;
  category?: Category;
}


function ProductList() {
  const { data: products, isLoading, error } = useList("products");
  const { data: brands } = useList("brands");
  const { data: categories } = useList("categories");
  const deleteMutaion = useDelete("products");

  // Enrich products with brand and category data
  const enrichedProducts = React.useMemo(() => {
    if (!products || !brands || !categories) return [];
    
    return products.map((product: Product) => ({
      ...product,
      brand: brands.find((b: Brand) => b.id.toString() === product.brandId?.toString()),
      category: categories.find((c: Category) => c.id.toString() === product.categoryId?.toString())
    }));
  }, [products, brands, categories]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",

    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Thương hiệu",
      dataIndex: ["brand", "name"],
      render: (brandName: string) => brandName || 'Chưa có thương hiệu',
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      render: (categoryName: string) => categoryName || 'Chưa có danh mục',
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
      title: "Actions",
      render: (product: Product) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/product/update/${product.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => deleteMutaion.mutate(product.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Header />
      {/* {isLoading && <Spin />} */}
      {error && <p>Error: {error.message}</p>}
      {/* {data?.map((item: Product) => (
        <p key={item.id}>{item.name}</p>
      ))} */}
      <Table
        dataSource={enrichedProducts}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ProductList;
