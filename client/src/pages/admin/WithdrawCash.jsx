import getCashReq from "@/api/getCashReq";
import Loading from "@/components/loading/Loading";
import WithdrawCashRow from "@/components/tableRow/WithdrawCashRow";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";



const WithdrawCash = () => {

    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const [order, setOrder] = useState("")


    const { data, refetch, isLoading, isPending } = getCashReq({ status: "pending", search: "", txType: "withdrawRequest" })


    useEffect(() => {
        refetch()
    }, [type, status, order, refetch])

    if (isPending || isLoading) return <Loading />

    return (
        <div>
            <div className="">
                <div className="flex justify-between items-center py-5">
                    <div className="">
                        <Label htmlFor="account-type" className="text-right">
                            Short User
                        </Label>
                        <Select value={order} onValueChange={setOrder} className="">
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Short type" />
                            </SelectTrigger>
                            <SelectContent className={""}>
                                <SelectGroup>
                                    <SelectLabel>Account Type</SelectLabel>
                                    <SelectItem value="desc">Accending</SelectItem>
                                    <SelectItem value="asc">Desecnding</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="">
                            <Label htmlFor="account-type" className="text-right">
                                AC Status
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
                        <div className="">
                            <Label htmlFor="account-type" className="text-right">
                                User Type
                            </Label>
                            <Select value={type} onValueChange={setType} className="">
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select AC type" />
                                </SelectTrigger>
                                <SelectContent className={""}>
                                    <SelectGroup>
                                        <SelectLabel>Account Type</SelectLabel>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="agent">Agent</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Receiver</TableHead>
                        <TableHead>Trx Type</TableHead>
                        <TableHead>Charge</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.map((invoice) => (
                        <WithdrawCashRow key={invoice._id} invoice={invoice} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default WithdrawCash
