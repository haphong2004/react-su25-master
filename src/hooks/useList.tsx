import { useQuery } from "@tanstack/react-query";

export const useList = (resource: string) => {
    const fetchData = async () => {
        const res = await fetch(`http://localhost:3001/${resource}`);
        return res.json();
    };

    const { data, isLoading, error } = useQuery({
        queryKey: [resource],
        queryFn: fetchData,
    });

    return {
        data,
        isLoading,
        error,
    };
};