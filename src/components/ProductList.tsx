import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
}
function ProductList() {
  // query page, name
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:3001/products?name_like=${name || ""}`
    );
    return res.json();
  };
  // state data, isLoading, error
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
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
      {/* {isLoading && <Spin />} */}
      {error && <p>Error: {error.message}</p>}
      {/* {data?.map((item: Product) => (
        <p key={item.id}>{item.name}</p>
      ))} */}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading} // Hiển thị spinner khi đang tải
        pagination={{ pageSize: 5 }} // Phân trang, mỗi trang 5 bản ghi
      />
    </div>
  );
}

export default ProductList;
