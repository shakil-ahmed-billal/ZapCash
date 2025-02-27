import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAllUser from "@/hooks/useAllUser";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const StatusDialog = ({ open, setOpen, number }) => {

    const [status, setStatus] = useState("");
    const axiosPublic = useAxiosPublic();


    const { refetch } = useAllUser({ search: "", order: "", type: "", status: "" });

    const handleUpdate = async () => {

        console.log(status);

        try {
            const { data } = await axiosPublic(`/api/user/update/?number=${number}&acStatus=${status}`);
            console.log(data);
            if (data.success) {
                toast.success(data.message);

                refetch();
                setOpen(false);
            } else {
                toast.error(data.response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        refetch();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>User Account Type Select</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="">
                        <div className="">
                            <Label htmlFor="account-type" className="text-right">
                                AC Status Update
                            </Label>
                            <Select value={status} onValueChange={setStatus} className="">
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select Status type" />
                                </SelectTrigger>
                                <SelectContent className={""}>
                                    <SelectGroup>
                                        <SelectLabel>Account Status</SelectLabel>
                                        <SelectItem value="verified">Verified</SelectItem>
                                        <SelectItem value="unverified">Unverified</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpdate} type="submit">
                        Update Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default StatusDialog;
