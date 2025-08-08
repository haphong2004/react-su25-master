
import { Table } from "antd";
import Header from "./Header";
import { useList } from "../hooks/useList";

function CategoryList() {
  const { data, isLoading } = useList("categories");

  const columns = [
    {
      title: "So thu tu",
      dataIndex: "id",
    },
    {
      title: "Ten danh muc",
      dataIndex: "name",
    },
  ];

  return (
    <div>
      <Header />

      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
      />
    </div>
  );
}

export default CategoryList;
