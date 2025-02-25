import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUser = ({email}) => {

    const axiosPublic = useAxiosPublic()
    console.log(email);
    const { data, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/api/info/${email}`)
            console.log(data);
            return data
        }
    })
    return { data, refetch }
}

export default useUser