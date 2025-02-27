import CashReqDialog from "@/dialog/CashReqDialog";
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";

const CashReqRow = ({ invoice }) => {

    const [open, setOpen] = useState(false);

    const handleClick = async () => {
        setOpen(true);
    };



    return (
        <>
            <TableRow onClick={() => handleClick(invoice?.sender)} key={invoice?._id}>
                <TableCell className="font-medium">{invoice?._id.slice(0, 1)}</TableCell>
                <TableCell>{invoice?.status}</TableCell>
                <TableCell>{invoice?.sender}</TableCell>
                <TableCell>{invoice?.receiver}</TableCell>
                <TableCell>{invoice?.txType}</TableCell>
                <TableCell>{invoice?.charge}</TableCell>
                <TableCell className="text-right">{invoice?.amount}</TableCell>
            </TableRow>
            <CashReqDialog _id={invoice?._id} open={open} setOpen={setOpen} />
        </>
    )
}

export default CashReqRow

