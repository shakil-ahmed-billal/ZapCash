import CashInDialog from '@/dialog/CashInDialog';
import CashRequestDialog from '@/dialog/CashRequestDialog';
import WithdrawRequestDialog from '@/dialog/WithdrawRequestDialog';
import { motion } from 'framer-motion';
import { CreditCard, Send, Wallet } from 'lucide-react';
import { useState } from 'react';

const AgentAction = () => {


    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    const handleCashIn = () => {
        setOpen2(true);
    }

    const handleB2B = () => {
        setOpen3(true);
    }

    const handleCashRequest = () => {
        setOpen4(true);
    }

    const handleWithdraw = () => {
        setOpen5(true);
    }


    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full pointer-events-none" />
                    <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div onClick={handleCashIn} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                                    <Send className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">Cash In</h3>
                                </div>
                                <div onClick={handleCashRequest} className="p-4 bg-gray-50 cursor-pointer dark:bg-gray-700 rounded-lg">
                                    <CreditCard className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">Cash request</h3>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div onClick={handleB2B} className="p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Wallet className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">B2B</h3>
                                </div>
                                <div onClick={handleWithdraw} className="p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <CreditCard className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">Withdraw request</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <CashInDialog open={open2} setOpen={setOpen2} />
            <CashRequestDialog open={open4} setOpen={setOpen4} />
            <WithdrawRequestDialog open={open5} setOpen={setOpen5} />
        </>
    )
}

export default AgentAction