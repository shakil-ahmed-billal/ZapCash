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
import userTrx from "@/hooks/userUserTrx";
import useUser from "@/hooks/useUser";
import UserTrxRow from "../tableRow/UserTrxRow";



const TransactionTable = () => {


    const { data } = userTrx()
    const { data: info } = useUser()


    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Trx</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trx Type</TableHead>
                    <TableHead>AC Type</TableHead>
                    <TableHead>{info?.data?.acType === "agent" ? "Commission" : info?.data?.acType === "admin" ? "Commission" : "Charge"}</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.data?.slice(0, 8).map((invoice) => <UserTrxRow invoice={invoice} key={invoice._id} />)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={7}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default TransactionTable