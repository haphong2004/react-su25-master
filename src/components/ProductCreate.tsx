import { useMutation } from "@tanstack/react-query";
import { Form, Button, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Sử dụng useMutation để gọi API
    const mutation = useMutation<any, Error, any>({
        mutationFn: async (values: any) => {
            return await axios.post("http://localhost:3001/products", values);
        },
        onSuccess: () => {
            alert("Thêm sản phẩm thành công!");
            form.resetFields();
            navigate("/products");
        },
        onError: () => {
            alert("Lỗi khi thêm sản phẩm!");
        },
    });

    const handleSubmit = (value: any) => {
        console.log("handleSubmit", value);
        mutation.mutate(value);
    };

    return (
        <div className="my-2 max-w-[1200px] mx-auto">
            <h1 className="text-3xl font-bold text-center">Product Create</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 3, message: "Giá trị lớn hơn 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input your price!' },
                        {
                            // type: "number",
                            // min: 3,
                            message: "Giá phải là số và lớn hơn 3",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image URL!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ProductCreate;
