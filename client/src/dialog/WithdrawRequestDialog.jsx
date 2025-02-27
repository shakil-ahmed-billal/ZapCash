
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
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useUserTrx from "@/hooks/userUserTrx";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const WithdrawRequestDialog = ({ open, setOpen }) => {


    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const { data: userInfo, refetch } = useUser()
    const axiosPublic = useAxiosPublic();
    const { refetch: refetchUserTrx } = useUserTrx();

    console.log(userInfo);

    const handleSendMoney = async () => {
        if (!amount || !pin) {
            toast.error("All fields are required!");
            return;
        }

        console.log(amount, pin);

        const sendInfo = {
            sender: userInfo?.data?.number,
            receiver: "admin",
            amount: parseInt(amount),
            pin: pin,
            acType: userInfo?.data?.acType,
            txType: "withdrawRequest",
        };

        console.log("user info", sendInfo);
        try {
            const { data } = await axiosPublic.post("/api/addAction", sendInfo)
            if (data.success) {
                toast.success(data.message);

                setOpen(false);
            } else {
                toast.error(data.response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
        refetch();
        refetchUserTrx();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Withdraw Cash</DialogTitle>
                    <DialogDescription>Request balance from the admin.</DialogDescription>
                    <DialogDescription>Specify the amount you need.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter amount"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="pin" className="text-right">
                            PIN
                        </Label>
                        <Input
                            id="pin"
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter PIN"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSendMoney} type="submit">
                        Withdraw Cash
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawRequestDialog;
