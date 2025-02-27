import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";

const useStats = () => {
    const axiosPublic = useAxiosPublic();
    const { data: userData } = useUser();

    console.log(userData?.data?.number, userData?.data?.acType);
    const { data: stats, refetch } = useQuery({
        queryKey: ['stats', userData?.data?.number, userData?.data?.acType],
        queryFn: async () => {
            const { data: statsData } = await axiosPublic(`/api/userStats?userNumber=${userData?.data?.number}&userType=${userData?.data?.acType}`);
            console.log(statsData);
            return statsData;
        },
        enabled: !!userData?.data?.number && !!userData?.data?.acType
    });
    return { stats, refetch };
};

export default useStats;
