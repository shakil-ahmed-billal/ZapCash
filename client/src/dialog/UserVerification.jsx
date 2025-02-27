import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const UserVerification = ({ open, setOpen }) => {

    const [userNid, setNid] = useState("");
    const [type, setType] = useState("user");
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth()
    const { refetch} = useUser();

    const handleVerify = async () => {
        console.log("NID:", userNid);
        console.log("Account Type:", type);

        const { data } = await axiosPublic.put(`/api/user/verify`, { nid: userNid, acType: type, email: user?.email });
        if (data.success) {
            toast.success(data.message);
            refetch();
            setOpen(false);
        }
        console.log(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Please Account Verify First</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            NID Number
                        </Label>
                        <Input
                            onChange={(e) => setNid(e.target.value)}
                            id="username"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="account-type" className="text-right">
                            Acc Type
                        </Label>
                        <Select value={type} onValueChange={setType} className="w-full">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent className={"w-full"}>
                                <SelectGroup>
                                    <SelectLabel>Account Type</SelectLabel>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="agent">Agent</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleVerify} type="submit">
                        Verify Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserVerification;
