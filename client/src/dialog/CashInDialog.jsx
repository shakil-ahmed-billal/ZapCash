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
import useUser from "@/hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const CashInDialog = ({ open, setOpen }) => {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const { data: userInfo } = useUser()

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
            txType: "cashIn",
        };

        console.log("user info", sendInfo);
        try {
            const res = await sendCashApi(sendInfo)
            console.log(res);
            if (res.success) {
                toast.success(res.message);
                // setOpen(false);
            } else {
                toast.error(res.response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        // setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cash In</DialogTitle>
                    <DialogDescription>5 taka per transaction for amounts over 100 taka.</DialogDescription>
                    <DialogDescription>Phone number of the recipient.</DialogDescription>
                    <DialogDescription>Specify the amount to send.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="account-number" className="text-right">
                            User No
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
                        Cash Out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CashInDialog;
