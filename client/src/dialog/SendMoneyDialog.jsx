// import sendCashApi from "@/api/sendCashApi";
import sendCashApi from "@/api/sendCashApi";
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
import useUserTrx from "@/hooks/userUserTrx";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const SendMoneyDialog = ({ open, setOpen }) => {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const { data: userInfo, refetch } = useUser()
    const { refetch: refetchUserTrx } = useUserTrx();

    console.log(userInfo);

    const handleSendMoney = async () => {
        if (!accountNumber || !amount || !pin) {
            toast.error("All fields are required!");
            return;
        }

        console.log(accountNumber, amount, pin);

        const sendInfo = {
            sender: userInfo?.data?.number,
            receiver: accountNumber,
            amount: parseInt(amount),
            pin: pin,
            acType: userInfo?.data?.acType,
            txType: "sendMoney",
        };

        console.log("user info", sendInfo);
        try {
            const res = await sendCashApi(sendInfo)
            console.log(res);
            if (res.success) {
                toast.success(res.message);

                setOpen(false);
            } else {
                toast.error(res.response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        // setOpen(false);
        refetch();
        refetchUserTrx();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Money</DialogTitle>
                    <DialogDescription>Transfer funds to other users with a 5 Taka fee for transactions exceeding 100 Taka.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="account-number" className="text-right">
                            Account No
                        </Label>
                        <Input
                            id="account-number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter account number"
                        />
                    </div>
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
                        Send Money
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SendMoneyDialog;
