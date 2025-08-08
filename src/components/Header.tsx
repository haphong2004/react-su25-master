import React, { useState } from "react";
import {
  HomeOutlined,
  ShopFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

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
  {
    label: "Product Update",
    key: "/product/update",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Login",
    key: "/login",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Register",
    key: "/register",
    icon: <UnorderedListOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Clear all authentication related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Force a full page reload to reset all application state
    window.location.href = '/login';
  };

  const onClick: MenuProps["onClick"] = (e: any) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div>
        {token ? (
          <Button onClick={handleLogout}>Đăng xuất</Button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 10 }}>
              <Button>Đăng nhập</Button>
            </Link>
            <Link to="/register">
              <Button>Đăng ký</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
