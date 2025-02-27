import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const getAdminIncome = () => {
    const axiosPublic = useAxiosPublic();
    
    const { data, refetch, isLoading, error } = useQuery({
        queryKey: ["adminIncome"],
        queryFn: async () => {
            const response = await axiosPublic.get(`/api/getAdminIncome`);
            return response.data;
        },
    });

    return { data, refetch, isLoading, error };
};

export default getAdminIncome;
