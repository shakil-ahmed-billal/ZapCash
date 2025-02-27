import getCashReq from "@/api/getCashReq";
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
const CashReqDialog = ({ open, setOpen, _id }) => {

    const axiosPublic = useAxiosPublic();
    const [pin, setPin] = useState("");
    const { refetch: refetchUser } = useUser();
    const { refetch: refetchUserTrx } = useUserTrx();

    const { refetch, isLoading } = getCashReq({ search: "" })

    const handleCashRequest = async () => {

        if (!pin) {
            toast.error("PIN is required!");
            return;
        }


        try {
            const { data } = await axiosPublic.post("/api/approveRequest", { transactionId: _id })
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
        refetch()
        refetchUser();
        refetchUserTrx();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request Cash</DialogTitle>
                    <DialogDescription>Agents receive 100,000 Taka upon approval</DialogDescription>
                    
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                    <Button onClick={handleCashRequest} type="submit">
                        Request Cash
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CashReqDialog;
