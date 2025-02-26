import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAllUser = ({ search, order , status , type}) => {

    const axiosPublic = useAxiosPublic();

    const { data, refetch, isLoading , isPending} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/api/user/allUser?acType=${type}&name=${search}&acStatus=${status}&order=${order}`);
            console.log(data);
            return data
        }
    })
    return { data, refetch, isLoading , isPending};
}

export default useAllUser