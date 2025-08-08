import { useQuery } from "@tanstack/react-query";

export const useOne = (resource: string, id?: string | number) => {
    const fetchData = async () => {
        const res = await fetch(`http://localhost:3001/${resource}/${id}`);
        return res.json();
    };

    const { data, isLoading, error } = useQuery({
        queryKey: [resource, id],
        queryFn: fetchData,
        enabled: !!id,
    });

    return {
        data,
        isLoading,
        error,
    };
};