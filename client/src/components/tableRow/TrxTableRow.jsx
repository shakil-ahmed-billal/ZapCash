import StatusDialog from "@/dialog/StatusDialog";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import UserInfoDialog from "@/dialog/UserInfoDialog";

const TrxTableRow = ({ invoice }) => {

    const [open, setOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [userData, setUserData] = useState({});

    const handleClick = async (number) => {
        try {
            const {data} = await axiosPublic(`/api/info?email=dfg&number=${number}`);
            console.log(data);
            if (data.success) {
                console.log(data);
                setUserData(data.data);

                if(userData){
                    setOpen(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <>
            <TableRow onClick={()=>handleClick(invoice?.sender)} key={invoice?._id}>
                <TableCell className="font-medium">{invoice?._id.slice(0, 1)}</TableCell>
                <TableCell>{invoice?.status}</TableCell>
                <TableCell>{invoice?.sender}</TableCell>
                <TableCell>{invoice?.receiver}</TableCell>
                <TableCell>{invoice?.txType}</TableCell>
                <TableCell>{invoice?.charge}</TableCell>
                <TableCell className="text-right">{invoice?.amount}</TableCell>
            </TableRow>
            <UserInfoDialog data={userData}  number={invoice?.number} open={open} setOpen={setOpen} />
        </>
    )
}

export default TrxTableRow

