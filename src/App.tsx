import ProductList from "./components/ProductList";
import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import ProductDetail from "./components/ProductDetail";
import ProductCreate from "./components/ProductCreate";
import CategoryCreate from "./components/CategoryCreate";
import UserList from "./components/UserList";
import UserCreate from "./components/UserCreate";
import BrandList from "./components/BrandList";
import Homepage from "./components/Homepage";
import ProductUpdate from "./components/ProductUpdate";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    // Public routes
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    
    // Protected routes
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/create",
          element: <ProductCreate />,
        },
        {
          path: "/product/detail/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/categories",
          element: <CategoryList />,
        },
        {
          path: "/categories/create",
          element: <CategoryCreate />,
        },
        {
          path: "/orders",
          element: <CategoryList />,
        },
        {
          path: "/users",
          element: <UserList />,
        },
        {
          path: "/users/create",
          element: <UserCreate />,
        },
        {
          path: "/brands",
          element: <BrandList />,
        },
        {
          path: "/product/update/:id",
          element: <ProductUpdate />,
        },
      ],
    },
    
    // Redirect all other routes to home (or login if not authenticated)
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
