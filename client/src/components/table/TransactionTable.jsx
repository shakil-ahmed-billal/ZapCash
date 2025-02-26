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
import userTrx from "@/hooks/userTrx";



const TransactionTable = () => {


    const { data } = userTrx()
    console.log(data);

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Trx</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Trx Type</TableHead>
                    <TableHead>AC Type</TableHead>
                    <TableHead>Charge</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.data?.slice(0, 8).map((invoice) => (
                    <TableRow key={invoice._id}>
                        <TableCell className="font-medium">{invoice._id.slice(0, 10)}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.receiver}</TableCell>
                        <TableCell>{invoice.txType}</TableCell>
                        <TableCell>{invoice.acType}</TableCell>
                        <TableCell>$ {invoice.charge}</TableCell>
                        <TableCell className="text-right">$ {invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default TransactionTable