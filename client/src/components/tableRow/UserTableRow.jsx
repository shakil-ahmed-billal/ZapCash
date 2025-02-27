import { useState } from "react";
import { TableCell, TableRow } from "../ui/table"
import StatusDialog from "@/dialog/StatusDialog";

const UserTableRow = ({ invoice }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);

    return (
        <>
            <TableRow onClick={handleClick} key={invoice._id}>
                <TableCell className="font-medium">{invoice._id.slice(0, 1)}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>{invoice.number}</TableCell>
                <TableCell>{invoice.email}</TableCell>
                <TableCell>{invoice.balance}</TableCell>
                <TableCell>{invoice.acType}</TableCell>
                <TableCell className="text-right">{invoice.acStatus}</TableCell>
            </TableRow>
            <StatusDialog number={invoice.number} open={open} setOpen={setOpen}/>
        </>
    )
}

export default UserTableRow