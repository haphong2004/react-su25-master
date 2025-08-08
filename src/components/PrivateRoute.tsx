import React from "react";
import { Outlet } from "react-router-dom";
import AccessDenied from "./AccessDenied";

const PrivateRoute: React.FC = () => {
    //   const token = localStorage.getItem("token");
    // user.id === 2
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return user?.id === 2 ? <Outlet /> : <AccessDenied />;
};

export default PrivateRoute;