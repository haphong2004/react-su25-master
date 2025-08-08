import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useCreate = (resource: string) => {
    const nav = useNavigate();
    const addProduct = async (values: any) => {
        const res = await axios.post(`http://localhost:3001/${resource}`, values);
        return res.data;
    };

    const createMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            message.success("Thanh cong");
            nav(`/${resource}`);
        },
    });

    return createMutation;
};