import { Table } from "antd";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useList } from "../hooks/useList";

function UserList() {
  const { data, isLoading, error } = useList("users");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => {
        return <Link to={`/users/detail/${id}`}>ID: {id}</Link>; // Tạo liên kết đến chi tiết sản phẩm
      },
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
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default UserList;