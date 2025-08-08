import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

const AccessDenied: React.FC = () => (
    <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập trang này."
        extra={
            <Link to="/">
                <Button type="primary">Về trang chủ</Button>
            </Link>
        }
    />
);

export default AccessDenied;