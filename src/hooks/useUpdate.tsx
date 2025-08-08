import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useUpdate = (id?: string | number) => {
    const updateProduct = async (values: any) => {
        if (!id) return;
        const res = await axios.put(`http://localhost:3001/products/${id}`, values);
        return res.data;
    };

    const updateMutaion = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            message.success("Thanh cong");
        },
        onError: () => {
            message.error("That bai");
        },
    });

    return updateMutaion;
};