import React, { useState } from "react";
import {
  HomeOutlined,
  ShopFilled,
  UnorderedListOutlined,
  UserOutlined,
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
    label: "Products",
    key: "/products",
    icon: <ShopFilled />,
  },
  {
    label: "Create Product",
    key: "/products/create",
    icon: <ShopFilled />,
  },
  {
    label: "Users",
    key: "/users",
    icon: <UserOutlined />,
  },
  {
    label: "Categories",
    key: "/categories",
    icon: <UnorderedListOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e: any) => {
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
