import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();

    if (loading || !user) {
        return { data: null, refetch: () => { } };
    }

    const { data, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const response = await axiosPublic(`/api/info/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email,
    });

    return { data, refetch };
};

export default useUser;
