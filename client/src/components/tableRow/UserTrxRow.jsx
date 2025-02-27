import useUser from "@/hooks/useUser";
import { TableCell, TableRow } from "../ui/table";

const UserTrxRow = ({ invoice }) => {

    const { data: userInfo } = useUser();

    let Commission = 0;

    if (invoice.txType === "cashOut" && userInfo?.data?.acType === "agent") {
        Commission = invoice.amount * 0.010; // 1.5% cash-out fee
    } else if (invoice.txType === "cashOut" && userInfo?.data?.acType === "admin") {
        Commission = invoice.amount * 0.005;
    }else if (invoice.txType === "sendMoney" && userInfo?.data?.acType === "admin") {
        Commission = invoice.amount > 100 ? 5 : 0;
    } else if (invoice.txType === "sendMoney" && userInfo?.data?.acType === "agent") {
        Commission = invoice.amount > 100 ? 5 : 0;
    }else{
        Commission = invoice.charge
    }


    return (
        <TableRow key={invoice._id}>
            <TableCell className="font-medium">{invoice._id.slice(0, 10)}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.receiver}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.txType}</TableCell>
            <TableCell>{invoice.acType}</TableCell>
            <TableCell>$ {Commission}</TableCell>
            <TableCell className="text-right">$ {invoice.amount}</TableCell>
        </TableRow>
    )
}

export default UserTrxRow