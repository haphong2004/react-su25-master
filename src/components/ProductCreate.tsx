import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";

function ProductCreate() {
  const [form] = Form.useForm();

  const addProduct = async (values: any) => {
    return await axios.post("http://localhost:3001/products", values);
  };

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("Thanh cong");
    },
  });

  const handleSubmit = async (values: any) => {
    mutate(values);
  };

  return (
    <div className=" mt-6 max-w-[1200px] mx-auto px-6">
      <h1 className="text-3xl font-bold  text-center">Product Create</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Product Name *"
          name="name"
          rules={[
            { required: true, message: "ten truong bat buoc" },
            {
              min: 3,
              message: "gia tri lon hon 3",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price *"
          name="price"
          rules={[
            { required: true, message: "ten truong bat buoc" },
            {
              min: 3,
              type: "number",
              message: "gia tri lon hon 3",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Input type="text" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProductCreate;
