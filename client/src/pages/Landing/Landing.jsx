import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { ArrowUpRight, CreditCard, Send, Wallet } from "lucide-react"
const Landing = () => {
    return (
        <div>
            {/* Main Content */}
            <main className="md:pt-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 space-y-6"
                        >
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                                Modern Financial Services at Your Fingertips
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Send money, pay bills, and manage your finances with our secure and intuitive platform.
                            </p>
                            <div className="flex gap-4">
                                <Button size="lg" >
                                    Get Started
                                    <ArrowUpRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="lg">
                                    Learn More
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full" />
                                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <Send className="h-6 w-6 text-primary dark:text-white" />
                                                <h3 className="mt-2 font-semibold dark:text-white">Send Money</h3>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <CreditCard className="h-6 w-6 text-primary dark:text-white" />
                                                <h3 className="mt-2 font-semibold dark:text-white">Pay Bills</h3>
                                            </div>
                                        </div>
                                        <div className="space-y-4 pt-8">
                                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <Wallet className="h-6 w-6 text-primary dark:text-white" />
                                                <h3 className="mt-2 font-semibold dark:text-white">Cash Out</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Landing