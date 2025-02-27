import CashOutDialog from '@/dialog/CashOutDialog';
import SendMoneyDialog from '@/dialog/SendMoneyDialog';
import { motion } from 'framer-motion';
import { CreditCard, Send, Wallet } from 'lucide-react';
import { useState } from 'react';

const UserAction = () => {


    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);


    const handleSendMoney = () => {
        setOpen2(true);
    }

    const handleCashOut = () => {
        setOpen3(true);
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
                                <div onClick={handleSendMoney} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                                    <Send className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">Send Money</h3>
                                </div>
                                <div className="p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <CreditCard className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">Pay Bills</h3>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div onClick={handleCashOut} className="p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Wallet className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">Cash Out</h3>
                                </div>
                                <div className="p-4 bg-gray-50 cursor-pointer dark:bg-gray-700 rounded-lg">
                                    <CreditCard className="h-6 w-6 text-primary dark:text-white" />
                                    <h3 className="mt-2 font-semibold dark:text-white">Pay Bills</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <SendMoneyDialog open={open2} setOpen={setOpen2} />
            <CashOutDialog open={open3} setOpen={setOpen3} />
        </>
    )
}

export default UserAction