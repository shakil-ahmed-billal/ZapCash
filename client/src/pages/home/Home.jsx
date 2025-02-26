import TransactionTable from '@/components/table/TransactionTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardTitle } from '@/components/ui/card';
import AdminAction from '@/components/userAction/AdminAction';
import AgentAction from '@/components/userAction/AgentAction';
import UserAction from '@/components/userAction/UserAction';
import UserVerification from '@/dialog/UserVerification';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import { motion } from 'framer-motion';
import { BadgeX, Verified } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const Home = () => {

    const { user } = useAuth()

    const { data: info } = useUser()

    console.log(info);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (info?.data?.acStatus == "unverified") {
            toast.error("Please verify your account")
            setOpen(true);


        }
    }, [info])


    // user action dialog




    return (
        <div className="w-11/12 md:w-10/12 mx-auto mt-20">
            <div className="md:flex h-full justify-between py-12 gap-5 ">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1">
                    <div className="relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full pointer-events-none" />
                        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex items-center gap-5 h-full w-full justify-between">
                            <div className={"p-4 flex items-center gap-4"}>
                                <div className="">
                                    <p>Name : {info?.data?.name}</p>
                                    <CardTitle>Total Balance</CardTitle>
                                    <p className="text-2xl font-semibold dark:text-white">${parseFloat(info?.data?.balance).toFixed(2)}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Last updated 3 mins ago</p>
                                    <p className='font-semibold dark:text-white'>Account Type: {info?.data?.acType}</p>
                                    <p className='font-semibold dark:text-white flex items-center gap-2'>Account Status: {info?.data?.acStatus == "unverified" ? <BadgeX className='text-red-500' /> : info?.data?.acStatus == "pending" ? <Verified className='text-yellow-500' /> : <Verified className='text-green-400' />}</p>
                                </div>
                            </div>
                            <div className="">
                                <Avatar className="cursor-pointer w-20 h-20">
                                    <AvatarImage src={user?.photoURL || "/default-avatar.png"} alt="User Avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {info?.data?.acType === "user" ? <UserAction /> : info?.data?.acType === "agent" ? <AgentAction /> : <AdminAction />}

            </div>
            <div className="">
                <TransactionTable />
            </div>
            <UserVerification open={open} setOpen={setOpen} />

        </div>
    )
}

export default Home