import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const getCashReq = ({ search, status , txType}) => {

    const axiosPublic = useAxiosPublic();

    const { data, refetch, isLoading, isPending } = useQuery({
        queryKey: ['user' , status , search],
        queryFn: async () => {
            const { data } = await axiosPublic(`/api/allTrx?status=${status}&search=${search}&txType=${txType}`);
            return data
        }
    })
    return {data, refetch, isLoading, isPending };
}

export default getCashReq