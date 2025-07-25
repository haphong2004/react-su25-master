import React, { useState } from "react";
import {
  HomeOutlined,
  ShopFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Homepage",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Create Product",
    key: "/products/create",
    icon: <ShopFilled />,
  },
  {
    label: "Products",
    key: "/products",
    icon: <ShopFilled />,
  },
  {
    label: "Categories",
    key: "/categories",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Categories Create",
    key: "/categories/create",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "User List",
    key: "/users",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "User Create",
    key: "/users/create",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Brand List",
    key: "/brands",
    icon: <UnorderedListOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
