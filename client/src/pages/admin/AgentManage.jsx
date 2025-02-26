import UserTableRow from "@/components/tableRow/UserTableRow";
import { Input } from "@/components/ui/input";
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
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";



const AgentManage = () => {

    const axiosPublic = useAxiosPublic();
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const [search, setSearch] = useState("")
    const [order, setOrder] = useState("")

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/api/user/allUser?acType=agent&name=${search}&acStatus=pending&order=${order}`);
            console.log(data);
            return data
        }
    })

    useEffect(() => {
        refetch()
    }, [type, status, search, order, refetch])

    return (
        <div>
            <div className="">
                <div className="">
                    <Label htmlFor="username" className="text-right">
                        User Name
                    </Label>
                    <Input
                        onChange={(e) => setSearch(e.target.value)}
                        id="username"
                        className="col-span-3"
                        placeholder="Username Search Now"
                    />
                </div>
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
            {!isLoading && <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead className="text-right">AC Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((invoice) => (
                        <UserTableRow key={invoice._id} invoice={invoice} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>}
        </div>
    )
}

export default AgentManage
