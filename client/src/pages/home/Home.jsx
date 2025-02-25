import TransactionTable from '@/components/table/TransactionTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UserAction from '@/components/userAction/UserAction';
import UserVerification from '@/dialog/UserVerification';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { BadgeX, Verified, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Home = () => {

    const { user } = useAuth()
    const { data: info } = useUser({ email: user?.email })

    console.log(info);


    useEffect(() => {
        if (info?.data?.acStatus == "unverified") {
            toast.error("Please verify your account")
            setOpen(true);
            return

        }
    }, [info])

    const [open, setOpen] = useState(false);


    return (
        <div className="w-11/12 md:w-10/12 mx-auto ">
            <div className="md:flex h-full justify-between py-12 gap-5 ">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1"
                >
                    <div className="relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full pointer-events-none" />
                        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex items-center gap-5 h-full">
                            <div className="">
                                {user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Avatar className="cursor-pointer w-20 h-20">
                                                <AvatarImage src={user.photoURL || "/default-avatar.png"} alt="User Avatar" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem >Logout</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Link to="/auth/login"><Button className="">Login</Button></Link>
                                )}
                            </div>
                            <div className={"p-4 flex items-center gap-4"}>
                                <Wallet className='size-16 text-primary dark:text-white' />
                                <div className="">
                                    <CardTitle>Total Balance</CardTitle>
                                    <p className="text-2xl font-semibold dark:text-white">${info?.data?.balance}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Last updated 3 mins ago</p>
                                </div>
                                {info?.data?.acStatus == "unverified" ? <BadgeX className='text-red-500' /> : <Verified className='text-green-500' />}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <UserAction />
            </div>
            <div className="">
                <TransactionTable />
            </div>
            <UserVerification open={open} setOpen={setOpen} />
        </div>
    )
}

export default Home