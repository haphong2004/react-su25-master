import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";

interface User {
  id: string;
  name: string;
  price: number;
}
function UserList() {
  // query page, name
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  const fetchUsers = async () => {
    const res = await fetch(
      `http://localhost:3001/users?name_like=${name || ""}`
    );
    return res.json();
  };
  // state data, isLoading, error
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => {
        return <Link to={`/user/detail/${id}`}>ID: {id}</Link>; // Tạo liên kết đến chi tiết sản phẩm
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  return (
    <div>
      <Header />
      {error && <p>Error: {error.message}</p>}
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

export default UserList;
