import Loading from "@/components/loading/Loading";
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
import useAllUser from "@/hooks/useAllUser";
import { useEffect, useState } from "react";

const AgentManage = () => {
    const [type, setType] = useState("agent");
    const [status, setStatus] = useState("pending");
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");

    const { data, refetch, isLoading, isPending } = useAllUser({ search, order, type, status });

    useEffect(() => {
        refetch();
    }, [type, status, search, order, refetch]);

    if (isPending || isLoading) return <Loading />;


    const users = Array.isArray(data) ? data : []; // Ensure data is an array

    return (
        <div>
            <div>
                <Label htmlFor="username" className="text-right">User Name</Label>
                <Input
                    onChange={(e) => setSearch(e.target.value)}
                    id="username"
                    placeholder="Username Search Now"
                />
            </div>

            <div className="flex justify-between items-center py-5">
                <div>
                    <Label htmlFor="account-type" className="text-right">Short User</Label>
                    <Select value={order} onValueChange={setOrder}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Sort Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Account Type</SelectLabel>
                                <SelectItem value="desc">Ascending</SelectItem>
                                <SelectItem value="asc">Descending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-5">
                    <div>
                        <Label htmlFor="account-type" className="text-right">AC Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status Type" />
                            </SelectTrigger>
                            <SelectContent>
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

                    <div>
                        <Label htmlFor="account-type" className="text-right">User Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select AC Type" />
                            </SelectTrigger>
                            <SelectContent>
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

            {!isLoading && (
                <Table>
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
                        {users.map((user) => (
                            <UserTableRow key={user._id} invoice={user} />
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
        </div>
    );
};

export default AgentManage;
