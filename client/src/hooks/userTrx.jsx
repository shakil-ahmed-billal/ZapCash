import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserTrx = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, error } = useQuery({
        queryKey: ["userTrx", user?.number], 
        queryFn: async () => {
            if (!user?.number) return null; 
            const response = await axiosPublic.get(`/api/trx/${user.number}`);
            return response.data;
        },
        enabled: !!user?.number, 
    });

    return { data, isLoading, error };
};

export default useUserTrx;
