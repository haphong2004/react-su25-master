import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useDelete = (resource: string) => {
    const queryClient = useQueryClient();
    const deleteData = async (id: string | number) => {
        return await axios.delete(`http://localhost:3001/${resource}/${id}`);
    };

    const deleteMutaion = useMutation({
        mutationFn: (id: string | number) => deleteData(id),
        onSuccess: () => {
            message.success("Thanh cong");
            queryClient.invalidateQueries({ queryKey: [resource] });
        },
    });

    return deleteMutaion;
};