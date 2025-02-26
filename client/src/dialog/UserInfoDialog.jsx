import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Verified } from "lucide-react";
import { BadgeX } from "lucide-react";

// eslint-disable-next-line react/prop-types
const UserInfoDialog = ({ open, setOpen, data }) => {


    const { name, email, number, nid, acType, acStatus , photoURL , balance} = data || {}


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>User Name : {name}</DialogTitle>
                    <DialogTitle>User Email : {email}</DialogTitle>
                    <DialogTitle>User Number : {number}</DialogTitle>
                    <DialogTitle>User Nid : {nid}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex items-center gap-5 h-full w-full justify-between">
                        <div className={"p-4 flex items-center gap-4"}>
                            <div className="">
                                <p>Name : {name}</p>
                                <CardTitle>Total Balance</CardTitle>
                                <p className="text-2xl font-semibold dark:text-white">${parseFloat(balance).toFixed(2)}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Last updated 3 mins ago</p>
                                <p className='font-semibold dark:text-white'>Account Type: {acType}</p>
                                <p className='font-semibold dark:text-white flex items-center gap-2'>Account Status: {acStatus == "unverified" ? <BadgeX className='text-red-500' /> : acStatus == "pending" ? <Verified className='text-yellow-500' /> : <Verified className='text-green-400' />}</p>
                            </div>
                        </div>
                        <div className="">
                            <Avatar className="cursor-pointer w-20 h-20">
                                <AvatarImage src={photoURL || "/default-avatar.png"} alt="User Avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        Update Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserInfoDialog;
